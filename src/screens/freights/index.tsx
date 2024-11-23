import { ScrollView, View } from "react-native";
import { ChevronRight, Search, Trash, Truck } from "lucide-react-native";

import {
  Container,
  PageTitle,
  Freight,
  FreightResume,
  FreightResumeIcon,
  FreightResumeService,
  FreightResumeTotalCoast,
  FreightInfo,
  Info,
  FreightInfoData,
  FreightButton,
  SearchInput,
  SearchInputContent,
  FreightActions,
  FreightButtonDelete,
} from "./styles";

import { CargoType, Status } from "../../interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { formatCurrency } from "../../utils/format-currency";
import { formatDate } from "../../utils/format-date";
import { deleteFreightById } from "../../api/delete-freight";
import { getFreights } from "../../api/get-freights";

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

const FREIGHT_STATUS = {
  IN_ROUTE: "Em rota",
  WAITING_FOR_BID: "Aguardando lance",
  DELIVERED: "Entregue",
};

const CARGO_TYPE = {
  PERISHABL: "Perecível",
};

export function Freights({ route, navigation }: any) {
  const client = useQueryClient();

  const { data: freights } = useQuery({
    queryKey: ["freights"],
    queryFn: getFreights,
  });

  const { mutateAsync: deleteFreight, isPending } = useMutation({
    mutationFn: deleteFreightById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["freights"],
      });
    },
  });

  return (
    <Container>
      <View>
        <PageTitle>Fretes disponíveis</PageTitle>

        <SearchInput>
          <Search color="#475467" size={16} />
          <SearchInputContent placeholder="Buscar frete" />
        </SearchInput>

        <ScrollView
          scrollEnabled
          contentContainerStyle={{
            gap: 24,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {freights?.map((freight) => {
            return (
              <Freight key={freight.id}>
                <FreightResume>
                  <FreightResumeIcon>
                    <Truck color="#EBAF03" size={20} />
                  </FreightResumeIcon>

                  <View>
                    <FreightResumeService>Custo total</FreightResumeService>
                    <FreightResumeTotalCoast>
                      {formatCurrency(freight.totalCoast)}
                    </FreightResumeTotalCoast>
                  </View>
                </FreightResume>

                <FreightInfo>
                  <Info>
                    <FreightInfoData>Número</FreightInfoData>
                    <FreightInfoData>{freight.freightNumber}</FreightInfoData>
                  </Info>

                  <Info>
                    <FreightInfoData>Data de retirada</FreightInfoData>
                    <FreightInfoData>
                      {formatDate(freight.freightDate)}
                    </FreightInfoData>
                  </Info>

                  <Info>
                    <FreightInfoData>Transportadora</FreightInfoData>
                    <FreightInfoData>
                      {freight.transporter.name}
                    </FreightInfoData>
                  </Info>

                  <Info>
                    <FreightInfoData>Tipo de carga</FreightInfoData>
                    <FreightInfoData>
                      {CARGO_TYPE[freight.cargoType]}
                    </FreightInfoData>
                  </Info>

                  <Info>
                    <FreightInfoData>Status</FreightInfoData>
                    <FreightInfoData>
                      {FREIGHT_STATUS[freight.status]}
                    </FreightInfoData>
                  </Info>
                </FreightInfo>

                <FreightActions>
                  <FreightButtonDelete onPress={() => deleteFreight(freight.id)}>
                    <Trash color="red" size={14} />
                  </FreightButtonDelete>

                  <FreightButton onPress={() => navigation.navigate("Freight")}>
                    <ChevronRight color="white" size={14} />
                  </FreightButton>
                </FreightActions>
              </Freight>
            );
          })}
        </ScrollView>
      </View>
    </Container>
  );
}
