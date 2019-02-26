import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  View,
  Container,
  Text,
  Item as FormItem,
  Label,
  Root,
  TouchableOpacity
} from "native-base";
import { StyledButton } from "../../StyledComponents/button.js";
import { ImagePicker, Permissions } from "expo";
import Autocomplete from "react-native-autocomplete-input";
import SingleKid from "../SingleKid";
import { StyledContent } from "../../StyledComponents/mainContainer";
import { StyledForm } from "../../StyledComponents/form.js";
import { StyledItem } from "../../StyledComponents/formItem.js";
import { StyledLink } from "../../StyledComponents/link.js";
import { StyledSubHeader } from "../../StyledComponents/textSubHeader";
import Colors from "../../constants/Colors";
import { fetchUrl } from "../../fetchUrl.js";
import { PROFILE_COMPLETE } from "../../constants/ActionTypes.js";

class CreateProfileAddFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentId: "",
      query: "",
      otherParentName: "",
      kids: []
    };
  }

  componentDidMount = () => {
    fetch(fetchUrl + "/all-parents")
      .then(res => res.json())
      .then(json => {
        const parents = json.parents;
        this.setState({ parents });
      });
  };

  static navigationOptions = {
    header: null
  };

  findParent = query => {
    if (query === "") {
      return [];
    }
    const parents = this.state.parents;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(query.trim(), "i");
    //return the filtered film array according the query from the input
    return parents.filter(parent => parent.firstname.search(regex) >= 0);
  };

  addKid = () => {
    this.state.kids.push({});
    this.setState({
      kids: this.state.kids
    });
  };

  getKidRef = ref => {
    this.state.kids[this.state.kids.length - 1] = ref;
  };

  onNextCreateProfile = event => {
    event.preventDefault();
    let kidsInfo = this.state.kids.map(kid => kid.state);

    const h = {};
    let formData = new FormData();
    formData.append("userId", this.props.userId),
      formData.append("kidsInfo", kidsInfo),
      formData.append("otherParentName", this.state.otherParentName);

    h.Accept = "application/json";

    fetch(fetchUrl + "/add-family", {
      method: "POST",
      headers: h,
      body: formData
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (!body.success) {
          return;
        }
        this.props.dispatch({
          type: PROFILE_COMPLETE
        });
        this.props.navigation.navigate("Events");
      });
  };

  render() {
    const { query } = this.state;
    const parents = this.findParent(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    let newKidsArray = this.state.kids.map((kid, index) => {
      return <SingleKid key={index} onRef={ref => this.getKidRef(ref)} />;
    });

    return (
      <Container>
        <StyledSubHeader
          {...this.props}
          title="Step 2 - Add your family"
          linkText=""
          onPress={null}
          color={Colors.desire}
          textColor="#fff"
        />
        <StyledContent>
          <StyledForm>
            <FormItem
              noShadow
              inlineLabel
              style={{
                paddingLeft: 0,
                marginBottom: 15,
                marginLeft: 0,
                borderColor: "transparent"
              }}
            >
              <Label style={{ color: Colors.darkGunmetal, fontSize: 17 }}>
                Other parent
              </Label>
              <FormItem>
                <Autocomplete
                  inputContainerStyle={{
                    elevation: 0,
                    shadowOpacity: 0,
                    borderRadius: 2,
                    borderStyle: "solid",
                    borderColor: Colors.darkGunmetal
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  data={
                    parents.length === 1 && comp(query, parents[0].firstname)
                      ? []
                      : parents
                  }
                  defaultValue={query}
                  onChangeText={text => this.setState({ query: text })}
                  placeholder="Enter the other parent's name"
                  renderItem={({ firstname, lastname }) => (
                    <TouchableOpacity
                      onPress={() => this.setState({ query: firstname })}
                    >
                      <Text noShadow style={{ borderRadius: 5 }}>
                        {firstname} {lastname}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </FormItem>
            </FormItem>
            <StyledItem type="inlineLabel" label="Your kids">
              <StyledLink content="Add kid" onPress={this.addKid} />
            </StyledItem>
            <View>{newKidsArray}</View>
            <StyledButton
              content="Next"
              color={Colors.queenBlue}
              onPress={this.onNextCreateProfile}
            />
          </StyledForm>
        </StyledContent>
      </Container>
    );
  }
}

export default connect(function(state) {
  return { userId: state.userId };
})(CreateProfileAddFamily);
