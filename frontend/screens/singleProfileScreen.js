import React from "react";
import { StyleSheet, Image } from "react-native";
import { Container, Card, View, CardItem, Text, Icon } from "native-base";
import Colors from "../constants/Colors.js";
import { StyledLink } from "../StyledComponents/link";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledSubHeader } from "../StyledComponents/textSubHeader";
import { connect } from "react-redux";
import { fetchUrl } from "../fetchUrl";

class SingleProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    fetch(`${fetchUrl}/getProfile`, {
      method: "POST",
      body: JSON.stringify(this.props.userId)
    })
      .then(res => res.text())
      .then(res => {
        let response = JSON.parse(res);
        this.setState({ profile: response.result });
      });
  }

  render() {
    let pictureUri = this.state.profile.fileName.split("/")[5];

    return (
      <Container style={styles.container}>
        <StyledSubHeader {...this.props} title="Your profile" />
        <StyledContent>
          <Card noShadow style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 2 }}>
                <CardItem style={styles.cardTitle}>
                  <StyledLink
                    bold
                    color={Colors.queenBlue}
                    content={
                      this.state.profile.firstName +
                      " " +
                      this.state.profile.lastName
                    }
                  />
                </CardItem>
                <CardItem style={styles.image}>
                  <Image
                    source={{
                      uri: `http://68.183.200.44:4000/${pictureUri}`
                    }}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem style={styles.cardDate}>
                  <Text
                    style={{ color: Colors.darkGunmetal, fontWeight: "bold" }}
                  >
                    I'm a:{" "}
                  </Text>
                  <Text>{this.state.profile.gender}</Text>
                </CardItem>
                <CardItem style={styles.cardDate}>
                  <Text
                    style={{ color: Colors.darkGunmetal, fontWeight: "bold" }}
                  >
                    Status:{" "}
                  </Text>
                  <Text>{this.state.profile.relationshipStatus}</Text>
                </CardItem>
                <CardItem style={styles.cardDate}>
                  <Text
                    style={{ color: Colors.darkGunmetal, fontWeight: "bold" }}
                  >
                    Occupation:
                  </Text>
                  <Text>{this.state.profile.occupation}</Text>
                </CardItem>
                <CardItem style={styles.cardDate}>
                  <Text
                    style={{ color: Colors.darkGunmetal, fontWeight: "bold" }}
                  >
                    D.O.B.:{" "}
                  </Text>
                  <Text>{this.state.profile.dateOfBirth}</Text>
                </CardItem>
              </View>
              <View style={{ flex: 1 }}>
                <CardItem style={styles.cardDate}>
                  <Image
                    source={{ uri: "https://picsum.photos/100/100" }}
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
              <Text>{this.state.profile.location}</Text>
            </CardItem>
          </Card>
        </StyledContent>
      </Container>
    );
  }
}

const ConnectedSingleProfileScreen = connect(state => {
  return { userId: state.user.userId };
})(SingleProfileScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.antiFlashWhite
  }
});

export default ConnectedSingleProfileScreen;
