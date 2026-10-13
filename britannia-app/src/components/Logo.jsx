import React, { useState } from "react";

export default function Logo({ className = "", imgClassName = "h-9 md:h-11 w-auto", light = false }) {
  const [ok, setOk] = useState(true);

  if (ok) {
    return (
      <img
        src="/logo.svg"
        alt="BIPL"
        className={`${imgClassName} ${className}`}
        onError={() => setOk(false)}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className="px-4 py-2 font-black text-lg md:text-xl tracking-wider"
        style={{
          color: light ? "var(--color-primary-900)" : "#ffffff",
          background: light
            ? "var(--color-secondary)"
            : "linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 75%, 92% 100%, 8% 100%, 0 75%)",
        }}
      >
        BIPL
      </div>
      <div
        className="h-1 w-full"
        style={{ background: "linear-gradient(90deg, var(--color-primary-600) 0%, var(--color-primary-400) 100%)" }}
      />
    </div>
  );
}
