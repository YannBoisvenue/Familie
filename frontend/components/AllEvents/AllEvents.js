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
import { fetchUrl } from "../../fetchUrl";

class AllEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { event: [] };
  }

  componentDidMount() {
    console.log("In tha fetch");
    fetch(fetchUrl + "/allEvents", {
      method: "GET"
    })
      .then(function(x) {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        console.log("Show me your body :", body);
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
        console.log("how many maps???");
        return (
          <View key={elem._id}>
            <SingleEvent
              // image={elem.image}
              name={elem.name}
              desc={elem.desc}
              guests={elem.guests}
              location={elem.location}
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
    return <View>{this.renderAllEvents()}</View>;
  }
}

const mapStateToProps = state => {
  return { events: state.events };
};

export default connect(mapStateToProps)(AllEvents);
