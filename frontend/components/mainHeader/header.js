import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Header, Button, Left, Right, Body, Title, Icon } from "native-base";
import { connect } from "react-redux";

const StyledHeader = ({ userId }) => {
  console.log(userId);
  if (!userId) {
    return <React.Fragment />;
  }
  return (
    <React.Fragment>
      <Header>
        {/* <Left>
        <Button transparent>
          <Icon type="AntDesign" name="arrowleft" />
        </Button>
      </Left> */}
        <Body style={{ paddingLeft: 15 }}>
          <Title>Familie</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon type="AntDesign" name="bells" />
          </Button>
          <Button transparent>
            <Icon name="more" />
          </Button>
        </Right>
      </Header>
    </React.Fragment>
  );
};

let ConnectedHeader = connect(state => {
  return { userId: state.user.userId };
})(StyledHeader);

export default ConnectedHeader;
