import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Item,
  Input,
  Picker,
  Icon,
  DatePicker,
  Card,
  Content,
  View,
  Text,
  Button,
  ActionSheet
} from "native-base";
import { StyledButton } from "../../StyledComponents/button.js";
import { ImagePicker, Permissions } from "expo";
import { fetchUrl } from "../../fetchUrl";
import { StyledForm } from "../../StyledComponents/form.js";
import { StyledSubHeader } from "../../StyledComponents/textSubHeader.js";
import Colors from "../../constants/Colors";
import { StyledLink } from "../../StyledComponents/link.js";
import { StyledItem } from "../../StyledComponents/formItem.js";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      picture: {},
      pictureType: "",
      gender: "",
      relationshipStatus: "",
      occupation: "",
      dateOfBirth: "",
      location: "",
      hasPicture: false
      // interests: [""]
    };

    // this.autocompleteInput = React.createRef();
    // this.autocomplete = null;
  }

  static navigationOptions = {
    header: null
  };

  handleFirstNameInput = firstName => {
    this.setState({ firstName });
  };

  handleLastNameInput = lastName => {
    this.setState({ lastName });
  };

  pickPicture = () => {
    this.getPicture(Permissions.CAMERA_ROLL);
  };

  takePicture = () => {
    this.getPicture(Permissions.CAMERA);
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
      console.log(filename);
      let type = "image/png";
      if (!result.cancelled) {
        this.setState({
          picture: { uri, filename, type },
          hasPicture: true
        });
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

  onNextCreateProfilePress = event => {
    event.preventDefault();
    console.log("this.state.picture", this.state.picture);
    console.log("userId", this.props.user);

    const h = {};
    let formData = new FormData();
    formData.append("userId", this.props.userId),
      formData.append("profilePicture", {
        uri: this.state.picture.uri,
        name: this.state.picture.filename,
        type: this.state.picture.type
      }),
      formData.append("firstName", this.state.firstName),
      formData.append("lastName", this.state.lastName),
      formData.append("gender", this.state.gender),
      formData.append("relationshipStatus", this.state.relationshipStatus),
      formData.append("occupation", this.state.occupation),
      formData.append("dateOfBirth", this.state.dateOfBirth),
      formData.append("location", this.state.location);
    // formData.append("interests", this.state.interests)

    h["content-type"] = "multipart/form-data";
    fetch(fetchUrl + "/addProfile", {
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
        this.props.navigation.navigate("CreateFamily");
      });
  };

  render() {
    let picture = this.state.picture.uri;
    let pictureType = this.state.picture.type;
    const BUTTONS = ["From your library", "Take a picture", "Cancel"];
    const CANCEL_INDEX = 2;

    return (
      <Container>
        <StyledSubHeader
          {...this.props}
          title="Step 1 - Create your profile"
          linkText=""
          onPress={null}
          color={Colors.desire}
          textColor="#fff"
        />
        <Content style={{ padding: 15, backgroundColor: "#fff" }}>
          <View style={{ flexDirection: "row" }}>
            {this.state.hasPicture ? (
              <View style={{ flex: 1 }}>
                {/* {!!picture && pictureType === Permissions.CAMERA_ROLL && ( */}
                <View>
                  <Image
                    source={{ uri: picture }}
                    style={{
                      width: 100,
                      height: 100,
                      marginLeft: 20,
                      marginBottom: 20,
                      marginTop: 25,
                      borderRadius: 5
                    }}
                  />
                </View>
                {/* )} */}
                {/* {!!picture && pictureType === Permissions.CAMERA && (
                    <Image
                      source={{ uri: `${picture}` }}
                      style={{ width: 100, height: 100 }}
                    />
                  )} */}
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <Button
                  transparent
                  style={{
                    textColor: Colors.queenBlue,
                    marginBottom: 50,
                    marginTop: 50
                  }}
                  onPress={() => {
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: "Take a picture"
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
                content="Upload a picture"
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
            <StyledItem type="inlineLabel" label="First name">
              <Input
                autoCapitalize="words"
                onChangeText={this.handleFirstNameInput}
                value={this.state.firstName}
              />
            </StyledItem>
            <StyledItem type="inlineLabel" label="Last name">
              <Input
                autoCapitalize="words"
                onChangeText={this.handleLastNameInput}
                value={this.state.lastName}
              />
            </StyledItem>
            <StyledItem type="inlineLabel" label="I'm a">
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
            </StyledItem>
            <Text style={styles.title}>About you</Text>
            <StyledItem type="inlineLabel" label="Relationship status">
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
            </StyledItem>
            <StyledItem type="inlineLabel" label="Occupation">
              <Input
                onChangeText={this.handleOccupationInput}
                value={this.state.occupation}
              />
            </StyledItem>
            <StyledItem type="inlineLabel" label="Date of birth">
              <DatePicker
                defaultDate={new Date(1985, 1, 1)}
                minimumDate={new Date(1900, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: Colors.queenBlue }}
                placeHolderTextStyle={{
                  color: Colors.darkGunmetal,
                  opacity: 0.75
                }}
                onDateChange={this.setBirthDate}
                disabled={false}
              />
              <Text>{this.state.dateOfBirth.toString().substr(4, 12)}</Text>
            </StyledItem>
            <StyledItem type="inlineLabel" label="Location">
              <Input
                onChangeText={this.handleLocationInput}
                value={this.state.location}
              />
            </StyledItem>
            {/* <FormItem>
                <Label>Interests</Label>
                <Input placeHolderText="To be added" />
              </FormItem> */}
            <StyledButton
              content="Next"
              onPress={this.onNextCreateProfilePress}
              color={Colors.queenBlue}
            />
          </StyledForm>
          <View style={{ backgroundColor: "transparent", height: 50 }} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    marginBottom: 8,
    textAlign: "left",
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.darkGunmetal
  }
});

// CreateProfile.name

export default connect(function(state) {
  console.log("state bacon", state);
  return { userId: state.user.userId };
})(CreateProfile);
