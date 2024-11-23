import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Freights } from "../screens/freights";
import { Package, Truck, Users } from "lucide-react-native";
import { Drivers } from "../screens/drivers";
import { Transporters } from "../screens/transporters";
import { Vehicles } from "../screens/vehicles";
import { Freight } from "../screens/freight";
import { Screens } from "./screens";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Screens />
  );
}
