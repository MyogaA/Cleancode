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
import {
  WHITE,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SUB,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
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

import {
  _kas,
  _cari,
  _today,
  _from,
  _to,
  _alert_printer,
  _user,
  _status,
  _jam,
  _no_data_1,
  _no_data_2,
  _add,
  _rekap,
  _cash_in,
  _cash_out,
  _jumlah,
  _catatan,
  _simpan,
  _kembali,
  _cetak_struk,
  _tipe,
  _penjualan,
  _void,
  _cicilan,
  _jumlah_sistem,
  _jumlah_aktual,
  _tunai,
  _e_wallet,
  _selisih_1,
  _selisih_2,
  _add_2,
  _cash_in_out,
  _card,
  _jumlah_transaksi
} from "../Libraries/DictionaryRekap";
import RegionFunctions from "../Libraries/RegionFunctions";
import { _total } from "../Libraries/DictionaryHistory";

export default class MobileRekapKas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "IDR",
      currencyAllowDecimal: false
    };
  }

  componentDidMount() {
    //this.setState({isOpen: true});
    //this.renderAlert();

    RegionFunctions.GetCurrency(val => {
      if (val) {
        this.setState({ currency: val });
      }
    });

    RegionFunctions.GetAllowDecimal(val => {
      //console.log("GetAllowDecimal ===> ", val)
      if (val) {
        this.setState({ currencyAllowDecimal: val });
      }
    });
  }

  idrNumToStr(num, iscurr) {
    let curr = "";
    if (typeof iscurr !== "undefined" && iscurr === true) {
      curr = this.state.currency + " ";
    }

    let int_num = parseInt(num);
    let comma_num = num - int_num;
    comma_num = Math.round(comma_num * 100);

    let comma_add = "";
    if (comma_num === 0) {
    } else {
      if (comma_num < 10) {
        comma_add = `.0${comma_num}`;
      } else {
        comma_add = `.${comma_num}`;
      }
    }

    if (!this.state.currencyAllowDecimal) {
      comma_add = "";
    }

    let str = "";
    let numrev = int_num
      .toString()
      .split("")
      .reverse()
      .join("");
    for (let i = 0; i < numrev.length; i++) {
      if (i % 3 === 0) {
        str += numrev.substr(i, 3) + ",";
      }
    }
    return (
      curr +
      str
        .split("", str.length - 1)
        .reverse()
        .join("") +
      comma_add
    );
  }

  closeModal(closeAction) {
    if (typeof closeAction === "function") {
      closeAction();
    }
    //this.setState({isOpen: false});
  }

  changeCatatan(action, text) {
    if (typeof action === "function") {
      action(text);
    }
  }

  changeJumlah(action, text) {
    if (typeof action === "function") {
      action(text);
    }
  }

  changeType(action, text) {
    if (typeof action === "function") {
      action(text);
    }
  }

  submit(action) {
    if (typeof action === "function") {
      action();
    }
  }

  render() {
    let {
      languageIndex,
      closeAction,
      closeText,
      catatan,
      jumlah,
      type,
      submitAction,
      changeCatatan,
      changeRekapTunai,
      changeRekapGoPay,
      changeRekapTotal,
      changeRekapCard,
      rekapTunai,
      rekapGoPay,
      rekapTotal,
      rekapCard,
      systemTunai,
      systemGoPay,
      systemTotal,
      systemCashIn,
      systemCashOut,
      systemCard,
      changeType
    } = this.props;
    let { width, height } = Dimensions.get("window");
    let title = _rekap[languageIndex];

    if (!closeText) {
      closeText = _kembali[languageIndex];
    }

    let submitText = _simpan[languageIndex];
    let backText = _kembali[languageIndex];
    // let message = [
    //   "You haven't sign in yet,",
    //   `Sign to access our ${extraMsg} features!`,
    // ];

    let bgColor = [WHITE, MAIN_THEME_COLOR_SELECT(this.props.colorIndex)];
    let textColor = [BLACK, WHITE];

    // let systemTunai = 100000;
    // let systemGoPay = 80000;
    // let systemTotal = systemTunai + systemGoPay;

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.closeModal(closeAction);
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
            <View style={{ height: 50 }} />
            <View
              style={{
                borderTopWidth: 1,
                elevation: 1,
                borderColor: "#DADADA",
                //minWidth: width - 40,
                width: "100%",
                flex: 1,
                //minHeight: height * 0.2,
                //maxHeight: height * 0.6,
                backgroundColor: WHITE,
                borderRadius: 15,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
                //marginTop: height * 0.25,
                //marginBottom: height * 0.25,
              }}
            >
              <View>
                <View
                  style={{
                    //justifyContent: 'center',
                    //alignItems: 'center',
                    //flex:1,
                    //backgroundColor:'#999',
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                    marginBottom: 15
                  }}
                >
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
                    {title}
                  </Text>
                </View>
                <Button
                  style={{
                    position: "absolute",
                    left: 15,
                    //top: 15,
                    //width: 50,
                    //height: 50,
                    padding: 15,
                    //backgroundColor: "#BCA"
                  }}
                  onPress={() => {
                    this.closeModal(closeAction);
                  }}
                >
                  <Ionicons name={"md-close"} size={25} color={BLACK} />
                </Button>
              </View>
              <ScrollView style={{ marginBottom: 0 }}>
                <View
                  style={{
                    flexDirection: "column",
                    marginTop: 15,
                    marginBottom: 15
                    //backgroundColor:'#BCA'
                  }}
                >
                  <View
                    style={{
                      //flex:1,
                      marginTop: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 0,
                      justifyContent: "center",
                      alignItems: "center"
                      //height: '100%',
                      //backgroundColor: "#555"
                    }}
                  >
                    {/* Tunai Start */}

                    <View
                      style={{
                        //justifyContent: 'space-between',
                        //backgroundColor: "#BCA",
                        width: "100%",
                        marginTop: 0,
                        //flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      <View
                        style={{
                          //width: "100%",
                          paddingBottom: 5,
                          //borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          //marginBottom: 5,
                          flexDirection: "row",
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
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_tunai[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            //borderBottomWidth: 0,
                            padding: 0
                            //borderColor: MAIN_TEXT_COLOR_SELECT(this.props.colorIndex),
                            //alignItems: 'center',
                          }}
                        >
                          <TextInput
                            style={{
                              //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                              backgroundColor: "transparent",
                              color: BLACK,
                              //paddingTop: 5,
                              //paddingBottom: 5,
                              //marginBottom: -10,
                              //marginLeft: '5%',
                              //marginRight: 5,
                              //height: 40,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: MAIN_THEME_COLOR_SELECT(
                                this.props.colorIndex
                              ),
                              height: 40,
                              fontSize: 12,
                              fontFamily: "RobotoSlab",
                              textAlign: "right"
                            }}
                            keyboardType="numeric"
                            type="text"
                            ref={q => {
                              this._tunai = q;
                            }}
                            onSubmitEditing={() => {
                              //this.getData(this.state.searchKey);
                              // this.setState({viewSearch: false});
                              //this.submit(submitAction);
                              this._gopay.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v => {
                              this.changeJumlah(changeRekapTunai, v);
                            }}
                            value={
                              rekapTunai === 0 ? "" : rekapTunai.toString()
                            }
                            placeholder={_tunai[languageIndex]}
                            placeholderTextColor="#777"
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          //width: "100%",
                          // marginTop: 15,
                          //paddingTop: 10,
                          paddingBottom: 5,
                          //borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          marginBottom: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              //marginLeft: 25,
                              width: "45%",
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_jumlah_transaksi[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                //width: "45%",
                                fontSize: 12,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK,
                                textAlign: "right"
                              }
                            ]}
                          >
                            {this.idrNumToStr(systemTunai, true)}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          //width: "100%",
                          // marginTop: 15,
                          //paddingTop: 10,
                          paddingBottom: 5,
                          //borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          marginBottom: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              //marginLeft: 25,
                              width: "45%",
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_cash_in_out[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                //width: "45%",
                                fontSize: 12,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK,
                                textAlign: "right"
                              }
                            ]}
                          >
                            {this.idrNumToStr(systemCashIn, true)}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          //width: "100%",
                          paddingBottom: 5,
                          borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          marginBottom: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              //marginLeft: 25,
                              width: "45%",
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_jumlah_sistem[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                //width: "45%",
                                fontSize: 12,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK,
                                textAlign: "right"
                              }
                            ]}
                          >
                            {this.idrNumToStr(systemTunai + systemCashIn, true)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* Tunai End */}
                    {/* Card Start */}
                    <View
                      style={{
                        //justifyContent: 'space-between',
                        //backgroundColor: "#BCA",
                        width: "100%",
                        marginTop: 15,
                        //flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      <View
                        style={{
                          paddingBottom: 5,
                          //borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          //width: "100%",
                          //marginBottom: 5,
                          flexDirection: "row",
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
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_card[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          <TextInput
                            style={{
                              backgroundColor: "transparent",
                              color: BLACK,
                              //paddingTop: 5,
                              //paddingBottom: 5,
                              //marginBottom: -10,
                              //marginLeft: '5%',
                              //marginRight: 5,
                              //height: 40,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: MAIN_THEME_COLOR_SELECT(
                                this.props.colorIndex
                              ),
                              height: 40,
                              fontSize: 12,
                              fontFamily: "RobotoSlab",
                              textAlign: "right"
                            }}
                            keyboardType="numeric"
                            type="text"
                            ref={q => {
                              this._gopay = q;
                            }}
                            onSubmitEditing={() => {
                              //this.getData(this.state.searchKey);
                              // this.setState({viewSearch: false});
                              //this.submit(submitAction);
                              //this._total.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v => {
                              this.changeJumlah(changeRekapCard, v);
                            }}
                            value={rekapCard === 0 ? "" : rekapCard.toString()}
                            placeholder={_card[languageIndex]}
                            placeholderTextColor="#777"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          //width: "100%",
                          paddingBottom: 5,
                          borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          marginBottom: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              //marginLeft: 25,
                              width: "45%",
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_jumlah_sistem[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                //width: "45%",
                                fontSize: 12,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK,
                                textAlign: "right"
                              }
                            ]}
                          >
                            {this.idrNumToStr(systemCard, true)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* Card End */}

                    {/* Go Pay Start */}
                    <View
                      style={{
                        //justifyContent: 'space-between',
                        //backgroundColor: "#BCA",
                        width: "100%",
                        marginTop: 15,
                        //flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      <View
                        style={{
                          paddingBottom: 5,
                          //borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          //width: "100%",
                          //marginBottom: 5,
                          flexDirection: "row",
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
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_e_wallet[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          <TextInput
                            style={{
                              //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                              backgroundColor: "transparent",
                              color: BLACK,
                              //paddingTop: 5,
                              //paddingBottom: 5,
                              //marginBottom: -10,
                              //marginLeft: '5%',
                              //marginRight: 5,
                              //height: 40,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: MAIN_THEME_COLOR_SELECT(
                                this.props.colorIndex
                              ),
                              height: 40,
                              fontSize: 12,
                              fontFamily: "RobotoSlab",
                              textAlign: "right"
                            }}
                            keyboardType="numeric"
                            type="text"
                            ref={q => {
                              this._gopay = q;
                            }}
                            onSubmitEditing={() => {
                              //this.getData(this.state.searchKey);
                              // this.setState({viewSearch: false});
                              //this.submit(submitAction);
                              //this._total.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v => {
                              this.changeJumlah(changeRekapGoPay, v);
                            }}
                            value={
                              rekapGoPay === 0 ? "" : rekapGoPay.toString()
                            }
                            placeholder={_e_wallet[languageIndex]}
                            placeholderTextColor="#777"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          //width: "100%",
                          paddingBottom: 5,
                          borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          marginBottom: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              //marginLeft: 25,
                              width: "45%",
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_jumlah_sistem[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                //width: "45%",
                                fontSize: 12,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK,
                                textAlign: "right"
                              }
                            ]}
                          >
                            {this.idrNumToStr(systemGoPay, true)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* Go Pay End */}

                    <View
                      style={{
                        //width: "100%",
                        paddingBottom: 5,
                        borderBottomWidth: 1,
                        borderColor: MAIN_THEME_COLOR_SELECT(
                          this.props.colorIndex
                        ),
                        display: "none",
                        marginBottom: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            //marginLeft: 25,
                            width: "45%",
                            fontSize: 12,
                            //alignSelf : "center"
                            //textAlign: "center",
                            color: BLACK
                          }
                        ]}
                      >
                        {_cash_out[languageIndex]}
                      </Text>
                      <View
                        style={{
                          width: "45%",
                          backgroundColor: WHITE,
                          borderRadius: 10,
                          elevation: 0,
                          borderBottomWidth: 0,
                          borderColor: BLACK
                          //alignItems: 'center',
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              //marginLeft: 25,
                              //width: "45%",
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK,
                              textAlign: "right"
                            }
                          ]}
                        >
                          {this.idrNumToStr(systemCashOut, true)}
                        </Text>
                      </View>
                    </View>
                    {/* Total Start */}

                    <View
                      style={{
                        //justifyContent: 'space-between',
                        //backgroundColor: "#BCA",
                        width: "100%",
                        marginTop: 15,
                        //flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      <View
                        style={{
                          paddingBottom: 5,
                          //borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          //width: "100%",
                          //marginBottom: 5,
                          flexDirection: "row",
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
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_total[this.state.languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          {/* <TextInput
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
                            fontSize: 12,
                            fontFamily: "RobotoSlab",
                            textAlign: "right"
                          }}
                          keyboardType="numeric"
                          type="text"
                          ref={q => {
                            this._total = q;
                          }}
                          onSubmitEditing={() => {
                            //this.getData(this.state.searchKey);
                            // this.setState({viewSearch: false});
                            //this.submit(submitAction);
                            this._total.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => {
                            this.changeJumlah(changeRekapTotal, v);
                          }}
                          value={rekapTotal === 0 ? "" : rekapTotal.toString()}
                          placeholder={"Total"}
                          placeholderTextColor="#777"
                        /> */}
                        </View>
                      </View>

                      <View
                        style={{
                          //width: "100%",
                          paddingBottom: 5,
                          borderBottomWidth: 1,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          marginBottom: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              //marginLeft: 25,
                              width: "45%",
                              fontSize: 12,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK
                            }
                          ]}
                        >
                          {_jumlah_sistem[languageIndex]}
                        </Text>
                        <View
                          style={{
                            width: "45%",
                            backgroundColor: WHITE,
                            borderRadius: 10,
                            elevation: 0,
                            borderBottomWidth: 0,
                            borderColor: BLACK
                            //alignItems: 'center',
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              {
                                //marginLeft: 25,
                                //width: "45%",
                                fontSize: 12,
                                //alignSelf : "center"
                                //textAlign: "center",
                                color: BLACK,
                                textAlign: "right"
                              }
                            ]}
                          >
                            {this.idrNumToStr(systemTotal, true)}
                          </Text>
                        </View>
                      </View>
                      {/* <View
                      style={{
                        //width: "100%",
                        //marginBottom: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignContent: "center",
                        borderColor: BLACK,
                        paddingBottom: 5,
                        borderBottomWidth: 2
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.dmSansLight,
                          {
                            //marginLeft: 25,
                            width: "45%",
                            fontSize: 12,
                            //alignSelf : "center"
                            //textAlign: "center",
                            color: BLACK
                          }
                        ]}
                      >
                        Jumlah sistem
                      </Text>
                      <View
                        style={{
                          width: "45%",
                          backgroundColor: WHITE,
                          borderRadius: 10
                          //elevation: 3,
                          //borderWidth: 1,
                          //borderColor: BLACK
                          //alignItems: 'center',
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansLight,
                            {
                              //marginLeft: 25,
                              //width: "45%",
                              fontSize: 20,
                              //alignSelf : "center"
                              //textAlign: "center",
                              color: BLACK,
                              textAlign: "right"
                            }
                          ]}
                        >
                          {systemTotal}
                        </Text>
                      </View>
                    </View> */}
                    </View>

                    {/* Total End */}
                  </View>
                </View>
              </ScrollView>
              {/* Button Bawah */}
              <View
                style={{
                  flexDirection: "row",
                  //marginTop: 25,
                  //width: "100%",
                  //flex: 1,
                  backgroundColor: WHITE,
                  //alignSelf: "flex-end",
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                <Button
                  style={{
                    margin: 15,
                    //width: "100%",
                    flex: 1,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.props.colorIndex
                    ),
                    borderRadius: 10,
                    padding: 15
                  }}
                  onPress={() => {
                    this.submit(submitAction);
                    //alert("beep");
                    //Actions.Login();
                    //Actions.reset('Login');
                  }}
                >
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: 12,
                        color: MAIN_TEXT_COLOR_SELECT(this.props.colorIndex),
                        textAlign: "center"
                      }
                    ]}
                  >
                    {submitText}
                  </Text>
                </Button>
              </View>
              {/* Button Bawah End */}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    // backgroundColor: '#FFFFFF',
    // flex: 1,
    // flexDirection: 'column',
    // elevation: 1,
  },
  box: {
    elevation: 1,
    borderRadius: 15,
    width: 50,
    height: 50
  },
  boxSelectLanguage: {
    width: "100%",
    elevation: 2,
    borderRadius: 15
  }
});
