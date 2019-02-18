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
  CardItem
} from 'native-base';
import { LOGIN_SUCCESS } from '../../constants/ActionTypes';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userLoggingIn: false
    };
  }

  userLoggingIn = () => {
    this.setState({ userLoggingIn: true });
  };

  onLoginPress = event => {
    event.preventDefault();
    let requestBody = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });
    fetch('http://localhost:4000/login', {
      method: 'POST',
      body: requestBody
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (!body.success) {
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
      <Container>
        <Header>
          <Body>
            <Title>The Social Family</Title>
          </Body>
        </Header>
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
          <Button
            full
            primary
            style={{ paddingBottom: 4 }}
            onPress={this.onLoginPress}
            disabled={
              this.state.userLoggingIn ||
              !this.state.username ||
              !this.state.password
            }
          >
            <Text> Login </Text>
          </Button>
          {/* <Button full light primary>
            <Text> Sign Up </Text>
          </Button> */}
        </Form>
        <Card>
          <CardItem footer>
            <Text>Don't have an account? Sign up</Text>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

export default connect(function(state) {
  return { loginStatus: state.loggedIn };
})(Login);
