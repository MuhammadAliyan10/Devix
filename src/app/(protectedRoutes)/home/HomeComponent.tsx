"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import UserOnboardingDialog from "@/components/ReuseableComponents/UserOnboardingDialog";
import { useSession } from "@/provider/SessionProvider";
import React from "react";
import Home from "./_components/Home";

const HomeComponent = () => {
  const { user } = useSession();

  if (!user.major || !user.institution) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-center leading-1 flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold">Complete Your Onboarding</h3>
          <p className="text-muted-foreground my-3 text-sm">
            To provide personalized recommendations, track your progress, and
            connect you <br />
            with the most relevant resources, we need a few more details about
            <br /> your academic background.
          </p>
          <UserOnboardingDialog text="User Onboarding" />
        </div>
      </div>
    );
  }

  const tabsValue = [
    {
      name: "Home",
      value: "home",
      component: <Home />,
    },
    {
      name: "Courses",
      value: "courses",
      component: "Courses",
    },
    {
      name: "Quizzes",
      value: "quizzes",
      component: "Quizzes",
    },
  ];

  return (
    <div>
      <PageHeader
        heading="Home"
        rightComponent={<UserOnboardingDialog text="Update Onboarding" />}
      />
      <div className="my-4"></div>
      <TabsComponent tabs={tabsValue} defaultValue="home" />
    </div>
  );
};

export default HomeComponent;
