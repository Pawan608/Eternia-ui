// SubsContext.js
import React, { useContext, createContext, useEffect, useState } from "react";
import { useQuery, QueryResult } from "@apollo/client";
// import { GET_USER_SUB_DATA } from "@/graphql/query";
import { GET_USER_SUB_DATA } from "graphql/query";
import { useAuth } from "./AuthProvider";
export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  status: string;
  billingCycle: string;
  trialPeriodDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  subscriptionType: string; // Adjust the type if you have a specific enum for subscription types
  status: string; // Adjust the type if you have a specific enum for subscription statuses
  plan: Plan;
  startDate: Date;
  endDate: Date;
  renewalPeriod: number; // Assuming renewalPeriod is a number of days, adjust as necessary
}
interface ISubsContext {
  subsLoading: boolean;
  subsError: any;
  subsData: any;
}

const SubsContext = createContext<ISubsContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const SubsProvider = ({ children }: Props) => {
  // const [userId, setUserId] = useState<string | null>(null);
  const { userId } = useAuth();
  // useEffect(() => {
  //   // Access localStorage only when the component is mounted to the DOM
  //   const storedUserId = localStorage.getItem("userId");
  //   setUserId(storedUserId);
  // }, []);
  const {
    loading: subsLoading,
    error: subsError,
    data: subsData,
  } = useQuery(GET_USER_SUB_DATA, {
    variables: { userId },
    skip: !userId,
  });
  const contextValue: ISubsContext = {
    subsData: subsData?.userSubscriptions,
    subsLoading,
    subsError,
  };

  return (
    <SubsContext.Provider value={contextValue}>{children}</SubsContext.Provider>
  );
};

export const useSubs = (): ISubsContext => {
  const context = useContext<ISubsContext | null>(SubsContext);
  if (context === null) {
    throw new Error("useSubs must be used within a DataProvider");
  }
  return context;
};
