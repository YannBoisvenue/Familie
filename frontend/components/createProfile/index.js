import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
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
} from "native-base";
import { StyledButton } from "../../StyledComponents/button.js";
import { ImagePicker, Permissions } from "expo";
import { fetchUrl } from "../../fetchUrl";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      picture: undefined,
      pictureType: "",
      gender: "",
      relationshipStatus: "",
      occupation: "",
      dateOfBirth: "",
      location: ""
      // interests: [""]
    };

    // this.autocompleteInput = React.createRef();
    // this.autocomplete = null;
  }

  handleFirstNameInput = firstName => {
    this.setState({ firstName });
  };

  handleLastNameInput = lastName => {
    this.setState({ lastName });
  };

  getPicture = async type => {
    const { status } = await Permissions.askAsync(type);

    if (status === "granted") {
      const options = { allowsEditing: true, aspect: [4, 3] };
      let result = null;
      if (type === Permissions.CAMERA_ROLL) {
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        result = await ImagePicker.launchCameraAsync(options);
      }

      if (!result.cancelled) {
        this.setState({ picture: result.uri, pictureType: type });
      }
    }
  };

  pickPicture = async () => {
    this.getPicture(Permissions.CAMERA_ROLL);
  };

  takePicture = async () => {
    this.getPicture(Permissions.CAMERA);
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

  onNextCreateProfilePress = event => {
    event.preventDefault();

    const h = {};
    let formData = new FormData();
    formData.append("userId", this.props.userId),
      formData.append("profilePicture", this.state.picture),
      formData.append("firstName", this.state.firstName),
      formData.append("lastName", this.state.lastName),
      formData.append("gender", this.state.gender),
      formData.append("relationshipStatus", this.state.relationshipStatus),
      formData.append("occupation", this.state.occupation),
      formData.append("dateOfBirth", this.state.dateOfBirth),
      formData.append("location", this.state.location);
    // formData.append("interests", this.state.interests)

    h.Accept = "application/json";

    fetch("http://68.183.200.44:4000/addProfile", {
      method: "POST",
      headers: h,
      body: formData
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (!body.success) {
          return;
        }
        this.props.navigation.navigate("CreateProfileAddFamily");
      });
  };

  render() {
    let picture = this.state.picture;
    let pictureType = this.state.pictureType;

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
                {!!picture && pictureType === Permissions.CAMERA_ROLL && (
                  <Image
                    source={{ uri: picture }}
                    style={{ width: 100, height: 100 }}
                  />
                )}
              </FormItem>
              <FormItem>
                <StyledButton
                  content="Take a picture"
                  onPress={this.takePicture}
                />
                {!!picture && pictureType === Permissions.CAMERA && (
                  <Image
                    source={{ uri: picture }}
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
                  <Picker.Item label="Dad" value="dad" />
                  <Picker.Item label="Mom" value="mom" />
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
                  <Picker.Item label="Single" value="single" />
                  <Picker.Item label="In a relationship" value="relationship" />
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
                  animationType={"fade"}
                  androidMode={"default"}
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
              {/* <FormItem>
                <Label>Interests</Label>
                <Input placeHolderText="To be added" />
              </FormItem> */}
              <StyledButton
                content="Next"
                onPress={this.onNextCreateProfilePress}
              />
            </Form>
          </Content>
        </Container>
      </Root>
    );
  }
}

// CreateProfile.name

export default connect(function(state) {
  return { userId: state.userId };
})(CreateProfile);
