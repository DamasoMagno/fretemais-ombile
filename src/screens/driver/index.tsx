import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Truck } from "lucide-react-native";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@components/input";
import { Status } from "../../interfaces";
import DatePicker from "@react-native-community/datetimepicker";

import {
  Container,
  Content,
  ContentHeader,
  ContentHeaderTitle,
  Form,
  FormSubmit,
  FormSubmitText,
  SelectDate,
} from "./styles";
import { getDriver } from "@api/get-driver";
import { useState } from "react";
import { registerDriver } from "@api/register-driver";
import { updateDriver } from "@api/update-driver";
import { formatDate } from "@utils/format-date";
import { format } from "date-fns";

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

const driverSchema = z.object({
  fullName: z
    .string()
    .min(1, "Por favor, informe o nome completo do motorista."),
  licenseNumber: z.string().min(1, "O número da licença é obrigatório."),
  licenseExpirationDate: z
    .coerce
    .string()
    .min(1, "A data de expiração da licença é obrigatória."),
});

type DriverInput = z.infer<typeof driverSchema>;

export function Driver({ route, navigation }: any) {
  const driverId = route.params?.driverId ?? "";
  const client = useQueryClient();
  const [modalDay, setModalDay] = useState(false);

  const { data: driver, isLoading: loadingDriver } = useQuery({
    queryKey: ["driver", driverId],
    queryFn: () => getDriver(driverId),
    enabled: !!driverId,
  });

  const { mutateAsync: createNewDriver } = useMutation({
    mutationFn: registerDriver,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["drivers"]
      });

      navigation.goBack();
    },
  });

  const { mutateAsync: updateExistindgDriver } = useMutation({
    mutationFn: updateDriver,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["drivers"]
      });
      
      navigation.goBack();
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<DriverInput>({
    resolver: zodResolver(driverSchema),
    values: {
      fullName: driver?.fullName ?? "",
      licenseExpirationDate: driver?.licenseExpirationDate ?? "",
      licenseNumber: driver?.licenseNumber ?? "",
    },
  });

  const submittingForm = isSubmitting;
  const licenseExpirationDate = watch("licenseExpirationDate");

  console.log(errors)

  return (
    <Container>
      <Content>
        <ContentHeader>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <ChevronLeft color="#667085" size={20} />
          </TouchableOpacity>
          <ContentHeaderTitle>
            {driverId ? "Atualizar motorista" : "Cadastrra motorist"}
          </ContentHeaderTitle>
        </ContentHeader>

        <Form>
          <Text>Novo Frete</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => {
              return (
                <Input value={field.value} onChangeText={field.onChange} />
              );
            }}
          />

          <Controller
            control={control}
            name="licenseNumber"
            render={({ field }) => {
              return (
                <Input value={field.value} onChangeText={field.onChange} />
              );
            }}
          />

          <SelectDate onPress={() => setModalDay(true)}>
            <Text>{formatDate(licenseExpirationDate)}</Text>
          </SelectDate>

          <Controller
            control={control}
            name="licenseExpirationDate"
            render={({ field }) => {
              return (
                modalDay && (
                  <DatePicker
                    value={new Date()}
                    mode="date"
                    onChange={(event, value) => {
                      setModalDay(false);

                      const formattedDate = format(value, 'yyyy-MM-dd');
                      field.onChange(formattedDate)
                    }}
                  />
                )
              );
            }}
          />

          <FormSubmit
            onPress={handleSubmit(async (data) => {
              if (driverId) {
                await updateExistindgDriver({ driverId, data });
                console.log("Atualizou");
                return;
              }
              
              const newDriver: Omit<Driver, "id" | "freights"> = {
                fullName: data.fullName,
                licenseExpirationDate: data.licenseExpirationDate,
                licenseNumber: data.licenseNumber,
              };

              await createNewDriver(newDriver);
              console.log("Cadastrou");
            })}
          >
            {submittingForm ? (
              <ActivityIndicator color="white" size={16} />
            ) : (
              <FormSubmitText>
                {driverId ? "Atualizar" : "Cadastrar"}
              </FormSubmitText>
            )}
          </FormSubmit>
        </Form>
      </Content>
    </Container>
  );
}
