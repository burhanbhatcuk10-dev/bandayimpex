import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Newspaper, Briefcase, Mail } from "lucide-react";
import { useData } from "../DataContext";

const BottomNav = () => {
  const { c } = useData();
  const items = [
    { to: "/", label: c("bottomnav.home"), icon: Home, end: true },
    { to: "/products", label: c("bottomnav.products"), icon: ShoppingBag },
    { to: "/media", label: c("bottomnav.news"), icon: Newspaper },
    { to: "/careers", label: c("bottomnav.careers"), icon: Briefcase },
    { to: "/contact", label: c("bottomnav.contact"), icon: Mail },
  ];

  return (
  <nav
    className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-line shadow-[0_-4px_20px_rgba(0,0,0,0.07)]"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    aria-label="Primary"
  >
    <div className="grid grid-cols-5">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="flex flex-col items-center justify-center gap-1 py-2"
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex items-center justify-center w-11 h-8 rounded-full transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? "text-primary" : "text-muted"
                }`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
  );
};

export default BottomNav;
