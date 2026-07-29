"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#inicio"
      aria-label="Voltar ao topo"
      style={{
        position: "fixed", zIndex: 50, right: 25, bottom: 90,
        width: 44, height: 44, display: "grid", placeItems: "center",
        color: "#fff", background: "rgba(5,9,15,.78)",
        border: "1px solid rgba(255,255,255,.15)", borderRadius: "50%",
        backdropFilter: "blur(12px)", fontSize: 18, textDecoration: "none",
        transition: "transform .2s, opacity .2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "")}
    >↑</a>
  );
}
