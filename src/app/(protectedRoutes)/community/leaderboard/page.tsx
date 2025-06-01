import { Metadata } from "next";
import LeaderboardPage from "./_components/LeaderboardPage";

export const metadata: Metadata = {
  title: "LeaderBoard",
};

const page = () => {
  return <LeaderboardPage />;
};

export default page;
