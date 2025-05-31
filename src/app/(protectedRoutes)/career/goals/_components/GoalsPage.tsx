"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { Target } from "lucide-react";
import React from "react";
const tabsValue = [
  {
    name: "Your Goals",
    value: "goals",
    component: "<HomeTab />",
  },
  {
    name: "Goals Progress",
    value: "progress",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Assistant",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];

const GoalsPage = () => {
  return (
    <div>
      <PageHeader
        heading="Goals"
        icon={<Target className="w-10 h-10 text-primary" />}
        subtitle="Stay focused by setting goals and reaching milestones"
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="goals" />
    </div>
  );
};

export default GoalsPage;
