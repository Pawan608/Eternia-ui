"use client";
// import ViewSubscriptionDrawer from "@/components/Subscriptions/ViewSubscriptionDrawer";
// import useSubscriptionStore from "@/store/globalStore";
import useSubscriptionStore from "data/store";
import ViewSubscriptionDrawer from "components/ComponentsConsole/Subscriptions/ViewSubscriptionDrawer";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { BsEyeFill, BsReceipt } from "react-icons/bs";
import { IoReloadOutline } from "react-icons/io5";

const SubscriptionTable = ({ subscriptionsData }) => {
  const [showForm, setShowForm] = useState(false);
  const { setSelectedSubscription } = useSubscriptionStore();
  const formVariants = {
    hidden: {
      width: 0,
    },
    visible: {
      width: "50%",
      transition: { duration: 0.4 },
    },
    exit: {
      width: 0,
      transition: { duration: 0.2 },
    },
  };
  return (
    <div className="flex">
      <div
        className={`dark:border-gray-700 flex-grow overflow-hidden border border-bodydark1 ${
          showForm ? "w-1/2" : "w-full "
        } transition-all duration-500 ease-in-out`}
      >
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Package
              </th>
              {!showForm && (
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Start date
                </th>
              )}
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptionsData.map((subscription) => (
              <tr key={subscription.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {subscription.plan.name}
                  </h5>
                  {/* <p className="text-sm">${subscription.package.price}</p> */}
                </td>
                {!showForm && (
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Date(subscription.startDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }
                      )}
                    </p>
                  </td>
                )}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                    {subscription.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => {
                        setSelectedSubscription(subscription);
                        setShowForm(!showForm);
                      }}
                      className="hover:text-primary"
                      title="View Subscription"
                    >
                      <BsEyeFill />
                    </button>
                    <button
                      className="hover:text-primary"
                      title="Renew Subscription"
                    >
                      <IoReloadOutline />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="w-1/2 overflow-auto "
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Your form content here */}
            <ViewSubscriptionDrawer />
            {/* Form fields */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionTable;
