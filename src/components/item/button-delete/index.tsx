import { Trash } from "lucide-react-native";
import { Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface ButtonDeleteProps extends TouchableOpacityProps {}

export function ButtonDelete(props: ButtonDeleteProps) {
  return (
    <Container {...props}>
      <Trash color="red" size={14} />
    </Container>
  );
}
