import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, BookOpen, RefreshCw, Sparkles } from "lucide-react";
import { useSession } from "@/provider/SessionProvider";
import { CourseCard, SkeletonCard } from "./CourseCard";
import { fetchAndStoreUserCourses, getUserCourses } from "../actions";

interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  thumbnail: string | null;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

const CoursesComponent: React.FC = () => {
  const { user, session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id;

  useEffect(() => {
    if (!userId || !session) return;

    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const dbCourses = await getUserCourses(userId);
        setCourses(dbCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
        setError("Failed to load courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [userId, session]);

  const handleGenerateCourses = async () => {
    if (!userId || !session) {
      setError("Please sign in to generate courses");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedCourses = await fetchAndStoreUserCourses(userId);
      setCourses(fetchedCourses);
      if (fetchedCourses.length === 0) {
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
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={handleGenerateCourses}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-4 rounded-xl text-md font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Generate personalized courses"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            )}
            {isLoading ? "Generating Your Courses..." : "Generate AI Courses"}
          </motion.button>
          <p className="text-sm text-muted-foreground mt-3">
            Get personalized course recommendations based on your profile
          </p>
        </motion.div>
      </div>

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
