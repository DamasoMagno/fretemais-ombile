import { ScrollView, View } from "react-native";
import { Search } from "lucide-react-native";

import {
  Container,
  PageTitle,
  Freight,
  FreightInfo,
  Info,
  FreightInfoData,
  FreightButton,
  FreightButtonText,
  SearchInput,
  SearchInputContent,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../../api/get-vehicles";

const CAR_TYPES = {
  "VAN": "Van",
  "TRUCK": "Caminhão"
}

export function Vehicles() {
  const { data } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  return (
    <Container>
      <PageTitle>Veículos</PageTitle>

      <SearchInput>
        <Search color="#475467" size={16} />
        <SearchInputContent placeholder="Buscar veículo" />
      </SearchInput>

      <ScrollView
        scrollEnabled
        contentContainerStyle={{
          gap: 24,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {data?.map(vehicle => {
          return (
            <Freight key={vehicle.id}>
              <FreightInfo>
                <Info>
                  <FreightInfoData>Número da placa</FreightInfoData>
                  <FreightInfoData>{vehicle.plateNumber}</FreightInfoData>
                </Info>

                <Info>
                  <FreightInfoData>Tipo</FreightInfoData>
                  <FreightInfoData>{CAR_TYPES[vehicle.vehicleType]}</FreightInfoData>
                </Info>
              </FreightInfo>

              <FreightButton>
                <FreightButtonText>Ver mais</FreightButtonText>
              </FreightButton>
            </Freight>
          );
        })}
      </ScrollView>
    </Container>
  );
}
