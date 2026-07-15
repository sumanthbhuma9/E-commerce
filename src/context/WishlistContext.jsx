import React, { createContext, useState, useEffect, useContext } from 'react';
import { mergeWishlists } from '../utils/merge';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { addToast } = useToast();

  // Load from local storage or default to empty array
  const [wishlistA, setWishlistA] = useState(() => {
    const saved = localStorage.getItem('wishlistA');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistB, setWishlistB] = useState(() => {
    const saved = localStorage.getItem('wishlistB');
    return saved ? JSON.parse(saved) : [];
  });

  const [mergedWishlist, setMergedWishlist] = useState(() => {
    const saved = localStorage.getItem('mergedWishlist');
    return saved ? JSON.parse(saved) : null;
  });

  // Save to local storage whenever lists change
  useEffect(() => {
    localStorage.setItem('wishlistA', JSON.stringify(wishlistA));
  }, [wishlistA]);

  useEffect(() => {
    localStorage.setItem('wishlistB', JSON.stringify(wishlistB));
  }, [wishlistB]);

  useEffect(() => {
    if (mergedWishlist) {
      localStorage.setItem('mergedWishlist', JSON.stringify(mergedWishlist));
    } else {
      localStorage.removeItem('mergedWishlist');
    }
  }, [mergedWishlist]);

  // Actions for Wishlist A
  const addToA = (product) => {
    if (wishlistA.some(item => item.id === product.id)) return;
    setWishlistA(prev => [...prev, product]);
    addToast(`Added ${product.name} to Wishlist A`);
  };

  const removeFromA = (productId) => {
    setWishlistA(prev => prev.filter(item => item.id !== productId));
    addToast('Removed from Wishlist A', 'error');
  };

  const toggleInA = (product) => {
    const exists = wishlistA.some(item => item.id === product.id);
    if (exists) {
      removeFromA(product.id);
    } else {
      addToA(product);
    }
  };

  // Actions for Wishlist B
  const addToB = (product) => {
    if (wishlistB.some(item => item.id === product.id)) return;
    setWishlistB(prev => [...prev, product]);
    addToast(`Added ${product.name} to Wishlist B`);
  };

  const removeFromB = (productId) => {
    setWishlistB(prev => prev.filter(item => item.id !== productId));
    addToast('Removed from Wishlist B', 'error');
  };

  const toggleInB = (product) => {
    const exists = wishlistB.some(item => item.id === product.id);
    if (exists) {
      removeFromB(product.id);
    } else {
      addToB(product);
    }
  };

  // Merge Action
  const mergeLists = () => {
    const merged = mergeWishlists(wishlistA, wishlistB);
    setMergedWishlist(merged);
    addToast(`Merged! Previously: ${wishlistA.length + wishlistB.length} items total. Now: ${merged.length} items (deduplicated).`, 'success');
  };

  return (
    <WishlistContext.Provider value={{
      wishlistA, addToA, removeFromA, toggleInA,
      wishlistB, addToB, removeFromB, toggleInB,
      mergedWishlist, mergeLists, setMergedWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
