import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, X, SlidersHorizontal, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Layout from "../components/Layout";
import WishlistHeart from "../components/WishlistHeart";
import { useData } from "../DataContext";
import { useShop } from "../ShopContext";
import { thumb } from "../lib/img";
import { toast } from "../hooks/use-toast";

const ProductCard = React.memo(function ProductCard({ p }) {
  const { addToCart, openDrawer } = useShop();
  const { c } = useData();

  const add = () => {
    addToCart(p, 1);
    toast({ title: c("cart.toast.added"), description: p.name });
    openDrawer();
  };

  return (
    <div className="group">
      <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-md hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
        <Link to={`/product/${p.slug}`} className="block cursor-pointer" tabIndex={-1} aria-hidden="true">
          <div className="aspect-square rounded-2xl overflow-hidden" style={{ background: p.color }}>
            <img
              src={thumb(p.image)}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          <WishlistHeart product={p} floating />
          <button
            type="button"
            onClick={add}
            aria-label={`${c("cart.add")} — ${p.name}`}
            title={`${c("cart.add")} — ${p.name}`}
            className="w-11 h-11 rounded-full bg-white/95 shadow-md hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to={`/product/${p.slug}`} className="cursor-pointer">
          <h3 className="font-black uppercase text-ink tracking-wide group-hover:text-primary transition-colors">{p.name}</h3>
        </Link>
        <p className="text-xs text-muted mt-1 px-2">{p.tagline}</p>
      </div>
    </div>
  );
});

const Brands = () => {
  const { allProducts, c } = useData();
  const location = useLocation();

  const pageSize = useMemo(() => {
    const n = parseInt(c("brands.page_size"), 10);
    return Number.isInteger(n) && n > 0 ? n : 24;
  }, [c]);

  const [query, setQuery] = useState("");
  const [cats, setCats] = useState([]);
  const [diets, setDiets] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = location.state?.cat;
    if (cat && allProducts.some((p) => p.category === cat)) {
      setCats([cat]);
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const categoryOptions = useMemo(() => {
    const set = new Set();
    allProducts.forEach((p) => p.category && set.add(p.category));
    return [...set].sort();
  }, [allProducts]);

  const dietaryOptions = useMemo(() => {
    const set = new Set();
    allProducts.forEach((p) => (p.badges || []).forEach((b) => b && set.add(b)));
    return [...set].sort();
  }, [allProducts]);

  const toggle = (value, list, setList) => {
    setPage(1);
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearAll = () => {
    setQuery("");
    setCats([]);
    setDiets([]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (diets.length && !diets.every((d) => (p.badges || []).includes(d))) return false;
      if (q) {
        const hay = `${p.name} ${p.tagline || ""} ${(p.taglines || []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allProducts, cats, diets, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * pageSize, current * pageSize);

  const activeCount = cats.length + diets.length + (query ? 1 : 0);

  const FilterPanel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-black uppercase text-sm tracking-wider text-ink">{c("brands.filters.title")}</h3>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-semibold text-primary hover:underline">
            {c("brands.filters.clear")}
          </button>
        )}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">{c("brands.filters.categories")}</p>
        <div className="space-y-2">
          {categoryOptions.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 text-sm text-primary-700 cursor-pointer">
              <input
                type="checkbox"
                checked={cats.includes(cat)}
                onChange={() => toggle(cat, cats, setCats)}
                className="w-4 h-4 accent-[var(--color-primary)]"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {dietaryOptions.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">{c("brands.filters.dietary")}</p>
          <div className="space-y-2">
            {dietaryOptions.map((d) => (
              <label key={d} className="flex items-center gap-2.5 text-sm text-primary-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={diets.includes(d)}
                  onChange={() => toggle(d, diets, setDiets)}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                />
                {d}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "var(--color-primary)" }}>
        <div
          className="absolute -top-2 -right-2 w-40 h-40 md:w-64 md:h-64 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)",
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <p className="text-white/80 uppercase tracking-[0.4em] text-xs font-semibold mb-3">{c("brands.hero.eyebrow")}</p>
          <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none whitespace-pre-line">
            {c("brands.hero.title")}
          </h1>
          <p className="text-white/90 mt-6 max-w-2xl text-lg">{c("brands.hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Search + mobile filter toggle */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex items-center flex-1 gap-2 px-4 bg-white rounded-xl shadow-sm">
              <Search size={18} className="text-primary-400" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder={c("brands.filters.search")}
                className="flex-1 py-3.5 bg-transparent outline-none text-sm"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted hover:text-primary">
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="lg:hidden flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-white rounded-xl font-bold text-sm uppercase tracking-wide"
            >
              <SlidersHorizontal size={16} /> {c("brands.filters.title")}
              {activeCount > 0 && <span className="bg-white text-primary rounded-full px-2 text-xs">{activeCount}</span>}
            </button>
          </div>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-secondary-200/70 shadow-sm p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto slim-scrollbar">
                {FilterPanel}
              </div>
            </aside>

            {/* Mobile filters (collapsible) */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setShowFilters(false)}>
                <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85%] bg-white p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setShowFilters(false)} className="mb-4 text-muted hover:text-primary">
                    <X size={20} />
                  </button>
                  {FilterPanel}
                </div>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted mb-6">
                {filtered.length} {c("brands.results.count")}
              </p>

              {pageItems.length === 0 ? (
                <div className="text-center py-20 text-muted">{c("brands.empty")}</div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {pageItems.map((p) => (
                    <ProductCard key={p.id} p={p} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-14">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={current === 1}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-10 h-10 rounded-full font-bold text-sm transition ${
                        n === current ? "bg-primary text-white shadow-md" : "bg-white text-primary-700 hover:bg-secondary-200"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={current === totalPages}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Brands;
