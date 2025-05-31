// actions/data.ts
"use server";
import { prismaClient } from "@/lib/prismaClient";
import {
  DevixFormState,
  ProgressStatus,
  LearningStyle,
  Role,
  UserExperience,
  SubscriptionStatus,
} from "@/lib/types";

type ErrorResponse = {
  status: number;
  message: string;
  success: false;
};

type SaveResponse = {
  success: boolean;
  message?: string;
};

export const fetchUserData = async (
  userId: string
): Promise<DevixFormState | ErrorResponse> => {
  if (!userId) {
    return { status: 401, message: "Unauthorized", success: false };
  }

  try {
    const userData = await prismaClient.user.findFirst({
      where: { id: userId },
      include: {
        currentSubjects: true,
        careerInterests: { include: { careerPath: true } },
        userSettings: true,
      },
    });

    if (!userData) {
      return { status: 404, message: "No data found.", success: false };
    }

    return {
      basicInfo: {
        name: userData.name || "",
        currentSemester: userData.currentSemester || 0,
        major: userData.major || "",
        institution: userData.institution || "",
        about: "",
        status: ProgressStatus.NOT_STARTED,
        role: (userData.role as Role) || Role.STUDENT,
        userExperience:
          (userData.userExperience as UserExperience) || UserExperience.FRESHER,
      },
      academicHistory: {
        previousSemesters: [],
        priorEducation: [],
        skills: [],
        certifications: [],
      },
      currentStatus: {
        currentSubjects:
          userData.currentSubjects?.map((subject) => ({
            id: subject.id,
            name: subject.name,
            progress: subject.progress,
            quizIds: [],
          })) || [],
        extracurriculars: [],
        internships: [],
      },
      futurePlans: {
        careerGoals: [],
        careerInterests:
          userData.careerInterests?.map(
            (interest) => interest.careerPath.name
          ) || [],
        preferredLearningStyle:
          (userData.preferredLearningStyle as LearningStyle) ||
          LearningStyle.VIDEO,
        timeAvailability: {
          hoursPerWeek: userData.timeAvailabilityHours || 0,
          preferredDays:
            (
              userData.userSettings?.notificationPrefs as {
                preferredDays?: string[];
              }
            )?.preferredDays || [],
        },
        targetCompletionDate: undefined,
      },
      subscription: {
        plan:
          (userData.subscriptionStatus as SubscriptionStatus) ||
          SubscriptionStatus.FREE,
        priceId: "",
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { status: 500, message: "Internal Server Error", success: false };
  }
};

export const saveBasicInfo = async (
  basicInfo: DevixFormState["basicInfo"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prismaClient.user.update({
      where: { id: userId },
      data: {
        name: basicInfo.name,
        currentSemester: basicInfo.currentSemester,
        major: basicInfo.major,
        institution: basicInfo.institution,
        role: basicInfo.role,
        userExperience: basicInfo.userExperience,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving basic info:", error);
    return { success: false, message: "Failed to save basic info" };
  }
};

export const saveAcademicHistory = async (
  academicHistory: DevixFormState["academicHistory"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }
  return { success: true };
};

export const saveCurrentStatus = async (
  currentStatus: DevixFormState["currentStatus"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prismaClient.$transaction([
      prismaClient.currentSubject.deleteMany({ where: { userId } }),
    ]);

    if (currentStatus.currentSubjects.length > 0) {
      await prismaClient.currentSubject.createMany({
        data: currentStatus.currentSubjects.map((subject) => ({
          userId,
          name: subject.name,
          progress: subject.progress,
        })),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving current status:", error);
    return { success: false, message: "Failed to save current status" };
  }
};

export const saveFuturePlans = async (
  futurePlans: DevixFormState["futurePlans"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prismaClient.$transaction([
      prismaClient.careerInterest.deleteMany({ where: { userId } }),
    ]);

    if (futurePlans.careerInterests.length > 0) {
      for (const interest of futurePlans.careerInterests) {
        let careerPath = await prismaClient.careerPath.findFirst({
          where: { name: interest },
        });
        if (!careerPath) {
          careerPath = await prismaClient.careerPath.create({
            data: {
              name: interest,
              subscriptionTier: SubscriptionStatus.FREE,
            },
          });
        }
        await prismaClient.careerInterest.create({
          data: {
            userId,
            careerPathId: careerPath.id,
          },
        });
      }
    }

    await prismaClient.user.update({
      where: { id: userId },
      data: {
        preferredLearningStyle: futurePlans.preferredLearningStyle,
        timeAvailabilityHours: futurePlans.timeAvailability.hoursPerWeek,
      },
    });

    await prismaClient.userSettings.upsert({
      where: { userId },
      update: {
        notificationPrefs: {
          preferredDays: futurePlans.timeAvailability.preferredDays,
        },
      },
      create: {
        userId,
        language: "en",
        accessibilityMode: "DEFAULT",
        notificationPrefs: {
          preferredDays: futurePlans.timeAvailability.preferredDays,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving future plans:", error);
    return { success: false, message: "Failed to save future plans" };
  }
};

export const queueAITraining = async (
  userId: string
): Promise<SaveResponse> => {
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    console.log(`Queued AI training for user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error("Error queuing AI training:", error);
    return { success: false, message: "Failed to queue AI training" };
  }
};
