"use client";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/provider/SessionProvider";
import { GraduationCap } from "lucide-react";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  const { user } = useSession();
  return (
    <div className="w-full min-h-screen mx-2 my-5">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-x-2">
          <GraduationCap className="w-10 h-10 text-indigo-500" />
          <div>
            <h2 className="text-3xl font-semibold">
              Welcome,{" "}
              <span className="text-indigo-500 font-bold">{user.name}</span>
            </h2>
            <span className="my-2 text-xs">
              {user.major} | {user.institution}
            </span>
          </div>
        </div>
        <div className="px-2 py-1 bg-indigo-500 text-white rounded-2xl text-sm border">
          {user.subscriptionStatus}
        </div>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default Home;
