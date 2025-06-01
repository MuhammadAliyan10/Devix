import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { UserRound, UserRoundPen } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "My Profile",
    value: "profile",
    component: "<HomeTab />",
  },
  {
    name: "Social Profile",
    value: "socialProfile",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Ranking",
    value: "ranking",
    component: "<CareerTab userId={user.id} />",
  },
];
const ProfilePage = () => {
  return (
    <div>
      <PageHeader
        heading="Profile"
        icon={<UserRound className="w-10 h-10 text-primary" />}
        subtitle="Update, track and see how much you got up"
        showSeparator={false}
        rightComponent={<UpdateProfile />}
      />
      <TabsComponent tabs={tabsValue} defaultValue="profile" />
    </div>
  );
};

export default ProfilePage;

const UpdateProfile = () => {
  return (
    <button
      disabled={true}
      className="flex items-center gap-2 rounded-xl px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200"
    >
      <UserRoundPen className="w-4 h-4" />
      Update Profile
    </button>
  );
};
