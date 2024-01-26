/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";

import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  StatusBar,
  Button as ButtonDefault,
  FlatList,
  ImageDefault,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  BackHandler,
  //NetInfo
  LogBox
} from "react-native";

// LogBox.ignoreAllLogs(true);

import NetInfo from "@react-native-community/netinfo";
import Checkbox from "../../Components/Checkbox";

// import GestureRecognizer from "react-native-swipe-gestures";
import MainStyle from "../../Styles";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";
import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import PrinterFunctions from "../../Libraries/PrinterFunctions";

import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import TransactionNewName from "../../Components/TransactionNewName";

import Loading from "../../Components/MobileLoading";

import CustomAlert from "../../Components/MobileCustomAlert";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Feather from "react-native-vector-icons/Feather";

import FontAwesome from "react-native-vector-icons/FontAwesome";
//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Geolocation from "@react-native-community/geolocation";
// import Orientation from "react-native-orientation-locker";
// eslint-disable-next-line prettier/prettier
import ClearCart from "../../Components/MobileClearCart";

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
  WHITE,
  BLACK,
  RED_500,
  GREY_100,
  GREY_900,
  GREY_700,
  MAIN_TEXT_COLOR_LIST,
  RED_600
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";
import ColorFunctions from "../../Libraries/ColorFunctions";
import MenuFunctions from "../../Libraries/MenuFunctions";
import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";

import { Decimalize, HasDecimal } from "../../Libraries/NumberFunctions";

//import Login from '../Account/login';

import {
  GetMenuFavAPI,
  GetCategoryMenuAPI,
  GetMenuByCategoryAPI,
  GetMenuAddonsAPI,
  SaveOrderAPI,
  UpdateOrderAPI,
  GetTableAPI,
  UpdateStatusOrderByIdAPI,
  GetMenuSearchFavAPI,
  GetMenuAllAPI,
  PayOrderAPI,
  BE_Get_Product,
  BE_Get_Product_Category,
  BE_URI,
  BE_Token,
  BE_TableManagement,
  BE_Update_Transaction,
  BE_Create_Transaction,
  BE_Outlet,
  BE_Sales_Type,
  BE_Save_Transaction, //SAVE Untuk Check In
  BE_Rekap,
  BE_Payment_Method
} from "../../Constants";
import moment from "moment";

import {
  _cari,
  _alert_printer,
  _cancel,
  _next,
  _pilih,
  _qty_long,
  _qty_short,
  _catatan,
  _catatan_extra,
  _menu_favorit,
  _semua_menu,
  _cetak_dapur,
  _clear_cart,
  _cetak_bill,
  _order,
  _nama,
  _meja,
  _data_pelanggan,
  _berhasil_update,
  _gagal,
  _berhasil_tambah,
  _error_1,
  _error_2,
  _menu_favorit_short,
  _menu_all_short,
  _pajak,
  _service,
  _lanjut,
  _keranjang,
  _pesanan_baru,
  _simpan,
  _simpan_pesanan,
  _harga_custom,
  _pelanggan,
  _transaction_id,
  _no_table,
  _cashier,
  _ubah_harga,
  _delete,
  _taxable,
  _print_kitchen_here,
  _point,
  _calorie,
  _stock,
  _done,
  _delete_confirmation,
  _cancel_order,
  _sales_type,
  _expedition_type,
  _delete_berhasil,
  _weight,
  _weight_mode,
  _kilogram,
  _calculate_weight,
  _reset_weight,
  _print_label,
  _lanjut_short
} from "../../Libraries/DictionaryHome";
import DeviceInfo from "react-native-device-info";
import { RNCamera } from "react-native-camera";
import { _no_data_3, _open_recap_alert } from "../../Libraries/DictionaryRekap";
import CustomConfirmation from "../../Components/MobileCustomConfirmation";
import RegionFunctions from "../../Libraries/RegionFunctions";
import CashlezFunctions from "../../Libraries/CashlezFunctions";
import { _server_down } from "../../Libraries/DictionaryLogin";
import { _ok_alert } from "../../Libraries/DictionarySetting";
import { _revisi, _sub_total } from "../../Libraries/DictionaryHistory";
import { _notes } from "../../Libraries/DictionaryDrawer";
import SettingsFunctions from "../../Libraries/SettingsFunctions";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 33;

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default class MobileHome extends Component {
  constructor(props) {
    super(props);
    this.arrLoc = [];
    this.state = {
      salesTypeProduct: null,
      salesTypeProductSelected: null,
      formShowWeight: false,
      papa_recepi_id: 0,
      showFilter: false,
      currencyAllowDecimal: false,
      showCustomConfirmation: false,
      page: 1,
      maxPage: 1,
      dataMenuFav: [],
      withTax: true,
      withServices: true,
      barcodeSearch: false,
      showBill: false,
      tablet: DeviceInfo.isTablet(),
      transactionId: "",
      showClearCartBackHandler: false,
      showClearCart: false,
      formItem: false,
      expand: false,
      showAlert: false,
      alertMessage: [],
      showFav: true,
      showFavList: true,
      show_order_id: false,
      footer_printer: "",
      customer_id: this.props.customer_id ? this.props.customer_id : 0,
      direct_payment: this.props.direct_payment
        ? this.props.direct_payment
        : false,
      booking_id: 0,
      phone: "",
      order_id: null,
      formAction: "add",
      formIndex: 0,
      formSalesType: 1,
      salesTypeTax: 0.2,
      salesTypeValue: 0,
      newName: "",
      showNameForm: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      selectedProduct: { id: 0, name: "" },
      selectedQuantity: 1,
      selectedCatatan: "",

      productPrice: 25000,
      additionalProduct: [],
      additionalList: [],
      savedTableId: 0,
      tableLeft: 0,
      tableWidth: 0,
      tableTop: 0,
      newWidth: 0,
      newLeft: 0,
      newTop: 0,
      language: "",
      ready: true,
      loading: true,
      number: 1,
      currentLoc: null,
      refreshing: false,
      searchKey: "",
      selected: -1,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      currency: "IDR",
      showAll: false,
      activeCategory: -1,
      activeCategoryIndex: -1,
      subTotal: 0,
      selectedTable: this.props.table
        ? this.props.table
        : { id: 1, name: "Meja 1" },
      showAdditionalSalesType: false,
      selectedSalesType: this.props.sales_type
        ? this.props.sales_type
        : "Take-Away",
      showAdditionalTable: false,
      showNew: false,
      additionalSalesType: [
        {
          id: "Take-Away",
          name: "Take-Away"
        },
        {
          id: "Dine-In",
          name: "Dine-In"
        },
        {
          id: "Gojek/Grab",
          name: "Gojek/Grab"
        }
      ],
      additionalTable: [],
      dataBill: [],
      printer_kitchen: null,
      printer_main: null,
      dataCategory: [],
      categoryTotal: 0,
      dataMenu: [],
      dataOfflineMenu: [],
      dataOfflineAddons: [],

      action: "0",
      lastUpdate: moment(new Date()).format("2000-MM-DD HH:mm:ss"),
      timeCompare: moment(new Date()).format("YYYY-MM-DD 07:07:07"),
      import_cooldown: 300,
      auth: this.props.auth ? this.props.auth : "",
      services: 0,
      tax: 0,
      salesTypeName: "",
      sales_type_dine_in_id: 0,
      sales_type_first_id: 0,
      salesTypeCharge: 0,

      //Access

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
      access_change_price: false,
      access_change_tax: false,
      showStock: this.props.showStock ? this.props.showStock : false,

      //camera
      showCamera: false,
      flash: "off",

      zoom: 0,
      autoFocus: "on",
      depth: 0,
      type: "back",
      //type: "front",

      whiteBalance: "auto",
      // ratio: "16:9",
      ratio: "4:3",
      // recordOptions: {
      //   mute: false,
      //   maxDuration: 5,
      //   quality: RNCamera.Constants.VideoQuality["288p"]
      // },

      isRecording: false,
      canDetectFaces: false,
      canDetectText: false,
      canDetectBarcode: true,

      faces: [],
      textBlocks: [],
      barcodes: [],
      printer_label: null,
      printer3: false,
      setting_light_mode: false
    };
  }

  componentDidMount() {
    //this.newOrder();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    //console.log("Home Page Props ==> ", this.props);
    //this.InitializeCashlez();
    //console.log("Home Page colorIndex ==> ", this.props);
    //this.getCurrentLocation();

    //this.connectPrinter();

    RegionFunctions.GetSettingLightMode(val => {
      if (val) {
        this.setState({ setting_light_mode: val });
      }
    });

    RegionFunctions.GetListSalesTypeProduct(val => {
      if (val) {
        this.setState({ salesTypeProduct: val });
      }
    });

    MenuFunctions.GetMenu(data => {
      if (data) {
        //console.log("Data Bill ==> ", data);
        this.setState({ dataBill: data });
      }
    });

    MenuFunctions.GetOrderID(val => {
      if (val) {
        this.setState({ order_id: val });

        MenuFunctions.GetMenu(data => {
          if (data) {
            let new_dataBill = [];
            data.map((v, i) => {
              let detail = [];
              if (v.Transaction_Item_Addons) {
                v.Transaction_Item_Addons.map((x, y) => {
                  let temp_addons = {
                    id: x.addons_id,
                    name: x.Addon.name,
                    price: x.price_addons,
                    parentId: x.group_addons_id
                  };

                  detail.push(temp_addons);
                });
              }

              const price =
                v.price_product +
                v.price_addons_total -
                v.price_discount +
                v.price_service;
              let temp = {
                detail: detail,
                id: v.product_id,
                product_id: v.product_id,
                product: v.Product,
                qty: v.quantity,
                name: v.Product.name,
                notes: v.notes ? v.notes : "",
                price: price,
                status: v.status ? "done" : "on progress", //v.status//////
                salesType: v.sales_type_id,
                salesTypeName: v.Sales_Type.name,
                salesTypeValue: v.price_service,
                total: price * v.quantity,
                nego: false
              };
              //console.log("temp v ", temp);
              new_dataBill.push(temp);
            });

            //console.log("new DATA BILL ==> ", new_dataBill);

            this.setState({ dataBill: new_dataBill });
          }
        });
      } else {
        //ga ada order id get biasa tanpa proses
        MenuFunctions.GetMenu(data => {
          if (data) {
            //console.log("Data Bill ==> ", data);
            this.setState({ dataBill: data });
          }
        });
      }
    });

    MenuFunctions.GetTableID(val => {
      if (val) {
        //console.log("Table ID ==> ", val);
        this.setState({
          savedTableId: val,
          selectedSalesType: this.state.sales_type_dine_in_id
        });
      }
    });

    MenuFunctions.GetCustomerID(val => {
      if (val) {
        //console.log("customer_id ==> ", val);
        this.setState({ customer_id: val });
      }
    });

    MenuFunctions.GetBookingID(val => {
      if (val) {
        //console.log("booking_id ==> ", val);
        this.setState({ booking_id: val });
      }
    });

    SettingsFunctions.GetPapaRecepiId(val => {
      if (val) {
        this.setState({ papa_recepi_id: parseInt(val) });
      }
    });

    RegionFunctions.GetCurrency(val => {
      if (val) {
        this.setState({ currency: val });
      }
    });

    RegionFunctions.GetAllowDecimal(val => {
      //console.log("GetAllowDecimal ===> ", val)
      if (val) {
        this.setState({ currencyAllowDecimal: val });
      }
    });

    if (this.props.checkIn) {
      this.newOrderCheckIn(false, false);
      this.setState({ action: "1", salesTypeName: "Dine-In" });
    }

    if (this.props.checkOut) {
      this.setState({
        showBill: true,
        action: "2",
        salesTypeName: "Dine-In"
      });
    }

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    PrinterFunctions.GetShowStock(val => {
      if (val) {
        //console.log("Show Stock ==> ", val);
        this.setState({ showStock: val });
      }
    });

    LoginFunctions.AuthToken(val => {
      //console.log("auth token ==> ", val);
      this.setState({
        auth: val
      });
    });

    LoginFunctions.LoginInformation(val => {
      //console.log("login info ==> ", val);
      this.setState({
        userInfo: val
        //additionalProduct: defaultProductSelection
      });
    });
    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    let kode = "";

    if (this.state.customer_id) {
      kode =
        "" +
        //data.retail_id +
        //"/" +

        moment(new Date()).format("YY/MM/DD-HH/mm/ss") +
        "-" +
        this.state.userInfo.gerai_id; //+ //gerai id
      //"/C" + this.state.customer_id;
    } else {
      kode =
        "" +
        //data.retail_id +
        //"/" +
        moment(new Date()).format("YY/MM/DD-HH/mm/ss") +
        "-" +
        this.state.userInfo.gerai_id;
    }

    this.setState({ transactionId: kode });

    // save offline
    // const parameter_post_order = {
    //   order_id: 9,
    //   retail_id: 3,
    //   gerai_id: 3,
    //   time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    //   booking_id: 4,
    //   customer_id: 5,
    //   table_id: 6,
    //   cashier_id: 7,
    //   detail: 8
    // };

    let temp_save_order = [];

    //if (temp_save_order.length === 0)
    //{

    //OfflineMenuFunctions.SaveOrderMenu(temp_save_order, val => {});

    // if (Dimensions.get("window").width > Dimensions.get("window").height) {
    //   alert("miring");
    // } else {
    //   alert("berdiri");
    // }

    //OfflineMenuFunctions.SaveOrderMenu([], val => {});

    //this.getPaymentMethod();
    this.setPreviliges();

    this.getDataOffline();
    this.getDataOfflineMode();

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.getOutletData();
        this.getDataCategory();
        this.getSalesType();
        //this.getAddonsByMenu(1);
        //this.getDataTable();

        setTimeout(() => {
          this.getDataTable();
        }, 333);

        setTimeout(() => { }, 100);
        this.getData();

        this.getRekap();
        this.saveOfflineData();

        OfflineMenuFunctions.GetLastUpdate(val => {
          //console.log("Last Update ==> ", val);
          if (val) {
            this.setState({ lastUpdate: val });
            setTimeout(() => {
              const time = this.state.lastUpdate;
              const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
              let timeDifference = moment(time_now).diff(moment(time));
              let timeDifferenceSecond = Math.round(timeDifference / 1000);
              let timeDifferenceMinute = Math.round(timeDifferenceSecond / 60);
              let timeDifferenceHour = Math.round(timeDifferenceSecond / 3600);

              if (timeDifferenceSecond > 300) {
                OfflineMenuFunctions.SaveLastUpdate(time_now, val => { });
                this.getAllData();
              }
            }, 1500);
          } else {
            setTimeout(() => {
              this.getAllData();
            }, 1500);
          }
        });

        // OfflineMenuFunctions.GetLastUpdate(val => {
        //   //console.log("Last Update ==> ", val);
        //   //this.setState({ lastUpdate: val });
        //   let time = null;

        //   if (val) {
        //     this.importData(val);
        //   } else {
        //     this.importData();
        //   }
        // });

        // this.interval = setInterval(() => {
        //   this.getTableList();
        // }, 10000);
      } else {
        //offline Mode
        //console.log("offline Mode");
        this.getDataOfflineMode();
      }
    });

    this.getPrinterData();

    if (this.state.direct_payment) {
      setTimeout(() => {
        /////////////mobilebayar1

        let data_temp =
          moment(new Date()).format("YY/MM/DD-HH/mm/ss") +
          "-" +
          this.state.userInfo.gerai_id;

        Actions.MobileBayar({
          auth: this.state.auth,
          //orderId: data_temp,
          dataOrder: [],
          dataBill: [],
          userInfo: this.state.userInfo,
          colorIndex: this.state.colorIndex,
          selectedTable: this.state.selectedTable,
          languageIndex: this.state.languageIndex,
          items: [],
          tax: this.state.tax,
          services: this.state.services,
          withTax: this.state.withTax,
          withServices: this.state.withServices,
          direct_payment: true

          //customer_id: this.state.customer_id, checkout new
        });
      }, 600);
    }
  }

  resetWeight() {
    this.setState({ selectedQuantity: 0 });
    try {
    } catch (error) {
      console.log("starter error");
    }
  }

  calculateWeight() {
    //const x = 1.111;
    try {
    } catch (error) {
      console.log("starter error");
    }
  }

  getAllData() {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    const { barcodeSearch } = this.state;
    const gerai_id = this.state.userInfo.gerai_id;
    //let uri = `${GetMenuFavAPI}?gerai_id=${gerai_id}&search=&page=1`;

    let uri = `${BE_Get_Product}/lite?outlet_id=${gerai_id}&status=active&per_page=100&page=1`;

    //console.log("uri get data ==> ", uri);
    // console.log ("activeCategory ", activeCategory)

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            //console.log("get Data Lite ==> ", responseJson.pagination);

            let result = responseJson;
            let resultData = result;

            if (responseJson.statusCode === 200) {
              let temp_save_order = resultData.data;
              OfflineMenuFunctions.SaveAllMenu(temp_save_order, x => { });
            }

            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => { });
      } else {
      }
    });
  }

  async InitializeCashlez() {
    CashlezFunctions.InitializeCashlez(v => {
      //console.log("Call Back InitializeCashlez ===> ", v);
      this.LoginCashlez();
    });
  }

  async LoginCashlez() {
    CashlezFunctions.LoginCashlez("test01", "111111", v => {
      //console.log("Call Back LoginCashlez ===> ", v);
      this.InitializeCashlezPayment();
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
    }, 5000);
  }

  async PaymentCheckReader() {
    CashlezFunctions.PaymentCheckReader(v => {
      //console.log("Call Back PaymentCheckReader ===> ", v);
    });
  }
  getTableList() {
    const { userInfo } = this.state;
    const outlet_id = userInfo.gerai_id;

    let available = 0;
    let reserved = 0;
    let used = 0;

    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=${search}`;

    //let name_search = search !== "" ? `?name=${search}` : "";

    let uri = `${BE_TableManagement}?outlet_id=${outlet_id}`;

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
        }
      })
      .catch(_err => {
        console.log("ERR table List ==> ", _err);
      });
  }

  setPreviliges() {
    const { userInfo } = this.state;
    let privileges = userInfo.privileges;

    //console.log("privileges ===> ", privileges);

    this.setState({ business_type: userInfo.business_type });

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
        v.name === "change_price" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_change_price: true });
      }

      if (
        v.name === "change_tax" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_change_tax: true });
      }

      if (
        v.name === "customer_management" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_customer_management: true });
      }
    });

    this.setState({ privileges: privileges });
  }

  getRekap() {
    let date_start = moment(new Date())
      .add(-60, "days")
      .format("YYYY-MM-DD 00:00");
    let date_end = moment(new Date()).format("YYYY-MM-DD 23:59");

    //let uri = `${GetRekapAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&date_start=${date_start}&date_end=${date_end}&search=&page=1&search=${search}`;

    let uri = `${BE_Rekap}?limit=1`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27

    //console.log("getRekapListFirstTime ==> ", uri);

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
          } else {
            let alert_message = _open_recap_alert;
            //alert(alert_message[this.state.languageIndex]);
            this.setState({
              openRecapAlert: true,
              openRecapMessage: alert_message[this.state.languageIndex]
            });
            //alert(alert_message[this.state.languageIndex]);
            // this.setState({
            //   openRecapAlert: true,
            //   openRecapMessage: alert_message[this.state.languageIndex]
            // }); buka rekap alert
            // Actions.pop();
            // //Actions.pop();
            // Actions.MobileRekap({
            //   auth: this.state.auth,
            //   userInfo: this.state.userInfo,
            //   colorIndex: this.state.colorIndex,
            //   languageIndex: this.state.languageIndex
            // });
          }
        } else {
          //this.setState({ loading: false });
          let alert_message = _open_recap_alert;
          this.setState({
            openRecapAlert: true,
            openRecapMessage: alert_message[this.state.languageIndex]
          });

          // alert(alert_message[this.state.languageIndex]);
          // Actions.pop();
          // Actions.MobileRekap({
          //   auth: this.state.auth,
          //   userInfo: this.state.userInfo,
          //   colorIndex: this.state.colorIndex,
          //   languageIndex: this.state.languageIndex
          // });
        }
      })
      .catch(_err => {
        //this.setState({ loading: false });
        //console.log("ERR getRekapList ==> ", _err);
      });
  }

  getSalesType() {
    //let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Sales_Type;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.statusCode === 200) {
          const data = responseJson.data;

          //console.log("getSalesType ===> ", data);

          let sales_type_dine_in_id = 0;

          let data_filtered = [];
          data.map((v, i) => {
            if (!v.is_booking && !v.is_delivery) {
              if (v.require_table && !v.is_booking) {
                sales_type_dine_in_id = v.id;
              }

              data_filtered.push(v);
            }
          });

          //console.log("getSalesType data_filtered ===> ", data_filtered);
          //console.log("getSalesType sales_type_dine_in_id ===> ", sales_type_dine_in_id);

          let defaultName = "Take-Away";

          if (this.props.checkIn || this.props.checkOut) {
            this.setState({
              additionalSalesType: data_filtered,
              salesTypeName: "Dine-In",
              sales_type_dine_in_id: sales_type_dine_in_id,
              sales_type_first_id: data[0] ? data[0].id : 0
            });
          } else {
            this.setState({
              additionalSalesType: data_filtered,
              salesTypeName: data[0] ? data[0].name : "Take-Away",
              sales_type_dine_in_id: sales_type_dine_in_id,
              sales_type_first_id: data[0] ? data[0].id : 0
            });
          }

          OfflineMenuFunctions.SaveSalesType(data, val => { });
          // this.setState({
          //   additionalSalesType: data,
          //   salesTypeName: data[0] ? data[0].name : "Take-Away",
          //   sales_type_dine_in_id: sales_type_dine_in_id,
          //   sales_type_first_id: data[0] ? data[0].id : 0
          // });

          //console.log("this.props.sales_type ==> ", this.props.sales_type);

          if (this.props.sales_type) {
            this.setState({
              selectedSalesType: this.props.sales_type
            });
          } else {
            this.setState({
              selectedSalesType: data_filtered[0] ? data_filtered[0].id : 0
            });
          }
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getOutletData() {
    let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Outlet + outlet_id;

    //console.log("GET DATA OUTLET");
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("DATA OUTLET ==> ", responseJson);

        //console.log("DATA OUTLET ==> ", responseJson.Outlet_Taxes);

        if (responseJson.statusCode === 200) {
          let data_tax = [];

          let tax = 0;
          let services = 0;
          data_tax = responseJson.data.Outlet_Taxes;

          let phone = "";

          if (responseJson.data.phone_number) {
            phone = responseJson.data.phone_number;
          }

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

          OfflineMenuFunctions.SaveTaxRate(tax, val => { });
          OfflineMenuFunctions.SavePhoneNumber(phone, val => { });
          OfflineMenuFunctions.SaveServiceRate(services, val => { });

          const address = responseJson.data.address;

          let userInfo_temp = this.state.userInfo;

          userInfo_temp.restaurant_address = address;

          LoginFunctions.UpdateLoginInformation(userInfo_temp, val => { });
          //OfflineMenuFunctions.SaveOutletAddress(services, val => {});

          this.setState({
            tax: tax,
            services: services,
            phone: phone,
            userInfo: userInfo_temp
          });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({ serverDown: true });
        alert(_server_down[this.state.languageIndex]);
      });
  }

  saveOfflineData() {
    OfflineMenuFunctions.GetTemporaryOrder(val => {
      //this.setState({ lastUpdate: val });
      //console.log("Save Offline ==> ", val);

      let temp_val = val;
      let temp_val_original = val;

      //console.log("Get Temp Order ==> ", temp_val_original);

      if (val) {
        let data_length = val.length;
        temp_val_original.map((v, i) => {
          let uri = BE_Create_Transaction;
          //console.log("Get individual order parameter", v);
          //console.log("data_length ", data_length);
          //console.log("i + 1", i + 1);

          fetch(uri, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: this.state.auth
            },
            body: JSON.stringify(v)
          })
            .then(response => response.json())
            .then(responseJson => {
              //console.log("Response Payment uri ==> ", uri);
              //console.log("responseJson ==> ", responseJson);
            })
            .catch(_err => { });

          if (i + 1 === data_length) {
            //console.log("delete ORDER")
            OfflineMenuFunctions.DeleteTemporaryOrder(val => { });
          }
        });
      } else {
        //OfflineMenuFunctions.DeleteTemporaryOrder(val => {});
      }
    });
  }

  getDataOfflineMode() {
    OfflineMenuFunctions.GetServiceRate(val => {
      //console.log("GetServiceRate ==> ", val);
      if (val) {
        this.setState({
          services: val
        });
      }
    });

    OfflineMenuFunctions.GetTableData(val => {
      //console.log("GetTableData ==> ", val);

      if (val) {
        if (val.length > 0) {
          this.setState({
            additionalTable: val,
            selectedTable: this.state.selectedTableData
              ? this.state.selectedTableData
              : val[0]
          });
        } else {
          this.setState({
            additionalTable: val,
            selectedTable: { id: 0, name: "No Available Table" }
          });
        }

        // this.setState({
        //   tax: val
        // });
      }
    });

    OfflineMenuFunctions.GetTaxRate(val => {
      //console.log("GetTaxRate ==> ", val);

      if (val) {
        this.setState({
          tax: val
        });
      }
    });

    OfflineMenuFunctions.GetCategoryMenu(val => {
      //console.log("GetCategoryMenu ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        this.setState({
          dataCategory: val,
          categoryTotal: val.length
        });
      }
    });

    OfflineMenuFunctions.GetAllMenu(val => {
      //console.log("GetAllMenu ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        this.setState({
          dataOfflineMenu: val,
          dataMenuFav: val
        });
      }
    });

    OfflineMenuFunctions.GetAddonsMenu(val => {
      //console.log("GetAddonsMenu ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        this.setState({
          dataOfflineAddons: val
        });
      }
    });

    OfflineMenuFunctions.GetSalesType(val => {
      //console.log("GetSalesType ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        const data = val;

        let sales_type_dine_in_id = 0;

        data.map((v, i) => {
          if (v.require_table) {
            sales_type_dine_in_id = v.id;
          }
        });

        let defaultName = "Take-Away";

        if (this.props.checkIn || this.props.checkOut) {
          this.setState({
            additionalSalesType: data,
            salesTypeName: "Dine-In",
            sales_type_dine_in_id: sales_type_dine_in_id,
            sales_type_first_id: data[0] ? data[0].id : 0
          });
        } else {
          this.setState({
            additionalSalesType: data,
            salesTypeName: data[0] ? data[0].name : "Take-Away",
            sales_type_dine_in_id: sales_type_dine_in_id,
            sales_type_first_id: data[0] ? data[0].id : 0
          });
        }

        //OfflineMenuFunctions.SaveSalesType(data, val => {});
        // this.setState({
        //   additionalSalesType: data,
        //   salesTypeName: data[0] ? data[0].name : "Take-Away",
        //   sales_type_dine_in_id: sales_type_dine_in_id,
        //   sales_type_first_id: data[0] ? data[0].id : 0
        // });

        //console.log("this.props.sales_type ==> ", this.props.sales_type);

        if (this.props.sales_type) {
          this.setState({
            selectedSalesType: this.props.sales_type
          });
        } else {
          this.setState({
            selectedSalesType: data[0] ? data[0].id : 0
          });
        }

        this.setState({
          dataOfflineAddons: val
        });
      }
    });
  }

  getPaymentMethod() {
    const uri = BE_Payment_Method;

    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;

        let cash = {};
        let wallet = [];
        let card = [];
        if (result.statusCode === 200) {
          OfflineMenuFunctions.SavePaymentType(resultData, val => { });
        }
      })
      .catch(_err => { });
  }

  importData(time = this.state.lastUpdate) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let timeDifference = moment(time_now).diff(moment(time));
    let timeDifferenceSecond = Math.round(timeDifference / 1000);
    let timeDifferenceMinute = Math.round(timeDifferenceSecond / 60);
    let timeDifferenceHour = Math.round(timeDifferenceSecond / 3600);
    OfflineMenuFunctions.SaveLastUpdate(time_now, val => { });

    //console.log("timeDifferenceSecond ==> ", timeDifferenceSecond);

    // if (timeDifferenceSecond > this.state.import_cooldown) {
    if (timeDifferenceSecond > 300) {
      const gerai_id = this.state.userInfo.gerai_id;
      let uri_category = `${BE_Get_Product_Category}/lite?outlet_id=${gerai_id}&search=&page=1`;
      let uri_product = `${BE_Get_Product}/lite?outlet_id=${gerai_id}&status=active&search=&page=1`;
      let uri_fav = `${BE_Get_Product}/lite?outlet_id=${gerai_id}&is_favorite=1&name=&page=1`;

      fetch(uri_category, {
        method: "GET",
        headers: {
          Authorization: this.state.auth
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          // let result = responseJson;
          // let resultData = result.data;

          //console.log("Import Data Category ==> ", responseJson);

          let result = responseJson;
          let resultData = result;
          let data_category = resultData.data;

          const data_temp = resultData.data;
          let temp_data_category = [];
          data_temp.map((v, i) => {
            if (v.Products.length > 0) {
              //console.log('is Single ==> ', v.options[0]);
              temp_data_category.push(v);
            }
          });

          OfflineMenuFunctions.SaveCategoryMenu(temp_data_category, val => { });
          // let temp_category = responseJson.category.data;
          // let temp_menu = responseJson.data.data;
          // let temp_favourite = responseJson.data_favourite.data;
          // let temp_addons = responseJson.data_addons;
          //offline mode save
          // OfflineMenuFunctions.SaveAddons(temp_addons, val => {});
          // OfflineMenuFunctions.SaveAllMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveFavMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});
          //offline mode save
          //console.log('new data ==>', JSON.stringify(data))
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });

      fetch(uri_product, {
        method: "GET",
        headers: {
          Authorization: this.state.auth
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          // let result = responseJson;
          // let resultData = result.data;

          //console.log("Import Data Menu ==> ", responseJson);

          let result = responseJson;
          let resultData = result;

          let data_product = resultData.data;
          OfflineMenuFunctions.SaveAllMenu(data_product, val => { });

          // let temp_category = responseJson.category.data;
          // let temp_menu = responseJson.data.data;
          // let temp_favourite = responseJson.data_favourite.data;
          // let temp_addons = responseJson.data_addons;
          // offline mode save
          // OfflineMenuFunctions.SaveAddons(temp_addons, val => {});
          // OfflineMenuFunctions.SaveAllMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveFavMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});
          // offline mode save
          // console.log('new data ==>', JSON.stringify(data))
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });

      fetch(uri_fav, {
        method: "GET",
        headers: {
          Authorization: this.state.auth
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          // let result = responseJson;
          // let resultData = result.data;

          //console.log("Import Data Fav ==> ", responseJson);

          let result = responseJson;
          let resultData = result;

          let data_favourite = resultData.data;
          OfflineMenuFunctions.SaveFavMenu(data_favourite, val => { });

          // let temp_category = responseJson.category.data;
          // let temp_menu = responseJson.data.data;
          // let temp_favourite = responseJson.data_favourite.data;
          // let temp_addons = responseJson.data_addons;
          //offline mode save
          // OfflineMenuFunctions.SaveAddons(temp_addons, val => {});
          // OfflineMenuFunctions.SaveAllMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveFavMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});
          //offline mode save
          // this.setState({
          //   dataMenuFav: resultData.data,

          //   loading: false
          // });
          //console.log('new data ==>', JSON.stringify(data))
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });

      this.getPaymentMethod();
    }
  }

  onBackPress = () => {
    //Actions.pop();
    //this.props.onBackPress();
    if (this.state.dataBill.length > 0 && this.state.order_id === null) {
      this.setState({ showClearCartBackHandler: true });
    } else {
      //clear cart
      this.newOrder(true, true);
      Actions.pop();
    }
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    clearInterval(this.interval);

    Actions.refresh({
      returned: true
    });
  }

  componentDidUpdate(nextProps) {
    //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);
    if (this.props !== nextProps) {
      //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);

      // if (this.props.checkIn) {
      //   this.newOrderCheckIn(false, false);
      //   this.setState({ action: "1" });
      // }

      // if (this.props.checkOut) {
      //   this.setState({
      //     showBill: true,
      //     action: "2"
      //   });
      // }

      PrinterFunctions.GetShowStock(val => {
        if (val) {
          //console.log("Show Stock ==> ", val);
          this.setState({ showStock: val });
        }
      });

      PrinterFunctions.GetLanguage(val => {
        if (val !== null) {
          this.setState({ languageIndex: val });
        }
      });

      LoginFunctions.AuthToken(val => {
        this.setState({
          auth: val
        });
      });

      LoginFunctions.LoginInformation(val => {
        //console.log("login info ==> ", val);
        this.setState({
          userInfo: val
          //additionalProduct: defaultProductSelection
        });
      });
      ColorFunctions.GetColor(val => {
        if (val && this.state.colorIndex !== val) {
          this.setState({ colorIndex: val });
        }
      });

      // MenuFunctions.GetOrderID(val => {
      //   if (val) {
      //     //console.log("Order ID ==> ", val);
      //     this.setState({ order_id: val });

      //     MenuFunctions.GetMenu(data => {
      //       if (data) {
      //         //console.log("Data Bill Process ==> ", data);

      //         let new_dataBill = [];
      //         data.map((v, i) => {
      //           let detail = [];
      //           v.Transaction_Item_Addons.map((x, y) => {
      //             let temp_addons = {
      //               id: x.addons_id,
      //               name: x.Addon.name,
      //               price: x.price_addons,
      //               parentId: x.group_addons_id
      //             };

      //             detail.push(temp_addons);
      //           });

      //           const price =
      //             v.price_product +
      //             v.price_addons_total -
      //             v.price_discount +
      //             v.price_service;

      //           let temp = {
      //             detail: detail,
      //             id: v.product_id,
      //             product_id: v.product_id,
      //             product: v.Product,
      //             qty: v.quantity,
      //             name: v.Product.name,
      //             notes: v.notes ? v.notes : "",
      //             price:
      //               v.price_product +
      //               v.price_addons_total -
      //               v.price_discount +
      //               v.price_service,
      //             status: v.status ? "done" : "on progress", //v.status
      //             salesType: v.sales_type_id,
      //             salesTypeName: v.Sales_Type.name,
      //             salesTypeValue: v.price_service,
      //             total: (price + v.price_service) * v.quantity,
      //             nego: false
      //           };
      //           //console.log("temp v ", temp);
      //           new_dataBill.push(temp);
      //         });

      //         //console.log("new DATA BILL ==> ", new_dataBill);

      //         this.setState({ dataBill: new_dataBill });
      //       }
      //     });
      //   } else {
      //     //ga ada order id get biasa tanpa proses
      //     MenuFunctions.GetMenu(data => {
      //       if (data) {
      //         //console.log("Data Bill ==> ", data);
      //         this.setState({ dataBill: data });
      //       }
      //     });
      //   }
      // });

      MenuFunctions.GetTableID(val => {
        if (val) {
          //console.log("Table ID ==> ", val);
          this.setState({
            savedTableId: val,
            selectedSalesType: this.state.sales_type_dine_in_id
          });
        }
      });

      MenuFunctions.GetCustomerID(val => {
        if (val) {
          //console.log("customer_id ==> ", val);
          this.setState({ customer_id: val });
        }
      });

      MenuFunctions.GetBookingID(val => {
        if (val) {
          //console.log("booking_id ==> ", val);
          this.setState({ booking_id: val });
        }
      });

      let kode = "";

      // if (this.state.customer_id) {
      //   kode =
      //     "" +
      //     //data.retail_id +
      //     //"/" +
      //     this.state.userInfo.gerai_id + //gerai id
      //     ":" +
      //     this.state.customer_id +
      //     ":" +
      //     moment(new Date()).format("YY/MM/DD:HH:mm:ss");
      // } else {
      //   kode =
      //     "" +
      //     //data.retail_id +
      //     //"/" +
      //     this.state.userInfo.gerai_id + //gerai id
      //     ":" +
      //     moment(new Date()).format("YY/MM/DD:HH:mm:ss");
      // }

      if (this.state.customer_id) {
        kode =
          "" +
          //data.retail_id +
          //"/" +

          moment(new Date()).format("YY/MM/DD-HH/mm/ss") +
          "-" +
          this.state.userInfo.gerai_id; //+ //gerai id
        //"/C" + this.state.customer_id;
      } else {
        kode =
          "" +
          //data.retail_id +
          //"/" +
          moment(new Date()).format("YY/MM/DD-HH/mm/ss") +
          "-" +
          this.state.userInfo.gerai_id;
      }

      this.setState({ transactionId: kode });

      // save offline
      // const parameter_post_order = {
      //   order_id: 9,
      //   retail_id: 3,
      //   gerai_id: 3,
      //   time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      //   booking_id: 4,
      //   customer_id: 5,
      //   table_id: 6,
      //   cashier_id: 7,
      //   detail: 8
      // };

      let temp_save_order = [];

      //if (temp_save_order.length === 0)
      //{

      //OfflineMenuFunctions.SaveOrderMenu(temp_save_order, val => {});

      // if (Dimensions.get("window").width > Dimensions.get("window").height) {
      //   alert("miring");
      // } else {
      //   alert("berdiri");
      // }

      //OfflineMenuFunctions.SaveOrderMenu([], val => {});

      // NetInfo.fetch().then(state => {
      //   if (state.isConnected) {
      //     this.getOutletData();
      //     this.getData();
      //     this.getDataCategory();
      //     this.getSalesType();
      //     //this.getAddonsByMenu(1);
      //     this.getDataTable();
      //     //this.saveOfflineData();

      //     OfflineMenuFunctions.GetLastUpdate(val => {
      //       //console.log("Last Update ==> ", val);
      //       //this.setState({ lastUpdate: val });
      //       let time = null;

      //       if (val) {
      //         this.importData(val);
      //       } else {
      //         this.importData();
      //       }
      //     });
      //   } else {
      //     //offline Mode
      //     //console.log("offline Mode");
      //     this.getDataOfflineMode();
      //   }
      // });

      // this.getPrinterData();
    }
  }

  idrNumToStr(num, iscurr) {
    let int_num = parseInt(num);
    let comma_num = num - int_num;

    //console.log("num ===> ", num);
    //console.log("int_num ===> ", int_num);
    comma_num = Math.round(comma_num * 100);
    //console.log("comma_num ===> ", comma_num);

    let comma_add = "";
    if (comma_num === 0) {
    } else {
      if (comma_num < 10) {
        comma_add = `.0${comma_num}`;
      } else {
        comma_add = `.${comma_num}`;
      }
    }

    if (!this.state.currencyAllowDecimal) {
      comma_add = "";
    }

    let curr = "";
    if (typeof iscurr !== "undefined" && iscurr === true) {
      curr = this.state.currency + " ";
    }
    let str = "";
    let numrev = int_num
      .toString()
      .split("")
      .reverse()
      .join("");
    for (let i = 0; i < numrev.length; i++) {
      if (i % 3 === 0) {
        str += numrev.substr(i, 3) + ",";
      }
    }
    return (
      curr +
      str
        .split("", str.length - 1)
        .reverse()
        .join("") +
      comma_add
    );
  }

  async printActionStarter() {
    try {
      // await BluetoothEscposPrinter.printText("\n\r", {});
    } catch (error) { }
  }

  async getPrinterData() {
    PrinterFunctions.GetLabelPrinter(val => {
      if (val) {
        console.log("Printer Label ==> ", val);
        this.setState({ printer_label: val });
      }
    });

    PrinterFunctions.GetPrinter3(val => {
      if (val) {
        console.log("GetPrinter3 ==> ", val);
        this.setState({ printer3: val });
      }
    });

    PrinterFunctions.GetKitchenPrinter(val => {
      if (val) {
        //console.log("Printer Kitchen Index ==> ", val);
        this.setState({ printer_kitchen: val });
        setTimeout(() => {
          this.connect(val.address);
          setTimeout(() => {
            this.printActionStarter();
          }, 500);
        }, 500);

        //this.connect(val.address);

        //this.connectPrinter(val.address);
      }
    });

    PrinterFunctions.GetPrintType(val => {
      if (val) {
        //console.log("GetPrintType ==> ", val);
        this.setState({ printType: val });
      }
    });

    PrinterFunctions.GetMainPrinter(val => {
      if (val) {
        //console.log("Main Kitchen Index ==> ", val);
        this.setState({ printer_main: val });
        //this.connectPrinter(val.address);
      } else {
        //alert(_alert_printer[this.state.languageIndex]);
        // Actions.Setting({
        //   userInfo: this.state.userInfo,
        //   colorIndex: this.state.colorIndex
        // });
      }
    });

    PrinterFunctions.GetFooterPrinter(val => {
      if (val) {
        //console.log("Footer Printer ==> ", val);
        this.setState({ footer_printer: val });
      }
    });

    PrinterFunctions.GetShowOrderIDPrinter(val => {
      if (val) {
        //console.log("Show Order Id Printer ==> ", val);
        this.setState({ show_order_id: val });
      }
    });
  }

  newOrderOld(showAlert = false, cancel = false) {
    this.setState({ loading: true });
    this.cancelOrder(
      showAlert,
      cancel,
      this.state.order_id,
      this.state.savedTableId
    );
    MenuFunctions.ClearNewMenuAll(val => { });

    this.setState({
      selectedSalesType: this.state.additionalSalesType[0] ? this.state.additionalSalesType[0].id : 0,
      dataBill: [],
      //selectedTable: this.state.additionalTable[0],
      savedTableId: 0,
      showAdditionalSalesType: false,
      showAdditionalTable: false,
      showNew: false,
      action: "0"
    });

    this.getData("", -1, 1);
    this.getDataCategory();
    //this.getAddonsByMenu(1);
    this.getDataTable();
  }

  newOrder(showAlert = false, cancel = false) {
    this.setState({ loading: true });
    this.cancelOrder(
      showAlert,
      cancel,
      this.state.order_id,
      this.state.savedTableId
    );
    MenuFunctions.ClearNewMenuAll(val => { });

    this.setState({
      selectedSalesType: this.state.additionalSalesType[0] ? this.state.additionalSalesType[0].id : 0,
      dataBill: [],
      //selectedTable: this.state.additionalTable[0],
      savedTableId: 0,
      showAdditionalSalesType: false,
      showAdditionalTable: false,
      showNew: false,
      action: "0"
    });

    this.getData("", -1, 1);
    this.getDataCategory();
    //this.getAddonsByMenu(1);
    this.getDataTable();
  }

  newOrderCheckIn(showAlert = false, cancel = false) {
    this.setState({ loading: true });
    this.cancelOrder(
      showAlert,
      cancel,
      this.state.order_id,
      this.state.savedTableId
    );
    MenuFunctions.ClearNewMenuCheckIn(val => { });

    this.setState({
      selectedSalesType: this.state.additionalSalesType[0] ? this.state.additionalSalesType[0].id : 0,
      dataBill: [],
      //selectedTable: this.state.additionalTable[0],
      //savedTableId: 0,
      showAdditionalSalesType: false,
      showAdditionalTable: false,
      showNew: false
    });

    this.getData();
    this.getDataCategory();
    //this.getAddonsByMenu(1);
    this.getDataTable();
  }

  handleLoadMore() {
    // getMenuByCategory(
    //   search = this.state.searchKey,
    //   activeCategory = this.state.activeCategory,
    //   activeCategoryIndex = this.state.activeCategoryIndex,
    //   page = this.state.page
    // )

    if (this.state.page < this.state.maxPage && !this.state.loading) {
      this.setState({ loading: true });
      if (this.state.activeCategory < 1) {
        this.getData(
          this.state.searchKey,
          this.state.activeCategory,
          this.state.page + 1
        );
      } else {
        this.getMenuByCategory(
          this.state.searchKey,
          this.state.activeCategory,
          this.state.activeCategoryIndex,
          this.state.page + 1
        );
      }
    }
  }

  cetakBill(type) {
    const { dataBill } = this.state;
    if (dataBill.length > 0) {
      this.printAction(type);
    }
  }

  cancelOrder(
    showAlert = false,
    cancel = false,
    order_id = null,
    table_id = 0
  ) {
    let valid = false;

    if (cancel === false && table_id === 0) {
      //jika dia take out maka order auto cancel
      valid = true;
    } else if (cancel === true) {
      // jika emang mau cancel mau table ada pun pasti cancel
      valid = false;
    }

    if (order_id && valid) {
      // has order_id
      fetch(UpdateStatusOrderByIdAPI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          order_id: order_id,
          status: "cancel"
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          //console.log("responseJson cancel ORder ==> ", responseJson);
          let result = responseJson;
          MenuFunctions.ClearNewMenuAll(val => { });

          if (showAlert) {
            let message = [];
            // message.push(responseJson.message);
            if (result.status) {
              message.push(_berhasil_update[this.state.languageIndex]);
            } else {
              message.push(_gagal[this.state.languageIndex]);
            }
            this.setState({
              loading: false,
              showAlert: true,
              alertMessage: message
            });
          }

          if (result.status) {
            this.setState({
              order_id: null
            });
          }
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
          this.setState({ loading: false });
        });
    }
  }

  getDataTable() {
    const { savedTableId } = this.state;
    const outlet_id = this.state.userInfo.gerai_id;
    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=`;

    let uri = `${BE_TableManagement}?outlet_id=${outlet_id}`;

    const check_in_table = this.props.table
      ? this.props.table
      : { id: 0, name: "No Available Table" };

    //console.log("check_in_table ==> ", check_in_table);

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
        let finalResult = [];
        let allResult = [];

        let resultData = result.data;

        //console.log("getDataTable Result ==> ", responseJson);

        let selectedTableData = null;
        resultData.map((v, i) => {
          let temp = {
            id: v.id,
            name: v.name,
            status: v.status,
            //available: firstData.available,
            statusName: v.statusName,
            capacity: v.capacity
          };

          allResult.push(temp);

          if (v.status === "available") {
            finalResult.push(temp);
            //console.log("resultData.v ===> ", v)

            //console.log("check_in_table.id === v.id ===> ", check_in_table.id === v.id)

            //if (this.state.savedTableId === v.id) {
            if (check_in_table.id === v.id) {
              //console.log("selectedTableData new ===> ", temp)

              selectedTableData = temp;
            }
            //} else if (this.state.savedTableId === v.id) {
          } else if (check_in_table.id === v.id) {
            finalResult.push(temp);
            selectedTableData = temp;
          }
        });

        //console.log("getDATATABLE finalResult ==> ", finalResult);

        OfflineMenuFunctions.SaveTableData(finalResult, x => { });

        OfflineMenuFunctions.GetTableData(item => {
          //console.log("GetTableData 1st ==> ", item);
          let temp_items = [];
        });

        if (finalResult.length > 0) {
          this.setState({
            additionalTable: finalResult,
            selectedTable: selectedTableData
              ? selectedTableData
              : finalResult[0]
          });
        } else {
          this.setState({
            additionalTable: finalResult,
            selectedTable: { id: 0, name: "No Available Table" }
          });
        }

        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getData(
    search = this.state.searchKey,
    activeCategory = this.state.activeCategory,
    page = this.state.page,
    per_page = 18
  ) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    const { barcodeSearch } = this.state;
    this.setState({ loading: true });

    const gerai_id = this.state.userInfo.gerai_id;

    const is_favorite = activeCategory === 0 ? "&is_favorite=1" : "";
    //let uri = `${GetMenuFavAPI}?gerai_id=${gerai_id}&search=&page=1`;

    let uri = `${BE_Get_Product}/lite?outlet_id=${gerai_id}${is_favorite}&name=${search}&status=active&per_page=${per_page}&page=${page}`;

    // console.log ("activeCategory ", activeCategory)

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            //console.log("get Data Lite ==> ", responseJson.pagination);

            let result = responseJson;
            let resultData = result;

            if (responseJson.statusCode === 200) {
              let tempData = this.state.dataMenuFav;
              let dataCombi = [...tempData, ...resultData.data];

              if (barcodeSearch) {
                //////////
                const data =
                  resultData.data.length > 0 ? resultData.data[0] : null;

                //console.log("search barcode data ", data);

                if (data) {
                  this.showFormItem(data, data.price, "add");
                }

                this.setState({
                  dataMenuFav: page === 1 ? resultData.data : dataCombi,
                  activeCategory: activeCategory,
                  activeCategoryIndex:
                    activeCategory < 1
                      ? activeCategory
                      : this.state.activeCategoryIndex,
                  loading: false,
                  barcodeSearch: false,
                  page: page,
                  maxPage: responseJson.pagination.total_page
                });
              } else {
                if (
                  this.state.activeCategoryIndex === -1 &&
                  this.state.activeCategory === -1 &&
                  this.state.searchKey === ""
                ) {
                  let temp_save_order = resultData.data;
                  // OfflineMenuFunctions.SaveAllMenu(temp_save_order, x => {});
                }

                this.setState({
                  dataMenuFav: page === 1 ? resultData.data : dataCombi,
                  activeCategory: activeCategory,
                  activeCategoryIndex:
                    activeCategory < 1
                      ? activeCategory
                      : this.state.activeCategoryIndex,
                  loading: false,
                  barcodeSearch: false,
                  page: page,
                  maxPage: responseJson.pagination.total_page
                });

                if (
                  this.state.searchKey !== "" &&
                  resultData.data.length === 1 &&
                  page === 1
                ) {
                  const get_data =
                    resultData.data.length > 0 ? resultData.data[0] : null;

                  //console.log("search barcode data ", data);
                  if (get_data) {
                    this.setState({ searchKey: "" });
                    this.showFormItem(get_data, get_data.price, "add");
                  }
                }
              }
            } else {
              //kalo ga ada data
              this.setState({
                dataMenuFav: resultData.data,
                activeCategory: activeCategory,
                activeCategoryIndex:
                  activeCategory < 1
                    ? activeCategory
                    : this.state.activeCategoryIndex,
                loading: false,
                barcodeSearch: false,
                page: 1,
                maxPage: 1
              });
            }

            if (responseJson.statusCode === 403) {
              //this.logoutAction();
            }

            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {
            if (activeCategory === -1) {
              OfflineMenuFunctions.GetAllMenu(val => {
                //console.log("getAllMenu Offline ==> ", val);
                //this.setState({ lastUpdate: val });
                if (val) {
                  let temp_data = [];
                  val.map((v, i) => {
                    if (
                      v.barcode === this.state.searchKey ||
                      v.name.toLowerCase() ===
                      this.state.searchKey.toLowerCase()
                    ) {
                      temp_data.push(v);
                    }
                  });

                  if (
                    this.state.searchKey !== "" &&
                    temp_data.length === 1 &&
                    page === 1
                  ) {
                    const get_data = temp_data.length > 0 ? temp_data[0] : null;
                    //console.log("search barcode data ", data);
                    if (get_data) {
                      setTimeout(() => {
                        this.setState({ searchKey: "" });
                      }, 777);
                      this.showFormItem(get_data, get_data.price, "add");
                    }
                  }

                  this.setState({
                    dataMenuFav: this.state.searchKey === "" ? val : temp_data,
                    activeCategory: activeCategory,
                    activeCategoryIndex: -1,
                    loading: false
                  });
                }
              });
            } else if (activeCategory === 0) {
              OfflineMenuFunctions.GetFavMenu(val => {
                //console.log("GetFavMenu Offline ==> ", val);
                //this.setState({ lastUpdate: val });
                if (val) {
                  let temp_data = [];
                  val.map((v, i) => {
                    if (
                      v.barcode === this.state.searchKey ||
                      v.name.toLowerCase() ===
                      this.state.searchKey.toLowerCase()
                    ) {
                      temp_data.push(v);
                    }
                  });

                  if (
                    this.state.searchKey !== "" &&
                    temp_data.length === 1 &&
                    page === 1
                  ) {
                    const get_data = temp_data.length > 0 ? temp_data[0] : null;
                    //console.log("search barcode data ", data);
                    if (get_data) {
                      setTimeout(() => {
                        this.setState({ searchKey: "" });
                      }, 777);
                      this.showFormItem(get_data, get_data.price, "add");
                    }
                  }

                  this.setState({
                    dataMenuFav: this.state.searchKey === "" ? val : temp_data,
                    activeCategory: activeCategory,
                    activeCategoryIndex: -1,
                    loading: false
                  });
                }
              });
            }
          });
      } else {
        if (activeCategory === -1) {
          OfflineMenuFunctions.GetAllMenu(val => {
            //console.log("getAllMenu Offline ==> ", val);
            //this.setState({ lastUpdate: val });
            if (val) {
              let temp_data = [];
              val.map((v, i) => {
                if (
                  v.barcode === this.state.searchKey ||
                  v.name.toLowerCase() === this.state.searchKey.toLowerCase()
                ) {
                  temp_data.push(v);
                }
              });

              if (
                this.state.searchKey !== "" &&
                temp_data.length === 1 &&
                page === 1
              ) {
                const get_data = temp_data.length > 0 ? temp_data[0] : null;
                //console.log("search barcode data ", data);
                if (get_data) {
                  setTimeout(() => {
                    this.setState({ searchKey: "" });
                  }, 777);
                  this.showFormItem(get_data, get_data.price, "add");
                }
              }

              this.setState({
                dataMenuFav: this.state.searchKey === "" ? val : temp_data,
                activeCategory: activeCategory,
                activeCategoryIndex: -1,
                loading: false
              });
            }
          });
        } else if (activeCategory === 0) {
          OfflineMenuFunctions.GetFavMenu(val => {
            //console.log("GetFavMenu Offline ==> ", val);
            //this.setState({ lastUpdate: val });
            if (val) {
              let temp_data = [];
              val.map((v, i) => {
                if (
                  v.barcode === this.state.searchKey ||
                  v.name.toLowerCase() === this.state.searchKey.toLowerCase()
                ) {
                  temp_data.push(v);
                }
              });

              if (
                this.state.searchKey !== "" &&
                temp_data.length === 1 &&
                page === 1
              ) {
                const get_data = temp_data.length > 0 ? temp_data[0] : null;
                //console.log("search barcode data ", data);
                if (get_data) {
                  setTimeout(() => {
                    this.setState({ searchKey: "" });
                  }, 777);
                  this.showFormItem(get_data, get_data.price, "add");
                }
              }

              this.setState({
                dataMenuFav: this.state.searchKey === "" ? val : temp_data,
                activeCategory: activeCategory,
                activeCategoryIndex: 0,
                loading: false
              });
            }
          });
        }
      }
    });

    // NetInfo.fetch().then(state => {
    //   if (state.isConnected) {
    //   } else {
    //   }
    // });
  }

  getDataOffline() {
    OfflineMenuFunctions.GetCategoryMenu(val => {
      //console.log("GetCategoryMenu Offline ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        this.setState({
          dataCategory: val,
          categoryTotal: val.length
        });
      }
    });

    if (this.state.activeCategory === -1) {
      OfflineMenuFunctions.GetAllMenu(val => {
        //console.log("getAllMenu Offline ==> ", val);
        //this.setState({ lastUpdate: val });
        if (val) {
          this.setState({
            dataMenuFav: val,
            activeCategory: this.state.activeCategory,
            activeCategoryIndex: -1,
            loading: false
          });
        }
      });
    } else if (this.state.activeCategory === 0) {
      OfflineMenuFunctions.GetFavMenu(val => {
        //console.log("GetFavMenu Offline ==> ", val);
        //this.setState({ lastUpdate: val });
        if (val) {
          this.setState({
            dataMenuFav: val,
            activeCategory: this.state.activeCategory,
            activeCategoryIndex: 0,
            loading: false
          });
        }
      });
    }
  }

  getDataCategory(search = this.state.searchKey) {
    const gerai_id = this.state.userInfo.gerai_id;

    const retail_id = this.state.userInfo.retail_id;

    // let uri = `${GetCategoryMenuAPI}?gerai_id=${gerai_id}&search=&page=1`;

    let uri = `${BE_Get_Product_Category}/lite?business_id=${retail_id}&outlet_id=${gerai_id}&status=active&search=&page=1`;
    //console.log("getData Category uri ==> ", uri);

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result;

            if (result.statusCode === 200) {
              const data_temp = resultData.data;
              let data_category = [];

              data_temp.map((v, i) => {
                if (v.Products.length > 0) {
                  //console.log('is Single ==> ', v.options[0]);
                  data_category.push(v);
                }
              });

              OfflineMenuFunctions.SaveCategoryMenu(data_category, val => { });

              this.setState({
                dataCategory: data_category,
                //categoryTotal: resultData.pagination.total_records
                categoryTotal: data_category.length
              });
            } else {
              this.setState({
                dataCategory: [],
                //categoryTotal: resultData.pagination.total_records
                categoryTotal: 0
              });
            }
            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {
            OfflineMenuFunctions.GetCategoryMenu(val => {
              //console.log("GetCategoryMenu Offline ==> ", val);
              //this.setState({ lastUpdate: val });
              if (val) {
                this.setState({
                  dataCategory: val,
                  categoryTotal: val.length
                });
              }
            });
          });
      } else {
        OfflineMenuFunctions.GetCategoryMenu(val => {
          //console.log("GetCategoryMenu Offline ==> ", val);
          //this.setState({ lastUpdate: val });
          if (val) {
            this.setState({
              dataCategory: val,
              categoryTotal: val.length
            });
          }
        });
      }
    });
  }

  getMenuByCategory(
    search = this.state.searchKey,
    activeCategory = this.state.activeCategory,
    activeCategoryIndex = this.state.activeCategoryIndex,
    page = this.state.page
  ) {
    const gerai_id = this.state.userInfo.gerai_id;
    //let uri = `${GetMenuByCategoryAPI}?gerai_id=${gerai_id}&category_id=${activeCategory}&search=&page=1`;

    let uri = `${BE_Get_Product}/lite?outlet_id=${gerai_id}&product_category_id=${activeCategory}&name=${search}&status=active&page=${page}&per_page=18`;

    this.setState({
      loading: true
    });

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result;
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            if (responseJson.statusCode === 200) {
              let tempData = this.state.dataMenuFav;
              let dataCombi = [...tempData, ...resultData.data];
              // page === 1 ? resultData.data : dataCombi,

              this.setState({
                dataMenuFav: page === 1 ? resultData.data : dataCombi,
                dataMenu: resultData.data,
                activeCategory: activeCategory,
                activeCategoryIndex: activeCategoryIndex,
                loading: false,
                page: page,
                maxPage: responseJson.pagination.total_page
              });
            } else {
              this.setState({
                dataMenuFav: resultData.data,
                dataMenu: resultData.data,
                activeCategory: activeCategory,
                activeCategoryIndex: activeCategoryIndex,
                loading: false,
                page: 1,
                maxPage: 1
              });
            }
            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {
            this.setState({
              dataMenuFav: [],
              dataMenu: [],
              activeCategory: activeCategory,
              activeCategoryIndex: activeCategoryIndex,
              loading: false,
              page: 1,
              maxPage: 1
            });
          });
      } else {
        //console.log("getMenuByCategory Offline");

        const all_menu = this.state.dataOfflineMenu;

        let temp_menu = [];

        all_menu.map((v, i) => {
          if (v.product_category_id) {
            if (
              v.product_category_id.toString() === activeCategory.toString()
            ) {
              temp_menu.push(v);
            }
          }
        });

        this.setState({
          dataMenuFav: temp_menu,
          activeCategory: activeCategory,
          activeCategoryIndex: activeCategoryIndex,
          loading: false,
          page: 1,
          maxPage: 1
        });
      }
    });
  }

  getAddonsByMenuOld(id = this.state.selectedProduct.id, action = "add") {
    //id = 1;
    let uri = `${GetMenuAddonsAPI}?id=${id}`;

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET"
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result.data;
            //console.log("getData Addons ==> ", result);
            let defaultProductSelection = [];
            if (resultData.length > 0) {
              resultData.map((v, i) => {
                if (v.type === "single") {
                  //console.log('is Single ==> ', v.options[0]);

                  let firstData = v.options[0];
                  let temp = {
                    id: firstData.id,
                    name: firstData.name,
                    price: firstData.price,
                    //available: firstData.available,
                    parentId: v.id
                  };
                  defaultProductSelection.push(temp);
                }
              });
            }

            if (action === "add") {
              this.setState({
                additionalList: resultData,
                additionalProduct: defaultProductSelection,
                loading: false
              });
            } else {
              this.setState({
                additionalList: resultData,
                loading: false
              });
            }

            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {
            console.log("ERR ==> ", _err);
          });
      } else {
        const all_addons = this.state.dataOfflineAddons;

        let temp_addons = [];

        all_addons.map((val, index) => {
          //console.log("Get Addons Offline v ==> ", v);

          val.map((v, i) => {
            if (v.menu_id.toString() === id.toString()) {
              temp_addons.push(v);
            }
          });
          // if (v.menu_id.toString() === id.toString()) {
          //   temp_addons.push(v);
          // }
        });

        //console.log("Get Addons temp ==> ", temp_addons);

        let defaultProductSelection = [];
        temp_addons.map((v, i) => {
          if (v.type === "single") {
            //console.log('is Single ==> ', v.options[0]);

            let firstData = v.options[0];
            let temp = {
              id: firstData.id,
              name: firstData.name,
              price: firstData.price,
              //available: firstData.available,
              parentId: v.id
            };
            defaultProductSelection.push(temp);
          }
        });

        if (action === "add") {
          this.setState({
            additionalList: temp_addons,
            additionalProduct: defaultProductSelection,
            loading: false
          });
        } else {
          this.setState({
            additionalList: temp_addons,
            loading: false
          });
        }

        // this.setState({
        //   additionalList: temp_addons,
        //   loading: false
        // });
      }
    });
  }

  getAddonsByMenu(data = this.state.selectedProduct, action = "add") {
    //id = 1;
    //let uri = `${GetMenuAddonsAPI}?id=${id}`;

    let all_addons = data.Group_Addons;

    // if (action = "edit")

    let temp_addons = [];

    // all_addons.map((val, index) => {
    //   //console.log("Get Addons Offline v ==> ", v);

    //   val.map((v, i) => {
    //     //if (v.menu_id.toString() === id.toString()) {
    //     temp_addons.push(v);
    //     //}
    //   });
    //   // if (v.menu_id.toString() === id.toString()) {
    //   //   temp_addons.push(v);
    //   // }
    // });

    //console.log("Get Addons temp ==> ", temp_addons);

    let defaultProductSelection = [];
    all_addons.map((v, i) => {
      console.log("Get Addons All Addons ==> ", v);
      if (v.type === "single") {
        //console.log('is Single ==> ', v.options[0]);

        let firstData = v.Addons[0];
        let temp = {
          id: firstData.id,
          name: firstData.name,
          price: firstData.price,
          //available: firstData.available,
          parentId: v.id,
          status: v.status
        };
        defaultProductSelection.push(temp);
      }
    });

    if (action === "add") {
      this.setState({
        additionalList: all_addons,
        additionalProduct: defaultProductSelection,
        loading: false
      });
    } else {
      this.setState({
        additionalList: all_addons,
        loading: false
      });
    }

    // this.setState({
    //   additionalList: temp_addons,
    //   loading: false
    // });
  }

  selectDefaultSelection() {
    let defaultProductSelection = [];
    this.state.additionalList.map((v, i) => {
      if (v.type === "single") {
        //console.log('is Single ==> ', v.options[0]);

        let firstData = v.Addons[0];
        let temp = {
          id: firstData.id,
          name: firstData.name,
          price: firstData.price,
          //available: firstData.available,
          parentId: v.id
        };
        defaultProductSelection.push(temp);
      }
    });
    this.setState({ additionalProduct: defaultProductSelection });
  }

  cancelFormItem() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (this.state.formAction === "edit") {
      MenuFunctions.GetMenu(val => {
        if (val) {
          this.setState({ dataBill: val, formItem: false, showBill: true });
        }
      });
    } else {
      this.setState({ formItem: false });
    }
  }

  addNewName() {
    this.setState({ newName: "", showNameForm: true });
  }

  getCurrentLocation2() {
    Geolocation.getCurrentPosition(data => {
      let coords = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      };
      //console.log('Location Coords ==> ', coords);
      this.setState({ currentLoc: coords, ready: true });
    });
  }

  getCurrentLocation() {
    //untuk emulator
    let coords = {
      latitude: -6.1402746,
      longitude: 106.8520526
    };
    this.setState({ currentLoc: coords, ready: true });
  }

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        //this._getPaketPromo();
        //console.log("Refreshing");
        this.setState({
          refreshing: false
        });
      }
    );
  };

  deleteBill(index) {
    let { dataBill } = this.state;

    this.setState({ loading: true });
    setTimeout(() => {
      dataBill.splice(index, 1);

      let tempData = [];
      MenuFunctions.SaveMenu(dataBill, val => {
        //console.log("Sukses Delete");
        //tempData = val;

        this.setState({ dataBill: val, showBill: false });

        this.setState({ showBill: true, loading: false });
      });
    }, 100);

    // setTimeout(() => {
    //   this.setState({ showBill: true, loading: false });
    // }, 150);
  }

  modifyBillChangeGojek(type, oldtype) {
    let { dataBill, salesTypeTax, additionalSalesType } = this.state;

    //console.log("additionalSalesType ==> ", additionalSalesType);

    let additional_charge = 0;
    //console.log("type ===> ", type.toString());

    let selected_new = {};
    additionalSalesType.map((v, i) => {
      if (v.id.toString() === type.toString()) {
        selected_new = v;
      }
    });

    dataBill.map((v, i) => {
      let tempData = dataBill[i];

      let salesTypeValue = v.salesTypeValue;
      let salesType = v.salesType;

      if (selected_new.charge > 0) {
        tempData.salesType = type;

        tempData.salesTypeValue = v.price * (selected_new.charge / 100);
        tempData.salesTypeName = selected_new.name;
        tempData.total =
          (v.price + v.price * (selected_new.charge / 100)) * v.qty;
      } else if (selected_new.charge === 0) {
        tempData.salesType = type;
        tempData.salesTypeValue = 0;
        tempData.salesTypeName = selected_new.name;
        tempData.total = v.total - salesTypeValue;
      }

      dataBill[i] = tempData;

      //console.log("tempData after ==> ", tempData);
    });

    //console.log("dataBill after ==> ", dataBill);

    //MenuFunctions.SaveMenu(dataBill, val => {});

    this.setState({
      //selectedTable: items.name,
      //dataBill: dataBill,
      selectedSalesType: type,
      showAdditionalSalesType: false,
      salesTypeName: selected_new.name
    });
  }

  addOrder() {
    const {
      productPrice,
      selectedQuantity,
      selectedProduct,
      dataBill,
      additionalProduct,
      selectedCatatan,
      formIndex,
      formAction,
      salesTypeTax,
      salesTypeValue,
      formSalesType,
      salesTypeName
    } = this.state;

    let showBill = false;

    let productPrice_temp = this.state.currencyAllowDecimal
      ? parseFloat(this.state.productPrice)
      : parseInt(this.state.productPrice);
    let salesTypeValue_temp = this.state.currencyAllowDecimal
      ? parseFloat(this.state.salesTypeValue)
      : parseInt(this.state.salesTypeValue);

    let status = 1;
    if (formAction === "edit") {
      status = dataBill[formIndex].status;
      showBill = true;
    }

    let harga_number = productPrice_temp + salesTypeValue_temp;
    let harga_total = harga_number * Decimalize(this.state.selectedQuantity, 4);
    harga_total = Decimalize(
      harga_total,
      this.state.currencyAllowDecimal ? 2 : 0
    );

    let dataAdd = {
      id: dataBill.length + 1,
      product: selectedProduct,
      product_id: selectedProduct.id
        ? selectedProduct.id
        : selectedProduct.product_id,
      name: selectedProduct.name,
      qty: Decimalize(selectedQuantity, 4),
      price: productPrice_temp,
      total: harga_total,
      notes: selectedCatatan,
      detail: additionalProduct,
      salesType: formSalesType,
      salesTypeValue: salesTypeValue_temp,
      salesTypeName: salesTypeName,
      status: status,
      nego: false

      //new data
    };

    // let discount = 0;

    // let dataAddNew = {
    //   sales_type_id: formSalesType === "Take-Away" ? 1 : formSalesType === "Dine-In" ? 2 : 3,
    //   product_id: selectedProduct.id,
    //   quantity: selectedQuantity,
    //   price_product: selectedProduct.price,
    //   price_discount: 0,
    //   price_service: salesTypeValue,
    //   price_addons_total: productPrice - selectedProduct.price,
    //   price_total: (salesTypeValue + productPrice - discount) * selectedQuantity
    // };

    let productId = selectedProduct.id;

    let detailString = "";
    additionalProduct.map((items, itemIndex) => {
      if (detailString === "") {
        detailString = items.name;
      } else {
        detailString = detailString + ", " + items.name;
      }
    });

    let qtyOld = 0;
    let totalOld = 0;

    if (formAction === "add") {
      let sameIdIndex = -1;

      this.state.dataBill.map((v, i) => {
        let detailStringCompare = "";

        let sameDetail = false;
        let sameNotes = false;
        let sameId = false;
        let sameSalesType = false;

        v.detail.map((items, itemIndex) => {
          if (detailStringCompare === "") {
            detailStringCompare = items.name;
          } else {
            detailStringCompare = detailStringCompare + ", " + items.name;
          }
        });
        if (detailStringCompare === detailString) {
          sameDetail = true;
        }
        if (v.notes === selectedCatatan) {
          sameNotes = true;
        }
        if (v.product.id === productId) {
          sameId = true;
        }
        if (v.salesType === formSalesType) {
          sameSalesType = true;
        }

        if (
          sameNotes === true &&
          sameDetail === true &&
          sameId === true &&
          sameSalesType === true
        ) {
          sameIdIndex = i;
          qtyOld = v.qty;
          totalOld = v.total;
        }
      });

      if (sameIdIndex === -1) {
        //jika beda maka akan seperti biasa
        dataBill.push(dataAdd);
        MenuFunctions.SaveMenu(dataBill, val => { });
      } else {
        //dataAdd.total = totalOld + dataAdd.total;
        //dataAdd.qty = qtyOld + selectedQuantity;
        //

        dataAdd.total =
          Decimalize(totalOld, this.state.currencyAllowDecimal ? 2 : 0) +
          Decimalize(dataAdd.total, this.state.currencyAllowDecimal ? 2 : 0);

        dataAdd.qty =
          parseFloat(Decimalize(qtyOld, 3)) +
          parseFloat(Decimalize(selectedQuantity, 3));

        dataBill[sameIdIndex] = dataAdd;
        MenuFunctions.SaveMenu(dataBill, val => { });
      }

      this.setState({
        dataBill: dataBill,
        formItem: false
      });
    } else if (formAction === "edit") {
      dataBill[formIndex] = dataAdd;
      MenuFunctions.SaveMenu(dataBill, val => { });
      this.setState({
        dataBill: dataBill,
        formItem: false,
        showBill: showBill
      });
    }

    // const exampleData = {
    //   id: 1,
    //   name: "Banana Smoothies",
    //   qty: 2,
    //   price: 50000,
    //   total: 70000,
    //   detail: [
    //     {
    //       id: 1,
    //       name: "Less Ice"
    //     },
    //     {
    //       id: 2,
    //       name: "Less Sugar"
    //     }
    //   ]
    // };
  }

  checkOutAction(action = "") {
    let order_id = this.state.order_id;
    this.setState({ loading: true });
    //console.log("<== checkOutAction separator ==> ", order_id);

    //console.log("checkOutAction ==> ", order_id);
    if (order_id === null) {
      this.checkOutNew();

      //this.connect(this.state.printer_kitchen.address);
      // setTimeout(() => {
      //   //this.connect(this.state.printer_kitchen.address);
      // }, 500);
    } else {
      this.checkOutUpdate(action);
      //this.connect(this.state.printer_kitchen.address);
      // setTimeout(() => {
      // }, 500);
    }
  }

  reprintKitchen(update, retry = 0, type) {
    if (parseInt(retry) < 3 && this.state.printer_kitchen) {
      this.connect(this.state.printer_kitchen.address);
      setTimeout(() => {
        this.printKitchen(null, retry, type);
      }, 750);
    }
  }

  reprintKitchenMain(update, retry = 0, type) {
    if (parseInt(retry) < 4 && this.state.printer_main) {
      this.connect(this.state.printer_main.address);
      setTimeout(() => {
        this.printKitchen(null, retry, type);
      }, 750);
    }
  }

  checkOutNew() {
    const {
      dataBill,
      userInfo,
      selectedSalesType,
      selectedTable,
      order_id,
      savedTableId
    } = this.state;
    this.setState({ loading: true });
    let table_id = 0;
    let messageError = [];

    if (
      selectedSalesType.toString() ===
      this.state.sales_type_dine_in_id.toString()
    ) {
      table_id = selectedTable.id;

      if (table_id === 0) {
        //messageError.push("Tidak ada meja yang tersedia");

        messageError.push(_error_1[this.state.languageIndex]);
      }
    } else {
      table_id = 0;
    }

    let kode = this.state.transactionId;

    const contoh_post_result = {
      statusCode: 201,
      message: "success",
      data: {
        status: "new",
        id: 68,
        outlet_id: 1,
        business_id: 1,
        user_id: 1,
        receipt_id: "1:20/10/06:09:28:52",
        updatedAt: "2020-10-13T10:00:22.863Z",
        createdAt: "2020-10-13T10:00:22.863Z"
      }
    };

    const data = {
      retail_id: userInfo.retail_id,
      gerai_id: userInfo.gerai_id,
      time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      booking_id: this.state.booking_id,
      customer_id: this.state.customer_id,
      table_id: table_id,
      cashier_id: userInfo.id,
      detail: dataBill,
      kode: kode
    };

    const detail = data.detail;

    let items = [];

    const contoh_post_dine_in = {};

    detail.map((v, i) => {
      let addons = [];
      v.detail.map((val, index) => {
        //const contoh_data = {id: 6, name: "Sosis", price: 2000, parentId: 3}

        let addons_data_temp = {
          id: val.id,
          price: val.price
        };
        addons.push(addons_data_temp);
      });
      let temp_data = {
        sales_type_id: v.salesType,
        product_id: v.product.id,
        quantity: v.qty,
        price_product: v.product.price,
        price_discount: 0,
        price_service: v.salesTypeValue, //butuh diupdate lg nanti
        price_addons_total: v.price - v.product.price,
        // price_total: (v.product.price * v.qty) + (v.salesTypeValue * v.qty) + ((v.price - v.product.price) * v.qty),
        // price_total:
        //   (v.product.price + v.salesTypeValue + (v.price - v.product.price)) *
        //   v.qty,
        price_total: this.state.currencyAllowDecimal
          ? parseFloat(v.total).toFixed(2)
          : parseInt(v.total),
        notes: v.notes,
        addons: addons
      };
      items.push(temp_data);
    });

    if (dataBill.length === 0) {
      //messageError.push("Pesanan tidak boleh kosong");
      messageError.push(_error_2[this.state.languageIndex]);
    }

    if (messageError.length === 0) {
      NetInfo.fetch().then(state => {
        //debug offline

        let dine_in = false;

        if (table_id !== 0) {
          dine_in = true;
        }

        if (dine_in && state.isConnected) {
          //SAVE Dine In Bikin Baru
          fetch(BE_Save_Transaction, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: this.state.auth
              //"Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
              items: items,
              table_id: table_id,
              receipt_id: kode
            })
          })
            .then(response => response.json())
            .then(responseJson => {
              //console.log("responseJson New order dine in ==> ", responseJson);
              let result = responseJson;
              if (result.statusCode === 201) {
                const order_id = result.data.id;
                // MenuFunctions.SaveOrderID(order_id, val => {
                // });
                //console.log('new data ==>', JSON.stringify(data))
                //this.setState({ loading: false });

                let message = [];
                message.push(_berhasil_tambah[this.state.languageIndex]);
                //message.push(result.message);
                //this.connect(this.state.printer_kitchen.address);
                // setTimeout(() => {
                //
                // }, 500);

                if (this.state.printer_kitchen) {
                  this.connect(this.state.printer_kitchen.address);
                  setTimeout(() => {
                    this.printKitchen();
                    setTimeout(() => {
                      this.setState({
                        loading: false,
                        showAlert: true,
                        alertMessage: message
                      });

                      if (this.state.printer3) {
                        if (this.state.printer_label) {
                          this.printLabel();
                        }
                      }

                      this.newOrder();
                      Actions.pop();
                    }, 1500);
                  }, 500);
                } else {
                  setTimeout(() => {
                    this.setState({
                      loading: false,
                      showAlert: true,
                      alertMessage: message
                    });

                    this.newOrder();
                    Actions.pop();
                  }, 1500);
                }
              } else {
                let message = [];
                //message.push(result.message);

                message.push(_gagal[this.state.languageIndex]);

                this.setState({
                  loading: false,
                  showAlert: true,
                  alertMessage: message
                });
                // alert(result.message);
              }
            })
            .catch(_err => {
              console.log("ERR ==> ", _err);
              let message = [];
              //message.push(result.message);

              message.push(_gagal[this.state.languageIndex]);

              this.setState({
                loading: false,
                showAlert: true,
                alertMessage: message
              });

              //this.setState({ loading: false });
            });
        } else {
          //checkout New offline
          let subTotal = 0;
          let totalQty = 0;
          dataBill.map((v, i) => {
            totalQty = totalQty + v.qty;
            subTotal = subTotal + v.qty * v.price;
            subTotal = subTotal + v.qty * v.salesTypeValue;
          });

          let total_add = 1 + this.state.services + this.state.tax;

          let total_services = Math.ceil(subTotal * this.state.services);

          let total_tax = Math.ceil(subTotal * this.state.tax);

          const result_order_offline = {
            additional_table: "0",
            booking_id: this.state.booking_id,
            cashier_id: userInfo.id,
            retail_id: userInfo.retail_id,
            gerai_id: userInfo.gerai_id,
            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            created_by: null,
            customer_id: 0,
            deleted_at: null,
            id: order_id,
            notes: this.state.transactionId,
            payment_id: "0",
            status: "new",
            table_id: table_id,
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            time_out: null,
            total_payment: subTotal + total_services + total_tax,
            total_qty: totalQty,
            transaction_id: this.state.transactionId,
            update_by: null,
            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          };

          let payment_props = {
            auth: this.state.auth,
            orderId: order_id,
            dataOrder: result_order_offline,
            dataBill: dataBill,
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            selectedTable: this.state.selectedTable,
            languageIndex: this.state.languageIndex,
            items: items,
            tax: this.state.tax,
            services: this.state.services
            //customer_id: this.state.customer_id, checkout new
          };

          console.log("GO PAYMENT PROPS ===> ", payment_props);
          //console.log("mobilebayar1")
          Actions.MobileBayar({
            auth: this.state.auth,
            orderId: order_id,
            dataOrder: result_order_offline,
            dataBill: dataBill,
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            selectedTable: this.state.selectedTable,
            languageIndex: this.state.languageIndex,
            items: items,
            tax: this.state.tax,
            services: this.state.services,
            withTax: this.state.withTax,
            withServices: this.state.withServices

            //customer_id: this.state.customer_id, checkout new
          });

          this.setState({
            loading: false,
            showBill: false
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        showAlert: true,
        alertMessage: messageError
      });
    }
  }

  checkOutDelete() {
    const { order_id } = this.state;
    let uri = `${BE_Update_Transaction}${order_id}`;

    const items = [];
    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        items: items
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //this.closeModalTable();
        this.setState({ loading: false });
        const message = _delete_berhasil;
        alert(message[this.state.languageIndex]);

        this.newOrder(true, true);
        Actions.pop();
      });
  }

  checkOutUpdate(action = "") {
    let { dataBill, userInfo, order_id, savedTableId } = this.state;
    this.setState({ loading: true });
    //const table_id = savedTableId;

    let detail = dataBill;

    let items = [];
    //console.log("detail ==> ", detail);
    detail.map((v, i) => {
      let addons = [];
      v.detail.map((val, index) => {
        //const contoh_data = {id: 6, name: "Sosis", price: 2000, parentId: 3}

        let addons_data_temp = {
          id: val.id,
          price: val.price
        };
        addons.push(addons_data_temp);
      });

      //console.log("v.detail ==> ", v);

      let temp_data = {
        sales_type_id: v.salesType,
        product_id: v.product_id,
        quantity: v.qty,
        price_product: v.product.price,
        price_discount: 0,
        price_service: v.salesTypeValue, //butuh diupdate lg nanti
        price_addons_total: v.price - v.product.price,
        // price_total: (v.product.price * v.qty) + (v.salesTypeValue * v.qty) + ((v.price - v.product.price) * v.qty),
        // price_total:
        //   (v.product.price + v.salesTypeValue + (v.price - v.product.price)) *
        //   v.qty,
        price_total: this.state.currencyAllowDecimal
          ? parseFloat(v.total).toFixed(2)
          : parseInt(v.total),
        notes: v.notes,
        addons: addons,
        status: v.status
      };
      items.push(temp_data);
    });

    //console.log("items update order ==> ", items);

    let contoh_output = {
      statusCode: 201,
      message: "success",
      data: {
        id: 68,
        outlet_id: 1,
        business_id: 1,
        user_id: 1,
        booking_id: null,
        customer_id: null,
        receipt_id: "1:20/10/06:09:28:52",
        status: "new",
        createdAt: "2020-10-13T10:00:22.000Z",
        updatedAt: "2020-10-13T10:00:22.000Z",
        deletedAt: null
      }
    };
    //console.log("user INFO ==> ", userInfo);
    let messageError = [];
    if (dataBill.length === 0) {
      //messageError.push("Pesanan tidak boleh kosong");
      messageError.push(_error_2[this.state.languageIndex]);
    }

    let uri = `${BE_Update_Transaction}${order_id}`;
    if (messageError.length === 0) {
      NetInfo.fetch().then(state => {
        //debug offline
        if (state.isConnected) {
          fetch(uri, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: this.state.auth
              //"Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
              items: items
            })
          })
            .then(response => response.json())
            .then(responseJson => {
              // let result = responseJson;
              let resultOrder = responseJson.data;
              //console.log('new data ==>', JSON.stringify(data))
              this.setState({ loading: false });

              let subTotal = 0;
              let totalQty = 0;
              dataBill.map((v, i) => {
                totalQty = totalQty + v.qty;
                subTotal = subTotal + v.qty * v.price;
                subTotal = subTotal + v.qty * v.salesTypeValue;
              });

              let total_add = 1 + this.state.services + this.state.tax;

              let total_services = Math.ceil(subTotal * this.state.services);

              let total_tax = Math.ceil(subTotal * this.state.tax);

              const result_order_offline = {
                additional_table: "0",
                booking_id: resultOrder.booking_id
                  ? resultOrder.booking_id
                  : "",
                cashier_id: userInfo.id,
                retail_id: userInfo.retail_id,
                gerai_id: userInfo.gerai_id,
                created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                created_by: null,
                customer_id: this.state.customer_id,
                deleted_at: null,
                id: order_id,
                notes: resultOrder.receipt_id,
                payment_id: "0",
                status: resultOrder.status,
                table_id: savedTableId,
                time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                time_out: null,
                total_payment: subTotal + total_services + total_tax,
                total_qty: totalQty,
                transaction_id: resultOrder.receipt_id,
                update_by: null,
                updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
              };

              if (action === "pay") {
                //this.connect(this.state.printer_kitchen.address);

                const payment_props = {
                  auth: this.state.auth,
                  orderId: order_id,
                  dataOrder: result_order_offline,
                  dataBill: dataBill,
                  userInfo: this.state.userInfo,
                  colorIndex: this.state.colorIndex,
                  selectedTable: this.state.selectedTable,
                  languageIndex: this.state.languageIndex,
                  items: items,
                  tax: this.state.tax,
                  services: this.state.services,
                  print_kitchen: false,
                  customer_id: this.state.customer_id
                };
                console.log("GO PAYMENT PROPS UPDATE ===> ", payment_props);
                //console.log("mobilebayar2");
                Actions.MobileBayar({
                  auth: this.state.auth,
                  orderId: order_id,
                  dataOrder: result_order_offline,
                  dataBill: dataBill,
                  userInfo: this.state.userInfo,
                  colorIndex: this.state.colorIndex,
                  selectedTable: this.state.selectedTable,
                  languageIndex: this.state.languageIndex,
                  items: items,
                  tax: this.state.tax,
                  services: this.state.services,
                  print_kitchen: false,
                  customer_id: this.state.customer_id,
                  withTax: this.state.withTax,
                  withServices: this.state.withServices
                });

                this.setState({
                  loading: false,
                  showBill: false
                });
              } else {
                let message = [];

                //message.push(responseJson.message);

                if (responseJson.statusCode === 201) {
                  message.push(_berhasil_update[this.state.languageIndex]);

                  if (this.state.printer_kitchen) {
                    this.connect(this.state.printer_kitchen.address);
                    setTimeout(() => {
                      this.printKitchen(responseJson.data.times_updated);

                      setTimeout(() => {
                        if (this.state.printer3) {
                          if (this.state.printer_label) {
                            this.printLabel();
                          }
                        }
                      }, 1500);
                    }, 500);
                  }
                } else {
                  message.push(_gagal[this.state.languageIndex]);
                }

                this.setState({
                  loading: false,
                  showAlert: true,
                  alertMessage: message
                });

                Actions.pop();
              }
            })
            .catch(_err => {
              console.log("ERR ==> ", _err);
            });
        } else {
          let subTotal = 0;
          let totalQty = 0;
          dataBill.map((v, i) => {
            totalQty = totalQty + v.qty;
            subTotal = subTotal + v.qty * v.price;
            subTotal = subTotal + v.qty * v.salesTypeValue;
          });

          let total_add = 1 + this.state.services + this.state.tax;

          let total_services = Math.ceil(subTotal * this.state.services);

          let total_tax = Math.ceil(subTotal * this.state.tax);

          const result_order_offline = {
            additional_table: "0",
            booking_id: this.state.booking_id,
            cashier_id: userInfo.id,
            retail_id: userInfo.retail_id,
            gerai_id: userInfo.gerai_id,
            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            created_by: null,
            customer_id: this.state.customer_id,
            deleted_at: null,
            id: order_id,
            notes: this.state.transactionId,
            payment_id: "0",
            status: "new",
            table_id: savedTableId,
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            time_out: null,
            total_payment: subTotal + total_services + total_tax,
            total_qty: totalQty,
            transaction_id: "0",
            update_by: null,
            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          };
          //console.log("mobilebayar3");
          Actions.MobileBayar({
            auth: this.state.auth,
            orderId: order_id,
            dataOrder: result_order_offline,
            dataBill: dataBill,
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            selectedTable: this.state.selectedTable,
            languageIndex: this.state.languageIndex,
            tax: this.state.tax,
            services: this.state.services,
            customer_id: this.state.customer_id,
            withTax: this.state.withTax,
            withServices: this.state.withServices
          });
          this.setState({
            loading: false,
            showBill: false
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        showAlert: true,
        alertMessage: messageError
      });
    }
  }



  changeQty(index, val = 1) {
    let { dataBill } = this.state;
    let tempData = dataBill[index];

    const checkDecimal = HasDecimal(tempData.qty);

    if (checkDecimal) {
      //decimal
      this.editOrderForm(tempData, index);
    } else {
      tempData.qty = tempData.qty + val;

      if (this.state.currencyAllowDecimal) {
        tempData.total =
          (parseFloat(tempData.price) + parseFloat(tempData.salesTypeValue)) *
          parseInt(tempData.qty);
      } else {
        tempData.total =
          (parseInt(tempData.price) + parseInt(tempData.salesTypeValue)) *
          parseInt(tempData.qty);
      }

      dataBill[index] = tempData;

      if (tempData.qty > 0) {
        MenuFunctions.SaveMenu(dataBill, val => { });
        this.setState({ dataBill: dataBill });
      } else {
        this.deleteBill(index);
      }
    }
  }

  changeTotal(index, value) {
    let { dataBill } = this.state;
    let tempData = dataBill[index];
    tempData.total = value;
    dataBill[index] = tempData;
    MenuFunctions.SaveMenu(dataBill, val => { });
    this.setState({ dataBill: dataBill });
  }

  changeChecklistNego(index, value) {
    let { dataBill } = this.state;
    let tempData = dataBill[index];
    tempData.nego = !value;

    if (!value === false) {
      tempData.total = tempData.price * tempData.qty;
    }

    dataBill[index] = tempData;
    MenuFunctions.SaveMenu(dataBill, val => { });
    this.setState({ dataBill: dataBill });
  }

  changeChecklistDone(index, value) {
    let { dataBill } = this.state;
    let tempData = dataBill[index];

    tempData.status =
      tempData.status === "on progress" ? "done" : "on progress";
    MenuFunctions.SaveMenu(dataBill, val => { });
    this.setState({ dataBill: dataBill });
  }

  changeQtyProduct(val = 1) {
    let { selectedQuantity } = this.state;
    let newQty = selectedQuantity + val;
    if (newQty > 0) {
      this.setState({ selectedQuantity: newQty });
    }
  }

  _renderFooter() {
    return <View style={{ height: 50 }} />;
  }

  renderKategoriTop(data, index) {
    //console.log("renderKategoriTop ==> ", data);

    const { showFilter } = this.state;

    return (
      <Button
        onPress={() => {
          this.getMenuByCategory("", data.id, index + 1, 1);
          // LayoutAnimation.configureNext(
          //   LayoutAnimation.Presets.easeInEaseOut
          // );
          //this.changeDateToday();
        }}
        style={{
          marginTop: 0,
          //width: "100%",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
          paddingBottom:
            this.state.activeCategory === data.id && !showFilter ? 5 : 10,
          borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
          borderBottomWidth:
            this.state.activeCategory === data.id && !showFilter ? 5 : 0
          //alignItems: 'center',
        }}
      >
        <Text
          style={[
            MainStyle.robotoNormalBold,
            {
              fontSize: 12,
              color:
                this.state.activeCategory === data.id && !showFilter
                  ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  : BLACK
            }
          ]}
        >
          {data.name}
        </Text>
      </Button>
    );
  }

  downButtonHandler = new_index => {
    let activeCategory = new_index;

    const { categoryTotal } = this.state;

    let x_pos = 0;

    //console.log("downButtonHandler new_index ==> ", new_index);
    //console.log("downButtonHandler x_pos ==> ", x_pos);

    if (activeCategory === categoryTotal) {
      activeCategory = activeCategory - 1;
    }

    x_pos = this.arrLoc[activeCategory];

    if (activeCategory === -1) {
      activeCategory = -1;
      x_pos = 0;
      //alert("back to fav");
    }

    if (this.arrLoc.length >= activeCategory) {
      // To Scroll to the index 5 element
      this.scrollview_ref.scrollTo({
        x: x_pos,
        y: 0,
        animated: true
      });
    } else {
      //alert('Out of Max Index');
    }
  };

  renderOrderInformation() {
    let table = "-";

    //console.log("this.state.selectedSalesType ===> ", this.state.selectedSalesType)

    //console.log("this.state.sales_type_dine_in_id ===> ", this.state.sales_type_dine_in_id)

    if (
      this.state.selectedSalesType.toString() ===
      this.state.sales_type_dine_in_id.toString()
    ) {
      table = this.state.selectedTable.name;
    }

    return [
      <View
        style={{
          marginTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          //flexDirection: "row",
          justifyContent: "space-between",
          //backgroundColor: "#BCA",
          marginLeft: 15,
          marginRight: 15,
          width: this.state.tablet ? "66%" : "100%",
          alignSelf: "center",

          flexDirection: "row"
          // borderBottomWidth: 1,
          // borderColor: "#C8C7CC"
        }}
      >
        <View style={{ width: "35%" }}>
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
          >
            {_transaction_id[this.state.languageIndex]}:
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 11,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            {this.state.transactionId}
          </Text>
        </View>
        <View
          style={{
            width: "35%",
            display: this.state.business_type === "Restaurant" ? "flex" : "none"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: BLACK, textAlign: "center" }
            ]}
          >
            {_no_table[this.state.languageIndex]}:
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                textAlign: "center"
              }
            ]}
          >
            {table}
          </Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: BLACK, textAlign: "center" }
            ]}
          >
            {_cashier[this.state.languageIndex]}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                textAlign: "center"
              }
            ]}
          >
            {this.state.userInfo.name}
          </Text>
        </View>
      </View>,
      <View
        style={{ borderBottomWidth: 1, borderColor: "#C8C7CC", width: "100%" }}
      />
    ];
  }

  renderSearch() {
    if (this.state.formItem === false) {
      return (
        <View
          style={{
            marginBottom: 10,
            marginTop: 0,
            //flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: WHITE,
            paddingRight: 0,
            paddingLeft: 0
            //width: "200%"
          }}
        >
          <View
            style={{
              marginBottom: 10,
              marginLeft: 5,
              marginRight: 5,
              display: this.state.showFilter ? "flex" : "flex"
              //display: "flex"
            }}
          >
            <View
              style={{
                borderRadius: 5,
                //padding: 5,
                backgroundColor: "rgba(246, 246, 246, 0.95)",
                paddingLeft: 45,
                paddingRight: 15
              }}
            >
              {/* <Text>
                {this.state.showFilter.toString()}
              </Text> */}
              <TextInput
                style={{
                  //backgroundColor: 'transparent',
                  //backgroundColor: "rgba(246, 246, 246, 0.95)",
                  // borderRadius: 5,
                  // padding: 5,
                  // paddingLeft: 45,
                  // paddingRight: 15,
                  color: BLACK,
                  fontSize: 12,
                  fontFamily: "DMSans-Bold",
                  display: this.state.showFilter ? "none" : "flex"
                }}
                type="text"
                refx={q => {
                  this._search = q;
                }}
                onSubmitEditing={() => {
                  //this.getData(this.state.notes);
                  // this.setState({viewSearch: false});
                  this.getData(
                    this.state.searchKey,
                    this.state.activeCategory,
                    1
                  );
                }}
                // autoFocus={true}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={v => this.setState({ searchKey: v })}
                value={this.state.searchKey}
                showSoftInputOnFocus={true}
                placeholder={""}
              />
              <TextInput
                style={{
                  //backgroundColor: 'transparent',
                  //backgroundColor: "rgba(246, 246, 246, 0.95)",
                  // borderRadius: 5,
                  // padding: 5,
                  // paddingLeft: 45,
                  // paddingRight: 15,
                  color: BLACK,
                  fontSize: 12,
                  fontFamily: "DMSans-Bold",
                  display: this.state.showFilter ? "flex" : "none"
                }}
                type="text"
                refx={q => {
                  this._search_text = q;
                }}
                onSubmitEditing={() => {
                  //this.getData(this.state.notes);
                  // this.setState({viewSearch: false});
                  this.getData(
                    this.state.searchKey,
                    this.state.activeCategory,
                    1
                  );
                }}
                //autoFocus={true}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={v => this.setState({ searchKey: v })}
                value={this.state.searchKey}
                placeholder={""}
              />
              <Button
                style={{ position: "absolute", left: 10, top: 10 }}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  this.setState({ showFilter: !this.state.showFilter });

                  //this._search.focus();
                }}
              >
                <MaterialCommunityIcons
                  name={this.state.showFilter ? "keyboard" : "barcode-scan"}
                  style={{
                    alignSelf: "center",
                    fontSize: 25
                  }}
                  color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                />

                {/* <Ionicons
                  name={"md-search"}
                  size={25}
                  style={{
                    color: this.state.showFilter
                      ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      : "#C4C4C4"
                  }}
                /> */}
              </Button>

              <Button
                style={{ position: "absolute", right: 10, top: 10 }}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  this.setState({ showFilter: false, searchKey: "" });

                  this.getData("", this.state.activeCategory, 1);
                }}
              >
                <Ionicons
                  // name={"ios-close-circle-outline"}
                  name={"md-close"}
                  size={25}
                  color={BLACK}
                />
              </Button>

              <Button
                style={{
                  position: "absolute",
                  right: 30,
                  top: 10,
                  borderColor: BLACK,
                  borderWidth: 1,
                  borderRadius: 5
                }}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  //this.setState({ showFilter: false, searchKey: "" });

                  // this.showCamera(1);
                  this.setState({ showCamera: true });
                }}
              >
                {/* <MaterialCommunityIcons
                  name={"scan-helper"}
                  style={{
                    alignSelf: "center",
                    fontSize: 25
                  }}
                /> */}

                <MaterialCommunityIcons
                  name={"camera"}
                  style={{
                    alignSelf: "center",
                    fontSize: 25
                  }}
                />
              </Button>
            </View>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicato={false}
            horizontal={true}
            ref={ref => {
              this.scrollview_ref = ref;
            }}
            style={
              {
                //flex: 1
              }
            }
          >
            {/* <Button
              style={{ justifyContent: "center", padding: 5 }}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({ showFilter: !this.state.showFilter });
              }}
            >
              <Ionicons
                name={"md-search"}
                style={{
                  padding: 0,
                  fontSize: 20,
                  color: this.state.showFilter
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#C4C4C4"
                }}
              />
            </Button> */}
            <Button
              onPress={() => {
                this.getData("", -1, 1);

                // LayoutAnimation.configureNext(
                //   LayoutAnimation.Presets.easeInEaseOut
                // );
                //this.changeDateToday();
              }}
              style={{
                marginTop: 0,
                //width: "100%",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 10,
                paddingBottom:
                  this.state.activeCategory === -1 && !this.state.showFilter
                    ? 5
                    : 10,
                borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                borderBottomWidth:
                  this.state.activeCategory === -1 && !this.state.showFilter
                    ? 5
                    : 0
                //alignItems: 'center',
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 12,
                    color:
                      this.state.activeCategory === -1 && !this.state.showFilter
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : BLACK
                  }
                ]}
              >
                {_menu_all_short[this.state.languageIndex]}
              </Text>
            </Button>

            <Button
              onPress={() => {
                this.getData("", 0, 1);

                // LayoutAnimation.configureNext(
                //   LayoutAnimation.Presets.easeInEaseOut
                // );
                //this.changeDateToday();
              }}
              style={{
                marginTop: 0,
                //width: "100%",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 10,
                paddingBottom:
                  this.state.activeCategory === 0 && !this.state.showFilter
                    ? 5
                    : 10,
                borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                borderBottomWidth:
                  this.state.activeCategory === 0 && !this.state.showFilter
                    ? 5
                    : 0
                //alignItems: 'center',
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 12,
                    color:
                      this.state.activeCategory === 0 && !this.state.showFilter
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : BLACK
                  }
                ]}
              >
                {_menu_favorit_short[this.state.languageIndex]}
              </Text>
            </Button>
            {this.state.dataCategory.map((items, itemIndex) => {
              return (
                <View
                  onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    this.arrLoc[itemIndex] = layout.x;
                  }}
                >
                  {this.renderKategoriTop(items, itemIndex)}
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    } else {
      return <View />;
    }
  }

  barcodeRecognized = ({ barcodes }) => {
    if (this.state.loading === false) {
      // console.log("barcodeRecognized ========== >", barcodes)
      //let { onScan } = this.props;
      //this.setState({ barcodes });
      //let barcodeData = JSON.parse(barcodes[0].data);

      if (barcodes.length !== 0) {
        this.setState({ loading: true });

        let barcodeData = barcodes[0].data;

        this.setState(
          {
            searchKey: barcodeData,
            barcodeSearch: true,
            loading: false,
            showCamera: false
          },
          () => {
            this.getData(barcodeData, this.state.activeCategory, 1);
          }
        );
        this.setState({ loading: false });

      }


      // if (this.state.scanType === 1) {
      //   this.setState({
      //     searchKey: barcodeData,
      //     loading: false,
      //     showCamera: false
      //   });
      // } else if (this.state.scanType === 2) {
      //   this.setState({
      //     searchKey: barcodeData,
      //     loading: false,
      //     showCamera: false
      //   });
      // }
      //{"retail_id": "1","gerai_id": "1","table_id": "1", "ssid": "KX_CLC", "password": "13082017"}

      // let wifi = barcodeData.ssid;
      // let password = barcodeData.password;
      // let isWep = false; //android false

      // let retail_id = barcodeData.retail_id;
      // let gerai_id = barcodeData.gerai_id;
      // let table_id = barcodeData.table_id;

    }
  };

  logoutAction() {
    //this.setState({ userInfo: null });
    LoginFunctions.Logout(val => { });
    Actions.pop();
    Actions.pop();
    Actions.pop();

    if (this.state.tablet) {
      Actions.MobileLogin({
        userInfo: null,
        colorIndex: this.state.colorIndex,
        languageIndex: this.state.languageIndex
      });
    }
    else {
      Actions.MobileLoginOld({
        userInfo: null,
        colorIndex: this.state.colorIndex,
        languageIndex: this.state.languageIndex
      });
    }

  }

  renderFav(data, i) {
    let price = this.state.currencyAllowDecimal
      ? data.price
      : parseInt(data.price);
    return (
      <Button
        onPress={() => {
          this.showFormItem(data, data.price, "add");
        }}
        style={{
          borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
          borderWidth: 0,
          borderRadius: 10,
          elevation: 1,
          backgroundColor: "#EEE"
        }}
      >
        <View style={{ margin: 15, flexDirection: "row" }}>
          <View style={{ width: "75%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.state.currency}{" "}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.idrNumToStr(price)}
            </Text>
          </View>
        </View>
      </Button>
    );
  }

  renderDetail(data, i) {
    let price = this.state.currencyAllowDecimal
      ? data.price
      : parseInt(data.price);
    return (
      <Button
        onPress={() => {
          // this.setState({
          //   formItem: true,
          //   selectedProduct: data,
          //   productPrice: data.price
          // });
          this.showFormItem(data, data.price, "add");
        }}
        style={{
          borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
          borderRadius: 10,
          elevation: 1,
          backgroundColor: "#EEE"
        }}
      >
        <View style={{ margin: 15, flexDirection: "row" }}>
          <View style={{ width: "75%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.state.currency}{" "}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.idrNumToStr(price)}
            </Text>
          </View>
        </View>
      </Button>
    );
  }

  renderAllCategory(data, i) {
    return (
      <View>
        <View
          style={{
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 10,
            elevation: 1,
            backgroundColor: WHITE
          }}
        >
          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              let activeCategory =
                this.state.activeCategory === data.id ? 0 : data.id;

              this.getMenuByCategory("", activeCategory, i); // gad dipake

              //this.setState({activeCategoryIndex : i})
              //this.setState({ activeCategory: activeCategory });
            }}
          >
            <View style={{ margin: 15, flexDirection: "row" }}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 14, color: BLACK }
                  ]}
                >
                  {data.name}
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  alignSelf: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                {this.state.activeCategory === data.id ? (
                  <Entypo
                    name={"chevron-up"}
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: BLACK
                    }}
                  />
                ) : (
                  <Entypo
                    name={"chevron-down"}
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: BLACK
                    }}
                  />
                )}
              </View>
            </View>
          </Button>
        </View>
        {/* If Active */}
        {this.state.activeCategory === data.id ? (
          <View>
            <FlatList
              //ListHeaderComponent={}
              showsVerticalScrollIndicator={false}
              data={this.state.dataMenu}
              renderItem={({ item, index }) => {
                if (this.state.ready === true) {
                  return (
                    <View
                      style={{
                        marginLeft: 0,
                        marginTop: 0,
                        marginBottom: 3,
                        marginRight: 0,
                        borderColor: MAIN_THEME_COLOR_SELECT(
                          this.state.colorIndex
                        )
                      }}
                    >
                      {this.renderDetail(item, index)}
                    </View>
                  );
                } else {
                  return <View />;
                }
              }}
              //ListFooterComponent={this._renderFooter}
              keyExtractor={(item, index) => {
                return "CategoryRenderChild" + index.toString();
              }}
              onRefresh={this._onRefresh}
            //onEndReached={this.handleLoadMore}
            //onEndReachedThreshold={0.5}
            //refreshing={refreshing}
            />
            {this.state.dataMenu.length === 0 ? (
              <View
                style={{
                  marginLeft: 0,
                  marginTop: 0,
                  marginBottom: 3,
                  marginRight: 0,
                  borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: "#EEE",
                  borderRadius: 10
                }}
              >
                <View
                  style={{
                    margin: 15,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ width: "80%" }}>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 10, color: BLACK }
                      ]}
                    >
                      Menu tidak tersedia
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }

  showFormItem(product, price, action = "add") {
    this.setState({ loading: true });
    console.log("show form item product ===> ", product)

    let all_addons = product.Group_Addons;

    let new_price = this.state.currencyAllowDecimal
      ? parseFloat(price).toFixed(2)
      : parseInt(price);

    // if (action = "edit")

    let temp_addons = [];

    let defaultProductSelection = [];
    all_addons.map((v, i) => {
      if (v.type === "single") {
        //console.log('is Single ==> ', v.options[0]);

        let firstData = v.Addons[0];

        let temp = {
          id: firstData.id,
          name: firstData.name,
          price: firstData.price,
          //available: firstData.available,
          parentId: v.id,
          status: v.status
        };

        if (action === "add") {
          if (this.state.currencyAllowDecimal) {
            new_price = parseFloat(new_price) + parseFloat(temp.price);
          } else {
            new_price = parseInt(new_price) + parseInt(temp.price);
          }

          //console.log("new price ===> ", new_price)
        }

        defaultProductSelection.push(temp);
      }
    });

    if (action === "add") {
      this.setState({
        additionalList: all_addons,
        additionalProduct: defaultProductSelection,
        loading: false
      });
    } else {
      this.setState({
        additionalList: all_addons,
        loading: false
      });
    }

    // this.setState({
    //   additionalList: temp_addons,
    //   loading: false
    // });

    let sell_by_weight = product.sell_by_weight;

    this.setState({
      formItem: true,
      formShowWeight: sell_by_weight ? sell_by_weight : false,
      selectedProduct: product,
      productPrice: new_price,
      formAction: action,
      selectedQuantity: 1,
      selectedCatatan: "",
      formSalesType: this.state.selectedSalesType

      //additionalProduct: defaultProductSelection
    });

    this.formInitializeSalesType(new_price);
  }

  editOrderForm(data, index) {
    let data_product = data.product;

    const detail = data.detail;

    let all_addons = data_product.Group_Addons ? data_product.Group_Addons : [];


    //this.getAddonsByMenu(data.product, "edit");

    data_product.product_id = data.product_id;

    this.setState({
      additionalList: all_addons,
      showBill: false,
      formAction: "edit",
      formIndex: index,
      formItem: true,
      formShowWeight: false,
      productPrice: data.price,
      selectedProduct: data.product,
      selectedCatatan: data.notes,
      selectedQuantity: data.qty,
      additionalProduct: detail,
      formSalesType: data.salesType,
      salesTypeValue: data.salesTypeValue
    });
  }

  renderBill(data, i) {
    let detail = data.detail ? data.detail : null;
    let detailString = "";

    let image = "";
    //console.log("RenderBill ===> ", data);

    if (data.product) {
      if (data.product.image) {
        image = data.product.image;
      }
    }

    if (data.Product) {
      if (data.Product.image) {
        image = data.Product.image;
      }
    }

    if (data.image) {
      image = data.image;
    }

    //let total = data.qty * data.price + data.qty * data.salesTypeValue;

    let total = this.state.currencyAllowDecimal
      ? data.total
      : parseInt(data.total);

    // let subTotal = this.state.subTotal;
    // subTotal = subTotal + total;
    // this.setState({subTotal: subTotal});

    if (detail) {
      detail.map((items, itemIndex) => {
        if (detailString === "") {
          detailString = items.name;
        } else {
          detailString = detailString + ", " + items.name;
        }
      });
    }

    let width = Dimensions.get("window").width - 30;

    let long_name = data.name ? data.name.toUpperCase() : "";

    let short_name = "";

    let words = long_name.split(" ");

    words.map((items, itemIndex) => {
      short_name = short_name + items[0];
    });

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            width: this.state.tablet ? (width - 30) / 2 : width,
            //width: "120%",
            //width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
            //paddingBottom: 10,
            padding: 15,
            minHeight: 40,
            borderColor: "#C8C7CC",
            //borderColor: BLACK,
            borderBottomWidth: 0,
            backgroundColor: "#F7F7F7",
            marginRight: 25
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              width: "10%",
              flexDirection: "row",
              display: "none"
            }}
          >
            <Button
              onPress={() => {
                this.deleteBill(i);
                //this.changeQty(i);
              }}
            >
              <Entypo
                name={"circle-with-cross"}
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  color: RED_500
                }}
              />
            </Button>

            <Button
              onPress={() => {
                //this.deleteBill(i);
                //this.changeQty(i);
                this.editOrderForm(data, i);
              }}
            >
              <Entypo
                name={"edit"}
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  color: BLACK
                }}
              />
            </Button>
          </View>
          <Button
            onPress={() => {
              this.editOrderForm(data, i);
            }}
            style={{ borderRadius: 15 }}
          >
            {image !== "" ? (
              <View style={{ display: "none" }}>
                <Image
                  resizeMethod="resize"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    overflow: "hidden",
                    display: this.state.setting_light_mode ? "none" : "flex"
                    //alignSelf: "center"
                    //backgroundColor: "#888"
                  }}
                  resizeMode={"stretch"}
                  source={{ uri: BE_URI + image }}
                />
                <View
                  style={{
                    display: this.state.setting_light_mode ? "flex" : "none",
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    backgroundColor: "#EEEEEE",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { fontSize: 32, color: BLACK, textAlign: "center" }
                    ]}
                  >
                    {short_name}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ display: "none" }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    overflow: "hidden",
                    borderRadius: 10,
                    display: this.state.setting_light_mode ? "none" : "flex"
                  }}
                  source={require("../../Images/empty-image.png")}
                />
                <View
                  style={{
                    display: this.state.setting_light_mode ? "flex" : "none",
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    backgroundColor: "#EEEEEE",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { fontSize: 32, color: BLACK, textAlign: "center" }
                    ]}
                  >
                    {short_name}
                  </Text>
                </View>
              </View>
            )}
          </Button>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              width: "30%"
            }}
          >
            <Button
              onPress={() => {
                this.editOrderForm(data, i);
              }}
            // style={{ borderRadius: 15 }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {data.name}
              </Text>
            </Button>
            <Button
              onPress={() => {
                this.editOrderForm(data, i);
              }}
            // style={{ borderRadius: 15 }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
              >
                {detailString}
              </Text>
            </Button>

            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              {data.salesTypeName}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              {_catatan[this.state.languageIndex]}:{" "}
              {data.notes !== "" ? data.notes : "-"}
            </Text>

            <View
              style={{
                flex: 1,
                display: this.state.order_id ? "flex" : "none",
                alignContent: "flex-end",
                width: "100%",
                marginTop: 10,
                flexDirection: "row"
              }}
            >
              <Checkbox
                color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                checked={data.status === "done" ? true : false}
                action={() => {
                  //ganti checklist Nego
                  this.changeChecklistDone(i, data.nego);
                }}
              />
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: BLACK, alignSelf: "center" }
                ]}
              >
                {_done[this.state.languageIndex]}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                //alignItems: "flex-end",
                alignContent: "flex-end",
                display: this.state.access_change_price ? "flex" : "none",
                //justifyContent: "flex-end",
                //justifyContent: "center",
                //backgroundColor: "#BCA",
                width: "100%",
                marginTop: 10,
                flexDirection: "row"
              }}
            >
              <Checkbox
                color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                checked={data.nego}
                action={() => {
                  //ganti checklist Nego
                  this.changeChecklistNego(i, data.nego);
                }}
              />
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: BLACK, alignSelf: "center" }
                ]}
              >
                {_ubah_harga[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ width: "30%" }}>
            <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderRadius: 10,
                  //flex: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }}
              >
                <Button
                  onPress={() => {
                    this.changeQty(i, -1);
                    //this.changeQty(i);
                  }}
                >
                  <AntDesign
                    name={"minus"}
                    style={{
                      alignSelf: "center",
                      fontSize: 20,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    }}
                  />
                </Button>
                <View
                  style={{ width: "45%", marginRight: 5, alignItems: "center" }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {data.qty}
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    this.changeQty(i, 1);
                    //this.changeQty(i);
                  }}
                >
                  <AntDesign
                    name={"plus"}
                    style={{
                      alignSelf: "center",
                      fontSize: 20,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    }}
                  />
                </Button>
              </View>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                //justifyContent: 'flex-end',
                justifyContent: "center",
                width: "100%",
                marginTop: 10
              }}
            >
              {data.nego ? (
                <TextInput
                  style={{
                    //backgroundColor: 'transparent',
                    width: "100%",
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    borderRadius: 5,
                    paddingTop: -5,
                    paddingBottom: -5,
                    //padding: 5,
                    //paddingLeft: 15,
                    //paddingRight: 15,
                    textAlign: "right",
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    fontSize: 15,
                    fontFamily: "DMSans-Bold"
                  }}
                  keyboardType="numeric"
                  type="text"
                  refx={q => {
                    //this._notes = q;
                  }}
                  onSubmitEditing={() => {
                    //this.getData(this.state.notes);
                    // this.setState({viewSearch: false});
                    //this.searchMenu(this.state.searchKey);
                    //this.getData(this.state.searchKey);
                  }}
                  //onChangeText={(q)=>this._accountUpdate('username',q)}
                  onChangeText={v => {
                    //this.setState({ searchKey: v })
                    //this.changeTotal(i, v);
                    if (v === "") {
                      this.changeTotal(i, 0);
                    } else {
                      this.changeTotal(i, v);
                    }
                  }}
                  value={total.toString()}
                  placeholder={""}
                />
              ) : (
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 15, color: BLACK }
                  ]}
                >
                  {this.state.currency} {this.idrNumToStr(total)}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={{ width: 100 }}>
          <Button
            style={{
              backgroundColor: RED_500,
              flex: 1
              // alignItems: "center",
            }}
            onPress={() => {
              this.deleteBill(i);
              //this.changeQty(i);
            }}
          >
            <View
              style={{
                //backgroundColor: "#BCA",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              {/* <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: WHITE }]}
              >
                Delete
              </Text> */}
              <Entypo
                name={"trash"}
                style={{
                  // alignSelf: "center",
                  fontSize: 25,
                  color: WHITE
                }}
              />
            </View>
          </Button>
        </View>
      </ScrollView>
    );
  }

  changeAddons(dataOption, dataParent, selected) {
    let {
      additionalProduct,
      productPrice,
      salesTypeValue,
      salesTypeTax,
      formSalesType,
      additionalSalesType
    } = this.state;

    let parentId = dataParent.id;
    let type = dataParent.type;
    let optionPertama = dataParent.Addons[0];
    let isFirstOption = dataOption.id === optionPertama.id;

    let temp = {}; //default

    let sales_type = {};
    additionalSalesType.map((v, i) => {
      if (v.id.toString() === formSalesType.toString()) {
        sales_type = v;
      }
    });

    let charge_rate = sales_type.charge;

    //console.log(additionalProduct);
    //console.log("optionPertama ==> ", optionPertama);

    temp = {
      id: dataOption.id,
      name: dataOption.name,
      price: dataOption.price,
      //available: dataOption.available,
      parentId: parentId
    };

    //let charge = (productPrice * charge_rate) / 100;

    if (selected === true && type === "multi") {
      additionalProduct.map((v, index) => {
        if (v.id === dataOption.id) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - parseFloat(v.price);
        }
      });
    }
    //remove already selected for multi
    // if (isFirstOption && type === "single")
    // {
    // }
    // else
    if (selected === true && type === "single") {
      additionalProduct.map((v, index) => {
        if (v.id === dataOption.id) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - v.price;

          temp = {
            id: optionPertama.id,
            name: optionPertama.name,
            price: optionPertama.price,
            parentId: parentId
          };

          additionalProduct.push(temp);
          productPrice =
            parseFloat(productPrice) + parseFloat(optionPertama.price);
          //select firstOption
        }
        //delete selected option
      });
    }
    //remove already selected for single

    if (selected === false && type === "multi") {
      additionalProduct.push(temp);
      productPrice = parseFloat(productPrice) + parseFloat(dataOption.price);
    }

    if (selected === false && type === "single") {
      additionalProduct.map((v, index) => {
        if (v.parentId === parentId) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - parseFloat(v.price);
        }
      });
      additionalProduct.push(temp);
      productPrice = parseFloat(productPrice) + parseFloat(dataOption.price);
    }
    //add more for multi

    //console.log("additionalProduct ==> ", additionalProduct);

    if (charge_rate > 0) {
      //productPrice = parseFloat(productPrice) + (parseFloat(productPrice) * parseFloat(charge_rate)) / 100;

      salesTypeValue =
        (parseFloat(productPrice) * parseFloat(charge_rate)) / 100;

      //salesTypeValue = productPrice * salesTypeTax;
    } else {
      salesTypeValue = 0;
    }

    if (this.state.formAction === "add") {
      this.setState({
        additionalProduct: additionalProduct,
        productPrice: productPrice,
        salesTypeValue: salesTypeValue
      });
    } else {
      this.setState({
        additionalProduct: additionalProduct,
        productPrice: productPrice,
        salesTypeValue: salesTypeValue
      });
    }

    //this.setState({ selectedQuantity: this.state.selectedQuantity * 2 });
  }

  renderDetailItemSelection(data, i, dataParent) {
    let { additionalProduct } = this.state;
    let { type } = dataParent; //single or multi

    let parentLength = dataParent.Addons.length;

    // let width =
    //   type === "single" ? (parentLength === 3 ? "100%" : "100%") : "100%";
    //let width = this.state.tablet ? "49%" : "100%";
    //console.log('additionalProduct ==> ',additionalProduct)
    let bgColor = [
      "#EEEEEE",
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#555555"
    ];
    let textColor = [
      BLACK,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
    ];
    let colorIndex = 0;
    let colorText = 0;
    let selected = false;

    additionalProduct.map((v, index) => {
      if (v.id === data.id) {
        selected = true;
      }
    });

    if (selected === true) {
      colorIndex = 1;
      colorText = 1;
    }

    if (data.available === false) {
      colorIndex = 2;
      colorText = 2;
    }

    let price = this.state.currencyAllowDecimal
      ? data.price
      : parseInt(data.price);

    return (
      <View
        style={{
          //flex: 1,
          alignItems: "center",
          width: this.state.tablet ? "49%" : "100%",
          marginRight: 1,
          alignContent: "center",
          justifyContent: "center",
          height: 60
          //backgroundColor: '#BCA',
        }}
      >
        <Button
          onPress={() => {
            this.changeAddons(data, dataParent, selected);
          }}
          style={{
            //flexDirection: 'row',
            //width:200,
            //flex:1,
            backgroundColor: bgColor[colorIndex],
            elevation: 2,
            //width: '1%',
            padding: 15,
            width: "100%",
            //borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
            alignContent: "center",
            //justifyContent: "space-between",
            justifyContent: "center",
            flexDirection: "row"
          }}
          disabled={data.available === false ? true : false}
        >
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={{ width: "80%" }}>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 12,
                    color: textColor[colorText]
                    //width: width,
                    //backgroundColor: '#BCA',
                    //textAlign: "center"
                  }
                ]}
              >
                {data.name}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                width: "20%"
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 12,
                    color: textColor[colorText],
                    textAlign: "right"
                    //width: width,
                    //backgroundColor: '#BCA',
                    //textAlign: "center"
                  }
                ]}
              >
                {this.idrNumToStr(price)}
              </Text>
            </View>
          </View>
        </Button>
      </View>
    );
  }

  renderDetailItem(data, i) {
    let type = data.type;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#99999",
          flex: 1,
          width: "100%",
          minHeight: 100,
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            //backgroundColor: '#BCA',
            width: "100%"
          }}
        >
          <View style={{ margin: 15, flexDirection: "row" }}>
            {/* <FontAwesome
              name={"circle-thin"}
              style={{
                alignSelf: "center",
                fontSize: 15,
                color: BLACK,
                marginRight: 10
              }}
            /> */}
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 12, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
            {data.type === "single" ? (
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {" - "}
                {_pilih[this.state.languageIndex]}
              </Text>
            ) : (
              <View />
            )}
          </View>
          <View style={{ flex: 1, width: "100%" }}>
            <View
              style={{
                marginTop: 10,
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 10
              }}
            >
              <View
                style={{
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  width: "100%",
                  //flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "space-between"
                  //backgroundColor: '#AAA',
                }}
              >
                {this.state.loading === false && type === "single" ? (
                  this.state.tablet ? (
                    <FlatList
                      style={{
                        flex: 1,
                        //backgroundColor: '#BCA',
                        justifyContent: "space-between"
                      }}
                      columnWrapperStyle={{
                        justifyContent: "space-between"
                        //marginBottom: 5,
                        //justifyContent:"center",
                        //marginBottom: 5
                      }}
                      //ListHeaderComponent={}
                      showsVerticalScrollIndicator={false}
                      data={data.Addons}
                      renderItem={({ item, index }) => {
                        return this.renderDetailItemSelection(
                          item,
                          index,
                          data
                        );
                      }}
                      //ListFooterComponent={this._renderFooter}
                      numColumns={2}
                      keyExtractor={(item, index) => {
                        return "ListAdditionalSubSingle" + index.toString();
                      }}
                    //onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    //refreshing={refreshing}
                    />
                  ) : (
                    <FlatList
                      style={{
                        flex: 1,
                        //backgroundColor: '#BCA',
                        justifyContent: "space-between"
                      }}
                      //ListHeaderComponent={}
                      showsVerticalScrollIndicator={false}
                      data={data.Addons}
                      renderItem={({ item, index }) => {
                        return this.renderDetailItemSelection(
                          item,
                          index,
                          data
                        );
                      }}
                      //ListFooterComponent={this._renderFooter}
                      numColumns={1}
                      keyExtractor={(item, index) => {
                        return "ListAdditionalSubSingle" + index.toString();
                      }}
                    //onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    //refreshing={refreshing}
                    />
                  )
                ) : this.state.loading === false ? (
                  this.state.tablet ? (
                    <FlatList
                      style={{
                        flex: 1,
                        //backgroundColor: '#BCA',
                        justifyContent: "space-between"
                      }}
                      columnWrapperStyle={{
                        justifyContent: "space-between"
                        //marginBottom: 5,
                        //justifyContent:"center",
                        //marginBottom: 5
                      }}
                      //ListHeaderComponent={}
                      showsVerticalScrollIndicator={false}
                      data={data.Addons}
                      renderItem={({ item, index }) => {
                        return this.renderDetailItemSelection(
                          item,
                          index,
                          data
                        );
                      }}
                      //ListFooterComponent={this._renderFooter}
                      numColumns={2}
                      keyExtractor={(item, index) => {
                        return "ListAdditionalSubMulti" + index.toString();
                      }}
                    //onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    //refreshing={refreshing}
                    />
                  ) : (
                    <FlatList
                      style={{
                        flex: 1,
                        //backgroundColor: '#BCA',
                        justifyContent: "space-between"
                      }}
                      //ListHeaderComponent={}
                      showsVerticalScrollIndicator={false}
                      data={data.Addons}
                      renderItem={({ item, index }) => {
                        return this.renderDetailItemSelection(
                          item,
                          index,
                          data
                        );
                      }}
                      //ListFooterComponent={this._renderFooter}
                      numColumns={1}
                      keyExtractor={(item, index) => {
                        return "ListAdditionalSubMulti" + index.toString();
                      }}
                    //onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    //refreshing={refreshing}
                    />
                  )
                ) : (
                  <View />
                )}
              </View>
            </View>
          </View>
        </View>
        {/* Kuantitas */}
      </View>
    );
  }

  formChangeSalesType(type, typeOld) {
    let { productPrice, salesTypeTax, salesTypeValue } = this.state;

    if (type === "Gojek/Grab") {
      salesTypeValue = productPrice * salesTypeTax;
    } else if (type !== "Gojek/Grab" && typeOld === "Gojek/Grab") {
      salesTypeValue = 0;
    }

    this.setState({ formSalesType: type, salesTypeValue: salesTypeValue });
  }

  formChangeSalesType_new(type) {
    let { productPrice, salesTypeTax, salesTypeValue } = this.state;

    let new_id = type.id;

    let charge = (productPrice * type.charge) / 100;

    salesTypeValue = charge;

    const product_id = this.state.selectedProduct.product_id
      ? this.state.selectedProduct.product_id
      : this.state.selectedProduct.id;
    const sales_type_id = new_id;

    if (this.state.salesTypeProduct) {
      this.state.salesTypeProduct.map((v, i) => {
        if (
          v.sales_type_id === sales_type_id &&
          v.product_id === product_id &&
          v.active
        ) {
          charge = v.price - productPrice;
          salesTypeValue = this.state.currencyAllowDecimal
            ? parseFloat(charge).toFixed(2)
            : parseInt(charge);
        }
      });
    }

    // if (type === "Gojek/Grab") {
    //   salesTypeValue = productPrice * salesTypeTax;
    // } else if (type !== "Gojek/Grab" && typeOld === "Gojek/Grab") {
    //   salesTypeValue = 0;
    // }

    this.setState({
      formSalesType: new_id,
      salesTypeValue: salesTypeValue,
      salesTypeName: type.name,
      salesTypeCharge: type.charge
    });
  }

  formInitializeSalesType(productPrice = this.productPrice) {
    const { selectedSalesType, additionalSalesType } = this.state;

    let charge = 0;
    additionalSalesType.map((v, index) => {
      if (parseInt(v.id) === parseInt(selectedSalesType)) {
        charge = (productPrice * v.charge) / 100;
      }
    });

    this.setState({
      salesTypeValue: charge
    });
  }

  renderSalesTypeSelection_new(data) {
    let { formSalesType, selectedSalesType } = this.state;

    let bgColor = [
      WHITE,
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#EEEEEE"
    ];
    let textColor = [
      BLACK,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      "#DDDDDD"
    ];

    return (
      <View
        style={{
          //flex: 0.24,
          alignItems: "center",
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
          height: 60
          //backgroundColor: '#BCA',
          // marginLeft: "0.5%",
          // marginRight: "0.5%"
        }}
      >
        <Button
          onPress={() => {
            //this.setState({ formSalesType: "Take-Away" });
            this.formChangeSalesType_new(data);
          }}
          style={{
            backgroundColor:
              formSalesType.toString() === data.id.toString()
                ? bgColor[1]
                : bgColor[0],
            elevation: 2,
            //width: '1%',
            padding: 15,
            width: "100%",
            borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderWidth: 0,
            borderRadius: 5,
            alignItems: "center",
            alignContent: "center",
            //justifyContent: "space-between",
            justifyContent: "center"
          }}
        //disabled={data.available === false ? true : false}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color:
                  formSalesType.toString() === data.id.toString()
                    ? textColor[1]
                    : textColor[0],
                //width: width,
                //backgroundColor: '#BCA',
                textAlign: "center"
              }
            ]}
          >
            {data.name}
          </Text>
        </Button>
      </View>
    );
  }

  renderSalesTypeSelection() {
    const { formSalesType, selectedSalesType } = this.state;
    let bgColor = [
      WHITE,
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#EEEEEE"
    ];
    let textColor = [
      BLACK,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      "#DDDDDD"
    ];

    return (
      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Take-Away" });
              this.formChangeSalesType("Take-Away", formSalesType);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Take-Away" ? bgColor[1] : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
          //disabled={data.available === false ? true : false}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Take-Away" ? textColor[1] : textColor[0],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Take-Away
            </Text>
          </Button>
        </View>
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Dine-In" });
              this.formChangeSalesType("Dine-In", formSalesType);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Dine-In"
                  ? bgColor[1]
                  : selectedSalesType !== "Dine-In"
                    ? bgColor[2]
                    : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
            disabled={selectedSalesType === "Dine-In" ? false : true}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Dine-In" ? textColor[1] : textColor[2],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Dine-In
            </Text>
          </Button>
        </View>
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Gojek/Grab" });
              this.formChangeSalesType("Gojek/Grab", formSalesType);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Gojek/Grab" ? bgColor[1] : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
          //disabled={data.available === false ? true : false}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Gojek/Grab"
                      ? textColor[1]
                      : textColor[0],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Gojek/Grab
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  renderFormItem() {
    const { formItem } = this.state;

    let productPrice = this.state.currencyAllowDecimal
      ? parseFloat(this.state.productPrice)
      : parseInt(this.state.productPrice);
    let salesTypeValue = this.state.currencyAllowDecimal
      ? parseFloat(this.state.salesTypeValue)
      : parseInt(this.state.salesTypeValue);

    let harga_number = productPrice + salesTypeValue;
    let harga_total = harga_number * Decimalize(this.state.selectedQuantity, 4);

    harga_total = Decimalize(
      harga_total,
      this.state.currencyAllowDecimal ? 2 : 0
    );

    let harga = this.state.currency + " " + this.idrNumToStr(harga_total);

    let sales_type_text =
      this.state.userInfo.retail_id === this.state.papa_recepi_id
        ? _expedition_type[this.state.languageIndex]
        : _sales_type[this.state.languageIndex];

    // let long_name = this.state.selectedProduct.name.toUpperCase();

    // let short_name = "";

    // let words = long_name.split(" ");

    // words.map((items, itemIndex) => {
    //   short_name = short_name + items[0];
    // });

    if (formItem) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.formItem}
          onRequestClose={() => {
            if (this.state.formAction === "edit") {
              this.setState({ formItem: false, showBill: true });
            } else {
              this.setState({ formItem: false });
            }
          }}
        >
          <View
            style={{
              borderRadius: 0,
              width: "100%",
              height: 150
            }}
          >
            <Image
              // resizeMethod="resize"
              style={{
                height: 150,
                //width: "100%"
                //borderRadius: 15
                //overflow: "hidden"
                //alignSelf: "center"
                backgroundColor: "#CCC",
                display: this.state.setting_light_mode ? "flex" : "flex"
              }}
              resizeMode={"cover"}
              source={{ uri: BE_URI + this.state.selectedProduct.image }}
            //source={{ uri: BE_URI }}
            />
          </View>

          {this.state.loading ? <Loading /> : <View />}
          <View
            style={{
              flex: 1,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              marginTop: -20,
              backgroundColor: WHITE
            }}
          >
            {/* header form item */}
            <MobileHeader
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              title={this.state.selectedProduct.name}
              notif={false}
              loginInformation={this.state.userInfo}
              menu={false}
              back={true}
              backAction={() => {
                if (this.state.formAction === "edit") {
                  this.setState({ formItem: false, showBill: true });
                } else {
                  this.setState({ formItem: false });
                }
              }}
              hideOnline={false}
              harga={harga}
              hideLogin={true}
            />
            <View
              style={{
                flex: 1,
                width: this.state.tablet ? "75%" : "100%",
                // marginTop: 20,
                // marginBottom: 20,
                // marginLeft: 20,
                // marginRight: 20,
                flexDirection: "column",
                alignSelf: "center"
              }}
            >
              {/* Header Form */}
              {/* Kotak Form */}
              <View
                style={{
                  flex: 1,

                  marginTop: 20,
                  width: "100%",
                  borderRadius: 5
                }}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={{ marginTop: 0, padding: 0 }}>
                    <View
                      style={{
                        //flexDirection: "row",
                        backgroundColor: "#99999",
                        flex: 1,
                        width: "100%",
                        minHeight: 100,
                        justifyContent: "space-between"
                      }}
                    >
                      <View
                        style={
                          {
                            //width: "100%"
                          }
                        }
                      >
                        <View
                          style={{
                            margin: 15,
                            flexDirection: "row",
                            marginTop: 5,
                            marginBottom: 0,
                            alignItems: "center"
                          }}
                        >
                          <Checkbox
                            color={MAIN_THEME_COLOR_SELECT(
                              this.state.colorIndex
                            )}
                            checked={this.state.formShowWeight}
                            size={33}
                            style={{ marginRight: 10 }}
                            action={() => {
                              //ganti checklist Nego
                              const formShowWeight = !this.state.formShowWeight;
                              this.setState({
                                formShowWeight: formShowWeight
                              });
                              if (
                                formShowWeight &&
                                this.state.formAction === "add"
                              ) {
                                this.calculateWeight();
                              }
                            }}
                          />
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_weight_mode[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            //width: "100%"
                            display: this.state.formShowWeight ? "none" : "flex"
                          }}
                        >
                          <View
                            style={{
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 10,
                              marginBottom: 10
                            }}
                          >
                            <View
                              style={{
                                // marginTop: 10,
                                // marginBottom: 10,
                                flexDirection: "row",
                                //paddingRight: 20,
                                padding: 10,
                                //flex: 1,
                                backgroundColor: MAIN_THEME_COLOR_SELECT(
                                  this.state.colorIndex
                                ),
                                borderRadius: 10,
                                alignItems: "center",
                                alignContent: "center",
                                justifyContent: "space-between",
                                borderBottomWidth: 1,
                                borderColor: "#C4C4C4",
                                width: this.state.tablet ? "50%" : "100%"
                              }}
                            >
                              <Button
                                style={{
                                  borderRadius: 10,
                                  width: "33%"
                                }}
                                onPress={() => {
                                  this.changeQtyProduct(-1);
                                }}
                              >
                                <AntDesign
                                  name={"minus"}
                                  style={{
                                    color: MAIN_TEXT_COLOR_SELECT(
                                      this.state.colorIndex
                                    ),
                                    alignSelf: "flex-start",
                                    fontSize: 20
                                  }}
                                />
                              </Button>
                              <Text
                                style={[
                                  MainStyle.robotoNormalBold,
                                  {
                                    width: "33%",
                                    fontSize: 12,
                                    color: MAIN_TEXT_COLOR_SELECT(
                                      this.state.colorIndex
                                    ),
                                    textAlign: "center"
                                  }
                                ]}
                              >
                                {this.state.selectedQuantity}
                              </Text>
                              <Button
                                style={{
                                  borderRadius: 10,

                                  width: "30%"
                                }}
                                onPress={() => {
                                  this.changeQtyProduct(1);
                                }}
                              >
                                <AntDesign
                                  name={"plus"}
                                  style={{
                                    color: MAIN_TEXT_COLOR_SELECT(
                                      this.state.colorIndex
                                    ),
                                    alignSelf: "flex-end",
                                    fontSize: 20
                                  }}
                                />
                              </Button>
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* Kuantitas */}

                      {/* Weight start */}
                      <View
                        style={{
                          //width: "100%"
                          display: this.state.formShowWeight ? "flex" : "none"
                        }}
                      >
                        <View
                          style={{
                            margin: 15,
                            flexDirection: "row",
                            marginTop: 5,
                            marginBottom: 0
                          }}
                        >
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_weight[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 5,
                            marginBottom: 0,
                            justifyContent: "space-between",
                            flexDirection: "row"
                          }}
                        >
                          <View
                            style={{
                              // marginTop: 10,
                              // marginBottom: 10,
                              flexDirection: "row",
                              //paddingRight: 20,

                              //paddingLeft: 0,
                              //flex: 1,
                              // backgroundColor: MAIN_THEME_COLOR_SELECT(
                              //   this.state.colorIndex
                              // ),

                              alignItems: "center",
                              alignContent: "center",
                              justifyContent: "space-between",
                              //borderWidth: 1,
                              //borderColor: "#C4C4C4",
                              width: "100%"
                            }}
                          >
                            <View
                              style={{
                                borderRadius: 10,
                                padding: 10,
                                alignItems: "center",
                                alignContent: "center",
                                borderWidth: 1,
                                borderColor: "#C4C4C4",
                                width: "85%"
                              }}
                            >
                              <TextInput
                                style={{
                                  width: "95%",
                                  marginRight: 15,
                                  backgroundColor: WHITE,
                                  borderRadius: 0,
                                  paddingTop: -5,
                                  paddingBottom: -5,
                                  //paddingLeft: 15,
                                  //padding: 5,
                                  //paddingLeft: 15,
                                  //paddingRight: 15,
                                  //textAlign: "right",
                                  // color: MAIN_TEXT_COLOR_SELECT(
                                  //   this.state.colorIndex
                                  // ),
                                  fontSize: 15,
                                  fontFamily: "DMSans-Bold"
                                }}
                                keyboardType="numeric"
                                type="text"
                                refx={q => {
                                  //this._notes = q;
                                }}
                                onSubmitEditing={() => { }}
                                //onChangeText={(q)=>this._accountUpdate('username',q)}
                                onChangeText={v => {
                                  //this.setState({ searchKey: v })
                                  //console.log("change v ===> ", v);
                                  this.setState({ selectedQuantity: v });
                                }}
                                value={this.state.selectedQuantity.toString()}
                                placeholder={""}
                              />
                            </View>
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  width: "15%",
                                  fontSize: 12,
                                  color: BLACK,
                                  textAlign: "center"
                                }
                              ]}
                            >
                              {_kilogram[this.state.languageIndex]}
                            </Text>

                            {/* <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  width: "33%",
                                  fontSize: 12,
                                  color: MAIN_TEXT_COLOR_SELECT(
                                    this.state.colorIndex
                                  ),
                                  textAlign: "center"
                                }
                              ]}
                            >
                              {this.state.selectedQuantity}
                            </Text> */}
                          </View>
                        </View>
                      </View>

                      {/* weight end */}

                      {/* additionalnya */}
                      <FlatList
                        //ListHeaderComponent={}
                        showsVerticalScrollIndicator={false}
                        data={this.state.additionalList}
                        renderItem={({ item, index }) => {
                          if (this.state.ready === true) {
                            return (
                              <View
                              // style={{
                              //   marginLeft: 0,
                              //   marginTop: 0,
                              //   marginBottom: 3,
                              //   marginRight: 0,
                              // }}
                              >
                                {this.renderDetailItem(item, index)}
                              </View>
                            );
                          } else {
                            return <View />;
                          }
                        }}
                        //ListFooterComponent={this._renderFooter}
                        keyExtractor={(item, index) => {
                          return "ListAdditional" + index.toString();
                        }}
                      //onRefresh={this._onRefresh}
                      //onEndReached={this.handleLoadMore}
                      //onEndReachedThreshold={0.5}
                      //refreshing={refreshing}
                      />
                      {/* Sales Type Input Form */}
                      <View
                        style={{
                          //flexDirection: "row",
                          //backgroundColor: "#BCA",
                          flex: 1,
                          width: "100%",
                          minHeight: 100,
                          justifyContent: "space-between"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {sales_type_text}
                          </Text>
                        </View>
                        {/* <View>{this.renderSalesTypeSelection()}</View> */}
                        <View style={{ marginLeft: 15, marginRight: 15 }}>
                          {this.state.tablet ? (
                            <FlatList
                              //ListHeaderComponent={}
                              columnWrapperStyle={{
                                justifyContent: "space-between"
                                //marginBottom: 5,
                                //justifyContent:"center",
                                //marginBottom: 5
                              }}
                              numColumns={2}
                              showsVerticalScrollIndicator={false}
                              data={this.state.additionalSalesType}
                              renderItem={({ item, index }) => {
                                return (
                                  <View
                                    style={{
                                      //marginLeft: 15,
                                      marginTop: 0,
                                      marginBottom: 3,
                                      //marginRight: 15,
                                      width: "49%",
                                      borderColor: MAIN_THEME_COLOR_SELECT(
                                        this.state.colorIndex
                                      )
                                    }}
                                  >
                                    {this.renderSalesTypeSelection_new(
                                      item,
                                      index
                                    )}
                                  </View>
                                );
                              }}
                              //ListFooterComponent={this._renderFooter}
                              keyExtractor={(item, index) => {
                                return "ShowSalesType" + index.toString();
                              }}
                            />
                          ) : (
                            <FlatList
                                horizontal={true}
                              //ListHeaderComponent={}
                              showsVerticalScrollIndicator={false}
                              data={this.state.additionalSalesType}
                              renderItem={({ item, index }) => {
                                return (
                                  <View
                                    style={{
                                      marginLeft: 5,
                                      marginTop: 0,
                                      marginBottom: 3,
                                      marginRight: 1,
                                      borderColor: MAIN_THEME_COLOR_SELECT(
                                        this.state.colorIndex
                                      )
                                    }}
                                  >
                                    {this.renderSalesTypeSelection_new(
                                      item,
                                      index
                                    )}
                                  </View>
                                );
                              }}
                              //ListFooterComponent={this._renderFooter}
                              keyExtractor={(item, index) => {
                                return "ShowSalesType" + index.toString();
                              }}
                            />
                          )}
                        </View>
                      </View>
                      {/* View Kuantitas dan Catatan */}

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_catatan[this.state.languageIndex]} -
                          </Text>
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {" "}
                            {_catatan_extra[this.state.languageIndex]}
                          </Text>
                        </View>
                        {/* Catatan Header */}
                        <View
                          style={{
                            marginTop: 10,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10,
                            flexDirection: "row",
                            //paddingRight: 20,
                            flex: 1,
                            //backgroundColor: '#BCA',
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "space-between"
                          }}
                        >
                          <ScrollView
                            style={{
                              width: "100%",
                              borderRadius: 10,
                              borderWidth: 1,
                              marginTop: 5,
                              borderColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              ),
                              minHeight: 100,
                              paddingLeft: 5,
                              paddingRight: 5,
                              backgroundColor: WHITE,
                              maxHeight: 100
                            }}
                          >
                            <TextInput
                              style={{
                                textAlignVertical: "top",
                                flex: 1,
                                //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                //backgroundColor: 'transparent',
                                height: 100,
                                color: BLACK,
                                marginTop: -8,
                                marginLeft: 0,
                                marginRight: 0,
                                fontSize: 12,
                                fontFamily: "DMSans-Bold"
                              }}
                              multiline={true}
                              //numberOfLines={3}
                              type="text"
                              refx={q => {
                                this._notes = q;
                              }}
                              onSubmitEditing={() => {
                                //this.getData(this.state.notes);
                                // this.setState({viewSearch: false});
                              }}
                              //onChangeText={(q)=>this._accountUpdate('username',q)}
                              onChangeText={v =>
                                this.setState({ selectedCatatan: v })
                              }
                              value={this.state.selectedCatatan}
                              placeholder={""}
                            />
                          </ScrollView>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  margin: 15,
                  width: this.state.tablet ? "75%" : "100%",
                  alignSelf: "center"
                  //backgroundColor: "#555",
                  //flex: 1
                }}
              >
                <Button
                  style={{
                    width: "45%",
                    padding: 10,
                    marginLeft: 10,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    borderRadius: 10,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    this.addOrder();
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {_simpan[this.state.languageIndex]}
                  </Text>
                </Button>

                <Button
                  style={{
                    width: "45%",
                    padding: 10,
                    marginRight: 10,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    borderRadius: 10  ,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    this.addOrder();



                    setTimeout(() => {
                      const action =
                        !this.state.order_id &&
                          this.state.selectedSalesType.toString() ===
                          this.state.sales_type_dine_in_id.toString()
                          ? ""
                          : "pay";
                      this.setState({ loading: true });
                      this.checkOutAction(action);
                    }, 333);


                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {_lanjut[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
          {/* {this.renderTabBar()} */}
        </Modal>
      );
    } else {
      return <View />;
    }
  }

  renderLeftSide() {
    const { refreshing, showAlert } = this.state;

    if (this.state.formItem === false && this.state.showFavList === false) {
      return (
        <View
          style={{ flex: 1, backgroundColor: "#C4C4C4", paddingBottom: 10 }}
        >
          <ScrollView
            style={{
              //backgroundColor: '#C4C4C4',
              flex: 1
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>
              <View>
                <View
                  style={{
                    borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    marginLeft: 15,
                    marginRight: 15,

                    borderRadius: 10,
                    elevation: 1,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    )
                  }}
                >
                  <Button
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.setState({ showAll: !this.state.showAll });
                    }}
                  >
                    <View style={{ margin: 15, flexDirection: "row" }}>
                      <View style={{ width: "10%" }}>
                        <Ionicons
                          name={"md-menu"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }}
                        />
                      </View>
                      <View style={{ width: "80%", alignSelf: "center" }}>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              fontSize: 14,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          {_semua_menu[this.state.languageIndex]}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "10%",
                          alignSelf: "flex-end",
                          alignItems: "flex-end"
                        }}
                      >
                        {this.state.showAll ? (
                          <Entypo
                            name={"chevron-up"}
                            style={{
                              alignSelf: "center",
                              fontSize: 25,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          />
                        ) : (
                          <Entypo
                            name={"chevron-down"}
                            style={{
                              alignSelf: "center",
                              fontSize: 25,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </Button>
                </View>
              </View>
              {/* Semua Menu End */}

              {this.state.showAll ? (
                <View>
                  <FlatList
                    //ListHeaderComponent={}
                    showsVerticalScrollIndicator={false}
                    data={this.state.dataCategory}
                    renderItem={({ item, index }) => {
                      if (this.state.ready === true) {
                        return (
                          <View
                            style={{
                              marginLeft: 15,
                              marginTop: 0,
                              marginBottom: 3,
                              marginRight: 15,
                              borderColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            {this.renderAllCategory(item, index)}
                          </View>
                        );
                      } else {
                        return <View />;
                      }
                    }}
                    //ListFooterComponent={this._renderFooter}
                    keyExtractor={(item, index) => {
                      return "ShowAllRenderData" + index.toString();
                    }}
                    onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                  />
                </View>
              ) : (
                <View />
              )}
              {/* Favorit */}
              <View>
                <View
                  style={{
                    borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 15,
                    marginLeft: 15,
                    marginRight: 15,
                    borderRadius: 10,
                    elevation: 1,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    )
                  }}
                >
                  <Button
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.setState({ showFav: !this.state.showFav });
                    }}
                  >
                    <View style={{ margin: 15, flexDirection: "row" }}>
                      <View style={{ width: "10%" }}>
                        <Ionicons
                          name={"md-star"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: "#FFF736"
                          }}
                        />
                      </View>
                      <View style={{ width: "80%", alignSelf: "center" }}>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              fontSize: 14,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          {_menu_favorit[this.state.languageIndex]}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "10%",
                          alignSelf: "flex-end",
                          alignItems: "flex-end"
                        }}
                      >
                        {this.state.showFav ? (
                          <Entypo
                            name={"chevron-up"}
                            style={{
                              alignSelf: "center",
                              fontSize: 25,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          />
                        ) : (
                          <Entypo
                            name={"chevron-down"}
                            style={{
                              alignSelf: "center",
                              fontSize: 25,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </Button>
                </View>
                {/* Show Fav End */}

                {this.state.showFav ? (
                  <View>
                    <FlatList
                      //ListHeaderComponent={}
                      showsVerticalScrollIndicator={false}
                      data={this.state.dataMenuFav}
                      renderItem={({ item, index }) => {
                        if (this.state.ready === true) {
                          return (
                            <View
                              style={{
                                marginLeft: 15,
                                marginTop: 0,
                                marginBottom: 3,
                                marginRight: 15,
                                borderColor: MAIN_THEME_COLOR_SELECT(
                                  this.state.colorIndex
                                )
                              }}
                            >
                              {this.renderFav(item, index)}
                            </View>
                          );
                        } else {
                          return <View />;
                        }
                      }}
                      //ListFooterComponent={this._renderFooter}
                      keyExtractor={(item, index) => {
                        return "FavRenderData" + index.toString();
                      }}
                      onRefresh={this._onRefresh}
                      //onEndReached={this.handleLoadMore}
                      //onEndReachedThreshold={0.5}
                      refreshing={refreshing}
                    />
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderFavAlternate(data, i) {
    let points = 0;

    points = 0;

    if (data.Loyalty_Promo) {
      points = data.Loyalty_Promo.point;
    }

    let price = this.state.currencyAllowDecimal
      ? data.price
      : parseInt(data.price);

    let calorie = 0;

    if (data.Recipes.length > 0) {
      calorie = data.Recipes[0].total_calorie
        ? data.Recipes[0].total_calorie
        : 0;
    } else {
      calorie = data.calorie ? data.calorie : 0;
    }

    let long_name = data.name ? data.name.toUpperCase() : "";

    let short_name = "";

    let words = long_name.split(" ");

    words.map((items, itemIndex) => {
      short_name = short_name + items[0];
    });

    return (
      <View

      style={{
        flex: 1,
        margin: 5,
        borderRadius: 15,
        backgroundColor: 'white', 
        borderColor: "#C8C7CC",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      >
        <View style={{ margin: 10 }}>
          {/* <View style={{ alignItems: "center" }}> */}
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                // marginLeft: this.state.setting_light_mode ? 15 : 15,
                flex: 1
              }}
            >
              <Button
                onPress={() => {
                  // this.setState({
                  //   formItem: true,
                  //   selectedProduct: data,
                  //   productPrice: data.price
                  // });

                  this.showFormItem(data, data.price, "add");

                  //Group_Addons
                }}>



                <View style={{ borderRadius: 15 }}>
                  <Image
                    resizeMethod="resize"
                    style={{
                      width: "100%",
                      height: 100,
                      borderRadius: 15,
                      overflow: "hidden"
                      //alignSelf: "center"
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={{ uri: BE_URI + data.image }}
                  />
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { fontSize: 18, color: BLACK }
                    ]}
                  >
                    {data.name}

                  </Text>

                </View>
                {/* <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 15, color: BLACK }
                ]}
              >
                {BE_URI + data.image}
              </Text> */}
                <Text
                  style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
                >
                  {data.Product_Category ? data.Product_Category.name : ""}
                </Text>
                {calorie > 0 ? (
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 11, color: BLACK }
                    ]}
                  >
                    {calorie} {_calorie[this.state.languageIndex]}
                  </Text>
                ) : (
                  <View />
                )}
              </Button>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end"
                }}
              >
                {this.state.showStock ? (
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK }
                    ]}
                  >
                    {_stock[this.state.languageIndex]}: {data.stock}
                  </Text>
                ) : (
                  <View />
                )}

                {points > 0 ? (
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 11, color: BLACK }
                    ]}
                  >
                    {_point[this.state.languageIndex]}: {points}
                  </Text>
                ) : (
                  <View />
                )}

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 15, color: BLACK }
                    ]}
                  >
                    {this.state.currency} {this.idrNumToStr(price)}
                  </Text>
                  {/* 
                  <Button
                    style={{
                    borderRadius: 10,
                    height: 40,
                    width: 35,
                    padding: 2,
                    justifyContent:"center",
                    alignContent:"center",
                    alignItems:"center",
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    width: "40%"
                    }}
                    onPress={() => {
                    // this.changeQtyProduct(1);
                    this.newOrder(true, true);

                   

                    this.showFormItem(data, data.price, "add");
                    this.setState({showFormItem:false, loading:true});

                


                    // setTimeout(() => {
                    //   this.addOrder();

                    //   setTimeout(() => {
                    //     const action =
                    //     !this.state.order_id &&
                    //     this.state.selectedSalesType.toString() ===
                    //       this.state.sales_type_dine_in_id.toString()
                    //       ? ""
                    //       : "pay";
                    //     this.setState({ loading: true });
                    // this.showFormItem(data, data.price, "add");

                    //     // this.checkOutAction(action);
                    //   }, 111);

                      
                    // }, 111);
                    
                    }}
                    >
                    <Text>
                      New Order
                    </Text>
                  </Button> */}
                </View>



              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
      </View>
    );
  }

  renderFavAlternateLAMA(data, i) {
    let points = 0;

    points = 0;

    if (data.Loyalty_Promo) {
      points = data.Loyalty_Promo.point;
    }

    let price = this.state.currencyAllowDecimal
      ? data.price
      : parseInt(data.price);

    let calorie = 0;

    if (data.Recipes.length > 0) {
      calorie = data.Recipes[0].total_calorie
        ? data.Recipes[0].total_calorie
        : 0;
    } else {
      calorie = data.calorie ? data.calorie : 0;
    }

    let long_name = data.name ? data.name.toUpperCase() : "";

    let short_name = "";

    let words = long_name.split(" ");

    words.map((items, itemIndex) => {
      short_name = short_name + items[0];
    });

    return (
      <Button
        onPress={() => {
          // this.setState({
          //   formItem: true,
          //   selectedProduct: data,
          //   productPrice: data.price
          // });

          this.showFormItem(data, data.price, "add");

          //Group_Addons
        }}
        style={{
          flex: 1,
          //width: "100%",
          //backgroundColor: "#EEE",
          borderBottomWidth: 1,
          borderColor: "#C8C7CC"
        }}
      >
        <View style={{ margin: 15 }}>
          {/* <View style={{ alignItems: "center" }}> */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ borderRadius: 15, height: 100 }}>
              {data.image ? (
                <View>
                  <Image
                    resizeMethod="resize"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 15,
                      overflow: "hidden",
                      display: this.state.setting_light_mode ? "none" : "flex"
                      //alignSelf: "center"
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={{ uri: BE_URI + data.image }}
                  />
                  <View
                    style={{
                      display: this.state.setting_light_mode ? "flex" : "none",
                      width: 100,
                      height: 100,
                      borderRadius: 15,
                      backgroundColor: "#EEEEEE",
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 32, color: BLACK, textAlign: "center" }
                      ]}
                    >
                      {short_name}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      overflow: "hidden",
                      display: this.state.setting_light_mode ? "none" : "flex",
                      borderRadius: 10
                    }}
                    source={require("../../Images/empty-image.png")}
                  />
                  <View
                    style={{
                      display: this.state.setting_light_mode ? "flex" : "none",
                      width: 100,
                      height: 100,
                      borderRadius: 15,
                      backgroundColor: "#EEEEEE",
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 32, color: BLACK, textAlign: "center" }
                      ]}
                    >
                      {short_name}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                marginLeft: this.state.setting_light_mode ? 15 : 15,
                flex: 1
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 18, color: BLACK }
                ]}
              >
                {data.name}
              </Text>
              {/* <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 15, color: BLACK }
                ]}
              >
                {BE_URI + data.image}
              </Text> */}
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {data.Product_Category ? data.Product_Category.name : ""}
              </Text>
              {calorie > 0 ? (
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 11, color: BLACK }
                  ]}
                >
                  {calorie} {_calorie[this.state.languageIndex]}
                </Text>
              ) : (
                <View />
              )}

              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end"
                }}
              >
                {this.state.showStock ? (
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK }
                    ]}
                  >
                    {_stock[this.state.languageIndex]}: {data.stock}
                  </Text>
                ) : (
                  <View />
                )}

                {points > 0 ? (
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 11, color: BLACK }
                    ]}
                  >
                    {_point[this.state.languageIndex]}: {points}
                  </Text>
                ) : (
                  <View />
                )}

                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 15, color: BLACK }
                  ]}
                >
                  {this.state.currency} {this.idrNumToStr(price)}
                </Text>
              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
      </Button>
    );
  }

  renderFavLeftSide() {
    const {
      activeCategoryIndex,
      activeCategory,
      categoryTotal,
      dataCategory
    } = this.state;
    let jumlahData = 0;

    if (this.state.formItem === false && this.state.showFavList === true) {
      return (
        // <GestureRecognizer
        //   onSwipeLeft={() => {
        // if (this.state.categoryTotal > 0) {
        //   LayoutAnimation.configureNext(
        //     LayoutAnimation.Presets.easeInEaseOut
        //   );
        //   let activeCategoryIndexNew = parseInt(activeCategoryIndex + 1);
        //   if (activeCategoryIndexNew > categoryTotal) {
        //     activeCategoryIndexNew = activeCategoryIndexNew - 1;
        //   }
        //   let activeCategoryNew =
        //     activeCategoryIndex < 0
        //       ? activeCategoryIndexNew
        //       : dataCategory[parseInt(activeCategoryIndexNew - 1)].id;
        //   if (activeCategoryIndex < categoryTotal) {
        //     this.setState({
        //       activeCategory: activeCategoryNew,
        //       activeCategoryIndex: activeCategoryIndexNew
        //       //loading: false
        //     });
        //     if (activeCategoryIndexNew > 0) {
        //       this.getMenuByCategory(
        //         this.state.searchKey,
        //         activeCategoryNew,
        //         activeCategoryIndexNew
        //       );
        //     } else {
        //       this.getData("", activeCategoryIndexNew);
        //     }
        //     this.downButtonHandler(activeCategoryIndexNew);
        //   }
        // }
        // }}
        // onSwipeRight={() => {
        // if (this.state.categoryTotal > 0) {
        //   LayoutAnimation.configureNext(
        //     LayoutAnimation.Presets.easeInEaseOut
        //   );
        //   let min_category = dataCategory[0].id;
        //   let activeCategoryIndexNew =
        //     activeCategoryIndex === 0
        //       ? -1
        //       : activeCategoryIndex === min_category
        //       ? 1
        //       : parseInt(activeCategoryIndex - 1);
        //   if (activeCategoryIndexNew < -1) {
        //     activeCategoryIndexNew = -1;
        //   }
        //   let activeCategoryNew =
        //     activeCategoryIndexNew === -1
        //       ? -1
        //       : activeCategoryIndexNew === 0
        //       ? dataCategory[parseInt(activeCategoryIndexNew)].id
        //       : dataCategory[parseInt(activeCategoryIndexNew - 1)].id;
        //   if (activeCategoryNew > -2 && activeCategory !== -1) {
        //     this.setState({
        //       activeCategory: activeCategoryNew,
        //       activeCategoryIndex: activeCategoryIndexNew
        //       //loading: true
        //     });
        //     if (activeCategoryIndexNew < 1) {
        //       this.getData("", activeCategoryIndexNew);
        //       this.downButtonHandler(activeCategoryIndexNew);
        //     } else {
        //       this.getMenuByCategory(
        //         this.state.searchKey,
        //         activeCategoryNew,
        //         activeCategoryIndexNew
        //       );
        //       this.downButtonHandler(activeCategoryIndexNew);
        //     }
        //   }
        // }
        //   }}
        //   config={{
        //     velocityThreshold: 0.3,
        //     directionalOffsetThreshold: 80
        //   }}
        //   style={{
        //     flex: 1
        //   }}
        // >
        <View style={{ flex: 1, backgroundColor: WHITE }}>
          <View
            style={{
              marginTop: 10,
              // marginLeft: 10,
              // marginRight: 10,
              //marginBottom: 5,
              //paddingBottom: 10,
              //backgroundColor: "#BCA",
              //flex: 1,
              //flexDirection: "row",
              justifyContent: "space-around"
              //backgroundColor: '#AAA',
            }}
          >
            <View style={{ borderBottomWidth: 1, borderColor: "#C8C7CC" }} />
            {this.state.tablet ? (
              <FlatList
                //ListHeaderComponent={}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  //marginBottom: 5,
                  //justifyContent:"center",
                  marginBottom: 5
                }}
                showsVerticalScrollIndicator={false}
                data={this.state.dataMenuFav}
                numColumns={2}
                renderItem={({ item, index }) => {
                  if (this.state.ready === true) {
                    return (
                      <View
                        style={{
                          width: "49%",

                          //flex: 0.325,
                          //marginLeft: 15,
                          marginTop: 0

                          //marginBottom: 3,
                          //marginRight: 15
                        }}
                      >
                        {this.renderFavAlternate(item, index)}
                      </View>
                    );
                  } else {
                    return <View />;
                  }
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "FavRenderData" + index.toString();
                }}
              //onRefresh={this._onRefresh}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={0.5}
              // refreshing={refreshing}
              />
            ) : (
              <FlatList
                //ListHeaderComponent={}
                showsVerticalScrollIndicator={false}
                data={this.state.dataMenuFav}
                numColumns={2}
                renderItem={({ item, index }) => {
                  if (this.state.ready === true) {
                    return (
                      <View
                        style={{
                          width: "49%",

                          //flex: 0.325,
                          //marginLeft: 15,
                          marginTop: 0

                          //marginBottom: 3,
                          //marginRight: 15
                        }}
                      >
                        {this.renderFavAlternate(item, index)}
                      </View>
                    );
                  } else {
                    return <View />;
                  }
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "FavRenderData" + index.toString();
                }}
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    if (this.state.loading === false) {
                      this.handleLoadMore();
                    }
                  }
                }}
              //onRefresh={this._onRefresh}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={0.5}
              // refreshing={refreshing}
              />
            )}
          </View>
        </View>
        // </GestureRecognizer>
      );
    } else {
      return <View />;
    }
  }

  renderNoData() {
    return (
      <View
        style={{
          flex: 2,
          //height: 500,
          //backgroundColor: "#BCA",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 125,
            height: 125,
            borderRadius: 999,
            //backgroundColor: "#C4C4C4",
            marginRight: 20,
            //borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 20,
            //zIndex: 2,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              // position: "absolute",
              width: 150,
              height: 150,
              borderRadius: 999,
              borderColor: "#C4C4C4",
              borderWidth: 0,
              backgroundColor: "#C4C4C4",

              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"

              // zIndex: 2
            }}
          >

            <MaterialIcons
              style={{
                color: WHITE,
                width: 125,
                height: 125,
                // backgroundColor: "#C4C4C4",
                // zIndex: 1,
                borderRadius: 999
              }}
              name="people"
              size={125}
            //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
            //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
            />
          </View>
        </View>
        <Text
          style={[
            MainStyle.robotoNormal,
            { fontSize: 18, color: BLACK, marginTop: 15 }
          ]}
        >
          {_no_data_3[this.state.languageIndex]}
        </Text>
      </View>
    );
  }

  renderButtonsLeftSide() {
    if (this.state.formItem === false) {
      return (
        <View
          style={{
            //flex: 1,
            //height: 100,
            //width: "100%",
            //height: 300,
            backgroundColor: "#FFF",
            justifyContent: "flex-end",
            alignContent: "flex-end"
          }}
        >
          <View style={{ justifyContent: "flex-end", display: "none" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                //backgroundColor: "#FFF",
                paddingTop: 10
              }}
            >
              <Button
                onPress={() => {
                  this.setState({
                    showFavList: true
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderWidth: 1,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-star"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
              <Button
                onPress={() => {
                  this.setState({
                    showFavList: false
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderWidth: 1,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-menu"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
              <Button
                onPress={() => {
                  this.setState({
                    //formItem: true
                    showBill: true
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-calculator"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }

  showAdditionalSalesType(width = 322, top = 149, left = 745) {
    let { additionalSalesType, showAdditionalSalesType } = this.state;
    if (showAdditionalSalesType) {
      return (
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            //flex: 1,
            zIndex: 12,
            //height: 200,
            position: "absolute",
            top: top,
            width: width,
            left: left,
            elevation: 3,
            borderRadius: 5,
            //paddingTop: 10,
            marginBottom: 10
          }}
        >
          {additionalSalesType.map((items, itemIndex) => {
            return (
              <Button
                style={{
                  paddingTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  alignItems: "center",
                  alignContent: "center"
                }}
                onPressIn={() => {
                  this.modifyBillChangeGojek(
                    items.name,
                    this.state.selectedSalesType
                  );
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {items.name}
                </Text>
              </Button>
            );
          })}

          {/* {additionalTable.map(this.renderAdditionalTable)} */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  showAdditionalTable(width = 322, top = 149, left = 745) {
    let { additionalTable, showAdditionalTable } = this.state;
    if (showAdditionalTable) {
      return (
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            //flex: 1,
            zIndex: 12,
            //height: 200,
            position: "absolute",
            top: top,
            width: width,
            left: left,
            elevation: 3,
            borderRadius: 5,
            //paddingTop: 10,
            marginBottom: 10
          }}
        >
          {additionalTable.map((items, itemIndex) => {
            return (
              <Button
                style={{
                  paddingTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  alignItems: "center",
                  alignContent: "center"
                }}
                onPressIn={() => {
                  this.setState({
                    selectedTable: items,
                    showAdditionalTable: false
                  });
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {items.name}
                </Text>
              </Button>
            );
          })}

          {/* {additionalTable.map(this.renderAdditionalTable)} */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderNew(width = 138, top = 200, left = 1097) {
    const { showNew } = this.state;
    if (showNew) {
      return (
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            //flex: 1,
            //height: 200,
            position: "absolute",
            width: width,
            top: top,
            left: left,
            // width: 138,
            // top: 200,
            // left: 1097,
            elevation: 3,
            borderRadius: 5,
            marginBottom: 15,
            zIndex: 20
          }}
        >
          <Button
            style={{
              //width: '95%',
              zIndex: 11,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: "#FFF",
              elevation: 4,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center"
            }}
            onPressIn={() => {
              //alert("Test");
              //this.setState({ showNew: false });
              //this.addNewName();
              this.newOrder();
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {_order[this.state.languageIndex]}
              </Text>
            </View>
          </Button>

          <Button
            style={{
              //width: '95%',
              zIndex: 11,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: "#FFF",
              elevation: 4,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center"
            }}
            onPressIn={() => {
              //alert("Test");
              //this.setState({ showNew: false });
              this.addNewName();
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {_nama[this.state.languageIndex]}
              </Text>
            </View>
          </Button>
          <Button
            style={{
              //width: '95%',
              zIndex: 11,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: "#FFF",
              elevation: 4,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center"
            }}
            onPressIn={() => {
              Actions.MobileMeja({
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {_meja[this.state.languageIndex]}
              </Text>
            </View>
          </Button>
          <Button
            style={{
              //width: '95%',
              zIndex: 11,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              elevation: 4,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center"
            }}
            onPressIn={() => {
              Actions.MobileManagement({
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
          >
            <View>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 10,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    textAlign: "center"
                  }
                ]}
              >
                {_data_pelanggan[this.state.languageIndex]}
              </Text>
            </View>
          </Button>
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderRightSide() {
    const { dataBill, selectedTable, selectedSalesType } = this.state;
    let subTotal = 0;
    // dataBill.map((v, i) => {
    //   subTotal = subTotal + v.qty * v.price;
    //   subTotal = subTotal + v.qty * v.salesTypeValue;
    // });

    dataBill.map((v, i) => {
      const total = v.total !== "" ? v.total : 0;
      if (this.state.currencyAllowDecimal) {
        subTotal = subTotal + parseFloat(total);
      } else {
        subTotal = subTotal + parseInt(total);
      }

      //subTotal = subTotal + v.qty * v.salesTypeValue;
    });

    //let selectedTable = 'Meja 1';

    let total_add = 1 + this.state.services + this.state.tax;

    let total_services = 0;
    if (this.state.currencyAllowDecimal) {
      total_services = subTotal * this.state.services;
    } else {
      total_services = Math.round(subTotal * this.state.services);
    }
    let total_tax = 0;

    if (this.state.currencyAllowDecimal) {
      total_tax = subTotal * this.state.tax;
    } else {
      total_tax = Math.round(subTotal * this.state.tax);
    }

    if (this.state.withServices === false) {
      total_services = 0;
    }

    if (this.state.withTax === false) {
      total_tax = 0;
    }

    let grand_total = 0;
    grand_total = subTotal + total_services + total_tax;

    return (
      <View
        style={{
          margin: 15,
          marginTop: 0,
          flex: 1,
          zIndex: 5,
          backgroundColor: WHITE
        }}
      >
        {this.state.loading ? <Loading /> : <View />}
        {/* {this.renderNew(width,py,px)} */}
        <View
          style={{
            //zIndex: 100,
            //elevation: 1,
            //backgroundColor: WHITE,
            flex: 1,
            //minHeight: 400,
            //height: 400,
            borderRadius: 5
            //marginTop: 15
            //alignItems: 'center',
            //justifyContent: 'center'
          }}
        >
          {this.state.loading ? <Loading /> : <View />}
          {/* Header Bill */}
          {/* KERANJANG DISINI */}
          <ScrollView
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {this.state.tablet ? (
              this.state.dataBill.length > 1 ? (
                <FlatList
                  //ListHeaderComponent={}
                  columnWrapperStyle={{
                    justifyContent: "space-between"
                    //marginBottom: 5,
                    //justifyContent:"center",
                    //marginBottom: 5
                  }}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataBill}
                  renderItem={({ item, index }) => {
                    if (this.state.ready === true) {
                      return (
                        <View style={{ width: "49%" }}>
                          {this.renderBill(item, index)}
                        </View>
                      );
                    } else {
                      return <View />;
                    }
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "RenderBill" + index.toString();
                  }}
                //onRefresh={this._onRefresh}
                //onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={0.5}
                //refreshing={refreshing}
                />
              ) : (
                <FlatList
                  //ListHeaderComponent={}
                  // columnWrapperStyle={{
                  //   justifyContent: "space-between"
                  //   //marginBottom: 5,
                  //   //justifyContent:"center",
                  //   //marginBottom: 5
                  // }}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataBill}
                  renderItem={({ item, index }) => {
                    if (this.state.ready === true) {
                      return (
                        <View style={{ width: "49%", alignSelf: "center" }}>
                          {this.renderBill(item, index)}
                        </View>
                      );
                    } else {
                      return <View />;
                    }
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "RenderBill" + index.toString();
                  }}
                //onRefresh={this._onRefresh}
                //onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={0.5}
                //refreshing={refreshing}
                />
              )
            ) : (
              <FlatList
                //ListHeaderComponent={}
                showsVerticalScrollIndicator={false}
                data={this.state.dataBill}
                renderItem={({ item, index }) => {
                  if (this.state.ready === true) {
                    return (
                      <View style={{}}>{this.renderBill(item, index)}</View>
                    );
                  } else {
                    return <View />;
                  }
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "RenderBill" + index.toString();
                }}
              //onRefresh={this._onRefresh}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={0.5}
              //refreshing={refreshing}
              />
            )}
          </ScrollView>
          {/* Bills  */}
          {/* Total Bills  */}
          <View
            style={{
              paddingTop: 5,
              borderColor: "#C8C7CC",
              borderTopWidth: 1,
              width: "100%"
            }}
          />
          <View
            style={{
              // alignSelf: 'flex-end',
              //flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
              //marginTop: 20,
              //paddingBottom: 10,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center"
            }}
          >
            <View
              style={{
                //alignItems: "center",
                //alignContent: "center",
                width: "50%",
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  display: this.state.access_change_tax ? "flex" : "none"
                }}
              >
                <Checkbox
                  color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                  checked={this.state.withTax}
                  size={15}
                  action={() => {
                    //ganti checklist Nego
                    this.setState({ withTax: !this.state.withTax });
                  }}
                />
              </View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {_pajak[this.state.languageIndex]} ({this.state.tax * 100}%)
              </Text>
            </View>

            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {this.state.currency} {this.idrNumToStr(total_tax)}
              </Text>
            </View>
          </View>

          <View
            style={{
              // alignSelf: 'flex-end',
              //flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
              //marginTop: 20,
              //paddingBottom: 10,
              paddingTop: 5,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center"

              //borderColor: "#C8C7CC",
              //borderTopWidth: 1
            }}
          >
            <View
              style={{
                //alignItems: "center",
                //alignContent: "center",
                width: "50%",
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  display: this.state.access_change_tax ? "flex" : "none"
                }}
              >
                <Checkbox
                  color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                  checked={this.state.withServices}
                  size={15}
                  action={() => {
                    //ganti checklist Nego
                    this.setState({ withServices: !this.state.withServices });
                  }}
                />
              </View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {_service[this.state.languageIndex]} (
                {this.state.services * 100}%)
              </Text>
            </View>

            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {this.state.currency} {this.idrNumToStr(total_services)}
              </Text>
            </View>
          </View>

          <View
            style={{
              // alignSelf: 'flex-end',
              //flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
              //marginTop: 20,
              //paddingBottom: 10,
              paddingTop: 5,
              borderColor: "#C8C7CC",
              borderTopWidth: 0,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center"
            }}
          >
            <View
              style={{
                //alignItems: "center",
                //alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 13, color: BLACK }
                ]}
              >
                {_sub_total[this.state.languageIndex]} :
              </Text>
            </View>

            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 20, color: BLACK }
                ]}
              >
                {this.state.currency} {this.idrNumToStr(grand_total)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            //flex: 1,
            justifyContent: "space-between",
            width: this.state.tablet ? "50%" : "100%",
            alignSelf: "center"
            // flexDirection: "row"
          }}
        >
          <View
            style={{
              //flex: 1,
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              onPress={() => {
                // Actions.Bayar({userInfo:this.state.userInfo})
                if (this.state.order_id) {
                  //this.checkOutDelete();
                  this.setState({ showCustomConfirmation: true });
                } else {
                }
              }}
              style={{
                backgroundColor: RED_600,
                borderRadius: 15,
                elevation: 1,
                width: "30%",
                display: this.state.order_id ? "flex" : "none",
                marginRight: 5,
                //height: 66,
                padding: 10,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={
                  ([MainStyle.robotoNormal],
                  {
                    fontSize: 13,
                    color: WHITE
                  })
                }
              >
                {_delete[this.state.languageIndex]}
              </Text>
            </Button>
            <View
              style={{
                width: "30%",
                display: this.state.order_id ? "flex" : "none",
                flexDirection: "row"
              }}
            >
              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  if (this.state.order_id) {
                    this.checkOutAction("update");
                  } else {
                  }
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderRadius: 15,
                  elevation: 1,

                  display: this.state.order_id ? "flex" : "none",
                  marginRight: 5,
                  //height: 66,
                  padding: 10,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 13,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    })
                  }
                >
                  {_simpan[this.state.languageIndex]}
                </Text>
              </Button>

              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  if (this.state.printer_label) {
                    this.printLabel();
                  }
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderRadius: 15,
                  elevation: 1,
                  flex: 1,
                  display: this.state.order_id ? "none" : "none",
                  marginRight: 5,
                  //height: 66,
                  padding: 5,
                  marginTop: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 11,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    })
                  }
                >
                  {_print_label[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  if (this.state.order_id && this.state.printer_main) {
                    //this.checkOutAction("update");
                    // this.connect(this.state.printer_main.address);
                    setTimeout(() => {
                      // this.printKitchen(null, 0, "main");
                      this.printKitchen();

                      // setTimeout(() => {
                      // if (this.state.printer_label) {
                      //   this.printLabel();
                      // }, 1000
                      // }
                    }, 500);
                  }
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderRadius: 15,
                  elevation: 1,
                  //width: "30%",
                  display: this.state.order_id ? "flex" : "none",
                  marginRight: 5,
                  //height: 66,
                  padding: 10,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <MaterialCommunityIcons
                  name={"printer"}
                  style={{
                    alignSelf: "center",
                    fontSize: 25,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
            </View>

            <Button
              onPress={() => {
                // Actions.Bayar({userInfo:this.state.userInfo})
                const action =
                  !this.state.order_id &&
                    this.state.selectedSalesType.toString() ===
                    this.state.sales_type_dine_in_id.toString()
                    ? ""
                    : "pay";
                this.setState({ loading: true });
                this.checkOutAction(action);
              }}
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                borderRadius: 15,
                elevation: 1,
                width: this.state.order_id ? "33%" : "100%",
                //height: 66,
                padding: 10,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={
                  ([MainStyle.robotoNormal],
                  {
                    fontSize: 13,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  })
                }
              >
                {!this.state.order_id &&
                  this.state.selectedSalesType.toString() ===
                  this.state.sales_type_dine_in_id.toString()
                  ? _simpan[this.state.languageIndex]
                  : _lanjut[this.state.languageIndex]}
              </Text>
            </Button>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#FFF",
              paddingTop: 10,
              marginTop: 10,
              display: "none"
            }}
          >
            <View style={{ width: "30%", justifyContent: "space-between" }}>
              <Button
                onPress={() => {
                  this.cetakBill();
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  elevation: 1,
                  width: "90%",
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormalBold],
                    {
                      fontSize: 12,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    })
                  }
                >
                  {_cetak_bill[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.cetakBill("Dapur");
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  elevation: 1,
                  width: "90%",
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 12,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    })
                  }
                >
                  {_cetak_dapur[this.state.languageIndex]}
                </Text>
              </Button>
              {/* <Button
                style={{
                  backgroundColor: "rgba(25, 53, 94, 0.69)",
                  elevation: 1,
                  width: "50%",
                  marginTop: 10,
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  Actions.Meja({
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex
                  });
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal], { fontSize: 16, color: WHITE })
                  }
                >
                  Split/Join
                </Text>
              </Button> */}
            </View>
            <View style={{ width: "33%", justifyContent: "space-between" }}>
              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  this.checkOutAction("update");
                }}
                style={{
                  display: this.state.order_id ? "flex" : "none",
                  backgroundColor: "#7AB93C",
                  elevation: 1,
                  width: "90%",
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal], { fontSize: 12, color: WHITE })
                  }
                >
                  Update Order
                </Text>
              </Button>
              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  this.newOrder(true, true);
                }}
                style={{
                  display: this.state.order_id ? "flex" : "none",
                  backgroundColor: RED_500,
                  elevation: 1,
                  width: "90%",
                  marginTop: 10,
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal], { fontSize: 12, color: WHITE })
                  }
                >
                  {_cancel_order[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
            <Button
              onPress={() => {
                // Actions.Bayar({userInfo:this.state.userInfo})
                this.checkOutAction();
              }}
              style={{
                backgroundColor: "#7AB93C",
                borderRadius: 15,
                elevation: 2,
                width: "32%",
                height: 66,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={
                  ([MainStyle.robotoNormal], { fontSize: 12, color: WHITE })
                }
              >
                {!this.state.order_id &&
                  this.state.selectedSalesType ===
                  this.state.sales_type_dine_in_id
                  ? "Check In"
                  : "Check Out"}
              </Text>
            </Button>
          </View>
          {/* {this.renderTabBar()} */}
        </View>
      </View>
    );
  }

  truncateOnWord(str, limit) {
    var trimmable =
      "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF";
    var reg = new RegExp("(?=[" + trimmable + "])");
    var words = str.split(reg);
    var count = 0;
    return words
      .filter(function (word) {
        count += word.length;
        return count <= limit;
      })
      .join("");
  }

  divideLongWord(str, limit) {
    let final_result = [];
    let length = str.length;

    let array_length = Math.ceil(length / limit);

    // for (var i = 0; i < array_length; i++) {
    //   let temp = str.substr(i * limit, limit);
    //   final_result.push(temp);
    // }

    let count = 0;

    for (let i = 0; i < array_length + 2; i++) {
      let temp = "";

      if (count === 0) {
        //temp = str.substr(0, limit);
        temp = this.truncateOnWord(str, limit);
      } else {
        temp = str.substr(count, length);
        temp = this.truncateOnWord(temp, limit);
      }
      count = count + temp.length;
      // i = temp.length;
      // i = i + temp.length;
      if (temp !== "") {
        final_result.push(temp.trim());
      }
    }

    return final_result;

    //substr(0, limit);
  }

  async connectPrinter(address) {
    //let name = "RP58BU";

    await BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          this.setState({
            loading: false
            //boundAddress: address
          });
          //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
        },
        e => {
          this.setState({
            loading: false
          });
          //alert(e);
        }
      );

    await BluetoothEscposPrinter.printText("", {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1
    });
  }

  async printAction(type = "cashier") {
    try {
      // let printer_address = "00:0E:0E:02:93:45";
      // let printer_name = "RP58BU";
      const { printer_main, printer_kitchen } = this.state;
      let printer_address = "";

      if (type === "cashier") {
        if (printer_main) {
          printer_address = printer_main.address.toString();
        }
      } else {
        if (printer_kitchen) {
          printer_address = printer_kitchen.address.toString();
        }
      }

      // address = "00:0E:0E:02:93:45";

      if (printer_address !== "") {
        await BluetoothManager.connect(printer_address) // the device address scanned.
          .then(
            s => {
              this.setState({
                loading: false
                //boundAddress: address
              });
              //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
            },
            e => {
              this.setState({
                loading: false
              });
              //alert(e);
            }
          );
        const { userInfo, dataBill, bill_transId } = this.state;
        let address = "Alamat dari Retail";
        let gerai_name = userInfo.gerai_name;
        let description = userInfo.description;
        let cashier_name = userInfo.name;
        let transaction_id = "";
        let time = moment(new Date()).format("DD/MM/YYYY HH:mm");
        let no_table = this.state.selectedTable.name;

        let subTotal = 0;
        let total_bayar = 0;

        dataBill.map((v, i) => {
          subTotal = subTotal + v.qty * v.price;
          subTotal = subTotal + v.qty * v.salesTypeValue;
        });

        let total_add = 1 + this.state.services + this.state.tax;
        let grand_total = subTotal * total_add;

        total_bayar = grand_total;

        // BluetoothEscposPrinter.printPic(ImageBase64, {
        //   width: 200,
        //   height: 200
        // });
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER
        );

        if (type !== "cashier") {
          await BluetoothEscposPrinter.printText(`***INCOMING ORDER***\n\r`, {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          });
        }
        await BluetoothEscposPrinter.printText(`${gerai_name}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printText(`${description}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printText(" \n\r", {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 1,
          heigthtimes: 1,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.LEFT
        );

        if (
          this.state.selectedSalesType.toString() ===
          this.state.sales_type_dine_in_id.toString()
        ) {
          await BluetoothEscposPrinter.printText(`No Table ${no_table}\n\r`, {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          });
        }

        await BluetoothEscposPrinter.printText(
          `Transaction ID ${transaction_id}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );

        await BluetoothEscposPrinter.printText(`Cashier ${cashier_name}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printText(`${time}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.LEFT
        );

        // await BluetoothEscposPrinter.printText(
        //   "Items         QTY      Total \n\r",
        //   {}
        // );
        await BluetoothEscposPrinter.printText(
          "--------------------------------\n\r",
          {}
        );

        // await BluetoothEscposPrinter.printText(
        //   "99 x 123456789012345678 12345678\n\r",
        //   {}
        // );

        dataBill.map((data, i) => {
          let detail = data.detail;
          let detailString = "";
          let total = data.qty * data.price + data.qty * data.salesTypeValue;
          detail.map((items, itemIndex) => {
            if (detailString === "") {
              detailString = items.name;
            } else {
              detailString = detailString + ", " + items.name;
            }
          });

          let product_name = data.name;
          let product_price = total.toString();
          let product_price_length = product_price.length;

          let product_qty = data.qty.toString();

          if (product_qty.length === 1) {
            product_qty = product_qty + "  x ";
          } else {
            product_qty = product_qty + " x";
          }

          let price_space = "";
          let price_space_num = 0;

          if (product_price_length < 8) {
            price_space_num = 8 - product_price_length;
          }
          for (var xx = 0; xx < price_space_num; xx++) {
            price_space = price_space + " ";
          }

          let product_name_array = this.divideLongWord(product_name, 18);
          let product_name_length = product_name_array.length;
          let product_name_first_line = product_name_array[0];
          let length = product_name_first_line.length;
          let prod_space = " ";
          let prod_space_num = 0;

          let detail_array = this.divideLongWord(detailString, 30);
          let detail_length = detail_array.length;

          let notes_array = this.divideLongWord(data.notes, 30);
          let notes_length = notes_array.length;

          if (length < 18) {
            prod_space_num = 18 - length;
          }

          for (var s = 0; s < prod_space_num; s++) {
            prod_space = prod_space + " ";
          }

          BluetoothEscposPrinter.printText(
            `${product_name_first_line}${prod_space}${product_qty}${price_space}${product_price}\n\r`,
            {}
          );

          for (var i = 1; i < product_name_length; i++) {
            BluetoothEscposPrinter.printText(
              `${product_name_array[i]}\n\r`,
              {}
            );
          }

          for (var j = 0; j < detail_length; j++) {
            BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
          }

          BluetoothEscposPrinter.printText(`${data.salesTypeName}\n\r`, {});
          //BluetoothEscposPrinter.printText(`${data.salesType}\n\r`, {});

          if (notes_length > 0) {
            BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
            for (var k = 0; k < notes_length; k++) {
              BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
            }
          }
        });

        let sub_total = subTotal.toString();
        let sub_total_length = sub_total.length;
        let sub_total_space = "";
        let sub_total_space_num = 0;

        if (sub_total_length < 24) {
          sub_total_space_num = 24 - sub_total_length;
        }
        for (var xx = 0; xx < sub_total_space_num; xx++) {
          sub_total_space = sub_total_space + " ";
        }

        await BluetoothEscposPrinter.printText(
          "--------------------------------\n\r",
          {}
        );
        // await BluetoothEscposPrinter.printText(
        //   "12345678901234567890123456789012\n\r",
        //   {}
        // );

        await BluetoothEscposPrinter.printText(
          `Subtotal${sub_total_space}${sub_total}\n\r`,
          {}
        );

        let tax = parseInt(Math.ceil(grand_total) - subTotal).toString();
        let tax_total_length = tax.length;
        let tax_total_space = "";
        let tax_total_space_num = 0;
        if (tax_total_length < 29) {
          tax_total_space_num = 29 - tax_total_length;
        }

        for (var xxx = 0; xxx < tax_total_space_num; xxx++) {
          tax_total_space = tax_total_space + " ";
        }

        await BluetoothEscposPrinter.printText(
          `Tax${tax_total_space}${tax}\n\r`,
          {}
        );

        grand_total = parseInt(Math.ceil(grand_total)).toString();
        let grand_total_length = grand_total.length;
        let grand_total_space = "";
        let grand_total_space_num = 0;
        if (grand_total_length < 21) {
          grand_total_space_num = 21 - grand_total_length;
        }

        for (var y = 0; y < grand_total_space_num; y++) {
          grand_total_space = grand_total_space + " ";
        }

        await BluetoothEscposPrinter.printText(
          `Grand Total${grand_total_space}${grand_total}\n\r`,
          {}
        );
        // await BluetoothEscposPrinter.printText(
        //   "--------------------------------\n\r",
        //   {}
        // );
        // await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
        // await BluetoothEscposPrinter.printText(
        //   "--------------------------------\n\r",
        //   {}
        // );

        await BluetoothEscposPrinter.printText(" \n\r", {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 3,
          heigthtimes: 3,
          fonttype: 1
        });
        await BluetoothEscposPrinter.printText(" \n\r", {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 3,
          heigthtimes: 3,
          fonttype: 1
        });

        await BluetoothEscposPrinter.cutPaper();
      } else {
        //alert("Tidak terkoneksi dengan printer");
      }
    } catch (error) {
      //alert(error);
      //alert("Terjadi kesalahan untuk mencetak struk mohon coba kembali.");
    }

    //BluetoothEscposPrinter.openDrawer(0, 250, 250);
  }

  async connect(address = this.state.printer_kitchen.address) {
    BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          this.setState({
            //loading: false
            //boundAddress: address
          });
          //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
        },
        e => {
          this.setState({
            //loading: false
          });
          //alert(e);
        }
      );

    try {
      await BluetoothEscposPrinter.printText("", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1
      });
    } catch (error) { }
  }

  async printKitchen(update, times = 1, type = "kitchen") {
    try {
      const {
        userInfo,
        dataBill,
        bill_transId,
        data_order,
        customPriceFinal,
        customPriceTax,
        printType
      } = this.state;

      let total_addition_name = 0;
      let total_addition_price = 0;

      // if (printType === 2) {
      //   total_addition_name = 10;
      //   total_addition_price = 6;
      // }

      let address = "Alamat dari Retail";
      let gerai_name = userInfo.gerai_name;
      let description = userInfo.restaurant_address
        ? userInfo.restaurant_address
        : "";
      let cashier_name = userInfo.name;
      let transaction_id = bill_transId;
      let time = moment(new Date()).format("DD/MM/YYYY HH:mm");
      let no_table = this.state.selectedTable.name;

      // BluetoothEscposPrinter.printPic(ImageBase64, {
      //   width: 200,
      //   height: 200
      // });
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );

      if (update) {
        await BluetoothEscposPrinter.printText(
          `${_revisi[this.state.languageIndex]} #${update}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      await BluetoothEscposPrinter.printText(`${gerai_name}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      });

      // await BluetoothEscposPrinter.printText(`${description}\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });

      await BluetoothEscposPrinter.printText(" \n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1
      });

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT
      );

      if (
        this.state.selectedSalesType.toString() ===
        this.state.sales_type_dine_in_id.toString()
      ) {
        await BluetoothEscposPrinter.printText(
          `${_no_table[this.state.languageIndex]} ${no_table}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      if (this.state.show_order_id) {
        await BluetoothEscposPrinter.printText(
          `${_transaction_id[this.state.languageIndex]} ${transaction_id}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      await BluetoothEscposPrinter.printText(
        `${_cashier[this.state.languageIndex]} ${cashier_name}\n\r`,
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );

      await BluetoothEscposPrinter.printText(`${time}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      });

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT
      );

      // await BluetoothEscposPrinter.printText(
      //   "Items         QTY      Total \n\r",
      //   {}
      // );
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );

      // await BluetoothEscposPrinter.printText(
      //   "99 x 123456789012345678 12345678\n\r",
      //   {}
      // );

      dataBill.map((data, i) => {
        let status = "";

        if (data.status) {
          if (data.status === "on progress") {
            status = "On Progress";
          }
          if (data.status === "done") {
            status = "Done";
          }
        }

        if (status !== "") {
          if (status !== "Done") {
            BluetoothEscposPrinter.printText(`${status}\n\r`, {});
          } else {
          }
        }

        let detail = data.detail;
        let detailString = "";
        //let total = data.qty * data.price + data.qty * data.salesTypeValue;
        let total = data.total;

        detail.map((items, itemIndex) => {
          if (detailString === "") {
            detailString = items.name;
          } else {
            detailString = detailString + ", " + items.name;
          }
        });

        let product_name = data.name;
        let product_price = total.toString();
        let product_price_length = product_price.length;

        let product_qty = data.qty.toString();

        if (product_qty.length === 1) {
          product_qty = product_qty + "x ";
        } else {
          product_qty = product_qty + "x";
        }

        let price_space = "";
        let price_space_num = 0;

        if (product_price_length < 8) {
          price_space_num = 8 - product_price_length;
        }
        for (var xx = 0; xx < price_space_num; xx++) {
          price_space = price_space + " ";
        }

        let product_name_array = this.divideLongWord(product_name, 23);
        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        let detail_array = this.divideLongWord(detailString, 30);
        let detail_length = detail_array.length;

        let notes_array = this.divideLongWord(data.notes, 30);
        let notes_length = notes_array.length;

        if (length < 23) {
          prod_space_num = 23 - length;
        }

        for (var s = 0; s < prod_space_num; s++) {
          prod_space = prod_space + " ";
        }

        if (status !== "Done" || type !== "kitchen") {
          // BluetoothEscposPrinter.printText(
          //   `${product_name_first_line}${prod_space}${product_qty}${price_space}\n\r`,
          //   {}
          // );

          BluetoothEscposPrinter.printColumn(
            [20 + total_addition_name, 1, 11 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${data.name}`, ``, `${product_qty}`],
            {}
          );
          // for (var i = 1; i < product_name_length; i++) {
          //   BluetoothEscposPrinter.printText(
          //     `${product_name_array[i]}\n\r`,
          //     {}
          //   );
          // }

          // for (var j = 0; j < detail_length; j++) {
          //   BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
          // }
          // BluetoothEscposPrinter.printText(`${data.salesTypeName}\n\r`, {});

          BluetoothEscposPrinter.printColumn(
            [30 + total_addition_name, 1, 1 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${detailString}`, ``, ``],
            {}
          );

          BluetoothEscposPrinter.printColumn(
            [30 + total_addition_name, 1, 1 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${data.salesTypeName}`, ``, ``],
            {}
          );

          if (notes_length > 0) {
            // BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
            // for (var k = 0; k < notes_length; k++) {
            //   BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
            // }

            BluetoothEscposPrinter.printColumn(
              [30 + total_addition_name, 1, 1 + total_addition_price],
              [
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.RIGHT
              ],
              [`${_notes[this.state.languageIndex]}`, ``, ``],
              {}
            );

            BluetoothEscposPrinter.printColumn(
              [30 + total_addition_name, 1, 1 + total_addition_price],
              [
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.RIGHT
              ],
              [`${data.notes}`, ``, ``],
              {}
            );
          }

          BluetoothEscposPrinter.printText(
            "--------------------------------\n\r",
            {}
          );
        }
      });

      // await BluetoothEscposPrinter.printText(
      //   "--------------------------------\n\r",
      //   {}
      // );
      // await BluetoothEscposPrinter.printText(
      //   "12345678901234567890123456789012\n\r",
      //   {}
      // );

      // await BluetoothEscposPrinter.printText(
      //   `Subtotal${sub_total_space}${sub_total}\n\r`,
      //   {}
      // );

      // let tax = parseInt(
      //   Math.ceil(grand_total) - subTotal + discount - customPriceFinal
      // ).toString();

      await BluetoothEscposPrinter.printText(" \n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 3,
        heigthtimes: 3,
        fonttype: 1
      });
      await BluetoothEscposPrinter.printText(" \n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 3,
        heigthtimes: 3,
        fonttype: 1
      });

      await BluetoothEscposPrinter.cutPaper();

      setTimeout(() => {
        this.connect(this.state.printer_kitchen.address);
      }, 1000);
    } catch (error) {
      //alert(error);
      if (times < 3) {
        if (type === "kitchen") {
          this.reprintKitchen(update, parseInt(times) + 1, type);
        } else {
          this.reprintKitchenMain(update, parseInt(times) + 1, type);
        }
      }
    }

    // if (this.state.payment_type === "cash") {
    //   BluetoothEscposPrinter.openDrawer(0, 250, 250);
    // }
  }

  async printLabel() {
    this.connect(this.state.printer_label.address);
    console.log("PRINT LABEL ===> ");
    setTimeout(() => {
      try {
        const {
          userInfo,
          dataBill,
          bill_transId,
          data_order,
          customPriceFinal,
          customPriceTax,
          printType
        } = this.state;

        let item_num = 0;

        let total_addition_name = 0;
        let total_addition_price = 0;

        let time = moment(new Date()).format("DD/MM/YYYY HH:mm");

        dataBill.map((data, index) => {
          let status = "";

          if (data.status) {
            if (data.status === "on progress") {
              status = "On Progress";
            }
            if (data.status === "done") {
              status = "Done";
            }
          }

          if (status !== "") {
            if (status !== "Done") {
              //BluetoothEscposPrinter.printText(`${status}\n\r`, {});
            } else {
            }
          }

          let detail = data.detail;
          let detailString = "";
          //let total = data.qty * data.price + data.qty * data.salesTypeValue;
          let total = data.total;

          detail.map((items, itemIndex) => {
            if (detailString === "") {
              detailString = items.name;
            } else {
              detailString = detailString + ", " + items.name;
            }
          });

          let product_name = data.name;
          let product_price = total.toString();
          let product_price_length = product_price.length;

          let product_qty = data.qty.toString();

          if (product_qty.length === 1) {
            product_qty = product_qty + "x ";
          } else {
            product_qty = product_qty + "x";
          }

          let price_space = "";
          let price_space_num = 0;

          if (product_price_length < 8) {
            price_space_num = 8 - product_price_length;
          }
          for (var xx = 0; xx < price_space_num; xx++) {
            price_space = price_space + " ";
          }

          let product_name_array = this.divideLongWord(product_name, 23);
          let product_name_length = product_name_array.length;
          let product_name_first_line = product_name_array[0];
          let length = product_name_first_line.length;
          let prod_space = " ";
          let prod_space_num = 0;

          let detail_array = this.divideLongWord(detailString, 30);
          let detail_length = detail_array.length;

          let notes_array = this.divideLongWord(data.notes, 30);
          let notes_length = notes_array.length;

          if (length < 23) {
            prod_space_num = 23 - length;
          }

          for (var s = 0; s < prod_space_num; s++) {
            prod_space = prod_space + " ";
          }

          for (let i = 0; i < data.qty; i++) {
            item_num = item_num + 1;
            if (status !== "Done") {
              BluetoothEscposPrinter.printText(`${time}\n\r`, {
                encoding: "GBK",
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
              });

              // BluetoothEscposPrinter.printText(
              //   `${product_name_first_line}${prod_space}${product_qty}${price_space}\n\r`,
              //   {}
              // );

              // BluetoothEscposPrinter.printColumn(
              //   [20 + total_addition_name, 1, 11 + total_addition_price],
              //   [
              //     BluetoothEscposPrinter.ALIGN.LEFT,
              //     BluetoothEscposPrinter.ALIGN.LEFT,
              //     BluetoothEscposPrinter.ALIGN.RIGHT
              //   ],
              //   [`${data.name}`, ``, `${product_qty}`],
              //   {}
              // );

              BluetoothEscposPrinter.printColumn(
                [30 + total_addition_name, 1, 1 + total_addition_price],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT
                ],
                [`${data.name}`, ``, ``],
                {
                  encoding: "GBK",
                  codepage: 0,
                  widthtimes: 0,
                  heigthtimes: 0,
                  fonttype: 1
                }
              );

              // for (var i = 1; i < product_name_length; i++) {
              //   BluetoothEscposPrinter.printText(
              //     `${product_name_array[i]}\n\r`,
              //     {}
              //   );
              // }

              // for (var j = 0; j < detail_length; j++) {
              //   BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
              // }
              // BluetoothEscposPrinter.printText(`${data.salesTypeName}\n\r`, {});

              BluetoothEscposPrinter.printColumn(
                [30 + total_addition_name, 1, 1 + total_addition_price],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT
                ],
                [`${detailString}`, ``, ``],
                {
                  encoding: "GBK",
                  codepage: 0,
                  widthtimes: 0,
                  heigthtimes: 0,
                  fonttype: 1
                }
              );

              BluetoothEscposPrinter.printColumn(
                [30 + total_addition_name, 1, 1 + total_addition_price],
                [
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.LEFT,
                  BluetoothEscposPrinter.ALIGN.RIGHT
                ],
                [`${data.salesTypeName}`, ``, ``],
                {
                  encoding: "GBK",
                  codepage: 0,
                  widthtimes: 0,
                  heigthtimes: 0,
                  fonttype: 1
                }
              );

              if (notes_length > 0) {
                // BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
                // for (var k = 0; k < notes_length; k++) {
                //   BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
                // }

                // BluetoothEscposPrinter.printColumn(
                //   [30 + total_addition_name, 1, 1 + total_addition_price],
                //   [
                //     BluetoothEscposPrinter.ALIGN.LEFT,
                //     BluetoothEscposPrinter.ALIGN.LEFT,
                //     BluetoothEscposPrinter.ALIGN.RIGHT
                //   ],
                //   [`${_notes[this.state.languageIndex]}`, ``, ``],
                //   {}
                // );

                BluetoothEscposPrinter.printColumn(
                  [30 + total_addition_name, 1, 1 + total_addition_price],
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT
                  ],
                  [`${data.notes}`, ``, ``],
                  {
                    encoding: "GBK",
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 1
                  }
                );

                BluetoothEscposPrinter.printColumn(
                  [30 + total_addition_name, 1, 1 + total_addition_price],
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT
                  ],
                  [``, ``, ``],
                  {
                    encoding: "GBK",
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 1
                  }
                );
              } else {
                BluetoothEscposPrinter.printText(`\n\r`, {
                  encoding: "GBK",
                  codepage: 0,
                  widthtimes: 0,
                  heigthtimes: 0,
                  fonttype: 1
                });

                BluetoothEscposPrinter.printText(`\n\r`, {
                  encoding: "GBK",
                  codepage: 0,
                  widthtimes: 0,
                  heigthtimes: 0,
                  fonttype: 1
                });
              }

              // BluetoothEscposPrinter.printText(
              //   "--------------------------------\n\r",
              //   {}
              // );

              BluetoothEscposPrinter.printText(`\n\r`, {
                encoding: "GBK",
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
              });

              BluetoothEscposPrinter.printText(`\n\r`, {
                encoding: "GBK",
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
              });

              BluetoothEscposPrinter.printText(`\n\r`, {
                encoding: "GBK",
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
              });

              if (item_num > 1) {
                BluetoothEscposPrinter.printText(`\n\r`, {
                  encoding: "GBK",
                  codepage: 0,
                  widthtimes: 0,
                  heigthtimes: 0,
                  fonttype: 1
                });
              }

              BluetoothEscposPrinter.cutPaper();
            }
          }
        });

        // BluetoothEscposPrinter.printText(" \n\r", {
        //   encoding: "GBK",
        //   codepage: 0,
        //   widthtimes: 3,
        //   heigthtimes: 1,
        //   fonttype: 1
        // });

        // BluetoothEscposPrinter.cutPaper();

        setTimeout(() => {
          this.connect(this.state.printer_kitchen.address);
        }, 1000);
      } catch (error) { }
    }, 500);
  }
  async printKitchenOld(update, times = 1, type = "kitchen") {
    try {
      const {
        userInfo,
        dataBill,
        bill_transId,
        data_order,
        customPriceFinal,
        customPriceTax
      } = this.state;
      let address = "Alamat dari Retail";
      let gerai_name = userInfo.gerai_name;
      let description = userInfo.restaurant_address
        ? userInfo.restaurant_address
        : "";
      let cashier_name = userInfo.name;
      let transaction_id = bill_transId;
      let time = moment(new Date()).format("DD/MM/YYYY HH:mm");
      let no_table = this.state.selectedTable.name;

      // BluetoothEscposPrinter.printPic(ImageBase64, {
      //   width: 200,
      //   height: 200
      // });
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );

      if (update) {
        await BluetoothEscposPrinter.printText(`Revisi #${update}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });
      }

      await BluetoothEscposPrinter.printText(`${gerai_name}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      });

      // await BluetoothEscposPrinter.printText(`${description}\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });

      await BluetoothEscposPrinter.printText(" \n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1
      });

      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);

      if (
        this.state.selectedSalesType.toString() ===
        this.state.sales_type_dine_in_id.toString()
      ) {
        await BluetoothEscposPrinter.printText(`No Table ${no_table}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });
      }

      if (this.state.show_order_id) {
        await BluetoothEscposPrinter.printText(
          `Transaction ID ${transaction_id}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      await BluetoothEscposPrinter.printText(`Cashier ${cashier_name}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      });

      await BluetoothEscposPrinter.printText(`${time}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      });

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT
      );

      // await BluetoothEscposPrinter.printText(
      //   "Items         QTY      Total \n\r",
      //   {}
      // );
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );

      // await BluetoothEscposPrinter.printText(
      //   "99 x 123456789012345678 12345678\n\r",
      //   {}
      // );

      dataBill.map((data, i) => {
        let status = "";

        if (data.status) {
          if (data.status === "on progress") {
            status = "On Progress";
          }
          if (data.status === "done") {
            status = "Done";
          }
        }

        if (status !== "") {
          if (status !== "Done") {
            BluetoothEscposPrinter.printText(`${status}\n\r`, {});
          } else {
          }
        }

        let detail = data.detail;
        let detailString = "";
        //let total = data.qty * data.price + data.qty * data.salesTypeValue;
        let total = data.total;

        detail.map((items, itemIndex) => {
          if (detailString === "") {
            detailString = items.name;
          } else {
            detailString = detailString + ", " + items.name;
          }
        });

        let product_name = data.name;
        let product_price = total.toString();
        let product_price_length = product_price.length;

        let product_qty = data.qty.toString();

        if (product_qty.length === 1) {
          product_qty = product_qty + "  x ";
        } else {
          product_qty = product_qty + " x";
        }

        let price_space = "";
        let price_space_num = 0;

        if (product_price_length < 8) {
          price_space_num = 8 - product_price_length;
        }
        for (var xx = 0; xx < price_space_num; xx++) {
          price_space = price_space + " ";
        }

        let product_name_array = this.divideLongWord(product_name, 23);
        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        let detail_array = this.divideLongWord(detailString, 30);
        let detail_length = detail_array.length;

        let notes_array = this.divideLongWord(data.notes, 30);
        let notes_length = notes_array.length;

        if (length < 23) {
          prod_space_num = 23 - length;
        }

        for (var s = 0; s < prod_space_num; s++) {
          prod_space = prod_space + " ";
        }

        if (status !== "Done" || type !== "kitchen") {
          BluetoothEscposPrinter.printText(
            `${product_name_first_line}${prod_space}${product_qty}${price_space}\n\r`,
            {}
          );

          for (var i = 1; i < product_name_length; i++) {
            BluetoothEscposPrinter.printText(
              `${product_name_array[i]}\n\r`,
              {}
            );
          }

          for (var j = 0; j < detail_length; j++) {
            BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
          }
          BluetoothEscposPrinter.printText(`${data.salesTypeName}\n\r`, {});

          if (notes_length > 0) {
            BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
            for (var k = 0; k < notes_length; k++) {
              BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
            }
          }

          BluetoothEscposPrinter.printText(
            "--------------------------------\n\r",
            {}
          );
        }
      });

      // await BluetoothEscposPrinter.printText(
      //   "--------------------------------\n\r",
      //   {}
      // );
      // await BluetoothEscposPrinter.printText(
      //   "12345678901234567890123456789012\n\r",
      //   {}
      // );

      // await BluetoothEscposPrinter.printText(
      //   `Subtotal${sub_total_space}${sub_total}\n\r`,
      //   {}
      // );

      // let tax = parseInt(
      //   Math.ceil(grand_total) - subTotal + discount - customPriceFinal
      // ).toString();

      await BluetoothEscposPrinter.printText(" \n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 3,
        heigthtimes: 3,
        fonttype: 1
      });
      await BluetoothEscposPrinter.printText(" \n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 3,
        heigthtimes: 3,
        fonttype: 1
      });

      await BluetoothEscposPrinter.cutPaper();

      setTimeout(() => {
        this.connect(this.state.printer_kitchen.address);
      }, 1000);
    } catch (error) {
      //alert(error);
      if (times < 3) {
        //this.printKitchen(update, times + 1);
        if (type === "kitchen") {
          this.reprintKitchen(update, parseInt(times) + 1, type);
        } else {
          this.reprintKitchenMain(update, parseInt(times) + 1, type);
        }
      }
    }

    // if (this.state.payment_type === "cash") {
    //   BluetoothEscposPrinter.openDrawer(0, 250, 250);
    // }
  }

  renderCartButton() {
    return (
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 25,
          //width: "100%",

          //height: 50,
          //alignSelf: "flex-end",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Button
          onPress={() => {
            this.setState({
              //formItem: true
              showBill: true
            });
          }}
          style={{
            display: this.state.dataBill.length > 0 ? "flex" : "none",
            elevation: 2,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            width: 60,
            height: 60,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderRadius: 30
          }}
        >
          <Ionicons
            name="md-cart"
            size={25}
            style={[
              styles.headerIcon,
              { color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex) }
            ]}
          />

          {/* <Text
            style={
              ([MainStyle.robotoNormal],
              {
                fontSize: 10,
                color: BLACK
              })
            }
          >
            {_meja[this.state.languageIndex]}
          </Text> */}
        </Button>
      </View>
    );
  }

  renderTabBar() {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "rgba(248, 248, 248, 0.92)",
          height: 50,
          alignSelf: "flex-end",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Button
          onPress={() => {
            Actions.MobileMeja({
              userInfo: this.state.userInfo,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }}
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <AntDesign
            name={"home"}
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: BLACK
            }}
          />

          <Text
            style={
              ([MainStyle.robotoNormal],
              {
                fontSize: 10,
                color: BLACK
              })
            }
          >
            {_meja[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this.newOrder(true, true);
          }}
        >
          {/* <MaterialIcons
            name={"event-note"}
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: BLACK
            }}
          /> */}
          <Entypo
            name={"plus"}
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: BLACK
            }}
          />

          <Text
            style={
              ([MainStyle.robotoNormal],
              {
                fontSize: 10,
                color: BLACK
              })
            }
          >
            {_pesanan_baru[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          onPress={() => {
            if (this.state.order_id) {
              this.checkOutAction("update");
            } else {
            }
          }}
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Entypo
            name={"bookmark"}
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: BLACK
            }}
          />

          <Text
            style={
              ([MainStyle.robotoNormal],
              {
                fontSize: 10,
                color: BLACK
              })
            }
          >
            {_simpan_pesanan[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          onPress={() => {
            Actions.MobileManagement({
              userInfo: this.state.userInfo,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }}
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <AntDesign
            name={"user"}
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: BLACK
            }}
          />

          <Text
            style={
              ([MainStyle.robotoNormal],
              {
                fontSize: 10,
                color: BLACK
              })
            }
          >
            {_pelanggan[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  renderModalCamera() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCamera}
        onRequestClose={() => {
          this.setState({ showCamera: false, uploadPhoto: false });
        }}
      >
        {this.renderCamera()}
        {/* {this.state.uploadPhoto
            ? this.renderCameraPhoto()
            : this.renderCamera()} */}
      </Modal>
    );
  }

  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

    let { width, height } = Dimensions.get("window");
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        trackingEnabled
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel"
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        //onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
        onGoogleVisionBarcodesDetected={
          canDetectBarcode ? this.barcodeRecognized : null
        }
        //this.barcodeRecognized
        googleVisionBarcodeType={
          RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL
        }
      >
        <View
          style={{
            flex: 0.5,
            display: "none"
          }}
        >
          {/* <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View
          style={{
            flex: 0.4,
            display: "none",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          {/* <Slider
            style={{width: 150, marginTop: 15, alignSelf: 'flex-end'}}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          /> */}
        </View>
        {/* <View
          style={{
            flex: 0.1,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        > */}
        {/* <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}
          >
            {this.state.isRecording ? (
              <Text style={styles.flipText}> ☕ </Text>
            ) : (
              <Text style={styles.flipText}> REC </Text>
            )}
          </TouchableOpacity> */}
        {/* </View> */}
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>
            Zoom: {this.state.zoom}
          </Text>
        )}
        <View
          style={{
            flex: 0.1,
            display: "none",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          {/* <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity> */}
        </View>

        {/* <Modal
          transparent={true}
          visible={this.state.modal}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setState({ modal: false });
            Actions.pop();
          }}
        > */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            //justifyContent: "center",
            alignItems: "center",
            //borderLeftWidth: (width-300)/2,
            //borderRightWidth: (width-300)/2,
            //borderTopWidth: (height-50-300)/2,
            //borderBottomWidth: (height-50-300)/2,
            marginBottom: 0,
            //backgroundColor: "#BCA",
            borderColor: "#rgba(0,0,0,0.25)"
            //borderColor:'#rgba(255,255,255,0.25)',
          }}
        >
          <View
            style={{
              flex: 1,
              //
              width: "100%",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: this.state.tablet ? 0.25 : 0.1,
                paddingTop: 15,
                alignItems: "center",
                backgroundColor: "#rgba(0,0,0,0.50)",
                width: "100%",
                height: "100%"
              }}
            />
            <View
              style={{
                flex: 1,
                //paddingTop: 15,
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
              <View
                style={{
                  flex: 0.25,
                  backgroundColor: "#rgba(0,0,0,0.50)",
                  width: "100%",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showCamera: false });
                    //Actions.pop();
                  }}
                >
                  <View style={{ paddingTop: 15 }}>
                    <Ionicons
                      name={"md-close"}
                      //name={'flashlight-off'}
                      size={40}
                      color={WHITE}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 0.5,
                  backgroundColor: "transparent",
                  width: "100%",
                  alignItems: "center"
                }}
              />

              <View
                style={{
                  flex: 0.25,
                  backgroundColor: "#rgba(0,0,0,0.50)",
                  width: "100%",
                  alignItems: "center"
                }}
              />
            </View>
            <View
              style={{
                flex: this.state.tablet ? 0.25 : 0.1,
                paddingTop: 15,
                alignItems: "center",
                backgroundColor: "#rgba(0,0,0,0.50)",
                width: "100%",
                height: "100%"
              }}
            />
          </View>

          {/* <View
            style={{
              //backgroundColor: "#BCA",
              width: "100%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              // onPress={() => {
              //   //this.setState({ help: true });

              // }}
              style={{ marginBottom: 15 }}
              onPress={this.takePicture.bind(this)}
            >
              <Ionicons
                name={"md-camera"}
                //name={'flashlight-off'}
                size={50}
                color={WHITE}
              />
            </TouchableOpacity>
          </View> */}
          {/* <View
                style={{
                  width: "50%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // this.toggleFlash();
                    this.setState({
                      flash: flashModeOrder[this.state.flash]
                    });
                  }}
                >
                  <MaterialCommunityIcons
                    name={"flashlight"}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans-Regular",
                    color: WHITE
                  }}
                >
                  Flashlight
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ help: true });
                  }}
                >
                  <Ionicons
                    name={"md-help-circle-outline"}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />




                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans-Regular",
                    color: WHITE
                  }}
                >
                  Help
                </Text>
              </View> */}
        </View>
        {/* </Modal> */}
        {/* {!!canDetectBarcode && this.renderBarcodes()} */}
      </RNCamera>
    );
  }

  render() {
    let { notifNumber } = this.props;
    const {
      refreshing,
      showAlert,
      formItem,
      showNameForm,
      newName,
      lastUpdate,
      timeCompare
    } = this.state;
    notifNumber = 9999;
    //console.log("get additionalProduct ==> ", this.state.additionalProduct);

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    // let timeDifference = moment(lastUpdate).diff(moment(timeCompare));
    let timeDifference = moment(lastUpdate).diff(moment(timeCompare));

    let timeDifferenceSecond = Math.round(timeDifference / 1000);
    let timeDifferenceMinute = Math.round(timeDifferenceSecond / 60);
    let timeDifferenceHour = Math.round(timeDifferenceSecond / 3600);
    let jumlahData = 0;
    if (this.state.dataMenuFav) {
      jumlahData = this.state.dataMenuFav.length;
    }
    return (
      <View style={[styles.body]}>
        {this.state.loading || this.state.direct_payment ? (
          <Loading not_transparent={this.state.direct_payment ? true : false} />
        ) : (
          <View />
        )}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          logoutAction={() => this.logoutAction()}
          title={_pesanan_baru[this.state.languageIndex]}
          //title={this.state.selectedSalesType}
          //title={this.state.action}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          backAction={() => {
            if (
              this.state.dataBill.length > 0 &&
              this.state.order_id === null
              
            ) {
              this.setState({ showClearCartBackHandler: true });

            } else {
              this.newOrder(true, true);
              Actions.pop();
            }
          }}
          hideLogin={true}
          cart={false}
          cartAction={() => {
            this.setState({
              //formItem: true
              showBill: true
            });
          }}
          cartNumber={this.state.dataBill.length}
          salesType={this.state.selectedSalesType}
          salesTypeAction={val => {
            //console.log("salesTypeAction val ==> ", val);
            this.modifyBillChangeGojek(val, this.state.selectedSalesType);
            this.setState({ selectedSalesType: val, expand: true });

            // this.setState({
            //   //formItem: true
            //   showBill: true
            // });
          }}
          dineInID={this.state.sales_type_dine_in_id}
          salesTypeFirst={this.state.sales_type_first_id}
          table={this.state.selectedTable}
          action={this.state.action}
          tableAction={val => {
            //return id

            //console.log("select Table ==> ", val);
            this.setState({ selectedTable: val, expand: false });

            // this.setState({
            //   //formItem: true
            //   showBill: true
            // });
          }}
          expand={this.state.expand}
          salesTypeList={this.state.additionalSalesType}
          tableList={this.state.additionalTable}
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {showNameForm ? (
          <TransactionNewName
            closeText={"Submit"}
            value={newName}
            actions={() => {
              this.setState({ showNameForm: false });
            }}
            changeAction={text => {
              this.setState({ newName: text });
            }}
          />
        ) : (
          <View />
        )}

        {this.renderModalCamera()}

        {this.state.showClearCart === true ? (
          <ClearCart
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showClearCart: false });
            }}
            submitAction={() => {
              this.setState({ showClearCart: false, showBill: false });
              this.newOrder(true, true);
            }}
          />
        ) : (
          <View />
        )}

        {this.state.showCustomConfirmation === true ? (
          <CustomConfirmation
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showCustomConfirmation: false });
            }}
            submitAction={() => {
              //this.deleteData();
              this.checkOutDelete();
              this.setState({ showCustomConfirmation: false });
            }}
            text={_delete_confirmation[this.state.languageIndex]}
          />
        ) : (
          <View />
        )}

        {/* this.setState({openRecapAlert : true, openRecapMessage: alert_message[this.state.languageIndex]})
            Actions.pop();
            //Actions.pop();
            Actions.MobileRekap({
              auth: this.state.auth,
              userInfo: this.state.userInfo,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            }); */}

        {this.state.openRecapAlert === true ? (
          <CustomAlert
            message={[this.state.openRecapMessage]}
            //title={'Success'}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ openRecapAlert: false });
              Actions.pop();
              //Actions.pop();
              Actions.MobileRekap({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
          />
        ) : (
          <View />
        )}

        {this.state.showClearCartBackHandler === true ? (
          <ClearCart
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showClearCartBackHandler: false });
              Actions.pop();

            }}
            submitAction={() => {
              this.setState({ showClearCartBackHandler: false });
              this.newOrder(true, true);
              Actions.pop();
            }}
          />
        ) : (
          <View />
        )}

        {this.state.showAlert ? (
          <CustomAlert
            message={this.state.alertMessage}
            //title={'Success'}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}
        {/* <Button style={{
        backgroundColor: '#BCA', height: 100,
        width: 100, position: 'absolute', zIndex: 100, left: 100, top: 100}}
        onPress={()=>{alert(';;')}}></Button> */}

        <View
          style={{
            //flexDirection: "column",
            padding: 15,
            paddingBottom: 0,
            flex: 1,
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              flex: 1,
              //display: this.state.showBill ? "none" : "flex",
              width: "100%",
              marginTop: 0,
              backgroundColor: formItem ? "transparent" : "transparent",
              borderRadius: formItem ? 5 : 0,
              borderWidth: formItem ? 1 : 0,
              borderColor: MAIN_THEME_COLOR
            }}
          >
            <View style={{ backgroundColor: WHITE }}>
              {/* <Text>{this.state.lastUpdate}</Text>
              <Text>{this.state.timeCompare}</Text>
              <Text>{timeDifference}</Text>
              <Text>{timeDifferenceSecond}</Text>
              <Text>{timeDifferenceMinute}</Text>
              <Text>{timeDifferenceHour}</Text> */}

              {this.renderSearch()}
            </View>

            {this.renderLeftSide()}
            {this.renderFavLeftSide()}

            {jumlahData === 0 ? this.renderNoData() : <View />}
            {this.renderButtonsLeftSide()}
            {this.renderFormItem()}
          </View>


          {/* Left Side End */}
          {/*  */}
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.showBill}
            onRequestClose={() => {
              this.setState({ showBill: false });
            }}
          >
            {this.state.loading ? <Loading /> : <View />}
            {this.renderNew(
              this.state.newWidth,
              this.state.newTop,
              this.state.newLeft
            )}

            {this.showAdditionalTable(
              this.state.tableWidth,
              this.state.tableTop,
              this.state.tableLeft
            )}

            {this.showAdditionalSalesType(
              this.state.tableWidth,
              this.state.tableTop,
              this.state.tableLeft
            )}
            {/* header kart */}
            <MobileHeader
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              title={_keranjang[this.state.languageIndex]}
              notif={false}
              loginInformation={this.state.userInfo}
              menu={false}
              back={true}
              backAction={() => {
                this.setState({ showBill: false });
              }}
              hideLogin={true}
              cart={false}
              cartAction={() => {
                this.setState({
                  //formItem: true
                  showBill: true
                });
              }}
              hideOnline={false}
              cartNumber={this.state.dataBill.length}
              print={false}
              printAction={() => {
                this.printAction();
              }}
              printText={_cetak_bill[this.state.languageIndex]}
              clearCart={true}
              clearCartAction={() => {
                //this.printAction();
                this.setState({ showClearCart: true });
              }}
              clearCartText={_clear_cart[this.state.languageIndex]}
            />

            <View
              style={{
                flex: 1,

                //display: this.state.showBill ? "flex" : "none",
                width: "100%",
                marginTop: 0,
                backgroundColor: "#FFF",
                //elevation: 3,
                zIndex: 3,
                borderRadius: 5
                //borderColor: "rgba(0, 0, 0, 0.4)",
                //borderWidth: 0.1
              }}
            >
              {this.renderOrderInformation()}
              {/* <View
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  elevation: 1,
                  zIndex: 999999
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showBill: false });
                  }}
                >
                  <Ionicons
                    name={"ios-close-circle-outline"}
                    size={30}
                    color={BLACK}
                  />
                </TouchableOpacity>
              </View> */}
              {/* <ScrollView
                style={
                  {
                    //flex: 1
                  }
                }
              > */}
              <View style={{ flex: 1 }}>{this.renderRightSide()}</View>

              {/* </ScrollView> */}
            </View>
          </Modal>

          {/* Right Side End */}
          <View
            style={
              {
                //width: "100%",
                // backgroundColor: "rgba(248, 248, 248, 0.92)",
                //height: 50,
                //backgroundColor: "#BCA",
                //alignSelf: "flex-end",
                //flexDirection: "row",
                //justifyContent: "space-between"
              }
            }
          >
            {this.renderCartButton()}
          </View>
        </View>

        {/* {this.renderTabBar()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: "column"
  }
});
