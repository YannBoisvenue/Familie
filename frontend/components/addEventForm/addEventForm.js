import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import {
  Item,
  Container,
  Input,
  DatePicker,
  Textarea,
  ActionSheet,
  Icon,
  Card,
  Root
} from "native-base";
import { StyledButton } from "../../StyledComponents/button.js";
import Colors from "../../constants/Colors";
import Geocode from "react-geocode";
import { StyleSheet } from "react-native";
import { StyledSubHeader } from "../../StyledComponents/textSubHeader";
import { StyledContent } from "../../StyledComponents/mainContainer";
import { ScrollView } from "react-native-gesture-handler";
import { StyledForm } from "../../StyledComponents/form";
import { StyledItem } from "../../StyledComponents/formItem";
import { AsyncStorage } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { fetchUrl } from "../../fetchUrl";
import { StyledLink } from "../../StyledComponents/link";

class addEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: undefined,
      pictureType: "",
      time: new Date(),
      guests: undefined,
      name: "",
      location: "",
      desc: "",
      coordinate: { lat: 0, lng: 0 },
      hasPicture: false
    };
    this.setDate = this.setDate.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  setDate(newDate) {
    this.setState({ time: newDate });
  }

  /*****************BUTTON PRESS *********************/

  getSpag = () => {
    Geocode.setApiKey("AIzaSyAEV5dCEc0FdSkrJoz0o2KI-opfok_Rtr4");

    Geocode.fromAddress(this.state.location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ coordinate: { lat: lat, lng: lng } });
      },
      error => {
        console.error(error);
      }
    );
  };

  pickPicture = async () => {
    this.getPicture(Permissions.CAMERA_ROLL);
  };

  takePicture = async () => {
    this.getPicture(Permissions.CAMERA);
  };

  getPicture = async type => {
    const { status } = await Permissions.askAsync(type);
    let asyncType = await type;

    if (status === "granted") {
      const options = { allowsEditing: true, aspect: [4, 2] };
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
          picture: { uri, filename, type },
          pictureType: type,
          hasPicture: true
        });
      }
    }
  };

  onCreateEventPress = event => {
    this.getSpag();
    const { navigation } = this.props;

    AsyncStorage.getItem("userId").then(userId => {
      const h = {};
      let formData = new FormData();
      debugger;
      formData.append("userId", userId),
        formData.append("eventPicture", {
          uri: this.state.picture.uri,
          name: this.state.picture.filename,
          type: this.state.picture.type
        }),
        formData.append("name", this.state.name),
        formData.append("guests", [userId]),
        formData.append("time", this.state.time),
        formData.append("location", this.state.location),
        formData.append("desc", this.state.desc),
        formData.append("coordinate", this.state.coordinate);

      h["content-type"] = "multipart/form-data";

      fetch(fetchUrl + "/addevent", {
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
          this.props.navigation.navigate("Events");
        });
    });
  };

  render() {
    const BUTTONS = ["From camera roll", "Take a picture", "Cancel"];
    const CANCEL_INDEX = 2;

    return (
      <Root>
        <Container>
          <StyledSubHeader
            {...this.props}
            title="Add Event Form"
            linkText="Cancel"
            onPress={() => {
              this.props.navigation.navigate("Events");
            }}
          />
          <StyledContent>
            <Card
              noShadow
              style={{
                alignItems: "center",
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
            >
              {this.state.hasPicture ? (
                <Item>
                  <Image
                    source={{ uri: this.state.picture.uri }}
                    style={{ width: 350, height: 150 }}
                  />
                </Item>
              ) : (
                <Icon
                  style={{
                    fontSize: 40,
                    paddingTop: 55,
                    paddingLeft: 155,
                    borderColor: Colors.darkGunmetal,
                    borderWidth: 1,
                    width: 350,
                    height: 150
                  }}
                  type="AntDesign"
                  name="camera"
                />
              )}
            </Card>
            <StyledLink
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
            <StyledForm>
              <StyledItem type="inlineLabel" label="Event name">
                <Input
                  autoCapitalize="none"
                  onChangeText={name => this.setState({ name })}
                />
              </StyledItem>
              <StyledItem type="inlineLabel" label="Choose a date">
                <DatePicker
                  sytle={styles.datePicker}
                  defaultDate={new Date(2019, 1, 1)}
                  minimumDate={new Date(2018, 2, 20)}
                  maximumDate={new Date(2021, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select date"
                  textStyle={{ color: Colors.queenBlue }}
                  placeHolderTextStyle={{
                    color: Colors.darkGunmetal,
                    opacity: 0.75
                  }}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </StyledItem>
              <StyledItem type="inlineLabel" label="Address">
                <Input
                  autoCapitalize="none"
                  onChangeText={location => this.setState({ location })}
                />
              </StyledItem>
              <Item style={{ borderBottomColor: "transparent", marginLeft: 0 }}>
                <Textarea
                  style={{
                    height: 150,
                    width: 345,
                    borderColor: Colors.tabIconDefault
                  }}
                  rowSpan={5}
                  bordered
                  placeholder="Description of the event                                "
                  onChangeText={desc => this.setState({ desc })}
                />
              </Item>
            </StyledForm>
            <ScrollView>
              <StyledButton
                onPress={this.onCreateEventPress}
                content="Create Event"
                color={Colors.queenBlue}
              />
            </ScrollView>
          </StyledContent>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  datePicker: {
    paddingLeft: 0,
    marginBottom: 15,
    marginLeft: 0,
    borderColor: Colors.darkGunmetal,
    borderBottomWidth: 1
  }
});

export default connect(state => {
  return { userId: state.user.userId };
})(addEventForm);
