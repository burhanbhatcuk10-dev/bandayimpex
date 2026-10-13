import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X, ChevronDown, Globe, ExternalLink, ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Logo from "./Logo";
import { useData } from "../DataContext";
import { useShop } from "../ShopContext";

const IconAction = ({ icon: Icon, count, label, onClick, to, className = "" }) => {
  const inner = (
    <>
      <Icon size={20} className="text-primary-800" />
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center tabular-nums"
          style={{ background: "var(--color-primary)" }}
          aria-hidden="true"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </>
  );
  const cls = `relative w-10 h-10 rounded-full hover:bg-secondary-200 flex items-center justify-center transition-colors ${className}`;
  const aria = count > 0 ? `${label} (${count})` : label;

  return to ? (
    <Link to={to} aria-label={aria} title={aria} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} aria-label={aria} title={aria} className={cls}>
      {inner}
    </button>
  );
};

const Header = () => {
  const { brandCategories, brandProducts, c } = useData();
  const { cartCount, wishlistCount, openDrawer } = useShop();

  const navItems = [
    { label: c("header.nav.about"), path: "/about" },
    { label: c("header.nav.products"), path: "/products", mega: true },
    { label: c("header.nav.impact"), path: "/sustainability" },
    { label: c("header.nav.investors"), path: "/investors" },
    { label: c("header.nav.wisebite"), path: "/products", state: { cat: "NUTRITIOUS BARS" } },
    { label: c("header.nav.careers"), path: "/careers" },
    { label: c("header.nav.news"), path: "/media" },
    { label: c("header.nav.contact"), path: "/contact" },
  ];

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [location.pathname, location.search]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
      }`}
      onMouseLeave={() => setMega(false)}
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 xl:px-6 2xl:px-8 flex items-center justify-between h-16 md:h-20 gap-3 xl:gap-4">
        <Link to="/" className="flex items-center shrink-0" aria-label={`${c("brand.name")} home`}>
          <Logo />
        </Link>

        <nav className="hidden xl:flex items-center gap-0 2xl:gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setMega(!!item.mega)}
            >
              <Link
                to={item.path}
                state={item.state}
                className={`px-2 2xl:px-3 py-2 text-[13px] 2xl:text-sm font-semibold uppercase tracking-normal 2xl:tracking-wide flex items-center gap-1 transition-colors rounded whitespace-nowrap ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-primary-800 hover:text-primary"
                }`}
              >
                {item.label}
                {item.mega && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${mega ? "rotate-180" : ""}`}
                  />
                )}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-10 h-10 rounded-full bg-primary-950 hover:bg-primary-950 flex items-center justify-center transition-colors"
            aria-label="Search"
          >
            <Search size={18} className="text-white" />
          </button>
          <button
            className="hidden md:flex w-10 h-10 rounded-full hover:bg-secondary-200 items-center justify-center transition-colors"
            aria-label="Language"
          >
            <Globe size={20} className="text-primary-800" />
          </button>
          <IconAction
            icon={Heart}
            to="/wishlist"
            count={wishlistCount}
            label={c("wishlist.nav_label")}
            className="hidden sm:flex"
          />
          <IconAction
            icon={ShoppingBag}
            onClick={openDrawer}
            count={cartCount}
            label={c("cart.nav_label")}
          />
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold text-sm px-4 2xl:px-5 py-2.5 rounded-full transition-colors shrink-0 whitespace-nowrap"
          >
            {c("header.shop_now")} <ExternalLink size={15} />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden p-2 rounded-full hover:bg-secondary-200 transition-colors"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-secondary-200 bg-white">
          <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-4 flex gap-2">
            <Input placeholder={c("header.search_placeholder")} className="flex-1" autoFocus />
            <Button style={{ background: "var(--color-primary)" }} onClick={() => setSearchOpen(false)}>
              Search
            </Button>
          </div>
        </div>
      )}

      {mega && (
        <div
          className="hidden xl:block absolute top-full left-0 right-0 bg-white border-t border-secondary-200 shadow-2xl animate-toast-in"
          onMouseEnter={() => setMega(true)}
        >
          <div className="max-w-[1500px] mx-auto px-8 py-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-1">
                  {c("header.mega.eyebrow")}
                </p>
                <h3
                  className="font-black text-3xl tracking-tight"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  {c("header.mega.title")}
                </h3>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 font-bold uppercase text-sm text-primary hover:underline"
              >
                {c("header.mega.view_all")} <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-5">
              {brandCategories.map((cat) => {
                const first = (brandProducts[cat] || [])[0];
                return (
                  <Link
                    key={cat}
                    to="/products"
                    state={{ cat }}
                    className="group rounded-2xl border border-secondary-200 hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden bg-white flex items-center gap-4 p-3"
                  >
                    <div
                      className="w-16 h-16 rounded-xl overflow-hidden shrink-0"
                      style={{ background: first?.color || "var(--color-secondary)" }}
                    >
                      {first && (
                        <img
                          src={first.image}
                          alt={cat}
                          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-black uppercase text-sm tracking-wide text-ink group-hover:text-primary transition-colors">
                        {cat}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {(brandProducts[cat] || []).length} products
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="xl:hidden border-t border-secondary-200 bg-white max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-3">
            {navItems.map((item) =>
              item.mega ? (
                <div key={item.label} className="border-b border-secondary-200">
                  <button
                    onClick={() => setMobileProducts((v) => !v)}
                    className="w-full flex items-center justify-between py-3 font-semibold text-primary-800 uppercase text-sm tracking-wide"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileProducts ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileProducts && (
                    <div className="pb-3 pl-3 flex flex-col gap-1">
                      {brandCategories.map((cat) => (
                        <Link
                          key={cat}
                          to="/products"
                          state={{ cat }}
                          onClick={() => setOpen(false)}
                          className="py-2 text-sm text-muted hover:text-primary"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  state={item.state}
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-secondary-200 font-semibold text-primary-800 uppercase text-sm tracking-wide hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              to="/wishlist"
              onClick={() => setOpen(false)}
              className="sm:hidden flex items-center justify-between py-3 border-b border-secondary-200 font-semibold text-primary-800 uppercase text-sm tracking-wide hover:text-primary"
            >
              <span className="flex items-center gap-2">
                <Heart size={16} /> {c("wishlist.nav_label")}
              </span>
              {wishlistCount > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-2 bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-full"
            >
              {c("header.shop_now")} <ExternalLink size={15} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
