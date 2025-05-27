import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-white/80 shadow-sm sticky top-0 z-20 gap-4 md:gap-0">
    <div className="flex items-center gap-2">
      <img src="/shirt_img0.jpg" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow" />
      <span className="font-bold text-lg md:text-xl text-blue-700 tracking-tight">3D Outfit Designer</span>
    </div>
    <nav className="flex gap-4 md:gap-8 text-gray-600 font-medium text-sm md:text-base">
      <a href="#features" className="hover:text-blue-500 transition">3D Mockup Generator</a>
      <a href="#products" className="hover:text-blue-500 transition">Products</a>
      <a href="#pricing" className="hover:text-blue-500 transition">Pricing</a>
    </nav>
    <div className="flex gap-2 md:gap-3">
      <Link to="/app" className="px-4 md:px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-fuchsia-500 to-yellow-400 text-white font-bold shadow hover:scale-105 transition text-sm md:text-base">Try Free</Link>
      <button className="px-4 md:px-5 py-2 rounded-lg border border-blue-400 text-blue-600 font-bold bg-white hover:bg-blue-50 transition text-sm md:text-base">Upgrade</button>
    </div>
  </header>
);

export default Header;
