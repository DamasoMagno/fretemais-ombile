import { FlatList } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteTransporterById } from "../../api/delete-transporter";
import { getTransporters } from "../../api/get-transporters";

import { Container } from "./styles";
import { useState } from "react";
import { Search } from "../../components/search";
import { Transporter } from "./components/transporter";
import { FloatButton } from "@components/float-button";
import { PageTitle } from "@components/page-title";
import { EmptyData } from "@components/empty-data";
import { useRevalidate } from "@hooks/useRevalidate";

export function Transporters({ navigation }: any) {
  const client = useQueryClient();
  const { revalidateCache } = useRevalidate("transporters")
  const [transporter, setTransporter] = useState("");

  let timer;

  const { data: transporters } = useQuery({
    queryKey: ["transporters", transporter],
    queryFn: () => getTransporters(transporter),
    refetchOnWindowFocus: true,
  });

  const { mutateAsync: deleteTransporter } = useMutation({
    mutationFn: deleteTransporterById,
    onSuccess: () => {
      revalidateCache()
    },
  });

  function handleSearchTransporter(transporter: string) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setTransporter(transporter);
    }, 1000);
  }

  return (
    <Container>
      <PageTitle>Transportadoras</PageTitle>

      <Search
        placeholder="Buscar transportadora"
        onChangeText={handleSearchTransporter}
      />

      <FlatList
        data={transporters}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 100,
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(data) => String(data.id)}
        renderItem={({ item: transporter }) => {
          return (
            <Transporter
              key={transporter.id}
              transporter={transporter}
              onDelete={() => deleteTransporter(transporter.id)}
              onNavigate={() =>
                navigation.navigate("Transporter", {
                  transporterId: transporter.id,
                })
              }
            />
          );
        }}
        ListEmptyComponent={() => (
          <EmptyData label="Nenhuma transportadora cadastrada" />
        )}
      />

      <FloatButton onPress={() => navigation.navigate("Transporter")} />
    </Container>
  );
}
