import React, { Component } from "react";
import { Image } from "react-native";
import { Text, View, Root, Container, Icon, Item } from "native-base";
import { fetchUrl } from "../../fetchUrl";
import moment from "moment";
import { StyledSubHeader } from "../../StyledComponents/textSubHeader";
import { StyledContent } from "../../StyledComponents/mainContainer";
import { withNavigation } from "react-navigation";
import Colors from "../../constants/Colors";

class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      profile: {}
    };
  }
  componentDidMount() {
    fetch(`${fetchUrl}/profile/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ profile: res.result });
      });
  }

  static navigationOptions = {
    header: null
  };

  render() {
    let pictureUri;
    if (this.state.profile.fileName !== undefined) {
      pictureUri = this.state.profile.fileName.split("/").pop();
    }

    return (
      <Root>
        <Container>
          <StyledSubHeader
            {...this.props}
            title="Profile"
            linkText="Cancel"
            onPress={() => {
              this.props.navigation.navigate("AllFriends");
            }}
          />
          <StyledContent>
            <View
              style={{
                flex: 1,
                flexDirection: "column"
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 20,
                  fontWeight: "bold"
                }}
              >
                <Text>
                  {this.state.profile.firstName} {this.state.profile.lastName}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Image
                  style={{ height: 200, width: 200, marginLeft: 40 }}
                  source={{
                    uri: `http://68.183.200.44:4000/${pictureUri}`
                  }}
                />
                <View style={{ marginRight: 50 }}>
                  <Text>{this.state.profile.gender}</Text>
                  <Text>{this.state.profile.relationshipStatus}</Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 20,
                  fontWeight: "bold"
                }}
              >
                <Text style={{ marginTop: -50 }}>My kids</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    marginLeft: 40,
                    marginTop: 0
                  }}
                  source={{
                    uri: `http://68.183.200.44:4000/${pictureUri}`
                  }}
                />
                <View style={{ marginRight: 80 }}>
                  <Text />
                  <Text />
                </View>
              </View>
            </View>
          </StyledContent>
        </Container>
      </Root>
    );
  }
}

export default withNavigation(OtherProfile);
