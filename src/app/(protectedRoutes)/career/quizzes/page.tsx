import { Metadata } from "next";
import QuizzesPage from "./_components/QuizzesPage";

export const metadata: Metadata = {
  title: "Quizzes",
};

const page = () => {
  return <QuizzesPage />;
};

export default page;
