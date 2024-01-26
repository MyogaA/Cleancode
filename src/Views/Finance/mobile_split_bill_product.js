/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
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

import MainStyle from "../../Styles";

import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import MobileHeader from "../../Components/MobileHeader";
import Checkbox from "../../Components/Checkbox";

import Image from "../../Components/Image";
import Button from "../../Components/Button";
import PaymentQR from "../../Components/PaymentQR";
import PaymentSuccess from "../../Components/MobilePaymentSuccess";
import Loading from "../../Components/MobileLoading";

import MobileConfirmPayment from "../../Components/MobileConfirmPayment";

import MobileShowQR from "../../Components/MobileShowQR";

import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/MobileDropdown";
import SendReceipt from "../../Components/MobileSendReceipt";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
  GREEN_400
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";

import moment from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";
import {
  PayOrderAPI,
  BE_Create_Transaction,
  BE_Payment,
  BE_Payment_Method,
  BE_URI,
  BE_Customer,
  BE_Automatic_Promo,
  BE_Voucher_Promo,
  BE_Special_Promo,
  BE_Attendance,
  BE_Loyalty_Promo_Settings,
  BE_Send_Struk,
  OneSignal_Customer_App_ID,
  one_signal_uri
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
  _bayar,
  _nominal,
  _belum_bayar,
  _sudah_bayar,
  _choose_payment,
  _pembayaran_selesai,
  _discount,
  _grand_total
} from "../../Libraries/DictionaryPayment";

import {
  _simpan,
  _simpan_pesanan,
  _harga_custom,
  _pelanggan,
  _meja,
  _cetak_bill,
  _pilih_pelanggan
} from "../../Libraries/DictionaryHome";

import NetInfo from "@react-native-community/netinfo";
import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";
import { _search } from "../../Libraries/DictionaryManagement";

import DeviceInfo from "react-native-device-info";
import {
  _payment_type,
  _sub_total,
  _total
} from "../../Libraries/DictionaryHistory";

export default class MobileSplitBillProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: DeviceInfo.isTablet(),
      showPromo: false,
      loadingCustomer: false,
      showPaymentSuccess: false,
      loading: true,
      showQR: false,
      paymentConfirm: false,
      currency: "Rp.",
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
        : false,
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
      bill_transId: this.props.dataOrder.notes,
      bill_cashier: "Dewi",
      bill_time: moment(new Date()).format("HH:mm"),
      selectedTable: this.props.selectedTable,
      customer_id: this.props.customer_id ? this.props.customer_id : 0,
      selectedCustomer: null,
      selectedCustomerName: null,
      points_available: 0,
      points_used: 0,

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
      selectedDiscount: 0,

      rate_discount: 0,
      amount_discount: 0,
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
      show_order_id: false,
      footer_printer: "",
      data_post_1: {},
      data_post_2: {},
      auth: this.props.auth,
      payment_method_wallet: [],
      payment_method_cash: {},
      payment_method_card: [],
      payment_method_id: 0,
      payment_method_all: [],
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

      selectedStaffRating: 3,
      selectedFoodRating: 3,

      viewSelectRating: false,
      promoSpecial: [],
      promoAutomatic: [],
      promoVoucher: [],

      selectedVoucher: 0,
      voucherAmount: 0,
      voucherType: "currency",
      automaticPromoAmount: 0,
      automaticPromoRate: 0,
      automaticPromoActivated: [],
      loyaltyPromoSettings: null,
      usePoints: false,

      dataPisahNominal: [
        {
          id: 1,
          jumlah: 0,
          status: 0,
          payment: 0,
          items: []
        }
      ]
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    //console.log("BAYAR MOBILE 2 ==> onBackPress");

    // OfflineMenuFunctions.GetTemporaryOrder(val => {
    //   console.log("Get TemporaryOrder ==> ", val);
    // })

    console.log("BAYAR PROPS ==> ", this.props);

    console.log("BAYAR PROPS data_order ==> ", this.props.dataOrder);
    this.setInformation();

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

    this.getPrinterData();
    this.getPaymentMethod();
    this.setPreviliges();
    this.setState({ loading: false });

    // setTimeout(() => {
    //   this.getPromoAutomatic();
    // }, 200);
  }

  setPreviliges() {
    const { userInfo } = this.state;
    let privileges = userInfo.privileges;

    console.log("privileges ===> ", privileges);

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

    this.setState({ privileges: privileges });
  }

  getPaymentMethod() {
    const uri = BE_Payment_Method;

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
            // let result = responseJson;
            // let resultData = result.data;

            //console.log("BE_Payment_Method ==> ", responseJson);
            let result = responseJson;
            let resultData = result.data;

            let cash = {};
            let wallet = [];
            let card = [];
            if (result.statusCode === 200) {
              resultData.map((v, i) => {
                const v_payment_method = v.Payment_Method_Type;
                if (
                  v_payment_method.id === 1 ||
                  v_payment_method.name === "E-Wallet"
                ) {
                  wallet.push(v);
                }

                if (
                  v_payment_method.id === 3 ||
                  v_payment_method.name === "Cash"
                ) {
                  cash = v;
                }

                if (
                  v_payment_method.id === 2 ||
                  v_payment_method.name === "Debit/Credit"
                ) {
                  card.push(v);
                }

                // console.log("cash ==> ", cash);
                // console.log("wallet ==> ", wallet);
                // console.log("card ==> ", card);
              });
              this.setState({
                payment_method_all: resultData,
                payment_method_cash: cash,
                payment_method_wallet: wallet,
                payment_method_card: card

                //loading: false
              });

              if (cash.id) {
                this.setState({
                  dataPisahNominal: [
                    {
                      id: 1,
                      jumlah: 0,
                      status: 0,
                      payment: cash.id,
                      items: []
                    }
                  ]
                });
              }
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
        OfflineMenuFunctions.GetPaymentType(val => {
          //console.log("GetPayment Offline ==> ", val);
          //this.setState({ lastUpdate: val });

          if (val) {
            let resultData = val;

            let cash = {};
            let wallet = [];
            let card = [];

            resultData.map((v, i) => {
              const v_payment_method = v.Payment_Method_Type;
              if (
                v_payment_method.id === 1 ||
                v_payment_method.name === "E-Wallet"
              ) {
                wallet.push(v);
              }

              if (
                v_payment_method.id === 3 ||
                v_payment_method.name === "Cash"
              ) {
                cash = v;
              }

              if (
                v_payment_method.id === 2 ||
                v_payment_method.name === "Debit/Credit"
              ) {
                card.push(v);
              }

              // console.log("cash ==> ", cash);
              // console.log("wallet ==> ", wallet);
              // console.log("card ==> ", card);

              this.setState({
                payment_method_cash: cash,
                payment_method_wallet: wallet,
                payment_method_card: card
                //loading: false
              });
            });
          }

          // this.setState({
          //   dataOfflineAddons: val
          // });
        });
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
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
      PrinterFunctions.GetLanguage(val => {
        if (val !== null) {
          this.setState({ languageIndex: val });
        }
      });
    }
  }

  onBackPress = () => {
    console.log("BackPress");
    Actions.pop();
    //this.props.onBackPress();
    return true;
  };

  getPrinterData() {
    PrinterFunctions.GetKitchenPrinter(val => {
      if (val) {
        console.log("Printer Kitchen ==> ", val);
        this.setState({ printer_kitchen: val });
      }
    });

    PrinterFunctions.GetPrinter2(val => {
      if (val) {
        console.log("Printer 2 ==> ", val);
        this.setState({ printer2: val });
      }
    });

    PrinterFunctions.GetPrintType(val => {
      if (val) {
        console.log("GetPrintType ==> ", val);
        this.setState({ printType: val });
      }
    });

    PrinterFunctions.GetMainPrinter(val => {
      if (val) {
        console.log("Main Kitchen ==> ", val);
        this.setState({ printer_main: val });
      }
    });

    PrinterFunctions.GetFooterPrinter(val => {
      if (val) {
        console.log("Footer Printer ==> ", val);
        this.setState({ footer_printer: val });
      }
    });

    PrinterFunctions.GetShowOrderIDPrinter(val => {
      if (val) {
        console.log("Show Order Id Printer ==> ", val);
        this.setState({ show_order_id: val });
      }
    });
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
      usePoints
    } = this.state;

    this.setState({ loading: true });

    console.log("loyaltyPromoSettings ===> ", loyaltyPromoSettings);

    let loyal_status = loyaltyPromoSettings.status
      ? loyaltyPromoSettings.status
      : "";
    let loyal_type = loyaltyPromoSettings.type
      ? loyaltyPromoSettings.type
      : "currency";

    console.log("loyal_status ===> ", loyal_status);
    console.log("loyal_type ===> ", loyal_type);

    //const loyal_type = "currency";

    const loyal_value = loyaltyPromoSettings.value;
    //const loyal_value = 5;

    let total_discount_rate = rate_discount;

    let points_used = 0;

    console.log("rate_discount ===> ", rate_discount);

    console.log("amount_discount ===> ", amount_discount);

    console.log("usePoints ===> ", usePoints);

    console.log("points_available ===> ", points_available);

    let additional_loyal_currency = 0;

    if (
      loyal_status === "active" &&
      points_available > 0 &&
      usePoints === true
    ) {
      if (loyal_type === "percentage") {
        let loyal_rate = loyal_value / 100;

        console.log("loyal_value ===> ", loyal_value);

        console.log("loyal_rate ===> ", loyal_rate);

        let max_points_used = Math.ceil((1 - rate_discount) / loyal_rate);

        points_used = max_points_used;

        console.log("max_points_used ===> ", max_points_used);

        if (max_points_used > points_available) {
          points_used = points_available;
        }

        console.log("points_used ===> ", points_used);

        total_discount_rate = total_discount_rate + loyal_rate * points_used;
        if (total_discount_rate > 1) {
          total_discount_rate = 1;
        }

        console.log("total_discount_rate ===> ", total_discount_rate);
      } else {
        let max_points_used = Math.ceil(grandTotalDefault / loyal_value);

        console.log("currency max point used ===> ", max_points_used);

        points_used = max_points_used;

        if (max_points_used > points_available) {
          points_used = points_available;
        }

        console.log("currency points_used ===> ", points_used);

        additional_loyal_currency = points_used * loyal_value;

        console.log(
          "additional_loyal_currency ===> ",
          additional_loyal_currency
        );
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

    automatic_discount =
      automatic_discount + new_bill_subTotal * (automaticPromoRate / 100);

    new_bill_subTotal = new_bill_subTotal * (1 - automaticPromoRate / 100);

    //const discount_add = parseInt(automatic_discount * (rate_tax + rate_services))

    console.log("automaticPromoAmount ==> ", automaticPromoAmount);
    console.log("automaticPromoRate ==> ", automaticPromoRate);
    console.log("calculate discount bill_subTotal ===> ", bill_subTotal);
    console.log(
      "calculate discount new_bill_subTotal ===> ",
      new_bill_subTotal
    );
    console.log(
      "calculate discount automatic_discount ===> ",
      parseInt(automatic_discount * (rate_tax + rate_services))
    );
    console.log("calculate discount rate_tax ===> ", rate_tax);
    console.log("calculate discount rate_service ===> ", rate_services);

    let grand_total = 0;

    let bill_discount = 0;

    console.log("voucherType ===> ", voucherType);

    if (voucherType === "currency") {
      bill_discount = parseInt(
        total_discount_rate * (new_bill_subTotal - voucherAmount) +
          voucherAmount
      );
    } else {
      // bill_discount = parseInt(rate_discount * bill_subTotal);
      // bill_discount = parseInt(voucherAmount * (bill_subTotal - bill_discount));

      let rate = (1 - total_discount_rate) * (1 - voucherAmount);
      console.log("RATE ===> ", rate);
      console.log("rate_discount ===> ", total_discount_rate);
      console.log("voucherAmount ===> ", voucherAmount);

      bill_discount = parseInt((1 - rate).toFixed(2) * new_bill_subTotal);
    }

    console.log("bill_discount ==> ", bill_discount);

    const bill_services = parseInt(
      rate_services * (new_bill_subTotal - bill_discount)
    );
    const bill_tax = parseInt(rate_tax * (new_bill_subTotal - bill_discount));
    grand_total = parseInt(
      new_bill_subTotal + bill_services + bill_tax - bill_discount
    );

    // if (customPriceTax === true)
    // {
    //   grand_total = parseInt(grand_total) + parseInt(customPriceFinal);
    // }
    // else
    // {
    //   grandTotal = parseInt(grandTotal) + parseInt(customPriceFinal);
    // }
    let grandTotalRound = parseInt(Math.round(grand_total / 100)) * 100;

    let new_bill_discount = 0;
    new_bill_discount = bill_discount + automatic_discount;

    console.log("old_grandTotal calculate ===> ", old_grandTotal);
    console.log("grand_total calculate ===> ", grand_total);
    console.log("new_bill_discount calculate ===> ", new_bill_discount);

    if (new_bill_discount > grand_total) {
      new_bill_discount = old_grandTotal + automatic_discount;
    }

    console.log("final points used ===> ", points_used);
    this.setState({
      grandTotal: grand_total,
      grandTotalRound: grandTotalRound < 0 ? 0 : grandTotalRound,
      bill_discount: new_bill_discount,
      points_used: points_used,
      loading: false

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

    console.log("grandTotal ==> ", grandTotal);
    console.log("customPrice ==> ", customPrice);
    console.log("customPriceOld ==> ", customPriceOld);
    console.log("customPriceTax ==> ", customPriceTax);
    console.log("customPriceTaxOld ==> ", customPriceTaxOld);

    if (customPriceOld === 0) {
      if (customPriceTax === true) {
        customPriceFinal = parseInt(customPrice);
        console.log("customPriceFinal true ==> ", customPriceFinal);

        grandTotal = parseInt(grandTotal) + parseInt(customPriceFinal);
        console.log("grandTotal true ==> ", grandTotal);
      } else {
        // customPriceFinal =
        //   parseInt(customPrice) + parseInt(customPrice) * rate_tax +
        //   parseInt(customPrice) * rate_services -
        //   parseInt(customPrice) * rate_discount;

        customPriceFinal =
          parseInt(customPrice) *
          (parseFloat(1) +
            parseFloat(rate_tax) +
            parseFloat(rate_services) -
            parseFloat(rate_discount));
        console.log("customPriceFinal false ==> ", customPriceFinal);

        grandTotal = parseInt(grandTotal) + parseInt(customPriceFinal);
        console.log("grandTotal false ==> ", grandTotal);
      }

      if (customPriceTax === false) {
        bill_tax = bill_tax + parseInt(customPrice) * parseFloat(rate_tax);
        bill_services =
          bill_services + parseInt(customPrice) * parseFloat(rate_services);
      }
    } else if (
      customPriceOld !== customPrice ||
      customPriceTaxOld !== customPriceTax
    ) {
      //has any change
      console.log("has any change");
      if (customPriceTax === true) {
        customPriceFinal = parseInt(customPrice);
        console.log("customPriceFinal true ==> ", customPriceFinal);
        grandTotal =
          parseInt(grandTotal) -
          parseInt(this.state.customPriceFinal) +
          parseInt(customPriceFinal);
        console.log("grandTotal true ==> ", grandTotal);
      } else {
        // customPriceFinal =
        //   parseInt(customPrice) + parseInt(customPrice) * rate_tax +
        //   parseInt(customPrice) * rate_services -
        //   parseInt(customPrice) * rate_discount;

        customPriceFinal =
          parseInt(customPrice) *
          (parseFloat(1) +
            parseFloat(rate_tax) +
            parseFloat(rate_services) -
            parseFloat(rate_discount));
        console.log("customPriceFinal false ==> ", customPriceFinal);

        let customPriceOldWithTax =
          parseInt(customPriceOld) *
          (parseFloat(1) +
            parseFloat(rate_tax) +
            parseFloat(rate_services) -
            parseFloat(rate_discount));

        grandTotal =
          parseInt(grandTotal) -
          parseInt(this.state.customPriceFinal) +
          parseInt(customPriceFinal);
        console.log("grandTotal false ==> ", grandTotal);
      }

      if (customPriceTax === false) {
        bill_tax = bill_tax + parseInt(customPrice) * parseFloat(rate_tax);
        bill_services =
          bill_services + parseInt(customPrice) * parseFloat(rate_services);
      }
    } else if (
      customPriceOld === customPrice &&
      customPriceTaxOld === customPriceTax
    ) {
      console.log("has no change");

      //No Change
    }

    //console.log("grandTotal custom ==> ", grandTotal);

    this.setState({
      grandTotal: parseInt(grandTotal),
      grandTotalRound: parseInt(grandTotal) < 0 ? 0 : parseInt(grandTotal),
      customPriceFinal: parseInt(customPriceFinal),
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
    console.log("setInformation ==> data order ==> ", data_order);

    //console.log("setInformation ==> dataBill ==> ", dataBill);

    let table_id = data_order.table_id ? data_order.table_id : 0;
    let alamat = userInfo.address ? userInfo.address : "";
    let cashier = userInfo.name ? userInfo.name : "";
    let transId = this.state.bill_transId;

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

    console.log("dataBill ===> ", dataBill);
    dataBill.map((v, i) => {
      // subTotal = subTotal + v.qty * v.price;
      // subTotal = subTotal + v.qty * v.salesTypeValue;

      const total = v.total ? v.total : v.price_total;

      subTotal = subTotal + parseInt(total);
    });

    console.log("subTotal ===> ", subTotal);

    console.log("rate_discount ===> ", rate_discount);
    console.log("rate_services ===> ", rate_services);
    console.log("rate_tax ===> ", rate_tax);

    let grand_total = 0;
    const bill_discount = parseInt(rate_discount * subTotal);
    const bill_services = parseInt(rate_services * subTotal);
    const bill_tax = parseInt(rate_tax * subTotal);

    grand_total = parseInt(subTotal + bill_services + bill_tax - bill_discount);

    console.log("grand Total is now ==> ", grand_total);

    let grandTotalRound = parseInt(Math.round(grand_total / 100)) * 100;

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
      grandTotal: grand_total,
      grandTotalRound: grandTotalRound

      //loading: false
    });
  }

  async connect(address = "00:0E:0E:02:93:45", times = 0) {
    BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          this.setState({
            loading: false
            //boundAddress: address
          });
          console.log("connect ==> ", s);
          //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
        },
        e => {
          this.setState({
            loading: false
          });
          //alert(e);

          if (times > 3) {
            this.connect(address, parseInt(times + 1));
          }
        }
      );
  }

  async printKitchen(reconnect) {
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
      let time = moment(new Date()).format("HH:mm");
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

        BluetoothEscposPrinter.printText(
          "--------------------------------\n\r",
          {}
        );
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

      // if (this.state.payment_type === "cash") {
      //   BluetoothEscposPrinter.openDrawer(0, 250, 250);
      // }

      if (reconnect) {
        this.connect(this.state.printer_kitchen.address);
        setTimeout(() => {
          this.connect(this.state.printer_main.address);
        }, 500);
      }

      // setTimeout(() => {
      //   this.connect(printer.address);
      // }, 1000);
      // BluetoothManager.connect(printer.address) // the device address scanned.
      //   .then(
      //     s => {
      //       this.setState({
      //         loading: false
      //         //boundAddress: address
      //       });
      //       console.log("connect ==> ", s);
      //       //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
      //     },
      //     e => {
      //       this.setState({
      //         loading: false
      //       });
      //       //alert(e);
      //     }
      //   );

      //this.printCopy();
    } catch (error) {
      //alert(error);
      //alert("Terjadi kesalahan untuk mencetak struk mohon coba kembali.");
      //this.printKitchen(reconnect);
    }
  }

  sendWhatsApp() {
    const {
      userInfo,
      dataBill,
      bill_transId,
      data_order,
      customPriceFinal,
      customPriceTax,
      formPhone
    } = this.state;

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

      subTotal = subTotal + parseInt(price_total);

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
      total_bayar = grand_total;
    } else {
      total_bayar = this.state.cashAmount;
    }

    let kembali = parseInt(total_bayar) - parseInt(grand_total);

    // eslint-disable-next-line prettier/prettier
    let text =
`*E-Receipt*
*Terima Kasih telah berbelanja di ${business_name}-${gerai_name}*
${alamat}
${phone}
 
Transaction ID : ${
      this.state.transaction_id ? this.state.transaction_id : data_order.id
    }
Receipt Number : ${transaction_id}
Transaction Time : ${time}
Payment Type : ${this.state.payment_type}
 
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
          formPhone.replace("0", "+62")
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

  async printAction(reconnect, kitchen) {
    // BluetoothManager.connect(printer.address) // the device address scanned.
    //   .then(
    //     s => {
    //       this.setState({
    //         loading: false
    //         //boundAddress: address
    //       });
    //       console.log("connect ==> ", s);
    //       //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
    //     },
    //     e => {
    //       this.setState({
    //         loading: false
    //       });
    //       //alert(e);
    //     }
    //   );

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
        rate_services
      } = this.state;

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
      let transaction_id = bill_transId;
      let time = moment(new Date()).format("HH:mm");
      let no_table = this.state.selectedTable.name;

      const discount_calculate =
        this.state.grandTotalDefault +
        this.state.customPriceFinal -
        this.state.grandTotalRound;

      let subTotal = 0;
      let total_bayar = 0;

      dataBill.map((v, i) => {
        let temp_total = v.total ? v.total : v.price_total;
        // subTotal = subTotal + v.qty * v.price;
        // subTotal = subTotal + v.qty * v.salesTypeValue;
        subTotal = subTotal + parseInt(temp_total);
      });

      //let grand_total = subTotal * 1.15;
      let grand_total = this.state.grandTotalRound;
      // let discount = this.state.bill_discount;
      // let discount = discount_calculate;

      let discount = discount_render;

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
        console.log("data print ==> ", data);
        let detail = data.detail ? data.detail : data.Transaction_Item_Addons;

        //console.log("data print detail ==> ", detail);

        let detailString = "";
        //let total = data.qty * data.price + data.qty * data.salesTypeValue;
        let total = data.total ? data.total : data.price_total;

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

        let product_qty = data.qty
          ? data.qty.toString()
          : data.quantity.toString();

        if (product_qty.length === 1) {
          product_qty = product_qty + "  x ";
        } else {
          product_qty = product_qty + " x";
        }

        console.log("data product_qty ==> ", product_qty);

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

        //console.log("data notes_array ==> ", notes_array);

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

      // let tax = parseInt(
      //   Math.ceil(grand_total) - subTotal + discount - customPriceFinal
      // ).toString();

      let custom_price = this.state.customPrice;

      let custom_price_string = parseInt(Math.ceil(custom_price)).toString();

      let custom_price_length = custom_price_string.length;
      let custom_price_space = "";
      let custom_price_space_num = 0;
      if (custom_price_length < 26) {
        custom_price_space_num = 26 - custom_price_length;
      }

      for (var xxxxx = 0; xxxxx < custom_price_space_num; xxxxx++) {
        custom_price_space = custom_price_space + " ";
      }

      // if (this.state.customPriceTax === false) {
      //   custom_price = this.state.customPrice;
      // }

      if (customPriceFinal > 0 && this.state.customPriceTax === false) {
        //alert(customPriceFinal);
        await BluetoothEscposPrinter.printText(
          `Custom${custom_price_space}${custom_price_string}\n\r`,
          {}
        );
      }

      // let tax = parseInt(this.state.bill_tax).toString();

      let tax = parseInt(tax_render).toString();

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

      //let tax_service = parseInt(this.state.bill_services).toString();

      let tax_service = parseInt(services_render).toString();

      let tax_total_length_2 = tax_service.length;
      let tax_total_space_2 = "";
      let tax_total_space_num_2 = 0;
      if (tax_total_length_2 < 25) {
        tax_total_space_num_2 = 25 - tax_total_length_2;
      }

      for (var xxxx = 0; xxxx < tax_total_space_num_2; xxxx++) {
        tax_total_space_2 = tax_total_space_2 + " ";
      }

      await BluetoothEscposPrinter.printText(
        `Service${tax_total_space_2}${tax_service}\n\r`,
        {}
      );

      if (customPriceFinal > 0 && this.state.customPriceTax === true) {
        //alert(customPriceFinal);
        await BluetoothEscposPrinter.printText(
          `Custom${custom_price_space}${custom_price_string}\n\r`,
          {}
        );
      }

      let discount_total_length = discount.toString().length;
      let discount_total_space = "";
      let discount_total_space_num = 0;

      if (discount_total_length < 24) {
        discount_total_space_num = 24 - discount_total_length;
      }

      for (var abc = 0; abc < discount_total_space_num; abc++) {
        discount_total_space = discount_total_space + " ";
      }

      await BluetoothEscposPrinter.printText(
        `Discount${discount_total_space}${discount}\n\r`,
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

      // payment_type
      await BluetoothEscposPrinter.printText(
        `Grand Total${grand_total_space}${grand_total}\n\r`,
        {}
      );

      let total_length = total_bayar.toString().length;
      let total_space = "";
      let total_space_num = 0;
      if (total_length < 27) {
        total_space_num = 27 - total_length;
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
      await BluetoothEscposPrinter.printText(`***${payment_type}***\n\r`, {});

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT
      );

      await BluetoothEscposPrinter.printText(
        `Bayar${total_space}${total_bayar}\n\r`,
        {}
      );

      let kembali = parseInt(total_bayar) - parseInt(grand_total);
      total_length = kembali.toString().length;
      total_space = "";
      total_space_num = 0;
      if (total_length < 25) {
        total_space_num = 25 - total_length;
      }
      for (var zzz = 0; zzz < total_space_num; zzz++) {
        total_space = total_space + " ";
      }

      await BluetoothEscposPrinter.printText(
        `Kembali${total_space}${kembali}\n\r`,
        {}
      );

      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );

      if (this.state.footer_printer === "") {
        await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
      } else {
        await BluetoothEscposPrinter.printText(
          `${this.state.footer_printer}\n\r`,
          {}
        );
      }

      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );

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

      if (this.state.payment_type === "cash") {
        BluetoothEscposPrinter.openDrawer(0, 250, 250);
      }

      if (reconnect) {
        this.connect(this.state.printer_main.address);
        setTimeout(() => {
          this.connect(this.state.printer_kitchen.address);
          if (kitchen) {
            setTimeout(() => {
              this.connect(this.state.printer_kitchen.address);
              setTimeout(() => {
                this.printKitchen(true);
              }, 500);
            }, 2000);
          }
        }, 500);
      }
    } catch (error) {
      //alert(error);
      //this.printAction(reconnect, kitchen);
    }

    // this.connect(this.state.printer_main.address);
    // setTimeout(() => {
    //   this.connect(this.state.printer_kitchen.address);
    // }, 500);
    // setTimeout(() => {
    //   this.connect(printer.address);
    // }, 100);
    // setTimeout(() => {
    //   this.connect(this.state.printer_kitchen.address);
    // }, 3000);
    //this.printCopy();
  }

  async printCopy(printer = this.state.printer_main) {
    BluetoothManager.connect(printer.address) // the device address scanned.
      .then(
        s => {
          this.setState({
            loading: false
            //boundAddress: address
          });
          console.log("connect ==> ", s);
          //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
        },
        e => {
          this.setState({
            loading: false
          });
          alert(e);
        }
      );

    const { userInfo, dataBill, bill_transId, data_order } = this.state;
    let address = "Alamat dari Retail";
    let gerai_name = userInfo.gerai_name;
    let description = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";
    let cashier_name = userInfo.name;
    let transaction_id = bill_transId;
    let time = moment(new Date()).format("HH:mm");
    let no_table = this.state.selectedTable.name;

    let subTotal = 0;
    let total_bayar = 0;

    dataBill.map((v, i) => {
      subTotal = subTotal + v.qty * v.price;
      subTotal = subTotal + v.qty * v.salesTypeValue;
    });

    //let grand_total = subTotal * 1.15;
    let grand_total = this.state.grandTotal;
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
        BluetoothEscposPrinter.printText(`${product_name_array[i]}\n\r`, {});
      }

      for (var j = 0; j < detail_length; j++) {
        BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
      }
      BluetoothEscposPrinter.printText(`${data.salesType}\n\r`, {});

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

    let tax = parseInt(Math.ceil(grand_total) - subTotal + discount).toString();
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

    let discount_total_length = discount.toString().length;
    let discount_total_space = "";
    let discount_total_space_num = 0;

    if (discount_total_length < 24) {
      discount_total_space_num = 24 - discount_total_length;
    }

    for (var abc = 0; abc < discount_total_space_num; abc++) {
      discount_total_space = discount_total_space + " ";
    }

    await BluetoothEscposPrinter.printText(
      `Discount${discount_total_space}${discount}\n\r`,
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

    // payment_type
    await BluetoothEscposPrinter.printText(
      `Grand Total${grand_total_space}${grand_total}\n\r`,
      {}
    );

    let total_length = total_bayar.toString().length;
    let total_space = "";
    let total_space_num = 0;
    if (total_length < 27) {
      total_space_num = 27 - total_length;
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
    await BluetoothEscposPrinter.printText(`***${payment_type}***\n\r`, {});

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    await BluetoothEscposPrinter.printText(
      `Bayar${total_space}${total_bayar}\n\r`,
      {}
    );

    let kembali = parseInt(total_bayar) - parseInt(grand_total);
    total_length = kembali.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 25) {
      total_space_num = 25 - total_length;
    }
    for (var zzz = 0; zzz < total_space_num; zzz++) {
      total_space = total_space + " ";
    }

    await BluetoothEscposPrinter.printText(
      `Kembali${total_space}${kembali}\n\r`,
      {}
    );

    await BluetoothEscposPrinter.printText(
      "--------------------------------\n\r",
      {}
    );

    if (this.state.footer_printer === "") {
      await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
    } else {
      await BluetoothEscposPrinter.printText(
        `${this.state.footer_printer}\n\r`,
        {}
      );
    }
    await BluetoothEscposPrinter.printText(
      "--------------------------------\n\r",
      {}
    );

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

    // BluetoothEscposPrinter.openDrawer(0, 250, 250);
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
      grandTotal
    } = this.state;

    let payment_amount = 0;

    if (payment_type === "cash") {
      payment_amount = cashAmount;
    } else {
      payment_amount = grandTotal;
    }

    if (cashAmount >= grandTotal || payment_type === "cash") {
      this.setState({ paymentConfirm: true });
    } else if (payment_type !== "cash") {
      this.setState({ showQR: true });
    } else {
      alert(_alert_kurang[this.state.languageIndex]);
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
      grandTotal,
      payment_method_id
    } = this.state;

    //console.log("check out action ===> ", times)

    const bill_discount =
      this.state.grandTotalDefault - this.state.grandTotalRound;

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

    console.log("check out action");

    console.log(cashAmount);

    console.log(grandTotal);

    console.log(payment_type);

    if (cashAmount >= grandTotal || payment_type !== "cash") {
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
            payment_discount: bill_discount,
            payment_tax: parseInt(bill_tax),
            payment_services: parseInt(bill_services),
            payment_total: grandTotal,
            payment_amount: payment_amount,
            payment_change: parseInt(payment_amount) - parseInt(grandTotal),
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

            console.log("temp_data v ==>", temp_data);

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
                data_post_2.payment_amount > 0 ? data_post_2.payment_amount : 0,
              payment_change:
                data_post_2.payment_total > 0 ? data_post_2.payment_change : 0,
              items: this.props.items ? this.props.items : items,
              custom_price: this.state.customPriceFinal,
              custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
              customer_id: this.state.selectedCustomer
            };
          }

          console.log("parameter_send post ==> ", parameter_send);
          console.log(
            "this.state.selectedCustomer ==> ",
            this.state.selectedCustomer
          );

          console.log("data Bill ==> ", detail);
          console.log("this.props.items ==> ", this.props.items);

          if (order_id) {
            let body = {
              transaction_id: order_id,
              payment_method_id: payment_method_id,
              payment_discount: data_post_2.payment_discount,
              payment_tax: data_post_2.payment_tax,
              payment_service: 0,
              payment_total:
                data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
              amount:
                parseInt(data_post_2.payment_amount) > 0
                  ? parseInt(data_post_2.payment_amount)
                  : 0,
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
                payment_service: 0,
                payment_total:
                  data_post_2.payment_total > 0 ? data_post_2.payment_total : 0,
                amount:
                  parseInt(data_post_2.payment_amount) > 0
                    ? parseInt(data_post_2.payment_amount)
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

            let uri = BE_Payment;
            console.log("uri ==> BE_Payment ", BE_Payment);

            console.log("uri ==> orderId ", this.state.order_id);

            console.log("body ", body);

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

                  // this.setState({
                  //   showPaymentSuccess: true,
                  //   transaction_id: transaction_id,
                  //   loading: false
                  // });

                  this.setState({
                    transaction_id: transaction_id,
                    showPaymentSuccess: true,
                    loading: false,
                    dine_in_print: true
                  });

                  if (this.state.access_print_bill) {
                    //this.printAction();
                    //dineIn

                    console.log("Dine In? ");
                    this.connect(this.state.printer_main.address);
                    setTimeout(() => {
                      this.printAction(false, false);
                    }, 500);

                    // this.connect(this.state.printer_main.address);
                    // setTimeout(() => {
                    //   if (this.state.printer2)
                    //   {
                    //      this.printAction(true, true);
                    //   }
                    //   else
                    //   {
                    //     this.printAction(false, false);
                    //   }
                    // }, 500);
                  }
                } else {
                  this.setState({ loading: false });
                  alert("Transaksi Gagal");
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
            let uri = BE_Create_Transaction;
            console.log(
              "uri ==> BE_Create_Transaction ",
              BE_Create_Transaction
            );

            console.log("parameter_send ==> ", parameter_send);
            console.log("uri ==> orderId ", this.state.order_id);

            fetch(uri, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: this.state.auth
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

                let payment_id = responseJson.data.Payment.id;
                let transaction_id = responseJson.data.Payment.transaction_id;
                MenuFunctions.ClearNewMenuAll(val => {});

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

                if (this.state.access_print_bill) {
                  // this.printAction();
                  // take away

                  console.log("Take Away??? ");
                  this.connect(this.state.printer_main.address);
                  setTimeout(() => {
                    if (this.state.printer2) {
                      this.printAction(true, true);
                    } else {
                      this.printAction(false, false);
                    }
                  }, 500);
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
        } else {
          //offline payment

          const data_post_1 = this.state.data_post_1;
          const data_post_2 = {
            order_id: order_id,
            cashier_id: userInfo.id,
            payment_type: payment_type,
            reference_id: bill_transId,
            customer_id: data_order.customer_id,
            payment_subtotal: bill_subTotal,
            payment_discount: bill_discount,
            payment_tax: parseInt(bill_tax),
            payment_services: parseInt(bill_services),
            payment_total: grandTotal,
            payment_amount: payment_amount,
            payment_change: parseInt(payment_amount) - parseInt(grandTotal),
            status: "done",
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          };
          const detail = data_post_1.detail;
          let items = [];
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
              sales_type_id: 1, //v.salesType === "Take-Away" ? 1 : 2,
              product_id: v.id,
              quantity: v.qty,
              price_product: v.product.price,
              price_discount: 0,
              price_service: 0, //butuh diupdate lg nanti
              price_addons_total: v.price - v.product.price,
              price_total: v.total,
              notes: v.notes,
              addons: addons
            };

            items.push(temp_data);
          });

          //"time_in": "2020-10-26 15:00:00",
          //"time_out": "2020-10-26 16:00:00",
          //"table_id": 3
          //parameter tambahan untuk dine-in

          let parameter_send = {};

          if (data_order.table_id === 0) {
            parameter_send = {
              receipt_id: data_post_1.kode,
              payment_method_id: payment_method_id,
              payment_discount: data_post_2.payment_discount,
              payment_tax: data_post_2.payment_tax,
              payment_service: data_post_2.payment_services,
              payment_total: data_post_2.payment_total,
              amount: parseInt(data_post_2.payment_amount),
              payment_change: data_post_2.payment_change,
              items: this.props.items ? this.props.items : items,
              custom_price: this.state.customPriceFinal,
              custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
              created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            };
          } else {
            parameter_send = {
              receipt_id: data_post_1.kode,
              payment_method_id: payment_method_id,
              payment_discount: data_post_2.payment_discount,
              payment_tax: data_post_2.payment_tax,
              payment_service: data_post_2.payment_services,
              payment_total: data_post_2.payment_total,
              amount: parseInt(data_post_2.payment_amount),
              payment_change: data_post_2.payment_change,
              items: this.props.items ? this.props.items : items,
              custom_price: this.state.customPriceFinal,
              custom_price_tax: this.state.customPriceTax === true ? 1 : 0,
              created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              time_in: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              time_out: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              table_id: data_order.table_id
            };
          }

          //console.log("payment post 1 ==> ", data_post_1);
          //console.log("payment post 2 ==> ", data_post_2);

          console.log("data order ==> ", data_order);

          const data_save = parameter_send;
          console.log("data_save ==> ", data_save);

          let temp_save_order = [];
          //OfflineMenuFunctions.SaveOrderMenu([], val => {});
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
            } else {
              temp_save_order.push(data_save);
              OfflineMenuFunctions.SaveTemporaryOrder(
                temp_save_order,
                val => {}
              );
            }
          });

          MenuFunctions.ClearNewMenuAll(val => {});
          if (this.state.access_print_bill) {
            this.printAction();
          }
          this.setState({ showPaymentSuccess: true });
        }
      });
    } else {
      this.setState({ loading: false });
      alert(_alert_kurang[this.state.languageIndex]);
    }
  }

  oneSignalSendCustomer(customer_id) {
    const uri = `${BE_Customer}/${customer_id}`;
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
    const { selectedDiscount } = this.state;
    let checked = data.id === selectedDiscount ? true : false;
    let newId = data.id === selectedDiscount ? 0 : data.id;
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

            if (data.type === "percentage") {
              if (checked) {
                newdisc = 0;
              } else {
                newdisc = data.value / 100;
              }

              this.setState({
                selectedDiscount: newId,
                rate_discount: newdisc,
                amount_discount: 0
              });
            } else {
              if (checked) {
                newdisc = 0;
              } else {
                newdisc = data.value;
              }
              this.setState({
                selectedDiscount: newId,
                rate_discount: 0,
                amount_discount: newdisc
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
              : "#EEEEEE",
            borderRadius: 5,
            marginRight: 5,
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
    const { selectedVoucher } = this.state;
    let checked = data.id === selectedVoucher ? true : false;
    let newId = data.id === selectedVoucher ? 0 : data.id;
    let whiteColor = WHITE;
    let blackColor = BLACK;
    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }
    //console.log("DATA VOUCHER ===> ", data);

    if (data) {
      return (
        <Button
          onPress={() => {
            let newdisc = 0;
            let type = "currency";
            if (data.type === "currency") {
              if (checked) {
                type = "currency";
                newdisc = 0;
              } else {
                type = data.type;
                newdisc = data.value;
              }
            } else {
              if (checked) {
                type = "currency";
                newdisc = 0;
              } else {
                type = data.type;
                newdisc = data.value / 100;
              }
            }

            this.setState({
              selectedVoucher: newId,
              voucherAmount: newdisc,
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
              : "#EEEEEE",
            borderRadius: 5,
            marginRight: 5,
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
              : "#EEEEEE",
            borderRadius: 5,
            marginRight: 5,
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
            margin: 15
            //minHeight: 100
            //padding: 15
          }
        ]}
      >
        <View
          style={{
            borderColor: "#C8C7CC",
            borderBottomWidth: 1,
            paddingBottom: 5
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
          >
            {_discount_promo[this.state.languageIndex]}
          </Text>
        </View>
        <View
          style={
            {
              //marginTop: 10,
              //flex: 1
              //width: "100%",
            }
          }
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
            margin: 15
            //minHeight: 100
            //padding: 15
          }
        ]}
      >
        <View
          style={{
            borderColor: "#C8C7CC",
            borderBottomWidth: 1,
            paddingBottom: 5
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
          >
            {_voucher[this.state.languageIndex]}
          </Text>
        </View>
        <View
          style={
            {
              //marginTop: 10,
              //flex: 1
              //width: "100%",
            }
          }
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

  renderCashPayment() {
    const { grandTotal, grandTotalRound } = this.state;
    let cash1 = grandTotalRound;

    let cash2 = grandTotalRound;
    cash2 = parseInt(Math.ceil(grandTotalRound / 1000)) * 1000;

    let cash3 = grandTotalRound;
    cash3 = parseInt(Math.ceil(grandTotalRound / 10000)) * 10000;

    let cash4 = grandTotalRound;
    cash4 = parseInt(Math.ceil(grandTotalRound / 50000)) * 50000;

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
            borderColor: WHITE,
            borderBottomWidth: 1,
            paddingTop: 0,
            paddingBottom: 5
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
                    this.setState({
                      cashAmount: cash1.toString(),
                      payment_type: "cash",
                      payment_method_id: this.state.payment_method_cash.id
                    });
                    //this.setState({ selectedDiscount: newId });
                  }}
                  style={[
                    ss.buttonChoice,
                    {
                      width: "24%",
                      backgroundColor:
                        this.state.cashAmount === cash1.toString()
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : "#EEEEEE"
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
                    this.setState({
                      cashAmount: cash2.toString(),
                      payment_type: "cash",
                      payment_method_id: this.state.payment_method_cash.id
                    });

                    //this.setState({ selectedDiscount: newId });
                  }}
                  style={[
                    ss.buttonChoice,
                    {
                      width: "24%",
                      backgroundColor:
                        this.state.cashAmount === cash2.toString()
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : "#EEEEEE"
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
                    this.setState({
                      cashAmount: cash3.toString(),
                      payment_type: "cash",
                      payment_method_id: this.state.payment_method_cash.id
                    });
                    //this.setState({ selectedDiscount: newId });
                  }}
                  style={[
                    ss.buttonChoice,
                    {
                      width: "24%",
                      backgroundColor:
                        this.state.cashAmount === cash3.toString()
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : "#EEEEEE"
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
                    this.setState({
                      cashAmount: cash4.toString(),
                      payment_type: "cash",
                      payment_method_id: this.state.payment_method_cash.id
                    });
                    //this.setState({ selectedDiscount: newId });
                  }}
                  style={[
                    ss.buttonChoice,
                    {
                      width: "24%",
                      backgroundColor:
                        this.state.cashAmount === cash4.toString()
                          ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          : "#EEEEEE"
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
                  //value={this.idrNumToStr(this.state.cashAmount, false)}
                  value={this.state.cashAmount}
                  onChangeText={v => {
                    this.setState({
                      cashAmount: v,
                      payment_type: "cash",
                      payment_method_id: this.state.payment_method_cash.id
                    });
                  }}
                  placeholder={_cash_amount[this.state.languageIndex]}
                  placeholderTextColor={BLACK}
                />
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
            paddingTop: 5,
            paddingBottom: 5,
            marginBottom: 5
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
            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
            >
              {_ewallet[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 0,
              width: "100%",
              display: "none",
              //backgroundColor: "#ABC",
              justifyContent: "center",
              //alignItems: "center"
              alignContent: "center"
            }}
          >
            <View
              style={{
                //width: "90%",
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5
                //justifyContent: "space-evenly"
              }}
            >
              <Button
                onPress={() => {
                  //this.setState({ selectedDiscount: newId });
                  this.setState({
                    payment_type:
                      payment_type === "shopee" ? "cash " : "shopee",
                    cashAmount: 0
                  });
                }}
                style={[
                  ss.buttonChoice,
                  {
                    width: "33%",
                    backgroundColor:
                      this.state.payment_type === "shopee"
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : "#EEEEEE"
                  }
                ]}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center"
                    //backgroundColor: "#BCA"
                  }}
                >
                  {/* <Image
                    style={{
                      width: 60,
                      height: 50
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/mastercard2.png")}
                  /> */}
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        color:
                          this.state.payment_type === "shopee"
                            ? whiteColor
                            : blackColor,
                        fontSize: 8
                      }
                    ]}
                  >
                    Shopee
                  </Text>
                </View>
              </Button>
              <Button
                onPress={() => {
                  //this.setState({ selectedDiscount: newId });
                  this.setState({
                    payment_type: payment_type === "gopay" ? "cash " : "gopay",
                    cashAmount: 0
                  });
                }}
                style={[
                  ss.buttonChoice,
                  {
                    width: "33%",
                    backgroundColor:
                      this.state.payment_type === "gopay"
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : "#EEEEEE"
                  }
                ]}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {/* <Image
                    style={{
                      width: 60,
                      height: 42
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/visa.png")}
                  /> */}
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        color:
                          this.state.payment_type === "gopay"
                            ? whiteColor
                            : blackColor,
                        fontSize: 9
                      }
                    ]}
                  >
                    Go-Pay
                  </Text>
                </View>
              </Button>
              <Button
                onPress={() => {
                  //this.setState({ selectedDiscount: newId });
                  this.setState({
                    payment_type: payment_type === "ovo" ? "cash " : "ovo",
                    cashAmount: 0
                  });
                }}
                style={[
                  ss.buttonChoice,
                  {
                    width: "33%",
                    backgroundColor:
                      this.state.payment_type === "ovo"
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : "#EEEEEE"
                  }
                ]}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {/* <Image
                    style={{
                      width: 50,
                      height: 42
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/gpn.png")}
                  /> */}
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        color:
                          this.state.payment_type === "ovo"
                            ? whiteColor
                            : blackColor,
                        fontSize: 9
                      }
                    ]}
                  >
                    Ovo
                  </Text>
                </View>
              </Button>
            </View>
            {/* Baris 1 */}
            {/* <View
              style={{
                //width: "100%",
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 10,
                justifyContent: "space-evenly"
              }}
            >
              <Button
                onPress={() => {
                  //this.setState({ selectedDiscount: newId });
                }}
                style={ss.buttonChoice}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center"
                    //backgroundColor: "#BCA"
                  }}
                >
                  <Image
                    style={{
                      width: 60,
                      height: 42
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/jcb.png")}
                  />
                </View>
              </Button>
              <Button
                onPress={() => {
                  //this.setState({ selectedDiscount: newId });
                }}
                style={ss.buttonChoice}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center"
                    //backgroundColor: "#BCA"
                  }}
                >
                  <Image
                    style={{
                      width: 60,
                      height: 42
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/jcb.png")}
                  />
                </View>
              </Button>
            </View> */}
            {/* Baris 2 */}
          </View>

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
            numColumns={3}
            data={this.state.payment_method_wallet}
            renderItem={({ item, index }) => {
              const payment_method_id = item.id;
              const payment_method_name = item.name;
              let selected_payment = false;
              if (payment_method_id === this.state.payment_method_id) {
                selected_payment = true;
              }
              return (
                <Button
                  onPress={() => {
                    //this.setState({ selectedDiscount: newId });
                    this.setState({
                      payment_method_id: item.id,
                      payment_type: item.name,
                      cashAmount: 0,
                      qr_image_url: BE_URI + item.qr_image
                    });
                  }}
                  style={[
                    ss.buttonChoice,
                    {
                      width: "33%",
                      backgroundColor: selected_payment
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : "#EEEEEE"
                    }
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center"
                      //backgroundColor: "#BCA"
                    }}
                  >
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
            borderColor: WHITE,
            //borderBottomWidth: 1,
            paddingTop: 5,
            paddingBottom: 5
            //marginBottom: 5,
            //flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "15%",
              //backgroundColor: "#ABC",
              justifyContent: "center"
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
            >
              {_card[this.state.languageIndex]}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            //backgroundColor: "#ABC",
            justifyContent: "center",
            marginBottom: 5
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
            numColumns={3}
            data={this.state.payment_method_card}
            renderItem={({ item, index }) => {
              const payment_method_id = item.id;
              const payment_method_name = item.name;
              let selected_payment = false;
              if (payment_method_id === this.state.payment_method_id) {
                selected_payment = true;
              }
              return (
                <Button
                  onPress={() => {
                    //this.setState({ selectedDiscount: newId });
                    let image = null;
                    if (item.qr_image) {
                      image = BE_URI + item.qr_image;
                    }

                    this.setState({
                      payment_method_id: item.id,
                      payment_type: item.name,
                      cashAmount: 0,
                      qr_image_url: image
                    });
                  }}
                  style={[
                    ss.buttonChoice,
                    {
                      width: "33%",
                      backgroundColor: selected_payment
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : "#EEEEEE"
                    }
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center"
                      //backgroundColor: "#BCA"
                    }}
                  >
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
            marginTop: 15
            //minHeight: 100,
            // backgroundColor: "#777"
          }
        ]}
      >
        <View
          style={{
            borderColor: "#C8C7CC",
            borderBottomWidth: 1,
            paddingBottom: 5,
            marginBottom: 10
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 14 }]}
          >
            {_split_bill_2[this.state.languageIndex]}
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          //style={{ height: 300 }}
        >
          {this.renderPisahNominal()}
          {/* {this.renderCashPayment()}
          {this.renderCardPayment()}
          {this.renderEWalletPayment()} */}
        </ScrollView>
        <Button
          style={{
            backgroundColor: "rgba(246, 246, 246, 0.95)",
            alignSelf: "center",
            alignItems: "center",
            padding: 10,
            width: this.state.tablet ? "75%" : "100%"
          }}
          onPress={() => {
            let all_data = this.state.dataPisahNominal;

            const id = all_data.length + 1;
            let new_data = {
              id: id,
              jumlah: 0,
              status: 0,
              payment: this.state.payment_method_cash.id,
              items: []
            };

            all_data.push(new_data);

            //console.log("add new split new_data ===> ", new_data);
            //console.log("add new split all_data ===> ", all_data);

            this.setState({ dataPisahNominal: all_data });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                color: BLACK,
                fontSize: 16
              }
            ]}
          >
            {" "}
            +{" "}
          </Text>
        </Button>
      </View>
    );
  }

  deletePisahNominal(index) {
    let { dataPisahNominal } = this.state;

    //console.log("index ", index);
    //console.log("before delete ", dataPisahNominal);

    this.setState({ loading: true });
    setTimeout(() => {
      dataPisahNominal.splice(index, 1);
      //console.log("after delete ", dataPisahNominal);
      let tempData = [];
      this.setState({ dataPisahNominal: dataPisahNominal, loading: false });

      //UPDATE DATABILL RETURN PRODUKNYA KE MAIN LIST
    }, 100);

    // setTimeout(() => {
    //   this.setState({ showBill: true, loading: false });
    // }, 150);
  }

  splitBillBayar(index) {
    let { dataPisahNominal } = this.state;
    let tempData = dataPisahNominal[index];
    tempData.status = 1;
    dataPisahNominal[index] = tempData;
    this.setState({ dataPisahNominal: dataPisahNominal });
  }

  changePisahNominalPrice(index, value) {
    let { dataPisahNominal } = this.state;
    let tempData = dataPisahNominal[index];
    tempData.jumlah = value;
    dataPisahNominal[index] = tempData;
    this.setState({ dataPisahNominal: dataPisahNominal });
  }

  changeCaraBayar(index, value) {
    let { dataPisahNominal } = this.state;
    let tempData = dataPisahNominal[index];
    tempData.payment = value;
    dataPisahNominal[index] = tempData;
    this.setState({ dataPisahNominal: dataPisahNominal });
  }

  renderPaymentMethod(data, index, parent_index) {
    console.log("renderPaymentMethod data ===> ", data);
    console.log("renderPaymentMethod index ===> ", index);
    console.log("renderPaymentMethod parent_index ===> ", parent_index);
    const selected_payment = true;

    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    const payment_method_name = 0;

    return (
      <Button
        onPress={() => {
          //this.setState({ selectedDiscount: newId });
          this.changeCaraBayar(index, 0);
        }}
        style={[
          ss.buttonChoice,
          {
            width: "33%",
            backgroundColor: selected_payment
              ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              : "#EEEEEE"
          }
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"
            //backgroundColor: "#BCA"
          }}
        >
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
      </Button>
    );
  }

  renderPisahNominal() {
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
            //display: "none"
            //marginTop: 10,
          }
        }
      >
        <View
          style={{
            width: "100%",
            //backgroundColor: "#ABC",
            justifyContent: "center",
            marginBottom: 5
          }}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            //numColumns={3}
            data={this.state.dataPisahNominal}
            renderItem={({ item, index }) => {
              let status =
                item.status === 0
                  ? _belum_bayar[this.state.languageIndex]
                  : _sudah_bayar[this.state.languageIndex];

              let color = ["#BA1818", "#4CD964"];

              let index_new = index + 1;
              let jumlah = item.jumlah;
              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: WHITE,
                    borderColor: "#D9D9D9",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 15,
                    marginTop: item.id === 1 ? 0 : 10
                  }}
                >
                  <View
                    style={
                      //ss.buttonChoice,
                      {
                        //width: "33%",
                        //backgroundColor: "#EEEEEE"
                        borderColor: "#D9D9D9",
                        paddingBottom: 10,
                        borderBottomWidth: 1
                      }
                    }
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <View style={{ width: "49%", justifyContent: "center" }}>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //color: selected_payment ? whiteColor : blackColor,
                              fontSize: 11
                            }
                          ]}
                        >
                          {_nominal[this.state.languageIndex]} #{index_new}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "49%",
                          alignItems: "flex-end",
                          justifyContent: "center"
                        }}
                      >
                        <Button
                          style={{ paddingLeft: 5, paddingRight: 5 }}
                          onPress={() => {
                            this.deletePisahNominal(index);
                          }}
                        >
                          <Entypo
                            name={"trash"}
                            style={{
                              // alignSelf: "center",
                              fontSize: 20,
                              color: RED_500
                            }}
                          />
                        </Button>
                      </View>
                    </View>
                  </View>
                  <View
                    style={
                      //ss.buttonChoice,
                      {
                        //width: "33%",
                        //backgroundColor: "#EEEEEE"
                        //marginTop: 10,
                        //borderColor: "#D9D9D9",
                        paddingTop: 10,
                        paddingBottom: 10
                        //borderTopWidth: 1
                      }
                    }
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 10
                        //alignContent:"center",
                        //alignItems:"center"
                      }}
                    >
                      <View
                        style={{
                          width: "33%",
                          justifyContent: "center",
                          //backgroundColor: "#BCA",
                          paddingLeft: 10
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //color: selected_payment ? whiteColor : blackColor,
                              fontSize: 11,
                              color: BLACK
                            }
                          ]}
                        >
                          {_payment_type[this.state.languageIndex]}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "66%",
                          justifyContent: "center"
                          //backgroundColor: "#BCA",
                          //paddingTop: 5
                        }}
                      >
                        <Dropdown
                          style={{
                            borderRadius: 15,
                            padding: 5,
                            marginLeft: 0,
                            backgroundColor: MAIN_THEME_COLOR_SELECT(
                              this.state.colorIndex
                            )
                            //width: "100%",
                            //marginBottom: 10
                            //padding: 10
                            // paddingRight:100
                          }}
                          selectWidth={"90%"}
                          size={12}
                          color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                          // selectWidth = {'80%'}
                          selectedValue={String(item.payment)}
                          optionLists={this.state.payment_method_all.map(
                            (v, k) => {
                              //console.log('v ==> ', v);
                              return {
                                label: v.name,
                                value: String(v.id)
                              };
                            }
                          )}
                          text_choose_user={
                            _choose_payment[this.state.languageIndex]
                          }
                          onValueChange={(itemValue, itemIndex) => {
                            //console.log("SELECTED Value ==> ", itemValue);
                            //this.setState({ selectedPayment: parseInt(itemValue) });
                            this.changeCaraBayar(index, itemValue);
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between"
                        //alignContent:"center",
                        //alignItems:"center"
                      }}
                    >
                      <TextInput
                        ref={q => {
                          this.nominal_box = q;
                        }}
                        style={{
                          padding: 5,
                          backgroundColor: "#EEEEEE",
                          borderRadius: 5,
                          width: "49%",
                          fontSize: 10,
                          color: BLACK,
                          paddingLeft: 10,
                          paddingRight: 10,
                          fontFamily: "Roboto-Regular"
                        }}
                        keyboardType="numeric"
                        type="text"
                        //value={this.idrNumToStr(this.state.cashAmount, false)}
                        value={jumlah}
                        onChangeText={v => {
                          this.changePisahNominalPrice(index, v);
                        }}
                        placeholder={_nominal[this.state.languageIndex]}
                        placeholderTextColor={BLACK}
                      />
                      <Button
                        style={{
                          width: "49%",
                          padding: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 15,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.state.colorIndex
                          )
                        }}
                        onPress={() => {
                          this.splitBillBayar(index);
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              //color: selected_payment ? whiteColor : blackColor,
                              fontSize: 11,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          {_bayar[this.state.languageIndex]}
                        </Text>
                      </Button>
                    </View>
                  </View>
                  <View
                    style={
                      //ss.buttonChoice,
                      {
                        //width: "33%",
                        //backgroundColor: "#EEEEEE"
                        //marginTop: 10,
                        borderColor: "#D9D9D9",
                        paddingTop: 10,
                        borderTopWidth: 1
                      }
                    }
                  >
                    <View
                      style={{
                        flex: 1,
                        //alignContent:"center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            //color: selected_payment ? whiteColor : blackColor,
                            fontSize: 11,
                            color: color[item.status]
                          }
                        ]}
                      >
                        {status}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              //console.log(item.toString()+"_"+i.toString()+"_"+index.toString());
              return "Pisah Nominal" + index.toString();
            }}
          />
        </View>
      </View>
    );
  }

  renderRightSide() {
    const {
      grandTotal,
      grandTotalRound,
      discount,
      bill_discount,
      bill_subTotal,
      rate_tax,
      rate_services,
      dataPisahNominal
    } = this.state;
    //console.log("bill_discount render ===> ", bill_discount);

    //console.log("bill_subTotal render ===> ", bill_subTotal);

    const discount_render =
      this.state.bill_discount >= this.state.bill_subTotal
        ? this.state.bill_subTotal
        : this.state.bill_discount;

    const tax_render =
      (bill_subTotal - discount_render) * (rate_tax + rate_services);

    // console.log(
    //   "bill_discount > bill_subTotal ===> ",
    //   bill_discount >= bill_subTotal
    // );

    // console.log("discount_render ===> ", discount_render);

    let discount_calculate =
      this.state.grandTotalDefault +
      this.state.customPriceFinal -
      this.state.grandTotalRound;

    let new_bill_discount = bill_discount ? bill_discount : 0;

    let total_sudah_bayar = 0;
    dataPisahNominal.map((v, i) => {
      //console.log("DatapisahNominal ===> ", v)
      let total =
        v.jumlah !== 0 && v.jumlah && v.status === 1 ? parseInt(v.jumlah) : 0;
      total_sudah_bayar = total_sudah_bayar + total;
    });

    let total_belum_bayar = grandTotalRound - total_sudah_bayar;

    if (total_belum_bayar > grandTotalRound) {
      total_belum_bayar = 0;
    }

    //console.log("discount_calculate ===> ", discount_calculate);

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.15,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row"
              //paddingTop: 15
              //backgroundColor: "#BCA"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
                borderRightWidth: 1,
                borderColor: "#E9E9E9"
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  marginTop: 10
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14, alignSelf: "center" }
                    ]}
                  >
                    {_grand_total[this.state.languageIndex]}
                  </Text>
                </View>
              </View>
              <View
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
                    {this.idrNumToStr(parseInt(grandTotalRound), true)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "column", width: "50%" }}>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  marginTop: 10
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { color: BLACK, fontSize: 14, alignSelf: "center" }
                    ]}
                  >
                    Total {_belum_bayar[this.state.languageIndex]}
                  </Text>
                </View>
              </View>
              <View
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
                        color: total_belum_bayar > 0 ? "#BA1818" : "#4CD964",
                        fontSize: 20,
                        alignSelf: "center"
                      }
                    ]}
                  >
                    {this.idrNumToStr(parseInt(total_belum_bayar), true)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center"
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {this.state.promoVoucher.length > 0 ? this.renderVoucher() : <View />}

          {/* {this.renderVoucher()} */}
          {this.renderRightSidePayment()}
        </View>
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
              Tax ({rate_tax * 100}%)
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

  prosesPembayaranSplit() {
    const { grandTotalRound, dataPisahNominal } = this.state;

    let total_sudah_bayar = 0;
    dataPisahNominal.map((v, i) => {
      //console.log("DatapisahNominal ===> ", v)
      let total =
        v.jumlah !== 0 && v.jumlah && v.status === 1 ? parseInt(v.jumlah) : 0;
      total_sudah_bayar = total_sudah_bayar + total;
    });

    let total_belum_bayar = grandTotalRound - total_sudah_bayar;

    if (total_belum_bayar > grandTotalRound) {
      total_belum_bayar = 0;
    }

    if (total_belum_bayar === 0) {
      this.setState({ showPaymentSuccess: true });
    } else {
      alert(_alert_kurang[this.state.languageIndex]);
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
      showQR
    } = this.state;

    let payment = "";
    let change = 0;

    if (payment_type === "cash") {
      change = parseInt(cashAmount) - parseInt(grandTotal);
    } else {
      change = 0;
    }

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        {showQRPayment ? (
          <PaymentQR
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
            //total={this.idrNumToStr(change, true)}
            total={this.idrNumToStr(0, true)}
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
              this.connect(this.state.printer_kitchen.address);
              setTimeout(() => {
                this.printKitchen();
              }, 500);
            }}
            actions={() => {
              this.setState({ showPaymentSuccess: false });
              // Actions.refresh({
              //   refresh: true
              // });
              //Actions.pop();
              //Actions.pop();

              // Actions.MobileHomePage({
              //   refresh: true,
              //   auth: this.state.auth,
              //   userInfo: this.state.userInfo,
              //   colorIndex: this.state.colorIndex
              // });
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
            grandTotal={this.idrNumToStr(this.state.grandTotalRound, true)}
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

        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_split_bill[this.state.languageIndex] + " Product"}
          notif={false}
          hideLogin={true}
          loginInformation={userInfo}
          menu={false}
          back={true}
          print={false}
          //print={false}
          // printAction={() => {
          //   this.setState({formPhone: "+6287886038357"})
          //   this.sendWhatsApp();
          // }}
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
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        <View style={{ flex: 1 }}>
          <View style={[ss.mainContent, { flexDirection: "column" }]}>
            {/* <View style={[ss.leftSide]}>{this.renderBill()}</View> */}
            <View style={[ss.rightSide]}>{this.renderRightSide()}</View>
          </View>
        </View>

        <View
          style={{
            //backgroundColor: "#BCA",
            backgroundColor: "rgba(248, 248, 248, 0.92)",

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
                // Actions.Bayar({userInfo:this.state.userInfo})
                //Actions.Bayar({ userInfo: this.state.userInfo });
                //if (this.state.payment_type === "cash") {
                //this.checkOutAction();
                //this.checkOutConfirmationAction();
                //} else {
                //
                //this.checkOutConfirmationAction();
                //this.checkOutAction();
                //}
                this.prosesPembayaranSplit();
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
                {_pembayaran_selesai[this.state.languageIndex]}
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFF",
    elevation: 3,
    //borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1
  },
  rightSide: {
    //width: "100%",
    flex: 1,
    marginTop: 0,
    backgroundColor: "#FFFFFF",
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
  buttonChoice: {
    elevation: 1,
    padding: 5,
    width: "20%",
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    marginRight: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    flexDirection: "row"
  }
});
