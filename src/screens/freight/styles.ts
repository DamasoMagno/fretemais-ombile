import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffbd00;
`;

export const Content = styled.View`
  height: 90%;
  background-color: #ffffff;
  margin-top: auto;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 24px 24px;
  align-items: center;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContentHeaderTitle = styled.Text`
  flex: 1;
  text-align: center;
  color: #667085;
  font-size: 18px;
  font-weight: 500;
`;

export const FreightIcon = styled.View`
  background-color: #f5fded;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: 50px;
  height: 50px;
`;

export const Form = styled.View`
  width: 100%;
  gap: 16px;
`;

export const FormSubmit = styled.TouchableOpacity`
  background-color: #161c19;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

export const FormSubmitText = styled.Text`
  color: white;
  font-weight: 600;
`

export const SelectDate = styled.TouchableOpacity`
  background-color: #f2f4f7;
  padding: 12px;
  border-radius: 8px;
`;

export const SelectContainer = styled.View`
  border-radius: 8px;
  overflow: hidden;
`