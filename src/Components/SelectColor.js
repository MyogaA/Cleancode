/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
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
  YELLOW_500,
  RED_50,
  RED_500,
  MAIN_THEME_COLOR_SELECT
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
import DeviceInfo from "react-native-device-info";

const _pilih_warna = ["Pilih Warna", "Pick Color"];
const _kembali = ["Kembali", "Back"];
const _konfirmasi = ["Konfirmasi", "Confirm"];

export default class SelectColor extends Component {
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
      title,
      actions,
      closeText,
      activeColorIndex,
      colorSelection,
      colorIndex,
      changeColorAction,
      languageIndex,
      closeAction
    } = this.props;
    let { width, height } = Dimensions.get("window");

    if (!closeText) {
      closeText = _kembali[languageIndex];
    }

    let submitText = _konfirmasi[languageIndex];

    // let message = [
    //   "You haven't sign in yet,",
    //   `Sign to access our ${extraMsg} features!`,
    // ];

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
                width: DeviceInfo.isTablet() ? "50%" : "95%",
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
                    marginTop: 30,
                    //marginLeft: 20,
                    //marginRight: 20,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center"
                    //height: '100%',
                    //backgroundColor: "#555"
                  }}
                >
                  <View
                    style={{
                      //justifyContent: 'center',
                      //alignItems: 'center',
                      //flex:1,
                      //backgroundColor: "#999",
                      width: "75%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 0,
                      marginBottom: 5
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: DeviceInfo.isTablet() ? 14 : 14,
                          //alignSelf : "center"
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_pilih_warna[languageIndex]}
                    </Text>
                    {/* <Button>
                      <View style={[ss.triangle, { height: 25, width: 25 }]} />
                    </Button> */}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: DeviceInfo.isTablet() ? "75%" : "75%",
                      marginTop: 20
                    }}
                  >
                    <View
                      style={[
                        ss.box,
                        {
                          // backgroundColor: "#732F46"
                          //backgroundColor: "#732F46"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(0);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            flexDirection: "row",
                            borderColor:
                              activeColorIndex === 0 ? "#E29840" : "transparent"
                          }
                        ]}
                      >
                        <View
                          style={{
                            backgroundColor: "#E29840",
                            flex: 1,
                            borderRadius: 10
                          }}
                        />
                        {/* <View
                          style={{
                            backgroundColor: "#FFF",
                            flex: 0.2
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: "#BCA",
                            flex: 0.2,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10
                          }}
                        /> */}
                      </Button>
                    </View>
                    <View
                      style={[
                        ss.box,
                        {
                          backgroundColor: "#79BCE2"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(1);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor:
                              activeColorIndex === 1 ? BLACK : "transparent"
                          }
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        ss.box,
                        {
                          backgroundColor: "#A2DC68"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(2);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor:
                              activeColorIndex === 2 ? BLACK : "transparent"
                          }
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        ss.box,
                        {
                          //backgroundColor: "#732F46"
                          backgroundColor: "#F2994A"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(3);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor:
                              activeColorIndex === 3 ? BLACK : "transparent"
                          }
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        ss.box,
                        {
                          backgroundColor: "#B853AE"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(4);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor:
                              activeColorIndex === 4 ? BLACK : "transparent"
                          }
                        ]}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: DeviceInfo.isTablet() ? "75%" : "75%",
                      marginTop: 20
                    }}
                  >
                    <View
                      style={[
                        ss.box,
                        {
                          backgroundColor: "#BA1818"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(5);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor:
                              activeColorIndex === 5 ? BLACK : "transparent"
                          }
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        ss.box,
                        {
                          backgroundColor: "#AE79E2"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(6);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor:
                              activeColorIndex === 6 ? BLACK : "transparent"
                          }
                        ]}
                      />
                    </View>
                    <View
                      onPress={() => {
                        changeColorAction(7);
                      }}
                      style={[
                        ss.box,
                        {
                          backgroundColor: "#D6D946"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(7);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor:
                              activeColorIndex === 7 ? BLACK : "transparent"
                          }
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        ss.box,
                        {
                          backgroundColor: "#000000"
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(8);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor:
                              activeColorIndex === 8 ? RED_500 : "transparent"
                          }
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        ss.box,
                        {
                          backgroundColor: "#FFFFFF",
                          borderColor: "#000000",
                          borderWidth: 1
                        }
                      ]}
                    >
                      <Button
                        onPress={() => {
                          changeColorAction(9);
                        }}
                        style={[
                          ss.innerBox,
                          {
                            borderColor: "#000",
                            borderWidth: activeColorIndex === 9 ? 3 : 1
                          }
                        ]}
                      />
                    </View>
                  </View>
                  {/* {message.map(val => {
                    return (
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
                          {val}
                        </Text>
                      </View>
                    );
                  })} */}
                </View>
                <View style={{ flexDirection: "row", marginTop: 25 }}>
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
                        this.closeModal(closeAction);
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          width: 125,
                          elevation: 2,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(colorIndex),
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: DeviceInfo.isTablet() ? 12 : 12,
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
                        this.closeModal(actions);
                        //Actions.Login();
                        //Actions.reset('Login');
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          width: 125,
                          elevation: 2,
                          backgroundColor: "#83B235",
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: DeviceInfo.isTablet() ? 12 : 12,
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
    elevation: 0,
    borderRadius: 15,
    width: 50,
    height: 50
  },
  innerBox: {
    flex: 1,
    borderColor: "transparent",
    borderWidth: 3,
    borderRadius: 15
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderRightWidth: 50,
    borderBottomWidth: 0,
    borderTopWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "black",
    borderBottomColor: "black",
    borderTopLeftRadius: 15
  }
});
