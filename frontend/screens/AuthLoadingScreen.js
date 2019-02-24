import React from "react";
import { View, AsyncStorage } from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import { StyledHeader } from "../components/mainHeader/header";
import { Text } from "native-base";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let userId = await AsyncStorage.getItem("userId");
    if (userId) {
      this.props.navigation.navigate("Events");
    } else {
      this.props.navigation.navigate("LoginScreen");
    }
  };

  render() {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}
