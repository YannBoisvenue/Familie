import { View, Text, Button, Card, CardItem, Icon } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import Colors from "../../constants/Colors";
import { StyledLink } from "../../StyledComponents/link";
import moment from "moment";
import { fetchUrl } from "../../fetchUrl.js";
import { connect } from "react-redux";
import { UPDATE_ATTENDING_EVENT } from "../../constants/ActionTypes";

class SingleAttendEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: true,
      isAttending: true,
      seeMore: false,
      userId: this.props.userId
    };
  }

  componentDidMount() {
    if (!this.props.event.guests) {
      return;
    }
    let isCreator = this.props.event.userId;
    if (isCreator === this.props.event.guests[0]) {
      this.setState({ isShown: false });
    }
  }

  handleSeeMore = () => {
    this.setState({ seeMore: true });
  };

  seeMore = () => {
    return (
      <Button
        hasText
        transparent
        style={styles.url}
        onPress={this.handleSeeMore}
      >
        <Text
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            color: Colors.queenBlue,
            fontSize: 17
          }}
        >
          See more
        </Text>
      </Button>
    );
  };

  handleUnattendEvent = async () => {
    fetch(fetchUrl + "/unattendEvent", {
      method: "POST",
      body: JSON.stringify({
        user: this.props.userId,
        eventId: this.props.event._id
      })
    }).then(() => {
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
    });
    this.setState({ attending: false });
  };

  render() {
    let dots = this.seeMore();
    let description = this.props.event.desc;
    if (this.props.event.desc.length > 100) {
      description = this.props.event.desc.slice(0, 99) + " ...";
    }

    let locationArr = this.props.event.location.split(",");
    let location = locationArr[0];
    let pictureUri = this.props.event.fileName.split("/")[5];

    return (
      <Card noShadow style={styles.card}>
        <CardItem style={styles.image}>
          <Image
            source={{ uri: `http://68.183.200.44:4000/${pictureUri}` }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem style={styles.cardTitle}>
          <StyledLink
            bold
            color={Colors.darkGunmetal}
            content={this.props.event.name}
            onPress={() => {
              this.props.navigation.navigate("Event", {
                id: this.props.event._id
              });
            }}
          />
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>
            {moment(this.props.event.time).format("MMM Do YYYY, h:mm a")}
          </Text>
        </CardItem>
        <CardItem style={styles.location}>
          <Icon
            type="Feather"
            name="map-pin"
            style={{ fontSize: 20, width: 26 }}
          />
          <Text style={{ flex: -1, fontSize: 15 }}>{location}</Text>
        </CardItem>
        <CardItem style={styles.cardDescription}>
          <Text style={{ lineHeight: 25 }}>
            {this.state.seeMore ? this.props.event.desc : description}
          </Text>
        </CardItem>
        {this.props.event.desc.length > 100 && !this.state.seeMore ? (
          <CardItem style={styles.seemore}>{dots}</CardItem>
        ) : (
          <React.Fragment />
        )}
        {this.state.isAttending ? (
          <View style={{ flexDirection: "row" }}>
            <CardItem cardBody style={{ paddingLeft: 7 }}>
              <Text
                style={{
                  paddingBottom: 10,
                  paddingLeft: 0,
                  paddingRight: 0,
                  color: Colors.queenBlue,
                  fontSize: 17
                }}
              >
                Going
              </Text>
            </CardItem>
            <CardItem
              button
              onPress={this.handleUnattendEvent}
              cardBody
              style={{ paddingLeft: 7 }}
            >
              <Text
                style={{
                  paddingBottom: 10,
                  paddingLeft: 0,
                  paddingRight: 0,
                  color: Colors.lightBlue,
                  fontSize: 17
                }}
              >
                Cancel
              </Text>
            </CardItem>
          </View>
        ) : (
          <CardItem cardBody style={{ paddingLeft: 7 }}>
            <Button
              hasText
              transparent
              style={styles.url}
              onPress={this.handleAttendEvent}
            >
              <Text
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  color: Colors.queenBlue,
                  fontSize: 17
                }}
              >
                Attend
              </Text>
            </Button>
          </CardItem>
        )}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderColor: "transparent",
    borderRadius: 5
  },
  cardDate: {
    paddingLeft: 7,
    paddingBottom: 8,
    color: Colors.darkGunmetal,
    opacity: 0.75
  },
  cardTitle: {
    paddingLeft: 7,
    paddingBottom: 0
  },
  cardDescription: {
    paddingLeft: 7,
    color: Colors.darkGunmetal
  },
  image: {
    paddingBottom: 8
  },
  url: {
    paddingLeft: 0,
    paddingRight: 0
  },
  seemore: {
    marginTop: 0,
    paddingLeft: 7
  },
  location: {
    paddingBottom: 8,
    paddingLeft: 7,
    color: Colors.darkGunmetal
  }
});

let ConnectedSingleAttendEvent = connect(state => {
  return { userId: state.user.userId };
})(SingleAttendEvent);

export default withNavigation(ConnectedSingleAttendEvent);
