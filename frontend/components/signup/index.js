import React, { Component } from 'react';
import { connect } from 'react-redux';
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
} from 'native-base';
import { LOGIN_SUCCESS } from '../../constants/ActionTypes';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      userSigningUp: false,
      showToast: false
    };
  }

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
    console.log('SIGNUP BUTTON PRESSED');
    if (this.state.password === this.state.confirmPassword) {
      let requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });
      fetch('http://localhost:4000/signup', {
        method: 'POST',
        body: requestBody
      })
        .then(function(x) {
          return x.text();
        })
        .then(responseBody => {
          let body = JSON.parse(responseBody);
          console.log('parseBody', body);
          if (!body.success) {
            Toast.show({
              text: 'An account for this user already exists',
              buttonText: 'Okay'
            });
            return;
          }
          this.props.dispatch({
            type: LOGIN_SUCCESS
          });
          this.props.navigation.navigate('CreateProfile');
        });
    } else {
      Toast.show({
        text: 'Passwords do not match',
        buttonText: 'Okay'
      });
    }
  };

  render() {
    //if (this.props.loginStatus) {
    //     return <HomePage></HomePage>
    // }

    return (
      <Root>
        <Container>
          <Header>
            <Body>
              <Title>The Social Family</Title>
            </Body>
          </Header>
          <Title>Sign up</Title>
          <Form>
            <FormItem floatingLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                onChangeText={this.handleUsernameChange}
                value={this.state.username}
              />
            </FormItem>
            <FormItem floatingLabel last>
              <Label>Password</Label>
              <Input
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={this.handlePasswordChange}
                value={this.state.password}
              />
            </FormItem>
            <FormItem floatingLabel last>
              <Label>Confirm password</Label>
              <Input
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={this.handleConfirmPassword}
                value={this.state.confirmPassword}
                onSubmitEditing={this.userSigningUp}
              />
            </FormItem>
            <Button
              full
              primary
              style={{ paddingBottom: 4 }}
              onPress={this.onSignupPress}
              disabled={
                this.state.userSigningUp ||
                !this.state.username ||
                !this.state.password ||
                !this.state.confirmPassword
              }
            >
              <Text> Sign up </Text>
            </Button>
          </Form>
          <Card>
            <CardItem footer>
              <Text onPress={() => this.props.navigation.navigate('Login')}>
                Go back to login
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
})(Signup);
