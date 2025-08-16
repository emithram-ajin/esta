import React from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
const API_URL= import.meta.env.VITE_API




export default function Whyemitram() {
  const navigate = useNavigate()
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/videos?page=Why-mithram`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Videos:", data);
        setVideos(data);
      })
      .catch(err => console.error("Error fetching videos:", err));
  }, []);


  const [images, setImages] = useState({});
  useEffect(() => {
    fetch(`${API_URL}/api/uploads?page=advantages`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched:", data);

        const grouped = {};
        data.forEach((img) => {
          if (img.position === "iconsection") {
            if (!grouped.iconsection) grouped.iconsection = [];
            grouped.iconsection.push(img);
          } else {
            grouped[img.position] = img;
          }
        });

        setImages(grouped);
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl bg-[#f6f3f3] py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 
    rounded-2xl sm:rounded-3xl mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-[35px] mb-3 sm:mb-4 md:mb-6 lg:mb-[20px] 
    shadow-sm sm:shadow-md lg:shadow-lg xl:shadow-xl">

          <div className="text-gray-800">
            {/* Header Section */}
            <div className="text-center lg:text-left">
              <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-bold sm:mt-4 md:mt-6 lg:mt-[15px] text-[#388CA0] px-2 lg:ml-[55px] font-anek'>
                എന്തുകൊണ്ട്   <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold '>&nbsp;e-Mithram</span>
              </span>
              <div className="w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 h-1 mt-2 sm:mt-3 lg:mt-[15px] mx-auto lg:mx-0 lg:ml-[70px] bg-[#388CA0]"></div>
            </div>


            <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 md:gap-8 lg:gap-7">
              {/* Text and Features Section */}
              <div className="w-full lg:flex-1 space-y-3 sm:space-y-4 md:space-y-6 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                {/* Description Text */}
                <div className="px-2 lg:px-0">
                  <p className="text-center lg:text-left lg:ml-[70px] text-[#227575] text-xs sm:text-sm md:text-base lg:text-[16px] xl:text-md font-bold font-anek leading-relaxed sm:leading-loose lg:leading-[1.5rem] max-w-none lg:max-w-[600px] xl:max-w-[700px]">

                    കേരളാ സ്റ്റാർട്ടപ്പ് മിഷന്റെയും, ഇന്ത്യ ഗവെർന്മെന്റിന്റെയും സപ്പോർട്ടോടുകൂടി പ്രവർത്തിക്കുന്ന 2940 ൽ അധികം വരുന്ന ഉപഭോക്തൃ സേവന കേന്ദ്രങ്ങളുടെ ശൃംഖലയാണ് ഇമിത്രം.
                    ഈ കഴിഞ്ഞ 10 വർഷംകൊണ്ട് 2940 ൽ അധികം മികച്ച സംരംഭകരെ വാർത്തെടുക്കാൻ ഇമിത്രത്തിനു കഴിഞ്ഞു. കഴിവും സ്ഥിരോത്സാഹവും ഉള്ളവർക്ക് നല്ല ഒരു സംരംഭം കുറഞ്ഞ
                    മുതൽമുടക്കിൽ തുടങ്ങാൻ ഇ മിത്രം നിങ്ങളെ സഹായിക്കുന്നു.              </p>
                </div>

                {/* Features and Stats Container */}
                <div className="flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left justify-center xl:justify-center ">
                  {/* Feature List */}
                  <div className="w-full xl:flex-1">
                    <div className="flex justify-center xl:justify-start">
                      <div className="grid grid-cols-1 gap-1.5 sm:gap-2 md:gap-2 text-[#227575] text-center xl:text-left px-2 lg:ml-[60px] font-medium">
                        {[
                          "Statewide Franchise Network",
                          "Exclusive Training",
                          "Proven Success Across Kerala",
                          "Continuous Quality Improvement",
                          "Quick Backend Support",
                          "Customer-Centric Approach"
                        ].map((text, index) => (
                          <div
                            key={index}
                            className="flex items-center text-left text-xs sm:text-sm md:text-base lg:text-lg xl:text-[16px] font-medium"
                          >
                            <img
                              src={images?.icons?.image}
                              alt="Verified Icon"
                              className="w-6 h-6 mr-2"
                            />          
                            <span className="w-full text-center xl:text-left">{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>


                  {/* Stats Box */}
                  <div ref={ref} className="w-full sm:w-auto mx-auto xl:mx-0 xl:flex-shrink-0 mt-3 sm:mt-4 xl:mt-0">
                    <div className="bg-[#f1f8fa] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-[180px] md:w-[200px] lg:w-[220px] shadow-sm rounded-tl-[15px] sm:rounded-tl-[20px] md:rounded-tl-[30px] rounded-tr-[15px] sm:rounded-tr-[20px] md:rounded-tr-[30px] rounded-bl-[0px] rounded-br-[15px] sm:rounded-br-[20px] md:rounded-br-[30px]">
                      <div className="text-[#298597] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                        {inView && <CountUp end={100} duration={1} suffix="%" />}
                      </div>
                      <div className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 md:mb-4">Success Rate</div>
                      <hr className="border-gray-300 my-1 sm:my-2" />
                      <div className="text-[#298597] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                        {inView && <CountUp end={2940} duration={1} suffix="+" />}

                      </div>
                      <div className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">Franchise</div>
                    </div>
                  </div>

                </div>

                {/* Register Button */}
                <div className="text-center xl:text-left px-2 lg:px-0 mt-4 sm:mt-6 font-poppins">
                  <button
                    className="text-white font-semibold py-2.5 px-5 sm:py-3 sm:px-6 md:py-2 md:px-8 h-10 lg:ml-[60px] rounded-tl-[8px] sm:rounded-tl-[10px] rounded-tr-[8px] sm:rounded-tr-[10px] rounded-bl-[8px]
                   sm:rounded-bl-[10px] rounded-br-[0px] hover:opacity-90 transition-all duration-300 text-md sm:text-sm md:text-xl"
                    style={{ background: "linear-gradient(to right, #0066E8, #00BBC0)" }}
                    onClick={() => {
                      navigate('/about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    More About
                  </button>
                </div>
              </div>

              {/* Video Section */}

               <div className="w-full lg:w-auto lg:flex-shrink-0 mt-4 sm:mt-6 lg:mt-[50px] mr-[38px]">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none lg:w-[490px] xl:w-[530px] h-40 sm:h-48 md:h-64 lg:h-[300px] xl:h-[360px] mx-auto bg-gradient-to-r from-teal-600 to-blue-700 rounded-xl sm:rounded-2xl lg:rounded-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] sm:shadow-[0_4px_25px_rgba(0,0,0,0.4)] lg:shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden relative">
                 {videos.map((vid, index) => (
                    <video
                      key={index}
                      src={`data:${vid.video.contentType};base64,${vid.video.data}`}
                      className="w-530px h-full object-cover"
                      autoPlay
                      loop
                      muted
                      controls
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Advantages */}
      <div
        className="relative text-white pt-12 sm:pt-16 pb-24 sm:pb-32"
        style={{
          background: "linear-gradient(to right, #44A1A0, #3687A2)",
        }}
      >
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
            Our <span className="font-bold">Advantages</span>
          </h2>
          <div className="h-1 w-[170px] bg-white mx-auto mt-5 "></div>
          <p className="mt-2 text-md md:text-md md:text-xl lg:text-md w-full sm:w-[500px] md:w-[600px] lg:w-[900px] mx-auto px-2 font-Poppins">
            Our business model works with the objective of expanding the scope of entrepreneurship among
          </p>
        </div>

        {/* Advantages Section */}
        <div className="mt-6 sm:mt-8 md:mt-12">
          {/* Large Screen Grid (lg and above) */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-2 sm:gap-2 lg:gap-3 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
              {Array.isArray(images.iconsection) &&
                images.iconsection.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-white transition-transform transform hover:scale-105 duration-300"
                  >
                    {/* Circle with Image */}
                    <div className="bg-white w-25 h-25 rounded-full flex items-center justify-center shadow-lg mb-3">

                      <img src={item.image}
                        alt={item.title} className="w-30 h-30 sm:w-16 sm:h-16 md:w-30 md:h-30 object-contain" />

                    </div>
                    {/* Count */}
                    {item.description && (
                      <p className="text-xl font-bold text-center text-white mb-1">
                        {item.description}
                      </p>
                    )}
                    {/* Title */}
                    <p className="text-[10px] font-semibold font-poppins text-center text-white leading-tight max-w-[100px]">
                      {item.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Small/Medium Screen Horizontal Scroll (below lg) */}
          <div className="block lg:hidden relative">
            {/* Scroll Container */}
            <div className="relative">
              <div
                className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory px-6 sm:px-8"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitScrollbar: { display: 'none' }
                }}
              >
                {Array.isArray(images.iconsection) &&
                  images.iconsection.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-white transition-transform transform hover:scale-105 duration-300 flex-shrink-0 snap-center"
                      style={{ minWidth: '140px' }}
                    >
                      {/* Circle with Image */}
                      <div className="bg-white w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg mb-3 sm:mb-4">
                        <img src={item.image}
                          alt={item.title} className="w-30 h-30 sm:w-16 sm:h-16 md:w-30 md:h-30 object-contain" />
                      </div>


                      {/* Count */}
                      {item.description && (
                        <p className="text-base sm:text-lg md:text-xl font-bold text-center text-white mb-1">
                          {item.description}
                        </p>
                      )}
                      {/* Title */}
                      <p className="text-xs sm:text-sm md:text-base font-poppins text-center text-white leading-tight max-w-[100px] sm:max-w-[120px] px-1">
                        {item.title}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="grayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F7F7F7" />
                <stop offset="60%" stopColor="#F7F7F7" />
                <stop offset="65%" stopColor="#F0F1F1" />
                <stop offset="100%" stopColor="#F0F1F1" />
              </linearGradient>
            </defs>
            <path
              fill="url(#grayGradient)"
              d="M0,320 C480,200 960,200 1440,320 L1440,320 L0,320 Z"
            />
          </svg>
        </div>

        {/* Custom CSS for hiding scrollbar */}
        <style >{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}
        </style>
      </div>
    </>
  );
}