import { api } from "../services/api";

export async function deleteTransporterById(transporterId: number){
    await api.delete(`/transporter/${transporterId}`);
}