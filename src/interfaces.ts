export type VehicleType = "TRUCK" | "VAN";

export type CargoType = "PERISHABL" | "HAZARDOUS";

export type Status = "IN_ROUTE" | "WAITING_FOR_BID" | "DELIVERED";

export interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

interface DriverFreight {
  id: number;
  freightNumber: string;
  status: Status;
  freightDate: string;
}

interface Driver {
  id: number;
  fullName: string;
  licenseNumber: string;
  licenseExpirationDate: string;
  freights: DriverFreight[];
}

interface Freight {
  id: number;
  status: Status;
  freightDate: string;
  cargoType: CargoType;
  totalCoast: number;
  vehicleType: VehicleType;
  totalCost: number;
  driver: Driver;
  transporter: Transporter;
}
