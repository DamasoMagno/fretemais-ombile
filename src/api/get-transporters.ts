import { api } from "../services/api";

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

export async function getTransporters(transporter?: string) {
  const response = await api.get("/transporter", {
    params: {
      transporterName: transporter,
    },
  });
  return response.data as Transporter[];
}
