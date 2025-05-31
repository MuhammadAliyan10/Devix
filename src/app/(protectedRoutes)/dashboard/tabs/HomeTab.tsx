"use client";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/provider/SessionProvider";
import { GraduationCap } from "lucide-react";
import React from "react";
import UserInformationSection from "../_components/UserInformationSection";

type Props = {
  userId: string;
};
const HomeTab = ({ userId }: Props) => {
  const { user } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Welcome back, {user.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user.major} • {user.institution}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground shadow-sm">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                {user.subscriptionStatus}
              </div>
            </div>
          </div>
          <Separator className="mt-6" />
        </div>

        {/* Main Content */}
        <UserInformationSection userId={userId} />
      </div>
    </div>
  );
};

export default HomeTab;
