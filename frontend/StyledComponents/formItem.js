import React from "react";
import { StyleSheet } from "react-native";
import { Item, Label } from "native-base";
import Colors from "../constants/Colors";

export const StyledItem = ({ label, type, children }) => {
  let paddingBot = 0;
  if (type === "floatingLabel") {
    paddingBot = 5;
  }

  return (
    <Item
      floatingLabel={type === "floatingLabel" ? true : false}
      fixedLabel={type === "fixedLabel" ? true : false}
      inlineLabel={type === "inlineLabel" ? true : false}
      style={{ ...styles.item, paddingBottom: paddingBot }}
    >
      <Label style={{ ...styles.label }}>{label}</Label>
      {children}
    </Item>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.darkGunmetal,
    fontSize: 17
  },
  item: {
    paddingLeft: 0,
    marginBottom: 15,
    marginLeft: 0,
    borderColor: Colors.darkGunmetal,
    borderBottomWidth: 1
  },
  input: {
    fontSize: 17,
    color: Colors.darkGunmetal,
    opacity: 0.75
  }
});
