import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Sparkles,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Course } from "@/app/(protectedRoutes)/learning/courses/type";
import { useSession } from "@/provider/SessionProvider";
import { fetchUserCourses } from "@/app/(protectedRoutes)/learning/courses/actions";
import { CourseCard, courseStorageUtils, SkeletonCard } from "./CourseCard";

const CoursesComponent = () => {
  const { user, session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const [timeUntilNext, setTimeUntilNext] = useState<string>("");

  const userId = user?.id;

  // Check localStorage on component mount
  useEffect(() => {
    if (userId) {
      const shouldShow = courseStorageUtils.shouldShowGenerateButton(userId);
      setShowGenerateButton(shouldShow);

      if (!shouldShow) {
        const timeLeft = courseStorageUtils.getTimeUntilNextGeneration(userId);
        setTimeUntilNext(timeLeft);
        // Load existing courses
        handleGenerateCourses();
      }
    }
  }, [userId]);

  const handleGenerateCourses = async () => {
    if (!userId) {
      setError("Please sign in to generate courses");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedCourses = await fetchUserCourses(userId);
      setCourses(fetchedCourses);

      // Store timestamp in localStorage
      courseStorageUtils.setCoursesGenerated(userId);
      setShowGenerateButton(false);

      // Update time until next generation
      const timeLeft = courseStorageUtils.getTimeUntilNextGeneration(userId);
      setTimeUntilNext(timeLeft);
    } catch (err) {
      setError("Failed to load courses. Please try again later.");
      console.error("Error generating courses:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
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
      {showGenerateButton ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.button
            onClick={handleGenerateCourses}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-4 rounded-xl text-md font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {loading ? "Generating Your Courses..." : "Generate AI Courses"}
          </motion.button>
          <p className="text-sm text-muted-foreground mt-3">
            Get personalized course recommendations based on your profile
          </p>
        </motion.div>
      ) : (
        timeUntilNext && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-sm">
              <Clock className="w-4 h-4" />
              Next course generation available in {timeUntilNext}
            </div>
          </motion.div>
        )
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        </motion.div>
      )}

      {/* Courses Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
          >
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        ) : !showGenerateButton && !loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground">
              Click the generate button to create your personalized learning
              path.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default CoursesComponent;
