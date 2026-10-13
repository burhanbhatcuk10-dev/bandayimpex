import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useData } from "../DataContext";

const AboutBand = () => {
  const { c } = useData();
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div
            className="absolute -top-6 -left-6 w-24 h-24 rounded-full"
            style={{ background: "var(--color-secondary)" }}
          />
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
            <img
              src={c("aboutband.image")}
              alt={`${c("brand.name")} legacy`}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute -bottom-6 -right-6 rounded-2xl bg-white shadow-2xl p-5 flex items-center gap-4"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-lg"
              style={{ background: "var(--color-primary)" }}
            >
              {c("aboutband.badge_number")}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">{c("aboutband.badge_line1")}</p>
              <p className="font-black text-ink">{c("aboutband.badge_line2")}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">{c("aboutband.eyebrow")}</p>
          <h2 className="font-black text-3xl md:text-5xl leading-tight tracking-tight text-ink">
            {c("aboutband.title_prefix")} <span style={{ color: "var(--color-primary)" }}>{c("aboutband.title_year")}</span>
          </h2>
          <p className="mt-5 text-muted leading-relaxed text-base md:text-lg">
            {c("aboutband.body1")}
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            {c("aboutband.body2")}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-8 font-bold uppercase text-sm px-7 py-3.5 rounded-full text-white tracking-wide hover:opacity-90 transition-opacity group"
            style={{ background: "var(--color-primary)" }}
          >
            {c("aboutband.cta")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutBand;
