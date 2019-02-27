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
import SingleAttendingEvent from "../components/SingleEvent/SingleAttendingEvent";
import { UPDATE_ATTENDING_EVENT } from "../constants/ActionTypes";

class AttendingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  async componentDidMount() {
    fetch(fetchUrl + "/attendingEvents", {
      method: "POST",
      body: JSON.stringify({ user: this.props.userId })
    })
      .then(x => x.text())
      .then(response => {
        let res = JSON.parse(response);
        if (res.success) {
          this.setState({ events: res.events });
          this.props.dispatch({
            type: UPDATE_ATTENDING_EVENT,
            payload: res.events
          });
        }
      });
  }

  render() {
    const { attendingEvents } = this.props;
    if (attendingEvents.length > 0) {
      eventArr = attendingEvents.map((e, index) => {
        return <SingleAttendingEvent key={index} event={e} />;
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
                <StyledSectionTitle content="Attending Events" width={175} />
              </Container>
            </CardItem>
          </Card>
        </View>
        <StyledContent>
          {attendingEvents.length > 0 ? (
            eventArr
          ) : (
            <Text>You have no attending events. Find one!</Text>
          )}
        </StyledContent>
      </Container>
    );
  }
}

export default connect(state => {
  return {
    userId: state.user.userId,
    attendingEvents: state.events.attendingEvents
  };
})(AttendingScreen);