import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "../ShopContext";
import { useData } from "../DataContext";
import CartLine from "./CartLine";

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, cartItems, cartCount, clearCart } = useShop();
  const { c } = useData();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    closeDrawer();
  }, [location.pathname, location.key, closeDrawer]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen, closeDrawer]);

  const onKeyDown = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        onKeyDown={onKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label={c("cart.drawer.title")}
        className="absolute right-0 top-0 bottom-0 w-full sm:w-[26rem] max-w-full bg-white shadow-2xl flex flex-col animate-toast-in"
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-line shrink-0">
          <h2
            className="font-black text-2xl tracking-wide text-ink uppercase"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.04em" }}
          >
            {c("cart.drawer.title")}
            {cartCount > 0 && <span className="text-muted font-sans text-sm ml-2 tracking-normal">({cartCount})</span>}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeDrawer}
            aria-label={c("cart.drawer.close")}
            className="w-11 h-11 -mr-2 flex items-center justify-center rounded-full text-muted hover:text-primary hover:bg-secondary-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag size={26} className="text-primary-400" />
            </div>
            <p className="font-bold text-ink">{c("cart.empty.title")}</p>
            <p className="text-sm text-muted">{c("cart.empty.body")}</p>
            <Link
              to="/products"
              onClick={closeDrawer}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold uppercase text-sm px-6 py-3 rounded-full transition-colors"
            >
              {c("cart.empty.cta")} <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto slim-scrollbar px-5 divide-y divide-secondary-200">
              {cartItems.map((item) => (
                <CartLine key={item.id} item={item} compact onNavigate={closeDrawer} />
              ))}
            </div>

            <div className="border-t border-line px-5 py-4 space-y-3 shrink-0" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
              <p className="text-xs text-muted">{c("cart.drawer.note")}</p>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold uppercase text-sm px-6 py-3.5 rounded-full transition-colors"
              >
                {c("cart.drawer.cta")} <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="w-full text-xs font-semibold text-muted hover:text-primary py-2 transition-colors"
              >
                {c("cart.clear")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
