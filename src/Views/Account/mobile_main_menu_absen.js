/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Image
} from "react-native";

import Loading from "../../Components/MobileLoading";

import Header from "../../Components/Header";
import Button from "../../Components/Button";
// import Image from "../../Components/Image";
import FloatingTextInput from "../../Components/FloatingTextInput";
import Checkbox from "../../Components/Checkbox";
// import Orientation from "react-native-orientation-locker";

import {
  MAIN_THEME_COLOR,
  WHITE,
  BLACK,
  BLUE_500,
  BLUE_700,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT
} from "../../Libraries/Colors";
import MainStyle from "../../Styles";
import { Actions } from "react-native-router-flux";
import LoginFunctions from "../../Libraries/LoginFunctions";
import Banner from "./banner";
import ColorFunctions from "../../Libraries/ColorFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";
import {
  _remember_me,
  _new_to_beetpos,
  _sign_up_now,
  _masuk_1,
  _masuk_btn,
  _sign_up_now_2,
  _hello,
  _menu_1,
  _menu_2,
  _menu_3,
  _menu_4,
  _menu_5,
  _menu_6
} from "../../Libraries/DictionaryLogin";

export default class MobileMainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      login: false,
      rememberMe: false,
      ready: true,
      device_info: null,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0
    };
  }

  componentDidMount() {
    //console.log("USER info ==> ", this.state.userInfo);
    LoginFunctions.GetDeviceInfo(response => {
      if (response)
      {
      this.setState({ device_info: response });
      console.log("device_info ==> ", response);
      }
    });

    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    LoginFunctions.LoginInformation(val => {
      //console.log("dari login ", val);
      if (val) {
        Actions.pop();
        Actions.MobileMainMenu({
          userInfo: val,
          colorIndex: this.state.colorIndex,
          languageIndex: this.state.languageIndex
        });
      }
    });

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });
  }

  componentDidUpdate(nextProps) {
    // if (this.props !== nextProps) {
    //   LoginFunctions.GetDeviceInfo(response => {
    //     this.setState({ device_info: response });
    //     console.log("device_info ==> ", response);
    //   });
    //   ColorFunctions.GetColor(val => {
    //     if (val && this.state.colorIndex !== val) {
    //       this.setState({ colorIndex: val });
    //     }
    //   });
    //   LoginFunctions.LoginInformation(val => {
    //     //console.log("dari login ", val);
    //     if (val) {
    //       Actions.pop();
    //       Actions.MobileMainMenu({
    //         userInfo: val,
    //         colorIndex: this.state.colorIndex,
    //         languageIndex: this.state.languageIndex
    //       });
    //     }
    //   });
    //   PrinterFunctions.GetLanguage(val => {
    //     if (val) {
    //       this.setState({ languageIndex: val });
    //     }
    //   });
    // }
  }

  componentWillUnmount() {
    // let information = {
    //   name: 'Dicky Yosep',
    //   email: 'dickyyosep5@gmail.com',
    //   phone: this.state.phone,
    //   password: this.state.password,
    //   address: 'Sunter Agung Jakarta Utara',
    // };
    // Actions.refresh({
    //   fromLogin: true,
    //   userInfo: information,
    // });
  }

  mainContent() {
    let { width, height } = Dimensions.get("window");
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          marginTop: -30,
          backgroundColor: WHITE,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              width: "100%",
              alignSelf: "center",
              paddingLeft: 30,
              paddingRight: 30
            }}
          >
            <View
              style={{
                marginTop: 15,
                borderColor: "#DADADA",
                paddingBottom: 5,
                borderBottomWidth: 2
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 20,
                    color: BLACK
                  }
                ]}
              >
                {_hello[this.state.languageIndex]}
                {this.state.userInfo.name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                justifyContent: "space-evenly",
                display: "none"
              }}
            >
              <Button
                style={{ width: "33%", alignItems: "center" }}
                onPress={() => {
                  Actions.MobileHomePage({
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon1.png")}
                />
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: "#8A8A8F"
                    }
                  ]}
                >
                  {_menu_1[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                style={{ width: "33%", alignItems: "center" }}
                onPress={() => {
                  Actions.MobileHistory({
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon2.png")}
                />
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: "#8A8A8F"
                    }
                  ]}
                >
                  {_menu_2[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                style={{ width: "33%", alignItems: "center" }}
                onPress={() => {
                  Actions.MobileManagement({
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon3.png")}
                />
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: "#8A8A8F"
                    }
                  ]}
                >
                  {_menu_3[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
            {/* BARIS 2 */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                justifyContent: "space-evenly"
              }}
            >
              <Button
                style={{ width: "33%", alignItems: "center" }}
                onPress={() => {
                  Actions.MobileAbsensi({
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon4.png")}
                />
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: "#8A8A8F"
                    }
                  ]}
                >
                  {_menu_4[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                style={{ width: "33%", alignItems: "center", display: "none" }}
                onPress={() => {
                  Actions.MobileRekap({
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon5.png")}
                />
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: "#8A8A8F"
                    }
                  ]}
                >
                  {_menu_5[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                style={{ width: "33%", alignItems: "center", display: "none" }}
                onPress={() => {
                  Actions.MobileSetting({
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon6.png")}
                />
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: "#8A8A8F"
                    }
                  ]}
                >
                  {_menu_6[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    //const {currentTab, changeTabBar} = this.props;
    const { loginActivity } = this.props;
    //console.log('login props ==> ', this.props);
    let { width, height } = Dimensions.get("window");
    console.log("LOGIN COLOR INDEX ==> ", this.props.colorIndex);
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: WHITE
        }}
      >
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={WHITE}
          //color={BLACK}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {/* <Loading /> */}
        <View
          style={{
            flex: 1
          }}
        >
          <View style={{ flex: 0.4 }}>
            <Image
              style={{
                height: "100%",
                resizeMode: "cover"
              }}
              source={require("../../Images/LoginLogo.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 0.6,
              justifyContent: "space-around",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <View
              style={{
                width: "100%"
              }}
            >
              {this.mainContent()}
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    );
  }
}
