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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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

import Dropdown_V2 from "../../Components/MobileHeaderDropDown";

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
  RefundOrderAPI,
  BE_Transaction,
  BE_CheckPin,
  BE_Staff,
  BE_Outlet,
  BE_Payment_Method,
  BE_TableManagement,
  BE_Customer,
  OneSignal_Customer_App_ID,
  BE_Transaction_Delivery
} from "../../Constants";
import NetInfo from "@react-native-community/netinfo";

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
  _reprint_receipt,
  _refund_stock,
  _title_1,
  _title_2,
  _proses_transaksi,
  _pilih_meja,
  _daftar_booking,
  _daftar_order,
  _detail_booking,
  _detail_order,
  _address,
  _status_pending,
  _status_proses,
  _description_accepted,
  _proses_sukses,
  _proses_gagal,
  _status_delivery_1,
  _status_delivery_2,
  _status_delivery_3,
  _status_delivery_4,
  _status_delivery_5,
  _sub_total,
  _total
} from "../../Libraries/DictionaryHistory";

import moment, { relativeTimeThreshold } from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";
import {
  _masukan_kode,
  _salah_pin,
  _berhasil
} from "../../Libraries/DictionaryAbsen";
import Checkbox from "../../Components/Checkbox";
import { _no_data_1, _no_data_3 } from "../../Libraries/DictionaryRekap";
import DeviceInfo from "react-native-device-info";
import {
  _description,
  _input_description,
  _description_merchant,
  _delivery_detail,
  _pelanggan
} from "../../Libraries/DictionaryHome";
import { _phone } from "../../Libraries/DictionaryManagement";
import { _ok_alert } from "../../Libraries/DictionarySetting";
import {
  _transaksi_berhasil,
  _transaksi_berhasil_batal,
  _transaksi_gagal,
  _transaksi_gagal_batal
} from "../../Libraries/DictionaryPayment";
import { _status, _status_simple } from "../../Libraries/DictionaryDrawer";

export default class MobileOnlineOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes_delivery: "",
      detailDelivery: null,
      showDeliveryDetail: false,
      showDeliveryDescription: false,
      deliveryDescription: 0,
      tablet: DeviceInfo.isTablet(),
      showProcessModal: false,
      showReason: false,
      refund: false,
      showFilter: false,
      filterStatus: 1,
      filterPayment: 0,
      showPin: false,
      action: "pending", //processing
      tax_rate: 0.1,
      service_rate: 0.05,
      subTitle:
        _batalkan_transaksi[
          this.props.languageIndex ? this.props.languageIndex : 0
        ],
      showDetail: false,
      listCustomer: [],
      customer_name: "",
      phone_number: "",
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
      datePickerStart: false,
      datePickerEnd: false,
      selectedReason: 0,
      notes: "",
      notes_merchant: "",
      sendReceipt: false,
      receiptEmail: "",
      printer_main: null,
      printer_kitchen: null,
      listHistory: [],
      page: 1,
      maxPage: 1,
      selectedUser: null,
      auth: this.props.auth ? this.props.auth : "",
      rate_tax: 0,
      rate_services: 0,
      //access
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
      additionalTable: [],
      selectedTable: 0
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

    this.getPrinterData();

    //this.getBEData();
    this.changeDateWeek();
    this.getOutletData();
    this.setPreviliges();
    this.getPaymentMethod();
    this.getDataTable();
    this.getListCustomer();
  }

  oneSignalSendCustomer(customer_id, extra = "") {
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
              this.sendNotif(device_id, extra);
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

  sendNotif(device_id, extra = "") {
    //const uri = `${one_signal_uri}`;

    const uri = "https://onesignal.com/api/v1/notifications";

    const body = {
      app_id: OneSignal_Customer_App_ID,
      //include_player_ids: [device_id, "d696a89e-76b7-4838-a360-665ae0812fd8"],
      include_player_ids: [device_id],
      contents: {
        en: `Transaction ${this.state.selectedData.receipt_id} ${extra}`,
        id: `Transaksi ${this.state.selectedData.receipt_id} ${extra}`
      },
      headings: {
        en: `Transaction ${extra}`,
        id: `Transaksi ${extra}`
      },
      subtitle: { en: `Transaction ${extra}`, id: `Transaksi ${extra}` }
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

  getListCustomer(page = 1) {
    const gerai_id = this.state.userInfo.gerai_id;
    let search_string = "";
    // if (this.state.searchKey !== "") {
    //   search_string = `&name=${this.state.searchKey}`;
    // }
    this.setState({
      //refreshing: false,
      loading: true
      //maxPage: result.last_page
    });

    const uri = `${BE_Customer}?page=${page}&per_page=999${search_string}`;
    console.log("getListCustomer URI ==> ", uri);
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
        //console.log("responseJSON ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          if (page === 1) {
            this.setState({
              listCustomer: resultData,
              maxPage: result.pagination.total_page,
              refreshing: false,
              loading: false
            });
          } else {
            let tempData = this.state.listCustomer;
            let dataCombi = [...tempData, ...resultData];
            //console.log("temp dataCombi ", page, " ==> ", dataCombi);

            this.setState({
              listCustomer: dataCombi,
              //refreshing: false,
              loading: false
              //maxPage: result.pagination.total_page
              //maxPage: result.last_page
            });
          }
        } else {
          this.setState({
            //refreshing: false,
            loading: false
            //maxPage: result.last_page
          });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getDataTable() {
    const { savedTableId } = this.state;
    const gerai_id = this.state.userInfo.gerai_id;
    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=`;

    let uri = `${BE_TableManagement}`;

    //console.log("getDATATABLE uri ==> ", uri);

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
            if (this.state.savedTableId === v.id) {
              selectedTableData = temp;
            }
          } else if (this.state.savedTableId === v.id) {
            finalResult.push(temp);
            selectedTableData = temp;
          }
        });

        //console.log("getDATATABLE finalResult ==> ", finalResult);

        if (finalResult.length > 0) {
          this.setState({
            additionalTable: finalResult
          });
        } else {
          this.setState({
            additionalTable: finalResult
          });
        }

        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
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
        // let result = responseJson;
        // let resultData = result.data;

        //console.log("BE_Payment_Method ==> ", responseJson);
        let result = responseJson;

        if (result.statusCode === 200) {
          let resultData = result.data;
          console.log("Success Payment Method GET");
          this.setState({
            payment_method: resultData
          });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({
          //loading: false
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
    });

    this.setState({ privileges: privileges });
  }

  getOutletData() {
    let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Outlet + outlet_id;
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

        let data_tax = [];

        let tax = 0;
        let services = 0;
        data_tax = responseJson.data.Outlet_Taxes;
        //console.log("DATA TAX ==> ", data_tax);

        data_tax.map((v, i) => {
          console.log("map ", v.Tax);
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

        console.log("tax ===> ", tax);
        console.log("services ===> ", services);

        this.setState({ tax: tax, services: services });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getBEData(start_date = this.state.startDate, action = this.state.action) {
    const {
      userInfo,
      searchKey,
      startDate,
      endDate,
      filterStatus,
      filterPayment
    } = this.state;
    const outlet_id = userInfo.gerai_id;
    const business_id = userInfo.retail_id;

    //const retail_id = userInfo.retail_id;
    const search = searchKey ? searchKey : "";

    this.setState({ action: action });
    let d = start_date;

    // if (!start_date)
    // {
    // var day = d.getDay(),
    //   diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    // var first_day = Date(d.setDate(diff));
    // //d = first_day;
    // }

    // console.log("first day ==> ", d)

    let date_start = moment(d).format("YYYY-MM-DD");

    //const date_start = moment(startDate).format("YYYY-MM-DD");
    let date_end = moment(endDate)
      .add(0, "days")
      .format("YYYY-MM-DD");

    //let uri = `${HistoryOrderAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&search=&page=${page}&search=${search}&type=${filterStatus}&status=${filterPayment}`;

    let status = "";

    // if (filterStatus === 2) {
    //   status = "&status=done";
    // }

    // if (filterStatus === 3) {
    //   status = "&status=refund";
    // }

    status = `&status=${action}`;

    let uri = `${BE_Transaction}?order=newest&business_id=${business_id}&outlet_id=${outlet_id}${status}`;

    //console.log("getlist PENDING BE ==> ", uri);

    this.setState({
      loading: true
    });

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
            const resultData = result;
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );

            const result_all = resultData.data;

            let result_filtered = [];

            //console.log("result_all ===> ", result);

            //console.log("BE GET DATA this.state.auth ==> ", this.state.auth);

            //console.log("BE GET DATA filterPayment ==> ", filterPayment);

            if (result.statusCode === 200) {
              if (filterPayment === 0) {
                result_filtered = result_all;
              } else {
                if (result_all && result_all.length > 0) {
                  result_all.map((v, i) => {
                    const payment_method_id = v.Payment.payment_method_id
                      ? v.Payment.payment_method_id
                      : 0;

                    if (payment_method_id === filterPayment) {
                      result_filtered.push(v);
                    }
                  });
                }
              }

              let result_filtered_final = [];

              result_filtered.map((v, i) => {
                // if (v.status !== "new") {
                //   result_filtered_final.push(v);
                // }

                //console.log("v.Transaction_Tables.length ===> ", result);

                if (v.address !== null) {
                  result_filtered_final.push(v);
                }
              });

              //this.setState({ listHistory: resultData.data, loading: false });
              this.setState({
                listHistory: result_filtered_final,
                loading: false,
                startDate: start_date,
                endDate: date_end
              });
            } else {
              this.setState({
                listHistory: [],
                loading: false,
                startDate: start_date,
                endDate: date_end
              });
            }

            // this.setState({
            //   loading: false,

            // });
            //console.log('new data ==>', JSON.stringify(data))
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

  resetPage() {
    this.setState({
      loading: true,
      refund: false,
      ready: "",
      page: 1,
      maxPage: 1,
      selectedUser: null,
      selectedData: null,
      detailDelivery: null,
      selectedReason: 0,
      notes: "",
      //startDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      //endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      dataBill: []
    });

    this.getBEData();
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

      selectedUser: null,
      selectedReason: 0,
      notes: ""

      //startDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      //endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
    });
    // this.getBEData();
    this.changeDateWeek();
    this.changeSelection(this.state.selectedData, true);
  }

  changeSelection(data, refund_process = false) {
    console.log("changeSelection data ==> ", data);

    const custom_price = 0;

    let temp_custom = {};
    let dataBill = [];

    data.Transaction_Items.map((v, i) => {
      //console.log('v ==> ', v);
      dataBill.push(v);
    });

    //let dataBill = data.Transaction_Items;
    //console.log()

    let refund = false;

    //if (data.status === "processing") {
    this.getDeliveryDetail(data.id);
    //}

    this.setState({
      showDetail: true,
      showPin: false,
      refund: false,
      selectedData: data,
      notes_merchant: data.order_description ? data.order_description : "",
      subTitle: _detail_transaksi[this.state.languageIndex],
      dataBill: dataBill,

      canRefund: refund,
      loading: false
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
      endDate: moment(new Date())
        .add(0, "days")
        .format("YYYY-MM-DD"),
      action: 1
    });

    this.getBEData(moment(d).format("YYYY-MM-DD"));
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

  changeStatusFilter(status) {
    this.setState({ filterStatus: status });
  }
  changePaymentFilter(payment) {
    this.setState({ filterPayment: payment });
  }

  filterAction() {
    this.setState({ showFilter: false });

    this.getBEData();
  }

  renderRefundRightSide() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showPin}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showPin: false });
        }}
      >
        {this.state.loading ? <Loading /> : <View />}
        <View
          style={{
            flex: 0.33,
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
        <View
          style={{
            flex: 0.67,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          <View
            style={{
              flex: 1,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center",
              backgroundColor: "#FFF",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderColor: "#C4C4C4",
              borderWidth: 2
            }}
          >
            {this.renderPinButton()}
          </View>
        </View>
      </Modal>
    );
  }

  renderList(data, i) {
    let time = "";

    const status = data.status;
    //console.log("renderList ===> ", data);

    if (data.createdAt) {
      time = data.createdAt;
      time = moment(time).format("DD/MM, HH:mm");
    }

    // if (data.Transaction_Tables.length > 0) {
    if (data.address === null) {
      time = data.Transaction_Tables[0].time_in
        ? data.Transaction_Tables[0].time_in
        : data.createdAt;
      time = moment(time).format("DD/MM, HH:mm");
    }

    // let paymentType = data.paymentType;
    // paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    //let paymentType = data.Payment ? data.Payment.Payment_Method.name : "";

    const { selectedData } = this.state;

    let whiteColor = WHITE;
    let blackColor = BLACK;

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

    let total = 0;

    const show = true;

    let customer_name = "";

    let phone_number = "";

    if (this.state.listCustomer.length > 0) {
      this.state.listCustomer.map((v, i) => {
        if (v.id === data.customer_id) {
          customer_name = v.name;
          phone_number = v.phone_number;
        }
      });
    }
    if (show) {
      return (
        <View
          style={{
            marginBottom: 15,
            width: this.state.tablet ? "49%" : "100%"
          }}
        >
          <Button
            onPress={() => {
              this.changeSelection(data);
              this.setState({
                customer_name: customer_name,
                phone_number: phone_number
              });
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
                  {data.receipt_id}
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
              <View style={{ width: "49%", alignItems: "flex-start" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 11, color: textColor[colorIndex] }
                  ]}
                >
                  {_pelanggan[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 10, color: textColor[colorIndex] }
                  ]}
                >
                  {customer_name === "" ? "-" : customer_name}
                </Text>
              </View>
              <View style={{ width: "49%", alignItems: "flex-end" }}>
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
                  {this.state.userInfo.gerai_name}
                </Text>
              </View>
            </View>
          </Button>
        </View>
      );
    }
  }

  renderStatus() {
    const { action } = this.state;
    return (
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
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.getBEData(this.state.startDate, "pending");
          }}
          style={{
            //margin: 15,
            marginTop: 0,
            width: "49%",
            //borderColor: BLACK,
            //borderWidth: 1,
            //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderRadius: 10,
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
            padding: 10,
            paddingBottom: this.state.action === "pending" ? 5 : 10,
            borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderBottomWidth: this.state.action === "pending" ? 5 : 0
            //alignItems: 'center',
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 10,
                color:
                  this.state.action === "pending"
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : BLACK
              }
            ]}
          >
            {_status_pending[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.getBEData(this.state.startDate, "processing");
          }}
          style={{
            //margin: 15,
            marginTop: 0,
            width: "49%",
            //borderColor: BLACK,
            //borderWidth: 1,
            //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderRadius: 10,
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
            padding: 10,
            paddingBottom: this.state.action === "processing" ? 5 : 10,
            borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderBottomWidth: this.state.action === "processing" ? 5 : 0
            //alignItems: 'center',
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 10,
                color:
                  this.state.action === "processing"
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : BLACK
              }
            ]}
          >
            {_status_proses[this.state.languageIndex]}
          </Text>
        </Button>
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
        {/* {this.renderSearch()} */}
        {this.renderStatus()}
        <View style={{ margin: 15, flex: 1 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {/* <GestureRecognizer */}
            <View
              // onSwipeLeft={() => {
              //   LayoutAnimation.configureNext(
              //     LayoutAnimation.Presets.easeInEaseOut
              //   );
              //   //alert("left");
              //   if (action < 3) {
              //     if (action === 0) {
              //       this.changeDateWeek();
              //     } else if (action === 1) {
              //       this.changeDateMonth();
              //     } else if (action === 2) {
              //       this.changeDateYear();
              //     }
              //   }
              // }}
              // onSwipeRight={() => {
              //   LayoutAnimation.configureNext(
              //     LayoutAnimation.Presets.easeInEaseOut
              //   );
              //   if (action > 0) {
              //     if (action === 3) {
              //       this.changeDateMonth();
              //     } else if (action === 2) {
              //       this.changeDateWeek();
              //     } else if (action === 1) {
              //       this.changeDateToday();
              //     }
              //   }
              // }}
              // config={{
              //   velocityThreshold: 0.3,
              //   directionalOffsetThreshold: 80
              // }}
              style={{
                flex: 1
              }}
            >
              {/* HISTORY */}
              {this.state.listHistory && this.state.listHistory.length > 0 ? (
                this.state.tablet ? (
                  <FlatList
                    columnWrapperStyle={{
                      justifyContent: "space-between",
                      marginBottom: 5
                    }}
                    numColumns={2}
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
                ) : (
                  <FlatList
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
                )
              ) : (
                this.renderNoData()
              )}
            {/* </GestureRecognizer> */}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  renderNoData() {
    return (
      <View
        style={{
          flex: 1,
          //backgroundColor: "#BCA",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 15
        }}
      >
        <View
          style={{
            //width: 125,
            //height: 125,
            borderRadius: 999,
            //backgroundColor: "#C4C4C4",
            marginRight: 20,
            //borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 20,
            //zIndex: 2,
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MaterialIcons
            style={{
              color: WHITE,
              width: 125,
              height: 125,
              backgroundColor: "#C4C4C4",
              zIndex: 1,
              borderRadius: 999
            }}
            name="people"
            size={125}
            //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
            //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          />
          <View
            style={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: 999,
              borderColor: "#C4C4C4",
              borderWidth: 10,
              backgroundColor: "transparent",
              zIndex: 2
            }}
          />
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

  renderDataDetail(data, i) {
    //console.log("render Data Detail ==> ", data);

    let custom_tag = false;
    if (data.id === 0) {
      custom_tag = true;
    }

    if (!custom_tag) {
      let total = data.price_total;

      let detail = data.Transaction_Item_Addons
        ? data.Transaction_Item_Addons
        : null;
      let detailString = "";

      let notes = "";

      if (data.notes) {
        notes = data.notes;
      }

      //console.log("data.detail ===> ", detail);

      detail.map((items, itemIndex) => {
        let addons_name = items.Addon ? items.Addon.name : "";
        if (detailString === "") {
          detailString = addons_name;
        } else {
          detailString = detailString + ", " + addons_name;
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
              {data.Product.name}
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
            {/* <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 10,
                  color: BLACK,
                  paddingBottom: 0
                }
              ]}
            >
              {data.Sales_Type.name}
            </Text> */}

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
              {data.quantity}
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
    } else {
      let total = data.price_total;

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
              Custom Price
            </Text>
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
              {data.quantity}
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
  }

  getDeliveryDetail(transaction_id) {
    let uri = `${BE_Transaction_Delivery}?transaction_id=${transaction_id}`;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.statusCode === 200) {
          console.log("getDeliveryDetail ===> ", responseJson.data[0]);
          console.log("uri ===> ", uri);

          this.setState({ detailDelivery: responseJson.data[0] });
        } else {
          this.setState({ detailDelivery: null });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  renderHeaderDetail(data) {
    //console.log("renderHeaderDetail data ==> ", data);

    let time = "";
    if (data.createdAt) {
      time = data.createdAt;
      time = moment(time).format("DD/MM/YYYY, HH:mm");
    }

    //if (data.Transaction_Tables) {
    if (data.address === null) {
      time = data.Transaction_Tables[0].time_in
        ? data.Transaction_Tables[0].time_in
        : data.createdAt;
      time = moment(time).format("DD/MM, HH:mm");
    }

    const status = data.status;

    if (status === "processing") {
      //this.getDeliveryDetail(data.id);
    }

    let payment = data.Payment ? data.Payment : null;

    //let paymentType = payment ? payment.Payment_Method.name : "";

    //paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    //console.log("renderHeaderDetail ==> ", data);

    const total_bayar = payment ? payment.amount : 0;
    const grand_total = payment ? payment.payment_total : 0;

    const status_color = [
      "#000000",
      "#BA1818",
      "#BA1818",
      "#37A441",
      "#C4C4C4"
    ];
    let status_index = 0;

    let status_text = "";

    return (
      <View style={{ marginTop: 0 }}>
        {this.state.showDeliveryDetail ? this.renderDeliveryDetail() : <View />}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 0,
            marginLeft: 0,
            width: this.state.tablet ? "75%" : "100%",
            alignSelf: "center",
            paddingBottom: 10
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
              {data.receipt_id}
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
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 0,
            marginLeft: 0,
            width: this.state.tablet ? "75%" : "100%",
            alignSelf: "center",
            paddingBottom: 10
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
              {_pelanggan[this.state.languageIndex]}:
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
              {this.state.customer_name === "" ? "-" : this.state.customer_name}
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
              {_phone[this.state.languageIndex]}
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
              {this.state.phone_number === "" ? "-" : this.state.phone_number}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 0,
            marginLeft: 0,
            width: this.state.tablet ? "75%" : "100%",
            alignSelf: "center",
            paddingBottom: 10
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
              {_description[this.state.languageIndex]}:
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
              {data.description}
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
              {_address[this.state.languageIndex]}:
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
              {data.address ? data.address : ""}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 0,
            marginLeft: 0,
            width: this.state.tablet ? "75%" : "100%",
            alignSelf: "center",
            paddingBottom: 10
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
              {_description_merchant[this.state.languageIndex]}:
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
              {data.order_description}
            </Text>
          </View>
          <Button
            style={{
              width: "50%",
              borderRadius: 15,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              //display: status === "processing" ? "flex" : "none"
              display: this.state.detailDelivery ? "flex" : "none"
            }}
            onPress={() => {
              this.toogleDeliveryDetail(true);
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  //borderBottomWidth: 1,
                  //paddingBottom: 5,
                  //width: "75%"
                }
              ]}
            >
              {_delivery_detail[this.state.languageIndex]}
            </Text>
          </Button>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 0,
            marginLeft: 0,
            width: this.state.tablet ? "75%" : "100%",
            alignSelf: "center",
            paddingBottom: 10,
            display: "none"
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
              {_address[this.state.languageIndex]}:
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
              {data.address ? data.address : ""}
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
            />
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
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingTop: 10,
            borderColor: "#DADADA",
            width: this.state.tablet ? "75%" : "100%",
            alignSelf: "center"
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

  toogleDeliveryDetail(value) {
    this.setState({ showDeliveryDetail: value });
  }

  processDeliveryDetail() {
    const time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let value = this.state.notes_delivery;

    const { detailDelivery } = this.state;

    const status = detailDelivery.status;

    let next_status = "";

    //accepted = 0
    //packed = 1
    //sent = 2
    //received = 3
    //cancelled = 4

    let deliveryDescription = 0;

    if (status === "accepted") {
      deliveryDescription = 1;
      next_status = "packed";
    }

    if (status === "packed") {
      deliveryDescription = 2;
      next_status = "sent";
    }

    // if (status === "sent") {
    //   deliveryDescription = 3;
    // }

    if (status === "received") {
      //deliveryDescription = ;
    }

    if (status === "cancelled") {
      //deliveryDescription = 0;
    }

    let body = {};

    // if (deliveryDescription === 0) {
    //   body.description_accepted = value;
    //   body.time_accepted = time;
    // }
    if (deliveryDescription === 1) {
      body.description_packed = value;
      body.time_packed = time;
      body.status = next_status;
    }
    if (deliveryDescription === 2) {
      body.description_sent = value;
      body.time_sent = time;
      body.status = next_status;
    }
    // if (deliveryDescription === 3) {
    //   body.description_received = value;
    //   body.time_received = time;
    // }
    // if (deliveryDescription === 4) {
    //   body.description_cancelled = value;
    //   body.time_cancelled = time;
    // }

    console.log("Body ===> ", body);

    const id = detailDelivery.id;
    let uri = `${BE_Transaction_Delivery}/${id}`;
    //this.setState({ showDeliveryDescription: false, notes_delivery: ""});
    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJSON ===> ", responseJson);

        if (responseJson.statusCode === 201) {
          this.getDeliveryDetail(detailDelivery.transaction_id);
          //alert(_proses_sukses[this.state.languageIndex]);
          this.setState({ showDeliveryDescription: false, notes_delivery: "" });
        } else {
          //alert(_proses_gagal[this.state.languageIndex]);
          this.setState({ showDeliveryDescription: false, notes_delivery: "" });
        }
      });
  }

  renderDeliveryDetail() {
    //deliveryDescription: 0

    //   {
    //     "status": "sent",
    //     "time_accepted": "2021-02-09 16:30",
    //     "description_accepted": "Pesanan diterima", 0
    //     "time_packed": "2021-02-09 16:45",
    //     "description_packed": "Pesanan siap dikirim", 1
    //     "description_sent": "Sedang dikirim kurir GoSend", 2
    //     "time_sent": "2021-02-09 17:05",
    //     "time_received": "2021-02-09 17:15",
    //     "description_received": "Pesanan diterima oleh Bambang", 3
    //     "time_cancelled": null,
    //     "description_cancelled": null 4
    // }

    const { detailDelivery } = this.state;

    console.log("Detail Delivery ===> ", detailDelivery);

    const payment_image = detailDelivery ? detailDelivery.payment_image : null;

    const description_accepted = detailDelivery
      ? detailDelivery.description_accepted
      : null;
    const description_cancelled = detailDelivery
      ? detailDelivery.description_cancelled
      : null;
    const description_packed = detailDelivery
      ? detailDelivery.description_packed
      : null;
    const description_received = detailDelivery
      ? detailDelivery.description_received
      : null;
    const description_sent = detailDelivery
      ? detailDelivery.description_sent
      : null;

    const status = detailDelivery
      ? detailDelivery.status.charAt(0).toUpperCase() +
        detailDelivery.status.slice(1)
      : null;

    const time_accepted = detailDelivery ? detailDelivery.time_accepted : null;
    const time_cancelled = detailDelivery
      ? detailDelivery.time_cancelled
      : null;
    const time_packed = detailDelivery ? detailDelivery.time_packed : null;
    const time_received = detailDelivery ? detailDelivery.time_received : null;
    const time_sent = detailDelivery ? detailDelivery.time_sent : null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showDeliveryDetail}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showDeliveryDetail: false });
        }}
      >
        {this.state.loading ? <Loading /> : <View />}
        {this.renderDeliveryDescription()}
        <View
          style={{
            flex: 0.33,
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
        <View
          style={{
            flex: 0.67,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          <View
            style={{
              flex: 1,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center",
              backgroundColor: "#FFF",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            }}
          >
            <ScrollView>
              <View
                style={{
                  margin: 15
                }}
              >
                <View
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderColor: "#C4C4C4"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 20,
                        color: BLACK,
                        textAlign: "center"
                      }
                    ]}
                  >
                    {_delivery_detail[this.state.languageIndex]}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    display: description_accepted ? "flex" : "none"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {_status_simple[this.state.languageIndex]}
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {status}
                  </Text>
                </View>
                {payment_image ? (
                  <View
                    style={{
                      marginTop: 10,
                      width: "100%",
                      height: 300,
                      display: payment_image ? "flex" : "none"
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%"
                        //backgroundColor: "#ABC"
                      }}
                      resizeMode={"stretch"}
                      source={{
                        uri: `data:image/png;base64,${payment_image}`
                      }}
                    />
                  </View>
                ) : (
                  <View />
                )}

                <View
                  style={{
                    marginTop: 10,
                    display: description_accepted ? "flex" : "none"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 14,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {_status_delivery_1[this.state.languageIndex]}
                  </Text>

                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {moment(time_accepted).format("YYYY-MM-DD HH:mm:ss")}
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {description_accepted}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    display: description_packed ? "flex" : "none"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 14,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {_status_delivery_2[this.state.languageIndex]}
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {moment(time_packed).format("YYYY-MM-DD HH:mm:ss")}
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {description_packed}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    display: description_sent ? "flex" : "none"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 14,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {_status_delivery_3[this.state.languageIndex]}
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {moment(time_sent).format("YYYY-MM-DD HH:mm:ss")}
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {description_sent}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    display: description_received ? "flex" : "none"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 14,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {_status_delivery_4[this.state.languageIndex]}
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {moment(time_received).format("YYYY-MM-DD HH:mm:ss")}
                  </Text>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        marginTop: 0,
                        fontSize: 12,
                        color: BLACK
                        //textAlign: "center"
                      }
                    ]}
                  >
                    {description_received}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              width: "100%",
              backgroundColor: WHITE,
              justifyContent: "flex-end",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                //backgroundColor:"#BCA",
                justifyContent: "space-between"
              }}
            >
              <Button
                onPress={() => {
                  //alert("Show Pin Press");
                  //this.batalkanTransaksi();
                  //this.setState({ showPin: true });
                  this.setState({
                    showDeliveryDetail: false
                  });
                }}
                style={[
                  ss.box,
                  {
                    margin: 15,
                    width: "45%",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    elevation: 1,

                    //borderWidth: 1,
                    borderColor: BLACK,
                    backgroundColor: "rgba(185, 60, 60, 0.9)"
                    //backgroundColor: bgcolor[0]
                  }
                ]}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      color: WHITE,
                      fontSize: 12
                    }
                  ]}
                >
                  {_cancel[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                onPress={() => {
                  //alert("Show Pin Press");
                  //this.batalkanTransaksi();
                  //this.prosesTransaksi();
                  //this.processDineIn();
                  //this.processTransaksiProcessing();
                  this.setState({ showDeliveryDescription: true });
                }}
                style={[
                  ss.box,
                  {
                    margin: 15,
                    width: this.state.tablet ? "45%" : "45%",
                    display:
                      this.state.selectedData.status === "processing" &&
                      (status === "Accepted" || status === "Packed")
                        ? "flex"
                        : "none",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    elevation: 1,

                    //borderWidth: 1,
                    borderColor: BLACK,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    )
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
                  {_proses_transaksi[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderDeliveryDescription() {
    const { detailDelivery } = this.state;

    let next_status = "";

    const status = detailDelivery.status;

    if (status === "accepted") {
      next_status = _status_delivery_2[this.state.languageIndex];
    }

    if (status === "packed") {
      next_status = _status_delivery_3[this.state.languageIndex];
    }
    if (status === "sent") {
      next_status = _status_delivery_3[this.state.languageIndex];
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showDeliveryDescription}
        onRequestClose={() => {
          this.setState({ showDeliveryDescription: false });
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              width: this.state.tablet ? "75%" : "100%",
              flex: 0.4,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingTop: 15,
              paddingRight: 15,
              paddingLeft: 15
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 14, color: BLACK, margin: 0, marginBottom: 5 }
              ]}
            >
              {_input_description[this.state.languageIndex]} {next_status}
            </Text>
            <View style={{ flex: 1 }}>
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
                      this._notes_delivery = q;
                    }}
                    onSubmitEditing={() => {
                      //this.getData(this.state.notes);
                      // this.setState({viewSearch: false});
                    }}
                    //onChangeText={(q)=>this._accountUpdate('username',q)}
                    onChangeText={v => this.setState({ notes_delivery: v })}
                    value={this.state.notes_delivery}
                    //placeholder={_tulis_alasan[this.state.languageIndex]}
                  />
                </ScrollView>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                //flex: 0.3,
                //height: 100,
                //backgroundColor:"#BCA",
                justifyContent: "flex-end",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  //backgroundColor:"#BCA",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    //alert("Show Pin Press");
                    //this.batalkanTransaksi();
                    //this.setState({ showPin: true });
                    this.setState({
                      showDeliveryDescription: false
                      //selectedTable: 0
                    });
                  }}
                  style={[
                    ss.box,
                    {
                      margin: 15,
                      width: this.state.notes_delivery === "" ? "100%" : "45%",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      elevation: 1,

                      //borderWidth: 1,
                      borderColor: BLACK,
                      backgroundColor: "rgba(185, 60, 60, 0.9)"
                      //backgroundColor: bgcolor[0]
                    }
                  ]}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        color: WHITE,
                        fontSize: 12
                      }
                    ]}
                  >
                    {_cancel[this.state.languageIndex]}
                  </Text>
                </Button>

                <Button
                  onPress={() => {
                    //alert("Show Pin Press");
                    //this.batalkanTransaksi();
                    //this.prosesTransaksi();
                    //this.processDineIn();
                    this.processDeliveryDetail();
                  }}
                  style={[
                    ss.box,
                    {
                      margin: 15,
                      width: this.state.tablet ? "45%" : "45%",
                      display:
                        this.state.notes_delivery === "" ? "none" : "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      elevation: 1,

                      //borderWidth: 1,
                      borderColor: BLACK,
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      )
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
                    {_enter[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderTotal(data) {
    //console.log("render Total ", data);
    const { dataBill } = this.state;

    //console.log("render Total data ", data);

    //console.log("render Total dataBill ", dataBill);

    let payment = data.Payment ? data.Payment : null;

    let subTotal = 0;

    dataBill.map((v, i) => {
      subTotal = subTotal + v.price_total;
    });

    let grandTotal = 0;

    let tax = 0;
    let service = 0;

    grandTotal = payment ? payment.payment_total : 0;
    tax = payment ? payment.payment_tax : 0;
    service = payment ? payment.payment_service : 0;

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
            {this.idrNumToStr(parseInt(tax))}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {this.idrNumToStr(parseInt(service))}
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
          justifyContent: "space-evenly",
          flexDirection: "row",
          //backgroundColor:"#BCA",
          width: "100%"
        }}
      >
        <Button
          onPress={() => {
            // LayoutAnimation.configureNext(
            //   LayoutAnimation.Presets.easeInEaseOut
            // );

            this.setState({ showReason: true, notes: "" });
            //this.batalkanTransaksi();
          }}
          style={[
            ss.box,
            {
              backgroundColor: "rgba(185, 60, 60, 0.9)",
              width: "45%",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              borderRadius: 15,
              elevation: 3
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 9, color: WHITE, margin: 5 }
            ]}
          >
            {_batalkan_transaksi[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          onPress={() => {
            //this.openReceipt();
            //this.prosesTransaksi();
            if (this.state.selectedData.status === "pending") {
              this.processTransaksiPending();
            } else {
              //this.processTransaksiProcessing();
              this.prosesTransaksi();
            }
            //alert("ASD")
          }}
          style={[
            ss.box,
            {
              backgroundColor: "#72B9E1",
              width: "45%",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              borderRadius: 15,
              elevation: 3
              //marginLeft: 20
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 9, color: WHITE, margin: 5 }
            ]}
          >
            {_proses_transaksi[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  prosesTransaksi() {
    this.setState({ showProcessModal: true });
  }

  updateTransaksiProcessing() {
    let transaction_id = this.state.selectedData.id
      ? this.state.selectedData.id
      : 0;

    let outlet_id = this.state.userInfo.gerai_id;
    let uri = `${BE_Transaction}/${transaction_id}`;

    fetch(uri, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        status: "processing",
        outlet_id: outlet_id,
        order_description: this.state.notes_merchant
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("Response Dine In Transaksi ==> ", responseJson);
        let result = responseJson;

        if (result.statusCode === 200) {
          alert(_transaksi_berhasil[this.state.languageIndex]);
          this.setState({ showProcessModal: false });

          let customer_id = this.state.selectedData.customer_id
            ? this.state.selectedData.customer_id
            : 0;

          if (customer_id !== 0) {
            this.oneSignalSendCustomer(
              customer_id,
              `Diproses. Catatan: ${this.state.notes_merchant}`
            );
          }

          this.getBEData();
        } else {
          alert(_transaksi_gagal[this.state.languageIndex]);
          this.setState({ showProcessModal: false });
          this.getBEData();
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  processTransaksiProcessing() {
    const { userInfo, selectedData } = this.state;

    let transaction_id = this.state.selectedData.id
      ? this.state.selectedData.id
      : 0;

    let outlet_id = this.state.userInfo.gerai_id;
    let uri = `${BE_Transaction}/${transaction_id}`;

    fetch(uri, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        status: "processing",
        outlet_id: outlet_id,
        order_description: this.state.notes_merchant
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("Response Dine In Transaksi ==> ", responseJson);
        let result = responseJson;

        if (result.statusCode === 200) {
          let customer_id = this.state.selectedData.customer_id
            ? this.state.selectedData.customer_id
            : 0;

          if (customer_id !== 0) {
            this.oneSignalSendCustomer(
              customer_id,
              `Diproses. Catatan: ${this.state.notes_merchant}`
            );
          }

          //this.setState({ showDetail: false, showProcessModal: false });
          //this.getBEData();
        } else {
          //this.setState({ showDetail: false, showProcessModal: false });
          //this.getBEData();
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });

    console.log("PROSES TRANSAKSI PROCESSING");
    //const selectedTable = { id: 0, name: "No Available Table" }

    // let transaction_id = this.state.selectedData.id
    //   ? this.state.selectedData.id
    //   : 0;

    let detail = this.state.selectedData.Transaction_Items;

    let subTotal = 0;
    let totalQty = 0;

    let items = [];
    console.log("detail ==> ", detail);
    detail.map((v, i) => {
      let addons = [];
      v.Transaction_Item_Addons.map((val, index) => {
        //const contoh_data = {id: 6, name: "Sosis", price: 2000, parentId: 3}

        let addons_data_temp = {
          id: val.id,
          price: val.price_addons
        };
        addons.push(addons_data_temp);
      });

      console.log("v.detail ==> ", v);

      let temp_data = {
        sales_type_id: v.salesType,
        product_id: v.product_id,
        quantity: v.quantity,
        price_product: v.price_product,
        price_discount: 0,
        price_service: v.salesTypeValue, //butuh diupdate lg nanti
        price_addons_total: v.price_addons_total,
        // price_total: (v.product.price * v.qty) + (v.salesTypeValue * v.qty) + ((v.price - v.product.price) * v.qty),
        // price_total:
        //   (v.product.price + v.salesTypeValue + (v.price - v.product.price)) *
        //   v.qty,
        price_total: parseInt(v.price_total),
        notes: v.notes,
        addons: addons
      };

      totalQty = totalQty + v.quantity;
      subTotal = subTotal + v.price_total;
      items.push(temp_data);
    });

    const total_add = 1;

    const dataOrder = {
      additional_table: "0",
      booking_id: "",
      cashier_id: userInfo.id,
      retail_id: userInfo.retail_id,
      gerai_id: userInfo.gerai_id,
      created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      created_by: null,
      customer_id: this.state.customer_id,
      deleted_at: null,
      id: transaction_id,
      notes: selectedData.receipt_id,
      payment_id: "0",
      status: selectedData.status,
      table_id: 0,
      time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      time_out: null,
      total_payment: Math.ceil(subTotal * total_add),
      total_qty: totalQty,
      transaction_id: transaction_id,
      update_by: null,
      updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    };

    const payment_props = {
      auth: this.state.auth,
      orderId: this.state.selectedData.id,
      //dataOrder: result_order_offline,
      dataOrder: dataOrder,
      //dataBill: dataBill,
      dataBill: this.state.selectedData.Transaction_Items,
      userInfo: this.state.userInfo,
      colorIndex: this.state.colorIndex,
      selectedTable: this.state.selectedTable,
      languageIndex: this.state.languageIndex,
      //items: items,
      tax: this.state.tax,
      services: this.state.services,
      print_kitchen: false,
      customer_id: this.state.selectedData.customer_id
    };

    console.log("payment_props ===> ", payment_props);

    this.setState({ showDetail: false, showProcessModal: false });

    Actions.MobileBayar({
      disable_promo: true,
      auth: this.state.auth,
      orderId: this.state.selectedData.id,
      //dataOrder: result_order_offline,
      dataOrder: dataOrder,
      //dataBill: dataBill,
      dataBill: this.state.selectedData.Transaction_Items,
      userInfo: this.state.userInfo,
      colorIndex: this.state.colorIndex,
      selectedTable: this.state.selectedTable,
      languageIndex: this.state.languageIndex,
      //items: items,
      tax: this.state.tax,
      services: this.state.services,
      print_kitchen: false,
      customer_id: this.state.selectedData.customer_id
      //customer_id: this.state.customer_id, checkout new
    });
    // Actions.MobileBayar({
    //   auth: this.state.auth,
    //   orderId: transaction_id,
    //   dataOrder: result_order_offline,
    //   dataBill: dataBill,
    //   userInfo: this.state.userInfo,
    //   colorIndex: this.state.colorIndex,
    //   selectedTable: this.state.selectedTable,
    //   languageIndex: this.state.languageIndex,
    //   items: items,
    //   tax: this.state.tax,
    //   services: this.state.services,
    //   //customer_id: this.state.customer_id, checkout new
    // });
  }

  newTransactionDetail(transaction_id) {
    // let uri = `${BE_Transaction_Delivery}/${transaction_id}`;
    let uri = `${BE_Transaction_Delivery}`;

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        transaction_id: transaction_id,
        status: "accepted",
        description_accepted: _description_accepted[this.state.languageIndex]
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("transaction DELIVERY responseJson ===> ", responseJson);

        if (responseJson.statusCode === 201) {
          console.log("sukses transaction delivery");
        }
      });
  }

  processTransaksiPending() {
    //   let dataOrder = {};

    //   const data_post_1 = {
    //     retail_id: dataOrder.retail_id,
    //     gerai_id: dataOrder.gerai_id,
    //     time: dataOrder.created_at,
    //     booking_id: dataOrder.booking_id,
    //     customer_id: dataOrder.customer_id,
    //     table_id: dataOrder.table_id,
    //     cashier_id: dataOrder.cashier_id,
    //     detail: dataBill,
    //     kode: dataOrder.notes
    //   };

    // Actions.MobileBayar({
    //   auth: this.state.auth,
    //   orderId: transaction_id,
    //   dataOrder: result_order_offline,
    //   dataBill: dataBill,
    //   userInfo: this.state.userInfo,
    //   colorIndex: this.state.colorIndex,
    //   selectedTable: this.state.selectedTable,
    //   languageIndex: this.state.languageIndex,
    //   items: items,
    //   tax: this.state.tax,
    //   services: this.state.services,
    //   //customer_id: this.state.customer_id, checkout new
    // });

    let transaction_id = this.state.selectedData.id
      ? this.state.selectedData.id
      : 0;

    let outlet_id = this.state.userInfo.gerai_id;
    let uri = `${BE_Transaction}/${transaction_id}`;

    fetch(uri, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        status: "processing",
        outlet_id: outlet_id,
        description:
          this.state.selectedData.description +
          " Update: Diproses Lebih Lanjut."
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("Response Dine In Transaksi ==> ", responseJson);
        let result = responseJson;

        if (result.statusCode === 200) {
          alert(_transaksi_berhasil[this.state.languageIndex]);

          if (!this.state.detailDelivery) {
            this.newTransactionDetail(transaction_id);
          }

          this.setState({ showDetail: false, showProcessModal: false });
          this.getBEData();
        } else {
          alert(_transaksi_gagal[this.state.languageIndex]);
          this.setState({ showDetail: false, showProcessModal: false });
          this.getBEData();
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  batalkanTransaksi() {
    //alert(this.state.selectedData.id)/

    let outlet_id = this.state.userInfo.gerai_id;

    let transaction_id = this.state.selectedData.id
      ? this.state.selectedData.id
      : 0;
    let uri = `${BE_Transaction}/${transaction_id}`;
    fetch(uri, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        status: "cancelled",
        notes: this.state.notes,
        outlet_id: outlet_id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("Response Batalkan Transaksi ==> ", responseJson);
        let result = responseJson;

        if (result.statusCode === 200) {
          alert(_transaksi_berhasil_batal[this.state.languageIndex]);
          this.setState({ showDetail: false, showReason: false });
          let customer_id = this.state.selectedData.customer_id
            ? this.state.selectedData.customer_id
            : 0;

          if (customer_id !== 0) {
            this.oneSignalSendCustomer(
              customer_id,
              `Cancelled. Reason: ${this.state.notes}`
            );
          }

          this.getBEData();
        } else {
          alert(_transaksi_gagal_batal[this.state.languageIndex]);
          this.setState({ showDetail: false, showReason: false });
          this.getBEData();
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  renderModalProcessTransaction() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showProcessModal}
        onRequestClose={() => {
          this.setState({ showProcessModal: false, selectedTable: 0 });
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              width: this.state.tablet ? "75%" : "100%",
              flex: 0.4,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingTop: 15,
              paddingRight: 15,
              paddingLeft: 15
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 14, color: BLACK, margin: 0, marginBottom: 5 }
              ]}
            >
              {_input_description[this.state.languageIndex]}
            </Text>
            <View style={{ flex: 1 }}>
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
                      this._notes_merchant = q;
                    }}
                    onSubmitEditing={() => {
                      //this.getData(this.state.notes);
                      // this.setState({viewSearch: false});
                    }}
                    //onChangeText={(q)=>this._accountUpdate('username',q)}
                    onChangeText={v => this.setState({ notes_merchant: v })}
                    value={this.state.notes_merchant}
                    //placeholder={_tulis_alasan[this.state.languageIndex]}
                  />
                </ScrollView>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                //flex: 0.3,
                //height: 100,
                //backgroundColor:"#BCA",
                justifyContent: "flex-end",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  //backgroundColor:"#BCA",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    //alert("Show Pin Press");
                    //this.batalkanTransaksi();
                    //this.setState({ showPin: true });
                    this.setState({
                      showProcessModal: false,
                      selectedTable: 0
                    });
                  }}
                  style={[
                    ss.box,
                    {
                      margin: 15,
                      width: this.state.notes_merchant === "" ? "100%" : "30%",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      elevation: 1,

                      //borderWidth: 1,
                      borderColor: BLACK,
                      backgroundColor: "rgba(185, 60, 60, 0.9)"
                      //backgroundColor: bgcolor[0]
                    }
                  ]}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        color: WHITE,
                        fontSize: 12
                      }
                    ]}
                  >
                    {_cancel[this.state.languageIndex]}
                  </Text>
                </Button>

                <Button
                  onPress={() => {
                    //alert("Show Pin Press");
                    //this.batalkanTransaksi();
                    //this.prosesTransaksi();
                    //this.processDineIn();
                    this.updateTransaksiProcessing();
                  }}
                  style={[
                    ss.box,
                    {
                      margin: 15,
                      width: this.state.tablet ? "30%" : "30%",
                      display:
                        this.state.notes_merchant === "" ? "none" : "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      elevation: 1,

                      //borderWidth: 1,
                      borderColor: BLACK,
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      )
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

                <Button
                  onPress={() => {
                    //alert("Show Pin Press");
                    //this.batalkanTransaksi();
                    //this.prosesTransaksi();
                    //this.processDineIn();
                    this.processTransaksiProcessing();
                  }}
                  style={[
                    ss.box,
                    {
                      margin: 15,
                      width: this.state.tablet ? "30%" : "30%",
                      display:
                        this.state.notes_merchant === "" ? "none" : "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      elevation: 1,

                      //borderWidth: 1,
                      borderColor: BLACK,
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      )
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
                    {_enter[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderListTable(data, index) {
    const backgroundColor =
      this.state.selectedTable === data.id
        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
        : WHITE;
    const textColor =
      this.state.selectedTable === data.id
        ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
        : BLACK;

    console.log("data meja ===> ", data);
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
            selectedTable: data.id
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
          Capacity: {data.capacity}
        </Text>
      </Button>
    );
  }

  renderModalReason() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showReason}
        onRequestClose={() => {
          this.setState({ showReason: false });
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              width: this.state.tablet ? "75%" : "100%",
              flex: 0.4,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingTop: 15,
              paddingRight: 15,
              paddingLeft: 15
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 14, color: BLACK, margin: 0 }
              ]}
            >
              {_tulis_alasan[this.state.languageIndex]}
            </Text>
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
                  //placeholder={_tulis_alasan[this.state.languageIndex]}
                />
              </ScrollView>
            </View>

            <View
              style={{
                width: "100%",
                flex: 1,
                //backgroundColor:"#BCA",
                justifyContent: "flex-end",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  //backgroundColor:"#BCA",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    //alert("Show Pin Press");
                    //this.batalkanTransaksi();
                    //this.setState({ showPin: true });
                    this.setState({ showReason: false });
                  }}
                  style={[
                    ss.box,
                    {
                      margin: 15,
                      width: this.state.tablet ? "45%" : "45%",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      elevation: 1,

                      //borderWidth: 1,
                      borderColor: BLACK,
                      backgroundColor: "rgba(185, 60, 60, 0.9)"
                      //backgroundColor: bgcolor[0]
                    }
                  ]}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        color: WHITE,
                        fontSize: 12
                      }
                    ]}
                  >
                    {_cancel[this.state.languageIndex]}
                  </Text>
                </Button>

                <Button
                  onPress={() => {
                    //alert("Show Pin Press");
                    this.batalkanTransaksi();
                    //this.setState({ showPin: true });
                  }}
                  style={[
                    ss.box,
                    {
                      margin: 15,
                      width: this.state.tablet ? "45%" : "45%",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      elevation: 1,

                      //borderWidth: 1,
                      borderColor: BLACK,
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      )
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
                    {_enter[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderDetailTransaksi() {
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

          <View
            style={{
              flex: 1,
              width: this.state.tablet ? "75%" : "100%",
              alignSelf: "center"
            }}
          >
            <FlatList
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

              justifyContent: "flex-end",
              width: this.state.tablet ? "75%" : "100%",
              alignSelf: "center"
            }}
          >
            {/* {this.renderTotal(selectedData)} */}
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
    // if (this.state.access_reprint_receipt) {
    //   this.printAction();
    // }
  }

  reprintReceipt() {
    if (this.state.access_reprint_receipt) {
      this.printAction();
    }
  }

  closeReceipt() {
    this.setState({ receiptEmail: "", sendReceipt: false });
  }

  render() {
    let height = Dimensions.get("window").height - 90;
    let { sendReceipt, receiptEmail } = this.state;

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_daftar_order[this.state.languageIndex]}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          filter={false}
          filterAction={() => {
            this.setState({
              showFilter: true,
              filterStatus: 1,
              filterPayment: 0
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

        {this.renderModalReason()}
        {this.renderModalProcessTransaction()}
        <ScrollView
          style={{
            flex: 1
          }}
        >
          <View style={[ss.mainContent, { height: height }]}>
            <View style={[ss.leftSide, { alignItems: "center" }]}>
              {this.renderHistoryLeftSide()}
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
                title={_daftar_order[this.state.languageIndex]}
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

              {/* <View
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

              </View> */}
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
                title={_detail_order[this.state.languageIndex]}
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
                <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
                  {this.renderDetailTransaksi()}
                </View>
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
