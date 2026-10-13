import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useData } from "../DataContext";
import { ChevronRight, ShoppingBag, Play, CheckCircle2, ArrowLeft, ArrowRight, Plus, Minus } from "lucide-react";
import WishlistHeart from "../components/WishlistHeart";
import { useShop } from "../ShopContext";
import { toast } from "../hooks/use-toast";

const ProductDetail = () => {
  const { slug } = useParams();
  const { getProductBySlug, brandProducts, c } = useData();
  const { addToCart, openDrawer, maxQty } = useShop();
  const product = getProductBySlug(slug);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Layout>
        <section className="max-w-[900px] mx-auto px-4 py-32 text-center">
          <h1 className="font-black text-4xl text-ink mb-4">{c("product.notfound.title")}</h1>
          <p className="text-muted mb-8">{c("product.notfound.body")}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded-full"
          >
            <ArrowLeft size={16} /> {c("product.notfound.back")}
          </Link>
        </section>
      </Layout>
    );
  }

  const gallery = [product.image, ...(product.subImages || [])].filter(Boolean);
  const taglines =
    Array.isArray(product.taglines) && product.taglines.length
      ? product.taglines
      : product.tagline
      ? [product.tagline]
      : [];
  const safeActive = Math.min(activeImg, gallery.length - 1);

  const related = (brandProducts[product.category] || [])
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const addToEnquiry = () => {
    addToCart(product, qty);
    toast({ title: c("cart.toast.added"), description: `${product.name} × ${qty}` });
    setQty(1);
    openDrawer();
  };

  const shopLinks = [
    { label: c("product.shop1.label"), url: c("product.shop1.url"), variant: "primary" },
    { label: c("product.shop2.label"), url: c("product.shop2.url"), variant: "light" },
    { label: c("product.shop3.label"), url: c("product.shop3.url"), variant: "primary" },
  ];

  return (
    <Layout>
      <div className="bg-secondary/50 border-b border-primary/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center gap-2 text-sm text-muted flex-wrap">
          <Link to="/" className="hover:text-primary">{c("bottomnav.home")}</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-primary">{c("bottomnav.products")}</Link>
          <ChevronRight size={14} />
          <Link to="/products" state={{ cat: product.category }} className="hover:text-primary">
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-ink font-semibold">{product.name}</span>
        </div>
      </div>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div
              className="relative rounded-3xl overflow-hidden aspect-square shadow-xl"
              style={{ background: product.color }}
            >
              <img
                src={gallery[safeActive]}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply"
              />
              <div
                className="absolute -top-2 -right-2 w-28 h-28 md:w-40 md:h-40 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)",
                  clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                }}
              />
            </div>
            {gallery.length > 1 && (
              <div className="flex flex-wrap gap-3 md:gap-4 mt-6">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-md transition-all ${
                      i === safeActive ? "ring-2 ring-primary scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ background: product.color }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={g} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              {product.category}
            </p>
            <h1
              className="font-black text-5xl md:text-7xl tracking-tight leading-none text-ink uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.02em" }}
            >
              {product.name}
            </h1>
            {taglines.length > 0 && (
              <div className="mt-4 space-y-1.5">
                {taglines.map((t, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-xl md:text-2xl font-semibold text-primary"
                        : "flex items-start gap-2 text-base text-muted"
                    }
                  >
                    {i > 0 && <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />}
                    {t}
                  </p>
                ))}
              </div>
            )}
            <p className="mt-5 text-muted leading-relaxed text-base md:text-lg max-w-xl">
              {product.desc}
            </p>

            {(product.weight || product.quantity) && (
              <div className="flex flex-wrap gap-4 mt-6">
                {product.weight && (
                  <div className="px-5 py-3 rounded-2xl bg-secondary border border-primary/10">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{c("product.weight_label")}</p>
                    <p className="font-black text-ink">{product.weight}</p>
                  </div>
                )}
                {product.quantity && (
                  <div className="px-5 py-3 rounded-2xl bg-secondary border border-primary/10">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{c("product.quantity_label")}</p>
                    <p className="font-black text-ink">{product.quantity}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-8">
              {product.badges.map((b) => (
                <div
                  key={b}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary-800 text-xs font-bold uppercase tracking-wider"
                >
                  <CheckCircle2 size={16} className="text-primary" />
                  {b}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted mb-3">
                {c("cart.add_section")}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-line bg-white">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label={c("cart.qty.decrease")}
                    className="w-12 h-12 flex items-center justify-center rounded-full text-primary hover:bg-secondary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    className="w-10 text-center font-bold text-ink tabular-nums"
                    aria-live="polite"
                    aria-label={`${c("cart.qty.label")}: ${qty}`}
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                    disabled={qty >= maxQty}
                    aria-label={c("cart.qty.increase")}
                    className="w-12 h-12 flex items-center justify-center rounded-full text-primary hover:bg-secondary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={addToEnquiry}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold px-7 py-3.5 rounded-full transition-colors"
                >
                  <ShoppingBag size={18} /> {c("cart.add")}
                </button>

                <WishlistHeart product={product} />
              </div>
              <p className="text-xs text-muted mt-3">{c("cart.add_note")}</p>
            </div>

            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted mb-3">
                {c("product.available_on")}
              </p>
              <div className="flex flex-wrap gap-3">
                {shopLinks.filter((s) => s.label).map((s, i) => (
                  <a
                    key={i}
                    href={s.url || "#"}
                    target={s.url && s.url !== "#" ? "_blank" : undefined}
                    rel={s.url && s.url !== "#" ? "noopener noreferrer" : undefined}
                    className={
                      s.variant === "light"
                        ? "inline-flex items-center gap-2 bg-secondary-300 hover:opacity-90 text-primary-950 font-bold px-6 py-3.5 rounded-full transition-opacity"
                        : "inline-flex items-center gap-2 bg-primary hover:opacity-90 text-white font-bold px-6 py-3.5 rounded-full transition-opacity"
                    }
                  >
                    <ShoppingBag size={18} /> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div
            className="relative rounded-3xl overflow-hidden aspect-video shadow-xl group cursor-pointer"
            style={{ background: product.color }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play size={30} className="text-primary ml-1" fill="var(--color-primary)" />
              </div>
              <p className="text-white font-bold text-lg drop-shadow-lg">
                {product.name} | {c("product.watch_suffix")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">
                {c("product.related.eyebrow")}
              </p>
              <h2
                className="font-black text-3xl md:text-5xl tracking-tight"
                style={{ color: "var(--color-primary)", fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.03em" }}
              >
                {c("product.related.title")}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="group">
                  <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-square rounded-2xl overflow-hidden" style={{ background: p.color }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-black uppercase text-ink tracking-wide group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted mt-1 px-2">{p.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 font-bold uppercase text-sm px-7 py-3.5 rounded-full text-white tracking-wide hover:opacity-90 transition-opacity"
                style={{ background: "var(--color-primary)" }}
              >
                {c("product.related.cta")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
