import { Metadata } from "next";
import CoursesPage from "./_components/CoursesPage";

export const metadata: Metadata = {
  title: "Courses",
};

const page = () => {
  return <CoursesPage />;
};

export default page;
