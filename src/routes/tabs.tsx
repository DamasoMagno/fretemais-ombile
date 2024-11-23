import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Freights } from "../screens/freights";
import { Package, Truck, Users } from "lucide-react-native";
import { Drivers } from "../screens/drivers";
import { Transporters } from "../screens/transporters";
import { Vehicles } from "../screens/vehicles";

const Tab = createBottomTabNavigator();

export function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarStyle: {
            backgroundColor: '#FFFAEB',
        },
    }}
    >
      <Tab.Screen
        name="Freights"
        component={Freights}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return <Package color={color} size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Drivers"
        component={Drivers}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return <Users color={color} size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Transporters"
        component={Transporters}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return <Package color={color} size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Vehicles"
        component={Vehicles}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            return <Truck color={color} size={20} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
