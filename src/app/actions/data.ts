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
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return {
      status: 401,
      message: "Invalid or missing user ID",
      success: false,
    };
  }

  try {
    const userData = await prismaClient.user.findFirst({
      where: { id: userId },
      include: {
        currentSubjects: true,
        careerInterests: { include: { careerPath: true } },
        userSettings: true,
        previousSemester: true,
        skills: true,
        priorEducation: true,
        certifications: true,
        extracurriculars: true,
        internships: true,
        careerGoals: true,
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
        previousSemesters:
          userData.previousSemester?.map((sem) => ({
            semesterName: sem.semesterName,
            gpa: sem.gpa ?? undefined,
            creditsEarned: sem.creditsEarned ?? undefined,
          })) || [],
        priorEducation:
          userData.priorEducation?.map((edu) => ({
            level: edu.level,
            institution: edu.institution,
            yearCompleted: edu.yearCompleted,
            grades: edu.grades ?? undefined,
          })) || [],
        skills:
          userData.skills?.map((skill) => ({
            skillName: skill.skillName,
            proficiency: skill.proficiency ?? undefined,
          })) || [],
        certifications:
          userData.certifications?.map((cert) => ({
            name: cert.name,
            issuer: cert.issuer,
            year: cert.year,
            certificateId: cert.certificateId ?? undefined,
          })) || [],
      },
      currentStatus: {
        currentSubjects:
          userData.currentSubjects?.map((subject) => ({
            id: subject.id,
            name: subject.name,
            progress: subject.progress,
          })) || [],
        extracurriculars:
          userData.extracurriculars?.map((extra) => ({
            name: extra.name,
            role: extra.role,
            duration: extra.duration,
          })) || [],
        internships:
          userData.internships?.map((intern) => ({
            company: intern.company,
            role: intern.role,
            startDate: intern.startDate.toISOString().split("T")[0],
            endDate: intern.endDate
              ? intern.endDate.toISOString().split("T")[0]
              : undefined,
            skillsGained: intern.skillsGained,
          })) || [],
      },
      futurePlans: {
        careerGoals: userData.careerGoals?.map((goal) => goal.goal) || [],
        careerInterests:
          userData.careerInterests?.map((interest) => ({
            name: interest.careerPath.name,
            subscriptionTier: interest.careerPath
              .subscriptionTier as SubscriptionStatus,
          })) || [],
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
        targetCompletionDate: userData.trialEndDate
          ? userData.trialEndDate.toISOString().split("T")[0]
          : undefined,
      },
      subscription: {
        plan:
          (userData.subscriptionStatus as SubscriptionStatus) ||
          SubscriptionStatus.FREE,
        priceId: userData.trialStartDate ? "trial" : undefined, // Placeholder for priceId
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      status: 500,
      message: `Failed to fetch user data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      success: false,
    };
  }
};

export const saveBasicInfo = async (
  basicInfo: DevixFormState["basicInfo"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return { success: false, message: "Invalid or missing user ID" };
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
    return {
      success: false,
      message: `Failed to save basic info:${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const saveAcademicHistory = async (
  academicHistory: DevixFormState["academicHistory"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return { success: false, message: "Invalid or missing user ID" };
  }

  try {
    await prismaClient.$transaction(
      async (tx) => {
        // Clear existing records
        await tx.previousSemester.deleteMany({ where: { userId } });
        await tx.userSkill.deleteMany({ where: { userId } });
        await tx.priorEducation.deleteMany({ where: { userId } });
        await tx.certification.deleteMany({ where: { userId } });

        // Save PreviousSemester
        if (academicHistory.previousSemesters.length > 0) {
          await tx.previousSemester.createMany({
            data: academicHistory.previousSemesters.map((sem) => ({
              userId,
              semesterName: sem.semesterName,
              gpa: sem.gpa,
              creditsEarned: sem.creditsEarned,
            })),
          });
        }

        // Save UserSkill
        if (academicHistory.skills.length > 0) {
          await tx.userSkill.createMany({
            data: academicHistory.skills.map((skill) => ({
              userId,
              skillName: skill.skillName,
              proficiency: skill.proficiency,
            })),
          });
        }

        // Save PriorEducation
        if (academicHistory.priorEducation.length > 0) {
          await tx.priorEducation.createMany({
            data: academicHistory.priorEducation.map((edu) => ({
              userId,
              level: edu.level,
              institution: edu.institution,
              yearCompleted: edu.yearCompleted,
              grades: edu.grades,
            })),
          });
        }

        // Save Certification
        if (academicHistory.certifications.length > 0) {
          await tx.certification.createMany({
            data: academicHistory.certifications.map((cert) => ({
              userId,
              name: cert.name,
              issuer: cert.issuer,
              year: cert.year,
              certificateId: cert.certificateId,
            })),
          });
        }
      },
      { timeout: 10000 }
    );

    return { success: true };
  } catch (error) {
    console.error("Error saving academic history:", error);
    return {
      success: false,
      message: `Failed to save academic history:${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const saveCurrentStatus = async (
  currentStatus: DevixFormState["currentStatus"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return { success: false, message: "Invalid or missing user ID" };
  }

  try {
    await prismaClient.$transaction(
      async (tx) => {
        // Clear existing records
        await tx.currentSubject.deleteMany({ where: { userId } });
        await tx.extracurricular.deleteMany({ where: { userId } });
        await tx.internship.deleteMany({ where: { userId } });

        // Save CurrentSubject
        if (currentStatus.currentSubjects.length > 0) {
          await tx.currentSubject.createMany({
            data: currentStatus.currentSubjects.map((subject) => ({
              userId,
              name: subject.name,
              progress: subject.progress,
            })),
          });
        }

        // Save Extracurricular
        if (currentStatus.extracurriculars.length > 0) {
          await tx.extracurricular.createMany({
            data: currentStatus.extracurriculars.map((extra) => ({
              userId,
              name: extra.name,
              role: extra.role,
              duration: extra.duration,
            })),
          });
        }

        // Save Internship
        if (currentStatus.internships.length > 0) {
          await tx.internship.createMany({
            data: currentStatus.internships.map((intern) => ({
              userId,
              company: intern.company,
              role: intern.role,
              startDate: new Date(intern.startDate),
              endDate: intern.endDate ? new Date(intern.endDate) : undefined,
              skillsGained: intern.skillsGained,
            })),
          });
        }
      },
      { timeout: 30000 }
    );

    return { success: true };
  } catch (error) {
    console.error("Error saving current status:", error);
    return {
      success: false,
      message: `Failed to save current status: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const saveFuturePlans = async (
  futurePlans: DevixFormState["futurePlans"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return { success: false, message: "Invalid or missing user ID" };
  }

  try {
    await prismaClient.$transaction(
      async (tx) => {
        // Clear existing records
        await tx.careerInterest.deleteMany({ where: { userId } });
        await tx.careerGoal.deleteMany({ where: { userId } });

        // Save CareerInterest
        if (futurePlans.careerInterests.length > 0) {
          for (const interest of futurePlans.careerInterests) {
            let careerPath = await tx.careerPath.findFirst({
              where: { name: interest.name },
            });
            if (!careerPath) {
              careerPath = await tx.careerPath.create({
                data: {
                  name: interest.name,
                  subscriptionTier: interest.subscriptionTier,
                },
              });
            }
            await tx.careerInterest.create({
              data: {
                userId,
                careerPathId: careerPath.id,
              },
            });
          }
        }

        // Save CareerGoal
        if (futurePlans.careerGoals.length > 0) {
          await tx.careerGoal.createMany({
            data: futurePlans.careerGoals.map((goal) => ({
              userId,
              goal,
            })),
          });
        }

        // Update User and UserSettings
        await tx.user.update({
          where: { id: userId },
          data: {
            preferredLearningStyle: futurePlans.preferredLearningStyle,
            timeAvailabilityHours: futurePlans.timeAvailability.hoursPerWeek,
            trialEndDate: futurePlans.targetCompletionDate
              ? new Date(futurePlans.targetCompletionDate)
              : undefined,
          },
        });

        await tx.userSettings.upsert({
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
      },
      { timeout: 30000 }
    );

    return { success: true };
  } catch (error) {
    console.error("Error saving future plans:", error);
    return {
      success: false,
      message: `Failed to save future plans: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};

export const queueAITraining = async (
  userId: string
): Promise<SaveResponse> => {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return { success: false, message: "Invalid or missing user ID" };
  }

  try {
    console.log(`Queued AI training for user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error("Error queuing AI training:", error);
    return {
      success: false,
      message: `Failed to queue AI training: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};
