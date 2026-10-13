import React from "react";
import Layout from "../components/Layout";
import { useData } from "../DataContext";
import { Sprout, Droplet, Recycle, Heart, ArrowRight } from "lucide-react";

const iconMap = { Sprout, Droplet, Recycle, Heart };

const Sustainability = () => {
  const { sustainabilityPillars } = useData();
  return (
    <Layout>
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--color-primary-700)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <p className="text-white/80 uppercase tracking-[0.4em] text-xs font-semibold mb-3">Sustainability</p>
          <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none">
            Growing responsibly<br />for tomorrow
          </h1>
          <p className="text-white/90 mt-6 max-w-2xl text-lg">
            Our sustainability agenda is aligned with the UN SDGs — focusing on environment, community,
            responsible sourcing and health.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {sustainabilityPillars.map((p) => {
              const Icon = iconMap[p.icon] || Sprout;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-secondary-200"
                  style={{ background: "var(--color-secondary)" }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md"
                    style={{ background: "var(--color-primary-600)" }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-black text-xl md:text-2xl text-ink mb-3">{p.title}</h3>
                  <p className="text-primary-700 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-ink">
            100% <span style={{ color: "var(--color-primary)" }}>Plastic Neutral</span>
          </h2>
          <p className="mt-4 text-primary-700 leading-relaxed text-lg">
            For 2 years and counting, BIPL has been collecting and processing plastic waste
            equivalent to what our packaging generates. Small pockets, big impact.
          </p>
          <button
            className="inline-flex items-center gap-2 mt-8 font-bold uppercase text-sm px-7 py-3.5 rounded-full text-white tracking-wide hover:opacity-90 transition-opacity group"
            style={{ background: "var(--color-primary)" }}
          >
            View Sustainability Report
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Sustainability;
