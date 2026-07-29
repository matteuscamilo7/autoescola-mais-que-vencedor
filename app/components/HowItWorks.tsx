import { processSteps } from "../data/content";

function RouteCar() {
  return (
    <svg viewBox="0 0 76 42" aria-hidden="true">
      <path d="M14 28 19 17c1.4-3 4-5 7.4-5h20.2c3.2 0 5.7 1.7 7.4 4.6L60.8 28H65c3.3 0 6 2.7 6 6v2H5v-2c0-3.3 2.7-6 6-6h3Z" fill="#f9fcff" stroke="#0a1b34" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 27h41.5l-4.8-9.3c-.8-1.6-2.5-2.7-4.4-2.7H26.5c-2 0-3.8 1.2-4.5 3Z" fill="#a9dbff" stroke="#0a1b34" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 28h52v4H12z" fill="#ffd400" />
      <path d="M31 28h18v4H31z" fill="#111318" opacity=".9" />
      <path d="M9 31h5M62 31h5" stroke="#087bff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="19" cy="36" r="5" fill="#0a1b34" stroke="#fff" strokeWidth="2" />
      <circle cx="57" cy="36" r="5" fill="#0a1b34" stroke="#fff" strokeWidth="2" />
      <circle cx="19" cy="36" r="1.5" fill="#ffd400" />
      <circle cx="57" cy="36" r="1.5" fill="#ffd400" />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section className="section process" id="como-funciona" aria-labelledby="process-title">
      <div className="container">
        <header className="section-title centered" data-reveal>
          <span>Rota simples</span>
          <h2 id="process-title">Como funciona</h2>
          <p>Da escolha do plano ao início da sua preparação.</p>
        </header>
        <div className="steps">
          <span className="steps__vehicle" aria-hidden="true"><RouteCar /></span>
          {processSteps.map(([n, title, text]) => (
            <article key={title} data-reveal>
              <b>{n}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
