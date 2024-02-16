"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useSubs } from "@/app/context/SubsContext";
import Feedback from "@/components/home/dashboard/Feedback";
import ProductPurchaseModal from "@/components/home/explore/ProductPurchaseModal";
import { GET_PLANS_QUERY, GET_USER_SUB_DATA } from "@/graphql/query";
import useFormattedDate from "@/hooks/useFormattedDate";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Modal = ({ item, onClose }) => (
  <div className="fixed inset-0 z-50 flex overflow-auto bg-smoke-light">
    <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg">
      <span className="absolute top-0 right-0 p-4" onClick={onClose}>
        Close
      </span>
      <h2>{item.name}</h2>
      {/* Display more details about the item */}
    </div>
  </div>
);
export default function Explore() {
  const { loading, error, data } = useQuery(GET_PLANS_QUERY);
  const { subsData, subsError, subsLoading } = useSubs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const planData = data?.findPlans;
  // Assuming subData contains an array of subscriptions with a field 'packageId' that relates to the package
  const userSubscriptions = subsData || [];
  // Map over planData to add the 'hasActiveSubscription' flag
  const plansWithSubInfo = planData?.map((plan) => {
    // Find the active subscription for this package, if any
    const activeSubscription = userSubscriptions.find(
      (sub) => sub?.plan?.id === plan?.id && sub.status?.toLowerCase() == "active", // Assuming there's an `isActive` field to indicate active subscription
    );

    // Check if there's an active subscription and extract the active date
    const hasActiveSubscription = !!activeSubscription;
    const activeDateISO = activeSubscription
      ? activeSubscription.startDate
      : null; // Assuming `activeDate` field exists

      const date = new Date(activeDateISO);
    const activeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    // Return a new object with all properties of the package, plus the 'hasActiveSubscription' and 'activeDate' if applicable
    return { ...plan, hasActiveSubscription, activeDate };
  });

  const handleItemClick = (planId) => {
    router.push(`/explore/${planId}`);
  };
  return (
    <main>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
            Explore Plans
          </h2>
          {/* <p className="font-medium">Latest social statistics</p> */}
        </div>
      </div>
      <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          {plansWithSubInfo.map((plan) => (
            <div
              key={plan.id}
              className="shadow-default  rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5"
            >
              <span className="text-title-sm2 mb-2.5 block font-bold text-black dark:text-white">
                {plan.name}
              </span>
              <h3>
                <span className="text-xl font-medium text-black dark:text-white">
                  $
                </span>
                <span className="font-bold text-black text-title-xxl2 dark:text-white">
                  {plan.price}
                </span>
                <span className="font-medium"> Per {plan.billingCycle}</span>
              </h3>
              <h4 className="mb-5 mt-7.5 text-lg font-medium text-black dark:text-white">
                Features
              </h4>
              <ul className="flex flex-col gap-3.5">
                <li className="font-medium">Get Figma Source File</li>
                <li className="font-medium">Use on Unlimited Projects</li>
                <li className="font-medium">Personal &amp; Commercial Use</li>
                <li className="font-medium">Downloadable Offline Files</li>
                <li className="font-medium">Lifetime Free Updates</li>
              </ul>
              <button
                onClick={() => handleItemClick(plan.id)}
                className="flex py-3 font-medium border rounded-md mt-9 border-primary px-9 text-primary hover:bg-primary hover:text-white"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ProductPurchaseModal item={selectedItem} onClose={closeModal} />
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 2xl:gap-7.5">
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* <Feedback /> */}
        </div>
      </div>
    </main>
  );
}

{
  /* <div className="relative flex items-start justify-between">
<div className="flex-1">
  <div className="absolute right-0 -top-5">
    {item.hasActiveSubscription && (
      <span className=" rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-200 dark:text-green-900">
        Active
      </span>
    )}
  </div>
  <h3 className="mb-4 font-bold text-black text-title-lg dark:text-white">
    {item.name}
  </h3>
  <p className="font-medium">
    Empower Your Sales with Smart CRM Solutions
  </p>
  {!item.hasActiveSubscription ? (
    <span className="flex items-center gap-2 mt-2">
      <span className="text-sm font-medium">Starting from</span>
      <span className="flex items-center gap-1 p-1 text-xs font-medium text-white rounded-md bg-meta-7">
        <span>$12/user/month</span>
      </span>
    </span>
  ) : (
    <span className="flex items-center gap-2 mt-2">
      <span className="text-sm font-medium">Active since</span>
      <span className="flex items-center gap-1 p-1 text-xs font-medium text-white rounded-md bg-meta-3">
        <span>{item.activeDate}</span>
      </span>
    </span>
  )}
</div>
<div>
  <Image
    width={64}
    height={64}
    alt="zohologo"
    src={"/images/brand/zohologo.webp"}
  />
</div>
</div>
</div> */
}
