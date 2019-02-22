import { View, Image, Text, Button } from "native-base";
import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { StyledButton } from "../../StyledComponents/button.js";

class SingleEvent extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", height: 100 }}>
        <Text>
          {this.props.image}
          {this.props.name}
          {this.props.desc}
          {this.props.location}
          {this.props.time}
          {this.props._id}
        </Text>
        <StyledButton
          content="Show this event"
          onPress={() => {
            console.log("navigation to Event with Id", this.props._id);
            this.props.navigation.navigate("Event", {
              id: this.props._id
            }); ///this is the param object
          }}
        />
      </View>
    );
  }
}

export default withNavigation(SingleEvent);
