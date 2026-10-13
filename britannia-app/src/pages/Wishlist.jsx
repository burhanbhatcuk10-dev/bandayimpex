import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Plus, X } from "lucide-react";
import Layout from "../components/Layout";
import { useShop } from "../ShopContext";
import { useData } from "../DataContext";
import { thumb } from "../lib/img";
import { toast } from "../hooks/use-toast";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart, openDrawer } = useShop();
  const { c } = useData();

  const add = (product) => {
    addToCart(product, 1);
    toast({ title: c("cart.toast.added"), description: product.name });
    openDrawer();
  };

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
          <p className="text-white/80 uppercase tracking-[0.4em] text-xs font-semibold mb-3">
            {c("wishlist.hero.eyebrow")}
          </p>
          <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none">
            {c("wishlist.hero.title")}
          </h1>
          <p className="text-white/90 mt-6 max-w-2xl text-lg">{c("wishlist.hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md py-20 px-6 text-center max-w-[640px] mx-auto">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                <Heart size={28} className="text-primary-400" />
              </div>
              <h2 className="font-black text-xl text-ink uppercase tracking-wide">{c("wishlist.empty.title")}</h2>
              <p className="text-muted mt-3">{c("wishlist.empty.body")}</p>
              <Link
                to="/products"
                className="mt-8 inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold uppercase text-sm px-7 py-3.5 rounded-full transition-colors"
              >
                {c("wishlist.empty.cta")} <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted mb-6">
                {wishlistItems.length} {wishlistItems.length === 1 ? c("wishlist.item") : c("wishlist.items")}
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {wishlistItems.map((p) => (
                  <div key={p.id} className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-shadow p-3 flex flex-col">
                    <div className="relative">
                      <Link to={`/product/${p.slug}`} className="group block">
                        <div className="aspect-square rounded-2xl overflow-hidden" style={{ background: p.color }}>
                          <img
                            src={thumb(p.image)}
                            alt={p.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(p.id)}
                        aria-label={`${c("wishlist.remove")} — ${p.name}`}
                        className="absolute top-2 right-2 w-11 h-11 rounded-full bg-white/95 shadow-md hover:bg-white flex items-center justify-center text-muted hover:text-primary transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="px-2 pt-4 pb-2 flex-1 flex flex-col">
                      <Link to={`/product/${p.slug}`} className="group">
                        <h3 className="font-black uppercase text-ink tracking-wide text-center group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted mt-1 text-center line-clamp-2">{p.tagline}</p>

                      <button
                        type="button"
                        onClick={() => add(p)}
                        className="mt-auto pt-4 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold uppercase text-xs px-4 py-3 rounded-full transition-colors"
                      >
                        <Plus size={15} /> {c("wishlist.add_to_cart")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Wishlist;
