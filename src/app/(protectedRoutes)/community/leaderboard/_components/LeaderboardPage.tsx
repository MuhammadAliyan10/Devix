import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { Trophy } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "Ranking",
    value: "ranking",
    component: "<HomeTab />",
  },
  {
    name: "History",
    value: "history",
    component: "<LearningTab userId={user.id} />",
  },
];

const LeaderboardPage = () => {
  return (
    <div>
      <PageHeader
        heading="Leaderboard"
        icon={<Trophy className="w-10 h-10 text-primary" />}
        subtitle="See who's leading the way with real-time rankings and stats."
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="ranking" />
    </div>
  );
};

export default LeaderboardPage;
