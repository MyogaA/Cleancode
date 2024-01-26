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
  MAIN_THEME_COLOR_SELECT,
  RED_400,
  BLACK,
  MAIN_TEXT_COLOR_SELECT
} from "../Libraries/Colors";

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
  _add_2
} from "../Libraries/DictionaryRekap";

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

export default class AddCashInOut extends Component {
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
      title,
      closeAction,
      closeText,
      catatan,
      jumlah,
      type,
      submitAction,
      changeCatatan,
      changeJumlah,
      changeType,
      error
    } = this.props;
    let { width, height } = Dimensions.get("window");

    //console.log("ERROR ==> ", error);
    if (!closeText) {
      closeText = _kembali[languageIndex];
    }

    let submitText = _simpan[languageIndex];
    // let message = [
    //   "You haven't sign in yet,",
    //   `Sign to access our ${extraMsg} features!`,
    // ];

    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    let bgColor = [whiteColor, MAIN_THEME_COLOR_SELECT(this.props.colorIndex)];
    let textColor = [blackColor, MAIN_TEXT_COLOR_SELECT(this.props.colorIndex)];

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
                      marginBottom: 0
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
                      {_add_2[languageIndex]}
                    </Text>
                  </View>
                  {/* Button Atas */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 25,
                      width: "66%"
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
                        //backgroundColor: '#BCA'
                      }}
                    >
                      <Button
                        onPress={() => {
                          this.changeType(changeType, "in");
                          //Actions.Login();
                          //Actions.reset('Login');
                        }}
                      >
                        <View
                          style={{
                            minHeight: 25,
                            width: 150,
                            elevation: 2,
                            backgroundColor:
                              type === "in" ? bgColor[1] : bgColor[0],
                            borderColor: BLACK,
                            borderWidth: 1,
                            borderRadius: 10
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.dmSansBold,
                              {
                                fontSize: 16,
                                color:
                                  type === "in" ? textColor[1] : textColor[0],
                                marginBottom: 5,
                                marginTop: 5,
                                marginLeft: 10,
                                marginRight: 10,
                                textAlign: "center"
                              }
                            ]}
                          >
                            {_cash_in[languageIndex]}
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
                          this.changeType(changeType, "out");
                          //Actions.Login();
                          //Actions.reset('Login');
                        }}
                      >
                        <View
                          style={{
                            minHeight: 25,
                            width: 150,
                            elevation: 2,
                            borderColor: BLACK,
                            borderWidth: 1,
                            backgroundColor:
                              type === "out" ? bgColor[1] : bgColor[0],
                            borderRadius: 10
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.dmSansBold,
                              {
                                fontSize: 16,
                                color:
                                  type === "out" ? textColor[1] : textColor[0],
                                marginBottom: 5,
                                marginTop: 5,
                                marginLeft: 10,
                                marginRight: 10,
                                textAlign: "center"
                              }
                            ]}
                          >
                            {_cash_in[languageIndex]}
                          </Text>
                        </View>
                      </Button>
                    </View>
                  </View>

                  {/* Button Atas End */}
                  <View
                    style={{
                      //justifyContent: 'space-between',
                      width: "66%",
                      marginTop: 0
                    }}
                  >
                    {/* <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 20,
                          //alignSelf : "center"
                          textAlign: 'center',
                          color: BLACK,
                        },
                      ]}
                    >
                      Bahasa Indonesia
                    </Text> */}
                    <View
                      style={{
                        margin: 15,
                        marginBottom: 5,
                        //borderColor: BLACK,
                        //borderWidth: 1,
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
                          fontFamily: "RobotoSlab"
                        }}
                        keyboardType="numeric"
                        type="text"
                        ref={q => {
                          this._jumlah = q;
                        }}
                        onSubmitEditing={() => {
                          //this.getData(this.state.searchKey);
                          // this.setState({viewSearch: false});
                          //this.submit(submitAction);
                          //this._catatan.focus();
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => {
                          this.changeJumlah(changeJumlah, v);
                        }}
                        value={
                          jumlah.toString() === "0" ? "" : jumlah.toString()
                        }
                        placeholder={_jumlah[languageIndex]}
                        placeholderTextColor="#777"
                      />
                    </View>

                    <View
                      style={{
                        margin: 15,
                        marginBottom: 5,
                        //borderColor: BLACK,
                        //borderWidth: 1,
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
                          fontFamily: "RobotoSlab"
                        }}
                        keyboardType="email-address"
                        type="text"
                        ref={q => {
                          this._catatan = q;
                        }}
                        onSubmitEditing={() => {
                          //this.getData(this.state.searchKey);
                          // this.setState({viewSearch: false});
                          this.submit(submitAction);
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => {
                          this.changeCatatan(changeCatatan, v);
                        }}
                        value={catatan}
                        placeholder={_catatan[languageIndex]}
                        placeholderTextColor="#777"
                      />
                    </View>
                  </View>
                </View>
                {/* Button Bawah */}
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                  <View
                    style={{
                      width: "100%",
                      //flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 15,
                      marginBottom: 0
                      //backgroundColor: '#BCA'
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 16,
                          color: BLACK,
                          marginBottom: 5,
                          marginTop: 5,
                          marginLeft: 10,
                          marginRight: 10,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {error ? error : ""}
                    </Text>

                    <Button
                      onPress={() => {
                        //this.closeModal(closeAction);
                        this.submit(submitAction);
                        //Actions.Login();
                        //Actions.reset('Login');
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          width: 150,
                          elevation: 2,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          borderColor: MAIN_TEXT_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          borderWidth: 1,
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.props.colorIndex
                              ),
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
