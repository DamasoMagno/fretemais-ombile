import { View } from "react-native";
import { Icon } from "@components/icon";
import * as Item from "@components/item";
import { formatDate } from "@utils/format-date";
import { CargoType, Status } from "src/interfaces";
import { formatCurrency } from "@utils/format-currency";
import { formatCNPJ } from "@utils/formatCNPJ";

interface Driver {
  id: number;
  fullName: string;
  licenseNumber: string;
  licenseExpirationDate: string;
}

interface DriverProps {
  driver: Driver;
  onDelete: () => void;
  onNavigate: () => void;
}

export function Driver({ driver, onNavigate, onDelete }: DriverProps) {
  return (
    <Item.Container>
      <Item.Content>
        <Item.Item enphase="Nome do motorista" description={driver.fullName} />
        <Item.Item
          enphase="Número da licença"
          description={driver.licenseNumber}
        />
        <Item.Item
          enphase="Término da licença"
          description={formatDate(driver.licenseExpirationDate)}
        />
      </Item.Content>
      <Item.Footer>
        <Item.ButtonDelete onPress={onDelete} />
        <Item.Navigation onPress={onNavigate} />
      </Item.Footer>
    </Item.Container>
  );
}
