/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState } from "react";
import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button as ButtonDefault,
  FlatList,
  ImageDefault,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  Dimensions,
  BackHandler,
  Linking
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import MainStyle from "../../Styles";

import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import MobileHeader from "../../Components/MobileHeader";
import Checkbox from "../../Components/Checkbox";

import Image from "../../Components/Image";
import Button from "../../Components/Button";
import PaymentQR from "../../Components/PaymentQR";
import PaymentSuccess from "../../Components/MobilePaymentSuccess";
import Loading from "../../Components/MobileLoading";
import LoadingReader from "../../Components/LoadingReader";

import MobileConfirmPayment from "../../Components/MobileConfirmPayment";

import MobileShowQR from "../../Components/MobileShowQR";

import MobileShowCZ from "../../Components/MobileShowCZ";

import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/Dropdown";
import SendReceipt from "../../Components/MobileSendReceipt";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Geolocation from "@react-native-community/geolocation";
// import Orientation from "react-native-orientation-locker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";

import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  WHITE,
  BLACK,
  RED_500,
  GREY_100,
  GREY_900,
  GREY_700,
  MAIN_TEXT_COLOR_SELECT,
  GREEN_400,
  WHITE_ROBO
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";

// import { DualMonitorPayment } from "../../Libraries/DualScreenFunctions";

import CZFunctions from "../../Libraries/CZFunctions";

import moment from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";
import {
  PayOrderAPI,
  BE_Devices,
  BE_Create_Transaction,
  BE_Payment,
  BE_Payment_Method,
  BE_URI,
  BE_Customer,
  BE_Currency,
  BE_Automatic_Promo,
  BE_Voucher_Promo,
  BE_Special_Promo,
  BE_Attendance,
  BE_Loyalty_Promo_Settings,
  BE_Send_Struk,
  OneSignal_Customer_App_ID,
  one_signal_uri,
  BE_Signature,
  BE_Commission,
  BE_Transaction_Commission,
  BE_Customer_Point_History,
  BE_Customer_Voucher_History,
  BE_Customer_Voucher_Personal,
  BE_Special_Promo_History,
  BE_Voucher_Promo_History,
  BE_Customer_Account,
  BE_Outlet_Setting,
  BE_Customer_Saldo_History,
  BE_Customer_Membership,
  BE_Kitchen,
  BE_Coupon
} from "../../Constants";
import MenuFunctions from "../../Libraries/MenuFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import {
  _pembayaran,
  _discount_promo,
  _voucher,
  _cash,
  _card,
  _ewallet,
  _cash_amount,
  _alert_kurang,
  _exclude_tax,
  _include_tax,
  _kembali,
  _batal,
  _points_used,
  _use_points,
  _promo,
  _sukses,
  _sukses_kirim,
  _split_bill,
  _split_bill_1,
  _split_bill_2,
  _gagal,
  _conversion_point,
  _per_point,
  _paid_by,
  _sudah_bayar,
  _change_amount,
  _terima_kasih,
  _choose_payment,
  _commission,
  _choose_staff,
  _lanjut,
  _cashlez_invalid,
  _cashlez_not_connected,
  _cashlez_not_common,
  _discount,
  _grand_total,
  _tax,
  _change_amount_short,
  _delivery_cost,
  _delivery,
  _use_saldo,
  _membership_discount,
  _coupon,
  _coupon_not_found
} from "../../Libraries/DictionaryPayment";

import {
  _simpan,
  _simpan_pesanan,
  _harga_custom,
  _pelanggan,
  _meja,
  _cetak_bill,
  _pilih_pelanggan,
  _berhasil_tambah,
  _check_out,
  _no_table,
  _transaction_id,
  _cashier,
  _print_label,
  _sales_type,
  _transaction_type,
  _pilih_coupon
} from "../../Libraries/DictionaryHome";

import NetInfo from "@react-native-community/netinfo";
import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";
import {
  _phone,
  _phone_long,
  _search
} from "../../Libraries/DictionaryManagement";

import DeviceInfo from "react-native-device-info";
import RegionFunctions from "../../Libraries/RegionFunctions";

// import ExternalDisplay, {
//   getScreens,
//   useExternalDisplay
// } from "react-native-external-display";
import CashlezFunctions from "../../Libraries/CashlezFunctions";
import {
  _service,
  _sub_total,
  _total
} from "../../Libraries/DictionaryHistory";
import { _notes } from "../../Libraries/DictionaryDrawer";
import { Decimalize } from "../../Libraries/NumberFunctions";
import ScalingFunctions from "../../Libraries/ScalingFunctions";
import { _currency } from "../../Libraries/DictionarySetting";
import { _saldo } from "../../Libraries/DictionaryRekap";
import { _queue_number } from "../../Libraries/DictionaryMeja";

export function CurrencyFormat(num, iscurr, currency, currencyAllowDecimal) {
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

  if (!currencyAllowDecimal) {
    comma_add = "";
  }

  let curr = "";
  if (typeof iscurr !== "undefined" && iscurr === true) {
    curr = currency + " ";
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

export default class MobileBayar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue_number: 0,
      last_update_payment_method: null,
      last_update_special_promo: null,
      last_update_automatic_promo: null,
      last_update_voucher_promo: null,
      payment_method_done: false,
      direct_payment: this.props.direct_payment,
      customer_level_discount: 0,
      total_membership_discount: 0,
      print_voucher_customer: 0,
      print_voucher: 0,
      print_discount: 0,
      print_automatic: 0,
      printer2: false,
      printer3: false,
      manual_print: false,
      manual_print_cashlez: false,
      setting_print_logo: false,
      setting_print_qr: false,
      cz_qr: true,
      cz_invalid: true,
      cashlez_payment_id: null,
      printType: 1,
      mount: true,
      logo_image_uri: "",
      logo_image_base64: "",
      disable_reprint: false,
      tablet: DeviceInfo.isTablet(),
      showPromo: false,
      loadingCustomer: false,
      showPaymentSuccess: false,
      loading: true,
      loadingReader: false,
      showQR: false,
      showCZ: false,
      paymentConfirm: false,
      currency: "IDR",
      currency_id: 1,
      list_currency: null,
      list_currency_conversion: null,
      list_currency_for_selection: null,
      selected_currency_conversion: null,
      currency_conversion_ratio: 1,
      currency_conversion_name: "",
      currency_conversion_fullname: "",

      currency_conversion_id: null,

      discountType: "",
      showCustom: false,
      showCustomer: false,
      customPriceOld: 0,
      customPriceTaxOld: false,
      customPrice: 0,
      customPriceFinal: 0,
      customPriceTax: false,
      showBill: true,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      order_id: this.props.orderId ? this.props.orderId : null,
      data_order: this.props.dataOrder ? this.props.dataOrder : null,
      disable_promo: this.props.disable_promo
        ? this.props.disable_promo
        : false, //disable promo bentaran
      payment_done: false,
      payment_type: "cash",
      showQRPayment: false,
      formEmail: "",
      formCustomer: "",
      //formPhone: "+6287886038357",
      formPhone: "",
      searchKey: "",
      cashAmount: 0,
      bill_alamat: "Rukan Cordoba Blok D-28 \n Jl. Greenlake City Boulevard",
      bill_table_id: "5",
      bill_transId: this.props.dataOrder.notes
        ? this.props.dataOrder.notes
        : this.props.dataOrder.transaction_id,
      bill_cashier: "Dewi",
      bill_time: moment(new Date()).format("HH:mm"),
      selectedTable: this.props.selectedTable,
      customer_id: this.props.customer_id ? this.props.customer_id : 0,
      selectedCustomer: null,
      selectedCustomerData: null,
      selectedCustomerName: null,
      points_available: 0,
      points_used: 0,
      points_gain: 0,

      // billInfo: {
      //   alamat: "Rukan Cordoba Blok D-28 \n Jl. Greenlake City Boulevard",
      //   table: "5",
      //   transId: 67892365,
      //   cashier: "Dewi",
      //   time: moment(new Date()).format("HH:mm")
      // },
      dataBill: [
        {
          id: 1,
          name: "Banana Smoothies",
          qty: 2,
          price: 50000,
          total: 70000,
          detail: [
            {
              id: 1,
              name: "Less Ice"
            },
            {
              id: 2,
              name: "Less Sugar"
            }
          ]
        },
        {
          id: 2,
          name: "Mango Tea",
          qty: 1,
          price: 28000,
          total: 28000,
          detail: [
            {
              id: 1,
              name: "Grass Jelly"
            },
            {
              id: 2,
              name: "Less Ice"
            },
            {
              id: 3,
              name: "Less Sugar"
            }
          ]
        }
      ],
      grandTotal: 0,
      grandTotalBeforeCoupon: 0,
      grandTotalRound: 0,
      grandTotalDefault: 0,
      change: 0,
      discount: [
        { id: 1, value: 0.1, text: "10% off", active: true },
        { id: 2, value: 0.2, text: "20% off", active: true },
        { id: 3, value: 0.5, text: "50% off", active: true },
        { id: 4, value: 0.75, text: "75% off", active: true }
        // { id: 5, value: 0.44, text: "44% off", active: true },
        // { id: 6, value: 0.33, text: "33% off", active: true }
      ],
      listCustomer: [],
      selectedDiscountId: 0,
      selectedDiscount: 0,
      selectedDiscountName: "",

      rate_discount: 0,
      amount_discount: 0,
      amount_discount_limit: null,

      rate_tax: this.props.tax ? this.props.tax : 0,
      rate_services: this.props.services ? this.props.services : 0,
      // rate_tax: 0,
      // rate_services: 0,
      bill_subTotal: 0,
      bill_discount: 0,
      bill_tax: 0,
      bill_services: 0,
      printer_main: null,
      printer_kitchen: null,
      show_order_id: true,
      footer_printer: "",
      url_printer: "",
      data_post_1: {},
      data_post_2: {},
      auth: this.props.auth,
      //payment_method_wallet: [],

      payment_method_wallet: [
        // { id: 1, name: "Shoppe", qr_image_url: "" },
        // { id: 2, name: "Ovo", qr_image_url: "" },
        // { id: 3, name: "Nomor 3", qr_image_url: "" },
        // { id: 4, name: "Nomor 4", qr_image_url: "" },
      ],
      payment_method_cash: {},
      payment_method_card: [],
      payment_method_id: 0,
      qr_image_url: "",
      print2: false,
      dine_in_print: false,

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
      access_commission_management: false,
      selectedStaffRating: 3,
      selectedFoodRating: 3,

      viewSelectRating: false,
      promoSpecial: [],
      promoAutomatic: [],
      promoVoucher: [],
      customer_voucher: [],

      selectedVoucherId: 0,
      selectedVoucher: 0,
      selectedVoucherName: "",
      voucherAmount: 0,
      voucherLimit: null,
      voucherType: "currency",

      selectedCustomerVoucher: 0,
      selectedCustomerVoucherName: "",
      customerVoucherAmount: 0,
      customerVoucherType: "currency",

      automaticPromoAmount: 0,
      automaticPromoRate: 0,
      automaticPromoLimit: 0,
      automaticPromoActivated: [],
      loyaltyPromoSettings: null,
      usePoints: false,
      useSaldo: false,
      selectedPhone: { name: "Indonesia", dial_code: "+62", code: "ID" },
      currencyAllowDecimal: false,

      //CASHLEZ
      // cz_vendor_identifier: "CZ00TEST001",
      // cz_entity_id: "23271",
      // cz_user: "test01",
      cz_vendor_identifier: null,
      cz_entity_id: null,
      cz_user: null,
      cz_allow: null,
      cz_type: null,
      cz_uri: null,
      cz_response_uri: null,
      cz_approve: false,
      cz_continue: 0,
      cz_pin: null,

      qr_base64: null,

      cz_pin_outlet: null,
      cz_user_outlet: null,
      cz_entity_id_outlet: null,
      cz_vendor_identifier_outlet: null,

      //cz_phone_number: "087886038357",
      cz_phone_number: "",
      cz_show_form_phone: false,

      dataCommission: [],
      dataStaffCommission: [],
      commissionSelectedStaff: [],
      showCommissionSelection: false,

      sub_type: 1,

      using_delivery: false,
      payment_delivery: 0,

      showDiscountPromo: false,
      showVoucher: false,
      showCard: true,
      showWallet: true,

      selectedWalletName: "",
      selectedCardName: "",
      couponSearchKey: "",
      dataCoupon: {},
      listCouponUsage: [],
      couponAmount: 0,
      showCoupon: false
    };
  }

  resetPaymentName() {
    this.setState({ selectedWalletName: "", selectedCardName: "" });
  }

  sendMessageKitchen() {
    let outlet_id = this.state.userInfo.gerai_id;
    let uri = BE_Devices + "/send-message-outlet/" + outlet_id;
    let body = {
      title: "Order Masuk",
      message: "Ada Order Masuk mohon diproses ordernya.",
      type: "kitchen",
      purpose: "kitchen"
    };

    console.log("send Message Kitchen uri ===> ", uri);
    console.log("send Message Kitchen body ===> ", body);

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("Send Message Response ==> ", responseJson);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  updateCouponUsage() {
    let outlet_id = this.state.userInfo.gerai_id;
    let uri = BE_Devices + "/send-message-outlet/" + outlet_id;
    let body = {
      title: "Order Masuk",
      message: "Ada Order Masuk mohon diproses ordernya.",
      type: "kitchen",
      purpose: "kitchen"
    };

    console.log("send Message Kitchen uri ===> ", uri);
    console.log("send Message Kitchen body ===> ", body);

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("Send Message Response ==> ", responseJson);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  convertImageBase64QR(uri) {
    console.log("convertImageBase64 uri ", uri);
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
        //console.log("convertImageBase64QR ===> ", base64Data);
        //PrinterFunctions.SaveImageBase64(base64Data, result => {});
        this.setState({ qr_base64: base64Data });

        // remove the file from storage
        return fs.unlink(imagePath);
      });
  }

  async InitializeCashlez() {
    CashlezFunctions.InitializeCashlez(v => {
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
      // CashlezFunctions.LoginCashlez("test01", "111111", v => {
      console.log("Call Back LoginCashlez ===> ", v);
      this.InitializeCashlezPayment();
    });
  }

  async InitializeCashlezPayment() {
    CashlezFunctions.InitializeCashlezPayment(v => {
      console.log("Call Back InitializeCashlezPayment ===> ", v);
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
      console.log("Call Back PaymentCheckReader ===> ", v);

      if (v.message === "Reader connected.") {
        //normal
      } else {
        //alert("");
        if (v.message === "Invalid function") {
          alert(_cashlez_invalid[this.state.languageIndex]);
        }
      }
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

  processCurrency() {
    const { currency, currency_id } = this.state;
    RegionFunctions.GetListCurrency(val => {
      if (val) {
        this.setState({ list_currency: val });
      }
    });

    RegionFunctions.GetListCurrencyConversion(val => {
      if (val) {
        this.setState({ list_currency_conversion: val });
      }
    });

    setTimeout(() => {
      let temp_currency_conversion = [];
      if (this.state.list_currency_conversion) {
        this.state.list_currency_conversion.map((v, i) => {
          //console.log("GetListCurrencyConversion map ===> ", v);

          if (i === 0) {
            let temp_default_data = { id: 0, name: this.state.currency };
            temp_currency_conversion.push(temp_default_data);
          }

          if (
            parseInt(v.currency_a) === parseInt(currency_id) ||
            parseInt(v.currency_b) === parseInt(currency_id)
          ) {
            temp_currency_conversion.push(v);
          }
        });

        console.log(
          "list_currency_for_selection ===> ",
          temp_currency_conversion
        );
        this.setState({
          list_currency_for_selection: temp_currency_conversion
        });
      }
    }, 200);
  }

  changeConversionSelection(data) {
    const { currency_id } = this.state;
    setTimeout(() => {
      const selected_conversion = data;

      let conversion_rate = 1;

      const currency_a = parseInt(selected_conversion.currency_a);

      const currency_b = parseInt(selected_conversion.currency_b);

      let currency_match = "";
      let currency_conversion_name = "";
      let currency_conversion_fullname = "";

      let currency_conversion_id = 0;

      if (parseInt(currency_id) === currency_a) {
        currency_match = "a";
        conversion_rate = selected_conversion.conversion_a_to_b;
        currency_conversion_name = selected_conversion.data_currency_b.name;
        currency_conversion_fullname =
          selected_conversion.data_currency_b.full_name;

        currency_conversion_id = selected_conversion.currency_b;
      } else {
        currency_match = "b";
        conversion_rate = selected_conversion.conversion_b_to_a;
        currency_conversion_name = selected_conversion.data_currency_a.name;
        currency_conversion_fullname =
          selected_conversion.data_currency_a.full_name;

        currency_conversion_id = selected_conversion.currency_a;
      }

      this.setState({
        selected_currency_conversion: selected_conversion,
        currency_conversion_ratio: conversion_rate,
        currency_conversion_name: currency_conversion_name,
        currency_conversion_id: currency_conversion_id,
        currency_conversion_fullname: currency_conversion_fullname
      });
    }, 200);
  }

  getQueueNumber() {
    let outlet_id = this.state.userInfo.gerai_id;
    const uri = BE_Kitchen + "/queue?outlet_id=" + outlet_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("DATA QUEUE NUMBER ==> ", responseJson);
        if (responseJson.statusCode === 200) {
          const data = parseInt(responseJson.data) + parseInt(1);
          this.setState({ queue_number: data });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  componentDidMount() {
    PrinterFunctions.GetSubscriptionType(v => {
      if (v) {
        this.setState({ sub_type: v });
      }
    });

    OfflineMenuFunctions.GetLastUpdatePaymentMethod(v => {
      if (v) {
        this.setState({ last_update_payment_method: v });
      }
    });

    OfflineMenuFunctions.GetLastUpdatePromoSpecial(v => {
      if (v) {
        this.setState({ last_update_special_promo: v });
      }
    });

    OfflineMenuFunctions.GetLastUpdatePromoAutomatic(v => {
      if (v) {
        this.setState({ last_update_automatic_promo: v });
      }
    });

    OfflineMenuFunctions.GetLastUpdatePromoVoucher(v => {
      if (v) {
        this.setState({ last_update_voucher_promo: v });
      }
    });

    this.getQueueNumber();

    CashlezFunctions.GetCashlezData(v => {
      if (v) {
        if (v === "invalid") {
          this.setState({ cz_invalid: true });
        } else {
          // this.setState({ cz_invalid: false });
          this.setState({ cz_invalid: true });

        }
      }
    });

    this.disableIntervalOvoCZ();
    this.disableIntervalOvoCZ();
    this.disableIntervalOvoCZ();
    this.disableIntervalOvoCZ();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    //console.log("BAYAR MOBILE 2 ==> onBackPress");

    // OfflineMenuFunctions.GetTemporaryOrder(val => {
    //   console.log("Get TemporaryOrder ==> ", val);
    // })

    this.disableIntervalCZ();
    this.disableIntervalCZ();
    this.disableIntervalCZ();

    PrinterFunctions.GetBusinessData(val => {
      //console.log("GET GetBusinessData VAL ===> ", val);
      if (val) {
        this.setState({
          cz_pin: val.cz_pin,
          cz_user: val.cz_user,
          cz_entity_id: val.cz_entity_id,
          cz_vendor_identifier: val.cz_vendor_identifier
        });

        setTimeout(() => {}, 500);
      }
    });

    PrinterFunctions.GetOutletData(val => {
      if (val) {
        this.setState({
          cz_pin_outlet: val.cz_pin,
          cz_user_outlet: val.cz_user,
          cz_entity_id_outlet: val.cz_entity_id,
          cz_vendor_identifier_outlet: val.cz_vendor_identifier
        });

        setTimeout(() => {}, 500);
      }
    });

    RegionFunctions.GetCurrency(val => {
      if (val) {
        this.setState({ currency: val });
      }
    });

    RegionFunctions.GetCurrencyId(val => {
      if (val) {
        this.setState({ currency_id: val });
      }
    });

    RegionFunctions.GetAllowMultiCurrency(val => {
      if (val) {
        this.setState({ currencyAllowMultiCurrency: val });
      }
    });

    RegionFunctions.GetPhone(val => {
      //console.log("GET PHONE VAL ===> ", val);
      if (val) {
        this.setState({ selectedPhone: val });
      }
    });

    RegionFunctions.GetAllowDecimal(val => {
      if (val) {
        this.setState({ currencyAllowDecimal: val });
      }
    });

    // CZFunctions.GetCZResponse(val => {
    //   if (val) {
    //     this.setState({ cz_response_uri: val });
    //   }
    // });

    // CZFunctions.GetCZURI(val => {
    //   console.log("CZ URI GET ===> ", val);

    //   if (val) {
    //     console.log("CZ URI GET ===> ", val);
    //     this.setState({ cz_uri: val });
    //   }
    // });

    //console.log("BAYAR PROPS ==> ", this.props);

    //console.log("BAYAR PROPS data_order ==> ", this.props.dataOrder);

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    PrinterFunctions.GetImageBase64(val => {
      if (val) {
        this.setState({ logo_image_base64: val });
        //this.convertImageBase64(val);
      }
    });

    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    RegionFunctions.GetSettingKitchenManagement(val => {
      if (val) {
        this.setState({ allowKitchenManagement: val });
      }
    });

    // this.getPromoOffline();

    setTimeout(() => {
      this.processCurrency();

      //this.getPromoAutomatic();
      this.getPrinterData();
      // this.getPaymentMethod();
      this.getPaymentMethodLastUpdate();
      this.setPreviliges();
      this.getListCustomer();
      this.getLoyaltyPromoSettings();

      // this.setInformation();

      setTimeout(() => {
        if (this.state.sub_type === 3) {
          this.getCommission();
        }

        this.setInformation();

        if (this.state.disable_promo === false) {
          if (this.state.sub_type === 3) {
            // this.getPromoSpecial();

            //this.getLoyaltyPromoSettings();

            this.getPromoSpecialLastUpdate();
            this.getPromoVoucher();

            if (!this.state.direct_payment) {
              this.getPromoAutomatic();
            }
          }
        } else {
          // this.setState({ loading: false });
        }
        this.setState({ loading: false });
      }, 500);
    }, 200);

    // setTimeout(() => {
    //   this.getCouponData("TEST-1-CEBAN");
    // }, 1500);
  }

  getPaymentOffline() {
    OfflineMenuFunctions.GetPaymentMethod(x => {
      if (x) {
        let cash = {};
        let wallet = [];
        let card = [];

        let connected = false;

        // NetInfo.fetch().then(state => {
        //   if (state.isConnected) {
        //     connected = true;
        //   }
        // });

        if (!connected) {
          x.map((v, i) => {
            const v_payment_method = v.Payment_Method_Type;
            if (
              v_payment_method.id === 1 ||
              v_payment_method.name === "E-Wallet"
            ) {
              // if (v.status === "active") {
              //   wallet.push(v);
              // }

              if (v.status === "active") {
                if (v.cz_allow) {
                  if (this.state.cz_invalid) {
                    wallet.push(v);

                  } else {
                    wallet.push(v);
                  }
                } else {
                  wallet.push(v);
                }
              }
            }

            if (v_payment_method.id === 3 || v_payment_method.name === "Cash") {
              if (v.status === "active") {
                cash = v;
              }
            }

            if (
              v_payment_method.id === 2 ||
              v_payment_method.name === "Debit/Credit"
            ) {
              // if (v.status === "active") {
              //   card.push(v);

              //   // NetInfo.fetch().then(state => {
              //   //   if (state.isConnected) {

              //   //   }
              //   // });
              // }

              if (v.status === "active") {
                if (v.cz_allow) {
                  if (this.state.cz_invalid) {
                  } else {
                    card.push(v);
                  }
                } else {
                  card.push(v);
                }
              }
            }

            // console.log("cash ==> ", cash);
            // console.log("wallet ==> ", wallet);
            // console.log("card ==> ", card);
          });

          setTimeout(() => {
            this.setState({
              payment_method_cash: cash,
              payment_method_wallet: wallet,
              payment_method_card: card,
              payment_method_done: true,
              loading: false
            });
          }, 333);
        }
      } else {
      }
    });
  }

  getPromoOffline() {
    OfflineMenuFunctions.GetPaymentMethod(x => {
      if (x) {
        let cash = {};
        let wallet = [];
        let card = [];

        let connected = false;

        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            connected = true;
          }
        });

        if (!connected) {
          setTimeout(() => {
            x.map((v, i) => {
              const v_payment_method = v.Payment_Method_Type;
              if (
                v_payment_method.id === 1 ||
                v_payment_method.name === "E-Wallet"
              ) {
                // if (v.status === "active") {
                //   wallet.push(v);
                // }

                if (v.status === "active") {
                  if (v.cz_allow) {
                    if (this.state.cz_invalid) {
                    wallet.push(v);

                    } else {
                      wallet.push(v);
                    }
                  } else {
                    wallet.push(v);
                  }
                }
              }

              if (
                v_payment_method.id === 3 ||
                v_payment_method.name === "Cash"
              ) {
                if (v.status === "active") {
                  cash = v;
                }
              }

              if (
                v_payment_method.id === 2 ||
                v_payment_method.name === "Debit/Credit"
              ) {
                // if (v.status === "active") {
                //   card.push(v);

                //   // NetInfo.fetch().then(state => {
                //   //   if (state.isConnected) {

                //   //   }
                //   // });
                // }

                if (v.status === "active") {
                  if (v.cz_allow) {
                    if (this.state.cz_invalid) {
                    } else {
                      card.push(v);
                    }
                  } else {
                    card.push(v);
                  }
                }
              }

              // console.log("cash ==> ", cash);
              // console.log("wallet ==> ", wallet);
              // console.log("card ==> ", card);

              this.setState({
                payment_method_cash: cash,
                payment_method_wallet: wallet,
                payment_method_card: card,
                loading: false
              });
            });
          }, 333);
        }
      } else {
      }
    });

    if (this.state.disable_promo === false) {
      OfflineMenuFunctions.GetPromoAutomatic(x => {
        if (x) {
          this.setState({ promoAutomatic: x });
        }
      });
      OfflineMenuFunctions.GetPromoSpecial(x => {
        if (x) {
          this.setState({ promoSpecial: x });
        }
      });
      // OfflineMenuFunctions.GetPromoVoucher(x => {
      //   if (x) {
      //     this.setState({ promoVoucher: x });
      //   }
      // });
    }
  }

  activateIntervalCZ() {
    this.interval_cz = setInterval(() => {
      this.getStatusCZ();
    }, 5000);
  }

  activateIntervalOvoCZ() {
    this.interval_ovo_cz = setInterval(() => {
      this.getStatusOvoCZ();
    }, 5000);
  }

  disableIntervalOvoCZ() {
    clearInterval(this.interval_ovo_cz);
  }

  disableIntervalCZ() {
    clearInterval(this.interval_cz);
  }

  getStatusOvoCZ() {
    console.log("intervalOVO");

    // CashlezFunctions.CheckOvoPayment(v => {
    //   console.log("Call Back getStatusOvoCZ ===> ", v);
    //   //this.PaymentStartLocationListener();
    // });
  }

  getStatusCZ() {
    let uri = "https://api-link.cashlez.com/validate_url";
    let body = {
      status: "",
      message: "",
      data: {
        request: {
          generatedUrl: this.state.cz_uri
        }
      }
    };

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson_GetStatus => ", responseJson);
        let status = responseJson.status;
        if (status === "03") {
          this.disableIntervalCZ();
        } else {
          let cz_status = responseJson.data.response.processStatus;
          let paymentType = responseJson.data.response.paymentType;

          this.setState({
            cz_approve: cz_status,
            cz_continue: paymentType ? 1 : 0
          });

          if (cz_status === "APPROVED") {
            setTimeout(() => {
              this.disableIntervalCZ();
              this.checkOutAction();
            }, 2500);
          }
        }

        //REJECTED //EXPIRED //APPROVED
      });
  }

  async PaymentProceedPayment(transaction_id, amount, description) {
    CashlezFunctions.PaymentDebitCard(
      transaction_id,
      amount,
      description,
      v => {
        console.log("Call Back PaymentDebitCard ===> ", v);

        let merchant_transaction_id = `${transaction_id}`;
        //Your payment is : Approved
        if (v.code === 200) {
          this.setState({
            cz_uri: v.referenceNumber
              ? merchant_transaction_id +
                "|" +
                v.referenceNumber +
                "|" +
                v.approvalCode
              : null,
            cz_allow_print: true,
            loading: false,
            loadingReader: false
          });

          if (!this.state.manual_print_cashlez) {
            setTimeout(() => {
              CashlezFunctions.PrintLastPayment();
            }, 17500);
          }

          this.checkOutAction();
        } else {
          // "Device Busy"
          //Payment gagal disini
          //"Reader Companion Disconnected."
          //"Reader process interrupted."
          //"An error has occurred. Please contact Cashlez Call Center at 1500539."
          //"Your session is revoked, please do login again."Handshake process failed. Request failed.

          this.setState({
            cz_uri: v.referenceNumber
              ? v.referenceNumber + "|" + v.approvalCode
              : null,
            loading: false,
            loadingReader: false,
            cz_allow_print: false
          });

          setTimeout(() => {
            this.InitializeCashlez();
          }, 500);

          let alert_msg = _cashlez_not_common[this.state.languageIndex];
          if (v.message === "Reader Companion Disconnected.") {
            alert_msg = _cashlez_not_connected[this.state.languageIndex];
          }

          if (
            v.message === "Device Busy" ||
            v.message === "Reader process interrupted." ||
            v.message === "Your session is revoked, please do login again."
          ) {
            alert_msg = _cashlez_not_common[this.state.languageIndex];
          }

          alert(alert_msg);
        }
      }
    );
  }

  async PaymentProceedShopeePayment(transaction_id, amount, description) {
    //amount
    CashlezFunctions.ShopeePayment(transaction_id, amount, description, v => {
      console.log("Call Back ShopeePayment ===> ", v);
      //console.log("Call Back PaymentDebitCard ===> ", v);
      this.setState({
        cz_uri: v.referenceNumber
          ? v.referenceNumber + "|" + v.approvalCode
          : null,
        loading: false,
        loadingReader: false,
        cz_allow_print: true
      });
      this.checkOutAction();
    });
  }

  async PaymentProceedGopayPayment(transaction_id, amount, description) {
    //amount
    CashlezFunctions.GopayPayment(transaction_id, amount, description, v => {
      console.log("Call Back GopayPayment ===> ", v);
      //console.log("Call Back PaymentDebitCard ===> ", v);
      this.setState({
        cz_uri: v.referenceNumber
          ? v.referenceNumber + "|" + v.approvalCode
          : null,
        loading: false,
        loadingReader: false,
        cz_allow_print: true
      });
      this.checkOutAction();
    });
  }

  async PaymentProceedPhone() {
    console.log("PaymentProceedPhone ============> ");
    const { bill_transId, grandTotal } = this.state;
    //let total = parseFloat(grandTotal);
    let total = 1;

    let transaction_id = bill_transId.replace("/", "-");
    transaction_id = transaction_id.replace("/", "-");
    transaction_id = transaction_id.replace("/", "-");
    transaction_id = transaction_id.replace("/", "-");
    transaction_id = transaction_id.replace("/", "-");

    let merchant_transaction_id = `TEST-BEETPOS-${transaction_id}`;

    const outlet_id = this.state.userInfo.gerai_id;
    const business_id = this.state.userInfo.retail_id;
    let description = `Transaction From API Business ID: ${business_id} Outlet ID: ${outlet_id}`;

    CashlezFunctions.OvoPayment(
      `TEST-BEETPOS-${transaction_id}`,
      total.toString(),
      description,
      this.state.cz_phone_number,
      v => {
        console.log("Call Back Payment Ovo ===> ", v);
        this.setState({
          cz_uri: v.referenceNumber
            ? merchant_transaction_id +
              "|" +
              v.referenceNumber +
              "|" +
              v.approvalCode
            : null,
          loading: false,
          loadingReader: false,
          cz_show_form_phone: false,
          cz_allow_print: true
        });

        this.checkOutAction();
        //this.activateIntervalOvoCZ();
      }
    );
  }

  async PaymentProceedPaymentCreditCard(transaction_id, amount, description) {
    CashlezFunctions.PaymentCreditCard(
      transaction_id,
      amount,
      description,
      v => {
        let merchant_transaction_id = `${transaction_id}`;

        console.log("Call Back PaymentCreditCard ===> ", v);
        if (v.code === 200) {
          this.setState({
            cz_uri: v.referenceNumber
              ? merchant_transaction_id +
                "|" +
                v.referenceNumber +
                "|" +
                v.approvalCode
              : null,
            loading: false,
            loadingReader: false,
            cz_allow_print: true
          });
          if (!this.state.manual_print_cashlez) {
            setTimeout(() => {
              CashlezFunctions.PrintLastPayment();
            }, 10000);
          }

          this.checkOutAction();
        } else {
          this.setState({
            cz_uri: v.referenceNumber
              ? v.referenceNumber + "|" + v.approvalCode
              : null,
            loading: false,
            loadingReader: false,
            cz_allow_print: false
          });

          setTimeout(() => {
            this.InitializeCashlez();
          }, 500);

          let alert_msg = _cashlez_not_common[this.state.languageIndex];
          if (v.message === "Reader Companion Disconnected.") {
            alert_msg = _cashlez_not_connected[this.state.languageIndex];
          }

          if (
            v.message === "Device Busy" ||
            v.message === "Reader process interrupted." ||
            v.message === "Your session is revoked, please do login again."
          ) {
            alert_msg = _cashlez_not_common[this.state.languageIndex];
          }

          alert(alert_msg);
        }
      }
    );
  }

  testBayar() {
    // user                   : test01
    // PIN                    : 111111
    // entity id.             : 23271
    // vendor identifier : CZ00TEST001

    const { cz_type } = this.state;
    this.setState({ loading: true });

    let uri = "https://api-link.cashlez.com/generate_url_vendor";

    let uri_signature = BE_Signature;

    //console.log(" uri_signature ", uri_signature);

    ////// parameter cashlez

    const { bill_transId, userInfo, grandTotal } = this.state;

    let business_name = userInfo.business_name;
    let gerai_name = userInfo.gerai_name;

    let description = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";

    console.log("bill_transId ", bill_transId);
    let transaction_id = bill_transId.replace("/", "-");
    transaction_id = transaction_id.replace("/", "-");
    transaction_id = transaction_id.replace("/", "-");
    transaction_id = transaction_id.replace("/", "-");
    transaction_id = transaction_id.replace("/", "-");

    let total = parseFloat(grandTotal);

    let cz_entity_id = this.state.cz_entity_id_outlet
      ? this.state.cz_entity_id_outlet
      : this.state.cz_entity_id;

    let cz_vendor_identifier = this.state.cz_vendor_identifier_outlet
      ? this.state.cz_vendor_identifier_outlet
      : this.state.cz_vendor_identifier;

    let cz_user = this.state.cz_user_outlet
      ? this.state.cz_user_outlet
      : this.state.cz_user;

    const outlet_id = this.state.userInfo.gerai_id;
    const business_id = this.state.userInfo.retail_id;
    let cz_description = `Transaction From API Business ID: ${business_id} Outlet ID: ${outlet_id}`;

    let body = {
      data: {
        request: {
          vendorIdentifier: cz_vendor_identifier,
          token: "",
          referenceId: `TEST-BEETPOS-${transaction_id}`,
          entityId: cz_entity_id,
          merchantName: `${business_name}-${gerai_name}`,
          merchantDescription: description,
          currencyCode: "IDR",
          amount: total,
          //amount: 10000,
          callbackSuccess: "",
          callbackFailure: "",
          message: "",
          description: cz_description,
          transactionUsername: cz_user
        }
      }
    };

    // let body = {
    //   data: {
    //     request: {
    //       vendorIdentifier: "CZ00TEST001",
    //       token: "",
    //       referenceId: `TEST-BEETPOS-${transaction_id}`,
    //       entityId: "23271",
    //       merchantName: `${business_name}-${gerai_name}`,
    //       merchantDescription: description,
    //       currencyCode: "IDR",
    //       amount: total,
    //       //amount: 10000,
    //       callbackSuccess: "",
    //       callbackFailure: "",
    //       message: "",
    //       description: cz_description,
    //       transactionUsername: "test01"
    //     }
    //   }
    // };

    // user                   : test01
    // PIN                    : 111111
    // entity id.             : 23271
    // vendor identifier : CZ00TEST001

    // console.log("body.data ===> ",  JSON.stringify(body))

    //console.log("body.data ===> ", body);

    if (
      cz_type === "creditreader" ||
      cz_type === "debit" ||
      cz_type === "ovo" ||
      cz_type === "shopee" ||
      cz_type === "gopay"
    ) {
      /////credit / debit
      //total = 100;
      if (cz_type === "creditreader") {
        this.setState({ loadingReader: true });
        setTimeout(() => {
          this.PaymentProceedPaymentCreditCard(
            `TEST-BEETPOS-${transaction_id}`,
            total.toString(),
            cz_description
          );
        }, 1000);

        // setTimeout(() => {
        //   //this.timeOutCz();
        //   if (this.state.loading && this.state.loadingReader) {
        //     const alert_message = ["Pembayaran Timeout", "Payment Timeout"];
        //     alert(alert_message[this.state.languageIndex]);
        //     this.setState({ loading: false, loadingReader: false });
        //   }
        // }, 60000);
      }
      if (cz_type === "debit") {
        this.setState({ loadingReader: true });

        // CashlezFunctions.PaymentCheckReader(v => {
        //   console.log("Call Back PaymentCheckReader ===> ", v);
        //   //"Invalid function"
        //   //"Reader connected."
        // });

        setTimeout(() => {
          this.PaymentProceedPayment(
            `TEST-BEETPOS-${transaction_id}`,
            total.toString(),
            cz_description
          );
        }, 1000);

        // setTimeout(() => {
        //   if (this.state.loading && this.state.loadingReader) {
        //     const alert_message = ["Pembayaran Timeout", "Payment Timeout"];
        //     alert(alert_message[this.state.languageIndex]);
        //     this.setState({ loading: false, loadingReader: false });
        //   }
        //   //this.timeOutCz();
        // }, 60000);
      }

      if (cz_type === "shopee") {
        this.setState({ loadingReader: true });

        this.PaymentProceedShopeePayment(
          `TEST-BEETPOS-${transaction_id}`,
          //total.toString(),
          "1",
          cz_description
        );
        // setTimeout(() => {
        //   if (this.state.loading && this.state.loadingReader) {
        //     const alert_message = ["Pembayaran Timeout", "Payment Timeout"];
        //     alert(alert_message[this.state.languageIndex]);
        //     this.setState({ loading: false, loadingReader: false });
        //   }
        //   //this.timeOutCz();
        // }, 60000);
      }

      if (cz_type === "gopay") {
        this.setState({ loadingReader: true });

        this.PaymentProceedGopayPayment(
          `TEST-BEETPOS-${transaction_id}`,
          //total.toString(),
          "1",
          cz_description
        );
        // setTimeout(() => {
        //   if (this.state.loading && this.state.loadingReader) {
        //     const alert_message = ["Pembayaran Timeout", "Payment Timeout"];
        //     alert(alert_message[this.state.languageIndex]);
        //     this.setState({ loading: false, loadingReader: false });
        //   }
        //   //this.timeOutCz();
        // }, 60000);
      }

      if (cz_type === "ovo") {
        this.setState({ cz_show_form_phone: true, cz_phone_number: "" });
      }
    } else {
      if (this.state.cz_uri) {
        this.setState({
          //cz_uri: responseJson2.data.response.generatedUrl,
          //cz_response_uri: responseJson2.data.response,
          showCZ: true,
          loading: false
        });

        this.activateIntervalCZ();
      } else {
        fetch(uri_signature, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.statusCode === 200) {
              // console.log("uri_signature() ", responseJson.data[0].result);
              body.signature = responseJson.data[0].result;
              console.log("body => ", body);
              //console.log("body => ", body);

              fetch(uri, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
              })
                .then(response2 => response2.json())
                .then(responseJson2 => {
                  console.log("responseJson2 => ", responseJson2);

                  // let example_response = {
                  //   status: "01",
                  //   message: "Success",
                  //   timestamp: "2021-05-07T06:17:16.619+0000",
                  //   data: {
                  //     response: {
                  //       vendorIdentifier: "CZ00TEST001",
                  //       referenceId: "Test-Beetpos-010",
                  //       transactionId: "0026617",
                  //       generatedUrl:
                  //         "https://link.cashlez.com/czlink/GR23271Test-Beetpos-010",
                  //       expiredDate: "2021-05-07T07:17:16.309+0000",
                  //       timestamp: "2021-05-07T06:17:16.618+0000"
                  //     }
                  //   }
                  // };

                  console.log(
                    "responseJson2 cz_uri => ",
                    responseJson2.data.response.generatedUrl
                  );
                  console.log(
                    "responseJson2 cz_response_uri => ",
                    responseJson2.data.response
                  );

                  // this.setState({
                  //   cz_uri: responseJson2.data.response.generatedUrl,
                  //   cz_response_uri: responseJson2.data.response,
                  //   showCZ: true
                  // });

                  // CZFunctions.SaveCZURI(
                  //   responseJson2.data.response.generatedUrl,
                  //   result => {}
                  // );
                  // CZFunctions.SaveCZResponse(
                  //   responseJson2.data.response,
                  //   result => {}
                  // );

                  // start fetch 3

                  // let cz_entity_id = this.state.cz_entity_id_outlet
                  //   ? this.state.cz_entity_id_outlet
                  //   : this.state.cz_entity_id;

                  // let cz_vendor_identifier = this.state
                  //   .cz_vendor_identifier_outlet
                  //   ? this.state.cz_vendor_identifier_outlet
                  //   : this.state.cz_vendor_identifier;

                  // let cz_user = this.state.cz_user_outlet
                  //   ? this.state.cz_user_outlet
                  //   : this.state.cz_user;

                  if (cz_type === "qr") {
                    let uri_process =
                      "https://api-link.cashlez.com/process_url";
                    let body_fetch_3 = {
                      status: "",
                      message: "",
                      data: {
                        request: {
                          vendorIdentifier: cz_vendor_identifier,
                          entityId: cz_entity_id,
                          referenceId: `TEST-BEETPOS-${transaction_id}`,
                          paymentType: {
                            id: 4,
                            code: "TCASH_QR_PAYMENT",
                            name: "TCASH_QR"
                          },
                          customerMobilePhone: "",
                          message: "",
                          customerLatitude: "-6.1675794999999995",
                          customerLongitude: "106.7824544"
                        }
                      }
                      // data: {
                      //   request: {
                      //     vendorIdentifier: "CZ00TEST001",
                      //     entityId: "23271",
                      //     referenceId: `TEST-BEETPOS-${transaction_id}`,
                      //     paymentType: {
                      //       id: 4,
                      //       code: "TCASH_QR_PAYMENT",
                      //       name: "TCASH_QR"
                      //     },
                      //     customerMobilePhone: "",
                      //     message: "",
                      //     customerLatitude: "-6.1675794999999995",
                      //     customerLongitude: "106.7824544"
                      //   }
                      // }
                    };

                    fetch(uri_process, {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(body_fetch_3)
                    })
                      .then(response3 => response3.json())
                      .then(responseJson3 => {
                        console.log("responseJson3 => ", responseJson3);

                        // let example_response = {
                        //   status: "01",
                        //   message: "Success",
                        //   timestamp: "2021-05-07T06:17:16.619+0000",
                        //   data: {
                        //     response: {
                        //       vendorIdentifier: "CZ00TEST001",
                        //       referenceId: "Test-Beetpos-010",
                        //       transactionId: "0026617",
                        //       generatedUrl:
                        //         "https://link.cashlez.com/czlink/GR23271Test-Beetpos-010",
                        //       expiredDate: "2021-05-07T07:17:16.309+0000",
                        //       timestamp: "2021-05-07T06:17:16.618+0000"
                        //     }
                        //   }
                        // };

                        console.log("responseJson3  => ", responseJson3);

                        this.setState({
                          cz_uri: responseJson2.data.response.generatedUrl,
                          cz_response_uri: responseJson2.data.response,
                          showCZ: true,
                          cz_qr: true
                        });

                        this.activateIntervalCZ();

                        CZFunctions.SaveCZURI(
                          responseJson2.data.response.generatedUrl,
                          result => {}
                        );
                        CZFunctions.SaveCZResponse(
                          responseJson2.data.response,
                          result => {}
                        );

                        this.setState({ loading: false });
                      });
                  } else {
                    this.setState({
                      cz_uri: responseJson2.data.response.generatedUrl,
                      cz_response_uri: responseJson2.data.response,
                      showCZ: true
                    });

                    this.activateIntervalCZ();

                    CZFunctions.SaveCZURI(
                      responseJson2.data.response.generatedUrl,
                      result => {}
                    );
                    CZFunctions.SaveCZResponse(
                      responseJson2.data.response,
                      result => {}
                    );

                    this.setState({ loading: false });
                  }

                  //end fetch 3
                });

              //end fetch 2
            }
          })
          .catch(_err => {
            //console.log("ERR Check Token ==> ", _err);
          });
      }
    }
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
        console.log(base64Data);
        this.setState({ logo_image_base64: base64Data });
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  }

  insertDataCustomer() {
    const uri = BE_Customer;

    const gerai_id = this.state.userInfo.gerai_id;

    this.setState({ loading: true });
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        //id: this.state.selectedCustomer.id,
        //gerai_id: gerai_id,
        email:
          this.state.formEmail === ""
            ? "NewCustomer" +
              moment(new Date()).format("DDMMYYYYHHmmss") +
              "@email.com"
            : this.state.formEmail,
        name:
          this.state.formCustomer === ""
            ? "New Customer"
            : this.state.formCustomer,
        phone_number: this.state.formPhone,
        notes: "",
        address: "",
        points: 0
        //password: this.state.formPassword
        //image: image,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        console.log("responseJson ==>", responseJson);

        console.log("insertDataUser ==>", resultData);

        let alertMessage = [result.message];

        if (responseJson.statusCode === 201) {
          alertMessage = [_berhasil_tambah[this.state.languageIndex]];
        } else {
          alertMessage = [_gagal[this.state.languageIndex]];
          //alertMessage.push(result.message);
        }
        alert(alertMessage);

        this.setState({
          loading: false
        }),
          () => {
            //this.forceUpdate();
          };
        //this.getListCustomer(1);
        this.closeForm();
        //this.setState({ selectedCustomer: resultData });
        //this.getListCustomer(1);
        //console.log("clockInFormat ==> ", clockIn);
        //this.setState({ listUser: resultData });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getLoyaltyPromoSettings() {
    const uri = `${BE_Loyalty_Promo_Settings}`;
    //console.log("getLoyaltyPromoSettings URI ==> ", uri);
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        //console.log("responseJSON getLoyaltyPromoSettings ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;
          this.setState({ loyaltyPromoSettings: resultData });
        } else {
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getPromoVoucher() {
    //const uri = `${BE_Voucher_Promo}`;

    const outlet_id = this.state.userInfo.gerai_id;

    const uri = `${BE_Voucher_Promo}?outlet_id=${outlet_id}&status=active`;

    var mydate = moment(new Date()).format("YYYY-MM-DD 00:00:00");
    var mytime = moment(new Date()).format("HH:mm");
    var weekDayName = moment(mydate).format("dddd");
    let weekDayNum = moment(mydate).format("d");
    weekDayNum = parseInt(weekDayNum) - 1;
    weekDayNum = weekDayNum.toString();

    //console.log("getListCustomer URI ==> ", uri);
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("responseJSON getPromoVoucher ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          let tempFiltered = [];

          resultData.map((v, i) => {
            let promo_date_start = moment(v.promo_date_start).format(
              "YYYY-MM-DD"
            );

            var mydate_new = moment(new Date())
              .add(0, "days")
              .format("YYYY-MM-DD");

            let promo_date_end = moment(v.promo_date_end).format("YYYY-MM-DD");

            let promo_date_valid = false;
            if (
              mydate_new >= promo_date_start &&
              mydate_new <= promo_date_end
            ) {
              promo_date_valid = true;
            }

            if (promo_date_valid) {
              tempFiltered.push(v);
            }
          });

          OfflineMenuFunctions.SavePromoVoucher(tempFiltered, x => {});

          this.setState({ promoVoucher: tempFiltered });
        } else {
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getPromoSpecialLastUpdate() {
    const outlet_id = this.state.userInfo.gerai_id;

    const uri = `${BE_Special_Promo}/last-update?outlet_id=${outlet_id}&status=active`;

    //console.log("getListCustomer URI ==> ", uri);
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        // console.log("responseJSON getPromoSpecial ==> ", result);
        if (result.statusCode === 200) {
          const data = responseJson.data[0].updatedAt.toString();

          let need_update = false;
          if (!this.state.last_update_special_promo) {
            need_update = true;
          }

          if (this.state.last_update_special_promo) {
            if (this.state.last_update_special_promo !== data) {
              need_update = true;
            }
          }

          if (need_update) {
            OfflineMenuFunctions.SaveLastUpdatePromoSpecial(data, x => {});
            this.getPromoSpecial();
          } else {
            OfflineMenuFunctions.GetPromoSpecial(x => {
              if (x) {
                this.setState({ promoSpecial: x });
              }
            });
          }
        } else {
          //OfflineMenuFunctions.SavePromoSpecial([], x => {});
          //this.setState({ promoSpecial: [] });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getPromoSpecial() {
    const outlet_id = this.state.userInfo.gerai_id;

    const uri = `${BE_Special_Promo}?outlet_id=${outlet_id}&status=active`;

    //console.log("getListCustomer URI ==> ", uri);
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        // console.log("responseJSON getPromoSpecial ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          OfflineMenuFunctions.SavePromoSpecial(resultData, x => {});

          this.setState({ promoSpecial: resultData });
        } else {
          OfflineMenuFunctions.SavePromoSpecial([], x => {});
          this.setState({ promoSpecial: [] });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getCommission() {
    const retail_id = this.state.userInfo.retail_id;
    const uri = `${BE_Commission}?business_id=${retail_id}&status=Active`;
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        //console.log("responseJSON getPromoSpecial ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          let dataCommision = resultData;
          let dataFinal = [];

          // console.log("dataCommision ===> ", dataCommision);
          // console.log("dataBill ===> ", this.state.dataBill);

          let data_bill = this.state.dataBill;

          let highest_total = 0;
          let select_highest_id = 0;
          dataCommision.map((v, i) => {
            let product_include = JSON.parse(v.product_id);
            //console.log("product_include ===> ", product_include);

            if (this.state.grandTotal >= v.nominal) {
              if (product_include.length === 0) {
                if (highest_total < v.total) {
                  highest_total = v.total;
                  select_highest_id = v.id;
                }
              } else {
                data_bill.map((a, b) => {
                  product_include.map((c, d) => {
                    if (a.product_id === c) {
                      if (highest_total < v.total) {
                        highest_total = v.total;
                        select_highest_id = v.id;
                      }
                    }
                  });
                });
              }
            }
          });

          dataCommision.map((v, i) => {
            if (v.id === select_highest_id) {
              let staff_id = JSON.parse(v.staff_id);
              console.log("v staff_id ===> ", staff_id);

              let data_staff = [];
              staff_id.map((val, index) => {
                let staff_name = v.staff_name;
                if (staff_id.length > 1) {
                  staff_name = v.staff_name.split(", ");
                }
                let data_temp = {
                  staff_id: val,
                  staff_name:
                    staff_id.length > 1 ? staff_name[index] : staff_name
                };

                data_staff.push(data_temp);
              });

              let total = v.total;
              let nominal = v.nominal;
              let commission_type = v.commission_type;

              let data_temp_commision = {
                data_staff: data_staff,
                staff_id: staff_id,
                total: total,
                nominal: nominal,
                commission_type: commission_type
              };
              dataFinal.push(data_temp_commision);
            }
          });

          //OfflineMenuFunctions.SavePromoSpecial(resultData, x => {});
          console.log("dataFinal ===> ", dataFinal);

          let data_all_staff = [];
          dataFinal.map((v, i) => {
            v.data_staff.map((val, index) => {
              if (data_all_staff.length === 0) {
                data_all_staff.push(val);
              } else {
                let is_duplicate = false;
                data_all_staff.map((dv, indexv) => {
                  if (dv.staff_id === val.staff_id) {
                    is_duplicate = true;
                  }
                });
                if (!is_duplicate) {
                  data_all_staff.push(val);
                }
              }
            });
          });

          this.setState({
            dataCommission: dataFinal,
            dataStaffCommission: data_all_staff
          });

          console.log("data_all_staff ===> ", data_all_staff);
        } else {
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getPromoAutomaticLastUpdate() {
    //console.log("userInfo ===> ", this.state.userInfo);

    const outlet_id = this.state.userInfo.gerai_id;

    const uri = `${BE_Automatic_Promo}/last-update?outlet_id=${outlet_id}&status=active`;

    var mydate = moment(new Date()).format("YYYY-MM-DD 00:00:00");
    var mytime = moment(new Date()).format("HH:mm");
    var weekDayName = moment(mydate).format("dddd");
    let weekDayNum = moment(mydate).format("d");
    weekDayNum = parseInt(weekDayNum) - 1;
    weekDayNum = weekDayNum.toString();

    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;

        if (result.statusCode === 200) {
          const data = responseJson.data[0].updatedAt.toString();

          let need_update = false;
          if (!this.state.last_update_automatic_promo) {
            need_update = true;
          }

          if (this.state.last_update_automatic_promo) {
            if (this.state.last_update_automatic_promo !== data) {
              need_update = true;
            }
          }

          if (need_update) {
            OfflineMenuFunctions.SaveLastUpdatePromoAutomatic(data, x => {});
            this.getPromoAutomatic();
          } else {
            OfflineMenuFunctions.GetPromoAutomatic(x => {
              if (x) {
                // this.setState({ promoSpecial: x });
                this.setState({ promoAutomatic: x });
              }
            });
          }
        } else {
          //OfflineMenuFunctions.SavePromoSpecial([], x => {});
          //this.setState({ promoSpecial: [] });
        }
      })
      .catch(_err => {
        // setTimeout(() => {
        //   this.calculateAutomaticPromo();
        // }, 50);
        console.log("ERR ==> ", _err);
      });
  }

  getPromoAutomatic() {
    //console.log("userInfo ===> ", this.state.userInfo);

    const outlet_id = this.state.userInfo.gerai_id;

    const uri = `${BE_Automatic_Promo}?outlet_id=${outlet_id}&status=active`;

    var mydate = moment(new Date()).format("YYYY-MM-DD 00:00:00");
    var mytime = moment(new Date()).format("HH:mm");
    var weekDayName = moment(mydate).format("dddd");
    let weekDayNum = moment(mydate).format("d");
    weekDayNum = parseInt(weekDayNum) - 1;
    weekDayNum = weekDayNum.toString();

    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        //console.log("responseJSON getPromoAutomatic ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          let tempFiltered = [];

          resultData.map((v, i) => {
            //console.log("promo_days ===> ", v.promo_days);
            //console.log("promo_hour_start ===> ", v.promo_hour_start);
            //console.log("promo_hour_end ===> ", v.promo_hour_end);

            let valid_hour = false;
            if (mytime >= v.promo_hour_start && mytime <= v.promo_hour_end) {
              valid_hour = true;
            }

            //console.log("promo_date_start ===> ", v.promo_date_start);
            //console.log("promo_date_end ===> ", v.promo_date_end);

            // console.log(
            //   "Moment Testing weekDayNum ===> ",
            //   `"${weekDayNum.toString()}"`
            // );

            var promo_days = v.promo_days.split(",");

            // var testing_1 = JSON.stringify(promo_days)

            // var testing_2 = JSON.parse(testing_1)

            // console.log(
            //   "promo_days array NEW ===> ",
            //   JSON.stringify(promo_days)
            // );

            // console.log("testing_2 array NEW ===> ", testing_2);

            let promo_days_valid = false;
            promo_days.map((val, index) => {
              if (val === `${weekDayNum.toString()}`) {
                promo_days_valid = true;
              }

              if (val.toString() === "7") {
                promo_days_valid = true;
              }
            });

            //console.log("promo_days_valid ===> ", promo_days_valid);

            // console.log("valid_hour ===> ", valid_hour);
            // console.log("promo_hour_start ===> ", v.promo_hour_start);
            // console.log("promo_hour_end ===> ", v.promo_hour_end);

            // console.log("promo_date_start ===> ", v.promo_date_start);
            // console.log("promo_date_end ===> ", v.promo_date_end);
            var mydate_new = moment(new Date())
              .add(0, "days")
              .format("YYYY-MM-DD");

            let promo_date_start = moment(v.promo_date_start).format(
              "YYYY-MM-DD"
            );
            let promo_date_end = moment(v.promo_date_end).format("YYYY-MM-DD");

            let promo_date_valid = false;
            if (
              mydate_new >= promo_date_start &&
              mydate_new <= promo_date_end
            ) {
              promo_date_valid = true;
            }
            // console.log("promo_date_valid ===> ", promo_date_valid);

            // console.log("promo_date_start ===> ", promo_date_start);
            // console.log("promo_date_end ===> ", promo_date_end);

            // console.log("mydate_new ===> ", mydate_new);

            // console.log("mydate >= v.promo_date_start ===> ", mydate_new >= promo_date_start);

            // console.log("mydate <= v.promo_date_end ===> ", mydate_new <= promo_date_end);

            if (valid_hour && promo_days_valid && promo_date_valid) {
              tempFiltered.push(v);
            }
          });

          //console.log("tempFiltered ===> ", tempFiltered);
          OfflineMenuFunctions.SavePromoAutomatic(tempFiltered, x => {});
          this.setState({ promoAutomatic: tempFiltered });

          //this.calculateAutomaticPromo();
          //console.log("getPromoAutomatic 200 ==> ", result.statusCode);

          setTimeout(() => {
            this.calculateAutomaticPromo();
          }, 50);
        } else {
          OfflineMenuFunctions.SavePromoAutomatic([], x => {});
          this.setState({ promoAutomatic: [] });

          //console.log("getPromoAutomatic not 200 ==> ", result.statusCode);
          setTimeout(() => {
            this.calculateAutomaticPromo();
          }, 50);
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        setTimeout(() => {
          this.calculateAutomaticPromo();
        }, 50);
        console.log("ERR ==> ", _err);
      });
  }

  calculateAutomaticPromo() {
    const {
      dataBill,
      promoAutomatic,
      bill_subTotal,
      rate_discount,
      rate_services,
      rate_tax,
      customPriceTax,
      customPriceFinal,
      customPrice,
      selectedDiscount,
      voucherAmount,
      voucherType,
      automaticPromoLimit,
      automaticPromoActivated
    } = this.state;

    let { automaticPromoAmount, automaticPromoRate } = this.state;

    let temp_automaticPromoActivated = [];

    let temp_dataBill = dataBill;

    let limit = null;

    promoAutomatic.map((v, i) => {
      // console.log("automatic Promo ===> ", v);
      let _temp_data = v;
      if (v.Automatic_Promo_Transaction) {
        const Automatic_Promo_Transaction = v.Automatic_Promo_Transaction;
        //automatic promo transaction
        //console.log("automatic Promo transaction ===> ", v);

        if (
          parseInt(bill_subTotal) >=
          parseInt(Automatic_Promo_Transaction.amount)
        ) {
          //hitung diskon
          if (Automatic_Promo_Transaction.type === "currency") {
            automaticPromoAmount =
              automaticPromoAmount + Automatic_Promo_Transaction.value;

            _temp_data.discount_promo = Automatic_Promo_Transaction.value;

            temp_automaticPromoActivated.push(_temp_data);

            this.setState({
              automaticPromoAmount: automaticPromoAmount
            });

            //console.log("Automatic_Promo_Transaction ===> ", Automatic_Promo_Transaction);

            console.log("automaticPromoAmount ===> ", automaticPromoAmount);
          } else {
            //console.log("Automatic_Promo_Transaction ===> ", Automatic_Promo_Transaction);

            temp_automaticPromoActivated.push(_temp_data);

            automaticPromoRate =
              automaticPromoRate + Automatic_Promo_Transaction.value;

            if (Automatic_Promo_Transaction.discount_limit) {
              if (!limit && limit !== 0) {
                limit = 0;
              }

              limit = limit + Automatic_Promo_Transaction.discount_limit;
            }

            console.log("automaticPromoRate ===> ", automaticPromoRate);

            this.setState({
              automaticPromoRate: automaticPromoRate,
              automaticPromoLimit: limit
            });
          }
        }
      }

      if (v.Automatic_Promo_Quantity) {
        const Automatic_Promo_Quantity = v.Automatic_Promo_Quantity;
        //console.log("dataBill Automatic_Promo_Quantity ===> ", dataBill);
        // console.log(
        //   "Data Automatic_Promo_Quantity ===> ",
        //   Automatic_Promo_Quantity
        // );

        let product_id_match = Automatic_Promo_Quantity.product_id;
        let item_quantity_min = Automatic_Promo_Quantity.amount;
        let type = Automatic_Promo_Quantity.type;
        let value = Automatic_Promo_Quantity.value;

        let has_items = false;

        dataBill.map((data, index) => {
          //console.log("dataBill map ===> ", data);
          //// console.log("dataBill product_id_match ===> ", product_id_match);
          // console.log("dataBill item_quantity_min ===> ", item_quantity_min);

          const quantity_item = data.qty ? data.qty : data.quantity;

          // console.log("quantity_item ===> ", quantity_item);
          // console.log("item_quantity_min ===> ", item_quantity_min);
          // console.log("dataBill product_id_match ===> ", product_id_match);
          // console.log("data.product_id ===> ", data.product_id);
          // console.log(" quantity_item >= item_quantity_min ===> ",  quantity_item >= item_quantity_min);
          // console.log("!has_items ===> ", !has_items);

          if (
            !has_items &&
            data.product_id === product_id_match &&
            quantity_item >= item_quantity_min
          ) {
            console.log("correct_item ===> ", true);
            console.log(
              "Data Automatic_Promo_Quantity ===> ",
              Automatic_Promo_Quantity
            );

            has_items = true;

            //temp_automaticPromoActivated.push(v);
            //hitung diskon
            if (Automatic_Promo_Quantity.type === "currency") {
              automaticPromoAmount =
                automaticPromoAmount + Automatic_Promo_Quantity.value;

              _temp_data.discount_promo = Automatic_Promo_Quantity.value;

              temp_automaticPromoActivated.push(_temp_data);

              this.setState({
                automaticPromoAmount: automaticPromoAmount
              });
            } else {
              automaticPromoRate =
                automaticPromoRate + Automatic_Promo_Quantity.value;

              console.log("automaticPromoRate ===> ", automaticPromoRate);

              temp_automaticPromoActivated.push(_temp_data);

              if (Automatic_Promo_Quantity.discount_limit) {
                if (!limit && limit !== 0) {
                  limit = 0;
                }

                limit = limit + Automatic_Promo_Quantity.discount_limit;
              }

              this.setState({
                automaticPromoRate: automaticPromoRate,
                automaticPromoLimit: limit
              });
            }
          }
        });
      }

      if (v.Automatic_Promo_XY) {
        console.log("Automatic_Promo_XY ===> ", v.Automatic_Promo_XY);

        const Automatic_Promo_XY = v.Automatic_Promo_XY;

        if (
          Automatic_Promo_XY.Product_X.length === 1 &&
          Automatic_Promo_XY.Product_Y.length === 1
        ) {
          let product_x = Automatic_Promo_XY.Product_X[0];
          let product_y = Automatic_Promo_XY.Product_Y[0];

          console.log("Automatic_Promo_x_id ===> ", product_x.product_id);
          console.log("Automatic_Promo_y_id ===> ", product_y.product_id);

          let _same_product =
            product_x.product_id === product_y.product_id ? true : false;
          let _has_x = false;
          let _qty_x = 0;
          let _amount_x = 0;
          let _limit_y = 0;
          let _has_y = false;

          temp_dataBill.map((data, index) => {
            if (
              !_has_x &&
              data.product_id === product_x.product_id &&
              data.qty >= Automatic_Promo_XY.amount_x
            ) {
              _has_x = true;
              _amount_x = Automatic_Promo_XY.amount_x;

              if (_same_product) {
                _amount_x = _amount_x + Automatic_Promo_XY.amount_y;
              }

              const data_kena_promo = temp_dataBill[index].qty_promo
                ? temp_dataBill[index].qty_promo
                : 0;

              //temp_dataBill[index2].qty_promo = data_kena_promo + kena_promo;

              _qty_x = data.qty - data_kena_promo;

              if (Automatic_Promo_XY.apply_multiply === true) {
                _limit_y = Math.floor(_qty_x / _amount_x);

                if (Automatic_Promo_XY.amount_y > 1) {
                  _limit_y = _limit_y * Automatic_Promo_XY.amount_y;
                }
              } else {
                _limit_y = Automatic_Promo_XY.amount_y;
              }

              //console.log("has x only");

              temp_dataBill.map((data2, index2) => {
                if (
                  _has_x &&
                  !_has_y &&
                  data2.product_id === product_y.product_id &&
                  data2.qty >= Automatic_Promo_XY.amount_y
                ) {
                  //temp_automaticPromoActivated.push(v);

                  _has_y = true;
                  console.log("has x and y");
                  console.log("databill2 ==> ", data2);

                  console.log("max_qty_discount ==> ", _limit_y);

                  const kena_promo = max_qty_discount;

                  console.log(
                    "data_kena_promo 1 ===> ",
                    temp_dataBill[index2].qty_promo
                  );

                  const data_kena_promo = temp_dataBill[index2].qty_promo
                    ? temp_dataBill[index2].qty_promo
                    : 0;

                  temp_dataBill[index2].qty_promo =
                    data_kena_promo + kena_promo;

                  let price = data2.price;
                  let qty = data2.qty - data_kena_promo;

                  // console.log("qty 1 ===> ", qty)

                  // console.log("data2.qty ===> ", data2.qty)

                  // console.log("data2.price ===> ", data2.price)

                  // console.log("data_kena_promo qty ===> ", data_kena_promo)

                  if (qty < 0) {
                    qty = 0;
                  }

                  let max_qty_discount = qty;

                  if (qty >= _limit_y) {
                    max_qty_discount = _limit_y;
                  }

                  let salesTypeValue = max_qty_discount * data2.salesTypeValue;

                  let amount_discount = max_qty_discount * price;

                  amount_discount = amount_discount + salesTypeValue;

                  automaticPromoAmount = automaticPromoAmount + amount_discount;

                  _temp_data.discount_promo = automaticPromoAmount;

                  temp_automaticPromoActivated.push(_temp_data);

                  console.log(
                    "automaticPromoAmount xy ===> ",
                    automaticPromoAmount
                  );

                  this.setState({
                    automaticPromoAmount: automaticPromoAmount
                  });
                }
              });
            }
          });
        } // jika produknya multiple
        else {
          let _qty_x = 0;
          let _qty_y = 0;

          let _has_x = false;

          let _amount_x = Automatic_Promo_XY.amount_x;

          let _amount_y = Automatic_Promo_XY.amount_y;

          let _limit_y = 0;

          let _has_y = false;

          let _same_product = false;

          let product_x = Automatic_Promo_XY.Product_X;
          let product_y = Automatic_Promo_XY.Product_Y;

          product_x.map((datax, indexx) => {
            if (!_same_product) {
              product_y.map((datay, indexy) => {
                if (datax.product_id === datay.product_id) {
                  _same_product = true;
                }
              });
            }
          });

          // if (_same_product)
          // {
          //   _amount_x = amount_x + amount_y
          // }

          temp_dataBill.map((data, index) => {
            const product_id = data.product_id;
            const qty = data.qty;

            //hitung qty x
            product_x.map((datax, indexx) => {
              const data_kena_promo = temp_dataBill[index].qty_promo
                ? temp_dataBill[index].qty_promo
                : 0;

              //temp_dataBill[index2].qty_promo = data_kena_promo + kena_promo;
              if (datax.product_id === product_id) {
                let temp_qty = qty - data_kena_promo;
                if (temp_qty < 0) {
                  temp_qty = 0;
                }

                _qty_x = _qty_x + temp_qty;
                if (_qty_x > 0) {
                  _has_x = true;
                  //_qty_x = 0;
                }
              }
            });

            //hitung qty y
            product_y.map((datay, indexy) => {
              const data_kena_promo = temp_dataBill[index].qty_promo
                ? temp_dataBill[index].qty_promo
                : 0;

              if (datay.product_id === product_id) {
                let temp_qty = qty - data_kena_promo;

                if (temp_qty < 0) {
                  temp_qty = 0;
                }

                _qty_y = _qty_y + temp_qty;

                //_qty_y = _qty_y + qty - data_kena_promo;
                if (_qty_y > 0) {
                  _has_y = true;
                  //_qty_y = 0;
                }
              }
            });
          });

          if (_same_product) {
            //jika same product maka ditambah amount y
            _amount_x = _amount_x + _amount_y;
          }

          if (Automatic_Promo_XY.apply_multiply === true) {
            _limit_y = Math.floor(_qty_x / _amount_x);

            if (Automatic_Promo_XY.amount_y > 1) {
              _limit_y = _limit_y * Automatic_Promo_XY.amount_y;
            }
          } else {
            _limit_y = Automatic_Promo_XY.amount_y;
          }

          // console.log("LIMIT Y ===> ", _limit_y);
          // console.log("AMT X ===> ", _amount_x);
          // console.log("QTY X ===> ", _qty_x);

          if (_has_x && _has_y && _qty_x >= _amount_x) {
            let counter_y = _limit_y;
            temp_dataBill.map((data, index) => {
              if (
                counter_y > 0
                //data2.product_id === product_y.product_id &&
                //data2.qty >= Automatic_Promo_XY.amount_y
              ) {
                //temp_automaticPromoActivated.push(v);
                let amount_discount = 0;
                let salesTypeValue = 0;
                let price = data.price;
                let data_kena_promo = data.qty_promo ? data.qty_promo : 0;

                console.log(
                  "data kena promo index ===> ",
                  index,
                  " == ",
                  data_kena_promo
                );
                let qty = data.qty - data_kena_promo;
                let max_qty_discount = qty;
                const product_id = data.product_id;
                product_y.map((datay, indexy) => {
                  if (datay.product_id === product_id) {
                    if (counter_y > 0) {
                      const data_kena_promo = temp_dataBill[index].qty_promo
                        ? temp_dataBill[index].qty_promo
                        : 0;
                      let max_qty = qty - data_kena_promo;

                      if (max_qty < 0) {
                        max_qty = 0;
                      }

                      console.log(
                        "max_qty index ===> ",
                        index,
                        " == ",
                        max_qty
                      );

                      let temp_qty = counter_y < max_qty ? counter_y : max_qty;
                      const kena_promo = temp_qty;

                      console.log("data_kena_promo 2 ===> ", data_kena_promo);
                      temp_dataBill[index].qty_promo =
                        data_kena_promo + kena_promo;

                      console.log("qty 2 ===> ", temp_qty);

                      counter_y = counter_y - temp_qty;

                      salesTypeValue =
                        salesTypeValue + temp_qty * data.salesTypeValue;
                      amount_discount = amount_discount + temp_qty * price;
                    }
                  }
                });

                // if (qty >= _limit_y) {
                //   max_qty_discount = _limit_y;
                // }

                // amount_discount = amount_discount + salesTypeValue;

                automaticPromoAmount =
                  automaticPromoAmount + amount_discount + salesTypeValue;
                console.log(
                  "automaticPromoAmount xy_multi ===> ",
                  automaticPromoAmount
                );

                _temp_data.discount_promo = automaticPromoAmount;
              }
            });

            if (_temp_data.discount_promo > 0) {
            }
            temp_automaticPromoActivated.push(_temp_data);

            this.setState({
              automaticPromoAmount: automaticPromoAmount
            });
          }
        }
      }
    });

    // console.log(
    //   "temp_automaticPromoActivated ==> ",
    //   temp_automaticPromoActivated
    // );

    // console.log(
    //   "temp_automaticPromoActivated.length ==> ",
    //   temp_automaticPromoActivated
    // );

    this.setState({ automaticPromoActivated: temp_automaticPromoActivated });
    if (
      temp_automaticPromoActivated &&
      temp_automaticPromoActivated.length > 0
    ) {
      setTimeout(() => {
        this.changeDiscount();
      }, 450);
    } else {
      this.setState({ loading: this.state.payment_method_done ? false : true });
    }
    //this.changeDiscount();
  }

  renderDetailPromoUsed(data, index) {
    console.log("renderDetailPromoUsed ===> ", data);
    return (
      <View>
        <View
          style={{
            margin: 15,
            flexDirection: "row",
            marginTop: 5,
            marginBottom: 5
          }}
        >
          {/* <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 15,
                  color: BLACK
                })
              }
            >
              {_promo[this.state.languageIndex]}
            </Text> */}
          <Entypo
            name={"dot-single"}
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: BLACK,
              marginRight: 5
            }}
          />

          <Text
            style={
              ([MainStyle.robotoNormal],
              {
                fontSize: 15,
                color: BLACK
              })
            }
          >
            {data.name}
          </Text>
        </View>
      </View>
    );
  }

  renderListPromoUsed() {
    const { automaticPromoActivated } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showPromo}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showPromo: false });
        }}
      >
        <View style={{ flex: 0.5, backgroundColor: "rgba(0,0,0,0.5)" }} />
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              alignSelf: "center",
              width: this.state.tablet ? "50%" : "100%",
              flex: 1,
              marginTop: -15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: WHITE
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center"
                //justifyContent: "center"
              }}
            >
              <View
                style={{
                  //backgroundColor: "#BCA",
                  width: "100%",
                  flexDirection: "row",
                  padding: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showPromo: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK
                    })
                  }
                >
                  {_promo[this.state.languageIndex]}
                </Text>
              </View>

              <View
                style={{ flexDirection: "column", width: "100%", padding: 15 }}
              >
                {this.state.total_membership_discount > 0 ? (
                  <View
                    style={{
                      margin: 15,
                      flexDirection: "row",
                      marginTop: 5,
                      marginBottom: 5
                    }}
                  >
                    <Entypo
                      name={"dot-single"}
                      style={{
                        alignSelf: "center",
                        fontSize: 20,
                        color: BLACK,
                        marginRight: 5
                      }}
                    />
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          fontSize: 15,
                          color: BLACK,
                          marginLeft: 5
                        })
                      }
                    >
                      {_membership_discount[this.state.languageIndex]}{" "}
                      {this.state.customer_level_discount} {" % "}
                    </Text>
                    {/* <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          fontSize: 15,
                          color: BLACK,
                          marginLeft: 5
                        })
                      }
                    >
                      {this.state.total_membership_discount}
                    </Text> */}
                  </View>
                ) : (
                  <View />
                )}
                <View style={{ width: "100%" }}>
                  <FlatList
                    // columnWrapperStyle={{
                    //   justifyContent: "space-evenly",
                    //   marginBottom: 5
                    // }}
                    // contentContainerStyle={{
                    //   // marginLeft: "-0.5%",
                    //   // marginRight: "-0.5%",
                    //   width: "100%",
                    //   justifyContent: "space-between"
                    //   //backgroundColor: "#BCA"
                    // }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    //numColumns={2}
                    data={this.state.automaticPromoActivated}
                    renderItem={({ item, index }) => {
                      return this.renderDetailPromoUsed(item, index);
                    }}
                    keyExtractor={(item, index) => {
                      //console.log(item.toString()+"_"+i.toString()+"_"+index.toString());
                      return "Discount" + index.toString();
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  deleteCoupon(index) {
    let { listCouponUsage } = this.state;

    // this.setState({ loading: true });

    const couponData = listCouponUsage[index];
    const couponValue = couponData.coupon_value;
    const newCouponValue =
      parseFloat(this.state.couponAmount) - parseFloat(couponValue);

    listCouponUsage.splice(index, 1);
    let tempData = [];

    this.setState({
      listCouponUsage: listCouponUsage,
      couponAmount: newCouponValue
    });

    setTimeout(() => {
      this.changeDiscount();
    }, 100);

    // setTimeout(() => {
    //   this.setState({ showBill: true, loading: false });
    // }, 150);
  }

  getCouponData(code = this.state.couponSearchKey) {
    this.setState({ loadingCustomer: true });

    const gerai_id = this.state.userInfo.gerai_id;

    let search_string = "";
    if (code !== "") {
      search_string = code;
    }

    const uri = `${BE_Coupon}/code/${search_string}?status=1`;
    const body = {
      status: 2
    };

    console.log("getCouponData URI ==> ", uri);
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        //console.log("responseJSON GET CUSTOMER ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;
          let temp_data_list_coupon = this.state.listCouponUsage; ///////

          let is_duplicate = false;

          temp_data_list_coupon.map((v, i) => {
            if (v.id === resultData.id) {
              is_duplicate = true;
            }
          });

          if (is_duplicate) {
            alert(_coupon_not_found[this.state.languageIndex]);
            this.setState({
              couponSearchKey: "",
              //dataCoupon: result.data,
              //listCouponUsage: temp_data_list_coupon,
              loadingCustomer: false
            });
          } else {
            let temp_coupon_amount =
              parseFloat(this.state.couponAmount) +
              parseFloat(resultData.coupon_value);
            temp_data_list_coupon.push(resultData);
            console.log("temp_data_list_coupon ===> ", temp_data_list_coupon);

            this.setState({
              couponSearchKey: "",
              dataCoupon: result.data,
              couponAmount: temp_coupon_amount,
              listCouponUsage: temp_data_list_coupon,
              loadingCustomer: false
            });
            this.changeDiscount();
          }
        } else {
          alert(_coupon_not_found[this.state.languageIndex]);
          this.setState({
            couponSearchKey: "",
            //dataCoupon: result.data,
            //listCouponUsage: temp_data_list_coupon,
            loadingCustomer: false
          });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({
          refreshing: false,
          loading: this.state.payment_method_done ? false : true,
          loadingCustomer: false,
          listCustomer: []
          //maxPage: result.last_page
        });
      });
  }

  getListCustomer(page = 1) {
    this.setState({ loadingCustomer: true });

    const gerai_id = this.state.userInfo.gerai_id;

    let search_string = "";
    if (this.state.searchKey !== "") {
      search_string = `&name=${this.state.searchKey}`;
    }

    const uri = `${BE_Customer}?page=1&per_page=999${search_string}`;
    //console.log("getListCustomerrrr URI ==> ", uri);
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        //console.log("responseJSON GET CUSTOMER ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          if (page === 1) {
            this.setState({
              listCustomer: resultData,
              maxPage: result.pagination.total_page,
              refreshing: false,
              loadingCustomer: false
            });

            if (this.state.customer_id !== 0) {
              // auto select customer
              resultData.map((v, i) => {
                if (this.state.customer_id === v.id) {
                  console.log("NEW CUSTOMER SELECTED ==> ", v.id);
                  this.setState({
                    selectedCustomerData: v,
                    selectedCustomer: v.id,
                    selectedCustomerName: v.name,
                    formCustomer: v.name,
                    formPhone: v.phone_number,
                    formEmail: v.email,
                    points_available: v.points,
                    saldo_available: v.Customer_Account
                      ? v.Customer_Account.saldo_amount
                      : 0
                  });
                }
              });
            }
          } else {
            let tempData = this.state.listCustomer;
            let dataCombi = [...tempData, ...resultData];
            console.log("temp dataCombi ", page, " ==> ", dataCombi);

            this.setState({
              listCustomer: dataCombi,
              refreshing: false,
              loadingCustomer: false,
              maxPage: result.pagination.total_page
              //maxPage: result.last_page
            });

            if (this.state.customer_id !== 0) {
              // auto select customer
              dataCombi.map((v, i) => {
                if (this.state.customer_id === v.id) {
                  this.setState({
                    selectedCustomerData: v,
                    selectedCustomer: v.id,
                    selectedCustomerName: v.name,
                    formCustomer: v.name,
                    formPhone: v.phone_number,
                    formEmail: v.email,
                    points_available: v.points,
                    saldo_available: v.Customer_Account
                      ? v.Customer_Account.saldo_amount
                      : 0
                  });
                }
              });
            }
          }
        } else {
          this.setState({
            refreshing: false,
            loading: this.state.payment_method_done ? false : true,
            loadingCustomer: false,
            listCustomer: []
            //maxPage: result.last_page
          });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({
          refreshing: false,
          loading: this.state.payment_method_done ? false : true,
          loadingCustomer: false,
          listCustomer: []
          //maxPage: result.last_page
        });
      });
  }

  setPreviliges() {
    const { userInfo } = this.state;
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

      if (
        v.name === "commission_management" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_commission_management: true });
      }
    });

    this.setState({ privileges: privileges });
  }

  getPaymentMethodLastUpdate() {
    const uri = BE_Payment_Method + "/last-update";

    //console.log("BE_Payment_Method URI ===> ", BE_Payment_Method);

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
            if (responseJson.statusCode === 200) {
              // console.log("getPaymentMethodLastUpdate ==> ", responseJson.data[0]);
              const data = responseJson.data[0].updatedAt.toString();
              // OfflineMenuFunctions.SaveLastUpdatePaymentMethod(data, x => {});

              // OfflineMenuFunctions.GetLastUpdatePaymentMethod(data, x => {});

              let need_update = false;
              if (!this.state.last_update_payment_method) {
                need_update = true;
              }

              if (this.state.last_update_payment_method) {
                console.log("UPDATED TIME DB ===> ", data);
                console.log("UPDATED TIME LOCAL ===> ", this.state.last_update_payment_method);

                if (this.state.last_update_payment_method !== data) {
                  need_update = true;
                }
              }

              if (need_update) {
                console.log("getPayment Need Update");

                OfflineMenuFunctions.SaveLastUpdatePaymentMethod(data, x => {});
                this.getPaymentMethod();
              } else {
                console.log("getPaymentOffline 1");
                // this.getPaymentOffline();
                this.getPaymentMethod();

              }

              // console.log("getPaymentMethodLastUpdate LAst Update ==> ", responseJson.data[0].updatedAt.toString());
            }
          })
          .catch(_err => {
            console.log("ERR payment ==> ", _err);
            this.setState({
              loading: false
            });
          });
      } else {
        console.log("getPaymentOffline 2");
        // this.getPaymentOffline();
        this.getPaymentMethod();


        //   OfflineMenuFunctions.GetPaymentType(val => {
        //     console.log("GetPayment Offline ==> ", val);
        //     //this.setState({ lastUpdate: val });
        //     if (val) {
        //       let resultData = val;
        //       let cash = {};
        //       let wallet = [];
        //       let card = [];
        //       resultData.map((v, i) => {
        //         const v_payment_method = v.Payment_Method_Type;
        //         if (
        //           v_payment_method.id === 1 ||
        //           v_payment_method.name === "E-Wallet"
        //         ) {
        //           wallet.push(v);
        //         }
        //         if (
        //           v_payment_method.id === 3 ||
        //           v_payment_method.name === "Cash"
        //         ) {
        //           cash = v;
        //         }
        //         if (
        //           v_payment_method.id === 2 ||
        //           v_payment_method.name === "Debit/Credit"
        //         ) {
        //           card.push(v);
        //         }
        //         // console.log("cash ==> ", cash);
        //         // console.log("wallet ==> ", wallet);
        //         // console.log("card ==> ", card);
        //         this.setState({
        //           payment_method_cash: cash,
        //           payment_method_wallet: wallet,
        //           payment_method_card: card
        //           //loading: false
        //         });
        //       });
        //     }
        //     // this.setState({
        //     //   dataOfflineAddons: val
        //     // });
        //   });
      }
    });
  }

  getPaymentMethod(retry = 0) {
    const uri = BE_Payment_Method + "?page=1&per_page=999";

    console.log("BE_Payment_Method URI ===> ", BE_Payment_Method);

    NetInfo.fetch().then(state => {
      // if (state.isConnected) {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            // let result = responseJson;
            // let resultData = result.data;

            let result = responseJson;
            console.log("BE_Payment_Method ==> ", responseJson.statusCode);

            console.log("BE_Payment_Method check 1 ==> ", responseJson.statusCode === 200);



            let cash = {};
            let wallet = [];
            let card = [];
            if (result.statusCode === 200) {


              console.log("BE_Payment_Method check 2 ==> ", responseJson.statusCode === 200);

 
              let resultData = result.data;
              console.log("BE_Payment_Method check resultData ==> ", resultData);

              OfflineMenuFunctions.SavePaymentMethod(resultData, x => {});

              resultData.map((v, i) => {
                // console.log("looping  ==> ", i);

                // console.log("resultData ==> ", v);

                const v_payment_method = v.Payment_Method_Type;
                if (
                  v_payment_method.id === 1 ||
                  v_payment_method.name === "E-Wallet"
                ) {
                  if (v.status === "active") {
                    if (v.cz_allow) {
                      if (this.state.cz_invalid) {
                    wallet.push(v);

                      } else {
                        wallet.push(v);
                      }
                    } else {
                      wallet.push(v);
                    }
                  }
                }

                if (
                  v_payment_method.id === 3 ||
                  v_payment_method.name === "Cash"
                ) {
                  if (v.status === "active") {
                    cash = v;
                  }
                }

                if (
                  v_payment_method.id === 2 ||
                  v_payment_method.name === "Debit/Credit"
                ) {
                  // if (v.status === "active") {
                  //   card.push(v);
                  // }

                  if (v.status === "active") {
                    if (v.cz_allow) {
                      if (this.state.cz_invalid) {
                      } else {
                        card.push(v);
                      }
                    } else {
                      card.push(v);
                    }
                  }
                }

                // console.log("cash ==> ", cash);
                // console.log("wallet ==> ", wallet);
                // console.log("card ==> ", card);

                this.setState({
                  payment_method_cash: cash,
                  payment_method_wallet: wallet,
                  payment_method_card: card,
                  payment_method_done: true,
                  loading: false
                });
              });
            } else {
              if (retry < 3)
              {
                let retry_number = parseInt(retry) + 1;
                this.getPaymentMethod(retry_number);
      
              }
              // OfflineMenuFunctions.SavePaymentMethod([], x => {});
              // this.setState({
              //   payment_method_cash: [],
              //   payment_method_wallet: [],
              //   payment_method_card: []
              //   //loading: false
              // });
            }
            this.setState({
              //loading: false
            });
          })
          .catch(_err => {
            console.log("ERR ==> ", _err);
            this.setState({
              //loading: false
            });
          });
      } else {
        if (retry < 3)
        {
          let retry_number = parseInt(retry) + 1;
          this.getPaymentMethod(retry_number);

        }
        //   OfflineMenuFunctions.GetPaymentType(val => {
        //     console.log("GetPayment Offline ==> ", val);
        //     //this.setState({ lastUpdate: val });
        //     if (val) {
        //       let resultData = val;
        //       let cash = {};
        //       let wallet = [];
        //       let card = [];
        //       resultData.map((v, i) => {
        //         const v_payment_method = v.Payment_Method_Type;
        //         if (
        //           v_payment_method.id === 1 ||
        //           v_payment_method.name === "E-Wallet"
        //         ) {
        //           wallet.push(v);
        //         }
        //         if (
        //           v_payment_method.id === 3 ||
        //           v_payment_method.name === "Cash"
        //         ) {
        //           cash = v;
        //         }
        //         if (
        //           v_payment_method.id === 2 ||
        //           v_payment_method.name === "Debit/Credit"
        //         ) {
        //           card.push(v);
        //         }
        //         // console.log("cash ==> ", cash);
        //         // console.log("wallet ==> ", wallet);
        //         // console.log("card ==> ", card);
        //         this.setState({
        //           payment_method_cash: cash,
        //           payment_method_wallet: wallet,
        //           payment_method_card: card
        //           //loading: false
        //         });
        //       });
        //     }
        //     // this.setState({
        //     //   dataOfflineAddons: val
        //     // });
        //   });
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    this.disableIntervalCZ();
    this.setState({ mount: false });
    Actions.refresh({
      refresh: true
    });
  }

  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      ColorFunctions.GetColor(val => {
        if (val !== 0 && this.state.colorIndex === 0) {
          this.setState({ colorIndex: val });
        }
      });

      // CZFunctions.GetCZResponse(val => {
      //   if (val) {
      //     this.setState({ cz_response_uri: val });
      //   }
      // });

      // CZFunctions.GetCZURI(val => {
      //   if (val) {
      //     console.log("CZ URI GET ===> ", val);

      //     this.setState({ cz_uri: val });
      //   }
      // });

      PrinterFunctions.GetLanguage(val => {
        if (val !== null) {
          this.setState({ languageIndex: val });
        }
      });
    }
  }

  onBackPress = () => {
    if (this.state.loadingReader) {
      this.setState({ loadingReader: false, loading: false });
    } else {
      console.log("BackPress");
      this.setState({ mount: false });
      Actions.pop();

      if (this.state.direct_payment) {
        Actions.pop();
      }

      //this.props.onBackPress();
    }

    return true;
  };

  getPrinterData() {
    PrinterFunctions.GetKitchenPrinter(val => {
      if (val) {
        //console.log("Printer Kitchen ==> ", val);
        this.setState({ printer_kitchen: val });
        setTimeout(() => {
          this.connect(val.address);
          setTimeout(() => {}, 500);
        }, 2500);
      } else {
        PrinterFunctions.GetMainPrinter(val2 => {
          if (val2) {
            PrinterFunctions.SaveKitchenPrinter(val2, val => {});
            //console.log("Main Kitchen ==> ", val);
            this.setState({ printer_kitchen: val2 });
            setTimeout(() => {
              this.connect(val2.address);
              setTimeout(() => {}, 500);
            }, 2500);
          }
        });
      }
    });

    PrinterFunctions.GetPrintType(val => {
      if (val) {
        //console.log("GetPrintType ==> ", val);
        this.setState({ printType: val });
      }
    });

    PrinterFunctions.GetPrinter2(val => {
      if (val) {
        //console.log("Printer 2 ==> ", val);
        this.setState({ printer2: val });
      }
    });

    PrinterFunctions.GetLabelPrinter(val => {
      if (val) {
        console.log("Printer Label ==> ", val);
        this.setState({ printer_label: val });
      }
    });

    PrinterFunctions.GetPrinter3(val => {
      if (val) {
        //console.log("Printer 2 ==> ", val);
        this.setState({ printer3: val });
      }
    });

    PrinterFunctions.GetManualPrint(val => {
      if (val) {
        console.log("Get manual_print ==> ", val);
        this.setState({ manual_print: val });
      }
    });

    PrinterFunctions.GetManualPrintCashlez(val => {
      if (val) {
        console.log("Get manual_print_cashlez ==> ", val);
        this.setState({ manual_print_cashlez: val });
      }
    });

    PrinterFunctions.GetMainPrinter(val => {
      if (val) {
        //console.log("Main Kitchen ==> ", val);
        this.setState({ printer_main: val });

        this.connect(val.address);
        setTimeout(() => {}, 500);
      }
    });

    PrinterFunctions.GetFooterPrinter(val => {
      if (val) {
        //console.log("Footer Printer ==> ", val);
        this.setState({ footer_printer: val });
      }
    });

    PrinterFunctions.GetURLPrinter(val => {
      if (val) {
        //console.log("URL Printer ==> ", val);
        this.setState({ url_printer: val });
      }
    });

    PrinterFunctions.GetSettingPrintLogo(val => {
      if (val) {
        this.setState({ setting_print_logo: val });
      }
    });

    PrinterFunctions.GetSettingPrintQR(val => {
      if (val) {
        this.setState({ setting_print_qr: val });
      }
    });

    // PrinterFunctions.GetShowOrderIDPrinter(val => {
    //   if (val) {
    //     console.log("Show Order Id Printer ==> ", val);
    //     this.setState({ show_order_id: val });
    //   }
    // });
  }

  changeDiscount() {
    const {
      promoAutomatic,
      bill_subTotal,
      rate_discount,
      amount_discount,
      rate_services,
      rate_tax,
      customPriceTax,
      customPriceFinal,
      customPrice,
      selectedDiscount,
      voucherAmount,
      voucherType,
      automaticPromoAmount,
      automaticPromoRate,
      grandTotal,
      grandTotalDefault,
      loyaltyPromoSettings,
      points_available,
      usePoints,
      customerVoucherAmount,
      customerVoucherType,
      customerVoucherLimit,
      payment_delivery,
      customer_level_discount
    } = this.state;

    this.setState({ loading: true });

    let print_voucher = 0;
    let print_voucher_customer = 0;
    let print_discount = 0;
    let print_automatic = 0;

    // console.log("loyaltyPromoSettings ===> ", loyaltyPromoSettings);
    let loyal_status = loyaltyPromoSettings ? loyaltyPromoSettings.status : "";
    let loyal_type = loyaltyPromoSettings
      ? loyaltyPromoSettings.type
      : "currency";
    // console.log("loyal_status ===> ", loyal_status);
    // console.log("loyal_type ===> ", loyal_type);
    //const loyal_type = "currency";
    const loyal_value = loyaltyPromoSettings ? loyaltyPromoSettings.value : 0;
    //const loyal_value = 5;
    let total_discount_rate = rate_discount;

    // console.log("total_discount_rate 1 ===> ", total_discount_rate);

    let points_used = 0;
    // console.log("rate_discount ===> ", rate_discount);
    // console.log("change discount amount_discount ===> ", amount_discount);
    // console.log("change discount voucherAmount ===> ", voucherAmount);

    // console.log("usePoints ===> ", usePoints);
    // console.log("points_available ===> ", points_available);
    let additional_loyal_currency = 0;

    let discount_membership = 0;

    //customer_level_discount

    if (
      loyal_status === "active" &&
      points_available > 0 &&
      usePoints === true
    ) {
      if (loyal_type === "percentage") {
        let loyal_rate = loyal_value / 100;

        // console.log("loyal_value ===> ", loyal_value);

        // console.log("loyal_rate ===> ", loyal_rate);

        let max_points_used = Math.ceil((1 - rate_discount) / loyal_rate);

        points_used = max_points_used;

        // console.log("max_points_used ===> ", max_points_used);

        if (max_points_used > points_available) {
          points_used = points_available;
        }

        // console.log("points_used ===> ", points_used);
        // parseFloat(rate).toFixed(2);
        total_discount_rate = total_discount_rate + loyal_rate * points_used;
        if (total_discount_rate > 1) {
          total_discount_rate = 1;
        }

        // console.log("total_discount_rate ===> ", total_discount_rate);
      } else {
        let max_points_used = Math.ceil(grandTotalDefault / loyal_value);

        // console.log("currency max point used ===> ", max_points_used);

        points_used = max_points_used;

        if (max_points_used > points_available) {
          points_used = points_available;
        }

        // console.log("currency points_used ===> ", points_used);

        additional_loyal_currency = points_used * loyal_value;

        // console.log(
        //   "additional_loyal_currency ===> ",
        //   additional_loyal_currency
        // );
      }
    }

    // let sub_total = bill_subTotal;

    // sub_total = sub_total - automaticPromoAmount;

    // sub_total = sub_total * (automaticPromoRate / 100);

    const old_grandTotal = grandTotalDefault;

    let new_bill_subTotal = 0;

    let automatic_discount = 0;

    //automaticPromoAmount dikali sama rate tax + service

    new_bill_subTotal =
      bill_subTotal +
      customPriceFinal -
      (automaticPromoAmount + amount_discount) -
      additional_loyal_currency;

    automatic_discount =
      automatic_discount +
      (automaticPromoAmount + amount_discount) +
      additional_loyal_currency;

    if (total_discount_rate === 0) {
      print_discount = amount_discount;
    } else {
      print_discount = total_discount_rate * new_bill_subTotal;
    }

    automatic_discount =
      automatic_discount + new_bill_subTotal * (automaticPromoRate / 100);

    print_automatic = automatic_discount;

    new_bill_subTotal = new_bill_subTotal * (1 - automaticPromoRate / 100);

    //const discount_add = parseInt(automatic_discount * (rate_tax + rate_services))

    // console.log(
    //   "automaticPromoAmount calculate discount ==> ",
    //   automaticPromoAmount
    // );

    // console.log(
    //   "automatic_discount calculate discount ==> ",
    //   automatic_discount
    // );

    //console.log("automaticPromoRate ==> ", automaticPromoRate);
    //console.log("calculate discount bill_subTotal ===> ", bill_subTotal);
    // console.log(
    //   "calculate discount new_bill_subTotal ===> ",
    //   new_bill_subTotal
    // );
    // console.log(
    //   "calculate discount automatic_discount ===> ",
    //   parseInt(automatic_discount * (rate_tax + rate_services))
    // );
    //console.log("calculate discount rate_tax ===> ", rate_tax);
    //console.log("calculate discount rate_service ===> ", rate_services);

    let grand_total = 0;

    let bill_discount = 0;

    let bill_discount_customer = 0;

    let membership_discount_rate = 0;

    if (customer_level_discount > 0) {
      membership_discount_rate = customer_level_discount / 100;
      console.log("membership_discount ===>", membership_discount_rate);
    }

    //console.log("voucherType ===> ", voucherType);

    if (voucherType === "currency") {
      if (this.state.currencyAllowDecimal) {
        bill_discount = parseFloat(
          total_discount_rate * (new_bill_subTotal - voucherAmount) +
            voucherAmount
        );

        print_voucher = voucherAmount;
      } else {
        bill_discount = parseInt(
          total_discount_rate * (new_bill_subTotal - voucherAmount) +
            voucherAmount
        );
        print_voucher = voucherAmount;
      }
    } else {
      // bill_discount = parseInt(rate_discount * bill_subTotal);
      // bill_discount = parseInt(voucherAmount * (bill_subTotal - bill_discount));

      let rate = (1 - total_discount_rate) * (1 - voucherAmount);
      total_discount_rate = 1 - parseFloat(rate).toFixed(2);
      // console.log("RATE ===> ", rate);
      // console.log("rate_discount ===> ", total_discount_rate);
      // console.log("voucherAmount ===> ", voucherAmount);
      if (this.state.currencyAllowDecimal) {
        bill_discount = parseFloat((1 - rate).toFixed(2) * new_bill_subTotal);
        print_voucher = voucherAmount * new_bill_subTotal;
      } else {
        bill_discount = parseInt((1 - rate).toFixed(2) * new_bill_subTotal);
        print_voucher = voucherAmount * new_bill_subTotal;
      }
    }

    //voucher customer

    console.log("customerVoucherAmount ===> ", customerVoucherAmount);

    if (customerVoucherType === "amount") {
      if (this.state.currencyAllowDecimal) {
        bill_discount =
          bill_discount +
          parseFloat(
            total_discount_rate * (new_bill_subTotal - customerVoucherAmount) +
              customerVoucherAmount
          );

        print_voucher_customer = customerVoucherAmount;
        print_voucher = print_voucher + print_voucher_customer;
      } else {
        bill_discount =
          bill_discount +
          parseInt(
            total_discount_rate * (new_bill_subTotal - customerVoucherAmount) +
              customerVoucherAmount
          );
        print_voucher_customer = customerVoucherAmount;
        print_voucher = print_voucher + print_voucher_customer;
      }
    } else {
      // bill_discount = parseInt(rate_discount * bill_subTotal);
      // bill_discount = parseInt(voucherAmount * (bill_subTotal - bill_discount));

      let rate = (1 - total_discount_rate) * (1 - customerVoucherAmount);
      total_discount_rate = 1 - parseFloat(rate).toFixed(2);

      // console.log("RATE ===> ", rate);
      // console.log("rate_discount ===> ", total_discount_rate);
      // console.log("voucherAmount ===> ", voucherAmount);
      if (this.state.currencyAllowDecimal) {
        print_voucher_customer = voucherAmount * new_bill_subTotal;
        print_voucher = print_voucher + print_voucher_customer;

        if (customerVoucherLimit) {
          if (print_voucher_customer > customerVoucherLimit) {
            bill_discount = bill_discount + customerVoucherLimit;
            print_voucher_customer = customerVoucherLimit;
          } else {
            bill_discount =
              bill_discount +
              parseFloat((1 - rate).toFixed(2) * new_bill_subTotal);
          }
        }
      } else {
        bill_discount =
          bill_discount + parseInt((1 - rate).toFixed(2) * new_bill_subTotal);
        print_voucher_customer = voucherAmount * new_bill_subTotal;
        print_voucher = print_voucher + print_voucher_customer;
      }
    }

    //console.log("bill_discount ==> ", bill_discount);
    let total_membership_discount = 0;
    //calculate discount membership
    console.log("total_discount_rate ========> ", total_discount_rate);

    if (membership_discount_rate !== 0) {
      console.log(
        "membership_discount_rate ========> ",
        membership_discount_rate
      );

      // console.log("bill_discount before ===> ", bill_discount);

      // let temp = total_discount_rate === 1 ? 1 : parseFloat(1 - total_discount_rate).toFixed(2);

      // let rate = (1 - total_discount_rate) * (1 - membership_discount_rate);
      // let rate_membership = parseFloat(total_discount_rate * (1 - membership_discount_rate).toFixed(2));

      // if (total_discount_rate === 0)
      // {
      //   total_discount_rate = 0;
      // }

      total_discount_rate = parseFloat(total_discount_rate).toFixed(2);

      // let temp1 =  1 - total_discount_rate

      console.log(
        "rateeeeee ========> ",
        (1 - total_discount_rate) * membership_discount_rate
      );

      // total_discount_rate = rate_membership;

      total_membership_discount =
        (1 - total_discount_rate) *
        membership_discount_rate *
        new_bill_subTotal;

      console.log("total_membership_discount ===> ", total_membership_discount);

      // total_membership_discount = parseInt(
      //   membership_discount_rate.toFixed(2) * new_bill_subTotal
      // );
      // total_membership_discount =
      //  parseFloat((1 - rate).toFixed(2) * new_bill_subTotal);

      // total_membership_discount =
      //  parseFloat(((membership_discount_rate * rate_membership)).toFixed(2) * new_bill_subTotal);

      bill_discount = bill_discount + total_membership_discount;

      // console.log("bill_discount after ===> ", bill_discount);
    }

    let bill_services = 0;
    if (this.state.currencyAllowDecimal) {
      bill_services = parseFloat(
        rate_services * (new_bill_subTotal - bill_discount)
      );
    } else {
      bill_services = parseInt(
        rate_services * (new_bill_subTotal - bill_discount)
      );
    }

    let bill_tax = 0;

    if (this.state.currencyAllowDecimal) {
      bill_tax = parseFloat(rate_tax * (new_bill_subTotal - bill_discount));
    } else {
      bill_tax = parseInt(rate_tax * (new_bill_subTotal - bill_discount));
    }

    // console.log("bill_services ====> ", bill_services);
    // console.log("bill_tax ====> ", bill_tax);

    if (this.state.currencyAllowDecimal) {
      grand_total = parseFloat(
        new_bill_subTotal + bill_services + bill_tax - bill_discount
      );
    } else {
      grand_total = parseInt(
        new_bill_subTotal + bill_services + bill_tax - bill_discount
      );
    }

    // if (customPriceTax === true)
    // {
    //   grand_total = parseInt(grand_total) + parseInt(customPriceFinal);
    // }
    // else
    // {
    //   grandTotal = parseInt(grandTotal) + parseInt(customPriceFinal);
    // }

    let new_bill_discount = 0;
    new_bill_discount = bill_discount + automatic_discount;

    // console.log("old_grandTotal calculate ===> ", old_grandTotal);
    // console.log("grand_total calculate ===> ", grand_total);
    // console.log("new_bill_discount calculate 1 ===> ", new_bill_discount);

    // console.log("new_bill_discount grand_total ===> ", grand_total);

    // console.log("new_bill_discount old_grandTotal ===> ", old_grandTotal);

    // ini kenapa ya?
    // if (new_bill_discount > old_grandTotal) {
    //   new_bill_discount = old_grandTotal + automatic_discount;
    // }

    // console.log("new_bill_discount calculate ===> ", new_bill_discount);

    // let grandTotalRound = parseInt(Math.round(grand_total / 100)) * 100;
    // let grandTotalRound = parseInt(Math.round(grand_total / 100)) * 100;

    //console.log("final points used ===> ", points_used);

    //console.log("grandTotal calculate ==> ", grand_total);

    let couponAmount =
      parseFloat(this.state.couponAmount) > grand_total
        ? grand_total
        : parseFloat(this.state.couponAmount);

    let grandTotalRound =
      grand_total + parseFloat(payment_delivery) - couponAmount;
    let grandTotalBeforeCoupon = grandTotalRound + couponAmount;
    // if (this.state.currencyAllowDecimal) {
    //   grandTotalRound = parseFloat(Math.ceil(grand_total / 100)) * 100;
    // } else {
    //   grandTotalRound = parseInt(Math.ceil(grand_total / 100)) * 100;
    // }

    if (this.state.currencyAllowDecimal) {
      let num = grandTotalRound;
      let int_num = parseInt(num);
      let comma_num = num - int_num;
      comma_num = Math.round(comma_num * 100);
      //console.log("comma_num ===> ", comma_num);

      if (comma_num === 0) {
      } else {
        grandTotalRound = parseFloat(int_num) + parseFloat(comma_num / 100);
        grandTotalBeforeCoupon =
          parseFloat(int_num) +
          parseFloat(couponAmount) +
          parseFloat(comma_num / 100);
      }
    }

    console.log(
      "grandTotalBeforeCoupon change discount ===> ",
      grandTotalBeforeCoupon
    );

    // console.log("grandTotalRound calculate discount ===> ", grandTotalRound);
    // console.log("total_membership_discount ===> ", total_membership_discount);

    this.setState({
      grandTotal: grandTotalRound > 0 ? grandTotalRound : 0,
      grandTotalBeforeCoupon:
        grandTotalBeforeCoupon > 0 ? grandTotalBeforeCoupon : 0,
      grandTotalRound: grandTotalRound > 0 ? grandTotalRound : 0,
      total_membership_discount: total_membership_discount,
      bill_discount: new_bill_discount,
      points_used: points_used,
      loading: false,
      print_voucher: print_voucher,
      print_discount: print_discount,
      print_automatic: print_automatic,
      print_voucher_customer: print_voucher_customer

      // bill_discount: new_bill_discount > grand_total ? grand_total : new_bill_discount,
    });
    this.changeCustomPrice();
  }

  changeCustomPrice() {
    let {
      customPrice,
      customPriceFinal,
      customPriceOld,
      customPriceTax,
      customPriceTaxOld,
      grandTotal,
      rate_tax,
      rate_discount,
      rate_services,
      bill_tax,
      bill_services
    } = this.state;

    //grandTotal = grandTotal - customPrice;

    // console.log("grandTotal ==> ", grandTotal);
    // console.log("customPrice ==> ", customPrice);
    // console.log("customPriceOld ==> ", customPriceOld);
    // console.log("customPriceTax ==> ", customPriceTax);
    // console.log("customPriceTaxOld ==> ", customPriceTaxOld);

    if (customPriceOld === 0) {
      if (customPriceTax === true) {
        if (this.state.currencyAllowDecimal) {
          customPriceFinal = parseFloat(customPrice);
          grandTotal = parseFloat(grandTotal) + parseFloat(customPriceFinal);
        } else {
          customPriceFinal = parseInt(customPrice);
          grandTotal = parseInt(grandTotal) + parseInt(customPriceFinal);
        }
      } else {
        // customPriceFinal =
        //   parseInt(customPrice) + parseInt(customPrice) * rate_tax +
        //   parseInt(customPrice) * rate_services -
        //   parseInt(customPrice) * rate_discount;

        if (this.state.currencyAllowDecimal) {
          customPriceFinal =
            parseFloat(customPrice) *
            (parseFloat(1) +
              parseFloat(rate_tax) +
              parseFloat(rate_services) -
              parseFloat(rate_discount));
          //console.log("customPriceFinal false ==> ", customPriceFinal);

          grandTotal = parseFloat(grandTotal) + parseFloat(customPriceFinal);
        } else {
          customPriceFinal =
            parseInt(customPrice) *
            (parseFloat(1) +
              parseFloat(rate_tax) +
              parseFloat(rate_services) -
              parseFloat(rate_discount));
          //console.log("customPriceFinal false ==> ", customPriceFinal);

          grandTotal = parseInt(grandTotal) + parseInt(customPriceFinal);
        }
        //console.log("grandTotal false ==> ", grandTotal);
      }

      if (customPriceTax === false) {
        if (this.state.currencyAllowDecimal) {
          bill_tax = bill_tax + parseFloat(customPrice) * parseFloat(rate_tax);
          bill_services =
            bill_services + parseFloat(customPrice) * parseFloat(rate_services);
        } else {
          bill_tax = bill_tax + parseInt(customPrice) * parseFloat(rate_tax);
          bill_services =
            bill_services + parseInt(customPrice) * parseFloat(rate_services);
        }
      }
    } else if (
      customPriceOld !== customPrice ||
      customPriceTaxOld !== customPriceTax
    ) {
      //has any change
      console.log("has any change");
      if (customPriceTax === true) {
        if (this.state.currencyAllowDecimal) {
          customPriceFinal = parseFloat(customPrice);
          grandTotal =
            parseFloat(grandTotal) -
            parseFloat(this.state.customPriceFinal) +
            parseFloat(customPriceFinal);
        } else {
          customPriceFinal = parseInt(customPrice);
          grandTotal =
            parseInt(grandTotal) -
            parseInt(this.state.customPriceFinal) +
            parseInt(customPriceFinal);
        }
        //console.log("customPriceFinal true ==> ", customPriceFinal);

        //console.log("grandTotal true ==> ", grandTotal);
      } else {
        // customPriceFinal =
        //   parseInt(customPrice) + parseInt(customPrice) * rate_tax +
        //   parseInt(customPrice) * rate_services -
        //   parseInt(customPrice) * rate_discount;

        if (this.state.currencyAllowDecimal) {
          customPriceFinal =
            parseFloat(customPrice) *
            (parseFloat(1) +
              parseFloat(rate_tax) +
              parseFloat(rate_services) -
              parseFloat(rate_discount));

          grandTotal =
            parseFloat(grandTotal) -
            parseFloat(this.state.customPriceFinal) +
            parseFloat(customPriceFinal);
        } else {
          customPriceFinal =
            parseInt(customPrice) *
            (parseFloat(1) +
              parseFloat(rate_tax) +
              parseFloat(rate_services) -
              parseFloat(rate_discount));

          grandTotal =
            parseInt(grandTotal) -
            parseInt(this.state.customPriceFinal) +
            parseInt(customPriceFinal);
        }
        //console.log("customPriceFinal false ==> ", customPriceFinal);

        // let customPriceOldWithTax =
        //   parseInt(customPriceOld) *
        //   (parseFloat(1) +
        //     parseFloat(rate_tax) +
        //     parseFloat(rate_services) -
        //     parseFloat(rate_discount));

        //console.log("grandTotal false ==> ", grandTotal);
      }

      if (customPriceTax === false) {
        if (this.state.currencyAllowDecimal) {
          bill_tax = bill_tax + parseFloat(customPrice) * parseFloat(rate_tax);
          bill_services =
            bill_services + parseFloat(customPrice) * parseFloat(rate_services);
        } else {
          bill_tax = bill_tax + parseInt(customPrice) * parseFloat(rate_tax);
          bill_services =
            bill_services + parseInt(customPrice) * parseFloat(rate_services);
        }
      }
    } else if (
      customPriceOld === customPrice &&
      customPriceTaxOld === customPriceTax
    ) {
      //console.log("has no change");
      //No Change
    }

    // let grandTotalRound = parseInt(Math.ceil(grandTotal / 100)) * 100;

    let grandTotalRound = grandTotal;

    let couponAmount =
      parseFloat(this.state.couponAmount) > grandTotal
        ? grandTotal
        : parseFloat(this.state.couponAmount);

    let grandTotalBeforeCoupon = grandTotal + couponAmount;

    if (this.state.currencyAllowDecimal) {
      let num = grandTotalRound;
      let int_num = parseInt(num);
      let comma_num = num - int_num;
      comma_num = Math.round(comma_num * 100);
      //console.log("comma_num ===> ", comma_num);

      if (comma_num === 0) {
      } else {
        grandTotalRound = parseFloat(int_num) + parseFloat(comma_num / 100);
        grandTotalBeforeCoupon =
          parseFloat(int_num) +
          parseFloat(couponAmount) +
          parseFloat(comma_num / 100);
      }
    }

    // console.log("grandTotalRound change custom ===> ", grandTotalRound);

    this.setState({
      grandTotal: grandTotalRound,
      // grandTotalBeforeCoupon: grandTotalBeforeCoupon,
      grandTotalRound: grandTotalRound,
      customPriceFinal: customPriceFinal,
      customPriceOld: customPrice,
      customPriceTaxOld: customPriceTax,
      showCustom: false,
      bill_tax: bill_tax,
      bill_services: bill_services
    });
  }

  setInformation() {
    const {
      data_order,
      userInfo,
      rate_discount,
      rate_services,
      rate_tax
    } = this.state;
    const { dataBill, dataOrder } = this.props;
    //console.log("setInformation ==> data order ==> ", data_order);

    //console.log("setInformation ==> dataBill ==> ", dataBill);

    let data_temp =
      moment(new Date()).format("YY/MM/DD-HH/mm/ss") +
      "-" +
      this.state.userInfo.gerai_id;

    let table_id = data_order.table_id ? data_order.table_id : 0;
    let alamat = userInfo.address ? userInfo.address : "";
    let cashier = userInfo.name ? userInfo.name : "";
    let transId = this.state.bill_transId ? this.state.bill_transId : data_temp;

    const data_post_1 = {
      retail_id: dataOrder.retail_id,
      gerai_id: dataOrder.gerai_id,
      time: dataOrder.created_at,
      booking_id: dataOrder.booking_id,
      customer_id: dataOrder.customer_id,
      table_id: dataOrder.table_id,
      cashier_id: dataOrder.cashier_id,
      detail: dataBill,
      kode: dataOrder.notes
    };

    this.setState({ data_post_1: data_post_1 });

    let subTotal = 0;

    let points = 0;

    //console.log("dataBill ===> ", dataBill);

    dataBill.map((v, i) => {
      // subTotal = subTotal + v.qty * v.price;
      // subTotal = subTotal + v.qty * v.salesTypeValue;

      const total = v.total ? v.total : v.price_total;

      if (this.state.currencyAllowDecimal) {
        // console.log(
        //   "calculate allow decimal subTotal ===> ",
        //   parseFloat(subTotal)
        // );
        // console.log("calculate allow decimal total ===> ", parseFloat(total));
        // console.log(
        //   "calculate allow decimal calculate ===> ",
        //   parseFloat(subTotal) + parseFloat(total)
        // );

        subTotal = parseFloat(subTotal) + parseFloat(total);
      } else {
        subTotal = subTotal + parseInt(total);
      }

      if (v.product) {
        if (v.product.Loyalty_Promo) {
          let quantity = v.qty ? v.qty : v.quantity;
          points = points + v.product.Loyalty_Promo.point * quantity;
        }
      }
    });

    // console.log("subTotal ===> ", subTotal);
    // console.log("points ===> ", points);

    // console.log("rate_discount ===> ", rate_discount);
    // console.log("rate_services ===> ", rate_services);
    // console.log("rate_tax ===> ", rate_tax);

    const withTax = this.props.withTax;
    const withServices = this.props.withServices;

    let rateTax = rate_tax;
    let rateService = rate_services;

    if (withTax === false) {
      rateTax = 0;
    }

    if (withServices === false) {
      rateService = 0;
    }

    // console.log("rateTax ==> ", rateTax);
    // console.log("rateService ==> ", rateService);

    // console.log("this.props.withTax ==> ", this.props.withTax);
    // console.log("this.props.withServices ==> ", this.props.withServices);

    let grand_total = 0;
    let bill_discount = 0;
    let bill_services = 0;
    let bill_tax = 0;

    if (this.state.currencyAllowDecimal) {
      bill_discount = parseFloat(rate_discount * subTotal);
      bill_services = parseFloat(rateTax * subTotal);
      bill_tax = parseFloat(rateService * subTotal);
      grand_total = parseFloat(
        subTotal + bill_services + bill_tax - bill_discount
      );
    } else {
      bill_discount = parseInt(rate_discount * subTotal);
      bill_services = parseInt(rateTax * subTotal);
      bill_tax = parseInt(rateService * subTotal);
      grand_total = parseInt(
        subTotal + bill_services + bill_tax - bill_discount
      );
    }
    //console.log("Grand Total Set Information ==> ", grand_total);
    //let grandTotalRound = parseInt(Math.ceil(grand_total / 100)) * 100;

    let couponAmount =
      parseFloat(this.state.couponAmount) > grand_total
        ? grand_total
        : parseFloat(this.state.couponAmount);
    let grandTotalRound = grand_total - couponAmount;
    let grandTotalBeforeCoupon = grandTotalRound + couponAmount;

    if (this.state.currencyAllowDecimal) {
      let num = grandTotalRound;
      let int_num = parseInt(num);
      let comma_num = num - int_num;
      comma_num = Math.round(comma_num * 100);
      // console.log("comma_num ===> ", comma_num);

      if (comma_num === 0) {
      } else {
        grandTotalRound = parseFloat(int_num) + parseFloat(comma_num / 100);
        grandTotalBeforeCoupon =
          parseFloat(int_num) +
          parseFloat(couponAmount) +
          parseFloat(comma_num / 100);
      }
    }

    console.log(
      "grandTotalBeforeCoupon set information ===> ",
      grandTotalBeforeCoupon
    );

    // console.log("grandTotalRound set information ===> ", grandTotalRound);

    // console.log("grandTotalRound points_gain ===> ", grandTotalRound);

    this.setState({
      bill_subTotal: subTotal,
      bill_alamat: alamat,
      bill_table_id: table_id,
      bill_transId: transId,
      bill_cashier: cashier,
      dataBill: this.props.dataBill,
      bill_discount: bill_discount,
      bill_tax: bill_tax,
      bill_services: bill_services,
      grandTotalDefault: grand_total,
      grandTotal: grandTotalRound + parseFloat(this.state.payment_delivery),
      rate_services: rateService,
      rate_tax: rateTax,
      grandTotalRound:
        grandTotalRound + parseFloat(this.state.payment_delivery),
      grandTotalBeforeCoupon:
        grandTotalBeforeCoupon + parseFloat(this.state.payment_delivery),
      points_gain: points,
      loading: false
    });
  }

  async connect(address = "00:0E:0E:02:93:45", times = 0) {
    BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          this.setState({
            //boundAddress: address
          });
          console.log("connect ==> ", s);
          //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
        },
        e => {
          this.setState({});
          //alert(e);

          // if (times > 3) {
          //   this.connect(address, parseInt(times + 1));
          // }
        }
      );
  }

  async printLabel(retry = 0) {
    try {
      console.log("print label 2");
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

      let time = moment(new Date()).format("DD/MM/YYYY");

      dataBill.map((data, index) => {
        let detail = data.detail ? data.detail : data.Transaction_Item_Addons;
        let detailString = "";
        //let total = data.qty * data.price + data.qty * data.salesTypeValue;
        let total = data.total;

        let salesType = data.salesTypeName
          ? data.salesTypeName
          : data.Sales_Type.name;

        if (salesType === "Booking") {
          salesType = "Dine-In";
        }

        detail.map((items, itemIndex) => {
          let itemName = items.name ? items.name : items.Addon.name;

          if (detailString === "") {
            detailString = itemName;
          } else {
            detailString = detailString + ", " + itemName;
          }
        });

        let product_name = data.name ? data.name : data.Product.name;

        let product_qty_number = data.qty
          ? Decimalize(data.qty)
          : Decimalize(data.quantity);
        let product_qty = product_qty_number.toString();

        if (product_qty.length === 1) {
          product_qty = product_qty + "";
        } else {
          product_qty = product_qty + "";
        }

        let price_space = "";
        let price_space_num = 0;

        let product_name_array = this.divideLongWord(product_name, z);

        if (printType === 2) {
          product_name_array = this.divideLongWord(product_name, 23 + 16);
        }

        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        let detail_array = this.divideLongWord(detailString, 30);
        let notes_array = this.divideLongWord(data.notes, 30);

        if (printType === 2) {
          detail_array = this.divideLongWord(detailString, 30 + 16);
          notes_array = this.divideLongWord(data.notes, 30 + 16);
        }

        let detail_length = detail_array.length;

        let notes_length = notes_array.length;

        if (length < 23) {
          prod_space_num = 23 - length;
        }

        if (printType === 2) {
          if (length < 23 + 16) {
            prod_space_num = 23 + 16 - length;
          }
        }

        for (var s = 0; s < prod_space_num; s++) {
          prod_space = prod_space + " ";
        }

        // BluetoothEscposPrinter.printText(
        //   `${product_name_first_line}${prod_space}${product_qty}${price_space}\n\r`,
        //   {}
        // );

        for (let i = 0; i < data.qty; i++) {
          item_num = item_num + 1;
          BluetoothEscposPrinter.printText(`${time}\n\r`, {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          });

          BluetoothEscposPrinter.printColumn(
            [40 + total_addition_name, 1, 1 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${product_name}`, ``, ``],
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );

          BluetoothEscposPrinter.printColumn(
            [40 + total_addition_name, 1, 1 + total_addition_price],
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

          if (salesType !== "") {
            BluetoothEscposPrinter.printColumn(
              [40 + total_addition_name, 1, 1 + total_addition_price],
              [
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.RIGHT
              ],
              [`${salesType}`, ``, ``],
              {
                encoding: "GBK",
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
              }
            );
          }

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
            //   {
            //     encoding: "GBK",
            //     codepage: 0,
            //     widthtimes: 0,
            //     heigthtimes: 0,
            //     fonttype: 1
            //   }
            // );

            BluetoothEscposPrinter.printColumn(
              [40 + total_addition_name, 1, 1 + total_addition_price],
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
              [40 + total_addition_name, 1, 1 + total_addition_price],
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

          // BluetoothEscposPrinter.printText(`\n\r`, {
          //   encoding: "GBK",
          //   codepage: 0,
          //   widthtimes: 0,
          //   heigthtimes: 0,
          //   fonttype: 1
          // });
          //BluetoothEscposPrinter.cutPaper();
        }
      });

      // dataBill.map((data, i) => {
      //   let status = "";

      //   if (data.status) {
      //     if (data.status === "on progress") {
      //       status = "On Progress";
      //     }
      //     if (data.status === "done") {
      //       status = "Done";
      //     }
      //   }

      //   if (status !== "") {
      //     if (status !== "Done") {
      //       //BluetoothEscposPrinter.printText(`${status}\n\r`, {});
      //     } else {
      //     }
      //   }

      //   let detail = data.detail;
      //   let detailString = "";
      //   //let total = data.qty * data.price + data.qty * data.salesTypeValue;
      //   let total = data.total;

      //   detail.map((items, itemIndex) => {
      //     if (detailString === "") {
      //       detailString = items.name;
      //     } else {
      //       detailString = detailString + ", " + items.name;
      //     }
      //   });

      //   let product_name = data.name;
      //   let product_price = total.toString();
      //   let product_price_length = product_price.length;

      //   let product_qty = data.qty.toString();

      //   if (product_qty.length === 1) {
      //     product_qty = product_qty + "x ";
      //   } else {
      //     product_qty = product_qty + "x";
      //   }

      //   let price_space = "";
      //   let price_space_num = 0;

      //   if (product_price_length < 8) {
      //     price_space_num = 8 - product_price_length;
      //   }
      //   for (var xx = 0; xx < price_space_num; xx++) {
      //     price_space = price_space + " ";
      //   }

      //   let product_name_array = this.divideLongWord(product_name, 23);
      //   let product_name_length = product_name_array.length;
      //   let product_name_first_line = product_name_array[0];
      //   let length = product_name_first_line.length;
      //   let prod_space = " ";
      //   let prod_space_num = 0;

      //   let detail_array = this.divideLongWord(detailString, 30);
      //   let detail_length = detail_array.length;

      //   let notes_array = this.divideLongWord(data.notes, 30);
      //   let notes_length = notes_array.length;

      //   if (length < 23) {
      //     prod_space_num = 23 - length;
      //   }

      //   for (var s = 0; s < prod_space_num; s++) {
      //     prod_space = prod_space + " ";
      //   }

      //   for (let i = 0; i < data.qty; i++) {
      //     if (true) {
      //       // BluetoothEscposPrinter.printText(
      //       //   `${product_name_first_line}${prod_space}${product_qty}${price_space}\n\r`,
      //       //   {}
      //       // );

      //       // BluetoothEscposPrinter.printColumn(
      //       //   [20 + total_addition_name, 1, 11 + total_addition_price],
      //       //   [
      //       //     BluetoothEscposPrinter.ALIGN.LEFT,
      //       //     BluetoothEscposPrinter.ALIGN.LEFT,
      //       //     BluetoothEscposPrinter.ALIGN.RIGHT
      //       //   ],
      //       //   [`${data.name}`, ``, `${product_qty}`],
      //       //   {}
      //       // );

      //       BluetoothEscposPrinter.printColumn(
      //         [30 + total_addition_name, 1, 1 + total_addition_price],
      //         [
      //           BluetoothEscposPrinter.ALIGN.LEFT,
      //           BluetoothEscposPrinter.ALIGN.LEFT,
      //           BluetoothEscposPrinter.ALIGN.RIGHT
      //         ],
      //         [`${data.name}`, ``, ``],
      //         {}
      //       );

      //       // for (var i = 1; i < product_name_length; i++) {
      //       //   BluetoothEscposPrinter.printText(
      //       //     `${product_name_array[i]}\n\r`,
      //       //     {}
      //       //   );
      //       // }

      //       // for (var j = 0; j < detail_length; j++) {
      //       //   BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
      //       // }
      //       // BluetoothEscposPrinter.printText(`${data.salesTypeName}\n\r`, {});

      //       BluetoothEscposPrinter.printColumn(
      //         [30 + total_addition_name, 1, 1 + total_addition_price],
      //         [
      //           BluetoothEscposPrinter.ALIGN.LEFT,
      //           BluetoothEscposPrinter.ALIGN.LEFT,
      //           BluetoothEscposPrinter.ALIGN.RIGHT
      //         ],
      //         [`${detailString}`, ``, ``],
      //         {}
      //       );

      //       BluetoothEscposPrinter.printColumn(
      //         [30 + total_addition_name, 1, 1 + total_addition_price],
      //         [
      //           BluetoothEscposPrinter.ALIGN.LEFT,
      //           BluetoothEscposPrinter.ALIGN.LEFT,
      //           BluetoothEscposPrinter.ALIGN.RIGHT
      //         ],
      //         [`${data.salesTypeName}`, ``, ``],
      //         {}
      //       );

      //       if (notes_length > 0) {
      //         // BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
      //         // for (var k = 0; k < notes_length; k++) {
      //         //   BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
      //         // }

      //         BluetoothEscposPrinter.printColumn(
      //           [30 + total_addition_name, 1, 1 + total_addition_price],
      //           [
      //             BluetoothEscposPrinter.ALIGN.LEFT,
      //             BluetoothEscposPrinter.ALIGN.LEFT,
      //             BluetoothEscposPrinter.ALIGN.RIGHT
      //           ],
      //           [`${_notes[this.state.languageIndex]}`, ``, ``],
      //           {}
      //         );

      //         BluetoothEscposPrinter.printColumn(
      //           [30 + total_addition_name, 1, 1 + total_addition_price],
      //           [
      //             BluetoothEscposPrinter.ALIGN.LEFT,
      //             BluetoothEscposPrinter.ALIGN.LEFT,
      //             BluetoothEscposPrinter.ALIGN.RIGHT
      //           ],
      //           [`${data.notes}`, ``, ``],
      //           {}
      //         );
      //       }

      //       // BluetoothEscposPrinter.printText(
      //       //   "-------------------------------\n\r",
      //       //   {}
      //       // );

      //       BluetoothEscposPrinter.printText(`${time}\n\r`, {
      //         encoding: "GBK",
      //         codepage: 0,
      //         widthtimes: 0,
      //         heigthtimes: 0,
      //         fonttype: 1
      //       });

      //       BluetoothEscposPrinter.cutPaper();
      //     }
      //   }
      // });
    } catch (error) {
      //this.connect(this.state.printer_label.address);
      console.log("ERROR LABEL ===> ");
      // setTimeout(() => {
      //   this.printLabel();
      // }, 500);

      setTimeout(() => {
        this.cetakUlangLabel(parseInt(retry) + 1);
      }, 750);
    }
  }

  async printKitchenBahasa(reconnect, retry = 0) {
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
      let address = "Alamat dari Retail";
      let gerai_name = userInfo.gerai_name;
      let description = userInfo.restaurant_address
        ? userInfo.restaurant_address
        : "";
      let cashier_name = userInfo.name;
      let transaction_id = bill_transId;
      let time = moment(new Date()).format("DD/MM/YYYY HH:mm");
      let no_table = this.state.selectedTable.name;

      let subTotal = 0;
      let total_bayar = 0;

      //let grand_total = subTotal * 1.15;
      let grand_total = this.state.grandTotalRound;
      let discount = this.state.bill_discount;

      if (this.state.payment_type !== "cash") {
        total_bayar = grand_total;
      } else {
        total_bayar = this.state.cashAmount;
      }

      // BluetoothEscposPrinter.printPic(ImageBase64, {
      //   width: 200,
      //   height: 200
      // });
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );

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

      if (data_order.table_id !== 0) {
        await BluetoothEscposPrinter.printText(`Meja ${no_table}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });
      }

      if (this.state.show_order_id) {
        await BluetoothEscposPrinter.printText(
          `ID Transaksi ${transaction_id}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      await BluetoothEscposPrinter.printText(`Kasir ${cashier_name}\n\r`, {
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
      if (printType === 2) {
        await BluetoothEscposPrinter.printText(
          "-----------------------------------------------\n\r",
          {}
        );
      } else {
        await BluetoothEscposPrinter.printText(
          "-------------------------------\n\r",
          {}
        );
      }

      // await BluetoothEscposPrinter.printText(
      //   "99 x 123456789012345678 12345678\n\r",
      //   {}
      // );

      dataBill.map((data, i) => {
        console.log("data print ==> ", data);
        // let detail = data.detail;

        let detail = data.detail ? data.detail : data.Transaction_Item_Addons;

        let detailString = "";
        //let total = data.qty * data.price + data.qty * data.salesTypeValue;
        let total = data.total;

        let salesType = data.salesTypeName
          ? data.salesTypeName
          : data.Sales_Type.name;

        if (salesType === "Booking") {
          salesType = "Dine-In";
        }

        detail.map((items, itemIndex) => {
          let itemName = items.name ? items.name : items.Addon.name;

          if (detailString === "") {
            detailString = itemName;
          } else {
            detailString = detailString + ", " + itemName;
          }
        });

        //let product_name = data.name;
        let product_name = data.name ? data.name : data.Product.name;

        let product_qty = data.qty
          ? data.qty.toString()
          : data.quantity.toString();

        if (product_qty.length === 1) {
          product_qty = product_qty + "  x ";
        } else {
          product_qty = product_qty + " x";
        }

        let price_space = "";
        let price_space_num = 0;

        let product_name_array = this.divideLongWord(product_name, 23);

        if (printType === 2) {
          product_name_array = this.divideLongWord(product_name, 23 + 16);
        }

        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        let detail_array = this.divideLongWord(detailString, 30);

        if (printType === 2) {
          detail_array = this.divideLongWord(detailString, 30 + 16);
        }

        let detail_length = detail_array.length;

        let notes_array = this.divideLongWord(data.notes, 30);

        if (printType === 2) {
          notes_array = this.divideLongWord(data.notes, 30 + 16);
        }

        let notes_length = notes_array.length;

        if (length < 23) {
          prod_space_num = 23 - length;
        }

        if (printType === 2) {
          if (length < 23 + 16) {
            prod_space_num = 23 + 16 - length;
          }
        }

        for (var s = 0; s < prod_space_num; s++) {
          prod_space = prod_space + " ";
        }

        BluetoothEscposPrinter.printText(
          `${product_name_first_line}${prod_space}${product_qty}${price_space}\n\r`,
          {}
        );

        for (var i = 1; i < product_name_length; i++) {
          BluetoothEscposPrinter.printText(`${product_name_array[i]}\n\r`, {});
        }

        for (var j = 0; j < detail_length; j++) {
          BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
        }

        if (salesType !== "") {
          BluetoothEscposPrinter.printText(`${salesType}\n\r`, {});
        }

        if (notes_length > 0) {
          BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
          for (var k = 0; k < notes_length; k++) {
            BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
          }
        }

        if (printType === 2) {
          BluetoothEscposPrinter.printText(
            "-----------------------------------------------\n\r",
            {}
          );
        } else {
          BluetoothEscposPrinter.printText(
            "-------------------------------\n\r",
            {}
          );
        }
      });

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
    } catch (error) {
      //alert(error);
      //alert("Terjadi kesalahan untuk mencetak struk mohon coba kembali.");
      //this.printKitchen(reconnect);

      console.log("dapur error");
      setTimeout(() => {
        this.cetakUlangDapur(parseInt(retry) + 1);
      }, 750);
    }
  }

  async printDummy(retry = 0) {
    try {
      await BluetoothEscposPrinter.printText(`Dummy\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      });
    } catch (error) {
      console.log("error Dummy ===> ", error);
      if (parseInt(retry) === 0) {
        setTimeout(() => {
          this.printDummy(parseInt(retry) + 1);
        }, 400);
      }
    }
  }

  async printKitchen(reconnect, retry = 0) {
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
      let address = "Alamat dari Retail";
      let gerai_name = userInfo.gerai_name;
      let description = userInfo.restaurant_address
        ? userInfo.restaurant_address
        : "";
      let cashier_name = userInfo.name;
      let transaction_id = bill_transId;
      let time = moment(new Date()).format("DD/MM/YYYY HH:mm");
      let no_table = this.state.selectedTable.name;

      let subTotal = 0;
      let total_bayar = 0;

      //let grand_total = subTotal * 1.15;
      let grand_total = this.state.grandTotalRound;
      let discount = this.state.bill_discount;

      if (this.state.payment_type !== "cash") {
        total_bayar = grand_total;
      } else {
        total_bayar = this.state.cashAmount;
      }

      // BluetoothEscposPrinter.printPic(ImageBase64, {
      //   width: 200,
      //   height: 200
      // });
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );

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

      if (data_order.table_id !== 0) {
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
          `Tscn ID ${transaction_id}\n\r`,
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
      if (printType === 2) {
        await BluetoothEscposPrinter.printText(
          "-----------------------------------------------\n\r",
          {}
        );
      } else {
        await BluetoothEscposPrinter.printText(
          "-------------------------------\n\r",
          {}
        );
      }

      // await BluetoothEscposPrinter.printText(
      //   "99 x 123456789012345678 12345678\n\r",
      //   {}
      // );

      dataBill.map((data, i) => {
        console.log("data print ==> ", data);
        // let detail = data.detail;

        let detail = data.detail ? data.detail : data.Transaction_Item_Addons;

        let detailString = "";
        //let total = data.qty * data.price + data.qty * data.salesTypeValue;
        let total = data.total;

        let salesType = data.salesTypeName
          ? data.salesTypeName
          : data.Sales_Type.name;

        if (salesType === "Booking") {
          salesType = "Dine-In";
        }

        detail.map((items, itemIndex) => {
          let itemName = items.name ? items.name : items.Addon.name;

          if (detailString === "") {
            detailString = itemName;
          } else {
            detailString = detailString + ", " + itemName;
          }
        });

        //let product_name = data.name;
        let product_name = data.name ? data.name : data.Product.name;

        let product_qty = data.qty
          ? data.qty.toString()
          : data.quantity.toString();

        if (product_qty.length === 1) {
          product_qty = product_qty + "  x ";
        } else {
          product_qty = product_qty + " x";
        }

        let price_space = "";
        let price_space_num = 0;

        let product_name_array = this.divideLongWord(product_name, 23);

        if (printType === 2) {
          product_name_array = this.divideLongWord(product_name, 23 + 16);
        }

        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        let detail_array = this.divideLongWord(detailString, 30);
        let notes_array = this.divideLongWord(data.notes, 30);

        if (printType === 2) {
          detail_array = this.divideLongWord(detailString, 30 + 16);
          notes_array = this.divideLongWord(data.notes, 30 + 16);
        }

        let detail_length = detail_array.length;

        let notes_length = notes_array.length;

        if (length < 23) {
          prod_space_num = 23 - length;
        }

        if (printType === 2) {
          if (length < 23 + 16) {
            prod_space_num = 23 + 16 - length;
          }
        }

        for (var s = 0; s < prod_space_num; s++) {
          prod_space = prod_space + " ";
        }

        BluetoothEscposPrinter.printText(
          `${product_name_first_line}${prod_space}${product_qty}${price_space}\n\r`,
          {}
        );

        for (var i = 1; i < product_name_length; i++) {
          BluetoothEscposPrinter.printText(`${product_name_array[i]}\n\r`, {});
        }

        for (var j = 0; j < detail_length; j++) {
          BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
        }

        if (salesType !== "") {
          BluetoothEscposPrinter.printText(`${salesType}\n\r`, {});
        }

        if (notes_length > 0) {
          BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
          for (var k = 0; k < notes_length; k++) {
            BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
          }
        }

        if (printType === 2) {
          BluetoothEscposPrinter.printText(
            "-----------------------------------------------\n\r",
            {}
          );
        } else {
          BluetoothEscposPrinter.printText(
            "-------------------------------\n\r",
            {}
          );
        }
      });

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
    } catch (error) {
      console.log("dapur error");
      setTimeout(() => {
        this.cetakUlangDapur(parseInt(retry) + 1);
      }, 750);

      //alert(error);
      //alert("Terjadi kesalahan untuk mencetak struk mohon coba kembali.");
      //this.printKitchen(reconnect);
    }
  }

  async printKitchenNew(reconnect, retry = 0) {
    try {
      const {
        userInfo,
        dataBill,
        bill_transId,
        data_order,
        customPriceFinal,
        customPriceTax,
        printType,
        queue_number
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

      let subTotal = 0;
      let total_bayar = 0;

      //let grand_total = subTotal * 1.15;
      let grand_total = this.state.grandTotalRound;
      let discount = this.state.bill_discount;

      if (this.state.payment_type !== "cash") {
        total_bayar = grand_total;
      } else {
        total_bayar = this.state.cashAmount;
      }

      // BluetoothEscposPrinter.printPic(ImageBase64, {
      //   width: 200,
      //   height: 200
      // });
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );

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

      if (data_order.table_id !== 0) {
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

      if (this.state.queue_number > 0) {
        await BluetoothEscposPrinter.printText(
          `${_queue_number[this.state.languageIndex]} ${
            this.state.queue_number
          }\n\r`,
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
      if (printType === 2) {
        await BluetoothEscposPrinter.printText(
          "-----------------------------------------------\n\r",
          {}
        );
      } else {
        await BluetoothEscposPrinter.printText(
          "-------------------------------\n\r",
          {}
        );
      }

      // await BluetoothEscposPrinter.printText(
      //   "99 x 123456789012345678 12345678\n\r",
      //   {}
      // );

      dataBill.map((data, i) => {
        console.log("data print ==> ", data);
        // let detail = data.detail;

        let detail = data.detail ? data.detail : data.Transaction_Item_Addons;

        let detailString = "";
        //let total = data.qty * data.price + data.qty * data.salesTypeValue;
        let total = data.total;

        let salesType = data.salesTypeName
          ? data.salesTypeName
          : data.Sales_Type.name;

        if (salesType === "Booking") {
          salesType = "Dine-In";
        }

        detail.map((items, itemIndex) => {
          let itemName = items.name ? items.name : items.Addon.name;

          if (detailString === "") {
            detailString = itemName;
          } else {
            detailString = detailString + ", " + itemName;
          }
        });

        //let product_name = data.name;
        let product_name = data.name ? data.name : data.Product.name;

        // let product_qty = data.qty
        //   ? data.qty.toString()
        //   : data.quantity.toString();

        let product_qty_number = data.qty
          ? Decimalize(data.qty)
          : Decimalize(data.quantity);
        let product_qty = product_qty_number.toString();

        if (product_qty.length === 1) {
          product_qty = product_qty + "";
        } else {
          product_qty = product_qty + "";
        }

        let price_space = "";
        let price_space_num = 0;

        let product_name_array = this.divideLongWord(product_name, 23);

        if (printType === 2) {
          product_name_array = this.divideLongWord(product_name, 23 + 16);
        }

        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        let detail_array = this.divideLongWord(detailString, 30);
        let notes_array = this.divideLongWord(data.notes, 30);

        if (printType === 2) {
          detail_array = this.divideLongWord(detailString, 30 + 16);
          notes_array = this.divideLongWord(data.notes, 30 + 16);
        }

        let detail_length = detail_array.length;

        let notes_length = notes_array.length;

        if (length < 23) {
          prod_space_num = 23 - length;
        }

        if (printType === 2) {
          if (length < 23 + 16) {
            prod_space_num = 23 + 16 - length;
          }
        }

        for (var s = 0; s < prod_space_num; s++) {
          prod_space = prod_space + " ";
        }

        // BluetoothEscposPrinter.printText(
        //   `${product_name_first_line}${prod_space}${product_qty}${price_space}\n\r`,
        //   {}
        // );

        BluetoothEscposPrinter.printColumn(
          [30 + total_addition_name, 1, 11 + total_addition_price],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT
          ],
          [`${product_name}`, ``, `${product_qty}`],
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );

        // for (var i = 1; i < product_name_length; i++) {
        //   BluetoothEscposPrinter.printText(`${product_name_array[i]}\n\r`, {});
        // }

        // for (var j = 0; j < detail_length; j++) {
        //   BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
        // }

        BluetoothEscposPrinter.printColumn(
          [40 + total_addition_name, 1, 1 + total_addition_price],
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

        if (salesType !== "") {
          BluetoothEscposPrinter.printColumn(
            [40 + total_addition_name, 1, 1 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${salesType}`, ``, ``],
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );

          // BluetoothEscposPrinter.printText(`${salesType}\n\r`, {});
        }

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
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );

          BluetoothEscposPrinter.printColumn(
            [40 + total_addition_name, 1, 1 + total_addition_price],
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
        }

        if (printType === 2) {
          BluetoothEscposPrinter.printText(
            "-----------------------------------------------\n\r",
            {}
          );
        } else {
          BluetoothEscposPrinter.printText(
            "-------------------------------\n\r",
            {}
          );
        }
      });

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
    } catch (error) {
      console.log("dapur error");
      setTimeout(() => {
        this.cetakUlangDapur(parseInt(retry) + 1);
      }, 750);

      //alert(error);
      //alert("Terjadi kesalahan untuk mencetak struk mohon coba kembali.");
      //this.printKitchen(reconnect);
    }
  }

  sendWhatsApp() {
    if (this.state.languageIndex === 1) {
      this.sendWhatsAppEng();
    } else {
      this.sendWhatsAppBahasa();
    }
  }

  sendWhatsAppBahasa() {
    const {
      userInfo,
      dataBill,
      bill_transId,
      data_order,
      customPriceFinal,
      customPriceTax
    } = this.state;

    const formPhone = `62${this.state.formPhone}`;
    //console.log("data order ===> ", data_order);

    let address = "Alamat dari Retail";
    let business_name = userInfo.business_name;
    let gerai_name = userInfo.gerai_name;
    let alamat = userInfo.restaurant_address ? userInfo.restaurant_address : "";
    let cashier_name = userInfo.name;
    let transaction_id = bill_transId;
    let time = moment(new Date()).format("HH:mm");
    let no_table = this.state.selectedTable.name;
    let phone = this.props.phone ? this.props.phone : "";

    const discount_calculate =
      this.state.grandTotalDefault +
      this.state.customPriceFinal -
      this.state.grandTotalRound;

    let subTotal = 0;
    let total_bayar = 0;

    // const discount_render =
    //   this.state.bill_discount >= this.state.bill_subTotal
    //     ? this.state.bill_subTotal
    //     : this.state.bill_discount;

    //   const tax_render = (bill_subTotal - discount_render) * (rate_tax);

    //   const services_render = (bill_subTotal - discount_render) * (rate_services);

    //let detailPesanan = "✅ 1 pcs. [NamaProduk] @ [HargaProduk]\n\r_[Catatan (italic)]_\n\r"
    let detailPesanan = "";
    //detailPesanan = detailPesanan + detailPesanan + detailPesanan;

    dataBill.map((v, i) => {
      // subTotal = subTotal + v.qty * v.price;
      // subTotal = subTotal + v.qty * v.salesTypeValue;
      const data = v;
      let price_total = v.detail ? v.total : v.price_total;

      subTotal = this.state.currencyAllowDecimal
        ? subTotal + parseFloat(price_total).toFixed(2)
        : subTotal + parseInt(price_total);

      let detail = data.detail;
      let detailString = "";
      let total = data.total;

      let qty = data.qty ? data.qty : data.quantity;

      //price_addons_total: v.detail ? v.price - v.product.price : v.price_addons_total,

      total = price_total / qty;

      const detail_addons = v.detail ? v.detail : v.Transaction_Item_Addons;

      console.log("detail_addons ===> ", detail_addons);

      console.log("data ===> ", data);

      detail_addons.map((items, itemIndex) => {
        const name = items.name ? items.name : items.Addon.name;
        if (detailString === "") {
          detailString = name;
        } else {
          detailString = detailString + ", " + name;
        }
      });

      detailString = detailString + "\n\r";
      let product_name = data.name ? data.name : data.Product.name;
      let product_qty = qty.toString();

      let notes = data.notes && data.notes !== "" ? `_${data.notes}_\n\r` : "";

      let _temp_text = `✅ ${product_qty} pcs. ${product_name} @ ${total}\n\r${detailString}${notes}`;
      detailPesanan = detailPesanan + _temp_text;
    });

    let detail_customer = "";

    const customer_name = this.state.selectedCustomerName;

    if (customer_name) {
      detail_customer = `
  Detail Anda :
  Nama : ${customer_name}`;

      // detail_customer = `
      // Detail Anda :
      // Nama : ${customer_name}
      // Poin yang didapat : [PoinTransaksi]
      // Total Poin Pelanggan : [TotalPoinCustomer]`
    }

    let grand_total = this.state.grandTotalRound;
    // let discount = this.state.bill_discount;
    let discount = discount_calculate;

    if (this.state.payment_type !== "cash") {
      total_bayar = this.state.currencyAllowDecimal
        ? parseFloat(grand_total).toFixed(2)
        : grand_total;
    } else {
      total_bayar = this.state.currencyAllowDecimal
        ? parseFloat(this.state.cashAmount).toFixed(2)
        : this.state.cashAmount;
    }

    let kembali = this.state.currencyAllowDecimal
      ? parseFloat(total_bayar).toFixed(2) - parseFloat(grand_total).toFixed(2)
      : parseInt(total_bayar) - parseInt(grand_total);

    // eslint-disable-next-line prettier/prettier
      let text =
  `*E-Receipt*
  *Terima Kasih telah berbelanja di ${business_name}-${gerai_name}*
  ${alamat}
  ${phone}
  
  Tscn ID : ${
    this.state.transaction_id ? this.state.transaction_id : data_order.id
  }
  Nomor Transaksi : ${transaction_id}
  Waktu : ${time}
  Tipe Pembayaran : ${this.state.payment_type}
  
  =================
  Detail pesanan:
  ${detailPesanan}

  Total: *${this.idrNumToStr(grand_total)}*
  =================
  Detail biaya :

  Total tagihan : ${this.idrNumToStr(subTotal)}
  Grand total : ${this.idrNumToStr(grand_total)}
  Pembayaran : ${this.state.payment_type} ${this.idrNumToStr(total_bayar)}
  Kembalian : ${this.idrNumToStr(kembali)}

  Status: Lunas
  =================
  ${detail_customer}

  Terima kasih
      
  Powered By BeetPOS`;

    let regzero = /^(0)/g;

    if (regzero.test(formPhone)) {
      Linking.openURL(
        "whatsapp://send?text=" +
          text +
          "&phone=" +
          formPhone.replace("0", this.state.selectedPhone.dial_code)
      ).catch(err => alert("WhatsApp tidak terinstall di perangkat anda"));
    } else {
      Linking.openURL(
        "whatsapp://send?text=" + text + "&phone=" + formPhone
      ).catch(err => alert("WhatsApp tidak terinstall di perangkat anda"));
    }

    // Linking.openURL(
    //   "whatsapp://send?text=" + text + "&phone=" + formPhone
    // ).catch(err => alert("WhatsApp tidak terinstall di perangkat anda"));
  }

  sendWhatsAppEng() {
    const {
      userInfo,
      dataBill,
      bill_transId,
      data_order,
      customPriceFinal,
      customPriceTax
    } = this.state;

    const formPhone = `62${this.state.formPhone}`;

    //console.log("data order ===> ", data_order);

    let address = "Alamat dari Retail";
    let business_name = userInfo.business_name;
    let gerai_name = userInfo.gerai_name;
    let alamat = userInfo.restaurant_address ? userInfo.restaurant_address : "";
    let cashier_name = userInfo.name;
    let transaction_id = bill_transId;
    let time = moment(new Date()).format("HH:mm");
    let no_table = this.state.selectedTable.name;
    let phone = this.props.phone ? this.props.phone : "";

    const discount_calculate =
      this.state.grandTotalDefault +
      this.state.customPriceFinal -
      this.state.grandTotalRound;

    let subTotal = 0;
    let total_bayar = 0;

    // const discount_render =
    //   this.state.bill_discount >= this.state.bill_subTotal
    //     ? this.state.bill_subTotal
    //     : this.state.bill_discount;

    //   const tax_render = (bill_subTotal - discount_render) * (rate_tax);

    //   const services_render = (bill_subTotal - discount_render) * (rate_services);

    //let detailPesanan = "✅ 1 pcs. [NamaProduk] @ [HargaProduk]\n\r_[Catatan (italic)]_\n\r"
    let detailPesanan = "";
    //detailPesanan = detailPesanan + detailPesanan + detailPesanan;

    dataBill.map((v, i) => {
      // subTotal = subTotal + v.qty * v.price;
      // subTotal = subTotal + v.qty * v.salesTypeValue;
      const data = v;
      let price_total = v.detail ? v.total : v.price_total;

      subTotal = this.state.currencyAllowDecimal
        ? subTotal + parseFloat(price_total).toFixed(2)
        : subTotal + parseInt(price_total);

      let detail = data.detail;
      let detailString = "";
      let total = data.total;

      let qty = data.qty ? data.qty : data.quantity;

      //price_addons_total: v.detail ? v.price - v.product.price : v.price_addons_total,

      total = price_total / qty;

      const detail_addons = v.detail ? v.detail : v.Transaction_Item_Addons;

      console.log("detail_addons ===> ", detail_addons);

      console.log("data ===> ", data);

      detail_addons.map((items, itemIndex) => {
        const name = items.name ? items.name : items.Addon.name;
        if (detailString === "") {
          detailString = name;
        } else {
          detailString = detailString + ", " + name;
        }
      });

      detailString = detailString + "\n\r";
      let product_name = data.name ? data.name : data.Product.name;
      let product_qty = qty.toString();

      let notes = data.notes && data.notes !== "" ? `_${data.notes}_\n\r` : "";

      let _temp_text = `✅ ${product_qty} pcs. ${product_name} @ ${total}\n\r${detailString}${notes}`;
      detailPesanan = detailPesanan + _temp_text;
    });

    let detail_customer = "";

    const customer_name = this.state.selectedCustomerName;

    if (customer_name) {
      detail_customer = `
  Your Detail :
  Name : ${customer_name}`;

      // detail_customer = `
      // Detail Anda :
      // Nama : ${customer_name}
      // Poin yang didapat : [PoinTransaksi]
      // Total Poin Pelanggan : [TotalPoinCustomer]`
    }

    let grand_total = this.state.grandTotalRound;
    // let discount = this.state.bill_discount;
    let discount = discount_calculate;

    if (this.state.payment_type !== "cash") {
      total_bayar = this.state.currencyAllowDecimal
        ? parseFloat(grand_total).toFixed(2)
        : grand_total;
    } else {
      total_bayar = this.state.currencyAllowDecimal
        ? parseFloat(this.state.cashAmount).toFixed(2)
        : this.state.cashAmount;
    }

    let kembali = this.state.currencyAllowDecimal
      ? parseFloat(total_bayar).toFixed(2) - parseFloat(grand_total).toFixed(2)
      : parseInt(total_bayar) - parseInt(grand_total);

    // eslint-disable-next-line prettier/prettier
      let text =
  `*E-Receipt*
  *Thank you for shopping in ${business_name}-${gerai_name}*
  ${alamat}
  ${phone}
  
  Tscn ID : ${
    this.state.transaction_id ? this.state.transaction_id : data_order.id
  }
  Receipt Number : ${transaction_id}
  Transaction Time : ${time}
  Payment Type : ${this.state.payment_type}
  
  =================
  Order Detail:
  ${detailPesanan}

  Total: *${this.idrNumToStr(grand_total)}*
  =================
  Cost Detail :

  Sub Total : ${this.idrNumToStr(subTotal)}
  Grand total : ${this.idrNumToStr(grand_total)}
  Payment : ${this.state.payment_type} ${this.idrNumToStr(total_bayar)}
  Change : ${this.idrNumToStr(kembali)}

  Status: Paid
  =================
  ${detail_customer}

  Thank you
      
  Powered By BeetPOS`;

    let regzero = /^(0)/g;

    if (regzero.test(formPhone)) {
      Linking.openURL(
        "whatsapp://send?text=" +
          text +
          "&phone=" +
          formPhone.replace("0", this.state.selectedPhone.dial_code)
      ).catch(err => alert("WhatsApp Not installed"));
    } else {
      Linking.openURL(
        "whatsapp://send?text=" + text + "&phone=" + formPhone
      ).catch(err => alert("WhatsApp Not installed"));
    }

    // Linking.openURL(
    //   "whatsapp://send?text=" + text + "&phone=" + formPhone
    // ).catch(err => alert("WhatsApp tidak terinstall di perangkat anda"));
  }

  printActionLanguage(reconnect, kitchen, lunas, retry = 0, label = false) {
    console.log("printAction retry ===> ", retry);

    // console.log("printActionLanguage ===> ", this.state.languageIndex);

    // if (this.state.languageIndex === 1) {
    //   this.printAction(reconnect, kitchen, lunas, retry);
    // }
    // if (this.state.languageIndex === 0) {
    //   this.printActionBahasa(reconnect, kitchen, lunas, retry);
    //   //this.printActionBahasa(true, true, true);
    // }

    // if(manual_print)
    // {
    //   if (this.state.payment_type === "cash") {
    //     console.log("DRAWER IS OPENED");
    //     BluetoothEscposPrinter.openDrawer(0, 250, 250);
    //     ScalingFunctions.OpenDrawer();
    //   }
    // }
    // else
    // {
    this.printAction(reconnect, kitchen, lunas, retry);

    if (
      this.state.printer_label &&
      this.state.printer3 &&
      label &&
      retry === 0
    ) {
      ///const timeout_label = kitchen ? 5000 : 3000;
      console.log("print label 1");

      setTimeout(() => {
        this.connect(this.state.printer_label.address);
        setTimeout(() => {
          this.printLabel();
        }, 2500);
      }, 5000);
    }
    //}
  }

  async printAction(reconnect, kitchen, lunas, retry) {
    try {
      const {
        userInfo,
        dataBill,
        bill_transId,
        data_order,
        customPriceFinal,
        customPriceTax,
        bill_subTotal,
        rate_tax,
        rate_services,
        printType,
        print_discount,
        print_voucher,
        payment_delivery,
        queue_number
      } = this.state;

      let total_addition_name = 0;
      let total_addition_price = 0;
      if (printType === 2) {
        total_addition_name = 20;
        total_addition_price = 10;

        //setWidth(576)
        //384
        await BluetoothEscposPrinter.setWidth(576);
      }

      const discount_render =
        this.state.bill_discount >= this.state.bill_subTotal
          ? this.state.bill_subTotal
          : this.state.bill_discount;

      const tax_render = (bill_subTotal - discount_render) * rate_tax;

      const services_render = (bill_subTotal - discount_render) * rate_services;

      let address = "Alamat dari Retail";
      let gerai_name = userInfo.gerai_name;
      let description = userInfo.restaurant_address
        ? userInfo.restaurant_address
        : "";
      let cashier_name = userInfo.name;
      let data_temp =
        moment(new Date()).format("YY/MM/DD-HH/mm/ss") +
        "-" +
        this.state.userInfo.gerai_id;

      let transaction_id = bill_transId ? bill_transId : data_temp;
      let time = moment(new Date()).format("DD/MM/YYYY HH:mm");
      let no_table = this.state.selectedTable.name;

      const discount_calculate =
        this.state.grandTotalDefault +
        this.state.customPriceFinal -
        this.state.grandTotalRound;

      let subTotal = 0;
      let total_bayar = 0;

      dataBill.map((v, i) => {
        let temp_total = v.total ? v.total : v.price_total;

        // if ( this.state.currencyAllowDecimal)
        // {
        //   temp_total = parseFloat(temp_total);
        // }

        console.log("temp_total ===> ", temp_total);

        // subTotal = subTotal + v.qty * v.price;
        // subTotal = subTotal + v.qty * v.salesTypeValue;
        subTotal = this.state.currencyAllowDecimal
          ? parseFloat(
              (parseFloat(subTotal) + parseFloat(temp_total)) *
                this.state.currency_conversion_ratio
            ).toFixed(2)
          : (parseInt(subTotal) + parseInt(temp_total)) *
            this.state.currency_conversion_ratio;
      });

      // subTotal = subTotal * this.state.currency_conversion_ratio;

      //let grand_total = subTotal * 1.15;

      if (this.state.direct_payment) {
        subTotal = this.state.currencyAllowDecimal
          ? parseFloat(bill_subTotal).toFixed(2)
          : parseInt(bill_subTotal);
      }
      let grand_total = this.state.grandTotalRound;

      grand_total = grand_total * this.state.currency_conversion_ratio;
      // let discount = this.state.bill_discount;
      // let discount = discount_calculate;

      let discount = 0;

      if (this.state.currencyAllowDecimal) {
        discount = parseFloat(
          discount_render * this.state.currency_conversion_ratio
        ).toFixed(2);
      } else {
        discount = parseInt(
          discount_render * this.state.currency_conversion_ratio
        );
      }

      if (this.state.payment_type !== "cash") {
        total_bayar = this.state.currencyAllowDecimal
          ? parseFloat(
              grand_total * this.state.currency_conversion_ratio
            ).toFixed(2)
          : parseInt(grand_total * this.state.currency_conversion_ratio);
        // total_bayar = total_bayar * this.state.currency_conversion_ratio;
      } else {
        total_bayar = this.state.currencyAllowDecimal
          ? parseFloat(this.state.cashAmount).toFixed(2)
          : parseInt(this.state.cashAmount);
      }

      // BluetoothEscposPrinter.printPic(ImageBase64, {
      //   width: 200,
      //   height: 200
      // });
      if (this.state.setting_print_logo) {
        if (printType === 1) {
          await BluetoothEscposPrinter.printPic(this.state.logo_image_base64, {
            width: 384,
            height: 200
          });
        } else {
          await BluetoothEscposPrinter.printPic(this.state.logo_image_base64, {
            width: 576,
            height: 300,
            left: 96
          });
        }
      }

      if (this.state.setting_print_qr) {
        if (printType === 1) {
          if (this.state.qr_base64) {
            await BluetoothEscposPrinter.printPic(this.state.qr_base64, {
              width: 284,
              height: 150,
              left: 50
            });
          }
        } else {
          if (this.state.qr_base64) {
            await BluetoothEscposPrinter.printPic(this.state.qr_base64, {
              width: 384,
              height: 200,
              left: 192
            });
          }
        }
      }

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );

      // if (!lunas) {
      //   await BluetoothEscposPrinter.printText(`***BELUM LUNAS***\n\r`, {});
      // }

      // await BluetoothEscposPrinter.printText(`測試\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });

      // await BluetoothEscposPrinter.printText(`测试\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });await BluetoothEscposPrinter.printText(`$$\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });await BluetoothEscposPrinter.printText(`សាកល្បង\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });await BluetoothEscposPrinter.printText(`ทดสอบ\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });
      // await BluetoothEscposPrinter.printText(`тестовое задание\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });await BluetoothEscposPrinter.printText(`परीक्षण\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });await BluetoothEscposPrinter.printText(`시험\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });await BluetoothEscposPrinter.printText(`اختبار\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });await BluetoothEscposPrinter.printText(`テスト\n\r`, {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 0,
      //   heigthtimes: 0,
      //   fonttype: 1
      // });

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

      if (data_order.table_id !== 0) {
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

      if (this.state.queue_number > 0) {
        await BluetoothEscposPrinter.printText(
          `${_queue_number[this.state.languageIndex]} ${
            this.state.queue_number
          }\n\r`,
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

      // await BluetoothEscposPrinter.printText(
      //   "123456789012345678901234567890123456789012345678901234567890123456789012\n\r",
      //   {
      //     encoding: "GBK",
      //     codepage: 0,
      //     widthtimes: 0,
      //     heigthtimes: 0,
      //     fonttype: 1
      //   }
      // );

      if (printType === 2) {
        await BluetoothEscposPrinter.printText(
          "-----------------------------------------------\n\r",
          {}
        );
      } else {
        await BluetoothEscposPrinter.printText(
          "-------------------------------\n\r",
          {}
        );

        // await BluetoothEscposPrinter.printText(
        //   "123456789012345678901234567890123456789012\n\r", //42
        //   {
        //     encoding: "GBK",
        //     codepage: 0,
        //     widthtimes: 0,
        //     heigthtimes: 0,
        //     fonttype: 1
        //   }

        // );
      }

      // await BluetoothEscposPrinter.printText(
      //   "99 x 123456789012345678 12345678\n\r",
      //   {}
      // );

      dataBill.map((data, i) => {
        console.log("data print ==> ", data);
        let detail = data.detail ? data.detail : data.Transaction_Item_Addons;

        //console.log("data print detail ==> ", detail);

        let detailString = "";
        //let total = data.qty * data.price + data.qty * data.salesTypeValue;
        let total = data.total ? data.total : data.price_total;

        total = total * this.state.currency_conversion_ratio;

        total = this.state.currencyAllowDecimal
          ? parseFloat(total).toFixed(2)
          : parseInt(total);

        detail.map((items, itemIndex) => {
          let itemName = items.name ? items.name : items.Addon.name;
          if (detailString === "") {
            detailString = itemName;
          } else {
            detailString = detailString + ", " + itemName;
          }
        });

        //console.log("data detailString ==> ", detailString);

        let product_name = data.name ? data.name : data.Product.name;
        let product_price = total.toString();
        let product_price_length = product_price.length;

        let product_qty_number = data.qty
          ? Decimalize(data.qty)
          : Decimalize(data.quantity);
        let product_qty = product_qty_number.toString();

        if (product_qty.length === 1) {
          product_qty = product_qty;
        } else {
          product_qty = product_qty;
        }

        //console.log("data product_qty ==> ", product_qty);

        let price_space = "";
        let price_space_num = 0;

        if (product_price_length < 8) {
          price_space_num = 8 - product_price_length;
        }
        for (var xx = 0; xx < price_space_num; xx++) {
          price_space = price_space + " ";
        }

        let salesType = data.salesTypeName
          ? data.salesTypeName
          : data.Sales_Type.name;

        if (salesType === "Booking") {
          salesType = "Dine-In";
        }

        let product_name_array = this.divideLongWord(product_name, 16);

        if (printType === 2) {
          product_name_array = this.divideLongWord(product_name, 16 + 16);
        }
        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        let detail_array = this.divideLongWord(detailString, 30);
        let notes_array = this.divideLongWord(data.notes, 30);
        if (printType === 2) {
          detail_array = this.divideLongWord(detailString, 30 + 16);
          notes_array = this.divideLongWord(data.notes, 30 + 16);
        }

        let detail_length = detail_array.length;

        let notes_length = notes_array.length;

        //console.log("data notes_array ==> ", notes_array);

        if (length < 16) {
          prod_space_num = 16 - length;
        }

        if (printType === 2) {
          if (length < 16 + 16) {
            prod_space_num = 16 + 16 - length;
          }
        }

        for (var s = 0; s < prod_space_num; s++) {
          prod_space = prod_space + " ";
        }

        BluetoothEscposPrinter.printColumn(
          [20 + total_addition_name, 3, 8 + total_addition_price],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT
          ],
          [`${product_name}`, `${product_qty}`, `${product_price}`],
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );

        // BluetoothEscposPrinter.printText(
        //   `${product_name_first_line}${prod_space}${product_qty}${price_space}${product_price}\n\r`,
        //   {}
        // );

        // for (var i = 1; i < product_name_length; i++) {
        //   BluetoothEscposPrinter.printText(`${product_name_array[i]}\n\r`, {});
        // }

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

        // for (var j = 0; j < detail_length; j++) {
        //   BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
        // }
        if (salesType !== "") {
          BluetoothEscposPrinter.printColumn(
            [30 + total_addition_name, 1, 1 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${salesType}`, ``, ``],
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );

          // BluetoothEscposPrinter.printText(`${salesType}\n\r`, {});
        }

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
            [`${data.notes}`, ``, ``],
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );
        }
      });

      let sub_total = subTotal.toString();
      let sub_total_length = sub_total.length;
      let sub_total_space = "";
      let sub_total_space_num = 0;

      if (sub_total_length < 16) {
        sub_total_space_num = 16 - sub_total_length;
      }

      if (printType === 2) {
        if (sub_total_length < 16 + 16) {
          sub_total_space_num = 16 + 16 - sub_total_length;
        }
      }

      for (var xx = 0; xx < sub_total_space_num; xx++) {
        sub_total_space = sub_total_space + " ";
      }

      if (printType === 2) {
        await BluetoothEscposPrinter.printText(
          "-----------------------------------------------\n\r",
          {}
        );
      } else {
        await BluetoothEscposPrinter.printText(
          "-------------------------------\n\r",
          {}
        );
      }

      if (
        this.state.selectedDiscountName !== "" ||
        this.state.selectedVoucherName !== "" ||
        this.state.automaticPromoActivated.length > 0
      ) {
        if (this.state.selectedDiscountName !== "") {
          await BluetoothEscposPrinter.printColumn(
            [16 + total_addition_name, 1, 15 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${this.state.selectedDiscountName}`, " ", `${print_discount}`],
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );
        }

        if (this.state.selectedVoucherName !== "") {
          await BluetoothEscposPrinter.printColumn(
            [16 + total_addition_name, 1, 15 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${this.state.selectedVoucherName}`, " ", `${print_voucher}`],
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );
        }

        if (this.state.automaticPromoActivated.length > 0) {
          // await BluetoothEscposPrinter.printText(
          //   `***${_promo[this.state.languageIndex]}*** \n\r`,
          //   {
          //     encoding: "GBK",
          //     codepage: 0,
          //     widthtimes: 0,
          //     heigthtimes: 0,
          //     fonttype: 1
          //   }
          // );

          await BluetoothEscposPrinter.printColumn(
            [16 + total_addition_name, 1, 15 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [
              `${_promo[this.state.languageIndex]}`,
              " ",
              `${this.state.print_automatic}`
            ],
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );

          this.state.automaticPromoActivated.map((items, itemIndex) => {
            BluetoothEscposPrinter.printColumn(
              [24 + total_addition_name, 1, 1 + total_addition_price],
              [
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.RIGHT
              ],
              [`${items.name}`, " ", ``],
              {
                encoding: "GBK",
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
              }
            );
          });
        }

        if (printType === 2) {
          await BluetoothEscposPrinter.printText(
            "-----------------------------------------------\n\r",
            {}
          );
        } else {
          await BluetoothEscposPrinter.printText(
            "-------------------------------\n\r",
            {}
          );
        }
      }

      // await BluetoothEscposPrinter.printText(
      //   "12345678901234567890123456789012\n\r",
      //   {}
      // );

      // await BluetoothEscposPrinter.printText(
      //   `Subtotal${sub_total_space}${sub_total}\n\r`,
      //   {}
      // );

      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_sub_total[this.state.languageIndex]}    :`, " ", `${sub_total}`],
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );
      if (payment_delivery > 0) {
        let payment_delivery_calc = parseFloat(
          payment_delivery * this.state.currency_conversion_ratio
        )
          .toFixed(2)
          .toString();

        await BluetoothEscposPrinter.printColumn(
          [16 + total_addition_name, 1, 15 + total_addition_price],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT
          ],
          [
            `${_delivery_cost[this.state.languageIndex]}:`,
            " ",
            `${payment_delivery_calc}`
          ],
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      // let tax = parseInt(
      //   Math.ceil(grand_total) - subTotal + discount - customPriceFinal
      // ).toString();

      let custom_price = this.state.customPrice;

      let custom_price_string = this.state.currencyAllowDecimal
        ? parseFloat(custom_price)
            .toFixed(2)
            .toString()
        : custom_price.toString();

      let custom_price_length = custom_price_string.length;
      let custom_price_space = "";
      let custom_price_space_num = 0;
      if (custom_price_length < 26) {
        custom_price_space_num = 26 - custom_price_length;
      }

      if (printType === 2) {
        if (custom_price_length < 26 + 16) {
          custom_price_space_num = 26 + 16 - custom_price_length;
        }
      }

      for (var xxxxx = 0; xxxxx < custom_price_space_num; xxxxx++) {
        custom_price_space = custom_price_space + " ";
      }

      // if (this.state.customPriceTax === false) {
      //   custom_price = this.state.customPrice;
      // }

      if (customPriceFinal > 0 && this.state.customPriceTax === false) {
        //alert(customPriceFinal);
        // await BluetoothEscposPrinter.printText(
        //   `Custom${custom_price_space}${custom_price_string}\n\r`,
        //   {}
        // );

        await BluetoothEscposPrinter.printColumn(
          [16 + total_addition_name, 1, 15 + total_addition_price],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT
          ],
          [
            `${_harga_custom[this.state.languageIndex]}`,
            " ",
            `${custom_price_string}`
          ],
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      // let tax = parseInt(this.state.bill_tax).toString();

      let tax = this.state.currencyAllowDecimal
        ? parseFloat(tax_render * this.state.currency_conversion_ratio)
            .toFixed(2)
            .toString()
        : (tax_render * this.state.currency_conversion_ratio).toString();

      let tax_total_length = tax.length;
      let tax_total_space = "";
      let tax_total_space_num = 0;
      if (tax_total_length < 16) {
        tax_total_space_num = 16 - tax_total_length;
      }

      if (printType === 2) {
        if (tax_total_length < 16 + 16) {
          tax_total_space_num = 16 + 16 - tax_total_length;
        }
      }

      for (var xxx = 0; xxx < tax_total_space_num; xxx++) {
        tax_total_space = tax_total_space + " ";
      }

      // await BluetoothEscposPrinter.printText(
      //   `Tax${tax_total_space}${tax}\n\r`,
      //   {}
      // );

      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_tax[this.state.languageIndex]}          :`, " ", `${tax}`],
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );

      //let tax_service = parseInt(this.state.bill_services).toString();

      let tax_service = this.state.currencyAllowDecimal
        ? parseFloat(services_render * this.state.currency_conversion_ratio)
            .toFixed(2)
            .toString()
        : (services_render * this.state.currency_conversion_ratio).toString();

      let tax_total_length_2 = tax_service.length;
      let tax_total_space_2 = "";
      let tax_total_space_num_2 = 0;
      if (tax_total_length_2 < 16) {
        tax_total_space_num_2 = 16 - tax_total_length_2;
      }

      if (printType === 2) {
        if (tax_total_length_2 < 16 + 16) {
          tax_total_space_num_2 = 16 + 16 - tax_total_length_2;
        }
      }

      for (var xxxx = 0; xxxx < tax_total_space_num_2; xxxx++) {
        tax_total_space_2 = tax_total_space_2 + " ";
      }

      // await BluetoothEscposPrinter.printText(
      //   `Service${tax_total_space_2}${tax_service}\n\r`,
      //   {}
      // );

      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_service[this.state.languageIndex]}      :`, " ", `${tax_service}`],
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );

      // if (customPriceFinal > 0 && this.state.customPriceTax === true) {
      //   //alert(customPriceFinal);
      //   // await BluetoothEscposPrinter.printText(
      //   //   `Custom${custom_price_space}${custom_price_string}\n\r`,
      //   //   {}
      //   // );

      //   await BluetoothEscposPrinter.printColumn(
      //     [18 + total_addition_name, 1, 13 + total_addition_price],
      //     [
      //       BluetoothEscposPrinter.ALIGN.LEFT,
      //       BluetoothEscposPrinter.ALIGN.LEFT,
      //       BluetoothEscposPrinter.ALIGN.RIGHT
      //     ],
      //     [
      //       `${_harga_custom[this.state.languageIndex]}`,
      //       " ",
      //       `${custom_price_string}`
      //     ],
      //     {}
      //   );
      // }

      //let discount_total_length = parseFloat(discount).toFixed(2).toString().length;

      let discount_total_length = discount.toString().length;

      let discount_total_space = "";
      let discount_total_space_num = 0;

      if (discount_total_length < 16) {
        discount_total_space_num = 16 - discount_total_length;
      }
      if (printType === 2) {
        if (discount_total_length < 16 + 16) {
          discount_total_space_num = 16 + 16 - discount_total_length;
        }
      }

      for (var abc = 0; abc < discount_total_space_num; abc++) {
        discount_total_space = discount_total_space + " ";
      }

      // await BluetoothEscposPrinter.printText(
      //   `Discount${discount_total_space}${discount}\n\r`,
      //   {}
      // );

      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_discount[this.state.languageIndex]}     :`, " ", `${discount}`],
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );

      grand_total = this.state.currencyAllowDecimal
        ? parseFloat(grand_total)
            .toFixed(2)
            .toString()
        : grand_total.toString();
      let grand_total_length = grand_total.length;
      let grand_total_space = "";
      let grand_total_space_num = 0;
      if (grand_total_length < 16) {
        grand_total_space_num = 16 - grand_total_length;
      }

      if (printType === 2) {
        if (grand_total_length < 16 + 16) {
          grand_total_space_num = 16 + 16 - grand_total_length;
        }
      }

      for (var y = 0; y < grand_total_space_num; y++) {
        grand_total_space = grand_total_space + " ";
      }

      // payment_type
      // await BluetoothEscposPrinter.printText(
      //   `Grand Total${grand_total_space}${grand_total}\n\r`,
      //   {}
      // );

      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_grand_total[this.state.languageIndex]}  :`, " ", `${grand_total}`],
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );
      if (printType === 2) {
        await BluetoothEscposPrinter.printText(
          "-----------------------------------------------\n\r",
          {}
        );
      } else {
        await BluetoothEscposPrinter.printText(
          "-------------------------------\n\r",
          {}
        );
      }
      // let total_length = parseFloat(total_bayar).toFixed(2).toString().length;
      let total_length = this.state.currencyAllowDecimal
        ? parseFloat(total_bayar)
            .toFixed(2)
            .toString().length
        : total_bayar.toString().length;

      let total_space = "";
      let total_space_num = 0;
      if (total_length < 16) {
        total_space_num = 16 - total_length;
      }

      if (printType === 2) {
        if (total_length < 16 + 16) {
          total_space_num = 16 + 16 - total_length;
        }
      }

      for (var zzz = 0; zzz < total_space_num; zzz++) {
        total_space = total_space + " ";
      }

      let payment_type = this.state.payment_type;

      if (payment_type === "cash") {
        payment_type = "Cash";
      }

      if (payment_type === "ovo") {
        payment_type = "Ovo";
      }

      if (payment_type === "shopee") {
        payment_type = "Shopee";
      }

      if (payment_type === "gopay") {
        payment_type = "Go-Pay";
      }

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );
      if (lunas) {
        await BluetoothEscposPrinter.printText(`***${payment_type}*** \n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        if (this.state.currency_conversion_ratio !== 1) {
          await BluetoothEscposPrinter.printText(
            `${this.state.currency_conversion_name}\n\r`,
            {
              encoding: "GBK",
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            }
          );
        }
      }
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT
      );

      //lunas = true;
      if (lunas) {
        // await BluetoothEscposPrinter.printText(
        //   `Payment${total_space}${total_bayar}\n\r`,
        //   {}
        // );

        await BluetoothEscposPrinter.printColumn(
          [16 + total_addition_name, 1, 15 + total_addition_price],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT
          ],
          [`${_pembayaran[this.state.languageIndex]}      :`, " ", `${total_bayar}`],
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      let kembali = this.state.currencyAllowDecimal
        ? parseFloat(
            parseFloat(total_bayar).toFixed(2) -
              parseFloat(grand_total).toFixed(2)
          ).toFixed(2)
        : parseInt(total_bayar) - parseInt(grand_total);
      total_length = kembali.toString().length;
      total_space = "";
      total_space_num = 0;
      if (total_length < 16) {
        total_space_num = 16 - total_length;
      }

      if (printType === 2) {
        if (total_length < 16 + 16) {
          total_space_num = 16 + 16 - total_length;
        }
      }

      for (var zzz = 0; zzz < total_space_num; zzz++) {
        total_space = total_space + " ";
      }

      if (lunas) {
        // await BluetoothEscposPrinter.printText(
        //   `Change${total_space}${kembali}\n\r`,
        //   {}
        // );

        await BluetoothEscposPrinter.printColumn(
          [16 + total_addition_name, 1, 15 + total_addition_price],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT
          ],
          [
            `${_change_amount_short[this.state.languageIndex]}       :`,
            " ",
            `${kembali}`
          ],
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      if (printType === 2) {
        await BluetoothEscposPrinter.printText(
          "-----------------------------------------------\n\r",
          {}
        );
      } else {
        await BluetoothEscposPrinter.printText(
          "-------------------------------\n\r",
          {}
        );
      }

      if (this.state.footer_printer === "") {
        ////// untuk yg new
        await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });
      } else {
        await BluetoothEscposPrinter.printText(
          `${this.state.footer_printer}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      if (printType === 2) {
        await BluetoothEscposPrinter.printText(
          "-----------------------------------------------\n\r",
          {}
        );
      } else {
        await BluetoothEscposPrinter.printText(
          "-------------------------------\n\r",
          {}
        );
      }

      if (this.state.url_printer === "") {
        ////// untuk yg new
        //await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
      } else {
        await BluetoothEscposPrinter.printText(
          `${this.state.url_printer}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );

        if (printType === 2) {
          await BluetoothEscposPrinter.printText(
            "-----------------------------------------------\n\r",
            {}
          );
        } else {
          await BluetoothEscposPrinter.printText(
            "-------------------------------\n\r",
            {}
          );
        }
      }

      await BluetoothEscposPrinter.printText(" \n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 3,
        heigthtimes: 3,
        fonttype: 1
      });

      this.setState({ disable_reprint: false });

      console.log("this.state.payment_type ====> ", this.state.payment_type);

      if (this.state.payment_type === "cash") {
        console.log("DRAWER IS OPENED");
        BluetoothEscposPrinter.openDrawer(0, 250, 250);
        ScalingFunctions.OpenDrawer();
      }

      await BluetoothEscposPrinter.cutPaper();

      if (true) {
        if (this.state.printer_kitchen) {
          setTimeout(() => {
            this.connect(this.state.printer_kitchen.address);
            if (kitchen) {
              setTimeout(() => {
                this.connect(this.state.printer_kitchen.address);
                setTimeout(() => {
                  this.printKitchenNew(true);
                }, 500);
              }, 2000);
            }
          }, 500);
        }
      }
    } catch (error) {
      this.setState({ disable_reprint: false });
      console.log("kasir eng error");
      setTimeout(() => {
        this.cetakUlangKasir(parseInt(retry) + 1, kitchen);
      }, 750);

      //alert(error);
      //this.printAction(reconnect, kitchen);
    }
  }

  checkOutConfirmationAction() {
    const {
      cashAmount,
      order_id,
      userInfo,
      payment_type,
      bill_transId,
      data_order,
      bill_subTotal,
      bill_discount,
      bill_tax,
      bill_services,
      grandTotal,
      cz_allow,
      cz_uri
    } = this.state;

    this.setState({ cz_allow_print: false });

    // if (cz_allow === 1)
    // {
    //   this.testBayar();
    // }

    let payment_amount = 0;

    if (payment_type === "cash") {
      payment_amount = cashAmount;
    } else {
      payment_amount = grandTotal;
    }

    if (cashAmount >= grandTotal || payment_type === "cash") {
      this.setState({ paymentConfirm: true });
    } else if (payment_type !== "cash") {
      if (cz_allow === 1) {
        this.testBayar();
      } else {
        this.setState({ showQR: true });
      }
    } else {
      alert(_alert_kurang[this.state.languageIndex]);
    }
  }

  offlineCheckOutAction() {
    const {
      cashAmount,
      order_id,
      userInfo,
      payment_type,
      bill_transId,
      data_order,
      bill_subTotal,
      //bill_discount,
      bill_tax,
      bill_services,
      payment_method_id,
      rate_tax,
      rate_services,
      cz_uri,
      selected_currency_conversion,
      grandTotalBeforeCoupon
    } = this.state;

    const bill_discount =
      this.state.grandTotalDefault - this.state.grandTotalRound;

    let grandTotal = this.state.grandTotal;

    grandTotal = this.state.grandTotalRound;

    const discount_render =
      this.state.bill_discount >= this.state.bill_subTotal
        ? this.state.bill_subTotal
        : this.state.bill_discount;

    const tax_render = (bill_subTotal - discount_render) * rate_tax;

    const services_render = (bill_subTotal - discount_render) * rate_services;

    let payment_amount = 0;
    this.setState({ loading: true });

    if (payment_type === "cash") {
      payment_amount = cashAmount;
    } else {
      payment_amount = grandTotal;
    }

    const data_post_2 = {
      order_id: order_id,
      cashier_id: userInfo.id,
      payment_type: payment_type,
      reference_id: bill_transId,
      customer_id: data_order.customer_id
        ? data_order.customer_id
        : this.state.selectedCustomer,
      payment_subtotal: bill_subTotal,
      //payment_discount: bill_discount,
      //payment_tax: parseInt(bill_tax),
      //payment_services: parseInt(bill_services),
      payment_discount: parseFloat(discount_render).toFixed(2),
      payment_tax: parseFloat(tax_render).toFixed(2),
      payment_services: parseFloat(services_render).toFixed(2),
      payment_total: parseFloat(grandTotal).toFixed(2),
      payment_amount: parseFloat(payment_amount).toFixed(2),
      payment_change: parseFloat(payment_amount - grandTotal).toFixed(2),
      status: "done",
      time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    };

    const data_post_1 = this.state.data_post_1;
    const detail = data_post_1.detail;
    let items = [];
    detail.map((v, i) => {
      let addons = [];

      const detail_addons = v.detail ? v.detail : v.Transaction_Item_Addons;

      detail_addons.map((val, index) => {
        //const contoh_data = {id: 6, name: "Sosis", price: 2000, parentId: 3}
        let addons_data_temp = {
          id: val.id,
          price: val.price ? val.price : val.price_addons
        };
        addons.push(addons_data_temp);
      });

      let temp_data = {
        sales_type_id: 1, //v.salesType === "Take-Away" ? 1 : 2,
        product_id: v.detail ? v.id : v.product_id,
        quantity: v.qty ? v.qty : v.quantity,
        price_product: v.detail ? v.product.price : v.price_product,
        price_discount: 0,
        price_service: 0, //butuh diupdate lg nanti
        price_addons_total: v.detail
          ? v.price - v.product.price
          : v.price_addons_total,
        price_total: v.detail ? v.total : v.price_total,
        notes: v.notes,
        //notes: "DARI APLIKASI",
        addons: addons
      };

      //console.log("temp_data v ==>", temp_data);

      items.push(temp_data);
    });

    let parameter_send = {
      receipt_id: data_post_1.kode,
      payment_method_id: payment_method_id,
      payment_discount: data_post_2.payment_discount,
      payment_tax: data_post_2.payment_tax,
      payment_service: data_post_2.payment_services,
      payment_total:
        data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
      amount: data_post_2.payment_amount > 0 ? data_post_2.payment_amount : 0,
      payment_change:
        data_post_2.payment_total > 0 ? data_post_2.payment_change : 0,
      items: this.props.items ? this.props.items : items,
      custom_price: this.state.customPriceFinal,
      custom_price_tax: this.state.customPriceTax === true ? 1 : 0
    };

    if (this.state.selectedCustomer) {
      parameter_send = {
        receipt_id: data_post_1.kode,
        payment_method_id: payment_method_id,
        payment_discount: data_post_2.payment_discount,
        payment_tax: data_post_2.payment_tax,
        payment_service: data_post_2.payment_services,
        payment_total:
          data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
        amount: data_post_2.payment_amount > 0 ? data_post_2.payment_amount : 0,
        payment_change:
          data_post_2.payment_total > 0 ? data_post_2.payment_change : 0,
        items: this.props.items ? this.props.items : items,
        custom_price: this.state.customPriceFinal,
        custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
        customer_id: this.state.selectedCustomer
      };
    }

    if (selected_currency_conversion) {
      parameter_send.multi_currency = true;
      parameter_send.multi_currency_origin = this.state.currency_id;
      parameter_send.multi_currency_used = this.state.currency_conversion_id;
      parameter_send.multi_currency_name = this.state.currency_conversion_name;
      parameter_send.multi_currency_ratio = this.state.currency_conversion_ratio;

      if (this.state.payment_type === "cash") {
        // parameter_send.multi_currency_total = this.state.cashAmount;
        parameter_send.multi_currency_total =
          grandTotal * this.state.currency_conversion_ratio;
        parameter_send.amount = grandTotal;
        parameter_send.payment_total = grandTotalBeforeCoupon;
        parameter_send.payment_change = 0;
      } else {
        parameter_send.multi_currency_total =
          grandTotal * this.state.currency_conversion_ratio;
        parameter_send.amount = grandTotal;
        parameter_send.payment_total = grandTotalBeforeCoupon;

        parameter_send.payment_change = 0;
      }
    }

    if (order_id) {
      //dine in save offline
      let body = {
        transaction_id: order_id,
        payment_method_id: payment_method_id,
        payment_discount: data_post_2.payment_discount,
        payment_tax: data_post_2.payment_tax,
        payment_service: data_post_2.payment_services,
        payment_total:
          data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
        amount: data_post_2.payment_amount > 0 ? data_post_2.payment_amount : 0,
        payment_change:
          data_post_2.payment_total > 0 ? data_post_2.payment_change : 0,
        custom_price: this.state.customPriceFinal,
        custom_price_tax: this.state.customPriceTax === true ? 1 : 0
      };

      if (this.state.selectedCustomer) {
        body = {
          transaction_id: order_id,
          payment_method_id: payment_method_id,
          payment_discount: data_post_2.payment_discount,
          payment_tax: data_post_2.payment_tax,
          payment_service: data_post_2.payment_services,
          payment_total:
            data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
          amount:
            data_post_2.payment_amount > 0 ? data_post_2.payment_amount : 0,
          payment_change:
            data_post_2.payment_total > 0 ? data_post_2.payment_change : 0,
          custom_price: this.state.customPriceFinal,
          custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
          customer_id: this.state.selectedCustomer
        };
      }

      if (selected_currency_conversion) {
        body.multi_currency = true;
        body.multi_currency_origin = this.state.currency_id;
        body.multi_currency_used = this.state.currency_conversion_id;
        body.multi_currency_name = this.state.currency_conversion_name;
        body.multi_currency_ratio = this.state.currency_conversion_ratio;

        if (this.state.payment_type === "cash") {
          body.multi_currency_total = this.state.cashAmount;
          body.amount = grandTotal;
          body.payment_total = grandTotalBeforeCoupon;
          body.coupon_amount = this.state.couponAmount;

          body.payment_change = 0;
        } else {
          body.multi_currency_total =
            grandTotal * this.state.currency_conversion_ratio;
          body.amount = grandTotal;
          body.payment_total = grandTotalBeforeCoupon;
          body.coupon_amount = this.state.couponAmount;
          body.payment_change = 0;
        }
      }

      let amount_discount =
        this.state.rate_discount === 0
          ? this.state.amount_discount
          : this.state.rate_discount;

      let promo_discount = {
        id: this.state.selectedDiscount,
        value: amount_discount,
        type: this.state.discountType
      };

      let promo_voucher = {
        id: this.state.selectedVoucher,
        value: this.state.voucherAmount,
        type: this.state.voucherType
      };

      let promo = [];
      if (promo_discount.id !== 0) {
        promo.push(promo_discount);
      }
      if (promo_voucher.id !== 0) {
        promo.push(promo_voucher);
      }

      if (promo.length > 0) {
        body.promo = promo;
      }

      let data_save = body;

      let temp_save_order = [];
      OfflineMenuFunctions.GetTemporaryOrderDineIn(val => {
        console.log("Get TemporaryOrder ==> ", val);
        //this.setState({ lastUpdate: val });
        if (val) {
          temp_save_order = val;
          console.log("temp_save_order ==> ", temp_save_order);
          temp_save_order.push(data_save);
          console.log("temp_save_order_push==> ", temp_save_order);

          OfflineMenuFunctions.SaveTemporaryOrderDineIn(
            temp_save_order,
            x => {}
          );
          OfflineMenuFunctions.GetTemporaryOrderDineIn(y => {
            console.log("GetTemporaryOrder After Save ==> ", y);
            //this.setState({ lastUpdate: val });
          });

          MenuFunctions.ClearNewMenuAll(val => {});
          if (this.state.access_print_bill && !this.state.manual_print) {
            this.printActionLanguage();
          }
          //this.printActionLanguageSunmi();
          this.setState({ showPaymentSuccess: true });
        } else {
          temp_save_order.push(data_save);
          OfflineMenuFunctions.SaveTemporaryOrderDineIn(
            temp_save_order,
            val => {}
          );

          MenuFunctions.ClearNewMenuAll(val => {});
          if (this.state.access_print_bill && !this.state.manual_print) {
            this.printActionLanguage();
          }
          //this.printActionLanguageSunmi();
          this.setState({ showPaymentSuccess: true });
        }
      });
    } else {
      let amount_discount =
        this.state.rate_discount === 0
          ? this.state.amount_discount
          : this.state.rate_discount;

      let promo_discount = {
        id: this.state.selectedDiscount,
        value: amount_discount,
        type: this.state.discountType
      };

      let promo_voucher = {
        id: this.state.selectedVoucher,
        value: this.state.voucherAmount,
        type: this.state.voucherType
      };

      let promo = [];
      if (promo_discount.id !== 0) {
        promo.push(promo_discount);
      }
      if (promo_voucher.id !== 0) {
        promo.push(promo_voucher);
      }

      if (promo.length > 0) {
        parameter_send.promo = promo;
      }

      let data_save = parameter_send;

      let temp_save_order = [];
      OfflineMenuFunctions.GetTemporaryOrder(val => {
        console.log("Get TemporaryOrder ==> ", val);
        //this.setState({ lastUpdate: val });
        if (val) {
          temp_save_order = val;
          console.log("temp_save_order ==> ", temp_save_order);
          temp_save_order.push(data_save);
          console.log("temp_save_order_push==> ", temp_save_order);

          OfflineMenuFunctions.SaveTemporaryOrder(temp_save_order, x => {});
          OfflineMenuFunctions.GetTemporaryOrder(y => {
            console.log("GetTemporaryOrder After Save ==> ", y);
            //this.setState({ lastUpdate: val });
          });

          MenuFunctions.ClearNewMenuAll(val => {});
          if (this.state.access_print_bill && !this.state.manual_print) {
            this.printActionLanguage();
          }
          this.setState({ showPaymentSuccess: true });
        } else {
          temp_save_order.push(data_save);
          OfflineMenuFunctions.SaveTemporaryOrder(temp_save_order, val => {});

          MenuFunctions.ClearNewMenuAll(val => {});
          if (this.state.access_print_bill && !this.state.manual_print) {
            this.printActionLanguage();
          }
          this.setState({ showPaymentSuccess: true });
        }
      });
    }
  }

  checkOutAction(times = 0) {
    const {
      cashAmount,
      order_id,
      userInfo,
      payment_type,
      bill_transId,
      data_order,
      bill_subTotal,
      //bill_discount,
      bill_tax,
      bill_services,
      payment_method_id,
      rate_tax,
      rate_services,
      cz_uri,
      selected_currency_conversion
    } = this.state;

    //console.log("check out action ===> ", times)

    const bill_discount =
      this.state.grandTotalDefault - this.state.grandTotalRound;

    let grandTotal = this.state.grandTotal;

    grandTotal = this.state.grandTotalRound;
    let grandTotalBeforeCoupon = this.state.grandTotalBeforeCoupon;

    const discount_render =
      this.state.bill_discount >= this.state.bill_subTotal
        ? this.state.bill_subTotal
        : this.state.bill_discount;

    const tax_render = (bill_subTotal - discount_render) * rate_tax;

    const services_render = (bill_subTotal - discount_render) * rate_services;

    let payment_amount = 0;
    this.setState({ loading: true });

    if (payment_type === "cash") {
      payment_amount = cashAmount;
    } else {
      payment_amount = grandTotal;
    }

    // if (payment_type === "gopay") {
    //   payment_method_id = 1;
    // }
    // if (payment_type === "cash") {
    //   payment_method_id = 2;
    // }

    // if (payment_type === "shopee") {
    //   payment_method_id = 3;
    // }

    // if (payment_type === "ovo") {
    //   payment_method_id = 4;
    // }

    // console.log("check out action");

    // console.log(cashAmount);

    // console.log(grandTotal);

    // console.log(payment_type);
    if (times > 3) {
      this.offlineCheckOutAction();
    } else {
      if (
        cashAmount >= grandTotal * this.state.currency_conversion_ratio ||
        payment_type !== "cash"
      ) {
        console.log("check out enough money");

        //this.printAction();
        NetInfo.fetch().then(state => {
          //debug offline
          if (state.isConnected) {
            const data_post_1 = this.state.data_post_1;
            console.log("data_post_1 ==> ", data_post_1);

            const data_post_2 = {
              order_id: order_id,
              cashier_id: userInfo.id,
              payment_type: payment_type,
              reference_id: bill_transId,
              customer_id: data_order.customer_id
                ? data_order.customer_id
                : this.state.selectedCustomer,
              payment_subtotal: bill_subTotal,
              //payment_discount: bill_discount,
              //payment_tax: parseInt(bill_tax),
              //payment_services: parseInt(bill_services),
              payment_discount: parseFloat(discount_render).toFixed(2),
              payment_tax: parseFloat(tax_render).toFixed(2),
              payment_services: parseFloat(services_render).toFixed(2),
              payment_total: parseFloat(grandTotal).toFixed(2),
              payment_amount: parseFloat(payment_amount).toFixed(2),
              payment_change: parseFloat(payment_amount - grandTotal).toFixed(
                2
              ),
              status: "done",
              time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            };

            console.log("data_post_2 ==> ", data_post_2);

            const detail = data_post_1.detail;
            let items = [];
            detail.map((v, i) => {
              let addons = [];

              const detail_addons = v.detail
                ? v.detail
                : v.Transaction_Item_Addons;

              detail_addons.map((val, index) => {
                //const contoh_data = {id: 6, name: "Sosis", price: 2000, parentId: 3}
                let addons_data_temp = {
                  id: val.id,
                  price: val.price ? val.price : val.price_addons
                };
                addons.push(addons_data_temp);
              });

              console.log("detail.map v ==>", v);

              let temp_data = {
                sales_type_id: 1, //v.salesType === "Take-Away" ? 1 : 2,
                product_id: v.detail ? v.id : v.product_id,
                quantity: v.qty ? v.qty : v.quantity,
                price_product: v.detail ? v.product.price : v.price_product,
                price_discount: 0,
                price_service: 0, //butuh diupdate lg nanti
                price_addons_total: v.detail
                  ? v.price - v.product.price
                  : v.price_addons_total,
                price_total: v.detail ? v.total : v.price_total,
                notes: v.notes,
                //notes: "DARI APLIKASI",
                addons: addons
              };

              //console.log("temp_data v ==>", temp_data);

              items.push(temp_data);
            });

            let parameter_send = {
              receipt_id: data_post_1.kode,
              payment_method_id: payment_method_id,
              payment_discount: data_post_2.payment_discount,
              payment_tax: data_post_2.payment_tax,
              payment_service: data_post_2.payment_services,
              payment_total:
                data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
              amount:
                data_post_2.payment_amount > 0 ? data_post_2.payment_amount : 0,
              payment_change:
                data_post_2.payment_total > 0 ? data_post_2.payment_change : 0,
              items: this.props.items ? this.props.items : items,
              custom_price: this.state.customPriceFinal,
              custom_price_tax: this.state.customPriceTax === true ? 1 : 0
            };

            if (this.state.selectedCustomer) {
              parameter_send = {
                receipt_id: data_post_1.kode,
                payment_method_id: payment_method_id,
                payment_discount: data_post_2.payment_discount,
                payment_tax: data_post_2.payment_tax,
                payment_service: data_post_2.payment_services,
                payment_total:
                  data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
                amount:
                  data_post_2.payment_amount > 0
                    ? data_post_2.payment_amount
                    : 0,
                payment_change:
                  data_post_2.payment_total > 0
                    ? data_post_2.payment_change
                    : 0,
                items: this.props.items ? this.props.items : items,
                custom_price: this.state.customPriceFinal,
                custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
                customer_id: this.state.selectedCustomer
              };
            }

            if (selected_currency_conversion) {
              parameter_send.multi_currency = true;
              parameter_send.multi_currency_origin = this.state.currency_id;
              parameter_send.multi_currency_used = this.state.currency_conversion_id;
              parameter_send.multi_currency_name = this.state.currency_conversion_name;
              parameter_send.multi_currency_ratio = this.state.currency_conversion_ratio;

              if (this.state.payment_type === "cash") {
                // parameter_send.multi_currency_total = this.state.cashAmount;
                parameter_send.multi_currency_total =
                  grandTotal * this.state.currency_conversion_ratio;
                parameter_send.amount = grandTotal;
                parameter_send.payment_total = grandTotalBeforeCoupon;
                parameter_send.coupon_amount = this.state.couponAmount;
                parameter_send.payment_change = 0;
              } else {
                parameter_send.multi_currency_total =
                  grandTotal * this.state.currency_conversion_ratio;
                parameter_send.amount = grandTotal;
                parameter_send.payment_total = grandTotalBeforeCoupon;
                parameter_send.coupon_amount = this.state.couponAmount;
                parameter_send.payment_change = 0;
              }
            }

            console.log("parameter_send post ==> ", parameter_send);
            console.log(
              "this.state.selectedCustomer ==> ",
              this.state.selectedCustomer
            );

            console.log("data Bill ==> ", detail);
            console.log("this.props.items ==> ", this.props.items);

            if (order_id) {
              //dine in
              let body = {
                transaction_id: order_id,
                payment_method_id: payment_method_id,
                payment_discount: data_post_2.payment_discount,
                payment_tax: data_post_2.payment_tax,
                payment_service: data_post_2.payment_services,
                payment_total:
                  data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
                amount:
                  data_post_2.payment_amount > 0
                    ? data_post_2.payment_amount
                    : 0,
                payment_change:
                  data_post_2.payment_total > 0
                    ? data_post_2.payment_change
                    : 0,
                custom_price: this.state.customPriceFinal,
                custom_price_tax: this.state.customPriceTax === true ? 1 : 0
              };

              if (this.state.selectedCustomer) {
                body = {
                  transaction_id: order_id,
                  payment_method_id: payment_method_id,
                  payment_discount: data_post_2.payment_discount,
                  payment_tax: data_post_2.payment_tax,
                  payment_service: data_post_2.payment_services,
                  payment_total:
                    data_post_2.payment_total > 0
                      ? data_post_2.payment_total
                      : 0,
                  amount:
                    data_post_2.payment_amount > 0
                      ? data_post_2.payment_amount
                      : 0,
                  payment_change:
                    data_post_2.payment_total > 0
                      ? data_post_2.payment_change
                      : 0,
                  custom_price: this.state.customPriceFinal,
                  custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
                  customer_id: this.state.selectedCustomer
                };
              }

              let promo_example = [
                { id: 1, value: 30, type: "percentage" },
                { id: 2, value: 5000, type: "currency" }
              ];

              let amount_discount =
                this.state.rate_discount === 0
                  ? this.state.amount_discount
                  : this.state.rate_discount;

              let promo_discount = {
                id: this.state.selectedDiscount,
                value: amount_discount,
                type: this.state.discountType
              };

              let promo_voucher = {
                id: this.state.selectedVoucher,
                value: this.state.voucherAmount,
                type: this.state.voucherType
              };

              let promo = [];
              if (promo_discount.id !== 0) {
                promo.push(promo_discount);
              }
              if (promo_voucher.id !== 0) {
                promo.push(promo_voucher);
              }

              if (promo.length > 0) {
                body.promo = promo;
              }

              if (this.state.cz_uri) {
                body.cashlez_payment_id = this.state.cz_uri;
              }

              if (selected_currency_conversion) {
                body.multi_currency = true;
                body.multi_currency_origin = this.state.currency_id;
                body.multi_currency_used = this.state.currency_conversion_id;
                body.multi_currency_name = this.state.currency_conversion_name;
                body.multi_currency_ratio = this.state.currency_conversion_ratio;

                if (this.state.payment_type === "cash") {
                  body.multi_currency_total = this.state.cashAmount;
                  body.amount = grandTotal;
                  body.payment_total = grandTotalBeforeCoupon;
                  body.coupon_amount = this.state.couponAmount;

                  body.payment_change = 0;
                } else {
                  body.multi_currency_total =
                    grandTotal * this.state.currency_conversion_ratio;
                  body.amount = grandTotal;
                  body.payment_total = grandTotalBeforeCoupon;
                  body.coupon_amount = this.state.couponAmount;
                  body.payment_change = 0;
                }
              }

              body.payment_delivery = this.state.payment_delivery;

              if (this.state.useSaldo) {
                body.use_saldo = this.state.useSaldo;
              }

              if (this.state.couponAmount > 0) {
                body.coupon_amount = this.state.couponAmount;
                body.payment_total = this.state.grandTotalBeforeCoupon;
              }

              let uri = BE_Payment;
              console.log("uri ==> BE_Payment ", BE_Payment);

              console.log("uri ==> orderId ", this.state.order_id);

              console.log("body BE_Payment ===> ", body);

              fetch(uri, {
                method: "POST", //dine in
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: this.state.auth
                },
                body: JSON.stringify(body)
              })
                .then(response => response.json())
                .then(responseJson => {
                  console.log("Response Payment uri ==> ", uri);
                  console.log(
                    "Response Payment this.state.auth ==> ",
                    this.state.auth
                  );

                  console.log("Response Payment BE PAYMENT ==> ", responseJson);

                  //alert("Payment Action");
                  //console.log('new data ==>', JSON.stringify(data))

                  if (responseJson.statusCode === 201) {
                    MenuFunctions.ClearNewMenuAll(val => {});

                    let transaction_id = responseJson.data.transaction_id;
                    console.log("Dine In? ");

                    if (this.state.selectedCustomer) {
                      this.oneSignalSendCustomer(this.state.selectedCustomer);
                    }
                    this.updateCustomerSaldo(transaction_id);
                    this.updateCustomerHistoryPoint(transaction_id);
                    this.updateCustomerVoucherHistory(transaction_id);
                    if (this.selectedVoucher !== 0) {
                      this.updateVoucherPromoHistory(transaction_id);
                    }

                    if (this.selectedDiscount !== 0) {
                      this.updateSpecialPromoHistory(transaction_id);
                    }

                    this.setState({
                      transaction_id: transaction_id,
                      showPaymentSuccess: true,
                      loading: false,
                      dine_in_print: true
                    });

                    if (this.state.commissionSelectedStaff.length > 0) {
                      this.postCommission(transaction_id);
                    }

                    if (this.state.couponAmount > 0) {
                      this.useCoupon(transaction_id);
                    }

                    if (
                      this.state.access_print_bill &&
                      this.state.printer_main &&
                      !this.state.manual_print
                    ) {
                      //this.printAction();
                      //dineIn

                      console.log("Dine In access_print_bill");

                      setTimeout(() => {
                        this.connect(this.state.printer_main.address);
                        setTimeout(() => {
                          this.connect(this.state.printer_main.address);
                          setTimeout(() => {
                            this.printActionLanguage(false, false, true);
                          }, 500);
                        }, 500);
                      }, 500);
                    }
                    //this.printActionLanguageSunmi(false, false, true);
                  } else {
                    if (responseJson.message === "no unit conversion found") {
                      const alert_message = [
                        "Unit bahan baku salah, mohon dikoreksi terlebih dahulu",
                        "Raw Material Unit incorrect/Cannot be converted, please correct them first."
                      ];
                      alert(alert_message[this.state.languageIndex]);
                    } else {
                      alert("Transaksi Gagal");
                    }

                    this.setState({ loading: false });
                    //alert("Transaksi Gagal");
                  }
                  //
                })
                .catch(_err => {
                  console.log("err ==> ", _err);
                  if (times > 3) {
                    this.checkOutAction(times + 1);
                  } else {
                    this.setState({ loading: false });
                    //alert("Transaksi Gagal, Mohon coba kembali");
                  }
                });
            } else {
              //create direct payment
              if (this.state.direct_payment) {
                let uri = BE_Create_Transaction + "create-simple";
                console.log(
                  "uri ==> BE_Create_Transaction ",
                  BE_Create_Transaction + "create-simple"
                );
                console.log("uri ==> orderId ", this.state.order_id);

                let promo_example = [
                  { id: 1, value: 30, type: "percentage" },
                  { id: 2, value: 5000, type: "currency" }
                ];

                let amount_discount =
                  this.state.rate_discount === 0
                    ? this.state.amount_discount
                    : this.state.rate_discount;

                let promo_discount = {
                  id: this.state.selectedDiscount,
                  value: amount_discount,
                  type: this.state.discountType
                };

                let promo_voucher = {
                  id: this.state.selectedVoucher,
                  value: this.state.voucherAmount,
                  type: this.state.voucherType
                };

                let promo = [];
                if (promo_discount.id !== 0) {
                  promo.push(promo_discount);
                }
                if (promo_voucher.id !== 0) {
                  promo.push(promo_voucher);
                }

                if (promo.length > 0) {
                  parameter_send.promo = promo;
                }

                console.log(
                  "parameter_send BE_Create_Transaction ==> ",
                  parameter_send
                );

                console.log(
                  "parameter_send BE_Create_Transaction JSON.stringify ==> ",
                  JSON.stringify(parameter_send)
                );

                if (this.state.cz_uri) {
                  parameter_send.cashlez_payment_id = this.state.cz_uri;
                }

                parameter_send.payment_delivery = this.state.payment_delivery;

                if (this.state.useSaldo) {
                  parameter_send.use_saldo = this.state.useSaldo;
                }

                let data_temp =
                  moment(new Date()).format("YY/MM/DD-HH/mm/ss") +
                  "-" +
                  this.state.userInfo.gerai_id;

                let parameter_send_direct_payment = {
                  receipt_id: data_temp,
                  customer_id: parameter_send.customer_id,
                  payment_method_id: parameter_send.payment_method_id,
                  promo: parameter_send.promo,
                  custom_price_tax: parameter_send.custom_price_tax,
                  custom_price: parameter_send.custom_price,

                  amount: parameter_send.amount,
                  payment_change: parameter_send.payment_change,
                  payment_total: parameter_send.payment_total,
                  payment_discount: parameter_send.payment_discount,
                  payment_tax: parameter_send.payment_tax,
                  payment_service: parameter_send.payment_service,

                  // table_id: parameter_send,
                  // time_in: parameter_send,
                  // time_out: parameter_send,
                  created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                  cashlez_payment_id: parameter_send.cashlez_payment_id,
                  multi_currency: parameter_send.multi_currency,
                  multi_currency_origin: parameter_send.multi_currency_origin,
                  multi_currency_used: parameter_send.multi_currency_used,
                  multi_currency_name: parameter_send.multi_currency_name,
                  multi_currency_ratio: parameter_send.multi_currency_ratio,
                  multi_currency_total: parameter_send.multi_currency_total,
                  payment_delivery: parameter_send.payment_delivery
                };

                if (this.state.couponAmount > 0) {
                  parameter_send_direct_payment.coupon_amount = this.state.couponAmount;
                  parameter_send_direct_payment.payment_total = this.state.grandTotalBeforeCoupon;
                  // parameter_send_direct_payment.amount = this.state.grandTotalBeforeCoupon;
                }

                fetch(uri, {
                  method: "POST", //create new transaction direct payment
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: this.state.auth
                    //Authorization: "ABC"
                  },
                  body: JSON.stringify(parameter_send_direct_payment)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log("Response Payment uri ==> ", uri);
                    console.log(
                      "Response Payment this.state.auth ==> ",
                      this.state.auth
                    );

                    console.log(
                      "Response Payment BE CREATE TRANSACTION ==> ",
                      responseJson
                    );

                    if (responseJson.statusCode === 201) {
                      let payment_id = responseJson.data.Payment.id;
                      let transaction_id =
                        responseJson.data.Payment.transaction_id;
                      MenuFunctions.ClearNewMenuAll(val => {});
                      this.updateCustomerSaldo(transaction_id);
                      this.updateCustomerHistoryPoint(transaction_id);
                      this.updateCustomerVoucherHistory(transaction_id);
                      if (this.selectedVoucher !== 0) {
                        this.updateVoucherPromoHistory(transaction_id);
                      }

                      if (this.selectedDiscount !== 0) {
                        this.updateSpecialPromoHistory(transaction_id);
                      }

                      if (this.state.selectedCustomer) {
                        const pesan = "Transaksi Berhasil";
                        console.log(
                          "oneSignalSendCustomer ===> ",
                          this.state.selectedCustomer
                        );
                        this.oneSignalSendCustomer(this.state.selectedCustomer);
                      }

                      this.setState({
                        transaction_id: transaction_id,
                        showPaymentSuccess: true,
                        loading: false,
                        dine_in_print: true
                      });

                      if (this.state.commissionSelectedStaff.length > 0) {
                        this.postCommission(transaction_id);
                      }

                      if (this.state.couponAmount > 0) {
                        this.useCoupon(transaction_id);
                      }

                      if (
                        this.state.access_print_bill &&
                        this.state.printer_main &&
                        !this.state.manual_print
                      ) {
                        // this.printAction();
                        // take away
                        console.log("Take Away??? ");
                        this.connect(this.state.printer_main.address);
                        setTimeout(() => {
                          setTimeout(() => {
                            setTimeout(() => {
                              this.connect(this.state.printer_main.address);
                              setTimeout(() => {
                                if (this.state.printer2) {
                                  this.printActionLanguage(
                                    true,
                                    true,
                                    true,
                                    0,
                                    true
                                  );
                                } else {
                                  this.printActionLanguage(
                                    false,
                                    false,
                                    true,
                                    0,
                                    true
                                  );
                                }
                              }, 500);
                            }, 500);
                          }, 500);

                          // if (this.state.printer2) {
                          //   this.printActionLanguage(true, true, true);
                          // } else {
                          //   this.printActionLanguage(false, false, true);
                          // }
                        }, 500);
                      }
                    } else {
                      if (responseJson.statusCode === 400) {
                        if (
                          responseJson.message === "no unit conversion found"
                        ) {
                          const alert_message = [
                            "Unit bahan baku salah, mohon dikoreksi terlebih dahulu",
                            "Raw Material Unit incorrect/Cannot be converted, please correct them first."
                          ];
                          alert(alert_message[this.state.languageIndex]);
                        } else {
                          alert("Transaksi Gagal");
                        }

                        this.setState({ loading: false });
                      }
                    }
                  })
                  .catch(_err => {
                    if (times > 3) {
                      this.checkOutAction(times + 1);
                    } else {
                      this.setState({ loading: false });
                      //alert("Transaksi Gagal, Mohon coba kembali");
                    }
                  });
              } else {
                // create payment transaction
                let uri = BE_Create_Transaction;
                console.log(
                  "uri ==> BE_Create_Transaction ",
                  BE_Create_Transaction
                );
                console.log("uri ==> orderId ", this.state.order_id);

                let promo_example = [
                  { id: 1, value: 30, type: "percentage" },
                  { id: 2, value: 5000, type: "currency" }
                ];

                let amount_discount =
                  this.state.rate_discount === 0
                    ? this.state.amount_discount
                    : this.state.rate_discount;

                let promo_discount = {
                  id: this.state.selectedDiscount,
                  value: amount_discount,
                  type: this.state.discountType
                };

                let promo_voucher = {
                  id: this.state.selectedVoucher,
                  value: this.state.voucherAmount,
                  type: this.state.voucherType
                };

                let promo = [];
                if (promo_discount.id !== 0) {
                  promo.push(promo_discount);
                }
                if (promo_voucher.id !== 0) {
                  promo.push(promo_voucher);
                }

                if (promo.length > 0) {
                  parameter_send.promo = promo;
                }

                if (this.state.cz_uri) {
                  parameter_send.cashlez_payment_id = this.state.cz_uri;
                }

                parameter_send.payment_delivery = this.state.payment_delivery;

                if (this.state.useSaldo) {
                  parameter_send.use_saldo = this.state.useSaldo;
                }

                if (this.state.allowKitchenManagement) {
                  let queue_number = this.state.queue_number;
                  if (queue_number < 1) {
                    queue_number = 1;
                  }
                  parameter_send.kitchen = true;
                  parameter_send.queue_number = this.state.queue_number;
                }

                if (this.state.couponAmount > 0) {
                  parameter_send.coupon_amount = this.state.couponAmount;
                  parameter_send.payment_total = this.state.grandTotalBeforeCoupon;
                }

                console.log(
                  "parameter_send BE_Create_Transaction CREATE NEW TRANS ==> ",
                  parameter_send
                );

                // console.log(
                //   "parameter_send BE_Create_Transaction JSON.stringify ==> ",
                //   JSON.stringify(parameter_send)
                // );

                fetch(uri, {
                  method: "POST", //create new transaction
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: this.state.auth
                    //Authorization: "ABC"
                  },
                  body: JSON.stringify(parameter_send)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log("Response Payment uri ==> ", uri);
                    console.log(
                      "Response Payment this.state.auth ==> ",
                      this.state.auth
                    );

                    console.log(
                      "Response Payment BE CREATE TRANSACTION ==> ",
                      responseJson
                    );

                    if (responseJson.statusCode === 201) {
                      let payment_id = responseJson.data.Payment.id;
                      let transaction_id =
                        responseJson.data.Payment.transaction_id;
                      MenuFunctions.ClearNewMenuAll(val => {});
                      this.updateCustomerSaldo(transaction_id);
                      this.updateCustomerHistoryPoint(transaction_id);
                      this.updateCustomerVoucherHistory(transaction_id);
                      if (this.selectedVoucher !== 0) {
                        this.updateVoucherPromoHistory(transaction_id);
                      }

                      if (this.selectedDiscount !== 0) {
                        this.updateSpecialPromoHistory(transaction_id);
                      }

                      if (this.state.selectedCustomer) {
                        const pesan = "Transaksi Berhasil";
                        console.log(
                          "oneSignalSendCustomer ===> ",
                          this.state.selectedCustomer
                        );
                        this.oneSignalSendCustomer(this.state.selectedCustomer);
                      }
                      if (this.state.allowKitchenManagement) {
                        this.sendMessageKitchen();
                      }

                      this.setState({
                        transaction_id: transaction_id,
                        showPaymentSuccess: true,
                        loading: false,
                        dine_in_print: true
                      });

                      if (this.state.commissionSelectedStaff.length > 0) {
                        this.postCommission(transaction_id);
                      }

                      if (this.state.couponAmount > 0) {
                        this.useCoupon(transaction_id);
                      }

                      if (
                        this.state.access_print_bill &&
                        this.state.printer_main &&
                        !this.state.manual_print
                      ) {
                        // this.printAction();
                        // take away
                        console.log("Take Away??? ");
                        this.connect(this.state.printer_main.address);
                        setTimeout(() => {
                          setTimeout(() => {
                            setTimeout(() => {
                              this.connect(this.state.printer_main.address);
                              setTimeout(() => {
                                if (this.state.printer2) {
                                  this.printActionLanguage(
                                    true,
                                    true,
                                    true,
                                    0,
                                    true
                                  );
                                } else {
                                  this.printActionLanguage(
                                    false,
                                    false,
                                    true,
                                    0,
                                    true
                                  );
                                }
                              }, 500);
                            }, 500);
                          }, 500);

                          // this.printActionLanguageSunmi(false, false, true);

                          // if (this.state.printer2) {
                          //   this.printActionLanguage(true, true, true);
                          // } else {
                          //   this.printActionLanguage(false, false, true);
                          // }
                        }, 500);
                      }
                    } else {
                      if (responseJson.statusCode === 400) {
                        if (
                          responseJson.message === "no unit conversion found"
                        ) {
                          const alert_message = [
                            "Unit bahan baku salah, mohon dikoreksi terlebih dahulu",
                            "Raw Material Unit incorrect/Cannot be converted, please correct them first."
                          ];
                          alert(alert_message[this.state.languageIndex]);
                        } else {
                          alert("Transaksi Gagal");
                        }

                        this.setState({ loading: false });
                      }
                    }
                  })
                  .catch(_err => {
                    if (times > 3) {
                      this.checkOutAction(times + 1);
                    } else {
                      this.setState({ loading: false });
                      //alert("Transaksi Gagal, Mohon coba kembali");
                    }
                  });
              }
            }
          } else {
            //offline payment

            this.offlineCheckOutAction();

            // const data_post_1 = this.state.data_post_1;
            // const data_post_2 = {
            //   order_id: order_id,
            //   cashier_id: userInfo.id,
            //   payment_type: payment_type,
            //   reference_id: bill_transId,
            //   customer_id: data_order.customer_id,
            //   payment_subtotal: bill_subTotal,
            //   payment_discount: bill_discount,
            //   payment_tax: parseInt(bill_tax),
            //   payment_services: parseInt(bill_services),
            //   payment_total: grandTotal,
            //   payment_amount: payment_amount,
            //   payment_change: parseInt(payment_amount) - parseInt(grandTotal),
            //   status: "done",
            //   time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            // };
            // const detail = data_post_1.detail;
            // let items = [];
            // detail.map((v, i) => {
            //   let addons = [];

            //   v.detail.map((val, index) => {
            //     //const contoh_data = {id: 6, name: "Sosis", price: 2000, parentId: 3}
            //     let addons_data_temp = {
            //       id: val.id,
            //       price: val.price
            //     };
            //     addons.push(addons_data_temp);
            //   });

            //   let temp_data = {
            //     sales_type_id: 1, //v.salesType === "Take-Away" ? 1 : 2,
            //     product_id: v.id,
            //     quantity: v.qty,
            //     price_product: v.product.price,
            //     price_discount: 0,
            //     price_service: 0, //butuh diupdate lg nanti
            //     price_addons_total: v.price - v.product.price,
            //     price_total: v.total,
            //     notes: v.notes,
            //     addons: addons
            //   };

            //   items.push(temp_data);
            // });

            // //"time_in": "2020-10-26 15:00:00",
            // //"time_out": "2020-10-26 16:00:00",
            // //"table_id": 3
            // //parameter tambahan untuk dine-in

            // let parameter_send = {};

            // if (data_order.table_id === 0) {
            //   parameter_send = {
            //     receipt_id: data_post_1.kode,
            //     payment_method_id: payment_method_id,
            //     payment_discount: data_post_2.payment_discount,
            //     payment_tax: data_post_2.payment_tax,
            //     payment_service: data_post_2.payment_services,
            //     payment_total: data_post_2.payment_total,
            //     amount: parseInt(data_post_2.payment_amount),
            //     payment_change: data_post_2.payment_change,
            //     items: this.props.items ? this.props.items : items,
            //     custom_price: this.state.customPriceFinal,
            //     custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
            //     created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            //   };
            // } else {
            //   parameter_send = {
            //     receipt_id: data_post_1.kode,
            //     payment_method_id: payment_method_id,
            //     payment_discount: data_post_2.payment_discount,
            //     payment_tax: data_post_2.payment_tax,
            //     payment_service: data_post_2.payment_services,
            //     payment_total: data_post_2.payment_total,
            //     amount: parseInt(data_post_2.payment_amount),
            //     payment_change: data_post_2.payment_change,
            //     items: this.props.items ? this.props.items : items,
            //     custom_price: this.state.customPriceFinal,
            //     custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
            //     created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            //     time_in: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            //     time_out: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            //     table_id: data_order.table_id
            //   };
            // }

            // //console.log("payment post 1 ==> ", data_post_1);
            // //console.log("payment post 2 ==> ", data_post_2);

            // console.log("data order ==> ", data_order);

            // const data_save = parameter_send;
            // console.log("data_save ==> ", data_save);

            // let temp_save_order = [];
            // //OfflineMenuFunctions.SaveOrderMenu([], val => {});
            // OfflineMenuFunctions.GetTemporaryOrder(val => {
            //   console.log("Get TemporaryOrder ==> ", val);
            //   //this.setState({ lastUpdate: val });
            //   if (val) {
            //     temp_save_order = val;
            //     console.log("temp_save_order ==> ", temp_save_order);
            //     temp_save_order.push(data_save);
            //     console.log("temp_save_order_push==> ", temp_save_order);

            //     OfflineMenuFunctions.SaveTemporaryOrder(temp_save_order, x => {});
            //     OfflineMenuFunctions.GetTemporaryOrder(y => {
            //       console.log("GetTemporaryOrder After Save ==> ", y);
            //       //this.setState({ lastUpdate: val });
            //     });
            //   } else {
            //     temp_save_order.push(data_save);
            //     OfflineMenuFunctions.SaveTemporaryOrder(
            //       temp_save_order,
            //       val => {}
            //     );
            //   }
            // });

            // MenuFunctions.ClearNewMenuAll(val => {});
            // if (this.state.access_print_bill) {
            //   this.printActionLanguage();
            // }
            // this.setState({ showPaymentSuccess: true });
          }
        });
      } else {
        this.setState({ loading: false });
        alert(_alert_kurang[this.state.languageIndex]);
      }
    }
  }

  updateCustomerVoucherHistory(transaction_id) {
    const {
      usePoints,
      points_used,
      selectedCustomer,
      points_gain,
      customerVoucherData,
      selectedCustomerVoucher
    } = this.state;
    // console.log("usePoints ===> ", usePoints);

    // console.log("POINTS USED ===> ", points_used);

    // console.log("selectedCustomer ===> ", selectedCustomer);

    // console.log("points_gain ===> ", points_gain);

    const outlet_id = this.state.userInfo.gerai_id;

    if (selectedCustomer) {
      if (selectedCustomerVoucher && customerVoucherData) {
        const uri = BE_Customer_Voucher_History + "/use-voucher";

        const body = {
          //voucher_id
          customer_id: selectedCustomer,
          transaction_id: transaction_id,
          outlet_id: outlet_id,
          personal_voucher_id: selectedCustomerVoucher,
          voucher_id: customerVoucherData.Customer_Voucher_List.id,
          discount_amount: this.state.print_voucher_customer
        };

        console.log("body ===> ", body);

        fetch(uri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.state.auth
          },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(
              "responseJson updateCustomerVoucherHistory ===> ",
              responseJson
            );
          });
      }
    }
  }

  updateCustomerSaldo(transaction_id) {
    const {
      useSaldo,
      grandTotalRound,
      selectedCustomer,
      points_gain,
      selectedCustomerData
    } = this.state;

    const outlet_id = this.state.userInfo.gerai_id;
    const business_id = this.state.userInfo.retail_id;

    if (useSaldo) {
      const uri = BE_Customer_Saldo_History + "/reduce-saldo";

      const body = {
        customer_account_id: selectedCustomerData.Customer_Account.id,
        customer_id: selectedCustomer,
        transaction_id: transaction_id,
        outlet_id: outlet_id,
        business_id: business_id,
        transaction_code: this.state.bill_transId,
        points: points_gain,
        status: "active",
        type: "transaction",
        balance: grandTotalRound
      };

      console.log("body ===> ", body);

      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.state.auth
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("responseJson USE SALDO ===> ", responseJson);
        });
    }

    //simpan saldo history dan pemakaian saldo
  }

  updateCustomerHistoryPoint(transaction_id) {
    const {
      usePoints,
      points_used,
      selectedCustomer,
      points_gain
    } = this.state;
    console.log("usePoints ===> ", usePoints);

    console.log("POINTS USED ===> ", points_used);

    console.log("selectedCustomer ===> ", selectedCustomer);

    console.log("points_gain ===> ", points_gain);

    const outlet_id = this.state.userInfo.gerai_id;

    const update_level = true;

    if (selectedCustomer) {
      if (update_level) {
        const uri = BE_Customer_Membership + "/level-up/" + selectedCustomer;

        fetch(uri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log("responseJson Level Up ===> ", responseJson);
          });
      }

      if (points_gain > 0 && points_used < 1) {
        const uri = BE_Customer_Point_History;
        const body = {
          customer_id: selectedCustomer,
          transaction_id: transaction_id,
          outlet_id: outlet_id,
          transaction_code: this.state.bill_transId,
          points: points_gain,
          status: 1,
          description: "Loyalty Promo Gain"
        };

        console.log("body ===> ", body);

        fetch(uri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.state.auth
          },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log("responseJson Loyalty Promo Gain ===> ", responseJson);
          });
      } else {
        const uri = BE_Customer_Point_History + "/create-advanced/";

        const point = 0 - points_used;

        const body = {
          customer_id: selectedCustomer,
          transaction_id: transaction_id,
          outlet_id: outlet_id,
          transaction_code: this.state.bill_transId,
          points: point,
          status: 1,
          description: "Loyalty Promo Use"
        };

        console.log("body ===> ", body);

        fetch(uri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.state.auth
          },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(
              "responseJson Loyalty Promo Use advanced ===> ",
              responseJson
            );
          });
      }
    }

    ///// tambah fungsi update point dan simpan history point disini
  }

  updateVoucherPromoHistory(transaction_id) {
    const {
      usePoints,
      points_used,
      selectedCustomer,
      points_gain
    } = this.state;
    const outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Voucher_Promo_History;
    const body = {
      customer_id: selectedCustomer,
      transaction_id: transaction_id,
      outlet_id: outlet_id,
      transaction_code: this.state.bill_transId,
      voucher_promo_id: this.state.selectedVoucherId,
      discount_amount:
        this.state.print_voucher - this.state.print_voucher_customer
    };

    console.log("body ===> ", body);

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          "responseJson updateVoucherPromoHistory ===> ",
          responseJson
        );
      });
  }

  updateSpecialPromoHistory(transaction_id) {
    const {
      usePoints,
      points_used,
      selectedCustomer,
      points_gain
    } = this.state;
    const outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Special_Promo_History;
    const body = {
      customer_id: selectedCustomer,
      transaction_id: transaction_id,
      outlet_id: outlet_id,
      transaction_code: this.state.bill_transId,
      special_promo_id: this.state.selectedDiscountId,
      discount_amount: this.state.print_discount
    };

    console.log("body ===> ", body);

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          "responseJson updateSpecialPromoHistory ===> ",
          responseJson
        );
      });
  }

  useCoupon(trans_id) {
    const uri = `${BE_Coupon}/use`;
    const coupon_codes = this.state.listCouponUsage;
    const transaction_id = trans_id;

    const body = {
      coupon_codes: coupon_codes,
      transaction_id: transaction_id
    };

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("use coupons ===> ", result);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  postCommission(trans_id) {
    const uri = `${BE_Transaction_Commission}`;
    const outlet_id = this.state.userInfo.gerai_id;
    const retail_id = this.state.userInfo.retail_id;

    const body = {
      business_id: retail_id,
      outlet_id: outlet_id,
      transaction_id: trans_id,
      commission_id: this.state.dataCommission[0].id,
      staff_id: JSON.stringify(this.state.commissionSelectedStaff),
      product_id: "",
      total_commission: this.state.dataCommission[0].total
    };

    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("postCommission ===> ", result);
        //console.log("responseJSON Show Customer ==> ", result);
        // if (result.statusCode === 200) {
        //   let resultData = result.data;

        //   let device_id = "";

        //   if (resultData.Customer_Account) {
        //     if (resultData.Customer_Account.device_id) {
        //       device_id = resultData.Customer_Account.device_id;
        //     }
        //   }

        //   if (device_id !== "") {
        //     console.log("send notif device_id ", device_id);
        //     this.sendNotif(device_id);
        //   }
        // } else {
        // }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  oneSignalSendCustomer(customer_id) {
    const disable = true;
    if (!disable) {
      const uri = `${BE_Customer}/${customer_id}`;
      //console.log("getListCustomer URI ==> ", uri);
      fetch(uri, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.state.auth
          //"Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          let result = responseJson;
          console.log("oneSignalSendCustomer GetCustomer ===> ", result);

          //console.log("responseJSON Show Customer ==> ", result);
          if (result.statusCode === 200) {
            let resultData = result.data;

            let device_id = "";

            if (resultData.Customer_Account) {
              if (resultData.Customer_Account.device_id) {
                device_id = resultData.Customer_Account.device_id;
              }
            }

            if (device_id !== "") {
              console.log("send notif device_id ", device_id);
              this.sendNotif(device_id);
            }
          } else {
          }
          //console.log('new data ==>', JSON.stringify(data))
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });
    }
  }

  sendNotif(device_id) {
    //const uri = `${one_signal_uri}`;

    const uri = "https://onesignal.com/api/v1/notifications";

    const body = {
      app_id: OneSignal_Customer_App_ID,
      //include_player_ids: [device_id, "d696a89e-76b7-4838-a360-665ae0812fd8"],
      include_player_ids: [device_id],
      contents: {
        en: `Transaction ${this.state.bill_transId} success`,
        id: `Transaksi ${this.state.bill_transId} berhasil`
      },
      headings: {
        en: "Transaction Success",
        id: "Transaksi Berhasil"
      },
      subtitle: { en: "Transaction Success", id: "Transaksi Berhasil" }
    };
    console.log("send notif body ==> ", body);
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic MzEyMzI0MzUtYjliNS00YjBhLWI4YTQtNzQ4M2RjMDIyYjYx"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("responseJSON send notif ==> ", result);

        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  renderDiscountSelectionNew(data, i) {
    const { selectedDiscount, selectedDiscountId } = this.state;
    let checked = data.Promo.id === selectedDiscount ? true : false;
    // let newId = data.id === selectedDiscount ? 0 : data.id;

    let newId = data.Promo.id === selectedDiscount ? 0 : data.Promo.id;

    let newIdVersion2 = data.id === selectedDiscountId ? 0 : data.id;

    let whiteColor = WHITE;
    let blackColor = BLACK;
    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    if (data) {
      return (
        <Button
          onPress={() => {
            let newdisc = 0;
            let selectedDiscountName = data.name;

            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({ showDiscountPromo: false });

            if (data.type === "percentage") {
              if (checked) {
                newdisc = 0;
                selectedDiscountName = "";
              } else {
                newdisc = data.value / 100;
              }

              this.setState({
                selectedDiscountName: selectedDiscountName,
                selectedDiscount: newId,
                selectedDiscountId: newIdVersion2,
                discountType: "percentage",
                rate_discount: newdisc,
                amount_discount: 0,
                amount_discount_limit: data.discount_limit
              });
            } else {
              if (checked) {
                newdisc = 0;
                selectedDiscountName = "";
              } else {
                newdisc = data.value;
                console.log("SPECIAL PROMO AMOUNT ===> ", newdisc);
              }
              this.setState({
                selectedDiscountName: selectedDiscountName,
                selectedDiscount: newId,
                selectedDiscountId: newIdVersion2,
                discountType: "currency",
                rate_discount: 0,
                amount_discount: newdisc,
                amount_discount_limit: null
              });
            }
            this.changeDiscount();
          }}
          style={{
            elevation: 2,
            padding: 10,
            width: "49.5%",
            backgroundColor: checked
              ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              : "#FFFFFF",
            borderColor: "#777777",
            borderWidth: 1,
            borderRadius: 5,
            // marginRight: 5,
            marginTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 8, color: checked ? whiteColor : blackColor }
            ]}
          >
            {data.name}
          </Text>
          <Checkbox
            size={15}
            checked={checked}
            color={checked ? whiteColor : blackColor}
          />
        </Button>
      );
    } else {
      return (
        <View
          style={{
            elevation: 2,
            padding: 10,
            width: "49.5%",
            backgroundColor: "#EEEEEE",
            borderRadius: 5,
            marginRight: 15,
            marginTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: "rgba(0,0,0,0.25)" }
            ]}
          >
            {data.name}
          </Text>
          <AntDesign
            name={"plussquareo"}
            style={{
              alignSelf: "center",
              fontSize: 15,
              color: "rgba(0,0,0,0.25)"
              //backgroundColor: WHITE
            }}
          />
          {/* <Checkbox checked={checked} color={BLACK} /> */}
        </View>
      );
    }
  }

  renderVoucherPromo(data, i) {
    const { selectedVoucher, selectedVoucherId } = this.state;

    let checked = data.Promo.id === selectedVoucher ? true : false;
    //let newId = data.id === selectedVoucher ? 0 : data.id;

    let newId = data.Promo.id === selectedVoucher ? 0 : data.Promo.id;

    let newIdVersion2 = data.id === selectedVoucherId ? 0 : data.id;

    let whiteColor = WHITE;
    let blackColor = BLACK;
    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    let exampleData = {
      Outlet: { name: "BeetPOS HBM" },
      Promo: { id: 13 },
      business_id: 1,
      code: "ABC 10%",
      createdAt: "2021-03-25T07:35:17.000Z",
      deletedAt: null,
      description: "TEST",
      description_type: "regulation",
      id: 2,
      image: null,
      name: "ABC Promo",
      outlet_id: 1,
      promo_date_end: "2022-10-21T07:34:39.000Z",
      promo_date_start: "2021-12-30T07:34:39.000Z",
      quota: 10,
      quota_used: 1,
      status: "active",
      type: "percentage",
      updatedAt: "2022-01-28T09:54:45.000Z",
      value: 10
    };

    // console.log("DATA VOUCHER ===> ", data);

    if (data) {
      return (
        <Button
          onPress={() => {
            let newdisc = 0;
            let type = "currency";

            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({ showVoucher: false });

            let selectedVoucherName = data.code;
            let limit = null;

            if (data.type === "currency") {
              if (checked) {
                selectedVoucherName = "";
                type = "currency";
                newdisc = 0;
              } else {
                type = data.type;
                newdisc = data.value;
              }
            } else {
              if (checked) {
                selectedVoucherName = "";
                type = "currency";
                newdisc = 0;
                limit = data.discount_limit;
              } else {
                type = data.type;
                newdisc = data.value / 100;
                limit = null;
              }
            }

            this.setState({
              selectedVoucherName: selectedVoucherName,
              selectedVoucher: newId,
              selectedVoucherId: newIdVersion2,
              voucherAmount: newdisc,
              voucherLimit: limit,
              voucherType: type
            });

            this.changeDiscount();
          }}
          style={{
            elevation: 2,
            padding: 10,
            width: "49.5%",
            backgroundColor: checked
              ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              : "#FFFFFF",
            borderColor: "#777777",
            borderWidth: 1,
            borderRadius: 5,
            // marginRight: 5,
            marginTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 8, color: checked ? whiteColor : blackColor }
            ]}
          >
            {data.code}
          </Text>
          <Checkbox
            size={15}
            checked={checked}
            color={checked ? whiteColor : blackColor}
          />
        </Button>
      );
    } else {
      return (
        <View
          style={{
            elevation: 2,
            padding: 10,
            width: "49.5%",
            backgroundColor: "#EEEEEE",
            borderRadius: 5,
            marginRight: 15,
            marginTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: "rgba(0,0,0,0.25)" }
            ]}
          >
            {data.code}
          </Text>
          <AntDesign
            name={"plussquareo"}
            style={{
              alignSelf: "center",
              fontSize: 15,
              color: "rgba(0,0,0,0.25)"
              //backgroundColor: WHITE
            }}
          />
          {/* <Checkbox checked={checked} color={BLACK} /> */}
        </View>
      );
    }
  }

  renderDiscountSelection(data, i) {
    const { selectedDiscount } = this.state;
    let checked = data.id === selectedDiscount ? true : false;
    let newId = data.id === selectedDiscount ? 0 : data.id;
    let whiteColor = WHITE;
    let blackColor = BLACK;
    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    if (data.active) {
      return (
        <Button
          onPress={() => {
            let newdisc = 0;
            if (checked) {
              newdisc = 0;
            } else {
              newdisc = data.value / 100;
            }

            this.setState({
              selectedDiscount: newId,
              rate_discount: newdisc
            });

            //alert(newdisc);

            this.changeDiscount();
          }}
          style={{
            elevation: 2,
            padding: 5,
            width: "23%",
            backgroundColor: checked
              ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              : "#FFFFFF",
            borderColor: "#777777",
            borderWidth: 1,
            borderRadius: 5,
            // marginRight: 5,
            marginTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-evenly",
            flexDirection: "row"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 8, color: checked ? whiteColor : blackColor }
            ]}
          >
            {data.text}
          </Text>
          <Checkbox
            size={15}
            checked={checked}
            color={checked ? whiteColor : blackColor}
          />
        </Button>
      );
    } else {
      return (
        <View
          style={{
            elevation: 2,
            padding: 5,
            width: "20%",
            backgroundColor: "#EEEEEE",
            borderRadius: 5,
            marginRight: 15,
            marginTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-evenly",
            flexDirection: "row"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: "rgba(0,0,0,0.25)" }
            ]}
          >
            {data.text}
          </Text>
          <AntDesign
            name={"plussquareo"}
            style={{
              alignSelf: "center",
              fontSize: 15,
              color: "rgba(0,0,0,0.25)"
              //backgroundColor: WHITE
            }}
          />
          {/* <Checkbox checked={checked} color={BLACK} /> */}
        </View>
      );
    }
  }

  renderRightSideDiscount() {
    let { grandTotal, discount } = this.state;

    return (
      <View
        style={[
          ss.box,
          {
            display: this.state.access_giving_discount ? "flex" : "none",
            elevation: 0,
            flex: 1,
            margin: 15,
            padding: 15,
            backgroundColor: WHITE
            //minHeight: 100
            //padding: 15
          }
        ]}
      >
        <Button
          style={{
            borderColor: "#C8C7CC",
            borderBottomWidth: 1,
            paddingBottom: 5,
            flexDirection: "row",
            justifyContent: "space-between"
            //padding: 15,
          }}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({ showDiscountPromo: !this.state.showDiscountPromo });
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
          >
            {_discount_promo[this.state.languageIndex]}{" "}
            {this.state.selectedDiscountName !== ""
              ? `- ${this.state.selectedDiscountName}`
              : ""}
          </Text>
          {this.state.showDiscountPromo ? (
            <Entypo
              name={"chevron-up"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Entypo
              name={"chevron-down"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}
        </Button>
        <View
          style={{
            display: this.state.showDiscountPromo ? "flex" : "none"
            //marginTop: 10,
            //flex: 1
            //width: "100%",
          }}
        >
          <FlatList
            contentContainerStyle={{
              // marginLeft: "-0.5%",
              // marginRight: "-0.5%",
              width: "100%",
              justifyContent: "space-between"
              //backgroundColor: "#BCA"
            }}
            columnWrapperStyle={{
              justifyContent: "space-between"
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.promoSpecial}
            renderItem={({ item, index }) => {
              return this.renderDiscountSelectionNew(item, index);
            }}
            keyExtractor={(item, index) => {
              //console.log(item.toString()+"_"+i.toString()+"_"+index.toString());
              return "Discount" + index.toString();
            }}
          />
        </View>
      </View>
    );
  }

  renderVoucher() {
    let { grandTotal, discount } = this.state;

    return (
      <View
        style={[
          ss.box,
          {
            display: this.state.access_giving_discount ? "flex" : "none",
            elevation: 0,
            flex: 1,
            margin: 15,
            padding: 15,
            backgroundColor: WHITE
            //minHeight: 100
            //padding: 15
          }
        ]}
      >
        <Button
          style={{
            borderColor: "#C8C7CC",
            borderBottomWidth: 1,
            paddingBottom: 5,
            flexDirection: "row",
            justifyContent: "space-between"
            //padding: 15,
          }}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({ showVoucher: !this.state.showVoucher });
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
          >
            {_voucher[this.state.languageIndex]}{" "}
            {this.state.selectedVoucherName !== ""
              ? `- ${this.state.selectedVoucherName}`
              : ""}
          </Text>
          {this.state.showVoucher ? (
            <Entypo
              name={"chevron-up"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Entypo
              name={"chevron-down"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}
        </Button>
        <View
          style={{
            //marginTop: 10,
            //flex: 1
            //width: "100%",
            display: this.state.showVoucher ? "flex" : "none"
          }}
        >
          <FlatList
            contentContainerStyle={{
              // marginLeft: "-0.5%",
              // marginRight: "-0.5%",
              width: "100%",
              justifyContent: "space-between"
              //backgroundColor: "#BCA"
            }}
            columnWrapperStyle={{
              justifyContent: "space-between"
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.promoVoucher}
            renderItem={({ item, index }) => {
              return this.renderVoucherPromo(item, index);
            }}
            keyExtractor={(item, index) => {
              //console.log(item.toString()+"_"+i.toString()+"_"+index.toString());
              return "DiscountP" + index.toString();
            }}
          />
        </View>
      </View>
    );
  }

  renderVoucherCustomer() {
    let { grandTotal, discount } = this.state;

    return (
      <View
        style={[
          ss.box,
          {
            display: this.state.access_giving_discount ? "flex" : "none",
            elevation: 0,
            flex: 1,
            margin: 15,
            padding: 15,
            backgroundColor: WHITE
            //minHeight: 100
            //padding: 15
          }
        ]}
      >
        <Button
          style={{
            borderColor: "#C8C7CC",
            borderBottomWidth: 1,
            paddingBottom: 5,
            flexDirection: "row",
            justifyContent: "space-between"
            //padding: 15,
          }}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({
              showVoucherCustomer: !this.state.showVoucherCustomer
            });
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
          >
            {_voucher[this.state.languageIndex]}{" "}
            {_pelanggan[this.state.languageIndex]}{" "}
            {this.state.selectedCustomerVoucherName !== ""
              ? `- ${this.state.selectedCustomerVoucherName}`
              : ""}
          </Text>
          {this.state.showVoucherCustomer ? (
            <Entypo
              name={"chevron-up"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Entypo
              name={"chevron-down"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}
        </Button>
        <View
          style={{
            //marginTop: 10,
            //flex: 1
            //width: "100%",
            display: this.state.showVoucherCustomer ? "flex" : "none"
          }}
        >
          <FlatList
            contentContainerStyle={{
              // marginLeft: "-0.5%",
              // marginRight: "-0.5%",
              width: "100%",
              justifyContent: "space-between"
              //backgroundColor: "#BCA"
            }}
            columnWrapperStyle={{
              justifyContent: "space-between"
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.customer_voucher}
            renderItem={({ item, index }) => {
              return this.renderVoucherCustomerData(item, index);
            }}
            keyExtractor={(item, index) => {
              //console.log(item.toString()+"_"+i.toString()+"_"+index.toString());
              return "DiscountP" + index.toString();
            }}
          />
        </View>
      </View>
    );
  }

  renderVoucherCustomerData(data, i) {
    const { selectedCustomerVoucher } = this.state;

    let checked = data.id === selectedCustomerVoucher ? true : false;

    //let checked = false;
    //let newId = data.id;
    let newId = data.id === selectedCustomerVoucher ? 0 : data.id;

    //let newId = data.Promo.id === selectedVoucher ? 0 : data.Promo.id;

    let whiteColor = WHITE;
    let blackColor = BLACK;
    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }
    console.log("DATA Customer VOUCHER ===> ", data);

    if (data) {
      return (
        <Button
          onPress={() => {
            let newdisc = 0;
            let type = "currency";

            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({ showVoucher: false });

            let selectedVoucherName =
              newId === 0 ? "" : data.Customer_Voucher_List.name;

            let customerVoucherData = newId === 0 ? null : data;

            let limit = null;

            if (data.Customer_Voucher_List.discount_type === "amount") {
              if (checked) {
                selectedVoucherName = "";
                type = "currency";
                newdisc = 0;
              } else {
                type = data.Customer_Voucher_List.discount_type;
                newdisc = data.Customer_Voucher_List.discount_amount;
              }
            } else {
              if (checked) {
                selectedVoucherName = "";
                type = "currency";
                newdisc = 0;
              } else {
                type = data.Customer_Voucher_List.discount_type;
                newdisc = data.Customer_Voucher_List.discount_amount / 100;
                limit = data.Customer_Voucher_List.discount_limit;
              }
            }

            this.setState({
              selectedCustomerVoucherName: selectedVoucherName,
              selectedCustomerVoucher: newId,
              customerVoucherAmount: newdisc,
              customerVoucherType: type,
              customerVoucherData: customerVoucherData,
              customerVoucherLimit: limit,
              showVoucherCustomer: false
            });

            this.changeDiscount();
          }}
          style={{
            elevation: 2,
            padding: 10,
            width: "49.5%",
            backgroundColor: checked
              ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              : "#FFFFFF",
            borderColor: "#777777",
            borderWidth: 1,
            borderRadius: 5,
            // marginRight: 5,
            marginTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 8, color: checked ? whiteColor : blackColor }
            ]}
          >
            {data.Customer_Voucher_List.name}
          </Text>
          <Checkbox
            size={15}
            checked={checked}
            color={checked ? whiteColor : blackColor}
          />
        </Button>
      );
    } else {
      return (
        <View
          style={{
            elevation: 2,
            padding: 10,
            width: "49.5%",
            backgroundColor: "#EEEEEE",
            borderRadius: 5,
            marginRight: 15,
            marginTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: "rgba(0,0,0,0.25)" }
            ]}
          >
            {data.Customer_Voucher_List.name}
          </Text>
          <AntDesign
            name={"plussquareo"}
            style={{
              alignSelf: "center",
              fontSize: 15,
              color: "rgba(0,0,0,0.25)"
              //backgroundColor: WHITE
            }}
          />
          {/* <Checkbox checked={checked} color={BLACK} /> */}
        </View>
      );
    }
  }

  idrNumToStr(num, iscurr) {
    const { currency_conversion_ratio } = this.state.grandTotalRound;
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

      if (this.state.currency_conversion_ratio !== 1) {
        curr = this.state.currency_conversion_name + " ";
      }
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

  renderCashPayment() {
    const { grandTotal, currency_conversion_ratio } = this.state;

    let grandTotalRound =
      this.state.grandTotalRound * currency_conversion_ratio;

    let cash1 = grandTotalRound;
    let cash2 = grandTotalRound;
    let cash3 = grandTotalRound;
    let cash4 = grandTotalRound;

    if (grandTotalRound < 1000) {
      cash2 = parseInt(Math.ceil(grandTotalRound / 5)) * 5;
      cash3 = parseInt(Math.ceil(grandTotalRound / 10)) * 10;
      cash4 = parseInt(Math.ceil(grandTotalRound / 100)) * 100;

      if (cash4 === cash3) {
        cash4 = cash4 + 100;
      }

      if (cash3 === cash2) {
        cash3 = cash3 + 10;
      }

      if (cash2 === cash1) {
        cash2 = cash2 + 5;
      }

      if (cash4 === cash3) {
        cash4 = cash4 + 100;
      }
    } else {
      cash2 = parseInt(Math.ceil(grandTotalRound / 1000)) * 1000;
      cash3 = parseInt(Math.ceil(grandTotalRound / 10000)) * 10000;
      cash4 = parseInt(Math.ceil(grandTotalRound / 50000)) * 50000;

      if (cash4 === cash3) {
        cash4 = cash4 + 50000;
      }

      if (cash3 === cash2) {
        cash3 = cash3 + 10000;
      }

      if (cash2 === cash1) {
        cash2 = cash2 + 1000;
      }

      if (cash4 === cash3) {
        cash4 = cash4 + 50000;
      }
    }

    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    return (
      <View
        style={
          {
            //marginTop: 10,
          }
        }
      >
        <View
          style={{
            backgroundColor: WHITE,
            padding: 15,
            marginTop: 15,
            marginBottom: 15
            //flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "100%"
              //backgroundColor: "#ABC",
              //justifyContent: "center"
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
            >
              {_cash[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              //backgroundColor: "#ABC",
              justifyContent: "center"
            }}
          >
            {/* Baris 1 */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5,
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    this.resetPaymentName();
                    this.setState({
                      showWallet: true,
                      showCard: true,
                      cashAmount: cash1.toString(),
                      payment_type: "cash",
                      cz_allow: 0,
                      cz_type: null,
                      cz_uri: null,
                      cz_allow_print: false,
                      payment_method_id: this.state.payment_method_cash.id,
                      qr_base64: null
                    });
                    this.checkOutConfirmationAction();
                    //this.setState({ selectedDiscount: newId });
                  }}
                  style={[
                    ss.buttonChoiceCash,
                    {
                      width: "24%",
                      backgroundColor:
                        this.state.cashAmount === cash1.toString()
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : WHITE
                    }
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          color:
                            this.state.cashAmount === cash1.toString()
                              ? whiteColor
                              : blackColor,
                          fontSize: 9
                        }
                      ]}
                    >
                      {this.idrNumToStr(cash1, false)}
                    </Text>
                  </View>
                </Button>
                <Button
                  onPress={() => {
                    this.resetPaymentName();
                    this.setState({
                      showWallet: true,
                      showCard: true,
                      cashAmount: cash2.toString(),
                      payment_type: "cash",
                      cz_allow: 0,
                      cz_type: null,
                      cz_uri: null,
                      cz_allow_print: false,
                      payment_method_id: this.state.payment_method_cash.id,
                      qr_base64: null
                    });
                    this.checkOutConfirmationAction();

                    //this.setState({ selectedDiscount: newId });
                  }}
                  style={[
                    ss.buttonChoiceCash,
                    {
                      width: "24%",
                      backgroundColor:
                        this.state.cashAmount === cash2.toString()
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : WHITE
                    }
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          color:
                            this.state.cashAmount === cash2.toString()
                              ? whiteColor
                              : blackColor,
                          fontSize: 9
                        }
                      ]}
                    >
                      {this.idrNumToStr(cash2, false)}
                    </Text>
                  </View>
                </Button>
                <Button
                  onPress={() => {
                    this.resetPaymentName();
                    this.setState({
                      showWallet: true,
                      showCard: true,
                      cashAmount: cash3.toString(),
                      payment_type: "cash",
                      cz_allow: 0,
                      cz_type: null,
                      cz_uri: null,
                      cz_allow_print: false,
                      payment_method_id: this.state.payment_method_cash.id,
                      qr_base64: null
                    });
                    this.checkOutConfirmationAction();
                    //this.setState({ selectedDiscount: newId });
                  }}
                  style={[
                    ss.buttonChoiceCash,
                    {
                      width: "24%",
                      backgroundColor:
                        this.state.cashAmount === cash3.toString()
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : WHITE
                    }
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          color:
                            this.state.cashAmount === cash3.toString()
                              ? whiteColor
                              : blackColor,
                          fontSize: 9
                        }
                      ]}
                    >
                      {this.idrNumToStr(cash3, false)}
                    </Text>
                  </View>
                </Button>
                <Button
                  onPress={() => {
                    this.resetPaymentName();
                    this.setState({
                      showWallet: true,
                      showCard: true,
                      cashAmount: cash4.toString(),
                      payment_type: "cash",
                      cz_allow: 0,
                      cz_type: null,
                      cz_uri: null,
                      cz_allow_print: false,
                      payment_method_id: this.state.payment_method_cash.id,
                      qr_base64: null
                    });
                    this.checkOutConfirmationAction();
                    //this.setState({ selectedDiscount: newId });
                  }}
                  style={[
                    ss.buttonChoiceCash,
                    {
                      width: "24%",
                      backgroundColor:
                        this.state.cashAmount === cash4.toString()
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : WHITE
                    }
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          color:
                            this.state.cashAmount === cash4.toString()
                              ? whiteColor
                              : blackColor,
                          fontSize: 9
                        }
                      ]}
                    >
                      {this.idrNumToStr(cash4, false)}
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
            {/* Baris 1 End */}
            {/* Baris 2 */}
            <View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <TextInput
                  ref={q => {
                    this.CashAmount = q;
                  }}
                  style={{
                    padding: 5,
                    backgroundColor: WHITE,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#777777",
                    width: "100%",
                    fontSize: 10,
                    color: BLACK,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontFamily: "Roboto-Regular"
                  }}
                  keyboardType="numeric"
                  type="text"
                  //value={this.idrNumToStr(this.state.cashAmount, false)}
                  value={this.state.cashAmount}
                  onChangeText={v => {
                    this.resetPaymentName();
                    this.setState({
                      showWallet: true,
                      showCard: true,
                      cashAmount: v,
                      payment_type: "cash",
                      cz_allow: 0,
                      cz_type: null,
                      cz_uri: null,
                      cz_allow_print: false,
                      payment_method_id: this.state.payment_method_cash.id,
                      qr_base64: null
                    });
                  }}
                  placeholder={_cash_amount[this.state.languageIndex]}
                  placeholderTextColor={BLACK}
                />
                <View style={{ flexDirection: "row" }}>
                  <View style={{ display: "none" }}>
                    <Text
                      style={{
                        fontSize: 10,
                        marginLeft: 10,
                        marginTop: 5,
                        marginBottom: 5
                      }}
                    >
                      {this.state.currency_conversion_ratio !== 1
                        ? this.state.currency_conversion_name
                        : this.state.currency}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 10,
                      marginLeft: 10,
                      marginTop: 5,
                      marginBottom: 5
                    }}
                  >
                    {this.idrNumToStr(this.state.cashAmount, true)}
                  </Text>
                </View>
              </View>
            </View>
            {/* Baris 2 End */}
          </View>
        </View>
      </View>
    );
  }

  renderEWalletPayment() {
    const { payment_type } = this.state;
    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    return (
      <View
        style={
          {
            //marginTop: 10,
          }
        }
      >
        <View
          style={{
            //borderColor: "#C8C7CC",
            //borderTopWidth: 1,
            backgroundColor: WHITE,
            padding: 15,
            paddingBottom: 0,
            marginTop: 0,
            //flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "100%",
              display:
                this.state.payment_method_wallet.length === 0 ? "none" : "flex",
              //backgroundColor: "#ABC",
              justifyContent: "center"
            }}
          >
            <View
              style={{

                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between"
                //padding: 15,
              }}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({ showWallet: !this.state.showWallet });
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
              >
                {_ewallet[this.state.languageIndex]}{" "}
                {this.state.selectedWalletName !== ""
                  ? `- ${this.state.selectedWalletName}`
                  : ""}
              </Text>

              {/* {this.state.showWallet ? (
                <Entypo
                  name={"chevron-up"}
                  style={{
                    alignSelf: "center",
                    fontSize: 25,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              ) : (
                <Entypo
                  name={"chevron-down"}
                  style={{
                    alignSelf: "center",
                    fontSize: 25,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              )} */}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              //backgroundColor: "#ABC",
              justifyContent: "center",
              backgroundColor: WHITE,
              padding: 0,
              marginTop: 0,
              marginBottom: 15,
              display: this.state.showWallet ? "flex" : "none"
            }}
          >
            <FlatList
              // contentContainerStyle={
              //   {
              //     // marginLeft: "-0.5%",
              //     // marginRight: "-0.5%",
              //     //width: "100%",
              //     //flex: 1
              //     //justifyContent: "space-between"
              //     //backgroundColor: "#BCA"
              //   }
              // }
              // columnWrapperStyle={{
              //   //justifyContent: "space-evenly",
              //   margin: 5
              //   //flex: 1
              // }}

              // contentContainerStyle={{
              //   // marginLeft: "-0.5%",
              //   // marginRight: "-0.5%",
              //   width: "100%",
              //   justifyContent: "space-between"
              //   //backgroundColor: "#BCA"
              // }}
              // columnWrapperStyle={{
              //   justifyContent: "space-between"
              // }}

              contentContainerStyle={{
                marginLeft: -2,
                marginRight: -2
                //width: "100%",
                //flex: 1
                //justifyContent: "space-between"
                //backgroundColor: "#BCA"
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              data={this.state.payment_method_wallet}
              renderItem={({ item, index }) => {
                const payment_method_id = item.id;
                const payment_method_name = item.name;
                let selected_payment = false;
                if (payment_method_id === this.state.payment_method_id) {
                  selected_payment = true;
                }
                let logo_icon = null;

                logo_icon = item.logo_icon ? item.logo_icon : null;

                if (!logo_icon) {
                  const temp_name = payment_method_name.toLowerCase();

                  if (temp_name.includes("ovo")) {
                    logo_icon = "ovo";
                  }

                  if (temp_name.includes("linkaja")) {
                    logo_icon = "linkaja";
                  }

                  if (temp_name.includes("link aja")) {
                    logo_icon = "linkaja";
                  }

                  if (temp_name.includes("gopay")) {
                    logo_icon = "gopay";
                  }

                  if (temp_name.includes("shopee")) {
                    logo_icon = "shopee";
                  }

                  if (temp_name.includes("dana")) {
                    logo_icon = "dana";
                  }
                  if (temp_name.includes("doku")) {
                    logo_icon = "doku";
                  }

                  if (item.cz_allow) {
                    // logo_icon = "cashlez";
                    if (temp_name.includes("qr")) {
                      logo_icon = "cashlezqr";
                    }
                  }
                }

                let logo_final = null;

                if (logo_icon) {
                  if (logo_icon === "ovo") {
                    logo_final = require("../../Images/payment/ovo.png");
                  }
                  if (logo_icon === "gopay") {
                    //logo_final = "../../Images/payment/gopay.png";
                    logo_final = require("../../Images/payment/gopay.png");
                  }
                  if (logo_icon === "shopee") {
                    //logo_final = "../../Images/payment/shopee.png";
                    logo_final = require("../../Images/payment/shopee.png");
                  }
                  if (logo_icon === "shopeepay") {
                    //logo_final = "../../Images/payment/shopee.png";
                    logo_final = require("../../Images/payment/shopee.png");
                  }
                  if (logo_icon === "shopee pay") {
                    //logo_final = "../../Images/payment/shopee.png";
                    logo_final = require("../../Images/payment/shopee.png");
                  }
                  if (logo_icon === "dana") {
                    //logo_final = "../../Images/payment/shopee.png";
                    logo_final = require("../../Images/payment/dana.png");
                  }

                  if (logo_icon === "doku") {
                    //logo_final = "../../Images/payment/shopee.png";
                    logo_final = require("../../Images/payment/doku.png");
                  }

                  if (logo_icon === "linkaja") {
                    //logo_final = "../../Images/payment/shopee.png";
                    logo_final = require("../../Images/payment/linkaja.png");
                  }

                  if (logo_icon === "cashlezqr") {
                    //logo_final = "../../Images/payment/shopee.png";
                    logo_final = require("../../Images/payment/cashlezqr.png");
                  }
                }

                return (
                  <Button
                    onPress={() => {
                      //this.setState({ selectedDiscount: newId });

                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.setState({ showWallet: true });

                      this.resetPaymentName();

                      this.setState({
                        selectedWalletName: payment_method_name,
                        payment_method_id: item.id,
                        payment_type: item.name,
                        cashAmount: 0,
                        qr_image_url: BE_URI + item.qr_image,
                        cz_allow: item.cz_allow,
                        cz_type: item.cz_type
                      });

                      if (item.qr_image) {
                        this.convertImageBase64QR(BE_URI + item.qr_image);
                      } else {
                        this.setState({ qr_base64: null });
                      }

                      this.checkOutConfirmationAction();
                    }}
                    style={[
                      ss.buttonChoice,
                      {
                        marginRight: 2,
                        marginLeft: 2,
                        width: "32%",
                        //flex: 1,
                        backgroundColor: selected_payment
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : "transparent"
                      }
                    ]}
                  >
                    {logo_final ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center"
                          //flexDirection: "row"
                          //padding: 5
                          //backgroundColor: "#BCA"
                        }}
                      >
                        <Image
                          style={{
                            width: 100,
                            height: 25
                            //backgroundColor: "#888"
                          }}
                          resizeMode={"contain"}
                          source={logo_final}
                        />
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              color: selected_payment ? whiteColor : blackColor,
                              fontSize: 8
                            }
                          ]}
                        >
                          {payment_method_name}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center",
                          flexDirection: "row",
                          padding: 5
                          //backgroundColor: "#BCA"
                        }}
                      >
                        <Entypo
                          name={"wallet"}
                          style={{
                            flex: 2,
                            alignSelf: "center",
                            fontSize: 15,
                            color: selected_payment ? whiteColor : blackColor
                          }}
                        />
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              marginLeft: 15,
                              flex: 4,
                              color: selected_payment ? whiteColor : blackColor,
                              fontSize: 8
                            }
                          ]}
                        >
                          {payment_method_name}
                        </Text>
                      </View>
                    )}
                  </Button>
                );
              }}
              keyExtractor={(item, index) => {
                //console.log(item.toString()+"_"+i.toString()+"_"+index.toString());
                return "Wallet" + index.toString();
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  renderCardPayment() {
    const { payment_type } = this.state;
    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    return (
      <View
        style={{
          display: this.state.payment_method_card.length > 0 ? "flex" : "none"
          //display: "none"
          //marginTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: WHITE,
            padding: 15,
            paddingBottom: 0,
            marginTop: 0,
            //marginBottom: 5,
            //flexDirection: "row"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
              //padding: 15,
            }}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this.setState({ showCard: !this.state.showCard });
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
            >
              {_card[this.state.languageIndex]}{" "}
              {this.state.selectedCardName !== ""
                ? `- ${this.state.selectedCardName}`
                : ""}
            </Text>

            {/* {this.state.showCard ? (
              <Entypo
                name={"chevron-up"}
                style={{
                  alignSelf: "center",
                  fontSize: 25,
                  color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            ) : (
              <Entypo
                name={"chevron-down"}
                style={{
                  alignSelf: "center",
                  fontSize: 25,
                  color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            )} */}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            //backgroundColor: "#ABC",
            justifyContent: "center",

            backgroundColor: WHITE,
            padding: 15,
            marginTop: 0,
            marginBottom: 15,

            display: this.state.showCard ? "flex" : "none"
          }}
        >
          <FlatList
            // contentContainerStyle={{
            //   // marginLeft: "-0.5%",
            //   // marginRight: "-0.5%",
            //   width: "100%",
            //   justifyContent: "space-between"
            //   //backgroundColor: "#BCA"
            // }}
            // columnWrapperStyle={{
            //   justifyContent: "space-around"
            // }}

            // columnWrapperStyle={{
            //   //justifyContent: "space-evenly",
            //   margin: 5
            //   //flex: 1
            // }}
            contentContainerStyle={{
              marginLeft: -2,
              marginRight: -2
              //width: "100%",
              //flex: 1
              //justifyContent: "space-between"
              //backgroundColor: "#BCA"
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={this.state.payment_method_card}
            renderItem={({ item, index }) => {
              const payment_method_id = item.id;
              const payment_method_name = item.name;
              let selected_payment = false;
              if (payment_method_id === this.state.payment_method_id) {
                selected_payment = true;
              }

              let logo_icon = null;

              logo_icon = item.logo_icon ? item.logo_icon : null;

              if (!logo_icon) {
                const temp_name = payment_method_name.toLowerCase();

                if (temp_name.includes("debit")) {
                  logo_icon = "debit";
                }

                if (temp_name.includes("credit")) {
                  logo_icon = "credit";
                }

                if (temp_name.includes("mandiri")) {
                  logo_icon = "mandiri";
                }

                if (temp_name.includes("bca")) {
                  logo_icon = "bca";
                }

                if (temp_name.includes("bni")) {
                  logo_icon = "bni";
                }

                if (temp_name.includes("bri")) {
                  logo_icon = "bri";
                }

                if (temp_name.includes("btn")) {
                  logo_icon = "btn";
                }

                if (temp_name.includes("danamon")) {
                  logo_icon = "danamon";
                }

                if (temp_name.includes("credit")) {
                  logo_icon = "credit";
                }

                if (temp_name.includes("kredit")) {
                  logo_icon = "credit";
                }

                if (item.cz_allow) {
                  logo_icon = "cashlez";
                }
              }

              let logo_final = null;

              if (logo_icon) {
                if (logo_icon === "bca") {
                  logo_final = require("../../Images/payment/bca.png");
                }
                if (logo_icon === "bni") {
                  logo_final = require("../../Images/payment/bni.png");
                }
                if (logo_icon === "bri") {
                  logo_final = require("../../Images/payment/bri.png");
                }
                if (logo_icon === "btn") {
                  logo_final = require("../../Images/payment/btn.png");
                }
                if (logo_icon === "danamon") {
                  logo_final = require("../../Images/payment/danamon.png");
                }
                if (logo_icon === "credit") {
                  logo_final = require("../../Images/payment/credit.png");
                }
                if (logo_icon === "debit") {
                  logo_final = require("../../Images/payment/debit.png");
                }
                if (logo_icon === "cashlez") {
                  logo_final = require("../../Images/payment/cashlez.png");
                }
                if (logo_icon === "mandiri") {
                  logo_final = require("../../Images/payment/mandiri.png");
                }
              }

              return (
                <Button
                  onPress={() => {
                    //this.setState({ selectedDiscount: newId });
                    let image = null;
                    if (item.qr_image) {
                      image = BE_URI + item.qr_image;
                    }

                    this.resetPaymentName();

                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    this.setState({ showCard: true });

                    this.setState({
                      selectedCardName: payment_method_name,
                      payment_method_id: item.id,
                      payment_type: item.name,
                      cashAmount: 0,
                      cz_allow: item.cz_allow,
                      cz_type: item.cz_type,
                      cz_allow_print: false,
                      //cz_uri: null,
                      qr_image_url: image
                    });

                    this.checkOutConfirmationAction();
                  }}
                  style={[
                    ss.buttonChoice,
                    {
                      marginRight: 2,
                      marginLeft: 2,
                      width: "32%",
                      //flex: 1,
                      backgroundColor: selected_payment
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : "transparent"
                    }
                  ]}
                >
                  {logo_final ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center"
                        //flexDirection: "row"
                        //padding: 5
                        //backgroundColor: "#BCA"
                      }}
                    >
                      <Image
                        style={{
                          width: 100,
                          height: 25
                          //backgroundColor: "#888"
                        }}
                        resizeMode={"contain"}
                        source={logo_final}
                      />
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            color: selected_payment ? whiteColor : blackColor,
                            fontSize: 8
                          }
                        ]}
                      >
                        {payment_method_name}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "row",
                        padding: 5
                        //backgroundColor: "#BCA"
                      }}
                    >
                      <Entypo
                        name={"credit-card"}
                        style={{
                          flex: 2,
                          alignSelf: "center",
                          fontSize: 15,
                          color: selected_payment ? whiteColor : blackColor
                        }}
                      />
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            marginLeft: 15,
                            flex: 4,
                            color: selected_payment ? whiteColor : blackColor,
                            fontSize: 8
                          }
                        ]}
                      >
                        {payment_method_name}
                      </Text>
                    </View>
                  )}
                </Button>
              );
            }}
            keyExtractor={(item, index) => {
              //console.log(item.toString()+"_"+i.toString()+"_"+index.toString());
              return "Wallet" + index.toString();
            }}
          />
          {/* Baris 1 */}

          {/* Baris 2 */}
        </View>
      </View>
    );
  }

  renderCardPaymentList(data, i) {}

  renderRightSidePayment() {
    let { grandTotal, discount } = this.state;

    return (
      <View
        style={[
          ss.box,
          {
            elevation: 0,
            flex: 1,
            margin: 15,
            marginTop: 0
            //minHeight: 100,
            // backgroundColor: "#777"
          }
        ]}
      >
        <View
          style={{
            borderColor: "#C8C7CC",
            borderBottomWidth: 1,
            padding: 15,
            backgroundColor: WHITE
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
          >
            {_pembayaran[this.state.languageIndex]}
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          //style={{ height: 300 }}
        >
          {this.renderCashPayment()}
          {this.renderCardPayment()}
          {this.renderEWalletPayment()}
        </ScrollView>
      </View>
    );
  }

  renderRightSide() {
    const {
      grandTotal,
      grandTotalRound,
      grandTotalBeforeCoupon,
      discount,
      bill_discount,
      bill_subTotal,
      rate_tax,
      rate_services,
      currency_conversion_ratio
    } = this.state;
    //console.log("bill_discount render ===> ", bill_discount);

    //console.log("bill_subTotal render ===> ", bill_subTotal);
    let subTotalCalculate = 0;
    let discount_render =
      this.state.bill_discount >= this.state.bill_subTotal
        ? this.state.bill_subTotal
        : this.state.bill_discount;

    discount_render = discount_render * currency_conversion_ratio;

    let tax_render =
      (bill_subTotal - discount_render) * (rate_tax + rate_services);

    tax_render = tax_render * currency_conversion_ratio;

    if (this.state.currencyAllowDecimal) {
      subTotalCalculate =
        this.state.bill_subTotal + this.state.customPriceFinal;
    } else {
      subTotalCalculate = parseInt(
        this.state.bill_subTotal + this.state.customPriceFinal
      );
    }

    subTotalCalculate = subTotalCalculate * currency_conversion_ratio;

    let text_conversion = "";

    if (this.state.loyaltyPromoSettings) {
      let temp = this.state.loyaltyPromoSettings.type;

      if (temp === "percentage") {
        text_conversion = this.state.loyaltyPromoSettings.value + "% per Point";
      } else {
        this.state.loyaltyPromoSettings.value + " per Point";
      }
    }

    // console.log(
    //   "bill_discount > bill_subTotal ===> ",
    //   bill_discount >= bill_subTotal
    // );

    // console.log("discount_render ===> ", discount_render);

    let discount_calculate =
      this.state.grandTotalDefault +
      this.state.customPriceFinal -
      this.state.grandTotalRound;

    discount_calculate = discount_calculate * currency_conversion_ratio;

    let new_bill_discount = bill_discount ? bill_discount : 0;

    new_bill_discount = new_bill_discount * currency_conversion_ratio;

    let grandTotalRoundRender = grandTotalRound * currency_conversion_ratio;

    let grandTotalBeforeCouponRender =
      grandTotalBeforeCoupon * currency_conversion_ratio;

    let couponRender = this.state.couponAmount * currency_conversion_ratio;

    // const temp_data = this.state.dataBill[0];

    // console.log ("TEMP DATAAAA ===> ", temp_data);

    // let salesTypeName = "";

    // if (temp_data) {
    //   salesTypeName = temp_data.salesTypeName
    //     ? temp_data.salesTypeName
    //     : temp_data.Sales_Type.name;
    // }

    //console.log("discount_calculate ===> ", discount_calculate);

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            backgroundColor: WHITE_ROBO
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              alignContent: "center",
              // paddingTop: 15,
              // paddingBottom: 15,
              padding: 15,
              margin: 5,
              // marginLeft: 10,
              // marginRight: 10,
              width: this.state.tablet ? "64%" :"95%",
              borderWidth: 1,
              borderColor: "#777777",
              backgroundColor: WHITE
              //borderRadius: 15,
              //backgroundColor: "#BCA"
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  flex: 1,
                  marginTop: 0
                }}
              >
                {this.state.list_currency_for_selection &&
                this.state.currencyAllowMultiCurrency ? (
                  <View
                    style={{
                      width: "75%",
                      alignSelf: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      flex: 1
                    }}
                  >
                    <View style={{ width: "49%" }}>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 14
                          }
                        ]}
                      >
                        {_currency[this.state.languageIndex]}
                      </Text>
                    </View>
                    <View style={{ width: "49%" }}>
                      <View style={{ width: 75, alignSelf: "flex-end" }}>
                        <Dropdown
                          style={{
                            marginLeft: 0
                            // paddingRight:100
                            //width: "100%"
                          }}
                          defaultText={this.state.currency}
                          color={BLACK}
                          // selectWidth = {'80%'}
                          languageIndex={this.state.languageIndex}
                          colorIndex={this.state.colorIndex}
                          selectedValue={
                            this.state.selected_currency_conversion
                          }
                          optionLists={this.state.list_currency_for_selection.map(
                            (v, k) => {
                              //console.log('v ==> ', v);
                              let label = "";
                              if (v.id !== 0) {
                                if (v.currency_a === this.state.currency_id) {
                                  label = v.data_currency_b.name;
                                } else {
                                  label = v.data_currency_a.name;
                                }
                              } else {
                                label = this.state.currency;
                              }

                              return {
                                label: label,
                                value: v
                              };
                            }
                          )}
                          onValueChange={(itemValue, itemIndex) => {
                            console.log("SELECTED Value ==> ", itemValue);
                            //this.setState({ selected_currency_conversion: itemValue });
                            if (itemValue.id === 0) {
                              this.setState({
                                selected_currency_conversion: null,
                                currency_conversion_ratio: 1,
                                currency_conversion_name: "",
                                currency_conversion_fullname: "",

                                currency_conversion_id: null
                              });
                            } else {
                              this.changeConversionSelection(itemValue);
                            }
                          }}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        // marginLeft: 10,
                        // marginTop: 5,
                        // marginBottom: 5,
                        display: "none"
                      }}
                    >
                      {this.state.currency_conversion_ratio !== 1
                        ? this.state.currency_conversion_name
                        : this.state.currency}
                    </Text>
                  </View>
                )}
              </View>

              <View
                style={{
                  display: this.state.direct_payment ? "none" : "flex",
                  width: "75%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1
                  //marginTop: 10
                }}
              >
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_sub_total[this.state.languageIndex]}
                  </Text>
                  {/* disini subtotalnya */}
                </View>
                <View
                  style={{
                    width: "49%"
                    //backgroundColor: "#BCA"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        color: BLACK,
                        fontSize: 14,

                        textAlign: "right"
                        //display: this.state.bill_discount > 0 ? "none" : "flex"
                        // textDecorationLine:
                        //   this.state.bill_discount > 0 ? "line-through" : "none"
                        //textDecorationLine: "line-through",
                        //textDecorationStyle: "solid"
                      }
                    ]}
                  >
                    {this.idrNumToStr(subTotalCalculate, true)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  display: this.state.direct_payment ? "flex" : "none",
                  width: "75%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1
                  //marginTop: 10
                }}
              >
                {/* SUBtotal Box */}
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_sub_total[this.state.languageIndex]}
                  </Text>
                </View>
                <View
                  style={{
                    margin: 0,
                    backgroundColor: "#F7F7F7",
                    borderRadius: 10,
                    elevation: 0,
                    padding: 5,
                    marginBottom: 0,
                    width: "49%",
                    alignSelf: "flex-end"
                  }}
                >
                  <TextInput
                    ref={q => {
                      this.deliveryCost = q;
                    }}
                    style={{
                      //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      backgroundColor: "transparent",
                      color: BLACK,
                      paddingTop: 0,
                      paddingBottom: 0,
                      textAlign: "right",
                      //marginBottom: -10,
                      //marginLeft: '5%',
                      //marginRight: 5,
                      height: 20,
                      fontSize: 12,
                      fontFamily: "Roboto-Regular"
                    }}
                    // style={{
                    //   marginTop: 15,
                    //   padding: 5,
                    //   backgroundColor: "#EEEEEE",
                    //   borderRadius: 5,
                    //   width: "100%",
                    //   fontSize: 10,
                    //   color: BLACK,
                    //   paddingLeft: 10,
                    //   paddingRight: 10,
                    //   fontFamily: "Roboto-Regular"
                    // }}
                    keyboardType="numeric"
                    type="text"
                    value={this.state.bill_subTotal.toString()}
                    onChangeText={v => {
                      if (v === "") {
                        this.setState({ bill_subTotal: 0 });
                        setTimeout(() => {
                          this.changeDiscount();
                        }, 100);
                      } else {
                        this.setState({ bill_subTotal: parseFloat(v) });

                        setTimeout(() => {
                          this.changeDiscount();
                        }, 100);
                      }
                      // this.changeDiscount();
                    }}
                    onSubmitEditing={() => {
                      if (this.state.bill_subTotal === "") {
                        this.setState({ bill_subTotal: 0 });
                      }
                      setTimeout(() => {
                        this.changeDiscount();
                      }, 100);
                      // this.setState({viewSearch: false});
                    }}
                    // placeholder={_delivery_cost[this.state.languageIndex]}
                    placeholderTextColor={BLACK}
                  />
                </View>
              </View>

              <View
                style={{
                  // display: this.state.bill_discount > 0 ? "flex" : "none",
                  width: "75%",
                  flexDirection: "row",
                  alignSelf: "center",
                  flex: 1,
                  justifyContent: "space-between"
                }}
              >
                <View style={{ width: "49%", flexDirection: "row" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_discount[this.state.languageIndex]}
                  </Text>
                  <Button
                    style={{
                      //padding: 5
                      display:
                        this.state.automaticPromoActivated.length === 0 &&
                        this.state.total_membership_discount === 0
                          ? "none"
                          : "flex"
                    }}
                    onPress={() => {
                      this.setState({ showPromo: true });
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          color: BLACK,
                          fontSize: 14,
                          alignSelf: "center"
                        }
                      ]}
                    >
                      [ ? ]
                    </Text>
                  </Button>
                </View>
                <View
                  style={{
                    width: "49%"
                  }}
                >
                  {this.state.bill_discount > 0 ? (
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          // color: GREEN_400,
                          fontSize: 14,
                          textAlign: "right"
                        }
                      ]}
                    >
                      -{this.idrNumToStr(discount_render, true)}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          // color: GREEN_400,
                          fontSize: 14,
                          textAlign: "right"
                        }
                      ]}
                    >
                      -
                    </Text>
                  )}
                </View>

                {/* <View
                  style={{
                    width: "14%"
                  }}
                >
                  <Button
                    style={{
                      padding: 5
                      // display:
                      //   this.state.automaticPromoActivated.length === 0
                      //     ? "none"
                      //     : "flex"
                    }}
                    onPress={() => {
                      this.setState({ showPromo: true });
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          color: BLACK,
                          fontSize: 14,
                          alignSelf: "center"
                        }
                      ]}
                    >
                      [ ? ]
                    </Text>
                  </Button>
                </View> */}
              </View>
              <View
                style={{
                  width: "75%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1
                  //marginTop: 10
                }}
              >
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_tax[this.state.languageIndex]}
                  </Text>
                </View>
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        color: BLACK,
                        fontSize: 14,
                        //alignSelf: "center",
                        textAlign: "right"
                        //textDecorationLine: "line-through",
                        //textDecorationStyle: "solid"
                      }
                    ]}
                  >
                    {this.idrNumToStr(tax_render, true)}
                  </Text>
                </View>
              </View>
              <View style={{ width: "100%", alignSelf: "center", flex: 1 }} />

              {/* Delivery */}
              <View
                style={{
                  width: "75%",
                  //alignSelf: "center",
                  flex: 1
                }}
              >
                <Button
                  onPress={() => {
                    if (this.state.using_delivery) {
                      this.setState({
                        payment_delivery: 0
                      });
                    }

                    this.setState({
                      using_delivery: !this.state.using_delivery
                    });

                    setTimeout(() => {
                      this.changeDiscount();
                    }, 100);
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    //backgroundColor: "#BCA",
                    alignItems: "center"
                  }}
                >
                  <Checkbox
                    size={28}
                    checked={this.state.using_delivery}
                    color={BLACK}
                  />
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { fontSize: 12, marginRight: 5 }
                    ]}
                  >
                    {_delivery[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>

              {/* <View
                style={{
                  width: "100%",
                  flex: 1,
                  display: this.state.using_delivery ? "flex" : "none"
                }}
              > */}
              {/* <View
                  style={{
                    width: "75%",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    alignItems:"center"
                  }}
                > */}
              <View
                style={{
                  display: this.state.using_delivery ? "flex" : "none",
                  width: "75%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1
                  //marginTop: 10
                }}
              >
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_delivery_cost[this.state.languageIndex]}
                  </Text>
                </View>
                <View
                  style={{
                    margin: 0,
                    backgroundColor: "#F7F7F7",
                    borderRadius: 10,
                    elevation: 0,
                    padding: 5,
                    marginBottom: 0,
                    width: "49%",
                    alignSelf: "flex-end"
                  }}
                >
                  <TextInput
                    ref={q => {
                      this.deliveryCost = q;
                    }}
                    style={{
                      //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      backgroundColor: "transparent",
                      color: BLACK,
                      paddingTop: 0,
                      paddingBottom: 0,
                      textAlign: "right",
                      //marginBottom: -10,
                      //marginLeft: '5%',
                      //marginRight: 5,
                      height: 20,
                      fontSize: 12,
                      fontFamily: "Roboto-Regular"
                    }}
                    // style={{
                    //   marginTop: 15,
                    //   padding: 5,
                    //   backgroundColor: "#EEEEEE",
                    //   borderRadius: 5,
                    //   width: "100%",
                    //   fontSize: 10,
                    //   color: BLACK,
                    //   paddingLeft: 10,
                    //   paddingRight: 10,
                    //   fontFamily: "Roboto-Regular"
                    // }}
                    keyboardType="numeric"
                    type="text"
                    value={this.state.payment_delivery.toString()}
                    onChangeText={v => {
                      if (v === "") {
                        this.setState({ payment_delivery: 0 });
                      } else {
                        this.setState({ payment_delivery: v });
                      }
                      // this.changeDiscount();
                    }}
                    onSubmitEditing={() => {
                      if (this.state.payment_delivery === "") {
                        this.setState({ payment_delivery: 0 });
                      }
                      setTimeout(() => {
                        this.changeDiscount();
                      }, 100);
                      // this.setState({viewSearch: false});
                    }}
                    // placeholder={_delivery_cost[this.state.languageIndex]}
                    placeholderTextColor={BLACK}
                  />
                </View>
              </View>
              {/* </View> */}
              {/* <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    color: BLACK,
                    fontSize: 16,
                    alignSelf: "center"
                    //textDecorationLine: "line-through",
                    //textDecorationStyle: "solid"
                  }
                ]}
              >
                {this.idrNumToStr(this.state.payment_delivery, true)}
              </Text> */}
              {/* <View
                style={{
                  width: "75%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1
                  //marginTop: 10
                }}
              >
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_transaction_type[this.state.languageIndex]}
                  </Text>
                </View>
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        color: BLACK,
                        fontSize: 14,
                        //alignSelf: "center",
                        textAlign: "right"
                        //textDecorationLine: "line-through",
                        //textDecorationStyle: "solid"
                      }
                    ]}
                  >
                    {salesTypeName}
                  </Text>
                </View>
              </View> */}
              <View
                style={{
                  width: "75%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1,
                  marginTop: 0
                }}
              >
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_coupon[this.state.languageIndex]}
                  </Text>
                </View>
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        color: BLACK,
                        fontSize: 14,
                        textAlign: "right"
                      }
                    ]}
                  >
                    {this.idrNumToStr(couponRender, true)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "75%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1,
                  marginTop: 5
                }}
              >
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_grand_total[this.state.languageIndex]}
                  </Text>
                </View>
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        color: BLACK,
                        fontSize: 14,
                        textAlign: "right"
                      }
                    ]}
                  >
                    {this.idrNumToStr(grandTotalRoundRender, true)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "75%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  display: "none",
                  flex: 1,
                  marginTop: 5
                }}
              >
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14 }
                    ]}
                  >
                    {_grand_total[this.state.languageIndex]}{" "}
                    {_coupon[this.state.languageIndex]}
                  </Text>
                </View>
                <View style={{ width: "49%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        color: BLACK,
                        fontSize: 14,
                        textAlign: "right"
                      }
                    ]}
                  >
                    {this.idrNumToStr(this.state.grandTotalBeforeCoupon, true)}
                  </Text>
                </View>
              </View>

              {/* <View
                  style={{
                    width: this.state.tablet ? "75%" : "75%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center"
                    //backgroundColor: "#BCA"
                  }}
                >
                  <View
                    style={{
                      display: this.state.bill_discount > 0 ? "flex" : "none",
                      width: this.state.tablet ? "35%" : "80%",
                      flexDirection: "row",
                      alignSelf: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          color: BLACK,
                          fontSize: 20,
                          alignSelf: "center",
                          textDecorationLine: "line-through",
                          textDecorationStyle: "solid"
                        }
                      ]}
                    >
                      {this.idrNumToStr(
                        parseInt(
                          this.state.grandTotalDefault +
                            this.state.customPriceFinal
                        ),
                        true
                      )}
                    </Text>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { color: GREEN_400, fontSize: 20, alignSelf: "center" }
                      ]}
                    >
                      (-{this.idrNumToStr(discount_calculate, true)})
                    </Text>
                    <Button
                      style={{ padding: 5 }}
                      onPress={() => {
                        this.setState({ showPromo: true });
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        [ ? ]
                      </Text>
                    </Button>
                  </View>
                </View> */}

              {/* <View
                style={{
                  width: "75%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignSelf: "center"
                  //backgroundColor: "#BCA",
                  //flex: 1,
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        color: BLACK,
                        fontSize: 20,
                        alignSelf: "center"
                      }
                    ]}
                  >
                    {this.idrNumToStr(grandTotalRoundRender, true)}
                  </Text>
                </View>
              </View> */}

              <View
                style={{
                  width: "100%",
                  //flexDirection: "row",
                  //justifyContent: "space-evenly",
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center"

                  //backgroundColor: "#BCA"
                }}
              >
                <View
                  style={{
                    //marginTop: 15,
                    //padding: 10,
                    //backgroundColor: "#BCA",
                    //display: this.state.points_available > 0 ? "flex" : "none",
                    display: "none",
                    borderRadius: 5,
                    width: "75%",
                    alignSelf: "center",
                    fontSize: 10,
                    color: BLACK,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginTop: 10,
                    fontFamily: "Roboto-Regular",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 14, marginRight: 5 }
                    ]}
                  >
                    {_conversion_point[this.state.languageIndex]}{" "}
                    {text_conversion}
                  </Text>
                </View>
                <View
                  style={{
                    //marginTop: 15,
                    //padding: 10,
                    //backgroundColor: "#BCA",
                    display: this.state.points_available > 0 ? "flex" : "none",
                    borderRadius: 5,
                    width: "75%",
                    //alignSelf: "center",
                    fontSize: 10,
                    color: BLACK,
                    // paddingLeft: 5,
                    // paddingRight: 5,
                    fontFamily: "Roboto-Regular",
                    flexDirection: "row"
                    //alignContent: "center",
                    //alignItems: "center"
                  }}
                >
                  {/* USE POINTS HERE */}

                  <Button
                    onPress={() => {
                      this.setState({
                        usePoints: !this.state.usePoints
                      });

                      setTimeout(() => {
                        this.changeDiscount();
                      }, 250);
                    }}
                    style={{
                      flexDirection: "row",
                      //justifyContent: "space-between",
                      //backgroundColor: "#BCA",
                      //alignItems: "center",
                      width: "100%"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 14, marginRight: 5 }
                      ]}
                    >
                      {_use_points[this.state.languageIndex]}
                    </Text>
                    <Checkbox
                      size={28}
                      checked={this.state.usePoints}
                      color={BLACK}
                    />
                  </Button>
                </View>

                <View
                  style={{
                    //marginTop: 15,
                    //padding: 10,
                    //backgroundColor: "#BCA",
                    display:
                      this.state.saldo_available > this.state.grandTotalRound
                        ? "flex"
                        : "none",
                    borderRadius: 5,
                    width: "50%",
                    alignSelf: "center",
                    fontSize: 10,
                    color: BLACK,
                    paddingLeft: 5,
                    paddingRight: 5,
                    fontFamily: "Roboto-Regular",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  {/* USE SALDO HERE */}

                  <Button
                    onPress={() => {
                      this.setState({
                        useSaldo: !this.state.useSaldo
                      });

                      // setTimeout(() => {
                      //   this.changeDiscount();
                      // }, 250);
                    }}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      //backgroundColor: "#BCA",
                      alignItems: "center",
                      width: "100%"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        { fontSize: 14, marginRight: 5 }
                      ]}
                    >
                      {_use_saldo[this.state.languageIndex]}
                    </Text>
                    <Checkbox
                      size={28}
                      checked={this.state.useSaldo}
                      color={BLACK}
                    />
                  </Button>
                </View>

                <View
                  style={{
                    display: this.state.points_used > 0 ? "flex" : "none",
                    width: "75%",

                    alignSelf: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    flex: 1,
                    marginTop: 0
                  }}
                >
                  <View style={{ width: "49%" }}>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          color: BLACK,
                          fontSize: 14

                          //textDecorationLine: "line-through",
                          //textDecorationStyle: "solid"
                        }
                      ]}
                    >
                      {_points_used[this.state.languageIndex]}:
                    </Text>
                  </View>
                  <View style={{ width: "49%" }}>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { color: GREEN_400, fontSize: 14, textAlign: "right" }
                      ]}
                    >
                      {this.state.points_used}
                    </Text>
                  </View>
                </View>
              </View>

              {/* <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { color: BLACK, fontSize: 20, alignSelf: "center" }
                  ]}
                >
                  {this.state.automaticPromoAmount}
                </Text>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { color: BLACK, fontSize: 20, alignSelf: "center" }
                  ]}
                >
                  {this.state.automaticPromoRate}
                </Text> */}

              {/* <Text
                  style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
                >
                  {this.state.bill_tax}
                </Text>
                <Text
                  style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
                >
                  {this.state.bill_services}
                </Text> */}
            </View>
          </View>
        </View>
        <ScrollView
          style={{
            flex: 1,
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center",
            backgroundColor: WHITE_ROBO
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {this.state.promoSpecial.length > 0 ? (
            this.renderRightSideDiscount()
          ) : (
            <View />
          )}

          {this.state.promoVoucher.length > 0 ? this.renderVoucher() : <View />}
          {this.state.customer_voucher.length > 0 ? (
            this.renderVoucherCustomer()
          ) : (
            <View />
          )}

          {/* {this.renderVoucherCustomer()} */}

          {/* {this.renderVoucher()} */}
          {this.renderRightSidePayment()}
        </ScrollView>
      </View>
    );
  }

  renderBill() {
    const {
      bill_alamat,
      bill_table_id,
      bill_transId,
      bill_cashier,
      bill_time
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              //backgroundColor: "#BCA"
              marginTop: 15
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100
                //backgroundColor: "#888"
              }}
              resizeMode={"stretch"}
              source={require("../../Images/icon.png")}
            />
            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 12 }]}
            >
              {bill_alamat}
            </Text>
          </View>
          <View
            style={{
              margin: 15
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: BLACK,
                  fontSize: 14,
                  display:
                    bill_table_id && bill_table_id !== 0 ? "flex" : "none"
                }
              ]}
            >
              Table: {this.state.selectedTable.name}
            </Text>
            {this.state.show_order_id ? (
              <Text
                style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 12 }]}
              >
                {bill_transId}
              </Text>
            ) : (
              <View />
            )}

            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 12 }]}
            >
              Cashier: {bill_cashier}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 12 }]}
            >
              {bill_time}
            </Text>
          </View>
          {this.renderBillList()}
          {this.renderBillMessage()}
        </ScrollView>
      </View>
    );
  }

  renderBillDetail(data, i) {
    let detail = data.detail;
    let detailString = "";

    //let total = data.qty * data.price;
    let total = data.qty * data.price + data.qty * data.salesTypeValue;

    detail.map((items, itemIndex) => {
      if (detailString === "") {
        detailString = items.name;
      } else {
        detailString = detailString + ", " + items.name;
      }
    });

    return (
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 20,
          //paddingBottom: 10,
          paddingBottom: 5,
          minHeight: 40,
          //borderColor: WHITE,
          //borderBottomWidth: 1,
          marginLeft: 15,
          marginRight: 15
        }}
      >
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "45%"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: BLACK, textAlign: "center" }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 10, color: BLACK, textAlign: "center" }
            ]}
          >
            {detailString}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 10, color: BLACK, textAlign: "center" }
            ]}
          >
            {data.salesType}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "25%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {/* <Button
              style={{ width: "27%" }}
              onPress={() => {
                this.changeQty(i, -1);
                //this.changeQty(i);
              }}
            >
              <AntDesign
                name={"minuscircle"}
                style={{
                  alignSelf: "center",
                  fontSize: 25,
                  color: GREY_700
                }}
              />
            </Button> */}
          <View
            style={{ width: "45%", marginRight: 5, alignItems: "flex-end" }}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                { fontSize: 12, color: BLACK, right: "-25%" }
              ]}
            >
              {data.qty}
            </Text>
            <View style={{ width: "100%", height: 25 }}>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 10,
                    color: BLACK,
                    position: "absolute",
                    right: "-55%"
                  }
                ]}
              >
                {data.price}
              </Text>
            </View>
          </View>
          {/* <Button
              onPress={() => {
                this.changeQty(i, 1);
                //this.changeQty(i);
              }}
            >
              <AntDesign
                style={{ width: "25%" }}
                name={"pluscircle"}
                style={{
                  alignSelf: "center",
                  fontSize: 25,
                  color: GREY_700
                }}
              />
            </Button> */}
        </View>
        <View
          style={{
            alignItems: "flex-end",
            alignContent: "center",
            //justifyContent: 'flex-end',
            width: "25%"
            //backgroundColor: "#BCA"
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
          >
            {total}
          </Text>
        </View>
      </View>
    );
  }

  renderBillMessage() {
    return (
      <View>
        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 25,
            borderColor: BLACK,
            borderBottomWidth: 1,
            alignItems: "center"
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
          >
            {this.state.footer_printer !== ""
              ? this.state.footer_printer
              : "Thank You for Coming"}
          </Text>
        </View>
        <View
          style={{
            margin: 15,
            marginTop: 5,
            //backgroundColor: "#BCA",
            flexDirection: "row"
          }}
        >
          <View
            style={[
              ss.box,
              {
                width: 45,
                height: 45,
                marginRight: 25,
                backgroundColor: "#888"
              }
            ]}
          />
          <View>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              Wifi: Kopi-Free-Wifi
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              Pass: ngopi
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderBillHeader() {
    return (
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          //marginTop: 20,
          paddingBottom: 0,
          height: 40,
          borderColor: BLACK,
          borderBottomWidth: 1,
          marginLeft: 15,
          marginRight: 15
        }}
      >
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "45%"
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 15, color: BLACK }]}
          >
            Item
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "25%"
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 15, color: BLACK }]}
          >
            Qty
          </Text>
          {/* Quantity Bill */}
        </View>
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "25%",
            paddingLeft: 15
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 15, color: BLACK }]}
          >
            {_total[this.state.languageIndex]}
          </Text>
        </View>
      </View>
    );
  }

  renderBillFooter(subTotal) {
    const { rate_discount, rate_services, rate_tax } = this.state;

    let grand_total = 0;
    let bill_discount = parseInt(rate_discount * subTotal);
    let bill_services = parseInt(rate_services * subTotal);
    let bill_tax = parseInt(rate_tax * subTotal);
    grand_total = parseInt(subTotal + bill_services + bill_tax - bill_discount);

    return (
      <View>
        <View
          style={{
            // alignSelf: 'flex-end',
            // flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
            //marginTop: 20,
            //paddingBottom: 10,
            height: 40,
            //borderColor: BLACK,
            //borderBottomWidth: 1,
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              width: "50%"
            }}
          />
          <View
            style={{
              //alignItems: 'center',
              alignContent: "center",
              alignItems: "flex-start",
              width: "33%",
              borderColor: BLACK,
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 15, color: BLACK }
              ]}
            >
              {_sub_total[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              alignContent: "center",
              width: "25%",
              borderColor: BLACK,
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 15, color: BLACK }
              ]}
            >
              {subTotal}
            </Text>
          </View>
        </View>
        {/* subtotal */}
        {/* discount */}
        <View
          style={{
            // alignSelf: 'flex-end',
            // flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
            //marginTop: 20,
            //paddingBottom: 10,
            //borderColor: BLACK,
            //borderBottomWidth: 1,
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              width: "50%"
            }}
          />
          <View
            style={{
              //alignItems: 'center',
              alignContent: "center",
              alignItems: "flex-start",
              width: "33%",
              paddingBottom: 5
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {_discount[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              alignContent: "center",
              width: "25%",
              paddingBottom: 5
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {bill_discount * -1}
            </Text>
          </View>
        </View>
        {/* discount */}
        {/* tax */}
        <View
          style={{
            // alignSelf: 'flex-end',
            // flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
            //marginTop: 20,
            //paddingBottom: 10,
            //borderColor: BLACK,
            //borderBottomWidth: 1,
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              width: "50%"
            }}
          />
          <View
            style={{
              //alignItems: 'center',
              alignContent: "center",
              alignItems: "flex-start",
              width: "33%",
              paddingBottom: 5
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {_tax[this.state.languageIndex]} ({rate_tax * 100}%)
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              alignContent: "center",
              width: "25%",
              paddingBottom: 5
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {bill_tax}
            </Text>
          </View>
        </View>
        {/* services */}
        <View
          style={{
            // alignSelf: 'flex-end',
            // flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
            //marginTop: 20,
            //paddingBottom: 10,
            //borderColor: BLACK,
            //borderBottomWidth: 1,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              width: "50%"
            }}
          />
          <View
            style={{
              //alignItems: 'center',
              alignContent: "center",
              alignItems: "flex-start",
              width: "33%",
              borderColor: BLACK,
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              Services ({rate_services * 100}%)
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              alignContent: "center",
              width: "25%",
              borderColor: BLACK,
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {bill_services}
            </Text>
          </View>
        </View>
        {/* services end */}
        {/* grandtotal */}
        <View
          style={{
            // alignSelf: 'flex-end',
            // flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
            //marginTop: 20,
            //paddingBottom: 10,
            //borderColor: BLACK,
            //borderBottomWidth: 1,
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              width: "50%"
            }}
          />
          <View
            style={{
              //alignItems: 'center',
              alignContent: "center",
              alignItems: "flex-start",
              width: "33%",
              paddingBottom: 5
            }}
          >
            <Text
              //gak kepake
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 12, color: BLACK }
              ]}
            >
              {_grand_total[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              alignContent: "center",
              width: "25%",
              paddingBottom: 5
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {grand_total}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderBillList() {
    const { dataBill } = this.state;
    let subTotal = 0;
    dataBill.map((v, i) => {
      subTotal = subTotal + v.qty * v.price;
      subTotal = subTotal + v.qty * v.salesTypeValue;
    });

    return (
      <View>
        {this.renderBillHeader()}
        <FlatList
          //ListHeaderComponent={this.renderSearch()}
          showsVerticalScrollIndicator={false}
          data={dataBill}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginLeft: 0,
                  marginTop: 0,
                  marginBottom: 3,
                  marginRight: 0,
                  borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                }}
              >
                {this.renderBillDetail(item, index)}
              </View>
            );
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
        {this.renderBillFooter(subTotal)}
      </View>
    );
  }

  changeEmail(text) {
    this.setState({ formEmail: text });
  }

  changePhone(text) {
    this.setState({ formPhone: text });
  }

  changeCustomer(text) {
    this.setState({ formCustomer: text });
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
    //console.log("string length ==> ", length);

    let array_length = Math.ceil(length / limit);
    //console.log("array_length  ==> ", array_length);

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

    //console.log("final_result ==> ", final_result);

    //substr(0, limit);
  }

  renderTabBar() {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "rgba(248, 248, 248, 0.92)",
          height: 50,
          marginTop: 5,
          alignSelf: "flex-end",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Button
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center",
            display: "none" //SPLIT BILL DISINI,
          }}
          onPress={() => {
            //this.setState({ showCustom: true });
            this.setState({ mount: false });
            Actions.MobileSplitBill({
              auth: this.state.auth,
              orderId: this.props.order_id,
              dataOrder: this.props.dataOrder,
              dataBill: this.props.dataBill,
              userInfo: this.state.userInfo,
              colorIndex: this.state.colorIndex,
              selectedTable: this.props.selectedTable,
              languageIndex: this.state.languageIndex,
              items: this.props.items,
              tax: this.props.tax,
              services: this.props.services,
              withTax: this.props.withTax,
              withServices: this.props.withServices
            });
          }}
        >
          <MaterialIcons
            name={"event-note"}
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
            {_split_bill[this.state.languageIndex]}
          </Text>
        </Button>

        {this.state.sub_type === 3 ? (
          <Button
            style={{
              width: "24%",
              justifyContent: "center",
              alignItems: "center",
              display:
                this.state.dataCommission.length === 0 &&
                this.state.access_commission_management
                  ? "none"
                  : "none"
            }}
            onPress={() => {
              this.setState({ showCommissionSelection: true });
            }}
          >
            <MaterialIcons
              name={"event-note"}
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
              {_commission[this.state.languageIndex]}
            </Text>
          </Button>
        ) : (
          <View />
        )}

        <Button
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center",
            display: "none" //SPLIT BILL DISINI
          }}
          onPress={() => {
            //this.setState({ showCustom: true });
            this.setState({ mount: false });
            Actions.MobileSplitBill({
              auth: this.state.auth,
              orderId: this.props.order_id,
              dataOrder: this.props.dataOrder,
              dataBill: this.props.dataBill,
              userInfo: this.state.userInfo,
              colorIndex: this.state.colorIndex,
              selectedTable: this.props.selectedTable,
              languageIndex: this.state.languageIndex,
              items: this.props.items,
              tax: this.props.tax,
              services: this.props.services
            });
          }}
        >
          <MaterialIcons
            name={"event-note"}
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
            {_split_bill[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center",
            display: "none" // harga custom dihide
          }}
          onPress={() => {
            this.setState({ showCustom: true });
          }}
        >
          <MaterialIcons
            name={"event-note"}
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
            {_harga_custom[this.state.languageIndex]}
          </Text>
        </Button>

        {/* <Button
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
          </Button> */}

        <Button
          onPress={() => {
            if (this.state.searchKey === "") {
              this.setState({ showCustomer: true });
            } else {
              this.setState({ showCustomer: true, searchKey: "" });
              this.getListCustomer(1);
            }
          }}
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center",
            display: this.state.access_customer_management ? "flex" : "none"
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

          {this.state.selectedCustomerName ? (
            <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 10,
                  color: BLACK
                })
              }
            >
              {this.state.selectedCustomerName}
            </Text>
          ) : (
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
          )}
        </Button>

        <Button
          onPress={() => {
            if (this.state.couponSearchKey === "") {
              this.setState({ showCoupon: true });
            } else {
              this.setState({ showCoupon: true, couponSearchKey: "" });
              //this.getListCustomer(1);
            }
          }}
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center",
            display: this.state.access_customer_management ? "flex" : "none"
          }}
        >
          <FontAwesome5
            name={"money-check-alt"}
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: BLACK
            }}
          />

          {this.state.selectedCustomerName ? (
            <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 10,
                  color: BLACK
                })
              }
            >
              {this.state.selectedCustomerName}
            </Text>
          ) : (
            <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 10,
                  color: BLACK
                })
              }
            >
              {_coupon[this.state.languageIndex]}
            </Text>
          )}
        </Button>
      </View>
    );
  }

  renderCustomPrice() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCustom}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showCustom: false });
        }}
      >
        <View style={{ flex: 0.5, backgroundColor: "rgba(0,0,0,0.5)" }} />
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              flex: 1,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center",
              marginTop: -15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: WHITE
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center"
                //justifyContent: "center"
              }}
            >
              <View
                style={{
                  //backgroundColor: "#BCA",
                  width: "100%",
                  flexDirection: "row",
                  padding: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showCustom: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK
                    })
                  }
                >
                  {_harga_custom[this.state.languageIndex]}
                </Text>
              </View>

              <View
                style={{ flexDirection: "column", width: "100%", padding: 30 }}
              >
                <View style={{ width: "100%" }}>
                  <TextInput
                    ref={q => {
                      this.CashAmount = q;
                    }}
                    style={{
                      marginTop: 15,
                      padding: 5,
                      backgroundColor: "#EEEEEE",
                      borderRadius: 5,
                      width: "100%",
                      fontSize: 10,
                      color: BLACK,
                      paddingLeft: 10,
                      paddingRight: 10,
                      fontFamily: "Roboto-Regular"
                    }}
                    keyboardType="numeric"
                    type="text"
                    value={this.state.customPrice}
                    onChangeText={v => {
                      this.setState({ customPrice: v });
                    }}
                    placeholder={_harga_custom[this.state.languageIndex]}
                    placeholderTextColor={BLACK}
                  />
                </View>
                <View
                  style={{
                    marginTop: 15,
                    //padding: 10,
                    //backgroundColor: "#BCA",
                    borderRadius: 5,
                    width: "100%",
                    fontSize: 10,
                    color: BLACK,
                    paddingLeft: 5,
                    paddingRight: 5,
                    fontFamily: "Roboto-Regular",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Button
                    onPress={() => {
                      this.setState({
                        customPriceTax: !this.state.customPriceTax
                      });
                    }}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      //backgroundColor: "#BCA",
                      width: "100%",
                      paddingTop: 15,
                      paddingBottom: 15
                    }}
                  >
                    <Text style={[MainStyle.robotoNormal, { fontSize: 12 }]}>
                      {_include_tax[this.state.languageIndex]}
                    </Text>
                    <Checkbox
                      size={25}
                      checked={this.state.customPriceTax}
                      color={BLACK}
                    />
                  </Button>
                </View>
              </View>
            </View>
            <View
              style={{
                //backgroundColor: "#BCA",
                //width: "95%",
                //flex: 1,
                //height: 50,
                width: "100%",
                //margin: 15,
                padding: 15,
                justifyContent: "flex-end"
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    // if (this.state.payment_type === "cash") {
                    //
                    // } else {
                    //   // this.setState({ showQRPayment: true });
                    //
                    // }
                    this.setState({ showCustom: false });
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: WHITE,
                      width: "45%",
                      borderWidth: 0.75,
                      borderColor: BLACK,
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: BLACK
                      })
                    }
                  >
                    {_kembali[this.state.languageIndex]}
                  </Text>
                </Button>

                <Button
                  onPress={() => {
                    // if (this.state.payment_type === "cash") {
                    //
                    // } else {
                    //   // this.setState({ showQRPayment: true });
                    //
                    // }
                    this.changeCustomPrice();
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      width: "45%",
                      borderWidth: 0.5,
                      borderColor: MAIN_TEXT_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      })
                    }
                  >
                    {_simpan[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderModalCustomer() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCustomer}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showCustomer: false });
        }}
      >
        {this.state.loadingCustomer ? <Loading /> : <View />}
        <View style={{ flex: 0.5, backgroundColor: "rgba(0,0,0,0.5)" }} />
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              flex: 1,
              marginTop: -15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: WHITE,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center"
                //justifyContent: "center"
              }}
            >
              <View
                style={{
                  //backgroundColor: "#BCA",
                  width: "100%",
                  flexDirection: "row",
                  padding: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showCustomer: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK
                    })
                  }
                >
                  {_pilih_pelanggan[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  margin: 15,
                  padding: 15,
                  paddingTop: 0
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      margin: 0,
                      backgroundColor: "#F7F7F7",
                      borderRadius: 10,
                      elevation: 0,
                      padding: 10,
                      marginBottom: 5
                    }}
                  >
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginLeft: 10,
                        marginRight: 10
                      }}
                    >
                      <View
                        style={{
                          //width: "10%",
                          alignContent: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Ionicons
                          name={"md-search"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: BLACK
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%"
                        }}
                      >
                        <TextInput
                          style={{
                            //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: "transparent",
                            color: "#BEC2CE",
                            paddingTop: 5,
                            paddingBottom: 10,
                            marginBottom: -10,
                            //marginLeft: '5%',
                            //marginRight: 5,
                            height: 40,
                            fontSize: 12,
                            fontFamily: "Roboto-Regular"
                          }}
                          type="text"
                          ref={q => {
                            this.TextInputSearch = q;
                          }}
                          onSubmitEditing={() => {
                            this.getListCustomer(1);
                            // this.setState({viewSearch: false});
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ searchKey: v })}
                          value={this.state.searchKey}
                          placeholder={_search[this.state.languageIndex]}
                          placeholderTextColor={BLACK}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.listCustomer}
                  renderItem={({ item, index }) => {
                    return this.renderListCustomer(item, index);
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "renderListCustomer" + index.toString();
                  }}
                  //onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //refreshing={refreshing}
                />
              </View>
            </View>
            <View
              style={{
                //backgroundColor: "#BCA",
                //width: "95%",
                //flex: 1,
                //height: 50,
                width: "100%",
                //margin: 15,
                padding: 15,
                justifyContent: "flex-end"
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    // if (this.state.payment_type === "cash") {
                    //
                    // } else {
                    //   // this.setState({ showQRPayment: true });
                    //
                    // }
                    this.setState({
                      showCustomer: false,
                      selectedCustomer: null,
                      selectedCustomerData: null,
                      selectedCustomerName: null,
                      formCustomer: "",
                      formPhone: "",
                      formEmail: "",
                      points_available: 0,
                      saldo_available: 0,
                      loading: true
                      //points_used: 0
                    });
                    setTimeout(() => {
                      this.changeDiscount();
                    }, 500);
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      width: "100%",
                      borderWidth: 0,
                      borderColor: BLACK,
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      })
                    }
                  >
                    {_batal[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderModalCoupon() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCoupon}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showCoupon: false });
        }}
      >
        {this.state.loadingCustomer ? <Loading /> : <View />}
        <View style={{ flex: 0.5, backgroundColor: "rgba(0,0,0,0.5)" }} />
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              flex: 1,
              marginTop: -15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: WHITE,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center"
                //justifyContent: "center"
              }}
            >
              <View
                style={{
                  //backgroundColor: "#BCA",
                  width: "100%",
                  flexDirection: "row",
                  padding: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showCoupon: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK
                    })
                  }
                >
                  {_coupon[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  margin: 15,
                  padding: 15,
                  paddingTop: 0
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      margin: 0,
                      backgroundColor: "#F7F7F7",
                      borderRadius: 10,
                      elevation: 0,
                      padding: 10,
                      marginBottom: 5
                    }}
                  >
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginLeft: 10,
                        marginRight: 10
                      }}
                    >
                      <View
                        style={{
                          //width: "10%",
                          alignContent: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Ionicons
                          name={"md-search"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: BLACK
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%"
                        }}
                      >
                        <TextInput
                          style={{
                            //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: "transparent",
                            color: BLACK,
                            paddingTop: 5,
                            paddingBottom: 10,
                            marginBottom: -10,
                            //marginLeft: '5%',
                            //marginRight: 5,
                            height: 40,
                            fontSize: 12,
                            fontFamily: "Roboto-Regular"
                          }}
                          type="text"
                          ref={q => {
                            this.TextInputSearch = q;
                          }}
                          onSubmitEditing={() => {
                            //this.getListCustomer(1);
                            this.getCouponData(this.state.couponSearchKey);
                            // this.setState({viewSearch: false});
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v =>
                            this.setState({ couponSearchKey: v })
                          }
                          value={this.state.couponSearchKey}
                          placeholder={_search[this.state.languageIndex]}
                          placeholderTextColor={BLACK}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.listCouponUsage}
                  renderItem={({ item, index }) => {
                    return this.renderListCoupon(item, index);
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "renderListCoupon" + index.toString();
                  }}
                  //onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //refreshing={refreshing}
                />
              </View>
            </View>
            <View
              style={{
                //backgroundColor: "#BCA",
                //width: "95%",
                //flex: 1,
                //height: 50,
                width: "100%",
                //margin: 15,
                padding: 15,
                justifyContent: "flex-end"
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    // if (this.state.payment_type === "cash") {
                    //
                    // } else {
                    //   // this.setState({ showQRPayment: true });
                    //
                    // }
                    // this.setState({
                    //   showCustomer: false,
                    //   selectedCustomer: null,
                    //   selectedCustomerData: null,
                    //   selectedCustomerName: null,
                    //   formCustomer: "",
                    //   formPhone: "",
                    //   formEmail: "",
                    //   points_available: 0,
                    //   saldo_available: 0,
                    //   loading: true
                    //   //points_used: 0
                    // });
                    // setTimeout(() => {
                    //   this.changeDiscount();
                    // }, 500);
                    this.setState({ showCoupon: false });
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      width: "100%",
                      borderWidth: 0,
                      borderColor: BLACK,
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      })
                    }
                  >
                    {_batal[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  getCustomerAccount(customer_account_id) {
    const uri_2 = BE_Customer_Account + "/" + customer_account_id;
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri_2, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log("DATA getCustomerAccount ==> ", responseJson);

            if (responseJson.statusCode === 200) {
              const result = responseJson.data;
              const saldo_amount = result.saldo_amount;
              this.setState({ saldo_amount: saldo_amount });
            }
          })
          .catch(_err => {
            console.log("ERR ==> ", _err);
          });
      } else {
      }
    });
  }

  getCustomerVoucher(customer_id, page = 1) {
    const { userInfo, selectedCustomer } = this.state;

    // this.setState({ loading: true });
    const outlet_id = userInfo.gerai_id;
    const business_id = userInfo.retail_id;
    //const customer_id = selectedCustomer.id;

    let status = "";
    //status = "&status=done";
    //status = "&status=refund";
    let per_page = 20;
    let uri = `${BE_Customer_Voucher_Personal}?order=newest&status=available&customer_id=${customer_id}&outlet_id=${outlet_id}&business_id=${business_id}&page=${page}&per_page=${per_page}${status}`;

    //let uri = `${BE_Transaction}?order=newest&outlet_id=${outlet_id}&business_id=${business_id}&page=1&per_page=5&date_start=${date_start}&date_end=${date_end}${status}`;

    console.log("getCustomerVoucher BE ==> ", uri);

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
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
            const result = responseJson;
            const statusCode = responseJson.statusCode;
            console.log("result getCustomerVoucher result ===> ", result);
            if (statusCode === 200) {
              const resultData = result;

              const result_all = resultData.data;
              const pagination = resultData.pagination;
              let result_filtered = [];
              console.log("result getCustomerVoucher ===> ", result_all);
              result_filtered = result_all;
              // if (filterPayment === 0) {
              //   result_filtered = result_all;
              // } else {
              //   if (result_all && result_all.length > 0) {
              //     result_all.map((v, i) => {
              //       const payment_method_id = v.Payment.payment_method_id
              //         ? v.Payment.payment_method_id
              //         : 0;

              //       if (payment_method_id === filterPayment) {
              //         result_filtered.push(v);
              //       }
              //     });
              //   }
              // }

              let result_filtered_final = result_all;

              //name.toLowerCase().includes(searchKeyRegion.toLowerCase()) ||

              // result_filtered.map((v, i) => {
              //   if (
              //     v.status !== "new" &&
              //     v.status !== "pending" &&
              //     v.status !== "processing" &&
              //     v.status !== "cancelled"
              //   ) {
              //     if (v.receipt_id.includes("-SPT")) {
              //       if (v.Transaction_Items.length > 0) {
              //         result_filtered_final.push(v);
              //       }
              //     } else {
              //       result_filtered_final.push(v);
              //     }
              //   }
              // });
              this.setState({
                customer_voucher: result_all

                // loading: false,
                // startDate: start_date,
                // endDate: date_end,
                // page: page,
                // maxPage: pagination.total_page
              });

              if (this.state.page === 1) {
              } else {
                // let tempData = this.state.listHistory;
                // let dataCombi = [...tempData, ...result_filtered_final];
                // this.setState({
                //   listHistory: dataCombi,
                //   loading: false,
                //   startDate: start_date,
                //   endDate: date_end,
                //   page: page,
                //   maxPage: pagination.total_page
                // });
              }
            } else {
              this.setState({
                customer_voucher: []
              });
            }
          })
          .catch(_err => {
            console.log("err ==> ", _err);
            this.setState({ loading: false });
          });
      } else {
        // No INTERNET
      }
    });
  }

  renderListCoupon(data, index) {
    // const backgroundColor =
    //   this.state.selectedCustomer === data.id
    //     ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
    //     : WHITE;
    // const textColor =
    //   this.state.selectedCustomer === data.id
    //     ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
    //     : BLACK;

    const backgroundColor = WHITE;
    const textColor = BLACK;

    let coupon_value = data.coupon_value;

    return (
      <View
        style={{
          padding: 10,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: "#C4C4C4",
          backgroundColor: backgroundColor,
          width: "100%"
        }}
        onPress={() => {
          // this.setState({
          //   selectedCustomerData: data,
          //   selectedCustomer: data.id,
          //   selectedCustomerName: data.name,
          //   formCustomer: data.name,
          //   formPhone: data.phone_number,
          //   formEmail: data.email,
          //   showCustomer: false,
          //   points_available: data.points,
          //   saldo_available: saldo_amount ? saldo_amount : 0,
          //   loading: true,
          //   saldo_amount: 0
          //   // customer_level_discount: 0
          // });

          // this.changeDiscount();
          this.deleteCoupon(index);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 2
              // alignItems: "center",
            }}
          >
            <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 14,
                  color: textColor
                })
              }
            >
              {data.coupon_code}
            </Text>
            <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 14,
                  color: textColor
                })
              }
            >
              {data.coupon_value}
            </Text>
          </View>

          <Button
            style={{
              backgroundColor: RED_500,
              flex: 1,
              borderRadius: 15
              // alignItems: "center",
            }}
            onPress={() => {
              this.deleteCoupon(index);
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
      </View>
    );
  }

  renderListCustomer(data, index) {
    const backgroundColor =
      this.state.selectedCustomer === data.id
        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
        : WHITE;
    const textColor =
      this.state.selectedCustomer === data.id
        ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
        : BLACK;

    let saldo_amount = null;

    if (data.Customer_Account) {
      //console.log("data selected Customer ===> ", data);
      saldo_amount = data.Customer_Account.saldo_amount;
    }

    return (
      <Button
        style={{
          padding: 10,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: "#C4C4C4",
          backgroundColor: backgroundColor,
          width: "100%"
        }}
        onPress={() => {
          this.setState({
            selectedCustomerData: data,
            selectedCustomer: data.id,
            selectedCustomerName: data.name,
            formCustomer: data.name,
            formPhone: data.phone_number,
            formEmail: data.email,
            showCustomer: false,
            points_available: data.points,
            saldo_available: saldo_amount ? saldo_amount : 0,
            loading: true,
            saldo_amount: 0
            // customer_level_discount: 0
          });

          this.getCustomerVoucher(data.id);

          const { loyaltyPromoSettings } = this.state;

          const status = loyaltyPromoSettings
            ? loyaltyPromoSettings.status
            : "";

          const type = loyaltyPromoSettings ? loyaltyPromoSettings.type : "";

          const value = loyaltyPromoSettings ? loyaltyPromoSettings.value : 0;

          if (data.Business_Customer_Membership) {
            // console.log(
            //   "data.Business_Customer_Membership.discount_rate ===>",
            //   data.Business_Customer_Membership.discount_rate
            // );
            this.setState({
              customer_level_discount:
                data.Business_Customer_Membership.discount_rate
            });
          } else {
            this.setState({
              customer_level_discount: 0
            });
          }

          setTimeout(() => {
            this.changeDiscount();
            this.getCustomerAccount(data.id);
          }, 500);
        }}
      >
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              fontSize: 14,
              color: textColor
            })
          }
        >
          {data.name}
        </Text>
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              fontSize: 14,
              color: textColor
            })
          }
        >
          {data.email}
        </Text>
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              fontSize: 14,
              color: textColor
            })
          }
        >
          {data.phone_number}
        </Text>
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              fontSize: 14,
              color: textColor
            })
          }
        >
          Points: {data.points}
        </Text>

        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              fontSize: 14,
              color: textColor,
              display: saldo_amount ? "flex" : "none"
            })
          }
        >
          {_saldo[this.state.languageIndex]}: {saldo_amount}
        </Text>
      </Button>
    );
  }

  renderListStaff(data, index) {
    //commissionSelectedStaff

    const { commissionSelectedStaff } = this.state;

    let selected = false;
    commissionSelectedStaff.map((v, i) => {
      if (v === data.staff_id) {
        selected = true;
      }
    });

    let backgroundColor = selected
      ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
      : WHITE;
    let textColor = selected
      ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
      : BLACK;

    //console.log("data Customer ===> ", data);
    return (
      <Button
        style={{
          padding: 10,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: "#C4C4C4",
          backgroundColor: backgroundColor,
          width: "100%"
        }}
        onPress={() => {
          let commissionSelectedStaffData = commissionSelectedStaff;

          let already_selected = false;
          let index_selected = 0;
          commissionSelectedStaff.map((v, i) => {
            if (v === data.staff_id) {
              already_selected = true;
              index_selected = i;
            }
          });

          if (already_selected) {
            commissionSelectedStaffData.splice(index_selected, 1);
          } else {
            commissionSelectedStaffData.push(data.staff_id);
          }

          this.setState({
            commissionSelectedStaff: commissionSelectedStaffData
          });
        }}
      >
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              fontSize: 14,
              color: textColor
            })
          }
        >
          {data.staff_name}
        </Text>
      </Button>
    );
  }

  renderModalCommissionSelection() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCommissionSelection}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showCommissionSelection: false });
        }}
      >
        <View style={{ flex: 0.5, backgroundColor: "rgba(0,0,0,0.5)" }} />
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              flex: 1,
              marginTop: -15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: WHITE,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center"
                //justifyContent: "center"
              }}
            >
              <View
                style={{
                  //backgroundColor: "#BCA",
                  width: "100%",
                  flexDirection: "row",
                  padding: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showCommissionSelection: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK
                    })
                  }
                >
                  {_choose_staff[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  margin: 15,
                  padding: 15,
                  paddingTop: 0
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      margin: 0,
                      backgroundColor: "#F7F7F7",
                      borderRadius: 10,
                      elevation: 0,
                      padding: 10,
                      marginBottom: 5,
                      display: "none"
                    }}
                  >
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginLeft: 10,
                        marginRight: 10
                      }}
                    >
                      <View
                        style={{
                          //width: "10%",
                          alignContent: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Ionicons
                          name={"md-search"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: BLACK
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%"
                        }}
                      >
                        {/* <TextInput
                          style={{
                            //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: "transparent",
                            color: "#BEC2CE",
                            paddingTop: 5,
                            paddingBottom: 10,
                            marginBottom: -10,
                            //marginLeft: '5%',
                            //marginRight: 5,
                            height: 40,
                            fontSize: 12,
                            fontFamily: "Roboto-Regular"
                          }}
                          type="text"
                          ref={q => {
                            this.TextInputSearch = q;
                          }}
                          onSubmitEditing={() => {
                            this.getListCustomer(1);
                            // this.setState({viewSearch: false});
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ searchKey: v })}
                          value={this.state.searchKey}
                          placeholder={_search[this.state.languageIndex]}
                          placeholderTextColor={BLACK}
                        /> */}
                      </View>
                    </View>
                  </View>
                </View>

                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataStaffCommission}
                  renderItem={({ item, index }) => {
                    return this.renderListStaff(item, index);
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "renderListStaff" + index.toString();
                  }}
                  //onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //refreshing={refreshing}
                />
              </View>
            </View>
            <View
              style={{
                //backgroundColor: "#BCA",
                //width: "95%",
                //flex: 1,
                //height: 50,
                width: "100%",
                //margin: 15,
                padding: 15,
                justifyContent: "flex-end"
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  //flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    this.setState({ showCommissionSelection: false });
                    // if (this.state.payment_type === "cash") {
                    //
                    // } else {
                    //   // this.setState({ showQRPayment: true });
                    //
                    // }
                    // this.setState({
                    //   showCustomer: false,
                    //   selectedCustomer: null,
                    //   selectedCustomerName: null,
                    //   formCustomer: "",
                    //   formPhone: "",
                    //   formEmail: "",
                    //   points_available: 0,
                    //   loading: true
                    //   //points_used: 0
                    // });
                    // setTimeout(() => {
                    //   this.changeDiscount();
                    // }, 500);
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      width: "100%",
                      borderWidth: 0,
                      borderColor: BLACK,
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      marginBottom: 15,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      })
                    }
                  >
                    {_lanjut[this.state.languageIndex]}
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    this.setState({
                      showCommissionSelection: false,
                      commissionSelectedStaff: []
                    });
                    // if (this.state.payment_type === "cash") {
                    //
                    // } else {
                    //   // this.setState({ showQRPayment: true });
                    //
                    // }
                    // this.setState({
                    //   showCustomer: false,
                    //   selectedCustomer: null,
                    //   selectedCustomerName: null,
                    //   formCustomer: "",
                    //   formPhone: "",
                    //   formEmail: "",
                    //   points_available: 0,
                    //   loading: true
                    //   //points_used: 0
                    // });
                    // setTimeout(() => {
                    //   this.changeDiscount();
                    // }, 500);
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      width: "100%",
                      borderWidth: 0,
                      borderColor: BLACK,
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      })
                    }
                  >
                    {_batal[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderPhoneForm() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.cz_show_form_phone}
        //visible={true}
        onRequestClose={() => {
          this.setState({ cz_show_form_phone: false });
        }}
      >
        <View style={{ flex: 0.5, backgroundColor: "rgba(0,0,0,0.5)" }} />
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              flex: 1,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center",
              marginTop: -15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: WHITE
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center"
                //justifyContent: "center"
              }}
            >
              <View
                style={{
                  //backgroundColor: "#BCA",
                  width: "100%",
                  flexDirection: "row",
                  padding: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showCustom: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK
                    })
                  }
                >
                  {_phone_long[this.state.languageIndex]}
                </Text>
              </View>

              <View
                style={{ flexDirection: "column", width: "100%", padding: 30 }}
              >
                <View style={{ width: "100%" }}>
                  <TextInput
                    ref={q => {
                      this.CashAmount = q;
                    }}
                    style={{
                      marginTop: 15,
                      padding: 5,
                      backgroundColor: "#EEEEEE",
                      borderRadius: 5,
                      width: "100%",
                      fontSize: 10,
                      color: BLACK,
                      paddingLeft: 10,
                      paddingRight: 10,
                      fontFamily: "Roboto-Regular"
                    }}
                    keyboardType="numeric"
                    type="text"
                    value={this.state.cz_phone_number}
                    onChangeText={v => {
                      this.setState({ cz_phone_number: v });
                    }}
                    placeholder={_phone_long[this.state.languageIndex]}
                    placeholderTextColor={BLACK}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                //backgroundColor: "#BCA",
                //width: "95%",
                //flex: 1,
                //height: 50,
                width: "100%",
                //margin: 15,
                padding: 15,
                justifyContent: "flex-end"
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    // if (this.state.payment_type === "cash") {
                    //
                    // } else {
                    //   // this.setState({ showQRPayment: true });
                    //
                    // }
                    this.setState({ cz_show_form_phone: false });
                    this.PaymentProceedPhone();
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: WHITE,
                      width: "45%",
                      borderWidth: 0.75,
                      borderColor: BLACK,
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: BLACK
                      })
                    }
                  >
                    {_kembali[this.state.languageIndex]}
                  </Text>
                </Button>

                <Button
                  onPress={() => {
                    // if (this.state.payment_type === "cash") {
                    //
                    // } else {
                    //   // this.setState({ showQRPayment: true });
                    //
                    // }
                    //this.changeCustomPrice();
                    //processPhonePayment();
                    this.setState({ cz_show_form_phone: false });
                    this.PaymentProceedPhone();
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      width: "45%",
                      borderWidth: 0.5,
                      borderColor: MAIN_TEXT_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      })
                    }
                  >
                    {_simpan[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  cetakUlangDapur(retry = 0) {
    if (parseInt(retry) < 9 && this.state.printer_kitchen) {
      this.connect(this.state.printer_kitchen.address);
      setTimeout(() => {
        setTimeout(() => {
          this.connect(this.state.printer_kitchen.address);
          setTimeout(() => {
            console.log("REPRINT kitchen ===> ", retry);
            this.printKitchenNew(false, parseInt(retry) + 1);
            //this.printDummy();
          }, 400);
        }, 400);
      }, 400);
    }
  }

  cetakUlangLabel(retry = 0) {
    if (parseInt(retry) < 9 && this.state.printer_label) {
      this.connect(this.state.printer_label.address);
      setTimeout(() => {
        setTimeout(() => {
          this.connect(this.state.printer_label.address);
          setTimeout(() => {
            console.log("REPRINT label ===> ", retry);
            this.printLabel(parseInt(retry) + 1);
            //this.printDummy();
          }, 400);
        }, 400);
      }, 400);
    }
  }

  cetakUlangKasir(retry = 0, kitchen = false) {
    if (parseInt(retry) < 9 && this.state.printer_main) {
      this.connect(this.state.printer_main.address);
      setTimeout(() => {
        setTimeout(() => {
          this.connect(this.state.printer_main.address);
          setTimeout(() => {
            console.log("REPRINT ===> ", retry);
            if (this.state.printer2) {
              this.printActionLanguage(
                false,
                kitchen,
                true,
                parseInt(retry) + 1
              );
            } else {
              this.printActionLanguage(false, false, true, parseInt(retry) + 1);
              // this.printActionLanguageSunmi(false, false, true);
            }
            //this.printDummy();
          }, 400);
        }, 400);
      }, 400);
    }
  }

  render() {
    let height = Dimensions.get("window").height - 90;
    let {
      bill_transId,
      userInfo,
      showQRPayment,
      showPaymentSuccess,
      payment_type,
      grandTotal,
      grandTotalRound,
      cashAmount,
      formEmail,
      formCustomer,
      formPhone,
      paymentConfirm,
      showQR,
      showCZ,
      currency_conversion_ratio
    } = this.state;

    let payment = "";
    let change = 0;

    if (payment_type === "cash") {
      change = cashAmount - grandTotalRound;
      if (this.state.currency_conversion_ratio !== 1) {
        change = cashAmount - currency_conversion_ratio * grandTotalRound;
      }
    } else {
      change = 0;
    }

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? (
          <Loading
            not_transparent={true}
            languageIndex={this.state.languageIndex}
            loadingReader={this.state.loadingReader}
          />
        ) : (
          <View />
        )}

        {showQRPayment ? (
          <PaymentQR
            languageIndex={this.state.languageIndex}
            payment={payment_type}
            total={grandTotalRound}
            actions={() => {
              this.setState({ showQRPayment: false });
            }}
          />
        ) : (
          <View />
        )}

        {showPaymentSuccess ? (
          <PaymentSuccess
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.colorIndex}
            transId={bill_transId}
            //transaction_id={this.state.transaction_id}
            payment={payment_type}
            total={this.idrNumToStr(change, true)}
            changeEmail={text => {
              this.changeEmail(text);
            }}
            changeCustomer={text => {
              this.changeCustomer(text);
            }}
            changePhone={text => {
              this.changePhone(text);
            }}
            email={formEmail}
            phone={formPhone}
            customer={formCustomer}
            selectedCustomer={this.state.selectedCustomer}
            cetakDapurAction={() => {
              this.cetakUlangDapur();
            }}
            cetakUlangAction={() => {
              this.cetakUlangKasir();
            }}
            registerCustomerAction={() => {
              this.insertDataCustomer();
            }}
            cetakLabelAction={() => {
              this.connect(this.state.printer_label.address);
              setTimeout(() => {
                this.cetakUlangLabel();
              }, 500);
            }}
            cz_allow_print={this.state.cz_allow_print}
            cetakCashlezAction={() => {
              setTimeout(() => {
                CashlezFunctions.PrintLastPayment();
              }, 500);
            }}
            actions={() => {
              this.setState({ showPaymentSuccess: false });

              this.setState({ mount: false });

              Actions.MobileMainMenu({
                userInfo: this.state.userInfo,
                auth: this.state.auth,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
            sendWhatsApp={() => {
              this.sendWhatsApp();
            }}
            emailStruk={() => {
              let uri = BE_Send_Struk;
              console.log("uri ===> ", uri);

              let body = {
                transaction_id: this.state.transaction_id,
                email: this.state.formEmail
              };

              console.log("body ===> ", body);

              fetch(uri, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: this.state.auth
                  //"Content-Type": "application/x-www-form-urlencoded"
                },
                body: JSON.stringify(body)
              })
                .then(response => response.json())
                .then(responseJson => {
                  console.log("responseJson ===> ", responseJson);

                  alert(_sukses_kirim[this.state.languageIndex]);
                })
                .catch(_err => {
                  console.log("ERR ==> ", _err);
                });
            }}
            points_gain={this.state.points_gain}
            points_available={this.state.points_available}
            points_used={this.state.points_used}
            viewSelectRating={this.state.viewSelectRating}
            changeViewSelectRating={val => {
              this.setState({ viewSelectRating: val });
            }}
            selectedStaffRating={this.state.selectedStaffRating}
            changeSelectedStaffRatingAction={val => {
              this.setState({ selectedStaffRating: val });
            }}
            selectedFoodRating={this.state.selectedFoodRating}
            changeSelectedFoodRatingAction={val => {
              this.setState({ selectedFoodRating: val });
            }}
          />
        ) : (
          <View />
        )}

        {paymentConfirm ? (
          <MobileConfirmPayment
            loading={this.state.loading}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            actions={() => {
              //this.setState({ showPaymentSuccess: false });
              this.setState({ paymentConfirm: false });
              this.checkOutAction(); ////disable dulu

              //this.printAction();
            }}
            closeActions={() => {
              this.setState({ paymentConfirm: false });
            }}
            grandTotal={this.idrNumToStr(
              this.state.grandTotalRound * this.state.currency_conversion_ratio,
              true
            )}
          />
        ) : (
          <View />
        )}

        {showQR ? (
          <MobileShowQR
            loading={this.state.loading}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            actions={() => {
              //this.setState({ showPaymentSuccess: false });
              this.setState({ showQR: false });
              this.checkOutAction();
            }}
            closeActions={() => {
              this.setState({ showQR: false });
            }}
            image={this.state.qr_image_url}
            grandTotal={this.idrNumToStr(this.state.grandTotalRound, true)}
          />
        ) : (
          <View />
        )}

        {showCZ ? (
          <MobileShowCZ
            loading={this.state.loading}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            actions={() => {
              //this.setState({ showPaymentSuccess: false });
              this.setState({ showCZ: false, cz_qr: false });
              this.disableIntervalCZ();
              this.checkOutAction();
            }}
            closeActions={() => {
              this.setState({ showCZ: false, cz_qr: false });
              this.disableIntervalCZ();
            }}
            image={this.state.cz_uri}
            grandTotal={this.idrNumToStr(this.state.grandTotalRound, true)}
            cz_approve={this.state.cz_approve}
            cz_type={this.state.cz_type}
            cz_continue={this.state.cz_continue}
          />
        ) : (
          <View />
        )}

        {this.renderListPromoUsed()}
        {this.renderPhoneForm()}

        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_pembayaran[this.state.languageIndex]}
          notif={false}
          hideLogin={true}
          loginInformation={userInfo}
          menu={false}
          back={true}
          print={true}
          backAction={() => {
            Actions.pop();
            Actions.pop();
          }}
          //print={false}
          // printAction={() => {
          //   // this.setState({ formPhone: "+6287886038357" });
          //   this.setState({ formPhone: "087886038357" });

          //   this.sendWhatsApp();
          // }}
          printAction={() => {
            //Print Dapur + Print Kitchen

            //this.printKitchen(false);
            if (this.state.disable_reprint) {
            } else {
              this.setState({ disable_reprint: true });
              if (this.state.access_print_bill && this.state.printer_main) {
                this.connect(this.state.printer_main.address);

                setTimeout(() => {
                  this.printActionLanguage(false, false, false);
                  //this.printActionLanguage(true, true, true);
                }, 500);
                // this.printActionLanguageSunmi(false, false, true);
              }
            }
          }}
          // printAction={() => {
          //   //Print Dapur + Print Kitchen

          //   //this.printKitchen(false);
          //   if (this.state.access_print_bill) {
          //     this.connect(this.state.printer_main.address);
          //     setTimeout(() => {
          //       if (this.state.printer2) {
          //         this.printAction(true, true);
          //       } else {
          //         this.printAction(false, false);
          //       }
          //     }, 500);

          //     // this.connect(this.state.printer_kitchen.address);
          //     //   setTimeout(() => {
          //     //     this.printKitchen(false);
          //     //   }, 500);

          //     //print test 1
          //     // setTimeout(() => {
          //     //   this.connect(this.state.printer_kitchen.address);
          //     //   setTimeout(() => {
          //     //     this.printKitchen(true);
          //     //   }, 500);
          //     // }, 2000);
          //   }

          //   //Print Kitchen Only
          //   // this.connect(this.state.printer_kitchen.address);
          //   // setTimeout(() => {this.printKitchen();},500)
          // }}
          printText={_cetak_bill[this.state.languageIndex]}
          printLabelText={_print_label[this.state.languageIndex]}
          printLabel={true}
          printLabelAction={() => {
            if (this.state.access_print_bill && this.state.printer_label) {
              this.connect(this.state.printer_label.address);

              setTimeout(() => {
                this.printLabel();
              }, 2500);
            }
          }}
        />
        <StatusBar
          barStyle={"light-content"}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        {this.renderCustomPrice()}
        {this.renderModalCustomer()}
        {this.renderModalCoupon()}

        {this.renderModalCommissionSelection()}

        {this.state.loading ? (<View />) : (
        <ScrollView style={{ flex: 1 }}>
          <View style={[ss.mainContent, { flexDirection: "column", backgroundColor: WHITE_ROBO }]}>
            {/* <DualMonitor state={this.state} /> */}

            {/* <DualMonitorPayment state={this.state} /> DISABLE DUAL MONITOR */}
            {/* <View style={[ss.leftSide]}>{this.renderBill()}</View> */}
            <View style={[ss.rightSide]}>{this.renderRightSide()}</View>
          </View>
        </ScrollView>
        )}
        {/* {this.renderTabBar()} */}

        <View
          style={{
            //backgroundColor: "#BCA",
            backgroundColor: WHITE_ROBO,

            //width: "95%",
            //flex: 1,
            //height: 50,
            padding: 15,
            justifyContent: "flex-end"
            //alignItems: "flex-end",
            //alignSelf: "flex-end"
          }}
        >
          <View style={{}}>
            <Button
              onPress={() => {
                //bayar lama
                if (this.state.payment_type === "cash") {
                  //this.checkOutAction();
                  this.checkOutConfirmationAction();
                } else {
                  //
                  this.checkOutConfirmationAction();

                  //this.checkOutAction();
                }

                //test bayar baru
                // this.testBayar();
              }}
              style={[
                ss.box,
                {
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  width: this.state.tablet ? "66%" : "100%",
                  alignSelf: "center",
                  borderWidth: 0.5,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderRadius: 15,
                  elevation: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }
              ]}
            >
              <Text
                style={
                  ([MainStyle.robotoNormal],
                  {
                    fontSize: 15,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  })
                }
              >
                {_check_out[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    // backgroundColor: "#FFFFFF",
    flex: 1
    //flexDirection: "column"
  },
  mainContent: {
    flexDirection: "row",
    //padding: 15,
    flex: 1
    //justifyContent: "space-between"
    //height: "100%"
    //backgroundColor: "#995599"
  },
  leftSide: {
    width: "100%",
    marginTop: 0,
    //backgroundColor: "#FFF",
    elevation: 3,
    //borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1
  },
  rightSide: {
    //width: "100%",
    flex: 1,
    marginTop: 0,
    //backgroundColor: "#FFFFFF",
    //elevation: 3,
    borderRadius: 5
    //borderColor: "rgba(0, 0, 0, 0.4)",
    //borderWidth: 1
  },
  box: {
    elevation: 1,
    borderRadius: 5
  },
  button: {
    elevation: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  buttonChoiceCash: {
    //elevation: 1,
    padding: 10,
    //width: "20%",
    //backgroundColor: "#EEEEEE",
    borderRadius: 5,
    marginBottom: 5,
    //borderBottomWidth: 1,
    borderColor: "#777777",
    //marginRight: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderWidth: 1
  },
  buttonChoice: {
    //elevation: 1,
    padding: 10,
    //width: "20%",
    //backgroundColor: "#EEEEEE",
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#777777",
    //marginRight: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    flexDirection: "row"
  }
});
