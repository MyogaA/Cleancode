/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Button,
  View,
  Text
} from "react-native";
import Maticons from "react-native-vector-icons/MaterialIcons";
import Ripple from "react-native-material-ripple";
import PropTypes from "prop-types";

import {
  WHITE,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SUB
} from "../Libraries/Colors";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //checked: false
    };
  }

  render() {
    const { checked, action, label } = this.props;

    let { size, labelStyle, color } = this.props;
    size = size ? size : 25;
    labelStyle = labelStyle ? labelStyle : {};

    return (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (action) {
              action();
            }
          }}
        >
          <View>
            {checked ? (
              <Maticons
                name="check-box"
                style={{ color: color ? color : WHITE, fontSize: size }}
              />
            ) : (
              <Maticons
                name="check-box-outline-blank"
                style={{ color: color ? color : WHITE, fontSize: size }}
              />
            )}
          </View>
        </TouchableOpacity>

        {label ? (
          <View>
            <Text style={labelStyle}>{label}</Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

Checkbox.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  checked: PropTypes.bool,
  action: PropTypes.func.isRequired,
  size: PropTypes.number,
  label: PropTypes.string,
  labelStyle: PropTypes.object
};
