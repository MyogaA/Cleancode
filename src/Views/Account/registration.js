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
  _register_to2
} from "../../Libraries/DictionaryLogin";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      login: false,
      email: "",
      staffId: "",
      password: "",
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
      otp5: ""
    };
  }

  componentDidMount() {
    //Orientation.lockToLandscapeLeft();

    // Orientation.addOrientationListener(this._orientationDidChange);
    // Orientation.lockToLandscapeLeft();
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

  toggleOTP(val) {
    this.setState({
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
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
      <View style={{ width: "100%", height: height, flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
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
          <View
            style={{
              //flex: 1,
              //marginTop: 30,
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={[
                MainStyle.dmSans,
                {
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  fontSize: 44,
                  textAlign: "center"
                }
              ]}
            >
              {_register_to[this.state.languageIndex]}{" "}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                { color: "#7AB93C", fontSize: 44, textAlign: "center" }
              ]}
            >
              BeetPOS
            </Text>
          </View>

          <View
            style={{
              //flex: 1,
              marginTop: 10,
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={[
                MainStyle.dmSans,
                {
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  fontSize: 14,
                  textAlign: "center"
                }
              ]}
            >
              {_register_to2[this.state.languageIndex]}
            </Text>
          </View>

          <View style={{ flex: 1, flexDirection: "column", marginTop: 40 }}>
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
                {_name[this.state.languageIndex]}
              </Text>
            </View>
            <View>
              <FloatingTextInput
                color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                focusColor={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                type="text"
                refx={q => (this._nameText = q)}
                onSubmitEditing={() => this._emailText.focus()}
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
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
                Email
              </Text>
            </View>
            <View>
              <FloatingTextInput
                color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                focusColor={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                type="text"
                refx={q => (this._emailText = q)}
                onSubmitEditing={() => this._phoneText.focus()}
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
                Phone Number
              </Text>
            </View>
            <View>
              <FloatingTextInput
                color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                focusColor={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                type="text"
                refx={q => (this._phoneText = q)}
                onSubmitEditing={() => this._passwordText.focus()}
                onChangeText={text => this.setState({ phone: text })}
                value={this.state.phone}
                //keyboardType="email-address"
                keyboardType={"phone-pad"}
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
                  //this.setState({showOTP: false, showInfo: true});
                  //this._phone.focus()
                }}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                keyboardType="default"
                returnKeyType="submit"
                label={""}
              />
            </View>

            <View
              style={{
                marginTop: 35,
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
                    //this.loginHandler();
                    this.toggleOTP(true);
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
                        { color: WHITE, fontSize: 22, textAlign: "center" }
                      ]}
                    >
                      {_daftar_gratis[this.state.languageIndex]}
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
                flexDirection: "row"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    fontSize: 18
                  }
                ]}
              >
                {_sudah[this.state.languageIndex]}{" "}
              </Text>
              <Button
                onPress={() => {
                  Actions.Login({ colorIndex: this.state.colorIndex });
                  console.log("Register");
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    { color: BLUE_700, fontSize: 18 }
                  ]}
                >
                  {_sign_in_here[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  modalOTP() {
    let phoneNumber = "+6283220966489";
    let { width, height } = Dimensions.get("window");

    let closeText = "Back";
    let submitMessage = `Resend Code (${this.state.timeLeft})`;

    return (
      <View>
        <Modal
          visible={this.state.showOTP}
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
                        ([MainStyle.dmSansBold],
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
                        ([MainStyle.dmSans],
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
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
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
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
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

    let closeText = "Back";
    let submitMessage = `Resend Code (${this.state.timeLeft})`;

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
                        ([MainStyle.dmSansBold],
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
                        ([MainStyle.dmSans],
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
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
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
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
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

    if (this.state.ready) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            width: width
          }}
        >
          <StatusBar
            colorIndex={this.state.colorIndex}
            barStyle={barStyle}
            hidden={false}
            backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "column"
              //height: height,
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
                paddingBottom: 0,
                width: width
                //height: 600,
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            > */}
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View
                style={{
                  width: "57%"
                  //marginRight: '2%',
                }}
              >
                {this.contentLeftSide(width, height)}
              </View>
              <View style={{ marginLeft: "2%", width: "40%" }}>
                {this.contentRightSide()}
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
