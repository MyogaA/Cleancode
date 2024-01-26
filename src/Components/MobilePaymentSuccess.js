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
  BLACK,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT
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
  _paid_by,
  _nama_pelanggan,
  _kirim_whats_app,
  _cetak_struk_dapur,
  _cetak_ulang,
  _kirim_struk_online,
  _penilaian_pelanggan,
  _daftarkan_pelanggan,
  _simpan,
  _rate_1,
  _rate_2,
  _rate_3,
  _rate_4,
  _rate_5,
  _rate_staff,
  _rate_food,
  _no_telp,
  _poin_transaksi,
  _poin_total,
  _cetak_ulang_cashlez
} from "../Libraries/DictionaryPayment";
import Loading from "./MobileLoading";
import { _register } from "../Libraries/DictionaryLogin";

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerCustomer: false
    };
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

  changeCustomer(action, text) {
    if (typeof action === "function") {
      action(text);
    }
  }

  changePhone(action, text) {
    if (typeof action === "function") {
      action(text);
    }
  }

  renderReviewCustomer() {
    let {
      viewSelectRating,
      changeViewSelectRating,
      selectedStaffRating,
      selectedFoodRating,
      changeSelectedFoodRatingAction,
      changeSelectedStaffRatingAction,
      languageIndex,
      colorIndex
    } = this.props;

    const tablet = DeviceInfo.isTablet();

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={viewSelectRating}
          onRequestClose={() => {
            changeViewSelectRating(false);
          }}
        >
          <View style={{ flex: 0.5, backgroundColor: "rgba(0,0,0,0.5)" }} />
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <View
              style={{
                flex: 1,
                width: tablet ? "66%" : "100%",
                alignSelf: "center",
                height: "100%",
                backgroundColor: WHITE,
                marginTop: -25,
                flexDirection: "column",
                //justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                padding: 15
              }}
            >
              <View
                style={{
                  borderColor: "#C8C7CC",
                  borderBottomWidth: 1,
                  //marginTop: 15,
                  width: "100%",
                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingBottom: 15,
                  marginBottom: 15
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "center"
                    }
                  ]}
                >
                  {_penilaian_pelanggan[languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ width: "40%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 12,
                        color: BLACK,
                        textAlign: "center",
                        marginBottom: 15
                      }
                    ]}
                  >
                    {_rate_staff[languageIndex]}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      //alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedStaffRatingAction(5);
                      }}
                      style={{
                        backgroundColor:
                          selectedStaffRating === 5
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_5[languageIndex]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      //alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedStaffRatingAction(4);
                      }}
                      style={{
                        backgroundColor:
                          selectedStaffRating === 4
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_4[languageIndex]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      //alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedStaffRatingAction(3);
                      }}
                      style={{
                        backgroundColor:
                          selectedStaffRating === 3
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_3[languageIndex]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      //alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedStaffRatingAction(2);
                      }}
                      style={{
                        backgroundColor:
                          selectedStaffRating === 2
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_2[languageIndex]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      // alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedStaffRatingAction(1);
                      }}
                      style={{
                        backgroundColor:
                          selectedStaffRating === 1
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_1[languageIndex]}
                    </Text>
                  </View>
                </View>
                <View style={{ width: "40%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 12,
                        color: BLACK,
                        textAlign: "center",
                        marginBottom: 15
                      }
                    ]}
                  >
                    {_rate_food[languageIndex]}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      //alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedFoodRatingAction(5);
                      }}
                      style={{
                        backgroundColor:
                          selectedFoodRating === 5
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_5[languageIndex]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      //alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedFoodRatingAction(4);
                      }}
                      style={{
                        backgroundColor:
                          selectedFoodRating === 4
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_4[languageIndex]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      //alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedFoodRatingAction(3);
                      }}
                      style={{
                        backgroundColor:
                          selectedFoodRating === 3
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_3[languageIndex]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      //alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedFoodRatingAction(2);
                      }}
                      style={{
                        backgroundColor:
                          selectedFoodRating === 2
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_2[languageIndex]}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent: "center",
                      // alignContent: "center",
                      marginBottom: 10,
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeSelectedFoodRatingAction(1);
                      }}
                      style={{
                        backgroundColor:
                          selectedFoodRating === 1
                            ? MAIN_THEME_COLOR_SELECT(colorIndex)
                            : "rgba(246, 246, 246, 0.95)",
                        borderColor: "rgba(246, 246, 246, 0.95)",
                        borderWidth: 3,
                        borderRadius: 30,
                        width: 27,
                        height: 27,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_rate_1[languageIndex]}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  //flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  // padding: 15,
                  flexDirection: "row",
                  marginBottom: 0

                  //backgroundColor: '#ABC'
                }}
              >
                <Button
                  style={{ width: "45%" }}
                  onPress={() => {
                    changeViewSelectRating(false);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: WHITE,
                      borderRadius: 10,
                      borderColor: "F2994A",
                      borderWidth: 1,
                      padding: 10,
                      marginTop: 10
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          color: BLACK,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_kembali[languageIndex]}
                    </Text>
                  </View>
                </Button>
                <Button
                  style={{ width: "45%" }}
                  onPress={() => {
                    changeViewSelectRating(false);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: MAIN_THEME_COLOR_SELECT(colorIndex),
                      borderRadius: 10,
                      padding: 10,
                      marginTop: 10
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          color: MAIN_TEXT_COLOR_SELECT(colorIndex),
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_simpan[languageIndex]}
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  render() {
    let {
      actions,
      closeText,
      payment,
      total,
      changeEmail,
      changePhone,
      changeCustomer,
      email,
      phone,
      customer,
      transId,
      languageIndex,
      colorIndex,
      loading,
      cetakDapurAction,
      cetakUlangAction,
      showcetakDapur,
      viewSelectRating,
      selectedStaffRating,
      changeViewSelectRating,
      selectedFoodRating,
      changeSelectedFoodRatingAction,
      changeSelectedStaffRatingAction,
      emailStruk,
      sendWhatsApp,
      selectedCustomer,
      registerCustomerAction,
      points_gain,
      points_used,
      points_available,
      cetakLabelAction,
      cz_allow_print,
      cetakCashlezAction
    } = this.props;
    let { width, height } = Dimensions.get("window");
    //console.log("total ==> ", total);

    if (!closeText) {
      closeText = _kembali[languageIndex];
    }

    if (!payment) {
      payment = "";
    }

    const tablet = DeviceInfo.isTablet();

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.closeModal(actions);
          }}
        >
          {loading ? <Loading /> : <View />}
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
            {/* <View style={{ height: 50 }} /> */}
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
              <View
                style={{
                  width: tablet ? "66%" : "100%",
                  alignSelf: "center",
                  flex: 1,
                  paddingRight: 15,
                  paddingLeft: 15,
                  //maxHeight: height * 0.6,
                  backgroundColor: WHITE,
                  // borderRadius: 15,
                  marginLeft: 0,
                  marginRight: 0
                  //marginTop: height * 0.25,
                  //marginBottom: height * 0.25,
                }}
              >
                {this.renderReviewCustomer()}
                <View
                  style={{
                    flexDirection: "column",
                    marginTop: 20,
                    marginBottom: 20
                    //backgroundColor:'#BCA'
                  }}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View
                      style={{
                        //flex:1,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 5,
                        paddingBottom: 5,
                        width: "100%",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center"
                        //backgroundColor: "#BCA"
                        //borderBottomWidth: 1,
                        //borderColor: BLACK
                        //height: '100%',
                        //backgroundColor:'#555'
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0
                          //padding: 10
                          //margin: 10
                        }}
                      >
                        <Button
                          style={{
                            //backgroundColor: "#BCA",
                            elevation: 1,
                            padding: 10,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                          onPress={() => {
                            this.closeModal(actions);
                          }}
                        >
                          <Ionicons name={"md-close"} size={30} color={BLACK} />
                        </Button>
                      </View>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: 14,
                            //alignSelf : "center"
                            textAlign: "center"
                          }
                        ]}
                      >
                        {_pembayaran[languageIndex]} {_sukses[languageIndex]}
                      </Text>
                      {payment === "" ? (
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              marginTop: 5,
                              fontSize: 14,
                              //alignSelf : "center"
                              textAlign: "center"
                            }
                          ]}
                        >
                          {" "}
                        </Text>
                      ) : (
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              marginTop: 5,
                              fontSize: 14,
                              //alignSelf : "center"
                              textAlign: "center"
                            }
                          ]}
                        >
                          {_paid_by[languageIndex]} {payment}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        //flex:1,
                        marginTop: 0,
                        marginLeft: 20,
                        marginRight: 20,

                        marginBottom: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        borderTopWidth: 0.5,
                        width: "100%",
                        borderBottomWidth: 0.5,
                        borderColor: BLACK,
                        paddingBottom: 15,
                        paddingTop: 15
                        //height: '100%',
                        //backgroundColor:'#555'
                      }}
                    >
                      {payment.toString().toLowerCase() === "debit" ? (
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
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
                      {/* <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 16,
                          //alignSelf : "center"
                          textAlign: "center",
                          color: BLACK
                        }
                      ]}
                    >
                      {total.toString() === "0"
                        ? ""
                        : _change_amount[languageIndex]}
                    </Text> */}

                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: 16,
                            //alignSelf : "center"
                            textAlign: "center",
                            color: BLACK
                          }
                        ]}
                      >
                        {parseInt(total) <= 0
                          ? ""
                          : _change_amount[languageIndex]}
                      </Text>

                      {/* <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 16,
                          //alignSelf : "center"
                          textAlign: "center",
                          color: "rgba(78, 171, 223, 0.99)"
                        }
                      ]}
                    >
                      {total.toString() === "0"
                        ? _no_change[languageIndex]
                        : total}
                    </Text> */}
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: 16,
                            //alignSelf : "center"
                            textAlign: "center",
                            color: "rgba(78, 171, 223, 0.99)"
                          }
                        ]}
                      >
                        {parseInt(total) <= 0
                          ? _no_change[languageIndex]
                          : total}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: 14,
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
                        display: selectedCustomer ? "none" : "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 5,
                          //backgroundColor: "#BCA",
                          //flexDirection: "row",
                          justifyContent: "space-between",
                          //alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //marginLeft: 25,
                              width: "100%",
                              fontSize: 14,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_nama_pelanggan[languageIndex]}
                        </Text>
                        <View
                          style={{
                            margin: 15,
                            marginBottom: 5,
                            marginLeft: 0,
                            marginRight: 0,
                            marginTop: 5,
                            //borderColor: BLACK,
                            //borderWidth: 1,
                            backgroundColor: "rgba(239, 239, 239, 0.95)",
                            borderRadius: 5,
                            padding: 5,
                            //elevation: 3,
                            //borderWidth: 1,
                            borderColor: BLACK,
                            width: "100%"
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
                              fontFamily: "Roboto-Regular"
                            }}
                            keyboardType="default"
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
                              this.changeCustomer(changeCustomer, v);
                            }}
                            value={customer ? customer.toString() : ""}
                            placeholder={""}
                            placeholderTextColor="#777"
                          />
                        </View>
                      </View>
                      {/* Nama Pelanggan End */}
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 5,
                          //backgroundColor: "#BCA",
                          //flexDirection: "row",
                          justifyContent: "space-between",
                          //alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //marginLeft: 25,
                              width: "100%",
                              fontSize: 14,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_kirim_ke[languageIndex]}
                        </Text>
                        <View
                          style={{
                            margin: 15,
                            marginBottom: 5,
                            marginLeft: 0,
                            marginRight: 0,
                            marginTop: 5,
                            //borderColor: BLACK,
                            //borderWidth: 1,
                            backgroundColor: "rgba(239, 239, 239, 0.95)",
                            borderRadius: 5,
                            padding: 5,
                            //elevation: 3,
                            //borderWidth: 1,
                            borderColor: BLACK,
                            width: "100%"
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
                              fontFamily: "Roboto-Regular"
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
                      {/* Email End */}
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 5,
                          //backgroundColor: "#BCA",
                          //flexDirection: "row",
                          justifyContent: "space-between",
                          //alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //marginLeft: 25,
                              width: "100%",
                              fontSize: 14,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_kirim_whats_app[languageIndex]}
                        </Text>
                        <View
                          style={{
                            margin: 15,
                            marginBottom: 5,
                            marginTop: 5,
                            marginLeft: 0,
                            marginRight: 0,
                            //borderColor: BLACK,
                            //borderWidth: 1,
                            backgroundColor: "rgba(239, 239, 239, 0.95)",
                            borderRadius: 5,
                            padding: 5,
                            //elevation: 3,
                            //borderWidth: 1,
                            borderColor: BLACK,
                            width: "100%"
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
                              fontFamily: "Roboto-Regular"
                            }}
                            keyboardType="numeric"
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
                              this.changePhone(changePhone, v);
                            }}
                            value={phone ? phone.toString() : ""}
                            placeholder={""}
                            placeholderTextColor="#777"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 5,
                          //backgroundColor: "#BCA",
                          //flexDirection: "row",
                          justifyContent: "space-between",
                          //alignItems: "center",
                          alignContent: "center",
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //marginLeft: 25,
                              width: "50%",
                              fontSize: 14,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_daftarkan_pelanggan[languageIndex]}
                        </Text>
                        <View>
                          <Checkbox
                            action={() => {
                              this.setState({
                                registerCustomer: !this.state.registerCustomer
                              });
                            }}
                            size={20}
                            checked={this.state.registerCustomer}
                            color={MAIN_THEME_COLOR_SELECT(colorIndex)}
                          />
                        </View>
                      </View>
                      {/* Kirim Whats App End */}
                    </View>

                    <View
                      style={{
                        display: !selectedCustomer ? "none" : "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 15,
                          //backgroundColor: "#BCA",
                          //flexDirection: "row",
                          justifyContent: "space-between",
                          //alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //marginLeft: 25,
                              width: "100%",
                              fontSize: 14,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_nama_pelanggan[languageIndex]}
                        </Text>

                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              //marginLeft: 25,
                              width: "100%",
                              fontSize: 14,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {customer}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 15,
                          //backgroundColor: "#BCA",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          //alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <View style={{ width: "49%" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                //marginLeft: 25,
                                width: "100%",
                                fontSize: 14,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK
                              }
                            ]}
                          >
                            {_poin_transaksi[languageIndex]}
                          </Text>
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                width: "100%",
                                fontSize: 14,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK
                              }
                            ]}
                          >
                            {points_gain ? points_gain : 0}
                          </Text>
                        </View>

                        <View style={{ width: "49%" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                //marginLeft: 25,
                                width: "100%",
                                fontSize: 14,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK
                              }
                            ]}
                          >
                            {_poin_total[languageIndex]}
                          </Text>
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                width: "100%",
                                fontSize: 14,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK
                              }
                            ]}
                          >
                            {points_available - points_used + points_gain}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 5,
                          //backgroundColor: "#BCA",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          //alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <View style={{ width: "49%" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                //marginLeft: 25,
                                width: "100%",
                                fontSize: 14,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK
                              }
                            ]}
                          >
                            {_no_telp[languageIndex]}
                          </Text>
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                width: "100%",
                                fontSize: 14,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK
                              }
                            ]}
                          >
                            {phone}
                          </Text>
                        </View>

                        <View style={{ width: "49%" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                //marginLeft: 25,
                                width: "100%",
                                fontSize: 14,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK
                              }
                            ]}
                          >
                            Email
                          </Text>
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                width: "100%",
                                fontSize: 14,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK
                              }
                            ]}
                          >
                            {email}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
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
                        width: "100%",
                        //flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        // padding: 15,
                        marginBottom: 0,
                        
                        //backgroundColor: '#ABC'
                      }}
                    >
                      <Button
                        style={{ width: "100%", display: this.state.registerCustomer ? "flex":"none" }}
                        onPress={() => {
                          // if (email !== "") {
                          //   emailStruk();
                          // }
                          // if (phone !== "") {
                          //   sendWhatsApp();
                          // }

                          

                          if (this.state.registerCustomer) {
                            if (
                              // email !== "" &&
                              phone !== ""
                              // customer !== ""
                            ) {
                              registerCustomerAction();
                              // const berhasil_message = [
                              //   "Registrasi Berhasil",
                              //   "Registrasi Success"
                              // ];
                              // alert(berhasil_message[languageIndex]);
                            } else {
                              const gagal_message = [
                                "Mohon isi semua field untuk registrasi pelanggan",
                                "Please fill all the field to register"
                              ];
                              alert(gagal_message[languageIndex]);
                            }
                          }
                          //this.closeModal(actions);
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: MAIN_THEME_COLOR_SELECT(
                              colorIndex
                            ),
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 10
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                fontSize: 12,
                                color: MAIN_TEXT_COLOR_SELECT(colorIndex),
                                textAlign: "center"
                              }
                            ]}
                          >
                            {_register[languageIndex]}
                          </Text>
                        </View>
                      </Button>

                      <Button
                        style={{ width: "100%" }}
                        onPress={() => {
                          if (email !== "") {
                            emailStruk();
                          }
                          if (phone !== "") {
                            sendWhatsApp();
                          }

                          if (this.state.registerCustomer) {
                            if (
                              // email !== "" &&
                              phone !== ""
                              // customer !== ""
                            ) {
                              registerCustomerAction();
                              const berhasil_message = [
                                "Registrasi Berhasil",
                                "Registrasi Success"
                              ];
                              alert(berhasil_message[languageIndex]);
                            } else {
                              const gagal_message = [
                                "Mohon isi semua field untuk registrasi pelanggan",
                                "Please fill all the field to register"
                              ];
                              alert(gagal_message[languageIndex]);
                            }
                          }
                          //this.closeModal(actions);
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: MAIN_THEME_COLOR_SELECT(
                              colorIndex
                            ),
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 10
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                fontSize: 12,
                                color: MAIN_TEXT_COLOR_SELECT(colorIndex),
                                textAlign: "center"
                              }
                            ]}
                          >
                            {_kirim_struk_online[languageIndex]}
                          </Text>
                        </View>
                      </Button>
                      <Button
                        style={{ 
                          width: "100%", 
                          display: cz_allow_print ? "flex" : "none" 
                        }}
                        onPress={() => {
                          //this.closeModal(actions);
                          if (typeof cetakCashlezAction === "function") {
                            cetakCashlezAction();
                          }
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: MAIN_THEME_COLOR_SELECT(
                              colorIndex
                            ),
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 10
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                fontSize: 12,
                                color: MAIN_TEXT_COLOR_SELECT(colorIndex),
                                textAlign: "center"
                              }
                            ]}
                          >
                            {_cetak_ulang_cashlez[languageIndex]}
                          </Text>
                        </View>
                      </Button>

                      <Button
                        style={{ width: "100%" }}
                        onPress={() => {
                          //this.closeModal(actions);
                          if (typeof cetakUlangAction === "function") {
                            cetakUlangAction();
                          }
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: MAIN_THEME_COLOR_SELECT(
                              colorIndex
                            ),
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 10
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                fontSize: 12,
                                color: MAIN_TEXT_COLOR_SELECT(colorIndex),
                                textAlign: "center"
                              }
                            ]}
                          >
                            {_cetak_ulang[languageIndex]}
                          </Text>
                        </View>
                      </Button>

                      <Button
                        style={{ width: "100%", display: showcetakDapur ? "flex" : "none"}}
                        onPress={() => {
                          //this.closeModal(actions);
                          if (typeof cetakDapurAction === "function") {
                            cetakDapurAction();
                          }
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: MAIN_THEME_COLOR_SELECT(
                              colorIndex
                            ),
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 10
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                fontSize: 12,
                                color: MAIN_TEXT_COLOR_SELECT(colorIndex),
                                textAlign: "center"
                              }
                            ]}
                          >
                            {_cetak_struk_dapur[languageIndex]}
                          </Text>
                        </View>
                      </Button>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Button
                          style={{ width: "50%", display: "none" }}
                          onPress={() => {
                            changeViewSelectRating(true);
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                colorIndex
                              ),
                              borderRadius: 10,
                              padding: 10,
                              marginTop: 10
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: MAIN_TEXT_COLOR_SELECT(colorIndex),
                                  textAlign: "center"
                                }
                              ]}
                            >
                              {_penilaian_pelanggan[languageIndex]}
                            </Text>
                          </View>
                        </Button>

                        <Button
                          style={{ width: "100%" }}
                          onPress={() => {
                            // Actions.pop();
                            this.closeModal(actions);
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: WHITE,
                              borderRadius: 10,
                              padding: 10,
                              marginTop: 10,
                              borderColor: "#F2994A",
                              borderWidth: 1
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: BLACK,
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
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
