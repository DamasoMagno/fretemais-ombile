import { api } from "../services/api";

export async function deleteVehicleById(vehicleId: number){
    await api.delete(`/vehicle/${vehicleId}`);
}