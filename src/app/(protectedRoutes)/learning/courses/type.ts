export interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  thumbnail: string;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

export interface CourseComponentProps {
  title?: string;
  subtitle?: string;
}
