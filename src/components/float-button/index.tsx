import { Plus } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Container } from "./styles";

export function FloatButton(props: TouchableOpacityProps) {
  return (
    <Container {...props}>
      <Plus size={16} color="white" />
    </Container>
  );
}
