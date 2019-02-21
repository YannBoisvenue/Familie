import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Header, Body, Title, Right } from "native-base";
import Colors from "../constants/Colors";
import { StyledLink } from "./link";

export const StyledSubHeader = ({ linkText, title, onPress }) => (
  <React.Fragment>
    <Header
      hasText
      noShadow
      style={{ ...styles.Header, backgroundColor: Colors.antiFlashWhite }}
    >
      <Body>
        <Title style={{ color: Colors.desire }}>{title}</Title>
      </Body>
      <Right style={{ paddingRight: 10 }}>
        <StyledLink content={linkText} onPress={onPress} />
      </Right>
    </Header>
  </React.Fragment>
);

const styles = StyleSheet.create({
  Header: {
    height: 50,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingTop: 0
  }
});
