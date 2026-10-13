import React, { useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../DataContext";
import { submitApplication } from "../api";
import { MapPin, Briefcase, Search, Upload, ArrowRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { toast } from "../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";

const Careers = () => {
  const { jobs, c } = useData();
  const [query, setQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "", coverLetter: "" });
  const [resume, setResume] = useState(null);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.location.toLowerCase().includes(query.toLowerCase()) ||
      j.dept.toLowerCase().includes(query.toLowerCase())
  );

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await submitApplication({
        job_title: selectedJob?.title || "",
        name: form.name,
        email: form.email,
        phone: form.phone,
        experience: form.experience,
        cover_letter: form.coverLetter,
        ...(resume ? { resume } : {}),
      });
    } catch {
    }
    toast({
      title: "Application Received!",
      description: `Thanks ${form.name}. We'll be in touch about the ${selectedJob?.title} role.`,
    });
    setForm({ name: "", email: "", phone: "", experience: "", coverLetter: "" });
    setResume(null);
    setSelectedJob(null);
  };

  return (
    <Layout>
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--color-primary)" }}>
        <div
          className="absolute -top-2 -right-2 w-40 h-40 md:w-64 md:h-64 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)",
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <p className="text-white/80 uppercase tracking-[0.4em] text-xs font-semibold mb-3">{c("careers.hero.eyebrow")}</p>
          <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none whitespace-pre-line">
            {c("careers.hero.title")}
          </h1>
          <p className="text-white/90 mt-6 max-w-2xl text-lg">
            {c("careers.hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-5 mb-10 flex gap-2">
            <div className="flex items-center flex-1 gap-2 px-3">
              <Search size={18} className="text-primary-400" />
              <Input
                placeholder={c("careers.search_placeholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center gap-4 border border-transparent hover:border-primary/20"
              >
                <div className="flex-1">
                  <h3 className="font-black text-lg text-ink">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.type}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: "var(--color-secondary)", color: "var(--color-primary)" }}>
                      {job.dept}
                    </span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => { setSelectedJob(job); setResume(null); }}
                      className="bg-primary hover:bg-primary-800 text-white font-bold uppercase text-xs tracking-wider px-6"
                    >
                      {c("careers.apply")} <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-xl">{c("careers.apply")} — {job.title}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleApply} className="space-y-4 mt-2">
                      <Input required placeholder={c("contact.form.name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      <Input required type="email" placeholder={c("contact.form.email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      <Input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      <Input required placeholder="Years of experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
                      <Textarea placeholder="Cover letter (optional)" rows={4} value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} />
                      <label className="flex items-center gap-3 p-3 border border-dashed rounded-lg text-sm text-muted cursor-pointer hover:bg-secondary-100">
                        <Upload size={16} />
                        <span className="truncate">{resume ? resume.name : c("careers.form.resume")}</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          onChange={(e) => setResume(e.target.files?.[0] || null)}
                        />
                      </label>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary-800 text-white h-11 font-bold uppercase tracking-wider">
                        {c("careers.form.submit")}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted">{c("careers.empty")}</div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
