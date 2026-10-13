import React, { useRef } from "react";
import { UploadCloud, X, Plus } from "lucide-react";

export default function GalleryUpload({ existing = [], files = [], onExisting, onFiles }) {
  const inputRef = useRef(null);

  const removeExisting = (idx) => onExisting(existing.filter((_, i) => i !== idx));
  const removeFile = (idx) => onFiles(files.filter((_, i) => i !== idx));
  const addFiles = (list) => onFiles([...files, ...Array.from(list || [])]);

  const total = existing.length + files.length;

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {existing.map((img, i) => (
          <div key={`e${i}`} className="relative w-24 h-24 rounded-xl border border-line overflow-hidden group">
            <img src={img.url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeExisting(i)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-primary/90 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {files.map((f, i) => (
          <div key={`f${i}`} className="relative w-24 h-24 rounded-xl border border-primary/40 overflow-hidden group">
            <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 inset-x-0 text-[10px] text-center bg-primary/80 text-white py-0.5">New</span>
            <button
              type="button"
              onClick={() => removeFile(i)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-primary/90 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-24 h-24 rounded-xl border-2 border-dashed border-line hover:border-primary hover:bg-secondary-100 grid place-items-center text-muted transition-colors"
          aria-label="Add images"
        >
          {total === 0 ? <UploadCloud size={22} /> : <Plus size={22} />}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <p className="text-xs text-muted mt-2">Add multiple images. JPG/PNG, up to 8&nbsp;MB each — uploaded on save.</p>
    </div>
  );
}
