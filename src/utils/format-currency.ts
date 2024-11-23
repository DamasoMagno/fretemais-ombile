export function formatCurrency(currency: number) {
  const currencyFormatted = new Intl.NumberFormat("pt-Br", {
    style: "currency",
    currency: "BRL",
  }).format(currency);

  return currencyFormatted;
}
