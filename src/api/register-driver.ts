import { CargoType, Status, VehicleType } from "../interfaces";
import { api } from "../services/api";

interface Driver {
  fullName: string;
  licenseNumber: string;
  licenseExpirationDate: string;
}

export async function registerDriver(data: Driver) {
  try {
    await api.post(`/driver`, data);
  } catch (error) {
    console.log(error.response)
  }
}
