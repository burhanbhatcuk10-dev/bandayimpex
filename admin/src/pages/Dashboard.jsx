import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resources, submissions } from "../config";
import { api } from "../api";
import { ResourceIcon as Icon } from "../icons";
import { Globe, ArrowRight, Layers, Inbox, Activity } from "lucide-react";

const STRIPS = [
  "bg-primary-900",
  "bg-primary-600",
  "bg-primary-400",
  "bg-primary-800",
  "bg-primary-500",
  "bg-primary-700",
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setHealth(await api.get("/health"));
      } catch {
        setHealth({ status: "down" });
      }
      const all = [...resources.map((r) => r.key), ...submissions.map((s) => s.key)];
      const entries = await Promise.all(
        all.map(async (key) => {
          try {
            const path = resources.find((r) => r.key === key) ? `/${key}` : `/submissions/${key}`;
            const rows = await api.get(path);
            return [key, Array.isArray(rows) ? rows.length : 0];
          } catch {
            return [key, 0];
          }
        })
      );
      setCounts(Object.fromEntries(entries));
      setLoading(false);
    })();
  }, []);

  const sumOf = (list) => list.reduce((n, r) => n + (counts[r.key] || 0), 0);
  const contentTotal = sumOf(resources);
  const submissionTotal = sumOf(submissions);
  const online = health?.status === "ok";

  const num = (v) => (loading ? "—" : v);

  return (
    <div>
      {/* Page heading */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
          <p className="text-sm text-muted mt-0.5">Overview of your site content and activity.</p>
        </div>
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${
            online
              ? "bg-white text-primary-800 border-secondary-400"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-red-500"}`} />
          API {health ? (online ? "online" : "offline") : "…"}
          {health?.cloudinary === "missing" && (
            <span className="text-muted font-medium">· Cloudinary not set</span>
          )}
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatTile icon={<Layers size={20} />} label="Content items" value={num(contentTotal)} strip="bg-primary-900" />
        <StatTile icon={<Inbox size={20} />} label="Submissions" value={num(submissionTotal)} strip="bg-primary-600" />
        <StatTile
          icon={<Activity size={20} />}
          label="API status"
          value={health ? (online ? "Online" : "Offline") : "…"}
          strip={online ? "bg-emerald-600" : "bg-red-500"}
        />
      </div>

      {/* Hero CTA */}
      <Link
        to="/website"
        className="group flex items-center gap-4 bg-gradient-to-br from-primary-800 to-primary-950 text-white rounded-2xl p-5 mb-10 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        <div className="w-12 h-12 rounded-xl bg-white/15 grid place-items-center shrink-0">
          <Globe size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-lg">Manage Website</p>
          <p className="text-sm text-white/75">
            Edit every heading, paragraph, label and link across the public site.
          </p>
        </div>
        <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>

      {/* Content */}
      <SectionHeading>Content</SectionHeading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {resources.map((r, i) => (
          <CardLink
            key={r.key}
            to={`/r/${r.key}`}
            strip={STRIPS[i % STRIPS.length]}
            icon={<Icon name={r.icon} size={20} />}
            label={r.label}
            meta={`${num(counts[r.key] ?? 0)} items`}
          />
        ))}
      </div>

      {/* Submissions */}
      <SectionHeading>Submissions</SectionHeading>
      <div className="grid sm:grid-cols-3 gap-4">
        {submissions.map((s, i) => (
          <CardLink
            key={s.key}
            to={`/s/${s.key}`}
            strip={STRIPS[(i + 3) % STRIPS.length]}
            icon={<Icon name={s.icon} size={20} />}
            label={s.label}
            meta={`${num(counts[s.key] ?? 0)} total`}
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h2 className="text-xs font-bold uppercase tracking-widest text-primary-500">{children}</h2>
      <span className="h-px flex-1 bg-secondary-300" />
    </div>
  );
}

function StatTile({ icon, label, value, strip }) {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl border border-secondary-300 shadow-sm">
      <span className={`absolute inset-y-0 left-0 w-1.5 ${strip}`} />
      <div className="flex items-center gap-4 pl-6 pr-5 py-4">
        <div className="w-10 h-10 rounded-lg bg-secondary-100 grid place-items-center text-primary-700 shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
          <p className="text-2xl font-bold text-ink tabular-nums leading-tight">{value}</p>
        </div>
      </div>
    </div>
  );
}

function CardLink({ to, strip, icon, label, meta }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden bg-white rounded-xl border border-secondary-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary-300 transition-all"
    >
      <span className={`absolute inset-y-0 left-0 w-1.5 ${strip}`} />
      <div className="flex items-center gap-4 pl-6 pr-4 py-4">
        <div className="w-11 h-11 rounded-lg bg-secondary-100 grid place-items-center text-primary-700 shrink-0 transition-colors group-hover:bg-primary-900 group-hover:text-white">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-ink truncate">{label}</p>
          <p className="text-sm text-muted tabular-nums">{meta}</p>
        </div>
        <ArrowRight
          size={18}
          className="text-secondary-400 shrink-0 transition-all group-hover:text-primary-700 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
