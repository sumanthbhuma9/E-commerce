import React from 'react';
import { X, Star, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetailsModal({ product, onClose }) {
  const { wishlistA, wishlistB, toggleInA, toggleInB } = useWishlist();

  if (!product) return null;

  const inWishlistA = wishlistA.some(item => item.id === product.id);
  const inWishlistB = wishlistB.some(item => item.id === product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-slate-100 dark:bg-slate-800 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {product.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current opacity-50" />
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {product.rating} Rating
              </span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex gap-4">
              <button 
                onClick={() => toggleInA(product)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border-2 ${
                  inWishlistA 
                    ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-900/20' 
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-300 hover:text-rose-500'
                }`}
              >
                <Heart size={20} className={inWishlistA ? 'fill-current' : ''} />
                {inWishlistA ? 'In Wishlist A' : 'Add to Wishlist A'}
              </button>
              
              <button 
                onClick={() => toggleInB(product)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border-2 ${
                  inWishlistB 
                    ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-900/20' 
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-300 hover:text-rose-500'
                }`}
              >
                <Heart size={20} className={inWishlistB ? 'fill-current' : ''} />
                {inWishlistB ? 'In Wishlist B' : 'Add to Wishlist B'}
              </button>
            </div>
            
            <button className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90 text-white transition-all shadow-lg hover:shadow-xl">
              <ShoppingBag size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
