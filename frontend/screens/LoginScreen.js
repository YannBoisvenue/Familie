import React from "react";
import { StyleSheet, Image } from "react-native";
import { Container, Footer, Text } from "native-base";
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
        <Image
          source={require("../assets/images/12496_transparent.png")}
          style={{ width: null, flex: 1, marginTop: 30, paddingBottom: 0 }}
        />
        <Login {...this.props} />
        <Footer style={{ backgroundColor: "fff", height: 20 }}>
          <Text
            style={{ color: Colors.tabIconDefault, fontSize: 10 }}
            onPress={() =>
              LinkingIOS.openURL(
                "https://www.freepik.com/free-photos-vectors/people"
              )
            }
          >
            People vector created by macrovector - www.freepik.com
          </Text>
        </Footer>
      </Container>
    );
  }
}

const ConnectedLoginScreen = connect()(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 20
  }
});

export default ConnectedLoginScreen;
