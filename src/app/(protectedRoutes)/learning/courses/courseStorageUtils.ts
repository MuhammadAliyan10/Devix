interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  thumbnail: string | null;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

export const courseStorageUtils = {
  setCoursesGenerated: (userId: string, courses: Course[]): void => {
    if (typeof window === "undefined" || !userId) return;
    localStorage.setItem(`courses_generated_${userId}`, Date.now().toString());
    localStorage.setItem(`courses_data_${userId}`, JSON.stringify(courses));
  },

  getCachedCourses: (userId: string): Course[] => {
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
  },

  isCacheExpired: (userId: string): boolean => {
    if (typeof window === "undefined" || !userId) return true;
    const timestamp = localStorage.getItem(`courses_generated_${userId}`);
    if (!timestamp) return true;

    const generatedTime = parseInt(timestamp, 10);
    if (isNaN(generatedTime)) return true;

    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; // 30 days
    return Date.now() - generatedTime > oneMonthInMs;
  },

  shouldShowGenerateButton: (userId: string): boolean => {
    if (typeof window === "undefined" || !userId) return true;
    return courseStorageUtils.isCacheExpired(userId);
  },

  clearCoursesRecord: (userId: string): void => {
    if (typeof window === "undefined" || !userId) return;
    localStorage.removeItem(`courses_generated_${userId}`);
    localStorage.removeItem(`courses_data_${userId}`);
  },

  getTimeUntilGeneration: (userId: string): string => {
    if (typeof window === "undefined" || !userId) return "";
    const timestamp = localStorage.getItem(`courses_generated_${userId}`);
    if (!timestamp) return "";

    const generatedTime = parseInt(timestamp, 10);
    if (isNaN(generatedTime)) return "";

    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const timeLeft = generatedTime + oneMonthInMs - Date.now();

    if (timeLeft <= 0) return "";
    const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));
    return `${daysLeft} day${daysLeft !== 1 ? "s" : ""}`;
  },
};
