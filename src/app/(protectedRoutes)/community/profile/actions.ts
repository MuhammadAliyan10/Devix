"use server";

import { prismaClient } from "@/lib/prismaClient";

interface UpdateProfileInput {
  name: string;
  email: string;
  major: string | null;
  institution: string | null;
  currentSemester: number | null;
  timeAvailabilityHours: number | null;
}

interface LeaderboardEntry {
  id: string;
  userId: string;
  name: string;
  score: number;
  rank: number;
  profileImageUrl: string | null;
}

interface Goal {
  id: string;
  goal: string;
  progress: number;
  deadline: string | null;
}

interface Challenge {
  id: string;
  challenge: string;
  reward: string;
  status: "completed" | "in-progress" | "pending";
}

export const fetchUserProfileData = async (userId: string) => {
  try {
    if (!userId) {
      return {
        status: 400,
        message: "Invalid user ID",
        success: false,
        data: null,
      };
    }
    const user = await prismaClient.user.findFirst({
      where: { id: userId },
      include: {
        skills: true,
        certifications: true,
        careerGoals: true,
        badges: true,
        projects: true,
        followers: { select: { id: true } },
        following: { select: { id: true } },
      },
    });
    if (!user) {
      return {
        status: 404,
        message: "User not found",
        success: false,
        data: null,
      };
    }
    const mutualConnections = await prismaClient.follow.count({
      where: {
        followerId: { in: user.following.map((f) => f.id) },
        followingId: userId,
      },
    });
    const monthlyLeaderboard = await prismaClient.leaderboard.findFirst({
      where: { userId, period: "MONTHLY" },
    });
    const weeklyLeaderboard = await prismaClient.leaderboard.findFirst({
      where: { userId, period: "WEEKLY" },
    });
    return {
      status: 200,
      message: "Data fetched successfully",
      data: {
        ...user,
        followers: user.followers,
        following: user.following,
        mutualConnections,
        leaderboardRank: monthlyLeaderboard?.rank || 0,
        totalScore: monthlyLeaderboard?.score || 0,
        weeklyRank: weeklyLeaderboard?.rank || 0,
        monthlyRank: monthlyLeaderboard?.rank || 0,
      },
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error",
      data: null,
      success: false,
    };
  }
};

export const updateUserProfile = async (
  userId: string,
  input: UpdateProfileInput
) => {
  try {
    if (!userId) {
      return {
        status: 400,
        message: "Invalid user ID",
        success: false,
        data: null,
      };
    }
    const user = await prismaClient.user.update({
      where: { id: userId },
      data: {
        name: input.name,
        email: input.email,
        major: input.major,
        institution: input.institution,
        currentSemester: input.currentSemester,
        timeAvailabilityHours: input.timeAvailabilityHours,
        updatedAt: new Date(),
      },
      include: {
        skills: true,
        certifications: true,
        careerGoals: true,
        badges: true,
        projects: true,
        followers: { select: { id: true } },
        following: { select: { id: true } },
      },
    });
    const mutualConnections = await prismaClient.follow.count({
      where: {
        followerId: { in: user.following.map((f) => f.id) },
        followingId: userId,
      },
    });
    const monthlyLeaderboard = await prismaClient.leaderboard.findFirst({
      where: { userId, period: "MONTHLY" },
    });
    const weeklyLeaderboard = await prismaClient.leaderboard.findFirst({
      where: { userId, period: "WEEKLY" },
    });
    return {
      status: 200,
      message: "Profile updated successfully",
      data: {
        ...user,
        followers: user.followers,
        following: user.following,
        mutualConnections,
        leaderboardRank: monthlyLeaderboard?.rank || 0,
        totalScore: monthlyLeaderboard?.score || 0,
        weeklyRank: weeklyLeaderboard?.rank || 0,
        monthlyRank: monthlyLeaderboard?.rank || 0,
      },
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to update profile",
      data: null,
      success: false,
    };
  }
};

export const followUser = async (followerId: string, followingId: string) => {
  try {
    if (!followerId || !followingId) {
      return { status: 400, message: "Invalid user IDs", success: false };
    }
    if (followerId === followingId) {
      return { status: 400, message: "Cannot follow yourself", success: false };
    }
    const targetUser = await prismaClient.user.findFirst({
      where: { id: followingId },
    });
    if (!targetUser) {
      return {
        status: 404,
        message: "User to follow not found",
        success: false,
      };
    }
    const existingFollow = await prismaClient.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    if (existingFollow) {
      return {
        status: 400,
        message: "Already following this user",
        success: false,
      };
    }
    await prismaClient.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
    return {
      status: 200,
      message: "Successfully followed user",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Failed to follow user", success: false };
  }
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  try {
    if (!followerId || !followingId) {
      return { status: 400, message: "Invalid user IDs", success: false };
    }
    const existingFollow = await prismaClient.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    if (!existingFollow) {
      return {
        status: 400,
        message: "Not following this user",
        success: false,
      };
    }
    await prismaClient.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return {
      status: 200,
      message: "Successfully unfollowed user",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Failed to unfollow user", success: false };
  }
};

export const fetchLeaderboard = async (userId: string) => {
  try {
    if (!userId) {
      return {
        status: 400,
        message: "Invalid user ID",
        success: false,
        data: null,
      };
    }
    const leaderboard = await prismaClient.leaderboard.findMany({
      where: { period: "MONTHLY" },
      orderBy: { rank: "asc" },
      take: 5,
      include: {
        user: {
          select: { id: true, name: true, profileImageUrl: true },
        },
      },
    });
    let entries = leaderboard.map((entry) => ({
      id: entry.id,
      userId: entry.userId,
      name: entry.user.name,
      score: entry.score,
      rank: entry.rank,
      profileImageUrl: entry.user.profileImageUrl,
    })) as LeaderboardEntry[];
    const userRank = entries.find((entry) => entry.userId === userId);
    if (!userRank && entries.length >= 5) {
      const userEntry = await prismaClient.leaderboard.findFirst({
        where: { userId, period: "MONTHLY" },
        include: {
          user: { select: { id: true, name: true, profileImageUrl: true } },
        },
      });
      if (userEntry) {
        entries = [
          ...entries.slice(0, 4),
          {
            id: userEntry.id,
            userId: userEntry.userId,
            name: userEntry.user.name,
            score: userEntry.score,
            rank: userEntry.rank,
            profileImageUrl: userEntry.user.profileImageUrl,
          },
        ];
      }
    }
    return {
      status: 200,
      message: "Leaderboard fetched successfully",
      data: entries,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to fetch leaderboard",
      data: null,
      success: false,
    };
  }
};

export const fetchUserGoals = async (userId: string) => {
  try {
    if (!userId) {
      return {
        status: 400,
        message: "Invalid user ID",
        success: false,
        data: null,
      };
    }
    const goals = await prismaClient.careerGoal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        goal: true,
        progress: true,
        deadline: true,
      },
    });
    return {
      status: 200,
      message: "Goals fetched successfully",
      data: goals.map((g) => ({
        id: g.id,
        goal: g.goal,
        progress: g.progress,
        deadline: g.deadline?.toISOString() || null,
      })) as Goal[],
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to fetch goals",
      data: null,
      success: false,
    };
  }
};

export const fetchUserChallenges = async (userId: string) => {
  try {
    if (!userId) {
      return {
        status: 400,
        message: "Invalid user ID",
        success: false,
        data: null,
      };
    }
    const challenges = await prismaClient.challenge.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return {
      status: 200,
      message: "Challenges fetched successfully",
      data: challenges.map((c) => ({
        id: c.id,
        challenge: c.challenge,
        reward: c.reward,
        status: c.status as "completed" | "in-progress" | "pending",
      })) as Challenge[],
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to fetch challenges",
      data: null,
      success: false,
    };
  }
};
