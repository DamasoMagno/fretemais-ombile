import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { getTransporter } from "@api/get-transporter";
import { registerTransporter } from "@api/register-transporter";
import { updateTransporter } from "@api/update-transporter";

import { Input } from "@components/input";
import { Error } from "@components/error";
import { InputMasked } from "@components/input-masked";

import {
  Container,
  Content,
  ContentHeader,
  ContentHeaderTitle,
  Form,
  FormSubmit,
  FormSubmitText,
} from "./styles";
import { useRevalidate } from "src/hooks/useRevalidate";

const transporterSchema = z.object({
  name: z.string().min(1, "Nome da transportadora exigido"),
  cnpj: z.string().min(1, "CNPJ da transportadora exigido"),
});

type TransporterInput = z.infer<typeof transporterSchema>;

export function Transporter({ route, navigation }: any) {
  const transporterId = route.params?.transporterId ?? "";
  const { revalidateCache } = useRevalidate("transporters");

  const { data: transporter } = useQuery({
    queryKey: ["transporter", transporterId],
    queryFn: () => getTransporter(transporterId),
    enabled: !!transporterId,
  });

  const { mutateAsync: registerNewTransporter } = useMutation({
    mutationFn: registerTransporter,
    onSuccess: () => {
      revalidateCache();
      navigation.goBack("Transporters");
    },
  });

  const { mutateAsync: updateTransporterById } = useMutation({
    mutationFn: updateTransporter,
    onSuccess: () => {
      revalidateCache();
      navigation.goBack("Transporters");
    },
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

  return (
    <Container>
      <Content>
        <ContentHeader>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <ChevronLeft color="#667085" size={20} />
          </TouchableOpacity>
          <ContentHeaderTitle>Detalhes do frete</ContentHeaderTitle>
        </ContentHeader>

        <Form>
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
                return;
              }

              const newTransporter = {
                name: data.name,
                cnpj: data.cnpj,
              };

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
