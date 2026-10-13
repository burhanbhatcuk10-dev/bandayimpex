import React, { useEffect, useMemo, useState } from "react";
import { Save, ChevronDown, RotateCcw, Check } from "lucide-react";
import { websiteSections } from "../website";
import { api } from "../api";

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";

const ALL_KEYS = websiteSections.flatMap((s) => s.fields.map((f) => f.key));

export default function Website() {
  const [values, setValues] = useState({});
  const [saved, setSaved] = useState({}); // last persisted snapshot
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(() => websiteSections.map((_, i) => i === 0));

  useEffect(() => {
    (async () => {
      try {
        const map = await api.get("/site-content");
        const seeded = {};
        for (const k of ALL_KEYS) seeded[k] = map[k] ?? "";
        setValues(seeded);
        setSaved(seeded);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const dirtyKeys = useMemo(
    () => ALL_KEYS.filter((k) => (values[k] ?? "") !== (saved[k] ?? "")),
    [values, saved]
  );

  const setField = (key, v) => {
    setDone(false);
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  const save = async () => {
    if (dirtyKeys.length === 0) return;
    setSaving(true);
    setError("");
    try {
      const payload = {};
      for (const k of dirtyKeys) payload[k] = values[k] ?? "";
      await api.put("/site-content", payload);
      setSaved((prev) => ({ ...prev, ...payload }));
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const revertField = (key) => setField(key, saved[key] ?? "");
  const toggle = (i) => setOpen((o) => o.map((v, idx) => (idx === i ? !v : v)));

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-ink">Manage Website</h1>
          <p className="text-sm text-muted">
            Edit the text, labels and links shown across every page of the public site.
          </p>
        </div>
      </div>

      {error && <p className="text-primary bg-secondary-200 rounded-lg px-4 py-3 mb-4 text-sm">{error}</p>}
      {done && dirtyKeys.length === 0 && (
        <p className="text-primary bg-secondary-200 rounded-lg px-4 py-3 mb-4 text-sm inline-flex items-center gap-2">
          <Check size={16} /> Changes saved. They are live on the site now.
        </p>
      )}

      <div className="space-y-4 pb-24">
        {websiteSections.map((section, i) => {
          const sectionDirty = section.fields.filter((f) => dirtyKeys.includes(f.key)).length;
          return (
            <div key={section.title} className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary-100/60"
              >
                <div>
                  <p className="font-bold text-ink flex items-center gap-2">
                    {section.title}
                    {sectionDirty > 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-white rounded-full px-2 py-0.5">
                        {sectionDirty} unsaved
                      </span>
                    )}
                  </p>
                  {section.description && <p className="text-xs text-muted mt-0.5">{section.description}</p>}
                </div>
                <ChevronDown
                  size={18}
                  className={`text-muted transition-transform shrink-0 ${open[i] ? "rotate-180" : ""}`}
                />
              </button>

              {open[i] && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-secondary-100">
                  {section.fields.map((f) => {
                    const isDirty = dirtyKeys.includes(f.key);
                    const val = values[f.key] ?? "";
                    return (
                      <div key={f.key}>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-sm font-semibold text-primary-700">
                            {f.label}
                            {isDirty && <span className="ml-2 text-[10px] font-bold uppercase text-primary">edited</span>}
                          </label>
                          {isDirty && (
                            <button
                              type="button"
                              onClick={() => revertField(f.key)}
                              className="inline-flex items-center gap-1 text-xs text-muted hover:text-primary"
                            >
                              <RotateCcw size={12} /> Revert
                            </button>
                          )}
                        </div>

                        {f.type === "textarea" ? (
                          <textarea
                            rows={3}
                            value={val}
                            onChange={(e) => setField(f.key, e.target.value)}
                            className={inputCls}
                          />
                        ) : f.type === "image" ? (
                          <div className="flex items-start gap-3">
                            {val ? (
                              <img
                                src={val}
                                alt=""
                                className="w-16 h-16 rounded-lg object-cover border border-secondary-200 shrink-0"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-secondary-200 shrink-0" />
                            )}
                            <input
                              type="url"
                              value={val}
                              onChange={(e) => setField(f.key, e.target.value)}
                              placeholder="https://…"
                              className={inputCls}
                            />
                          </div>
                        ) : (
                          <input
                            type={f.type === "url" ? "url" : "text"}
                            value={val}
                            onChange={(e) => setField(f.key, e.target.value)}
                            placeholder={f.type === "url" ? "https://… (or # to disable)" : undefined}
                            className={inputCls}
                          />
                        )}

                        {f.hint && <p className="text-xs text-muted mt-1">{f.hint}</p>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-line px-4 lg:px-8 py-3 flex items-center justify-between gap-4 z-20">
        <p className="text-sm text-muted">
          {dirtyKeys.length === 0 ? "No unsaved changes" : `${dirtyKeys.length} unsaved change${dirtyKeys.length === 1 ? "" : "s"}`}
        </p>
        <button
          onClick={save}
          disabled={saving || dirtyKeys.length === 0}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold text-sm px-5 py-2.5 rounded-lg disabled:opacity-50"
        >
          <Save size={16} /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
