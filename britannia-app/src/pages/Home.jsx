import React from "react";
import Layout from "../components/Layout";
import HeroCarousel from "../components/HeroCarousel";
import BrandsSection from "../components/BrandsSection";
import InitiativesSection from "../components/InitiativesSection";
import StatsBand from "../components/StatsBand";
import AboutBand from "../components/AboutBand";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useData } from "../DataContext";

const Home = () => {
  const { newsItems, c } = useData();
  return (
    <Layout>
      <HeroCarousel />
      <BrandsSection />
      <StatsBand />
      <AboutBand />
      <InitiativesSection />

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">{c("home.news.eyebrow")}</p>
              <h2 className="font-black text-3xl md:text-5xl tracking-tight text-ink">
                {c("home.news.title")}
              </h2>
            </div>
            <Link
              to="/media"
              className="inline-flex items-center gap-2 font-bold uppercase text-sm text-primary hover:underline"
            >
              {c("home.news.view_all")} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.slice(0, 3).map((n) => (
              <article
                key={n.id}
                className="group bg-secondary/40 rounded-2xl p-6 hover:bg-secondary transition-colors cursor-pointer border border-transparent hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary text-white font-semibold uppercase tracking-wider">
                    {n.category}
                  </span>
                  <span className="text-xs text-muted">{n.date}</span>
                </div>
                <h3 className="text-lg font-bold text-ink leading-snug group-hover:text-primary transition-colors">
                  {n.title}
                </h3>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary-700 group-hover:text-primary">
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

export default Home;
