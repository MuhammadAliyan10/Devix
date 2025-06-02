"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserRound,
  Users,
  Heart,
  MessageCircle,
  Share2,
  BarChart3,
  X,
  Loader2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfileData, followUser, unfollowUser } from "../actions";
import { toast } from "sonner";
import { useSession } from "@/provider/SessionProvider";
import { UserProfile } from "../types";

interface ActionResponse {
  success: boolean;
  message?: string;
}

interface QueryData {
  success: boolean;
  data?: UserProfile;
  message?: string;
}

interface CurrentUser {
  id: string;
  name: string;
}

const SocialProfileTab = ({ userId }: { userId: string }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const { user: currentUser } = useSession() as { user: CurrentUser | null };
  const queryClient = useQueryClient();
  const followersModalRef = useRef<HTMLDivElement>(null);
  const followingModalRef = useRef<HTMLDivElement>(null);

  const {
    data: userRes,
    isLoading,
    isError,
    error,
  } = useQuery<QueryData>({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfileData(userId),
    staleTime: 300_000,
    enabled: !!userId,
    retry: 2,
  });

  const followMutation = useMutation<ActionResponse>({
    mutationFn: () => {
      if (!currentUser?.id) throw new Error("User not logged in");
      return followUser(currentUser.id, userId);
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Followed user");
        setIsFollowing(true);
        queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
      } else {
        toast.error(res.message || "Failed to follow user");
      }
    },
    onError: () => toast.error("Failed to follow user"),
  });

  const unfollowMutation = useMutation<ActionResponse>({
    mutationFn: () => {
      if (!currentUser?.id) throw new Error("User not logged in");
      return unfollowUser(currentUser.id, userId);
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Unfollowed user");
        setIsFollowing(false);
        queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
      } else {
        toast.error(res.message || "Failed to unfollow user");
      }
    },
    onError: () => toast.error("Failed to unfollow user"),
  });

  const userData = userRes?.success ? userRes.data : null;

  useEffect(() => {
    if (userData && currentUser?.id) {
      setIsFollowing(userData.followers.some((f) => f.id === currentUser.id));
    }
  }, [userData, currentUser?.id]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Failed to load user data");
    }
  }, [isError, error]);

  // Focus management for modals
  useEffect(() => {
    if (showFollowers && followersModalRef.current) {
      followersModalRef.current.focus();
    }
    if (showFollowing && followingModalRef.current) {
      followingModalRef.current.focus();
    }
  }, [showFollowers, showFollowing]);

  const handleFollowToggle = () => {
    if (!currentUser?.id) {
      toast.error("Please log in to follow users");
      return;
    }
    // isFollowing ? unfollowMutation.mutate() : followMutation.mutate();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (e.key === "Escape") {
      setShow(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full my-10 flex items-center text-primary justify-center">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        <span>Loading...</span>
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="w-full my-10 flex items-center text-primary justify-center">
        <span>No user data available</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Social Header */}
      <motion.div
        className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-2xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={userData.profileImageUrl || "/user.png"}
              alt={userData.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/30"
            />
            <div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground">
                {userData.major || "Student"} Student
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleFollowToggle}
              disabled={
                currentUser?.id === userData.id ||
                followMutation.isPending ||
                unfollowMutation.isPending
              }
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isFollowing
                  ? "bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              } disabled:opacity-50`}
              aria-label={isFollowing ? "Unfollow user" : "Follow user"}
            >
              {followMutation.isPending || unfollowMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isFollowing ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </button>
            <button
              className="p-2 hover:bg-background/50 rounded-lg transition-colors"
              aria-label="Send message"
              onClick={() => toast.info("Message functionality coming soon!")}
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-background/50 rounded-lg transition-colors"
              aria-label="Share profile"
              onClick={() => toast.info("Share functionality coming soon!")}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Social Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Followers",
            value: userData.followers.length,
            icon: Users,
            color: "text-blue-500",
            onClick: () => setShowFollowers(true),
          },
          {
            label: "Following",
            value: userData.following.length,
            icon: Heart,
            color: "text-red-500",
            onClick: () => setShowFollowing(true),
          },
          {
            label: "Mutual",
            value: userData.mutualConnections,
            icon: Users,
            color: "text-green-500",
            onClick: () => {},
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-xl p-4 border border-border/50 text-center hover:border-primary/30 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={stat.onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") stat.onClick();
            }}
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Followers Modal */}
      <AnimatePresence>
        {showFollowers && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={(e) => handleKeyDown(e, setShowFollowers)}
          >
            <motion.div
              ref={followersModalRef}
              className="bg-card rounded-xl p-6 border border-border/50 max-w-md w-full max-h-[80vh] overflow-y-auto focus:outline-none"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              tabIndex={-1}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Followers</h3>
                <button
                  onClick={() => setShowFollowers(false)}
                  className="p-2 hover:bg-accent rounded-lg"
                  aria-label="Close followers modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {userData.followers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No followers yet
                  </p>
                ) : (
                  userData.followers.map((follower) => (
                    <div
                      key={follower.id}
                      className="flex items-center gap-3 p-2 bg-accent/20 rounded-lg"
                    >
                      <UserRound className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{follower.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {follower.id}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Following Modal */}
      <AnimatePresence>
        {showFollowing && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={(e) => handleKeyDown(e, setShowFollowing)}
          >
            <motion.div
              ref={followingModalRef}
              className="bg-card rounded-xl p-6 border border-border/50 max-w-md w-full max-h-[80vh] overflow-y-auto focus:outline-none"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              tabIndex={-1}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Following</h3>
                <button
                  onClick={() => setShowFollowing(false)}
                  className="p-2 hover:bg-accent rounded-lg"
                  aria-label="Close following modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {userData.following.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Not following anyone yet
                  </p>
                ) : (
                  userData.following.map((following) => (
                    <div
                      key={following.id}
                      className="flex items-center gap-3 p-2 bg-accent/20 rounded-lg"
                    >
                      <UserRound className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{following.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {following.id}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learning Progress Showcase */}
      <motion.div
        className="bg-card rounded-xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Learning Journey
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userData.skills.length === 0 ? (
            <p className="text-sm text-muted-foreground">No skills listed</p>
          ) : (
            userData.skills.map((skill, index) => (
              <div key={skill.id} className="p-4 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{skill.skillName}</span>
                  <span className="text-sm text-primary">
                    {Math.round(
                      skill.proficiency === "Advanced"
                        ? 85
                        : skill.proficiency === "Intermediate"
                        ? 60
                        : 30
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        skill.proficiency === "Advanced"
                          ? 85
                          : skill.proficiency === "Intermediate"
                          ? 60
                          : 30
                      }%`,
                    }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {skill.proficiency}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SocialProfileTab;
