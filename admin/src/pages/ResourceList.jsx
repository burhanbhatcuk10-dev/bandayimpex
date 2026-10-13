import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Plus, Pencil, Trash2, ArrowLeft, Search, Inbox, AlertCircle, RotateCw,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { getResource } from "../config";
import { api } from "../api";
import { ResourceIcon as Icon } from "../icons";

const PER_PAGE = 10;

const ROW_STRIPS = [
  "bg-primary-900",
  "bg-primary-600",
  "bg-primary-400",
  "bg-primary-800",
  "bg-primary-500",
  "bg-primary-700",
];

const label = (col) => col.replace("_url", "").replace(/_/g, " ");
const isNumeric = (col) => col === "sort_order" || col === "year";

const cell = (col, row) => {
  const v = row[col];
  if (col === "image_url") {
    return v ? (
      <img src={v} alt="" className="w-12 h-12 rounded-lg object-cover border border-secondary-300" />
    ) : (
      <div className="w-12 h-12 rounded-lg bg-secondary-200 grid place-items-center text-secondary-400">
        <Inbox size={16} />
      </div>
    );
  }
  if (typeof v === "string" && v.length > 60) return v.slice(0, 60) + "…";
  return String(v ?? "");
};

function pageList(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, page, page - 1, page + 1]);
  const list = [...set].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < list.length; i++) {
    if (i && list[i] - list[i - 1] > 1) out.push("…");
    out.push(list[i]);
  }
  return out;
}

export default function ResourceList() {
  const { key } = useParams();
  const resource = getResource(key);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const resp = await api.get(`/${key}?limit=${PER_PAGE}&page=${p}`);
      const data = Array.isArray(resp) ? resp : resp.data;
      setRows(data);
      setTotal(Array.isArray(resp) ? data.length : resp.total);
      setPages(Array.isArray(resp) ? 1 : resp.pages);
      setPage(Array.isArray(resp) ? 1 : resp.page);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setQ("");
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const goTo = (p) => {
    if (p < 1 || p > pages || p === page) return;
    setQ("");
    load(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await api.del(`/${key}/${id}`);
    const nextPage = rows.length === 1 && page > 1 ? page - 1 : page;
    load(nextPage);
  };

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const needle = q.toLowerCase();
    return rows.filter((row) =>
      resource.listColumns
        .filter((c) => c !== "image_url")
        .some((c) => String(row[c] ?? "").toLowerCase().includes(needle))
    );
  }, [rows, q, resource]);

  if (!resource) return <p>Unknown resource.</p>;

  const colCount = resource.listColumns.length + 1;
  const from = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const to = (page - 1) * PER_PAGE + rows.length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <Link
            to="/"
            className="text-sm text-muted hover:text-primary-800 inline-flex items-center gap-1 mb-2"
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-primary-900 text-white grid place-items-center shrink-0">
              <Icon name={resource.icon} size={20} />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-ink leading-tight">{resource.label}</h1>
              <p className="text-sm text-muted">
                {loading ? "Loading…" : `${total} ${total === 1 ? "item" : "items"}`}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/r/${key}/new`}
          className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 active:bg-primary-950 text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
        >
          <Plus size={16} /> Add New
        </Link>
      </div>

      {!error && rows.length > 0 && (
        <div className="relative mb-4 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search this page…`}
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-secondary-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm">
          <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-800">Couldn’t load {resource.label.toLowerCase()}</p>
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={() => load(page)}
            className="inline-flex items-center gap-1.5 text-red-700 hover:text-red-900 font-semibold shrink-0"
          >
            <RotateCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Table card */}
      {!error && (
        <div className="bg-white rounded-xl border border-secondary-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary-100 border-b border-secondary-300 text-left">
                  {resource.listColumns.map((c, ci) => (
                    <th
                      key={c}
                      className={`px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted ${
                        ci === 0 ? "pl-6" : ""
                      } ${isNumeric(c) ? "text-right" : ""}`}
                    >
                      {label(c)}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-wide text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b border-secondary-100">
                      {resource.listColumns.map((c, ci) => (
                        <td key={c} className={`relative px-4 py-3 ${ci === 0 ? "pl-7" : ""}`}>
                          {ci === 0 && (
                            <span className="absolute left-2.5 top-2 bottom-2 w-1.5 rounded-full bg-secondary-200" />
                          )}
                          <div
                            className="h-4 rounded bg-secondary-200 animate-pulse"
                            style={{ width: `${40 + ((i * 13 + c.length * 7) % 45)}%` }}
                          />
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="h-4 w-12 ml-auto rounded bg-secondary-200 animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={colCount} className="px-4 py-16">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-2xl bg-secondary-100 grid place-items-center text-secondary-400 mb-3">
                          <Inbox size={26} />
                        </div>
                        {q ? (
                          <>
                            <p className="font-semibold text-ink">No matches for “{q}”</p>
                            <button onClick={() => setQ("")} className="text-sm text-primary-700 hover:underline mt-1">
                              Clear search
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="font-semibold text-ink">No {resource.label.toLowerCase()} yet</p>
                            <p className="text-sm text-muted mb-4">Add your first item to get started.</p>
                            <Link
                              to={`/r/${key}/new`}
                              className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-bold text-sm px-4 py-2 rounded-lg"
                            >
                              <Plus size={16} /> Add New
                            </Link>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr
                      key={row.id}
                      className="border-b border-secondary-100 last:border-0 hover:bg-secondary-100/70 transition-colors"
                    >
                      {resource.listColumns.map((c, ci) => (
                        <td
                          key={c}
                          className={`relative px-4 py-3 align-middle ${ci === 0 ? "pl-7" : ""} ${
                            isNumeric(c)
                              ? "text-right tabular-nums text-primary-700"
                              : c === "name" || c === "title"
                              ? "font-semibold text-ink"
                              : "text-primary-700"
                          }`}
                        >
                          {ci === 0 && (
                            <span
                              className={`absolute left-2.5 top-2 bottom-2 w-1.5 rounded-full ${ROW_STRIPS[i % ROW_STRIPS.length]}`}
                            />
                          )}
                          {cell(c, row)}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/r/${key}/${row.id}`}
                            aria-label="Edit"
                            className="p-2 rounded-lg text-muted hover:bg-primary-100 hover:text-primary-900 transition-colors"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => remove(row.id)}
                            aria-label="Delete"
                            className="p-2 rounded-lg text-muted hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination bar */}
          {!loading && !q && pages > 1 && (
            <div className="flex items-center justify-between gap-3 flex-wrap border-t border-secondary-200 px-4 py-3">
              <p className="text-xs text-muted tabular-nums">
                Showing {from}–{to} of {total}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="p-2 rounded-lg text-primary-700 hover:bg-secondary-200 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <ChevronLeft size={16} />
                </button>
                {pageList(page, pages).map((p, idx) =>
                  p === "…" ? (
                    <span key={`e${idx}`} className="px-2 text-muted">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goTo(p)}
                      aria-current={p === page ? "page" : undefined}
                      className={`min-w-[2rem] h-8 px-2 rounded-lg text-sm font-medium tabular-nums transition-colors ${
                        p === page
                          ? "bg-primary-900 text-white"
                          : "text-primary-700 hover:bg-secondary-200"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => goTo(page + 1)}
                  disabled={page === pages}
                  aria-label="Next page"
                  className="p-2 rounded-lg text-primary-700 hover:bg-secondary-200 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
