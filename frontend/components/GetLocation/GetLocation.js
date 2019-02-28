import React, { Component } from "react";
import { Platform, View } from "react-native";
import { Font, Constants, Location, Permissions } from "expo";

import { connect } from "react-redux";

class GetLocation extends Component {
  async UNSAFE_componentWillMount() {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
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
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    this.getUpdateLocationAsync();
  };

  getUpdateLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest
    });
    this.props.dispatch({ type: "get_location", payload: location });
  };

  render() {
    return <View />;
  }
}

const mapStateToProps = state => {
  return { mapLoc: state.location };
};

export default connect(mapStateToProps)(GetLocation);
