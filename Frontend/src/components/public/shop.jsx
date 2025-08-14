import React from 'react';

export default function Shop() {
    const services = [
        {
            _id: '1',
            title: 'Printer',
            description: 'High-quality printers for your shop.',
            imageUrl: '/canon-e3370.webp',
            link:'https://www.flipkart.com/search?q=priner&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'

        },
        {
            _id: '2',
            title: 'Mini ATM',
            description: 'Secure mini ATM devices for Akshaya centers.',
            imageUrl: '/miniatm.webp',
            link:'https://www.flipkart.com/search?q=mini%20atm&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'
        },
        {
            _id: '3',
            title: 'Laptop',
            description: 'Affordable laptops for digital services.',
            imageUrl: '/laptopshop.webp',
            link:'https://www.flipkart.com/search?q=laptops&as=on&as-show=on&otracker=AS_Query_TrendingAutoSuggest_4_0_na_na_na&otracker1=AS_Query_TrendingAutoSuggest_4_0_na_na_na&as-pos=4&as-type=TRENDING&suggestionId=laptops&requestId=dc90b2ae-aff8-4f0b-ae2e-ee74ccb600fd'

        },
        {
            _id: '1',
            title: 'Printer',
            description: 'High-quality printers for your shop.',
            imageUrl: '/canon-e3370.webp',
            link:'https://www.flipkart.com/search?q=priner&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'

        },
        {
            _id: '2',
            title: 'Mini ATM',
            description: 'Secure mini ATM devices for Akshaya centers.',
            imageUrl: '/miniatm.webp',
            link:'https://www.flipkart.com/search?q=mini%20atm&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'
        },
        {
            _id: '3',
            title: 'Laptop',
            description: 'Affordable laptops for digital services.',
            imageUrl: '/laptopshop.webp',
            link:'https://www.flipkart.com/search?q=laptops&as=on&as-show=on&otracker=AS_Query_TrendingAutoSuggest_4_0_na_na_na&otracker1=AS_Query_TrendingAutoSuggest_4_0_na_na_na&as-pos=4&as-type=TRENDING&suggestionId=laptops&requestId=dc90b2ae-aff8-4f0b-ae2e-ee74ccb600fd'
        }, {
            _id: '1',
            title: 'Printer',
            description: 'High-quality printers for your shop.',
            imageUrl: '/canon-e3370.webp',
            link:'https://www.flipkart.com/search?q=priner&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'
        },
        {
            _id: '2',
            title: 'Mini ATM',
            description: 'Secure mini ATM devices for Akshaya centers.',
            imageUrl: '/miniatm.webp',
            link:'https://www.flipkart.com/search?q=mini%20atm&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'
        },

    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                SHOP NOW
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {services.map((service) => (
                    <div
                        key={service._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg px-4 py-4">
                            <img
                                src={service.imageUrl}
                                alt={service.title}
                                className="w-full h-full object-contain object-center"
                            />
                        </div>

                        <div className="p-4 flex flex-col items-center text-center">
                            <h2 className="text-lg font-semibold text-gray-800">{service.title}</h2>
                            <button
                            onClick={() => window.open(service.link, '_blank', 'noopener,noreferrer')} 
                            className="mt-4 px-4 py-2 bg-[#008C80] text-white rounded-full hover:bg-[#007066] text-sm">
                                BUY NOW
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
