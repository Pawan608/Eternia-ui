import { useQuery } from "@apollo/client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useJwt } from "react-jwt";
// import { GET_USER_PROFILE_QUERY } from "../graphql/query";
export interface UserType {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  roles?: string[];
  requests: Array<{
    id: string;
    plan: {
      id: string;
    };
  }>;
  subscriptions: Array<{
    id: string;
    plan: {
      id: string;
    };
  }>;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  authToken: string;
  setAuthToken: (token: string) => void;
  clearAuthToken: () => void;
  userId: string;
  setUserId: (userId: string, user: UserType) => void;
  userData: UserType | null; // Optional type for user data
  //   userLoading: boolean;
  // userError?: Error; // Optional type for error
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //FIXME: Make it false
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<UserType | null>(null);
  //   const token: string = localStorage.getItem("authToken") || "";
  //   const { isExpired } = useJwt(token);
  const setAndStoreAuthToken = (token: string) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token); // Store token in local storage

    setIsAuthenticated(true);
  };

  const setAndStoreUser = (userId: string, user: UserType) => {
    setUserId(userId);
    setUserData(user);
    // console.log("user data from provider", user, userData);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userData", JSON.stringify(user));
    // localStorage.setItem("user")
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    const storedUser = localStorage.getItem("userData");
    if (storedToken && storedUserId) {
      setAuthToken(storedToken);
      setUserId(storedUserId);
      setUserData(JSON.parse(storedUser || ""));
      setIsAuthenticated(true);
    }
  }, []);

  const clearAuthToken = () => {
    setAuthToken("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
  };

  // Use `skip` option to conditionally execute the query
  //   const {
  //     data: userData,
  //     loading: userLoading,
  //     error: userError,
  //   } = useQuery(GET_USER_PROFILE_QUERY, {
  //     variables: { userId },
  //     skip: !isAuthenticated || !userId, // Skip the query if not authenticated or userId is not available
  //   });
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        authToken,
        setAuthToken: setAndStoreAuthToken,
        clearAuthToken,
        userId,
        setUserId: setAndStoreUser,
        userData,
        // userLoading,
        // userError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
