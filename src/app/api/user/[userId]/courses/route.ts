import { NextRequest, NextResponse } from "next/server";
import { DifficultyLevel } from "@prisma/client";
import { prismaClient } from "@/lib/prismaClient";

interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  thumbnail: string | null;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced"; // Client-facing string type
  rating: number;
}

// Map string level to DifficultyLevel enum
const mapLevelToEnum = (level: string): DifficultyLevel => {
  switch (level) {
    case "Beginner":
      return DifficultyLevel.BEGINNER;
    case "Intermediate":
      return DifficultyLevel.INTERMEDIATE;
    case "Advanced":
      return DifficultyLevel.ADVANCED;
    default:
      throw new Error(`Invalid level: ${level}`);
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const courses = await prismaClient.course.findMany({
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

    const validCourses: Course[] = courses
      .map((course) => ({
        id: course.id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        url: course.url,
        level: course.level as "Beginner" | "Intermediate" | "Advanced", // Map enum to string
        rating: course.rating,
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

    return NextResponse.json({ courses: validCourses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return NextResponse.json(
      { error: "Failed to load courses. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const generatedCourses: Course[] = body.courses;

    if (!Array.isArray(generatedCourses) || generatedCourses.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty courses data" },
        { status: 400 }
      );
    }

    // Validate courses
    const validCourses = generatedCourses.filter(
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

    if (validCourses.length !== generatedCourses.length) {
      return NextResponse.json(
        { error: "Some courses have invalid data" },
        { status: 400 }
      );
    }

    // Clear existing courses
    await prismaClient.course.deleteMany({ where: { userId } });

    // Save new courses
    await prismaClient.course.createMany({
      data: validCourses.map((course) => ({
        id: course.id,
        userId,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        url: course.url,
        level: mapLevelToEnum(course.level), // Convert string to enum
        rating: course.rating,
      })),
      skipDuplicates: true,
    });

    // Update lastCourseGeneratedAt
    await prismaClient.user.update({
      where: { id: userId },
      data: { lastCourseGeneratedAt: new Date() },
    });

    // Fetch saved courses
    const courses = await prismaClient.course.findMany({
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

    const responseCourses: Course[] = courses
      .map((course) => ({
        id: course.id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        url: course.url,
        level: course.level as "Beginner" | "Intermediate" | "Advanced",
        rating: course.rating,
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

    return NextResponse.json({ courses: responseCourses }, { status: 200 });
  } catch (error) {
    console.error("Error generating and saving courses:", error);
    return NextResponse.json(
      { error: "Failed to generate courses. Please try again later." },
      { status: 500 }
    );
  }
}
