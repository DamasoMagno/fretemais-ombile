import { CargoType, Status, VehicleType } from "../interfaces";
import { api } from "../services/api";

interface Vehicle {
  plateNumber?: string
  vehicleType?: string
  transporter_id?: number
}

interface UpdateVehicleProps {
  vehicleId: number, 
  data: Vehicle
}

export async function updateVehicle({ data, vehicleId }: UpdateVehicleProps) {
  await api.put(`/vehicle/${vehicleId}`, data);
}
