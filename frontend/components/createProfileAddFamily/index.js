import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  Root,
  Picker,
  Icon,
  DatePicker,
  Content,
  TouchableOpacity
} from "native-base";
import { StyledButton } from "../../StyledComponents/button.js";
import { ImagePicker, Permissions } from "expo";
import Autocomplete from "react-native-autocomplete-input";
import SingleKid from "../SingleKid";
import { fetchUrl } from "../../fetchUrl.js";

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

    fetch("http://localhost:4000/add-family", {
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
          <Header>
            <Body>
              <Title>The Social Family</Title>
            </Body>
          </Header>
          <Title>Your family</Title>
          <Content>
            <Form>
              <FormItem>
                <Label>Other parent</Label>
                <FormItem>
                  <Autocomplete
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
                        <Text>
                          {firstname} {lastname}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </FormItem>
              </FormItem>
              <FormItem>
                <Label>Your kids</Label>
                <StyledButton content="Add kid" onPress={this.addKid} />
              </FormItem>
              <FormItem>{newKidsArray}</FormItem>
              <StyledButton content="Next" onPress={this.onNextCreateProfile} />
            </Form>
          </Content>
        </Container>
      </Root>
    );
  }
}

export default connect(function(state) {
  return { userId: state.userId };
})(CreateProfileAddFamily);
