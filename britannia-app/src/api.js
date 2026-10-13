const PROD_API_URL = "https://bipl-api.onrender.com/api";

const resolveApiUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  if (host === "localhost" || host === "127.0.0.1") return "http://localhost:4000/api";
  return PROD_API_URL;
};

const API_URL = resolveApiUrl();

async function get(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export async function fetchAll() {
  const [
    heroSlides,
    categories,
    products,
    initiatives,
    news,
    jobs,
    leadership,
    milestones,
    stats,
    sustainability,
    reports,
    financials,
    siteContent,
  ] = await Promise.all([
    get("/hero-slides"),
    get("/categories"),
    get("/products"),
    get("/initiatives"),
    get("/news"),
    get("/jobs"),
    get("/leadership"),
    get("/milestones"),
    get("/stats"),
    get("/sustainability"),
    get("/reports"),
    get("/financials"),
    get("/site-content"),
  ]);
  return {
    heroSlides, categories, products, initiatives, news, jobs, leadership,
    milestones, stats, sustainability, reports, financials, siteContent,
  };
}

async function postForm(path, formData) {
  const res = await fetch(`${API_URL}${path}`, { method: "POST", body: formData });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

// Public form submissions.
export const submitContact = (body) => post("/submissions/contact", body);
export const submitApplication = (body) => {
  if (body.resume instanceof File) {
    const fd = new FormData();
    Object.entries(body).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    return postForm("/submissions/applications", fd);
  }
  return post("/submissions/applications", body);
};
export const subscribeNewsletter = (body) => post("/submissions/newsletter", body);
export const submitEnquiry = (body) => post("/submissions/enquiries", body);

export { API_URL };
