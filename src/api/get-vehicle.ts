import { api } from "../services/api";

interface Transporter {
  id: number
  name: string
  cnpj: string
}

interface Vehicle {
  id: number
  plateNumber: string
  vehicleType: string
  transporter: Transporter
}

export async function getVehicle(vehicleId: number) {
  const response = await api.get(`/vehicle/${vehicleId}`)
      return response.data as Vehicle
}
