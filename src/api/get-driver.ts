import { api } from "../services/api";

interface Driver {
  id: number;
  fullName: string;
  licenseNumber: string;
  licenseExpirationDate: string;
}

export async function getDriver(driverId: number) {
  const response = await api.get(`/driver/${driverId}`);
  return response.data as Driver;
}
