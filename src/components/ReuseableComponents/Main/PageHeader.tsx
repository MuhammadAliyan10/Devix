import React from "react";
import PurpleIcon from "../PurpleIcon";

type Props = {
  heading?: string;
  rightComponent?: React.ReactNode;
};

const PageHeader = ({ heading, rightComponent }: Props) => {
  return (
    <div className="w-full flex flex-col gap-8 my-2">
      <div className="w-full flex justify-center sm:justify-between items-center gap-8 flex-wrap">
        <h2 className="text-primary text-3xl font-semibold">{heading}</h2>
        {rightComponent}
      </div>
    </div>
  );
};

export default PageHeader;
