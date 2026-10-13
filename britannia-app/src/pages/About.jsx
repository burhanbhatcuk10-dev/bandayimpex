import React, { useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../DataContext";
import { Users, Award, Globe, Sparkles, Instagram, Twitter, Linkedin, ExternalLink, X } from "lucide-react";

const SOCIALS = [
  { key: "instagram", show: "show_instagram", label: "Instagram", Icon: Instagram },
  { key: "twitter", show: "show_twitter", label: "Twitter", Icon: Twitter },
  { key: "linkedin", show: "show_linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "portfolio", show: "show_portfolio", label: "Portfolio", Icon: ExternalLink },
];

const visibleSocials = (l) =>
  SOCIALS.filter((s) => l[s.key] && (l[s.show] === undefined || l[s.show]));

const About = () => {
  const { milestones, leadership, c } = useData();
  const [selected, setSelected] = useState(null);
  const storyStats = [
    { icon: Users, label: c("about.stat1"), color: "var(--color-primary)" },
    { icon: Globe, label: c("about.stat2"), color: "var(--color-primary-600)" },
    { icon: Award, label: c("about.stat3"), color: "var(--color-primary-400)" },
    { icon: Sparkles, label: c("about.stat4"), color: "var(--color-primary-500)" },
  ];
  return (
    <Layout>
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--color-primary)" }}>
        <div
          className="absolute -top-2 -right-2 w-40 h-40 md:w-64 md:h-64 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)",
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <p className="text-white/80 uppercase tracking-[0.4em] text-xs font-semibold mb-3">{c("about.hero.eyebrow")}</p>
          <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none whitespace-pre-line">
            {c("about.hero.title")}
          </h1>
          <p className="text-white/90 mt-6 max-w-2xl text-lg">
            {c("about.hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">{c("about.story.eyebrow")}</p>
              <h2 className="font-black text-3xl md:text-5xl tracking-tight text-ink mb-5">
                {c("about.story.title")}
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                {c("about.story.body1")}
              </p>
              <p className="text-muted leading-relaxed">
                {c("about.story.body2")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {storyStats.map(({ icon: Icon, label, color }, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow bg-white border border-secondary-200"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <p className="font-bold text-ink">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="milestones" className="py-20 md:py-24" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">{c("about.milestones.eyebrow")}</p>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-ink">
              {c("about.milestones.title")}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 items-center ${
                    i % 2 === 0 ? "" : "md:direction-rtl"
                  }`}
                >
                  <div
                    className={`${i % 2 === 0 ? "md:text-right md:pr-10" : "md:col-start-2 md:pl-10"}`}
                  >
                    <div
                      className="inline-block font-black text-2xl md:text-4xl mb-2"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {m.year}
                    </div>
                    <p className="text-primary-700 leading-relaxed">{m.event}</p>
                  </div>
                  <div
                    className={`absolute left-4 md:left-1/2 top-2 w-4 h-4 rounded-full ring-4 ring-secondary -translate-x-1/2`}
                    style={{ background: "var(--color-primary)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="leadership" className="py-20 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">{c("about.leadership.eyebrow")}</p>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight text-ink">
              {c("about.leadership.title")}
            </h2>
          </div>
          <p className="text-center text-sm text-muted -mt-8 mb-10">{c("about.leadership.hint")}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {leadership.map((l) => (
              <button
                type="button"
                key={l.name}
                onClick={() => setSelected(l)}
                className="group text-left rounded-2xl overflow-hidden bg-secondary/40 hover:bg-secondary transition-all p-6 text-center border border-transparent hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden shadow-lg ring-4 ring-white">
                  {l.image ? (
                    <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center font-black text-white text-2xl"
                      style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)" }}
                    >
                      {l.initials}
                    </div>
                  )}
                </div>
                <h3 className="font-black text-ink group-hover:text-primary transition-colors">{l.name}</h3>
                <p className="text-sm text-muted mt-1">{l.role}</p>
                {visibleSocials(l).length > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {visibleSocials(l).map(({ key, Icon }) => (
                      <span key={key} className="w-7 h-7 rounded-full bg-white grid place-items-center text-primary shadow-sm">
                        <Icon size={14} />
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-secondary grid place-items-center text-primary shadow"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="pt-10 pb-6 px-8 text-center" style={{ background: "var(--color-secondary)" }}>
              <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden shadow-xl ring-4 ring-white">
                {selected.image ? (
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center font-black text-white text-3xl"
                    style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-800) 100%)" }}
                  >
                    {selected.initials}
                  </div>
                )}
              </div>
              <h3 className="font-black text-2xl text-ink">{selected.name}</h3>
              <p className="text-sm font-semibold text-primary mt-1">{selected.role}</p>
            </div>
            <div className="px-8 py-6">
              {selected.bio && <p className="text-muted leading-relaxed text-sm">{selected.bio}</p>}
              {visibleSocials(selected).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {visibleSocials(selected).map(({ key, label, Icon }) => (
                    <a
                      key={key}
                      href={selected[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary hover:text-white text-primary text-sm font-semibold transition-colors"
                    >
                      <Icon size={16} /> {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default About;
