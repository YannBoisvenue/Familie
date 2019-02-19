import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { Container, Text, Tab } from "native-base";
import { StyledTabs } from "../StyledComponents/tabs";
import Login from "../components/login";
import Colors from "../constants/Colors.js";

export default class StyleScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <StyledTabs color="#F2F4F7">
          <Tab heading="1e choix">
            <Login />
          </Tab>
          <Tab heading="2e choix">
            <Login />
          </Tab>
          <Tab heading="3e choix">
            <Login />
          </Tab>
        </StyledTabs>
      </Container>
    );
  }
}
