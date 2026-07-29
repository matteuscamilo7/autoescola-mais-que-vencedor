"use client";

import Brand from "./Brand";
import WaButton from "./WaButton";
import { navigationItems } from "../data/content";
import { useEffect } from "react";

export default function Navbar({
  menu,
  setMenu,
  scrolled,
  activeSection,
}: {
  menu: boolean;
  setMenu: (v: boolean) => void;
  scrolled: boolean;
  activeSection: string;
}) {
  useEffect(() => {
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menu, setMenu]);

  return (
    <>
      <header className={`header ${scrolled ? "header--solid" : ""}`}>
        <div className="container header__inner">
          <a className="header__brand" href="#inicio" aria-label="Mais que Vencedor — início" onClick={() => setMenu(false)}><Brand /></a>
          <nav id="primary-navigation" className={`nav ${menu ? "nav--open" : ""}`} aria-label="Menu principal">
            <div className="nav__mobile-head">
              <a href="#inicio" aria-label="Mais que Vencedor — início" onClick={() => setMenu(false)}><Brand /></a>
              <button className="nav__close" type="button" aria-label="Fechar menu" onClick={() => setMenu(false)}>×</button>
            </div>
            <div className="nav__links">
              {navigationItems.map(({ id, href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={activeSection === id ? "active" : ""}
                  aria-current={activeSection === id ? "location" : undefined}
                  onClick={() => setMenu(false)}
                ><span>{label}</span><b aria-hidden="true">→</b></a>
              ))}
            </div>
            <div className="nav__mobile-footer">
              <WaButton event="whatsapp_mobile_menu">Agendar pelo WhatsApp</WaButton>
              <small>Av. Olímpia Silva, 181 · Queimados – RJ</small>
            </div>
          </nav>
          <WaButton className="header__cta" event="whatsapp_header">Falar no WhatsApp</WaButton>
          <button
            className="menu"
            type="button"
            aria-controls="primary-navigation"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          ><i /><i /><i /></button>
        </div>
      </header>
      <div className={`menu-overlay ${menu ? "is-open" : ""}`} aria-hidden="true" onClick={() => setMenu(false)} />
    </>
  );
}
