import React, { Component } from "react";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledLink } from "../StyledComponents/link";
import { connect } from "react-redux";
import { HostingEventContainer } from "../components/hostingEvent/hostingEventContainer";
import { AsyncStorage } from "react-native";
import { fetchUrl } from "../fetchUrl";
import { StyledSectionTitle } from "../StyledComponents/title";
import { Container, Right, Left, CardItem, Card } from "native-base";

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
      });
  }

  render() {
    const { events } = this.state;
    let eventArr = [];
    if (events) {
      eventArr = events.map((e, index) => {
        return <HostingEventContainer key={index} event={e} />;
      });
    }

    return (
      <StyledContent>
        <Card transparent style={{ backgroundColor: "transparent" }}>
          <CardItem style={{ backgroundColor: "transparent" }}>
            <Container style={{ height: 63 }}>
              <StyledSectionTitle content="Your Events" width={140} />
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

        {events ? eventArr : "You have no hosting events"}
      </StyledContent>
    );
  }
}

export default connect(state => {
  return { userId: state.userId };
})(HostingScreen);
