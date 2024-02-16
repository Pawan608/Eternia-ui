import React from "react";

const ProductPurchaseModal = ({item, onClose}) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center block w-full h-full min-h-screen px-4 py-5 z-999999 bg-black/90">
      <div className="max-w-142.5 dark:bg-boxdark w-full rounded-lg bg-white px-8 py-12 text-center md:px-17.5 md:py-15">
        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          Your Message Sent Successfully
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        <p className="mb-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since
        </p>
        <div className="flex flex-wrap -mx-3 gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button className="block w-full p-3 font-medium text-center text-white transition border rounded border-primary bg-primary hover:bg-opacity-90">
              Request Activation
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button onClick={onClose} className="block w-full p-3 font-medium text-center text-black transition border rounded bg-gray hover:border-meta-1 hover:bg-meta-1 dark:bg-meta-4 dark:hover:border-meta-1 dark:hover:bg-meta-1 border-stroke hover:text-white dark:border-strokedark dark:text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPurchaseModal;
