import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Sun, Moon, User, Store } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { wishlistA, wishlistB } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const totalWishlistItems = wishlistA.length + wishlistB.length;

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/75 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg text-white">
              <ShoppingBag size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              LuxeStore
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Store size={18} />
              </div>
              <span className="hidden sm:inline">Shop</span>
            </Link>
            
            <Link 
              to="/wishlists" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/wishlists' ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}
            >
              <div className="relative">
                <Heart size={20} className={location.pathname === '/wishlists' ? 'fill-primary text-primary' : ''} />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Wishlists</span>
            </Link>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            <Link 
              to="/login"
              className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                <User size={18} />
              </div>
              <span className="hidden sm:inline">Sign In</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
