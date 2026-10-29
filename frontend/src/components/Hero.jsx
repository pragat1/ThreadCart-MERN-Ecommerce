import React from 'react';
import heroFashion from '../assets/hero-fashion.jpg';

const Hero = () => {
return (
<section className="relative w-full h-[calc(100vh-100px)] min-h-[500px] overflow-hidden">

        {/* Full-size background image */}
        <img
            src={heroFashion}
            alt="ThreadCart fashion collection"
            className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* Hero content */}
        <div className="relative z-10 flex h-full items-center px-8 md:px-16 lg:px-24">
            <div className="text-white">

                <div className="flex items-center gap-3 mb-4">
                    <p className="w-8 md:w-11 h-[2px] bg-white"></p>
                    <p className="font-medium text-sm md:text-base uppercase tracking-widest">
                        Our Best Sellers
                    </p>
                </div>

                <h1
                    className="text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6"
                    style={{ fontFamily: "'Prata', serif" }}
                >
                    Latest Arrivals
                </h1>

                <button
                    onClick={() => window.location.href = '/collection'}
                    className="flex items-center gap-3 font-semibold text-sm md:text-base tracking-widest border-b border-white pb-2 hover:opacity-75 transition-opacity"
                >
                    SHOP NOW <span className="text-xl">→</span>
                </button>

            </div>
        </div>

    </section>
);

};

export default Hero;