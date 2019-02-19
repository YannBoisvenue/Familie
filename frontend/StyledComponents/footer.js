import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Footer, Button, Icon, FooterTab, Text } from "native-base";

export const StyledFooter = props => (
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
