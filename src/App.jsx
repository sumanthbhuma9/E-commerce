import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Wishlists from './pages/Wishlists';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Toast from './components/Toast';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <Router>
      <ToastProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wishlists" element={<Wishlists />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </main>
            <Toast />
          </div>
        </WishlistProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
