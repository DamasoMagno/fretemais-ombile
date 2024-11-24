import { CargoType, Status, VehicleType } from "../interfaces";
import { api } from "../services/api";

interface Transporter {
  name: string
  cnpj: string
}

export async function registerTransporter(data: Transporter) {
  await api.post(`/transporter`, data);
}
