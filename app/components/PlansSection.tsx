"use client";

import { useMemo, useRef } from "react";
import WaButton from "./WaButton";
import { individualPlans, comboPlans, formatBRL, type Plan } from "../data/plans";

type Category = "individual" | "combo";
type Vehicle = "carro" | "moto";

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event, ...data });
}

const vehicleIcons = { carro: "🚗", moto: "🏍" } as const;

export default function PlansSection({
  category,
  setCategory,
  vehicle,
  setVehicle,
  selected,
  setSelected,
}: {
  category: Category;
  setCategory: (v: Category) => void;
  vehicle: Vehicle;
  setVehicle: (v: Vehicle) => void;
  selected: Plan;
  setSelected: (v: Plan) => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
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
    <section className="plans" id="planos" aria-labelledby="plans-title">
      <div className="plans__bg" aria-hidden="true" />
      <div className="plans__bar" aria-hidden="true" />
      <div className="container">
        <header className="plans__header" data-reveal>
          <span className="plans__kicker">Planos transparentes</span>
          <h2 id="plans-title">Escolha o plano ideal para você</h2>
          <p>Selecione a categoria e veja as opções de aulas disponíveis.</p>
        </header>

        <div className="plans__controls">
          <div className="plans__tabs" role="tablist" aria-label="Categoria dos planos">
            <button
              type="button" role="tab" aria-controls="plan-results"
              aria-selected={category === "individual"}
              className={`plans__tab${category === "individual" ? " plans__tab--active" : ""}`}
              onClick={() => changeCategory("individual")}
            >
              <span className="plans__tab-icon">🚗</span>
              <span className="plans__tab-label">Carro ou Moto</span>
            </button>
            <button
              type="button" role="tab" aria-controls="plan-results"
              aria-selected={category === "combo"}
              className={`plans__tab plans__tab--combo${category === "combo" ? " plans__tab--active" : ""}`}
              onClick={() => changeCategory("combo")}
            >
              <span className="plans__tab-icon plans__tab-icon--combo">🚗🏍</span>
              <span className="plans__tab-label">Carro + Moto</span>
            </button>
            <span className="plans__tab-slider" aria-hidden="true" style={{
              translate: category === "individual" ? "0 0" : "100% 0",
            }} />
          </div>

          {category === "individual" && (
            <div className="plans__toggle">
              <span className="plans__toggle-label">Quero aulas de:</span>
              <div className="plans__toggle-group">
                <button
                  type="button"
                  className={`plans__toggle-btn${vehicle === "carro" ? " plans__toggle-btn--active" : ""}`}
                  aria-pressed={vehicle === "carro"}
                  onClick={() => setVehicle("carro")}
                >
                  <span className="plans__toggle-icon">🚗</span>
                  Carro
                </button>
                <button
                  type="button"
                  className={`plans__toggle-btn${vehicle === "moto" ? " plans__toggle-btn--active" : ""}`}
                  aria-pressed={vehicle === "moto"}
                  onClick={() => setVehicle("moto")}
                >
                  <span className="plans__toggle-icon">🏍</span>
                  Moto
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="plans__note">
          {category === "individual"
            ? `Você escolheu ${vehicle}. Selecione a quantidade de aulas.`
            : "Cada plano inclui a quantidade indicada para carro e para moto."}
        </p>

        <div id="plan-results" ref={gridRef} role="tabpanel" className={`plans__grid${category === "combo" ? " plans__grid--combo" : ""}`}>
          {plans.map((plan) => {
            const active = selected.lessons === plan.lessons;
            const isPopular = plan.lessons === 10;
            return (
              <article
                className={`plans__card${active ? " plans__card--selected" : ""}`}
                key={plan.lessons}
                data-reveal
              >
                {isPopular && !active && <span className="plans__card-badge">⭐ Mais popular</span>}
                {active && <span className="plans__card-badge plans__card-badge--selected">✓ Selecionado</span>}

                <div className="plans__card-head">
                  <span className="plans__card-icon">
                    {category === "combo" ? "🚗🏍" : vehicleIcons[vehicle]}
                  </span>
                  <div className="plans__card-meta">
                    <strong className="plans__card-lessons">
                      <span className="plans__card-number">{plan.lessons}</span> aulas
                    </strong>
                    {category === "combo" && <span className="plans__card-sub">de cada categoria</span>}
                  </div>
                </div>

                <div className="plans__card-body">
                  <div className="plans__card-price">
                    <span className="plans__card-price-label">Valor total</span>
                    <strong className="plans__card-price-value">{formatBRL(plan.price)}</strong>
                  </div>
                  <button
                    type="button"
                    className="plans__card-btn"
                    aria-pressed={active}
                    onClick={() => choosePlan(plan)}
                  >
                    <span>{active ? "Plano selecionado" : "Selecionar"}</span>
                    <span className="plans__card-btn-arrow" aria-hidden="true">
                      {active ? "✓" : "→"}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="plans__warning">
          <span className="plans__warning-icon">!</span>
          <p><strong>Importante:</strong> os valores acima não incluem DUDA e taxas de exames.</p>
        </div>

        <div className="plans__summary" aria-live="polite">
          <div className="plans__summary-glow" aria-hidden="true" />
          <div className="plans__summary-body">
            <div className="plans__summary-info">
              <span className="plans__summary-label">Seu plano</span>
              <strong className="plans__summary-value">
                {category === "combo" ? "Carro + Moto" : vehicle === "carro" ? "Carro" : "Moto"}
                <span className="plans__summary-dot">·</span>
                {selected.lessons} aulas{category === "combo" ? " de cada" : ""}
              </strong>
            </div>
            <div className="plans__summary-info">
              <span className="plans__summary-label">Valor total</span>
              <strong className="plans__summary-value plans__summary-value--price">{formatBRL(selected.price)}</strong>
            </div>
            <WaButton message={selectedMessage} event="whatsapp_selected_plan" className="plans__summary-btn">
              Quero este plano
            </WaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
