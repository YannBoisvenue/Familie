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
import CreateProfile from "../components/createProfile";
import { View, Text } from "native-base";
import { fetchUrl } from "../fetchUrl";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import moment from "moment";
// import console = require("console");

/*************Not supposed to be here - need proper navigation *******/

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      event: {}
    };
    fetch(`${fetchUrl}/event/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        // console.log("what do I receive", res);
        this.setState({ event: res.result });
      });
  }

  render() {
    console.log("dans le render de event");
    return (
      <View>
        <Text>
          {/**Image */}
          {/* {this.state.event.guests} will need an endpoint that will give the user depending on his id, map every id to show every attending guests*/}
          {this.state.event.name}
          {this.state.event.desc}
          {this.state.event.location}
          {moment(this.state.event.time).format("MMM Do YYYY, h:mm a")}
        </Text>
      </View>
    );
  }
}

/******************** As I said, proper navigation **********/

/************* Same here, I'm just being lazy *******/

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      profile: {}
    };
    fetch(`${fetchUrl}/profile/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        console.log("what do I receive", res);
        this.setState({ profile: res.result });
      });
  }

  render() {
    console.log("dans le render de profile");
    return (
      <View>
        <Text>
          {/**Image */}
          {this.state.profile.firstname}
        </Text>
      </View>
    );
  }
}

/******************** As I said, proper navigation **********/

const AuthenticationNavigator = createStackNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  LoginScreen: LoginScreen,
  SignupScreen: signup
});

const AppNavigator = createStackNavigator({
  HostingEvent: HostingScreen,
  AddEvent: addEventForm,
  Login: login,
  // CreateProfile: CreateProfile
  Event,
  Profile
});

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Authenticated: AuthenticationNavigator,
      Main: MainTabNavigator,
      AppNavigator
    },
    {
      initialRouteName: "Authenticated"
    }
  )
);
