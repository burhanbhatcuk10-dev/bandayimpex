import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Send, CheckCircle2, Heart, Loader2 } from "lucide-react";
import Layout from "../components/Layout";
import CartLine from "../components/CartLine";
import { useShop } from "../ShopContext";
import { useData } from "../DataContext";
import { submitEnquiry } from "../api";

const inputCls =
  "w-full h-12 px-4 rounded-xl border border-line bg-white text-base text-ink placeholder:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-shadow";

const Field = ({ id, label, required, hint, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
      {label}
      {required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
    </label>
    {children}
    {hint && !error && <p className="text-xs text-muted mt-1">{hint}</p>}
    {error && (
      <p id={`${id}-error`} role="alert" className="text-xs font-semibold text-primary mt-1">
        {error}
      </p>
    )}
  </div>
);

const emptyForm = { name: "", email: "", phone: "", company: "", message: "" };

const Cart = () => {
  const { cartItems, cartCount, clearCart, wishlistCount } = useShop();
  const { c } = useData();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: "" } : prev));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = c("cart.form.error.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = c("cart.form.error.email");
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      (found.name ? nameRef : emailRef).current?.focus();
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      await submitEnquiry({
        ...form,
        items: cartItems.map((i) => ({
          id: i.id,
          slug: i.slug,
          name: i.name,
          category: i.category,
          weight: i.weight || "",
          quantity: i.quantity || "",
          qty: i.qty,
        })),
      });
      setStatus("sent");
      clearCart();
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || c("cart.form.error.generic"));
    }
  };

  const Hero = (
    <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "var(--color-primary)" }}>
      <div
        className="absolute -top-2 -right-2 w-40 h-40 md:w-64 md:h-64 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)",
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <p className="text-white/80 uppercase tracking-[0.4em] text-xs font-semibold mb-3">{c("cart.hero.eyebrow")}</p>
        <h1 className="text-white font-black text-4xl md:text-7xl tracking-tight leading-none">
          {c("cart.hero.title")}
        </h1>
        <p className="text-white/90 mt-6 max-w-2xl text-lg">{c("cart.hero.subtitle")}</p>
      </div>
    </section>
  );

  if (status === "sent") {
    return (
      <Layout>
        {Hero}
        <section className="py-20 md:py-28" style={{ background: "var(--color-secondary)" }}>
          <div className="max-w-[720px] mx-auto px-4 md:px-8 text-center">
            <div className="bg-white rounded-3xl shadow-md p-10 md:p-14">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                <CheckCircle2 size={30} className="text-primary" />
              </div>
              <h2
                className="font-black text-3xl md:text-4xl text-ink uppercase tracking-wide"
                style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.03em" }}
              >
                {c("cart.sent.title")}
              </h2>
              <p className="text-muted mt-4 leading-relaxed">{c("cart.sent.body")}</p>
              <Link
                to="/products"
                className="mt-8 inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold uppercase text-sm px-7 py-3.5 rounded-full transition-colors"
              >
                {c("cart.sent.cta")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {Hero}

      <section className="py-12 md:py-16" style={{ background: "var(--color-secondary)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md py-20 px-6 text-center max-w-[640px] mx-auto">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                <ShoppingBag size={28} className="text-primary-400" />
              </div>
              <h2 className="font-black text-xl text-ink uppercase tracking-wide">{c("cart.empty.title")}</h2>
              <p className="text-muted mt-3">{c("cart.empty.body")}</p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold uppercase text-sm px-7 py-3.5 rounded-full transition-colors"
                >
                  {c("cart.empty.cta")} <ArrowRight size={16} />
                </Link>
                {wishlistCount > 0 && (
                  <Link
                    to="/wishlist"
                    className="inline-flex items-center gap-2 bg-secondary-200 hover:bg-secondary-300 text-primary-950 font-bold uppercase text-sm px-7 py-3.5 rounded-full transition-colors"
                  >
                    <Heart size={16} /> {c("cart.empty.wishlist_cta")} ({wishlistCount})
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_400px] gap-8">
              {/* Items */}
              <div className="bg-white rounded-3xl shadow-md p-5 md:p-7 min-w-0">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-secondary-200">
                  <h2 className="font-black uppercase tracking-wide text-ink">
                    {cartItems.length} {cartItems.length === 1 ? c("cart.item") : c("cart.items")}
                    <span className="text-muted font-normal normal-case tracking-normal text-sm ml-2">
                      · {cartCount} {c("cart.units")}
                    </span>
                  </h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-semibold text-muted hover:text-primary transition-colors py-2"
                  >
                    {c("cart.clear")}
                  </button>
                </div>

                <div className="divide-y divide-secondary-200">
                  {cartItems.map((item) => (
                    <CartLine key={item.id} item={item} />
                  ))}
                </div>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 mt-6 font-bold uppercase text-sm text-primary hover:underline"
                >
                  {c("cart.continue")} <ArrowRight size={16} />
                </Link>
              </div>

              {/* Enquiry form */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-3xl shadow-md p-6 md:p-7 space-y-4"
                >
                  <div>
                    <h2
                      className="font-black text-2xl text-ink uppercase tracking-wide"
                      style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.03em" }}
                    >
                      {c("cart.form.title")}
                    </h2>
                    <p className="text-sm text-muted mt-1">{c("cart.form.subtitle")}</p>
                  </div>

                  <Field id="enq-name" label={c("cart.form.name")} required error={errors.name}>
                    <input
                      id="enq-name"
                      ref={nameRef}
                      value={form.name}
                      onChange={set("name")}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "enq-name-error" : undefined}
                      className={inputCls}
                    />
                  </Field>

                  <Field id="enq-email" label={c("cart.form.email")} required error={errors.email}>
                    <input
                      id="enq-email"
                      ref={emailRef}
                      type="email"
                      inputMode="email"
                      value={form.email}
                      onChange={set("email")}
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "enq-email-error" : undefined}
                      className={inputCls}
                    />
                  </Field>

                  <Field id="enq-phone" label={c("cart.form.phone")}>
                    <input
                      id="enq-phone"
                      type="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      autoComplete="tel"
                      className={inputCls}
                    />
                  </Field>

                  <Field id="enq-company" label={c("cart.form.company")} hint={c("cart.form.company_hint")}>
                    <input
                      id="enq-company"
                      value={form.company}
                      onChange={set("company")}
                      autoComplete="organization"
                      className={inputCls}
                    />
                  </Field>

                  <Field id="enq-message" label={c("cart.form.message")}>
                    <textarea
                      id="enq-message"
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      className={`${inputCls} h-auto py-3 resize-y`}
                    />
                  </Field>

                  {status === "error" && (
                    <p role="alert" className="text-sm font-semibold text-primary bg-secondary rounded-xl px-4 py-3">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold uppercase text-sm px-6 py-4 rounded-full transition-colors"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> {c("cart.form.sending")}
                      </>
                    ) : (
                      <>
                        <Send size={16} /> {c("cart.form.button")}
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted text-center">{c("cart.form.note")}</p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
