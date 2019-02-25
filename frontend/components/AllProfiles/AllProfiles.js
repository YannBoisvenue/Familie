import React, { Component, cloneElement } from "react";
import { connect } from "react-redux";
import { Text, View, Toast } from "native-base";
import SingleEvent from "../SingleEvent/SingleEvent.js";
import { fetchUrl } from "../../fetchUrl.js";
import SingleProfile from "../SingleProfile/SingleProfile";

class AllProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
  }

  componentDidMount() {
    console.log("In tha fetch");
    fetch(fetchUrl + "/allProfiles", {
      method: "GET"
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        console.log("Show me your body :", body);
        if (body.success) {
          console.log("bawdy suxxess", body);
          this.props.dispatch({
            type: "set_profiles",
            profile: body.profiles
          });
          return;
        } else {
          console.log("bawdy suxxess is FAWLZ");
          Toast.show({
            text: "You did something wrong!",
            buttonText: "But... no..."
          });
        }
      });
  }

  /* Re-arrange this function */
  renderAllProfiles = () => {
    if (this.props.profiles !== undefined) {
      console.log("propfiles");
      let newProfileArray = this.props.profiles.map((elem, i) => {
        console.log("are my props working?", this.props.profile);
        console.log("show me your elem", elem);
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
    return (
      <View>
        <Text>All of the profiles! Everyone is here!</Text>
        {this.renderAllProfiles()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log("statpfile", state);
  return { profiles: state.profile.profiles };
};

export default connect(mapStateToProps)(AllProfiles);
