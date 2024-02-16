"use client";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";
import { useQuery } from "@apollo/client";
import { GET_PLANS_QUERY } from "@/graphql/query";
import { Plan } from "@/app/context/SubsContext";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const { data, loading, error } = useQuery(GET_PLANS_QUERY);
  if (loading) return <div>Loading...</div>;
  const plans = data?.findPlans;
  console.log(plans);
  const router = useRouter();
  return (
    <>
      {/* <!-- ===== Pricing Table Start ===== --> */}
      <section
        id="plans"
        className="pb-20 overflow-hidden pt-15 lg:pb-25 xl:pb-30"
      >
        <div className="px-4 mx-auto max-w-c-1315 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="mx-auto text-center animate_top">
            <SectionHeader
              headerInfo={{
                title: `PRICING PLANS`,
                subtitle: `Simple Pricing`,
                description: ``,
              }}
            />
          </div>
          {/* <!-- Section Title End --> */}
        </div>

        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="absolute w-full h-full -bottom-15 -z-1">
            <Image
              fill
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
            />
          </div>
          <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
              {plans?.map((plan) => (
                <div key={plan.id} className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none xl:p-12.5">
                <div className="absolute -right-3.5 top-7.5 -rotate-90 rounded-bl-full rounded-tl-full bg-primary px-4.5 py-1.5 text-metatitle font-medium uppercase text-white">
                  popular
                </div>
   
                <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                ₹{plan.price}{" "}
                  <span className="text-regular text-waterloo dark:text-manatee">
                    /month
                  </span>
                </h3>
                <h4 className="mb-2.5 text-para2 font-medium text-black dark:text-white">
                  {plan.name}
                </h4>
                  <h4 className="mb-5 mt-7.5 text-lg font-medium text-black dark:text-white">
                    Features
                  </h4>
                  <ul className="flex flex-col gap-3.5">
                    <li className="font-medium">Get Figma Source File</li>
                    <li className="font-medium">Use on Unlimited Projects</li>
                    <li className="font-medium">
                      Personal &amp; Commercial Use
                    </li>
                    <li className="font-medium">Downloadable Offline Files</li>
                    <li className="font-medium">Lifetime Free Updates</li>
                  </ul>
                  <button
                    onClick={() => {
                      router.push(`/auth/signin`);
                    }}
                    className="flex py-3 font-medium border rounded-md mt-9 border-primary px-9 text-primary hover:bg-primary hover:text-white"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Pricing Table End ===== --> */}
    </>
  );
};

export default Pricing;
