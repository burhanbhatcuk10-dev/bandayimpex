import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useData } from "./DataContext";


const ShopContext = createContext(null);

const CART_KEY = "bipl_cart_v1";
const WISHLIST_KEY = "bipl_wishlist_v1";
const MAX_QTY = 99;

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
};

const clampQty = (n) => Math.min(MAX_QTY, Math.max(1, Math.round(Number(n) || 1)));

export const ShopProvider = ({ children }) => {
  const { allProducts } = useData();

  const [cart, setCart] = useState(() => load(CART_KEY, []));
  const [wishlist, setWishlist] = useState(() => load(WISHLIST_KEY, []));
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => save(CART_KEY, cart), [cart]);
  useEffect(() => save(WISHLIST_KEY, wishlist), [wishlist]);

  useEffect(() => {
    if (!allProducts.length) return;
    const live = new Set(allProducts.map((p) => p.id));
    setCart((prev) => {
      const next = prev.filter((e) => live.has(e.id));
      return next.length === prev.length ? prev : next;
    });
    setWishlist((prev) => {
      const next = prev.filter((id) => live.has(id));
      return next.length === prev.length ? prev : next;
    });
  }, [allProducts]);

  const byId = useMemo(() => new Map(allProducts.map((p) => [p.id, p])), [allProducts]);

  const cartItems = useMemo(
    () =>
      cart
        .map((e) => {
          const product = byId.get(e.id);
          return product ? { ...product, qty: e.qty } : null;
        })
        .filter(Boolean),
    [cart, byId]
  );

  const wishlistItems = useMemo(
    () => wishlist.map((id) => byId.get(id)).filter(Boolean),
    [wishlist, byId]
  );

  const cartCount = allProducts.length
    ? cartItems.reduce((n, i) => n + i.qty, 0)
    : cart.reduce((n, e) => n + e.qty, 0);
  const wishlistCount = allProducts.length ? wishlistItems.length : wishlist.length;

  const addToCart = useCallback((product, qty = 1) => {
    if (!product?.id) return;
    setCart((prev) => {
      const existing = prev.find((e) => e.id === product.id);
      if (existing) {
        return prev.map((e) => (e.id === product.id ? { ...e, qty: clampQty(e.qty + qty) } : e));
      }
      return [...prev, { id: product.id, qty: clampQty(qty) }];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setCart((prev) => prev.map((e) => (e.id === id ? { ...e, qty: clampQty(qty) } : e)));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const inCart = useCallback((id) => cart.some((e) => e.id === id), [cart]);

  const inWishlist = useCallback((id) => wishlist.includes(id), [wishlist]);

  const toggleWishlist = useCallback((product) => {
    if (!product?.id) return false;
    let added = false;
    setWishlist((prev) => {
      if (prev.includes(product.id)) return prev.filter((id) => id !== product.id);
      added = true;
      return [...prev, product.id];
    });
    return added;
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((x) => x !== id));
  }, []);

  const moveToCart = useCallback(
    (product) => {
      addToCart(product, 1);
      removeFromWishlist(product.id);
    },
    [addToCart, removeFromWishlist]
  );

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo(
    () => ({
      cartItems, cartCount, addToCart, setQty, removeFromCart, clearCart, inCart,
      wishlistItems, wishlistCount, inWishlist, toggleWishlist, removeFromWishlist, moveToCart,
      drawerOpen, openDrawer, closeDrawer,
      maxQty: MAX_QTY,
    }),
    [
      cartItems, cartCount, addToCart, setQty, removeFromCart, clearCart, inCart,
      wishlistItems, wishlistCount, inWishlist, toggleWishlist, removeFromWishlist, moveToCart,
      drawerOpen, openDrawer, closeDrawer,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);
