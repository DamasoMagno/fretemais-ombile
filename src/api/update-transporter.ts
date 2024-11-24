import { CargoType, Status, VehicleType } from "../interfaces";
import { api } from "../services/api";

interface Transporter {
  name?: string
  cnpj?: string
}

export async function updateTransporter({ transporterId, data }: { transporterId: number, data: Transporter }) {
  await api.put(`/transporter/${transporterId}`, data);
}
