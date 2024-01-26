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

import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import Header from "../../Components/Header";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/Dropdown";
import SendReceipt from "../../Components/SendReceipt";
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

import {
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
  _alert_printer
} from "../../Libraries/DictionaryHistory";

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
import Loading from "../../Components/Loading";
import LoginFunctions from "../../Libraries/LoginFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import moment from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";
import { _ok_alert } from "../../Libraries/DictionarySetting";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      startDate: moment(new Date())
        .add(-7, "days")
        .format("YYYY-MM-DD HH:mm"),
      endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      allowRefund: true,
      alertMessage: [],
      showAlert: false,
      // dataBill: [
      //   {
      //     id: 1,
      //     name: "Banana Smoothies",
      //     qty: 2,
      //     price: 50000,
      //     total: 70000,
      //     detail: [
      //       {
      //         id: 1,
      //         name: "Less Ice"
      //       },
      //       {
      //         id: 2,
      //         name: "Less Sugar"
      //       }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     name: "Mango Tea",
      //     qty: 1,
      //     price: 28000,
      //     total: 28000,
      //     detail: [
      //       {
      //         id: 1,
      //         name: "Grass Jelly"
      //       },
      //       {
      //         id: 2,
      //         name: "Less Ice"
      //       },
      //       {
      //         id: 3,
      //         name: "Less Sugar"
      //       }
      //     ]
      //   }
      // ],
      dataBill: [],
      // selectedData: {
      //   id: 1,
      //   transId: "123454321",
      //   total: 100000,
      //   paymentType: "GO-PAY",
      //   merchantName: "Nama POS",
      //   time: "2020-01-01 15:50:00"
      // },
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
          name: "Kesalahan Input"
        },
        {
          id: 2,
          name: "Permintaan Pelanggan"
        },
        {
          id: 3,
          name: "Produk Habis"
        }
      ],
      datePickerStart: false,
      datePickerEnd: false,
      selectedReason: 0,
      notes: "",
      refund: false,
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

    this.getListHistory(1);
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
        alert(_alert_printer[this.state.languageIndex]);
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
            message.push(result.message);
            this.setState({
              loading: false,
              showAlert: true,
              alertMessage: message
            });
            this.resetPage();
          })
          .catch(_err => {
            console.log("ERR ==> ", _err);
          });
      } else {
        //alert(val.message);
        let message = [];
        message.push(val.message);
        this.setState({
          loading: false,
          showAlert: true,
          alertMessage: message
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

  getListHistory(page = this.state.page) {
    const { userInfo, searchKey, startDate, endDate } = this.state;
    const gerai_id = userInfo.gerai_id;
    const retail_id = userInfo.retail_id;
    const search = searchKey ? searchKey : "";
    const date_start = moment(startDate).format("YYYY-MM-DD");
    const date_end = moment(endDate).format("YYYY-MM-DD");

    let uri = `${HistoryOrderAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&date_start=${date_start}&date_end=${date_end}&search=&page=${page}&search=${search}`;
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

  changeSelection(data) {
    const payment_id = data.id;

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
          if (data.status === "closing") {
            refund = false;
          }
          this.setState({
            selectedData: data,
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
      startDate: moment(new Date()).format("YYYY-MM-DD 00:00:00"),
      endDate: moment(new Date()).format("YYYY-MM-DD 23:59:59")
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
        pin6 = value;
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
            backgroundColor: "#EEEEEE",
            padding: 25,
            paddingBottom: 0,
            paddingTop: 35,
            margin: 15,
            elevation: 1
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
            justifyContent: "space-between",
            alignItems: "center"
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
                ss.pinButton,
                {
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(1, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(2, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(3, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
            justifyContent: "space-between",
            alignItems: "center"
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
                ss.pinButton,
                {
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(4, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(5, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(6, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
            justifyContent: "space-between",
            alignItems: "center"
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
                ss.pinButton,
                {
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(7, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(8, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(9, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
            justifyContent: "space-between",
            alignItems: "center"
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
                ss.pinButton,
                {
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(-1, "clear");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(0, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(-1, "delete");
              }}
            >
              <MaterialCommunityIcons
                name={"backspace"}
                style={{
                  fontSize: 40,
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </Button>
          </View>
        </View>
        {/* ROW 4 END */}
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center"
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
                { width: "45%", padding: 15, backgroundColor: "#C84343" }
              ]}
              onPress={() => {
                //this.changePin(7, "input");
                //this.absensiClockIn();
                this.setState({ refund: false });
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: WHITE }
                ]}
              >
                Cancel
              </Text>
            </Button>
            <Button
              style={[
                ss.button,
                {
                  width: "45%",
                  padding: 15,
                  backgroundColor: this.state.selectedUser
                    ? "#83B235"
                    : "#C4C4C4"
                }
              ]}
              onPress={() => {
                //this.absensiClockOut();
                //this.setState({ refund: false });
                if (this.state.selectedUser) {
                  this.prosesRefund();
                }
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: WHITE }
                ]}
              >
                Enter
              </Text>
            </Button>
          </View>
        </View>
        {/* ROW 5 END */}
      </View>
    );
  }

  renderPinNumber() {
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
            borderWidth: 1,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            padding: 20,
            margin: 25
          }
        ]}
      >
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
          {pin1 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin2 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin3 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin4 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin5 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin6 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}
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
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            padding: 20,
            margin: 25,
            marginBottom: 15,
            marginTop: 0
          }
        ]}
      >
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
          <Text
            style={[
              MainStyle.dmSansBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 16
              }
            ]}
          >
            Pilih User
          </Text>
          <View
            style={[
              ss.box,
              {
                width: "70%",
                backgroundColor: WHITE,
                borderWidth: 1,
                borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            <Dropdown
              style={{
                marginLeft: 0,
                padding: 10
                // paddingRight:100
              }}
              size={16}
              color={BLACK}
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

    let whiteColor = WHITE;
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
            width: "70%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            elevation: 2,
            marginBottom: 5,
            borderWidth: 1,
            borderColor: BLACK,
            //backgroundColor: '#ABC'
            backgroundColor: bgcolor[colorIndex]
          }
        ]}
      >
        <Text
          style={[
            MainStyle.dmSansLight,
            { color: textcolor[colorIndex], fontSize: 16 }
          ]}
        >
          {data.name}
        </Text>
      </Button>
    );
  }

  renderReason() {
    let { selectedReason, notes } = this.state;

    let whiteColor = WHITE;
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

    return (
      <ScrollView
        style={[
          ss.box,
          {
            backgroundColor: WHITE,
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

            //backgroundColor: "#BCA",
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
                //backgroundColor: "#BCA",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    color: BLACK,
                    fontSize: 28,
                    marginBottom: 30,
                    marginTop: 30
                  }
                ]}
              >
                Issue Refund
              </Text>
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
                    width: "70%",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    elevation: 2,
                    marginBottom: 5,
                    borderWidth: 1,
                    borderColor: BLACK,
                    //backgroundColor: '#ABC'
                    backgroundColor: bgcolor[colorIndex]
                  }
                ]}
              >
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    { color: textcolor[colorIndex], fontSize: 16 }
                  ]}
                >
                  Lain - lain
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
                    width: "70%",
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
                      backgroundColor: "#EEEEEE",
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
                        fontFamily: "RobotoSlab-Bold"
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
                      placeholder={"Tulis Alasan"}
                    />
                  </ScrollView>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  renderRefundLeftSide() {
    return [this.renderSelectUser(), this.renderReason()];
  }

  renderRefundRightSide() {
    return [this.renderPinNumber(), this.renderPinButton()];
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
              //borderColor: BLACK,
              //borderWidth: 1,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderRadius: 10
              //alignItems: 'center',
            }}
          >
            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
                margin: 15
              }}
            >
              <View style={{ width: "4%" }}>
                <Ionicons
                  name={"md-search"}
                  style={{
                    alignSelf: "center",
                    fontSize: 25,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </View>
              <View style={{ width: "95%" }}>
                <TextInput
                  style={{
                    //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backgroundColor: "transparent",
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    paddingTop: 5,
                    paddingBottom: 10,
                    marginBottom: -10,
                    //marginLeft: '5%',
                    //marginRight: 5,
                    height: 40,
                    fontSize: 20,
                    fontFamily: "RobotoSlab-Bold"
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
            flexDirection: "row",
            justifyContent: "space-between",
            //backgroundColor: '#BCA',
            paddingRight: 15,
            paddingLeft: 15,
            display: "none"
          }}
        >
          <Button
            onPress={() => {
              this.changeDateToday();
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "17%",
              //borderColor: BLACK,
              //borderWidth: 1,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
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
                MainStyle.dmSansBold,
                {
                  fontSize: 18,
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }
              ]}
            >
              {_today[this.state.languageIndex]}
            </Text>
          </Button>
          <View
            style={{
              //margin: 15,
              marginTop: 0,
              width: "10%",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              //backgroundColor:"#BCA",
              padding: 15,
              paddingLeft: 0,
              paddingRight: 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 18, color: BLACK }]}
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
              width: "25%",
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
              style={[MainStyle.dmSansBold, { fontSize: 18, color: BLACK }]}
            >
              {startDate}
            </Text>
          </Button>
          <View
            style={{
              //margin: 15,
              marginTop: 0,
              width: "10%",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              //backgroundColor:"#BCA",
              padding: 15,
              paddingLeft: 0,
              paddingRight: 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 18, color: BLACK }]}
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
              width: "25%",
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
              style={[MainStyle.dmSansBold, { fontSize: 18, color: BLACK }]}
            >
              {endDate}
            </Text>
          </Button>
        </View>

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
    if (data.time) {
      time = data.time;
      time = moment(time).format("DD/MM, HH:mm");
    }

    let paymentType = data.paymentType;
    paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    const { selectedData } = this.state;

    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.state.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    const bgColor = [
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      whiteColor
    ];
    const textColor = [
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
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
      <Button
        onPress={() => {
          this.changeSelection(data);
          //this.setState({ selectedData: data });
        }}
        style={[
          ss.box,
          {
            minHeight: 100,
            marginTop: 15,
            padding: 15,
            backgroundColor: bgColor[colorIndex],
            flexDirection: "row",
            justifyContent: "space-between"
          }
        ]}
      >
        <View style={{ width: "25%" }}>
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex] }
            ]}
          >
            {_transaction_id[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {data.transId}
          </Text>
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex], marginTop: 10 }
            ]}
          >
            {_total_price[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {data.payment_total}
          </Text>
        </View>

        <View style={{ width: "25%" }}>
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex] }
            ]}
          >
            {" "}
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {status === "closing" ? "Closing" : " "}
          </Text>
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex], marginTop: 10 }
            ]}
          >
            {_payment_type[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {paymentType}
          </Text>
        </View>

        <View style={{ width: "20%" }}>
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex] }
            ]}
          >
            {_time[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {time}
          </Text>
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex], marginTop: 10 }
            ]}
          >
            {_merchant[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {data.merchantName}
          </Text>
        </View>
      </Button>
    );
  }

  renderHistoryLeftSide() {
    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 0,
            backgroundColor: "#C4C4C4"
            //paddingBottom: 15,
          }
        ]}
      >
        {/* {this.renderSearch()} */}
        <View style={{ margin: 15, flex: 1 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
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
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <View
          style={{
            width: "50%",
            //alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Text
            style={[
              MainStyle.dmSans,
              {
                fontSize: 16,
                color: BLACK,
                marginTop: 10
              }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              {
                fontSize: 12,
                color: BLACK,
                paddingBottom: 0
              }
            ]}
          >
            {detailString}
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              {
                fontSize: 12,
                color: BLACK,
                paddingBottom: 5
              }
            ]}
          >
            {data.sales_type}
          </Text>
        </View>
        <View style={{ width: "20%", alignItems: "center" }}>
          <Text
            style={[
              MainStyle.dmSans,
              {
                fontSize: 16,
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
              MainStyle.dmSans,
              {
                fontSize: 16,
                color: BLACK,
                marginTop: 10,
                paddingBottom: 5
                // borderBottomWidth: 1,
                // borderColor: BLACK,
                //width: '75%'
              }
            ]}
          >
            {total}
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

    return (
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 20,
            marginLeft: 20
          }}
        >
          <View style={{ width: "40%" }}>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  borderBottomWidth: 1,
                  borderColor: BLACK,
                  paddingBottom: 5,
                  width: "75%"
                }
              ]}
            >
              {_transaction_id[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  marginTop: 10,
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
                MainStyle.dmSansBold,
                {
                  marginTop: 10,
                  fontSize: 16,
                  color: BLACK,
                  borderBottomWidth: 1,
                  borderColor: BLACK,
                  paddingBottom: 5,
                  width: "75%"
                }
              ]}
            >
              {_payment_type[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  marginTop: 10,
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
          <View style={{ width: "40%" }}>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  borderBottomWidth: 1,
                  borderColor: BLACK,
                  paddingBottom: 5,
                  width: "75%"
                }
              ]}
            >
              {_receipt_number[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  marginTop: 10,
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
                MainStyle.dmSansBold,
                {
                  marginTop: 10,
                  fontSize: 16,
                  color: BLACK,
                  borderBottomWidth: 1,
                  borderColor: BLACK,
                  paddingBottom: 5,
                  width: "75%"
                }
              ]}
            >
              {_time_date[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  marginTop: 10,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              {time}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderColor: BLACK
          }}
        >
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  marginTop: 10,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              Item
            </Text>
          </View>
          <View style={{ width: "20%", alignItems: "center" }}>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  marginTop: 10,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              Qty
            </Text>
          </View>
          <View style={{ width: "20%", alignItems: "center" }}>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 16,
                  color: BLACK,
                  marginTop: 10,
                  paddingBottom: 5
                  // borderBottomWidth: 1,
                  // borderColor: BLACK,
                  //width: '75%'
                }
              ]}
            >
              Total
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

    if (data.payment_total) {
      grandTotal = data.payment_total;
    }

    return (
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
          borderColor: WHITE,
          borderTopWidth: 1,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15
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
            borderTopWidth: 1,
            borderColor: BLACK,
            alignContent: "center",
            alignItems: "flex-start",
            paddingLeft: 15,
            width: "25%"
          }}
        >
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
          >
            Sub Total :
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
          >
            Total :
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
            style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
          >
            {subTotal}
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
          >
            {grandTotal}
          </Text>
        </View>
      </View>
    );
  }

  renderButtonCommand() {
    const { selectedData } = this.state;
    console.log("selectedData ===> ", selectedData)
    return (
      <View
        style={{
          margin: 20,
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
              padding: 15,
              borderRadius: 15,
              elevation: 3,
              marginLeft: 20
            }
          ]}
        >
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 20, color: WHITE, margin: 5 }
            ]}
          >
            {_send_receipt[this.state.languageIndex]}
          </Text>
        </Button>
        <Button
          onPress={() => {
            this.setState({ refund: true });
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
              padding: 15,
              borderRadius: 15,
              elevation: 3,
              marginRight: 20
            }
          ]}
        >
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 20, color: WHITE, margin: 5 }
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
        <View style={{ flex: 1 }}>
          <View
            style={[
              ss.box,
              {
                backgroundColor: "#EEEEEE",
                flex: 1,
                borderRadius: 5,
                margin: 15
              }
            ]}
          >
            {this.renderHeaderDetail(selectedData)}
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
            {this.renderTotal(selectedData)}
          </View>
          <View>{this.renderButtonCommand()}</View>
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
        <Header
          colorIndex={this.state.colorIndex}
          title={_riwayat_transaksi[this.state.languageIndex]}
          notif={true}
          loginInformation={this.state.userInfo}
          menu={true}
          barStyle={barStyle}
        />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {this.state.showAlert ? (
          <CustomAlert
            colorIndex={this.state.colorIndex}
            message={this.state.alertMessage}
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
            <View style={[ss.leftSide]}>
              {refund
                ? this.renderRefundLeftSide()
                : this.renderHistoryLeftSide()}
            </View>

            <View style={[ss.rightSide]}>
              {refund
                ? this.renderRefundRightSide()
                : this.renderDetailRightSide()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    backgroundColor: "#EEEEEE",
    flex: 1,
    flexDirection: "column"
  },
  mainContent: {
    flexDirection: "row",
    padding: 15,
    paddingLeft: 0,
    flex: 1,
    justifyContent: "space-between"
    //height: '100%' ,
    //backgroundColor: "#995599"
  },
  leftSide: {
    width: "55%",
    marginTop: 0
  },
  rightSide: {
    width: "45%",
    marginTop: 0,
    backgroundColor: "#FFF",
    elevation: 3,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1
  },
  box: {
    elevation: 1,
    borderRadius: 5
  },
  pinButton: {
    borderWidth: 1,
    elevation: 1,
    borderRadius: 10,
    width: 75,
    height: 75,
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
  }
});
