import React, { Component } from "react";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledLink } from "../StyledComponents/link";
import { connect } from "react-redux";
import { HostingEventContainer } from "../components/hostingEvent/hostingEventContainer";

class HostingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          _id: "5c6c78535653c50e0c104d5b",
          name: "popcorn!",
          time: "19,02,2019",
          coordinate: {},
          guests: ["Vincent", "Sophie"],
          description: "FLUFFY!!!",
          creator: "Natasha"
        }
      ]
    };
  }

  render() {
    return (
      <StyledContent>
        <StyledLink
          content="Add an event"
          onPress={() => {
            this.props.navigation.navigate("AddEvent");
          }}
        />
        <HostingEventContainer event={this.state.events[0]} />
      </StyledContent>
    );
  }
}

export default connect(state => {
  return { userId: state.userId };
})(HostingScreen);
