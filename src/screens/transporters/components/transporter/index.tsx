import { View } from "react-native";
import { Icon } from "@components/icon";
import * as Item from "@components/item";
import { formatDate } from "@utils/format-date";
import { CargoType, Status } from "src/interfaces";
import { formatCurrency } from "@utils/format-currency";
import { formatCNPJ } from "@utils/formatCNPJ";

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

interface TransporterProps {
  transporter: Transporter;
  onDelete: () => void;
  onNavigate: () => void;
}

export function Transporter({
  transporter,
  onNavigate,
  onDelete,
}: TransporterProps) {
  return (
    <Item.Container>
      <Item.Content>
        <Item.Item enphase="Nome da empresa" description={transporter.name} />
        <Item.Item enphase="CNPJ" description={formatCNPJ(transporter.cnpj)} />
      </Item.Content>
      <Item.Footer>
        <Item.ButtonDelete onPress={onDelete} />
        <Item.Navigation onPress={onNavigate} />
      </Item.Footer>
    </Item.Container>
  );
}
