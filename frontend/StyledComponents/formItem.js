import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Form, Item, Input, Label } from "native-base";
import Colors from "../constants/Colors";

export const StyledItem = ({ label, type }) => {
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
      <Input style={styles.input} />
    </Item>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.darkGunmetal,
    fontSize: 20
  },
  item: {
    marginBottom: 15,
    marginLeft: 0,
    borderColor: Colors.darkGunmetal,
    borderBottomWidth: 1
  },
  input: {
    fontSize: 20,
    color: Colors.darkGunmetal,
    opacity: 0.75
  }
});
