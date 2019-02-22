import React, { Component } from "react";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledLink } from "../StyledComponents/link";
import { connect } from "react-redux";
import { HostingEventContainer } from "../components/hostingEvent/hostingEventContainer";
import { AsyncStorage } from "react-native";

class HostingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem("userId");
    let body = JSON.stringify(value);
    fetch("http://68.183.200.44:4000/hostingEvents", {
      method: "POST",
      body: body
    })
      .then(x => x.text())
      .then(response => {
        let events = JSON.parse(response);
        this.setState({ events: events.attending });
      });
  }

  render() {
    const { events } = this.state;
    let eventArr = [];
    if (events) {
      eventArr = events.map((e, index) => {
        return <HostingEventContainer key={index} event={e} />;
      });
    }

    return (
      <StyledContent>
        <StyledLink
          content="Add an event"
          onPress={() => {
            this.props.navigation.navigate("AddEvent");
          }}
        />
        {events ? eventArr : "You have no hosting events"}
      </StyledContent>
    );
  }
}

export default connect(state => {
  return { userId: state.userId };
})(HostingScreen);
