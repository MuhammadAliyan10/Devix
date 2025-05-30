"use client";
import UserOnboardingDialog from "@/components/ReuseableComponents/UserOnboardingDialog";
import { useSession } from "@/provider/SessionProvider";
import { useDevixStore } from "@/store/useDevixStore";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

type Props = {};

const HomeComponent = (props: Props) => {
  const { user } = useSession();
  const { isCompleted } = useDevixStore();
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (!isCompleted) {
      const timer = setTimeout(() => {
        setShowBadge(true);
      }, 120000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  return (
    <div className="w-full h-screen">
      <div className="flex justify-between items-center">
        <h2>Welcome, {user.name}</h2>
        {isCompleted ? (
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
