export const whatsappNumber = "5521972893743";
export const whatsappBase = `https://wa.me/${whatsappNumber}`;

export const defaultMessage =
  "Olá! Vim pelo site da Autoescola Mais que Vencedor e gostaria de informações sobre as aulas de direção.";

export const mapQuery = encodeURIComponent(
  "Av. Olímpia Silva, 181, Queimados - RJ, Brasil",
);

export const brandLogo = "/images/brand-logo.webp";
export const heroVehicles = "/images/hero-vehicles-autoescola.webp";
export const heroMicrobus = "/images/hero-microbus-clean.webp";
export const checklistIcon = "/images/icons/checklist.webp";
export const instructorIcon = "/images/icons/instructor.webp";
export const locationIcon = "/images/icons/location.webp";
export const paymentIcon = "/images/icons/payment.webp";
export const steeringIcon = "/images/icons/steering.webp";
export const vehiclesIcon = "/images/icons/vehicles.webp";
export const aperfeicoamentoImage = "/images/services/aperfeicoamento.webp";
export const exameImage = "/images/services/exame.webp";
export const reforcoImage = "/images/services/reforco.webp";

export const navigationItems = [
  { id: "planos", href: "#planos", label: "Planos" },
  { id: "beneficios", href: "#beneficios", label: "Benefícios" },
  { id: "como-funciona", href: "#como-funciona", label: "Como funciona" },
  { id: "localizacao", href: "#localizacao", label: "Localização" },
  { id: "duvidas", href: "#duvidas", label: "Dúvidas" },
] as const;

export const routeItems = [
  { id: "inicio", href: "#inicio", label: "Início" },
  { id: "beneficios", href: "#beneficios", label: "Benefícios" },
  { id: "planos", href: "#planos", label: "Planos" },
  { id: "como-funciona", href: "#como-funciona", label: "Etapas" },
  { id: "localizacao", href: "#localizacao", label: "Localização" },
  { id: "duvidas", href: "#duvidas", label: "Dúvidas" },
] as const;

export const benefits = [
  { image: instructorIcon, title: "Instrutores credenciados", text: "Profissionais credenciados pelo DETRAN-RJ." },
  { image: vehiclesIcon, title: "Planos flexíveis", text: "Escolha a quantidade de aulas adequada para você." },
  { image: paymentIcon, title: "Parcelamento facilitado", text: "Cartão, à vista ou carnê próprio." },
  { image: locationIcon, title: "Atendimento local", text: "Autoescola localizada em Queimados – RJ." },
];

export const paymentItems = [
  { image: paymentIcon, text: "Pagamento à vista" },
  { image: paymentIcon, text: "Cartão" },
  { image: checklistIcon, text: "Carnê próprio" },
  { image: paymentIcon, text: "Entrada de R$ 100 no carnê" },
  { image: steeringIcon, text: "Parcelamento facilitado" },
  { image: checklistIcon, text: "Pacotão em até 12x no cartão" },
];

export const audienceItems = [
  { number: "01", image: aperfeicoamentoImage, title: "Aperfeiçoamento", text: "Para quem já dirige e deseja desenvolver mais segurança e confiança." },
  { number: "02", image: reforcoImage, title: "Reforço", text: "Aulas direcionadas às dificuldades específicas de cada aluno." },
  { number: "03", image: exameImage, title: "Preparação para o exame", text: "Treinamento prático voltado para a preparação do exame de direção." },
];

export const faq = [
  ["A autoescola oferece aulas de carro e moto?", "Sim. Há opções para carro, moto ou planos combinados de carro + moto."],
  ["As aulas servem para aperfeiçoamento?", "Sim. As aulas podem ser utilizadas para aperfeiçoamento, reforço e preparação para o exame prático."],
  ["Os valores incluem DUDA e exames?", "Os planos tradicionais não incluem DUDA e taxas de exames. A autoescola também possui um Pacotão Completo com DUDA e exames inclusos. Consulte as condições."],
  ["É possível parcelar?", "Sim. A autoescola aceita cartão e possui carnê próprio com entrada de R$ 100,00 e parcelamento facilitado. O Pacotão Completo pode ser parcelado em até 12x no cartão de crédito, conforme condições."],
  ["Como funciona o agendamento?", "O agendamento é realizado diretamente com a equipe, conforme disponibilidade de horários."],
  ["Onde fica a Mais que Vencedor?", "A autoescola fica na Av. Olímpia Silva, 181, próximo ao Queimados Futebol Clube, em Queimados – RJ."],
  ["Como posso contratar um plano?", "Escolha uma opção no site e clique no botão de WhatsApp para confirmar disponibilidade e condições com a equipe."],
];

export const processSteps = [
  ["1", "Escolha seu plano", "Selecione carro, moto ou ambas as categorias."],
  ["2", "Fale com a equipe", "Entre em contato pelo WhatsApp para verificar disponibilidade."],
  ["3", "Agende suas aulas", "Os horários são definidos conforme disponibilidade."],
  ["4", "Comece sua preparação", "Faça suas aulas de aperfeiçoamento, reforço ou preparação prática."],
];

export const aboutItems = [
  "Instrutores credenciados pelo DETRAN-RJ.",
  "Agendamento conforme disponibilidade.",
  "Atendimento em Queimados – RJ.",
  "Diferentes opções de planos.",
  "Formas de pagamento facilitadas.",
];
