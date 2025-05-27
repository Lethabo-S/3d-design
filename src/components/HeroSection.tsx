import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => (
  <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 px-4 md:px-12 py-12 md:py-20 bg-gradient-to-br from-white via-blue-50 to-fuchsia-50 rounded-b-3xl shadow-2xl mt-2 md:mt-4 mx-0 md:mx-4 relative overflow-hidden">
    {/* Animated Blobs */}
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-blue-400 via-fuchsia-400 to-yellow-300 opacity-30 rounded-full blur-3xl animate-pulse z-0" />
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-yellow-300 via-fuchsia-400 to-blue-400 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
    <div className="flex-1 flex flex-col items-start max-w-full md:max-w-xl z-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-7 h-7 md:w-10 md:h-10 bg-gradient-to-br from-blue-400 to-fuchsia-400 rounded-full border-2 border-blue-500 shadow-lg animate-bounce" />
        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full shadow">Join 20,000+ Creators</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 leading-tight drop-shadow-lg">
        3D Animated Mockups <br className="hidden sm:block" /> in Seconds.
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-8 font-medium max-w-lg">
        Transform your 2D designs into stunning 3D—complete with vivid effects, walking animations, and seamless video export. <span className="bg-gradient-to-r from-blue-400 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent font-bold">No code. No hassle.</span>
      </p>
      <div className="flex gap-4 mb-2">
        <Link to="/app" className="px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-500 to-yellow-400 text-white text-lg font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all">Get Started Free</Link>
        <a href="#features" className="px-7 py-3 rounded-2xl border-2 border-blue-400 text-blue-700 font-bold bg-white hover:bg-blue-50 transition text-lg shadow">See Features</a>
      </div>
      <span className="text-xs text-gray-400 mt-2">No sign up. Just joy.</span>
    </div>
    <div className="flex-1 flex items-center justify-center w-full z-10">
      <div className="bg-gradient-to-br from-white via-blue-100 to-fuchsia-100 rounded-3xl shadow-2xl p-4 md:p-8 w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center relative overflow-hidden">
        <img src="/shirt_img0.jpg" alt="3D Shirt Mockup" className="w-full h-full object-contain rounded-2xl drop-shadow-2xl animate-float" />
        {/* Sparkle effect */}
        <div className="absolute top-6 right-8 w-8 h-8 bg-yellow-300 rounded-full blur-lg opacity-60 animate-ping" />
        <div className="absolute bottom-8 left-8 w-6 h-6 bg-fuchsia-400 rounded-full blur-md opacity-40 animate-pulse" />
      </div>
    </div>
  </section>
);

export default HeroSection;
