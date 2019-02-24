import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import {
  Container,
  Item as FormItem,
  Input,
  Card,
  CardItem,
  Toast,
  Root,
  H1
} from "native-base";
import { LOGIN_SUCCESS } from "../../constants/ActionTypes";
import { StyledLink } from "../../StyledComponents/link";
import { fetchUrl } from "../../fetchUrl";
import { StyledForm } from "../../StyledComponents/form";
import { StyledButton } from "../../StyledComponents/button";
import Colors from "../../constants/Colors";
import { StyledItem } from "../../StyledComponents/formItem";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      userSigningUp: false,
      showToast: false
    };
  }

  static navigationOptions = {
    header: null
  };

  userSigningUp = () => {
    this.setState({ userSigningUp: true });
  };

  handleUsernameChange = username => {
    this.setState({ username });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleConfirmPassword = confirmPassword => {
    this.setState({ confirmPassword });
  };

  onSignupPress = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      let requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });
      fetch(fetchUrl + "/signup", {
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
              text: "An account for this user already exists",
              buttonText: "Okay"
            });
            return;
          }
          AsyncStorage.setItem("userId", body.user.userId);
          this.props.dispatch({
            type: LOGIN_SUCCESS
          });
          this.props.dispatch({
            type: SET_USERID,
            payload: body.user.userId
          });
          this.props.navigation.navigate("CreateProfile");
        });
    } else {
      Toast.show({
        text: "Passwords do not match",
        buttonText: "Okay"
      });
    }
  };

  render() {
    //if (this.props.loginStatus) {
    //     return <HomePage></HomePage>
    // }

    return (
      <Root>
        <Container style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <H1 style={styles.h1}>Start your Familie journey!</H1>
          <StyledForm>
            <StyledItem type="floatingLabel" label="Email">
              <Input
                autoCapitalize="none"
                onChangeText={this.handleUsernameChange}
                value={this.state.username}
              />
            </StyledItem>
            <StyledItem type="floatingLabel" label="Password">
              <Input
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={this.handlePasswordChange}
                value={this.state.password}
              />
            </StyledItem>
            <StyledItem type="floatingLabel" label="Confirm password">
              <Input
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={this.handleConfirmPassword}
                value={this.state.confirmPassword}
                onSubmitEditing={this.userSigningUp}
              />
            </StyledItem>
            <StyledButton
              content="Sign up"
              color={Colors.queenBlue}
              onPress={this.onSignupPress}
              disabled={
                this.state.userSigningUp ||
                !this.state.username ||
                !this.state.password ||
                !this.state.confirmPassword
              }
            />
          </StyledForm>
          <Card noShadow style={{ borderColor: "#fff" }}>
            <CardItem style={{ borderColor: "#fff" }} footer>
              <StyledLink
                content="Go back to login"
                onPress={() => this.props.navigation.goBack()}
              />
            </CardItem>
          </Card>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontWeight: "bold",
    color: Colors.desire,
    marginTop: 30
  }
});

export default connect(function(state) {
  return { loginStatus: state.loggedIn };
})(Signup);
