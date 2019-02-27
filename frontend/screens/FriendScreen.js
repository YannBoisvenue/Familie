import React from "react";
import { Container, Tab } from "native-base";
import { StyledTabs } from "../StyledComponents/tabs";
import { StyledContent } from "../StyledComponents/mainContainer";
import { Alert } from "react-native";
import AllProfiles from "../components/AllProfiles/AllProfiles";

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
          <Tab heading="All Friends">
            <StyledContent>
              <AllProfiles />
            </StyledContent>
          </Tab>
        </StyledTabs>
      </Container>
    );
  }
}
