import { CargoType, Status, VehicleType } from "../interfaces";
import { api } from "../services/api";

interface Vehicle {
  plateNumber: string
  vehicleType: string
  transporter_id: number
}

export async function registerVehicle(data: Vehicle) {
  await api.post(`/vehicle`, data);
}
