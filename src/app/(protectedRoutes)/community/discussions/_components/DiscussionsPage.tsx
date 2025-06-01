import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { MessageCircle } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "All Groups",
    value: "groups",
    component: "<HomeTab />",
  },
  {
    name: "Your Groups",
    value: "yourGroups",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Search",
    value: "search",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Settings & Privacy",
    value: "settings",
    component: "<CareerTab userId={user.id} />",
  },
];

const DiscussionsPage = () => {
  return (
    <div>
      <PageHeader
        heading="Group Discussions"
        icon={<MessageCircle className="w-10 h-10 text-primary" />}
        subtitle="Facilitate effective communication and teamwork through shared discussions."
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="groups" />
    </div>
  );
};

export default DiscussionsPage;
