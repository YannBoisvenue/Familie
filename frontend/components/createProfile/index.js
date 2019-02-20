import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  Root,
  Picker,
  Icon,
  DatePicker,
  Content
} from 'native-base';
import { StyledButton } from '../../StyledComponents/button.js';
import { ImagePicker, Permissions } from 'expo';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      cameraRollPicture: '',
      newTakenPicture: '',
      gender: undefined,
      relationshipStatus: undefined,
      occupation: '',
      dateOfBirth: new Date(),
      location: '',
      interests: []
      //   userID: ''
    };
  }

  handleFirstNameInput = firstName => {
    this.setState({ firstName });
  };

  handleLastNameInput = lastName => {
    this.setState({ lastName });
  };

  pickPicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (!result.cancelled) {
        this.setState({ cameraRollPicture: '' + result.uri });
      }
    }
  };

  takePicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (!result.cancelled) {
        this.setState({ newTakenPicture: result.uri });
      }
    }
  };

  onValueChangeGender = gender => {
    this.setState({ gender });
  };

  onValueChangeRelationshipStatus = relationshipStatus => {
    this.setState({ relationshipStatus });
  };

  handleOccupationInput = occupation => {
    this.setState({ occupation });
  };

  setBirthDate = dateOfBirth => {
    this.setState({ dateOfBirth });
  };

  handleLocationInput = location => {
    this.setState({ location });
  };

  render() {
    let cameraRollPicture = this.state.cameraRollPicture;
    let newTakenPicture = this.state.newTakenPicture;

    return (
      <Root>
        <Container>
          <Header>
            <Body>
              <Title>The Social Family</Title>
            </Body>
          </Header>
          <Title>Create your profile</Title>
          <Content>
            <Form>
              <FormItem floatingLabel>
                <Label>First name</Label>
                <Input
                  autoCapitalize="words"
                  onChangeText={this.handleFirstNameInput}
                  value={this.state.firstName}
                />
              </FormItem>
              <FormItem floatingLabel>
                <Label>Last name</Label>
                <Input
                  autoCapitalize="words"
                  onChangeText={this.handleLastNameInput}
                  value={this.state.lastName}
                />
              </FormItem>
              <FormItem>
                <StyledButton
                  content="Pick a picture from camera roll"
                  onPress={this.pickPicture}
                />
                {!!cameraRollPicture && (
                  <Image
                    source={{ uri: cameraRollPicture }}
                    style={{ width: 100, height: 100 }}
                  />
                )}
              </FormItem>
              <FormItem>
                <StyledButton
                  content="Take a picture"
                  onPress={this.takePicture}
                />
                {!!newTakenPicture && (
                  <Image
                    source={{ uri: newTakenPicture }}
                    style={{ width: 100, height: 100 }}
                  />
                )}
              </FormItem>
              <FormItem>
                <Label>I'm a</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Dad or Mom"
                  selectedValue={this.state.gender}
                  onValueChange={this.onValueChangeGender}
                >
                  <Picker.Item label="Dad" value="key0" />
                  <Picker.Item label="Mom" value="key1" />
                </Picker>
              </FormItem>
              <Title>About you</Title>
              <FormItem>
                <Label>Relationship status</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select"
                  selectedValue={this.state.relationshipStatus}
                  onValueChange={this.onValueChangeRelationshipStatus}
                >
                  <Picker.Item label="Single" value="key0" />
                  <Picker.Item label="In a relationship" value="key1" />
                </Picker>
              </FormItem>
              <FormItem floatingLabel>
                <Label>Occupation</Label>
                <Input
                  onChangeText={this.handleOccupationInput}
                  value={this.state.occupation}
                />
              </FormItem>
              <FormItem>
                <Label>Date of birth</Label>
                <DatePicker
                  defaultDate={new Date(1985, 1, 1)}
                  minimumDate={new Date(1900, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  onDateChange={this.setBirthDate}
                  disabled={false}
                />
                <Text>{this.state.dateOfBirth.toString().substr(4, 12)}</Text>
              </FormItem>
              <FormItem floatingLabel>
                <Label>Location</Label>
                <Input
                  onChangeText={this.handleLocationInput}
                  value={this.state.location}
                />
              </FormItem>
              <FormItem>
                <Label>Interests</Label>
                <Input placeHolderText="To be added" />
              </FormItem>
            </Form>
          </Content>
        </Container>
      </Root>
    );
  }
}

// CreateProfile.name

export default connect(function(state) {
  return {};
})(CreateProfile);
