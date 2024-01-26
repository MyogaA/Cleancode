/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React, { Component } from "react";
import {
  View,
  Animated,
  Image,
  Easing,
  StatusBar,
  Text,
  Dimensions
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
  RED_900,
  RED_500,
  WHITE,
  BLUE_400,
  SEA_BLUE_500,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
  BLACK
} from "../../Libraries/Colors";

import DeviceInfo from "react-native-device-info";
//DeviceInfo.isTablet()
import LoginFunctions from "../../Libraries/LoginFunctions";
import ColorFunctions from "../../Libraries/ColorFunctions";
import Orientation from "react-native-orientation-locker";
import PrinterFunctions from "../../Libraries/PrinterFunctions";
import { beetpos_version_name } from "../../Constants";
import AutoPrintFunctions from "../../Libraries/AutoPrintFunctions";
//const version = require('../../version.json').version;
let animationTimeout;
let timer = 3000;

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      login: false,
      userInfo: null,
      colorIndex: 0,
      languageIndex: 1,
      backToSetting: false,
      findPrinterReady: false,
      connectedPrinter: false,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    };
  }

  componentDidMount() {
    //console.log("SplashScreen componentDidMount");
    this.getColorIndex();
    this.getUserLogin();
    this.settingPrinter();
    const { width, height } = this.state;
    //console.log("width ==> ", this.state.width);
    //console.log("height ==> ", this.state.height);

    //console.log("is Tablet? ==> ", DeviceInfo.isTablet());
    if (DeviceInfo.isTablet()) {
      Orientation.lockToLandscapeRight(); //dimatiin dulu tablet modenya
      // Orientation.lockToLandscapeLeft();
    } else {
      //Orientation.lockToLandscapeRight();
      //Orientation.lockToLandscapeRight();
    }

    setTimeout(() => {
      //Actions.jump('login');
      //this.goToPage('main');
      this.connectPrinter();
      if (this.state.backToSetting) {
        if (DeviceInfo.isTablet()) {
          // Actions.Setting({
          //   userInfo: this.state.userInfo,
          //   colorIndex: this.state.colorIndex,
          //   languageIndex: this.state.languageIndex
          // });
          // Actions.MobileSetting({
          //   userInfo: this.state.userInfo,
          //   colorIndex: this.state.colorIndex,
          //   languageIndex: this.state.languageIndex
          // });
          
          Actions.MobileLogin({
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex
          });
        } else {
          // Actions.MobileSetting({
          //   userInfo: this.state.userInfo,
          //   colorIndex: this.state.colorIndex,
          //   languageIndex: this.state.languageIndex
          // });
          Actions.MobileLoginOld({
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex
          });
        }
      } else {
        if (DeviceInfo.isTablet()) {
          // Actions.Login({
          //   userInfo: this.state.userInfo,
          //   colorIndex: this.state.colorIndex,
          //   languageIndex: this.state.languageIndex
          // });
          Actions.MobileLogin({
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex
          });
        } else {
          console.log("Ke Login Old")
          Actions.MobileLoginOld({
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex
          });
        }
      }
    }, 2000);

    // nas.getItemByKey('@global:user', e => {
    //   if (e) {
    //     let dataUser = JSON.parse(e);
    //     console.log('DATA USER ==> ', dataUser);
    //     this.animate();
    //     this.goToPage('main');
    //   } else {
    //     this.setState({login: true});
    //     this.animate();
    //     this.goToPage('login');
    //   }
    // });

    // setTimeout(() => {
    //     Actions.jump('login');
    //     }, timer);
  }

  settingPrinter(){
    DeviceInfo.getDeviceName().then((deviceName) => {
      // iOS: "Becca's iPhone 6"
      // Android: ?
      // Windows: ?
      if (deviceName) {
        this.setState({ device_name: deviceName });
        if (deviceName === "rk3566_r") {
          
          AutoPrintFunctions.InitializePrint(v => {
            console.log(v);
            if (v)
            {
              AutoPrintFunctions.FindPrinter(x => {
                console.log("Get Printer===> ", x);
                if (x)
                {
                  this.setState({findPrinterReady: true});
                }
              });
            }
          });

        }
      }
    });
  }

  connectPrinter()
  {
    if (this.state.findPrinterReady)
    {
      AutoPrintFunctions.ConnectPrinter(x => {
        console.log("connect Printer===> ", x);
        if (x)
        {
          this.setState({connectedPrinter: true});
        }
      });
    }
  }

  getColorIndex() {

    //RoboPark Override
    // ColorFunctions.GetColor(val => {
    //   if (val) {
    //     this.setState({ colorIndex: val });
    //   }
    // });
    ColorFunctions.Change(0, res => {});

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      } else {
        this.setState({ languageIndex: 1 });
      }
    });

    ColorFunctions.BackToSetting(val => {
      if (val) {
        ColorFunctions.DeleteBackToSetting(v => {});
        this.setState({ backToSetting: val });
      }
    });
  }

  getUserLogin() {
    LoginFunctions.LoginInformation(val => {
      if (val) {
        let temp_userInfo = val;


        LoginFunctions.AuthToken(val1 => {
          temp_userInfo.auth = val1;
          temp_userInfo.token = val1;
          console.log("temp_userInfo ===> ", temp_userInfo);
          this.setState({ userInfo: temp_userInfo });
          //console.log("auth token ==> ", val);
        });



        LoginFunctions.GetListMultiUser(result => {
          if (result) {
            console.log("GET LIST MULTI USER ===> ", result);
            //LoginFunctions.SaveListMultiUser(temp_userInfo, x => {});

            //do nothing
          } else {
            //do something
            LoginFunctions.SaveListMultiUser(temp_userInfo, x => {});
          }
        });
      }
    });
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.animate());
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //     console.log('SplashScreen componentDidUpdate');
  //     let nas = new NewAsyncStorage;

  //     nas.getItemByKey('@global:user',(e)=>{
  //         if (e)
  //         {
  //         let dataUser = JSON.parse(e);
  //         console.log('DATA USER ==> ', dataUser);
  //         this.goToPage('main');
  //         }
  //         else
  //         {
  //         this.setState({login: true});
  //         this.goToPage('login');
  //         }
  //     });
  // }

  goToPage(page) {
    setTimeout(() => {
      //Actions.jump(page, {test: 'sending a props'});
      Actions.Home({ test: "sending a props" });
    }, timer);
  }

  goHome() {
    Actions.pop();
    this.goToPage("main");
  }

  render() {
    let { login } = this.state;

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: WHITE,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        {/* <Image source={{ uri: "http://icons.iconarchive.com/icons/icons8/ios7/512/Network-Android-Os-Copyrighted-icon.png" }} style={{ width: 150, height: 200 }} resizeMode={'contain'} /> */}

        {/* <Text h4 style={{ color: WHITE }}>Aplikasi Inventory</Text>
                    <Text bold style={{ color: WHITE }}>Inventory</Text> */}
        <View
          style={{
            height: 275,
            width: "80%",
            //backgroundColor: "#BCA",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{ height: 275, width: "80%" }}
            // source={require("../../Images/BeetLogo.png")}
            source={require("../../Images/new_logo_2.png")}
            resizeMode={"contain"}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0
          }}
        >
          <Text small style={{ color: BLACK }}>
            {beetpos_version_name}
          </Text>
        </View>
      </View>
    );
  }
}
