import React from "react";
import { Button, Text } from "native-base";
import { StyleSheet } from "react-native";

export const StyledButton = ({ content, onPress, disabled, color }) => (
  <Button
    full
    style={{ ...styles, backgroundColor: color }}
    onPress={onPress}
    disabled={disabled}
  >
    <Text>{content}</Text>
  </Button>
);

const styles = StyleSheet.create({
  Button: {
    padding: 10
  }
});
