/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */

// ORIGINAL MENU BEETPOS

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
  Linking,
  Modal
} from "react-native";

import RNFetchBlob from "rn-fetch-blob";

import Loading from "../../Components/MobileLoading";
import DeviceInfo from "react-native-device-info";
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

import PDFFunctions from "../../Libraries/PDFFunctions";

//import Banner from "../Account/banner";
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
  _menu_6,
  _menu_7,
  _menu_8,
  _menu_9,
  _menu_10,
  _title,
  _pos,
  _pengaturan,
  _informasi,
  _role,
  _check_in,
  _check_out,
  _status_kas
} from "../../Libraries/DictionaryLogin";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
import NetInfo from "@react-native-community/netinfo";
import {
  BE_Attendance,
  BE_Rekap,
  BE_Sales_Type,
  BE_TableManagement,
  GetAttendanceAPI
} from "../../Constants";

import MobileHeader from "../../Components/MobileHeader";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Entypo from "react-native-vector-icons/Entypo";

import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OfflineAttendanceFunctions from "../../Libraries/OfflineAttendanceFunctions";
import moment from "moment";

export default class MobileMainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPDF: false,
      tablet: DeviceInfo.isTablet(),
      initial: false,
      login: false,
      email: "test@gmail.com",
      staffId: "rizky1",
      password: "password",
      rememberMe: false,
      ready: true,
      loading: true,
      device_info: null,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      auth: this.props.auth ? this.props.auth : "",
      dataTable: [],
      access_cashier_transaction: false,
      access_cash_recap: false,
      access_change_product_price: false,
      access_cancelling_transaction: false,
      access_changing_transaction: false,
      access_giving_discount: false,
      access_reprint_receipt: false,
      access_reprint_kitchen_ticket: false,
      access_print_bill: false,
      access_view_history_transaction: false,
      access_customer_management: false,
      access_product_management: true,
      clockIn: "00:00",
      clockOut: "00:00",
      statusKas: "Closed",

      timerDuration: 1800, //seconds
      showAlertTable: true,
      disableAlertTable: false,
      business_type: "Retail" //"Resto" //"Service"
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log("componentDidUpdate");

      this.setState({ disableAlertTable: false });
      setTimeout(() => {
        this.interval2 = setInterval(() => {
          this.getTableList();
          //alert("test")
        }, 15000);
      }, 100);
    }
  }

  componentDidMount() {
    console.log("componentdidmount");
    //console.log("USER info ==> ", this.state.userInfo);
    LoginFunctions.GetDeviceInfo(response => {
      if (response)
      {
      this.setState({ device_info: response });
      }
      //console.log("device_info ==> ", response);
    });

    //console.log("user Info ===> ", this.state.userInfo)
    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    // LoginFunctions.LoginInformation(val => {
    //   //console.log("dari login ", val);
    //   if (val) {
    //     Actions.pop();
    //     Actions.MobileMainMenu({
    //       userInfo: val,
    //       colorIndex: this.state.colorIndex,
    //       languageIndex: this.state.languageIndex
    //     });
    //   }
    // });

    LoginFunctions.AuthToken(val => {
      console.log("auth token ==> ", val);
      this.setState({
        auth: val
      });

      this.checkToken(val);
      this.BEAttendanceInformation(this.state.userInfo.id);
      this.interval = setInterval(() => {
        if (this.state.clockOut === "00:00") {
          //if (this.state.userInfo.id)
          this.BEAttendanceInformation(this.state.userInfo.id);
        }

        this.getRekap();
        //this.getTableList();
      }, 15000);

      this.interval2 = setInterval(() => {
        this.getTableList();
        //alert("test")
      }, 15000);
    });

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    this.setPreviliges();
    this.getRekap();

    //if (this.state.userInfo.id)
  }

  getTableList() {
    const { userInfo } = this.state;
    const gerai_id = userInfo.gerai_id;

    let available = 0;
    let reserved = 0;
    let used = 0;

    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=${search}`;

    //let name_search = search !== "" ? `?name=${search}` : "";

    let uri = `${BE_TableManagement}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27
    let resultFinal = [];

    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.statusCode === 200) {
          let resultData = result.data;
          console.log("getDataTable ==> ", resultData);
          this.setState({
            dataTable: resultData
          });

          if (!this.state.disableAlertTable) {
            let temp_list = [];
            let temp_list_name = "";

            resultData.map((v, i) => {
              let temp = {
                id: v.id,
                name: v.name,
                status: v.status,
                //available: firstData.available,
                statusName: v.statusName,
                capacity: v.capacity
                //updatedAt: v.updatedAt
              };

              if (temp.status === "used") {
                const time_in = v.Transaction_Table.time_in;
                temp.time_in = time_in;

                const time_now = moment(new Date()).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
                let timeDifference = moment(time_now).diff(moment(time_in));
                let timeDifferenceSecond = Math.round(timeDifference / 1000);

                // console.log("timeDifferenceSecond ===> ", timeDifferenceSecond);

                if (timeDifferenceSecond > this.state.timerDuration) {
                  temp_list.push(temp);

                  if (temp_list_name === "") {
                    temp_list_name = temp.name;
                  } else {
                    temp_list_name = `${temp_list_name}, ${temp.name}`;
                  }
                }
                //console.log("moment(time_in) ===> ", moment(time_in));
              }

              if (temp_list.length > 0) {
                this.setState({ disableAlertTable: true });
                const alert_indo = `Meja ${temp_list_name} sudah lewat timer. Mohon diproses lebih lanjut`;
                const alert_message = [""];
                alert(alert_indo);
              }
            });
          }
        }
      })
      .catch(_err => {
        console.log("ERR table List ==> ", _err);
      });
  }

  getRekap() {
    let date_start = moment(new Date())
      .add(-3000, "days")
      .format("YYYY-MM-DD 00:00");
    let date_end = moment(new Date()).format("YYYY-MM-DD 23:59");

    //let uri = `${GetRekapAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&date_start=${date_start}&date_end=${date_end}&search=&page=1&search=${search}`;

    let uri = `${BE_Rekap}?date_start=${date_start}&date_end=${date_end}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27

    fetch(uri, {
      method: "GET",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        //console.log("responseJSON ==> ", responseJson)
        if (result.statusCode === 200) {
          let resultData = result.data;
          //console.log("getData rekap ==> ", result);

          if (resultData[0].status === "open") {
            this.setState({
              statusKas: "Open"
            });
          } else {
            //alert(alert_message[this.state.languageIndex]);
            this.setState({
              statusKas: "Closed"
            });
          }
        } else {
          this.setState({
            statusKas: "Closed"
          });
        }
      })
      .catch(_err => {
        //this.setState({ loading: false });
        //console.log("ERR getRekapList ==> ", _err);
      });
  }

  BEAttendanceInformation(userId) {
    this.setState({
      clockOut: "00:00",
      clockIn: "00:00"
    });

    // const { userInfo } = this.state;

    //console.log("userId ===> ", userId);
    // console.log("userInfoID ===> ", userInfo.id)

    //if (userId.toString() !== "undefined") {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let date_now = moment(new Date()).format("YYYY-MM-DD");
        const uri = `${BE_Attendance}?date=${date_now}&user_id=${userId}`;
        //console.log("BEAttendanceInformation URI ==>", uri);
        //this.setState({ loading: true });
        fetch(uri, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;

            //console.log("getAttendanceInformation result ==>", result);

            if (result.statusCode === 200) {
              let resultData = result.data[0];
              //console.log("getAttendanceInformation ==>", resultData);

              let clockIn = resultData.clock_in
                ? moment(resultData.clock_in).format("HH:mm")
                : "00:00";
              let clockOut = resultData.clock_out
                ? moment(resultData.clock_out).format("HH:mm")
                : "00:00";

              //console.log("clock OUT ==>", clockOut);

              this.setState({
                clockOut: clockOut,
                clockIn: clockIn
              });
            } else {
              this.setState({
                clockOut: "00:00",
                clockIn: "00:00"
              });
            }
            //console.log("clockInFormat ==> ", clockIn);
            //this.setState({ listUser: resultData });
          })
          .catch(_err => {
            console.log("ERR Attendance Info ==> ", _err);
          });
      } else {
        OfflineAttendanceFunctions.GetTempAttendance(val => {
          //console.log("get Temp Attendance ==> ", val);
          val.map((v, i) => {
            if (
              v.user_id.toString() === userId.toString() &&
              v.date === moment(new Date()).format("YYYY-MM-DD")
            ) {
              //console.log("get Temp Attendance v ==> ", v);

              // correct user & date
              this.setState({
                clockIn: v.clock_in
                  ? moment(v.clock_in).format("HH:mm")
                  : "00:00",
                clockOut: v.clock_out
                  ? moment(v.clock_out).format("HH:mm")
                  : "00:00"
              });
            }
          });
        });
      }
    });
    //}
  }

  setPreviliges() {
    const { userInfo } = this.state;

    //console.log("user Info ===> ", userInfo);
    this.setState({ business_type: userInfo.business_type });

    let privileges = userInfo.privileges;

    //console.log("privileges ===> ", privileges);

    privileges.map((v, i) => {
      if (
        v.name === "cashier_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_cashier_transaction: true });
      }

      if (
        v.name === "cash_recap" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_cash_recap: true });
      }

      if (
        v.name === "change_product_price" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_change_product_price: true });
      }

      if (
        v.name === "cancelling_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_cancelling_transaction: true });
      }

      if (
        v.name === "changing_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_changing_transaction: true });
      }

      if (
        v.name === "delete_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_changing_transaction: true });
      }

      if (
        v.name === "giving_discount" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_giving_discount: true });
      }

      if (
        v.name === "print_bill" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_print_bill: true });
      }

      if (
        v.name === "reprint_receipt" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_reprint_receipt: true });
      }

      if (
        v.name === "reprint_kitchen_ticket" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_reprint_kitchen_ticket: true });
      }

      if (
        v.name === "view_history_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_view_history_transaction: true });
      }

      if (
        v.name === "customer_management" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_customer_management: true });
      }
    });

    this.setState({ privileges: privileges, loading: false });
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

    clearInterval(this.interval);

    clearInterval(this.interval2);
  }

  checkToken(token) {
    //let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Sales_Type;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.statusCode === 403) {
          //alert("Authorization timed out!");
          this.logoutAction();
        }
      })
      .catch(_err => {
        console.log("ERR Check Token ==> ", _err);
      });
  }

  logoutAction() {
    this.setState({ loading: true });
    LoginFunctions.Logout(val => {
      if (val) {
        setTimeout(() => {
          Actions.pop();
          Actions.pop();

          console.log("logout ===> ", true);
          this.setState({ loading: false });

          Actions.MobileLogin({
            logout: true,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex
          });
        }, 100);
      }
    });
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
          borderTopRightRadius: 20,
          elevation: 1
          //borderTopWidth: 0.5,
          //borderColor:
        }}
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
              marginTop: 10,
              borderColor: "#DADADA",
              paddingBottom: 5,
              borderBottomWidth: 2,
              flexDirection: "row",
              width: "100%"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 16,
                  color: BLACK
                }
              ]}
            >
              {this.state.userInfo.business_name} {` - `}
              {this.state.userInfo.gerai_name}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
              width: this.state.tablet ? "66%" : "100%",
              alignSelf: "center"
            }}
          >
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 12,
                    color: "#8A8A8F"
                  }
                ]}
              >
                {_pos[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 7
                //justifyContent: "space-evenly"
              }}
            >
              <View
                style={{
                  width: "33%",
                  display: this.state.access_cashier_transaction
                    ? "flex"
                    : "none"
                }}
              >
                <Button
                  style={{
                    //width: "33%",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    clearInterval(this.interval2);

                    Actions.MobileHomePage({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    {this.state.business_type === "Restaurant" ? (
                      <MaterialIcons
                        name="restaurant-menu"
                        size={27}
                        style={{
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        }}
                      />
                    ) : (
                      <View />
                    )}

                    {this.state.business_type === "Retail" ? (
                      <MaterialIcons
                        name="shopping-cart"
                        size={27}
                        style={{
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        }}
                      />
                    ) : (
                      <View />
                    )}

                    {this.state.business_type === "Service" ? (
                      <MaterialIcons
                        name="room-service"
                        size={27}
                        style={{
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        }}
                      />
                    ) : (
                      <View />
                    )}
                  </View>
                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon1.png")}
                /> */}
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
              </View>

              <View
                style={{
                  width: "33%",
                  display:
                    this.state.access_cashier_transaction &&
                    this.state.business_type === "Restaurant"
                      ? "flex"
                      : "none"
                }}
              >
                <Button
                  style={{
                    //width: "33%",
                    alignItems: "center",
                    alignSelf: "center"
                  }}
                  onPress={() => {
                    clearInterval(this.interval2);

                    Actions.MobileMeja({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon1.png")}
                /> */}
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <MaterialCommunityIcons
                      name="table"
                      size={27}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: "#8A8A8F"
                      }
                    ]}
                  >
                    {_menu_7[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>

              <View
                style={{
                  width: "33%",
                  display: this.state.access_customer_management
                    ? "flex"
                    : "none"
                }}
              >
                <Button
                  style={{
                    //width: "33%",
                    alignItems: "center",
                    alignSelf: "center"
                  }}
                  onPress={() => {
                    clearInterval(this.interval2);
                    Actions.MobileManagement({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <FontAwesome
                      name="user-circle"
                      size={27}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>
                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon3.png")}
                /> */}
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
            </View>
            {/* BARIS 2 */}
            {/* <View style={{ marginTop: 12, marginBottom: 5 }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 12,
                    color: "#8A8A8F"
                  }
                ]}
              >
                {_informasi[this.state.languageIndex]}
              </Text>
            </View> */}

            <View
              style={{
                flexDirection: "row",
                marginTop: 7
                //justifyContent: "space-between"
              }}
            >
              <View style={{ width: "33%" }}>
                <Button
                  style={{
                    //width: "33%",
                    alignItems: "center",
                    alignSelf: "center",
                    display: this.state.access_view_history_transaction
                      ? "flex"
                      : "none"
                  }}
                  onPress={() => {
                    clearInterval(this.interval2);

                    Actions.MobileHistory({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon2.png")}
                /> */}
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <MaterialCommunityIcons
                      name="history"
                      size={27}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>
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
              </View>
              <View style={{ width: "33%" }}>
                <Button
                  style={{
                    //width: "33%",
                    alignItems: "center",
                    alignSelf: "center",
                    display: this.state.access_cash_recap ? "flex" : "none"
                  }}
                  onPress={() => {
                    clearInterval(this.interval2);

                    Actions.MobileRekap({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon5.png")}
                /> */}
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <MaterialCommunityIcons
                      name="notebook"
                      size={27}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>
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
              </View>

              <View style={{ width: "33%" }}>
                <Button
                  style={{
                    //width: "33%",
                    alignItems: "center",
                    alignSelf: "center",
                    display: this.state.access_product_management
                      ? "flex"
                      : "none"
                  }}
                  onPress={() => {
                    clearInterval(this.interval2);

                    Actions.MobileProduct({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon5.png")}
                /> */}
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <FontAwesome
                      name="tags"
                      size={27}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: "#8A8A8F"
                      }
                    ]}
                  >
                    {_menu_8[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 7
                //justifyContent: "space-between"
              }}
            >
              <View style={{ width: "33%" }}>
                <Button
                  style={{
                    //width: "33%",
                    alignItems: "center",
                    alignSelf: "center",
                    display: "flex"
                  }}
                  onPress={() => {
                    clearInterval(this.interval2);

                    Actions.MobilePending({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <Entypo
                      name="clock"
                      size={27}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: "#8A8A8F"
                      }
                    ]}
                  >
                    {_menu_9[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>

              <View style={{ width: "33%" }}>
                <Button
                  style={{
                    //width: "33%",
                    alignItems: "center",
                    alignSelf: "center",
                    display: "flex"
                  }}
                  onPress={() => {
                    clearInterval(this.interval2);

                    Actions.MobileOnlineOrder({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <Entypo
                      name="shopping-basket"
                      size={27}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: "#8A8A8F"
                      }
                    ]}
                  >
                    {_menu_10[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
            {/* BARIS 2 */}
            <View style={{ marginTop: 12 }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 12,
                    color: "#8A8A8F"
                  }
                ]}
              >
                {_pengaturan[this.state.languageIndex]}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10
                //justifyContent: "space-evenly"
              }}
            >
              <View style={{ width: "33%", display:"none" }}>
                <Button
                  style={{ alignItems: "center", alignSelf: "center" }}
                  onPress={() => {
                    clearInterval(this.interval2);
                    this.createPDF();
                    //this.logoutAction();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <Ionicons
                      name="md-settings"
                      size={25}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>

                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon6.png")}
                /> */}
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: "#8A8A8F"
                      }
                    ]}
                  >
                    TEST PDF
                  </Text>
                </Button>
              </View>

              <View style={{ width: "33%" }}>
                <Button
                  style={{ alignItems: "center", alignSelf: "center" }}
                  onPress={() => {
                    clearInterval(this.interval2);

                    Actions.MobileSetting({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                    //this.logoutAction();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <Ionicons
                      name="md-settings"
                      size={25}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>

                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon6.png")}
                /> */}
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
              <View style={{ width: "33%" }}>
                <Button
                  style={{ alignItems: "center", alignSelf: "center" }}
                  onPress={() => {
                    clearInterval(this.interval2);
                    Actions.MobileAbsensi({
                      auth: this.state.auth,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex
                    });
                  }}
                >
                  {/* <Image
                  style={{
                    width: "100%",
                    resizeMode: "contain"
                  }}
                  source={require("../../Images/Icon4.png")}
                /> */}
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      padding: 15,
                      borderRadius: 30
                    }}
                  >
                    <MaterialCommunityIcons
                      name="calendar"
                      size={27}
                      style={{
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }}
                    />
                  </View>
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
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async createPDF() {
    const data = {
      transaction_id: "TRaNs_ID"
    };

    let html_return = "";

    PDFFunctions.PDF_1(data, response => {
      html_return = response;
      //console.log("device_info ==> ", response);
    });
    this.setState({ loading: true });
    await this.wait(500);
    this.setState({ loading: false });

    let options = {
      html: html_return,
      fileName: "test",
      //directory: "Documents",
      width: 800,
      height: 1300
      //base64: true
    };

    // let file = await RNHTMLtoPDF.convert(options);
    // console.log("PDF ===> ", file);
    //alert(file.filePath);
    // const android = RNFetchBlob.android;

    //const filePath = RNFetchBlob.fs.dirs.DocumentDir + file.filePath;

    //console.log("filePath ===> ", filePath);

    // RNFetchBlob.config({
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     title: "awesome.pdf",
    //     description: "An APK that will be installed",
    //     mime: "application/vnd.android.package-archive",
    //     mediaScannable: true,
    //     notification: true
    //   }
    // })
    //   .fetch("GET", `${filePath}`)
    //   .then(res => {
    //     android.actionViewIntent(res.path(), "image/png");
    //   });

    // android.actionViewIntent(file.filePath, "application/pdf");

    // this.setState({ showPDF: true, pdfBase64: file.base64 });

    // /storage/emulated/0/Documents/test.pdf
  }

  renderPDF() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showPDF}
        onRequestClose={() => {
          this.setState({ showPDF: false });
        }}
      >
        <View style={{ flex: 1, backgroundColor: "#BCA" }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
          >
            <Image
              source={{ uri: `data:image/png;base64,${this.state.pdfBase64}` }}
            />
          </ScrollView>
        </View>
      </Modal>
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

    const { privileges } = this.state;

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

        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_title[this.state.languageIndex]}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={false}
          barStyle={barStyle}
          hideLogin={false}
          logoutAction={() => {
            this.logoutAction();
          }}
        />

        {this.renderPDF()}

        <View
          style={{
            flex: 1
          }}
        >
          {this.state.loading ? (
            <Loading
            //not_transparent={false}
            //colorIndex={this.state.colorIndex}
            />
          ) : (
            <View />
          )}

          <View style={{ flex: 0.35 }}>
            {/* <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover"
              }}
              source={require("../../Images/LoginLogo.png")}
            /> */}
            <Image
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover"
              }}
              source={require("../../Images/new_bg.jpg")}
            />
            <View
              style={{
                position: "absolute",
                flex: 1,
                width: this.state.tablet ? "66%" : "100%",
                alignSelf: "center"
                //backgroundColor: "#BCA"
              }}
            >
              <View
                style={{ paddingTop: 10, paddingLeft: 30, paddingRight: 30 }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 16,
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
                  paddingTop: 5,
                  paddingLeft: 30,
                  paddingRight: 30,
                  flexDirection: "row"
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    Staff ID :
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {this.state.userInfo.staff_id}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {_role[this.state.languageIndex]} :
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {this.state.userInfo.role_name}
                  </Text>
                </View>
              </View>
              {/* Baris 2 */}
              <View
                style={{
                  paddingTop: 5,
                  paddingLeft: 30,
                  paddingRight: 30,
                  flexDirection: "row"
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {_check_in[this.state.languageIndex]} :
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {this.state.clockIn ? this.state.clockIn : "00:00"}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {_check_out[this.state.languageIndex]} :
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {this.state.clockOut ? this.state.clockOut : "00:00"}
                  </Text>
                </View>
              </View>
              {/* Baris 3 */}
              <View
                style={{
                  paddingTop: 5,
                  paddingLeft: 30,
                  paddingRight: 30,
                  flexDirection: "row"
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {_status_kas[this.state.languageIndex]} :
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {this.state.statusKas ? this.state.statusKas : "Closed"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 0.65,
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
