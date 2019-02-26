import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Header, Body, Title, Right } from "native-base";
import Colors from "../constants/Colors";
import { StyledLink } from "./link";

export const StyledSubHeader = ({
  linkText,
  title,
  onPress,
  color,
  textColor
}) => {
  let backgroundColor = "#fff";
  let titlecolor = Colors.desire;

  if (color) {
    backgroundColor = color;
  }

  if (textColor) {
    titlecolor = textColor;
  }

  return (
    <React.Fragment>
      <Header
        hasText
        noShadow
        style={{ ...styles.Header, backgroundColor: backgroundColor }}
      >
        <Body style={{ paddingLeft: 0 }}>
          <Title
            style={{
              color: titlecolor,
              width: 250,
              paddingLeft: 0,
              textAlign: "left"
            }}
          >
            {title}
          </Title>
        </Body>
        <Right style={{ paddingRight: 10 }}>
          <StyledLink content={linkText} onPress={onPress} />
        </Right>
      </Header>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  Header: {
    height: 50,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingTop: 0
  }
});
