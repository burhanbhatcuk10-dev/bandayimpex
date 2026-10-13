import React from "react";
import { Heart } from "lucide-react";
import { useShop } from "../ShopContext";
import { useData } from "../DataContext";
import { toast } from "../hooks/use-toast";

export default function WishlistHeart({ product, floating = false, className = "" }) {
  const { inWishlist, toggleWishlist } = useShop();
  const { c } = useData();
  const active = inWishlist(product.id);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    toast({
      title: added ? c("wishlist.toast.added") : c("wishlist.toast.removed"),
      description: product.name,
    });
  };

  const label = `${active ? c("wishlist.remove") : c("wishlist.add")} — ${product.name}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`inline-flex items-center justify-center rounded-full transition-colors ${
        floating
          ? "w-11 h-11 bg-white/95 shadow-md hover:bg-white backdrop-blur-sm"
          : "w-[52px] h-[52px] border border-line hover:bg-secondary-200"
      } ${className}`}
    >
      <Heart
        size={20}
        className={active ? "text-primary" : "text-muted"}
        fill={active ? "currentColor" : "none"}
        strokeWidth={2}
      />
    </button>
  );
}
