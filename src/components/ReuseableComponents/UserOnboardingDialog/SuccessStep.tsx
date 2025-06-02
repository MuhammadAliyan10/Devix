"use client";
import { Button } from "@/components/ui/button";
import { useDevixStore } from "@/store/useDevixStore";
import { BarChart, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SuccessStep = () => {
  const router = useRouter();
  const { feedback, isSubmitting } = useDevixStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSubmitting && feedback) {
      setLoading(false);
    } else if (!isSubmitting && !feedback) {
      setLoading(false);
    }
  }, [isSubmitting, feedback]);

  return (
    <div className="relative text-center space-y-6 py-8 px-6">
      <div className="flex items-center justify-center ">
        <div className="bg-green-500 rounded-full p-2">
          <Check className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold">Profile Analysis Complete!</h2>
      <p className="text-foreground">
        Here is your personalized AI feedback and career roadmap
      </p>
      <div className="flex mt-4 mx-auto">
        {loading ? (
          <div className="flex gap-x-2 items-center justify-center mb-6 w-full">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-md text-primary mt-2">Generating feedback...</p>
          </div>
        ) : (
          <p className="text-md leading-relaxed text-primary text-center mb-6">
            {feedback || "Bhi pasy do ga to ay ga na"}
          </p>
        )}
      </div>
      <div className="mt-8">
        <Button variant={"outline"} onClick={() => router.push("/dashboard")}>
          <BarChart className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  );
};

export default SuccessStep;
