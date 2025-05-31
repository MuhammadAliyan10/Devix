import { Metadata } from "next";
import AchievementsPage from "./_components/AchievementsPage";

export const metadata: Metadata = {
  title: "Achievements",
};

const page = () => {
  return <AchievementsPage />;
};

export default page;
