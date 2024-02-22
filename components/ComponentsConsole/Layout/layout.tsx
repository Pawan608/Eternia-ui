"use client";

// import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
// import "../../";
const inter = Inter({ subsets: ["latin"] });

// import ToasterContext from "../context/ToastContext";
// import Sidebar from "components/ComponentsConsole/Sidebar";
import Sidebar from "components/ComponentsConsole/Sidebar";
import { useState } from "react";
import HomeHeader from "components/ComponentsConsole/HomeHeader";
import { ApolloProvider } from "@apollo/client";
// import client from "@/utils/apolloClient";
import { client } from "utils/apollo";
import { AuthProvider } from "@saas-ui/react";
// import { SubsProvider } from "/context/su";
import { SubsProvider } from "context/SubsContext";
import { RequestsProvider } from "context/RequestContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RequestsProvider>
          <SubsProvider>
            {/* <ThemeProvider
                  enableSystem={false}
                  attribute="class"
                  defaultTheme="light"
                > */}
            <div className="flex h-screen overflow-hidden">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <HomeHeader
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </div>
            </div>
            {/* </ThemeProvider> */}
          </SubsProvider>
        </RequestsProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
