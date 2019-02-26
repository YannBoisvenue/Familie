import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
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
  DatePicker
} from "native-base";
import { StyledButton } from "../../StyledComponents/button.js";
import { ImagePicker, Permissions } from "expo";

class SingleKid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kidFirstName: "",
      kidGender: "",
      kidDateOfBirth: "",
      kidPicture: "",
      kidPictureType: ""
    };
  }

  componentDidMount = () => {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  };

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleKidNameInput = kidFirstName => {
    this.setState({ kidFirstName });
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
        this.setState({ kidPicture: result.uri, kidPictureType: type });
      }
    }
  };

  pickPicture = async () => {
    this.getPicture(Permissions.CAMERA_ROLL);
  };

  takePicture = async () => {
    this.getPicture(Permissions.CAMERA);
  };

  onValueChangeKidGender = kidGender => {
    this.setState({ kidGender });
  };

  setKidBirthDate = kidDateOfBirth => {
    this.setState({ kidDateOfBirth });
  };

  render() {
    let kidPicture = this.state.kidPicture;
    let kidPictureType = this.state.kidPictureType;

    return (
      <Container>
        <Form>
          <FormItem floatingLabel>
            <Label>Kid's first name</Label>
            <Input
              autoCapitalize="words"
              onChangeText={this.handleKidNameInput}
              value={this.state.kidFirstName}
            />
          </FormItem>
          <FormItem>
            <StyledButton
              content="Pick a picture from camera roll"
              onPress={this.pickPicture}
            />
            {!!kidPicture && kidPictureType === Permissions.CAMERA_ROLL && (
              <Image
                source={{ uri: kidPicture }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </FormItem>
          <FormItem>
            <StyledButton content="Take a picture" onPress={this.takePicture} />
            {!!kidPicture && kidPictureType === Permissions.CAMERA && (
              <Image
                source={{ uri: kidPicture }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </FormItem>
          <FormItem>
            <Label>Select gender</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Boy or Girl"
              selectedValue={this.state.kidGender}
              onValueChange={this.onValueChangeKidGender}
            >
              <Picker.Item label="Boy" value="boy" />
              <Picker.Item label="Girl" value="girl" />
            </Picker>
          </FormItem>
          <FormItem>
            <Label>Date of birth</Label>
            <DatePicker
              defaultDate={new Date(2010, 1, 1)}
              minimumDate={new Date(1900, 1, 1)}
              maximumDate={new Date(2019, 12, 31)}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              onDateChange={this.setKidBirthDate}
              disabled={false}
            />
            <Text>{this.state.kidDateOfBirth.toString().substr(4, 12)}</Text>
          </FormItem>
        </Form>
      </Container>
    );
  }
}

export default SingleKid;
