import React from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";
import Login from "../components/login";
import Colors from "../constants/Colors.js";
import { connect } from "react-redux";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container style={styles.container}>
        <Login {...this.props} />
      </Container>
    );
  }
}

const ConnectedLoginScreen = connect()(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.antiFlashWhite
  }
});

export default ConnectedLoginScreen;
