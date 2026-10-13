import React from "react";
import ImageUpload from "./ImageUpload";
import GalleryUpload from "./GalleryUpload";
import ListInput from "./ListInput";

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";

export default function Field({
  field,
  value,
  onChange,
  options = [],
  fileValue,
  onFile,
  galleryFiles = [],
  onGalleryFiles,
  toggleValue,
  onToggle,
}) {
  const { label, type, hint, required, toggle, toggleLabel } = field;

  const label_ = (
    <div className="flex items-center justify-between mb-1.5">
      <label className="block text-sm font-semibold text-primary-700">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      {toggle && (
        <label className="inline-flex items-center gap-1.5 text-xs font-medium text-muted cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!toggleValue}
            onChange={(e) => onToggle(e.target.checked)}
            className="accent-[#1b2235] w-4 h-4"
          />
          {toggleLabel || "Show on site"}
        </label>
      )}
    </div>
  );

  if (type === "image") {
    return (
      <div>
        {label_}
        <ImageUpload file={fileValue} url={value || ""} onFile={onFile} onUrl={(u) => onChange(u)} />
      </div>
    );
  }

  if (type === "gallery") {
    return (
      <div>
        {label_}
        <GalleryUpload
          existing={Array.isArray(value) ? value : []}
          files={galleryFiles}
          onExisting={(arr) => onChange(arr)}
          onFiles={onGalleryFiles}
        />
        {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div>
        {label_}
        <ListInput value={value} onChange={onChange} />
        {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        {label_}
        <textarea rows={4} value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        {label_}
        <select value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls}>
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
      </div>
    );
  }

  if (type === "color") {
    return (
      <div>
        {label_}
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={value || "#f3f6fb"}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-10 rounded border border-line bg-white p-0.5 cursor-pointer"
          />
          <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        </div>
      </div>
    );
  }

  if (type === "tags") {
    const arr = Array.isArray(value) ? value : [];
    return (
      <div>
        {label_}
        <input
          type="text"
          value={arr.join(", ")}
          onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          className={inputCls}
        />
        {hint && <p className="text-xs text-muted mt-1">Comma-separated. {hint}</p>}
      </div>
    );
  }

  return (
    <div>
      {label_}
      <input
        type={type === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
      {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
    </div>
  );
}
