"use client";

import { useEffect } from "react";

export default function LegalModal({
  legal,
  setLegal,
}: {
  legal: "privacy" | "terms" | null;
  setLegal: (v: "privacy" | "terms" | null) => void;
}) {
  useEffect(() => {
    if (!legal) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLegal(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [legal, setLegal]);

  if (!legal) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={() => setLegal(null)}>
      <div onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal__close" onClick={() => setLegal(null)} aria-label="Fechar">×</button>
        <h2 id="legal-title">{legal === "privacy" ? "Política de Privacidade" : "Termos de Uso"}</h2>
        {legal === "privacy" ? (
          <p>Este site direciona o atendimento para o WhatsApp. Não coletamos dados por formulários nesta página. Ao iniciar o contato, o tratamento das informações fornecidas ocorre no canal escolhido por você.</p>
        ) : (
          <p>As informações desta página têm caráter informativo. Valores, condições de pagamento, disponibilidade de horários e detalhes dos serviços devem ser confirmados diretamente com a Autoescola Mais que Vencedor.</p>
        )}
      </div>
    </div>
  );
}
