import React from "react";
import { StyleSheet, Image } from "react-native";
import { Container, Card, View, CardItem, Text, Icon, Root } from "native-base";
import Colors from "../constants/Colors.js";
import { StyledLink } from "../StyledComponents/link";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledSubHeader } from "../StyledComponents/textSubHeader";
import { StyledSectionTitle } from "../StyledComponents/title";
import { StyledButton } from "../StyledComponents/button";
import { connect } from "react-redux";
import { fetchUrl } from "../fetchUrl";
import { SET_USERID } from "../constants/ActionTypes";
import { AsyncStorage } from "react-native";
import moment from "moment";

class SingleProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      profile: {},
      family: {},
      kidInfo: {},
      otherParent: {}
    };
  }

  componentDidMount() {
    fetch(fetchUrl + "/getProfile", {
      method: "POST",
      body: JSON.stringify(this.state.userId)
    })
      .then(x => x.text())
      .then(res => {
        let response = JSON.parse(res);
        let otherParent = {};
        if (response.success) {
          fetch(fetchUrl + "/getProfile", {
            method: "POST",
            body: JSON.stringify(response.result.family.otherParentId)
          })
            .then(x => x.text())
            .then(response => {
              let res = JSON.parse(response);
              if (res.success) {
                otherParent = res.result;
              }
            });
          this.setState({
            profile: response.result,
            parentDateOfBirth: response.result.dateOfBirth,
            family: response.result.family,
            kidInfo: response.result.family.kidsInfo,
            otherParent: otherParent
          });
        }
      });
  }

  static navigationOptions = {
    header: null
  };

  handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    this.props.dispatch({
      type: SET_USERID,
      payload: undefined
    });
    this.props.navigation.navigate("LoginScreen");
  };

  render() {
    let kidBirthday = moment(
      new Date(this.state.kidInfo.kidDateOfBirth)
    ).format("MMM Do YY");
    let pictureUri;
    if (this.state.profile.fileName !== undefined) {
      pictureUri = this.state.profile.fileName.split("/").pop();
    }

    let childPictureUri;
    if (this.state.family.childPicture !== undefined) {
      childPictureUri = this.state.family.childPicture.split("/").pop();
    }

    return (
      <Root>
        <Container>
          <StyledSubHeader {...this.props} title="Your Profile" />
          <StyledContent>
            <View>
              <View
                style={{
                  alignItems: "left",
                  marginBottom: 8
                }}
              >
                <Text style={styles.title}>
                  {this.state.profile.firstName} {this.state.profile.lastName}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "left",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20
                }}
              >
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 5,
                    marginRight: 15
                  }}
                  source={{
                    uri: `http://68.183.200.44:4000/${pictureUri}`
                  }}
                />
                <View style={{ marginRight: 50 }}>
                  <Text style={styles.textSection}>
                    <Text style={styles.subSection}>You're a: </Text>
                    {this.state.profile.gender === "mom" ? (
                      <Text style={styles.otherText}>Mom</Text>
                    ) : (
                      <Text style={styles.otherText}>Dad</Text>
                    )}
                  </Text>
                  <Text style={styles.subSection}>Status: </Text>
                  <Text style={styles.otherText}>
                    In a {this.state.profile.relationshipStatus}{" "}
                    {this.state.otherParent.length > 0 ? (
                      <Text>
                        with {this.state.otherParent.firstName}{" "}
                        {this.state.otherParent.lastName}
                      </Text>
                    ) : (
                      <React.Fragment />
                    )}
                  </Text>
                  <Text style={styles.textSection}>
                    <Text style={styles.subSection}>Job: </Text>
                    <Text style={styles.otherText}>
                      {this.state.profile.occupation}
                    </Text>
                  </Text>
                  <Text style={styles.textSection}>
                    <Text style={{ ...styles.subSection, flex: 1 }}>
                      Birthday:{" "}
                    </Text>
                    <Text style={{ ...styles.otherText, flex: 1 }}>
                      {this.state.profile.dateOfBirth}
                    </Text>
                  </Text>
                </View>
              </View>
              {this.state.kidInfo ? (
                <View>
                  <View
                    style={{
                      alignItems: "left"
                    }}
                  >
                    <StyledSectionTitle content="Your Children" width={135} />
                  </View>
                  <Card noShadow style={styles.card}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "left"
                      }}
                    >
                      <Image
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 5
                        }}
                        source={{
                          uri: `http://68.183.200.44:4000/${childPictureUri}`
                        }}
                      />
                      <View style={{ marginLeft: 20 }}>
                        <Text style={styles.subSection}>Name: </Text>
                        <Text style={styles.otherText}>
                          {this.state.kidInfo.kidFirstName}
                        </Text>
                        <Text style={styles.subSection}>Birthday: </Text>
                        <Text style={styles.otherText}>{kidBirthday}</Text>
                      </View>
                    </View>
                  </Card>
                </View>
              ) : (
                <React.Fragment />
              )}
            </View>
            <View style={{ backgroundColor: "transparent", height: 15 }} />
            <StyledButton
              content="Logout"
              color={Colors.queenBlue}
              onPress={this.handleLogout}
            />
          </StyledContent>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  subSection: {
    fontWeight: "bold",
    color: Colors.darkGunmetal
  },
  otherText: {
    color: Colors.darkGunmetal,
    marginBottom: 7
  },
  title: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "left",
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.darkGunmetal
  },
  card: {
    padding: 10,
    borderColor: "transparent",
    borderRadius: 5
  },
  textSection: {
    marginBottom: 8
  }
});

const ConnectedSingleProfileScreen = connect(state => {
  return { userId: state.user.userId };
})(SingleProfileScreen);

export default ConnectedSingleProfileScreen;
