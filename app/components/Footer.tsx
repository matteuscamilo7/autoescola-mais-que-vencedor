"use client";

import Brand from "./Brand";
import { wa } from "./WaButton";
import { defaultMessage } from "../data/content";

export default function Footer({
  onLegal,
}: {
  onLegal: (v: "privacy" | "terms") => void;
}) {
  return (
    <footer>
      <div className="container footer__grid">
        <div>
          <Brand className="brand" />
          <p>Aulas de carro e moto para aperfeiçoamento, reforço e preparação prática em Queimados – RJ.</p>
        </div>
        <div>
          <h2>Links rápidos</h2>
          <a href="#planos">Planos</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#localizacao">Localização</a>
          <a href="#duvidas">Dúvidas</a>
        </div>
        <div>
          <h2>Contato</h2>
          <a href={wa(defaultMessage)} target="_blank" rel="noreferrer">(21) 97289-3743</a>
          <p>Av. Olímpia Silva, 181<br />Queimados – RJ</p>
        </div>
        <div>
          <h2>Informações</h2>
          <button onClick={() => onLegal("privacy")}>Política de Privacidade</button>
          <button onClick={() => onLegal("terms")}>Termos de Uso</button>
        </div>
      </div>
      <div className="container footer__notice">
        <p>Os valores, condições de pagamento e disponibilidade de horários estão sujeitos à confirmação diretamente com a Autoescola Mais que Vencedor.</p>
        <p>Os planos tradicionais não incluem DUDA e taxas de exames.</p>
      </div>
      <div className="container footer__bottom">
        © {new Date().getFullYear()} Autoescola Mais que Vencedor. Todos os direitos reservados.
      </div>
    </footer>
  );
}
