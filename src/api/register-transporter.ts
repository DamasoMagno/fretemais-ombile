import { CargoType, Status, VehicleType } from "../interfaces";
import { api } from "../services/api";

interface Freight {
  status: Status;
  freightDate: Date;
  transporter_id: number;
  driver_id: number;
  vehicleType: VehicleType;
  cargoType: CargoType;
}

export async function registerFreight(data: Freight) {
  await api.post(`/freight`, data);
}
