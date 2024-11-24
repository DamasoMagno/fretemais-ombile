import { api } from "../services/api";

interface Driver {
  id: number;
  fullName: string;
  licenseNumber: string;
  licenseExpirationDate: string;
}

export async function getDrivers(driver?: string) {
  const response = await api.get("/driver", {
    params: {
      driverName: driver
    }
  });
  return response.data as Driver[];
}
