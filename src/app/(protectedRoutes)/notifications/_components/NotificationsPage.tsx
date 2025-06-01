import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { Bell } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "Notifications",
    value: "notifications",
    component: "<HomeTab />",
  },
  {
    name: "Important",
    value: "important",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Read",
    value: "read",
    component: "<LearningTab userId={user.id} />",
  },
];

const NotificationsPage = () => {
  return (
    <div>
      <PageHeader
        heading="Notifications"
        icon={<Bell className="w-10 h-10 text-primary" />}
        subtitle="Your central hub for alerts, reminders, and updates."
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="notifications" />
    </div>
  );
};

export default NotificationsPage;
