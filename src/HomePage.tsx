import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-fuchsia-50 to-yellow-50 flex flex-col">
      <Header />
      <HeroSection />
      <ProductGrid />
      {/* Preview your Mockup in Realtime Section */}
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
      {/* Testimonials Section */}
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
      {/* Feature Highlights Section */}
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
      {/* Pricing & FAQ Section */}
      <section id="pricing" className="w-full bg-gradient-to-br from-white via-blue-50 to-fuchsia-50 py-16 md:py-24 px-2 md:px-0 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900 tracking-tight">Fair Pricing for Small Businesses.</h2>
          <p className="text-center text-gray-500 mb-10 text-lg md:text-xl">We understand small businesses can sign up for budgetary use, you can use our app for free. If you like to support us, you can purchase one of the premium subscription plans.</p>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center mb-10 w-full">
            {/* Basic Plan */}
            <div className="flex-1 bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-start max-w-xs w-full border-2 border-blue-100 hover:scale-105 transition-all min-w-[220px] sm:min-w-[260px] mx-auto md:mx-0">
              <span className="font-bold text-2xl text-gray-800 mb-2">Basic</span>
              <span className="text-base text-gray-500 mb-3">Free forever</span>
              <ul className="text-gray-700 text-base mb-6 space-y-2">
                <li>✔️ Create 3D Mockups</li>
                <li>✔️ Image export</li>
                <li>✔️ Adjust Garment Color</li>
              </ul>
              <button className="mt-auto px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold text-base shadow hover:bg-blue-50 transition w-full">Get started</button>
            </div>
            {/* Pro Plan */}
            <div className="flex-1 bg-gradient-to-br from-blue-600 via-fuchsia-600 to-yellow-400 rounded-3xl shadow-2xl p-8 flex flex-col items-start max-w-xs w-full text-white border-2 border-fuchsia-200 hover:scale-105 transition-all min-w-[220px] sm:min-w-[260px] mx-auto md:mx-0 mt-6 md:mt-0">
              <span className="font-bold text-2xl mb-2">PRO</span>
              <span className="text-base mb-3">$19/month</span>
              <ul className="text-white text-base mb-6 space-y-2">
                <li>✔️ All features, video export and more, constantly new</li>
                <li>✔️ Custom background image</li>
                <li>✔️ Video export</li>
                <li>✔️ Unlimited export</li>
                <li>✔️ Email support</li>
                <li>✔️ Attach all elements</li>
              </ul>
              <button className="mt-auto px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-base shadow hover:bg-blue-50 transition w-full">Get started</button>
            </div>
          </div>
         
          {/* FAQ */}
                
        </div>
      </section>
      {/* Footer */}
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
    </div>
  );
}
