import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Scheduler from "../components/Scheduler";
import NN from "../components/NN";
import Daily from "../components/Daily";
import Header from "../shared/header";
import Dashboard from "../components/Dashboard";
import About from "../components/About";

const Stack = createNativeStackNavigator();

const Drawer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="NN" component={NN} />
        <Stack.Screen name="Scheduler" component={Scheduler} />
        <Stack.Screen name="Daily" component={Daily} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Drawer;