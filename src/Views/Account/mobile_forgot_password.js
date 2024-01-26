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
  TextInput
} from "react-native";

import Header from "../../Components/Header";
import Button from "../../Components/Button";
import Image from "../../Components/Image";
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
  _register,
  _lupa_password,
  _lupa_password_text,
  _lupa_password_button
} from "../../Libraries/DictionaryLogin";
import { BackHandler } from "react-native";

export default class MobileForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      login: false,
      loading: false,
      email: "",
      staffId: "",
      password: "",
      rememberMe: false,
      ready: true,
      device_info: null,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0
    };
  }

  componentDidMount() {
    LoginFunctions.GetDeviceInfo(response => {
      if (response) {
        this.setState({ device_info: response });
        console.log("device_info ==> ", response);
      }
    });
    //Orientation.lockToLandscapeLeft();
    //Orientation.addOrientationListener(this._orientationDidChange);
    //Orientation.lockToLandscapeLeft();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
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

  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE-LEFT") {
      this.setState({ ready: true });
    } else {
      // do something with portrait layout
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    //Actions.pop();
    //this.props.onBackPress();

    Actions.pop();

    return true;
  };

  loginHandler() {
    // let information = {
    //   name: "Dicky Yosep",
    //   email: this.state.email,
    //   staffId: this.state.staffId,
    //   password: this.state.password,
    //   address: "Sunter Agung Jakarta Utara",
    //   storeName: "Kopi Kiwi",
    //   storeDescription: "Outlet 1 Jakarta",
    //   retailId: 1,
    //   geraiId: 1
    // };

    let device_id = this.state.device_info
      ? this.state.device_info.userId
      : "ABC";

    let data = {
      staff_id: this.state.staffId,
      email: this.state.email,
      password: this.state.password,
      device_id: device_id
    };
    //console.log('loginHandler information ==> ', information);
    //console.log('loginHandler action ==> ', action);
    LoginFunctions.LoginFunction(data, response => {
      if (response.status) {
        console.log("Login Response ==> ", response);
        //console.log("Login Response ==> ", response.data);

        Actions.pop();
        Actions.MobileMainMenu({
          userInfo: response.data,
          colorIndex: this.state.colorIndex,
          languageIndex: this.state.languageIndex
        });

        //Actions.Home({userInfo: information});
      } else {
        //console.log("Login Failed");
        alert(response.message);
      }
    });
    // if (typeof action === 'function') {
    //   //action(information);

    // }
  }

  contentLeftSide(width, height) {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Banner
          colorIndex={this.state.colorIndex}
          //bannerWidth={width} bannerHeight={height}
        />
      </View>
    );
  }

  contentRightSide() {
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
            <View style={{ marginTop: 15 }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 20,
                    color: BLACK
                  }
                ]}
              >
                {_lupa_password[this.state.languageIndex]}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    marginTop: 10,
                    fontSize: 12,
                    color: BLACK
                  }
                ]}
              >
                {_lupa_password_text[this.state.languageIndex]}
              </Text>
            </View>

            <View style={{ marginTop: 15 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,

                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="email-address"
                type="text"
                ref={q => {
                  this._emailText = q;
                }}
                //onSubmitEditing={() => this._staffText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                placeholder="Email"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            marginTop: 5,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row"
            //backgroundColor: "#BCA",
            //flex: 1
          }}
        >
          <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }}>
            <Button
              onPress={() => {
                //Actions.Register();
                //console.log('Login');
                //this.loginHandler();
              }}
            >
              <View
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  marginTop: 15,
                  marginBottom: 15,
                  borderRadius: 20,
                  borderWidth: 0,
                  borderColor: WHITE,
                  padding: 10,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  alignContent: "flex-end",
                  elevation: 1
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                      fontSize: 17
                    }
                  ]}
                >
                  {_lupa_password_button[this.state.languageIndex]}
                </Text>
              </View>
            </Button>
          </View>
        </View>
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
        <View
          style={{
            flex: 1
          }}
        >
          <View style={{ flex: 0.4 }}>
            <Image
              style={{
                height: "100%"
              }}
              source={require("../../Images/LoginLogo.png")}
            />
            <View
              style={{
                position: "absolute",
                left: 25,
                bottom: "20%",
                //backgroundColor: "#BCA",
                width: "63%"
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 30,
                    color: WHITE
                  }
                ]}
              >
                {this.state.languageIndex === 0
                  ? "Kelola bisnismu bersama Beetpos"
                  : "Handle your business with Beetpos"}
              </Text>
            </View>
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
              {this.contentRightSide()}
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    );
  }
}
