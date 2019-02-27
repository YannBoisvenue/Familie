import React from "react";
import { StyleSheet } from "react-native";
import { Container, Text, Tab, Item, Label, Input, Body } from "native-base";
import { StyledTabs } from "../StyledComponents/tabs";
import Login from "../components/login";
import Colors from "../constants/Colors.js";
import { StyledLink } from "../StyledComponents/link";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledSubHeader } from "../StyledComponents/textSubHeader";
import HostingScreen from "./HostingScreen";
import AllProfiles from "../components/AllProfiles/AllProfiles";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { SET_USERID } from "../constants/ActionTypes";

class EventScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    let userId = await AsyncStorage.getItem("userId");
    if (userId) {
      this.props.dispatch({
        type: "SET_USERID",
        payload: userId
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <StyledTabs>
          <Tab heading="All Profiles">
            <StyledContent>
              <AllProfiles />
            </StyledContent>
          </Tab>

          <Tab heading="Attending">
            <StyledSubHeader
              title="Choose a friend"
              linkText="Alert me"
              onPress={this.handleOnPress}
            />
            <StyledContent>
              <StyledLink
                content="Logout"
                onPress={async () => {
                  await AsyncStorage.removeItem("userId");
                  this.props.dispatch({
                    type: SET_USERID,
                    payload: undefined
                  });
                  this.props.navigation.navigate("LoginScreen");
                }}
              />
              {/* Put the page component here*/}
              <Login {...this.props} />
            </StyledContent>
          </Tab>
          <Tab heading="Hosting">
            <HostingScreen {...this.props} />
            {/* Put the page component here instead of Login*/}
          </Tab>
        </StyledTabs>
      </Container>
    );
  }
}

const ConnectedAllEvents = connect()(EventScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.antiFlashWhite
  }
});

export default ConnectedAllEvents;
