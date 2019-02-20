import React from "react";
import { Container, Text, Tab, Item, Label, Input } from "native-base";
import { StyledTabs } from "../StyledComponents/tabs";
import Login from "../components/login";
import { StyledContent } from "../StyledComponents/mainContainer";
import { Alert } from "react-native";

export default class FriendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnPress = this.handleOnPress.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  handleOnPress() {
    return Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <Container>
        <StyledTabs>
          <Tab heading="Suggested">
            <StyledContent>
              {/* Put the page component here instead of Login*/}
              <Login />
            </StyledContent>
          </Tab>

          <Tab heading="Your Friends">
            <StyledContent>
              {/* Put the page component here instead of Login*/}
              <Login />
            </StyledContent>
          </Tab>
        </StyledTabs>
      </Container>
    );
  }
}
