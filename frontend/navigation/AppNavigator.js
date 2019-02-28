import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import { Image } from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import addEventForm from "../components/addEventForm/addEventForm";
import signup from "../components/signup";
import login from "../components/login";
import HostingScreen from "../screens/HostingScreen";
import LoginScreen from "../screens/LoginScreen";
import DisplayEvent from "../components/displayEvent";
import CreateProfile from "../components/createProfile";
import { View, Text } from "native-base";
import { fetchUrl } from "../fetchUrl";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import AttendingScreen from "../screens/AttendingScreen";
import createProfileAddFamily from "../components/createProfileAddFamily";

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      profile: {}
    };
  }
  componentDidMount() {
    console.log("in component did mount");
    fetch(`${fetchUrl}/profile/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        console.log("what do I receive", res);
        this.setState({ profile: res.result });
      });
  }

  render() {
    console.log("wattttttttttttttttttttttt");
    let pictureUri;
    if (this.state.profile.fileName !== undefined) {
      pictureUri = this.state.profile.fileName.split("/").pop();
      console.log("picture uri now equals to something");
    }
    console.log(`http://68.183.200.44:4000/${pictureUri}`);
    console.log("new consolelog");

    console.log("PROFILE", pictureUri);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
            fontWeight: "bold"
          }}
        >
          <Text>
            {this.state.profile.firstName} {this.state.profile.lastName}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Image
            style={{ height: 200, width: 200, marginLeft: 40 }}
            source={{
              uri: `http://68.183.200.44:4000/${pictureUri}`
            }}
          />
          <View style={{ marginRight: 50 }}>
            <Text>{this.state.profile.gender}</Text>
            <Text>{this.state.profile.relationshipStatus}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
            fontWeight: "bold"
          }}
        >
          <Text style={{ marginTop: -50 }}>My kids</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Image
            style={{ height: 150, width: 150, marginLeft: 40, marginTop: 0 }}
            source={{
              uri: `http://68.183.200.44:4000/${pictureUri}`
            }}
          />
          <View style={{ marginRight: 80 }}>
            <Text />
            <Text />
          </View>
        </View>
      </View>
    );
  }
}

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
  MyProfile
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
