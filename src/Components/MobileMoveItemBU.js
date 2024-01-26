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
  MAIN_THEME_COLOR_SUB,
  RED_400,
  BLACK,
  MAIN_TEXT_COLOR_SELECT
} from "../Libraries/Colors";

import {
  _pindahkan,
  _kembali,
  _konfirmasi,
  _pindahkan_produk,
  _number_of_items,
  _pindahkan_semua
} from "../Libraries/DictionaryMeja";

import { Actions } from "react-native-router-flux";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import FA5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AntDesign from "react-native-vector-icons/AntDesign";

import Button from "./Button";
import Checkbox from "./Checkbox";
import FloatingLabelInput from "./FloatingTextInput";
import Text from "./Text";
import MainStyle from "../Styles";
import DeviceInfo from "react-native-device-info";
import { _to_move } from "../Libraries/DictionaryRekap";
export default class MobileMoveItem extends Component {
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

  changeJumlah(action, text) {
    if (typeof action === "function") {
      action(text);
    }
  }

  changeJumlahButton(action, text, value) {
    let number = parseInt(text) + parseInt(value);

    console.log(text);
    console.log(value);
    console.log(number);

    if (typeof action === "function") {
      action(number);
    }
  }

  submit(action) {
    if (typeof action === "function") {
      action();
    }
  }

  render() {
    let {
      closeAction,
      submitAction,
      changeValue,
      value,
      type,
      data,
      languageIndex,
      formType,
      table1,
      table2
    } = this.props;
    let { width, height } = Dimensions.get("window");
    let title = "Rekap Kas";

    let isTablet = DeviceInfo.isTablet();

    console.log("formType ==> ", formType);

    console.log("table1 ==> ", table1);
    console.log("table2 ==> ", table2);

    let tableOrigin = "";
    let tableDestination = "";

    if (formType === 1) {
      tableOrigin = table1.name;
      tableDestination = table2.name;
    }

    if (formType === 2) {
      tableOrigin = table2.name;
      tableDestination = table1.name;
    }

    let bgColor = [WHITE, MAIN_THEME_COLOR_SELECT(this.props.colorIndex)];
    let textColor = [BLACK, WHITE];

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
                flex: 0.5,
                backgroundColor: "rgba(0,0,0,0.5)"
              }}
            />
            <View
              style={{
                //minWidth: width - 40,
                width: "100%",
                flex: 1,
                //maxHeight: height * 0.6,
                backgroundColor: WHITE,
                borderRadius: 15,
                marginLeft: 20,
                marginRight: 20
                //marginTop: height * 0.25,
                //marginBottom: height * 0.25,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  //marginTop: 20,
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
                    //backgroundColor: "#BCA"
                    //height: '100%',
                    //backgroundColor:'#555'
                  }}
                >
                  <View
                    style={{
                      //justifyContent: 'center',
                      //alignItems: 'center',
                      //flex:1,
                      //backgroundColor: "#999",
                      width: "100%",
                      //justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 0,
                      borderBottomWidth: 1,
                      paddingBottom: 10,
                      borderColor: "#DADADA",
                      flexDirection: "row"
                    }}
                  >
                    <View style={{ margin: 15, marginLeft: 0 }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.closeModal(closeAction);
                        }}
                      >
                        <Ionicons name={"md-close"} size={30} color={BLACK} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: 16
                            //alignSelf : "center"
                            //textAlign: "center"
                          }
                        ]}
                      >
                        {_pindahkan_produk[languageIndex]}
                      </Text>
                    </View>
                  </View>
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
                  />
                  {/* Tunai End */}
                  {/* Go Pay Start */}
                  <View
                    style={{
                      //justifyContent: 'space-between',

                      width: "100%",
                      marginTop: 15,
                      //flexDirection: "row",
                      alignItems: "center",
                      alignContent: "center"
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        paddingLeft: 5,
                        paddingRight: 5,
                        marginBottom: 5,
                        flexDirection: "row",
                        justifyContent: "space-between"
                        //alignItems: "center",
                        //alignContent: "center"
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            //marginLeft: 25,
                            marginRight: 10,

                            //width: "33%",
                            fontSize: 16,
                            //alignSelf : "center"
                            //textAlign: "center",
                            color: BLACK
                          }
                        ]}
                      >
                        {_pindahkan[languageIndex]} {data.name} {tableOrigin}{" "}
                        {_to_move[languageIndex]} {tableDestination}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        marginBottom: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            //marginLeft: 25,
                            marginRight: 10,

                            //width: "33%",
                            fontSize: isTablet ? 16 : 16,
                            //alignSelf : "center"
                            textAlign: "center",
                            color: BLACK
                          }
                        ]}
                      >
                        {_number_of_items[languageIndex]}
                      </Text>
                    </View>
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
                      <View
                        style={{
                          //width: "15%",
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          width: "33%",
                          borderRadius: 15,
                          marginRight: 10,
                          //borderWidth: 1,
                          //borderColor: BLACK
                          //alignItems: 'center',
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          flexDirection: "row"
                        }}
                      >
                        <Button
                          style={{ padding: 5 }}
                          onPress={() => {
                            if (value > 1) {
                              this.changeJumlahButton(changeValue, value, -1);
                            }
                          }}
                        >
                          <AntDesign
                            name={"minus"}
                            style={{
                              alignSelf: "center",
                              fontSize: 16,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.props.colorIndex
                              )
                            }}
                          />
                        </Button>
                        <TextInput
                          style={{
                            //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.props.colorIndex
                            ),
                            //backgroundColor: "#BCA",
                            padding: 0,
                            //marginLeft: '5%',
                            //marginRight: 5,
                            fontSize: isTablet ? 12 : 12,
                            fontFamily: "Roboto-Regular",
                            textAlign: "right"
                          }}
                          maxLength={2}
                          keyboardType="numeric"
                          type="text"
                          ref={q => {
                            this._qrt = q;
                          }}
                          onSubmitEditing={() => {
                            //this.getData(this.state.searchKey);
                            // this.setState({viewSearch: false});
                            this.submit(submitAction);
                            //this._total.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => {
                            this.changeJumlah(changeValue, v);
                          }}
                          value={value === 0 ? "" : value.toString()}
                          placeholder={""}
                          placeholderTextColor="#777"
                        />
                        <Button
                          style={{ padding: 5 }}
                          onPress={() => {
                            this.changeJumlahButton(changeValue, value, 1);
                          }}
                        >
                          <AntDesign
                            name={"plus"}
                            style={{
                              alignSelf: "center",
                              fontSize: 16,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.props.colorIndex
                              )
                            }}
                          />
                        </Button>
                      </View>

                      <Button
                        onPress={() => {
                          this.changeJumlahButton(changeValue, value, 999);
                        }}
                        style={{
                          //width: "15%",
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          width: "55%",
                          padding: 5,
                          borderRadius: 15,
                          marginRight: 10,
                          //borderWidth: 1,
                          //borderColor: BLACK
                          //alignItems: 'center',
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //marginLeft: 25,
                              marginRight: 10,

                              //width: "33%",
                              fontSize: isTablet ? 12 : 12,
                              //alignSelf : "center"
                              textAlign: "center",
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.props.colorIndex
                              )
                            }
                          ]}
                        >
                          {_pindahkan_semua[languageIndex]}
                        </Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
              {/* Button Bawah */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0,
                  width: "100%"
                }}
              >
                <View
                  style={{
                    width: "100%",
                    //flex: 1,
                    //justifyContent: "center",
                    //alignItems: "center",
                    padding: 15,
                    marginBottom: 0
                    //backgroundColor: '#BCA'
                  }}
                >
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
                        width: "100%",
                        padding: 10,
                        backgroundColor: MAIN_THEME_COLOR_SELECT(
                          this.props.colorIndex
                        ),
                        borderRadius: 10
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: isTablet ? 16 : 12,
                            color: WHITE,
                            marginBottom: 5,
                            marginTop: 5,
                            marginLeft: 10,
                            marginRight: 10,
                            textAlign: "center"
                          }
                        ]}
                      >
                        {_konfirmasi[languageIndex]}
                      </Text>
                    </View>
                  </Button>
                </View>
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
