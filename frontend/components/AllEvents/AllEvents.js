import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  View,
  Card,
  CardItem,
  Toast,
  Root
} from "native-base";
import Colors from "../../constants/Colors";

export default class AllEvents extends Component {
  constructor(props) {
    super();
    this.state = { event: [] };
  }

  render() {
    fetch(fetchUrl + "/addevent", {
      method: "GET"
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        console.log("parseBody", body);
        if (!body.success) {
          Toast.show({
            text: "You did wrong!",
            buttonText: "Ok..."
          });
          return;
        } else {
        }
      });
  }
}

// paste in app to make it render for testing
// return (
//     <View>
//       <AllEvent />
//     </View>
//   );
