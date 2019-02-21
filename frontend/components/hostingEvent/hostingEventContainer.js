import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { Card, CardItem, Text, Body } from "native-base";
import Colors from "../../constants/Colors";
import moment from "moment";

export const HostingEventContainer = props => (
  <Card style={styles.card}>
    <CardItem header button onPress={() => alert("This is Card Body")}>
      <Text>{props.event.name}</Text>
    </CardItem>
    <CardItem>
      <Body>
        <Text>{moment().format(props.event.time)}</Text>
      </Body>
    </CardItem>
    <CardItem footer>
      <Text>{props.event.description}</Text>
    </CardItem>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    padding: 0
  },
  cardDate: {
    padding: 0
  },
  cardTitle: {
    padding: 0
  },
  cardDescription: {
    padding: 0
  },
  text: {
    color: Colors.darkGunmetal
  }
});
