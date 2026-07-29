import Image from "next/image";
import { aboutItems } from "../data/content";

export default function AboutSection() {
  return (
    <section className="section about" aria-labelledby="about-title">
      <div className="container about__layout">
        <div className="about__visual" data-reveal>
          <Image
            className="about__logo"
            src="/images/brand-logo.webp"
            alt="Auto Escola Mais que Vencedor"
            width={1200}
            height={427}
          />
          <small>Carro e moto · Queimados – RJ</small>
        </div>
        <div className="section-title" data-reveal>
          <span>Mais que Vencedor</span>
          <h2 id="about-title">Orientação profissional para você dirigir com mais segurança</h2>
          <p>A Autoescola Mais que Vencedor oferece aulas para carro, moto ou ambas as categorias, com atendimento voltado para aperfeiçoamento, reforço e preparação para o exame prático.</p>
          <ul>
            {aboutItems.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
