import { TextInputProps } from "react-native";
import { Content } from "./styles";

interface InputProps extends TextInputProps {}

export function Input({ ...props }: InputProps) {
  return <Content {...props} />;
}
