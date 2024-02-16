// RequestsContext.js
import React, { useContext, createContext, useEffect, useState } from "react";
import { useQuery, QueryResult } from "@apollo/client";
// import {
//   GET_USER_SUB_DATA,
//   GET_USER_SUB_REQUESTS_QUERY,
// } from "@/graphql/query";
import { GET_USER_SUB_DATA, GET_USER_SUB_REQUESTS_QUERY } from "graphql/query";
import { usePathname } from "next/navigation";

interface IRequestsContext {
  requestsLoading: boolean;
  requestsError: any;
  requestsData: any;
}

const RequestsContext = createContext<IRequestsContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const RequestsProvider = ({ children }: Props) => {
  const [userId, setUserId] = useState<string | null>(null);
  const pathName = usePathname();
  useEffect(() => {
    // Access localStorage only when the component is mounted to the DOM
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  const {
    loading: requestsLoading,
    error: requestsError,
    data: requestsData,
  } = useQuery(GET_USER_SUB_REQUESTS_QUERY, {
    variables: { userId: userId },
    skip: !userId,
  });
  // useEffect(() => {
  //   refetch();
  // }, [pathName]);
  const contextValue: IRequestsContext = {
    requestsData: requestsData?.getRequestsByUser,
    requestsLoading,
    requestsError,
  };

  return (
    <RequestsContext.Provider value={contextValue}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = (): IRequestsContext => {
  const context = useContext<IRequestsContext | null>(RequestsContext);
  if (context === null) {
    throw new Error("useRequests must be used within a DataProvider");
  }
  return context;
};
