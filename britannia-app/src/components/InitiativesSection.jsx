import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useData } from "../DataContext";

const InitiativesSection = () => {
  const { initiatives, c } = useData();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "next" ? 380 : -380, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28" style={{ background: "var(--color-secondary)" }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <h2
          className="text-center font-black text-4xl md:text-6xl mb-12 tracking-tight"
          style={{ color: "var(--color-primary)", fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.05em" }}
        >
          {c("initiatives_section.title")}
        </h2>

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
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-2"
            style={{ scrollbarWidth: "none" }}
          >
            {initiatives.map((item) => (
              <div
                key={item.id}
                className="shrink-0 w-[340px] md:w-[400px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className="relative h-56 overflow-hidden" style={{ background: item.bg }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 50%, color-mix(in srgb, ${item.bg} 87%, transparent) 100%)` }} />
                </div>
                <div className="p-6 relative">
                  <h3 className="font-black uppercase text-lg text-ink tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-4 mb-4">
                    {item.description}
                  </p>
                  <button
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                    style={{ background: "var(--color-primary-600)" }}
                    aria-label="Learn more"
                  >
                    <ArrowRight size={18} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InitiativesSection;
