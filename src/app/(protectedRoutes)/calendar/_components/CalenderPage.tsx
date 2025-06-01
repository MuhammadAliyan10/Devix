import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { Calendar } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "Main",
    value: "main",
    component: "<HomeTab />",
  },
  {
    name: "Tasks",
    value: "tasks",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Events",
    value: "events",
    component: "<LearningTab userId={user.id} />",
  },
];

const CalenderPage = () => {
  return (
    <div>
      <PageHeader
        heading="Calendar"
        icon={<Calendar className="w-10 h-10 text-primary" />}
        subtitle="Plan, track, and never miss a key moment."
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="main" />
    </div>
  );
};

export default CalenderPage;
