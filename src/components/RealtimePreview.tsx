import React from 'react';
import { Link } from 'react-router-dom';

const RealtimePreview: React.FC = () => (
  <section className="w-full flex flex-col items-center justify-center py-14 md:py-20 bg-gradient-to-br from-white via-blue-50 to-fuchsia-50" id="features">
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full max-w-6xl px-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-50 via-blue-100 to-fuchsia-100 rounded-3xl shadow-2xl p-6 md:p-10 w-72 h-72 md:w-96 md:h-96 flex flex-col items-center justify-center relative overflow-hidden">
          <img src="/shirt_img0.jpg" alt="Realtime 3D Shirt Mockup" className="w-44 h-44 md:w-64 md:h-64 object-contain rounded-2xl mb-2 drop-shadow-xl animate-float" />
          {/* UI Preview */}
          <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-lg px-4 py-3 flex flex-col gap-2 w-36 md:w-48 border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 bg-blue-400 rounded-full inline-block" />
              <span className="text-xs font-bold text-gray-700">Mockup UI</span>
            </div>
            <div className="flex gap-2">
              <div className="w-7 h-7 bg-gray-200 rounded-md" />
              <div className="w-7 h-7 bg-gray-200 rounded-md" />
              <div className="w-7 h-7 bg-gray-200 rounded-md" />
              <div className="w-7 h-7 bg-gray-200 rounded-md" />
            </div>
          </div>
          {/* Sparkle */}
          <div className="absolute top-4 left-4 w-6 h-6 bg-yellow-300 rounded-full blur-md opacity-40 animate-pulse" />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h3 className="text-2xl md:text-4xl font-extrabold mb-3 text-gray-900 drop-shadow">Preview your Mockup in <span className="bg-gradient-to-r from-blue-400 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent">Realtime</span></h3>
        <p className="text-gray-600 mb-6 text-lg md:text-xl max-w-xs md:max-w-md font-medium">
          No waiting around – visualize your 3D mockups in the preview, inspect images and videos instantly. <span className="text-blue-500 font-semibold">What you see is what you get.</span>
        </p>
        <Link to="/app" className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-fuchsia-500 to-yellow-400 text-white font-bold shadow-lg hover:scale-105 transition text-lg">Get Started</Link>
      </div>
    </div>
  </section>
);

export default RealtimePreview;
