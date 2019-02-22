import React from "react";
import { Button, Text } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const StyledLink = ({ onPress, content, color, bold }) => {
  let linkColor = Colors.queenBlue;
  let fontWeight = "normal";

  if (color) {
    linkColor = color;
  }

  if (bold) {
    fontWeight = "bold";
  }

  return (
    <Button hasText transparent style={styles.url} onPress={onPress}>
      <Text
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          color: linkColor,
          fontWeight: fontWeight,
          fontSize: 17
        }}
      >
        {content}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  url: {
    paddingLeft: 0,
    paddingRight: 0
  }
});
