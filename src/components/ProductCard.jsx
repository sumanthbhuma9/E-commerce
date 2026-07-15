import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, onClick }) {
  const { wishlistA, wishlistB, toggleInA, toggleInB } = useWishlist();
  const [showWishlistMenu, setShowWishlistMenu] = useState(false);

  const inWishlistA = wishlistA.some(item => item.id === product.id);
  const inWishlistB = wishlistB.some(item => item.id === product.id);
  const inAnyWishlist = inWishlistA || inWishlistB;

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setShowWishlistMenu(!showWishlistMenu);
  };

  const handleToggleA = (e) => {
    e.stopPropagation();
    toggleInA(product);
    setShowWishlistMenu(false);
  };

  const handleToggleB = (e) => {
    e.stopPropagation();
    toggleInB(product);
    setShowWishlistMenu(false);
  };

  // Click outside to close menu (simple implementation using onMouseLeave)
  return (
    <div 
      className="group relative flex flex-col bg-card dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 cursor-pointer"
      onClick={() => onClick(product)}
      onMouseLeave={() => setShowWishlistMenu(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={handleWishlistClick}
            className={`p-2.5 rounded-full backdrop-blur-md transition-colors shadow-sm ${
              inAnyWishlist 
                ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-500' 
                : 'bg-white/90 dark:bg-slate-800/80 text-slate-600 hover:text-rose-500'
            }`}
          >
            <Heart 
              size={18} 
              className={inAnyWishlist ? 'fill-current' : ''} 
            />
          </button>
          
          {/* Dropdown Menu */}
          {showWishlistMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden z-10 animate-in fade-in zoom-in duration-200">
              <div className="p-2 space-y-1">
                <button
                  onClick={handleToggleA}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between transition-colors"
                >
                  <span className="text-slate-800 dark:text-slate-300 font-medium">Wishlist A</span>
                  {inWishlistA && <Heart size={14} className="text-rose-500 fill-rose-500" />}
                </button>
                <button
                  onClick={handleToggleB}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between transition-colors"
                >
                  <span className="text-slate-800 dark:text-slate-300 font-medium">Wishlist B</span>
                  {inWishlistB && <Heart size={14} className="text-rose-500 fill-rose-500" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={14} className="fill-current" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {product.rating}
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg text-slate-900 dark:text-white leading-tight mb-3 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}
