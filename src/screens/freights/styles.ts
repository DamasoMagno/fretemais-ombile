import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context"

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f2f4f7;
  padding: 0px 24px;
`;

export const PageTitle = styled.Text`
  margin-top: 24px;
  color: #475467;
	font-size: 22px;
	font-weight: 600;
  margin-bottom: 24px;
`

export const Freight = styled.View`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 21px 14px;
  gap: 24px;
`

export const FreightResume = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #EAECF0;
  padding-bottom: 21px;
`

export const FreightResumeIcon = styled.View`
  background-color: #FFFAEB;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

export const FreightResumeService = styled.Text`
  color: #475467;
  font-size: 16px;
  font-weight: 400;
`

export const FreightResumeTotalCoast = styled.Text`
  color: #667085;
  font-size: 30px;
  font-weight: 700;
`

export const FreightInfo = styled.View`
  gap: 16px;
  width: 100%;
`

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const FreightInfoData = styled.Text`
  color: #475467;
  font-size: 14px;
`

export const FreightButton = styled.TouchableOpacity`
  background-color: #161C19;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 12px;
`

export const FreightButtonText = styled.Text`
  color: white;
  font-weight: 600;
`

export const SearchInput = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: #FFFFFF;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
`

export const SearchInputContent = styled.TextInput`
  flex: 1;
`

export const FreightButtonDelete = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #f2f4f7;
  border-radius: 8px;
  padding: 12px;
`

export const FreightActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
`