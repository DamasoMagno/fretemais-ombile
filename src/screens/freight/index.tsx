import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Loader2, Truck } from "lucide-react-native";
import { TouchableOpacity, View, Text } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "../../components/input";
import { CargoType, Status, VehicleType } from "../../interfaces";
import { api } from "../../services/api";
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
  console.log("here");

  const freightId = route.params?.appointmentId ?? "";
  const client = useQueryClient();

  // const { data: freight } = useQuery({
  //   queryKey: ["freight", freightId],
  //   queryFn: async () => {
  //     const response = await api.get(`/freight/${freightId}`);
  //     return response.data as Freight;
  //   },
  //   enabled: !!freightId,
  // });

  // const { data: transporters } = useQuery({
  //   queryKey: ["transporters"],
  //   queryFn: async () => {
  //     const response = await api.get("/transporter");
  //     return response.data as Transporter[];
  //   },
  // });

  // const { data: drivers } = useQuery({
  //   queryKey: ["drivers"],
  //   queryFn: async () => {
  //     const response = await api.get("/driver");
  //     return response.data as Driver[];
  //   },
  // });

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FreightInput>({
    defaultValues: {
      freightDate: new Date(),
      driver_id: 0,
      cargoType: "PERISHABL",
      status: "IN_ROUTE",
      transporter_id: 0,
      vehicleType: "VAN",
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

          <Input controller={control} name="name" />
          <Input controller={control} name="name" />
          <Input controller={control} name="name" />
          <Input controller={control} name="name" />
          <Input controller={control} name="name" />

          <FormSubmit onPress={handleSubmit((data) => console.log(data))}>
            {submittingFreight ? (
              <Loader2 />
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
