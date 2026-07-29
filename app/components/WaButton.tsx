"use client";

import { whatsappBase, defaultMessage } from "../data/content";

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event, ...data });
}

export function WaIcon() {
  return <span className="wa-icon" aria-hidden="true">◉</span>;
}

export function wa(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

export default function WaButton({
  children,
  message = "",
  event = "whatsapp_click",
  className = "",
}: {
  children: React.ReactNode;
  message?: string;
  event?: string;
  className?: string;
}) {
  return (
    <a
      className={`button button--wa ${className}`}
      href={wa(message || defaultMessage)}
      target="_blank"
      rel="noreferrer"
      onClick={() => track(event)}
    >
      <WaIcon /> <span>{children}</span>
    </a>
  );
}
