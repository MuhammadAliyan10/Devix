"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Award,
  BookOpen,
  Trophy,
  Target,
  GraduationCap,
  Clock,
  TrendingUp,
  ChevronRight,
  Medal,
  GitBranch,
  Code,
  Globe,
  Edit3,
  Camera,
  Plus,
  Check,
  X,
  Loader2,
  Activity,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfileData, updateUserProfile } from "../actions";
import { toast } from "sonner";
import { UserProfile } from "../types";

const ProfileTab = ({ userId }: { userId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    major: "",
    institution: "",
    currentSemester: "",
    timeAvailabilityHours: "",
  });
  const queryClient = useQueryClient();

  const {
    data: userRes,
    isLoading,
    isError,
  } = useQuery<UserProfile>({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfileData(userId),
    staleTime: 300_000, // 5 minutes
    enabled: !!userId,
    onSuccess: (res) => {
      if (res.success && res.data) {
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          major: res.data.major || "",
          institution: res.data.institution || "",
          currentSemester: res.data.currentSemester?.toString() || "",
          timeAvailabilityHours:
            res.data.timeAvailabilityHours?.toString() || "",
        });
      }
    },
    onError: () => {
      toast.error("Failed to load user data");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (input: {
      name: string;
      email: string;
      major: string | null;
      institution: string | null;
      currentSemester: number | null;
      timeAvailabilityHours: number | null;
    }) => updateUserProfile(userId, input),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        queryClient.setQueryData(["userProfile", userId], res);
      } else {
        toast.error(res.message);
      }
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;
    updateMutation.mutate({
      name: formData.name,
      email: formData.email,
      major: formData.major || null,
      institution: formData.institution || null,
      currentSemester: formData.currentSemester
        ? parseInt(formData.currentSemester)
        : null,
      timeAvailabilityHours: formData.timeAvailabilityHours
        ? parseInt(formData.timeAvailabilityHours)
        : null,
    });
  };

  const userData = userRes?.success ? (userRes.data as UserProfile) : null;

  if (isLoading) {
    return (
      <div className="w-full my-10 flex items-center text-primary justify-center">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!userData || isError) {
    return (
      <div className="w-full my-10 flex items-center text-primary justify-center">
        <span>No user data available</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-2xl p-6 border border-border/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-6">
          <div className="relative">
            <img
              src={userData.profileImageUrl || "/user.png"}
              alt={userData.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/20"
            />
            <button
              aria-label="Change Profile Picture"
              className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-transform"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-2 rounded-lg border border-border bg-background text-foreground"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 rounded-lg border border-border bg-background text-foreground"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="major" className="text-sm font-medium">
                    Major
                  </label>
                  <input
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="p-2 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="institution" className="text-sm font-medium">
                    Institution
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="p-2 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="currentSemester"
                    className="text-sm font-medium"
                  >
                    Current Semester
                  </label>
                  <input
                    id="currentSemester"
                    name="currentSemester"
                    type="number"
                    value={formData.currentSemester}
                    onChange={handleInputChange}
                    className="p-2 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="timeAvailabilityHours"
                    className="text-sm font-medium"
                  >
                    Study Hours/Week
                  </label>
                  <input
                    id="timeAvailabilityHours"
                    name="timeAvailabilityHours"
                    type="number"
                    value={formData.timeAvailabilityHours}
                    onChange={handleInputChange}
                    className="p-2 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl px-4 py-2 border border-border bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors duration-200 hover:scale-105 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2 border border-border bg-accent/10 text-accent font-medium hover:bg-accent/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {userData.name}
                  </h2>
                  <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                    {userData.subscriptionStatus}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span>{userData.major || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{userData.institution || "Not specified"}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            aria-label={isEditing ? "Cancel Editing" : "Edit Profile"}
            className="p-2 hover:bg-background/50 rounded-lg transition-colors"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Current Semester",
            value: userData.currentSemester || "N/A",
            icon: BookOpen,
            color: "text-blue-500",
          },
          {
            label: "Experience Level",
            value: userData.userExperience || "N/A",
            icon: TrendingUp,
            color: "text-green-500",
          },
          {
            label: "Study Hours/Week",
            value: userData.timeAvailabilityHours
              ? `${userData.timeAvailabilityHours}h`
              : "N/A",
            icon: Clock,
            color: "text-orange-500",
          },
          {
            label: "Learning Style",
            value: userData.preferredLearningStyle || "N/A",
            icon: Activity,
            color: "text-purple-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
            <p className="text-lg font-semibold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Skills Section */}
      <motion.div
        className="bg-card rounded-xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Skills & Expertise
          </h3>
          <button
            aria-label="Add Skill"
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userData.skills.length === 0 ? (
            <p className="text-muted-foreground text-sm">No Skills</p>
          ) : (
            userData.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
              >
                <span className="font-medium">{skill.skillName}</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          (skill.proficiency === "Advanced" && level <= 3) ||
                          (skill.proficiency === "Intermediate" &&
                            level <= 2) ||
                          (skill.proficiency === "Beginner" && level <= 1)
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {skill.proficiency}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Career Goals & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Goals */}
        <motion.div
          className="bg-card rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            Career Goals
          </h3>
          <div className="space-y-3">
            {userData.careerGoals.length === 0 ? (
              <p className="text-muted-foreground text-sm">No Goals</p>
            ) : (
              userData.careerGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center gap-2 p-2 bg-accent/20 rounded-lg"
                >
                  <ChevronRight className="w-4 h-4 text-primary" />
                  <span className="text-sm">{goal.goal}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          className="bg-card rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <GitBranch className="w-5 h-5 text-primary" />
            Projects
          </h3>
          <div className="space-y-3">
            {userData.projects.length === 0 ? (
              <p className="text-muted-foreground text-sm">No Projects</p>
            ) : (
              userData.projects.map((project) => (
                <div key={project.id} className="p-3 bg-accent/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{project.title}</span>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        project.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </div>
                  </div>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      View on GitHub
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Certifications & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-card rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            Certifications
          </h3>
          <div className="space-y-3">
            {userData.certifications.length === 0 ? (
              <p className="text-muted-foreground text-sm">No Certifications</p>
            ) : (
              userData.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20"
                >
                  <h4 className="font-medium">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-primary" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {userData.badges.length === 0 ? (
              <p className="text-muted-foreground text-sm">No Achievements</p>
            ) : (
              userData.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-accent/30 to-secondary/20 rounded-lg"
                >
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Medal className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{badge.badgeName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {badge.description}
                    </p>
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

export default ProfileTab;
