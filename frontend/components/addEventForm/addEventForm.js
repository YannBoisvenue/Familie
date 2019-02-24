import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Item,
  Input,
  DatePicker,
  Textarea,
  Toast
} from "native-base";
import { LOGIN_SUCCESS } from "../../constants/ActionTypes";
import { StyledButton } from "../../StyledComponents/button.js";
import Colors from "../../constants/Colors";
import Geocode from "react-geocode";
import { Alert } from "react-native";
import { StyledSubHeader } from "../../StyledComponents/textSubHeader";
import { StyledContent } from "../../StyledComponents/mainContainer";
import { ScrollView } from "react-native-gesture-handler";
import { StyledForm } from "../../StyledComponents/form";
import { StyledItem } from "../../StyledComponents/formItem";
import { AsyncStorage } from "react-native";
import { fetchUrl } from "../../fetchUrl";

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBJp31wdd16862J0Vevyzbie4DN3CLOfq8

class addEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      time: new Date(),
      guests: undefined,
      name: "",
      location: "",
      desc: "",
      coordinate: { lat: 0, lng: 0 }
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

  onCreateEventPress = event => {
    this.getSpag();
    const { navigation } = this.props;
    AsyncStorage.getItem("userId").then(userId => {
      let requestBody = JSON.stringify({
        // image: this.state.image,
        userId: userId,
        name: this.state.name,
        guests: [userId],
        time: this.state.time,
        location: this.state.location,
        desc: this.state.desc,
        coordinate: this.state.coordinate
      });
      fetch(`${fetchUrl}/addevent`, {
        method: "POST",
        body: requestBody
      })
        .then(function(x) {
          return x.text();
        })
        .then(responseBody => {
          let body = JSON.parse(responseBody);
          console.log("parseBody", body);
          if (!body.success) {
            setTimeout(() => {
              navigation.navigate("Events");
            }, 1000);
            // Toast.show({
            //   text: "Oh oh spagetthi oh",
            //   buttonText: "Fuck"
            // });
            return;
          } else {
            Toast.show({
              text: "Event created",
              buttonText: "Yay!"
            });
          }
        });
    });
  };

  render() {
    return (
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
          <StyledForm>
            <StyledItem type="inlineLabel" label="image">
              <Input
                autoCapitalize="none"
                onChangeText={image => this.setState({ image })}
              />
            </StyledItem>
            <StyledItem type="inlineLabel" label="Event name">
              <Input
                autoCapitalize="none"
                onChangeText={name => this.setState({ name })}
              />
            </StyledItem>
            <Item>
              <DatePicker
                defaultDate={new Date(2019, 1, 1)}
                minimumDate={new Date(2018, 2, 20)}
                maximumDate={new Date(2021, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
            <StyledItem type="inlineLabel" label="Address">
              <Input
                autoCapitalize="none"
                onChangeText={location => this.setState({ location })}
              />
            </StyledItem>
            <Item>
              <Textarea
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
    );
  }
}

export default connect()(addEventForm);
