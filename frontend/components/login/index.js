import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Text,
  Input,
  Card,
  CardItem,
  Toast,
  Root
} from "native-base";
import { AsyncStorage } from "react-native";
import { LOGIN_SUCCESS, SET_USERID } from "../../constants/ActionTypes";
import { StyledButton } from "../../StyledComponents/button.js";
import Colors from "../../constants/Colors";
import { StyledForm } from "../../StyledComponents/form";
import { StyledItem } from "../../StyledComponents/formItem";
import { fetchUrl } from "../../fetchUrl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userLoggingIn: false,
      showToast: false
    };
  }

  static navigationOptions = {
    header: null
  };

  userLoggingIn = () => {
    this.setState({ userLoggingIn: true });
  };

  onLoginPress = event => {
    event.preventDefault();
    let requestBody = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });
    fetch(fetchUrl + "/login", {
      method: "POST",
      body: requestBody
    })
      .then(function(x) {
        return x.text();
      })
      .then(async responseBody => {
        let body = JSON.parse(responseBody);
        if (!body.success) {
          Toast.show({
            text: "Wrong password",
            buttonText: "Okay"
          });
          return;
        }
        await AsyncStorage.setItem("userId", body.user.userId);
        this.props.dispatch({
          type: LOGIN_SUCCESS
        });
        this.props.dispatch({
          type: SET_USERID,
          payload: body.user.userId
        });
        this.props.navigation.navigate("Events");
      });
  };

  render() {
    const { navigation } = this.props;

    return (
      <Root>
        <Container>
          <StyledForm>
            <StyledItem type="floatingLabel" label="Email">
              <Input
                autoCapitalize="none"
                onChangeText={username => this.setState({ username })}
              />
            </StyledItem>
            <StyledItem type="floatingLabel" label="Password">
              <Input
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={this.userLoggingIn}
              />
            </StyledItem>
            <StyledButton
              onPress={this.onLoginPress}
              content="Login"
              disabled={!this.state.username || !this.state.password}
              color={Colors.desire}
            />
          </StyledForm>
          <Card
            noShadow
            style={{
              borderColor: "transparent",
              backgroundColor: "#fff"
            }}
          >
            <CardItem
              style={{
                borderColor: "transparent",
                backgroundColor: "#fff"
              }}
              footer
            >
              <Text onPress={() => navigation.navigate("SignupScreen")}>
                Don't have an account? Sign up
              </Text>
            </CardItem>
          </Card>
        </Container>
      </Root>
    );
  }
}

export default connect(function(state) {
  return { loginStatus: state.loggedIn };
})(Login);
