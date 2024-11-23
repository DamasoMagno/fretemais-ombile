import { Controller, UseFormReturn } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import { FreightInput } from "../../screens/freight";
import { Content } from "./styles";

interface InputProps extends TextInputProps {
  name: keyof FreightInput;
  controller: UseFormReturn["control"];
}

export function Input({ name, controller, ...props }: InputProps) {
  return (
    <Controller
      name={name}
      control={controller}
      render={({ field }) => {
        return (
          <Content
            value={field.value}
            onChangeText={field.onChange}
            {...props}
          />
        );
      }}
    />
  );
}
