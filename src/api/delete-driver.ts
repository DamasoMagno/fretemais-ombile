import { api } from "../services/api";

export async function deleteDriverById(driverId: number){
    await api.delete(`/driver/${driverId}`);
}