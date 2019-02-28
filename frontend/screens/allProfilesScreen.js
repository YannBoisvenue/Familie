import React from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";
import Colors from "../constants/Colors.js";
import { StyledContent } from "../StyledComponents/mainContainer";
import { StyledSubHeader } from "../StyledComponents/textSubHeader";
import AllProfiles from "../components/AllProfiles/AllProfiles";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";

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
