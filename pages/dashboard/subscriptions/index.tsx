"use client";
import { useSubs } from "context/SubsContext";
import Breadcrumb from "components/ComponentsConsole/home/Breadcrumb";
import SubscriptionTable from "components/ComponentsConsole/home/subscriptions/SubscriptionTable";
import RootLayout from "components/ComponentsConsole/Layout/layout";
import { NextPageWithLayout } from "pages/_app";

const Subscription: NextPageWithLayout = () => {
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
};
Subscription.getLayout = function getLayout(page: React.ReactElement) {
  // const { announcement, header, footer } = page.props;
  return <RootLayout>{page}</RootLayout>;
};

export default Subscription;
