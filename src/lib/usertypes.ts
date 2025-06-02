export enum Role {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
}

export enum LearningPathStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
}

export enum QuizStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum SubscriptionStatus {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
  ENTERPRISE = "ENTERPRISE",
}

export enum NotificationType {
  QUIZ_DUE = "QUIZ_DUE",
  PROGRESS_UPDATE = "PROGRESS_UPDATE",
  BADGE_EARNED = "BADGE_EARNED",
  GROUP_INVITE = "GROUP_INVITE",
  BLOG_COMMENT = "BLOG_COMMENT",
}

export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
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

export enum LearningStyle {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
  INTERACTIVE = "INTERACTIVE",
}

export enum AccessibilityMode {
  DEFAULT = "DEFAULT",
  HIGH_CONTRAST = "HIGH_CONTRAST",
  SCREEN_READER = "SCREEN_READER",
}

export enum ResourceType {
  TEXT = "TEXT",
  IFRAME = "IFRAME",
}

export enum DifficultyLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum EducationLevel {
  NONE = "NONE",
  BASIC = "BASIC",
  HIGH_SCHOOL = "HIGH_SCHOOL",
  COLLEGE = "COLLEGE",
}

export interface User {
  id: string;
  email: string;
  password?: string | null;
  googleId?: string | null;
  name: string;
  profileImageUrl?: string | null;
  role: Role;
  educationLevel: EducationLevel;
  currentSemester?: number | null;
  major?: string | null;
  institution?: string | null;
  userExperience: UserExperience;
  preferredLearningStyle: LearningStyle;
  timeAvailabilityHours?: number | null;
  subscriptionStatus: SubscriptionStatus;
  trialStartDate?: Date | null;
  trialEndDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PreviousSemester {
  id: string;
  userId: string;
  semesterName: string;
  gpa?: number | null;
  creditsEarned?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillName: string;
  proficiency?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriorEducation {
  id: string;
  userId: string;
  level: string;
  institution: string;
  yearCompleted: number;
  grades?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  userId: string;
  name: string;
  issuer: string;
  year: number;
  certificateId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Extracurricular {
  id: string;
  userId: string;
  name: string;
  role: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Internship {
  id: string;
  userId: string;
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date | null;
  skillsGained: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerGoal {
  id: string;
  userId: string;
  goal: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface CurrentSubject {
  id: string;
  userId: string;
  name: string;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerInterest {
  id: string;
  userId: string;
  careerPathId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerPath {
  id: string;
  name: string;
  subfield?: string | null;
  subscriptionTier: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  status: LearningPathStatus;
  startDate: Date;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  learningPathId: string;
  subjectId?: string | null;
  type: ResourceType;
  difficulty: DifficultyLevel;
  url?: string | null;
  content?: string | null;
  careerRelevance?: string | null;
  weekNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  learningPathId: string;
  title: string;
  githubUrl?: string | null;
}
