"use client";
import React, { useState } from "react";

const SearchHero = () => {
  const [activeTab, setActiveTab] = useState("get-started");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Helper function to determine the tab's style
  const tabStyle = (tab) =>
    `inline-block px-4 py-2 rounded ${
      activeTab === tab
        ? "bg-green-600 text-white"
        : "text-gray-600 hover:bg-gray-200"
    } cursor-pointer transition-colors duration-300`;

  return (
    <section className="pb-20 overflow-hidden pt-35 md:pt-40 xl:pb-25 xl:pt-46">

    <div className="p-4 text-center bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 md:p-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-gray-800 md:text-5xl">
          Small business help & learning
        </h1>
        <div className="flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="How can we help you?"
              className="w-full py-2 pl-4 pr-10 text-sm border rounded-sm"
            />
            <button className="absolute p-2 text-white transform -translate-y-1/2 bg-blue-500 rounded-full right-1 top-1/2">
              →
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <button
            className={tabStyle("get-started")}
            onClick={() => handleTabClick("get-started")}
          >
            Get started
          </button>
          <button
            className={tabStyle("set-up")}
            onClick={() => handleTabClick("set-up")}
          >
            Set up
          </button>
          <button
            className={tabStyle("essential-tasks")}
            onClick={() => handleTabClick("essential-tasks")}
          >
            Essential tasks
          </button>
          <button
            className={tabStyle("learn")}
            onClick={() => handleTabClick("learn")}
          >
            Learn
          </button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default SearchHero;
