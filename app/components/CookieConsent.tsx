"use client";

import { useEffect, useState } from "react";

export default function CookieConsent({ onPrivacy }: { onPrivacy: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setVisible(!localStorage.getItem("cookie-consent"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", zIndex: 200, bottom: 0, left: 0, right: 0,
      padding: "16px 20px", background: "#0b0f16", color: "#fff",
      display: "flex", flexWrap: "wrap", gap: "12px",
      alignItems: "center", justifyContent: "space-between",
      fontSize: "13px", lineHeight: 1.5, boxShadow: "0 -8px 30px rgba(0,0,0,.3)",
    }}>
      <p style={{ margin: 0, maxWidth: 700, color: "#cbd5e1" }}>
        Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
        <button type="button" onClick={onPrivacy} style={{ color: "#ffd400", background: "none", border: 0, padding: 0, cursor: "pointer", textDecoration: "underline" }}>
          Política de Privacidade
        </button>.
      </p>
      <button
        onClick={accept}
        style={{
          padding: "10px 28px", border: 0, borderRadius: 10,
          background: "#ffd400", color: "#050608", fontWeight: 850,
          cursor: "pointer", fontSize: 13, whiteSpace: "nowrap",
        }}
      >Aceitar</button>
    </div>
  );
}
