import React, { useState, useRef } from 'react'
import Breadcrumbs from './Breadcrumbs';
import Formpage from './form'




const Refundpolicy = () => {
 
  return (
    <>
        <div className=" py-3 md:pl-10 ml-5">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-5 p-2 sm:p-4 justify-center font-poppins items-center">

        {/* Form Section - Shows first on mobile, second on desktop */}
       <Formpage />

        {/* Text Content Section - Shows second on mobile, first on desktop */}
        <div className="order-2 lg:order-1 p-2 sm:p-4 w-full lg:w-[850px] h-auto rounded text-[#008C7E] mb-8 lg:mb-[80px] font-poppins">
          <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-6 sm:space-y-8">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#008C7E] font-medium">
              Refund Policy | <span className="text-[#008C7E]">eMithram</span>
            </h1>

            {/* Introduction Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-[#008C7E]">
              Emithram.in is committed to providing our customers with the best possible service.
              However, due to the nature of our digital services, we are unable to offer refunds
              on any purchases.
            </p>

            {/* Products Section */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#008C7E] font-semibold mb-4">
                Our products and services are:
              </h2>
              <ul className="list-disc pl-4 sm:pl-6 space-y-3 text-[#008C7E] text-sm sm:text-base lg:text-lg font-poppins">
                <li>
                  Non-tangible and irrevocable. Once a purchase is made, the product or
                  service is immediately available for download or use.
                </li>
                <li>
                  Delivered electronically. This means there are no physical goods to return.
                </li>
              </ul>
            </div>

            {/* Agreement Section */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#008C7E] font-semibold mb-4">
                By purchasing a product or service from emithram, {' '}
                <span className="hidden lg:inline"><br /></span>
                you agree to the following:
              </h2>
              <ul className="list-disc pl-4 sm:pl-6 space-y-3 text-[#008C7E] text-sm sm:text-base lg:text-lg font-poppins">
                <li>You understand that all sales are final and non-refundable.</li>
                <li>
                  You have carefully reviewed the product or service description before making
                  a purchase.
                </li>
                <li>
                  You are aware that emithram.in reserves the right to modify this refund policy
                  at any time without prior notice.
                </li>
              </ul>
            </div>

            {/* Encourage Section */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#008C7E] font-semibold mb-4">
                We encourage you to:
              </h2>
              <ul className="list-disc pl-4 sm:pl-6 space-y-3 text-[#008C7E] text-sm sm:text-base lg:text-lg font-poppins">
                <li>
                  Read the product or service description carefully before making a purchase.
                </li>
                <li>
                  Contact us if you have any questions about our products or services.
                </li>
              </ul>
            </div>

            {/* Contact Line */}
            <p className="text-sm sm:text-base lg:text-lg text-[#008C7E] font-poppins">
              If you have any questions about this refund policy, please contact {' '}
              <span className="hidden lg:inline"><br /></span>
              us at <span className="font-semibold text-[#008C7E]">emithramcare@gmail.com</span>.
            </p>
          </div>
        </div>
      </div>


    </>
  )
}

export default Refundpolicy