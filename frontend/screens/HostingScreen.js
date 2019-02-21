import React from "react";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledLink } from "../StyledComponents/link";

export const HostingScreen = props => (
  <StyledContent>
    <StyledLink
      {...this.props}
      content="Add an event"
      onPress={() => {
        props.navigation.navigate("AddEvent");
      }}
    />
  </StyledContent>
);
