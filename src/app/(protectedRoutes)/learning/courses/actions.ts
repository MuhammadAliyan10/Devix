"use server";
import { prismaClient } from "@/lib/prismaClient";
import { DifficultyLevel } from "@prisma/client";

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
  courses: Course[] | null;
}

export async function fetchAndStoreUserCourses(
  userId: string
): Promise<Course[]> {
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
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch courses: ${response.status} ${response.statusText}`
      );
    }

    const data: CoursesResponse = await response.json();

    if (!data?.courses || !Array.isArray(data.courses)) {
      return [];
    }

    const validCourses = data.courses.filter(
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

    // Clear existing courses for the user
    await prismaClient.course.deleteMany({
      where: { userId },
    });

    // Store new courses in database
    await prismaClient.course.createMany({
      data: validCourses.map((course) => ({
        id: course.id,
        userId,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        url: course.url,
        level: course.level.toUpperCase() as DifficultyLevel,
        rating: course.rating,
      })),
    });

    return validCourses;
  } catch (error) {
    console.error("Error fetching and storing user courses:", error);
    throw new Error("Failed to load courses. Please try again later.");
  }
}

export async function getUserCourses(userId: string): Promise<Course[]> {
  if (!userId) return [];

  try {
    const userCourses = await prismaClient.course.findMany({
      where: { userId },
      select: {
        id: true,
        courseName: true,
        courseDescription: true,
        thumbnail: true,
        url: true,
        level: true,
        rating: true,
      },
    });

    return userCourses
      .map((course) => ({
        ...course,
        level:
          course.level === "BEGINNER"
            ? "Beginner"
            : course.level === "INTERMEDIATE"
            ? "Intermediate"
            : "Advanced",
      }))
      .filter(
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
    console.error("Error fetching user courses from database:", error);
    return [];
  }
}
