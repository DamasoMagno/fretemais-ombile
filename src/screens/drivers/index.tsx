import { useState } from "react";
import { FlatList } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteDriverById } from "@api/delete-driver";
import { getDrivers } from "@api/get-drivers";

import { Search } from "@components/search";

import { Container } from "./styles";
import { Driver } from "./components/driver";
import { FloatButton } from "@components/float-button";
import { PageTitle } from "@components/page-title";

export function Drivers({ navigation }: any) {
  const client = useQueryClient();
  const [driver, setDriver] = useState("");

  let timer;

  const { data: drivers } = useQuery({
    queryKey: ["drivers", driver],
    queryFn: () => getDrivers(driver),
  });

  const { mutateAsync: deleteDriver, isPending } = useMutation({
    mutationFn: deleteDriverById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["drivers"],
      });
    },
  });

  function handleSearchDriver(driver: string) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setDriver(driver);
    }, 1000);
  }

  return (
    <Container>
      <PageTitle>Motoristas</PageTitle>

      <Search
        placeholder="Buscar motorista"
        onChangeText={handleSearchDriver}
      />

      <FlatList
        data={drivers}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 100,
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(data) => String(data.id)}
        renderItem={({ item: driver }) => {
          return (
            <Driver
              key={driver.id}
              driver={driver}
              onDelete={() => deleteDriver(driver.id)}
              onNavigate={() =>
                navigation.navigate("Driver", {
                  driverId: driver.id,
                })
              }
            />
          );
        }}
      />
      <FloatButton onPress={() => navigation.navigate("Driver")} />
    </Container>
  );
}
