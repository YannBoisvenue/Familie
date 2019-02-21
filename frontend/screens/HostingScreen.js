import React, { Component } from "react";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledLink } from "../StyledComponents/link";
import { connect } from "react-redux";

class HostingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
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
      </StyledContent>
    );
  }
}

export default connect(state => {
  return { userId: state.userId };
})(HostingScreen);
