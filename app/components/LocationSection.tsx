"use client";

import { useState } from "react";
import WaButton from "./WaButton";
import { mapQuery } from "../data/content";

function track(event: string) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event });
}

export default function LocationSection() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section className="section location" id="localizacao" aria-labelledby="location-title">
      <div className="container location__layout">
        <div data-reveal>
          <header className="section-title">
            <span>Atendimento local</span>
            <h2 id="location-title">Estamos em Queimados – RJ</h2>
            <p>Próximo ao Queimados Futebol Clube.</p>
          </header>
          <address>
            <b>⌖</b>
            <span>Av. Olímpia Silva, 181<small>Queimados – RJ</small></span>
          </address>
          <div className="location__actions">
            <a
              className="button button--blue"
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank" rel="noreferrer"
              onClick={() => track("open_map")}
            >Abrir no Google Maps ↗</a>
            <a
              className="button button--soft"
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
              target="_blank" rel="noreferrer"
              onClick={() => track("route_map")}
            >Traçar rota</a>
            <WaButton>Falar no WhatsApp</WaButton>
          </div>
        </div>
        <div className="map" data-reveal>
          {mapOpen ? (
            <iframe
              title="Mapa da Autoescola Mais que Vencedor em Queimados"
              loading="lazy"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            />
          ) : (
            <button type="button" onClick={() => { setMapOpen(true); track("load_map"); }}>
              <span>⌖</span>
              <b>Mais que Vencedor</b>
              <small>Carregar mapa interativo</small>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
