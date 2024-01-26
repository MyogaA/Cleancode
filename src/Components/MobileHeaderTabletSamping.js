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
  FlatList,
  TouchableHighlight,
  ScrollView,
  Alert,
  Linking,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions
} from "react-native";
import {
  WHITE,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SUB,
  RED_400,
  BLACK,
  RED_500,
  MAIN_TEXT_COLOR_LIST,
  GREEN_500
} from "../Libraries/Colors";

import { Actions } from "react-native-router-flux";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import FA5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "./Button";
import Checkbox from "./Checkbox";
import FloatingLabelInput from "./FloatingTextInput";
import Text from "./Text";
import LoginFunctions from "../Libraries/LoginFunctions";
import ColorFunctions from "../Libraries/ColorFunctions";

import {
  _notifikasi,
  _booking,
  _tolak,
  _hold,
  _konfirmasi,
  _permintaan_reservasi,
  _message1,
  _message2,
  _nama,
  _jumlah,
  _waktu,
  _date,
  _notes,
  _status,
  _time_left
} from "../Libraries/DictionaryDrawer";

import Dropdown from "./MobileDropdown";
import Dropdown_V2 from "./MobileHeaderDropDown";
import DeviceInfo from "react-native-device-info";

import MainStyle from "../Styles";
import {
  GetBookingAPI,
  GetTableAPI,
  CancelBookAPI,
  AssignBookingAPI,
  LogoutAPI,
  GetNotificationAPI
} from "../Constants";
import moment from "moment";
import PrinterFunctions from "../Libraries/PrinterFunctions";
import NetInfo from "@react-native-community/netinfo";
import { _add_header, _choose_type } from "../Libraries/DictionaryRekap";
import { _batal } from "../Libraries/DictionaryPayment";
import { _pilih_meja } from "../Libraries/DictionaryHistory";
import { _confirmation_logout, _no, _yes } from "../Libraries/DictionarySetting";

const styles = StyleSheet.create({
  headerMain: {
    //height: 56,
    flexDirection: "column",
    //elevation: 0,
    paddingLeft: 10
  },
  headerBtnView: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  headerIcon: {
    color: WHITE,
    fontSize: 22
  },
  notifView: {
    position: "absolute",
    //backgroundColor: '#F44336',
    backgroundColor: WHITE,
    borderRadius: 20,
    height: 15,
    width: 15,
    right: 10,
    top: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  notifMain: {
    width: "90%",
    paddingTop: 15,
    paddingBottom: 15,
    minHeight: 200,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute",
    right: "5%",
    top: 35,
    zIndex: 5,
    elevation: 3,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: BLACK
  },
  notifHeader: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: BLACK
  },
  notifListMain: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15
    //flex: 1
    //backgroundColor: "#BCA"
  },
  notifListIndividual: {
    marginBottom: 15,
    paddingTop: 15,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1,
    backgroundColor: "rgba(196, 196, 196, 0.42)"
  },
  buttons: {
    backgroundColor: WHITE,
    borderRadius: 5,
    borderColor: BLACK,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  }
});

var isConnectedStatus = true;

export default class MobileHeaderTabletSamping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_logout: false,
      tablet: DeviceInfo.isTablet(),
      modal_table: false,
      modal_reject: false,
      ready: true,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      notification: true,
      notifNumber: 0,
      cartNumber: 0,
      notificationType: "Booking",
      title: this.props.title ? this.props.title : 0,
      userInfo: this.props.loginInformation
        ? this.props.loginInformation
        : null,
      showNotification: false,
      list_booking: [],
      list_table: [],
      reason_reject: "",
      selected_booking: 0,
      selected_table: 0,
      refreshing: false,
      list_notification: [],
      is_online: true
    };
  }

  componentDidMount() {
    //this.getNotif();

    // if (this.props.dineInID) {
    //   console.log("dineInID ==> ", this.props.dineInID);
    // }

    const unsubscribe = NetInfo.addEventListener(state => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      //alert(state.isConnected);
      this.setState({ is_online: state.isConnected });
    });

    //unsubscribe();

    LoginFunctions.LoginInformation(val => {
      this.setState({ userInfo: val });
    });

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    ColorFunctions.GetColor(val => {
      if (val !== 0 && this.state.colorIndex === 0) {
        this.setState({ colorIndex: val });
      }
    });

    LoginFunctions.AuthToken(val => {
      //console.log("auth token ==> ", val);
      this.setState({
        auth: val
      });
    });

    //console.log("TEst Headerrrr ==>");

    if (this.state.userInfo) {
      //this.getBookingList();
      //this.getNotification();
    } else {
      setTimeout(() => {
        //this.getBookingList();
        //this.getNotification();
      }, 100);
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      LoginFunctions.LoginInformation(val => {
        if (val !== this.state.userInfo) {
          this.setState({ userInfo: val });
        }
      });

      if (this.props.fromSetting) {
        this.setState({ colorIndex: this.props.colorIndex });
      } else {
        ColorFunctions.GetColor(val => {
          if (val !== 0 && this.state.colorIndex === 0) {
            this.setState({ colorIndex: val });
          }
        });
      }

      PrinterFunctions.GetLanguage(val => {
        if (val !== null) {
          this.setState({ languageIndex: val });
        }
      });

    }
  }

  renderLogoutMessage() {
    const { logoutAction } = this.props;
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modal_logout}
        onRequestClose={() => {
          this.setState({ modal_logout: false });
        }}
      >
        <View style={[ss.modalCover]}>
          <View
            style={{
              width: "70%",
              //minHeight: 200,
              //maxHeight: height * 0.6,
              backgroundColor: WHITE,
              borderRadius: 10,
              marginLeft: 20,
              marginRight: 20
            }}
          >
            <View style={{ position: "absolute", right: 10, top: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modal_logout: false });
                }}
              >
                <Ionicons name={"md-close"} size={30} color={WHITE} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                margin: 20,
                marginBottom: 5
                //borderBottomWidth: 1,
                //borderColor: BLACK
                //backgroundColor:'#BCA'
              }}
            >
              <View style={[ss.modalHeader]}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      //alignSelf : "center"
                      textAlign: "center"
                    }
                  ]}
                >
                  {_confirmation_logout[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 0,
                marginLeft: 20,
                marginRight: 20,
                width: "100%",
                //flexDirection: "row",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={[
                  ss.modalContent,
                  {
                    marginBottom: 25,
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }
                ]}
              >
                <Button
                  onPress={() => {
                    this.setState({ modal_reject: false });
                  }}
                  style={{
                    minHeight: 25,
                    minWidth: 100,
                    backgroundColor: "rgba(49, 150, 206, 0.59)",

                    borderRadius: 5,
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
                    {_no[this.state.languageIndex]}
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    logoutAction();
                  }}
                  style={{
                    minHeight: 25,
                    minWidth: 100,
                    backgroundColor: "rgba(225, 114, 114, 0.59)",
                    
                    borderRadius: 5,
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
                    {_yes[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    let {
      backAction,
      logoutAction,
      border,
      activeMenuIndex,
      popAction
    } = this.props;

    let { userInfo } = this.state;
    let colorIndex = this.state.colorIndex;
    let bgColorTemp = WHITE;
    let tempTextColor = BLACK;
    let selectedMenu = activeMenuIndex ? activeMenuIndex : 0;

    //colorIndex = 7;
    return (
      <View>
        {this.renderLogoutMessage()}
        <View style={[styles.headerMain, 
          { alignItems: "center", backgroundColor: bgColorTemp,
            height: "100%", padding: 10
          }]}>
          <View style = {{height: "90%", flexDirection:"column"}}>
          <Button
              style={{backgroundColor: selectedMenu === 0 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 0)
                {

                }
                else
                {
                  if (selectedMenu === 5)
                  {
                    Actions.Splash({
                      changeSetting: true
                    });
                    
                  }
                  else
                  {
                    Actions.MobileHomeTablet({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }
                  
                }
              }}
            >
            <View style={styles.headerBtnView}>
              <Ionicons
                name="home"
                style={[styles.headerIcon, { color: selectedMenu === 0 ? WHITE : tempTextColor }]}
                />
            </View>
          </Button>
          
          <Button
            style={{backgroundColor: selectedMenu === 1 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 1)
                {

                }
                else
                {
                  Actions.MobileMejaTablet({
                    auth: this.state.auth,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }

              }}
            >
              <View style={styles.headerBtnView}>
              <MaterialCommunityIcons
                name="table"
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 1 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>
          <Button
            style={{backgroundColor: selectedMenu === 2 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
            onPress={() => {
              if(selectedMenu === 2)
              {

              }
              else
              {
                if(selectedMenu !== 0)
                {
                  // Actions.pop();
                  popAction();
                }
                Actions.MobileProductTablet({
                  auth: this.state.auth,
                  userInfo: this.state.userInfo,
                  colorIndex: this.state.colorIndex,
                  languageIndex: this.state.languageIndex
                });
              }
              }}
            >
              <View style={styles.headerBtnView}>
              <FontAwesome
                name="tags"
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 2 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>
          <Button
            style={{backgroundColor: selectedMenu === 3 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 3)
                {

                }
                else
                {
                  if(selectedMenu !== 0)
                  {
                    // Actions.pop();
                    popAction();
                  }
                  Actions.MobileRekapTablet({
                    auth: this.state.auth,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }

              }}
            >
              <View style={styles.headerBtnView}>
              <MaterialCommunityIcons
                name="notebook"
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 3 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>
          <Button
            style={{backgroundColor: selectedMenu === 4 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 4)
                {

                }
                else
                {
                  if(selectedMenu !== 0)
                  {
                    // Actions.pop();
                    popAction();
                  }

                  Actions.MobileHistoryTablet({
                    auth: this.state.auth,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }
              }}
            >
              <View style={styles.headerBtnView}>
              <MaterialCommunityIcons
                name="history"
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 4 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>
          <Button
              style={{backgroundColor: selectedMenu === 6 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 6)
                {

                }
                else
                {
                  if(selectedMenu !== 0)
                  {
                    // Actions.pop();
                    popAction();
                  }

                  Actions.MobileManagementTablet({
                    auth: this.state.auth,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }

                 
              }}
            >
              <View style={styles.headerBtnView}>
              <FontAwesome
                name="user-circle" 
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 6 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>
          <Button
              style={{backgroundColor: selectedMenu === 7 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 7)
                {

                }
                else
                {
                  if(selectedMenu !== 0)
                  {
                    // Actions.pop();
                    popAction();
                  }

                  Actions.MobileKitchen({
                    auth: this.state.auth,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }

                 
              }}
            >
              <View style={styles.headerBtnView}>
              <Ionicons
                name="restaurant" 
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 7 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>








          
          <Button
              style={{backgroundColor: selectedMenu === 5 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 5)
                {

                }
                else
                {
                  if(selectedMenu !== 0)
                  {
                    // Actions.pop();
                    popAction();
                  }

                  Actions.MobileSettingTablet({
                    auth: this.state.auth,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }

                 
              }}
            >
              <View style={styles.headerBtnView}>
              <Ionicons
                name="md-settings"
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 5 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>


          <Button
              style={{backgroundColor: selectedMenu === 901 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 901)
                {

                }
                else
                {
                  if(selectedMenu !== 0)
                  {
                    // Actions.pop();
                    popAction();
                  }

                  Actions.MobileDemoPrinter({
                    auth: this.state.auth,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }

                 
              }}
            >
              <View style={styles.headerBtnView}>
              <MaterialCommunityIcons
                name="printer-pos"
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 901 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>

          <Button
              style={{display: "none", backgroundColor: selectedMenu === 5 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if(selectedMenu === 5)
                {

                }
                else
                {
                  if(selectedMenu !== 0)
                  {
                    // Actions.pop();
                    popAction();
                  }
                  Actions.TestingDualScreenPayment({
                    auth: this.state.auth,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex,
                    dataState: this.props.dataState
                  });
                }

                 
              }}
            >
              <View style={styles.headerBtnView}>
              <Ionicons
                name="md-settings"
                size={25}
                style={[styles.headerIcon, { color: selectedMenu === 5 ? WHITE : tempTextColor }]}
              />
              </View>
          </Button>
          
          </View>


          <View style = {{height: "10%", flexDirection:"column", display: "none"}}>
          {userInfo ? (
            <Button
            style={{backgroundColor: selectedMenu === 999 ? MAIN_THEME_COLOR_SELECT(colorIndex) : WHITE, borderRadius: 10, marginBottom: 0}}
              onPress={() => {
                if (typeof logoutAction === "function") {
                  this.setState({ modal_logout: true });
                }
              }}
            >
              <View style={styles.headerBtnView}>
                <Entypo
                  name="log-out"
                  style={[styles.headerIcon, { color: selectedMenu === 999 ? WHITE : tempTextColor }]}
                />
              </View>
            </Button>
          ) : (
            <View />
          )}
          </View>
          

        </View>
        <View
          style={{
            display: border ? "flex" : "none",
            //backgroundColor: "#BCA",
            height: 1,
            borderBottomWidth: 2,
            borderColor: "#DADADA",
            marginLeft: 15,
            marginRight: 15
          }}
        />
      </View>
    );
  }
}

const ss = StyleSheet.create({
  modalCover: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBox: {
    width: "30%",
    minHeight: 200,
    //maxHeight: height * 0.6,
    backgroundColor: WHITE,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20
    //marginTop: height * 0.25,
    //marginBottom: height * 0.25,
  },
  modalHeader: {
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    paddingBottom: 5,
    width: "75%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    width: "75%",
    //flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});
