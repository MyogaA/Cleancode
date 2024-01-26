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
  KeyboardAvoidingView
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
  _sign_up_now
} from "../../Libraries/DictionaryLogin";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      login: false,
      email: "test@gmail.com",
      staffId: "rizky1",
      password: "password",
      rememberMe: false,
      ready: true,
      device_info: null,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0
    };
  }

  componentDidMount() {

    setTimeout(() => {
      LoginFunctions.GetDeviceInfo(response => {
        if (response)
        {
          this.setState({ device_info: response });
          console.log("device_info ==> ", response);
        }
        
      });
    }, 500);
    //Orientation.lockToLandscapeLeft();
    //Orientation.addOrientationListener(this._orientationDidChange);
    //Orientation.lockToLandscapeLeft();

    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    LoginFunctions.LoginInformation(val => {
      //console.log("dari login ", val);
      if (val) {
        Actions.pop();
        Actions.HomePage({
          userInfo: val,
          languageIndex: this.state.languageIndex,
          colorIndex: this.state.colorIndex
        });
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
        Actions.HomePage({
          userInfo: response.data,
          languageIndex: this.state.languageIndex,
          colorIndex: this.state.colorIndex
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
      <View style={{ width: "100%", flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 50,
              marginBottom: 20
            }}
          >
            {/* <Image
            style={{
              width: 90,
              height: 90,
              overflow: "hidden",
              borderRadius: 10
            }}
            source={require("../../Images/IconBeet.png")}
          /> */}
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 22,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }
                ]}
              >
                Email/Store ID
              </Text>
            </View>
            <View>
              <FloatingTextInput
                color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                focusColor={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                type="text"
                refx={q => (this._emailText = q)}
                onSubmitEditing={() => this._staffText.focus()}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                keyboardType="email-address"
                //keyboardType={'phone-pad'}
                returnKeyType="next"
                label={""}
              />
            </View>

            <View style={{ marginTop: 40 }}>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 22,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }
                ]}
              >
                Staff ID
              </Text>
            </View>
            <View>
              <FloatingTextInput
                color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                focusColor={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                type="text"
                refx={q => (this._staffText = q)}
                onSubmitEditing={() => this._passwordText.focus()}
                onChangeText={text => this.setState({ staffId: text })}
                value={this.state.staffId}
                //keyboardType="email-address"
                //keyboardType={'phone-pad'}
                returnKeyType="next"
                label={""}
              />
            </View>

            <View style={{ marginTop: 40 }}>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 22,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }
                ]}
              >
                Password
              </Text>
            </View>
            <View>
              <FloatingTextInput
                color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                focusColor={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                type="password"
                refx={q => (this._passwordText = q)}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  //this._phone.focus()
                }}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                keyboardType="default"
                returnKeyType="go"
                label={""}
              />
            </View>

            <View
              style={{
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Checkbox
                color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                checked={this.state.rememberMe}
                action={() => {
                  this.setState({ rememberMe: !this.state.rememberMe });
                }}
              />
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    marginLeft: 10,
                    fontSize: 18
                  }
                ]}
              >
                {_remember_me[this.state.languageIndex]}
              </Text>
            </View>

            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Button
                  onPress={() => {
                    //Actions.Register();
                    //console.log('Login');
                    this.loginHandler();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(122, 185, 60,0.80)",
                      borderRadius: 20,
                      borderWidth: 0,
                      borderColor: WHITE,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 1
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        { color: WHITE, fontSize: 22 }
                      ]}
                    >
                      Log In
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    fontSize: 18,
                    textAlign: "center"
                  }
                ]}
              >
                {_new_to_beetpos[this.state.languageIndex]}{" "}
              </Text>
              <Button
                onPress={() => {
                  Actions.Registration({
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    { color: BLUE_700, fontSize: 18, textAlign: "center" }
                  ]}
                >
                  {_sign_up_now[this.state.languageIndex]}
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
    //console.log("LOGIN COLOR INDEX ==> ", this.props.colorIndex);
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
        }}
      >
        <StatusBar
          barStyle={"light-content"}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column"
            // marginLeft: 40,
            // marginTop: 20,
            // marginRight: 40,
            // marginBottom: 20,
            // width: width - 80,
            // height: height,
          }}
        >
          {/* <ScrollView
              style={{
                paddingLeft: 0,
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0
                //width: width,
                //height: height
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            > */}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                width: "57%"
                //marginRight: '2%',
              }}
            >
              {this.contentLeftSide(width, height)}
            </View>
            <View style={{ paddingLeft: "2%", width: "42%" }}>
              {this.contentRightSide()}
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    );
  }
}
