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
import CreateProfile from "../components/createProfile";
import { View, Text } from "native-base";

/*************Not supposed to be here - need proper navigation *******/

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      event: {}
    };
    fetch(`http://68.183.200.44:4000/event/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        // console.log("what do I receive", res);
        this.setState({ event: res.result });
      });
  }

  render() {
    return (
      <View>
        <Text>
          {/* {this.state.id} */}
          {this.state.event.name}
          {this.state.event.desc}
        </Text>
      </View>
    );
  }
}

/********************As I said, proper navigation **********/

const AppNavigator = createStackNavigator({
  HostingEvent: HostingScreen,
  AddEvent: addEventForm,
  Signup: signup,
  Login: login,
  // CreateProfile: CreateProfile
  Event
});

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    AppNavigator
  })
);
