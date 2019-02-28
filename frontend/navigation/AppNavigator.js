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
import HostingScreen from "../screens/HostingScreen";
import LoginScreen from "../screens/LoginScreen";
import DisplayEvent from "../components/displayEvent";
import CreateProfile from "../components/createProfile";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import AttendingScreen from "../screens/AttendingScreen";
import createProfileAddFamily from "../components/createProfileAddFamily";
import OtherProfile from "../components/otherProfile";
import ProfileScreen from "../screens/allProfilesScreen";

const AuthenticationNavigator = createStackNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  LoginScreen: LoginScreen,
  SignupScreen: signup
});

const CreateAccount = createStackNavigator({
  CreateProfileStep1: CreateProfile,
  CreateFamily: createProfileAddFamily
});

const AppNavigator = createStackNavigator({
  HostingEvent: HostingScreen,
  AttendingEvent: AttendingScreen,
  AddEvent: addEventForm,
  Login: login,
  DisplayEvent: DisplayEvent,
  OtherProfile: OtherProfile,
  ProfileScreen: ProfileScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Authenticated: AuthenticationNavigator,
      Profile: CreateAccount,
      Main: MainTabNavigator,
      AppNavigator
    },
    {
      initialRouteName: "Authenticated"
    }
  )
);
