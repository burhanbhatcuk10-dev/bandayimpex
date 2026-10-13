import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import CartDrawer from "./CartDrawer";
import { Toaster } from "./ui/toaster";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <BottomNav />
      <CartDrawer />
      <Toaster />
    </div>
  );
};

export default Layout;
