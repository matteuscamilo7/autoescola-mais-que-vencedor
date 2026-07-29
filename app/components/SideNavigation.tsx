"use client";

import { routeItems } from "../data/content";

export default function SideNavigation({
  progress,
  activeSection,
}: {
  progress: number;
  activeSection: string;
}) {
  return (
    <nav className="road-progress" aria-label="Progresso e atalhos da página">
      <span>Sua rota</span>
      <div className="road-progress__track">
        <i style={{ height: `${progress * 100}%` }} />
        <b aria-hidden="true" style={{ top: `calc(${progress * 100}% - 11px)` }}>🚗</b>
        {routeItems.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            className={activeSection === item.id ? "active" : ""}
            aria-label={`Ir para ${item.label}`}
            aria-current={activeSection === item.id ? "location" : undefined}
            style={{ top: `${(index / (routeItems.length - 1)) * 100}%` }}
          ><em /><small>{item.label}</small></a>
        ))}
      </div>
    </nav>
  );
}
