import React from "react";
import Layout from "../components/Layout";
import { TrendingUp, FileText, Download, Users, ArrowRight } from "lucide-react";
import { useData } from "../DataContext";

const Investors = () => {
  const { c, reports, financials } = useData();
  return (
    <Layout>
      <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "var(--color-primary-950)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <p className="text-white/70 uppercase tracking-[0.4em] text-xs font-semibold mb-3">{c("investors.hero.eyebrow")}</p>
          <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none whitespace-pre-line">{c("investors.hero.title")}</h1>
          <p className="text-white/80 mt-6 max-w-2xl text-lg">
            {c("investors.hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {(financials || []).map((f, i) => (
              <div key={i} className="rounded-2xl p-6 border border-secondary-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-primary" />
                  <p className="text-xs uppercase tracking-widest text-muted font-semibold">{f.metric}</p>
                </div>
                <p className="font-black text-2xl md:text-3xl text-ink">{f.value}</p>
                <p className="text-xs text-primary font-bold mt-1">{f.change}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">{c("investors.downloads.eyebrow")}</p>
            <h2 className="font-black text-3xl md:text-4xl text-ink">{c("investors.downloads.title")}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {(reports || []).map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 rounded-xl border border-secondary-200 hover:border-primary/40 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-ink">{r.title}</p>
                    <p className="text-xs text-muted mt-0.5">{r.date} · PDF · {r.size}</p>
                  </div>
                </div>
                <Download size={18} className="text-primary-400 group-hover:text-primary group-hover:translate-y-0.5 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4" style={{ background: "var(--color-primary)" }}>
            <Users size={26} className="text-white" />
          </div>
          <h2 className="font-black text-3xl md:text-4xl tracking-tight text-ink">{c("investors.contact.title")}</h2>
          <p className="text-primary-700 mt-3 break-words">{c("investors.contact.detail")}</p>
          <button className="inline-flex items-center gap-2 mt-6 font-bold uppercase text-sm px-6 py-3 rounded-full text-white tracking-wide hover:opacity-90 transition-opacity group" style={{ background: "var(--color-primary)" }}>
            {c("investors.contact.button")} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Investors;
