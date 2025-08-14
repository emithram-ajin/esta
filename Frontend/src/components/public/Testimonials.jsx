import React, { useState, useRef,useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"
import { Star, ChevronDown, ChevronUp, HandCoins, Store } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
const API_URL= import.meta.env.VITE_API


// Dummy data
const testimonials = [
  {
    text: `Becoming an eMithram CSP changed my life. I not only earn a stable income but also help people in my community access essential services easily. It's more than a job it's a proud responsibility.`,
    name: "Santhosh T.J",
    role: "eMithram CSP Partner, Kannur",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    text: `Joining eMithram gave me purpose. I now run a successful service center in my village and I’m proud to serve my community.`,
    name: "Anjali M",
    role: "eMithram CSP Partner, Thrissur",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    text: `I was unemployed before this opportunity. Now I feel financially independent and respected in my area.`,
    name: "Rahul N",
    role: "eMithram CSP Partner, Palakkad",
    image: "https://i.pravatar.cc/100?img=3",
  },
];

const faqs = [
  {
    id: 1,
    question: "What types of services do you offer",
    answer:
      "Our business model works with the objective of expanding the scope of entrepreneurship among the common class of people by providing them with an ocean of opportunities under Common Services segment.",
  },
  {
    id: 2,
    question: "Our business model works with the objective of expanding",
    answer:
      "Our business model works with the objective of expanding the scope of entrepreneurship among the common class of people by providing them with an ocean of opportunities under Common Services segment.",
  },
  {
    id: 3,
    question: "Our business model works with the objective of expanding",
    answer:
      "Our business model works with the objective of expanding the scope of entrepreneurship among the common class of people by providing them with an ocean of opportunities under Common Services segment.",
  },
  {
    id: 4,
    question: "Our business model works with the objective of expanding",
    answer:
      "Our business model works with the objective of expanding the scope of entrepreneurship among the common class of people by providing them with an ocean of opportunities under Common Services segment.",
  },
];


function TestimonialSlider() {
  const [openAccordion, setOpenAccordion] = useState(false);
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const [images, setImages] = useState()

  useEffect(() => {
    fetch(`${API_URL}/api/uploads?page=review`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched:', data);

        const grouped = {};
        data.forEach(img => {
          grouped[img.position] = img;
        });

        setImages(grouped);
      })
      .catch(err => console.error('Error fetching images:', err));
  }, []);


  return (
    <>
      <section className="relative bg-[#F2F8F9] py-16 px-4 sm:px-6 lg:px-8 font-poppins overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-cyan-800 font-medium leading-snug md:leading-tight">
              Real stories, real trust hear from our{" "}
              <span className="font-bold">satisfied franchise owners</span>
            </h2>
            <div className="w-24 h-1 bg-cyan-700 mt-4 mb-6"></div>
            <p className="text-cyan-900 text-sm sm:text-base leading-relaxed sm:leading-loose">
              We take pride in empowering individuals through entrepreneurship.
              Through real-life stories and testimonials, hear how our eMithram
              CSP partners have transformed their livelihoods with stable income
              and community service. From delivering essential citizen services
              to building trust in their local areas, our CSPs share how
              eMithram has helped them create a meaningful impact.
            </p>
          </div>

          {/* Right: Testimonial Swiper */}
          <div className="relative w-full max-w-lg mx-auto md:mx-0 items-end">
            {/* Layered Backgrounds */}
            <div className="absolute top-[31px] left-0 right-0 h-[270px] bg-white rounded-tl-[60px] rounded-tr-[60px] rounded-br-[60px] shadow z-0"></div>
            <div className="absolute top-[27px] left-0 right-0 h-[270px] bg-white rounded-tl-[60px] rounded-tr-[60px] rounded-br-[60px] shadow z-10"></div>

            {/* Foreground Swiper Card */}
            <div className="relative z-20 bg-white rounded-tl-[60px] rounded-tr-[60px] rounded-br-[60px] shadow-lg overflow-hidden">
              <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                fadeEffect={{ crossFade: true }}
                className="w-full min-h-[270px]"
                speed={1000}
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="p-6 pt-8 text-center flex flex-col justify-between h-full">
                      <p className="text-gray-700 text-sm sm:text-base italic mb-4 leading-relaxed">
                        “{item.text}”
                      </p>

                      {/* Stars */}
                      <div className="flex justify-center space-x-1 text-yellow-400 text-lg mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400" />
                        ))}
                      </div>

                      <hr className="my-2" />

                      {/* Profile */}
                      <div className="flex items-center justify-center mt-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-full mr-3 border-2 border-gray-300 object-cover"
                        />
                        <div className="text-left">
                          <p className="text-cyan-800 font-semibold text-base">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-sm">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#FFFFFF"
              d="M0,320 C480,200 960,200 1440,320 L1440,320 L0,320 Z"
            />
          </svg>
        </div>
      </section>

      <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-center items-start transition-all duration-300 ease-in-out">
            {/* Left side - Image with badges */}
            <div className="relative order-2 lg:order-1" ref={ref}>
              {/* Mobile/Tablet Image */}
              <div className="relative lg:hidden min-h-[350px]">
                <div className="flex justify-center">
                  <img
                    src={images?.banner?.image }
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain"
                  />
                </div>

                {/* Badge 1 - Mobile - Slide in from right */}
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  animate={isInView ? { x: 100, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute top-4 left-1/2 -translate-x-1/2"
                >
                  <div
                    className="bg-white border border-teal-400 px-2 sm:px-3 py-1 shadow-sm flex items-center gap-1 sm:gap-2"
                    style={{ borderRadius: "6px" }}
                  >
                    <Store className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                    <span className="text-teal-600 text-xs sm:text-sm font-semibold">
                      2900+ Franchise
                    </span>
                  </div>
                </motion.div>

                {/* Badge 2 - Mobile - Slide in from left */}
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  animate={isInView ? { x: -100, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2"
                >
                  <div
                    className="bg-white border border-teal-400 px-2 sm:px-3 py-1 shadow-sm flex items-center gap-1 sm:gap-2"
                    style={{ borderRadius: "6px" }}
                  >
                    <HandCoins className="w-4 h-4 sm:w-4 sm:h-4 text-[#009689]" />
                    <span className="text-teal-600 text-xs sm:text-sm font-semibold">
                      Low Investment
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Desktop Image */}
              <div className="relative overflow-hidden hidden lg:block min-h-[400px]">
                <div className="overflow-hidden flex justify-center">
                  <img src={images?.banner?.image}
                   alt="Franchise Discussion"
                    className="w-90 h-100" />
                </div>

                {/* Badge 1 - Desktop - Slide in from right */}
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  animate={isInView ? { x: 100, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute top-10 left-1/2 -translate-x-1/2"
                >
                  <div
                    className="bg-white border border-teal-400 px-4 py-1 shadow-sm flex items-center gap-2"
                    style={{ borderRadius: "6px" }}
                  >
                    <Store className="w-4 h-4 text-[#009689]" />
                    <span className="text-teal-600 text-sm font-semibold">2900+ Franchise</span>
                  </div>
                </motion.div>

                {/* Badge 2 - Desktop - Slide in from left */}
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  animate={isInView ? { x: -100, opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                  <div
                    className="bg-white border border-teal-400 px-3 py-1 shadow-sm flex items-center gap-2"
                    style={{ borderRadius: "6px" }}
                  >
                    <HandCoins className="w-4 h-4 text-[#009689]" />
                    <span className="text-teal-600 text-sm font-semibold">LOW INVESTMENT</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right side - FAQ Section */}
            <div className="relative order-1 lg:order-2 lg:right-13">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 sm:mb-8 text-teal-600 text-center lg:text-left leading-tight font-semibold">
                Frequently <span className="font-bold">asked</span> questions
              </h2>

              <div className="space-y-3 sm:space-y-4 transition-all duration-300 ease-in-out">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className={`w-full px-3 sm:px-4 md:px-6 py-1 sm:py-2 text-left flex flex-col transition-colors ${openAccordion === faq.id
                        ? "bg-gradient-to-r from-[#1C9E9E] to-[#277F8E] text-white"
                        : "bg-white text-[#1C6E7C] hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-4">
                        <span className="font-semibold text-md sm:text-base md:text-base flex-1">
                          {faq.id}.{" "}
                          <span className="text-md sm:text-lg md:text-lg font-semibold">
                            {faq.question}
                          </span>
                        </span>
                        <div
                          className={`flex-shrink-0 w-4 h-4 sm:w-7 sm:h-7 flex items-center justify-center ${openAccordion === faq.id
                            ? "bg-white"
                            : "bg-gradient-to-r from-[#1C9E9E] to-[#277F8E]"
                            }`}
                          style={{ borderRadius: 6 }}
                        >
                          {openAccordion === faq.id ? (
                            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#3689A1]" />
                          ) : (
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffff]" />
                          )}
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {openAccordion === faq.id && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden bg-gradient-to-r from-[#1C9E9E] to-[#277F8E] text-white"
                          >
                            <div className="px-3 sm:px-4 md:px-6 py-1 sm:py-2">
                              <p className="text-xs sm:text-sm md:text-base">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default TestimonialSlider;
