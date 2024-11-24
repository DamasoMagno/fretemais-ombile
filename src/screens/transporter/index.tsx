import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Loader2, Truck } from "lucide-react-native";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/input";
import { Error } from "@components/error";

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
import { getTransporter } from "@api/get-transporter";
import { InputMasked } from "@components/input-masked";
import { registerTransporter } from "@api/register-transporter";
import { updateTransporter } from "@api/update-transporter";

interface Transporter {
  id: number;
  name: string;
  cnpj: string;
}

const transporterSchema = z.object({
  name: z.string().min(1, "Nome da transportadora exigido"),
  cnpj: z.string().min(1, "CNPJ da transportadora exigido"),
});

type TransporterInput = z.infer<typeof transporterSchema>;

export function Transporter({ route, navigation }: any) {
  const transporterId = route.params?.transporterId ?? "";
  const client = useQueryClient()

  const { data: transporter } = useQuery({
    queryKey: ["transporter", transporterId],
    queryFn: () => getTransporter(transporterId),
    enabled: !!transporterId,
  });

  const { mutateAsync: registerNewTransporter } = useMutation({
    mutationFn: registerTransporter,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["transporters"]
      });

      navigation.goBack("Transporters")
    }
  });

  const { mutateAsync: updateTransporterById } = useMutation({
    mutationFn: updateTransporter,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["transporters"]
      });

      navigation.goBack("Transporters")
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TransporterInput>({
    resolver: zodResolver(transporterSchema),
    values: {
      name: transporter?.name || "",
      cnpj: transporter?.cnpj || "",
    },
  });

  const submittingForm = isSubmitting;

  console.log(transporter)

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
          <Text>Nova transportadora</Text>

          <View>
            <Text>Nome da transportadora</Text>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <Input value={field.value} onChangeText={field.onChange} />
                );
              }}
            />
            {Error(errors.name)}
          </View>

          <View>
            <Text>CNPJ da empresa</Text>
            <Controller
              name="cnpj"
              control={control}
              render={({ field }) => {
                return (
                  <InputMasked
                    onChangeText={field.onChange}
                    placeholderTextColor="#27272A"
                    value={field.value}
                    keyboardType="numeric"
                    type="BRL_CNPJ"
                  />
                );
              }}
            />
            {Error(errors.cnpj)}
          </View>

          <FormSubmit
            onPress={handleSubmit(async (data) => {
              if (transporterId) {
                await updateTransporterById({ transporterId, data });
                console.log("Atualizou")
                return;
              }

              const newTransporter = {
                name: data.name,
                cnpj: data.cnpj,
              };

              console.log("Cadastrou")
              await registerNewTransporter(newTransporter);
            })}
            disabled={submittingForm}
          >
            {submittingForm ? (
              <ActivityIndicator color="white" size={16} />
            ) : (
              <FormSubmitText>
                {transporterId ? "Atualizar" : "Cadastrar"}
              </FormSubmitText>
            )}
          </FormSubmit>
        </Form>
      </Content>
    </Container>
  );
}
