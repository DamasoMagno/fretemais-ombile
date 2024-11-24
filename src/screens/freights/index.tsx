import { useState } from "react";
import { FlatList, View, Text } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteFreightById } from "@api/delete-freight";
import { getFreights } from "@api/get-freights";

import { Search } from "@components/search";
import { Freight } from "./components/freight";
import { FloatButton } from "@components/float-button";
import { PageTitle } from "@components/page-title";

import { Container } from "./styles";
import { EmptyData } from "@components/empty-data";
import { useRevalidate } from "@hooks/useRevalidate";

export function Freights({ route, navigation }: any) {
  const { revalidateCache } = useRevalidate("freights");

  const [freightNumber, setFreightNumber] = useState(0);

  let timer;

  const { data: freights } = useQuery({
    queryKey: ["freights"],
    queryFn: () => getFreights(freightNumber),
  });

  const { mutateAsync: deleteFreight, isPending } = useMutation({
    mutationFn: deleteFreightById,
    onSuccess: () => {
      revalidateCache()
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
          ListEmptyComponent={() => (
            <EmptyData label="Nenhum frete cadastrado" />
          )}
        />
      </View>

      <FloatButton onPress={() => navigation.navigate("Freight")} />
    </Container>
  );
}
