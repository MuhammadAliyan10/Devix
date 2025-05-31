"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { Users2 } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "Your Groups",
    value: "yourGroups",
    component: "<HomeTab />",
  },
  {
    name: "Recommended Groups",
    value: "recommendedGroups",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Groups Ranking",
    value: "groupsRanking",
    component: "<CareerTab userId={user.id} />",
  },
];

const GroupPage = () => {
  return (
    <div>
      <PageHeader
        heading="Groups"
        icon={<Users2 className="w-10 h-10 text-primary" />}
        subtitle="Create, join, and explore groups — view leaderboard and more"
        showSeparator={false}
        rightComponent={<CreateGroup />}
      />
      <TabsComponent tabs={tabsValue} defaultValue="yourGroups" />
    </div>
  );
};

export default GroupPage;

const CreateGroup = () => {
  return (
    <button
      disabled={true}
      className="flex items-center gap-2 rounded-xl px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200"
    >
      <Users2 className="w-4 h-4" />
      Create Group
    </button>
  );
};
