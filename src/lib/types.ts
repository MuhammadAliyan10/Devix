export type ValidationErrors = {
  [key: string]: string;
};

export enum ActivityType {
  READING = "TEXT",
  VIDEO = "VIDEO",
  ASSIGNMENT = "INTERACTIVE",
}

export enum Role {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
}

export enum UserExperience {
  FRESHER = "FRESHER",
  INTERMEDIATE = "INTERMEDIATE",
  EXPERIENCED = "EXPERIENCED",
}

export enum ProgressStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum SubscriptionStatus {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
  ENTERPRISE = "ENTERPRISE",
}

export enum LearningStyle {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
  INTERACTIVE = "INTERACTIVE",
}

export type DevixFormState = {
  basicInfo: {
    name: string;
    currentSemester: number;
    major: string;
    institution: string;
    about?: string;
    status: ProgressStatus;
    role: Role;
    userExperience: UserExperience;
  };
  academicHistory: {
    previousSemesters: {
      semester: number;
      year: number;
      subjects: {
        name: string;
        grade?: string;
        status: ProgressStatus;
      }[];
      gpa?: number;
    }[];
    priorEducation: {
      level: string;
      institution: string;
      yearCompleted: number;
      grades?: string;
    }[];
    skills: string[];
    certifications: {
      name: string;
      issuer: string;
      year: number;
      certificateId?: string;
    }[];
  };
  currentStatus: {
    currentSubjects: {
      name: string;
      progress: number;
      quizIds: string[];
    }[];
    extracurriculars: {
      name: string;
      role: string;
      duration: string;
    }[];
    internships: {
      company: string;
      role: string;
      startDate: string;
      endDate?: string;
      skillsGained: string[];
    }[];
  };
  futurePlans: {
    careerGoals: string[];
    careerInterests: string[];
    preferredLearningStyle: LearningStyle;
    timeAvailability: {
      hoursPerWeek: number;
      preferredDays: string[];
    };
    targetCompletionDate?: string;
  };
  subscription: {
    plan: SubscriptionStatus;
    priceId?: string;
  };
};

export const validateBasicInfo = (
  basicInfo: DevixFormState["basicInfo"]
): { valid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let valid = true;

  if (!basicInfo.name || basicInfo.name.trim() === "") {
    errors.name = "Name is required";
    valid = false;
  }
  if (basicInfo.currentSemester < 0) {
    errors.currentSemester = "Current semester cannot be negative";
    valid = false;
  }
  if (!basicInfo.major) {
    errors.major = "Major is required";
    valid = false;
  }
  if (!basicInfo.institution) {
    errors.institution = "Institution name is required";
    valid = false;
  }

  return { valid, errors };
};

export const validateAcademicHistory = (
  academicHistory: DevixFormState["academicHistory"],
  currentSemester: number
): { valid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let valid = true;

  if (currentSemester > 1 && academicHistory.previousSemesters.length === 0) {
    errors.previousSemesters =
      "At least one previous semester is required for students beyond 1st semester";
    valid = false;
  }

  academicHistory.previousSemesters.forEach((sem, index) => {
    if (!sem.year || sem.year < 2000 || sem.year > new Date().getFullYear()) {
      errors[
        `previousSemesters_${index}_year`
      ] = `Valid year for semester ${sem.semester} is required`;
      valid = false;
    }
    if (!sem.semester || sem.semester <= 0 || sem.semester >= currentSemester) {
      errors[
        `previousSemesters_${index}_semester`
      ] = `Semester number must be between 1 and ${currentSemester - 1}`;
      valid = false;
    }
    sem.subjects.forEach((subject, subIndex) => {
      if (!subject.name) {
        errors[
          `previousSemesters_${index}_subjects_${subIndex}_name`
        ] = `Subject name for semester ${sem.semester} is required`;
        valid = false;
      }
    });
  });

  academicHistory.priorEducation.forEach((edu, index) => {
    if (!edu.level) {
      errors[`priorEducation_${index}_level`] = "Education level is required";
      valid = false;
    }
    if (!edu.institution) {
      errors[`priorEducation_${index}_institution`] =
        "Institution name is required";
      valid = false;
    }
    if (
      !edu.yearCompleted ||
      edu.yearCompleted < 1900 ||
      edu.yearCompleted > new Date().getFullYear()
    ) {
      errors[`priorEducation_${index}_yearCompleted`] =
        "Valid completion year is required";
      valid = false;
    }
  });

  return { valid, errors };
};

export const validateCurrentStatus = (
  currentStatus: DevixFormState["currentStatus"]
): { valid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let valid = true;

  if (currentStatus.currentSubjects.length === 0) {
    errors.currentSubjects = "At least one current subject is required";
    valid = false;
  }

  currentStatus.currentSubjects.forEach((subject, index) => {
    if (!subject.name) {
      errors[`currentSubjects_${index}_name`] = "Subject name is required";
      valid = false;
    }
    if (subject.progress < 0 || subject.progress > 100) {
      errors[`currentSubjects_${index}_progress`] =
        "Progress must be between 0 and 100";
      valid = false;
    }
  });

  currentStatus.extracurriculars.forEach((extra, index) => {
    if (!extra.name) {
      errors[`extracurriculars_${index}_name`] =
        "Extracurricular name is required";
      valid = false;
    }
    if (!extra.role) {
      errors[`extracurriculars_${index}_role`] = "Role is required";
      valid = false;
    }
    if (!extra.duration) {
      errors[`extracurriculars_${index}_duration`] = "Duration is required";
      valid = false;
    }
  });

  currentStatus.internships.forEach((intern, index) => {
    if (!intern.company) {
      errors[`internships_${index}_company`] = "Company name is required";
      valid = false;
    }
    if (!intern.role) {
      errors[`internships_${index}_role`] = "Role is required";
      valid = false;
    }
    if (!intern.startDate || !/^\d{4}-\d{2}-\d{2}$/.test(intern.startDate)) {
      errors[`internships_${index}_startDate`] =
        "Valid start date (YYYY-MM-DD) is required";
      valid = false;
    }
  });

  return { valid, errors };
};

export const validateFuturePlans = (
  futurePlans: DevixFormState["futurePlans"]
): { valid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let valid = true;

  if (futurePlans.careerGoals.length === 0) {
    errors.careerGoals = "At least one career goal is required";
    valid = false;
  }
  if (futurePlans.careerInterests.length === 0) {
    errors.careerInterests = "At least one career interest is required";
    valid = false;
  }
  if (
    !futurePlans.preferredLearningStyle ||
    !Object.values(LearningStyle).includes(futurePlans.preferredLearningStyle)
  ) {
    errors.preferredLearningStyle = "Valid learning style is required";
    valid = false;
  }
  if (futurePlans.timeAvailability.hoursPerWeek <= 0) {
    errors.hoursPerWeek = "Available study hours must be greater than 0";
    valid = false;
  }
  if (futurePlans.timeAvailability.preferredDays.length === 0) {
    errors.preferredDays = "At least one preferred day is required";
    valid = false;
  }
  if (
    futurePlans.targetCompletionDate &&
    !/^\d{4}-\d{2}-\d{2}$/.test(futurePlans.targetCompletionDate)
  ) {
    errors.targetCompletionDate =
      "Valid target completion date (YYYY-MM-DD) is required";
    valid = false;
  }

  return { valid, errors };
};

export const validateSubscription = (
  subscription: DevixFormState["subscription"]
): { valid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let valid = true;

  if (
    !subscription.plan ||
    !Object.values(SubscriptionStatus).includes(subscription.plan)
  ) {
    errors.plan = "Valid subscription plan is required";
    valid = false;
  }

  return { valid, errors };
};

export interface UserData {
  basicInfo: {
    name: string;
    currentSemester: number;
    major: string;
    institution: string;
    about: string;
    status: string;
    role: string;
    userExperience: string;
  };
  academicHistory: {
    previousSemesters: string[];
    priorEducation: string[];
    skills: string[];
    certifications: string[];
  };
  currentStatus: {
    currentSubjects: {
      id: string;
      name: string;
      progress: number;
      quizIds: string[];
    }[];
    extracurriculars: string[];
    internships: string[];
  };
  futurePlans: {
    careerGoals: string[];
    careerInterests: string[];
    preferredLearningStyle: string;
    timeAvailability: { hoursPerWeek: number; preferredDays: string[] };
    targetCompletionDate?: Date;
  };
  subscription: { plan: string; priceId: string };
}
