interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  thumbnail: string | null;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

interface CoursesResponse {
  courses: {
    courses: Course[];
  } | null;
}

export async function fetchUserCourses(userId: string): Promise<Course[]> {
  if (!userId) {
    throw new Error("Invalid user ID");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/courses`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch courses: ${response.status} ${response.statusText}`
      );
    }

    const data: CoursesResponse = await response.json();

    // Validate response structure
    if (!data?.courses?.courses || !Array.isArray(data.courses.courses)) {
      return [];
    }

    // Validate each course object
    const validCourses = data.courses.courses.filter(
      (course): course is Course =>
        course &&
        typeof course.id === "string" &&
        typeof course.courseName === "string" &&
        (typeof course.courseDescription === "string" ||
          course.courseDescription === null) &&
        (typeof course.thumbnail === "string" || course.thumbnail === null) &&
        typeof course.url === "string" &&
        ["Beginner", "Intermediate", "Advanced"].includes(course.level) &&
        typeof course.rating === "number" &&
        course.rating >= 0 &&
        course.rating <= 5
    );

    return validCourses;
  } catch (error) {
    console.error("Error fetching user courses:", error);
    throw new Error("Failed to load courses. Please try again later.");
  }
}

export const courseStorageUtils = {
  setCoursesGenerated: (userId: string): void => {
    if (typeof window === "undefined" || !userId) return;
    localStorage.setItem(`courses_generated_${userId}`, Date.now().toString());
  },

  shouldShowGenerateButton: (userId: string): boolean => {
    if (typeof window === "undefined" || !userId) return true;

    const timestamp = localStorage.getItem(`courses_generated_${userId}`);
    if (!timestamp) return true;

    const generatedTime = parseInt(timestamp, 10);
    if (isNaN(generatedTime)) return true;

    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; // 30 days
    return Date.now() - generatedTime > oneMonthInMs;
  },

  clearCoursesRecord: (userId: string): void => {
    if (typeof window === "undefined" || !userId) return;
    localStorage.removeItem(`courses_generated_${userId}`);
  },

  getTimeUntilNextGeneration: (userId: string): string => {
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
