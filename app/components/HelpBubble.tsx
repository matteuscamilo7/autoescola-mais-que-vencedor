"use client";

import { useEffect, useState } from "react";

export default function HelpBubble() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(true), 5000);
    const dismiss = () => setShow(false);
    const later = window.setTimeout(dismiss, 15000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(later);
    };
  }, []);

  return (
    <div className={`help-bubble ${show ? "show" : ""}`} onClick={() => setShow(false)}>
      Precisa de ajuda para escolher um plano?
    </div>
  );
}
