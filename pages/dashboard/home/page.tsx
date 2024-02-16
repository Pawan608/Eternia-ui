"use client";
import { useAuth } from "context/AuthProvider";
import { useSubs } from "context/SubsContext";
import NotificationCardHome from "components/ComponentsConsole/Common/NotificationCardHome";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { LoaderIcon } from "react-hot-toast";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { userId } = useAuth();
  console.log("USER", userId);
  // const userId = "cc2b01c1-2549-4add-a5c8-d6f70146f77a";
  const { subsData, subsError, subsLoading } = useSubs();

  return (
    <main>
      <div className="mb-5 ">
        <div>
          <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
            Active Subscriptions
          </h2>
          {/* <p className="font-medium">Latest social statistics</p> */}
        </div>
        <NotificationCardHome />
      </div>
      {subsLoading ? (
        <LoaderIcon />
      ) : subsData && subsData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 2xl:gap-7.5">
          {subsData.map((sub) => (
            <div
              key={sub.id}
              className="shadow-default rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5"
            >
              <Image
                width={64}
                height={64}
                alt="zohologo"
                src={"/images/brand/zohologo.webp"}
              />
              <h4 className="mt-5 mb-2 font-medium"></h4>
              <h3 className="mb-2 font-bold text-black text-title-md dark:text-white">
                {sub.plan.name}
              </h3>
              <p className="flex items-center gap-1 text-sm font-medium">
                <span className="text-meta-3">{sub.status}</span>
                <span>
                  since{" "}
                  {new Date(sub.startDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </p>
            </div>
          ))}

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            {/* <Feedback /> */}
          </div>
        </div>
      ) : (
        <h1>No Active Subscriptions</h1>
      )}
    </main>
  );
};

export default Home;
