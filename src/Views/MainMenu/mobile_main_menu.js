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
  Linking,
  Modal,
  FlatList,
  BackHandler,
  Animated,
  LogBox
} from "react-native";

import RNFetchBlob from "rn-fetch-blob";

import Loading from "../../Components/MobileLoading";
import DeviceInfo from "react-native-device-info";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
// import Image from "../../Components/Image";

import AdsImage from "../../Components/AdsImage";
import FloatingTextInput from "../../Components/FloatingTextInput";
import Checkbox from "../../Components/Checkbox";
// import Orientation from "react-native-orientation-locker";

// import convert from 'xml-js';

import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";

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

import EncodeFunctions from "../../Libraries/EncodeFunctions";

import PDFFunctions from "../../Libraries/PDFFunctions";

//import Banner from "../Account/banner";
import ColorFunctions from "../../Libraries/ColorFunctions";

import AdsFunctions from "../../Libraries/AdsFunctions";

AdsFunctions
import PrinterFunctions from "../../Libraries/PrinterFunctions";
import DateTimeFunctions from "../../Libraries/DateTimeFunctions";

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
  _menu_13,
  _menu_14,
  _title,
  _pos,
  _pengaturan,
  _informasi,
  _role,
  _check_in,
  _check_out,
  _status_kas,
  _server_down,
  _login_device_other,
  _menu_11,
  _menu_12,
  _menu_15
} from "../../Libraries/DictionaryLogin";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
import NetInfo from "@react-native-community/netinfo";
import {
  BE_Attendance,
  BE_Rekap,
  BE_Sales_Type,
  BE_Role,
  BE_TableManagement,
  GetAttendanceAPI,
  BE_Business,
  BE_URI,
  BE_Commission,
  BE_Get_User,
  BE_CheckPin,
  BE_Outlet,
  beetpos_version_code,
  beetpos_version_name,
  BE_Beetpos_Setting,
  settings_latest_version,
  settings_latest_version_sunmi,
  beetpos_playstore,
  blibli_username,
  blibli_channel_id,
  settings_papa_recepi,
  BE_Currency,
  BE_Currency_Conversion,
  BE_Sales_Type_Product
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
import RegionFunctions from "../../Libraries/RegionFunctions";
import {
  _bluetooth_tidak_aktif,
  _bluetooth_tidak_aktif_2
} from "../../Libraries/DictionarySetting";
import CashlezFunctions from "../../Libraries/CashlezFunctions";
import LoadingReader from "../../Components/LoadingReader";
import MobilePinPad from "../../Components/MobilePINPad";
import { _salah_pin } from "../../Libraries/DictionaryAbsen";
import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";
import { _update_alert } from "../../Libraries/DictionaryHome";
import BlibliFunctions from "../../Libraries/BlibliFunctions";
import SettingsFunctions from "../../Libraries/SettingsFunctions";
// import { DualMonitorGeneral } from "../../Libraries/DualScreenFunctions";

export default class MobileMainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allow_kios_transaction: false,
      mount: true,
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
      tokopedia_store_id: null,
      blibli_auth: null,
      blibli_store_id: null,
      showPin: false,
      sub_type: 1,
      cz_pin: null,
      cz_user: null,
      cz_pin_outlet: null,
      cz_user_outlet: null,
      showExit: false,
      exitCounter: 1,
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
      access_cashier_booking: false,
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
      access_product_management: false,
      access_order_management: false,
      access_attendance_management: true,
      access_online_order: false,

      clockIn: "00:00",
      clockOut: "00:00",
      statusKas: "Closed",

      timerDuration: 1800, //seconds
      showAlertTable: true,
      disableAlertTable: false,
      business_type: "Retail", //"Resto" //"Service"

      listAllMenu: [
        {
          id: 1,
          name: "Pesanan Baru",
          available: false
        },
        {
          id: 2,
          name: "Meja",
          available: false
        },
        {
          id: 3,
          name: "Pelanggan",
          available: false
        },
        {
          id: 4,
          name: "Riwayat",
          available: false
        },
        {
          id: 5,
          name: "Kas",
          available: false
        },
        {
          id: 6,
          name: "Produk",
          available: false
        },
        {
          id: 7,
          name: "Booking",
          available: false
        },
        {
          id: 8,
          name: "Online Order",
          available: false
        },
        {
          id: 9,
          name: "Direct Payment",
          available: false
        },
        {
          id: 10,
          name: "Kitchen Management",
          available: false
        },
        {
          id: 11,
          name: "Chat Tokopedia",
          available: false
        },
        {
          id: 12,
          name: "Order Tokopedia",
          available: false
        },
        {
          id: 13,
          name: "Kios Transaction",
          available: false
        },
        
      ],
      listFilteredMenu: [],
      serverDown: false,
      dataAds: null,
      selectedAds: 0,
      paginationAds: null
    };
  }

  async InitializeCashlez() {
    CashlezFunctions.InitializeCashlez(v => {
      //console.log("Call Back InitializeCashlez ===> ", v);
      console.log("Call Back InitializeCashlez ===> ", v);
      this.LoginCashlez();
    });
  }

  async LoginCashlez() {
    let cz_user = this.state.cz_user_outlet
      ? this.state.cz_user_outlet
      : this.state.cz_user;
    let cz_pin = this.state.cz_pin_outlet
      ? this.state.cz_pin_outlet
      : this.state.cz_pin;
    CashlezFunctions.LoginCashlez(cz_user, cz_pin, v => {
      //CashlezFunctions.LoginCashlez("test010101", "111111", v => {

      //v.code === 500

      // console.log("Call Back LoginCashlez 1 ===> ", v.code);
      // console.log("Call Back LoginCashlez 2 ===> ", v.code === 200);

      if (v.code === 200) {
        console.log("Call Back LoginCashlez 3 ===> ", v);
        CashlezFunctions.SaveCashlezData(this.state.cz_user, cb => {});
        //this.InitializeCashlezPayment();
      } else {
        CashlezFunctions.SaveCashlezData("invalid", cb => {});
        alert(v.message);
      }
    });
  }

  async InitializeCashlezPayment() {
    CashlezFunctions.InitializeCashlezPayment(v => {
      //console.log("Call Back InitializeCashlezPayment ===> ", v);
      this.PaymentStartLocationListener();
    });
  }

  async PaymentStartLocationListener() {
    CashlezFunctions.PaymentStartLocationListener();
    setTimeout(() => {
      this.PaymentCheckReader();
    }, 500);
  }

  async PaymentCheckReader() {
    CashlezFunctions.PaymentCheckReader(v => {
      //console.log("Call Back PaymentCheckReader ===> ", v);
    });

    CashlezFunctions.InitializeOvo(v => {
      //console.log("Call Back InitializeOvo ===> ", v);
      //CashlezFunctions.StartShopee();
    });

    CashlezFunctions.InitializeShopee(v => {
      //console.log("Call Back InitializeShopee ===> ", v);
      //CashlezFunctions.StartShopee();
    });

    CashlezFunctions.InitializeGopay(v => {
      //console.log("Call Back InitializeGopay ===> ", v);
      //CashlezFunctions.StartShopee();
    });
  }

  checkPin() {
    const uri = BE_CheckPin;
    const { userInfo, pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    console.log("SELECTED USER ==> ", userInfo);
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        user_id: userInfo.id,
        pin: `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("cek pin ==> ", responseJson);
        let result = responseJson;
        if (result.statusCode === 200) {
          this.setState({ showPin: false });
        } else {
          this.setState({
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: "",
            pin6: ""
          });
          alert(_salah_pin[this.state.languageIndex]);
        }
        //cb(result);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        //cb(null);
        this.setState({ showPin: false });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      //console.log("componentDidUpdate");
      BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
      this.setState({ disableAlertTable: false });
      this.setState({ loading: false });
      // setTimeout(() => {
      //   this.interval2 = setInterval(() => {
      //     this.getTableList();
      //     //alert("test")
      //   }, 15000);
      // }, 100);
    }
  }

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

  enableBluetooth() {
    BluetoothManager.enableBluetooth().then(
      r => {
        this.checkBluetooth();
      },
      err => {
        //alert(_bluetooth_tidak_aktif_2[this.state.languageIndex]);
      }
    );
  }

  checkBluetooth() {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        // alert(enabled); // enabled ==> true /false
        //console.log("Bluetooth Enabled ==> ", enabled);

        if (enabled === false) {
          //alert(_bluetooth_tidak_aktif[this.state.languageIndex]);
          this.enableBluetooth();
        } else {
          //alert("Bluetooth aktif");
          //this.getPrinterList();
          //this.InitializeCashlez();


          //disable dulu
          // if (this.state.cz_pin && this.state.cz_user) {
          //   this.InitializeCashlez();
          // }
          // this.enableBluetooth();

        }
      },
      err => {
        //alert(_bluetooth_tidak_aktif[this.state.languageIndex]);
      }
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

  getCommission() {
    // const retail_id = this.state.userInfo.retail_id;
    // const uri = `${BE_Commission}?business_id=${retail_id}`;
    // fetch(uri, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: this.state.auth
    //     //"Content-Type": "application/x-www-form-urlencoded"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     let result = responseJson;
    //     //console.log("responseJSON getPromoSpecial ==> ", result);
    //     if (result.statusCode === 200) {
    //       let resultData = result.data;
    //       let dataCommision = resultData;
    //       let dataFinal = [];
    //       console.log("dataCommision ===> ", dataCommision);
    //       dataCommision.map((v, i) => {
    //         let staff_id = JSON.parse(v.staff_id);
    //         console.log("v staff_id ===> ", staff_id);
    //         let data_staff = [];
    //         staff_id.map((val, index) => {
    //           let staff_name = v.staff_name;
    //           if (staff_id.length > 1) {
    //             staff_name = v.staff_name.split(", ");
    //           }
    //           let data_temp = {
    //             staff_id: val,
    //             staff_name: staff_id.length > 1 ? staff_name[index] : staff_name
    //           };
    //           data_staff.push(data_temp);
    //         });
    //         let total = v.total;
    //         let nominal = v.nominal;
    //         let commission_type = v.commission_type;
    //         let data_temp_commision = {
    //           data_staff: data_staff,
    //           staff_id: staff_id,
    //           total: total,
    //           nominal: nominal,
    //           commission_type: commission_type
    //         };
    //         dataFinal.push(data_temp_commision);
    //       });
    //       //OfflineMenuFunctions.SavePromoSpecial(resultData, x => {});
    //       console.log("dataFinal ===> ", dataFinal);
    //       this.setState({ dataCommision: dataFinal });
    //       let data_all_staff = [];
    //       dataFinal.map((v, i) => {
    //         v.data_staff.map((val, index) => {
    //           if (data_all_staff.length === 0) {
    //             data_all_staff.push(val);
    //           } else {
    //             let is_duplicate = false;
    //             data_all_staff.map((dv, indexv) => {
    //               if (dv.staff_id === val.staff_id) {
    //                 is_duplicate = true;
    //               }
    //             });
    //             if (!is_duplicate) {
    //               data_all_staff.push(val);
    //             }
    //           }
    //         });
    //       });
    //       console.log("data_all_staff ===> ", data_all_staff);
    //     } else {
    //     }
    //     //console.log('new data ==>', JSON.stringify(data))
    //   })
    //   .catch(_err => {
    //     console.log("ERR ==> ", _err);
    //   });
  }

  blibliGetDetailProduct(gdnSKU = "LIH-70023-00001-00001") {
    var parseString = require("react-native-xml2js").parseString;

    // var { parseString } = require ('xml2js');

    const base_uri =
      "https://api.blibli.com/v2/proxy/mta/api/businesspartner/v1/product/detailProduct";

    let uri_prefix = "";

    const requestId =
      "Lifetech-" +
      this.state.userInfo.gerai_id +
      "-" +
      moment(new Date()).format("YYYYMMDDHHmmss");

    uri_prefix = uri_prefix + "?requestId=" + requestId;

    const businessPartnerCode =
      "businessPartnerCode=" + this.state.blibli_store_id;

    uri_prefix = uri_prefix + "&" + businessPartnerCode;

    const paramSKU = "gdnSku=" + gdnSKU;

    const channelId = "channelId=" + blibli_channel_id;

    uri_prefix = uri_prefix + "&" + paramSKU;
    uri_prefix = uri_prefix + "&" + channelId;

    const uri = base_uri + uri_prefix;

    console.log("uri ===> ", uri);

    BlibliFunctions.GetBlibliTempDataDetailProduct(val => {
      console.log("Get Temp ===> ", val);
    });

    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "API-Seller-Key": this.state.blibli_auth,
        Authorization:
          "Basic bXRhLWFwaS1saWZldGVjaHRhbnBhYmF0LTdiY2ZiOm10YS1hcGktamx2bVdrWllnckg5SnZ2cE5tTEVvV0NmTEZ4d0h6MDNxaXRVVXo2S2ZxZlBTUFJaQnY="
      }
    })
      .then(response => response.text())
      .then(responseText => {
        var xml = responseText;

        // parseString(xml,function (err, result) {
        //     console.log("BLIBLI response test json ===> ", result.toString());
        // });
        //console.log("BLIBLI response get detail json ===> ", responseText);
        parseString(responseText, function(err, result) {
          try {
            //console.log("BLIBLI response dummy 1 ===> ", result);
            const res_temp1 = result.String;
            const res_temp2 = JSON.parse(res_temp1);
            //console.log("BLIBLI response get detail 2 ===> ", res_temp2);

            BlibliFunctions.SaveBlibliTempDataDetailProduct(
              res_temp2,
              val => {}
            );
            const requestId = res_temp2.requestId;
          } catch {
            console.log(err);
          }
        });

        //let obj = parse(responseText);
        //let fname = obj.person.fname;
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  blibliGetProduct() {
    const body = {
      buyable: false,
      page: 0,
      size: 10
    };

    var parseString = require("react-native-xml2js").parseString;

    // var { parseString } = require ('xml2js');

    const base_uri =
      "https://api.blibli.com/v2/proxy/mta/api/businesspartner/v2/product/getProductList";

    let uri_prefix = "";

    const requestId =
      "Lifetech-" +
      this.state.userInfo.gerai_id +
      "-" +
      moment(new Date()).format("YYYYMMDDHHmmss");

    uri_prefix = uri_prefix + "?requestId=" + requestId;

    const businessPartnerCode =
      "businessPartnerCode=" + this.state.blibli_store_id;

    uri_prefix = uri_prefix + "&" + businessPartnerCode;

    const username = "username=" + blibli_username;

    const channelId = "channelId=" + blibli_channel_id;

    uri_prefix = uri_prefix + "&" + username;
    uri_prefix = uri_prefix + "&" + channelId;

    const uri = base_uri + uri_prefix;

    // const uri =
    //   "https://api.blibli.com/v2/proxy/mta/api/businesspartner/v2/product/getProductList?requestId=Lifetech-3e0e6be1-1084-4b26-9e59-be3ebc9b01e9&businessPartnerCode=LIH-70023&username=hello@lifetech.co.id&channelId=Lifetech Tanpa Batas";

    console.log("uri ===> ", uri);
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "API-Seller-Key": this.state.blibli_auth,
        Authorization:
          "Basic bXRhLWFwaS1saWZldGVjaHRhbnBhYmF0LTdiY2ZiOm10YS1hcGktamx2bVdrWllnckg5SnZ2cE5tTEVvV0NmTEZ4d0h6MDNxaXRVVXo2S2ZxZlBTUFJaQnY="
      },
      body: JSON.stringify({ body })
    })
      .then(response => response.text())
      .then(responseText => {
        var xml = responseText;

        // parseString(xml,function (err, result) {
        //     console.log("BLIBLI response test json ===> ", result.toString());
        // });
        console.log("BLIBLI response test json ===> ", responseText);
        parseString(responseText, function(err, result) {
          try {
            //console.log("BLIBLI response dummy 1 ===> ", result);
            const res_temp1 = result.String;
            const res_temp2 = JSON.parse(res_temp1);
            console.log("BLIBLI response dummy 2 ===> ", res_temp2);
            const requestId = res_temp2.requestId;
          } catch {
            console.log(err);
          }
        });

        //let obj = parse(responseText);
        //let fname = obj.person.fname;
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });

    const content_example = {
      content: [
        {
          buyable: false,
          categoryCode: "HA-1000068",
          createdBy: null,
          createdDate: null,
          displayable: false,
          flags: [Object],
          gdnSku: "LIH-70023-00001-00001",
          id: null,
          image:
            "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-24411674/no_brand_paket_beetpos_1_full01_t2kh3z6v.jpg",
          isArchived: false,
          merchantSku: "BEETPOS-01",
          pickupPointCode: "PP-3265329",
          pickupPointName: "Lifetech",
          productItemCode: "MTA-24411674-00001",
          productName: "Paket Beetpos 1",
          productSku: "LIH-70023-00001",
          productType: "REGULAR",
          promoBundling: false,
          regularPrice: 3800000,
          review: false,
          sellingPrice: 3800000,
          stockAvailableLv1: 0,
          stockAvailableLv2: 50,
          stockReservedLv1: 0,
          stockReservedLv2: 0,
          storeId: null,
          synchronizeStock: false,
          updatedBy: null,
          updatedDate: 1632801864502,
          version: null,
          wholesalePriceActivated: null
        }
      ],
      errorCode: null,
      errorMessage: null,
      headers: null,
      pageMetaData: { pageNumber: 0, pageSize: 10, totalRecords: 1 },
      requestId: "72779486-d0ca-4054-8caf-30702d3b1d41",
      success: true
    };
  }

  testFetch(auth = this.state.auth) {
    const uri = BE_CheckPin;
    const { userInfo } = this.state;
    //console.log("SELECTED USER ==> ", userInfo);

    RNFetchBlob.config({
      trusty: true
    })
      .fetch(
        "POST",
        uri,
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          // this is required, otherwise it won't be process as a multipart/form-data request
          Authorization: this.state.auth
        },
        JSON.stringify({
          user_id: userInfo.id,
          pin: `123456`
        })
      )
      .then(resp => {
        let data = JSON.parse(resp.data);
        console.log("resp.data ===> ", data);
        console.log("resp.statusCode ===> ", data.statusCode);
        console.log("resp.message ===> ", data.message);
      });

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        user_id: userInfo.id,
        pin: `123456`
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("testfetch metode biasa responseJson ==> ", responseJson);
        let result = responseJson;

        //cb(result);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getCurrency(search = this.state.currencySearch) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    let search_query = "";
    if (search !== "") {
      search_query = `?name=${search}`;
    }
    let uri = `${BE_Currency}${search_query}`;

    //console.log("getCurrency URI ", uri);

    //console.log("this.state.auth ", this.state.auth);

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
        if (responseJson.statusCode === 200) {
          //this.setState({ currencyList: responseJson.data });
          RegionFunctions.SaveListCurrency(responseJson.data, val => {});
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });

    const business_id = this.state.userInfo.retail_id;
    uri = `${BE_Currency_Conversion}?business_id=${business_id}`;





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
        if (responseJson.statusCode === 200) {
          //this.setState({ currencyList: responseJson.data });
          console.log("CURRENCY CONVERSION =====> ", responseJson.data);
          RegionFunctions.SaveListCurrencyConversion(
            responseJson.data,
            val => {}
          );
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getSalesTypeProduct() {
    const business_id = this.state.userInfo.retail_id;

    let uri_latest_date = `${BE_Sales_Type_Product}/last-update?business_id=${business_id}&product_id=1`;
    fetch(uri_latest_date, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          "BE_Sales_Type_Product_LATEST_UPDATE =====> ",
          responseJson
        );

        if (responseJson.statusCode === 200) {
          //this.setState({ currencyList: responseJson.data });
          // RegionFunctions.SaveListSalesTypeProduct(
          //   responseJson.data,
          //   val => {}
          // );
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });

    let uri = `${BE_Sales_Type_Product}?business_id=${business_id}`;
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
        console.log("BE_Sales_Type_Product =====> ", responseJson);

        if (responseJson.statusCode === 200) {
          //this.setState({ currencyList: responseJson.data });
          RegionFunctions.SaveListSalesTypeProduct(
            responseJson.data,
            val => {}
          );
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  componentDidMount() {
    CashlezFunctions.SaveCashlezData("invalid", cb => {});

    this.interval = setInterval(() => {
      if (this.state.dataAds)
      {
        let selectedAds = this.state.selectedAds;
        if (this.state.paginationAds.total_records === (selectedAds + 1))
        {
          this.setState({selectedAds:0});
        }
        else
        {
          this.setState({selectedAds:selectedAds + 1});
        }
      }


      //alert("test")
    }, 5000);

    var epoch_time = 1632801179052;

    var date_conversion = DateTimeFunctions.convertFromEpoch(epoch_time);

    var epoch_conversion = DateTimeFunctions.convertToEpoch(new Date());


    // console.log("test convert date time ====> ", date_conversion);

    // console.log("test convert from epoch ====> ", epoch_conversion);

    // var xml_dummy =
    //   '<?xml version="1.0" encoding="UTF-8"?><String>{"requestId":"Lifetech-3e0e6be1-1084-4b26-9e59-be3ebc9b01e9","headers":null,"errorMessage":null,"errorCode":null,"success":true,"content":[{"id":null,"storeId":null,"createdDate":null,"createdBy":null,"updatedDate":1632801864502,"updatedBy":null,"version":null,"gdnSku":"LIH-70023-00001-00001","productSku":"LIH-70023-00001","productName":"Paket Beetpos 1","productItemCode":"MTA-24411674-00001","merchantSku":"BEETPOS-01","regularPrice":3800000.0,"sellingPrice":3800000.0,"stockAvailableLv1":0,"stockReservedLv1":0,"stockAvailableLv2":50,"stockReservedLv2":0,"productType":"REGULAR","pickupPointCode":"PP-3265329","pickupPointName":"Lifetech","displayable":false,"buyable":false,"image":"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-24411674/no_brand_paket_beetpos_1_full01_t2kh3z6v.jpg","synchronizeStock":false,"promoBundling":false,"isArchived":false,"categoryCode":"HA-1000068","wholesalePriceActivated":null,"review":false,"flags":{"preOrder":false}}],"pageMetaData":{"pageSize":10,"pageNumber":0,"totalRecords":1}}</String>';

    // parseString(xml_dummy, function(err, result) {
    //   console.log("BLIBLI response dummy 1 ===> ", result.String);
    //   const res_temp1 = result.String;
    //   const res_temp2 = JSON.parse(res_temp1);
    //   console.log("BLIBLI response dummy 2 ===> ", res_temp2);
    //   const requestId = res_temp2.requestId;
    // });

    //LogBox.disableAlertTable
    //LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    //LogBox.ignoreAllLogs();//Ignore all log notifications
    //console.log("USER info ==> ", this.state.userInfo);

    // const test_string = "mta-api-lifetechtanpabat-7bcfb:mta-api-jlvmWkZYgrH9JvvpNmLEoWCfLFxwHz03qitUUz6KfqfPSPRZBv";
    // const string_encoded = EncodeFunctions.encode(test_string);
    // const string_decode = EncodeFunctions.decode(string_encoded);

    // console.log("Testing function encode ===> ", string_encoded);
    // console.log("Testing function decode ===> ", string_decode);

    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

    // PrinterFunctions.GetTokopediaStoreID(v => {
    //   if (v) {
    //     this.setState({ tokopedia_store_id: v });
    //   }
    // });

    PrinterFunctions.GetSubscriptionType(v => {
      if (v) {
        this.setState({ sub_type: v });
      }
    });

    LoginFunctions.GetMainMenu(v => {
      if (v) {
        this.setState({ listFilteredMenu: v });
      }
    });

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

    LoginFunctions.GetPreviliges(val2 => {
      this.setPreviliges(val2);
    });

    //this.checkBluetooth();

    LoginFunctions.LoginInformation(val => {
      //console.log("dari login ", val);
      if (val) {
        this.setState({ userInfo: val });
      }

      const business_id = this.state.userInfo.retail_id;
      const outlet_id = this.state.userInfo.gerai_id;

      AdsFunctions.GetAdsList(business_id,outlet_id, true, "newest", 1, 9999, ads_list => {
        console.log("GetAdsList ======== >>>>> ", ads_list.data[this.state.selectedAds]);
        console.log("GetAdsList ======== >>>>> ", ads_list.pagination);

        this.setState({dataAds: ads_list.data, paginationAds: ads_list.pagination});

        // dataAds: null,
        // selectedAds: 0,
        // paginationAds: null
      });

    });

    LoginFunctions.AuthToken(val => {
      //console.log("auth token ==> ", val);
      this.setState({
        auth: val
      });

      this.getCommission();
      this.checkToken(val);
      this.setPreviliges_Version2(val);
      this.getBusinessData(val);
      this.getSalesTypeProduct();
      setTimeout(() => {
        this.getUserInfo(val);
        //this.testFetch(val);
      }, 1500);
      setTimeout(() => {
        this.getOutletData(val);
        this.getCurrency();
      }, 100);
      setTimeout(() => {
        this.beetposSettings(val);
      }, 3000);

      // this.BEAttendanceInformation(this.state.userInfo.id);asd
    });

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    RegionFunctions.GetSettingKitchenManagement(val => {
      if (val) {
        this.setState({ allowKitchenManagement: val });
      }
    });

    // setTimeout(() => {
    //   PrinterFunctions.GetMainPrinter(val => {
    //     if (val) {
    //       console.log("Main Kitchen ==> ", val);
    //       this.setState({ printer_main: val });
    //       this.connectPrinter(val.address);
    //       setTimeout(() => {
    //         this.print("main");
    //       }, 1000)
    //     }
    //   });
    // }, 2500);

    // setTimeout(() => {
    //   PrinterFunctions.GetKitchenPrinter(val => {
    //     if (val) {
    //       console.log("Printer Kitchen ==> ", val);
    //       this.setState({ printer_kitchen: val });
    //       this.connectPrinter(val.address);
    //       setTimeout(() => {
    //         this.print("kitchen");
    //       }, 1000)
    //     }
    //   });
    // }, 5000);

    //this.setPreviliges();
    this.getRekap();

    //if (this.state.userInfo.id)
    // this.enableBluetooth();
  }

  beetposSettings(token = this.state.auth) {
    const uri = BE_Beetpos_Setting;

    const settings_version = settings_latest_version;

    const current_version = parseInt(beetpos_version_code);

    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("DATA Settings ==> ", responseJson);

        if (responseJson.statusCode === 200) {
          //OfflineMenuFunctions.SaveOutletAddress(services, val => {});
          responseJson.data.map((v, i) => {
            if (v.name === settings_version) {
              const get_version = parseInt(v.value);
              if (current_version >= get_version) {
                // console.log(
                //   "Version is same or greater than current version ==> ",
                //   current_version
                // );
                // console.log("Version is same get_version ==> ", get_version);
              } else {
                alert(_update_alert[this.state.languageIndex]);

                setTimeout(() => {
                  Linking.openURL(beetpos_playstore);
                }, 500);
              }
            }

            if (v.name === settings_papa_recepi) {
              SettingsFunctions.SavePapaRecepiId(v.value, () => {});
            }
          });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getSessionTime() {
    const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});
  }

  getOutletData(token = this.state.auth) {
    let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Outlet + outlet_id;

    //console.log("GET DATA OUTLET");
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log("DATA OUTLET ==> ", responseJson);

        //console.log("DATA OUTLET ==> ", responseJson.Outlet_Taxes);

        if (responseJson.statusCode === 200) {
          const tokopedia_store_id = responseJson.data.tokopedia_store_id;

          PrinterFunctions.SaveTokopediaStoreID(
            tokopedia_store_id,
            result => {}
          );

          let data_tax = [];

          let tax = 0;
          let services = 0;
          data_tax = responseJson.data.Outlet_Taxes;

          PrinterFunctions.SaveOutletData(responseJson.data, result => {});
          this.setState({
            // tokopedia_store_id: tokopedia_store_id,
            cz_pin_outlet: responseJson.data.cz_pin,
            cz_user_outlet: responseJson.data.cz_user
          });
          let phone = "";

          if (responseJson.data.phone_number) {
            phone = responseJson.data.phone_number;
          }
          //console.log("DATA TAX ==> ", data_tax);

          data_tax.map((v, i) => {
            //console.log("map ", v.Tax);
            const item = v.Tax;
            const value = item.value / 100;
            const tax_type = item.Tax_Type.name;

            if (tax_type === "Tax") {
              tax = value;
            }

            if (tax_type === "Charge") {
              services = value;
            }
          });

          //console.log("save tax rate ===> ", tax);
          //console.log("save serv rate ===> ", services);

          OfflineMenuFunctions.SaveTaxRate(tax, val => {});
          OfflineMenuFunctions.SavePhoneNumber(phone, val => {});
          OfflineMenuFunctions.SaveServiceRate(services, val => {});

          const address = responseJson.data.address;

          let userInfo_temp = this.state.userInfo;

          userInfo_temp.restaurant_address = address;

          LoginFunctions.UpdateLoginInformation(userInfo_temp, val => {});

          this.setState({ userInfo: userInfo_temp });

          if (
            responseJson.data.blibli_store_id &&
            responseJson.data.blibli_auth
          ) {
            this.setState({
              blibli_auth: responseJson.data.blibli_auth,
              blibli_store_id: responseJson.data.blibli_store_id
            });
            setTimeout(() => {
              //this.blibliGetProduct();
              //this.blibliGetDetailProduct();
            }, 100);
          }

          //OfflineMenuFunctions.SaveOutletAddress(services, val => {});

          // console.log("tax ", tax);
          // console.log("services ", services);
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        //this.setState({ serverDown: true });
        //alert(_server_down[this.state.languageIndex]);
      });
  }

  connectPrinter(address) {
    BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          console.log("connect ==> ", s);
        },
        e => {}
      );
  }

  async print(text) {
    BluetoothEscposPrinter.printText(`${text}\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1
    });
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
          //console.log("getDataTable ==> ", resultData);
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
        //console.log("ERR table List ==> ", _err);
      });
  }

  getRekap() {
    let date_start = moment(new Date())
      .add(-3000, "days")
      .format("YYYY-MM-DD 00:00");

    let date_end = moment(new Date()).format("YYYY-MM-DD 23:59");

    //let uri = `${GetRekapAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&date_start=${date_start}&date_end=${date_end}&search=&page=1&search=${search}`;

    // let uri = `${BE_Rekap}?date_start=${date_start}&date_end=${date_end}`;
    let uri = `${BE_Rekap}?limit=1`;

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
            //console.log("ERR Attendance Info ==> ", _err);
          });
      } else {
        OfflineAttendanceFunctions.GetTempAttendance(val => {
          //console.log("get Temp Attendance ==> ", val);
          if (val) {
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
          }
        });
      }
    });
    //}
  }

  getBusinessData(val = this.state.auth) {
    const uri = BE_Business + this.state.userInfo.retail_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: val
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log(
        //   "responseJson getBusinessData ===> ",
        //   responseJson.data.Subscription.subscription_partition_id
        // );

        if (responseJson.statusCode === 200) {
          PrinterFunctions.SaveBusinessData(responseJson.data, result => {});

          PrinterFunctions.SaveBusinessSubscriptionType(
            responseJson.data.Subscription.subscription_partition_id,
            result => {}
          );

          this.setState({
            sub_type: responseJson.data.Subscription.subscription_partition_id,
            cz_pin: responseJson.data.cz_pin,
            cz_user: responseJson.data.cz_user
          });
          setTimeout(() => {

            DeviceInfo.getApiLevel().then(level => {
              if (level) {
                console.log("getApiLevel ====> ", level);
                if(level < 99)
                {
                  this.checkBluetooth();
                 
                }
              }
            });


            // this.checkBluetooth();
          }, 666);

          const image_uri = BE_URI + responseJson.data.image;
          const currency = responseJson.data.Currency
            ? responseJson.data.Currency.name
            : "Rp.";

          const currency_id = responseJson.data.Currency.id
            ? responseJson.data.Currency.id
            : 1;

          console.log("business data ===> ", responseJson.data.Currency);
          //console.log("SAVE image_uri ===> ", image_uri);

          PrinterFunctions.GetImageURI(val => {
            if (val !== image_uri) {
              PrinterFunctions.SaveImageURI(image_uri, result => {});
              this.convertImageBase64(image_uri);
            }
          });

          RegionFunctions.ChangeCurrency(currency, val => {});

          RegionFunctions.ChangeCurrencyId(currency_id, val => {});
        }
      })
      .catch(_err => {
        //console.log("ERR Check Token ==> ", _err);
      });
  }

  getUserInfo(val = this.state.auth) {
    const uri = BE_Get_User + this.state.userInfo.id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: val
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.statusCode === 200) {
          // console.log(
          //   "responseJson getUserInfo ===> ",
          //   responseJson.data.device
          // );
          // console.log(
          //   "device_id userinfo ====> ",
          //   this.state.userInfo.id
          // );

          let device_id_data = responseJson.data.device;
          let device_id_local = this.state.userInfo.device_id;
          // console.log(
          //   "device_id compare ====> ",
          //   device_id_data === device_id_local
          // );


          // Disable dulu
          // if (device_id_data === device_id_local) {
          // } else {
          //   if (device_id_data) {
          //     alert(_login_device_other[this.state.languageIndex]);
          //     this.logoutActionOtherDevice();
          //   }
          // }
        }
      })
      .catch(_err => {
        //console.log("ERR Check Token ==> ", _err);
      });
  }

  convertImageBase64(uri) {
    //console.log("convertImageBase64 uri ", uri);
    let imagePath = null;
    const fs = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true
    })
      .fetch("GET", uri)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile("base64");
      })
      .then(base64Data => {
        // here's base64 encoded image
        //console.log(base64Data);
        PrinterFunctions.SaveImageBase64(base64Data, result => {});
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  }

  setPreviliges_Version2(val = this.state.auth) {
    const uri = BE_Role + this.state.userInfo.role_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: val
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("responseJson setPreviliges_Version2 ===> ", responseJson);
        if (responseJson.statusCode === 200) {
          const data = responseJson.data;
          let temp_list = [];
          if (data.Role_Privileges)
          {
            data.Role_Privileges.map(item => {
              const temp_data = {
                name: item.Privilege.name
                  .split(" ")
                  .join("_")
                  .toLowerCase(),
                access: item.Privilege.Access.name,
                allow: item.allow
              };
  
              temp_list.push(temp_data);
            });
          }


          //console.log("temp_list ===> ", temp_list);

          let userInfo = this.state.userInfo;
          userInfo.privileges = temp_list;

          LoginFunctions.SetPreviliges(temp_list, response => {
            //this.setPreviliges();
          });

          LoginFunctions.Login(userInfo, response => {
            this.setPreviliges();
          });
        } else {
          this.setPreviliges();
          //this.logoutAction();
        }
      })
      .catch(_err => {
        //console.log("ERR Check Token ==> ", _err);
      });
  }

  setPreviliges(privileges = this.state.userInfo.privileges) {
    const { userInfo, listAllMenu } = this.state;
    //console.log("user Info ===> ", userInfo);
    this.setState({ business_type: userInfo.business_type });
    //let privileges = userInfo.privileges;
    console.log("privileges XXX ===> ", privileges);

    let temp_list_data = listAllMenu;

    // if (userInfo.business_type === "Restaurant") {
    //   //temp_list_data[1].available = true;
    //   //temp_list_data[6].available = true;
    //   temp_list_data[7].available = true;
    // } else {
    //   temp_list_data[7].available = true;
    // }

    if (privileges)
    {

      privileges.map((v, i) => {
        if (
          v.name === "cashier_transaction" &&
          v.allow === true &&
          v.access === "Cashier"
        ) {
          temp_list_data[0].available = true; //pesanan baru, 
          temp_list_data[8].available = true;
          temp_list_data[9].available = true;
          temp_list_data[10].available = true;
          temp_list_data[11].available = true;
          temp_list_data[12].available = true;

  
          this.setState({ access_cashier_transaction: true });
        }
  
        if (v.name === "booking" && v.allow === true && v.access === "Cashier") {
          temp_list_data[6].available = true;
          //temp_list_data[0].available = true;
          this.setState({ access_cashier_booking: true });
        }
  
        if (
          v.name === "cash_recap" &&
          v.allow === true &&
          v.access === "Cashier"
        ) {
          temp_list_data[4].available = true;
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
          temp_list_data[3].available = true;
  
          this.setState({ access_view_history_transaction: true });
        }
  
        if (
          v.name === "customer_management" &&
          v.allow === true &&
          v.access === "Cashier"
        ) {
          temp_list_data[2].available = true;
  
          this.setState({ access_customer_management: true });
        }
  
        if (
          v.name === "product_management" &&
          v.allow === true &&
          v.access === "Cashier"
        ) {
          temp_list_data[5].available = true;
  
          this.setState({ access_product_management: true });
        }
  
        if (
          v.name === "online_order" &&
          v.allow === true &&
          v.access === "Cashier"
        ) {
          temp_list_data[7].available = true;
  
          this.setState({ access_online_order: true });
        }
  
        if (
          v.name === "order_management" &&
          v.allow === true &&
          v.access === "Cashier"
        ) {
          temp_list_data[1].available = true;
          if (userInfo.business_type === "Restaurant") {
            //temp_list_data[6].available = true;
            //temp_list_data[7].available = true;
          } else {
            //temp_list_data[7].available = true;
          }
  
          this.setState({ access_order_management: true });
        }
  
        if (
          v.name === "attendance_management" &&
          v.allow === true &&
          v.access === "Cashier"
        ) {
          //temp_list_data[1].available = true;
          this.setState({ access_attendance_management: true });
        }
      });

      

    //temp_list_data[5].available = true;

    //temp_list_data[8].available = true; //pengaturan

    //temp_list_data[9].available = true; //absensi

    let temp_list_data_filtered = [];

    //console.log("temp_list_data ===> ", temp_list_data);

    temp_list_data.map((v, i) => {
      if (v.available === true) {
        temp_list_data_filtered.push(v);
      }
    });

    console.log("temp_list_data_filtered ===> ", temp_list_data_filtered);

    LoginFunctions.SetMainMenu(temp_list_data_filtered, v => {});
    setTimeout(() => {
      this.setState({
        privileges: privileges,
        listFilteredMenu: temp_list_data_filtered,
        loading: false
      });
    }, 100);

    }

  }

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

    clearInterval(this.interval);

    clearInterval(this.interval2);
  }

  checkToken(token) {
    //let outlet_id = this.state.userInfo.gerai_id;
    const uri_test = "http://api.beetpos.com/api/v1/sales-type/";
    const uri = BE_Sales_Type;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("CHECK TOKEN ??? ", responseJson);
        if (responseJson.statusCode === 403) {
          //alert("Authorization timed out!");
          //this.logoutAction();
        }
      })
      .catch(_err => {
        // console.log("ERR Check Token ==> ", _err);
        this.setState({ serverDown: true });
        // alert(_server_down[this.state.languageIndex]);
      });
  }

  logoutAction() {
    this.setState({ loading: true });
    LoginFunctions.Logout(val => {
      if (val) {
        setTimeout(() => {
          Actions.pop();
          Actions.pop();

          //console.log("logout ===> ", true);
          this.setState({ loading: false, mount: false });

          BackHandler.removeEventListener(
            "hardwareBackPress",
            this.onBackPress
          );

          Actions.MobileLoginOld({
            logout: true,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex
          });
        }, 100);
      }
    });
  }

  logoutActionOtherDevice() {
    this.setState({ loading: true });
    LoginFunctions.LogoutDevice(val => {
      if (val) {
        setTimeout(() => {
          Actions.pop();
          Actions.pop();

          //console.log("logout ===> ", true);

          this.setState({ loading: false, mount: false });

          BackHandler.removeEventListener(
            "hardwareBackPress",
            this.onBackPress
          );

          Actions.MobileLoginOld({
            logout: true,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex
          });
        }, 100);
      }
    });
  }

  render_menu_1() {
    return (
      <View
        style={{
          width: "33%"
          //display: this.state.access_cashier_transaction ? "flex" : "none"
        }}
      >
        <Button
          style={{
            //width: "33%",
            alignSelf: "center",
            alignItems: "center"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {
              Actions.MobileHomeTablet({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            } else {
              //Actions.MobileHomeTablet({
              Actions.MobileHomePage({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              {this.state.business_type === "Restaurant" ? (
                <MaterialIcons
                  name="restaurant-menu"
                  size={27}
                  style={{
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              ) : (
                <View />
              )}
            </View>
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
            {_menu_1[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_2() {
    return (
      <View
        style={{
          width: "33%"
          // display:
          //   this.state.access_cashier_transaction &&
          //   this.state.business_type === "Restaurant"
          //     ? "flex"
          //     : "none"
        }}
      >
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            Actions.MobileMeja({
              auth: this.state.auth,
              userInfo: this.state.userInfo,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <MaterialCommunityIcons
                name="table"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_3() {
    return (
      <View
        style={{
          width: "33%"
          //display: this.state.access_customer_management ? "flex" : "none"
        }}
      >
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {
              Actions.MobileManagementTablet({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            } else {
              // Actions.MobileManagement({
              Actions.MobileManagement({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <FontAwesome
                name="user-circle"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_4() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center"
            // display: this.state.access_view_history_transaction
            //   ? "flex"
            //   : "none"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            ); ///
            if (this.state.tablet) {
              Actions.MobileHistoryTablet({
                //Actions.MobileHistory({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            } else {
              Actions.MobileHistory({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <MaterialCommunityIcons
                name="history"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_5() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center"
            //display: this.state.access_cash_recap ? "flex" : "none"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {
              Actions.MobileRekapTablet({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            } else {
              Actions.MobileRekap({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <MaterialCommunityIcons
                name="notebook"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_6() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center",
            display: this.state.access_product_management ? "flex" : "none"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {
              Actions.MobileProductTablet({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            } else {
              Actions.MobileProduct({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <FontAwesome
                name="tags"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_7() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center",
            display: "flex"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
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
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30,
              }}
            >
              <Entypo
                name="clock"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_8() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center",
            display: "flex"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
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
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <Entypo
                name="shopping-basket"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_9() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{ alignItems: "center", alignSelf: "center" }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
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
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <Ionicons
                name="md-settings"
                size={25}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_10() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{ alignItems: "center", alignSelf: "center" }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            Actions.MobileAbsensi({
              auth: this.state.auth,
              userInfo: this.state.userInfo,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <MaterialCommunityIcons
                name="calendar"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
    );
  }

  render_menu_entrance() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{ alignItems: "center", alignSelf: "center" }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            Actions.MobileEntrance({
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
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              padding: 15,
              borderRadius: 30
            }}
          >
            <MaterialCommunityIcons
              name="ticket-account"
              size={27}
              style={{
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
            Entrance System
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_11() {
    return (
      <View
        style={{
          width: "33%"
          //display: this.state.access_cashier_transaction ? "flex" : "none"
        }}
      >
        <Button
          style={{
            //width: "33%",
            alignSelf: "center",
            alignItems: "center"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {
              Actions.MobileHomeTablet({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
                direct_payment: true
              });
            } else {
              //Actions.MobileHomeTablet({
              Actions.MobileHomePage({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
                direct_payment: true
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
          <View
            style={{
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              padding: 15,
              borderRadius: 30
            }}
          >
            {this.state.business_type === "Restaurant" ? (
              <MaterialCommunityIcons
                name="cash-register"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            ) : (
              <View />
            )}

            {this.state.business_type === "Retail" ? (
              <MaterialCommunityIcons
                name="cash-register"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            ) : (
              <View />
            )}

            {this.state.business_type === "Service" ? (
              <MaterialCommunityIcons
                name="cash-register"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            ) : (
              <View />
            )}
          </View>
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
            {_menu_11[this.state.languageIndex]}
            {/* Direct Payment */}
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_12() {
    return (
      <View
        style={{
          width: "33%"
          //display: this.state.access_cashier_transaction ? "flex" : "none"
        }}
      >
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center",
            display: "flex"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {
              // Actions.MobileKitchenManagement({
              Actions.MobileKitchen({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
                // direct_payment: true
              });
            } else {
              //Actions.MobileHomePage({
              // Actions.MobileKitchenManagement({
              Actions.MobileKitchen({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
                // direct_payment: true
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
          <View
            style={{
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              padding: 15,
              borderRadius: 30
            }}
          >
            {this.state.business_type === "Restaurant" ? (
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            ) : (
              <View />
            )}

            {this.state.business_type === "Retail" ? (
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            ) : (
              <View />
            )}

            {this.state.business_type === "Service" ? (
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            ) : (
              <View />
            )}
          </View>
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
            {_menu_12[this.state.languageIndex]}
            {/* Kitchen Management */}
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_13() {
    return (
      <View
        style={{
          width: "33%"
          //display: this.state.access_cashier_transaction ? "flex" : "none"
        }}
      >
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center",
            display: "flex"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {
              
              Actions.MobileTokopediaChat({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
                tokopedia_store_id: this.state.tokopedia_store_id
                // direct_payment: true
              });
            } else {
              
              Actions.MobileTokopediaChat({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
                tokopedia_store_id: this.state.tokopedia_store_id
                // direct_payment: true
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <Entypo
                name="chat"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
            {_menu_13[this.state.languageIndex]}
            {/* Kitchen Management */}
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_14() {
    return (
      <View
        style={{
          width: "33%"
          //display: this.state.access_cashier_transaction ? "flex" : "none"
        }}
      >
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center",
            display: "flex"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {

              Actions.MobileTokopediaOrder({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
                tokopedia_store_id: this.state.tokopedia_store_id
                // direct_payment: true
              });
            } else {
              Actions.MobileTokopediaOrder({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
                tokopedia_store_id: this.state.tokopedia_store_id
                // direct_payment: true
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <Entypo
                name="shop"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
            {_menu_14[this.state.languageIndex]}
            {/* Kitchen Management */}
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_15() {
    return (
      <View
        style={{
          width: "33%"
          //display: this.state.access_cashier_transaction ? "flex" : "none"
        }}
      >
        <Button
          style={{
            //width: "33%",
            alignItems: "center",
            alignSelf: "center",
            display: "flex"
          }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            if (this.state.tablet) {

              Actions.MobileProductKios({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
                tokopedia_store_id: this.state.tokopedia_store_id
                // direct_payment: true
              });
            } else {
              Actions.MobileProductKios({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
                tokopedia_store_id: this.state.tokopedia_store_id
                // direct_payment: true
              });
            }
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                padding: 15,
                borderRadius: 30
              }}
            >
              <FontAwesome5Icon
                name="sim-card"
                size={27}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </View>
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
            {_menu_15[this.state.languageIndex]}
            {/* Kitchen Management */}
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_testing() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{ alignItems: "center", alignSelf: "center" }}
          onPress={() => {
            //clearInterval(this.interval2);
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackPress
            );
            // Actions.TestingDualScreen({
            //   auth: this.state.auth,
            //   userInfo: this.state.userInfo,
            //   colorIndex: this.state.colorIndex,
            //   languageIndex: this.state.languageIndex
            // });

            Actions.MobileGobizTransaction({
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
              backgroundColor: WHITE,
              elevation:1,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor:"#EEEEEE",
            }}
            >
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
            Gobiz Transaction - Testing
          </Text>
        </Button>
      </View>
    );
  }

  mainContent() {
    let { width, height } = Dimensions.get("window");
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          marginTop: this.state.tablet ? "-5%" : "-30%",
          backgroundColor: "Transparent",
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
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
              // borderColor: "#DADADA",
              paddingBottom: 5,
              borderBottomWidth: 0,
              flexDirection: "row",
              width: "100%"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 16,
                  color: WHITE
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
                    color: WHITE
                  }
                ]}
              >
                {_pos[this.state.languageIndex]}
              </Text>
            </View>
            {this.renderFlatListMenu()}

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
              <View style={{ width: "33%", display: "none" }}>
                <Button
                  style={{ alignItems: "center", alignSelf: "center" }}
                  onPress={() => {
                    // clearInterval(this.interval2);
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

              {this.render_menu_9()}
                    {/* {this.render_menu_2()} */}
              {/* {this.render_menu_testing()} */}

              {this.state.access_attendance_management ? (
                this.render_menu_10()
              ) : (
                <View />
              )}
              {/* {this.state.userInfo.retail_id === 1 ? (
                this.render_menu_entrance()
              ) : (
                <View />
              )} */}
            </View>
            <View>
            {/* {this.state.dataAds ?   
            (
            <Button 
              style = {{
                width: "100%",
                flex: 1,
                height: 250
              }}f
              onPress={() => {
              let selectedAds = this.state.selectedAds;
              if (this.state.paginationAds.total_records === (selectedAds + 1))
              {
                this.setState({selectedAds:0});
              }
              else
              {
                this.setState({selectedAds:selectedAds + 1});
              }
            }}>
              <AdsImage
                resizeMethod="resize"
                style={{
                  width: "100%",
                  height: "100%",
                  //borderRadius: 15,
                  overflow: "hidden",
                  //display: this.state.setting_light_mode ? "none" : "flex"
                  //alignSelf: "center"
                  //backgroundColor: "#888"
                }}
                resizeMode={"stretch"}
                source={{ uri: BE_URI + this.state.dataAds[this.state.selectedAds].uri}}
              />
            </Button>
            ):(<View />)
            } */}
            </View>
            {/* <DualMonitorGeneral state={this.state} /> */}
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
    //console.log("PDF ===> ", file);
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

  renderFlatListMenu() {
    return (
      <FlatList
        style={{
          flex: 1
          //backgroundColor: '#BCA',
          //paddingTop: 5,
          //paddingBottom: 5
        }}
        columnWrapperStyle={{
          //justifyContent: "space-between"
          marginTop: 5,
          marginBottom: 5
          //marginBottom: 5,
          //justifyContent:"center",
          //marginBottom: 5
        }}
        //ListHeaderComponent={this.renderSearch()}
        showsVerticalScrollIndicator={false}
        data={this.state.listFilteredMenu}
        renderItem={({ item, index }) => {
          return this.renderDetailMenu(item, index);
        }}
        //ListFooterComponent={this._renderFooter}
        numColumns={3}
        keyExtractor={(item, index) => {
          return "ListMenu" + index.toString();
        }}
        //onRefresh={this._onRefresh}
        //onEndReached={this.handleLoadMore}
        //onEndReachedThreshold={0.5}
        //refreshing={refreshing}
      />
    );
  }

  renderDetailMenu(item, index) {
    if (item.id === 1) {
      return this.render_menu_1();
    }
    // if (item.id === 1) {
    //   return this.render_menu_11();
    // }

    if (item.id === 2) {
      return this.render_menu_2();
    }

    if (item.id === 3) {
      return this.render_menu_3();
    }

    if (item.id === 4) {
      return this.render_menu_4();
    }

    if (item.id === 5) {
      return this.render_menu_5();
    }

    if (item.id === 6) {
      return this.render_menu_6();
    }

    if (item.id === 7) {
      // return this.render_menu_7();
    }

    if (item.id === 10) {
      if (
        this.state.business_type === "Restaurant" ||
        this.state.userInfo.gerai_id === 1
      ) {
        if (this.state.allowKitchenManagement) {
          return this.render_menu_12();
        }
      }
    }

    if (item.id === 11) {
      if (this.state.tokopedia_store_id) {
        return this.render_menu_13();
      }
    }

    if (item.id === 12) {
      if (this.state.tokopedia_store_id) {
        return this.render_menu_14();
      }
    }

    if (item.id === 13) {
      if (this.state.allow_kios_transaction) {
        return this.render_menu_15();
      }
    }

    if (item.id === 9) {
      //return this.render_menu_9();
      return this.render_menu_11();
    }

    // if (item.id === 8) {
    //   return this.render_menu_8();
    // }

    if (item.id === 99) {
      return this.render_menu_10();
    }
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
        

        {this.state.showPin ? (
          <MobilePinPad
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.languageIndex}
            pin1={this.state.pin1}
            pin2={this.state.pin2}
            pin3={this.state.pin3}
            pin4={this.state.pin4}
            pin5={this.state.pin5}
            pin6={this.state.pin6}
            changePin={(value, command) => {
              let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
              if (command === "input") {
                let fullPin = false;
                if (pin1 === "") {
                  pin1 = value;
                } else if (pin2 === "") {
                  pin2 = value;
                } else if (pin3 === "") {
                  pin3 = value;
                } else if (pin4 === "") {
                  pin4 = value;
                } else if (pin5 === "") {
                  pin5 = value;
                } else if (pin6 === "") {
                  pin6 = value;
                  fullPin = true;
                } else {
                  fullPin = true;
                }

                if (fullPin === false) {
                  this.setState({
                    pin1: pin1,
                    pin2: pin2,
                    pin3: pin3,
                    pin4: pin4,
                    pin5: pin5,
                    pin6: pin6
                  });
                } else {
                  //alert("full pin");
                  this.setState({
                    pin6: pin6
                  });
                  //this.absensiClockInOut(this.state.action);
                  this.checkPin();
                }
              }

              if (command === "delete") {
                let deletedPin = true;
                if (pin6 !== "") {
                  pin6 = "";
                } else if (pin5 !== "") {
                  pin5 = "";
                } else if (pin4 !== "") {
                  pin4 = "";
                } else if (pin3 !== "") {
                  pin3 = "";
                } else if (pin2 !== "") {
                  pin2 = "";
                } else if (pin1 !== "") {
                  pin1 = "";
                } else {
                  deletedPin = false;
                }
                if (deletedPin === true) {
                  this.setState({
                    pin1: pin1,
                    pin2: pin2,
                    pin3: pin3,
                    pin4: pin4,
                    pin5: pin5,
                    pin6: pin6
                  });
                }
              }

              if (command === "clear") {
                this.setState({
                  pin1: "",
                  pin2: "",
                  pin3: "",
                  pin4: "",
                  pin5: "",
                  pin6: ""
                });
              }
            }}
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
        {/* <Loading /> */}

        <MobileHeader
          bgColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
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
        {this.state.showExit ? this.renderExitMessage() : <View />}
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


          <View style={{ flex: this.state.tablet ? 0.25 : 0.34 }}>
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
                resizeMode: "stretch"
              }}
              source={require("../../Images/Kont1.png")}
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
                      color: WHITE
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
                        color: WHITE
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
                        color: WHITE
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
                        color: WHITE
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
                        color: WHITE
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
                  flexDirection: "row",
                  display: "none"
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: WHITE
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
                        color: WHITE
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
                        color: WHITE
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
                        color: WHITE
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
                  flexDirection: "row",
                  display: "none"
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: WHITE
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
                        color: WHITE
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
              flex: this.state.tablet ? 0.75 : 0.66,
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
