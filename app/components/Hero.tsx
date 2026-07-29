"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";
import WaButton from "./WaButton";
import { heroVehicles, heroMicrobus } from "../data/content";

function track(event: string) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event });
}

export default function Hero() {
  const heroVisualRef = useRef<HTMLDivElement>(null);

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 16}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 12}px`);
  };

  const resetHeroPointer = () => {
    heroVisualRef.current?.style.setProperty("--pointer-x", "0px");
    heroVisualRef.current?.style.setProperty("--pointer-y", "0px");
  };

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__ambient" aria-hidden="true">
        <i className="hero__ambient-blue" />
        <i className="hero__ambient-yellow" />
        <i className="hero__ambient-beam" />
      </div>
      <div className="container hero__layout">
        <div className="hero__copy">
          <span className="eyebrow"><i /> Instrutores credenciados pelo DETRAN-RJ</span>
          <h1 id="hero-title">
            <span className="hero__headline-highlight">Prepare-se</span>
            <span className="hero__headline-line">para <i>dirigir</i> com</span>
            <span className="hero__headline-finish">
              <em>segurança e confiança.</em>
              <b className="hero__check-3d" aria-hidden="true">✓</b>
            </span>
          </h1>
          <p className="hero__lead">
            <span>Aulas práticas de carro, moto ou ambas as categorias,</span>
            <span>com atendimento em Queimados – RJ.</span>
          </p>
          <p className="hero__detail">
            <span>Escolha seu plano e conte com orientação profissional para aperfeiçoamento,</span>
            <span>reforço ou preparação para o exame prático.</span>
          </p>
          <div className="hero__actions">
            <WaButton className="button--large hero__primary" event="whatsapp_hero">Agendar pelo WhatsApp</WaButton>
            <a className="button button--ghost button--large hero__secondary" href="#planos" onClick={() => track("view_plans")}>Ver planos e valores <span aria-hidden="true">↓</span></a>
          </div>
          <ul className="hero__facts">
            <li><b>✓</b> Carro e moto</li>
            <li><b>✓</b> Parcelamento facilitado</li>
            <li><b>✓</b> Queimados – RJ</li>
          </ul>
        </div>
        <div className="hero__visual" ref={heroVisualRef} onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroPointer}>
          <div className="hero__stage" aria-hidden="true">
            <div className="hero__road-orbit"><i /><i /><i /></div>
            <div className="vehicle-glow" />
            <div className="hero__stage-shadow" />
          </div>
              <Image
            className="hero__microbus"
            src={heroMicrobus}
            alt="Micro-ônibus branco de autoescola"
            width={1316}
            height={743}
            priority
          />
          <span className="route route--top" aria-hidden="true"><b>⌖</b><small>Seu destino<strong>Mais confiança</strong></small><i /></span>
              <Image
            className="hero__vehicles"
            src={heroVehicles}
            alt="Carro branco de autoescola e moto preta para aulas práticas"
            width={1774}
            height={887}
            priority
          />
          <span className="route route--side" aria-hidden="true"><b>↗</b><small>Aulas práticas<strong>Carro + Moto</strong></small><i /></span>
          <span className="route route--bottom" aria-hidden="true"><b>✓</b><small>Pronto para começar?<strong>Escolha seu plano</strong></small><i /></span>
        </div>
      </div>
      <div className="container hero__quote">
        <span className="hero__quote-icon" aria-hidden="true"><b>“</b></span>
        <p>Ensinar, proteger e guiar para a vida. Esse é o seu maior superpoder!</p>
        <a href="#beneficios">Conheça os benefícios <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
