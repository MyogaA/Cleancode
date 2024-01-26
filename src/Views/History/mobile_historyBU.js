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
  Dimensions
} from "react-native";

import MainStyle from "../../Styles";
// import GestureRecognizer from "react-native-swipe-gestures";
import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/MobileDropdown";
import SendReceipt from "../../Components/MobileSendReceipt";
import CustomAlert from "../../Components/CustomAlert";
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
import {
  HistoryOrderAPI,
  HistoryDetailAPI,
  CheckPinAPI,
  UserByGeraiAPI,
  RefundOrderAPI
} from "../../Constants";

import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
  WHITE,
  BLACK,
  RED_500,
  GREY_100,
  GREY_900,
  GREY_700
} from "../../Libraries/Colors";
import Loading from "../../Components/MobileLoading";
import LoginFunctions from "../../Libraries/LoginFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";
import {
  _simpan,
  _pilih_user,
  _pajak,
  _service,
  _riwayat_transaksi,
  _cari,
  _today,
  _from,
  _to,
  _transaction_id,
  _total_price,
  _payment_type,
  _time,
  _time_date,
  _merchant,
  _receipt_number,
  _send_receipt,
  _issue_refund,
  _cancel,
  _enter,
  _alert_printer,
  _this_week,
  _this_month,
  _this_year,
  _status_1,
  _status_2,
  _status_3,
  _status_4,
  _status_5,
  _detail_pesanan,
  _notes,
  _batalkan_transaksi,
  _detail_transaksi,
  _tulis_alasan,
  _other_reason,
  _reason_1,
  _reason_2,
  _reason_3,
  _set_filter,
  _by_payment,
  _by_status,
  _status_filter_1,
  _status_filter_2,
  _status_filter_3,
  _payment_filter_1,
  _payment_filter_2,
  _payment_filter_3,
  _payment_filter_4,
  _payment_filter_5,
  _by_code,
  _sub_total,
  _total
} from "../../Libraries/DictionaryHistory";

import moment from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";
import {
  _masukan_kode,
  _salah_pin,
  _berhasil
} from "../../Libraries/DictionaryAbsen";
import { _ok_alert } from "../../Libraries/DictionarySetting";
import { _grand_total } from "../../Libraries/DictionaryPayment";

export default class MobileHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refund: false,
      showFilter: false,
      filterStatus: 1,
      filterPayment: 1,
      showPin: false,
      action: 1,
      tax_rate: 0.1,
      service_rate: 0.05,
      subTitle:
        _batalkan_transaksi[
          this.props.languageIndex ? this.props.languageIndex : 0
        ],
      showDetail: false,

      loading: true,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,

      userInfo: this.props.userInfo ? this.props.userInfo : null,
      startDate: moment(new Date())
        .add(-7, "days")
        .format("YYYY-MM-DD HH:mm"),
      currency: "IDR",
      endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      allowRefund: true,
      alertMessage: [],
      showAlert: false,
      dataBill: [],
      selectedData: {
        id: "",
        transId: "",
        total: "",
        paymentType: "",
        merchantName: "",
        time: null
      },
      listReason: [
        {
          id: 1,
          name:
            _reason_1[this.props.languageIndex ? this.props.languageIndex : 0]
        },
        {
          id: 2,
          name:
            _reason_2[this.props.languageIndex ? this.props.languageIndex : 0]
        },
        {
          id: 3,
          name:
            _reason_3[this.props.languageIndex ? this.props.languageIndex : 0]
        }
      ],
      datePickerStart: false,
      datePickerEnd: false,
      selectedReason: 0,
      notes: "",

      sendReceipt: false,
      receiptEmail: "",
      printer_main: null,
      printer_kitchen: null,
      listHistory: [
        {
          id: 1,
          transId: "123454321",
          total: 100000,
          paymentType: "GO-PAY",
          merchantName: "Nama POS",
          time: "2020-01-01 15:50:00"
        },
        {
          id: 2,
          transId: "08989012",
          total: 390000,
          paymentType: "Cash",
          merchantName: "Nama POS",
          time: "2020-01-01 15:24:00"
        },
        {
          id: 3,
          transId: "56564545",
          total: 124000,
          paymentType: "GO-PAY",
          merchantName: "Nama POS",
          time: "2020-01-01 15:10:00"
        }
      ],
      listUser: [
        {
          id: 1,
          name: "Mr Manager",
          position: "Manager",
          pin: "123123",
          image:
            "https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png"
        },
        {
          id: 2,
          name: "Mr Cashier",
          position: "Cashier",
          pin: "123456",
          image:
            "https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png"
        },
        {
          id: 3,
          name: "Miss Waiter",
          position: "Waiter",
          pin: "111111",
          image:
            "https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png"
        }
      ],
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
      ready: "",
      page: 1,
      maxPage: 1,
      payment_id: 0,
      selectedUser: null
    };
  }

  componentDidMount() {
    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });
    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    this.getListHistoryFirstTime(1);
    this.getUserList();
    this.getPrinterData();
  }

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
      } else {
        //alert(_alert_printer[this.state.languageIndex]);
        // Actions.Setting({
        //   userInfo: this.state.userInfo,
        //   colorIndex: this.state.colorIndex
        // });
      }
    });
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
    const { dataBill, selectedData, userInfo } = this.state;
    console.log("dataBill ==> ", dataBill);
    console.log("selectedData ==> ", selectedData);

    let gerai_name = userInfo.gerai_name;
    let description = userInfo.description;
    let cashier_name = selectedData.cashier_name;
    let transaction_id = selectedData.transId;
    let time = moment(selectedData.time).format("DD/MM/YYYY HH:mm");

    let table_id = selectedData.table_id;

    let no_table = "";

    if (table_id !== "0") {
      no_table = selectedData.table_name;
    }

    let sub_total = selectedData.payment_subtotal;
    let total_bayar = selectedData.total;
    let grand_total = selectedData.payment_total;
    let payment_type = selectedData.paymentType;

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

    await BluetoothEscposPrinter.printText(`***REPRINT***\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1
    });

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

    if (table_id !== "0") {
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

    dataBill.map((data, i) => {
      let detail = data.detail;

      let detailString = "";
      let total = data.price;
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

      let notes = data.notes ? data.notes : "";
      let notes_array = this.divideLongWord(notes, 30);
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
      BluetoothEscposPrinter.printText(`${data.sales_type}\n\r`, {});

      if (notes_length > 0) {
        BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
        for (var k = 0; k < notes_length; k++) {
          BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
        }
      }
    });

    let val = "";
    val = sub_total.toString();
    let sub_total_length = val.length;
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

    let tax = parseInt(Math.ceil(sub_total) * 0.15).toString();
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

    let discount = parseInt(sub_total) + parseInt(tax) - parseInt(grand_total);
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

    //grand_total = parseInt(Math.ceil(grand_total)).toString();
    let grand_total_length = grand_total.toString().length;
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
    //await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
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
  }

  getUserList() {
    const uri = `${UserByGeraiAPI}?gerai_id=${
      this.state.userInfo.gerai_id
    }&refund=true`;
    console.log(uri);
    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson.result;
        let resultData = result.data;
        let firstUserId = null;
        if (resultData.length > 0) {
          firstUserId = resultData[0].id;
        }

        this.setState({ listUser: resultData, selectedUser: resultData[0].id });
        //console.log("new data ==>", resultData);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  resetPage() {
    this.setState({
      loading: true,
      refund: false,
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
      ready: "",
      page: 1,
      maxPage: 1,
      payment_id: 0,
      selectedUser: null,
      selectedData: {
        id: "",
        transId: "",
        total: "",
        paymentType: "",
        merchantName: "",
        time: null
      },
      selectedReason: 0,
      notes: "",
      //startDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      //endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      dataBill: []
    });
    this.getListHistory(1);
    this.getUserList();
  }

  resetPageReturn() {
    this.setState({
      loading: true,
      refund: false,
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
      ready: "",
      page: 1,
      maxPage: 1,
      payment_id: 0,
      selectedUser: null,
      selectedReason: 0,
      notes: ""
      //startDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      //endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
    });
    this.getListHistory(1);
    this.getUserList();
    this.changeSelection(this.state.selectedData, true);
  }

  prosesRefund() {
    const {
      selectedData,
      userInfo,
      selectedUser,
      listReason,
      selectedReason,
      notes
    } = this.state;

    this.setState({ loading: true });

    let payment_id = selectedData.id;
    let cashier_id = userInfo.id;
    let manager_id = selectedUser;
    let time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let reason = "";
    let description = "";
    if (selectedReason === 0) {
      reason = "Lain - lain";
      description = notes;
    } else {
      listReason.map((v, i) => {
        if (v.id === selectedReason) {
          reason = v.name;
        }
      });
    }

    // console.log(
    //   "test refund ==> ",
    //   JSON.stringify({
    //     payment_id: payment_id,
    //     cashier_id: cashier_id,
    //     manager_id: manager_id,
    //     reason: reason,
    //     description: description,
    //     time: time
    //   })
    // );

    this.checkPin(val => {
      if (val.status) {
        fetch(RefundOrderAPI, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            //"Content-Type": "application/x-www-form-urlencoded"
          },
          body: JSON.stringify({
            payment_id: payment_id,
            cashier_id: cashier_id,
            manager_id: manager_id,
            reason: reason,
            description: description,
            time: time
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            console.log("PAYMENT RESPONSE ==> ", responseJson);

            let message = [];
            //message.push(result.message);
            message.push(_berhasil[this.state.languageIndex]);
            this.setState({
              loading: false,
              showAlert: true,
              alertMessage: message
            });
            //this.resetPage(); //resetpage done refund

            this.resetPageReturn();
          })
          .catch(_err => {
            console.log("ERR ==> ", _err);
          });
      } else {
        //alert(val.message);
        let message = [];
        //message.push(val.message);
        message.push(_salah_pin[this.state.languageIndex]);

        this.setState({
          loading: false,
          showAlert: true,
          alertMessage: message,
          pin1: "",
          pin2: "",
          pin3: "",
          pin4: "",
          pin5: "",
          pin6: ""
        });
      }
    });
  }

  checkPin(cb) {
    const uri = CheckPinAPI;
    const { selectedUser, pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    console.log("SELECTED USER ==> ", selectedUser);
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        id: selectedUser,
        token: `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("cek pin ==> ", responseJson);
        let result = responseJson;
        cb(result);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        cb(null);
      });
  }

  getListHistoryFirstTime(page = this.state.page) {
    const {
      userInfo,
      searchKey,
      startDate,
      endDate,
      filterStatus,
      filterPayment
    } = this.state;
    const gerai_id = userInfo.gerai_id;
    const retail_id = userInfo.retail_id;
    const search = searchKey ? searchKey : "";

    var d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    var first_day = Date(d.setDate(diff));

    let date_start = moment(d).format("YYYY-MM-DD");

    //const date_start = moment(startDate).format("YYYY-MM-DD");
    const date_end = moment(endDate).format("YYYY-MM-DD");

    let uri = `${HistoryOrderAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&date_start=${date_start}&date_end=${date_end}&search=&page=${page}&search=${search}&type=${filterStatus}&status=${filterPayment}`;
    console.log("getListHistory ==> ", uri);

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          console.log("getData history ==> ", result);
          this.setState({ listHistory: resultData.data, loading: false });
          //console.log('new data ==>', JSON.stringify(data))
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getListHistory(page = this.state.page) {
    const {
      userInfo,
      searchKey,
      startDate,
      endDate,
      filterStatus,
      filterPayment
    } = this.state;
    const gerai_id = userInfo.gerai_id;
    const retail_id = userInfo.retail_id;
    const search = searchKey ? searchKey : "";
    const date_start = moment(startDate).format("YYYY-MM-DD");
    const date_end = moment(endDate).format("YYYY-MM-DD");

    let uri = `${HistoryOrderAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&date_start=${date_start}&date_end=${date_end}&page=${page}&type=${filterStatus}&status=${filterPayment}&search=${search}`;
    console.log("getListHistory ==> ", uri);

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          console.log("getData history ==> ", result);
          this.setState({ listHistory: resultData.data, loading: false });
          //console.log('new data ==>', JSON.stringify(data))
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  changeSelection(data, refund_process = false) {
    const payment_id = data.id;

    if (refund_process) {
      data.status = "refund";
    }

    this.setState({ loading: true });
    let uri = `${HistoryDetailAPI}?payment_id=${payment_id}`;
    console.log(uri);
    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          console.log("getData HistoryDetailAPI ==> ", resultData);
          let refund = true;
          if (data.status === "closing" || data.status === "refund") {
            refund = false;
          }
          this.setState({
            showDetail: true,
            showPin: false,
            refund: false,
            selectedData: data,
            subTitle: _detail_transaksi[this.state.languageIndex],
            dataBill: resultData,
            payment_id: payment_id,
            canRefund: refund,
            loading: false
          });
          //console.log('new data ==>', JSON.stringify(data))
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
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

  changeDateToday() {
    this.setState({
      loading: true,
      startDate: moment(new Date()).format("YYYY-MM-DD 00:00:00"),
      endDate: moment(new Date()).format("YYYY-MM-DD 23:59:59"),
      action: 0
    });
    this.getListHistory(1);
  }

  changeDateWeek() {
    var d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    var first_day = Date(d.setDate(diff));

    this.setState({
      loading: true,
      // startDate: moment(new Date())
      //   .add(-7, "days")
      //   .format("YYYY-MM-DD 00:00:00"),
      startDate: moment(d).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD 23:59:59"),
      action: 1
    });
    this.getListHistory(1);
  }

  changeDateMonth() {
    this.setState({
      loading: true,
      startDate: moment(new Date()).format("YYYY-MM-01 00:00:00"),
      endDate: moment(new Date()).format("YYYY-MM-DD 23:59:59"),
      action: 2
    });
    this.getListHistory(1);
  }

  changeDateYear() {
    this.setState({
      loading: true,
      startDate: moment(new Date()).format("YYYY-01-01 00:00:00"),
      endDate: moment(new Date()).format("YYYY-MM-DD 23:59:59"),
      action: 3
    });
    this.getListHistory(1);
  }

  changeStartDate = (event, date) => {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      startDate: moment(date).format("YYYY-MM-DD 00:00:00"),
      datePickerStart: false
    });
    this.getListHistory(1);
  };

  changeEndDate = (event, date) => {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      endDate: moment(date).format("YYYY-MM-DD 23:59:59"),
      datePickerEnd: false
    });

    this.getListHistory(1);
  };

  showStartPicker() {
    console.log("showStartPicker");

    this.setState({
      datePickerStart: true
    });
  }

  showEndPicker() {
    console.log("showEND PICKER");
    this.setState({
      datePickerEnd: true
    });
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

  changePin(value, command) {
    //input, clear, delete
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    //console.log('CHANGE PIN value ', value);
    //console.log("CHANGE PIN command ", command);
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
        //pin6 = value;
        pin6 = value;
        fullPin = true;
      } else {
        fullPin = true;
      }
      ///console.log("is Full Pin? ==> ", fullPin)

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
        this.setState({
          pin6: pin6
        });
        this.prosesRefund();
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
      console.log("enter clear function?");
      this.setState({
        pin1: "",
        pin2: "",
        pin3: "",
        pin4: "",
        pin5: "",
        pin6: ""
      });
    }
  }

  renderPinButton() {
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            backgroundColor: WHITE,
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0,
            //marginBottom: 5,
            marginTop: 5
            //elevation: 1
          }
        ]}
      >
        {/* <View>
          <Text>
            PIN : {pin1}
            {pin2}
            {pin3}
            {pin4}
            {pin5}
            {pin6}
          </Text>
        </View> */}
        <View
          style={{
            flex: 1,
            //justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(1, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                1
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(2, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                2
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(3, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                3
              </Text>
            </Button>
          </View>
        </View>
        {/* ROW 1 END */}
        <View
          style={{
            flex: 1,
            //justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(4, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                4
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(5, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                5
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(6, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                6
              </Text>
            </Button>
          </View>
        </View>
        {/* ROW 2 END */}
        <View
          style={{
            flex: 1,
            //justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(7, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                7
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(8, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                8
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(9, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                9
              </Text>
            </Button>
          </View>
        </View>
        {/* ROW 3 END */}
        <View
          style={{
            flex: 1,
            //justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(-1, "clear");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                C
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(0, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 24,
                    color: BLACK
                  }
                ]}
              >
                0
              </Text>
            </Button>
            <Button
              style={[
                ss.pinButton,
                {
                  // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  // backgroundColor: MAIN_THEME_COLOR_SELECT(
                  //   this.state.colorIndex
                  // )
                }
              ]}
              onPress={() => {
                this.changePin(-1, "delete");
              }}
            >
              <MaterialCommunityIcons
                name={"backspace"}
                style={{
                  fontSize: 24,
                  color: BLACK
                }}
              />
            </Button>
          </View>
        </View>
        {/* ROW 4 END */}
        {/* <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            display: "none"
          }}
        >
          <View
            style={{
              //flex: 1,
              width: "75%",
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[
                ss.button,
                {
                  width: "45%",
                  padding: 15,
                  backgroundColor:
                    this.state.clockIn === "00:00" ? "#83B235" : "#C4C4C4"
                }
              ]}
              onPress={() => {
                this.changePin(7, "input");
                if (this.state.clockIn === "00:00") {
                  this.absensiClockInOut("in");
                }
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: WHITE }
                ]}
              >
                {_masuk[this.state.languageIndex]}
              </Text>
            </Button>
            <Button
              style={[
                ss.button,
                {
                  width: "45%",
                  padding: 15,
                  backgroundColor:
                    this.state.clockIn !== "00:00" &&
                    this.state.clockOut === "00:00"
                      ? "#C84343"
                      : "#C4C4C4"
                }
              ]}
              onPress={() => {
                if (
                  this.state.clockIn !== "00:00" &&
                  this.state.clockOut === "00:00"
                ) {
                  this.absensiClockInOut("out");
                }
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 12, color: WHITE }
                ]}
              >
                {_pulang[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View> */}
        {/* ROW 5 END */}
      </View>
    );
  }

  // renderPinButton() {
  //   let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
  //   return (
  //     <View
  //       style={[
  //         ss.box,
  //         {
  //           flex: 1,
  //           backgroundColor: WHITE,
  //           padding: 0,
  //           paddingBottom: 0,
  //           paddingTop: 0,
  //           //marginBottom: 5,
  //           marginTop: 5
  //           //elevation: 1
  //         }
  //       ]}
  //     >
  //       {/* <View>
  //         <Text>
  //           PIN : {pin1}
  //           {pin2}
  //           {pin3}
  //           {pin4}
  //           {pin5}
  //           {pin6}
  //         </Text>
  //       </View> */}
  //       <View
  //         style={{
  //           flex: 1,
  //           //justifyContent: "space-around",
  //           alignItems: "center"
  //         }}
  //       >
  //         <View
  //           style={{
  //             //flex: 1,
  //             width: "100%",
  //             //justifyContent: "space-between",
  //             flexDirection: "row"
  //           }}
  //         >
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 // backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                 //   this.state.colorIndex
  //                 //)
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(1, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 16,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               1
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 // backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                 //   this.state.colorIndex
  //                 // )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(2, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 16,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               2
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 // borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 // backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                 //   this.state.colorIndex
  //                 // )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(3, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 16,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               3
  //             </Text>
  //           </Button>
  //         </View>
  //       </View>
  //       {/* ROW 1 END */}
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "space-between",
  //           alignItems: "center"
  //         }}
  //       >
  //         <View
  //           style={{
  //             //flex: 1,
  //             width: "100%",
  //             justifyContent: "space-between",
  //             flexDirection: "row"
  //           }}
  //         >
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(4, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 48,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               4
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(5, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 48,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               5
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(6, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 48,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               6
  //             </Text>
  //           </Button>
  //         </View>
  //       </View>
  //       {/* ROW 2 END */}
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "space-between",
  //           alignItems: "center"
  //         }}
  //       >
  //         <View
  //           style={{
  //             //flex: 1,
  //             width: "75%",
  //             justifyContent: "space-between",
  //             flexDirection: "row"
  //           }}
  //         >
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(7, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 48,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               7
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(8, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 48,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               8
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(9, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 48,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               9
  //             </Text>
  //           </Button>
  //         </View>
  //       </View>
  //       {/* ROW 3 END */}
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "space-between",
  //           alignItems: "center"
  //         }}
  //       >
  //         <View
  //           style={{
  //             //flex: 1,
  //             width: "75%",
  //             justifyContent: "space-between",
  //             flexDirection: "row"
  //           }}
  //         >
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(-1, "clear");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 48,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               C
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(0, "input");
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 {
  //                   fontSize: 48,
  //                   color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //                 }
  //               ]}
  //             >
  //               0
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.pinButton,
  //               {
  //                 borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
  //                 backgroundColor: MAIN_THEME_COLOR_SELECT(
  //                   this.state.colorIndex
  //                 )
  //               }
  //             ]}
  //             onPress={() => {
  //               this.changePin(-1, "delete");
  //             }}
  //           >
  //             <MaterialCommunityIcons
  //               name={"backspace"}
  //               style={{
  //                 fontSize: 40,
  //                 color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //               }}
  //             />
  //           </Button>
  //         </View>
  //       </View>
  //       {/* ROW 4 END */}
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "space-between",
  //           alignItems: "center"
  //         }}
  //       >
  //         <View
  //           style={{
  //             //flex: 1,
  //             width: "75%",
  //             justifyContent: "space-between",
  //             flexDirection: "row"
  //           }}
  //         >
  //           <Button
  //             style={[
  //               ss.button,
  //               { width: "45%", padding: 15, backgroundColor: "#C84343" }
  //             ]}
  //             onPress={() => {
  //               //this.changePin(7, "input");
  //               //this.absensiClockIn();
  //               this.setState({ refund: false });
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 { fontSize: 20, color: WHITE }
  //               ]}
  //             >
  //               Cancel
  //             </Text>
  //           </Button>
  //           <Button
  //             style={[
  //               ss.button,
  //               {
  //                 width: "45%",
  //                 padding: 15,
  //                 backgroundColor: this.state.selectedUser
  //                   ? "#83B235"
  //                   : "#C4C4C4"
  //               }
  //             ]}
  //             onPress={() => {
  //               //this.absensiClockOut();
  //               //this.setState({ refund: false });
  //               if (this.state.selectedUser) {
  //                 this.prosesRefund();
  //               }
  //             }}
  //           >
  //             <Text
  //               style={[
  //                 MainStyle.robotoNormalBold,
  //                 { fontSize: 20, color: WHITE }
  //               ]}
  //             >
  //               Enter
  //             </Text>
  //           </Button>
  //         </View>
  //       </View>
  //       {/* ROW 5 END */}
  //     </View>
  //   );
  // }

  renderPinNumber() {
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 1,
            //padding: 15,
            margin: 15,
            marginTop: 10
          }
        ]}
      >
        <View
          style={{
            width: "100%"
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 20, color: BLACK }]}
          >
            {_batalkan_transaksi[this.state.languageIndex]}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: BLACK, marginTop: 10, marginBottom: 10 }
            ]}
          >
            {_masukan_kode[this.state.languageIndex]}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <View style={ss.pinNumber}>
            {pin1 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin2 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin3 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin4 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin5 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
          <View style={ss.pinNumber}>
            {pin6 !== "" ? (
              <Fontisto
                name={"asterisk"}
                style={{
                  fontSize: 16,
                  color: BLACK
                }}
              />
            ) : (
              <Fontisto
                name={"ellipse"}
                style={{
                  fontSize: 16,
                  color: "transparent"
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  renderSelectUser() {
    return (
      <View
        style={[
          ss.box,
          {
            padding: 15
          }
        ]}
      >
        <View
          style={{
            width: "100%",
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            //alignContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#C8C7CC",
            paddingBottom: 15
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: BLACK,
                fontSize: 12
              }
            ]}
          >
            {_pilih_user[this.state.languageIndex]}
          </Text>
          <View
            style={[
              ss.box,
              {
                width: "50%",
                backgroundColor: WHITE,
                borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                borderWidth: 1
              }
            ]}
          >
            <Dropdown
              style={{
                borderRadius: 15,
                padding: 5,
                marginLeft: 0,
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                //padding: 10
                // paddingRight:100
              }}
              size={12}
              color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
              // selectWidth = {'80%'}
              selectedValue={String(this.state.selectedUser)}
              optionLists={this.state.listUser.map((v, k) => {
                //console.log('v ==> ', v);
                return {
                  label: v.name,
                  value: String(v.id)
                };
              })}
              onValueChange={(itemValue, itemIndex) => {
                //console.log("SELECTED Value ==> ", itemValue);
                this.setState({ selectedUser: itemValue });
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  renderListReason(data, i) {
    let { selectedReason, notes } = this.state;

    let whiteColor = "#EEEEEE";
    let blackColor = BLACK;

    if (this.state.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    let bgcolor = [whiteColor, MAIN_THEME_COLOR_SELECT(this.state.colorIndex)];
    let textcolor = [blackColor, MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)];
    let colorIndex = 0;

    if (selectedReason === data.id) {
      colorIndex = 1;
    }

    return (
      <Button
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({ selectedReason: data.id });
        }}
        style={[
          ss.box,
          {
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            elevation: 1,
            marginBottom: 5,
            borderWidth: 0,
            borderColor: BLACK,
            //backgroundColor: '#ABC'
            backgroundColor: bgcolor[colorIndex]
          }
        ]}
      >
        <Text
          style={[
            MainStyle.robotoNormal,
            { color: textcolor[colorIndex], fontSize: 12 }
          ]}
        >
          {data.name}
        </Text>
      </Button>
    );
  }

  renderReason() {
    let { selectedReason, notes } = this.state;

    let whiteColor = "#EEEEEE";
    let blackColor = BLACK;

    if (this.state.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    let bgcolor = [whiteColor, MAIN_THEME_COLOR_SELECT(this.state.colorIndex)];
    let textcolor = [blackColor, MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)];
    let colorIndex = 0;

    if (selectedReason === 0) {
      colorIndex = 1;
    }

    return [
      <ScrollView
        style={[
          ss.box,
          {
            backgroundColor: "WHITE",
            padding: 10,
            margin: 25,
            marginTop: 0,
            marginBottom: 0,
            flex: 1
          }
        ]}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <View
            style={{
              width: "100%",
              alignContent: "center",
              alignItems: "center"
              ///padding: 10,
              //borderColor: 'rgba(125, 125, 125, 0.8)',
              //borderColor: WHITE,
              //borderRightWidth: 1
            }}
          >
            <View
              style={{
                width: "100%",
                //height: '100%',
                flex: 1,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.listReason.map((items, itemIndex) => {
                return this.renderListReason(items, itemIndex);
              })}
              <Button
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  this.setState({ selectedReason: 0 });
                }}
                style={[
                  ss.box,
                  {
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    elevation: 2,
                    marginBottom: 5,
                    //borderWidth: 1,
                    borderColor: BLACK,
                    //backgroundColor: '#ABC'
                    backgroundColor: bgcolor[colorIndex]
                  }
                ]}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { color: textcolor[colorIndex], fontSize: 12 }
                  ]}
                >
                  {_other_reason[this.state.languageIndex]}
                </Text>
              </Button>
              {selectedReason === 0 ? (
                <View
                  style={{
                    //marginTop: 10,
                    //marginLeft: 25,
                    //  marginRight: 25,
                    marginBottom: 10,
                    flexDirection: "row",
                    //paddingRight: 20,
                    width: "100%",
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
                      borderColor: "#8A8A8F",
                      minHeight: 100,
                      paddingLeft: 5,
                      paddingRight: 5,
                      //backgroundColor: "#EEEEEE",
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
                        //backgroundColor: '#BCA',
                        color: BLACK,
                        marginTop: -8,
                        marginLeft: 0,
                        marginRight: 0,
                        fontSize: 14,
                        fontFamily: "Roboto-Regular"
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
                      onChangeText={v => this.setState({ notes: v })}
                      value={this.state.notes}
                      placeholder={_tulis_alasan[this.state.languageIndex]}
                    />
                  </ScrollView>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </ScrollView>,
      <View
        style={{
          width: "100%",

          alignSelf: "flex-end",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <Button
          onPress={() => {
            //alert("Show Pin Press");

            this.setState({ showPin: true });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              width: "75%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              elevation: 1,

              //borderWidth: 1,
              borderColor: BLACK,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              //backgroundColor: bgcolor[0]
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 12
              }
            ]}
          >
            {_simpan[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    ];
  }

  changeStatusFilter(status) {
    this.setState({ filterStatus: status });
    //this.getListHistory(1);
  }
  changePaymentFilter(payment) {
    this.setState({ filterPayment: payment });
    //this.getListHistory(1);
  }

  filterAction() {
    this.setState({ showFilter: false });
    this.getListHistory(1);
  }
  renderFilter() {
    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }
    return (
      <View
        style={{
          flex: 1,
          padding: 15,
          marginTop: 10
          //backgroundColor: "#BCA",
          // borderTopRightRadius: 15,
          // borderTopLeftRadius: 15
        }}
      >
        <View
          style={{
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8",
            flexDirection: "row"
          }}
        >
          <Button
            onPress={() => {
              this.setState({ showFilter: false });
            }}
            style={{ padding: 10, paddingBottom: 0, paddingTop: 0 }}
          >
            <Ionicons name={"md-close"} size={25} color={"#C4C4C4"} />
          </Button>
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 18 }]}
          >
            {_set_filter[this.state.languageIndex]}
          </Text>
        </View>

        <View
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8",
            display: "none"
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 14 }]}
          >
            {_by_code[this.state.languageIndex]}
          </Text>
          <TextInput
            style={{
              //backgroundColor: "rgba(255, 255, 255, 0.7)",
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
              paddingLeft: 5,
              paddingRight: 5,
              paddingBottom: 2,
              paddingTop: 2,
              borderRadius: 5,
              //paddingTop: 0,
              //paddingBottom: 10,
              //marginBottom: -10,
              //marginLeft: '5%',
              //marginRight: 5,
              //height: 40,
              fontSize: 12,
              fontFamily: "Roboto-Regular"
            }}
            type="text"
            ref={q => {
              this.TextInputSearch = q;
            }}
            onSubmitEditing={() => {
              //this.getData(this.state.searchKey);
              // this.setState({viewSearch: false});
            }}
            //onChangeText={(q)=>this._accountUpdate('username',q)}
            onChangeText={v => this.setState({ searchKey: v })}
            value={this.state.searchKey}
            placeholder={_cari[this.state.languageIndex]}
            placeholderTextColor={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
          />
        </View>

        <View
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8"
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 14 }]}
          >
            {_by_status[this.state.languageIndex]}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <Button
              onPress={() => {
                this.changeStatusFilter(1);
              }}
              style={{
                width: "30%",
                borderRadius: 5,
                backgroundColor:
                  this.state.filterStatus === 1
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color:
                      this.state.filterStatus === 1 ? whiteColor : blackColor,
                    fontSize: 12
                  }
                ]}
              >
                {_status_filter_1[this.state.languageIndex]}
              </Text>
            </Button>
            <Button
              onPress={() => {
                this.changeStatusFilter(2);
              }}
              style={{
                width: "30%",
                borderRadius: 5,
                backgroundColor:
                  this.state.filterStatus === 2
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color:
                      this.state.filterStatus === 2 ? whiteColor : blackColor,
                    fontSize: 12
                  }
                ]}
              >
                {_status_filter_2[this.state.languageIndex]}
              </Text>
            </Button>
            <Button
              onPress={() => {
                this.changeStatusFilter(3);
              }}
              style={{
                width: "30%",
                borderRadius: 5,
                backgroundColor:
                  this.state.filterStatus === 3
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color:
                      this.state.filterStatus === 3 ? whiteColor : blackColor,
                    fontSize: 12
                  }
                ]}
              >
                {_status_filter_3[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>

        <View
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8"
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 14 }]}
          >
            {_by_payment[this.state.languageIndex]}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <Button
              onPress={() => {
                this.changePaymentFilter(1);
              }}
              style={{
                width: "30%",
                borderRadius: 5,
                backgroundColor:
                  this.state.filterPayment === 1
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color:
                      this.state.filterPayment === 1 ? whiteColor : blackColor,
                    fontSize: 12
                  }
                ]}
              >
                {_payment_filter_1[this.state.languageIndex]}
              </Text>
            </Button>
            <Button
              onPress={() => {
                this.changePaymentFilter(2);
              }}
              style={{
                width: "30%",
                borderRadius: 5,
                backgroundColor:
                  this.state.filterPayment === 2
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color:
                      this.state.filterPayment === 2 ? whiteColor : blackColor,
                    fontSize: 12
                  }
                ]}
              >
                {_payment_filter_2[this.state.languageIndex]}
              </Text>
            </Button>
            <Button
              onPress={() => {
                this.changePaymentFilter(3);
              }}
              style={{
                width: "30%",
                borderRadius: 5,
                backgroundColor:
                  this.state.filterPayment === 3
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color:
                      this.state.filterPayment === 3 ? whiteColor : blackColor,
                    fontSize: 12
                  }
                ]}
              >
                {_payment_filter_3[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <Button
              onPress={() => {
                this.changePaymentFilter(4);
              }}
              style={{
                width: "30%",
                borderRadius: 5,
                backgroundColor:
                  this.state.filterPayment === 4
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color:
                      this.state.filterPayment === 4 ? whiteColor : blackColor,
                    fontSize: 12
                  }
                ]}
              >
                {_payment_filter_4[this.state.languageIndex]}
              </Text>
            </Button>
            <Button
              onPress={() => {
                this.changePaymentFilter(5);
              }}
              style={{
                width: "30%",
                borderRadius: 5,
                backgroundColor:
                  this.state.filterPayment === 5
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#EEEEEE",
                justifyContent: "center",
                alignItems: "center",
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color:
                      this.state.filterPayment === 5 ? whiteColor : blackColor,
                    fontSize: 12
                  }
                ]}
              >
                {_payment_filter_5[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            onPress={() => {
              this.filterAction();
            }}
            style={{
              width: "100%",
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderRadius: 15,
              alignItems: "center",
              padding: 10
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: whiteColor,
                  fontSize: 12
                }
              ]}
            >
              {_set_filter[this.state.languageIndex]}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
  renderRefundLeftSide() {
    return [this.renderSelectUser(), this.renderReason()];
  }

  // renderRefundRightSide() {
  //   return [this.renderPinNumber(), this.renderPinButton()];
  // }

  renderRefundRightSide() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showPin}
        onRequestClose={() => {
          this.setState({ showPin: false });
        }}
      >
        {this.state.loading ? <Loading /> : <View />}
        <View
          style={{
            flex: 0.33
          }}
        />
        <View
          style={{
            flex: 0.67,
            backgroundColor: "#FFF",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderColor: "#C4C4C4",
            borderWidth: 2
          }}
        >
          {this.renderPinNumber()}
          {this.renderPinButton()}
        </View>
      </Modal>
    );
  }

  renderSearch() {
    let { startDate, endDate } = this.state;
    // startDate = moment(startDate).format('YYYY-MM-DD');
    // endDate = moment(endDate).format('YYYY-MM-DD');
    startDate = moment(startDate).format("DD/MM/YYYY");
    endDate = moment(endDate).format("DD/MM/YYYY");
    // console.log('Moment ==> ', moment(this.state.startDate));
    // console.log('NEW DATE ==> ', new Date(moment(this.state.startDate)));
    // console.log('state DATE ==> ', this.state.startDate);
    // console.log("state DATE ==> ", moment(new Date(this.state.startDate).format("YYYY-MM-DD 00:00:00"))
    return (
      <View>
        {this.state.datePickerEnd === true ? (
          <DateTimePicker
            value={new Date(moment(this.state.endDate))}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={this.changeEndDate}
            minimumDate={new Date(moment(this.state.startDate))}
            //minimumDate={new Date()}
          />
        ) : (
          <View />
        )}

        {this.state.datePickerStart === true ? (
          <DateTimePicker
            value={new Date(moment(this.state.startDate))}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={this.changeStartDate}
            //minimumDate={new Date(this.state.startDate)}
            //minimumDate={new Date()}
          />
        ) : (
          <View />
        )}
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              margin: 15,
              display: "none",
              //borderColor: BLACK,
              //borderWidth: 1,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderRadius: 10
              //alignItems: 'center',
            }}
          >
            <View
              style={{
                marginTop: 5,
                marginRight: 15,
                marginLeft: 15,
                // paddingRight: 10,
                // paddingLeft: 10,
                // paddingTop: 5,
                // paddingBottom: 5,
                //width: "100%",
                backgroundColor: "#F7F7F7",
                color: BLACK,
                borderRadius: 15,
                flexDirection: "row",
                justifyContent: "space-evenly"
              }}
            >
              {/* <Button
            style={{ justifyContent: "center" }}
            onPress={() => {
              //this.setState({ showFilter: true });
            }}
          > */}
              <Button
                style={{ justifyContent: "center" }}
                onPress={() => {
                  //this.setState({ showFilter: true });
                  //this.getRekapList();
                }}
              >
                <Ionicons
                  name={"md-search"}
                  style={{
                    margin: 10,
                    fontSize: 20,
                    color: "#C4C4C4"
                  }}
                />
              </Button>
              {/* </Button> */}
              <TextInput
                style={{
                  //backgroundColor: "rgba(255, 255, 255, 0.7)",

                  //paddingTop: 0,
                  //paddingBottom: 10,
                  //marginBottom: -10,
                  //marginLeft: '5%',
                  //marginRight: 5,
                  //height: 40,
                  color: BLACK,
                  //backgroundColor: "#BCA",
                  //width: "100%",
                  width: "90%",
                  fontFamily: "Roboto-Regular"
                }}
                type="text"
                ref={q => {
                  this.TextInputSearch = q;
                }}
                onSubmitEditing={() => {
                  //this.getData(this.state.searchKey);
                  // this.setState({viewSearch: false});
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={v => this.setState({ searchKey: v })}
                value={this.state.searchKey}
                placeholder={_cari[this.state.languageIndex]}
                placeholderTextColor={"#C4C4C4"}
              />
            </View>

            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
                margin: 15
              }}
            >
              <View style={{ width: "10%", justifyContent: "center" }}>
                <Ionicons
                  name={"md-search"}
                  style={{
                    padding: 0,
                    alignSelf: "center",
                    fontSize: 20,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </View>
              <View style={{ width: "95%", justifyContent: "center" }}>
                <TextInput
                  style={{
                    //backgroundColor: "rgba(255, 255, 255, 0.7)",
                    backgroundColor: "transparent",
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    padding: 0,
                    //paddingTop: 0,
                    //paddingBottom: 10,
                    //marginBottom: -10,
                    //marginLeft: '5%',
                    //marginRight: 5,
                    //height: 40,
                    fontSize: 12,
                    fontFamily: "Roboto-Regular"
                  }}
                  type="text"
                  ref={q => {
                    this.TextInputSearch = q;
                  }}
                  onSubmitEditing={() => {
                    //this.getData(this.state.searchKey);
                    // this.setState({viewSearch: false});
                  }}
                  //onChangeText={(q)=>this._accountUpdate('username',q)}
                  onChangeText={v => this.setState({ searchKey: v })}
                  value={this.state.searchKey}
                  placeholder={_cari[this.state.languageIndex]}
                  placeholderTextColor={MAIN_TEXT_COLOR_SELECT(
                    this.state.colorIndex
                  )}
                />
              </View>
            </View>
          </View>
        </View>
        {/* Cari Text Box End */}
        {/* Cari Tanggal Start */}
        <View
          style={{
            marginTop: 5,
            marginRight: 15,
            marginLeft: 15,
            // paddingRight: 10,
            // paddingLeft: 10,
            // paddingTop: 5,
            // paddingBottom: 5,
            //width: "100%",
            backgroundColor: "#F7F7F7",
            color: BLACK,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          {/* <Button
            style={{ justifyContent: "center" }}
            onPress={() => {
              //this.setState({ showFilter: true });
            }}
          > */}
          <Button
            style={{ justifyContent: "center" }}
            onPress={() => {
              //this.setState({ showFilter: true });
              //this.getRekapList();
              this.getListHistory(1);
            }}
          >
            <Ionicons
              name={"md-search"}
              style={{
                margin: 10,
                fontSize: 20,
                color: "#C4C4C4"
              }}
            />
          </Button>
          {/* </Button> */}
          <TextInput
            style={{
              //backgroundColor: "rgba(255, 255, 255, 0.7)",

              //paddingTop: 0,
              //paddingBottom: 10,
              //marginBottom: -10,
              //marginLeft: '5%',
              //marginRight: 5,
              //height: 40,
              color: BLACK,
              //backgroundColor: "#BCA",
              //width: "100%",
              width: "90%",
              fontFamily: "Roboto-Regular"
            }}
            type="text"
            ref={q => {
              this.TextInputSearch = q;
            }}
            onSubmitEditing={() => {
              //this.getData(this.state.searchKey);
              // this.setState({viewSearch: false});
              this.getListHistory(1);
            }}
            //onChangeText={(q)=>this._accountUpdate('username',q)}
            onChangeText={v => this.setState({ searchKey: v })}
            value={this.state.searchKey}
            placeholder={_cari[this.state.languageIndex]}
            placeholderTextColor={"#C4C4C4"}
          />
        </View>
        <View
          style={{
            marginBottom: 10,
            marginTop: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            //backgroundColor: '#BCA',
            paddingRight: 15,
            paddingLeft: 15
          }}
        >
          <Button
            style={{ justifyContent: "center", display: "none" }}
            onPress={() => {
              this.setState({
                showFilter: true,
                filterStatus: 1,
                filterPayment: 1
              });
            }}
          >
            <Ionicons
              name={"md-search"}
              style={{
                padding: 0,
                fontSize: 20,
                color: "#C4C4C4"
              }}
            />
          </Button>

          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this.changeDateToday();
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "24%",
              //borderColor: BLACK,
              //borderWidth: 1,
              //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              //borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 10,
              paddingBottom: this.state.action === 0 ? 5 : 10,
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderBottomWidth: this.state.action === 0 ? 5 : 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 10,
                  color:
                    this.state.action === 0
                      ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      : BLACK
                }
              ]}
            >
              {_today[this.state.languageIndex]}
            </Text>
          </Button>

          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this.changeDateWeek();
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "24%",
              //borderColor: BLACK,
              //borderWidth: 1,
              //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              //borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 10,
              paddingBottom: this.state.action === 1 ? 5 : 10,
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderBottomWidth: this.state.action === 1 ? 5 : 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 10,
                  color:
                    this.state.action === 1
                      ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      : BLACK
                }
              ]}
            >
              {_this_week[this.state.languageIndex]}
            </Text>
          </Button>

          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this.changeDateMonth();
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "24%",
              //borderColor: BLACK,
              //borderWidth: 1,
              //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              //borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 10,
              paddingBottom: this.state.action === 2 ? 5 : 10,
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderBottomWidth: this.state.action === 2 ? 5 : 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 10,
                  color:
                    this.state.action === 2
                      ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      : BLACK
                }
              ]}
            >
              {_this_month[this.state.languageIndex]}
            </Text>
          </Button>

          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this.changeDateYear();
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "24%",
              //borderColor: BLACK,
              //borderWidth: 1,
              //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              //borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 10,
              paddingBottom: this.state.action === 3 ? 5 : 10,
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderBottomWidth: this.state.action === 3 ? 5 : 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 10,
                  color:
                    this.state.action === 3
                      ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      : BLACK
                }
              ]}
            >
              {_this_year[this.state.languageIndex]}
            </Text>
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            display: "none",
            justifyContent: "space-between",
            marginTop: 10,
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <View
            style={{
              //margin: 15,
              marginTop: 0,
              width: "15%",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",

              padding: 15,
              paddingLeft: 0,
              paddingRight: 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {_from[this.state.languageIndex]}
            </Text>
          </View>
          <Button
            onPress={() => {
              this.showStartPicker();
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "33%",
              //borderColor: BLACK,
              //borderWidth: 1,
              backgroundColor: WHITE,
              borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 15
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 12, color: BLACK }
              ]}
            >
              {startDate}
            </Text>
          </Button>
          <View
            style={{
              //margin: 15,
              marginTop: 0,
              width: "15%",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",

              padding: 15,
              paddingLeft: 0,
              paddingRight: 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {_to[this.state.languageIndex]}
            </Text>
          </View>
          <Button
            onPress={() => {
              this.showEndPicker();
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "33%",
              //borderColor: BLACK,
              //borderWidth: 1,
              backgroundColor: WHITE,
              borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 15
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 12, color: BLACK }
              ]}
            >
              {endDate}
            </Text>
          </Button>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "#C8C7CC",
            marginLeft: 15,
            marginRight: 15
          }}
        />

        {/* Cari Tanggal End */}
      </View>
    );
  }

  renderList(data, i) {
    let time = "";

    // if (data.time) {
    //   time = data.time;
    //   time = moment(time).format("HH:mm");
    // }

    const status = data.status;
    const status_color = [
      "#000000",
      "#BA1818",
      "#BA1818",
      "#37A441",
      "#C4C4C4"
    ];
    let status_index = 0;

    let status_text = "";

    if (status === "new") {
      status_text = _status_1[this.state.languageIndex];
      status_index = 0;
    }
    if (status === "refund") {
      status_text = _status_2[this.state.languageIndex];
      status_index = 1;
    }

    if (status === "cancel") {
      status_text = _status_3[this.state.languageIndex];
      status_index = 2;
    }

    if (status === "done") {
      status_text = _status_4[this.state.languageIndex];
      status_index = 3;
    }

    if (status === "closing") {
      status_text = _status_5[this.state.languageIndex];
      status_index = 4;
    }

    if (data.time) {
      time = data.time;
      time = moment(time).format("DD/MM, HH:mm");
    }

    let paymentType = data.paymentType;
    paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    const { selectedData } = this.state;

    let whiteColor = WHITE;
    let blackColor = BLACK;

    // if (this.state.colorIndex === 9) {
    //   whiteColor = BLACK;
    //   blackColor = WHITE;
    // }

    const bgColor = [
      //MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      whiteColor,
      whiteColor
    ];
    const textColor = [
      //MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      blackColor,
      blackColor
    ];

    let colorIndex = 1;

    if (selectedData.id === data.id) {
      colorIndex = 0;
    } else {
      colorIndex = 1;
    }

    //console.log("SELECTED DATA ==> ", selectedData)
    //console.log("data.id ==> ", data.id)
    return (
      <View style={{ marginBottom: 15 }}>
        <Button
          onPress={() => {
            this.changeSelection(data);
            //this.setState({ selectedData: data });
          }}
          style={[
            ss.box,
            {
              //minHeight: 100,
              marginTop: 0,
              padding: 15,
              marginBottom: 0,
              backgroundColor: bgColor[colorIndex],
              //flexDirection: "row",
              justifyContent: "center",
              borderRadius: 5,
              borderColor: "#D9D9D9",
              borderWidth: 1,
              zIndex: 2
            }
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingBottom: 10,
              borderBottomWidth: 1,
              //backgroundColor: "#BCA",
              borderColor: "rgba(0, 0, 0, 0.2)"
              //borderColor: "rgba(0, 0, 0, 0.2)"
            }}
          >
            <View style={{ width: "50%", alignItems: "flex-start" }}>
              <View style={{ width: "75%" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 11,
                      color: textColor[colorIndex],
                      alignSelf: "flex-start"
                    }
                  ]}
                >
                  {_transaction_id[this.state.languageIndex]}
                </Text>
              </View>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {data.transId}
              </Text>
            </View>
            <View style={{ width: "20%", alignItems: "center" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {" "}
              </Text>
            </View>
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_time[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {time}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingBottom: 0,
              paddingTop: 10
              //borderBottomWidth: 1,
              //backgroundColor: "#BCA",
              //borderColor: "rgba(0, 0, 0, 0.9)"
              //borderColor: "rgba(0, 0, 0, 0.2)"
            }}
          >
            <View style={{ width: "33%", alignItems: "flex-start" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_total_price[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {this.idrNumToStr(parseInt(data.payment_total))}
              </Text>
            </View>
            <View style={{ width: "33%", alignItems: "center" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_payment_type[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {paymentType}
              </Text>
            </View>
            <View style={{ width: "33%", alignItems: "flex-end" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_merchant[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 10,
                    color: textColor[colorIndex],
                    textAlign: "right"
                  }
                ]}
              >
                {data.merchantName}
              </Text>
            </View>
          </View>
        </Button>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#E8E8E8",
            marginTop: -5,
            padding: 10,
            zIndex: 1,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 11, color: status_color[status_index] }
            ]}
          >
            {status_text}
          </Text>
        </View>
        {/* <View style={{ width: "33%" }}>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 11, color: textColor[colorIndex] }
            ]}
          >
            {_transaction_id[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 10, color: textColor[colorIndex] }
            ]}
          >
            {data.transId}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 11, color: textColor[colorIndex], marginTop: 10 }
            ]}
          >
            {_total_price[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 10, color: textColor[colorIndex] }
            ]}
          >
            {data.payment_total}
          </Text>
        </View> */}

        {/* <View style={{ width: "33%" }}>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 11, color: textColor[colorIndex] }
            ]}
          >
            {" "}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 11, color: textColor[colorIndex] }
            ]}
          >
            {status === "closing" ? "Closing" : " "}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 11, color: textColor[colorIndex], marginTop: 10 }
            ]}
          >
            {_payment_type[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 10, color: textColor[colorIndex] }
            ]}
          >
            {paymentType}
          </Text>
        </View> */}

        {/* <View style={{ width: "33%" }}>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 11, color: textColor[colorIndex] }
            ]}
          >
            {_time[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 10, color: textColor[colorIndex] }
            ]}
          >
            {time}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 11, color: textColor[colorIndex], marginTop: 10 }
            ]}
          >
            {_merchant[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 10, color: textColor[colorIndex] }
            ]}
          >
            {data.merchantName}
          </Text>
        </View> */}
      </View>
    );
  }

  renderHistoryLeftSide() {
    const { action } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            borderRadius: 0
            //backgroundColor: "#C4C4C4"
            //paddingBottom: 15,
          }
        ]}
      >
        {this.renderSearch()}
        <View style={{ margin: 15, flex: 1 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {/* <GestureRecognizer */}
            <View
              onSwipeLeft={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                //alert("left");
                if (action < 3) {
                  if (action === 0) {
                    this.changeDateWeek();
                  } else if (action === 1) {
                    this.changeDateMonth();
                  } else if (action === 2) {
                    this.changeDateYear();
                  }
                }
              }}
              onSwipeRight={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                if (action > 0) {
                  if (action === 3) {
                    this.changeDateMonth();
                  } else if (action === 2) {
                    this.changeDateWeek();
                  } else if (action === 1) {
                    this.changeDateToday();
                  }
                }
              }}
              config={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
              }}
              style={{
                flex: 1
              }}
            >
              <FlatList
                //ListHeaderComponent={this.renderSearch()}
                showsVerticalScrollIndicator={false}
                data={this.state.listHistory}
                renderItem={({ item, index }) => {
                  return this.renderList(item, index);
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "renderListHistory" + index.toString();
                }}
                //onRefresh={this._onRefresh}
                //onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={0.5}
                //refreshing={refreshing}
              />
            {/* </GestureRecognizer> */}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  renderDataDetail(data, i) {
    console.log("render Data Detail ==> ", data);
    let total = data.qty * data.price;

    let detail = data.detail;
    let detailString = "";

    let notes = "";

    if (data.notes) {
      notes = data.notes;
    }

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
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 0,
          marginRight: 0
        }}
      >
        <View
          style={{
            width: "50%",
            //alignItems: "flex-start",
            flexDirection: "column"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 10,
                color: BLACK,
                marginTop: 10
              }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 10,
                color: BLACK,
                paddingBottom: 0
              }
            ]}
          >
            {detailString}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 10,
                color: BLACK,
                paddingBottom: 0
              }
            ]}
          >
            {data.sales_type}
          </Text>

          {notes !== "" ? (
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 10,
                  color: BLACK,
                  paddingBottom: 5
                }
              ]}
            >
              {_notes[this.state.languageIndex]} {notes}
            </Text>
          ) : (
            <View style={{ paddingBottom: 5 }} />
          )}
        </View>
        <View style={{ width: "20%", alignItems: "center" }}>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 10,
                color: BLACK,
                marginTop: 10,
                paddingBottom: 5
              }
            ]}
          >
            {data.qty}
          </Text>
        </View>
        <View
          style={{
            width: "20%",
            alignItems: "flex-end",
            alignContent: "center"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 10,
                color: BLACK,
                marginTop: 10,
                paddingBottom: 5
                // borderBottomWidth: 1,
                // borderColor: BLACK,
                //width: '75%'
              }
            ]}
          >
            {this.idrNumToStr(total)}
          </Text>
        </View>
      </View>
    );
  }

  renderHeaderDetail(data) {
    let time = "";
    if (data.time) {
      time = data.time;
      time = moment(time).format("DD/MM/YYYY, HH:mm");
    }

    let paymentType = data.paymentType;
    paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    console.log("renderHeaderDetail ==> ", data);

    const total_bayar = data.grand_total;
    const grand_total = data.payment_total;

    const status = data.status;
    const status_color = [
      "#000000",
      "#BA1818",
      "#BA1818",
      "#37A441",
      "#C4C4C4"
    ];
    let status_index = 0;

    let status_text = "";

    if (status === "new") {
      status_text = _status_1[this.state.languageIndex];
      status_index = 0;
    }
    if (status === "refund") {
      status_text = _status_2[this.state.languageIndex];
      status_index = 1;
    }

    if (status === "cancel") {
      status_text = _status_3[this.state.languageIndex];
      status_index = 2;
    }

    if (status === "done") {
      status_text = _status_4[this.state.languageIndex];
      status_index = 3;
    }

    if (status === "closing") {
      status_text = _status_5[this.state.languageIndex];
      status_index = 4;
    }

    return (
      <View style={{ marginTop: 0 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 0,
            marginLeft: 0
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: BLACK,
                  //borderBottomWidth: 1,
                  borderColor: BLACK,
                  //paddingBottom: 5,
                  width: "75%"
                }
              ]}
            >
              {_transaction_id[this.state.languageIndex]}:
            </Text>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: BLACK,
                  //marginTop: 10,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              {data.transId}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: BLACK,
                  //borderBottomWidth: 1,
                  borderColor: BLACK,
                  //paddingBottom: 5,
                  width: "75%"
                }
              ]}
            >
              {_receipt_number[this.state.languageIndex]}:
            </Text>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: BLACK,
                  //marginTop: 10,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              {data.transId}
            </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  marginTop: 0,
                  fontSize: 12,
                  color: BLACK,
                  alignSelf: "flex-end",
                  //borderBottomWidth: 1,
                  borderColor: BLACK
                  //paddingBottom: 5,
                  //width: "75%"
                }
              ]}
            >
              {_time_date[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: BLACK,
                  alignSelf: "flex-end",
                  //marginTop: 10,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              {time}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  marginTop: 0,
                  fontSize: 12,
                  color: BLACK,
                  alignSelf: "flex-end",
                  //borderBottomWidth: 1,
                  borderColor: BLACK
                  //paddingBottom: 5,
                  //width: "75%"
                }
              ]}
            >
              {_payment_type[this.state.languageIndex]}:
            </Text>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: BLACK,
                  alignSelf: "flex-end",
                  //marginTop: 10,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              {paymentType}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10
            //backgroundColor: "#BCA"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 12,
                color: BLACK,

                paddingBottom: 5
              }
            ]}
          >
            {_grand_total[this.state.languageIndex]}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 12,
                color: BLACK,
                paddingBottom: 5
              }
            ]}
          >
            {this.idrNumToStr(parseInt(grand_total))}
          </Text>

          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 12,
                color: status_color[status_index],
                paddingBottom: 5
              }
            ]}
          >
            {status_text}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingTop: 10,
            borderColor: "#DADADA"
          }}
        >
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 11,
                  color: BLACK,
                  marginTop: 0,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              {_detail_pesanan[this.state.languageIndex]}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTotal(data) {
    console.log("render Total ", data);
    const { dataBill } = this.state;
    let subTotal = 0;
    dataBill.map((v, i) => {
      subTotal = subTotal + v.qty * v.price;
    });

    let grandTotal = 0;

    const tax = data.grand_total;
    const service = data.payment_total;

    if (data.payment_total) {
      grandTotal = data.payment_total;
    }

    return (
      <View
        style={{
          // alignSelf: 'flex-end',
          // flex: 1,
          // alignItems: "flex-end",
          // justifyContent: "flex-end",
          flexDirection: "row",
          //marginTop: 20,
          //paddingBottom: 10,
          //height: 40,
          //backgroundColor: "#BCA",
          //borderColor: WHITE,
          //borderTopWidth: 1,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 5
        }}
      >
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "0%"
          }}
        />
        <View
          style={{
            //alignItems: 'center',
            flex: 1,
            borderTopWidth: 1,
            borderColor: BLACK,
            alignContent: "center",
            alignItems: "flex-start",
            paddingLeft: 0
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {_sub_total[this.state.languageIndex]}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {_pajak[this.state.languageIndex]}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {_service[this.state.languageIndex]}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {_total[this.state.languageIndex]}
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: BLACK,
            alignItems: "flex-end",
            alignContent: "center",
            width: "25%"
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {this.idrNumToStr(parseInt(subTotal))}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {this.idrNumToStr(parseInt(subTotal * this.state.tax_rate))}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {this.idrNumToStr(parseInt(subTotal * this.state.service_rate))}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {this.idrNumToStr(parseInt(grandTotal))}
          </Text>
        </View>
      </View>
    );
  }

  renderButtonCommand() {
    return (
      <View
        style={{
          margin: 0,
          marginTop: 0,
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <Button
          onPress={() => {
            this.openReceipt();
          }}
          style={[
            ss.box,
            {
              display: this.state.payment_id !== 0 ? "flex" : "none",
              backgroundColor: "#72B9E1",
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              borderRadius: 15,
              elevation: 3,
              marginLeft: 20
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 12, color: WHITE, margin: 5 }
            ]}
          >
            {_send_receipt[this.state.languageIndex]}
          </Text>
        </Button>
        <Button
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({
              refund: true,
              showPin: false,
              pin1: "",
              pin2: "",
              pin3: "",
              pin4: "",
              pin5: "",
              pin6: "",
              subTitle: _batalkan_transaksi[this.state.languageIndex]
            });
          }}
          style={[
            ss.box,
            {
              display:
                this.state.payment_id !== 0 && this.state.canRefund === true
                  ? "flex"
                  : "none",
              backgroundColor: "rgba(185, 60, 60, 0.9)",
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              borderRadius: 15,
              elevation: 3,
              marginRight: 20
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 12, color: WHITE, margin: 5 }
            ]}
          >
            {_issue_refund[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  renderDetailRightSide() {
    const { selectedData } = this.state;
    if (selectedData) {
      return (
        <View
          style={[
            ss.box,
            {
              //backgroundColor: "#EEEEEE",
              flex: 1,
              borderRadius: 0,
              margin: 15,
              marginTop: 0
            }
          ]}
        >
          <View>{this.renderHeaderDetail(selectedData)}</View>

          <View style={{ flex: 1 }}>
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.dataBill}
              renderItem={({ item, index }) => {
                return this.renderDataDetail(item, index);
              }}
              keyExtractor={(item, index) => {
                return "renderListHistory" + index.toString();
              }}
            />
          </View>

          <View
            style={{
              //flex: 1,

              justifyContent: "flex-end"
            }}
          >
            {this.renderTotal(selectedData)}
            {this.renderButtonCommand()}
          </View>
        </View>
      );
    }
  }

  changeEmailReceipt(text) {
    this.setState({ receiptEmail: text });
  }

  submitReceipt() {
    this.setState({ sendReceipt: false });
  }

  openReceipt() {
    this.setState({ receiptEmail: "", sendReceipt: true });
    this.printAction();
  }

  closeReceipt() {
    this.setState({ receiptEmail: "", sendReceipt: false });
  }

  render() {
    let height = Dimensions.get("window").height - 90;
    let {
      pin1,
      pin2,
      pin3,
      pin4,
      pin5,
      pin6,
      refund,
      sendReceipt,
      receiptEmail
    } = this.state;

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_riwayat_transaksi[this.state.languageIndex]}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          filter={true}
          filterAction={() => {
            this.setState({
              showFilter: true,
              filterStatus: 1,
              filterPayment: 1
            });
          }}
          hideLogin={true}
          barStyle={barStyle}
        />
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={WHITE}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {this.state.showAlert ? (
          <CustomAlert
            message={this.state.alertMessage}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            //title={'Success'}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}
        {sendReceipt ? (
          <SendReceipt
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            closeAction={() => this.closeReceipt()}
            submitAction={() => this.submitReceipt()}
            changeAction={text => this.changeEmailReceipt(text)}
            email={this.state.receiptEmail}
          />
        ) : (
          <View />
        )}
        <ScrollView
          style={{
            flex: 1
          }}
        >
          <View style={[ss.mainContent, { height: height }]}>
            <View style={[ss.leftSide, { alignItems: "center" }]}>
              {this.renderHistoryLeftSide()}
              {/* {refund
                ? this.renderRefundLeftSide()
                : this.renderHistoryLeftSide()} */}
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showFilter}
              onRequestClose={() => {
                this.setState({ showFilter: false });
              }}
            >
              <MobileHeader
                colorIndex={this.state.colorIndex}
                title={_riwayat_transaksi[this.state.languageIndex]}
                notif={false}
                hideLogin={true}
                loginInformation={this.state.userInfo}
                menu={false}
                back={true}
                backAction={() => {
                  this.setState({ showFilter: false });
                }}
                barStyle={barStyle}
              />

              <View
                style={{
                  flex: 1,
                  width: "100%",
                  //marginTop: 0,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  backgroundColor: "#FFF",
                  borderColor: "#DADADA",
                  borderTopWidth: 2,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  marginTop: -2,
                  elevation: 2
                }}
              >
                {this.renderFilter()}
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showDetail}
              onRequestClose={() => {
                this.setState({ showDetail: false });
              }}
            >
              <MobileHeader
                colorIndex={this.state.colorIndex}
                title={this.state.subTitle}
                notif={false}
                loginInformation={this.state.userInfo}
                menu={false}
                hideLogin={true}
                back={true}
                backAction={() => {
                  this.setState({ showDetail: false });
                }}
                barStyle={barStyle}
              />
              {this.state.loading ? <Loading /> : <View />}
              <View style={[ss.rightSide, { paddingTop: 15 }]}>
                {refund ? (
                  <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
                    {/* {this.state.showPin === true
                      ? this.renderRefundRightSide()
                      : this.renderRefundLeftSide()} */}

                    {this.renderRefundRightSide()}
                    {this.renderRefundLeftSide()}
                  </View>
                ) : (
                  <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
                    {this.renderDetailRightSide()}
                  </View>
                )}
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: "column"
  },
  mainContent: {
    flexDirection: "row",
    //padding: 15,
    //paddingLeft: 0,
    flex: 1
    //justifyContent: "space-between"
    //height: '100%' ,
    //backgroundColor: "#995599"
  },
  leftSide: {
    width: "100%",
    marginTop: 0
  },
  rightSide: {
    flex: 1,
    width: "100%",
    marginTop: 0,
    backgroundColor: "#FFF",
    elevation: 3
    //borderRadius: 5,
    //borderColor: "rgba(0, 0, 0, 0.4)",
    //borderWidth: 1
  },
  box: {
    elevation: 0,
    borderRadius: 5
  },
  pinButton: {
    //backgroundColor: MAIN_THEME_COLOR,
    flex: 1,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    //elevation: 1,
    borderRadius: 0,
    //width: 75,
    //height: 75,
    //width: "33%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  button: {
    elevation: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  pinNumber: {
    borderRadius: 5,
    borderColor: "#8A8A8F",
    padding: 10,
    width: "15%",
    borderWidth: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
