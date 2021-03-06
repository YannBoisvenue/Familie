import React, { Component } from "react";
import { Image } from "react-native";
import {
  View,
  Content,
  Text,
  Input,
  Picker,
  Icon,
  DatePicker,
  Card,
  Button,
  ActionSheet
} from "native-base";
import { ImagePicker, Permissions } from "expo";
import { StyledForm } from "../../StyledComponents/form.js";
import { StyledItem } from "../../StyledComponents/formItem.js";
import { StyledLink } from "../../StyledComponents/link";
import Colors from "../../constants/Colors";

class SingleKid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kidFirstName: "",
      kidGender: "",
      kidDateOfBirth: "",
      kidPicture: {},
      hasPicture: false
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
    const asyncType = await type;

    if (status === "granted") {
      const options = { allowsEditing: true, aspect: [4, 3] };
      let result = null;
      if (asyncType === Permissions.CAMERA_ROLL) {
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        result = await ImagePicker.launchCameraAsync(options);
      }
      let uri = result.uri;
      let filename = uri.split("/").pop();
      let type = "image/png";
      if (!result.cancelled) {
        this.setState({
          kidPicture: { uri, filename, type },
          hasPicture: true
        });
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
    let kidPicture = this.state.kidPicture.uri;
    const BUTTONS = ["From your library", "Take a picture", "Cancel"];
    const CANCEL_INDEX = 2;

    return (
      <Content
        style={{
          marginTop: 10
        }}
      >
        <Card
          style={{
            paddingTop: 10,
            paddingLeft: 5,
            paddingRight: 5
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {this.state.hasPicture ? (
              <View style={{ flex: 1 }}>
                <View>
                  <Image
                    source={{ uri: kidPicture }}
                    style={{
                      width: 100,
                      height: 100,
                      marginLeft: 20,
                      marginBottom: 5,
                      marginTop: 25,
                      borderRadius: 5
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <Button
                  transparent
                  style={{
                    textColor: Colors.queenBlue,
                    marginBottom: 35,
                    marginTop: 50
                  }}
                  onPress={() => {
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Kid's picture"
                      },
                      buttonIndex => {
                        if (buttonIndex === 0) {
                          this.getPicture(Permissions.CAMERA_ROLL);
                        } else if (buttonIndex === 1) {
                          this.takePicture();
                        }
                      }
                    );
                  }}
                >
                  <Icon
                    style={{
                      color: Colors.queenBlue,
                      fontSize: 40,
                      borderRadius: 5,
                      paddingTop: 28,
                      paddingLeft: 28,
                      borderColor: Colors.darkGunmetal,
                      borderWidth: 1,
                      width: 100,
                      height: 100,
                      justifyContent: "flex-start"
                    }}
                    type="AntDesign"
                    name="camera"
                  />
                </Button>
              </View>
            )}
            <View
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <StyledLink
                fontSize={20}
                content="Upload picture"
                onPress={() => {
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Take a picture"
                    },
                    buttonIndex => {
                      if (buttonIndex === 0) {
                        this.pickPicture();
                      } else if (buttonIndex === 1) {
                        this.takePicture();
                      }
                    }
                  );
                }}
              />
            </View>
          </View>
          <StyledForm>
            <StyledItem type="inlineLabel" label="Kid's first name">
              <Input
                autoCapitalize="words"
                onChangeText={this.handleKidNameInput}
                value={this.state.kidFirstName}
              />
            </StyledItem>
            <StyledItem type="inlineLabel" label="Select gender">
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
            </StyledItem>
            <StyledItem type="inlineLabel" label="Date of birth">
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
            </StyledItem>
          </StyledForm>
        </Card>
      </Content>
    );
  }
}

export default SingleKid;
