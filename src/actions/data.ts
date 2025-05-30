// lib/api.ts
"use server";
import { prismaClient } from "@/lib/prismaClient";
import { DevixFormState } from "@/lib/types";

type ErrorResponse = {
  status: number;
  message: string;
  success: false;
};

export const fetchUserData = async (
  userId: string
): Promise<DevixFormState | ErrorResponse> => {
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const userData = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        previousSemesters: {
          include: {
            subjects: true,
          },
        },
        priorEducation: true,
        skills: true,
        certifications: true,
        currentSubjects: true,
        extracurriculars: true,
        internships: true,
        careerGoals: true,
        careerInterests: true,
        userSettings: true,
      },
    });

    if (!userData) {
      return {
        status: 404,
        message: "No data found.",
        success: false,
      };
    }

    return {
      basicInfo: {
        name: userData.name || "",
        currentSemester: userData.currentSemester || 0,
        degree: userData.degree || "",
        major: userData.major || "",
        institution: userData.institution || "",
        about: userData.about || "",
        status:
          (userData.status as import("@/lib/types").ProgressStatus) ||
          "NOT_STARTED",
        userStatus:
          (userData.userStatus as import("@/lib/types").UserStatus) ||
          "STUDENT",
        userExperience:
          (userData.userExperience as import("@/lib/types").UserExperience) ||
          "FRESHER",
      },
      academicHistory: {
        previousSemesters:
          userData.previousSemesters?.map((semester) => ({
            id: semester.id,
            semester: semester.semester,
            year: semester.year,
            gpa: semester.gpa ?? undefined,
            subjects:
              semester.subjects?.map((subject) => ({
                id: subject.id,
                name: subject.name,
                grade: subject.grade ?? undefined,
                status: subject.status as import("@/lib/types").ProgressStatus,
              })) || [],
          })) || [],
        priorEducation:
          userData.priorEducation?.map((education) => ({
            id: education.id,
            level: education.level,
            institution: education.institution,
            yearCompleted: education.yearCompleted,
            grades: education.grades ?? undefined,
          })) || [],
        skills: userData.skills?.map((skill) => skill.skill) || [],
        certifications:
          userData.certifications?.map((cert) => ({
            id: cert.id,
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
            quizIds: subject.quizIds || [],
          })) || [],
        extracurriculars:
          userData.extracurriculars?.map((activity) => ({
            id: activity.id,
            name: activity.name,
            role: activity.role,
            duration: activity.duration,
          })) || [],
        internships:
          userData.internships?.map((internship) => ({
            id: internship.id,
            company: internship.company,
            role: internship.role,
            startDate: internship.startDate.toISOString(),
            endDate: internship.endDate?.toISOString() ?? undefined,
            skillsGained: internship.skillsGained || [],
          })) || [],
      },
      futurePlans: {
        careerGoals: userData.careerGoals?.map((goal) => goal.goal) || [],
        careerInterests:
          userData.careerInterests?.map((interest) => interest.interest) || [],
        preferredLearningStyle:
          (userData.preferredLearningStyle as import("@/lib/types").LearningStyle) ||
          ("VIDEO" as import("@/lib/types").LearningStyle),
        timeAvailability: {
          hoursPerWeek: userData.timeAvailabilityHours || 0,
          preferredDays:
            (
              userData.userSettings?.notificationPrefs as {
                preferredDays?: string[];
              }
            )?.preferredDays || [],
        },
        targetCompletionDate:
          userData.targetCompletionDate?.toISOString() || "",
      },
      subscription: {
        plan:
          (userData.subscriptionStatus as import("@/lib/types").SubscriptionPlan) ||
          ("FREE" as import("@/lib/types").SubscriptionPlan),
        priceId: "",
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      status: 500,
      message: "Internal Server Error",
      success: false,
    };
  }
};

type SaveResponse = {
  success: boolean;
  message?: string;
};

// Save Basic Info
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
        degree: basicInfo.degree,
        major: basicInfo.major,
        institution: basicInfo.institution,
        about: basicInfo.about,
        status: basicInfo.status,
        userStatus: basicInfo.userStatus,
        userExperience: basicInfo.userExperience,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving basic info:", error);
    return { success: false, message: "Failed to save basic info" };
  }
};

// Save Academic History
export const saveAcademicHistory = async (
  academicHistory: DevixFormState["academicHistory"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // Delete existing records
    await Promise.all([
      prismaClient.previousSemester.deleteMany({ where: { userId } }),
      prismaClient.priorEducation.deleteMany({ where: { userId } }),
      prismaClient.userSkill.deleteMany({ where: { userId } }),
      prismaClient.certification.deleteMany({ where: { userId } }),
    ]);

    // Insert previous semesters
    for (const semester of academicHistory.previousSemesters) {
      await prismaClient.previousSemester.create({
        data: {
          userId,
          semester: semester.semester,
          year: semester.year,
          gpa: semester.gpa,
          subjects: {
            create: semester.subjects.map((subject) => ({
              name: subject.name,
              grade: subject.grade,
              status: subject.status,
            })),
          },
        },
      });
    }

    // Insert prior education
    if (academicHistory.priorEducation.length > 0) {
      await prismaClient.priorEducation.createMany({
        data: academicHistory.priorEducation.map((education) => ({
          userId,
          level: education.level,
          institution: education.institution,
          yearCompleted: education.yearCompleted,
          grades: education.grades,
        })),
      });
    }

    // Insert skills
    if (academicHistory.skills.length > 0) {
      await prismaClient.userSkill.createMany({
        data: academicHistory.skills.map((skill) => ({
          userId,
          skill,
        })),
      });
    }

    // Insert certifications
    if (academicHistory.certifications.length > 0) {
      await prismaClient.certification.createMany({
        data: academicHistory.certifications.map((cert) => ({
          userId,
          name: cert.name,
          issuer: cert.issuer,
          year: cert.year,
          certificateId: cert.certificateId,
        })),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving academic history:", error);
    return { success: false, message: "Failed to save academic history" };
  }
};

// Save Current Status
export const saveCurrentStatus = async (
  currentStatus: DevixFormState["currentStatus"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // Delete existing records
    await Promise.all([
      prismaClient.currentSubject.deleteMany({ where: { userId } }),
      prismaClient.extracurricular.deleteMany({ where: { userId } }),
      prismaClient.internship.deleteMany({ where: { userId } }),
    ]);

    // Insert current subjects
    if (currentStatus.currentSubjects.length > 0) {
      await prismaClient.currentSubject.createMany({
        data: currentStatus.currentSubjects.map((subject) => ({
          userId,
          name: subject.name,
          progress: subject.progress,
          quizIds: subject.quizIds,
        })),
      });
    }

    // Insert extracurriculars
    if (currentStatus.extracurriculars.length > 0) {
      await prismaClient.extracurricular.createMany({
        data: currentStatus.extracurriculars.map((activity) => ({
          userId,
          name: activity.name,
          role: activity.role,
          duration: activity.duration,
        })),
      });
    }

    // Insert internships
    if (currentStatus.internships.length > 0) {
      await prismaClient.internship.createMany({
        data: currentStatus.internships.map((internship) => ({
          userId,
          company: internship.company,
          role: internship.role,
          startDate: new Date(internship.startDate),
          endDate: internship.endDate ? new Date(internship.endDate) : null,
          skillsGained: internship.skillsGained,
        })),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving current status:", error);
    return { success: false, message: "Failed to save current status" };
  }
};

// Save Future Plans
export const saveFuturePlans = async (
  futurePlans: DevixFormState["futurePlans"],
  userId: string
): Promise<SaveResponse> => {
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // Delete existing records
    await Promise.all([
      prismaClient.careerGoal.deleteMany({ where: { userId } }),
      prismaClient.careerInterest.deleteMany({ where: { userId } }),
    ]);

    // Insert career goals
    if (futurePlans.careerGoals.length > 0) {
      await prismaClient.careerGoal.createMany({
        data: futurePlans.careerGoals.map((goal) => ({
          userId,
          goal,
        })),
      });
    }

    // Insert career interests
    if (futurePlans.careerInterests.length > 0) {
      await prismaClient.careerInterest.createMany({
        data: futurePlans.careerInterests.map((interest) => ({
          userId,
          interest,
        })),
      });
    }

    // Update user and user settings
    await prismaClient.user.update({
      where: { id: userId },
      data: {
        preferredLearningStyle: futurePlans.preferredLearningStyle,
        timeAvailabilityHours: futurePlans.timeAvailability.hoursPerWeek,
        targetCompletionDate: futurePlans.targetCompletionDate
          ? new Date(futurePlans.targetCompletionDate)
          : null,
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

// Queue AI Training (Placeholder)
export const queueAITraining = async (
  userId: string
): Promise<SaveResponse> => {
  try {
    // Placeholder: Implement queueing logic (e.g., using BullMQ)
    // Example: await queue.add('ai-training', { userId });
    console.log(`Queued AI training for user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error("Error queuing AI training:", error);
    return { success: false, message: "Failed to queue AI training" };
  }
};
