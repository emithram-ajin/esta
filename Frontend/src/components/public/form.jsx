import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL= import.meta.env.VITE_API



const Formpage = () => {

  const [images, setImages] = useState({});

  
    useEffect(() => {
      fetch(`${API_URL}/api/uploads?page=Formimage`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched:", data);
  
          const grouped = {};
          data.forEach((img) => {
            if (img.position === "banners" ) {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    agree: false,
    recaptchaToken: null,
  });
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const siteKey = "6LebTYYrAAAAACUW4X0bOsRWh4ZBkWxStx0uBPww";
  const recaptchaRef = useRef(null);

  const handleRecaptchaChange = (token) => {
    setFormData((prev) => ({
      ...prev,
      recaptchaToken: token,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.district &&
      formData.agree
    );
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isFormValid()) {
    toast.error("Please fill all fields and accept the terms and conditions");
    return;
  }

  if (!showRecaptcha) {
    setShowRecaptcha(true);
    return;
  }

  if (!formData.recaptchaToken) {
    toast.error("Please complete the reCAPTCHA verification");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/submit-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        district: formData.district,
        recaptchaToken: formData.recaptchaToken,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Form submitted  successfully!");
    } else {
      toast.success(result.message || "Submission failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Something went wrong, try again later.");
  }

  // Reset form and reCAPTCHA
  setFormData({
    name: "",
    email: "",
    phone: "",
    district: "",
    agree: false,
    recaptchaToken: null,
  });
  setShowRecaptcha(false);

  if (recaptchaRef.current) {
    recaptchaRef.current.reset();
  }
};

  return (
    <>
          <ToastContainer position="top-right" autoClose={3000} />

    <div className="order-1 lg:order-2 bg-white w-full sm:w-[450px] h-auto lg:h-[800px] mb-6 lg:mb-0">
      <div className="flex font-poppins justify-start items-start">
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-[500px] sm:max-w-md md:max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3 sm:mb-4 text-center">
            <h3 className="w-full text-center text-sm sm:text-base md:text-sm lg:text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent mb-3">
              . Registration Form .
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 text-xs sm:text-sm">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full placeholder-black border-b border-teal-400 focus:outline-none focus:border-blue-500 pb-1 px-2 text-sm sm:text-xs lg:text-xs"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full placeholder-black border-b border-teal-400 focus:outline-none focus:border-blue-500 pb-1 px-2 text-sm sm:text-xs lg:text-xs"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full placeholder-black border-b border-teal-400 focus:outline-none focus:border-blue-500 pb-1 px-2 text-sm sm:text-xs lg:text-xs"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
                className="w-full placeholder-black border-b border-teal-400 focus:outline-none focus:border-blue-500 pb-1 px-2 text-sm sm:text-xs lg:text-xs"
                required
              />
            </div>

            {!showRecaptcha && (
              <div className="flex items-start justify-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="w-4 h-4 flex-shrink-0"
                  required
                />
                <p className="text-[10px] sm:text-[8px] md:text-[10px] text-gray-500">
                  I accept the Terms and Conditions and Privacy Policy.
                </p>
              </div>
            )}

            {showRecaptcha && (
              <div className="flex justify-center mt-4">
                <div
                  className="transform origin-center"
                  style={{
                    transform: "scale(0.6)",
                    transformOrigin: "center",
                  }}
                >
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={handleRecaptchaChange}
                    theme="light"
                    size="normal"
                  />
                </div>
              </div>
            )}

            {/* Submit button always visible */}
           <button 
            type="submit" 
            className="w-[140px] sm:w-[140px] md:w-[170px] bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 sm:py-2.5 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity mx-auto block font-poppins rounded-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={showRecaptcha && !formData.recaptchaToken}
          >
            {showRecaptcha ? 'GET AFFILIATION' : 'GET AFFILIATION'}
          </button>
          </form>
        </div>
      </div>

      <div
        className="rounded-2xl mt-8 lg:mt-[50px] w-full max-w-[350px] h-[200px] sm:h-[250px] mx-auto flex flex-col md:flex-row items-center gap-4 overflow-hidden"
        style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
      >
{Array.isArray(images.banners) &&
  images.banners.map((item, index) => (
    <div
      key={index}
      className="w-[500px] h-full flex   overflow-hidden ml-[-30px]"  style={{  backgroundImage: images?.banners?.image ?
       url(`${images.banners.image}`): "url('/Mobile Banner@2x.webp')",  backgroundSize: "cover",
   }}>
     
    
{/*     
      <img src={item.image}
      /> */}
    </div>
  ))
}
      </div>
    </div>
    </>
  );
};

export default Formpage;
