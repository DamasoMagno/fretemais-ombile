import { useState } from "react";
import { format } from "date-fns";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Truck } from "lucide-react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { z } from "zod";

import { CargoType, Status, VehicleType } from "../../interfaces";
import { api } from "@services/api";
import { getTransporters } from "@api/get-transporters";
import { getDrivers } from "@api/get-drivers";
import { formatDate } from "@utils/format-date";
import { registerFreight } from "@api/register-freight";
import { updateFreight } from "@api/update-freight";

import {
  Container,
  Content,
  ContentHeader,
  ContentHeaderTitle,
  FreightIcon,
  Form,
  FormSubmit,
  FormSubmitText,
  SelectDate,
} from "./styles";
import { getFreight } from "@api/get-freight";

interface Driver {
  id: number;
  name: string;
}

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

interface Freight {
  id: number;
  status: Status;
  freightDate: string;
  cargoType: CargoType;
  totalCoast: number;
  vehicleType: VehicleType;
  totalCost: number;
  driver: Driver;
  transporter: Transporter;
}

interface NewFreight {
  status: Status;
  freightDate: Date;
  transporter_id: number;
  driver_id: number;
  vehicleType: VehicleType;
  cargoType: CargoType;
}

interface DriverFreight {
  id: number;
  freightNumber: string;
  status: Status;
  freightDate: string;
}

interface Driver {
  id: number;
  fullName: string;
  licenseNumber: string;
  licenseExpirationDate: string;
  freights: DriverFreight[];
}

const freightSchema = z.object({
  name: z.string().min(1),
  status: z.enum(["IN_ROUTE", "WAITING_FOR_BID", "DELIVERED"], {
    errorMap: () => ({ message: "Status obrigatório" }),
  }),
  freightDate: z.coerce.date({
    errorMap: () => ({ message: "Data de entrega obrigatória" }),
  }),
  transporter_id: z.coerce
    .number()
    .min(1, { message: "Transportadora obrigatória" }),
  driver_id: z.coerce.number().min(1, { message: "Motorista obrigatório" }),
  vehicleType: z.enum(["TRUCK", "VAN"], {
    errorMap: () => ({ message: "Categoria de veículo exigida" }),
  }),
  cargoType: z.enum(["HAZARDOUS", "PERISHABL"], {
    errorMap: () => ({ message: "Condição de carga exigida" }),
  }),
});

export type FreightInput = z.infer<typeof freightSchema>;

export function Freight({ route, navigation }: any) {
  const freightId = route.params?.appointmentId ?? "";
  const client = useQueryClient();

  const [modalDay, setModalDay] = useState(false);

  const { data: freight } = useQuery({
    queryKey: ["freight", freightId],
    queryFn: () => getFreight(freightId),
    enabled: !!freightId,
  });

  const [transporters, drivers] = useQueries({
    queries: [
      {
        queryKey: ["transporters"],
        queryFn: () => getTransporters(),
      },
      {
        queryKey: ["drivers"],
        queryFn: () => getDrivers(),
      },
    ],
  });

  const { mutateAsync: createNewFreight } = useMutation({
    mutationFn: registerFreight,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["freights"]
      });

      navigation.goBack();
    },
  });

  const { mutateAsync: updateExistingFreight } = useMutation({
    mutationFn: updateFreight,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["freights"]
      });
      
      navigation.goBack();
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FreightInput>({
    defaultValues: {
      freightDate: new Date(),
      driver_id: 0,
      cargoType: "HAZARDOUS",
      status: "IN_ROUTE",
      transporter_id: 0,
      vehicleType: "VAN",
    },
  });

  const submittingFreight = isSubmitting;
  const freightDate = watch("freightDate");

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
            control={control}
            name="transporter_id"
            render={({ field }) => {
              return (
                <Picker
                  style={{
                    height: 50,
                    backgroundColor: "#e4e4e7",
                    borderWidth: 8,
                    borderColor: "#d4d4d8",
                    borderRadius: 40,
                  }}
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                >
                  {transporters?.data?.map((transporter) => (
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

          <Controller
            control={control}
            name="driver_id"
            render={({ field }) => {
              return (
                <Picker
                  style={{
                    height: 50,
                    backgroundColor: "#e4e4e7",
                    borderWidth: 8,
                    borderColor: "#d4d4d8",
                    borderRadius: 40,
                  }}
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                >
                  {drivers?.data?.map((driver) => (
                    <Picker.Item
                      key={driver.id}
                      label={driver.fullName}
                      value={driver.id}
                    />
                  ))}
                </Picker>
              );
            }}
          />

          <Controller
            control={control}
            name="status"
            render={({ field }) => {
              return (
                <Picker
                  style={{
                    height: 50,
                    backgroundColor: "#e4e4e7",
                    borderWidth: 8,
                    borderColor: "#d4d4d8",
                    borderRadius: 40,
                  }}
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                >
                  <Picker.Item value="IN_ROUTE" label="Em rota" />
                  <Picker.Item
                    value="WAITING_FOR_BID"
                    label="Esperando entregar"
                  />
                  <Picker.Item value="DELIVERED" label="Entregue" />
                </Picker>
              );
            }}
          />

          <Controller
            control={control}
            name="vehicleType"
            render={({ field }) => {
              return (
                <Picker
                  style={{
                    height: 50,
                    backgroundColor: "#e4e4e7",
                    borderWidth: 8,
                    borderColor: "#d4d4d8",
                    borderRadius: 40,
                  }}
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                >
                  <Picker.Item value="TRUCK" label="Caminhão" />
                  <Picker.Item value="VAN" label="Van" />
                </Picker>
              );
            }}
          />

          <Controller
            control={control}
            name="cargoType"
            render={({ field }) => {
              return (
                <Picker
                  style={{
                    height: 50,
                    backgroundColor: "#e4e4e7",
                    borderWidth: 8,
                    borderColor: "#d4d4d8",
                    borderRadius: 40,
                  }}
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                >
                  <Picker.Item value="HAZARDOUS" label="Perigoso" />
                  <Picker.Item value="PERISHABL" label="Refrigerada" />
                </Picker>
              );
            }}
          />

          <SelectDate onPress={() => setModalDay(true)}>
            <Text>{formatDate(String(freightDate))}</Text>
          </SelectDate>

          <Controller
            control={control}
            name="freightDate"
            render={({ field }) => {
              return (
                modalDay && (
                  <DatePicker
                    value={new Date()}
                    mode="date"
                    onChange={(event, value) => {
                      setModalDay(false);

                      const formattedDate = format(value, "yyyy-MM-dd");
                      field.onChange(formattedDate);
                    }}
                  />
                )
              );
            }}
          />

          <FormSubmit 
          onPress={handleSubmit(async (data) => {
            if (freightId) {
              await updateExistingFreight({ freightId, data });
              console.log("Atualizou");
              return;
            }
            
            const newFreight: NewFreight = {
              cargoType: data.cargoType,
              driver_id: data.driver_id,
              freightDate: data.freightDate,
              status: data.status,
              transporter_id: data.transporter_id,
              vehicleType: data.vehicleType
            };

            await createNewFreight(newFreight);
            console.log("Cadastrou");
          })}
          >
            {submittingFreight ? (
              <ActivityIndicator color="white" size={16} />
            ) : (
              <FormSubmitText>
                {freightId ? "Atualizar" : "Cadastrar"}
              </FormSubmitText>
            )}
          </FormSubmit>
        </Form>
      </Content>
    </Container>
  );
}
