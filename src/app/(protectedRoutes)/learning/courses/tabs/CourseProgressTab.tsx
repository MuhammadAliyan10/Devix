import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Star,
  BookOpen,
  Brain,
  Trophy,
  Target,
  GraduationCap,
} from "lucide-react";
import { useSession } from "@/provider/SessionProvider";

// Interface for course data (matches courseStorageUtils)
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

// Fetch courses from localStorage
const getCachedCourses = (userId: string): Course[] => {
  if (typeof window === "undefined" || !userId) return [];
  const coursesData = localStorage.getItem(`courses_data_${userId}`);
  if (!coursesData) return [];

  try {
    const parsedCourses: Course[] = JSON.parse(coursesData);
    if (!Array.isArray(parsedCourses)) return [];

    return parsedCourses.filter(
      (course): course is Course =>
        course &&
        typeof course.id === "string" &&
        typeof course.courseName === "string" &&
        typeof course.courseDescription === "string" &&
        (typeof course.thumbnail === "string" || course.thumbnail === null) &&
        typeof course.url === "string" &&
        ["Beginner", "Intermediate", "Advanced"].includes(course.level) &&
        typeof course.rating === "number" &&
        course.rating >= 0 &&
        course.rating <= 5
    );
  } catch (error) {
    console.error("Error parsing cached courses:", error);
    localStorage.removeItem(`courses_data_${userId}`);
    return [];
  }
};

// Simulate progress data (replace with backend API)
const generateMockProgress = (courses: Course[]): CourseProgress[] => {
  return courses.map((course) => ({
    courseId: course.id,
    completionPercentage: Math.floor(Math.random() * 100), // Random 0-100%
    timeSpentMinutes: Math.floor(Math.random() * 300), // Random 0-300 minutes
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
  const pathControls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  // Fallback user data
  const userData: UserData = {
    name: user?.name || "Student",
  };
  console.log(progressData);

  // Fetch courses and calculate progress
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const cachedCourses = getCachedCourses(userId);
    const progress = generateMockProgress(cachedCourses);
    const courseMilestones = generateMilestones(cachedCourses, progress);
    const totalProgress =
      progress.reduce((sum, p) => sum + (p.completionPercentage || 0), 0) /
      (progress.length || 1);

    setCourses(cachedCourses);
    setProgressData(progress);
    setMilestones(courseMilestones);
    setAnimatedProgress(totalProgress);
    setIsLoading(false);

    // Animate progress path
    pathControls.start({
      pathLength: totalProgress / 100,
      transition: { duration: 2, ease: "easeInOut" },
    });
  }, [userId, pathControls]);

  // Generate SVG path
  const generatePath = () => {
    const width = 100;
    const height = 20;
    const curves = Math.max(3, courses.length); // Adjust curves based on courses
    let path = `M 0 ${height / 2}`;
    for (let i = 0; i < curves; i++) {
      const x1 = (width / curves) * i + (width / curves) * 0.25;
      const y1 = i % 2 === 0 ? height * 0.2 : height * 0.8;
      const x2 = (width / curves) * i + (width / curves) * 0.75;
      const y2 = i % 2 === 0 ? height * 0.8 : height * 0.2;
      const x3 = (width / curves) * (i + 1);
      const y3 = height / 2;
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

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background">
        <div className="w-full max-w-4xl mx-auto pt-12 animate-pulse space-y-6">
          <div className="h-6 bg-muted rounded w-1/3 mx-auto" />
          <div className="h-32 bg-muted rounded" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
          role="alert"
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen
              className="w-8 h-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Courses Found
          </h3>
          <p className="text-muted-foreground">
            Generate courses in the Courses tab to track your progress.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-background py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl space-y-8"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border-2 border-primary">
              <GraduationCap
                className="w-6 h-6 text-primary"
                aria-hidden="true"
              />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <BookOpen className="w-2 h-2 text-primary-foreground" />
            </motion.div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">
              {userData.name} Course Journey
            </h3>
            <p className="text-muted-foreground">
              Track your learning progress
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {Math.round(animatedProgress)}%
            </div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>

        {/* Progress Map */}
        <div className="relative h-32">
          {/* Background Path */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 20"
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
                <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="1" />
                <stop
                  offset="100%"
                  stopColor="rgb(139 92 246)"
                  stopOpacity="1"
                />
              </linearGradient>
            </defs>

            <path
              d={generatePath()}
              fill="none"
              stroke="rgb(226 232 240)"
              strokeWidth="0.75"
              className="dark:stroke-slate-700"
            />

            <motion.path
              d={generatePath()}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={pathControls}
              style={{ filter: "drop-shadow(0 0 8px rgb(99 102 241 / 0.4))" }}
            />
          </svg>

          {/* Start Point */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-4 h-4 bg-muted border-2 border-border rounded-full"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
              Start
            </div>
          </motion.div>

          {/* End Point */}
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-4 h-4 bg-primary border-2 border-primary-foreground rounded-full"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
              Complete
            </div>
          </motion.div>

          {/* Progress Marker (Star Icon) */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            initial={{ x: "0%" }}
            animate={{ x: `${animatedProgress}%` }}
            style={{ left: "0%" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -4, 0], rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-primary-foreground shadow-lg">
                <Star className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg px-2 py-1 text-xs text-popover-foreground whitespace-nowrap shadow-md">
                {Math.round(animatedProgress)}% Complete
              </div>
            </motion.div>
          </motion.div>

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 group"
              style={{ left: `${milestone.position}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  milestone.completed || milestone.position <= animatedProgress
                    ? "bg-primary border-primary-foreground text-primary-foreground shadow-lg"
                    : "bg-muted border-border text-muted-foreground"
                }`}
              >
                {getMilestoneIcon(milestone.type)}
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg px-2 py-1 text-xs text-popover-foreground whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {milestone.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="text-center p-3 bg-muted/50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="text-lg font-semibold text-foreground">
              {milestones.filter((m) => m.completed).length}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </motion.div>
          <motion.div
            className="text-center p-3 bg-muted/50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="text-lg font-semibold text-foreground">
              {milestones.length}
            </div>
            <div className="text-xs text-muted-foreground">Total Courses</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseProgressTab;
