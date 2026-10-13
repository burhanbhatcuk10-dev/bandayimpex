import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trash2, Check, Eye, X, FileText, Download } from "lucide-react";
import { getSubmission } from "../config";
import { api } from "../api";

const fmt = (v, col) => {
  if (col === "created_at" && v) return new Date(v).toLocaleString();
  return String(v ?? "");
};

const DETAIL_FIELDS = {
  contact: [
    ["name", "Name"],
    ["email", "Email"],
    ["subject", "Subject"],
    ["message", "Message"],
    ["created_at", "Received"],
  ],
  applications: [
    ["job_title", "Applied for"],
    ["name", "Name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["experience", "Experience"],
    ["cover_letter", "Cover letter"],
    ["created_at", "Received"],
  ],
  enquiries: [
    ["name", "Name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["company", "Company"],
    ["message", "Message"],
    ["created_at", "Received"],
  ],
  newsletter: [
    ["email", "Email"],
    ["created_at", "Subscribed"],
  ],
};

function EnquiryItems({ items }) {
  const list = Array.isArray(items) ? items : [];
  if (list.length === 0) return <p className="text-sm text-muted">No products listed.</p>;

  return (
    <ul className="divide-y divide-secondary-200 rounded-lg border border-secondary-200 overflow-hidden">
      {list.map((it, i) => (
        <li key={i} className="flex items-start justify-between gap-3 px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{it.name || it.slug}</p>
            <p className="text-xs text-muted truncate">
              {[it.category, it.weight, it.quantity].filter(Boolean).join(" · ")}
            </p>
          </div>
          <span className="text-sm font-bold text-primary whitespace-nowrap">× {it.qty}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailModal({ type, row, onClose }) {
  if (!row) return null;
  const fields = DETAIL_FIELDS[type] || Object.keys(row).map((k) => [k, k]);
  const resume = row.resume_url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-ink">Submission details</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-muted hover:bg-secondary-200 hover:text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {fields.map(([key, label]) => {
            const val = row[key];
            if (val === undefined || val === null || val === "") return null;
            return (
              <div key={key}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">{label}</p>
                <p className="text-sm text-primary-700 whitespace-pre-wrap break-words">{fmt(val, key)}</p>
              </div>
            );
          })}

          {type === "enquiries" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                Products enquired about ({row.item_count ?? 0} units)
              </p>
              <EnquiryItems items={row.items} />
            </div>
          )}

          {type === "applications" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">Resume</p>
              {resume ? (
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold bg-secondary-200 text-primary px-3 py-2 rounded-lg hover:bg-secondary-300"
                  >
                    <FileText size={16} /> View
                  </a>
                  <a
                    href={resume}
                    download
                    className="inline-flex items-center gap-2 text-sm font-semibold bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary-800"
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              ) : (
                <p className="text-sm text-muted">No resume uploaded.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Submissions() {
  const { key } = useParams();
  const sub = getSubmission(key);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState(null); // row shown in the detail modal

  const load = async () => {
    setLoading(true);
    try {
      setRows(await api.get(`/submissions/${key}`));
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const remove = async (id) => {
    if (!confirm("Delete this submission?")) return;
    await api.del(`/submissions/${key}/${id}`);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const markRead = async (id) => {
    await api.patch(`/submissions/${key}/${id}/read`);
    setRows((r) => r.map((x) => (x.id === id ? { ...x, is_read: true } : x)));
  };

  const openDetail = (row) => {
    setActive(row);
    if (canRead && !row.is_read) markRead(row.id);
  };

  if (!sub) return <p>Unknown submission type.</p>;
  const canRead = key !== "newsletter";

  return (
    <div>
      <Link to="/" className="text-sm text-primary-400 hover:text-primary-700 inline-flex items-center gap-1 mb-1">
        <ArrowLeft size={14} /> Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-6">{sub.label}</h1>

      {error && <p className="text-primary bg-secondary-200 rounded-lg px-4 py-3 mb-4 text-sm">{error}</p>}

      <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-secondary-200 text-left text-muted">
                {sub.columns.map((c) => (
                  <th key={c} className="px-4 py-3 font-semibold capitalize whitespace-nowrap">
                    {c.replace("_", " ")}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={sub.columns.length + 1} className="px-4 py-10 text-center text-primary-400">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={sub.columns.length + 1} className="px-4 py-10 text-center text-primary-400">
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => openDetail(row)}
                    className={`border-b border-secondary-100 hover:bg-secondary-100/60 cursor-pointer ${
                      canRead && !row.is_read ? "font-semibold" : ""
                    }`}
                  >
                    {sub.columns.map((c) => (
                      <td key={c} className="px-4 py-3 text-primary-700 max-w-[280px] truncate">
                        {fmt(row[c], c)}
                      </td>
                    ))}
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openDetail(row)}
                          title="View details"
                          className="p-2 rounded-lg text-muted hover:bg-secondary-200 hover:text-primary"
                        >
                          <Eye size={16} />
                        </button>
                        {canRead && !row.is_read && (
                          <button
                            onClick={() => markRead(row.id)}
                            title="Mark as read"
                            className="p-2 rounded-lg text-muted hover:bg-secondary-200 hover:text-primary"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => remove(row.id)}
                          className="p-2 rounded-lg text-muted hover:bg-secondary-200 hover:text-primary"
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
      </div>

      {active && <DetailModal type={key} row={active} onClose={() => setActive(null)} />}
    </div>
  );
}
