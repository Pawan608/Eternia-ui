// DataContext.js
import { useQuery } from "@apollo/client";
import React, { useContext, createContext } from "react";
import { GET_SEARCHED_PRODUCTS } from "../graphql/query";
const POLL_INTERVAL_MS = 6000; // Poll every 60 seconds

interface IDataContext {
  productList: any;
  productListLoading: boolean;
  refetchProductList: any;
  productListError: any;
}

const DataContext = createContext<IDataContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  //   Fetch requests count
  const {
    data: productList,
    loading: productListLoading,
    error: productListError,
    refetch: refetchProductList,
  } = useQuery(GET_SEARCHED_PRODUCTS, {
    variables: {
      query: "*",
    },
  });

  const contextValue: IDataContext = {
    productList,
    productListError,
    productListLoading,
    refetchProductList,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = (): IDataContext => {
  const context = useContext<IDataContext | null>(DataContext);
  if (context === null) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
