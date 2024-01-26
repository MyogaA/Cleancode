/* eslint-disable quotes */
import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  BackHandler,
  PermissionsAndroid,
  Alert,
  Platform,
  View,
  Dimensions,
} from "react-native";

import Orientation from "react-native-orientation-locker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  scene: {
    backgroundColor: "#F5FCFF",
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  tabBarStyle: {
    backgroundColor: "#eee",
  },
  tabBarSelectedItemStyle: {
    backgroundColor: "#ddd",
  },
});

import {
  Scene,
  Router,
  Actions,
  Reducer,
  StatusBar,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from "react-native-router-flux";

import { MAIN_THEME_COLOR, WHITE } from "./Libraries/Colors";
//import AsyncStorage from '@react-native-community/async-storage';
import NewAsyncStorage from "./Libraries/AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorFunctions from "./Libraries/ColorFunctions";

import Main from "./Main";

import MobileProductKios from "./Views/Kios/mobile_product_kios";


import Camera from "./Views/Camera/";
import Home from "./Views/Home/";
import Absensi from "./Views/Staff/absensi";
import Refund from "./Views/Staff/refund";
import Management from "./Views/Pelanggan/management";
import Setting from "./Views/Setting/setting";
import History from "./Views/Finance/history";
import Rekap from "./Views/Finance/rekap";
import Combine from "./Views/Finance/combine";
import Meja from "./Views/Finance/meja";

import Day1 from "./Views/Learning/day1";
import Bayar from "./Views/Finance/bayar";

import SplashScreen from "./Views/Splash/";
import TabBar from "./Components/TabBar";
import TabBar2 from "./Components/TabBar2";
import TabBar3 from "./Components/TabBar3";

import DrawerContent from "./Drawer";

import UserInfo from "./Views/Account/userinfo";
import UserEdit from "./Views/Account/useredit";

import BookingSummary from "./Views/Booking/summary";
import Booking from "./Views/Booking/booking";

import Notification from "./Views/Account/notification";
import Login from "./Views/Account/login";
import Registration from "./Views/Account/registration";

import MobileLogin from "./Views/Account/mobile_login";
import MobileLoginOld from "./Views/Account/mobile_login_old";

import MobileRegistration from "./Views/Account/mobile_registration";
import MobileForgotPassword from "./Views/Account/mobile_forgot_password";

import MobileMainMenu from "./Views/MainMenu/mobile_main_menu";
import TestingDualScreen from "./Views/MainMenu/testing_dual_screen";
import TestingDualScreenOrder from "./Views/MainMenu/testing_screen_dual_screen_order";
import TestingDualScreenPayment from "./Views/MainMenu/testing_screen_dual_screen_payment";

import TestingPrinterThermal from "./Views/MainMenu/testing_printer_thermal";

import MobileHome from "./Views/Home/mobile_home";
import MobileHomeTablet from "./Views/Home/mobile_home_tablet";

import MobileBayar from "./Views/Payment/mobile_bayar";
import MobileBayarTablet from "./Views/Payment/mobile_bayar_tablet";

import MobileBayarKios from "./Views/Kios/mobile_bayar_kios";
import MobileSplitBill from "./Views/Finance/mobile_split_bill";
import MobileSplitBillProduct from "./Views/Finance/mobile_split_bill_product";

import MobileSetting from "./Views/Setting/mobile_setting";



import MobileSettingTablet from "./Views/Setting/mobile_setting_tablet";
import MobileDemoPrinter from "./Views/Setting/mobile_demo_printer";


import MobileRegisterPayment from "./Views/Setting/mobile_register_payment";

import MobileHistory from "./Views/History/mobile_history";
import MobileHistoryTablet from "./Views/History/mobile_history_tablet";

import MobilePending from "./Views/Finance/mobile_pending";
import MobileOnlineOrder from "./Views/Finance/mobile_online_order";

import MobileAbsensi from "./Views/Staff/mobile_absensi";
import MobileEntrance from "./Views/Staff/mobile_entrance";

import MobileManagement from "./Views/Pelanggan/mobile_management";
import MobileManagementTablet from "./Views/Pelanggan/mobile_management_tablet";

import MobileMeja from "./Views/Finance/mobile_meja";
import MobileMejaTablet from "./Views/Finance/mobile_meja_tablet";


import MobileKitchen from "./Views/Kitchen/mobile_kitchen";

import MobileTokopediaChat from "./Views/Tokopedia/mobile_chat";
import MobileTokopediaOrder from "./Views/Tokopedia/mobile_order";

import MobileCombine from "./Views/Finance/mobile_combine";
import MobileRekap from "./Views/Finance/mobile_rekap";
import MobileRekapTablet from "./Views/Finance/mobile_rekap_tablet";

import MobileProduct from "./Views/Product/mobile_product";
import MobileProductTablet from "./Views/Product/mobile_product_tablet";

import OneSignal from 'react-native-onesignal';
import { OneSignal_App_ID } from "./Constants";
import LoginFunctions from "./Libraries/LoginFunctions";
import PrinterFunctions from "./Libraries/PrinterFunctions";
import { LogBox } from 'react-native';

import MobileGobizTransaction from "./Views/Gobiz/mobile_gobiz_transaction";


LogBox.ignoreLogs(['some warning']);

LogBox.ignoreAllLogs();
const nas = new NewAsyncStorage();

async function permissionCheckList(returnType = "bool") {
  let permissions = {};
  permissions.CAMERA = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA
  );

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Location Access Permission",
      message: "We would like to use your location",
      buttonPositive: "Okay",
    }
  );

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    {
      title: "Location Access Permission",
      message: "We would like to use your location",
      buttonPositive: "Okay",
    }
  );


  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: "bluetooth Access Permission",
      message: "We would like to use your bluetooth",
      buttonPositive: "Okay",
    }
  );

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
    {
      title: "bluetooth Access Permission",
      message: "We would like to use your bluetooth b",
      buttonPositive: "Okay",
    }
  );

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: "bluetooth Access Permission",
      message: "We would like to use your bluetooth scan",
      buttonPositive: "Okay",
    }
  );

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: "WRITE_EXTERNAL_STORAGE",
      message: "We would like to use your storage",
      buttonPositive: "Okay",
    }
  );

  //permissions.ACCESS_COARSE_LOCATION = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
  //permissions.ACCESS_FINE_LOCATION = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  // permissions.CALL_PHONE = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE);
  //permissions.READ_PHONE_STATE = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
  permissions.READ_EXTERNAL_STORAGE = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  );
  permissions.WRITE_EXTERNAL_STORAGE = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  );

  if (returnType === "list") {
    // return array yang belom di izinkan
    let permissionsName = [];
    for (let i in permissions) {
      if (permissions.hasOwnProperty(i) && permissions[i] === false) {
        permissionsName.push(PermissionsAndroid.PERMISSIONS[i]);
      }
    }
    return permissionsName;
  } else {
    for (let i in permissions) {
      if (permissions.hasOwnProperty(i) && permissions[i] === false) {
        return false;
      }
    }
    return true;
  }
}

async function requestPermission() {
  let cekPermission = await permissionCheckList("bool");
  if (cekPermission) {
    return true;
  }

  let permissionNotGrantedLists = await permissionCheckList("list");
  console.log('permissionNotGrantedLists', permissionNotGrantedLists);

  try {
    let granted = await PermissionsAndroid.requestMultiple(
      permissionNotGrantedLists
    );
    let cekPermissionGranted = await permissionCheckList("bool");
    if (cekPermissionGranted) {
      // console.log("You can use the camera");
      return true;
    } else {
      Alert.alert(
        "Info",
        "Mohon setujui akses ke sensor pada device Anda agar Apps dapat berjalan dengan normal",
        [{ text: "OK", onPress: () => BackHandler.exitApp() }],
        { cancelable: false }
      );
      return false;
    }
  } catch (err) {
    console.warn("requestPermission err", err);
    Alert.alert(
      "Info",
      "Gagal mengakses perizinan perangkat",
      [{ text: "OK", onPress: () => BackHandler.exitApp() }],
      { cancelable: false }
    );
    BackHandler.exitApp();
    return false;
  }
}



const onBackPress = () => {
  let route = Actions.state.routes;
  let topSection = route[route.length - 1];
  let section = topSection.routes;

  console.log(
    "route[route.length - 1].routeName ==> ",
    route[route.length - 1].routeName
  );

  switch (route[route.length - 1].routeName) {
    case "login":
      BackHandler.exitApp();
      break;

    default:
      Actions.pop();
      return true;
      break;
  }
};

const _setting = ["Pengaturan", "Settings"];

const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      login: false,
      tabBar: 1,
      loginInformation: null,
      ready: false,
      width: Dimensions.get("window").width,
      colorIndex: 0,
      languageIndex: 0,
      requiresPrivacyConsent: false,
    };
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);

    const example_notif = {
      "actionButtons": undefined, 
      "additionalData": undefined, 
      "androidNotificationId": 627892601, 
      "bigPicture": undefined, "body": 
      "Transaction Content Message1", 
      "collapseId": undefined, 
      "fromProjectNumber": "708128376821", 
      "groupKey": undefined, 
      "groupMessage": undefined, 
      "largeIcon": undefined, 
      "launchURL": undefined, 
      "ledColor": undefined, "lockScreenVisibility": 1, 
      "notificationId": "aeae69b1-809b-4629-b7bf-bbfcdd483001", 
      "priority": 0, 
        "rawPayload": 
          "{\"google.delivered_priority\":\"normal\",\"google.sent_time\":1680575048524,\"google.ttl\":259200,\"google.original_priority\":\"normal\",\"custom\":\"{\\\"i\\\":\\\"aeae69b1-809b-4629-b7bf-bbfcdd483001\\\"}\",\"from\":\"708128376821\",\"alert\":\"Transaction Content Message1\",\"title\":\"Transaction Heading Message1\",\"google.message_id\":\"0:1680575048538326%3e245975f9fd7ecd\",\"google.c.sender.id\":\"708128376821\"}", 
      "smallIcon": undefined, 
      "smallIconAccentColor": undefined, 
      "sound": undefined, 
      "title": "Transaction Heading Message1"
    };

    // alert(notification.title + notification.body);
    alert(notification.body);

  }

  onOpened(openResult) {
    // console.log("Message: ", openResult.notification.payload.body);
    // console.log("Title: ", openResult.notification.payload.title);

    // console.log("Data: ", openResult.notification.payload.additionalData);
    // console.log("isActive: ", openResult.notification.isAppInFocus);
    // console.log("openResult app.js: ", openResult);
    // console.log("Actions.currentScene ==> ", Actions.currentScene);

    const example_notification_data = {
      androidNotificationId: 1870558878,
      displayType: 1,
      isAppInFocus: true,
      payload: {
        body: "Transaction Content Message",
        fromProjectNumber: "708128376821",
        lockScreenVisibility: 1,
        notificationID: "a9be065d-af64-4f0a-9a1b-d4cb1242ae7f",
        priority: 0,
        title: "Transaction Heading Message",
      },
      shown: true,
    };

    const data = openResult.notification.payload.additionalData;
    // console.log("DATA ==> ", data.goToNotif);

    if (
      Actions.currentScene !== "Notification" &&
      Actions.currentScene !== "HomeMenu" &&
      Actions.currentScene !== "ViewOrder" &&
      Actions.currentScene !== "AddOrder" &&
      Actions.currentScene !== "UserInfo2"
    ) {
      if (data) {
        // console.log("data IS TRUE ===> ", data.goToNotif === true);
        // console.log("data IS TRUE ===> ", data.goToNotif);

        if (data.goToNotif === true) {
          //console.log("IS TRUE");
          Actions.Notification();
        }
      }
    } else {
    }

    if (Actions.currentScene === "MobileKitchen") {
      // MobileKitchen.getData();
      Actions.pop();
      Actions.MobileKitchen();
    }

    //Actions.Notification();
  }

  onIds(device) {
    //console.log("Device info: ", device);
    LoginFunctions.SaveDeviceInfo(device, (response) => {});
  }

  componentWillUnmount() {
    // OneSignal.removeEventListener("received", this.onReceived);
    // OneSignal.removeEventListener("opened", this.onOpened);
    // OneSignal.removeEventListener("ids", this.onIds);
  }

  async componentDidMount() {
    // OneSignal.init(OneSignal_App_ID, {
    //   kOSSettingsKeyAutoPrompt: false,
    //   kOSSettingsKeyInFocusDisplayOption: 0
    // });
    console.log("appjs==================================");

    OneSignal.setAppId(OneSignal_App_ID);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(this.state.requiresPrivacyConsent);



    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    // OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          "OneSignal: notification will show in foreground:",
          notificationReceivedEvent
        );
        let notification = notificationReceivedEvent.getNotification();
        // console.log("notification: ", notification);
        if (notification)
        {
          this.onReceived(notification)
        }
        const data = notification.additionalData;
        console.log("additionalData: ", data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      }
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });

    // this.oneSignalFunctions();

    const deviceState = await OneSignal.getDeviceState();
    console.log("deviceState ===== ", deviceState);

    LoginFunctions.SaveDeviceInfo(deviceState, (response) => {});
    
    // async oneSignalFunctions()
    // {
    //   let oneSignalUserId = "";
      
    //   oneSignalUserId = await OneSignal.getUserId();
    //   console.log("oneSignalUserId ===== ", oneSignalUserId);
    // }



    // OneSignal.setExternalUserId("BEETPOS-Dicky123");

    // OneSignal.addEventListener("received", this.onReceived);

    // OneSignal.addEventListener("opened", this.onOpened);
    // OneSignal.addEventListener("ids", this.onIds);

    requestPermission();
    //this.getLoginInformation();
    this.setState({ initial: !this.state.initial });
    //Orientation.addOrientationListener(this._orientationDidChange);
    let orientation = Orientation.getInitialOrientation();
    // console.log(Orientation.getInitialOrientation());

    if (orientation === "PORTRAIT") {
      this.setState({ width: Dimensions.get("window").height });
    } else {
      this.setState({ width: Dimensions.get("window").width });
    }

    ColorFunctions.GetColor((val) => {
      this.setState({ colorIndex: val ? val : 0 });
      PrinterFunctions.GetLanguage((val2) => {
        //console.log("languageIndex ==> ", val2);

        this.setState({ languageIndex: val2 !== null ? val2 : 0, ready: true });
      });
    });
  }

  // _orientationDidChange = orientation => {
  //   if (orientation === "LANDSCAPE-LEFT") {
  //     this.setState({ width: Dimensions.get("window").width });
  //     // do something with landscape layout
  //   } else {
  //     // do something with portrait layout
  //   }
  // };



  getLoginInformation() {
    //let nas = new NewAsyncStorage();
    //let nas = new NewAsyncStorage;
    NewAsyncStorage.getItemByKey("@global:user", (user) => {
      console.log("user get login info ==>", user);

      if (user) {
        let dt = JSON.parse(user);
        this.setState(
          {
            loginInformation: dt,
            login: true,
          },
          () => this.forceUpdate()
        );
      }
    });
  }

  loginAction(loginInformation) {
    //console.log('loginInformation ==> ', loginInformation);

    // NewAsyncStorage.setItem(
    //   'global',
    //   'user',
    //   JSON.stringify({
    //     phone: loginInformation.phone,
    //     password: loginInformation.password,
    //   }),
    //   response => {
    //     nas.getItemByKey('@global:user', response => {
    //       console.log('global user ==> ', response);
    //     });
    //   },
    // );
    NewAsyncStorage.setItem(
      "global",
      "user",
      JSON.stringify(loginInformation),
      (response) => {
        console.log("local storage loginInformation ==> ", loginInformation);
        this.setState({
          loginInformation: loginInformation,
          login: true,
        }),
          () => {
            this.forceUpdate();
          };
      }
    );
  }

  logoutAction() {
    console.log("Logout");

    AsyncStorage.multiRemove(["@global:user", "@global:token"], (_err) => {
      this.setState(
        {
          login: false,
          loginInformation: null,
        },
        () => {
          this.forceUpdate();
        }
      );
    });
  }

  render() {
    //console.log("APP state ==> ", this.state);
    const { colorIndex, ready } = this.state;
    if (ready) {
      return (
        <Router backAndroidHandler={onBackPress} testing={"testing"}>
          <Stack
            // loginInformation={this.state.loginInformation}
            // isLogin={this.state.login}
            // loginActivity={val => this.loginAction(val)}
            // logoutActivity={() => this.logoutAction()}
            drawer={false}
            //drawerPosition="left"
            drawerProps="true"
            // drawerWidth={Dimensions.get("window").width*0.35}
            //drawerWidth={this.state.width * 0.35}
            contentComponent={DrawerContent}
            key="root"
            navigationBarStyle={{ backgroundColor: MAIN_THEME_COLOR }}
          >
            {/* <Stack key="Splash" hideNavBar title="Splash">
              <Scene
                key="Splash"
                component={SplashScreen}
                hideNavBar={true}
                title="Splash"
                initial={true}
                //initial={!this.state.login}
                //currentTab={tabBar}
                //onRef={ref => (this.mainRef = ref)}
                //changeTabBar={this.changeTabBar.bind(this)}
                type={ActionConst.REPLACE}
              />
            </Stack> */}
            <Stack key="Main" hideNavBar title="Main">
              <Scene
                key="Splash"
                colorIndex={colorIndex}
                component={SplashScreen}
                hideNavBar={true}
                initial={true}
                title="Splash"
                changeColorAction={(val) => {
                  console.log("CHANGE COLOR APP.JS");
                  this.setState({ colorIndex: val });
                }}
                changeLanguageAction={(val) => {
                  console.log("CHANGE LANGUAGE APP.JS");
                  this.setState({ languageIndex: val });
                }}
                type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileLogin"
                component={MobileLogin}
                hideNavBar={true}
                title="Login"
                //initial={!this.state.login}
                //currentTab={tabBar}
                //onRef={ref => (this.mainRef = ref)}
                //changeTabBar={this.changeTabBar.bind(this)}
                type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileLoginOld"
                component={MobileLoginOld}
                hideNavBar={true}
                title="Login"
                //initial={!this.state.login}
                //currentTab={tabBar}
                //onRef={ref => (this.mainRef = ref)}
                //changeTabBar={this.changeTabBar.bind(this)}
                type={ActionConst.REPLACE}
              />





              <Scene
                key="MobileRegistration"
                component={MobileRegistration}
                hideNavBar={true}
                title="Registration"
                // type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileForgotPassword"
                component={MobileForgotPassword}
                hideNavBar={true}
                title="Forgot Password"
                // type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileMainMenu"
                component={MobileMainMenu}
                hideNavBar={true}
                title="Main Menu"
                type={ActionConst.REPLACE}
              />

              <Scene
                key="TestingDualScreen"
                component={TestingDualScreen}
                hideNavBar={true}
                title="Main Menu"
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="TestingDualScreenPayment"
                component={TestingDualScreenPayment}
                hideNavBar={true}
                title="Main Menu"
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="TestingDualScreenOrder"
                component={TestingDualScreenOrder}
                hideNavBar={true}
                title="Main Menu"
                //type={ActionConst.REPLACE}
              />
              

              <Scene
                key="TestingPrinterThermal"
                component={TestingPrinterThermal}
                hideNavBar={true}
                title="Main Menu"
                //type={ActionConst.REPLACE}
              />



              <Scene
                key="MobileProductKios"
                component={MobileProductKios}
                hideNavBar={true}
                title="Menu"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileHomePage"
                component={MobileHome}
                hideNavBar={true}
                title="Menu"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileHomeTablet"
                component={MobileHomeTablet}
                hideNavBar={true}
                title="Menu"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="MobileHomeTabletNoReplace"
                component={MobileHomeTablet}
                hideNavBar={true}
                title="Menu"
                // type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileProduct"
                component={MobileProduct}
                hideNavBar={true}
                title="Product"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileProductTablet"
                component={MobileProductTablet}
                hideNavBar={true}
                title="Product"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileBayar"
                component={MobileBayar}
                hideNavBar={true}
                title="Pembayaran"
                onBackPress={() => {
                  Actions.pop();
                }}
                //type={ActionConst.REPLACE}
              />


              <Scene
                key="MobileBayarTablet"
                component={MobileBayarTablet}
                hideNavBar={true}
                title="Pembayaran"
                onBackPress={() => {
                  Actions.pop();
                }}
                //type={ActionConst.REPLACE}
              />





              <Scene
                key="MobileBayarKios"
                component={MobileBayarKios}
                hideNavBar={true}
                title="Pembayaran"
                onBackPress={() => {
                  Actions.pop();
                }}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileSplitBill"
                component={MobileSplitBill}
                hideNavBar={true}
                title="Pisah Bill"
                onBackPress={() => {
                  Actions.pop();
                }}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileSplitBillProduct"
                component={MobileSplitBillProduct}
                hideNavBar={true}
                title="Pisah Bill"
                onBackPress={() => {
                  Actions.pop();
                }}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileSetting"
                changeColorAction={(val) => {
                  console.log("CHANGE COLOR APP.JS");

                  this.setState({ colorIndex: val });
                }}
                changeLanguageAction={(val) => {
                  console.log("CHANGE LANGUAGE APP.JS");

                  this.setState({ languageIndex: val });
                }}
                component={MobileSetting}
                hideNavBar={true}
                title={_setting[this.state.languageIndex]}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileSettingTablet"
                changeColorAction={(val) => {
                  console.log("CHANGE COLOR APP.JS");

                  this.setState({ colorIndex: val });
                }}
                changeLanguageAction={(val) => {
                  console.log("CHANGE LANGUAGE APP.JS");

                  this.setState({ languageIndex: val });
                }}
                component={MobileSettingTablet}
                hideNavBar={true}
                title={_setting[this.state.languageIndex]}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileDemoPrinter"
                component={MobileDemoPrinter}
                hideNavBar={true}
                title={_setting[this.state.languageIndex]}
                //type={ActionConst.REPLACE}
              />





              <Scene
                key="MobileRegisterPayment"
                component={MobileRegisterPayment}
                hideNavBar={true}
                title={_setting[this.state.languageIndex]}
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="MobileHistory"
                component={MobileHistory}
                hideNavBar={true}
                title="Riwayat Transaksi"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileHistoryTablet"
                component={MobileHistoryTablet}
                hideNavBar={true}
                title="Riwayat Transaksi"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobilePending"
                component={MobilePending}
                hideNavBar={true}
                title="Transaksi Outstanding"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="MobileGobizTransaction"
                component={MobileGobizTransaction}
                hideNavBar={true}
                title="Gobiz Transaction"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileOnlineOrder"
                component={MobileOnlineOrder}
                hideNavBar={true}
                title="Online Order"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileAbsensi"
                component={MobileAbsensi}
                hideNavBar={true}
                title="Absensi"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileEntrance"
                component={MobileEntrance}
                hideNavBar={true}
                title="Entrance"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileManagement"
                component={MobileManagement}
                hideNavBar={true}
                title="Data Pelanggan"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileManagementTablet"
                component={MobileManagementTablet}
                hideNavBar={true}
                title="Data Pelanggan"
                //type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileMeja"
                component={MobileMeja}
                hideNavBar={true}
                title="Manajemen Meja"
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="MobileMejaTablet"
                component={MobileMejaTablet}
                hideNavBar={true}
                title="Manajemen Meja"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileKitchen"
                component={MobileKitchen}
                hideNavBar={true}
                title="Manajemen Dapur"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileTokopediaChat"
                component={MobileTokopediaChat}
                hideNavBar={true}
                title="Tokopedia Chat"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileTokopediaOrder"
                component={MobileTokopediaOrder}
                hideNavBar={true}
                title="Tokopedia Order"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileCombine"
                component={MobileCombine}
                hideNavBar={true}
                title="Gabung / Pisah Transaksi"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="MobileRekap"
                component={MobileRekap}
                hideNavBar={true}
                title="Kas"
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="MobileRekapTablet"
                component={MobileRekapTablet}
                hideNavBar={true}
                title="Kas"
                //type={ActionConst.REPLACE}
              />

              <Scene
                key="Login"
                component={Login}
                hideNavBar={true}
                title="Login"
                //initial={!this.state.login}
                //currentTab={tabBar}
                //onRef={ref => (this.mainRef = ref)}
                //changeTabBar={this.changeTabBar.bind(this)}
                type={ActionConst.REPLACE}
              />

              <Scene
                key="UserInfo"
                component={UserInfo}
                hideNavBar={true}
                title="Account"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="Combine"
                component={Combine}
                hideNavBar={true}
                title="Gabung / Pisah Transaksi"
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="HomePage"
                component={Home}
                hideNavBar={true}
                title="Menu"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="History"
                component={History}
                hideNavBar={true}
                title="Riwayat Transaksi"
                type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="UserEdit"
                component={UserEdit}
                hideNavBar={true}
                title="Account"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="Absensi"
                component={Absensi}
                hideNavBar={true}
                title="Absensi"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="Refund"
                component={Refund}
                hideNavBar={true}
                title="Refund"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="Bayar"
                component={Bayar}
                hideNavBar={true}
                title="Pembayaran"
                type={ActionConst.REPLACE}
              />

              <Scene
                key="Rekap"
                component={Rekap}
                hideNavBar={true}
                title="Kas"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="Day1"
                component={Day1}
                hideNavBar={true}
                title="Day1"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="Management"
                component={Management}
                hideNavBar={true}
                title="Data Pelanggan"
                type={ActionConst.REPLACE}
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="Notification"
                component={Notification}
                hideNavBar={true}
                title="Notification"
                //type={ActionConst.REPLACE}
              />
              <Scene
                key="Registration"
                component={Registration}
                hideNavBar={true}
                title="Registration"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="Meja"
                component={Meja}
                hideNavBar={true}
                title="Manajemen Meja"
                type={ActionConst.REPLACE}
              />
              <Scene
                key="Setting"
                changeColorAction={(val) => this.setState({ colorIndex: val })}
                changeLanguageAction={(val) =>
                  this.setState({ languageIndex: val })
                }
                component={Setting}
                hideNavBar={true}
                title={_setting[this.state.languageIndex]}
                type={ActionConst.REPLACE}
              />
            </Stack>

            {/* <Stack key="Camera" hideNavBar title="Cam">
              <Scene
                key="CameraBarcode"
                component={Camera}
                hideNavBar={true}
                title="Scan Code"
                //type={ActionConst.REPLACE}
              />
            </Stack> */}
          </Stack>
        </Router>
      );
    } else {
      return <View style={{ backgroundColor: "#666" }} />;
    }
  }
}
