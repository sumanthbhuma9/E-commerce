import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Trash2, GitMerge, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function WishlistSection({ title, items, onRemove, icon: Icon, colorClass }) {
  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 text-center shadow-sm">
        <div className={`inline-flex p-4 rounded-full mb-4 bg-slate-50 dark:bg-slate-900 ${colorClass}`}>
          <Icon size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title} is empty</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Looks like you haven't added anything here yet.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          Start shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-900 ${colorClass}`}>
            <Icon size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        </div>
        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-semibold">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="flex-grow space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-colors group">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-900">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col flex-grow min-w-0">
              <span className="text-xs font-semibold text-primary uppercase mb-1">{item.category}</span>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">
                {item.name}
              </h4>
              <span className="font-bold text-slate-900 dark:text-white mt-auto">
                ₹{item.price.toLocaleString('en-IN')}
              </span>
            </div>
            {onRemove && (
              <button 
                onClick={() => onRemove(item.id)}
                className="p-2 h-fit rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Wishlists() {
  const { wishlistA, wishlistB, removeFromA, removeFromB, mergedWishlist, mergeLists, setMergedWishlist } = useWishlist();

  const totalOriginalItems = wishlistA.length + wishlistB.length;
  const canMerge = totalOriginalItems > 0;

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Your Wishlists
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Manage your curated lists. Combine them to easily remove duplicates and see your final selection.
          </p>
        </div>

        {/* Wishlist A & B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <WishlistSection 
            title="Wishlist A" 
            items={wishlistA} 
            onRemove={removeFromA}
            icon={Heart}
            colorClass="text-rose-500"
          />
          <WishlistSection 
            title="Wishlist B" 
            items={wishlistB} 
            onRemove={removeFromB}
            icon={Heart}
            colorClass="text-purple-500"
          />
        </div>

        {/* Merge Section */}
        <div className="relative flex justify-center mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-slate-200 dark:border-slate-700"></div>
          </div>
          <button
            onClick={mergeLists}
            disabled={!canMerge}
            className={`relative z-10 flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1 ${
              canMerge 
                ? 'bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-primary/25' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <GitMerge size={24} />
            Merge Lists
          </button>
        </div>

        {/* Merged Wishlist Result */}
        {mergedWishlist && (
          <div className="animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-1 shadow-lg border border-indigo-100 dark:border-indigo-900/50">
              <div className="bg-white dark:bg-slate-900 rounded-[22px] p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 text-center sm:text-left">
                  <div>
                    <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
                      Merged Wishlist
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Successfully deduplicated using O(n) algorithm. 
                      Reduced from <span className="font-bold text-slate-900 dark:text-white">{totalOriginalItems}</span> to <span className="font-bold text-primary">{mergedWishlist.length}</span> unique items.
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setMergedWishlist(null)}
                    className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Clear Merged List
                  </button>
                </div>

                {mergedWishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mergedWishlist.map(item => (
                      <div key={item.id} className="flex flex-col p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <div className="w-full aspect-square rounded-lg overflow-hidden mb-4 bg-white dark:bg-slate-900">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 mb-2">
                          {item.name}
                        </h4>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="font-bold text-primary">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs font-semibold px-2 py-1 bg-white dark:bg-slate-900 rounded text-slate-500">
                            ID: {item.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-slate-500">The merged list is empty.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
