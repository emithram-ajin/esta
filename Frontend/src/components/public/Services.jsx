import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
const API_URL= import.meta.env.VITE_API


function Services() {
    const [activeTab, setActiveTab] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [servicesData, setServicesData] = useState({});
    const [tabs, setTabs] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        fetch(`${API_URL}/api/services`)
            .then((res) => res.json())
            .then((raw) => {
                const data = Array.isArray(raw) ? raw : [raw];

                // Use 'name' primarily, fallback to 'category'
                const getCatKey = (cat) => (cat?.name || cat?.category || '').trim();

                const categoryNames = data
                    .map(getCatKey)
                    .filter(Boolean);

                const categoryObj = {};
                data.forEach((cat) => {
                    const key = getCatKey(cat);
                    // Ensure services array exists and keep subServices as-is (objects or strings)
                    const servicesArr = (cat?.services || []).map((svc) => ({
                        ...svc,
                        subServices: Array.isArray(svc?.subServices) ? svc.subServices : [],
                    }));
                    categoryObj[key] = servicesArr;
                });

                setTabs(categoryNames);
                setServicesData(categoryObj);

                if (categoryNames.length) {
                    setActiveTab((prev) => (categoryNames.includes(prev) ? prev : categoryNames[0]));
                }
            })
            .catch((err) => console.error('Error fetching services:', err));
    }, []);

    const handleCardClick = (service) => {
        setSelectedService(service);
    };

    const handleClosePopup = () => {
        setSelectedService(null);
    };

    return (
        <>
            <div className=" py-3 md:pl-14 pl-5">
                <Breadcrumbs />
            </div>
            <div className="relative pt-10 mb-10 max-w-7xl mx-auto px-4">
                <h2 className="flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-poppins">
                    <span className="text-[#1fb082]">OUR</span>
                    <span className="font-bold text-[#008C80]">SERVICES</span>
                </h2>

                <p
                    className="mt-6 max-w-7xl mx-auto text-base sm:text-lg md:text-xl text-[#008C80] px-8"
                    style={{ fontWeight: 400 }}
                >
                    At eMithram CSP, we offer both government and private services to the
                    public. For government services, we provide training and backend
                    support to help individuals access essential services offered by
                    various government agencies through citizen service portals. On the
                    private side, we partner with leading brands to make their services
                    accessible to both rural and urban residents simultaneously.
                    Additionally, we offer last-mile marketing services to these brands,
                    ensuring their reach extends to the remotest areas.
                </p>

                <div className="w-full max-w-7xl mx-auto px-4 mt-10">
                    {/* Tabs - Horizontal scroll on mobile */}
                    <div className="w-full mb-6">
                        <div
                            className="overflow-x-auto pb-2 mx-4 sm:mx-0 md:mx-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <style>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>
                            <div className="flex gap-3 sm:gap-4 md:gap-6 justify-start sm:justify-center min-w-max pl-4 sm:pl-0 px-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 sm:px-4 md:px-4 py-2 rounded-md border border-[#bbfdf6] text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold whitespace-nowrap flex-shrink-0 first:ml-0 ${activeTab === tab
                                                ? 'bg-[#00b39f] text-white'
                                                : 'bg-gray-100 text-[#4db0a5] hover:bg-gray-200'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                                <div className="w-4 sm:w-0 flex-shrink-0"></div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4">
                        <div className="w-full h-px bg-[#00b39f] my-4"></div>
                    </div>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium mb-6 px-4">
                        We provide training and support to help people access{' '}
                        {String(activeTab).toLowerCase()} services through citizen portals.
                    </p>

                    {/* Services Grid - Responsive grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
                        {servicesData[activeTab]?.map((service, idx) => (
                            <div
                                key={service._id || `${service.title}-${idx}`}
                                onClick={() => handleCardClick(service)}
                                className="bg-white shadow-md rounded-xl border border-[#00b39f] overflow-hidden text-center cursor-pointer transition-transform duration-300 hover:scale-105 min-w-[160px] w-full max-w-[280px] mx-auto"
                            >
                                <div className="w-full h-32 sm:h-32 md:h-34 lg:h-36 overflow-hidden bg-gray-100">
                                    <img
                                        src={service.image || "/placeholder.webp"}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/placeholder.webp";
                                        }}
                                        alt={service.title}
                                        className="w-full h-full object-fill"
                                    />
                                </div>

                                <div className="p-2 sm:p-3 font-semibold text-[#008C80] flex justify-center items-center gap-2 min-h-[50px] sm:min-h-[60px]">
                                    <span className='text-sm sm:text-base md:text-lg lg:text-xl leading-tight flex-1 text-left line-clamp-2'>
                                        {service.title}
                                    </span>
                                    <button className="bg-[#008C80] rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white flex items-center justify-center text-sm sm:text-base md:text-lg leading-none flex-shrink-0">
                                        ▼
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popup - Responsive */}
                {selectedService && (
                    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm bg-opacity-40 px-2 sm:px-4 py-4 sm:py-10 flex justify-center items-start overflow-y-auto">
                        <div className="bg-white rounded-xl max-w-3xl w-full p-4 sm:p-6 relative shadow-2xl my-4 sm:my-0">
                            <button
                                onClick={handleClosePopup}
                                className="absolute top-2 right-4 sm:right-6 text-gray-600 hover:text-red-500 text-2xl sm:text-3xl"
                            >
                                ×
                            </button>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#008C80] mb-4 pr-8">
                                {selectedService.title}
                            </h3>
                            <div>
                                {/* Heading Row */}
                                <div className="flex font-semibold text-[#008C80] mb-2 gap-4 sm:gap-10 border-t border-b border-[#008C80] text-lg sm:text-xl md:text-2xl py-2">
                                    <div className="w-16 sm:w-20 flex-shrink-0">Sl. No</div>
                                    <div className="flex-1">Service</div>
                                </div>

                                {/* Services List */}
                                {selectedService.subServices && selectedService.subServices.length > 0 ? (
                                    <ul className="space-y-2 ">
                                        {selectedService.subServices.map((sub, index) => {
                                            const label = typeof sub === 'string' ? sub : (sub?.name || sub?.title || '');
                                            const key = typeof sub === 'string' ? `${label}-${index}` : (sub?._id || index);
                                            return (
                                                <li
                                                    key={key}
                                                    className="flex cursor-pointer text-gray-700 hover:text-[#008C80] pb-1 gap-4 sm:gap-10"
                                                >
                                                    <div className="w-16 sm:w-20 font-semibold text-[#008C80] text-lg sm:text-xl md:text-xl flex-shrink-0">
                                                        {index + 1}.
                                                    </div>
                                                    <div className="text-lg sm:text-xl md:text-xl font-semibold text-[#008C80] flex-1 ">
                                                        {label}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p className="text-[#008C80] italic text-lg sm:text-xl mt-4 px-4 sm:px-6">
                                        No Services Available.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom CTA - Responsive */}
                <div className="w-full px-4 py-2 flex justify-center font-poppins mt-20">
                    <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-[#00C566] to-[#D1D900] rounded-xl px-4 sm:px-6 py-4 sm:py-3 shadow-md gap-4 sm:gap-0">
                        <h2 className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-center sm:text-left">
                            Your journey to income and impact begins here
                        </h2>
                        <button
                            onClick={() => {
                                navigate('/register');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="bg-white text-[#006F59] font-semibold text-sm sm:text-base px-5 py-2 rounded-full border border-[#006F59] hover:bg-gray-100 transition duration-200 whitespace-nowrap"
                        >
                            Apply for Franchise
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Services;