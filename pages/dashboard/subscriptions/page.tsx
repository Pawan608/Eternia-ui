"use client";
// import { useSubs } from "@/app/context/SubsContext";
import { useSubs } from "context/SubsContext";
import Breadcrumb from "components/ComponentsConsole/home/Breadcrumb";
import SubscriptionTable from "components/ComponentsConsole/home/subscriptions/SubscriptionTable";

export default function Subscription() {
  const { subsData, subsError, subsLoading } = useSubs();
  if (subsLoading) return <p>Loading...</p>;
  if (subsError) return <p>Error :(</p>;
  return (
    <>
      <Breadcrumb pageName="Subscriptions" />

      <div className="flex flex-col gap-10">
        {subsData && <SubscriptionTable subscriptionsData={subsData} />}
      </div>
    </>
  );
}
