import React, { useRef, useState } from "react";
import { UploadCloud, X, Link2 } from "lucide-react";

export default function ImageUpload({ file, url, onFile, onUrl }) {
  const inputRef = useRef(null);
  const [showUrl, setShowUrl] = useState(false);
  const preview = file ? URL.createObjectURL(file) : url;

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="w-28 h-28 rounded-xl border border-line bg-secondary-100 overflow-hidden shrink-0 grid place-items-center">
          {preview ? (
            <img src={preview} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-primary-300 text-xs">No image</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-line text-sm font-medium hover:bg-secondary-100"
          >
            <UploadCloud size={16} /> Upload image
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] || null)}
          />
          <button
            type="button"
            onClick={() => setShowUrl((v) => !v)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-primary-800 ml-2"
          >
            <Link2 size={16} /> Use a URL
          </button>
          {(file || url) && (
            <button
              type="button"
              onClick={() => {
                onFile(null);
                onUrl("");
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-primary hover:bg-secondary-200 ml-2"
            >
              <X size={16} /> Remove
            </button>
          )}
          {showUrl && (
            <input
              type="text"
              value={file ? "" : url}
              disabled={!!file}
              placeholder="https://…"
              onChange={(e) => onUrl(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-line text-sm"
            />
          )}
          <p className="text-xs text-primary-400">JPG/PNG, up to 8&nbsp;MB. Uploaded to Cloudinary on save.</p>
        </div>
      </div>
    </div>
  );
}
