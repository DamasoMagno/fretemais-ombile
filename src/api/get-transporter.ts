import { api } from "../services/api";

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

export async function getTransporter(transporterId: number) {
  const response = await api.get(`/transporter/${transporterId}`)
  return response.data as Transporter
}
