import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL= import.meta.env.VITE_API
const site_key= import.meta.env.VITE_CAPTCHA_KEY



function Registration() {
  const initialFormData = {
    name: '',
    place: '',
    localBody: '',
    district: '',
    mobile: '',
    email: '',
    heardFrom: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [captchaStatus, setCaptchaStatus] = useState(false);

  const recaptchaRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.place.trim()) newErrors.place = "Place is required.";
    if (!formData.localBody) newErrors.localBody = "Select a local body.";
    if (!formData.district) newErrors.district = "Select a district.";
    if (!formData.mobile) newErrors.mobile = "Mobile is required.";
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email.";
    if (!formData.heardFrom) newErrors.heardFrom = "Select how you heard about us.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCaptchaChange = (token) => {
    if (token) {
      setCaptchaStatus(true);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!captchaStatus) {
    toast.error("Please complete the CAPTCHA");
    return;
  }

  if (validate()) {
    try {
      const response = await fetch(`${API_URL}/api/register-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result.message);

        toast.success("Form submitted successfully!");

        setFormData(initialFormData);
        setErrors({});
        setCaptchaStatus(false);

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData.message);
        toast.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network error, please try again"); 
    }
  }
};


  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex justify-center items-center px-2 py-6 sm:px-4">
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-4xl">
        <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6">
          e-Mithram Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name:</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded bg-white"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Place:</label>
              <input
                name="place"
                value={formData.place}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded  bg-white"
                placeholder="Enter your place"
              />
              {errors.place && <p className="text-red-500 text-sm">{errors.place}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Local body:</label>
              <select
                name="localBody"
                value={formData.localBody}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded  bg-white"
              >
                <option value="">--Select--</option>
                <option>Panchayath</option>
                <option>Municipality</option>
                <option>Corporation</option>
              </select>
              {errors.localBody && <p className="text-red-500 text-sm">{errors.localBody}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">District:</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded  bg-white"
              >
                <option value="">--Select--</option>
                <option>Thiruvananthapuram</option>
                <option>Kollam</option>
                <option>Pathanamtitta</option>
                <option>Alappuzha</option>
                <option>Kottayam</option>
                <option>Idukki</option>
                <option>Ernakulam</option>
                <option>Thrissur</option>
                <option>Palakkad</option>
                <option>Malappuram</option>
                <option>Kozhikkod</option>
                <option>Wayanad</option>
                <option>Kannur</option>
                <option>Kasargod</option>
              </select>
              {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Mobile:</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded  bg-white"
                placeholder="Enter your mobile number"
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email:</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full p-2 border border-gray-300 rounded  bg-white"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Centre Name:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded  bg-white"
                value="Emithram CSP"
                disabled
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                How did you hear about us:
              </label>
              <select
                name="heardFrom"
                value={formData.heardFrom}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded  bg-white"
              >
                <option value="">--Select--</option>
                <option>Facebook</option>
                <option>Newspaper</option>
                <option>Friends</option>
                <option>Google</option>
                <option>BDO</option>
                <option>BDM</option>
                <option>Others</option>
              </select>
              {errors.heardFrom && <p className="text-red-500 text-sm">{errors.heardFrom}</p>}
            </div>

            <div className="sm:col-span-2 flex justify-center mt-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={site_key}
                onChange={handleCaptchaChange}
              />
            </div>

            <div className="sm:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                disabled={!captchaStatus}
                className={`px-6 py-2 rounded transition-colors w-full sm:w-auto text-center text-sm sm:text-base ${
                  captchaStatus
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Registration;