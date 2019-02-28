import React from "react";
import { Header, Button, Right, Body, Title, Icon } from "native-base";
import { connect } from "react-redux";

const StyledHeader = ({ userId }) => {
  if (!userId) {
    return <React.Fragment />;
  }
  return (
    <React.Fragment>
      <Header>
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
