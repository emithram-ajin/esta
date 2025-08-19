import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "./Testimonials";
import { useEffect, useState } from 'react';
const API_URL= import.meta.env.VITE_API





function Servicesection() {
  const navigate = useNavigate();
  const [images, setImages] = useState({});


  useEffect(() => {
    fetch(`${API_URL}/api/uploads?page=Service`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched:", data);

        const grouped = {};
        data.forEach((img) => {
          if (img.position === "customer" || img.position === "iconsection1" || img.position === "iconsection2" || img.position === "iconsection3") {
            if (!grouped[img.position]) grouped[img.position] = [];
            grouped[img.position].push(img);
          } else {
            grouped[img.position] = img;
          }
        });

        setImages(grouped);
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Reusable service item component

  const ServiceItem = ({
    circleSize,
    iconSize,
    textSize,
    textWidth,
    mb,
  }) => {


    return (
      <div className="flex flex-col items-center text-center shrink-0">
        {Array.isArray(images.iconsection2) &&
          images.iconsection2.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain" // adjust size if needed
                />
              </div>
              <p className="text-[#2A8193] font-semibold">
                {item.title}
              </p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      {/* Domains page */}
      <div className="w-full bg-[url('/Banner.png')] bg-cover bg-center bg-no-repeat flex justify-center items-center px-3  font-poppins mb-0 md:-mb-7">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-10">

          {Array.isArray(images.customer) &&
            images.customer.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 hidden md:block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-64 md:w-72 lg:w-80 xl:w-80 h-auto rounded-xl"
                />
              </div>
            ))}


          {/* Text content on the right */}
          <div className="my-2 mt-2 sm:mt-3 md:mt-4 flex-1">
            <h1 className="text-[#3988A2] font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl pb-3 sm:pb-4 md:pb-4 lg:pb-5 xl:pb-4 px-4 sm:px-4 md:px-0">
              <span className="underline underline-offset-4">Doma</span>
              <span>ins</span>
            </h1>

            <p className="text-[#3988A2] text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-lg leading-relaxed font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 px-4 sm:px-4 md:px-0">
              Our business model works with the objective of expanding the scope
              of entrepreneurship among the common class of people by providing
              them with an ocean of opportunities under the Common Services
              segment. Our businesses have expanded all over the Kerala state
              with the increase in number of successful franchisees and happy
              entrepreneurs providing various government and non-government
              online services.
            </p>

            <div className="w-full overflow-x-auto">

              <div className="rounded-full bg-[#F3F7FA] flex justify-center items-center px-4 sm:px-5 md:px-6 lg:px-6 xl:px-6 py-3 sm:py-4 md:py-5 lg:py-5 xl:py-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 pb-7">
                {Array.isArray(images.iconsection1) &&
                  images.iconsection1.map((item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.title}
                      className="w-12 sm:w-14 md:w-16 lg:w-18 xl:w-20 h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 rounded-full object-cover flex-shrink-0"
                    />
                  ))}

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full  z-50 flex justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-4 font-poppins bg-[#F3F7FA]">
        <div className="w-full max-w-5xl bg-gradient-to-r from-[#00C566] to-[#D1D900] rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-2xl px-3 sm:px-4 md:px-5 lg:px-6 xl:px-4 py-3 sm:py-4 md:py-4 lg:py-5 xl:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 shadow-md">
          <div className="flex-1 w-full sm:w-auto">
            <h2 className="text-[13px] sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-semibold">
              ഇപ്പോൾ തന്നെ ഈ മിത്രം ജനസേവന കേന്ദ്രത്തിന്റെ ഭാഗമാകൂ
            </h2>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <button
              className="cursor-pointer bg-white text-[#12464F] px-4 sm:px-5 md:px-5 lg:px-6 xl:px-6 py-2 sm:py-2 md:py-2 lg:py-2 xl:py-2 rounded-full font-medium text-xs sm:text-sm md:text-sm lg:text-base xl:text-base hover:bg-gray-50 transition-all duration-200 shadow hover:shadow-lg hover:scale-105 whitespace-nowrap"
              onClick={() => {
                navigate('/register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Get Franchise
            </button>
          </div>
        </div>
      </div>


      {/* our services */}
      <section className="bg-[#F3F7FA] py-10 px-4 font-poppins">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#2A8193] mb-4">
            Our{" "}
            <span className="underline underline-offset-4 decoration-2 md:decoration-4 font-bold ">
              Services
            </span>
          </h2>
          <p className="text-[#2A8193] text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            Our business model works with the objective of expanding the scope
            of entrepreneurship among the common class of people by providing
            them with an ocean of opportunities under Common Services segment.
            Our businesses have expanded all over the Kerala state with the
            increase.
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 px-2 sm:px-4" style={{ width: "max-content" }}>
              {Array.isArray(images.iconsection2) &&
                images.iconsection2.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center shrink-0"
                  >
                    <div className="rounded-full overflow-hidden bg-white shadow-md border border-gray-200 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-40 h-40 object-cover"
                      />
                    </div>
                    <p className="text-[#2A8193] font-semibold text-sm sm:text-base max-w-[100px] mt-2">
                      {item.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-5 gap-8">
              {Array.isArray(images.iconsection2) &&
                images.iconsection2.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="rounded-full overflow-hidden bg-white shadow-md border border-gray-200 flex items-center justify-center w-24 h-24 xl:w-28 xl:h-28">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-50 h-50 object-cover"
                      />
                    </div>
                    <p className="text-[#2A8193] font-semibold text-base xl:text-lg mt-4">
                      {item.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </section>

      {/* our process */}
      <section className="w-full px-4 py-12 bg-white font-sans">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-2xl md:text-4xl text-cyan-700">
            Our{" "}
            <span className="text-cyan-700 underline font-bold">Process</span>
          </h2>
          <p className="text-cyan-700 mt-4 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Our business model works with the objective of expanding the scope
            of entrepreneurship among the common class of people by providing
            them with an ocean of opportunities under Common Services segment
          </p>

          {/* Steps - Desktop with connecting lines */}
          <div className="hidden md:flex relative mt-14 items-center justify-center gap-14">
                              <div className="absolute top-[40px]  w-[600px] h-0.5 bg-gray-300 z-0"></div>
            {Array.isArray(images.iconsection3) &&
              images.iconsection3.map((item, index) => (

                <div
                  key={index}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Top number circle */}
                  <div className="absolute -top-3 w-6 h-6 bg-[#DCE444] text-black text-xs font-bold rounded-full flex items-center justify-center shadow-md z-10">
                    {item.description}
                  </div>

                  {/* Icon circle */}
                  <div className="w-20 h-20 rounded-full border border-gray-300 bg-white shadow-md flex items-center justify-center overflow-hidden">
                    <img src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Title */}
                  {item.title && (
                    <h3 className="mt-4 text-cyan-700 font-semibold text-base">
                      {item.title}
                    </h3>

                  )}

                  {/* Connecting line (only between items) */}

                </div>
              ))}
          </div>

          {/* Steps - Mobile with horizontal scroll */}
          <div className="md:hidden mt-14">
            <div className="overflow-x-auto scrollbar-hide">
              <div
                className="flex gap-8 pb-4 px-2"
                style={{ minWidth: "max-content" }}
              >
                {Array.isArray(images.iconsection3) &&
                  images.iconsection3.map((item, index) => (
                    <div
                      key={index.id}
                      className="flex flex-col items-center text-center flex-shrink-0 min-w-[100px]"
                    >
                      {/* Icon + Number wrapper */}
                      <div className="relative w-20 h-20 mt-4">
                        {/* Top number circle */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#DCE444] text-black text-xs font-bold rounded-full flex items-center justify-center shadow-md z-10">
                          {item.description}
                        </div>
                        {/* Icon circle */}
                        <div className="w-full h-full rounded-full   flex items-center justify-center overflow-hidden">
                          <img src={item.image}
                            alt={item.title}
                            className="w-/4 h-3/4 object-contain"
                          />
                        </div>
                      </div>
                      {/* Title */}
                      {item.title && (
                        <h3 className="mt-4 text-cyan-700 font-semibold text-base">
                          {item.title}
                        </h3>)}

                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
export default Servicesection;
