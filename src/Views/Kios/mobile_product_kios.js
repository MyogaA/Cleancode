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
  RED_600,
  GREEN_500
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
  BE_Payment_Method,
  BE_Kios_Product,
  BE_Kios_Category,
  BE_Kios_Sub_Category
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
  _lanjut_short,
  _produk_kios
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

export default class MobileProductKios extends Component {
  constructor(props) {
    super(props);
    this.arrLoc = [];
    this.state = {
      salesTypeProduct: null,
      salesTypeProductSelected: null,
      papa_recepi_id: 0,
      showFilter: false,
      currencyAllowDecimal: false,
      showCustomConfirmation: false,
      page: 1,
      maxPage: 1,
      
      withTax: true,
      withServices: true,
      barcodeSearch: false,
      showBill: false,
      tablet: DeviceInfo.isTablet(),
      transactionId: "",
      showClearCartBackHandler: false,
      showClearCart: false,
      
      showAlert: false,
      alertMessage: [],
      showFav: true,
      

      show_order_id: false,
      footer_printer: "",
      customer_id: this.props.customer_id ? this.props.customer_id : 0,
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


      setting_light_mode: true,


      dataMenuFav: [],
      dataCategory: [],
      dataSubCategory: [],

      selectedCategory: 0,
      selectedSubCategory: 0,
      selectedCategoryName: "",
      selectedSubCategoryName: "",
      formItem: false,
      formSubCategory: false,
      customerNumber: "",
      selectedProduct: null,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

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

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
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
    this.setPreviliges();

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.getOutletData();
        this.getDataCategory();


        setTimeout(() => {}, 100);
        // this.getData();
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

          OfflineMenuFunctions.SaveTaxRate(tax, val => {});
          OfflineMenuFunctions.SavePhoneNumber(phone, val => {});
          OfflineMenuFunctions.SaveServiceRate(services, val => {});

          const address = responseJson.data.address;

          let userInfo_temp = this.state.userInfo;

          userInfo_temp.restaurant_address = address;

          LoginFunctions.UpdateLoginInformation(userInfo_temp, val => {});
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
        // alert(_server_down[this.state.languageIndex]);
      });
  }



  onBackPress = () => {
    //Actions.pop();
    //this.props.onBackPress();
    Actions.pop();
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
    category = this.state.selectedCategory,
    subCategory = this.state.selectedSubCategory,
    page = this.state.page,
    per_page = 18
  ) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    const { barcodeSearch } = this.state;
    this.setState({ loading: true });

    const gerai_id = this.state.userInfo.gerai_id;

    const subCategoryId = subCategory > 0 ? `&sub_category_id=${subCategory}` :"";
    const categoryId = category > 0 ? `&category_id=${category}`: "";

    // const searchQuery = search !== "" ? `name=${search}`: "";
    const searchQuery = "";




    // const is_favorite = activeCategory === 0 ? "&is_favorite=1" : "";
    //let uri = `${GetMenuFavAPI}?gerai_id=${gerai_id}&search=&page=1`;

    let uri = `${BE_Kios_Product}?${searchQuery}&per_page=${per_page}&page=${page}${subCategoryId}${categoryId}`;

    // let uri = `${BE_Get_Product}/lite?outlet_id=${gerai_id}${is_favorite}&name=${search}&status=active&per_page=${per_page}&page=${page}`;

    console.log ("uri GET DATA KIOS ", uri)

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
            
            console.log("resultData.data KIOSSSS ===> ", resultData.data);

            if (responseJson.statusCode === 200) {
              let tempData = this.state.dataMenuFav;
              let dataCombi = [...tempData, ...resultData.data];

              if (barcodeSearch) {
                //////////
                const data =
                  resultData.data.length > 0 ? resultData.data[0] : null;

                //console.log("search barcode data ", data);

                if (data) {
                }

                this.setState({
                  dataMenuFav: page === 1 ? resultData.data : dataCombi,
                  loading: false,
                  barcodeSearch: false,
                  page: page,
                  maxPage: responseJson.pagination.total_page
                });
              } else {

                this.setState({
                  dataMenuFav: page === 1 ? resultData.data : dataCombi,
                  loading: false,
                  barcodeSearch: false,
                  page: page,
                  maxPage: responseJson.pagination.total_page
                });
              }
            } else {
              //kalo ga ada data
              this.setState({
                dataMenuFav: resultData.data,
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
            //
          });
      } else { //OFFLINE
      }
    });

  }

  getDataOffline() {
    
  }

  getDataCategory(search = this.state.searchKey) {
    const gerai_id = this.state.userInfo.gerai_id;
    const retail_id = this.state.userInfo.retail_id;

    // let uri = `${GetCategoryMenuAPI}?gerai_id=${gerai_id}&search=&page=1`;

    let uri = `${BE_Kios_Category}?page=1&per_page=100`;
    console.log("URI BE_Kios_Category ====>", uri);

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
                data_category.push(v);
              });

              console.log("DATA CATEGORI ====>", data_category);


              this.setState({
                dataCategory: data_category,
                categoryTotal: data_category.length
              });
            } else {
              this.setState({
                dataCategory: [],
                categoryTotal: 0
              });
            }
          })
          .catch(_err => {

          });
      } else {

      }
    });
  }

  getDataSubCategory(category_id) {
    const gerai_id = this.state.userInfo.gerai_id;
    const retail_id = this.state.userInfo.retail_id;

    // let uri = `${GetCategoryMenuAPI}?gerai_id=${gerai_id}&search=&page=1`;

    let uri = `${BE_Kios_Sub_Category}?category_id=${category_id}&page=1&per_page=100`;
    console.log("URI BE_Kios_Category ====>", uri);

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
              let data_sub_category = [];
              data_temp.map((v, i) => {
                data_sub_category.push(v);
              });

              console.log("DATA SUB CATEGORI ====>", data_sub_category);


              this.setState({
                dataSubCategory: data_sub_category,
              
              });
            } else {
              this.setState({
                dataSubCategory: [],
              });
            }
          })
          .catch(_err => {

          });
      } else {

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



  checkOutAction(action = "") {
    let order_id = this.state.order_id;
    let selectedProduct = this.state.selectedProduct;
    this.setState({ loading: true });

    Actions.MobileBayarKios({
      auth: this.state.auth,
      dataOrder: [],
      dataBill: [],
      userInfo: this.state.userInfo,
      colorIndex: this.state.colorIndex,
      selectedTable: this.state.selectedTable,
      languageIndex: this.state.languageIndex,
      items: [],
      // tax: this.state.tax,
      // services: this.state.services,
      // withTax: this.state.withTax,
      // withServices: this.state.withServices,
      direct_payment: true,
      ppob: true,

      selectedProduct: selectedProduct,
      customerNumber: this.state.customerNumber

      //customer_id: this.state.customer_id, checkout new
    });
    
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


  logoutAction() {
    //this.setState({ userInfo: null });
    LoginFunctions.Logout(val => {});
    Actions.pop();
    Actions.pop();
    Actions.pop();

    Actions.MobileLoginOld({
      userInfo: null,
      colorIndex: this.state.colorIndex,
      languageIndex: this.state.languageIndex
    });
  }

  renderFav(data, i) {
    let price = this.state.currencyAllowDecimal
      ? data.price
      : parseInt(data.price);
    return (
      <Button
        onPress={() => {
          // this.showModalListProduct();
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


  showModalListProduct(sub_category_id, sub_category_name) {
    this.setState({ loading: true });


    this.setState({
      formItem: true,
      selectedSubCategory: sub_category_id,
      selectedSubCategoryName: sub_category_name,
      loading: false
    });

    this.getData(this.state.selectedCategory, sub_category_id);

  }


  showModalListSubCategory(category_id, category_name) {
    this.setState({ loading: true });

    this.setState({
      formSubCategory: true,
      selectedCategory: category_id,
      selectedCategoryName: category_name,
      loading: false
    });
    this.getDataSubCategory(category_id);
  }

  renderFormItem() {
    const { formItem } = this.state;
    
    if (formItem) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.formItem}
          onRequestClose={() => {
            this.setState({ formItem: false, dataMenuFav: [], page: 1, selectedProduct: null });
          }}
        >

          {this.state.loading ? <Loading /> : <View />}
          <View
            style={{
              flex: 1,
              // borderTopRightRadius: 20,
              // borderTopLeftRadius: 20,
              // marginTop: -20,
              backgroundColor: WHITE
            }}
          >
            <MobileHeader
              bgColor={"transparent"}
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              title={this.state.selectedSubCategoryName}
              notif={false}
              loginInformation={this.state.userInfo}
              menu={false}
              back={true}
              backAction={() => {
                this.setState({ formItem: false, dataMenuFav: [], page: 1, selectedProduct: null });
              }}
              hideOnline={false}
              hideLogin={true}
            />
              <View style={{ flex: 1, backgroundColor: WHITE }}>
                <View
                  style={{
                    margin: 15,
                    marginTop: 0,
                    justifyContent: "space-around"
                  }}
                >
                    {/* <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 32, color: BLACK, textAlign: "center" }
                      ]}
                    >
                      Nomor Pelanggan
                  </Text> */}
                  <View
                    style={{
                      borderRadius: 15,
                      //padding: 5,
                      backgroundColor: "rgba(246, 246, 246, 0.95)",
                      paddingLeft: 15,
                      paddingRight: 15,
                      marginTop: 5,
                      marginBottom: 5,

                    }}
                  >
                    <TextInput
                      style={{
                        color: BLACK,
                        fontSize: 12,
                        fontFamily: "DMSans-Bold",
                      }}
                      type="text"
                      refx={q => {
                        this._search = q;
                      }}
                      onSubmitEditing={() => {
                        //this.getData(this.state.notes);                      
                      }}
                      onChangeText={v => this.setState({ customerNumber: v })}
                      value={this.state.customerNumber}
                      showSoftInputOnFocus={true}
                      placeholder={"Nomor Pelanggan"}
                    />
                  </View>

                  <View style={{ borderBottomWidth: 1, borderColor: "#C8C7CC" }} />
                  {this.state.tablet ? (
                    <FlatList
                      //ListHeaderComponent={}
                      columnWrapperStyle={{
                        justifyContent: "space-between",
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
                                marginTop: 0
                              }}
                            >
                              {this.renderProduct(item, index)}
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
                    />
                  ) : (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={this.state.dataMenuFav}
                      renderItem={({ item, index }) => {
                        if (this.state.ready === true) {
                          return (
                            <View
                              style={{
                                width: "100%",

                                //flex: 0.325,
                                //marginLeft: 15,
                                marginTop: 0

                                //marginBottom: 3,
                                //marginRight: 15
                              }}
                            >
                              {this.renderProduct(item, index)}
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
                    />
                  )}
                <View
                  style={{
                    // justifyContent: "flex-end",
                    marginLeft: 15,
                    marginRight: 15,

                    width: this.state.tablet ? "75%" : "100%",
                    alignSelf: "center"
                    //backgroundColor: "#555",
                    //flex: 1
                  }}
                >

                  <Button
                    style={{
                      padding: 10,
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      borderRadius: 15,
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => {
                      // this.addOrder();
                      // setTimeout(() => {
                      //   const action =
                      //   !this.state.order_id &&
                      //   this.state.selectedSalesType.toString() ===
                      //     this.state.sales_type_dine_in_id.toString()
                      //     ? ""
                      //     : "pay";
                      //   this.setState({ loading: true });
                      //   this.checkOutAction(action);
                      // }, 333);
                      this.checkOutAction();

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
          </View>
        </Modal>
      );
    } else {
      return <View />;
    }
  }

  renderProduct(data, i) {
    let points = 0;

    points = 0;

    if (data.Loyalty_Promo) {
      points = data.Loyalty_Promo.point;
    }

    let price = this.state.currencyAllowDecimal
      ? data.price
      : parseInt(data.price);

    let calorie = 0;

    let selected_id = this.state.selectedProduct ? this.state.selectedProduct.id : 0;


    let long_name = data.name.toUpperCase();

    let short_name = "";

    let words = long_name.split(" ");

    words.map((items, itemIndex) => {
      short_name = short_name + items[0];
    });

    return (
      <Button
        onPress={() => {

          // this.showModalListProduct(data.id);
          if (this.state.selectedProduct === data)
          {
            this.setState({selectedProduct: null});
          }
          else
          {
            this.setState({selectedProduct: data});
          }
        }}
        style={{
          flex: 1,
          //width: "100%",
          backgroundColor: selected_id === data.id ? GREEN_500 : "transparent",
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

  renderCategory(data, i) {

    let long_name = data.name.toUpperCase();
    let short_name = "";
    let words = long_name.split(" ");
    words.map((items, itemIndex) => {
      short_name = short_name + items[0];
    });

    return (
      <Button
        onPress={() => {
          this.setState({selectedCategory: data.id});
          this.showModalListSubCategory(data.id, data.name);
        }}
        style={{
          flex: 1,
          // borderColor:"#000",
          // borderWidth: 1,
          padding: 5,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center"
          
        }}
      >
        <View style={{ margin: 0, marginTop: 5 }}>
          {/* <View style={{ alignItems: "center" }}> */}
          <View style={{ flexDirection: "column" }}>
            <View style={{ borderRadius: 15, height: this.state.tablet ? 125 :75 }}>
              {data.image ? (
                <View>
                  <Image
                    resizeMethod="resize"
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 15,
                      overflow: "hidden",
                      display: this.state.setting_light_mode ? "none" : "flex"
                    }}
                    resizeMode={"stretch"}
                    source={{ uri: BE_URI + data.image }}
                  />
                  <View
                    style={{
                      display: this.state.setting_light_mode ? "flex" : "none",
                      width: 75,
                      height: 75,
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
                      width: 75,
                      height: 75,
                      overflow: "hidden",
                      display: this.state.setting_light_mode ? "none" : "flex",
                      borderRadius: 10
                    }}
                    source={require("../../Images/empty-image.png")}
                  />
                  <View
                    style={{
                      display: this.state.setting_light_mode ? "flex" : "none",
                      width: this.state.tablet ? 125 : 75,
                      height: this.state.tablet ? 125: 75,
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
                        { fontSize: this.state.tablet ? 14 : 12, color: BLACK, textAlign: "center" }
                      ]}
                    >
                      {/* {short_name} */}
                      {data.name}

                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                // marginLeft: this.state.setting_light_mode ? 15 : 15,
                flex: 1,
                display: "none"
                // display: this.state.tablet ? "none" : "flex"
              }}
            >
              {/* <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 12, color: BLACK }
                ]}
              >
                {data.name}
              </Text> */}
              

              <View
                style={{
                  flex: 1,
                  
                  // justifyContent: "flex-end"
                }}
              >


                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK, textAlign:"center" }
                  ]}
                >
                  {data.name}
                </Text>
              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
      </Button>
    );
  }

  renderCategoryList() {
    const {

    } = this.state;

    if (this.state.formItem === false && this.state.formSubCategory === false ) {
      return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
          <View
            style={{
              marginTop: 0,
              // justifyContent: "space-around"
            }}
          >
            <View style={{ }} />
            {this.state.tablet ? 
              (
              <FlatList
                //ListHeaderComponent={}
                columnWrapperStyle={{
                  // justifyContent: "space-between",
                  //marginBottom: 5,
                  //justifyContent:"center",
                  flex: 1,
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                showsVerticalScrollIndicator={false}
                data={this.state.dataCategory}
                numColumns={6}
                renderItem={({ item, index }) => {
                  if (this.state.ready === true) {
                    return (
                      <View
                        style={{
                          width: "16%",
                          marginTop: 0,

                        }}
                      >
                        {this.renderCategory(item, index)}
                      </View>
                    );
                  } else {
                    return <View />;
                  }
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "RenderCategory" + index.toString();
                }}
              />
              ):
              (
                <FlatList
                //ListHeaderComponent={}
                columnWrapperStyle={{
                  // justifyContent: "space-between",
                  //marginBottom: 5,
                  //justifyContent:"center",
                  flex: 1,
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                showsVerticalScrollIndicator={false}
                data={this.state.dataCategory}
                numColumns={4}
                renderItem={({ item, index }) => {
                  if (this.state.ready === true) {
                    return (
                      <View
                        style={{
                          width: "25%",
                          marginTop: 0,

                        }}
                      >
                        {this.renderCategory(item, index)}
                      </View>
                    );
                  } else {
                    return <View />;
                  }
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "RenderCategory" + index.toString();
                }}
              />
              )}
            </View>
        </View>
      );
    } else {
      return <View />;
    }
  }



  renderSubCategory(data, i) {

    let long_name = data.name.toUpperCase();
    let short_name = "";
    let words = long_name.split(" ");
    words.map((items, itemIndex) => {
      short_name = short_name + items[0];
    });

    return (
      <Button
        onPress={() => {
          this.setState({selectedSubCategory: data.id});
          this.showModalListProduct(data.id, data.name);
        }}
        style={{
          flex: 1,
          // borderColor:"#000",
          // borderWidth: 1,
          padding: 5,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center"
          
        }}
      >
        <View style={{ margin: 0, marginTop: 5 }}>
          {/* <View style={{ alignItems: "center" }}> */}
          <View style={{ flexDirection: "column" }}>
            <View style={{ borderRadius: 15, height: this.state.tablet ? 125 : 75 }}>
              {data.image ? (
                <View>
                  <Image
                    resizeMethod="resize"
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 15,
                      overflow: "hidden",
                      display: this.state.setting_light_mode ? "none" : "flex"
                    }}
                    resizeMode={"stretch"}
                    source={{ uri: BE_URI + data.image }}
                  />
                  <View
                    style={{
                      display: this.state.setting_light_mode ? "flex" : "none",
                      width: 75,
                      height: 75,
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
                      width: 75,
                      height: 75,
                      overflow: "hidden",
                      display: this.state.setting_light_mode ? "none" : "flex",
                      borderRadius: 10
                    }}
                    source={require("../../Images/empty-image.png")}
                  />
                  <View
                    style={{
                      display: this.state.setting_light_mode ? "flex" : "none",
                      width: this.state.tablet ? 125 : 75,
                      height: this.state.tablet ? 125: 75,
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
                        { fontSize: this.state.tablet ? 14 : 12, color: BLACK, textAlign: "center" }
                      ]}
                    >
                      {/* {short_name} */}
                      {data.name}

                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                // marginLeft: this.state.setting_light_mode ? 15 : 15,
                flex: 1
              }}
            >
              {/* <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 12, color: BLACK }
                ]}
              >
                {data.name}
              </Text> */}
              

              <View
                style={{
                  flex: 1,
                  display: "none"
                  // justifyContent: "flex-end"
                }}
              >


                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK, textAlign:"center",  }
                  ]}
                >
                  {data.name}
                </Text>
              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
      </Button>
    );
  }

  renderSubCategoryList() {
    const {
      activeCategoryIndex,
      activeCategory,
      categoryTotal,
      dataCategory
    } = this.state;

    if (this.state.formSubCategory === true ) {
      return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.formSubCategory}
        onRequestClose={() => {
          this.setState({ formSubCategory: false, dataSubCategory: [] });
        }}
      >

        <View style={{ flex: 1, backgroundColor: WHITE }}>
          <MobileHeader
              bgColor={"transparent"}
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              title={this.state.selectedCategoryName}
              notif={false}
              loginInformation={this.state.userInfo}
              menu={false}
              back={true}
              backAction={() => {
                this.setState({ formSubCategory: false, dataSubCategory: []});
              }}
              hideOnline={false}
              hideLogin={true}
          />
          <View
            style={{
              // marginTop: 0,
              margin:15
              // justifyContent: "space-around"
            }}
          >
            <View style={{ }} />
              {this.state.tablet ? 
                (
                <FlatList
                //ListHeaderComponent={}
                columnWrapperStyle={{
                  // justifyContent: "space-between",
                  //marginBottom: 5,
                  //justifyContent:"center",
                  flex: 1,
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                showsVerticalScrollIndicator={false}
                data={this.state.dataSubCategory}
                numColumns={6}
                renderItem={({ item, index }) => {
                  if (this.state.ready === true) {
                    return (
                      <View
                        style={{
                          width: "16%",
                          marginTop: 0,

                        }}
                      >
                        {this.renderSubCategory(item, index)}
                      </View>
                    );
                  } else {
                    return <View />;
                  }
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "RenderSubCategory" + index.toString();
                }}
              />
                ): 
                (<FlatList
                //ListHeaderComponent={}
                columnWrapperStyle={{
                  // justifyContent: "space-between",
                  //marginBottom: 5,
                  //justifyContent:"center",
                  flex: 1,
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                showsVerticalScrollIndicator={false}
                data={this.state.dataSubCategory}
                numColumns={4}
                renderItem={({ item, index }) => {
                  if (this.state.ready === true) {
                    return (
                      <View
                        style={{
                          width: "25%",
                          marginTop: 0,

                        }}
                      >
                        {this.renderSubCategory(item, index)}
                      </View>
                    );
                  } else {
                    return <View />;
                  }
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "RenderSubCategory" + index.toString();
                }}
              />)
            }
              
            </View>
        </View>
      </Modal>
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

  



  truncateOnWord(str, limit) {
    var trimmable =
      "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF";
    var reg = new RegExp("(?=[" + trimmable + "])");
    var words = str.split(reg);
    var count = 0;
    return words
      .filter(function(word) {
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













  render() {
    const {
      showNameForm,
      newName,
      lastUpdate,
      timeCompare
    } = this.state;
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
        <MobileHeader
          colorIndex={this.state.colorIndex}
          logoutAction={() => this.logoutAction()}
          title={_produk_kios[this.state.languageIndex]}
          //title={this.state.selectedSalesType}
          //title={this.state.action}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          backAction={() => {
            Actions.pop();
          }}
          hideLogin={true}
          cart={false}
          cartAction={() => {
          }}

          table={this.state.selectedTable}
          action={this.state.action}

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
        , height: 100,
        width: 100, position: 'absolute', zIndex: 100, left: 100, top: 100}}
        onPress={()=>{alert(';;')}}></Button> */}

        <View
          style={{
            //flexDirection: "column",
            margin: 15,
            paddingBottom: 0,
            flex: 1,
            // justifyContent: "space-around"
          }}
        >
            <View
            style={{
              flex: 1,
              //display: this.state.showBill ? "none" : "flex",
              width: "100%",
              marginTop: 0,
              backgroundColor: "transparent",

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
            </View>


            {this.renderCategoryList()}
            {this.renderSubCategoryList()}
            {/* {jumlahData === 0 ? this.renderNoData() : <View />} */}
            {this.renderFormItem()}
          </View>
  

          {/* Left Side End */}
        </View>


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
