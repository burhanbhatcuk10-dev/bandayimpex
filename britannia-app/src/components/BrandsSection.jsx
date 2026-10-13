import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "../DataContext";

const thumb = (url, w = 400) =>
  url && url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${w}/`)
    : url;

const BrandsSection = () => {
  const { brandCategories, brandProducts, c } = useData();
  const [active, setActive] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (active && (brandProducts[active] || []).length) return;
    const firstWithProducts =
      brandCategories.find((cat) => (brandProducts[cat] || []).length) || brandCategories[0] || null;
    setActive(firstWithProducts);
  }, [brandCategories, brandProducts, active]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "next" ? 320 : -320, behavior: "smooth" });
  };

  const products = active ? brandProducts[active] || [] : [];

  return (
    <section className="py-20 md:py-28" style={{ background: "var(--color-secondary)" }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-3">
          <p className="text-xs md:text-sm font-semibold tracking-[0.4em] uppercase text-primary-700">
            {c("brands_section.eyebrow")}
          </p>
        </div>
        <h2
          className="text-center font-black text-4xl md:text-6xl mb-10 tracking-tight"
          style={{ color: "var(--color-primary)", fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.05em" }}
        >
          {c("brands_section.title")}
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
          {brandCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 md:px-6 py-2.5 rounded-full font-bold uppercase text-xs md:text-sm tracking-wider transition-all border-2 ${
                active === cat
                  ? "bg-white text-primary border-primary shadow-md"
                  : "bg-primary text-white border-primary hover:bg-primary-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("prev")}
            className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white hover:bg-secondary-100 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            aria-label="Previous"
          >
            <ChevronLeft className="text-primary-700" size={22} />
          </button>
          <button
            onClick={() => scroll("next")}
            className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white hover:bg-secondary-100 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            aria-label="Next"
          >
            <ChevronRight className="text-primary-700" size={22} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-4 px-2"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((p) => (
              <Link
                to={`/product/${p.slug}`}
                key={p.id}
                className="shrink-0 group cursor-pointer w-56 md:w-64"
              >
                <div
                  className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className="aspect-square rounded-2xl overflow-hidden"
                    style={{ background: p.color }}
                  >
                    <img
                      src={thumb(p.image)}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-black uppercase text-ink tracking-wide group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-xs text-muted mt-1 px-2">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
