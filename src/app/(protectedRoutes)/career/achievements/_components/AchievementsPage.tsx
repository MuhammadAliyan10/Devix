import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { Trophy } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "Your Achievements",
    value: "achievements",
    component: "<HomeTab />",
  },
  {
    name: "LeaderBoard",
    value: "leaderBoard",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Rules & Regulation",
    value: "rules",
    component: "<CareerTab userId={user.id} />",
  },
];

const AchievementsPage = () => {
  return (
    <div>
      <PageHeader
        heading="Achievements"
        icon={<Trophy className="w-10 h-10 text-primary" />}
        subtitle="See what you’ve accomplished so far"
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="achievements" />
    </div>
  );
};

export default AchievementsPage;
