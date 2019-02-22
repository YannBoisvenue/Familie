import { View, Text, Button, Card, CardItem, Container } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { StyledButton } from "../../StyledComponents/button.js";
import Colors from "../../constants/Colors";
import { StyledLink } from "../../StyledComponents/link";
import moment from "moment";

class SingleEvent extends Component {
  render() {
    let description = this.props.desc;
    if (this.props.desc.length > 100) {
      description = this.props.desc.slice(0, 99) + "...";
    }

    return (
      <Card noShadow style={styles.card}>
        <CardItem style={styles.image}>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
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
              this.props.navigation.navigate("Event", {
                id: this.props._id
              }); ///this is the param object
            }}
          />
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>{moment(this.props.time).format("MMM Do YYYY, h:mm a")}</Text>
        </CardItem>
        <CardItem style={styles.cardDescription}>
          <Text>{description}</Text>
        </CardItem>
        <CardItem cardBody style={{ paddingLeft: 7 }}>
          <StyledLink
            content="Attend"
            onPress={() => {
              Alert.alert("Attending event");
            }}
          />
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderColor: "transparent",
    borderRadius: 5
  },
  cardDate: {
    paddingLeft: 7,
    paddingBottom: 7,
    color: Colors.darkGunmetal,
    opacity: 0.75
  },
  cardTitle: {
    paddingLeft: 7,
    paddingBottom: 7
  },
  cardDescription: {
    paddingLeft: 7,
    paddingBottom: 7,
    color: Colors.darkGunmetal
  },
  image: {
    paddingBottom: 7
  }
});

export default withNavigation(SingleEvent);
