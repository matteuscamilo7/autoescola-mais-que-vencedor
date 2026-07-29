"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { comboPlans, formatBRL, individualPlans, type Plan } from "../data/plans";
const brandLogo = "/images/brand-logo.webp";
const heroVehicles = "/images/hero-vehicles-autoescola.webp";
const heroMicrobus = "/images/hero-microbus-clean.webp";
const checklistIcon = "/images/icons/checklist.webp";
const instructorIcon = "/images/icons/instructor.webp";
const locationIcon = "/images/icons/location.webp";
const paymentIcon = "/images/icons/payment.webp";
const steeringIcon = "/images/icons/steering.webp";
const vehiclesIcon = "/images/icons/vehicles.webp";
const aperfeicoamentoImage = "/images/services/aperfeicoamento.webp";
const exameImage = "/images/services/exame.webp";
const reforcoImage = "/images/services/reforco.webp";

type Category = "individual" | "combo";
type Vehicle = "carro" | "moto";

const whatsappBase = "https://wa.me/5521972893743";
const defaultMessage =
  "Olá! Vim pelo site da Autoescola Mais que Vencedor e gostaria de informações sobre as aulas de direção.";
const mapQuery = encodeURIComponent(
  "Av. Olímpia Silva, 181, Queimados - RJ, Brasil",
);

const benefits = [
  { image: instructorIcon, title: "Instrutores credenciados", text: "Profissionais credenciados pelo DETRAN-RJ." },
  { image: vehiclesIcon, title: "Planos flexíveis", text: "Escolha a quantidade de aulas adequada para você." },
  { image: paymentIcon, title: "Parcelamento facilitado", text: "Cartão, à vista ou carnê próprio." },
  { image: locationIcon, title: "Atendimento local", text: "Autoescola localizada em Queimados – RJ." },
];

const paymentItems = [
  { image: paymentIcon, text: "Pagamento à vista" },
  { image: paymentIcon, text: "Cartão" },
  { image: checklistIcon, text: "Carnê próprio" },
  { image: paymentIcon, text: "Entrada de R$ 100 no carnê" },
  { image: steeringIcon, text: "Parcelamento facilitado" },
  { image: checklistIcon, text: "Pacotão em até 12x no cartão" },
];

const audienceItems = [
  { number: "01", image: aperfeicoamentoImage, title: "Aperfeiçoamento", text: "Para quem já dirige e deseja desenvolver mais segurança e confiança." },
  { number: "02", image: reforcoImage, title: "Reforço", text: "Aulas direcionadas às dificuldades específicas de cada aluno." },
  { number: "03", image: exameImage, title: "Preparação para o exame", text: "Treinamento prático voltado para a preparação do exame de direção." },
];

const faq = [
  ["A autoescola oferece aulas de carro e moto?", "Sim. Há opções para carro, moto ou planos combinados de carro + moto."],
  ["As aulas servem para aperfeiçoamento?", "Sim. As aulas podem ser utilizadas para aperfeiçoamento, reforço e preparação para o exame prático."],
  ["Os valores incluem DUDA e exames?", "Os planos tradicionais não incluem DUDA e taxas de exames. A autoescola também possui um Pacotão Completo com DUDA e exames inclusos. Consulte as condições."],
  ["É possível parcelar?", "Sim. A autoescola aceita cartão e possui carnê próprio com entrada de R$ 100,00 e parcelamento facilitado. O Pacotão Completo pode ser parcelado em até 12x no cartão de crédito, conforme condições."],
  ["Como funciona o agendamento?", "O agendamento é realizado diretamente com a equipe, conforme disponibilidade de horários."],
  ["Onde fica a Mais que Vencedor?", "A autoescola fica na Av. Olímpia Silva, 181, próximo ao Queimados Futebol Clube, em Queimados – RJ."],
  ["Como posso contratar um plano?", "Escolha uma opção no site e clique no botão de WhatsApp para confirmar disponibilidade e condições com a equipe."],
];

const navigationItems = [
  { id: "planos", href: "#planos", label: "Planos" },
  { id: "beneficios", href: "#beneficios", label: "Benefícios" },
  { id: "como-funciona", href: "#como-funciona", label: "Como funciona" },
  { id: "localizacao", href: "#localizacao", label: "Localização" },
  { id: "duvidas", href: "#duvidas", label: "Dúvidas" },
] as const;

const routeItems = [
  { id: "inicio", href: "#inicio", label: "Início" },
  { id: "beneficios", href: "#beneficios", label: "Benefícios" },
  { id: "planos", href: "#planos", label: "Planos" },
  { id: "como-funciona", href: "#como-funciona", label: "Etapas" },
  { id: "localizacao", href: "#localizacao", label: "Localização" },
  { id: "duvidas", href: "#duvidas", label: "Dúvidas" },
] as const;

function wa(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event, ...data });
}

function Brand() {
  return (
    <span className="brand" aria-label="Autoescola Mais que Vencedor">
      <img
        src={brandLogo}
        alt="Auto Escola Mais que Vencedor"
        width={1200}
        height={427}
        decoding="async"
      />
    </span>
  );
}

function WaIcon() {
  return <span className="wa-icon" aria-hidden="true">◉</span>;
}

function WaButton({
  children,
  message = defaultMessage,
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
      href={wa(message)}
      target="_blank"
      rel="noreferrer"
      onClick={() => track(event)}
    >
      <WaIcon /> <span>{children}</span>
    </a>
  );
}

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState<Category>("individual");
  const [vehicle, setVehicle] = useState<Vehicle>("carro");
  const [selected, setSelected] = useState<Plan>(individualPlans[2]);
  const [mapOpen, setMapOpen] = useState(false);
  const [help, setHelp] = useState(false);
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const [activeSection, setActiveSection] = useState("inicio");
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

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 20);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        const marker = window.scrollY + window.innerHeight * .38;
        const current = routeItems.reduce((active, item) => {
          const section = document.getElementById(item.id);
          return section && section.offsetTop <= marker ? item.id : active;
        }, "inicio");
        setActiveSection(current);
      });
    };
    const timer = window.setTimeout(() => setHelp(true), 5000);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
    };
  }, []);

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
  }, [menu]);

  useEffect(() => {
    if (!legal) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLegal(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [legal]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!revealItems.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: .16, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [category, vehicle]);

  const plans = category === "individual" ? individualPlans : comboPlans;
  const selectedMessage = useMemo(() => {
    if (category === "combo") {
      return `Olá! Vim pelo site da Autoescola Mais que Vencedor e gostaria de informações sobre o plano de carro + moto com ${selected.lessons} aulas de cada, no valor de ${formatBRL(selected.price)}.`;
    }
    return `Olá! Vim pelo site da Autoescola Mais que Vencedor e gostaria de informações sobre o plano de ${vehicle} com ${selected.lessons} aulas, no valor de ${formatBRL(selected.price)}.`;
  }, [category, selected, vehicle]);

  const changeCategory = (next: Category) => {
    setCategory(next);
    setSelected(next === "individual" ? individualPlans[2] : comboPlans[2]);
    track("select_category", { category: next });
  };

  const choosePlan = (plan: Plan) => {
    setSelected(plan);
    track("select_plan", { category, vehicle, lessons: plan.lessons, value: plan.price });
  };

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

      <main>
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
              <img
                className="hero__microbus"
                src={heroMicrobus}
                alt="Micro-ônibus branco de autoescola"
                width={1316}
                height={743}
                fetchPriority="high"
                decoding="async"
              />
              <span className="route route--top" aria-hidden="true"><b>⌖</b><small>Seu destino<strong>Mais confiança</strong></small><i /></span>
              <img
                className="hero__vehicles"
                src={heroVehicles}
                alt="Carro branco de autoescola e moto preta para aulas práticas"
                width={1774}
                height={887}
                fetchPriority="high"
                decoding="async"
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

        <div className="traffic-strip" aria-hidden="true">
          <div className="traffic-strip__road">
            <span className="traffic-strip__vehicle traffic-strip__vehicle--car"><i>🚗</i></span>
            <span className="traffic-strip__vehicle traffic-strip__vehicle--moto"><i>🏍️</i></span>
            <span className="traffic-strip__vehicle traffic-strip__vehicle--bus"><i>🚌</i></span>
          </div>
        </div>

        <section className="trust" id="beneficios" aria-labelledby="benefits-title">
          <div className="trust__glow" aria-hidden="true" />
          <div className="container trust__inner">
            <header className="trust__header" data-reveal>
              <div>
                <span className="trust__kicker"><i aria-hidden="true" /> Escolha com confiança</span>
                <h2 id="benefits-title">Por que escolher a <mark>Mais que Vencedor?</mark></h2>
                <p>Estrutura, flexibilidade e orientação profissional para você avançar com mais tranquilidade.</p>
              </div>
              <div className="trust__counter" aria-label="Quatro benefícios para você começar">
                <strong>4</strong>
                <span>benefícios<br />para começar</span>
              </div>
            </header>

            <div className="trust__grid" role="list">
              {benefits.map(({ image, title, text }, index) => (
                <article className="benefit-card" key={title} role="listitem" data-reveal>
                  <span className="benefit-card__number" aria-hidden="true">0{index + 1}</span>
                  <div className="benefit-card__visual" aria-hidden="true">
                    <i />
                    <img src={image} alt="" width={180} height={180} loading="lazy" decoding="async" />
                  </div>
                  <div className="benefit-card__content">
                    <span className="benefit-card__check" aria-hidden="true">✓</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section plans" id="planos" aria-labelledby="plans-title">
          <div className="container">
            <header className="section-title centered" data-reveal><span>Planos transparentes</span><h2 id="plans-title">Escolha o plano ideal para você</h2><p>Selecione a categoria e veja as opções de aulas disponíveis.</p></header>
            <div className="tabs" role="tablist" aria-label="Categoria dos planos">
              <button type="button" role="tab" aria-controls="plan-results" aria-selected={category === "individual"} className={category === "individual" ? "active" : ""} onClick={() => changeCategory("individual")}>🚗 Carro ou Moto</button>
              <button type="button" role="tab" aria-controls="plan-results" aria-selected={category === "combo"} className={category === "combo" ? "active combo" : ""} onClick={() => changeCategory("combo")}>🚗 + 🏍 Carro + Moto</button>
            </div>
            {category === "individual" && (
              <div className="vehicle-toggle">
                <span>Quero aulas de:</span>
                <button type="button" className={vehicle === "carro" ? "active" : ""} aria-pressed={vehicle === "carro"} onClick={() => setVehicle("carro")}>Carro</button>
                <button type="button" className={vehicle === "moto" ? "active" : ""} aria-pressed={vehicle === "moto"} onClick={() => setVehicle("moto")}>Moto</button>
              </div>
            )}
            <p className="plan-note">{category === "individual" ? `Você escolheu ${vehicle}. Selecione a quantidade de aulas.` : "Cada plano inclui a quantidade indicada para carro e para moto."}</p>
            <div id="plan-results" role="tabpanel" className={`plan-grid ${category === "combo" ? "plan-grid--combo" : ""}`}>
              {plans.map((plan) => {
                const active = selected.lessons === plan.lessons;
                return (
                  <article className={`plan-card ${active ? "selected" : ""}`} key={plan.lessons} data-reveal>
                    <div className="plan-card__top"><span>{category === "combo" ? "🚗 + 🏍" : vehicle === "carro" ? "🚗" : "🏍"}</span>{active && <small>Selecionado</small>}</div>
                    <h3><b>{plan.lessons}</b> aulas{category === "combo" && <small> de cada categoria</small>}</h3>
                    <p>Valor total<strong>{formatBRL(plan.price)}</strong></p>
                    <button type="button" className="button button--select" aria-pressed={active} onClick={() => choosePlan(plan)}>{active ? "Plano selecionado ✓" : "Selecionar este plano"}</button>
                  </article>
                );
              })}
            </div>
            <div className="warning"><b>!</b><p><strong>Importante:</strong> os valores acima não incluem DUDA e taxas de exames.</p></div>
            <div className="summary" aria-live="polite">
              <div><small>Seu plano</small><strong>{category === "combo" ? "Carro + Moto" : vehicle === "carro" ? "Carro" : "Moto"} · {selected.lessons} aulas{category === "combo" ? " de cada" : ""}</strong></div>
              <div><small>Valor total</small><strong>{formatBRL(selected.price)}</strong></div>
              <WaButton message={selectedMessage} event="whatsapp_selected_plan" className="button--large">Quero este plano</WaButton>
            </div>
          </div>
        </section>

        <section className="complete" aria-labelledby="complete-title">
          <div className="container complete__card" data-reveal>
            <div className="complete__badge">12x</div>
            <div>
              <span className="kicker kicker--light">Mais praticidade</span>
              <h2 id="complete-title">Quer mais praticidade? Conheça o Pacotão Completo</h2>
              <p className="complete__highlight">DUDA + exames inclusos</p>
              <ul><li>Parcelamento em até 12x no cartão de crédito</li><li>Consulte as condições diretamente com a equipe</li></ul>
              <p className="complete__note">Valores, disponibilidade e condições devem ser confirmados diretamente com a autoescola.</p>
            </div>
            <WaButton
              event="whatsapp_complete_package"
              message="Olá! Vim pelo site da Autoescola Mais que Vencedor e gostaria de consultar as condições do Pacotão Completo com DUDA e exames inclusos."
              className="button--large"
            >Consultar Pacotão Completo</WaButton>
          </div>
        </section>

        <section className="section payments" aria-labelledby="payments-title">
          <div className="container">
            <header className="section-title centered" data-reveal><span>Facilidade para começar</span><h2 id="payments-title">Escolha a forma de pagamento que melhor combina com você</h2><p>Consulte as condições de parcelamento.</p></header>
            <div className="payment-grid">
              {paymentItems.map(({ image, text }) => (
                <article key={text} data-reveal>
                  <b><img src={image} alt="" width={180} height={180} loading="lazy" decoding="async" /></b>
                  <span>{text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section audience" aria-labelledby="audience-title">
          <div className="container">
            <header className="section-title" data-reveal><span>Aulas no seu ritmo</span><h2 id="audience-title">Para quem são as aulas?</h2><p>Orientação prática de acordo com seu objetivo e suas dificuldades.</p></header>
            <div className="feature-grid">
              {audienceItems.map(({ number, image, title, text }) => (
                <article key={title} data-reveal>
                  <b>{number}</b>
                  <img src={image} alt="" width={420} height={420} loading="lazy" decoding="async" />
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process" id="como-funciona" aria-labelledby="process-title">
          <div className="container">
            <header className="section-title centered" data-reveal><span>Rota simples</span><h2 id="process-title">Como funciona</h2><p>Da escolha do plano ao início da sua preparação.</p></header>
            <div className="steps">
              <span className="steps__vehicle" aria-hidden="true">🚗</span>
              {[
                ["1", "Escolha seu plano", "Selecione carro, moto ou ambas as categorias."],
                ["2", "Fale com a equipe", "Entre em contato pelo WhatsApp para verificar disponibilidade."],
                ["3", "Agende suas aulas", "Os horários são definidos conforme disponibilidade."],
                ["4", "Comece sua preparação", "Faça suas aulas de aperfeiçoamento, reforço ou preparação prática."],
              ].map(([n, title, text]) => <article key={title} data-reveal><b>{n}</b><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section about" aria-labelledby="about-title">
          <div className="container about__layout">
            <div className="about__visual" data-reveal>
              <img className="about__logo" src={brandLogo} alt="Auto Escola Mais que Vencedor" width={1200} height={427} loading="lazy" decoding="async" />
              <small>Carro e moto · Queimados – RJ</small>
            </div>
            <div className="section-title" data-reveal><span>Mais que Vencedor</span><h2 id="about-title">Orientação profissional para você dirigir com mais segurança</h2><p>A Autoescola Mais que Vencedor oferece aulas para carro, moto ou ambas as categorias, com atendimento voltado para aperfeiçoamento, reforço e preparação para o exame prático.</p>
              <ul>{["Instrutores credenciados pelo DETRAN-RJ.", "Agendamento conforme disponibilidade.", "Atendimento em Queimados – RJ.", "Diferentes opções de planos.", "Formas de pagamento facilitadas."].map((item) => <li key={item}>✓ {item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="section location" id="localizacao" aria-labelledby="location-title">
          <div className="container location__layout">
            <div data-reveal>
              <header className="section-title"><span>Atendimento local</span><h2 id="location-title">Estamos em Queimados – RJ</h2><p>Próximo ao Queimados Futebol Clube.</p></header>
              <address><b>⌖</b><span>Av. Olímpia Silva, 181<small>Queimados – RJ</small></span></address>
              <div className="location__actions">
                <a className="button button--blue" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" onClick={() => track("open_map")}>Abrir no Google Maps ↗</a>
                <a className="button button--soft" href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} target="_blank" rel="noreferrer" onClick={() => track("route_map")}>Traçar rota</a>
                <WaButton>Falar no WhatsApp</WaButton>
              </div>
            </div>
            <div className="map" data-reveal>
              {mapOpen ? (
                <iframe title="Mapa da Autoescola Mais que Vencedor em Queimados" loading="lazy" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} />
              ) : (
                <button type="button" onClick={() => { setMapOpen(true); track("load_map"); }}><span>⌖</span><b>Mais que Vencedor</b><small>Carregar mapa interativo</small></button>
              )}
            </div>
          </div>
        </section>

        <section className="section faq" id="duvidas" aria-labelledby="faq-title">
          <div className="container faq__layout">
            <header className="section-title" data-reveal><span>Dúvidas frequentes</span><h2 id="faq-title">Informação clara antes de começar</h2><p>Não encontrou sua dúvida? Fale diretamente com nossa equipe.</p><WaButton>Falar com a equipe</WaButton></header>
            <div>{faq.map(([question, answer]) => <details key={question} data-reveal><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-cta-title">
          <div className="container final-cta__layout" data-reveal>
            <div><img className="final-cta__logo" src={brandLogo} alt="" width={1200} height={427} loading="lazy" decoding="async" /><span>Seu próximo passo começa aqui</span><h2 id="final-cta-title">Dê o próximo passo com mais segurança.</h2><p>Escolha seu plano e fale agora com a equipe da Mais que Vencedor para verificar os horários disponíveis.</p></div>
            <div><WaButton className="button--large" event="whatsapp_final">Agendar minhas aulas</WaButton><small>(21) 97289-3743 · Queimados – RJ<br />Atendimento mediante agendamento.</small></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer__grid">
          <div><Brand /><p>Aulas de carro e moto para aperfeiçoamento, reforço e preparação prática em Queimados – RJ.</p></div>
          <div><h2>Links rápidos</h2><a href="#planos">Planos</a><a href="#como-funciona">Como funciona</a><a href="#localizacao">Localização</a><a href="#duvidas">Dúvidas</a></div>
          <div><h2>Contato</h2><a href={wa(defaultMessage)} target="_blank" rel="noreferrer">(21) 97289-3743</a><p>Av. Olímpia Silva, 181<br />Queimados – RJ</p></div>
          <div><h2>Informações</h2><button onClick={() => setLegal("privacy")}>Política de Privacidade</button><button onClick={() => setLegal("terms")}>Termos de Uso</button></div>
        </div>
        <div className="container footer__notice"><p>Os valores, condições de pagamento e disponibilidade de horários estão sujeitos à confirmação diretamente com a Autoescola Mais que Vencedor.</p><p>Os planos tradicionais não incluem DUDA e taxas de exames.</p></div>
        <div className="container footer__bottom">© {new Date().getFullYear()} Autoescola Mais que Vencedor. Todos os direitos reservados.</div>
      </footer>

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
      <div className={`help-bubble ${help ? "show" : ""}`}>Precisa de ajuda para escolher um plano?</div>
      <WaButton className="float-wa" event="whatsapp_floating"><span className="sr-only">Falar no WhatsApp</span></WaButton>
      <div className="mobile-bar"><a href="#planos" onClick={() => track("mobile_view_plans")}>Ver planos</a><a href={wa(defaultMessage)} target="_blank" rel="noreferrer" onClick={() => track("mobile_whatsapp")}><WaIcon /> WhatsApp</a></div>

      {legal && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={() => setLegal(null)}>
          <div onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal__close" onClick={() => setLegal(null)} aria-label="Fechar">×</button>
            <h2 id="legal-title">{legal === "privacy" ? "Política de Privacidade" : "Termos de Uso"}</h2>
            {legal === "privacy" ? (
              <p>Este site direciona o atendimento para o WhatsApp. Não coletamos dados por formulários nesta página. Ao iniciar o contato, o tratamento das informações fornecidas ocorre no canal escolhido por você.</p>
            ) : (
              <p>As informações desta página têm caráter informativo. Valores, condições de pagamento, disponibilidade de horários e detalhes dos serviços devem ser confirmados diretamente com a Autoescola Mais que Vencedor.</p>
            )}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DrivingSchool",
            name: "Autoescola Mais que Vencedor",
            telephone: "+55 21 97289-3743",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Av. Olímpia Silva, 181",
              addressLocality: "Queimados",
              addressRegion: "RJ",
              addressCountry: "BR",
            },
            areaServed: "Queimados, RJ",
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
