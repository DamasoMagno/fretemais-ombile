import { api } from "../services/api";

export async function deleteFreightById(freightId: number){
    await api.delete(`/freight/${freightId}`);
}