import { CargoType, Status } from "../interfaces";
import { api } from "../services/api";

interface Transporter {
  id: number;
  name: string;
}

interface Freight {
  id: number;
  freightNumber: string;
  status: Status;
  freightDate: string;
  transporter: Transporter;
  cargoType: CargoType;
  totalCoast: number;
}

export async function getFreights(freightNumber: number) {
  const response = await api.get("/freight", {
    params: {
      freightNumber
    }
  })
  return response.data as Freight[];
}
