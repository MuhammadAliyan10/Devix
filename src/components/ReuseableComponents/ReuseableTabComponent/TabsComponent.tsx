import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabItem {
  name: string;
  value: string;
  content?: string;
  component?: React.ReactNode;
}

interface TabsComponentProps {
  tabs: TabItem[];
  defaultValue: string;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  defaultValue,
}) => {
  return (
    <Tabs defaultValue={defaultValue} className="relative mr-auto w-full my-5">
      <TabsList className="w-full justify-start rounded-none border-b !bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-indigo-500 data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component || tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
