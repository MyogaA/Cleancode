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
  BackHandler
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
import Dropdown from "../../Components/Dropdown";
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
  MAIN_TEXT_COLOR_SELECT
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";

import moment from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";
import { PayOrderAPI } from "../../Constants";
import MenuFunctions from "../../Libraries/MenuFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import {
  _pembayaran,
  _discount_promo,
  _cash,
  _card,
  _ewallet,
  _cash_amount,
  _alert_kurang,
  _exclude_tax,
  _include_tax,
  _kembali,
  _discount,
  _grand_total
} from "../../Libraries/DictionaryPayment";

import {
  _simpan,
  _simpan_pesanan,
  _harga_custom,
  _pelanggan,
  _meja,
  _cetak_bill
} from "../../Libraries/DictionaryHome";
import NetInfo from "@react-native-community/netinfo";
import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";

export default class MobileBayar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQR: false,
      paymentConfirm: false,
      currency: "Rp.",
      showCustom: false,
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
      payment_done: false,
      payment_type: "cash",
      showQRPayment: false,
      showPaymentSuccess: false,
      formEmail: "",
      cashAmount: 0,
      loading: true,
      bill_alamat: "Rukan Cordoba Blok D-28 \n Jl. Greenlake City Boulevard",
      bill_table_id: "5",
      bill_transId: this.props.dataOrder.notes,
      bill_cashier: "Dewi",
      bill_time: moment(new Date()).format("HH:mm"),
      selectedTable: this.props.selectedTable,

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
      change: 0,
      discount: [
        { id: 1, value: 0.1, text: "10% off", active: true },
        { id: 2, value: 0.2, text: "20% off", active: true },
        { id: 3, value: 0.5, text: "50% off", active: true },
        { id: 4, value: 0.75, text: "75% off", active: true }
      ],
      selectedDiscount: 0,
      rate_discount: 0,
      rate_tax: 0.1,
      rate_services: 0.05,
      bill_subTotal: 0,
      bill_discount: 0,
      bill_tax: 0,
      bill_services: 0,
      printer_main: null,
      printer_kitchen: null,
      show_order_id: false,
      footer_printer: "",
      data_post_1: {},
      data_post_2: {}
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    console.log("BAYAR MOBILE 2 ==> onBackPress");

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
      bill_subTotal,
      rate_discount,
      rate_services,
      rate_tax,
      customPriceTax,
      customPriceFinal,
      customPrice,
      selectedDiscount
    } = this.state;
    let grand_total = 0;
    const bill_discount = parseInt(rate_discount * bill_subTotal);
    const bill_services = parseInt(rate_services * bill_subTotal);
    const bill_tax = parseInt(rate_tax * bill_subTotal);
    grand_total = parseInt(
      bill_subTotal + bill_services + bill_tax - bill_discount
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

    this.setState({
      grandTotal: grand_total,
      grandTotalRound: grandTotalRound,
      bill_discount: bill_discount
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

    this.setState({
      grandTotal: parseInt(grandTotal),
      grandTotalRound: parseInt(grandTotal),
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
    dataBill.map((v, i) => {
      subTotal = subTotal + v.qty * v.price;
      subTotal = subTotal + v.qty * v.salesTypeValue;
    });

    let grand_total = 0;
    const bill_discount = parseInt(rate_discount * subTotal);
    const bill_services = parseInt(rate_services * subTotal);
    const bill_tax = parseInt(rate_tax * subTotal);
    grand_total = parseInt(subTotal + bill_services + bill_tax - bill_discount);

    //console.log("grand Total is now ==> ", grand_total);

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
      grandTotal: grand_total,
      grandTotalRound: grandTotalRound,

      loading: false
    });
  }

  // connectPrinter() {
  //   let address = "00:0E:0E:02:93:45";
  //   let name = "RP58BU";

  //   BluetoothManager.connect(address) // the device address scanned.
  //     .then(
  //       s => {
  //         this.setState({
  //           loading: false
  //           //boundAddress: address
  //         });
  //         console.log("connect ==> ", s);
  //         //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
  //       },
  //       e => {
  //         this.setState({
  //           loading: false
  //         });
  //         alert(e);
  //       }
  //     );
  // }

  async printAction(printer = this.state.printer_main) {
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
    let description = userInfo.description;
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

    let tax = parseInt(this.state.bill_tax).toString();
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

    let tax_service = parseInt(this.state.bill_services).toString();
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

    if (payment_type === "shoppee") {
      payment_type = "Shoppee";
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
    let description = userInfo.description;
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

    if (payment_type === "shoppee") {
      payment_type = "Shoppee";
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

  checkOutAction() {
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
    // console.log(
    //   "BODY ==> ",
    //   JSON.stringify({
    //     order_id: order_id,
    //     cashier_id: userInfo.id,
    //     payment_type: payment_type,
    //     reference_id: bill_transId,
    //     customer_id: data_order.customer_id,
    //     payment_subtotal: bill_subTotal,
    //     payment_discount: bill_discount,
    //     payment_tax: parseInt(bill_tax) + parseInt(bill_services),
    //     payment_total: grandTotal,
    //     payment_amount: cashAmount,
    //     payment_change: parseInt(cashAmount) - parseInt(grandTotal),
    //     status: "done",
    //     time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    //   })
    // );

    let payment_amount = 0;

    if (payment_type === "cash") {
      payment_amount = cashAmount;
    } else {
      payment_amount = grandTotal;
    }

    if (cashAmount >= grandTotal || payment_type !== "cash") {
      //this.printAction();
      NetInfo.fetch().then(state => {
        //debug offline
        if (state.isConnected) {
          fetch(PayOrderAPI, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
              //"Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
              order_id: order_id,
              cashier_id: userInfo.id,
              payment_type: payment_type,
              reference_id: bill_transId,
              customer_id: data_order.customer_id,
              payment_subtotal: bill_subTotal,
              payment_discount: bill_discount,
              payment_tax: parseInt(bill_tax) + parseInt(bill_services),
              payment_total: grandTotal,
              payment_amount: payment_amount,
              payment_change: parseInt(payment_amount) - parseInt(grandTotal),
              status: "done",
              time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            })
          })
            .then(response => response.json())
            .then(responseJson => {
              let result = responseJson;
              //let resultOrder = result.order;
              //const order_id = resultOrder.id;
              console.log("PAYMENT RESPONSE ==> ", responseJson);
              MenuFunctions.ClearNewMenuAll(val => {});
              this.printAction();
              //

              this.setState({ showPaymentSuccess: true });
              //console.log('new data ==>', JSON.stringify(data))
              // Actions.Bayar({
              //   orderId: order_id,
              //   dataOrder: resultOrder,
              //   dataBill: dataBill,
              //   userInfo: this.state.userInfo,
              //   colorIndex: this.state.colorIndex
              // });
            })
            .catch(_err => {
              console.log("ERR ==> ", _err);
            });
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
            payment_tax: parseInt(bill_tax) + parseInt(bill_services),
            payment_total: grandTotal,
            payment_amount: payment_amount,
            payment_change: parseInt(payment_amount) - parseInt(grandTotal),
            status: "done",
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          };

          //console.log("payment post 1 ==> ", data_post_1);
          //console.log("payment post 2 ==> ", data_post_2);

          const data_save = { order: data_post_1, payment: data_post_2 };
          console.log("data_save ==> ", data_save);

          let temp_save_order = [];
          //OfflineMenuFunctions.SaveOrderMenu([], val => {});
          OfflineMenuFunctions.GetOrderMenu(val => {
            console.log("Get Orders ==> ", val);
            //this.setState({ lastUpdate: val });
            if (val) {
              temp_save_order = val;
              console.log("temp_save_order ==> ", temp_save_order);
              temp_save_order.push(data_save);
              console.log("temp_save_order_push==> ", temp_save_order);
              OfflineMenuFunctions.SaveOrderMenu(temp_save_order, x => {});
              OfflineMenuFunctions.GetOrderMenu(y => {
                console.log("GetCategoryMenu After Save ==> ", y);
                //this.setState({ lastUpdate: val });
              });
            } else {
              OfflineMenuFunctions.SaveOrderMenu([], val => {});
            }
          });

          MenuFunctions.ClearNewMenuAll(val => {});
          this.printAction();
          //
          this.setState({ showPaymentSuccess: true });
        }
      });
    } else {
      alert(_alert_kurang[this.state.languageIndex]);
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
              newdisc = data.value;
            }

            this.setState({
              selectedDiscount: newId,
              rate_discount: newdisc
            });

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
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={4}
            data={discount}
            renderItem={({ item, index }) => {
              return this.renderDiscountSelection(item, index);
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

  idrNumToStr(num, iscurr) {
    let curr = "";
    if (typeof iscurr !== "undefined" && iscurr === true) {
      curr = this.state.currency + " ";
    }
    let str = "";
    let numrev = num
      .toString()
      .split("")
      .reverse()
      .join("");
    for (let i = 0; i < numrev.length; i++) {
      if (i % 3 === 0) {
        str += numrev.substr(i, 3) + ".";
      }
    }
    return (
      curr +
      str
        .split("", str.length - 1)
        .reverse()
        .join("")
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
                  marginBottom: 5
                  //justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    this.setState({
                      cashAmount: cash1.toString(),
                      payment_type: "cash"
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
                      payment_type: "cash"
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
                      payment_type: "cash"
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
                      payment_type: "cash"
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
                    this.setState({ cashAmount: v, payment_type: "cash" });
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
            borderColor: "#C8C7CC",
            borderTopWidth: 1,
            paddingTop: 5,
            paddingBottom: 5
            //flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "100%",
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
                      payment_type === "shoppee" ? "cash " : "shoppee",
                    cashAmount: 0
                  });
                }}
                style={[
                  ss.buttonChoice,
                  {
                    width: "33%",
                    backgroundColor:
                      this.state.payment_type === "shoppee"
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
                          this.state.payment_type === "shoppee"
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
        </View>
      </View>
    );
  }

  renderCardPayment() {
    return (
      <View
        style={{
          display: "none"
          //marginTop: 10,
        }}
      >
        <View
          style={{
            borderColor: WHITE,
            borderBottomWidth: 1,
            paddingTop: 5,
            paddingBottom: 5,
            flexDirection: "row"
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
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 12 }]}
            >
              {_card[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              width: "85%",
              //backgroundColor: "#ABC",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 5
                //justifyContent: "space-between"
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
                      width: 30,
                      height: 30
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/mastercard2.png")}
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
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/visa.png")}
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
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/gpn.png")}
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
                      width: 30,
                      height: 30
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={require("../../Images/jcb.png")}
                  />
                </View>
              </Button>
            </View>
            {/* Baris 1 */}
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
                  //this.setState({ selectedDiscount: newId });
                }}
                style={[ss.buttonChoice, { width: "42.5%" }]}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingRight: 10,
                    paddingLeft: 10
                  }}
                >
                  <FontAwesome name={"credit-card"} style={{ fontSize: 20 }} />
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { color: BLACK, fontSize: 9 }
                    ]}
                  >
                    Initialize
                  </Text>
                </View>
              </Button>
            </View>
            {/* Baris 2 */}
          </View>
        </View>
      </View>
    );
  }

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
            paddingBottom: 5,
            marginBottom: 10
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
    let { grandTotal, grandTotalRound, discount } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
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
              paddingTop: 15
              //backgroundColor: "#BCA"
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { color: BLACK, fontSize: 14 }
                ]}
              >
                {_grand_total[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { color: BLACK, fontSize: 20, alignSelf: "center" }
                ]}
              >
                {this.idrNumToStr(grandTotalRound, true)}
              </Text>
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
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderRightSideDiscount()}
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
            Total
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
              Sub Total
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
    console.log("string length ==> ", length);

    let array_length = Math.ceil(length / limit);
    console.log("array_length  ==> ", array_length);

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
          alignSelf: "flex-end",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        {/* <Button
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
        </Button> */}

        <Button
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center"
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

        {/* <Button
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
        </Button> */}
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
        <View
          style={{
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
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  //Actions.Bayar({ userInfo: this.state.userInfo });
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
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  //Actions.Bayar({ userInfo: this.state.userInfo });
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
                  {_simpan[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
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
            transId={bill_transId}
            payment={payment_type}
            total={this.idrNumToStr(change, true)}
            changeEmail={text => {
              this.changeEmail(text);
            }}
            email={formEmail}
            actions={() => {
              this.setState({ showPaymentSuccess: false });
              // Actions.refresh({
              //   refresh: true
              // });
              Actions.pop();
              Actions.pop();

              // Actions.MobileHomePage({
              //   refresh: true,
              //   userInfo: this.state.userInfo,
              //   colorIndex: this.state.colorIndex
              // });
            }}
          />
        ) : (
          <View />
        )}

        {paymentConfirm ? (
          <MobileConfirmPayment
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            actions={() => {
              //this.setState({ showPaymentSuccess: false });
              this.checkOutAction();
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
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            actions={() => {
              //this.setState({ showPaymentSuccess: false });
              this.checkOutAction();
            }}
            closeActions={() => {
              this.setState({ showQR: false });
            }}
            grandTotal={this.idrNumToStr(this.state.grandTotalRound, true)}
          />
        ) : (
          <View />
        )}

        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_pembayaran[this.state.languageIndex]}
          notif={false}
          hideLogin={true}
          loginInformation={userInfo}
          menu={false}
          back={true}
          print={true}
          printAction={() => {
            this.printAction();
          }}
          printText={_cetak_bill[this.state.languageIndex]}
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        {this.renderCustomPrice()}
        <ScrollView style={{ flex: 1 }}>
          <View style={[ss.mainContent, { flexDirection: "column" }]}>
            {/* <View style={[ss.leftSide]}>{this.renderBill()}</View> */}
            <View style={[ss.rightSide]}>{this.renderRightSide()}</View>
          </View>
        </ScrollView>
        <View
          style={{
            //backgroundColor: "#BCA",
            //width: "95%",
            //flex: 1,
            //height: 50,
            margin: 15,
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
                if (this.state.payment_type === "cash") {
                  //this.checkOutAction();
                  this.checkOutConfirmationAction();
                } else {
                  //
                  this.checkOutConfirmationAction();

                  //this.checkOutAction();
                }
              }}
              style={[
                ss.box,
                {
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  //width: "100%",
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
                Check Out
              </Text>
            </Button>
          </View>
        </View>
        {this.renderTabBar()}
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
