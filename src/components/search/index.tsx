import { Search as SearchIcon } from "lucide-react-native";
import { Container, Input } from "./styles";
import { TextInputProps } from "react-native";

interface SearchProps extends TextInputProps {}

export function Search(props: SearchProps) {
  return (
    <Container>
      <SearchIcon color="#475467" size={16} />
      <Input {...props} />
    </Container>
  );
}
