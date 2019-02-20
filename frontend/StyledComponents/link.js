import React from "react";
import { Button, Text } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const StyledLink = ({ content, onPress }) => (
  <Button hasText transparent style={styles.url} onPress={onPress}>
    <Text style={{ paddingLeft: 0, paddingRight: 0, color: Colors.queenBlue }}>
      {content}
    </Text>
  </Button>
);

const styles = StyleSheet.create({
  url: {
    paddingLeft: 0,
    paddingRight: 0
  }
});
