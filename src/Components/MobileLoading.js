/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image
} from "react-native";
import { BLACK, MAIN_THEME_COLOR_SELECT } from "../Libraries/Colors";
import { _cashlez_help_card_1 } from "../Libraries/DictionaryPayment";
import MainStyle from "../Styles";

const dim = Dimensions.get("window");

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      not_transparent,
      colorIndex,
      languageIndex,
      loadingReader,
    } = this.props;
    return (
      <View
        style={{
          backgroundColor: not_transparent
            ? "rgba(255,255,255,1)"
            : "rgba(255,255,255,0.75)",
          // backgroundColor: not_transparent
          // ? "rgba(0,0,0,1)"
          // : "rgba(0,0,0,0.75)",
          //backgroundColor:  "rgba(255,255,255,0.75)",

          // backgroundColor: "#000",
          // opacity: not_transparent
          // ? 1
          // : 0.75,
          flex: 1,
          //flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          // elevation: 999999999,
          zIndex: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            //backgroundColor: "#BCA",
            flex: 1,
            width: "100%",
            height: "100%",
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                justifyContent: "center",
                //backgroundColor: "#AAA",
                //flex: 1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: loadingReader ? "50%" : "100%",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <Image
                  //resizeMethod= "cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    //resizeMode: "contain"
                    resizeMode: "contain",
                  }}
                  // source={require("../Images/loading_logo.png")}
                  source={require("../Images/beetloading2.gif")}
                /> */}
                <ActivityIndicator size={75} color="#39f" animating={true} />
              </View>
              <View
                style={{
                  //flex: 1,
                  display: loadingReader ? "flex" : "none",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK,
                      textAlign: "center"
                    })
                  }
                >
                  {_cashlez_help_card_1[languageIndex]}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              padding: 20,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                //flex: 1,
                //backgroundColor: "#BCA",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {/* <View style={{ width: 100 }}>
                <ActivityIndicator size={25} color="#39f" animating={true} />
              </View> */}
              {/* <Text style={{ color: "#000", fontSize: 14 }}>
                {this.props.loadingName
                  ? this.props.loadingName
                  : "Loading page"}
                {"\n"}
                {this.props.loadingDescription
                  ? this.props.loadingDescription
                  : "Please Wait"}
              </Text> */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
