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
  RED_400,
  BLACK
} from "../Libraries/Colors";

import { Actions } from "react-native-router-flux";

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
  _selisih_2
} from "../Libraries/DictionaryRekap";

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
import { _total } from "../Libraries/DictionaryHistory";

export default class RekapKas extends Component {
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
      rekapTunai,
      rekapGoPay,
      rekapTotal,
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

    let systemTunai = 100000;
    let systemGoPay = 80000;
    let systemTotal = systemTunai + systemGoPay;

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
            <View
              style={{
                //minWidth: width - 40,
                width: "50%",
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
                    this.closeModal(closeAction);
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
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 0,
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
                      width: "75%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 0,
                      marginBottom: 50
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 28,
                          //alignSelf : "center"
                          textAlign: "center"
                        }
                      ]}
                    >
                      {title}
                    </Text>
                  </View>
                  {/* Tunai Start */}
                  <View
                    style={{
                      //justifyContent: 'space-between',
                      //backgroundColor: "#BCA",
                      width: "75%",
                      marginTop: 0,
                      //flexDirection: "row",
                      alignItems: "center",
                      alignContent: "center"
                    }}
                  >
                    <View
                      style={{
                        //width: "100%",
                        marginBottom: 5,
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
                            fontSize: 20,
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
                          keyboardType="numeric"
                          type="text"
                          ref={q => {
                            this._tunai = q;
                          }}
                          onSubmitEditing={() => {
                            //this.getData(this.state.searchKey);
                            // this.setState({viewSearch: false});
                            //this.submit(submitAction);
                            //this._gopay.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => {
                            this.changeJumlah(changeRekapTunai, v);
                          }}
                          value={rekapTunai === 0 ? "" : rekapTunai.toString()}
                          placeholder={_tunai[languageIndex]}
                          placeholderTextColor="#777"
                        />
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
                            fontSize: 20,
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
                          {systemTunai}
                        </Text>
                      </View>
                    </View> */}
                  </View>
                  {/* Tunai End */}
                  {/* Go Pay Start */}
                  <View
                    style={{
                      //justifyContent: 'space-between',
                      //backgroundColor: "#BCA",
                      width: "75%",
                      marginTop: 15,
                      //flexDirection: "row",
                      alignItems: "center",
                      alignContent: "center"
                    }}
                  >
                    <View
                      style={{
                        //width: "100%",
                        marginBottom: 5,
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
                            fontSize: 20,
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
                          value={rekapGoPay === 0 ? "" : rekapGoPay.toString()}
                          placeholder={_e_wallet[languageIndex]}
                          placeholderTextColor="#777"
                        />
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
                            fontSize: 20,
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
                          {systemGoPay}
                        </Text>
                      </View>
                    </View> */}
                  </View>
                  {/* Go Pay End */}
                  {/* Total Start */}
                  <View
                    style={{
                      //justifyContent: 'space-between',
                      //backgroundColor: "#BCA",
                      width: "75%",
                      marginTop: 15,
                      //flexDirection: "row",
                      alignItems: "center",
                      alignContent: "center"
                    }}
                  >
                    <View
                      style={{
                        //width: "100%",
                        marginBottom: 5,
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
                            fontSize: 20,
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
                          keyboardType="numeric"
                          type="text"
                          ref={q => {
                            this._total = q;
                          }}
                          onSubmitEditing={() => {
                            //this.getData(this.state.searchKey);
                            // this.setState({viewSearch: false});
                            //this.submit(submitAction);
                            //this._total.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => {
                            this.changeJumlah(changeRekapTotal, v);
                          }}
                          value={rekapTotal === 0 ? "" : rekapTotal.toString()}
                          placeholder={"Total"}
                          placeholderTextColor="#777"
                        />
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
                            fontSize: 20,
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
                {/* Button Bawah */}
                <View style={{ flexDirection: "row", marginTop: 25 }}>
                  <View
                    style={{
                      width: "50%",
                      //flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 15,
                      marginBottom: 0
                      //backgroundColor: '#BCA'
                    }}
                  >
                    <Button
                      onPress={() => {
                        this.closeModal(closeAction);
                        //Actions.Login();
                        //Actions.reset('Login');
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          width: 150,
                          padding: 5,
                          elevation: 2,
                          backgroundColor: "#79BCE2",
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
                              color: WHITE,
                              marginBottom: 5,
                              marginTop: 5,
                              marginLeft: 10,
                              marginRight: 10,
                              textAlign: "center"
                            }
                          ]}
                        >
                          {backText}
                        </Text>
                      </View>
                    </Button>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      //flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 15,
                      marginBottom: 0
                      //backgroundColor: '#BCA'
                    }}
                  >
                    <Button
                      onPress={() => {
                        this.submit(submitAction);
                        //Actions.Login();
                        //Actions.reset('Login');
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          width: 150,
                          padding: 5,
                          elevation: 2,
                          backgroundColor: "rgba(131, 178, 53, 0.9)",
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
                              color: WHITE,
                              marginBottom: 5,
                              marginTop: 5,
                              marginLeft: 10,
                              marginRight: 10,
                              textAlign: "center"
                            }
                          ]}
                        >
                          {submitText}
                        </Text>
                      </View>
                    </Button>
                  </View>
                </View>
                {/* Button Bawah End */}
              </View>
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
