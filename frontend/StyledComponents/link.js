import React from "react";
import { Button, Text } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { navigation } from "react-navigation";

export const StyledLink = ({ onPress, content, color, bold, fontSize }) => {
  let linkColor = Colors.queenBlue;
  let fontWeight = "normal";
  let textSize = 17;

  if (color) {
    linkColor = color;
  }

  if (bold) {
    fontWeight = "bold";
  }

  if (fontSize) {
    textSize = fontSize;
  }

  return (
    <Button hasText transparent style={styles.url} onPress={onPress}>
      <Text
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          color: linkColor,
          fontWeight: fontWeight,
          fontSize: textSize
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
