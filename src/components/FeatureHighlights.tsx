import React from 'react';
import { Link } from 'react-router-dom';

const FeatureHighlights: React.FC = () => (
  <section className="w-full max-w-7xl mx-auto py-16 md:py-24 px-2 md:px-0">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
      {/* Knitting Animation */}
      <div className="flex flex-col items-center md:items-start">
        <div className="w-full flex justify-center mb-6">
          <img src="/cotton.avif" alt="Knitting Animation" className="rounded-3xl shadow-2xl w-80 h-48 object-cover border-4 border-blue-100" />
        </div>
        <span className="uppercase text-xs font-bold text-blue-500 mb-2 tracking-widest">New Feature</span>
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900">Knitting Animation</h3>
        <p className="text-gray-600 text-lg md:text-xl max-w-md font-medium">
          Simulate the process of fabric knitting in beautiful smooth animation—available on most mockups, with even more coming soon.
        </p>
      </div>
      {/* Control Animation Speed */}
      <div className="flex flex-col items-center md:items-end">
        <div className="w-full flex justify-center mb-6">
          <img src="/shirt_img1.jpg" alt="Control Animation Speed" className="rounded-3xl shadow-2xl w-80 h-48 object-cover border-4 border-fuchsia-100" />
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900">Control Animation Speed</h3>
        <p className="text-gray-600 text-lg md:text-xl max-w-md font-medium">
          Control the pace of your 3D mockup's signature animation, speed up/slow down to showcase your design exactly how you want.
        </p>
        <Link to="/app" className="mt-4 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-fuchsia-500 to-yellow-400 text-white font-bold shadow-lg hover:scale-105 transition text-lg">Get Started</Link>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mt-16">
      {/* Customize Your Mockup Background */}
      <div className="flex flex-col items-center md:items-start md:col-span-2">
        <div className="w-full flex justify-center mb-6">
          <img src="/shirt_img2.jpg" alt="Customize Your Mockup Background" className="rounded-3xl shadow-2xl w-[28rem] h-48 object-cover border-4 border-yellow-100" />
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900">Customize Your Mockup Background</h3>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl font-medium">
          Make your mockups pop or fit your brand by uploading a custom image or design as background, giving every creation a unique touch.
        </p>
      </div>
    </div>
  </section>
);

export default FeatureHighlights;
