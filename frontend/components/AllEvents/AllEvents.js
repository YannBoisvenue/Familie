import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item,
  Input,
  Label,
  Title,
  View,
  Card,
  CardItem,
  Toast,
  Root
} from "native-base";
import SingleEvent from "../SingleEvent/SingleEvent.js";

class AllEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { event: [] };
  }

  render() {
    fetch("http://68.183.200.44:4000/addevent", {
      method: "GET"
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (body.success) {
          this.props.dispatch({
            type: "setEvents",
            event: body.events
          });
          return;
        } else {
          Toast.show({
            text: "You did wrong!",
            buttonText: "Ok..."
          });
        }
      });
  }

  renderAllEvents = () => {
    if (this.props.events !== undefined) {
      let newEventsArray = this.props.events.events.map((elem, i) => {
        return (
          <View key={elem._id}>
            <SingleEvent
              image={elem.image}
              name={elem.name}
              desc={elem.desc}
              locaction={elem.locaction}
              time={elem.time}
              _id={elem._id}
            />
          </View>
        );
      });
      return newEventsArray;
    }
  };

  render() {
    return (
      <View>
        <Text>All events</Text>
        {this.renderAllEvents()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.events }; //maploc = moi qui decide le nom. => .location, faut ca match le nom dans le state global (dans le reducer, voir *k1)
};

export default connect(mapStateToProps)(AllEvents);

// paste in app to make it render for testing
// return (
//     <View>
//       <AllEvents />
//     </View>
//   );
