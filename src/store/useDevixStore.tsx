// store/useDevixStore.ts
import { create } from "zustand";
import {
  validateBasicInfo,
  validateAcademicHistory,
  validateCurrentStatus,
  validateFuturePlans,
  validateSubscription,
  ValidationErrors,
  DevixFormState,
  ProgressStatus,
  UserStatus,
  UserExperience,
  SubscriptionPlan,
  LearningStyle,
} from "@/lib/types";
import { fetchUserData } from "@/actions/data";

const initialState: DevixFormState = {
  basicInfo: {
    name: "",
    currentSemester: 0,
    degree: "",
    major: "",
    institution: "",
    about: "",
    status: ProgressStatus.NOT_STARTED,
    userStatus: UserStatus.STUDENT,
    userExperience: UserExperience.FRESHER,
  },
  academicHistory: {
    previousSemesters: [],
    priorEducation: [],
    skills: [],
    certifications: [],
  },
  currentStatus: {
    currentSubjects: [],
    extracurriculars: [],
    internships: [],
  },
  futurePlans: {
    careerGoals: [],
    careerInterests: [],
    preferredLearningStyle: LearningStyle.VIDEO,
    timeAvailability: {
      hoursPerWeek: 0,
      preferredDays: [],
    },
    targetCompletionDate: "",
  },
  subscription: {
    plan: SubscriptionPlan.FREE,
    priceId: "",
  },
};

const initialValidationData: ValidationState = {
  basicInfo: { valid: false, errors: {} },
  academicHistory: { valid: false, errors: {} },
  currentStatus: { valid: false, errors: {} },
  futurePlans: { valid: false, errors: {} },
  subscription: { valid: false, errors: {} },
};

type ValidationState = {
  basicInfo: { valid: boolean; errors: ValidationErrors };
  academicHistory: { valid: boolean; errors: ValidationErrors };
  currentStatus: { valid: boolean; errors: ValidationErrors };
  futurePlans: { valid: boolean; errors: ValidationErrors };
  subscription: { valid: boolean; errors: ValidationErrors };
};

type DevixStore = {
  isModalOpen: boolean;
  isCompleted: boolean;
  isSubmitting: boolean;
  formData: DevixFormState;
  validation: ValidationState;
  initializeStore: (userId: string) => Promise<void>;
  updateBasicInfoField: <K extends keyof DevixFormState["basicInfo"]>(
    field: K,
    value: DevixFormState["basicInfo"][K]
  ) => void;
  updateAcademicHistoryField: <
    K extends keyof DevixFormState["academicHistory"]
  >(
    field: K,
    value: DevixFormState["academicHistory"][K]
  ) => void;
  updateCurrentStatusField: <K extends keyof DevixFormState["currentStatus"]>(
    field: K,
    value: DevixFormState["currentStatus"][K]
  ) => void;
  updateFuturePlansField: <K extends keyof DevixFormState["futurePlans"]>(
    field: K,
    value: DevixFormState["futurePlans"][K]
  ) => void;
  updateSubscriptionField: <K extends keyof DevixFormState["subscription"]>(
    field: K,
    value: DevixFormState["subscription"][K]
  ) => void;
  validateStep: (stepId: keyof DevixFormState) => boolean;
  getStepValidationErrors: (stepId: keyof DevixFormState) => ValidationErrors;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addCareerGoal: (goal: string) => void;
  removeCareerGoal: (goal: string) => void;
  addCareerInterest: (interest: string) => void;
  removeCareerInterest: (interest: string) => void;
  resetForm: () => void;
  setModalOpen: (isOpen: boolean) => void;
  setCompleted: (isCompleted: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
};

export const useDevixStore = create<DevixStore>((set, get) => ({
  isModalOpen: false,
  isCompleted: false,
  isSubmitting: false,
  formData: initialState,
  validation: initialValidationData,

  initializeStore: async (userId: string) => {
    const initialData = await fetchUserData(userId);

    if ("status" in initialData && !initialData.success) {
      console.error(initialData.message);
      set({
        formData: initialState,
        validation: initialValidationData,
        isCompleted: false,
      });
      return;
    }
    set({
      formData: "basicInfo" in initialData ? initialData : initialState,
      validation: {
        basicInfo:
          "basicInfo" in initialData
            ? validateBasicInfo(initialData.basicInfo)
            : initialValidationData.basicInfo,
        academicHistory: validateAcademicHistory(
          "academicHistory" in initialData
            ? initialData.academicHistory
            : initialState.academicHistory,
          "basicInfo" in initialData
            ? initialData.basicInfo.currentSemester
            : initialState.basicInfo.currentSemester
        ),
        currentStatus:
          "currentStatus" in initialData
            ? validateCurrentStatus(initialData.currentStatus)
            : initialValidationData.currentStatus,
        futurePlans:
          "futurePlans" in initialData
            ? validateFuturePlans(initialData.futurePlans)
            : initialValidationData.futurePlans,
        subscription:
          "subscription" in initialData
            ? validateSubscription(initialData.subscription)
            : initialValidationData.subscription,
      },
      isCompleted:
        "basicInfo" in initialData &&
        initialData.basicInfo.status === ProgressStatus.COMPLETED,
    });
  },

  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setCompleted: (isCompleted) => set({ isCompleted }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  updateBasicInfoField: (field, value) => {
    set((state) => {
      const newBasicInfo = { ...state.formData.basicInfo, [field]: value };
      const validateResult = validateBasicInfo(newBasicInfo);
      const academicHistoryValidation = validateAcademicHistory(
        state.formData.academicHistory,
        newBasicInfo.currentSemester
      );
      return {
        formData: { ...state.formData, basicInfo: newBasicInfo },
        validation: {
          ...state.validation,
          basicInfo: validateResult,
          academicHistory: academicHistoryValidation,
        },
      };
    });
  },

  updateAcademicHistoryField: (field, value) => {
    set((state) => {
      const newAcademicHistory = {
        ...state.formData.academicHistory,
        [field]: value,
      };
      const validateResult = validateAcademicHistory(
        newAcademicHistory,
        state.formData.basicInfo.currentSemester
      );
      return {
        formData: { ...state.formData, academicHistory: newAcademicHistory },
        validation: { ...state.validation, academicHistory: validateResult },
      };
    });
  },

  updateCurrentStatusField: (field, value) => {
    set((state) => {
      const newCurrentStatus = {
        ...state.formData.currentStatus,
        [field]: value,
      };
      const validateResult = validateCurrentStatus(newCurrentStatus);
      return {
        formData: { ...state.formData, currentStatus: newCurrentStatus },
        validation: { ...state.validation, currentStatus: validateResult },
      };
    });
  },

  updateFuturePlansField: (field, value) => {
    set((state) => {
      const newFuturePlans = { ...state.formData.futurePlans, [field]: value };
      const validateResult = validateFuturePlans(newFuturePlans);
      return {
        formData: { ...state.formData, futurePlans: newFuturePlans },
        validation: { ...state.validation, futurePlans: validateResult },
      };
    });
  },

  updateSubscriptionField: (field, value) => {
    set((state) => {
      const newSubscription = {
        ...state.formData.subscription,
        [field]: value,
      };
      const validateResult = validateSubscription(newSubscription);
      return {
        formData: { ...state.formData, subscription: newSubscription },
        validation: { ...state.validation, subscription: validateResult },
      };
    });
  },

  validateStep: (stepId: keyof DevixFormState) => {
    const { formData } = get();
    let validationResult;
    switch (stepId) {
      case "basicInfo":
        validationResult = validateBasicInfo(formData.basicInfo);
        break;
      case "academicHistory":
        validationResult = validateAcademicHistory(
          formData.academicHistory,
          formData.basicInfo.currentSemester
        );
        break;
      case "currentStatus":
        validationResult = validateCurrentStatus(formData.currentStatus);
        break;
      case "futurePlans":
        validationResult = validateFuturePlans(formData.futurePlans);
        break;
      case "subscription":
        validationResult = validateSubscription(formData.subscription);
        break;
      default:
        return false;
    }
    set((state) => ({
      validation: { ...state.validation, [stepId]: validationResult },
    }));
    return validationResult.valid;
  },

  getStepValidationErrors: (stepId) => {
    return get().validation[stepId].errors;
  },

  addSkill: (skill) => {
    set((state) => {
      const newSkills = [...state.formData.academicHistory.skills, skill];
      const newAcademicHistory = {
        ...state.formData.academicHistory,
        skills: newSkills,
      };
      const validateResult = validateAcademicHistory(
        newAcademicHistory,
        state.formData.basicInfo.currentSemester
      );
      return {
        formData: { ...state.formData, academicHistory: newAcademicHistory },
        validation: { ...state.validation, academicHistory: validateResult },
      };
    });
  },

  removeSkill: (skillToRemove) => {
    set((state) => {
      const newSkills = state.formData.academicHistory.skills.filter(
        (skill) => skill !== skillToRemove
      );
      const newAcademicHistory = {
        ...state.formData.academicHistory,
        skills: newSkills,
      };
      const validateResult = validateAcademicHistory(
        newAcademicHistory,
        state.formData.basicInfo.currentSemester
      );
      return {
        formData: { ...state.formData, academicHistory: newAcademicHistory },
        validation: { ...state.validation, academicHistory: validateResult },
      };
    });
  },

  addCareerGoal: (goal) => {
    set((state) => {
      const newGoals = [...state.formData.futurePlans.careerGoals, goal];
      const newFuturePlans = {
        ...state.formData.futurePlans,
        careerGoals: newGoals,
      };
      const validateResult = validateFuturePlans(newFuturePlans);
      return {
        formData: { ...state.formData, futurePlans: newFuturePlans },
        validation: { ...state.validation, futurePlans: validateResult },
      };
    });
  },

  removeCareerGoal: (goalToRemove) => {
    set((state) => {
      const newGoals = state.formData.futurePlans.careerGoals.filter(
        (goal) => goal !== goalToRemove
      );
      const newFuturePlans = {
        ...state.formData.futurePlans,
        careerGoals: newGoals,
      };
      const validateResult = validateFuturePlans(newFuturePlans);
      return {
        formData: { ...state.formData, futurePlans: newFuturePlans },
        validation: { ...state.validation, futurePlans: validateResult },
      };
    });
  },

  addCareerInterest: (interest) => {
    set((state) => {
      const newInterests = [
        ...state.formData.futurePlans.careerInterests,
        interest,
      ];
      const newFuturePlans = {
        ...state.formData.futurePlans,
        careerInterests: newInterests,
      };
      const validateResult = validateFuturePlans(newFuturePlans);
      return {
        formData: { ...state.formData, futurePlans: newFuturePlans },
        validation: { ...state.validation, futurePlans: validateResult },
      };
    });
  },

  removeCareerInterest: (interestToRemove) => {
    set((state) => {
      const newInterests = state.formData.futurePlans.careerInterests.filter(
        (interest) => interest !== interestToRemove
      );
      const newFuturePlans = {
        ...state.formData.futurePlans,
        careerInterests: newInterests,
      };
      const validateResult = validateFuturePlans(newFuturePlans);
      return {
        formData: { ...state.formData, futurePlans: newFuturePlans },
        validation: { ...state.validation, futurePlans: validateResult },
      };
    });
  },

  resetForm: () =>
    set({
      isCompleted: false,
      isSubmitting: false,
      formData: initialState,
      validation: initialValidationData,
    }),
}));
