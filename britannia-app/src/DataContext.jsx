import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchAll } from "./api";
import { defaults, makeContent } from "./content";

const DataContext = createContext(null);

function normalize(raw) {
  const products = raw.products.map((p) => ({
    ...p,
    image: p.image_url,
    desc: p.description,
    badges: Array.isArray(p.badges) ? p.badges : [],
    taglines: Array.isArray(p.taglines) && p.taglines.length ? p.taglines : p.tagline ? [p.tagline] : [],
    subImages: (Array.isArray(p.sub_images) ? p.sub_images : []).map((s) =>
      typeof s === "string" ? s : s?.url
    ).filter(Boolean),
  }));

  const brandProducts = {};
  for (const p of products) {
    (brandProducts[p.category] = brandProducts[p.category] || []).push(p);
  }

  return {
    heroSlides: raw.heroSlides.map((s) => ({ ...s, image: s.image_url })),
    brandCategories: raw.categories.map((c) => c.name),
    brandProducts,
    allProducts: products,
    initiatives: raw.initiatives.map((i) => ({ ...i, image: i.image_url })),
    newsItems: raw.news,
    leadership: raw.leadership.map((l) => ({ ...l, image: l.image_url })),
    milestones: raw.milestones,
    jobs: raw.jobs,
    stats: raw.stats,
    sustainabilityPillars: raw.sustainability.map((s) => ({ ...s, desc: s.description })),
    reports: raw.reports || [],
    financials: raw.financials || [],
    content: raw.siteContent || {},
    source: "api",
  };
}

const empty = {
  heroSlides: [],
  brandCategories: [],
  brandProducts: {},
  allProducts: [],
  initiatives: [],
  newsItems: [],
  leadership: [],
  milestones: [],
  jobs: [],
  stats: [],
  sustainabilityPillars: [],
  reports: [],
  financials: [],
  content: {},
  source: "empty",
};

const CACHE_KEY = "bipl_data_cache_v2";

const loadCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return null;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => loadCache() || empty);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await fetchAll();
        if (!active) return;
        if (raw.products?.length) {
          const normalized = normalize(raw);
          setData(normalized);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
          } catch {
          }
        }
      } catch {
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const title = (data.content && data.content["site.title"]) || defaults["site.title"];
    if (title) document.title = title;
  }, [data.content]);

  const value = useMemo(
    () => ({
      ...data,
      c: makeContent(data.content || {}),
      getProductBySlug: (slug) => data.allProducts.find((p) => p.slug === slug),
    }),
    [data]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
