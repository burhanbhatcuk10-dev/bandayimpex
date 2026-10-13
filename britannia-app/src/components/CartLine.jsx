import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useShop } from "../ShopContext";
import { useData } from "../DataContext";
import { thumb } from "../lib/img";

export default function CartLine({ item, compact = false, onNavigate }) {
  const { setQty, removeFromCart, maxQty } = useShop();
  const { c } = useData();

  const dec = () => setQty(item.id, item.qty - 1);
  const inc = () => setQty(item.id, item.qty + 1);

  return (
    <div className={`flex gap-4 ${compact ? "py-4" : "py-5"}`}>
      <Link
        to={`/product/${item.slug}`}
        onClick={onNavigate}
        className={`${compact ? "w-20 h-20" : "w-24 h-24 md:w-28 md:h-28"} shrink-0 rounded-2xl overflow-hidden`}
        style={{ background: item.color }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={thumb(item.image, 200)}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          to={`/product/${item.slug}`}
          onClick={onNavigate}
          className="font-black uppercase tracking-wide text-ink hover:text-primary transition-colors block truncate"
        >
          {item.name}
        </Link>
        <p className="text-xs text-muted mt-0.5 truncate">{item.category}</p>
        {(item.weight || item.quantity) && (
          <p className="text-xs text-muted mt-1 truncate">
            {[item.weight, item.quantity].filter(Boolean).join(" · ")}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <div className="inline-flex items-center rounded-full border border-line bg-white">
            <button
              type="button"
              onClick={dec}
              disabled={item.qty <= 1}
              aria-label={`${c("cart.qty.decrease")} — ${item.name}`}
              className="w-11 h-11 flex items-center justify-center rounded-full text-primary hover:bg-secondary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Minus size={16} />
            </button>
            <span
              className="w-9 text-center font-bold text-ink tabular-nums"
              aria-live="polite"
              aria-label={`${c("cart.qty.label")}: ${item.qty}`}
            >
              {item.qty}
            </span>
            <button
              type="button"
              onClick={inc}
              disabled={item.qty >= maxQty}
              aria-label={`${c("cart.qty.increase")} — ${item.name}`}
              className="w-11 h-11 flex items-center justify-center rounded-full text-primary hover:bg-secondary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            aria-label={`${c("cart.remove")} — ${item.name}`}
            className="w-11 h-11 flex items-center justify-center rounded-full text-muted hover:text-primary hover:bg-secondary-200 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
