import React from "react";
import { Plus, X } from "lucide-react";

const inputCls =
  "flex-1 px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";

export default function ListInput({ value, onChange, placeholder = "Add a line…" }) {
  const items = Array.isArray(value) ? value : [];

  const update = (i, v) => onChange(items.map((it, idx) => (idx === i ? v : it)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-xs text-muted w-5 shrink-0">{i + 1}.</span>
          <input
            type="text"
            value={it}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="w-9 h-9 shrink-0 grid place-items-center rounded-lg text-muted hover:text-primary hover:bg-secondary-100"
            aria-label="Remove line"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-line text-sm font-medium text-primary hover:bg-secondary-100"
      >
        <Plus size={16} /> Add line
      </button>
    </div>
  );
}
