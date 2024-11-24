import { api } from "../services/api";

interface Driver {
  fullName?: string;
  licenseNumber?: string;
  licenseExpirationDate?: string;
}

interface UpdateDriverProps {
  driverId: number
  data: Driver
}

export async function updateDriver({ data, driverId }: UpdateDriverProps) {
  await api.put(`/driver/${driverId}`, data)
}
