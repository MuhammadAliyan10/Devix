import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { MessageCircle } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "Chats",
    value: "chats",
    component: "<HomeTab />",
  },
  {
    name: "Requests",
    value: "requests",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Settings & Privacy",
    value: "settings",
    component: "<CareerTab userId={user.id} />",
  },
];

const MessagesPage = () => {
  return (
    <div>
      <PageHeader
        heading="Messages"
        icon={<MessageCircle className="w-10 h-10 text-primary" />}
        subtitle="Monitor message activity and stay connected with ease."
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="chats" />
    </div>
  );
};

export default MessagesPage;
