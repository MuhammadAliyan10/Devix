// CourseCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ExternalLink, Sparkles, Star } from "lucide-react";

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

// Level-based styling for course cards
const levelColors: Record<
  Course["level"],
  { bg: string; text: string; border: string }
> = {
  Beginner: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  Intermediate: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  Advanced: {
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
  },
};

// Skeleton card for loading state
export const SkeletonCard: React.FC<{ index: number }> = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative bg-card rounded-xl border border-border overflow-hidden"
    role="status"
    aria-label="Loading course card"
  >
    <div className="p-6 space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-muted rounded-full animate-pulse w-20" />
        <div className="h-9 bg-muted rounded animate-pulse w-24" />
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
  </motion.div>
);

// Course card component
export const CourseCard: React.FC<{ course: Course; index: number }> = ({
  course,
  index,
}) => {
  const levelStyle = levelColors[course.level];
  const fallbackThumbnail = "https://placehold.co/600x400?text=no+image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      role="article"
      aria-labelledby={`course-title-${course.id}`}
    >
      {/* AI Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium border border-primary/20">
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          AI Generated
        </div>
      </div>

      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail || fallbackThumbnail}
          alt={`${course.courseName} thumbnail`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallbackThumbnail;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Course Content */}
      <div className="relative p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center shadow-sm">
              <BookOpen
                className="w-6 h-6 text-primary-foreground"
                aria-hidden="true"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              id={`course-title-${course.id}`}
              className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 text-lg leading-tight mb-2 truncate"
            >
              {course.courseName}
            </h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}
              aria-label={`Course level: ${course.level}`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
              {course.level}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
          {course.courseDescription}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Self-paced</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <Star
              className="w-3.5 h-3.5 text-yellow-500 fill-current"
              aria-hidden="true"
            />
            <span>{course.rating.toFixed(1)}</span>
          </div>
          <motion.a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            aria-label={`Explore ${course.courseName}`}
          >
            <span>Explore</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};
