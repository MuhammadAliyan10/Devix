import React from "react";
import PurpleIcon from "@/components/ReuseableComponents/PurpleIcon";

type Props = {
  leftIcon?: React.ReactNode;
  mainIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  heading?: string;
};

const PageHeader = ({ leftIcon, rightIcon, mainIcon, heading }: Props) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex justify-center sm:justify-between items-center gap-8 flex-wrap">
        <p className="text-primary text-4xl font-semibold">{heading}</p>
        <div className="relative md:mr-28">
          <PurpleIcon className="absolute -left-4 -top-3 -z-10 -rotate-45 py-3">
            {leftIcon}
          </PurpleIcon>
          <PurpleIcon className="z-10 backdrop-blur">{mainIcon}</PurpleIcon>
          <PurpleIcon className="absolute -right-4 -top-3 -z-10 rotate-45 py-3">
            {rightIcon}
          </PurpleIcon>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
