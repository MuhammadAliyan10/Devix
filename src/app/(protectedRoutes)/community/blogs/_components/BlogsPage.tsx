"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import MainPrimaryButton from "@/components/ReuseableComponents/MainPrimaryButton";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { useSession } from "@/provider/SessionProvider";
import { SubscriptionStatus } from "@prisma/client";
import { NotebookPen, ScrollText } from "lucide-react";
import React, { useState } from "react";

const tabsValue = [
  {
    name: "For You",
    value: "forYou",
    component: "<HomeTab />",
  },
  {
    name: "Your Blogs",
    value: "blogs",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Search",
    value: "search",
    component: "<LearningTab userId={user.id} />",
  },
];

const BlogsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useSession();

  return (
    <div>
      <PageHeader
        heading="Blogs"
        icon={<ScrollText className="w-10 h-10 text-primary" />}
        subtitle="Explore expert opinions, industry trends, and thought leadership."
        showSeparator={false}
        rightComponent={
          <MainPrimaryButton
            text="Post Blog"
            icon={<NotebookPen className="w-4 h-4" />}
            disabled={user.subscriptionStatus === SubscriptionStatus.FREE}
            onAction={() => setDialogOpen(!dialogOpen)}
            tooltipText="Requires a premium subscription"
          />
        }
      />
      <TabsComponent tabs={tabsValue} defaultValue="forYou" />
    </div>
  );
};

export default BlogsPage;
