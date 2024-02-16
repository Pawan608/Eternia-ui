"use client";
import { useAuth } from "context/AuthProvider";
import { GET_USER_SUB_REQUESTS_QUERY } from "graphql/query";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useState } from "react";
interface Approval {
  id: string;
  approved: boolean;
  approver: {
    id: string;
    username: string;
  };
}

interface Subscription {
  id: string;
  startDate: Date;
  status: string; // Assuming status is a string, but you might have a specific enum for this.
  endDate: Date;
}

interface Plan {
  id: string;
  name: string;
}

interface RequestType {
  id: string;
  requestType: string; // Assuming requestType is a string, but you might have a specific enum for this.
  plan: Plan;
  subscription: Subscription;
  approvals: Approval[];
  status: string; // Assuming status is a string, but you might have a specific enum for this.
  createdAt: Date;
  updatedAt: Date;
}

interface GetRequestsByUserResponse {
  getRequestsByUser: Request[];
}
export default function RequestsPage() {
  const [expandedRow, setExpandedRow] = useState(null);
  const { userId } = useAuth();
  const {
    data: requestsData,
    loading: requestsLoading,
    error: requestsError,
  } = useQuery(GET_USER_SUB_REQUESTS_QUERY, {
    variables: {
      userId: userId,
    },
    skip: !userId,
  });
  console.log(requestsData);

  const variants = {
    expanded: (index) => ({
      x: index * 30 * 6, // Adjust the number to increase/decrease overlap
      zIndex: 1, // Bring the clicked card to the top
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
    collapsed: {
      x: 0,
      zIndex: 0, // Reset zIndex to stack cards behind each other
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };
  const requests = requestsData?.getRequestsByUser;
  const handleRowClick = (rowIndex) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
  };

  return (
    <main>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
            My Requests
          </h2>
          {/* <p className="font-medium">Latest social statistics</p> */}
        </div>
      </div>
      <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <div className=" my-4  overflow-x-auto overflow-y-hidden">
          {!requestsLoading ? (
            requests &&
            requests.map((rowData: RequestType, rowIndex: number) => (
              <div key={rowIndex} className="relative mb-6 flex">
                {" "}
                {/* Adjust the height as needed */}
                <DashboardCard
                  title={rowData.requestType}
                  status={rowData.status}
                  plan={rowData.plan}
                  //   conversion="Extra Info"
                  //   borderColor="border-gray-500"
                />
                <motion.div
                  layout
                  initial={false}
                  animate={expandedRow === rowIndex ? "expanded" : "collapsed"}
                  className="relative ml-4 flex cursor-pointer" // Add margin-left to separate from the extra card
                  onClick={() => handleRowClick(rowIndex)}
                >
                  {rowData?.approvals &&
                    rowData?.approvals.map((approval, approvalIndex) => (
                      <motion.div
                        key={approvalIndex} // It's better to use unique IDs for keys
                        custom={approvalIndex}
                        variants={variants}
                        initial="collapsed" // Start in the collapsed state
                        animate={
                          expandedRow === rowIndex ? "expanded" : "collapsed"
                        }
                        className="absolute left-0 top-0"
                        style={{
                          marginLeft: `${approvalIndex * 1.5}rem`, // Adjust the left margin to stack cards
                          zIndex: expandedRow === rowIndex ? 2 : 1, // Only elevate zIndex when expanded
                        }}
                      >
                        <DashboardCard
                          title={approval.approver.username}
                          status={approval.approved}
                          //   conversion={approval.conversion}
                          //   borderColor={approval.borderColor}
                        />
                      </motion.div>
                    ))}
                </motion.div>
                <div
                  className="absolute left-0 top-0 h-full w-full cursor-pointer"
                  style={{ zIndex: 3 }} // Ensure this div is always on top
                  onClick={() => handleRowClick(rowIndex)}
                />
              </div>
            ))
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </main>
  );
}
interface DashboardCardProp {
  title: string;
  status: boolean | string;
  plan?: Plan;
}
const DashboardCard: React.FC<DashboardCardProp> = ({
  title,
  status,
  plan,
}) => {
  const notchStyles = {
    "::before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      borderTop: "10px solid transparent",
      borderLeft: `10px solid ${
        status == "approved" || status
          ? "border-green-300"
          : "border-yellow-300"
      }`,
      zIndex: 10,
    },
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      borderTop: "10px solid white",
      borderLeft: "10px solid transparent",
      transform: "translate(100%, -100%)",
      zIndex: 20,
    },
  };

  return (
    <div
      className={`relative ml-6  flex items-center rounded-md border-l-4 bg-white p-4 shadow-md ${
        typeof status === "string"
          ? status === "approved"
            ? "border-green-300"
            : "border-yellow-300"
          : status
          ? "border-green-300"
          : "border-yellow-300"
      }`}
      style={{ height: "100px", minWidth: "200px" }}
    >
      <div className="card-notch absolute left-0" />
      <div className="flex-grow overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-gray-500 truncate text-xs font-semibold uppercase tracking-wide">
              {title}
            </p>
            {plan && (
              <p className="text-gray-500 truncate text-sm">
                Plan: {plan.name}
              </p>
            )}
            <p className="text-gray-500 truncate text-sm">
              {typeof status === "string"
                ? status === "approved"
                  ? "Approved"
                  : "Pending"
                : status
                ? "Approved"
                : "Pending"}
            </p>
          </div>
          {/* <div className="text-gray-800 flex items-center">
            <h3 className="mr-2 text-lg font-bold">{status == "approved"? "Approved":"Pending"}</h3>
            <svg
              className="text-gray-500 mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
            </svg>
            <svg
              className="text-gray-500 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
};
