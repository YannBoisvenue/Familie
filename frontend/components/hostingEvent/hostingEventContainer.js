import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Alert } from "react-native";
import {
  Card,
  Text,
  Body,
  Right,
  Icon,
  Button,
  Left,
  CardItem,
  Container
} from "native-base";
import Colors from "../../constants/Colors";
import moment from "moment";
import { nominalTypeHack } from "prop-types";
import { StyledLink } from "../../StyledComponents/link";

export const HostingEventContainer = ({ event }) => {
  let description = event.desc;

  if (event.desc.length > 25) {
    description = event.desc.slice(0, 24) + "...";
  }

  return (
    <Card noShadow style={styles.card}>
      <CardItem>
        <Container style={{ height: 100 }}>
          <StyledLink
            bold
            color={Colors.darkGunmetal}
            content={event.name}
            onPress={() => alert("This is Card Body")}
            style={styles.cardTitle}
          />
          <Text style={styles.cardDate}>
            {moment(event.time).format("MMM Do YYYY, h:mm a")}
          </Text>
          <Text>{description}</Text>
        </Container>
        <Right style={{ flex: -1 }}>
          <Button
            transparent
            onPress={() => {
              Alert.alert("Remove this event");
            }}
          >
            <Icon
              style={{ fontSize: 30, color: Colors.lightBlue }}
              type="FontAwesome"
              name="trash-o"
            />
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderColor: "transparent",
    borderRadius: 5
  },
  cardDate: {
    paddingBottom: 7,
    color: Colors.darkGunmetal,
    opacity: 0.75
  },
  cardTitle: {
    paddingBottom: 7,
    color: Colors.darkGunmetal
  },
  cardDescription: {
    paddingBottom: 7,
    color: Colors.darkGunmetal
  }
});
