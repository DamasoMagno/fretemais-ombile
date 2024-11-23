export function formatCNPJ(cnpj: string) {
  const sanitizedCNPJ = cnpj.replace(/\D/g, "");
  const paddedCNPJ = sanitizedCNPJ.padStart(14, "0");

  return paddedCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
