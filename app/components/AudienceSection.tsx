import Image from "next/image";
import { audienceItems } from "../data/content";

export default function AudienceSection() {
  return (
    <section className="section audience" aria-labelledby="audience-title">
      <div className="container">
        <header className="section-title" data-reveal>
          <span>Aulas no seu ritmo</span>
          <h2 id="audience-title">Para quem são as aulas?</h2>
          <p>Orientação prática de acordo com seu objetivo e suas dificuldades.</p>
        </header>
        <div className="feature-grid">
          {audienceItems.map(({ number, image, title, text }) => (
            <article key={title} data-reveal>
              <b>{number}</b>
              <Image src={image} alt="" width={420} height={420} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
