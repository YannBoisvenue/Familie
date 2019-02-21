import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import addEventForm from "../components/addEventForm/addEventForm";
import signup from "../components/signup";
import login from "../components/login";
import { HostingScreen } from "../screens/HostingScreen";

const AppNavigator = createStackNavigator({
  HostingEvent: HostingScreen,
  AddEvent: addEventForm,
  Signup: signup,
  Login: login
});

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    AppNavigator
  })
);
