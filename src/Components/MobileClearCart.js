/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text as DefaultText,
  Image,
  Picker,
  Modal,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Alert,
  TouchableOpacity,
  Dimensions
} from "react-native";
import DeviceInfo from "react-native-device-info";

import {
  WHITE,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  MAIN_THEME_COLOR_SUB,
  RED_400,
  BLACK
} from "../Libraries/Colors";

import { Actions } from "react-native-router-flux";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import FA5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Button from "./Button";
import Checkbox from "./Checkbox";
import FloatingLabelInput from "./FloatingTextInput";
import Text from "./Text";
import MainStyle from "../Styles";
import { _yes } from "../Libraries/DictionarySetting";
import { _delete_confirmation_cart, _simpan } from "../Libraries/DictionaryHome";

export default class ClearCart extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isOpen: true,
    // };
  }

  componentDidMount() {
    //this.setState({isOpen: true});
    //this.renderAlert();
  }

  closeModal(closeAction) {
    if (typeof closeAction === "function") {
      closeAction();
    }
    //this.setState({isOpen: false});
  }

  render() {
    let {
      message,
      title,
      backAction,
      colorIndex,
      languageIndex,
      submitAction
    } = this.props;
    let { width, height } = Dimensions.get("window");
    // if (!closeText) {
    //   closeText = "Go Back";
    // }

    let closeText = _simpan[languageIndex];
    // let submitText = _yes[languageIndex];

    // let clearText = _delete_confirmation_cart[languageIndex]

    const tablet = DeviceInfo.isTablet();

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.closeModal(backAction);
          }}
        >
          <View
            style={{
              flex: 1,
              width: tablet ? "100%" : "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: tablet ? (width - 40) / 2: width - 40,
                minHeight: height * 0.2,
                //maxHeight: height * 0.6,
                backgroundColor: WHITE,
                borderRadius: 10,
                marginLeft: 20,
                marginRight: 20
                //marginTop: height * 0.25,
                //marginBottom: height * 0.25,
              }}
            >
              {/* <View style={{ position: "absolute", right: 10, top: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.closeModal(backAction);
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
              </View> */}
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 20,
                  marginBottom: 20
                  //backgroundColor:'#BCA'
                }}
              >
                <View
                  style={{
                    //flex:1,
                    marginTop: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center"
                    //height: '100%',
                    //backgroundColor:'#555'
                  }}
                >
                  <View
                    style={{
                      //justifyContent: 'center',
                      //alignItems: 'center',
                      //flex:1,
                      //backgroundColor:'#999',
                      width: "95%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 0,
                      marginBottom: 5
                    }}
                  >
                    <Text
                      style={
                        ([MainStyle.robotoNormalBold],
                        {
                          fontSize: 14,
                          //alignSelf : "center"
                          textAlign: "center"
                        })
                      }
                    >
                      Attention: Your cart contains items. Select 'Save' or 'Delete' before leaving the page
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "90%",
                    //flex: 1,
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    alignItems: "center",
                    //padding: 15,
                    marginBottom: 0
                    //backgroundColor: "#ABC"
                  }}
                >
                  <Button
                    style={{ width: "45%", padding: 15 }}
                    onPress={() => {
                      this.closeModal(backAction);
                    }}
                  >
                    <View
                      style={{
                        minHeight: 25,
                        minWidth: 75,
                        backgroundColor: MAIN_THEME_COLOR_SELECT(
                          this.props.colorIndex
                        ),
                        borderRadius: 10
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          {
                            fontSize: 12,
                            color: WHITE,
                            marginBottom: 5,
                            marginTop: 5,
                            marginLeft: 10,
                            marginRight: 10,
                            textAlign: "center"
                          }
                        ]}
                      >
                        {closeText}
                      </Text>
                    </View>
                  </Button>
                  <Button
                    style={{ width: "45%", padding: 15 }}
                    onPress={() => {
                      this.closeModal(submitAction);
                    }}
                  >
                    <View
                      style={{
                        minHeight: 25,
                        minWidth: 75,

                        backgroundColor: MAIN_THEME_COLOR_SELECT(
                          this.props.colorIndex
                        ),
                        borderRadius: 10
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          {
                            fontSize: 12,
                            color: WHITE,
                            marginBottom: 5,
                            marginTop: 5,
                            marginLeft: 10,
                            marginRight: 10,
                            textAlign: "center"
                          }
                        ]}
                      >
                        Delete
                      </Text>
                    </View>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
