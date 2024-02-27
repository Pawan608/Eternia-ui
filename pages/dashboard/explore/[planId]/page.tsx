"use client";

import { useAuth } from "context/AuthProvider";
import { useRequests } from "context/RequestContext";
import { useSubs } from "context/SubsContext";
import { REQUEST_SUB_MUTATION } from "graphql/mutation";
import { GET_PLAN_QUERY } from "graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

enum RequestType {
  NewSubscription = "NewSubscription",
  // ... other possible request types
}

type CreateRequestInput = {
  planId: string;
  requestType: RequestType; // Assuming 'requestType' can only be 'NewSubscription'
  userId: string;
};
const ProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const { userId } = useAuth();
  //get product id from params
  const planId = params?.planId || "";
  const {
    data: planData,
    loading: planLoading,
    error: planError,
  } = useQuery(GET_PLAN_QUERY, {
    variables: {
      planId: planId,
    },
    skip: !planId,
  });

  const plan = planData?.findPlan;
  const { subsData, subsError, subsLoading } = useSubs();
  const { requestsData, requestsError, requestsLoading } = useRequests();
  // Determine if the plan has an active subscription
  const userSubscriptions = subsData || [];
  const activeSubscription = userSubscriptions.find(
    (sub) => sub?.plan?.id === plan?.id && sub.status?.toLowerCase() == "active" // Assuming there's an `isActive` field to indicate active subscription
  );

  // Check if there's an active subscription and extract the active date
  const hasActiveSubscription = !!activeSubscription;

  // Determine if the plan has pending requests
  const hasPendingRequests = requestsData?.some(
    (request) =>
      request.plan.id === planId && request.status.toLowerCase() === "pending"
  );

  // Initialize the mutation with useMutation hook
  const [createRequest, { data, loading, error }] =
    useMutation(REQUEST_SUB_MUTATION);

  // Function to call the mutation
  const handleCreateRequest = async () => {
    const singlePlanId = Array.isArray(planId) ? planId[0] : planId;
    try {
      const createRequestInput: CreateRequestInput = {
        planId: singlePlanId,
        requestType: RequestType.NewSubscription,
        userId: userId,
      };
      await createRequest({ variables: { createRequestInput } });
      // Handle the response here
      if (data) {
        console.log("Request created:", data.createRequest);
      }
    } catch (err) {
      console.error("Error creating request:", err);
    }
  };
  const isLoading = planLoading || loading;
  return (
    <main>
      {/* Loading Indicator */}
      {(planLoading || subsLoading || requestsLoading) && (
        <div className="flex justify-center">
          <p>Loading...</p>
          {/* Consider using a spinner or animation here for better UX */}
        </div>
      )}

      {/* Main Content */}
      {!planLoading && !subsLoading && !requestsLoading && plan && (
        <div className="mb-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
              Explore <span className="text-blue-700">{plan.name}</span> Plan
            </h2>

            {/* Check for active subscription */}
            {hasActiveSubscription ? (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-green-600">
                  Already Subscribed
                </span>
                <button
                  onClick={() => router.push(`/subscriptions`)}
                  className={`rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-800`}
                >
                  Check Details
                </button>
              </div>
            ) : hasPendingRequests ? ( // Assuming hasPendingRequests is defined similar to the previous example
              <div className="text-sm text-yellow-600">Pending Request</div>
            ) : (
              <button
                onClick={handleCreateRequest}
                disabled={isLoading}
                className={`rounded px-4 py-2 font-bold text-white ${
                  isLoading ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-800"
                }`}
                title={
                  isLoading ? "Processing your request..." : "Subscribe to Plan"
                }
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
