import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { getResource } from "../config";
import { api } from "../api";
import Field from "../components/Field";

const GALLERY_FILE_FIELD = "sub_image_files";

export default function ResourceForm() {
  const { key, id } = useParams();
  const resource = getResource(key);
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({});
  const [file, setFile] = useState(null); // main image
  const [galleryFiles, setGalleryFiles] = useState([]); // new sub-image files
  const [optionsMap, setOptionsMap] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const imageField = resource?.fields.find((f) => f.type === "image");

  useEffect(() => {
    (async () => {
      const dynamic = {};
      for (const f of resource.fields) {
        if (f.optionsFrom) {
          try {
            const rows = await api.get(`/${f.optionsFrom}`);
            dynamic[f.name] = rows.map((r) => r.name).filter(Boolean);
          } catch {
            dynamic[f.name] = [];
          }
        }
      }
      setOptionsMap(dynamic);

      if (isEdit) {
        try {
          setForm(await api.get(`/${key}/${id}`));
        } catch (err) {
          setError(err.message);
        }
      } else {
        const init = {};
        resource.fields.forEach((f) => {
          if (f.type === "number") init[f.name] = 0;
          else if (f.type === "tags" || f.type === "list" || f.type === "gallery") init[f.name] = [];
          else if (f.type === "color") init[f.name] = "#f3f6fb";
          if (f.toggle) init[f.toggle] = false;
        });
        setForm(init);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, id]);

  const getValue = (f) => (f.type === "image" ? form[f.urlField] : form[f.name]);
  const setValue = (f, v) =>
    setForm((prev) => ({ ...prev, [f.type === "image" ? f.urlField : f.name]: v }));

  const collectBody = () => {
    const body = {};
    for (const f of resource.fields) {
      if (f.type === "image") {
        if (form[f.urlField] !== undefined) body[f.urlField] = form[f.urlField];
      } else if (f.type === "gallery") {
        body[f.name] = Array.isArray(form[f.name]) ? form[f.name] : [];
      } else if (form[f.name] !== undefined) {
        body[f.name] = form[f.name];
      }
      if (f.toggle) body[f.toggle] = !!form[f.toggle];
    }
    if (resource.key === "products") body.tagline = (form.taglines || [])[0] || "";
    return body;
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const path = isEdit ? `/${key}/${id}` : `/${key}`;
      const body = collectBody();
      const hasFiles = !!file || galleryFiles.length > 0;

      if (hasFiles) {
        const fd = new FormData();
        for (const [k, v] of Object.entries(body)) {
          fd.append(k, v !== null && typeof v === "object" ? JSON.stringify(v) : v);
        }
        if (file && imageField) fd.append(imageField.name, file);
        galleryFiles.forEach((gf) => fd.append(GALLERY_FILE_FIELD, gf));
        isEdit ? await api.putForm(path, fd) : await api.postForm(path, fd);
      } else {
        isEdit ? await api.put(path, body) : await api.post(path, body);
      }
      navigate(`/r/${key}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (!resource) return <p>Unknown resource.</p>;
  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <Link to={`/r/${key}`} className="text-sm text-muted hover:text-primary-700 inline-flex items-center gap-1 mb-2">
        <ArrowLeft size={14} /> {resource.label}
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-6">
        {isEdit ? `Edit ${resource.label}` : `New ${resource.label}`}
      </h1>

      {error && <p className="text-primary bg-secondary-200 rounded-lg px-4 py-3 mb-4 text-sm">{error}</p>}

      <form onSubmit={submit} className="bg-white rounded-xl border border-secondary-200 p-6 space-y-5">
        {resource.fields.map((f) => (
          <Field
            key={f.name}
            field={f}
            value={getValue(f)}
            onChange={(v) => setValue(f, v)}
            options={f.options || optionsMap[f.name] || []}
            fileValue={file}
            onFile={setFile}
            galleryFiles={galleryFiles}
            onGalleryFiles={setGalleryFiles}
            toggleValue={f.toggle ? form[f.toggle] : undefined}
            onToggle={f.toggle ? (v) => setForm((prev) => ({ ...prev, [f.toggle]: v })) : undefined}
          />
        ))}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold text-sm px-5 py-2.5 rounded-lg disabled:opacity-60"
          >
            <Save size={16} /> {saving ? "Saving…" : "Save"}
          </button>
          <Link to={`/r/${key}`} className="text-sm text-muted hover:text-primary-800 px-3 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
