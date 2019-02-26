import React, { Component, cloneElement } from "react";
import { connect } from "react-redux";
import { Text, View, Toast } from "native-base";
import { fetchUrl } from "../../fetchUrl.js";
import SingleProfile from "../SingleProfile/SingleProfile";
/**Testing Imports */
import Colors from "../../constants/Colors";
import { StyledLink } from "../../StyledComponents/link";
import Container from "../../native-base-theme/components/Container.js";

class AllProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
  }

  componentDidMount() {
    console.log("In tha fetch");
    fetch(fetchUrl + "/all-parents", {
      method: "GET"
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        console.log("met un baconn en avant :", body.parents);
        if (body.success) {
          this.props.dispatch({
            type: "set_profiles",
            profile: body.parents
          });
          return;
        } else {
          Toast.show({
            text: "You did something wrong!",
            buttonText: "But... no..."
          });
        }
      });
  }

  /* Re-arrange this function */
  renderAllProfiles = () => {
    console.log("ULTIMATE :", this.props);
    if (this.props.profiles !== undefined) {
      console.log("propfiles");
      let newProfileArray = this.props.profiles.map((elem, i) => {
        return (
          <View key={i}>
            <SingleProfile
              firstName={elem.firstName}
              lastName={elem.lastName}
              gender={elem.gender}
              relationshipStatus={elem.relationshipStatus}
              occupation={elem.occupation}
              dateOfBirth={elem.dateOfBirth}
              location={elem.location}
              _id={elem._id}
            />
          </View>
        );
      });
      return newProfileArray;
    }
  };

  render() {
    return <View>{this.renderAllProfiles()}</View>;
  }
}

const mapStateToProps = state => {
  console.log("statpfile", state);
  return { profiles: state.profile.profiles };
};

export default connect(mapStateToProps)(AllProfiles);
