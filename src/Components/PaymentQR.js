/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
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
import {
  WHITE,
  MAIN_THEME_COLOR,
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
import { _kembali } from "../Libraries/DictionaryHome";
import { _payment_type, _total } from "../Libraries/DictionaryHistory";

export default class PaymentQR extends Component {
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
    let { actions, closeText, payment, total, languageIndex } = this.props;
    let { width, height } = Dimensions.get("window");

    if (!closeText) {
      closeText = _kembali[this.props.languageIndex];
    }

    if (!payment) {
      payment = "Go-Pay";
    }

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.closeModal(actions);
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "30%",
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
              <View style={{ position: "absolute", right: 10, top: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.closeModal(actions);
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
              </View>
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
                    marginTop: 0,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 5,
                    paddingBottom: 5,
                    width: "75%",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderColor: BLACK
                    //height: '100%',
                    //backgroundColor:'#555'
                  }}
                >
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: 20,
                        //alignSelf : "center"
                        textAlign: "center",
                        color: "rgba(78, 171, 223, 0.99)"
                      }
                    ]}
                  >
                    {_payment_type[languageIndex]} {payment}
                  </Text>
                </View>
                <View
                  style={{
                    //flex:1,
                    marginTop: 0,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center"
                    //height: '100%',
                    //backgroundColor:'#555'
                  }}
                >
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: 20,
                        //alignSelf : "center"
                        textAlign: "center"
                      }
                    ]}
                  >
                    {_total[languageIndex]} {total}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {/* ios-checkmark-circle-outline */}
                  {/* <Ionicons
                    name={"ios-checkmark-circle-outline"}
                    size={150}
                    style={{ color: "#7AB93C" }}
                  /> */}
                  {/* <Image
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri:
                        "https://facebook.github.io/react-native/img/tiny_logo.png"
                    }}
                  /> */}
                  <Image source={require("../Images/QR1.png")} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <View
                    style={{
                      width: "50%",
                      //flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 15,
                      marginBottom: 0
                      //backgroundColor: '#ABC'
                    }}
                  >
                    <Button
                      onPress={() => {
                        this.closeModal(actions);
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          minWidth: 100,
                          backgroundColor: "rgba(49, 150, 206, 0.59)",
                          borderRadius: 15,
                          padding: 5,
                          marginTop: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 12,
                              color: WHITE,
                              textAlign: "center"
                            }
                          ]}
                        >
                          Cetak Barcode
                        </Text>
                      </View>
                    </Button>
                    <Button
                      onPress={() => {
                        this.closeModal(actions);
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          minWidth: 100,
                          backgroundColor: "rgba(49, 150, 206, 0.59)",
                          borderRadius: 15,
                          padding: 5,
                          marginTop: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 12,
                              color: WHITE,
                              textAlign: "center"
                            }
                          ]}
                        >
                          Lanjutkan
                        </Text>
                      </View>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
