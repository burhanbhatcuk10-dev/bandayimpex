import React from "react";
import { useData } from "../DataContext";

const StatsBand = () => {
  const { stats } = useData();
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center relative">
              <div
                className="font-black text-4xl md:text-6xl mb-2"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                }}
              >
                {s.value}
              </div>
              <p className="text-sm md:text-base uppercase tracking-widest text-muted font-semibold">
                {s.label}
              </p>
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-secondary-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
