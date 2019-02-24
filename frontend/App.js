import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import {
  AppLoading,
  Asset,
  Font,
  Icon,
  Constants,
  Location,
  Permissions
} from "expo";
import { createStore } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import { Provider } from "react-redux";
import { MapView } from "expo";
import Login from "./components/login";
import Signup from "./components/signup";
import rootReducer from "./reducers";
import AppNavigator from "./navigation/AppNavigator";
import Map from "./components/map/index";
import getTheme from "./native-base-theme/components";
import custom from "./native-base-theme/variables/custom";
import { StyleProvider } from "native-base";
import StyledHeader from "./components/mainHeader/header";
import GetLocation from "./components/GetLocation/GetLocation";
import AllEvent from "../frontend/components/AllEvents/AllEvents";
import Colors from "../frontend/constants/Colors";
import LoginScreen from "./screens/LoginScreen";
import MainTabNavigator from "./navigation/MainTabNavigator";

let store = createStore(rootReducer, devToolsEnhancer());

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    userId: ""
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false, userId: userId });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <StyleProvider style={getTheme(custom)}>
          <Provider store={store}>
            <StyledHeader />
            <AppNavigator />
          </Provider>
        </StyleProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/12496_transparent.png")]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.antiFlashWhite
  }
});
