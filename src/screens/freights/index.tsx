import { FlatList, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteFreightById } from "@api/delete-freight";
import { getFreights } from "@api/get-freights";

import { Container } from "./styles";
import { useState } from "react";
import { Search } from "@components/search";
import { Freight } from "./components/freight";
import { FloatButton } from "@components/float-button";
import { PageTitle } from "@components/page-title";

export function Freights({ route, navigation }: any) {
  const client = useQueryClient();
  const [freightNumber, setFreightNumber] = useState(0);

  let timer;

  const { data: freights } = useQuery({
    queryKey: ["freights"],
    queryFn: () => getFreights(freightNumber),
  });

  const { mutateAsync: deleteFreight, isPending } = useMutation({
    mutationFn: deleteFreightById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["freights"],
      });
    },
  });

  function handleSearchFreight(freightNumber: string) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setFreightNumber(Number(freightNumber));
    }, 1000);
  }

  return (
    <Container>
      <View>
        <PageTitle>Fretes disponíveis</PageTitle>

        <Search
          placeholder="Buscar fretes"
          onChangeText={handleSearchFreight}
        />

        <FlatList
          data={freights}
          contentContainerStyle={{
            gap: 12,
            paddingBottom: 100,
          }}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          keyExtractor={(data) => String(data.id)}
          renderItem={({ item: freight }) => {
            return (
              <Freight
                key={freight.id}
                freight={freight}
                onDelete={() => deleteFreight(freight.id)}
                onNavigate={() => navigation.navigate("Freight")}
              />
            );
          }}
        />
      </View>

      <FloatButton onPress={() => navigation.navigate("Freight")} />
    </Container>
  );
}
