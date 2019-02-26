import React from "react";
import { connect } from "react-redux";
import { View, AsyncStorage } from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import { StyledHeader } from "../components/mainHeader/header";
import { Text } from "native-base";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let userId = await AsyncStorage.getItem("userId");
    // WE NEED TO ADD A CONDITION HERE WHEN WE ARE DONE!!!!!!!
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

let ConnectedAuthScreen = connect(state => {
  return { profileComplete: state.user.profileComplete };
})(AuthLoadingScreen);

export default ConnectedAuthScreen;
