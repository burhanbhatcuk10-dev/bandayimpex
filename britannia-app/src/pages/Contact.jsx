import React, { useState } from "react";
import Layout from "../components/Layout";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { toast } from "../hooks/use-toast";
import { submitContact } from "../api";
import { useData } from "../DataContext";

const Contact = () => {
  const { c } = useData();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(form);
    } catch {
    }
    toast({
      title: "Message Sent!",
      description: `Thanks ${form.name}, we'll respond to ${form.email} soon.`,
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "var(--color-primary)" }}>
        <div
          className="absolute -top-2 -right-2 w-40 h-40 md:w-64 md:h-64 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)",
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <p className="text-white/80 uppercase tracking-[0.4em] text-xs font-semibold mb-3">{c("contact.hero.eyebrow")}</p>
          <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none whitespace-pre-line">
            {c("contact.hero.title")}
          </h1>
          <p className="text-white/90 mt-6 max-w-2xl text-lg">
            {c("contact.hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            {[
              { icon: MapPin, title: c("contact.office.title"), detail: c("contact.office.detail") },
              { icon: Phone, title: c("contact.phone.title"), detail: c("contact.phone.detail") },
              { icon: Mail, title: c("contact.email.title"), detail: c("contact.email.detail") },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl border border-secondary-200 hover:shadow-md transition-shadow">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "var(--color-primary)" }}
                >
                  <item.icon size={20} className="text-white" />
                </div>
                <h4 className="font-black text-ink mb-1">{item.title}</h4>
                <p className="text-sm text-muted whitespace-pre-line break-words">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl p-8 shadow-md" style={{ background: "var(--color-secondary)" }}>
              <h2 className="font-black text-2xl md:text-3xl text-ink mb-6">{c("contact.form.title")}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input required placeholder={c("contact.form.name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white h-12" />
                  <Input required type="email" placeholder={c("contact.form.email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white h-12" />
                </div>
                <Input required placeholder={c("contact.form.subject")} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="bg-white h-12" />
                <Textarea required rows={6} placeholder={c("contact.form.message")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-white" />
                <Button type="submit" className="bg-primary hover:bg-primary-800 text-white h-12 px-8 font-bold uppercase tracking-wider">
                  <Send size={16} className="mr-2" /> {c("contact.form.button")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
