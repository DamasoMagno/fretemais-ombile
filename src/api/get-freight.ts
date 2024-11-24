import { CargoType, Status, VehicleType } from "../interfaces";
import { api } from "../services/api";

interface Driver {
  id: number;
  name: string;
}

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

interface Freight {
  id: number;
  status: Status;
  freightDate: string;
  cargoType: CargoType;
  totalCoast: number;
  vehicleType: VehicleType;
  totalCost: number;
  driver: Driver;
  transporter: Transporter;
}

interface DriverFreight {
  id: number;
  freightNumber: string;
  status: Status;
  freightDate: string;
}

interface Driver {
  id: number;
  fullName: string;
  licenseNumber: string;
  licenseExpirationDate: string;
  freights: DriverFreight[];
}

export async function getFreight(freightId: number) {
  const response = await api.get(`/freight/${freightId}`);
  return response.data as Freight;
}
