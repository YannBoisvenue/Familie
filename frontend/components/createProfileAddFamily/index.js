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

class CreateProfileAddFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parents: [],
      query: "",
      otherParentName: "",
      kidName: "",
      kidGender: "",
      kidDateOfBirth: "",
      kidPicture: "",
      kidPictureType: ""
    };
  }

  componentDidMount = () => {
    fetch("http://68.183.200.44:4000/all-parents")
      .then(res => res.json())
      .then(json => {
        const parents = json.parents;
        console.log("json", parents);
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

  getPicture = async type => {
    const { status } = await Permissions.askAsync(type);

    if (status === "granted") {
      const options = { allowsEditing: true, aspect: [4, 3] };
      let result = null;
      if (type === Permissions.CAMERA_ROLL) {
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        result = await ImagePicker.launchCameraAsync(options);
      }

      if (!result.cancelled) {
        this.setState({ picture: result.uri, pictureType: type });
      }
    }
  };

  pickPicture = async () => {
    this.getPicture(Permissions.CAMERA_ROLL);
  };

  takePicture = async () => {
    this.getPicture(Permissions.CAMERA);
  };

  onNextCreateProfilePress = event => {
    event.preventDefault();

    const h = {};
    let formData = new FormData();
    formData.append("kidName", this.state.kidName),
      formData.append("profilePicture", this.state.kidPicture),
      (h.Accept = "application/json");

    fetch("http://68.183.200.44:4000/addKid", {
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
        this.props.navigation.navigate("CreateProfileAddFamily");
      });
  };

  render() {
    const { query } = this.state;
    const parents = this.findParent(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    let kidPicture = this.state.kidPicture;

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
                <StyledButton transparent>
                  <Text>Search</Text>
                </StyledButton>
              </FormItem>
              <FormItem>
                <StyledButton
                  content="Pick a picture from camera roll"
                  onPress={this.pickPicture}
                />
                {!!kidPicture && pictureType === Permissions.CAMERA_ROLL && (
                  <Image
                    source={{ uri: kidPicture }}
                    style={{ width: 100, height: 100 }}
                  />
                )}
              </FormItem>
              <FormItem>
                <StyledButton
                  content="Take a picture"
                  onPress={this.takePicture}
                />
                {!!kidPicture && pictureType === Permissions.CAMERA && (
                  <Image
                    source={{ uri: kidPicture }}
                    style={{ width: 100, height: 100 }}
                  />
                )}
              </FormItem>
              <FormItem>
                <Label>I'm a</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Boy or Girl"
                  selectedValue={this.state.kidGender}
                  onValueChange={this.onValueChangeKidGender}
                >
                  <Picker.Item label="Boy" value="key0" />
                  <Picker.Item label="Girl" value="key1" />
                </Picker>
              </FormItem>
              <Title>About you</Title>
              <FormItem>
                <Label>Kid Date of birth</Label>
                <DatePicker
                  defaultDate={new Date(2010, 1, 1)}
                  minimumDate={new Date(1900, 1, 1)}
                  maximumDate={new Date(2020, 12, 31)}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select date"
                  onDateChange={this.setKidBirthDate}
                  disabled={false}
                />
                <Text>
                  {this.state.kidDateOfBirth.toString().substr(4, 12)}
                </Text>
              </FormItem>
              <StyledButton
                content="Next"
                onPress={this.onNextCreateProfilePress}
              />
            </Form>
          </Content>
        </Container>
      </Root>
    );
  }
}

export default connect(function(state) {
  return {};
})(CreateProfileAddFamily);
