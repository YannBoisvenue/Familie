import {
  View,
  Text,
  Button,
  Card,
  CardItem,
  Container,
  Icon
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { StyledButton } from "../../StyledComponents/button.js";
import Colors from "../../constants/Colors";
import { StyledLink } from "../../StyledComponents/link";
import moment from "moment";
import { fetchUrl } from "../../fetchUrl.js";
import { connect } from "react-redux";

class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attending: false,
      seeMore: false,
      userId: this.props.userId
    };
  }

  componentDidMount() {
    if (!this.props.guests) {
      return;
    }
    let isGuest = this.props.guests.some(x => x === this.props.userId);
    if (isGuest) {
      this.setState({ attending: true });
    }
  }

  handleSeeMore = () => {
    this.setState({ seeMore: true });
  };

  handleAttendEvent = async () => {
    let body = JSON.stringify({
      user: this.props.userId,
      eventId: this.props._id
    });
    fetch(fetchUrl + "/attendEvent", { method: "POST", body: body });
    this.setState({ attending: true });
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

  render() {
    let dots = this.seeMore();
    let description = this.props.desc;
    if (this.props.desc.length > 100) {
      description = this.props.desc.slice(0, 99) + " ...";
    }

    let locationArr = this.props.location.split(",");
    let location = locationArr[0];

    return (
      <Card noShadow style={styles.card}>
        <CardItem style={styles.image}>
          <Image
            source={{ uri: "https://picsum.photos/500/500" }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem style={styles.cardTitle}>
          <StyledLink
            bold
            color={Colors.darkGunmetal}
            content={this.props.name}
            onPress={() => {
              console.log("navigation to Event with Id", this.props._id);
              console.log("this.props.navigation", this.props.navigation);
              this.props.navigation.navigate("Event", {
                id: this.props._id
              }); ///this is the param object
            }}
          />
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>{moment(this.props.time).format("MMM Do YYYY, h:mm a")}</Text>
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
            {this.state.seeMore ? this.props.desc : description}
          </Text>
        </CardItem>
        {this.props.desc.length > 100 && !this.state.seeMore ? (
          <CardItem style={styles.seemore}>{dots}</CardItem>
        ) : (
          <React.Fragment />
        )}
        {this.state.attending ? (
          <CardItem cardBody style={{ paddingLeft: 7 }}>
            {/* <Button
              hasText
              transparent
              style={styles.url}
              onPress={this.handleGoingClick}
            > */}
            <Text
              style={{
                paddingBottom: 10,
                paddingLeft: 0,
                paddingRight: 0,
                color: Colors.lightBlue,
                fontSize: 17
              }}
            >
              Going
            </Text>
            {/* </Button> */}
          </CardItem>
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

let ConnectedSingleEvent = connect(state => {
  return { userId: state.user.userId };
})(SingleEvent);

export default withNavigation(ConnectedSingleEvent);
