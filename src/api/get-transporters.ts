import { api } from "../services/api";

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

export async function getTransporters() {
  const response = await api.get("/transporter");
  return response.data as Transporter[];
}
