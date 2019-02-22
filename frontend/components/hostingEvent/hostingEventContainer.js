import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { Card, CardItem, Text, Body } from "native-base";
import Colors from "../../constants/Colors";
import moment from "moment";

export const HostingEventContainer = ({ event }) => {
  return (
    <Card style={styles.card}>
      <CardItem header button onPress={() => alert("This is Card Body")}>
        <Text>{event.name}</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{moment(event.time).format("MMMM Do YYYY, h:mm a")}</Text>
        </Body>
      </CardItem>
      <CardItem footer>
        <Text>{event.desc}</Text>
      </CardItem>
    </Card>
  );
};

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
