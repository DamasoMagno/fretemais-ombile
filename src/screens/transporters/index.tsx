import { ScrollView, View } from "react-native";
import { ChevronRight, Search, Trash } from "lucide-react-native";

import {
  Container,
  PageTitle,
  Freight,
  FreightInfo,
  Info,
  FreightInfoData,
  TransporterButton,
  SearchInput,
  SearchInputContent,
  TransporterButtonDelete,
  TransporterActions,
} from "./styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { formatCNPJ } from "../../utils/formatCNPJ";
import { deleteTransporterById } from "../../api/delete-transporter";
import { getTransporters } from "../../api/get-transporters";

export function Transporters({ navigation }: any) {
  const client = useQueryClient();

  const { data } = useQuery({
    queryKey: ["transporters"],
    queryFn: getTransporters,
  });

  const { mutateAsync: deleteTransporter, isPending } = useMutation({
    mutationFn: deleteTransporterById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["transporters"],
      });
    },
  });

  return (
    <Container>
      <PageTitle>Empresas</PageTitle>

      <SearchInput>
        <Search color="#475467" size={16} />
        <SearchInputContent placeholder="Buscar transportadora" />
      </SearchInput>

      <ScrollView
        scrollEnabled
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {data?.map((transporter) => {
          return (
            <Freight key={transporter.id}>
              <FreightInfo>
                <Info>
                  <FreightInfoData>Nome da empresa</FreightInfoData>
                  <FreightInfoData>{transporter.name}</FreightInfoData>
                </Info>

                <Info>
                  <FreightInfoData>CNPJ</FreightInfoData>
                  <FreightInfoData>
                    {formatCNPJ(transporter.cnpj)}
                  </FreightInfoData>
                </Info>
              </FreightInfo>

              <TransporterActions>
                <TransporterButtonDelete
                  onPress={() => deleteTransporter(transporter.id)}
                >
                  <Trash color="red" size={14} />
                </TransporterButtonDelete>

                <TransporterButton
                  onPress={() => navigation.navigate("Transporter")}
                >
                  <ChevronRight color="white" size={14} />
                </TransporterButton>
              </TransporterActions>
            </Freight>
          );
        })}
      </ScrollView>
    </Container>
  );
}
