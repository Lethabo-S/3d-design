import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full text-center py-6 md:py-8 text-gray-400 text-sm md:text-base bg-gradient-to-br from-white via-blue-50 to-fuchsia-50 mt-auto border-t border-gray-100">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      <div className="flex flex-col items-center md:items-start">
        <span className="font-bold text-blue-700 text-lg">3D Outfit Designer</span>
        <span className="text-xs text-gray-400">Transforming your 2D clothing ideas into stunning 3D mockups.</span>
        <div className="flex gap-2 mt-2">
          <a href="#" className="hover:text-blue-500" title="Facebook" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
          <a href="#" className="hover:text-pink-500" title="Instagram" aria-label="Instagram"><i className="fab fa-instagram" /></a>
          <a href="#" className="hover:text-blue-400" title="Twitter" aria-label="Twitter"><i className="fab fa-twitter" /></a>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-semibold text-gray-700">Learn More</span>
        <a href="#features" className="text-blue-500 hover:underline text-sm">Features</a>
        <a href="#pricing" className="text-blue-500 hover:underline text-sm">Pricing</a>
        <a href="mailto:delvin@outfitmock.io" className="text-blue-500 hover:underline text-sm">Contact</a>
      </div>
      <div className="flex flex-col items-center md:items-end">
        <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} 3D Outfit Designer. All rights reserved.</span>
        <span className="text-xs text-gray-400">Crafted with <span className="text-pink-400">♥</span> for creators.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
