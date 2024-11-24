import { CargoType, Status, VehicleType } from "../interfaces";
import { api } from "../services/api";

interface Freight {
  status?: Status;
  freightDate?: Date;
  transporter_id?: number;
  driver_id?: number;
  vehicleType?: VehicleType;
  cargoType?: CargoType;
}

interface UpdateFreightProps {
  freightId: number
  data: Freight
}

export async function updateFreight({ data, freightId }: UpdateFreightProps) {
  await api.put(`/freight/${freightId}`, data)
}
