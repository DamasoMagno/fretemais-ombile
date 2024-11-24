import { TextInputProps } from "react-native";
import { Content } from "./styles";
import { MaskInputProps, Masks } from "react-native-mask-input";

interface InputMaskProps extends MaskInputProps {
  type: keyof typeof Masks;
}

export function InputMasked({ type, ...props }: InputMaskProps) {
  return <Content mask={Masks[type]} {...props} />;
}
