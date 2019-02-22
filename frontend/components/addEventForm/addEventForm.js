import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item,
  Input,
  Label,
  Title,
  View,
  Card,
  CardItem,
  Picker,
  DatePicker,
  Content,
  Textarea
} from "native-base";
import { LOGIN_SUCCESS } from "../../constants/ActionTypes";
import { StyledButton } from "../../StyledComponents/button.js";
import Colors from "../../constants/Colors";
import Geocode from "react-geocode";
import { Alert } from "react-native";
import { StyledSubHeader } from "../../StyledComponents/textSubHeader";
import { StyledContent } from "../../StyledComponents/mainContainer";
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator, createAppContainer } from "react-navigation";
<<<<<<< Updated upstream
import { StyledForm } from "../../StyledComponents/form";
import { StyledItem } from "../../StyledComponents/formItem";
=======
import { fetchUrl } from "../../fetchUrl";
>>>>>>> Stashed changes

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBJp31wdd16862J0Vevyzbie4DN3CLOfq8

class addEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      name: "",
      time: new Date(),
      guests: undefined,
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
        console.log("lat+lon", lat, lng);
        console.log("state.coordinate :", this.state.coordinate);
        console.log("Location entered: ", this.state.location);
      },
      error => {
        console.error(error);
      }
    );
  };

  onCreateEventPress = event => {
    console.log("address :", this.state.location);
    this.getSpag();

    /******************* Fetch the shit *******************/
    let requestBody = JSON.stringify({
      // image: this.state.image,
      name: this.state.name,
      guests: this.state.guests,
      time: this.state.time,
      location: this.state.location,
      desc: this.state.desc,
      coordinate: this.state.coordinate
    });
    fetch("http://68.183.200.44:4000/addevent", {
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
          Toast.show({
            text: "Oh oh spagetthi oh",
            buttonText: "Fuck"
          });
          return;
        } else {
          Toast.show({
            text: "Event created",
            buttonText: "Yay!"
          });
        }
      });

    fetch("http://68.183.200.44:4000/addevent", {
      method: "POST",
      body: requestBody
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        console.log(JSON.parse(responseBody));
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
            <StyledItem type="inlineLabel" label="Guests">
              <Input
                autoCapitalize="none"
                onChangeText={guests => this.setState({ guests })}
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
