"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { BookOpen } from "lucide-react";
import React, { useState } from "react";

const tabsValue = [
  {
    name: "Recommended Resources",
    value: "recommendedResources",
    component: "<HomeTab />",
  },
  {
    name: "Assistant",
    value: "Assistant",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "History",
    value: "history",
    component: "<CareerTab userId={user.id} />",
  },
  {
    name: "Bookmarked",
    value: "bookmarked",
    component: "<CareerTab userId={user.id} />",
  },
];

const ResourcesPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { user } = useSession();
  return (
    <div>
      <PageHeader
        heading="Resources"
        icon={<BookOpen className="w-10 h-10 text-primary" />}
        subtitle="Explore helpful materials, tools, and guides for your studies"
        showSeparator={false}
        rightComponent={
          <MainPrimaryButton
            text="Update Resources"
            icon={<BookOpen className="w-4 h-4" />}
            disabled={user.subscriptionStatus === SubscriptionStatus.FREE}
            onAction={() => setDialogOpen(!dialogOpen)}
            tooltipText="Requires a premium subscription"
          />
        }
      />
      <TabsComponent tabs={tabsValue} defaultValue="recommendedResources" />
    </div>
  );
};

export default ResourcesPage;
