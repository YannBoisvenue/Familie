import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Header, Button, Left, Right, Body, Title, Icon } from "native-base";

export const StyledHeader = props => (
  <React.Fragment>
    <Footer>
      <FooterTab>
        <Button vertical>
          <Icon name="apps" />
          <Text>Apps</Text>
        </Button>
        <Button vertical>
          <Icon name="camera" />
          <Text>Camera</Text>
        </Button>
        <Button vertical active>
          <Icon active name="navigate" />
          <Text>Navigate</Text>
        </Button>
        <Button vertical>
          <Icon name="person" />
          <Text>Contact</Text>
        </Button>
      </FooterTab>
    </Footer>
  </React.Fragment>
);
