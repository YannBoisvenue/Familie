import React from "react";
import { Icon } from "native-base";
import Colors from "../constants/Colors";

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        type={this.props.type}
        style={{
          marginBottom: -3,
          color: `${this.props.focused ? Colors.desire : Colors.tabIconDefault}`
        }}
        active={this.props.focused}
      />
    );
  }
}
