"use client";

import React, { useState } from "react";

import { Framer } from "@/lib/framer";
import { useTabs } from "@hooks/use-tabs";



const Tabs = () => {
  const [hookProps] = useState({
    tabs: [
      {
        label: "Overview",
        children: (
          <div className="flex flex-col hover:bg-blue-500">
            <span className="text-4xl  px-4 md:px-8">Activity</span>
            <div className="border-t border-zinc-800 mt-10">
              <div className="border-r border-zinc-800 w-[300px] h-screen hidden md:flex"></div>
            </div>
          </div>
        ),
        id: "Overview",
      },
      {
        label: "Integrations",
        children: (
          <div className="flex flex-col">
            <span className="text-4xl  px-4 md:px-8">Activity</span>
            <div className="border-t border-zinc-800 mt-10">
              <div className="border-r border-zinc-800 w-[300px] h-screen hidden md:flex"></div>
            </div>
          </div>
        ),
        id: "Integrations",
      },
      {
        label: "Activity",
        children: (
          <div className="flex flex-col">
            <span className="text-4xl  px-4 md:px-8">Activity</span>
            <div className="border-t border-zinc-800 mt-10">
              <div className="border-r border-zinc-800 w-[300px] h-screen hidden md:flex"></div>
            </div>
          </div>
        ),
        id: "Activity",
      },
      {
        label: "Domains",
        children: (
          <div className="flex flex-col">
            <span className="text-4xl  px-4 md:px-8">Activity</span>
            <div className="border-t border-zinc-800 mt-10">
              <div className="border-r border-zinc-800 w-[300px] h-screen hidden md:flex"></div>
            </div>
          </div>
        ),
        id: "Domains",
      },
    ],
    initialTabId: "Matches",
  });
  const framer = useTabs(hookProps);

  return (
    <div className="w-full flex flex-col">
      <div className="border-b w-full items-start flex border-zinc-100 bg-zinc-200 px-8 pt-16">
        <Framer.Tabs {...framer.tabProps} />
      </div>
    </div>
  );
};

export default Tabs;
