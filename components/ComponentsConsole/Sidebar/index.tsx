"use client";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  BsBellFill,
  BsBox2Heart,
  BsDoorOpen,
  BsGearFill,
} from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { TbSmartHome } from "react-icons/tb";
// import { useAuth } from "@/app/context/AuthContext";
import { useAuth } from "context/AuthProvider";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  //   const location = useLocation();
  const pathname = usePathname();
  const router = useRouter();

  const { clearAuthToken } = useAuth();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  // Initialize sidebarExpanded state without localStorage value
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Effect to read and set sidebarExpanded state from localStorage
  useEffect(() => {
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    setSidebarExpanded(storedSidebarExpanded === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-[16rem] flex-col overflow-y-hidden bg-[#F3F5F7] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">{/* <img src={Logo} alt="Logo" /> */}</Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4 mt-5 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-black">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/home"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark hover:text-bodydark1 dark:hover:bg-meta-4 ${
                    pathname.includes("home") &&
                    "bg-graydark text-bodydark1 dark:bg-meta-4"
                  }`}
                >
                  <TbSmartHome />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/explore"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark hover:text-bodydark1 dark:hover:bg-meta-4 ${
                    pathname.includes("explore") &&
                    "bg-graydark text-bodydark1 dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineDashboardCustomize />
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/subscriptions"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark hover:text-bodydark1 dark:hover:bg-meta-4 ${
                    pathname.includes("subscriptions") &&
                    "bg-graydark text-bodydark1 dark:bg-meta-4"
                  }`}
                >
                  <BsBox2Heart />
                  My Subscriptions
                </Link>
              </li>
              <li>
                <Link
                  href="/requests"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark hover:text-bodydark1 dark:hover:bg-meta-4 ${
                    pathname.includes("requests") &&
                    "bg-graydark text-bodydark1 dark:bg-meta-4"
                  }`}
                >
                  <BsBellFill />
                  My Requests
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark hover:text-bodydark1 dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-graydark text-bodydark1 dark:bg-meta-4"
                  }`}
                >
                  <BsGearFill />
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <button
              onClick={() => {
                clearAuthToken();

                router.push("/auth/signin");
              }}
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-danger hover:text-bodydark1 dark:hover:bg-danger ${
                pathname.includes("settings") &&
                "bg-graydark text-bodydark1 dark:bg-meta-4"
              }`}
            >
              <BsDoorOpen />
              Logout
            </button>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
