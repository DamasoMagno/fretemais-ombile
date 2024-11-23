import { ChevronRight } from "lucide-react-native";
import { Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface ButtonNavigationProps extends TouchableOpacityProps {}

export function Navigation(props: ButtonNavigationProps) {
  return (
    <Container {...props}>
      <ChevronRight color="white" size={14} />
    </Container>
  );
}
