/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
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
  Modal,
  TouchableOpacity
} from "react-native";

import Header from "../../Components/Header";
import Button from "../../Components/Button";
import Image from "../../Components/Image";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from "../../Components/MobileLoadingRegister";

import FloatingTextInput from "../../Components/FloatingTextInput";
import Checkbox from "../../Components/Checkbox";
import OTPTextInput from "../../Components/OTPTextInput";

// import Orientation from "react-native-orientation-locker";

import {
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  WHITE,
  BLUE_500,
  BLUE_700,
  BLACK,
  MAIN_TEXT_COLOR_SELECT
} from "../../Libraries/Colors";
import MainStyle from "../../Styles";
import { Actions } from "react-native-router-flux";
import LoginFunctions from "../../Libraries/LoginFunctions";
import Banner from "./banner";
import ColorFunctions from "../../Libraries/ColorFunctions";

import PrinterFunctions from "../../Libraries/PrinterFunctions";
import {
  _sign_in_here,
  _sudah,
  _name,
  _daftar_gratis,
  _register_to,
  _register_to2,
  _register,
  _sign_up_now_2,
  _masuk_btn,
  _lupa_password,
  _masuk_1,
  _register_1,
  _login,
  _page2_1,
  _page2_2
} from "../../Libraries/DictionaryLogin";
import { BackHandler } from "react-native";
import { TextInput } from "react-native";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingOTP: false,
      initial: false,
      login: false,
      name: "",
      phone: "",
      email: "",
      staffId: "",
      password: "",
      password_confirm: "",
      pin: "",
      pin_confirm: "",
      rememberMe: false,
      ready: true,
      showOTP: false,
      showInfo: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      timeLeft: 60,
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
      page: 1
    };
  }

  componentDidMount() {
    //Orientation.lockToLandscapeLeft();

    // Orientation.addOrientationListener(this._orientationDidChange);
    // Orientation.lockToLandscapeLeft();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });
  }

  onBackPress = () => {
    //Actions.pop();
    //this.props.onBackPress();

    if (this.state.page === 1) {
      Actions.pop();
    } else {
      this.setState({ page: 1 });
    }
    return true;
  };

  _orientationDidChange = orientation => {
    // if (orientation === "LANDSCAPE-LEFT") {
    //   this.setState({ ready: true });
    // } else {
    //   // do something with portrait layout
    // }
  };

  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      ColorFunctions.GetColor(val => {
        if (val !== 0 && this.state.colorIndex === 0) {
          this.setState({ colorIndex: val });
        }
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  toggleOTP(val) {
    this.setState({
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
      showOTP: val
    });
  }

  loginHandler() {
    let information = {
      name: "Dicky Yosep",
      email: this.state.email,
      staffId: this.state.staffId,
      password: this.state.password,
      address: "Sunter Agung Jakarta Utara",
      storeName: "Kopi Kiwi",
      storeDescription: "Outlet 1 Jakarta"
    };
    //console.log('loginHandler information ==> ', information);
    //console.log('loginHandler action ==> ', action);
    LoginFunctions.Login(information, response => {
      if (response) {
        Actions.pop();
        Actions.UserInfo({ userInfo: information });
        //Actions.Home({userInfo: information});
      } else {
        console.log("Login Failed");
      }
    });
    // if (typeof action === 'function') {
    //   //action(information);

    // }
  }

  contentLeftSide(width, height) {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Banner colorIndex={this.state.colorIndex} />
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
        <View style={{ marginTop: 10, marginRight: 30, marginLeft: 30 }}>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 20,
                color: BLACK
              }
            ]}
          >
            {_register[this.state.languageIndex]}
          </Text>
        </View>

        <View style={{ marginTop: 5, marginRight: 30, marginLeft: 30 }}>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: BLACK
              }
            ]}
          >
            {_register_1[this.state.languageIndex]}
          </Text>
        </View>
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
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="text"
                type="text"
                ref={q => {
                  this._nameText = q;
                }}
                onSubmitEditing={() => this._staffText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
                placeholder="Name"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="text"
                type="text"
                ref={q => {
                  this._staffText = q;
                }}
                onSubmitEditing={() => this._emailText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ staffId: text })}
                value={this.state.staffId}
                placeholder="Staff Id"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
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
                onSubmitEditing={() => this._phoneText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                placeholder="Email"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="text"
                type="text"
                ref={q => {
                  this._phoneText = q;
                }}
                onSubmitEditing={() => this._passwordText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ phone: text })}
                value={this.state.phone}
                placeholder="Phone"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            {/* <View style={{ marginTop: 10 }}>

              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                //keyboardType="email-address"
                type="text"
                ref={q => {
                  this._staffText = q;
                }}
                onSubmitEditing={() => this._passwordText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ staffId: text })}
                value={this.state.staffId}
                placeholder="Staff Id"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View> */}

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                secureTextEntry={true}
                keyboardType="password"
                type="password"
                ref={q => {
                  this._passwordText = q;
                }}
                onSubmitEditing={() => {
                  //Keyboard.dismiss();
                  this._passwordConfirmText.focus();
                  //this.loginHandler();
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                secureTextEntry={true}
                keyboardType="password"
                type="password"
                ref={q => {
                  this._passwordConfirmText = q;
                }}
                onSubmitEditing={() => {
                  //Keyboard.dismiss();
                  //this._phone.focus()
                  this._pinText.focus();
                  //this.loginHandler();
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ password_confirm: text })}
                value={this.state.password_confirm}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                maxLength={6}
                secureTextEntry={true}
                keyboardType="password"
                type="password"
                ref={q => {
                  this._pinText = q;
                }}
                onSubmitEditing={() => {
                  //Keyboard.dismiss();
                  this._pinConfirmText.focus();
                  //this.loginHandler();
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ pin: text })}
                value={this.state.pin}
                placeholder={
                  this.state.languageIndex === 0
                    ? "PIN 6 Angka"
                    : "6 numbers PIN"
                }
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                maxLength={6}
                secureTextEntry={true}
                keyboardType="password"
                type="password"
                ref={q => {
                  this._pinConfirmText = q;
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  //this._pinConfirmText.focus();
                  //this.loginHandler();
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ pin_confirm: text })}
                value={this.state.pin_confirm}
                placeholder={
                  this.state.languageIndex === 0
                    ? "Konfirmasi PIN 6 Angka"
                    : "6 numbers PIN Confirmation"
                }
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            marginTop: 5,
            marginRight: 15,
            marginLeft: 15,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => {
                //Actions.Register();
                //console.log('Login');
                this.setState({ loadingOTP: true });
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
                  justifyContent: "center",
                  alignItems: "center",
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
                  {_masuk_btn[this.state.languageIndex]}
                </Text>
              </View>
            </Button>
            <View
              style={{
                marginLeft: 30,
                marginRight: 30,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row"
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color: "#B8BBC6",
                    fontSize: 15,
                    textAlign: "center"
                  }
                ]}
              >
                {_sudah[this.state.languageIndex]}{" "}
              </Text>
              <Button
                onPress={() => {
                  // Actions.MobileRegistration({
                  //   colorIndex: this.state.colorIndex,
                  //   languageIndex: this.state.languageIndex
                  // });
                  // console.log("Register");
                  Actions.pop();
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                      fontSize: 15,
                      textAlign: "center"
                    }
                  ]}
                >
                  {_login[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }

  contentRightSidePage2() {
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
        <View style={{ marginTop: 10, marginRight: 30, marginLeft: 30 }}>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 20,
                color: BLACK
              }
            ]}
          >
            {_page2_1[this.state.languageIndex]}
          </Text>
        </View>

        <View style={{ marginTop: 5, marginRight: 30, marginLeft: 30 }}>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: BLACK
              }
            ]}
          >
            {_page2_2[this.state.languageIndex]}
          </Text>
        </View>
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
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="text"
                type="text"
                ref={q => {
                  this._categoryText = q;
                }}
                onSubmitEditing={() => this._provinceText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ category: text })}
                value={this.state.category}
                placeholder="Business Category"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,

                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="text"
                type="text"
                ref={q => {
                  this._provinceText = q;
                }}
                onSubmitEditing={() => this._townText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ province: text })}
                value={this.state.province}
                placeholder="Province"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="text"
                type="text"
                ref={q => {
                  this._townText = q;
                }}
                onSubmitEditing={() => this._subDistrictText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ town: text })}
                value={this.state.town}
                placeholder="Town"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="text"
                type="text"
                ref={q => {
                  this._subDistrictText = q;
                }}
                onSubmitEditing={() => this._locationText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ subDistrict: text })}
                value={this.state.subDistrict}
                placeholder="Sub District"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  color: BLACK,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="text"
                type="text"
                ref={q => {
                  this._locationText = q;
                }}
                onSubmitEditing={() => {}}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ location: text })}
                value={this.state.location}
                placeholder="Location"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            marginTop: 5,
            marginRight: 15,
            marginLeft: 15,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => {
                //Actions.Register();
                //console.log('Login');
                this.setState({ loadingOTP: true });
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
                  justifyContent: "center",
                  alignItems: "center",
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
                  {_masuk_btn[this.state.languageIndex]}
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  modalOTP() {
    //let phoneNumber = "+6283220966489";
    let phoneNumber = "" + this.state.phone;
    let { width, height } = Dimensions.get("window");

    let closeText = this.state.languageIndex === 0 ? "Kembali" : "Back";
    let submitMessage =
      this.state.languageIndex === 0
        ? `Kirim Ulang (${this.state.timeLeft})`
        : `Resend Code (${this.state.timeLeft})`;

    return (
      <View>
        <Modal
          visible={this.state.showOTP}
          //visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.toggleOTP(false);
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              flexDirection: "column",
              //justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "100%",
                height: height * 0.1,
                //maxHeight: height * 0.6,
                backgroundColor: "transparent",
                borderRadius: 10
                //marginTop: height * 0.25,
                //marginBottom: height * 0.25,
              }}
            />
            <View
              style={{
                width: "100%",
                flex: 1,
                //maxHeight: height * 0.6,
                backgroundColor: WHITE,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15

                //marginTop: height * 0.25,
                //marginBottom: height * 0.25,
              }}
            >
              <View style={{ position: "absolute", right: 10, top: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    //this.closeModal(actions);

                    this.toggleOTP(false);
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
                }}
              >
                <View
                  style={{
                    //flex:1,
                    //marginTop: 30,
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
                      width: "100%",
                      justifyContent: "center",
                      //alignItems: "center",
                      marginTop: 0,
                      marginBottom: 5
                    }}
                  >
                    <Text
                      style={
                        ([MainStyle.robotoNormalBold],
                        {
                          fontSize: 20,
                          //alignSelf : "center"
                          textAlign: "left"
                        })
                      }
                    >
                      {this.state.languageIndex === 0
                        ? "Masukan kode verifikasi"
                        : "Enter verification code"}
                    </Text>
                  </View>
                  <View
                    style={{
                      //justifyContent: 'center',
                      //alignItems: 'center',
                      //flex:1,
                      //backgroundColor:'#999',
                      width: "100%",
                      justifyContent: "center",
                      //alignItems: "center",
                      marginTop: 0,
                      marginBottom: 5,
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          fontSize: 12
                          //alignSelf : "center"
                          //textAlign: "center"
                        })
                      }
                    >
                      {this.state.languageIndex === 0
                        ? "Tidak Mendapatkan Kode?"
                        : "Not receiving code?"}
                    </Text>
                    <Button style={{ marginLeft: 10 }} onPress={() => {}}>
                      <Text
                        style={
                          ([MainStyle.robotoNormal],
                          {
                            fontSize: 12,
                            color: MAIN_THEME_COLOR_SELECT(
                              this.props.colorIndex
                            )
                            //alignSelf : "center"
                            //textAlign: "center"
                          })
                        }
                      >
                        {this.state.languageIndex === 0
                          ? "Kirim Ulang"
                          : "Resend Code"}
                      </Text>
                    </Button>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      paddingTop: 25,
                      paddingBottom: 25,

                      //backgroundColor: '#BCA',
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp1 = q)}
                        onSubmitEditing={() => this._otp2.focus()}
                        onChangeText={text => {
                          this.setState({ otp1: text });
                          this._otp2.focus();
                        }}
                        value={this.state.otp1}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp2 = q)}
                        onSubmitEditing={() => this._otp3.focus()}
                        onChangeText={text => {
                          this.setState({ otp2: text });
                          this._otp3.focus();
                        }}
                        value={this.state.otp2}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp3 = q)}
                        onSubmitEditing={() => this._otp4.focus()}
                        onChangeText={text => {
                          this.setState({ otp3: text });
                          this._otp4.focus();
                        }}
                        value={this.state.otp3}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp4 = q)}
                        onSubmitEditing={() => this._otp5.focus()}
                        onChangeText={text => {
                          this.setState({ otp4: text });
                          this._otp5.focus();
                        }}
                        value={this.state.otp4}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp5 = q)}
                        onSubmitEditing={() => this._otp6.focus()}
                        onChangeText={text => {
                          this.setState({ otp5: text });
                          //this._otp6.focus();
                          Keyboard.dismiss();
                          this.toggleOTP(false);
                        }}
                        value={this.state.otp5}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    {/* <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp6 = q)}
                        onSubmitEditing={() => {
                          console.log("submit");
                          this.toggleOTP(false);
                        }}
                        onChangeText={text => {
                          this.setState({ otp6: text });
                          Keyboard.dismiss();
                          this.toggleOTP(false);
                        }}
                        value={this.state.otp6}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View> */}
                  </View>
                </View>
                <View style={{ flexDirection: "row", display: "none" }}>
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
                        this.toggleOTP(false);
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          minWidth: 100,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.state.colorIndex
                          ),
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              fontSize: 12,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              ),
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
                      //backgroundColor: '#ABC'
                    }}
                  >
                    <Button
                      onPress={() => {
                        this.toggleOTP(false);
                        //Actions.Login();
                        //Actions.reset('Login');
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          minWidth: 100,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.state.colorIndex
                          ),
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              fontSize: 12,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              ),
                              marginBottom: 5,
                              marginTop: 5,
                              marginLeft: 10,
                              marginRight: 10,
                              textAlign: "center"
                            }
                          ]}
                        >
                          {submitMessage}
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

  modalInfo() {
    let phoneNumber = "+6283220966489";
    let { width, height } = Dimensions.get("window");

    let closeText = this.state.languageIndex === 0 ? "Kembali" : "Back";
    let submitMessage =
      this.state.languageIndex === 0
        ? `Kirim Ulang (${this.state.timeLeft})`
        : `Resend Code (${this.state.timeLeft})`;

    return (
      <View>
        <Modal
          visible={this.state.showInfo}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.setState({ showInfo: false });
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
                width: width * 0.5,
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
                    //this.closeModal(actions);

                    this.toggleOTP(false);
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
                          fontSize: 24,
                          //alignSelf : "center"
                          textAlign: "center"
                        })
                      }
                    >
                      Enter verification code we just send to
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
                          fontSize: 24,
                          //alignSelf : "center"
                          textAlign: "center"
                        })
                      }
                    >
                      {phoneNumber}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      borderColor: "#C4C4C4",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      width: "60%",
                      paddingTop: 25,
                      paddingBottom: 25,
                      //backgroundColor: '#BCA',
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp1 = q)}
                        onSubmitEditing={() => this._otp2.focus()}
                        onChangeText={text => {
                          this.setState({ otp1: text });
                          this._otp2.focus();
                        }}
                        value={this.state.otp1}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp2 = q)}
                        onSubmitEditing={() => this._otp3.focus()}
                        onChangeText={text => {
                          this.setState({ otp2: text });
                          this._otp3.focus();
                        }}
                        value={this.state.otp2}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp3 = q)}
                        onSubmitEditing={() => this._otp4.focus()}
                        onChangeText={text => {
                          this.setState({ otp3: text });
                          this._otp4.focus();
                        }}
                        value={this.state.otp3}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp4 = q)}
                        onSubmitEditing={() => this._otp5.focus()}
                        onChangeText={text => {
                          this.setState({ otp4: text });
                          this._otp5.focus();
                        }}
                        value={this.state.otp4}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 10,
                        width: 40,
                        height: 40,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 5,
                        elevation: 1
                      }}
                    >
                      <OTPTextInput
                        color="#000"
                        maxLength={1}
                        type="text"
                        refx={q => (this._otp5 = q)}
                        onSubmitEditing={() => console.log("submit")}
                        onChangeText={text => {
                          this.setState({ otp5: text });
                          Keyboard.dismiss();
                        }}
                        value={this.state.otp5}
                        //keyboardType="email-address"
                        //keyboardType={'phone-pad'}
                        keyboardType={"numeric"}
                        returnKeyType="next"
                        label={""}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
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
                        this.toggleOTP(false);
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          minWidth: 100,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.state.colorIndex
                          ),
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              fontSize: 12,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              ),
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
                      //backgroundColor: '#ABC'
                    }}
                  >
                    <Button
                      onPress={() => {
                        this.toggleOTP(false);
                        //Actions.Login();
                        //Actions.reset('Login');
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          minWidth: 100,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.state.colorIndex
                          ),
                          borderRadius: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              fontSize: 12,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              ),
                              marginBottom: 5,
                              marginTop: 5,
                              marginLeft: 10,
                              marginRight: 10,
                              textAlign: "center"
                            }
                          ]}
                        >
                          {submitMessage}
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

  render() {
    //const {currentTab, changeTabBar} = this.props;
    const { loginActivity } = this.props;
    //console.log('login props ==> ', this.props);
    let { width, height } = Dimensions.get("window");

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    let phoneNumber = "+6283220966489";

    let loadingName =
      this.state.languageIndex === 0
        ? "Kami telah mengirimkan kode verifikasi ke nomor"
        : "We have send the verification code to";

    if (this.state.ready) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: WHITE
          }}
        >
          {this.state.loadingOTP ? (
            <Loading
              action={() => {
                this.setState({
                  loadingOTP: false,
                  otp1: "",
                  otp2: "",
                  otp3: "",
                  otp4: "",
                  otp5: "",
                  otp6: "",
                  showOTP: true,
                  page: 2
                });
                this._otp1.focus();
              }}
              loadingName={loadingName}
              loadingDescription={phoneNumber}
            />
          ) : (
            <View />
          )}

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
            <View style={{ flex: 0.1 }}>
              <Image
                style={{
                  height: "100%"
                }}
                source={require("../../Images/LoginLogo.png")}
              />
              {/* <View
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
              </View> */}
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              <View style={{ width: "100%" }}>
                {this.state.page === 1
                  ? this.contentRightSide()
                  : this.contentRightSidePage2()}
              </View>
            </View>
            {/* </ScrollView> */}
          </View>
          {this.modalOTP()}
        </View>
      );
    } else {
      return <View />;
    }
  }
}
