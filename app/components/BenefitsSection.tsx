import Image from "next/image";
import { benefits } from "../data/content";

export default function BenefitsSection() {
  return (
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
                    <Image src={image} alt="" width={180} height={180} />
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
  );
}
