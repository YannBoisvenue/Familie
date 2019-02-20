import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import {
  AppLoading,
  Asset,
  Font,
  Icon,
  Constants,
  Location,
  Permissions
} from "expo";

import { connect } from "react-redux";

class GetLocation extends Component {
  async UNSAFE_componentWillMount() {
    console.log("in willmount");
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
    /******************* */
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    console.log("in check permission");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    this.getUpdateLocationAsync();
  };

  //RACHORE: AU lieu de setstate, dispatch vers le radux
  getUpdateLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest
    });
    this.props.dispatch({ type: "get_location", payload: location });
  };

  render() {
    console.log("in render");
    return <View />;
  }
}

const mapStateToProps = state => {
  return { mapLoc: state.location }; //maploc = moi qui decide le nom. => .location, faut ca match le nom dans le state global (dans le reducer, voir *k1)
};

export default connect(mapStateToProps)(GetLocation);
