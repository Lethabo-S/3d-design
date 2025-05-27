import React from 'react';

const Testimonials: React.FC = () => (
  <section className="w-full bg-gradient-to-br from-gray-900 via-blue-950 to-fuchsia-900 py-16 md:py-24 px-2 md:px-0">
    <div className="max-w-6xl mx-auto">
      <h4 className="text-white text-2xl md:text-4xl font-extrabold mb-12 text-center tracking-tight">What our Customers Say</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
        {/* Testimonial 1 */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-4 border-t-4 border-blue-400 hover:scale-105 transition-all">
          <div className="flex items-center gap-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Amir Benaouida" className="w-12 h-12 rounded-full border-2 border-blue-400 shadow" />
            <div>
              <div className="font-bold text-gray-800 text-base">Amir Benaouida</div>
              <div className="text-xs text-gray-400">Customer/Artist</div>
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
          <p className="text-gray-700 text-base mt-2 font-medium">
            "Really shocked, just what I want to create creative video ads for my clothing brand. With ability to preview and rotate, I hope to see UI video export feature soon!"
          </p>
        </div>
        {/* Testimonial 2 */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-4 border-t-4 border-fuchsia-400 hover:scale-105 transition-all">
          <div className="flex items-center gap-4">
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Wafyank" className="w-12 h-12 rounded-full border-2 border-fuchsia-400 shadow" />
            <div>
              <div className="font-bold text-gray-800 text-base">Wafyank</div>
              <div className="text-xs text-gray-400">YouTube comment</div>
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
          <p className="text-gray-700 text-base mt-2 font-medium">
            "Very nice unique application!"
          </p>
        </div>
        {/* Testimonial 3 */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-4 md:col-span-2 md:w-2/3 md:mx-auto border-t-4 border-yellow-400 hover:scale-105 transition-all">
          <div className="flex items-center gap-4">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Aiden S" className="w-12 h-12 rounded-full border-2 border-yellow-400 shadow" />
            <div>
              <div className="font-bold text-gray-800 text-base">Aiden S</div>
              <div className="text-xs text-gray-400">YouTube Comment</div>
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
          <p className="text-gray-700 text-base mt-2 font-medium">
            "Absolutely amazing, we will be trying this out for our clothing brand in the coming days!"
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
