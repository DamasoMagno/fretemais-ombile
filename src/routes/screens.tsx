import { Drivers } from "../screens/drivers";
import { Freight } from "../screens/freight";
import { createStackNavigator } from "@react-navigation/stack";
import { Tabs } from "./tabs";

const Screen = createStackNavigator();

export function Screens() {
  return (
    <Screen.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen.Screen name="Tabs" component={Tabs} />
      <Screen.Screen name="Driver" component={Drivers} />
      <Screen.Screen name="Freight" component={Freight} />
    </Screen.Navigator>
  );
}
