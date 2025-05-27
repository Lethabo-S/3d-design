import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { name: 'T-Shirt', img: '/shirt_img0.jpg', route: '/app?item=shirt', label: 'NEW' },
  { name: 'V-Neck', img: '/shirt_img1.jpg', route: '/app?item=vneck' },
  { name: 'Sweatshirt', img: '/shirt_img2.jpg', route: '/app?item=sweatshirt' },
  { name: 'Short Sleeve', img: '/shirt_img3.jpg', route: '/app?item=shortsleeve' },
  { name: 'Blazer', img: '/blazer.glb', route: '/app?item=blazer' },
  { name: 'Hoodie', img: '/view.jpg', route: '/app?item=hoodie', label: 'NEW' },
  { name: 'Polo', img: '/may.png', route: '/app?item=polo' },
  { name: 'Jacket', img: '/baked_img0.jpg', route: '/app?item=jacket' },
  { name: 'Pants', img: '/pants_img0.png', route: '/app?item=pants' },
  { name: 'Cap', img: '/686.jpg', route: '/app?item=cap', comingSoon: true },
  { name: 'Coming Soon', img: '', comingSoon: true },
];

const ProductGrid: React.FC = () => (
  <section id="products" className="w-full max-w-7xl mx-auto py-14 md:py-20">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-4 md:mb-8 text-gray-900 tracking-tight">Convert your 2D Designs to <span className="bg-gradient-to-r from-blue-400 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent">3D</span></h2>
    <p className="text-center text-gray-500 mb-8 md:mb-12 text-lg md:text-xl">Select one of our items, add your design, and export. <span className="font-semibold text-blue-500">It’s that easy.</span></p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10 px-2 md:px-4">
      {products.map((p, i) => (
        <div key={i} className={`bg-white rounded-3xl shadow-xl flex flex-col items-center p-4 md:p-6 relative group hover:shadow-2xl transition min-h-[200px] border-2 ${p.label ? 'border-blue-400' : 'border-transparent'} ${p.comingSoon ? 'opacity-60' : ''}`}>
          {p.label && <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">{p.label}</span>}
          {p.comingSoon ? (
            <div className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center bg-gray-100 rounded-2xl text-gray-400 font-bold text-lg md:text-xl border-2 border-dashed border-gray-300">{p.name}</div>
          ) : (
            <Link to={p.route || '/app'}>
              <img src={p.img} alt={p.name} className="w-24 h-24 md:w-36 md:h-36 object-contain rounded-2xl mb-3 group-hover:scale-110 transition-all drop-shadow-lg" />
            </Link>
          )}
          <span className="text-base md:text-lg font-semibold text-gray-800 mt-2 text-center">{p.name}</span>
          {!p.comingSoon && <Link to={p.route || '/app'} className="mt-3 px-4 md:px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 via-fuchsia-500 to-yellow-400 text-white text-xs md:text-sm font-bold shadow hover:scale-105 transition-all">Customize 3D</Link>}
          {p.comingSoon && <span className="mt-3 px-4 md:px-6 py-2 rounded-xl bg-gray-200 text-gray-400 text-xs md:text-sm font-bold">Coming Soon</span>}
        </div>
      ))}
    </div>
  </section>
);

export default ProductGrid;
