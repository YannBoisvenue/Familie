import React, { Component } from "react";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledLink } from "../StyledComponents/link";
import { connect } from "react-redux";
import { HostingEventContainer } from "../components/hostingEvent/hostingEventContainer";
import { AsyncStorage } from "react-native";
import { fetchUrl } from "../fetchUrl";
import { StyledSectionTitle } from "../StyledComponents/title";
import {
  Container,
  Right,
  Left,
  CardItem,
  Card,
  View,
  Text
} from "native-base";
import Colors from "../constants/Colors";
import { UPDATE_HOSTING_EVENT } from "../constants/ActionTypes";

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
    fetch(fetchUrl + "/hostingEvents", {
      method: "POST",
      body: body
    })
      .then(x => x.text())
      .then(response => {
        let events = JSON.parse(response);
        this.setState({ events: events.attending });
        this.props.dispatch({
          type: UPDATE_HOSTING_EVENT,
          payload: events.attending
        });
      });
  }

  render() {
    const { hostingEvents } = this.props;
    let eventArr = [];
    if (hostingEvents.length > 0) {
      eventArr = hostingEvents.map((e, index) => {
        return <HostingEventContainer key={index} event={e} />;
      });
    }

    return (
      <Container>
        <View
          scrollEnabled={false}
          style={{
            backgroundColor: Colors.antiFlashWhite,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 0
          }}
        >
          <Card transparent style={{ backgroundColor: "transparent" }}>
            <CardItem style={{ backgroundColor: "transparent" }}>
              <Container style={{ height: 63 }}>
                <StyledSectionTitle content="Your Events" width={133} />
              </Container>
              <Right style={{ flex: -1 }}>
                <StyledLink
                  content="Add an event"
                  onPress={() => {
                    this.props.navigation.navigate("AddEvent");
                  }}
                />
              </Right>
            </CardItem>
          </Card>
        </View>
        <StyledContent>
          {hostingEvents.length > 0 ? (
            eventArr
          ) : (
            <Text>You have no hosting events. Create one!</Text>
          )}
        </StyledContent>
      </Container>
    );
  }
}

export default connect(state => {
  return {
    userId: state.user.userId,
    hostingEvents: state.events.hostingEvents
  };
})(HostingScreen);
