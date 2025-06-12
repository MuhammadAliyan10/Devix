"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Star,
  BookOpen,
  Brain,
  Trophy,
  Target,
  GraduationCap,
  Clock,
  Award,
  TrendingUp,
  Play,
  CheckCircle,
} from "lucide-react";
import { useSession } from "@/provider/SessionProvider";
import { getUserCourses } from "../actions";

// Interface for course data (matches database schema)
interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  thumbnail: string | null;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

// Simulated progress data for each course
interface CourseProgress {
  courseId: string;
  completionPercentage: number; // 0-100
  timeSpentMinutes: number;
  lastAccessed: Date;
}

// Milestone interface for courses
interface Milestone {
  id: string;
  title: string;
  type: "course" | "quiz" | "project" | "checkpoint";
  position: number; // 0-100
  completed: boolean;
  icon: React.ReactNode;
}

// User data (minimal, based on SessionProvider)
interface UserData {
  name?: string;
}

// Simulate progress data (replace with backend API later)
const generateMockProgress = (courses: Course[]): CourseProgress[] => {
  return courses.map((course) => ({
    courseId: course.id,
    completionPercentage: 0, // Random 0-100%
    timeSpentMinutes: 0, // Random 0-300 minutes
    lastAccessed: new Date(),
  }));
};

// Generate milestones from courses
const generateMilestones = (
  courses: Course[],
  progressData: CourseProgress[]
): Milestone[] => {
  return courses.map((course, index) => {
    const progress = progressData.find((p) => p.courseId === course.id);
    const position =
      courses.length > 1 ? (index / (courses.length - 1)) * 100 : 50; // Spread evenly
    return {
      id: course.id,
      title: course.courseName,
      type: "course",
      position,
      completed: (progress?.completionPercentage || 0) >= 100,
      icon: <BookOpen className="w-4 h-4" />,
    };
  });
};

type Props = {
  userId: string;
};

const CourseProgressTab: React.FC<Props> = ({ userId }) => {
  const { user } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressData, setProgressData] = useState<CourseProgress[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathControls = useAnimation();

  // Fallback user data
  const userData: UserData = {
    name: user?.name || "Student",
  };

  // Fetch courses and calculate progress
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setError("No user ID provided");
      return;
    }

    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const fetchedCourses = await getUserCourses(userId);
        if (!fetchedCourses.length) {
          setError("No courses found for this user");
        }
        const progress = generateMockProgress(fetchedCourses);
        const courseMilestones = generateMilestones(fetchedCourses, progress);
        const totalProgress =
          progress.reduce((sum, p) => sum + (p.completionPercentage || 0), 0) /
          (progress.length || 1);

        setCourses(fetchedCourses);
        setProgressData(progress);
        setMilestones(courseMilestones);
        setAnimatedProgress(totalProgress);
        setError(null);

        // Animate progress path
        pathControls.start({
          pathLength: totalProgress / 100,
          transition: { duration: 2, ease: "easeInOut" },
        });
      } catch (err) {
        setError("Failed to load courses");
        console.error("Error loading courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [userId, pathControls]);

  // Generate SVG path with more curves
  const generatePath = () => {
    const width = 100;
    const height = 30; // Increased height for more dynamic curves
    const curves = Math.max(4, courses.length + 1); // More curves
    let path = `M 0 ${height / 2}`;

    for (let i = 0; i < curves; i++) {
      const progress = i / curves;
      const x1 = (width / curves) * i + (width / curves) * 0.2;
      const y1 =
        height / 2 + Math.sin(progress * Math.PI * 2) * (height * 0.25);
      const x2 = (width / curves) * i + (width / curves) * 0.8;
      const y2 =
        height / 2 + Math.sin((progress + 0.5) * Math.PI * 2) * (height * 0.25);
      const x3 = (width / curves) * (i + 1);
      const y3 =
        height / 2 +
        Math.sin(((i + 1) / curves) * Math.PI * 2) * (height * 0.25);
      path += ` C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`;
    }
    return path;
  };

  // Map milestone type to icon
  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />;
      case "quiz":
        return <Brain className="w-4 h-4" />;
      case "project":
        return <Target className="w-4 h-4" />;
      case "checkpoint":
        return <Trophy className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  // Get level badge color
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Calculate total time spent
  const totalTimeSpent = progressData.reduce(
    (sum, p) => sum + p.timeSpentMinutes,
    0
  );
  const averageRating =
    courses.reduce((sum, c) => sum + c.rating, 0) / courses.length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background">
        <div className="w-full max-w-6xl mx-auto pt-12 px-4">
          <div className="animate-pulse space-y-8">
            {/* Header skeleton */}
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-muted rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
              <div className="text-right space-y-2">
                <div className="h-8 w-16 bg-muted rounded" />
                <div className="h-4 w-12 bg-muted rounded" />
              </div>
            </div>

            {/* Progress map skeleton */}
            <div className="h-40 bg-muted rounded-xl" />

            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-xl" />
              ))}
            </div>

            {/* Course cards skeleton */}
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !courses.length) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
          role="alert"
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen className="w-12 h-12 text-primary" aria-hidden="true" />
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            No Learning Journey Yet
          </h3>
          <p className="text-muted-foreground text-lg mb-6">
            {error ||
              "Start your learning adventure by exploring courses in the Courses tab."}
          </p>
          <motion.button
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Courses
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/5 border border-border/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative p-8">
            <div className="flex items-center gap-6">
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-primary-foreground" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <TrendingUp className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {userData.name} Learning Journey
                </h1>
                <p className="text-muted-foreground text-lg">
                  Tracking your progress across {courses.length} course
                  {courses.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="text-right">
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {Math.round(animatedProgress)}%
                </motion.div>
                <div className="text-muted-foreground font-medium">
                  Overall Progress
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Progress Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative h-48 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <div className="relative p-8 h-full">
            {/* Progress Path */}
            <svg
              className="absolute inset-0 w-full h-full p-8"
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(99 102 241)"
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="50%"
                    stopColor="rgb(139 92 246)"
                    stopOpacity="1"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(168 85 247)"
                    stopOpacity="0.8"
                  />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background path */}
              <path
                d={generatePath()}
                fill="none"
                stroke="rgb(226 232 240)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-slate-700"
                opacity="0.5"
              />

              {/* Animated progress path */}
              <motion.path
                d={generatePath()}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={pathControls}
              />
            </svg>

            {/* Enhanced Start/End Points */}
            <motion.div
              className="absolute left-8 top-1/2 transform -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-6 h-6 bg-gradient-to-br from-muted to-muted-foreground/20 border-2 border-border rounded-full shadow-md" />
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg px-3 py-1 text-xs font-medium text-popover-foreground shadow-lg">
                  Start
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute right-8 top-1/2 transform -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 border-2 border-white dark:border-gray-900 rounded-full shadow-md" />
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg px-3 py-1 text-xs font-medium text-popover-foreground shadow-lg">
                  Complete
                </div>
              </div>
            </motion.div>

            {/* Enhanced Progress Marker */}
            <motion.div
              className="absolute top-1/2 left-8 transform -translate-y-1/2"
              initial={{ x: "0%" }}
              animate={{ x: `calc(${animatedProgress}% * 0.85)` }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-xl">
                  <Star className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm font-semibold shadow-lg"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  {Math.round(animatedProgress)}% Complete
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Enhanced Milestones */}
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                className="absolute top-1/2 left-8 transform -translate-y-1/2 group"
                style={{ x: `calc(${milestone.position}% * 0.85)` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div
                  className={`w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    milestone.completed ||
                    milestone.position <= animatedProgress
                      ? "bg-gradient-to-br from-green-400 to-green-500 border-white dark:border-gray-900 text-white shadow-lg"
                      : "bg-muted border-border text-muted-foreground hover:bg-muted-foreground/20"
                  }`}
                >
                  {milestone.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    getMilestoneIcon(milestone.type)
                  )}
                </div>
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg px-3 py-2 text-xs font-medium text-popover-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg whitespace-nowrap z-10"
                  initial={{ y: 5 }}
                  whileHover={{ y: 0 }}
                >
                  {milestone.title}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-border" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Trophy className="w-6 h-6" />,
              value: milestones.filter((m) => m.completed).length,
              label: "Completed",
              color: "from-yellow-400 to-orange-500",
              delay: 0.3,
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              value: milestones.length,
              label: "Total Courses",
              color: "from-blue-400 to-blue-600",
              delay: 0.4,
            },
            {
              icon: <Clock className="w-6 h-6" />,
              value: `${Math.floor(totalTimeSpent / 60)}h ${
                totalTimeSpent % 60
              }m`,
              label: "Time Spent",
              color: "from-green-400 to-green-600",
              delay: 0.5,
            },
            {
              icon: <Star className="w-6 h-6" />,
              value: averageRating.toFixed(1),
              label: "Avg Rating",
              color: "from-purple-400 to-purple-600",
              delay: 0.6,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm p-6 group cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div className="relative flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Course Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Award className="w-7 h-7 text-primary" />
            Your Courses
          </h2>

          <div className="grid gap-4">
            {courses.map((course, index) => {
              const progress = progressData.find(
                (p) => p.courseId === course.id
              );
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-card to-card/50 border border-border/50 backdrop-blur-sm p-6 group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {course.courseName}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(
                            course.level
                          )}`}
                        >
                          {course.level}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {course.courseDescription}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(course.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            {course.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {progress?.timeSpentMinutes || 0}m
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {progress?.completionPercentage || 0}%
                      </div>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${progress?.completionPercentage || 0}%`,
                          }}
                          transition={{ delay: 1 + index * 0.1, duration: 1 }}
                        />
                      </div>

                      <motion.button
                        className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-4 h-4" />
                        Continue
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseProgressTab;
