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

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

  onLoginPress = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      let requestBody = {
        username: this.state.username,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
      fetch('http://localhost:4000/signup', {
        method: 'POST',
        body: requestBody
      })
        .then(function(x) {
          x.text();
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
    } else {
      return;
      //passwords do not match
    }
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
        <Title>Sign up</Title>
        <Form>
          <FormItem floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={username => this.setState({ username })} />
          </FormItem>
          <FormItem floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </FormItem>
          <FormItem floatingLabel last>
            <Label>Confirm password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
              onSubmitEditing={this.userLoggingIn}
            />
          </FormItem>
          <Button
            full
            primary
            style={{ paddingBottom: 4 }}
            onPress={this.props.onSignupPress}
            disabled={
              this.state.isLoggingIn ||
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
            <Text>Go back to login</Text>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

export default connect(function(state) {
  return { loginStatus: state.loggedIn };
})(Signup);
