import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View, Root, Container, Icon, Item, Card } from "native-base";
import { fetchUrl } from "../../fetchUrl";
import moment from "moment";
import { StyledSubHeader } from "../../StyledComponents/textSubHeader";
import { StyledContent } from "../../StyledComponents/mainContainer";
import { withNavigation } from "react-navigation";
import Colors from "../../constants/Colors";
import { StyledSectionTitle } from "../../StyledComponents/title";

class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      profile: {},
      family: {},
      kidInfo: {},
      otherParent: {}
    };
  }

  componentDidMount() {
    fetch(`${fetchUrl}/profile/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        let otherParent = {};
        fetch(fetchUrl + "/getProfile", {
          method: "POST",
          body: JSON.stringify(res.result.family.otherParentId)
        })
          .then(x => x.text())
          .then(response => {
            let res = JSON.parse(response);
            if (res.success) {
              otherParent = res.result;
            }
          });
        this.setState({
          profile: res.result,
          family: res.result.family,
          kidInfo: res.result.family.kidsInfo,
          otherParent: otherParent
        });
      });
  }

  static navigationOptions = {
    header: null
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
          <StyledSubHeader
            {...this.props}
            title="Parent Profile"
            linkText="Cancel"
            onPress={() => {
              this.props.navigation.navigate("AllFriends");
            }}
          />
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
                  style={{ height: 150, width: 150, borderRadius: 5 }}
                  source={{
                    uri: `http://68.183.200.44:4000/${pictureUri}`
                  }}
                />
                <View style={{ marginRight: 50 }}>
                  <Text style={styles.subSection}>I'm a: </Text>
                  {this.state.profile.gender === "mom" ? (
                    <Text style={styles.otherText}>Mom</Text>
                  ) : (
                    <Text style={styles.otherText}>Dad</Text>
                  )}
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
                </View>
              </View>
              {this.state.kidInfo ? (
                <View>
                  <View
                    style={{
                      alignItems: "left"
                    }}
                  >
                    <StyledSectionTitle content="My Children" width={135} />
                  </View>
                  <Card noShadow style={styles.card}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Image
                        style={{
                          height: 100,
                          width: 100,
                          marginTop: 10,
                          borderRadius: 5
                        }}
                        source={{
                          uri: `http://68.183.200.44:4000/${childPictureUri}`
                        }}
                      />
                      <View style={{ marginRight: 80 }}>
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
          </StyledContent>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  subSection: {
    fontWeight: "bold",
    color: Colors.darkGunmetal,
    marginBottom: 10
  },
  otherText: {
    color: Colors.darkGunmetal,
    marginBottom: 10
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
    padding: 20,
    borderColor: "transparent",
    borderRadius: 5
  }
});

export default withNavigation(OtherProfile);
