import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { toast } from "../hooks/use-toast";
import { subscribeNewsletter } from "../api";
import { useData } from "../DataContext";

const Footer = () => {
  const { c } = useData();
  const [email, setEmail] = useState("");

  const socials = [
    { Icon: Facebook, href: c("social.facebook") },
    { Icon: Instagram, href: c("social.instagram") },
    { Icon: Twitter, href: c("social.twitter") },
    { Icon: Youtube, href: c("social.youtube") },
    { Icon: Linkedin, href: c("social.linkedin") },
  ];

  const companyLinks = [
    { label: c("footer.company.link1"), to: "/about" },
    { label: c("footer.company.link2"), to: "/about#leadership" },
    { label: c("footer.company.link3"), to: "/about#milestones" },
    { label: c("footer.company.link4"), to: "/sustainability" },
    { label: c("footer.company.link5"), to: "/careers" },
  ];

  const brandLinks = [
    { label: c("footer.brands.link1"), to: "/products", state: { cat: "BISCUITS" } },
    { label: c("footer.brands.link2"), to: "/products", state: { cat: "BISCUITS" } },
    { label: c("footer.brands.link3"), to: "/products", state: { cat: "BISCUITS" } },
    { label: c("footer.brands.link4"), to: "/products", state: { cat: "BISCUITS" } },
    { label: c("footer.brands.link5"), to: "/products", state: { cat: "DAIRY" } },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribeNewsletter({ email });
    } catch {
    }
    toast({ title: "Subscribed!", description: `Thanks for subscribing with ${email}` });
    setEmail("");
  };

  return (
    <footer className="bg-primary-950 text-primary-300 pt-16 pb-24 lg:pb-6 mt-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div
          className="rounded-2xl p-8 md:p-12 mb-14 relative overflow-hidden"
          style={{ background: "linear-gradient(120deg, var(--color-primary) 0%, var(--color-primary-800) 100%)" }}
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                {c("footer.newsletter.title")}
              </h3>
              <p className="text-white/90 mt-2">
                {c("footer.newsletter.subtitle")}
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
              <Input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-ink border-0 h-12"
              />
              <Button type="submit" className="bg-primary-950 hover:bg-primary-950 text-white h-12 px-6">
                <Send size={16} className="mr-2" /> {c("footer.newsletter.button")}
              </Button>
            </form>
          </div>
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -left-10 -bottom-20 w-72 h-72 rounded-full bg-white/5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo imgClassName="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-primary-400">
              {c("footer.about")}
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href || "#"}
                  target={href && href !== "#" ? "_blank" : undefined}
                  rel={href && href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">{c("footer.company.title")}</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((l, i) => (
                <li key={i}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">{c("footer.brands.title")}</h4>
            <ul className="space-y-2 text-sm">
              {brandLinks.map((l, i) => (
                <li key={i}><Link to={l.to} state={l.state} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">{c("footer.contact.title")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 min-w-0"><MapPin size={16} className="mt-0.5 shrink-0 text-primary" /> <span className="break-words min-w-0">{c("footer.address")}</span></li>
              <li className="flex gap-2 min-w-0"><Phone size={16} className="shrink-0 text-primary" /> <span className="break-words min-w-0">{c("footer.phone")}</span></li>
              <li className="flex gap-2 min-w-0"><Mail size={16} className="shrink-0 text-primary" /> <span className="break-all min-w-0">{c("footer.email")}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} {c("brand.name")}. {c("footer.rights")}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">{c("footer.legal.privacy")}</a>
            <a href="#" className="hover:text-white">{c("footer.legal.terms")}</a>
            <a href="#" className="hover:text-white">{c("footer.legal.cookies")}</a>
            <a href="#" className="hover:text-white">{c("footer.legal.sitemap")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
