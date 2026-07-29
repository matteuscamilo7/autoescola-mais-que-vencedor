import Image from "next/image";
import { paymentItems } from "../data/content";

export default function PaymentsSection() {
  return (
    <section className="section payments" aria-labelledby="payments-title">
      <div className="container">
        <header className="section-title centered" data-reveal>
          <span>Facilidade para começar</span>
          <h2 id="payments-title">Escolha a forma de pagamento que melhor combina com você</h2>
          <p>Consulte as condições de parcelamento.</p>
        </header>
        <div className="payment-grid">
          {paymentItems.map(({ image, text }) => (
            <article key={text} data-reveal>
                  <b><Image src={image} alt="" width={180} height={180} /></b>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
