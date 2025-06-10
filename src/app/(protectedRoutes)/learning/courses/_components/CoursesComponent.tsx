import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Clock,
  RefreshCw,
  Sparkles,
  RotateCw,
  BookOpen,
} from "lucide-react";
import { useSession } from "@/provider/SessionProvider";
import { CourseCard, SkeletonCard } from "./CourseCard";
import { courseStorageUtils } from "../courseStorageUtils";

// Interface for course data
interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  thumbnail: string | null;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

// Interface for API response
interface CoursesResponse {
  user_id?: string;
  error?: string;
  courses: { courses: Course[] } | null;
}

// Fetch courses from API with retry logic
async function fetchUserCourses(
  userId: string,
  retries = 2
): Promise<Course[]> {
  if (!userId) {
    throw new Error("Invalid user ID");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const response = await fetch(`${apiUrl}/api/user/${userId}/courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("session_token") || ""
          }`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error ||
          `HTTP error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data: CoursesResponse = await response.json();

      if (
        data.error ||
        !data.courses?.courses ||
        !Array.isArray(data.courses.courses)
      ) {
        throw new Error(data.error || "Invalid response format");
      }

      const validCourses = data.courses.courses.filter(
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

      if (validCourses.length === 0 && data.error) {
        throw new Error(data.error);
      }

      return validCourses;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");
      console.error(`Attempt ${attempt} failed:`, lastError);
      if (attempt <= retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  throw lastError || new Error("Failed to load courses after retries.");
}

const CoursesComponent: React.FC = () => {
  const { user, session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const [timeUntilNext, setTimeUntilNext] = useState<string>("");

  const userId = user?.id;

  // Initialize component state based on localStorage
  useEffect(() => {
    if (!userId || !session) return;

    const cachedCourses = courseStorageUtils.getCachedCourses(userId);
    const isCacheExpired = courseStorageUtils.isCacheExpired(userId);
    const shouldShow = courseStorageUtils.shouldShowGenerateButton(userId);

    setShowGenerateButton(shouldShow);
    setTimeUntilNext(courseStorageUtils.getTimeUntilGeneration(userId));

    if (cachedCourses.length > 0 && !isCacheExpired) {
      setCourses(cachedCourses);
    } else if (shouldShow) {
      handleGenerateCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, session]);

  // Fetch and handle course generation
  const handleGenerateCourses = async (forceRefresh = false) => {
    if (!userId || !session) {
      setError("Please sign in to generate courses");
      return;
    }

    // Skip API call if valid cache exists and no force refresh
    if (!forceRefresh) {
      const cachedCourses = courseStorageUtils.getCachedCourses(userId);
      if (
        cachedCourses.length > 0 &&
        !courseStorageUtils.isCacheExpired(userId)
      ) {
        setCourses(cachedCourses);
        setShowGenerateButton(false);
        setTimeUntilNext(courseStorageUtils.getTimeUntilGeneration(userId));
        setError(null);
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedCourses = await fetchUserCourses(userId);
      if (fetchedCourses.length > 0) {
        setCourses(fetchedCourses);
        courseStorageUtils.setCoursesGenerated(userId, fetchedCourses);
        setShowGenerateButton(false);
        setTimeUntilNext(courseStorageUtils.getTimeUntilGeneration(userId));
      } else {
        setError("No courses found. Please try again.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message === "User not found"
            ? "User profile not found. Please complete your profile."
            : err.message === "Failed to generate courses"
            ? "Unable to generate courses at this time. Please try again later."
            : err.message
          : "Failed to load courses.";
      setError(errorMessage);
      console.error("Error generating courses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user-initiated refresh
  const handleRefreshCourses = () => {
    courseStorageUtils.clearCoursesRecord(userId!);
    setShowGenerateButton(true);
    setTimeUntilNext("");
    handleGenerateCourses(true);
  };

  // Render sign-in prompt if no session
  if (!session || !userId) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
          role="alert"
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle
              className="w-8 h-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sign In Required
          </h3>
          <p className="text-muted-foreground">
            Please sign in to access your personalized AI-generated courses.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Generate Button or Time Left Info */}
      <div className="text-center mb-8">
        {showGenerateButton ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={() => handleGenerateCourses()}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-4 rounded-xl text-md font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Generate personalized courses"
            >
              {isLoading ? (
                <RefreshCw
                  className="w-5 h-5 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              )}
              {isLoading ? "Generating Your Courses..." : "Generate AI Courses"}
            </motion.button>
            <p className="text-sm text-muted-foreground mt-3">
              Get personalized course recommendations based on your profile
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-sm">
              <Clock className="w-4 h-4" aria-hidden="true" />
              Next course generation available in {timeUntilNext}
            </div>
            <motion.button
              onClick={handleRefreshCourses}
              disabled={true}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Refresh courses"
            >
              <RotateCw className="w-4 h-4" aria-hidden="true" />
              Refresh Courses
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
          role="alert"
        >
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        </motion.div>
      )}

      {/* Courses Grid */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-live="polite"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} index={index} />
            ))}
          </motion.div>
        ) : courses.length > 0 ? (
          <motion.div
            key="courses"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-live="polite"
          >
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-courses"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
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
              Click the generate button to create your personalized learning
              path.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesComponent;
