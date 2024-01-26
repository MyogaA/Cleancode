/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import {
  BLACK,
  MAIN_TEXT_COLOR_SELECT,
  MAIN_THEME_COLOR_SELECT,
} from "../Libraries/Colors";
import { _login_failed } from "../Libraries/DictionaryLogin";

import { _cashlez_help_card_1 } from "../Libraries/DictionaryPayment";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MainStyle from "../Styles";

const dim = Dimensions.get("window");

export default class LoadingReader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { not_transparent, colorIndex, languageIndex } = this.props;
    return (
      <View
        style={{
          backgroundColor: not_transparent
            ? "rgba(255,255,255,1)"
            : "rgba(255,255,255,0.75)",
          //backgroundColor:  "rgba(255,255,255,0.75)",
          flex: 1,
          //flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          elevation: 999999999
        }}
      >
        <View
          style={{
            justifyContent: "center",
            //backgroundColor: "#BCA",
            flex: 1,
            width: "100%",
            height: "100%"
          }}
        >
          <View
            style={{
              width: "80%",
              height: "50%",
              //backgroundColor: "#BCA",
              alignContent: "center",
              alignSelf: "center",
              alignItems: "center",
              padding: 15,
            }}
          >
            <MaterialCommunityIcons
              name="credit-card-scan"
              style={{
                //backgroundColor: '#BCA',
                //backgroundColor:"#ACD",
                //position: "absolute",

                fontSize: 25
              }}
            />


            <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 15,
                  color: BLACK
                })
              }
            >
              {_cashlez_help_card_1[languageIndex]}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
