"use client";
import PageHeader from "@/components/ReuseableComponents/Main/PageHeader";
import TabsComponent from "@/components/ReuseableComponents/ReuseableTabComponent/TabsComponent";
import { useSession } from "@/provider/SessionProvider";
import { GitBranch } from "lucide-react";
import React from "react";

const tabsValue = [
  {
    name: "Your Projects",
    value: "projects",
    component: "<HomeTab />",
  },
  {
    name: "Recommended Projects",
    value: "recommendedProjects",
    component: "<LearningTab userId={user.id} />",
  },
  {
    name: "Progress",
    value: "progress",
    component: "<CareerTab userId={user.id} />",
  },
  {
    name: "Assistant",
    value: "assistant",
    component: "<CareerTab userId={user.id} />",
  },
];
const ProjectsPage = () => {
  const { user } = useSession();
  return (
    <div>
      <PageHeader
        heading="Projects"
        icon={<GitBranch className="w-10 h-10 text-primary" />}
        subtitle={`Work on real-world projects tailored to your ${user.major} learning`}
        showSeparator={false}
      />
      <TabsComponent tabs={tabsValue} defaultValue="projects" />
    </div>
  );
};

export default ProjectsPage;
