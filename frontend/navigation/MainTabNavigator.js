import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import Login from "../components/login/index.js";
import Map from "../components/map/index.js";
import AddEventForm from "../components/addEventForm/addEventForm";
import Signup from "../components/signup";
import StyleScreen from "../screens/StyleScreen";
import Colors from "../constants/Colors";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type="AntDesign"
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "calendar"}`
          : "calendar"
      }
    />
  )
};

const StyleStack = createStackNavigator({
  Links: StyleScreen
});

StyleStack.navigationOptions = {
  tabBarLabel: "Style Test",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type="AntDesign"
      name={Platform.OS === "ios" ? "calendar" : "calendar"}
    />
  )
};

const LoginStack = createStackNavigator({
  Login: Login
});

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type="Feather"
      name={Platform.OS === "ios" ? "users" : "users"}
    />
  )
};

const SignupStack = createStackNavigator({
  Signup: Signup
});

SignupStack.navigationOptions = {
  tabBarLabel: "Signup",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type="Feather"
      name={Platform.OS === "ios" ? "user" : "user"}
    />
  )
};

const MapStack = createStackNavigator({
  Map: Map
});

MapStack.navigationOptions = {
  tabBarLabel: "MapTest",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type="MaterialIcons"
      name={
        Platform.OS === "ios" ? "chat-bubble-outline" : "chat-bubble-outline"
      }
    />
  )
};

const AddEventFormStack = createStackNavigator({
  AddEventForm: AddEventForm
});

AddEventFormStack.navigationOptions = {
  tabBarLabel: "AddEventForm",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      type="Feather"
      name={Platform.OS === "ios" ? "user" : "user"}
    />
  )
};

export default createBottomTabNavigator(
  {
    StyleStack,
    LoginStack,
    MapStack,
    AddEventFormStack
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.desire
    }
  }
);
