import WaButton from "./WaButton";

export default function CompletePackage() {
  return (
    <section className="complete" aria-labelledby="complete-title">
      <div className="container complete__card" data-reveal>
        <div className="complete__badge">12x</div>
        <div>
          <span className="kicker kicker--light">Mais praticidade</span>
          <h2 id="complete-title">Quer mais praticidade? Conheça o Pacotão Completo</h2>
          <p className="complete__highlight">DUDA + exames inclusos</p>
          <ul>
            <li>Parcelamento em até 12x no cartão de crédito</li>
            <li>Consulte as condições diretamente com a equipe</li>
          </ul>
          <p className="complete__note">Valores, disponibilidade e condições devem ser confirmados diretamente com a autoescola.</p>
        </div>
        <WaButton
          event="whatsapp_complete_package"
          message="Olá! Vim pelo site da Autoescola Mais que Vencedor e gostaria de consultar as condições do Pacotão Completo com DUDA e exames inclusos."
          className="button--large"
        >Consultar Pacotão Completo</WaButton>
      </div>
    </section>
  );
}
