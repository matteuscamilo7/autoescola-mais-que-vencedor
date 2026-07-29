export type Plan = { lessons: number; price: number };

export const individualPlans: Plan[] = [
  { lessons: 2, price: 379.99 },
  { lessons: 5, price: 499.99 },
  { lessons: 10, price: 719.99 },
  { lessons: 15, price: 849.99 },
  { lessons: 20, price: 999.99 },
];

export const comboPlans: Plan[] = [
  { lessons: 2, price: 749.99 },
  { lessons: 5, price: 949.99 },
  { lessons: 10, price: 1099.99 },
  { lessons: 15, price: 1299.99 },
  { lessons: 20, price: 1499.99 },
];

export const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
