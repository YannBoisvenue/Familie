import React from "react";
import { StyleSheet } from "react-native";
import { Form } from "native-base";

export const StyledForm = ({ children }) => (
  <React.Fragment>
    <Form style={styles.form}>{children}</Form>
  </React.Fragment>
);

const styles = StyleSheet.create({
  form: {
    marginBottom: 10
  }
});
