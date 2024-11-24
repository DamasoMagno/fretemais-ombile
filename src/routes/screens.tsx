import { Drivers } from "../screens/drivers";
import { Freight } from "../screens/freight";
import { createStackNavigator } from "@react-navigation/stack";
import { Tabs } from "./tabs";
import { Transporter } from "@screens/transporter";
import { Driver } from "@screens/driver";
import { Vehicle } from "@screens/vehicle";

const Screen = createStackNavigator();

export function Screens() {
  return (
    <Screen.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen.Screen name="Tabs" component={Tabs} />
      <Screen.Screen name="Driver" component={Driver} />
      <Screen.Screen name="Freight" component={Freight} />
      <Screen.Screen name="Vehicle" component={Vehicle} />
      <Screen.Screen name="Transporter" component={Transporter} />
    </Screen.Navigator>
  );
}
