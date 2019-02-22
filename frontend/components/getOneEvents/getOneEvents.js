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
import components from "../../native-base-theme/components";

class getOneEvent extends components {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      name: "",
      time: new Date(),
      guests: undefined,
      location: "",
      desc: "",
      coordinate: { lat: 0, lng: 0 },
      event: {},
      search: ""
    };

    let requestBody = JSON.stringify({
      event: this.state.event
    });
  }

  getTheSearchedEvents = event => {
    fetch("http://68.183.200.44:4000/oneEvent", {
      method: "POST",
      body: requestBody
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);

        this.state.event = body.event;
      });
  };
  
  render() {
    return (
      <Root>
        <Container>
         <Title>Search available events</Title>
         <Form>
         <FormItem floatingLabel>
               <Label>Search :</Label>
               <Input
                 autoCapitalize="none"
                 onChangeText={search => this.setState({ search })}
                />
             </FormItem>
            <StyledButton
              onPress={this.getTheSearchedEvents}
              content="event"
              disabled={
                //on a tu vraiment besoin d'un disable icitte?
              }
              color={Colors.queenBlue}
            />
          <Card>
            <CardItem footer>

              <Text >
                {event}
              </Text>
            </CardItem>
          </Card>



        </Form>
        </Container>
      </Root>
    );
  }
}

export default getOneEvent;
