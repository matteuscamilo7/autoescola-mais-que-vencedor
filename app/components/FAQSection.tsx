import WaButton from "./WaButton";
import { faq } from "../data/content";

export default function FAQSection() {
  return (
    <section className="section faq" id="duvidas" aria-labelledby="faq-title">
      <div className="container faq__layout">
        <header className="section-title" data-reveal>
          <span>Dúvidas frequentes</span>
          <h2 id="faq-title">Informação clara antes de começar</h2>
          <p>Não encontrou sua dúvida? Fale diretamente com nossa equipe.</p>
          <WaButton>Falar com a equipe</WaButton>
        </header>
        <div>
          {faq.map(([question, answer]) => (
            <details key={question} data-reveal>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
