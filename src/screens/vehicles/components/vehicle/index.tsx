import * as Item from "@components/item";

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

interface Vehicle {
  id: number;
  plateNumber: string;
  vehicleType: string;
  transporter: Transporter;
}

interface VehicleProps {
  vehicle: Vehicle;
  onDelete: () => void;
  onNavigate: () => void;
}

const CAR_TYPES = {
  VAN: "Van",
  TRUCK: "Caminhão",
};

export function Vehicle({ vehicle, onNavigate, onDelete }: VehicleProps) {
  return (
    <Item.Container>
      <Item.Content>
        <Item.Item
          enphase="Número da placa"
          description={vehicle.plateNumber}
        />
        <Item.Item
          enphase="Categoria"
          description={CAR_TYPES[vehicle.vehicleType]}
        />
        <Item.Item
          enphase="Transportadora"
          description={vehicle.transporter.name}
        />
      </Item.Content>
      <Item.Footer>
        <Item.ButtonDelete onPress={onDelete} />
        <Item.Navigation onPress={onNavigate} />
      </Item.Footer>
    </Item.Container>
  );
}
