import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Brands from "./pages/Brands";
import ProductDetail from "./pages/ProductDetail";
import Sustainability from "./pages/Sustainability";
import Media from "./pages/Media";
import Investors from "./pages/Investors";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Brands />} />
      <Route path="/brands" element={<Navigate to="/products" replace />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/sustainability" element={<Sustainability />} />
      <Route path="/media" element={<Media />} />
      <Route path="/investors" element={<Investors />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

export default App;
