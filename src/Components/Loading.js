/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";

const dim = Dimensions.get("window");

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          // backgroundColor: "rgba(0,0,0,0.75)",
          backgroundColor: "#000",

          opacity: 0.75,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          elevation: 999999999,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: 300,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <ActivityIndicator size="large" color="#39f" animating={true} />
            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "#777", fontSize: 14 }}>
                {this.props.loadingName
                  ? this.props.loadingName
                  : "Loading page"}
                {"\n"}
                {this.props.loadingDescription
                  ? this.props.loadingDescription
                  : "Please Wait"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
