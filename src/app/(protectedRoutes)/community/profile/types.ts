import {
  EducationLevel,
  LearningStyle,
  Role,
  SubscriptionStatus,
  UserExperience,
} from "@prisma/client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImageUrl: string | null;
  role: Role;
  educationLevel: EducationLevel;
  major: string | null;
  institution: string | null;
  currentSemester: number | null;
  userExperience: UserExperience | null;
  preferredLearningStyle: LearningStyle | null;
  timeAvailabilityHours: number | null;
  subscriptionStatus: SubscriptionStatus;
  createdAt: string;
  careerGoals: {
    id: string;
    goal: string;
    progress: number;
    deadline: string | null;
  }[];
  skills: {
    id: string;
    skillName: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | null;
  }[];
  certifications: { id: string; name: string; issuer: string; year: number }[];
  badges: {
    id: string;
    badgeName: string;
    description: string | null;
    earnedAt: string;
  }[];
  projects: {
    id: string;
    title: string;
    githubUrl: string | null;
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    deadline: string | null;
  }[];
  followers: { id: string; name: string }[];
  following: { id: string; name: string }[];
  mutualConnections: number;
  leaderboardRank: number;
  totalScore: number;
  weeklyRank: number;
  monthlyRank: number;
}

export interface Activity {
  id: string;
  action: string;
  item: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  name: string;
  score: number;
  rank: number;
  profileImageUrl: string | null;
}

export interface Goal {
  id: string;
  goal: string;
  progress: number;
  deadline: string | null;
}

export interface Challenge {
  id: string;
  challenge: string;
  reward: string;
  status: "completed" | "in-progress" | "pending";
}
