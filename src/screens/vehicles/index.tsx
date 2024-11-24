import { useState } from "react";
import { FlatList } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getVehicles } from "@api/get-vehicles";
import { deleteVehicleById } from "@api/delete-vehicle";

import { Vehicle } from "./components/vehicle";
import { Search } from "@components/search";
import { FloatButton } from "@components/float-button";

import { Container } from "./styles";
import { PageTitle } from "@components/page-title";

export function Vehicles({ navigation }) {
  const client = useQueryClient();
  const [vehicle, setVehicle] = useState("");

  let timer;

  const { data: vehicles } = useQuery({
    queryKey: ["vehicles", vehicle],
    queryFn: () => getVehicles(vehicle),
  });

  const { mutateAsync: deleteVehicle } = useMutation({
    mutationFn: deleteVehicleById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["vehicles"],
      });
    },
  });

  function handleSearchVehicle(vehicle: string) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setVehicle(vehicle);
    }, 1000);
  }

  return (
    <Container>
      <PageTitle>Veículos</PageTitle>

      <Search 
        placeholder="Buscar veículo" 
        onChangeText={handleSearchVehicle} 
      />

      <FlatList
        data={vehicles}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 100,
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(data) => String(data.id)}
        renderItem={({ item: vehicle }) => {
          return (
            <Vehicle
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={() => deleteVehicle(vehicle.id)}
              onNavigate={() =>
                navigation.navigate("Vehicle", {
                  vehicleId: vehicle.id,
                })
              }
            />
          );
        }}
      />

      <FloatButton onPress={() => navigation.navigate("Vehicle")} />
    </Container>
  );
}
