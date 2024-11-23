import { api } from "../services/api";

interface Driver {
  id: number;
  fullName: string;
  licenseNumber: string;
  licenseExpirationDate: string;
}

export async function getDrivers() {
  const response = await api.get("/driver");
  return response.data as Driver[];
}
