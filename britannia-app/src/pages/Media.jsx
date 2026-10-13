import React, { useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../DataContext";
import { Calendar, ArrowRight, Filter } from "lucide-react";

const Media = () => {
  const { newsItems, c } = useData();
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(newsItems.map((n) => n.category))];
  const filtered = filter === "All" ? newsItems : newsItems.filter((n) => n.category === filter);

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
          <p className="text-white/80 uppercase tracking-[0.4em] text-xs font-semibold mb-3">{c("media.hero.eyebrow")}</p>
          <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none whitespace-pre-line">{c("media.hero.title")}</h1>
          <p className="text-white/90 mt-6 max-w-2xl text-lg">{c("media.hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 flex-wrap mb-10">
            <Filter size={16} className="text-primary-700" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border-2 ${
                  filter === c
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary-700 border-line hover:border-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((n) => (
              <article
                key={n.id}
                className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow cursor-pointer border border-transparent hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary text-white font-semibold uppercase tracking-wider">
                    {n.category}
                  </span>
                  <span className="text-xs text-muted flex items-center gap-1"><Calendar size={12} /> {n.date}</span>
                </div>
                <h3 className="text-lg font-bold text-ink leading-snug group-hover:text-primary transition-colors">
                  {n.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  {c("common.read_more")} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Media;
