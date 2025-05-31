"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import UserOnboardingDialog from "@/components/ReuseableComponents/UserOnboardingDialog";
import { useSession } from "@/provider/SessionProvider";
import React from "react";
import Home from "../tabs/HomeTab";
import LearningTab from "../tabs/LearningTab";
import CareerTab from "../tabs/CareerTab";
import TechInsightsTab from "../tabs/TechInsightsTab";
import { BarChart, ChartBar } from "lucide-react";

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
      name: "Overview",
      value: "overview",
      component: <Home />,
    },
    {
      name: "Learning",
      value: "learning",
      component: <LearningTab userId={user.id} />,
    },
    {
      name: "Career",
      value: "career",
      component: <CareerTab userId={user.id} />,
    },
    {
      name: "Tech Insights",
      value: "tech-insights",
      component: <TechInsightsTab userId={user.id} />,
    },
  ];

  return (
    <div>
      <PageHeader
        heading="Dashboard"
        icon={<ChartBar className="w-10 h-10 text-primary" />}
        subtitle="AI-powered insights and recommendations tailored for your career growth"
        showSeparator={false}
        rightComponent={<UserOnboardingDialog text="Update Profile" />}
      />
      <div className="my-4"></div>
      <TabsComponent tabs={tabsValue} defaultValue="overview" />
    </div>
  );
};

export default HomeComponent;
