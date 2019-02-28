import React, { Component } from "react";
import { Image } from "react-native";
import { Text, Root, Container, Icon, Item } from "native-base";
import { fetchUrl } from "../../fetchUrl";
import moment from "moment";
import { StyledSubHeader } from "../../StyledComponents/textSubHeader";
import { StyledContent } from "../../StyledComponents/mainContainer";
import { withNavigation } from "react-navigation";
import Colors from "../../constants/Colors";

class DisplayEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id", null),
      event: {}
    };

    fetch(`${fetchUrl}/event/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        let result = res.result;
        let filenameArr = result.fileName.split("/");
        let pictureToShow = "/" + filenameArr[filenameArr.length - 1];
        result = { ...result, fileName: pictureToShow };
        this.setState({ event: result });
      });
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Root>
        <Container>
          <StyledSubHeader
            {...this.props}
            title="Event"
            linkText="Back"
            onPress={() => {
              this.props.navigation.navigate("Events");
            }}
          />
          <StyledContent>
            <Image
              style={{ height: 200, width: 350 }}
              source={{
                uri: "http://68.183.200.44:4000" + this.state.event.fileName
              }}
            />
            <Text
              style={{
                color: Colors.darkGunmetal,
                fontWeight: "bold",
                fontSize: 21,
                paddingBottom: 15,
                paddingTop: 15
              }}
            >
              {this.state.event.name}
            </Text>
            <Text>
              {moment(this.state.event.time).format("MMM Do YYYY, h:mm a")}
            </Text>
            <Text
              style={{
                paddingTop: 15,
                fontWeight: "bold"
              }}
            >
              Details:{" "}
            </Text>
            <Text
              style={{
                paddingTop: 5
              }}
            >
              {this.state.event.desc}
            </Text>
            <Item style={{ borderColor: "transparent", paddingTop: 5 }}>
              <Icon
                type="Feather"
                name="map-pin"
                style={{
                  fontSize: 20,
                  width: 26
                }}
              />
              <Text>{this.state.event.location}</Text>
            </Item>
          </StyledContent>
        </Container>
      </Root>
    );
  }
}

export default withNavigation(DisplayEvent);
