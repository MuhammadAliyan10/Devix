"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Flame,
  TrendingUp,
  Zap,
  BarChart3,
  Medal,
  Target,
  Check,
  Clock,
  X,
  Loader2,
} from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import {
  fetchUserProfileData,
  fetchLeaderboard,
  fetchUserGoals,
  fetchUserChallenges,
} from "../actions";
import { toast } from "sonner";
import { Challenge, Goal, LeaderboardEntry, UserProfile } from "../types";

const RankingTab = ({ userId }: { userId: string }) => {
  const [
    { data: userRes, isLoading: userLoading, error: userError },
    {
      data: leaderboardRes,
      isLoading: leaderboardLoading,
      error: leaderboardError,
    },
    { data: goalsRes, isLoading: goalsLoading, error: goalsError },
    {
      data: challengesRes,
      isLoading: challengesLoading,
      error: challengesError,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["userProfile", userId],
        queryFn: () => fetchUserProfileData(userId),
        staleTime: 300_000,
        enabled: !!userId,
      },
      {
        queryKey: ["leaderboard", userId],
        queryFn: () => fetchLeaderboard(userId),
        staleTime: 300_000,
        enabled: !!userId,
      },
      {
        queryKey: ["userGoals", userId],
        queryFn: () => fetchUserGoals(userId),
        staleTime: 300_000,
        enabled: !!userId,
      },
      {
        queryKey: ["userChallenges", userId],
        queryFn: () => fetchUserChallenges(userId),
        staleTime: 300_000,
        enabled: !!userId,
      },
    ],
  });

  const userData = userRes?.success ? (userRes.data as UserProfile) : null;
  const leaderboard =
    leaderboardRes?.success && Array.isArray(leaderboardRes.data)
      ? (leaderboardRes.data as LeaderboardEntry[])
      : [];
  const goals =
    goalsRes?.success && Array.isArray(goalsRes.data)
      ? (goalsRes.data as Goal[])
      : [];
  const challenges =
    challengesRes?.success && Array.isArray(challengesRes.data)
      ? (challengesRes.data as Challenge[])
      : [];
  const isLoading =
    userLoading || leaderboardLoading || goalsLoading || challengesLoading;

  // Specific error handling
  React.useEffect(() => {
    if (userError) toast.error("Failed to load user profile");
    if (leaderboardError) toast.error("Failed to load leaderboard");
    if (goalsError) toast.error("Failed to load goals");
    if (challengesError) toast.error("Failed to load challenges");
  }, [userError, leaderboardError, goalsError, challengesError]);

  if (isLoading) {
    return (
      <div className="w-full my-10 flex items-center text-primary justify-center">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        <span>Loading rankings...</span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full my-10 flex items-center text-primary justify-center">
        <span>No user data available</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ranking Header */}
      <motion.div
        className="bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-red-500/20 rounded-2xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-bold">Global Ranking</h2>
            </div>
            <p className="text-muted-foreground">
              Your position among all learners
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary">
              #{userData.leaderboardRank}
            </div>
            <div className="text-sm text-muted-foreground">
              Top {Math.round((userData.leaderboardRank / 1000) * 100)}%
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ranking Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Weekly Rank",
            rank: userData.weeklyRank,
            icon: Flame,
            color: "text-orange-500",
            bg: "from-orange-500/20 to-red-500/10",
          },
          {
            title: "Monthly Rank",
            rank: userData.monthlyRank,
            icon: TrendingUp,
            color: "text-blue-500",
            bg: "from-blue-500/20 to-purple-500/10",
          },
          {
            title: "Total Score",
            rank: userData.totalScore,
            icon: Zap,
            color: "text-green-500",
            bg: "from-green-500/20 to-emerald-500/10",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className={`bg-gradient-to-br ${stat.bg} rounded-xl p-6 border border-border/50 cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                // Add interaction if needed
                toast.info(`${stat.title} clicked`);
              }
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold mb-1">
              {stat.title.includes("Score") ? stat.rank : `#${stat.rank}`}
            </div>
            <span className="text-sm text-muted-foreground">{stat.title}</span>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <motion.div
        className="bg-card rounded-xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Achievements
        </h3>
        <div className="space-y-2">
          {userData.badges.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No badges earned yet
            </p>
          ) : (
            userData.badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Medal className="w-3 h-3 text-yellow-500" />
                <span>{badge.badgeName}</span>
                {badge.description && (
                  <span className="text-muted-foreground">
                    - {badge.description}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Leaderboard Preview */}
      <motion.div
        className="bg-card rounded-xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Medal className="w-5 h-5 text-primary" />
          Leaderboard Position
        </h3>
        <div className="space-y-3">
          {leaderboard.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No leaderboard data available
            </p>
          ) : (
            leaderboard.map((entry: LeaderboardEntry) => (
              <div
                key={entry.id}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                  entry.userId === userId
                    ? "bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/30"
                    : "bg-accent/30 hover:bg-accent/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    entry.rank <= 3
                      ? "bg-yellow-500 text-yellow-50"
                      : entry.userId === userId
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {entry.rank}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      entry.userId === userId ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={
                        entry.profileImageUrl ||
                        "https://via.placeholder.com/32"
                      }
                      alt={entry.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <span
                    className={`font-medium ${
                      entry.userId === userId ? "text-primary" : ""
                    }`}
                  >
                    {entry.name} {entry.userId === userId && "(You)"}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Goals and Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-card rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Current Goals
          </h3>
          <div className="space-y-3">
            {goals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No goals set yet</p>
            ) : (
              goals.map((item: Goal) => (
                <div key={item.id} className="p-3 bg-accent/30 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">{item.goal}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.deadline
                        ? new Date(item.deadline).toLocaleDateString()
                        : "No deadline"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-1">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(item.progress * 100, 100)}%`,
                      }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    />
                  </div>
                  <span className="text-xs text-primary">
                    {Math.round(item.progress * 100)}% Complete
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>
        <motion.div
          className="bg-card rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Weekly Challenges
          </h3>
          <div className="space-y-3">
            {challenges.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No challenges available
              </p>
            ) : (
              challenges.map((item: Challenge) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg"
                >
                  <div
                    className={`p-1 rounded-full ${
                      item.status === "completed"
                        ? "bg-green-500"
                        : item.status === "in-progress"
                        ? "bg-yellow-500"
                        : "bg-muted"
                    }`}
                  >
                    {item.status === "completed" ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : item.status === "in-progress" ? (
                      <Clock className="w-3 h-3 text-white" />
                    ) : (
                      <X className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.challenge}</p>
                    <span className="text-xs text-muted-foreground">
                      Reward: {item.reward} points
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RankingTab;
