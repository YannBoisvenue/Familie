import React from "react";
import { YellowBox } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import { createStore } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import AppNavigator from "./navigation/AppNavigator";
import getTheme from "./native-base-theme/components";
import custom from "./native-base-theme/variables/custom";
import { StyleProvider, Root } from "native-base";
import StyledHeader from "./components/mainHeader/header";

let store = createStore(rootReducer, devToolsEnhancer());
YellowBox.ignoreWarnings([
  "Remote debugger",
  "ReferenceError",
  "SyntaxError",
  "bind()"
]);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    userId: ""
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
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
            <Root>
              <StyledHeader />
              <AppNavigator />
            </Root>
          </Provider>
        </StyleProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/12496_transparent.png")]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
