import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { Settings } from "lucide-react";
import React from "react";

const SettingsPage = () => {
  const tabsValue = [
    {
      name: "Profile",
      value: "profile",
      component: "<HomeTab />",
    },
    {
      name: "General",
      value: "general",
      component: "<HomeTab />",
    },
    {
      name: "Payment",
      value: "payment",
      component: "<LearningTab userId={user.id} />",
    },
    {
      name: "Display",
      value: "display",
      component: "<CareerTab userId={user.id} />",
    },
    {
      name: "Privacy & Security",
      value: "privacy",
      component: "<CareerTab userId={user.id} />",
    },
  ];
  return (
    <>
      <PageHeader
        heading="Settings"
        icon={<Settings className="w-10 h-10 text-primary" />}
        subtitle="Customize your settings and update your payment plans"
        showSeparator={false}
        rightComponent={""}
      />
      <TabsComponent tabs={tabsValue} defaultValue="profile" />
    </>
  );
};

export default SettingsPage;
