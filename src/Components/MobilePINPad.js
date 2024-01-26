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
  BLACK
} from "../Libraries/Colors";
import Fontisto from "react-native-vector-icons/Fontisto";

import { Actions } from "react-native-router-flux";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import FA5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "./Button";
import Checkbox from "./Checkbox";
import FloatingLabelInput from "./FloatingTextInput";
import Text from "./Text";
import MainStyle from "../Styles";
import Loading from "./MobileLoading";

import DeviceInfo from "react-native-device-info";
import { _masukan_kode } from "../Libraries/DictionaryAbsen";
import { _kembali } from "../Libraries/DictionaryHome";
import { _konfirmasi } from "../Libraries/DictionaryLogin";

export default class MobilePinPad extends Component {
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

  renderPinButton() {
    let { pin1, pin2, pin3, pin4, pin5, pin6, changePin } = this.props;
    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            backgroundColor: WHITE,
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0,
            //marginBottom: 5,
            marginTop: 5
            //elevation: 1
          }
        ]}
      >
        {/* <View>
          <Text>
            PIN : {pin1}
            {pin2}
            {pin3}
            {pin4}
            {pin5}
            {pin6}
          </Text>
        </View> */}
        <View
          style={{
            flex: 1,
            //justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(1, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                1
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(2, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                2
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(3, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                3
              </Text>
            </Button>
          </View>
        </View>
        {/* ROW 1 END */}
        <View
          style={{
            flex: 1,
            //justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(4, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                4
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(5, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                5
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(6, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                6
              </Text>
            </Button>
          </View>
        </View>
        {/* ROW 2 END */}
        <View
          style={{
            flex: 1,
            //justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(7, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                7
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(8, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                8
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(9, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                9
              </Text>
            </Button>
          </View>
        </View>
        {/* ROW 3 END */}
        <View
          style={{
            flex: 1,
            //justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(-1, "clear");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                C
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(0, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK
                  }
                ]}
              >
                0
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                changePin(-1, "delete");
              }}
            >
              <MaterialCommunityIcons
                name={"backspace"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            </Button>
          </View>
        </View>
      </View>
    );
  }

  renderPinNumber() {
    let { pin1, pin2, pin3, pin4, pin5, pin6, languageIndex } = this.props;
    return (
      <View
        style={[
          ss.box,
          {
            //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 1,
            //padding: 15,
            margin: 15,
            marginTop: 10
          }
        ]}
      >
        <View
          style={{
            width: "100%"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: BLACK, marginTop: 10, marginBottom: 10 }
            ]}
          >
            {_masukan_kode[languageIndex]}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <View style={ss.pinNumber}>
            {pin1 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin2 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin3 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin4 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin5 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin6 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  render() {
    let {
      message,
      title,
      closeActions,
      actions,
      colorIndex,
      languageIndex,
      grandTotal,
      loading
    } = this.props;
    let { width, height } = Dimensions.get("window");
    let tablet = DeviceInfo.isTablet();
    let closeText = _kembali[languageIndex];
    let submitText = _konfirmasi[languageIndex];

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.closeModal(closeActions);
          }}
        >
          {loading ? <Loading /> : <View />}
          <View
            style={{
              flex: 0.33,
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          />
          <View
            style={{
              flex: 0.67,
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            <View
              style={{
                flex: 1,
                width: tablet ? "50%" : "100%",
                alignSelf: "center",
                backgroundColor: "#FFF",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                borderColor: "#C4C4C4",
                borderWidth: 2
              }}
            >
              {this.renderPinNumber()}
              {this.renderPinButton()}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    backgroundColor: "#FFF",
    flex: 1,
    flexDirection: "column"
  },
  mainContent: {
    flexDirection: "row",

    flex: 1,
    justifyContent: "space-between"
  },
  leftSide: {
    width: "100%",
    marginTop: 0
  },
  rightSide: {
    width: "45%",
    marginTop: 0,
    backgroundColor: "#FFF",
    elevation: 3,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1
  },
  box: {
    elevation: 0,
    borderRadius: 0
  },
  pinButton: {
    //backgroundColor: MAIN_THEME_COLOR,
    flex: 1,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    //elevation: 1,
    borderRadius: 0,
    //width: 75,
    //height: 75,
    //width: "33%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  button: {
    elevation: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  pinNumber: {
    borderRadius: 5,
    borderColor: "#8A8A8F",
    padding: 10,
    width: "15%",
    borderWidth: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  flipText: {
    color: "white",
    fontSize: 15
  },
  zoomText: {
    position: "absolute",
    bottom: 70,
    zIndex: 2,
    left: 2
  }
});
