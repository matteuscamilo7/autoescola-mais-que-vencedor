import Image from "next/image";
import WaButton from "./WaButton";

export default function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="container final-cta__layout" data-reveal>
        <div>
          <Image
            className="final-cta__logo"
            src="/images/brand-logo.webp"
            alt=""
            width={1200} height={427}
          />
          <span>Seu próximo passo começa aqui</span>
          <h2 id="final-cta-title">Dê o próximo passo com mais segurança.</h2>
          <p>Escolha seu plano e fale agora com a equipe da Mais que Vencedor para verificar os horários disponíveis.</p>
        </div>
        <div>
          <WaButton className="button--large" event="whatsapp_final">Agendar minhas aulas</WaButton>
          <small>(21) 97289-3743 · Queimados – RJ<br />Atendimento mediante agendamento.</small>
        </div>
      </div>
    </section>
  );
}
