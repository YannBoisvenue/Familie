import { View, Text, Button, Card, CardItem, Container } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { StyledButton } from "../../StyledComponents/button.js";
import Colors from "../../constants/Colors";
import { StyledLink } from "../../StyledComponents/link";
import moment from "moment";

class SingleProfile extends Component {
  componentDidMount() {
    console.log("In the component Did Mount", this.props.navigation);
  }
  render() {
    return (
      <Card noShadow style={styles.card}>
        {/* <CardItem style={styles.image}>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem> */}
        <CardItem style={styles.cardTitle}>
          <StyledLink
            bold
            color={Colors.darkGunmetal}
            content={this.props.firstName}
            onPress={() => {
              console.log(
                "this.props.navigation in singleProfile",
                this.props.navigation
              );
              console.log("navigation to profile with Id", this.props._id);
              /*navigate with Id the same way I navigate the single events*/
              this.props.navigation.navigate("MyProfile", {
                id: this.props._id
              });
              console.log("is this true?"); ///this is the param object
              console.log("after navigation");
            }}
          />
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>{this.props.lastName}</Text>
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>{this.props.gender}</Text>
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>{this.props.relationshipStatus}</Text>
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>{this.props.occupation}</Text>
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>{this.props.dateOfBirth}</Text>
        </CardItem>
        <CardItem style={styles.cardDate}>
          <Text>{this.props.location}</Text>
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

export default withNavigation(SingleProfile);
