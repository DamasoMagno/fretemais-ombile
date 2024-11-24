import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Loader2, Truck } from "lucide-react-native";
import { TouchableOpacity, Text } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@components/input";
import { api } from "@services/api";
import { Picker } from "@react-native-picker/picker";

import {
  Container,
  Content,
  ContentHeader,
  ContentHeaderTitle,
  FreightIcon,
  Form,
  FormSubmit,
  FormSubmitText,
} from "./styles";
import { getVehicle } from "@api/get-vehicle";
import { registerVehicle } from "@api/register-vehicle";
import { updateVehicle } from "@api/update-vehicle";

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

interface Vehicle {
  plateNumber: string
  vehicleType: string
  transporter_id: number
}

const vehicleSchema = z.object({
  plateNumber: z.string().min(1, "A placa é obrigatória."),
  vehicleType: z.string().min(1, "Selecione o tipo de veículo."),
  transporter_id: z.coerce.number(),
});

type VehicleInput = z.infer<typeof vehicleSchema>;

export function Vehicle({ route, navigation }: any) {
  const client = useQueryClient()
  const vehicleId = route.params?.vehicleId ?? "";

  const { data: vehicle } = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: () => getVehicle(vehicleId),
    enabled: !!vehicleId,
  });

  const { data: transporters } = useQuery({
    queryKey: ["transporters"],
    queryFn: async () => {
      const response = await api.get("/transporter");
      return response.data as Transporter[];
    },
  });

  const { mutateAsync: registerNewVehicle } = useMutation({
    mutationFn: registerVehicle,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["vehicles"]
      });

      navigation.goBack("Transporters")
    }
  });

  const { mutateAsync: updateExistingVehicle } = useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["vehicles"]
      });

      navigation.goBack("Transporters")
    }
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<VehicleInput>({
    resolver: zodResolver(vehicleSchema),
    values: {
      plateNumber: vehicle?.plateNumber ?? "",
      vehicleType: vehicle?.vehicleType ?? "",
      transporter_id: vehicle?.transporter?.id ?? 0,
    },
  });

  const submittingFreight = isSubmitting;

  return (
    <Container>
      <Content>
        <ContentHeader>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <ChevronLeft color="#667085" size={20} />
          </TouchableOpacity>
          <ContentHeaderTitle>Detalhes do frete</ContentHeaderTitle>
        </ContentHeader>

        <FreightIcon>
          <Truck color="#015F3B" />
        </FreightIcon>

        <Form>
          <Text>Novo Frete</Text>
          <Controller
            name="plateNumber"
            control={control}
            render={({ field }) => {
              return (
                <Input value={field.value} onChangeText={field.onChange} />
              );
            }}
          />

          <Controller
            name="vehicleType"
            control={control}
            render={({ field }) => {
              return (
                <Picker
                  selectedValue={field.value}
                  onValueChange={(e) => field.onChange(e)}
                >
                  <Picker.Item value="TRUCK" label="Caminhão" />
                  <Picker.Item value="VAN" label="Van" />
                </Picker>
              );
            }}
          />

          <Controller
            name="transporter_id"
            control={control}
            render={({ field }) => {
              return (
                <Picker
                  selectedValue={field.value}
                  onValueChange={(e) => field.onChange(e)}
                >
                  {transporters?.map((transporter) => (
                    <Picker.Item
                      key={transporter.id}
                      label={transporter.name}
                      value={transporter.id}
                    />
                  ))}
                </Picker>
              );
            }}
          />

          <FormSubmit 
            onPress={handleSubmit(async (data) => {
              if (vehicleId) {
                await updateExistingVehicle({ vehicleId, data });
                console.log("Atualizou")
                return;
              }

              const newVehicle: Vehicle = {
                plateNumber: data.plateNumber,
                transporter_id: data.transporter_id,
                vehicleType: data.vehicleType
              };

              await registerNewVehicle(newVehicle);
              console.log("Cadastrou")
            })}
          >
            {submittingFreight ? (
              <Loader2 />
            ) : (
              <FormSubmitText>
                {vehicleId ? "Atualizar" : "Cadastrar"}
              </FormSubmitText>
            )}
          </FormSubmit>
        </Form>
      </Content>
    </Container>
  );
}
