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
import DeviceInfo from "react-native-device-info";
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

import {
  _pembayaran,
  _discount_promo,
  _cash,
  _card,
  _ewallet,
  _cash_amount,
  _sukses,
  _change_amount,
  _no_change,
  _terima_kasih,
  _kirim_ke,
  _print_receipt,
  _kembali,
  _paid_by
} from "../Libraries/DictionaryPayment";

export default class PaymentSuccess extends Component {
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

  changeEmail(action, text) {
    if (typeof action === "function") {
      action(text);
    }
  }

  render() {
    let {
      actions,
      closeText,
      payment,
      total,
      changeEmail,
      email,
      transId,
      languageIndex
    } = this.props;
    let { width, height } = Dimensions.get("window");
    console.log("total ==> ", total);

    if (!closeText) {
      closeText = _kembali[languageIndex];
    }

    if (!payment) {
      payment = "Go-Pay";
    }

    const _isTablet = DeviceInfo.isTablet();

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
                width: _isTablet ? "30%" : "95%",
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
                    alignItems: "center"
                    //borderBottomWidth: 1,
                    //borderColor: BLACK
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
                    {_pembayaran[languageIndex]} {_sukses[languageIndex]}
                  </Text>
                  <Text
                    style={[
                      MainStyle.dmSansLight,
                      {
                        fontSize: 20,
                        //alignSelf : "center"
                        textAlign: "center"
                      }
                    ]}
                  >
                    {_paid_by[languageIndex]} {payment}
                  </Text>
                </View>
                <View
                  style={{
                    //flex:1,
                    marginTop: 0,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    borderTopWidth: 1,
                    width: "75%",
                    borderBottomWidth: 1,
                    borderColor: BLACK,
                    paddingBottom: 33,
                    paddingTop: 33
                    //height: '100%',
                    //backgroundColor:'#555'
                  }}
                >
                  {payment.toString().toLowerCase() === "debit" ? (
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 16,
                          //alignSelf : "center"
                          textAlign: "center"
                        }
                      ]}
                    >
                      No Transaction {transId}
                    </Text>
                  ) : (
                    <View />
                  )}
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: 24,
                        //alignSelf : "center"
                        textAlign: "center",
                        color: BLACK
                      }
                    ]}
                  >
                    {total.toString() === "0"
                      ? ""
                      : _change_amount[languageIndex]}
                  </Text>

                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: 24,
                        //alignSelf : "center"
                        textAlign: "center",
                        color: "rgba(78, 171, 223, 0.99)"
                      }
                    ]}
                  >
                    {total.toString() === "0"
                      ? _no_change[languageIndex]
                      : total}
                  </Text>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: 18,
                        //alignSelf : "center"
                        textAlign: "center"
                        //color: "rgba(78, 171, 223, 0.99)"
                      }
                    ]}
                  >
                    {_terima_kasih[languageIndex]}
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
                  {/* <Image source={require("../Images/QR1.png")} /> */}
                  <View
                    style={{
                      width: "100%",
                      marginBottom: 5,
                      //backgroundColor: "#BCA",
                      //flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignContent: "center"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          //marginLeft: 25,
                          width: "45%",
                          fontSize: 14,
                          //alignSelf : "center"
                          textAlign: "center",
                          color: BLACK
                        }
                      ]}
                    >
                      {_kirim_ke[languageIndex]}
                    </Text>
                    <View
                      style={{
                        width: "45%",
                        backgroundColor: WHITE,
                        borderRadius: 10,
                        elevation: 3,
                        borderWidth: 1,
                        borderColor: BLACK
                        //alignItems: 'center',
                      }}
                    >
                      <TextInput
                        style={{
                          //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          backgroundColor: "transparent",
                          color: BLACK,
                          paddingTop: 5,
                          paddingBottom: 10,
                          marginBottom: -10,
                          //marginLeft: '5%',
                          //marginRight: 5,
                          height: 40,
                          fontSize: 20,
                          fontFamily: "RobotoSlab",
                          textAlign: "right"
                        }}
                        keyboardType="email"
                        type="text"
                        ref={q => {
                          this._email = q;
                        }}
                        onSubmitEditing={() => {
                          //this.getData(this.state.searchKey);
                          // this.setState({viewSearch: false});
                          //this.submit(submitAction);
                          //this._gopay.focus();
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => {
                          this.changeEmail(changeEmail, v);
                        }}
                        value={email ? email.toString() : ""}
                        placeholder={""}
                        placeholderTextColor="#777"
                      />
                    </View>
                  </View>
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
                          {_print_receipt[languageIndex]}
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
                          backgroundColor: "rgba(225, 114, 114, 0.59)",
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
                          {_kembali[languageIndex]}
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
