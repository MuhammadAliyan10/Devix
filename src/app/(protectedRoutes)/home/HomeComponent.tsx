// components/HomeComponent.tsx
"use client";
import UserOnboardingDialog from "@/components/ReuseableComponents/UserOnboardingDialog";
import { useSession } from "@/provider/SessionProvider";
import { useDevixStore } from "@/store/useDevixStore";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

type Props = {};

const HomeComponent = (props: Props) => {
  const { user } = useSession();

  const { isCompleted, initializeStore, isSubmitting } = useDevixStore();
  const [showBadge, setShowBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (user?.id) {
        initializeStore(user.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, initializeStore]);

  useEffect(() => {
    if (!isCompleted) {
      const timer = setTimeout(() => {
        setShowBadge(true);
      }, 120000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  if (!user) {
    return null; // Handle case where session is not loaded
  }

  return (
    <div className="w-full h-screen">
      <div className="flex justify-between items-center">
        <h2>Welcome, {user.name}</h2>
        {isSubmitting ? (
          <span>Loading...</span>
        ) : isCompleted ? (
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground"
          >
            Profile Updated
          </Badge>
        ) : (
          <>
            {showBadge && (
              <Badge
                variant="default"
                className="bg-primary text-primary-foreground mr-2"
              >
                Complete Your Profile
              </Badge>
            )}

            <UserOnboardingDialog />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
