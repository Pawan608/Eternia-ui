import React from "react";

const NotificationCardHome = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
      <div className="rounded-lg bg-[#C4ECE7] p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-teal-800">
          Trial expires soon!
        </h3>
        <p className="text-teal-600">Please upgrade to PRO to keep benefits</p>
        <button className="mt-4 rounded bg-white px-4 py-2 font-medium text-teal-700 hover:bg-teal-700 hover:text-white">
          Upgrade
        </button>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-[#E7F5EB] p-4 shadow-sm md:items-start">
        <h3 className="text-lg font-semibold text-teal-800">Invite people</h3>
        <p className="text-teal-600">Connect with more people to gain more</p>
        <button className="mt-4 rounded bg-white px-4 py-2 font-medium text-teal-700 hover:bg-teal-700 hover:text-white">
          Invite
        </button>
        {/* Image should be replaced with the actual image path */}
      </div>
    </div>
  );
};

export default NotificationCardHome;
