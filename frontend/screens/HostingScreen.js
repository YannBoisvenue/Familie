import React, { Component } from "react";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledLink } from "../StyledComponents/link";
import { connect } from "react-redux";
import { HostingEventContainer } from "../components/hostingEvent/hostingEventContainer";
import { fetchUrl } from "../fetchUrl";

class HostingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "bob",
      events: []
    };
  }

  componentDidMount() {
    let body = JSON.stringify({ user: this.state.userId });
    fetch("http://68.183.200.44:4000/hostingEvents", {
      method: "POST",
      body: body
    })
      .then(x => x.toString())
      .then(response => {
        console.log(response);
        this.setState({ events: JSON.parse(response) });
      });
  }

  render() {
    let eventArr = this.state.events.map(e => {
      return <HostingEventContainer event={e} />;
    });

    return (
      <StyledContent>
        <StyledLink
          content="Add an event"
          onPress={() => {
            this.props.navigation.navigate("AddEvent");
          }}
        />
        {eventArr}
      </StyledContent>
    );
  }
}

export default connect(state => {
  return { userId: state.userId };
})(HostingScreen);
