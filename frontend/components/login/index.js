import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  View,
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
import { navigation } from "react-navigation";
// import firebase from '../login/loginGoogle.js';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes
// } from 'react-native-google-signin';

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
    console.log("this is going to work, damn it!");
    event.preventDefault();
    let requestBody = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });
    console.log("request body ", requestBody);
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
    //if (this.props.loginStatus) {
    //     return <HomePage></HomePage>
    // }
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
            {/* <Button full light primary>
            <Text> Sign Up </Text>
          </Button> */}
            {/* <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress}
          /> */}
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
