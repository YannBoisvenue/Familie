import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  View,
  Container,
  Text,
  Item as FormItem,
  Label,
  Root
} from "native-base";
import { StyledButton } from "../../StyledComponents/button.js";
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
      query: "",
      otherParentId: "",
      parents: [],
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
    const { parents } = this.state;
    const regex = new RegExp(query.trim(), "i");
    return parents.filter(parent => parent.firstName.search(regex) >= 0);
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
    debugger;

    const h = {};
    let formData = new FormData();
    formData.append("userId", this.props.userId),
      formData.append("kidsInfo", JSON.stringify(kidsInfo[0])),
      formData.append("kidsPicture", {
        uri: kidsInfo[0].kidPicture.uri,
        name: kidsInfo[0].kidPicture.filename,
        type: kidsInfo[0].kidPicture.type
      });
    formData.append("otherParentId", this.state.otherParentId);

    h["content-type"] = "multipart/form-data";

    fetch(fetchUrl + "/add-family", {
      method: "POST",
      headers: h,
      body: formData
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        debugger;
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
      <Root>
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
                      borderColor: Colors.darkGunmetal,
                      width: 200
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={
                      parents.length === 1 && comp(query, parents[0].firstName)
                        ? []
                        : parents
                    }
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Enter the other parent's name"
                    renderItem={({ firstName, lastName, _id }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              query: firstName + " " + lastName,
                              otherParentId: _id
                            });
                          }}
                        >
                          <Text noShadow style={{ borderRadius: 5 }}>
                            {firstName} {lastName}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </FormItem>
              </FormItem>
              <StyledItem type="inlineLabel" label="Your kids">
                <StyledLink content="Add kid" onPress={this.addKid} />
              </StyledItem>
              <View>{newKidsArray}</View>
            </StyledForm>
            <StyledButton
              content="Next"
              color={Colors.queenBlue}
              onPress={this.onNextCreateProfile}
            />
          </StyledContent>
        </Container>
      </Root>
    );
  }
}

export default connect(function(state) {
  return { userId: state.user.userId };
})(CreateProfileAddFamily);
