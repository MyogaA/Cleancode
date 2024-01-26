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

import { Actions } from "react-native-router-flux";
import { WebView } from "react-native-webview";

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
import Loading from "./MobileLoading";

import DeviceInfo from "react-native-device-info";
import { _confirm_transaction, _grand_total, _kembali } from "../Libraries/DictionaryPayment";
import { _konfirmasi } from "../Libraries/DictionaryDrawer";

export default class CustomAlert extends Component {
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
      closeActions,
      actions,
      colorIndex,
      languageIndex,
      grandTotal,
      image,
      loading,
      cz_type,
      cz_continue
    } = this.props;
    let { width, height } = Dimensions.get("window");

    let closeText = _kembali[languageIndex];
    let submitText = _konfirmasi[languageIndex];
    console.log("qr image ===> ", image);

    let tablet = DeviceInfo.isTablet();

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
                width: tablet ? (width - 40) / 2 : width - 40,
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
                    this.closeModal(closeActions);
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
                      {_confirm_transaction[languageIndex]}
                    </Text>
                  </View>

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
                        ([MainStyle.robotoNormal],
                        {
                          fontSize: 12,
                          //alignSelf : "center"
                          textAlign: "center"
                        })
                      }
                    >
                      {_grand_total[languageIndex]}
                    </Text>
                  </View>

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
                      {grandTotal}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  {/* {image ? (
                    <WebView
                      source={{ uri: image }}
                      style={{
                        marginTop:
                          cz_type === "qr"
                            ? -350
                            : cz_continue === 1 && cz_type === "debit"
                            ? 0
                            : -50,
                        marginBottom: cz_type === "qr" ? -250 : -125
                      }}
                      containerStyle={{ flex: 0, width: "100%", height: 450 }}
                      geolocationEnabled={true}
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : (
                    <View />
                  )} */}
                  {image ? (
                    <WebView
                      source={{ uri: image }}
                      containerStyle={{ flex: 0, width: "100%", height: 450 }}
                      geolocationEnabled={true}
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    />
                  ) : (
                    <View />
                  )}
                </View>
                <View
                  style={{
                    width: "75%",
                    //flex: 1,
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 15,
                    marginBottom: 0
                    //backgroundColor: '#ABC'
                  }}
                >
                  <Button
                    onPress={() => {
                      this.closeModal(closeActions);
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
                  {/* <Button
                    onPress={() => {
                      this.closeModal(actions);
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
                        {submitText}
                      </Text>
                    </View>
                  </Button> */}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
