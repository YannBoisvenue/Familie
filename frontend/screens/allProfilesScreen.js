import React from "react";
import { StyleSheet } from "react-native";
import { Container, Tab } from "native-base";
import { StyledTabs } from "../StyledComponents/tabs";
import Login from "../components/login";
import Colors from "../constants/Colors.js";
import { StyledLink } from "../StyledComponents/link";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledSubHeader } from "../StyledComponents/textSubHeader";
import HostingScreen from "./HostingScreen";
import AllProfiles from "../components/AllProfiles/AllProfiles";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { SET_USERID } from "../constants/ActionTypes";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    let userId = await AsyncStorage.getItem("userId");
    if (userId) {
      this.props.dispatch({
        type: "SET_USERID",
        payload: userId
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <StyledSubHeader {...this.props} title="All parents" />
        <StyledContent>
          <AllProfiles />
        </StyledContent>
      </Container>
    );
  }
}

const ConnectedProfileScreen = connect()(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.antiFlashWhite
  }
});

export default ConnectedProfileScreen;
