import { ScrollView, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Search, Trash } from "lucide-react-native";

import {
  Container,
  PageTitle,
  Freight,
  FreightInfo,
  Info,
  FreightInfoData,
  SearchInput,
  SearchInputContent,
  DriverButton,
  DriverActions,
  DriverButtonDelete,
} from "./styles";
import { formatDate } from "../../utils/format-date";
import { deleteDriverById } from "../../api/delete-driver";
import { getDrivers } from "../../api/get-drivers";

export function Drivers({ navigation }: any) {
  const client = useQueryClient();

  const { data: drivers } = useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });

  const { mutateAsync: deleteDriver, isPending } = useMutation({
    mutationFn: deleteDriverById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["drivers"],
      });
    },
  });

  return (
    <Container>
      <PageTitle>Motoristas</PageTitle>

      <SearchInput>
        <Search color="#475467" size={16} />
        <SearchInputContent placeholder="Buscar motorista" />
      </SearchInput>

      <ScrollView
        scrollEnabled
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {drivers?.map((driver) => {
          return (
            <Freight key={driver.id}>
              <FreightInfo>
                <Info>
                  <FreightInfoData>Nome do motorista</FreightInfoData>
                  <FreightInfoData>{driver.fullName}</FreightInfoData>
                </Info>

                <Info>
                  <FreightInfoData>Número da licença</FreightInfoData>
                  <FreightInfoData>{driver.licenseNumber}</FreightInfoData>
                </Info>

                <Info>
                  <FreightInfoData>Expiração da licença</FreightInfoData>
                  <FreightInfoData>
                    {formatDate(driver.licenseExpirationDate)}
                  </FreightInfoData>
                </Info>
              </FreightInfo>

              <DriverActions>
                <DriverButtonDelete onPress={() => deleteDriver(driver.id)}>
                  <Trash color="red" size={14} />
                </DriverButtonDelete>

                <DriverButton
                  onPress={() => navigation.navigate("Transporter")}
                >
                  <ChevronRight color="white" size={14} />
                </DriverButton>
              </DriverActions>
            </Freight>
          );
        })}
      </ScrollView>
    </Container>
  );
}
