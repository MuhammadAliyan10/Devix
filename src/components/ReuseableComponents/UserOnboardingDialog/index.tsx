"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import MultiStepForm from "./MultiStepForm";
import BasicInfoStep from "./BasicInfoStep";
import AcademicBackground from "./AcademicBackground";
import CurrentStatusStep from "./CurrentStatusStep";
import FuturePlansStep from "./FuturePlansStep";
import { useDevixStore } from "@/store/useDevixStore";

const steps = [
  {
    id: "basicInfo",
    title: "Personal Details",
    description: "Enter your personal information.",
    component: <BasicInfoStep />,
  },
  {
    id: "academicHistory",
    title: "Academic History",
    description: "Provide your educational background.",
    component: <AcademicBackground />,
  },
  {
    id: "currentStatus",
    title: "Current Status",
    description: "Share your current academic details.",
    component: <CurrentStatusStep />,
  },
  {
    id: "futurePlans",
    title: "Career Goals",
    description: "Outline your future aspirations.",
    component: <FuturePlansStep />,
  },
];

export default function UserOnboardingDialog() {
  const { isModalOpen, setModalOpen, isCompleted, setCompleted } =
    useDevixStore();

  const handleCompletion = () => {
    setCompleted(true);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Start Onboarding
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1300px] p-0 bg-transparent border-none">
        {isCompleted ? (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold text-foreground">
              Onboarding Complete!
            </h2>
            <p className="text-sm text-muted-foreground mt-3">
              Your information has been successfully saved.
            </p>
          </div>
        ) : (
          <MultiStepForm steps={steps} onComplete={handleCompletion} />
        )}
      </DialogContent>
    </Dialog>
  );
}
