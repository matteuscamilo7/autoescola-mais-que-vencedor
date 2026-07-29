"use client";

import WaButton, { WaIcon, wa } from "./WaButton";
import { defaultMessage } from "../data/content";

function track(event: string) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event });
}

export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a href="#planos" onClick={() => track("mobile_view_plans")}>Ver planos</a>
      <a href={wa(defaultMessage)} target="_blank" rel="noreferrer" onClick={() => track("mobile_whatsapp")}>
        <WaIcon /> WhatsApp
      </a>
    </div>
  );
}

export default function WhatsAppFloat() {
  return (
    <WaButton className="float-wa" event="whatsapp_floating">
      <span className="sr-only">Falar no WhatsApp</span>
    </WaButton>
  );
}
