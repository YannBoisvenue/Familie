import { View, Text, Card, CardItem, Icon } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Colors from "../../constants/Colors";
import { StyledLink } from "../../StyledComponents/link";

class SingleProfile extends Component {
  render() {
    let pictureUri = this.props.profilePicture.split("/")[5];
    return (
      <Card noShadow style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2 }}>
            <CardItem style={styles.cardTitle}>
              <StyledLink
                bold
                color={Colors.queenBlue}
                content={this.props.firstName + " " + this.props.lastName}
                onPress={() => {
                  this.props.navigation.navigate("OtherProfile", {
                    id: this.props._id
                  });
                }}
              />
            </CardItem>
            <CardItem style={styles.image} />
            <CardItem style={styles.cardDate}>
              <Text style={{ color: Colors.darkGunmetal, fontWeight: "bold" }}>
                I'm a:{" "}
              </Text>
              <Text>{this.props.gender}</Text>
            </CardItem>
            <CardItem style={styles.cardDate}>
              <Text style={{ color: Colors.darkGunmetal, fontWeight: "bold" }}>
                Status:{" "}
              </Text>
              <Text>{this.props.relationshipStatus}</Text>
            </CardItem>
            <CardItem style={styles.cardDate}>
              <Text style={{ color: Colors.darkGunmetal, fontWeight: "bold" }}>
                Occupation:
              </Text>
              <Text>{this.props.occupation}</Text>
            </CardItem>
            <CardItem style={styles.cardDate}>
              <Text style={{ color: Colors.darkGunmetal, fontWeight: "bold" }}>
                D.O.B.:{" "}
              </Text>
              <Text>{this.props.dateOfBirth}</Text>
            </CardItem>
          </View>
          <View style={{ flex: 1 }}>
            <CardItem style={styles.cardDate}>
              <Image
                source={{ uri: `http://68.183.200.44:4000/${pictureUri}` }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 5,
                  marginTop: 15
                }}
              />
            </CardItem>
          </View>
        </View>
        <CardItem style={styles.cardDate}>
          <Icon
            type="Feather"
            name="map-pin"
            style={{
              fontSize: 20,
              width: 26,
              color: Colors.lightBlue,
              fontWeight: "bold"
            }}
          />
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
