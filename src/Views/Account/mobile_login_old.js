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
  Image,
  BackHandler,
  Animated,
  Linking
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Dropdown, { _pilih } from "../../Components/MobileDropDownLogin";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
// import Image from "../../Components/Image";
import DeviceInfo from "react-native-device-info";
//DeviceInfo.isTablet()

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
import Loading from "../../Components/MobileLoading";

import {
  _remember_me,
  _new_to_beetpos,
  _sign_up_now,
  _masuk_1,
  _masuk_btn,
  _sign_up_now_2,
  _register,
  _lupa_password,
  _pilih_bahasa,
  _connection_down,
  _email_business_error,
  _staff_not_found,
  _login_failed,
  _email_password_format,
  _email_business_help,
  _email_business,
  _guide
} from "../../Libraries/DictionaryLogin";
import AntDesign from "react-native-vector-icons/AntDesign";

import NewAsyncStorage from "../../Libraries/AsyncStorage";
import { REGISTER_URI, FORGOT_PASSWORD_URI } from "../../Constants";
import {
  _ok_alert,
  _staff_id,
  _tidak_aktif
} from "../../Libraries/DictionarySetting";
import CustomAlert from "../../Components/CustomAlert";
export default class MobileLoginOld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExit: false,
      exitCounter: 1,
      showAlert: false,
      alertMessage: [],
      initial: false,
      login: false,
      loading: true,

      // email: "kevin@kevin.com",
      // staffId: "adila",
      showPassword: false,
      // password: "Staff123",
      email: "",
      staffId: "",
      password: "",
      //password: "Waiter123",
      // email: "kaixin@gmail.com",
      // staffId: "kaixin",
      // password: "Kaixin123",
      tablet: DeviceInfo.isTablet(),
      rememberMe: false,
      ready: true,
      device_info: null,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 1,
      userInfo: null,
      logout: this.props.logout ? this.props.logout : false,
      dataLanguage: [
        {
          id: 0,
          name: "Indonesia"
        },
        {
          id: 1,
          name: "English"
        },
        {
          id: 2,
          name: "简体中文 (Chinese Simplified)"
        },
        {
          id: 3,
          name: "中國傳統的 (Chinese Traditional)"
        }
      ]
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);


    //Orientation.lockToLandscapeLeft();
    //Orientation.addOrientationListener(this._orientationDidChange);
    //Orientation.lockToLandscapeLeft();

    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    // console.log("this.state.logout ", this.state.logout);
    // console.log("this.props.logout ", this.props.logout);

    setTimeout(() => {
      LoginFunctions.GetDeviceInfo(response => {
        if (response)
        {
        console.log("device_info ====> ", response)
        this.setState({ device_info: response });
        }
        //console.log("device_info ==> ", response);
      });

      this.setState({ loading: true });
      LoginFunctions.LoginInformation(val => {
        console.log("dari login ", val);
        // this.setState({ loading: false });

        if (val) {
          //console.log("dari login relogin ===> ", val);

          Actions.pop();
          Actions.pop();
          this.setState({ loading: false });
          if (this.state.tablet)
          {
            Actions.MobileHomeTablet({
              // auth: val,
              auth: val.auth,
              userInfo: val,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }
          else
          {
            Actions.MobileMainMenu({
              auth: val.auth,
              userInfo: val,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }

        
        } else {
          this.setState({ loading: false });
        }
      });
    }, 500);

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      } else {
        this.setState({ languageIndex: 1 });
      }
    });

    LoginFunctions.GetRememberMe(val => {
      //console.log("remember_me ==> ", val);
      if (val) {
        this.setState({ email: val.email, staffId: val.staff_id });
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

  onBackPress = () => {
    if (this.state.exitCounter > 0) {
      this.setState({
        exitCounter: this.state.exitCounter - 1,
        showExit: true
      });
      setTimeout(() => {
        this.setState({ showExit: false });
      }, 1000);
    } else {
      BackHandler.exitApp();
    }
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
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
    this.setState({ loading: true });

    let device_id = this.state.device_info
      ? this.state.device_info.userId
      : null;

    let data = {
      email: this.state.email,
      staff_id: this.state.staffId,
      password: this.state.password,
      device_id: device_id
    };

    let data_remember = {
      email: this.state.email,
      staff_id: this.state.staffId
    };

    if (this.state.rememberMe) {
      LoginFunctions.SaveRememberMe(data_remember, response => {});
    }

    //console.log('loginHandler information ==> ', information);
    //console.log('loginHandler action ==> ', action);
    LoginFunctions.LoginFunction_BE(data, response => {
      console.log("response Login ==> ", response);
      if (response) {
        if (response.statusCode === 200) {
          console.log("Login Response ==> ", response);
          //console.log("Login Response ==> ", response.data);
          const data_user = response.data.user;
          const token = response.data.token;
          let userInfo = {
            id: data_user.user_id,
            role_id: data_user.role_id,
            role_name: data_user.role_name,
            is_verified: data_user.is_verified,
            last_login: data_user.last_login,
            is_login: data_user.is_login,
            retail_id: data_user.business_id,
            gerai_id: data_user.outlet_id,
            device_id: data_user.device_id,
            name: data_user.name,
            staff_id: data_user.staff_id,
            refund_auth: 1,
            token: `bearer ${token}`,
            restaurant_name: data_user.outlet_name,
            restaurant_address: data_user.outlet_address,
            business_name: data_user.business_name,
            business_category: data_user.business_category,
            business_type: data_user.business_type,
            privileges: data_user.privileges,
            email: data_user.business_email,
            gerai_name: data_user.outlet_name,
            description: data_user.outlet_address,
            auth: `bearer ${token}`
          };

          this.setState({ loading: false });

          Actions.pop();
          Actions.pop();
          
          if (this.state.tablet)
          {
            Actions.MobileHomeTablet({
              auth: `bearer ${token}`,
              userInfo: userInfo,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }
          else
          {
            Actions.MobileMainMenu({
              auth: `bearer ${token}`,
              userInfo: userInfo,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }


          //Actions.Home({userInfo: information});
        } else {
          //console.log("Login Failed");
          this.setState({ loading: false });
          if (response.message === "Cannot read property 'Business' of null") {
            alert(_email_business_error[this.state.languageIndex]);
          } else if (response.message === "Cannot read property 'User'") {
            alert(_staff_not_found[this.state.languageIndex]);
          } else if (
            response.message === "email/staff_id and/or password is wrong"
          ) {
            alert(_login_failed[this.state.languageIndex]);
          } else if (
            response.message.includes(
              "Password should be combination of one uppercase"
            )
          ) {
            alert(_email_password_format[this.state.languageIndex]);
          } else {
            alert(_login_failed[this.state.languageIndex]);
            //alert(response.message);
          }
        }
      } else {
        this.setState({ loading: false });
        alert(_connection_down[this.state.languageIndex]);
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
            <View
              style={{
                marginTop: 15,
                alignSelf: "center",
                width: this.state.tablet ? "100%" : "100%"
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
                Login
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 15,
                    color: BLACK
                  }
                ]}
              >
                {_masuk_1[this.state.languageIndex]}
              </Text>
            </View>

            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "space-between",
                width: this.state.tablet ? "100%" : "100%",
                display: "none"
              }}
            >
              <View style="width: 45%">
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 13,
                      color: BLACK
                    }
                  ]}
                >
                  {_pilih_bahasa[this.state.languageIndex]}
                </Text>
              </View>
              <View style="width: 45%">
                <Dropdown
                  style={{
                    marginLeft: 0,
                    backgroundColor: "rgba(246, 246, 246, 0.95)",
                    borderRadius: 10,
                    padding: 10,
                    flex: 1
                    //padding: 10
                    // paddingRight:100
                  }}
                  selectWidth={"45%"}
                  size={12}
                  color={BLACK}
                  text={_pilih_bahasa[this.state.languageIndex]}
                  languageIndex={this.state.languageIndex}
                  selectedValue={String(this.state.languageIndex)}
                  optionLists={this.state.dataLanguage.map((v, k) => {
                    return {
                      label: v.name,
                      value: String(v.id)
                    };
                  })}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log("Lang Change Login ==> ");
                    //alert (itemValue)
                    this.setState({
                      languageIndex: itemValue
                      // selectedUserData: this.state.listUser[itemIndex]
                    });
                    PrinterFunctions.SaveLanguage(itemValue, val => {
                      //alert("Sukses Set Footer Printer");
                    });

                    //this.BEAttendanceInformation(itemValue);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                width: this.state.tablet ? "100%" : "100%",
                alignSelf: "center"
              }}
            >
              <TextInput
                style={{
                  // backgroundColor: "rgba(246, 246, 246, 0.95)",
                  backgroundColor:WHITE,
                  borderBottomColor: "#C4C4C4",
                  borderBottomWidth: this.state.email !== "" ? 1.5 : 1.0,
                  color: BLACK,
                  borderRadius: 5,
                  alignSelf: "center",
                  width: this.state.tablet ? "100%" : "100%",
                  height: 48,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                keyboardType="email-address"
                ref={q => {
                  this._emailText = q;
                }}
                //autoFocus={true}
                // onSubmitEditing={() => this._staffText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                placeholder={_email_business[this.state.languageIndex]}
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
              <Button
                style={{ position: "absolute", right: 0, top: 0, padding: 10 }}
                onPress={() => {
                  let message = [
                    _email_business_help[this.state.languageIndex]
                  ];
                  this.setState({ alertMessage: message, showAlert: true });
                }}
              >
                <AntDesign name={"questioncircle"} size={25} />
              </Button>
            </View>

            <View style={{ marginTop: 15 }}>
              {/* <FloatingTextInput
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
              /> */}
              <TextInput
                style={{
                  // backgroundColor: "rgba(246, 246, 246, 0.95)",
                  backgroundColor:WHITE,
                  borderBottomColor: "#C4C4C4",
                  borderBottomWidth: this.state.staffId !== "" ? 1.5 : 1.0,
                  color: BLACK,
                  borderRadius: 5,
                  alignSelf: "center",
                  width: this.state.tablet ? "100%" : "100%",
                  height: 48,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular"
                }}
                //keyboardType="email-address"
                ref={q => {
                  this._staffText = q;
                }}
                //autoFocus={true}
                //onSubmitEditing={() => this._passwordText.focus()}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ staffId: text })}
                value={this.state.staffId}
                placeholder={_staff_id[this.state.languageIndex]}
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View
              style={{
                marginTop: 15,
                width: this.state.tablet ? "100%" : "100%",
                alignSelf: "center"
              }}
            >
              <TextInput
                style={{
                  // backgroundColor: "rgba(246, 246, 246, 0.95)",
                  backgroundColor:WHITE,
                  borderBottomColor: "#C4C4C4",
                  borderBottomWidth: this.state.password !== "" ? 1.5 : 1.0,
                  
                  color: BLACK,
                  borderRadius: 5,
                  alignSelf: "center",
                  width: this.state.tablet ? "100%" : "100%",
                  height: 48,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular",
                  display: this.state.showPassword ? "none" : "flex"
                }}
                secureTextEntry={true}
                keyboardType="password"
                ref={q => {
                  this._passwordText1 = q;
                }}
                onSubmitEditing={() => {
                  //Keyboard.dismiss();
                  //this._phone.focus()
                  this.loginHandler();
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />

              <TextInput
                style={{
                  // backgroundColor: "rgba(246, 246, 246, 0.95)",
                  backgroundColor:WHITE,
                  borderBottomColor: "#C4C4C4",
                  borderBottomWidth: this.state.staffId !== "" ? 1.5 : 1.0,
                  color: BLACK,
                  borderRadius: 5,
                  alignSelf: "center",
                  width: this.state.tablet ? "100%" : "100%",
                  height: 48,
                  fontSize: 15,
                  fontFamily: "Roboto-Regular",
                  display: this.state.showPassword ? "flex" : "none"
                }}
                //secureTextEntry={true}
                keyboardType="password"
                ref={q => {
                  this._passwordText = q;
                }}
                onSubmitEditing={() => {
                  //Keyboard.dismiss();
                  //this._phone.focus()
                  this.loginHandler();
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />

              <Button
                onPress={() => {
                  this.setState({ showPassword: !this.state.showPassword });
                }}
                style={{
                  padding: 10,
                  position: "absolute",
                  elevation: 1,
                  right: 5
                }}
              >
                <Entypo
                  name={!this.state.showPassword ? "eye" : "eye-with-line"}
                  style={{
                    fontSize: 25,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
            </View>

            <View
              style={{
                marginTop: 5,
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexDirection: "row",
                alignSelf: "center",
                width: this.state.tablet ? "100%" : "100%"
              }}
            >
              <Button
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({ rememberMe: !this.state.rememberMe });
                }}
              >
                <Checkbox
                  size={32}
                  checked={this.state.rememberMe}
                  color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                />
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: BLACK
                    }
                  ]}
                >
                  {_remember_me[this.state.languageIndex]}
                </Text>
              </Button>

              <Button
                style={{ padding: 5, display: "none" }}
                onPress={() => {
                  Actions.MobileForgotPassword({
                    colorIndex: this.state.colorIndex,
                    languageIndex: this.state.languageIndex
                  });
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      paddingTop: 10,
                      paddingBottom: 10,
                      fontSize: 12,
                      color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    }
                  ]}
                >
                  {_lupa_password[this.state.languageIndex]}?
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
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
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1 }}>
              <Button
                style={{
                  alignSelf: "center",
                  width: this.state.tablet ? "95%" : "100%"
                }}
                onPress={() => {
                  //Actions.Register();
                  //console.log('Login');
                  this.loginHandler();
                }}
              >
                <View
                  style={{
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    width: "100%",
                    marginTop: 15,
                    marginBottom: 15,
                    borderRadius: 5,
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
          <View
            style={{
              flex: 1,
              marginTop: 0,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
              display: "none"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: "#555",
                  fontSize: 15,
                  textAlign: "center"
                }
              ]}
            >
              {_sign_up_now_2[this.state.languageIndex]}{" "}
            </Text>
            <Button
              onPress={() => {
                // Actions.MobileRegistration({
                //   colorIndex: this.state.colorIndex,
                //   languageIndex: this.state.languageIndex
                // });https://backoffice.beetpos.com/auth/registration
                Linking.openURL(REGISTER_URI);
                console.log("Register");
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
                {_register[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  renderExitMessage() {
    return (
      <Animated.View
        style={{
          backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
          elevation: 2,
          position: "absolute",
          borderRadius: 15,
          bottom: 15,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          alignSelf: "center"
        }}
      >
        <Text
          style={[
            MainStyle.robotoNormal,
            {
              fontSize: 12,
              color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
            }
          ]}
        >
          Press back again to exit the app
        </Text>
      </Animated.View>
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
        {this.state.showExit ? this.renderExitMessage() : <View />}
        {this.state.showAlert ? (
          <CustomAlert
            message={this.state.alertMessage}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            title={_guide[this.state.languageIndex]}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}

        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          {this.state.loading ? (
            <Loading
              not_transparent={true}
              colorIndex={this.state.colorIndex}
            />
          ) : (
            <View />
          )}
          <View style={{flex: 5}}>
            <View style={{ flex: 0.25, width: "100%" }}>
              {/* <Image
                style={{
                  height: "100%"
                }}
                source={require("../../Images/LoginLogo.png")}
              /> */}

              <View style={{ flex: 1, margin: 0, width: "100%" }}>
                {/* <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "cover",
                    position: "absolute"
                  }}
                  source={require("../../Images/new_bg.jpg")}
                /> */}
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "center"
                  }}
                  source={require("../../Images/logobeetposupdate.png")}
                />
              </View>
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
                  {/* {this.state.languageIndex === 0
                    ? "Kelola bisnismu bersama Beetpos"
                    : "Handle your business with Beetpos"} */}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 0.75,
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              <View
                style={{
                  width: "100%"
                  //display: this.state.loading ? "none" : "flex",
                }}
              >
                {this.contentRightSide()}
              </View>
            </View>
          </View>
          {/* <View style={{flex: 5, backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}}>

          </View>
           */}
          {/* </ScrollView> */}
        </View>
      </View>
    );
  }
}
