interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  thumbnail: string;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

interface CoursesResponse {
  courses: {
    courses: Course[];
  };
}

export async function fetchUserCourses(userId: string): Promise<Course[]> {
  try {
    const response = await fetch(
      `http://localhost:5001/api/user/${userId}/courses`,
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

    // Extract courses from nested structure
    return data.courses?.courses || [];
  } catch (error) {
    console.error("Error fetching user courses:", error);
    throw new Error("Failed to load courses. Please try again later.");
  }
}

// Client-side utility functions for localStorage management
export const courseStorageUtils = {
  // Store course generation timestamp
  setCoursesGenerated: (userId: string) => {
    if (typeof window !== "undefined") {
      const timestamp = Date.now();
      localStorage.setItem(`courses_generated_${userId}`, timestamp.toString());
    }
  },

  // Check if courses were generated and if a month has passed
  shouldShowGenerateButton: (userId: string): boolean => {
    if (typeof window === "undefined") return true;

    const timestamp = localStorage.getItem(`courses_generated_${userId}`);
    if (!timestamp) return true;

    const generatedTime = parseInt(timestamp);
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; // 30 days
    const currentTime = Date.now();

    return currentTime - generatedTime > oneMonthInMs;
  },

  // Clear course generation record (for testing or manual reset)
  clearCoursesRecord: (userId: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`courses_generated_${userId}`);
    }
  },

  // Get time until next generation allowed
  getTimeUntilNextGeneration: (userId: string): string => {
    if (typeof window === "undefined") return "";

    const timestamp = localStorage.getItem(`courses_generated_${userId}`);
    if (!timestamp) return "";

    const generatedTime = parseInt(timestamp);
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const currentTime = Date.now();
    const timeLeft = generatedTime + oneMonthInMs - currentTime;

    if (timeLeft <= 0) return "";

    const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));
    return `${daysLeft} days`;
  },
};
