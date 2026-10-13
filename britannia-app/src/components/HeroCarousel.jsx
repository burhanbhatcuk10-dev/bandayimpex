import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../DataContext";

const overlayGradient = (hex) => {
  const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "#e51e25");
  const [r, g, b] = c ? [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)] : [229, 30, 37];
  return (
    `linear-gradient(115deg, rgba(${r},${g},${b},0.92) 0%, rgba(${r},${g},${b},0.75) 45%, ` +
    `rgba(${r},${g},${b},0.15) 75%, transparent 100%)`
  );
};

const HeroCarousel = () => {
  const { heroSlides } = useData();
  const count = heroSlides.length;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current > count - 1) setCurrent(0);
  }, [count, current]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 6000);
    return () => clearInterval(timer);
  }, [count]);

  const next = () => setCurrent((c) => (c + 1) % count);
  const prev = () => setCurrent((c) => (c - 1 + count) % count);

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--color-primary)" }}>
      <div className="relative h-[520px] md:h-[620px]">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ filter: slide.overlay_enabled ? "brightness(0.55)" : "none" }}
              />
              {slide.overlay_enabled ? (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: overlayGradient(slide.overlay_color) }}
                />
              ) : (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
                  }}
                />
              )}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
                  <div className="max-w-2xl">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-xs md:text-sm font-semibold tracking-widest uppercase">
                      {slide.tagline}
                    </div>
                    <h1 className="mt-5 text-white font-black leading-[1.05] tracking-tight text-4xl md:text-6xl lg:text-7xl">
                      {slide.title}
                    </h1>
                    <p className="mt-5 text-white/95 text-lg md:text-xl max-w-xl">
                      {slide.subtitle}
                    </p>
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 mt-8 bg-white text-primary font-bold uppercase px-7 py-3.5 rounded-full text-sm tracking-wide hover:bg-secondary-200 transition-colors group"
                    >
                      {slide.cta}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          className="absolute -top-2 -right-2 w-40 h-40 md:w-72 md:h-72 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)",
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />

        <button
          onClick={prev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} className="text-primary" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition"
          aria-label="Next slide"
        >
          <ChevronRight size={22} className="text-primary" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-10 bg-white" : "w-4 bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
