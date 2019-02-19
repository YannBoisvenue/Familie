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

class addEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      eventName: "",
      chosenDate: new Date(),
      attendees: undefined,
      location: "",
      desc: ""
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>The Social Family</Title>
          </Body>
        </Header>
        <Title>Add Event Form</Title>
        <Form>
          <Item floatingLabel>
            <Label>Image</Label>
            <Input
              autoCapitalize="none"
              onChangeText={image => this.setState({ image })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Event name</Label>
            <Input
              autoCapitalize="none"
              onChangeText={eventName => this.setState({ eventName })}
            />
          </Item>
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
          <Item floatingLabel>
            <Label>Address</Label>
            <Input
              autoCapitalize="none"
              onChangeText={location => this.setState({ location })}
            />
          </Item>
          <Item>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Description of the event                                "
              onChangeText={desc => this.setState({ desc })}
            />
          </Item>
        </Form>
      </Container>
    );
  }
}

export default connect()(addEventForm);

// export default connect(function(state) {
//   return { someKey: state.someValue };
// })(addEventForm);
