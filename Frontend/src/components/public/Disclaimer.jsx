import React, { useState } from 'react'
import Breadcrumbs from './Breadcrumbs';
import Formpage from './form'

const Disclaimer = () => {
 
  return (
    <>
        <div className=" py-3 md:pl-7 ml-5">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-5 p-2 sm:p-4 justify-center font-poppins items-center">

       <Formpage />

        {/* Text Content Section - Shows second on mobile, first on desktop */}
        <div className="order-2 lg:order-1 p-2 sm:p-4 w-full lg:w-[850px] h-auto rounded text-[#008C7E] mb-8 lg:mb-[80px] font-poppins">
          <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-6 sm:space-y-8">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-5xl text-[#008C7E] font-medium">
              Disclaimer
            </h1>
            {/* Introduction Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-[#008C7E]">
              The information provided on this website (emithram.in) is for general informational purposes only and
              should not be considered professional advice. While we strive to ensure the accuracy and completeness
              of the information, we cannot guarantee its reliability.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-[#008C7E]">
              Emithram.in and its owners assume no responsibility for any errors, omissions, or inaccuracies in
              the content. The use of any information obtained from this website is at your own risk.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-[#008C7E]">
              This website may contain links to external websites that are not maintained by emithram.in. We are not
              responsible for the content or privacy practices of these third-party websites.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-[#008C7E]">
              The information on this website is subject to change without notice.
            </p>
            {/* Encourage Section */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-2xl text-[#008C7E] font-semibold mb-4">
                Disclaimer of Warranties
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#008C7E]">
                Emithram.in disclaims all warranties, express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
              </p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-2xl text-[#008C7E] font-semibold mb-4">
                Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#008C7E]">
                In no event shall emithram.in or its owners be liable for any damages whatsoever, including but not limited to
                direct, indirect, incidental, consequential, or punitive damages, arising out of or in connection with the use
                of this website or the information contained herein.
              </p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-2xl text-[#008C7E] font-semibold mb-4">
                This disclaimer is subject to change without notice.
              </h2>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
export default Disclaimer