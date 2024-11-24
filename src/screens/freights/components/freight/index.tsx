import { View } from "react-native";
import { Icon } from "@components/icon";
import * as Item from "@components/item";
import { formatDate } from "@utils/format-date";
import { CargoType, Status } from "src/interfaces";
import { formatCurrency } from "@utils/format-currency";
import { Subtitle, Title } from "./styles";

const FREIGHT_STATUS = {
  IN_ROUTE: "Em rota",
  WAITING_FOR_BID: "Aguardando lance",
  DELIVERED: "Entregue",
};

const CARGO_TYPE = {
  PERISHABL: "Perecível",
  HAZARDOUS: "Perigoso",
};

interface Transporter {
  id: number;
  name: string;
}

interface Freight {
  id: number;
  freightNumber: string;
  status: Status;
  freightDate: string;
  transporter: Transporter;
  cargoType: CargoType;
  totalCoast: number;
}

interface FreightProps {
  freight: Freight;
  onDelete: () => void;
  onNavigate: () => void;
}

export function Freight({ freight, onNavigate, onDelete }: FreightProps) {
  return (
    <Item.Container>
      <Item.Header>
        <Icon />
        <View>
          <Title>Custo total</Title>
          <Subtitle>{formatCurrency(freight.totalCoast)}</Subtitle>
        </View>
      </Item.Header>
      <Item.Content>
        <Item.Item enphase="Número" description={String(freight.id)} /> 
        <Item.Item
          enphase="Data de retirada"
          description={formatDate(freight.freightDate)}
        />
        <Item.Item
          enphase="Transportadora"
          description={freight.transporter.name}
        /> 
        <Item.Item
          enphase="Tipo de carga"
          description={CARGO_TYPE[freight.cargoType]}
        />
        <Item.Item
          enphase="Status"
          description={FREIGHT_STATUS[freight.status]}
        /> 
      </Item.Content>
      <Item.Footer>
        <Item.ButtonDelete onPress={onDelete} />
        <Item.Navigation onPress={onNavigate} />
      </Item.Footer>
    </Item.Container>
  );
}
