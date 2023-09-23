import * as React from "react";
import {
  LinkingContext,
  NavigationContainer,
  useLinkTo,
} from "@react-navigation/native";
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ButtonNew from "./src/components/buttonNew";
import Pessoas from "./screens/Pessoas";
import Escolas from "./screens/Escolas";
import Home from "./screens/Home";
import Faculdades from "./screens/Faculdades";
import Feedback from "./screens/Feedback";
import Login from "./screens/Login";

const Tab = createBottomTabNavigator();

export default function Inicial(props) {
  return (
      <Tab.Navigator>
        <Tab.Screen
          name="Pessoas"
          component={Pessoas}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="people-sharp" size={24} color="green" />
            ),
          }}
        />
        <Tab.Screen
          name="Escolas"
          component={Escolas}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome5 name="school" size={24} color="red" />
            ),
          }}
        />
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ size, color }) => (
              <ButtonNew size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Faculdades"
          component={Faculdades}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="school" size={24} color="blue" />
            ),
          }}
        />
        <Tab.Screen
          name="Feedbacks"
          component={Feedback}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="feedback" size={24} color="#FFD700" />
            ),
          }}
        />
      </Tab.Navigator>
  );
}
