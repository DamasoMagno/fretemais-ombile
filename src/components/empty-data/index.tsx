import { Content, ContentText } from "./styles";
import { Database } from "lucide-react-native";

interface EmptyDataProps {
  label: string;
}

export function EmptyData({ label }: EmptyDataProps) {
  return (
    <Content>
      <Database color="rgba(0, 0, 0, .25)"/>
      <ContentText>{label}</ContentText>
    </Content>
  );
}
