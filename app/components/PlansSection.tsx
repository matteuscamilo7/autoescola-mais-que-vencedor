"use client";

import { useMemo } from "react";
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
    <section className="section plans" id="planos" aria-labelledby="plans-title">
      <div className="container">
        <header className="section-title centered" data-reveal>
          <span>Planos transparentes</span>
          <h2 id="plans-title"><span>Escolha o plano ideal para você</span></h2>
          <p>Selecione a categoria e veja as opções de aulas disponíveis.</p>
        </header>

        <div className="tabs" role="tablist" aria-label="Categoria dos planos">
          <button
            type="button" role="tab" aria-controls="plan-results"
            aria-selected={category === "individual"}
            className={category === "individual" ? "active" : ""}
            onClick={() => changeCategory("individual")}
          >🚗 Carro ou Moto</button>
          <button
            type="button" role="tab" aria-controls="plan-results"
            aria-selected={category === "combo"}
            className={category === "combo" ? "active combo" : ""}
            onClick={() => changeCategory("combo")}
          >🚗 + 🏍 Carro + Moto</button>
        </div>

        {category === "individual" && (
          <div className="vehicle-toggle">
            <span>Quero aulas de:</span>
            <button
              type="button"
              className={vehicle === "carro" ? "active" : ""}
              aria-pressed={vehicle === "carro"}
              onClick={() => setVehicle("carro")}
            >Carro</button>
            <button
              type="button"
              className={vehicle === "moto" ? "active" : ""}
              aria-pressed={vehicle === "moto"}
              onClick={() => setVehicle("moto")}
            >Moto</button>
          </div>
        )}

        <p className="plan-note">
          {category === "individual"
            ? `Você escolheu ${vehicle}. Selecione a quantidade de aulas.`
            : "Cada plano inclui a quantidade indicada para carro e para moto."}
        </p>

        <div id="plan-results" role="tabpanel" className={`plan-grid ${category === "combo" ? "plan-grid--combo" : ""}`}>
          {plans.map((plan, idx) => {
            const active = selected.lessons === plan.lessons;
            const isPopular = plan.lessons === (category === "combo" ? 10 : 10);
            return (
              <article className={`plan-card ${active ? "selected" : ""}`} key={plan.lessons} data-reveal>
                {isPopular && !active && <span className="plan-card__badge">⭐ Mais popular</span>}
                {active && <span className="plan-card__badge" style={{background: "linear-gradient(135deg, #087bff, #2cb7ff)"}}>✓ Selecionado</span>}
                <div className="plan-card__icon">{category === "combo" ? "🚗🏍" : vehicle === "carro" ? "🚗" : "🏍"}</div>
                <div className="plan-card__top">
                  <h3>
                    <b>{plan.lessons}</b> aulas
                    {category === "combo" && <small> de cada categoria</small>}
                  </h3>
                  {active && <small>Selecionado</small>}
                </div>
                <div className="plan-card__price">
                  <small>Valor total</small>
                  <strong>{formatBRL(plan.price)}</strong>
                </div>
                <button
                  type="button"
                  className="button button--select"
                  aria-pressed={active}
                  onClick={() => choosePlan(plan)}
                >{active ? "Plano selecionado ✓" : "Selecionar este plano"}</button>
              </article>
            );
          })}
        </div>

        <div className="warning">
          <b>!</b>
          <p><strong>Importante:</strong> os valores acima não incluem DUDA e taxas de exames.</p>
        </div>

        <div className="summary" aria-live="polite">
          <div>
            <small>Seu plano</small>
            <strong>{category === "combo" ? "Carro + Moto" : vehicle === "carro" ? "Carro" : "Moto"} · {selected.lessons} aulas{category === "combo" ? " de cada" : ""}</strong>
          </div>
          <div>
            <small>Valor total</small>
            <strong>{formatBRL(selected.price)}</strong>
          </div>
          <WaButton message={selectedMessage} event="whatsapp_selected_plan" className="button--large">Quero este plano</WaButton>
        </div>
      </div>
    </section>
  );
}
