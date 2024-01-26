/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */

import React from "react";
import { Platform, TouchableNativeFeedback } from "react-native";
import Ripple from "react-native-material-ripple";

const Button = props => {
  return Platform.OS === "ios" ? (
    <Ripple {...props}>{props.children}</Ripple>
  ) : (
    <Ripple
      delayPressIn={0}
      background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
      {...props}
    >
      {props.children}
    </Ripple>
  );
};

module.exports = Button;
export default Button;
