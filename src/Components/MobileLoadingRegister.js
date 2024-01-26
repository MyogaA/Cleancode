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
import { BLACK, WHITE } from "../Libraries/Colors";

const dim = Dimensions.get("window");

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { action } = this.props;
    setTimeout(() => {
      //Actions.jump('login');
      //this.goToPage('main');

      action();
    }, 2000);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: WHITE,
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          elevation: 999999999
        }}
      >
        <Image
          style={{
            //position: "absolute",

            width: dim.width,
            height: dim.height * 0.66,
            resizeMode: "contain"
          }}
          // source={require("../Images/loading_logo.png")}
          source={require("../Images/beetloading2.gif")}
        />
        <View
          style={{
            padding: 25
            // position: "absolute",
            // top: "50%",
            // left: 20
            // alignSelf: "center",
            // paddingTop: 42,
            // paddingLeft: 50,
            // flex: 1,
            // justifyContent: "center",
          }}
        >
          <Text style={{ color: BLACK, fontSize: 14 }}>
            {this.props.loadingName ? this.props.loadingName : ""}
            {"\n"}
            {this.props.loadingDescription ? this.props.loadingDescription : ""}
          </Text>
        </View>
      </View>
    );
  }
}
