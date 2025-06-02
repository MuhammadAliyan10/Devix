"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { UserRound } from "lucide-react";
import React from "react";

import SocialProfileTab from "../tabs/SocialProfileTab";
import ProfileTab from "../tabs/ProfileTab";
import { useSession } from "@/provider/SessionProvider";
import RankingTab from "../tabs/RankingTab";

const ProfilePage = () => {
  const { user } = useSession();
  const tabsValue = [
    {
      name: "My Profile",
      value: "profile",
      component: <ProfileTab userId={user.id} />,
    },
    {
      name: "Social Profile",
      value: "socialProfile",
      component: <SocialProfileTab userId={user.id} />,
    },
    {
      name: "Ranking",
      value: "ranking",
      component: <RankingTab userId={user.id} />,
    },
  ];
  return (
    <div>
      <PageHeader
        heading="Profile"
        icon={<UserRound className="w-10 h-10 text-primary" />}
        subtitle="Update, track and see how much you got up"
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="profile" />
    </div>
  );
};

export default ProfilePage;
