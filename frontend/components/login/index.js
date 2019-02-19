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
import { LOGIN_SUCCESS } from "../../constants/ActionTypes";
import { StyledButton } from "../../StyledComponents/button.js";
import Colors from "../../constants/Colors";
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
    event.preventDefault();
    let requestBody = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: requestBody
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (!body.success) {
          Toast.show({
            text: "Wrong password",
            buttonText: "Okay"
          });
          return;
        }
        this.props.dispatch({
          type: LOGIN_SUCCESS
        });
      });
  };

  render() {
    //if (this.props.loginStatus) {
    //     return <HomePage></HomePage>
    // }
    return (
      <Root>
        <Container>
          <Title>Login</Title>
          <Form>
            <FormItem floatingLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                onChangeText={username => this.setState({ username })}
              />
            </FormItem>
            <FormItem floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={this.userLoggingIn}
              />
            </FormItem>
            <StyledButton
              onPress={this.onLoginPress}
              content="Login"
              disabled={
                this.state.userLoggingIn ||
                !this.state.username ||
                !this.state.password
              }
              color={Colors.queenBlue}
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
          </Form>
          <Card>
            <CardItem footer>
              <Text onPress={() => this.props.navigation.navigate("Signup")}>
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
