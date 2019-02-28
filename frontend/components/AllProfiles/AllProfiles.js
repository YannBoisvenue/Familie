import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Toast } from "native-base";
import { fetchUrl } from "../../fetchUrl.js";
import SingleProfile from "../SingleProfile/SingleProfile";

class AllProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
  }

  componentDidMount() {
    fetch(fetchUrl + "/all-parents", {
      method: "GET"
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
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

  renderAllProfiles = () => {
    if (this.props.profiles !== undefined) {
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
              profilePicture={elem.fileName}
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
  return { profiles: state.profile.profiles };
};

export default connect(mapStateToProps)(AllProfiles);
