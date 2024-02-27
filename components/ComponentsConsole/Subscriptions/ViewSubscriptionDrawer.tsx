"use client";
// import useSubscriptionStore from "@/store/globalStore";
import useSubscriptionStore from "data/store";
import React, { useState } from "react";

const ViewSubscriptionDrawer = () => {
  const { selectedSubscription } = useSubscriptionStore();
  return (
    <div className="shadow-default rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Subscription: {selectedSubscription?.id}
        </h3>
      </div>
      <div className="p-4">
        <div className="mt-4 ">
          <h3 className="text-md dark:text-gray-400">Plan</h3>
          <p className="dark:text-gray-300">
            {selectedSubscription?.plan.name}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-md dark:text-gray-400">Start Date</h3>
          <p className="dark:text-gray-300">
            {selectedSubscription?.startDate
              ? new Date(selectedSubscription?.startDate).toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true, // or false for 24-hour format
                  }
                )
              : "No Start Date"}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-md dark:text-gray-400">End Date</h3>
          <p className="dark:text-gray-300">
            {selectedSubscription?.endDate
              ? new Date(selectedSubscription?.endDate).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true, // or false for 24-hour format
                })
              : "No End Date"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewSubscriptionDrawer;
