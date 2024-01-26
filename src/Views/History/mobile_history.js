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
  Linking
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
  BE_Send_Struk,
  BE_Rekap,
  BE_Coupon
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
  _split_payment,
  _sub_total,
  _total,
  _partial_refund,
  _refunded_items
} from "../../Libraries/DictionaryHistory";

import moment from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";
import StarPrintFunctions from "../../Libraries/StarPrintFunctions";

import {
  _masukan_kode,
  _salah_pin,
  _berhasil
} from "../../Libraries/DictionaryAbsen";
import Checkbox from "../../Components/Checkbox";
import { _no_data_1, _no_data_3 } from "../../Libraries/DictionaryRekap";
import DeviceInfo from "react-native-device-info";
import {
  _change_amount,
  _change_amount_short,
  _delivery_cost,
  _discount,
  _grand_total,
  _kembali,
  _sukses_kirim,
  _tax
} from "../../Libraries/DictionaryPayment";
import RegionFunctions from "../../Libraries/RegionFunctions";
import {
  _currency,
  _ok_alert,
  _perangkat_printer_tidak_terdeteksi
} from "../../Libraries/DictionarySetting";
import {
  _cashier,
  _lanjut_short,
  _no_table
} from "../../Libraries/DictionaryHome";
import { Decimalize } from "../../Libraries/NumberFunctions";

// import { StarPRNT } from "react-native-star-prnt";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 33;
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default class MobileHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partialTempTop: null,
      partialTempBottom: null,
      printType: 1,
      tablet: DeviceInfo.isTablet(),
      refund: false,
      showFilter: false,
      filterStatus: 1,
      filterPayment: 0,
      showPin: false,
      show_partial_refund: false,
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
      dataBill_Partial: [],
      dataBill_Refunded: [],
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
      receiptPhone: "",
      //receiptPhone: "087886038357",
      printer_main: null,
      printer_kitchen: null,
      listHistory: [],
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
      return_stock: false,
      partial_refund: false,
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
      selectedPhone: { name: "Indonesia", dial_code: "+62", code: "ID" },
      currencyAllowDecimal: false,

      logo_image_base64: "",
      //SPLIT BILL DATA
      split_bill_data: [],

      detail_recap_id: null,
      detail_method_type: null,
      detail_amount: null,
      detail_status: "",
      setting_print_logo: false,

      printer_busy: false,
      starPrinterList: null,
      selectedStarPrinter: null
    };
  }

  async starPrintInitialize() {
    // StarPrintFunctions.Initialize(val => {
    //   console.log("response starPrintInitialize => ", val);
    // });

    try {
      StarPrintFunctions.GetStarPrinterList(val => {
        console.log("response starPrintInitialize printer existing => ", val);
        if (val) {
          this.setState({ starPrinterList: val, selectedStarPrinter: val[0] });
        } else {
          StarPrintFunctions.DiscoverStarPrinter(val2 => {
            console.log("discover Star Printer ===> ", val2);
            if (val) {
              this.setState({
                starPrinterList: val2,
                selectedStarPrinter: val2[0]
              });
            }
          });
        }
      });
    } catch (e) {
      console.error(e);
    }

    // try {
    //   let printers = await StarPRNT.portDiscovery("All");
    //   console.log("starPrintInitialize ====> ", printers);
    //   StarPrintFunctions.SaveStarPrinterList(printers, v => {
    //     console.log("starPrintInitialize saved");
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
  }

  componentDidMount() {
    // this.starPrintInitialize();
    PrinterFunctions.GetSettingPrintLogo(val => {
      if (val) {
        this.setState({ setting_print_logo: val });
      }
    });

    PrinterFunctions.GetImageBase64(val => {
      if (val) {
        this.setState({ logo_image_base64: val });
        //this.convertImageBase64(val);
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

    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });
    RegionFunctions.GetPhone(val => {
      if (val) {
        this.setState({ selectedPhone: val });
      }
    });

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    this.getUserList();
    this.getPrinterData();

    //this.getBEData();
    this.changeDateWeek();
    this.getOutletData();
    this.setPreviliges();
    this.getPaymentMethod();

    // this.refundCoupon(16751);
  }

  handleLoadMore = () => {
    const { page, maxPage } = this.state;
    let next_page = page + 1;
    //console.log("handle load more next_page ==> ", next_page);
    //console.log("handle load more max_page ==> ", maxPage);

    if (next_page <= maxPage) {
      //console.log("handle load more ==> ", next_page);
      this.setState({ page: next_page });
      setTimeout(() => {
        this.getBEData();
      }, 250);
    }
  };

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

        console.log("tax ", tax);
        console.log("services ", services);

        const address = responseJson.data.address;
        let userInfo_temp = this.state.userInfo;

        userInfo_temp.restaurant_address = address;

        //LoginFunctions.UpdateLoginInformation(userInfo_temp, val => {});

        this.setState({
          tax: tax,
          services: services
          //userInfo: userInfo_temp
        });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getBEData(start_date = this.state.startDate, page = this.state.page) {
    const {
      userInfo,
      searchKey,
      startDate,
      endDate,
      filterStatus,
      filterPayment
    } = this.state;

    this.setState({ loading: true });
    const outlet_id = userInfo.gerai_id;
    const business_id = userInfo.retail_id;
    const search = searchKey ? searchKey : "";

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
      .add(1, "days")
      .format("YYYY-MM-DD");

    //let uri = `${HistoryOrderAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&search=&page=${page}&search=${search}&type=${filterStatus}&status=${filterPayment}`;

    let status = "";

    if (filterStatus === 2) {
      status = "&status=done";
    }

    if (filterStatus === 3) {
      status = "&status=refund";
    }

    let per_page = 10; //mobile-beetpos
    let uri = `${BE_Transaction}mobile-beetpos?order=newest&outlet_id=${outlet_id}&business_id=${business_id}&page=${page}&per_page=${per_page}&date_start=${date_start}&date_end=${date_end}${status}`;

    //let uri = `${BE_Transaction}?order=newest&outlet_id=${outlet_id}&business_id=${business_id}&page=1&per_page=5&date_start=${date_start}&date_end=${date_end}${status}`;

    console.log("getListHistory BE ==> ", uri);

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
            const statusCode = responseJson.statusCode;

            if (statusCode === 200) {
              const resultData = result;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );

              const result_all = resultData.data;
              const pagination = resultData.pagination;
              let result_filtered = [];
              console.log("result ===> ", result);

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

              //name.toLowerCase().includes(searchKeyRegion.toLowerCase()) ||

              result_filtered.map((v, i) => {
                if (
                  v.status !== "new" &&
                  v.status !== "pending" &&
                  v.status !== "processing" &&
                  v.status !== "cancelled"
                ) {
                  if (v.receipt_id.includes("-SPT")) {
                    if (v.Transaction_Items.length > 0) {
                      result_filtered_final.push(v);
                    }
                  } else {
                    result_filtered_final.push(v);
                  }
                }
              });

              if (this.state.page === 1) {
                this.setState({
                  listHistory: result_filtered_final,
                  loading: false,
                  startDate: start_date,
                  endDate: date_end,
                  page: page,
                  maxPage: pagination.total_page
                });
              } else {
                let tempData = this.state.listHistory;
                let dataCombi = [...tempData, ...result_filtered_final];

                this.setState({
                  listHistory: dataCombi,
                  loading: false,
                  startDate: start_date,
                  endDate: date_end,
                  page: page,
                  maxPage: pagination.total_page
                });
              }
            } else {
              this.setState({
                listHistory: [],
                loading: false
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

        BluetoothManager.connect(val.address) // the device address scanned.
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
            }
          );
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
      .filter(function (word) {
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

  printAction() {
    BluetoothManager.connect(this.state.printer_main.address) // the device address scanned.
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
        }
      );

    setTimeout(() => {
      // if (this.state.languageIndex === 0) {
      //   this.printActionBahasa();
      // } else {
      //   this.printActionEng();
      // }
      this.printActionNew();
    }, 750);
  }

  printActionStarPrint() {
    this.setState({ printer_busy: false });
    let portName = this.state.selectedStarPrinter.portName;
    console.log("portName ====> ", this.state.selectedStarPrinter);

    let commands = [];
    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Center });
    // commands.push({
    //   append:
    //     //"Star Clothing Boutique\n" +
    //     //"123 Star Road\n" +
    //     //"City, State 12345\n" +
    //     "123456" + "\n"
    // });
    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Right });
    // commands.push({
    //   append:
    //     //"Star Clothing Boutique\n" +
    //     //"123 Star Road\n" +
    //     //"City, State 12345\n" +
    //     "123456"
    // });
    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Left });
    // commands.push({
    //   append:
    //     //"Star Clothing Boutique\n" +
    //     //"123 Star Road\n" +
    //     //"City, State 12345\n" +
    //     "123456" + "\n"
    // });
    // commands.push({
    //   appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed
    // });

    const {
      dataBill,
      selectedData,
      userInfo,
      split_bill_data,
      printType
    } = this.state;
    console.log("dataBill ==> ", dataBill);
    console.log("selectedData ==> ", selectedData);
    console.log("userInfo ==> ", userInfo);

    let gerai_name = userInfo.gerai_name;
    let description = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";
    let cashier_name = selectedData.User.User_Profile.name;
    let transaction_id = selectedData.receipt_id;

    let time = moment(selectedData.time).format("DD/MM/YYYY HH:mm");

    if (selectedData.createdAt) {
      time = selectedData.createdAt;
      time = moment(time).format("DD/MM/YYYY, HH:mm");
    }

    let table_id =
      selectedData.Transaction_Tables.length > 0
        ? selectedData.Transaction_Tables[0].Table_Management.name
        : 0;

    //let table_id = 0;
    let no_table = "";

    if (table_id !== 0) {
      no_table = table_id;
    }

    //let sub_total = selectedData.Payment.payment_total;
    let sub_total = 0;

    dataBill.map((v, i) => {
      sub_total = sub_total + v.price_total;
    });

    let total_bayar = 0;
    let grand_total = 0;
    let payment_type = "";
    let jum_discount = 0;
    let jum_tax = 0;
    let jum_service = 0;

    if (split_bill_data.length > 1) {
      let sum_grandTotal = 0;
      let sum_tax = 0;
      let sum_service = 0;
      let sum_discount = 0;
      let sum_amount = 0;

      split_bill_data.map((v, i) => {
        //console.log("split_bill_data v ===> ", v);
        const temp_payment = v.Payment;
        const temp_grandTotal = temp_payment ? temp_payment.payment_total : 0;
        const temp_tax = temp_payment ? temp_payment.payment_tax : 0;
        const temp_service = temp_payment ? temp_payment.payment_service : 0;
        const temp_discount = temp_payment ? temp_payment.payment_discount : 0;
        const temp_amount = temp_payment ? temp_payment.amount : 0;

        sum_grandTotal = sum_grandTotal + temp_grandTotal;
        sum_tax = sum_tax + temp_tax;
        sum_service = sum_service + temp_service;
        sum_discount = sum_discount + temp_discount;
        sum_amount = sum_amount + temp_amount;
      });
      jum_discount = sum_discount;
      jum_tax = sum_tax;
      jum_service = sum_service;
      total_bayar = sum_amount;
      grand_total = sum_grandTotal;
      payment_type = _split_payment[this.state.languageIndex];
    } else {
      jum_discount = selectedData.Payment.payment_discount.toString();
      jum_tax = selectedData.Payment.payment_tax.toString();
      jum_service = selectedData.Payment.payment_service.toString();
      total_bayar = selectedData.Payment.amount;
      grand_total = selectedData.Payment.payment_total;
      payment_type = selectedData.Payment.Payment_Method.name;
    }

    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Center });
    commands.push({
      append: "***REPRINT***\n" + gerai_name + "\n" + description + "\n"
    });

    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Left });

    if (table_id !== 0) {
      commands.push({
        append: _no_table[this.state.languageIndex] + " " + no_table + "\n"
      });
    }

    commands.push({
      append:
        _transaction_id[this.state.languageIndex] + " " + transaction_id + "\n"
    });

    if (cashier_name) {
      commands.push({
        append: _cashier[this.state.languageIndex] + " " + cashier_name + "\n"
      });
    }

    commands.push({
      append: time + "\n"
    });

    commands.push({
      append: "--------------------------------" + "\n"
    });

    dataBill.map((data, i) => {
      //console.log("print Data Bill ===> ", data);
      // let detail = data.Transaction_Item_Addons;

      let detail = data.Transaction_Item_Addons
        ? data.Transaction_Item_Addons
        : [];

      let detailString = "";
      let total = data.price_total;

      detail.map((items, itemIndex) => {
        if (detailString === "") {
          detailString = items.Addon.name;
        } else {
          detailString = detailString + ", " + items.Addon.name;
        }
      });

      console.log("detailString ===> ", detailString);

      let product_name = data.Product ? data.Product.name : "Custom Price";
      let product_price = data.price_total.toString();
      let product_price_length = product_price.length;

      let product_qty = data.quantity.toString();

      if (product_qty.length === 1) {
        product_qty = product_qty + "";
      } else {
        product_qty = product_qty + "";
      }

      let price_space = "";
      let price_space_num = 0;

      if (product_price_length < 8) {
        price_space_num = 8 - product_price_length;
      }
      for (var xx = 0; xx < price_space_num; xx++) {
        price_space = price_space + " ";
      }

      let product_name_array = this.divideLongWord(product_name, 22);
      // if (printType === 2) {
      //   product_name_array = this.divideLongWord(product_name, 18 + 16);
      // }

      let product_name_length = product_name_array.length;
      let product_name_first_line = product_name_array[0];
      let length = product_name_first_line.length;
      let prod_space = " ";
      let prod_space_num = 0;

      console.log("product_name_array ", product_name_array);

      let detail_array = this.divideLongWord(detailString, 30);
      console.log("detail_array ", detail_array);

      let detail_length = detail_array.length;
      let notes = data.notes ? data.notes : "";
      console.log("notes ", notes);

      let notes_array = this.divideLongWord(notes, 30);
      let notes_length = notes_array.length;
      console.log("notes_array ", notes_array);

      if (length < 22) {
        prod_space_num = 22 - length;
      }

      // if (printType === 2) {
      //   if (length < 18 + 16) {
      //     prod_space_num = 18 + 16 - length;
      //   }
      // }

      for (var s = 0; s < prod_space_num; s++) {
        prod_space = prod_space + " ";
      }

      commands.push({
        append:
          product_name_first_line +
          prod_space +
          product_qty +
          price_space +
          product_price +
          "\n"
      });

      for (var i = 1; i < product_name_length; i++) {
        commands.push({
          append: product_name_array[i] + "\n"
        });
      }

      for (var j = 0; j < detail_length; j++) {
        commands.push({
          append: detail_array[j] + "\n"
        });
      }
      if (data.Sales_Type) {
        commands.push({
          append: data.Sales_Type.name + "\n"
        });
      }

      if (notes_length > 0) {
        commands.push({
          append: _notes[this.state.languageIndex] + "\n"
        });

        for (var k = 0; k < notes_length; k++) {
          //BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
          commands.push({
            append: notes_array[k] + "\n"
          });
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
    if (printType === 2) {
      if (sub_total_length < 24 + 16) {
        sub_total_space_num = 24 + 16 - sub_total_length;
      }
    }

    for (var xx = 0; xx < sub_total_space_num; xx++) {
      sub_total_space = sub_total_space + " ";
    }

    commands.push({
      append: "--------------------------------" + "\n"
    });

    // await BluetoothEscposPrinter.printText(
    //   "12345678901234567890123456789012\n\r",
    //   {}
    // );

    // await BluetoothEscposPrinter.printText(
    //   `Subtotal${sub_total_space}${sub_total}\n\r`,
    //   {}
    // );

    commands.push({
      append: "Subtotal" + sub_total_space + sub_total + "\n"
    });

    let tax = jum_tax.toString();
    let tax_total_length = tax.length;
    let tax_total_space = "";
    let tax_total_space_num = 0;

    if (tax_total_length < 29) {
      tax_total_space_num = 29 - tax_total_length;
    }

    if (printType === 2) {
      if (tax_total_length < 29 + 16) {
        tax_total_space_num = 29 + 16 - tax_total_length;
      }
    }

    for (var xxx = 0; xxx < tax_total_space_num; xxx++) {
      tax_total_space = tax_total_space + " ";
    }

    // await BluetoothEscposPrinter.printText(
    //   `Tax${tax_total_space}${tax}\n\r`,
    //   {}
    // );

    commands.push({
      append: "Tax" + tax_total_space + tax + "\n"
    });

    let services = jum_service.toString();
    let services_total_length = services.length;
    let services_total_space = "";
    let services_total_space_num = 0;
    if (services_total_length < 25) {
      services_total_space_num = 25 - services_total_length;
    }

    if (printType === 2) {
      if (services_total_length < 25 + 16) {
        services_total_space_num = 25 + 16 - services_total_length;
      }
    }

    for (var xxx = 0; xxx < services_total_space_num; xxx++) {
      services_total_space = services_total_space + " ";
    }

    // await BluetoothEscposPrinter.printText(
    //   `Service${services_total_space}${services}\n\r`,
    //   {}
    // );

    commands.push({
      append: "Service" + services_total_space + services + "\n"
    });

    // let discount =
    //   parseInt(sub_total) +
    //   parseInt(tax) +
    //   parseInt(services) -
    //   parseInt(grand_total);

    let discount = jum_discount.toString();
    let discount_total_length = discount.toString().length;
    let discount_total_space = "";
    let discount_total_space_num = 0;

    if (discount_total_length < 24) {
      discount_total_space_num = 24 - discount_total_length;
    }

    if (printType === 2) {
      if (discount_total_length < 24 + 16) {
        discount_total_space_num = 24 + 16 - discount_total_length;
      }
    }

    for (var abc = 0; abc < discount_total_space_num; abc++) {
      discount_total_space = discount_total_space + " ";
    }

    // await BluetoothEscposPrinter.printText(
    //   `Discount${discount_total_space}${discount}\n\r`,
    //   {}
    // );

    commands.push({
      append: "Discount" + discount_total_space + discount + "\n"
    });

    //grand_total = parseInt(Math.ceil(grand_total)).toString();
    let grand_total_length = grand_total.toString().length;
    let grand_total_space = "";
    let grand_total_space_num = 0;
    if (grand_total_length < 21) {
      grand_total_space_num = 21 - grand_total_length;
    }
    if (printType === 2) {
      if (grand_total_length < 21 + 16) {
        grand_total_space_num = 21 + 16 - grand_total_length;
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

    commands.push({
      append: "Grand Total" + grand_total_space + grand_total + "\n"
    });

    let total_length = total_bayar.toString().length;
    let total_space = "";
    let total_space_num = 0;

    if (total_length < 25) {
      total_space_num = 25 - total_length;
    }

    if (printType === 2) {
      if (total_length < 25 + 16) {
        total_space_num = 25 + 16 - total_length;
      }
    }
    for (var zzz = 0; zzz < total_space_num; zzz++) {
      total_space = total_space + " ";
    }

    commands.push({
      append: "--------------------------------" + "\n"
    });

    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Center });

    commands.push({
      append: "***" + payment_type + "***" + "\n"
    });
    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Left });

    if (split_bill_data.length > 1) {
      split_bill_data.map((v, i) => {
        let total_length = v.Payment.amount.toString().length;
        let total_space = "";
        let total_space_num = 0;

        payment_type = v.Payment.Payment_Method.name;

        if (total_length < 32 - payment_type.length) {
          total_space_num = 32 - payment_type.length - total_length;
        }

        for (var zzz = 0; zzz < total_space_num; zzz++) {
          total_space = total_space + " ";
        }

        commands.push({
          append: payment_type + total_space + v.Payment.amount + "\n"
        });
      });
    } else {
      commands.push({
        append: "Payment" + total_space + total_bayar + "\n"
      });
      let kembali = this.state.currencyAllowDecimal
        ? parseFloat(total_bayar - grand_total).toFixed(2)
        : parseInt(total_bayar - grand_total);
      total_length = kembali.toString().length;
      total_space = "";
      total_space_num = 0;

      if (total_length < 26) {
        total_space_num = 26 - total_length;
      }
      if (printType === 2) {
        if (total_length < 26 + 16) {
          total_space_num = 26 + 16 - total_length;
        }
      }
      for (var zzz = 0; zzz < total_space_num; zzz++) {
        total_space = total_space + " ";
      }

      commands.push({
        append: "Change" + total_space + kembali + "\n"
      });
    }

    //await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
    commands.push({
      append: "--------------------------------" + "\n"
    });

    commands.push({
      // appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed
    });

    // StarPrintFunctions.PrintCommand(commands, portName, "StarPRNT", val2 => {
    //   this.setState({ printer_busy: false });
    // });
  }

  async printActionNew(printer = this.state.printer_main) {
    const {
      dataBill,
      selectedData,
      userInfo,
      split_bill_data,
      printType
    } = this.state;

    let has_items = false;
    if (dataBill) {
      if (dataBill.length > 0) {
        has_items = true;
      } else {
        has_items = false;
      }
    }

    let total_addition_name = 0;
    let total_addition_price = 0;
    if (printType === 2) {
      total_addition_name = 10;
      total_addition_price = 6;
    }

    console.log("dataBill ==> ", dataBill);
    console.log("selectedData ==> ", selectedData);
    console.log("userInfo ==> ", userInfo);

    let gerai_name = userInfo.gerai_name;
    let description = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";
    // let cashier_name = selectedData.User.User_Profile.name;
    let cashier_name = selectedData.User
      ? selectedData.User.User_Profile.name
      : null;
    let transaction_id = selectedData.receipt_id;

    let time = moment(selectedData.time).format("DD/MM/YYYY HH:mm");

    if (selectedData.createdAt) {
      time = selectedData.createdAt;
      time = moment(time).format("DD/MM/YYYY, HH:mm");
    }

    let table_id =
      selectedData.Transaction_Tables.length > 0
        ? selectedData.Transaction_Tables[0].Table_Management.name
        : 0;

    //let table_id = 0;
    let no_table = "";

    if (table_id !== 0) {
      no_table = table_id;
    }

    //let sub_total = selectedData.Payment.payment_total;
    let sub_total = 0;

    let payment_delivery = selectedData.Payment.payment_delivery;

    dataBill.map((v, i) => {
      sub_total = sub_total + v.price_total;
    });

    let total_bayar = 0;
    let grand_total = 0;
    let payment_type = "";
    let jum_discount = 0;
    let jum_tax = 0;
    let jum_service = 0;
    let multi_currency = false;
    let multi_currency_name = "";
    let multi_currency_total = 0;
    let multi_currency_ratio = 1;

    if (split_bill_data.length > 1) {
      let sum_grandTotal = 0;
      let sum_tax = 0;
      let sum_service = 0;
      let sum_discount = 0;
      let sum_amount = 0;

      split_bill_data.map((v, i) => {
        //console.log("split_bill_data v ===> ", v);
        const temp_payment = v.Payment;
        const temp_grandTotal = temp_payment ? temp_payment.payment_total : 0;
        const temp_tax = temp_payment ? temp_payment.payment_tax : 0;
        const temp_service = temp_payment ? temp_payment.payment_service : 0;
        const temp_discount = temp_payment ? temp_payment.payment_discount : 0;
        const temp_amount = temp_payment ? temp_payment.amount : 0;

        sum_grandTotal = sum_grandTotal + temp_grandTotal;
        sum_tax = sum_tax + temp_tax;
        sum_service = sum_service + temp_service;
        sum_discount = sum_discount + temp_discount;
        sum_amount = sum_amount + temp_amount;
      });
      jum_discount = sum_discount;
      jum_tax = sum_tax;
      jum_service = sum_service;
      total_bayar = sum_amount;
      grand_total = sum_grandTotal;
      payment_type = _split_payment[this.state.languageIndex];
    } else {
      jum_discount = selectedData.Payment.payment_discount.toString();
      jum_tax = selectedData.Payment.payment_tax.toString();
      jum_service = selectedData.Payment.payment_service.toString();
      total_bayar = selectedData.Payment.amount;

      total_bayar = this.state.currencyAllowDecimal
        ? parseFloat(selectedData.Payment.amount).toFixed(2)
        : selectedData.Payment.amount;

      grand_total = this.state.currencyAllowDecimal
        ? parseFloat(selectedData.Payment.payment_total).toFixed(2)
        : selectedData.Payment.payment_total;

      if (selectedData.Payment.multi_currency) {
        multi_currency = true;
        multi_currency_total = selectedData.Payment.multi_currency_total;
        multi_currency_ratio = selectedData.Payment.multi_currency_ratio;
        multi_currency_total = parseFloat(multi_currency_total).toFixed(2);
        grand_total = this.state.currencyAllowDecimal
          ? parseFloat(multi_currency_total).toFixed(2)
          : multi_currency_total;

        total_bayar = this.state.currencyAllowDecimal
          ? parseFloat(multi_currency_total).toFixed(2)
          : multi_currency_total;

        multi_currency_name = selectedData.Payment.multi_currency_name;
      }
    }

    if (!has_items) {
      sub_total = grand_total - jum_tax - jum_service + jum_discount;
    }

    // if (payment_type === "cash") {
    //   payment_type = "Cash";
    // }

    // if (payment_type === "ovo") {
    //   payment_type = "Ovo";
    // }

    // if (payment_type === "shoppee") {
    //   payment_type = "Shoppee";
    // }

    // if (payment_type === "gopay") {
    //   payment_type = "Go-Pay";
    // }

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

    if (table_id !== 0) {
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

    await BluetoothEscposPrinter.printText(
      `Trans ID ${transaction_id}\n\r`,
      {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      }
    );

    if (cashier_name) {
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
    }

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
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }

    await BluetoothEscposPrinter.printText(`-------------------------------\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1
    });

    dataBill.map((data, i) => {
      console.log("print Data Bill ===> ", data);
      // let detail = data.Transaction_Item_Addons;

      let detail = data.Transaction_Item_Addons
        ? data.Transaction_Item_Addons
        : [];

      let detailString = "";
      let total = data.price_total;

      detail.map((items, itemIndex) => {
        if (detailString === "") {
          detailString = items.Addon.name;
        } else {
          detailString = detailString + ", " + items.Addon.name;
        }
      });

      console.log("detailString ===> ", detailString);

      let temp_price =
        parseFloat(data.price_total) * parseFloat(multi_currency_ratio);
      let product_name = data.Product ? data.Product.name : "Custom Price";
      // let product_price = temp_price.toFixed(2);
      let product_price = temp_price;
      let product_price_length = product_price.length;

      // let product_qty = data.quantity.toString();
      let product_qty_number = Decimalize(data.quantity);
      let product_qty = product_qty_number.toString();

      if (product_qty.length === 1) {
        product_qty = product_qty + "";
      } else {
        product_qty = product_qty + "";
      }

      let price_space = "";
      let price_space_num = 0;

      if (product_price_length < 10) {
        price_space_num = 10 - product_price_length;
      }
      for (var xx = 0; xx < price_space_num; xx++) {
        price_space = price_space + " ";
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

      console.log("product_name_array ", product_name_array);

      let detail_array = this.divideLongWord(detailString, 30);
      console.log("detail_array ", detail_array);

      let detail_length = detail_array.length;
      let notes = data.notes ? data.notes : "";
      console.log("notes ", notes);

      let notes_array = this.divideLongWord(notes, 30);
      let notes_length = notes_array.length;
      console.log("notes_array ", notes_array);

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
        [16 + total_addition_name, 6, 10 + total_addition_price],
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

      if (notes_length > 0) {
        BluetoothEscposPrinter.printText(
          `${_notes[this.state.languageIndex]} \n\r`,
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
          [`${notes}`, ``, ``],
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      }

      // BluetoothEscposPrinter.printText(
      //   `${product_name_first_line}${prod_space}${product_qty}${price_space}${product_price}\n\r`,
      //   {}
      // );

      // for (var i = 1; i < product_name_length; i++) {
      //   BluetoothEscposPrinter.printText(`${product_name_array[i]}\n\r`, {});
      // }

      // for (var j = 0; j < detail_length; j++) {
      //   BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
      // }
      // if (data.Sales_Type) {
      //   BluetoothEscposPrinter.printText(`${data.Sales_Type.name}\n\r`, {});
      // }

      // if (notes_length > 0) {
      //   BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
      //   for (var k = 0; k < notes_length; k++) {
      //     BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
      //   }
      // }
    });

    let val = "";
    val = parseFloat(sub_total * multi_currency_ratio)
      .toFixed(2)
      .toString();
    let sub_total_length = val.length;
    let sub_total_space = "";
    let sub_total_space_num = 0;

    payment_delivery = parseFloat(payment_delivery * multi_currency_ratio)
      .toFixed(2)
      .toString();

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
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
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
      [`${_sub_total[this.state.languageIndex]}    :`, " ", `${val}`],
      {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      }
    );

    if (payment_delivery > 0) {
      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [
          `${_delivery_cost[this.state.languageIndex]}`,
          " ",
          `${payment_delivery}`
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

    let tax = jum_tax.toString();
    tax = parseFloat(jum_tax * multi_currency_ratio)
      .toFixed(2)
      .toString();
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

    let services = jum_service.toString();
    services = parseFloat(jum_service * multi_currency_ratio)
      .toFixed(2)
      .toString();

    let services_total_length = services.length;
    let services_total_space = "";
    let services_total_space_num = 0;
    if (services_total_length < 16) {
      services_total_space_num = 16 - services_total_length;
    }

    if (printType === 2) {
      if (services_total_length < 16 + 16) {
        services_total_space_num = 16 + 16 - services_total_length;
      }
    }

    for (var xxx = 0; xxx < services_total_space_num; xxx++) {
      services_total_space = services_total_space + " ";
    }

    // await BluetoothEscposPrinter.printText(
    //   `Service${services_total_space}${services}\n\r`,
    //   {}
    // );

    await BluetoothEscposPrinter.printColumn(
      [16 + total_addition_name, 1, 15 + total_addition_price],
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.RIGHT
      ],
      [`${_service[this.state.languageIndex]}      :`, " ", `${services}`],
      {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      }
    );

    // let discount =
    //   parseInt(sub_total) +
    //   parseInt(tax) +
    //   parseInt(services) -
    //   parseInt(grand_total);

    let discount = jum_discount.toString();
    discount = parseFloat(discount * multi_currency_ratio)
      .toFixed(2)
      .toString();

    let discount_total_length = discount.toString().length;
    let discount_total_space = "";
    let discount_total_space_num = 0;

    if (discount_total_length < 16) {
      discount_total_space_num = 2164 - discount_total_length;
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

    //grand_total = parseInt(Math.ceil(grand_total)).toString();

    let grand_total_length = grand_total.toString().length;

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

    let total_length = total_bayar.toString().length;
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

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );
    if (printType === 2) {
      await BluetoothEscposPrinter.printText(
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }
    await BluetoothEscposPrinter.printText(`***${payment_type}***\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1
    });

    if (multi_currency) {
      await BluetoothEscposPrinter.printText(
        `${_currency[this.state.languageIndex]} : ${multi_currency_name}\n\r`,
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );
    }
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    if (split_bill_data.length > 1) {
      split_bill_data.map((v, i) => {
        let total_length = v.Payment.amount.toString().length;
        let total_space = "";
        let total_space_num = 0;

        payment_type = v.Payment.Payment_Method.name;

        if (total_length < 16 - payment_type.length) {
          total_space_num = 16 - payment_type.length - total_length;
        }

        for (var zzz = 0; zzz < total_space_num; zzz++) {
          total_space = total_space + " ";
        }

        // BluetoothEscposPrinter.printText(
        //   `${payment_type}${total_space}${v.Payment.amount}\n\r`,
        //   {}
        // ); ////total bayar disini

        BluetoothEscposPrinter.printColumn(
          [16 + total_addition_name, 1, 15 + total_addition_price],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT
          ],
          [`${payment_type}      :`, " ", `${v.Payment.amount}`],
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );
      });
    } else {
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
        [`${_lanjut_short[this.state.languageIndex]}      :`, " ", `${total_bayar}`],
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );

      let kembali = this.state.currencyAllowDecimal
        ? parseFloat(total_bayar - grand_total).toFixed(2)
        : parseInt(total_bayar - grand_total);
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

    //await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
    if (printType === 2) {
      await BluetoothEscposPrinter.printText(
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }

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
  }

  async printActionEng(printer = this.state.printer_main) {
    const {
      dataBill,
      selectedData,
      userInfo,
      split_bill_data,
      printType
    } = this.state;
    console.log("dataBill ==> ", dataBill);
    console.log("selectedData ==> ", selectedData);
    console.log("userInfo ==> ", userInfo);

    let gerai_name = userInfo.gerai_name;
    let description = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";
    let cashier_name = selectedData.User.User_Profile.name;
    let transaction_id = selectedData.receipt_id;

    let time = moment(selectedData.time).format("DD/MM/YYYY HH:mm");

    if (selectedData.createdAt) {
      time = selectedData.createdAt;
      time = moment(time).format("DD/MM/YYYY, HH:mm");
    }

    let table_id =
      selectedData.Transaction_Tables.length > 0
        ? selectedData.Transaction_Tables[0].Table_Management.name
        : 0;

    //let table_id = 0;
    let no_table = "";

    if (table_id !== 0) {
      no_table = table_id;
    }

    //let sub_total = selectedData.Payment.payment_total;
    let sub_total = 0;

    dataBill.map((v, i) => {
      sub_total = sub_total + v.price_total;
    });

    let total_bayar = 0;
    let grand_total = 0;
    let payment_type = "";
    let jum_discount = 0;
    let jum_tax = 0;
    let jum_service = 0;

    if (split_bill_data.length > 1) {
      let sum_grandTotal = 0;
      let sum_tax = 0;
      let sum_service = 0;
      let sum_discount = 0;
      let sum_amount = 0;

      split_bill_data.map((v, i) => {
        //console.log("split_bill_data v ===> ", v);
        const temp_payment = v.Payment;
        const temp_grandTotal = temp_payment ? temp_payment.payment_total : 0;
        const temp_tax = temp_payment ? temp_payment.payment_tax : 0;
        const temp_service = temp_payment ? temp_payment.payment_service : 0;
        const temp_discount = temp_payment ? temp_payment.payment_discount : 0;
        const temp_amount = temp_payment ? temp_payment.amount : 0;

        sum_grandTotal = sum_grandTotal + temp_grandTotal;
        sum_tax = sum_tax + temp_tax;
        sum_service = sum_service + temp_service;
        sum_discount = sum_discount + temp_discount;
        sum_amount = sum_amount + temp_amount;
      });
      jum_discount = sum_discount;
      jum_tax = sum_tax;
      jum_service = sum_service;
      total_bayar = sum_amount;
      grand_total = sum_grandTotal;
      payment_type = _split_payment[this.state.languageIndex];
    } else {
      jum_discount = selectedData.Payment.payment_discount.toString();
      jum_tax = selectedData.Payment.payment_tax.toString();
      jum_service = selectedData.Payment.payment_service.toString();
      total_bayar = selectedData.Payment.amount;
      grand_total = selectedData.Payment.payment_total;
      payment_type = selectedData.Payment.Payment_Method.name;
    }

    // if (payment_type === "cash") {
    //   payment_type = "Cash";
    // }

    // if (payment_type === "ovo") {
    //   payment_type = "Ovo";
    // }

    // if (payment_type === "shoppee") {
    //   payment_type = "Shoppee";
    // }

    // if (payment_type === "gopay") {
    //   payment_type = "Go-Pay";
    // }

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

    if (table_id !== 0) {
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
    if (printType === 2) {
      await BluetoothEscposPrinter.printText(
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }

    dataBill.map((data, i) => {
      console.log("print Data Bill ===> ", data);
      // let detail = data.Transaction_Item_Addons;

      let detail = data.Transaction_Item_Addons
        ? data.Transaction_Item_Addons
        : [];

      let detailString = "";
      let total = data.price_total;

      detail.map((items, itemIndex) => {
        if (detailString === "") {
          detailString = items.Addon.name;
        } else {
          detailString = detailString + ", " + items.Addon.name;
        }
      });

      console.log("detailString ===> ", detailString);

      let product_name = data.Product ? data.Product.name : "Custom Price";
      let product_price = data.price_total.toString();
      let product_price_length = product_price.length;

      let product_qty = data.quantity.toString();

      if (product_qty.length === 1) {
        product_qty = product_qty + "";
      } else {
        product_qty = product_qty + "";
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
      if (printType === 2) {
        product_name_array = this.divideLongWord(product_name, 18 + 16);
      }

      let product_name_length = product_name_array.length;
      let product_name_first_line = product_name_array[0];
      let length = product_name_first_line.length;
      let prod_space = " ";
      let prod_space_num = 0;

      console.log("product_name_array ", product_name_array);

      let detail_array = this.divideLongWord(detailString, 30);
      console.log("detail_array ", detail_array);

      let detail_length = detail_array.length;
      let notes = data.notes ? data.notes : "";
      console.log("notes ", notes);

      let notes_array = this.divideLongWord(notes, 30);
      let notes_length = notes_array.length;
      console.log("notes_array ", notes_array);

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
      if (data.Sales_Type) {
        BluetoothEscposPrinter.printText(`${data.Sales_Type.name}\n\r`, {});
      }

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
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }
    // await BluetoothEscposPrinter.printText(
    //   "12345678901234567890123456789012\n\r",
    //   {}
    // );

    await BluetoothEscposPrinter.printText(
      `Subtotal${sub_total_space}${sub_total}\n\r`,
      {}
    );

    let tax = jum_tax.toString();
    let tax_total_length = tax.length;
    let tax_total_space = "";
    let tax_total_space_num = 0;

    if (tax_total_length < 29) {
      tax_total_space_num = 29 - tax_total_length;
    }

    if (printType === 2) {
      if (tax_total_length < 16 + 16) {
        tax_total_space_num = 16 + 16 - tax_total_length;
      }
    }

    for (var xxx = 0; xxx < tax_total_space_num; xxx++) {
      tax_total_space = tax_total_space + " ";
    }

    await BluetoothEscposPrinter.printText(
      `Tax${tax_total_space}${tax}\n\r`,
      {}
    );

    let services = jum_service.toString();
    let services_total_length = services.length;
    let services_total_space = "";
    let services_total_space_num = 0;
    if (services_total_length < 25) {
      services_total_space_num = 25 - services_total_length;
    }

    if (printType === 2) {
      if (services_total_length < 16 + 16) {
        services_total_space_num = 16 + 16 - services_total_length;
      }
    }

    for (var xxx = 0; xxx < services_total_space_num; xxx++) {
      services_total_space = services_total_space + " ";
    }

    await BluetoothEscposPrinter.printText(
      `Service${services_total_space}${services}\n\r`,
      {}
    );

    // let discount =
    //   parseInt(sub_total) +
    //   parseInt(tax) +
    //   parseInt(services) -
    //   parseInt(grand_total);

    let discount = jum_discount.toString();
    let discount_total_length = discount.toString().length;
    let discount_total_space = "";
    let discount_total_space_num = 0;

    if (discount_total_length < 24) {
      discount_total_space_num = 24 - discount_total_length;
    }

    if (printType === 2) {
      if (discount_total_length < 16 + 16) {
        discount_total_space_num = 16 + 16 - discount_total_length;
      }
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
    await BluetoothEscposPrinter.printText(
      `Grand Total${grand_total_space}${grand_total}\n\r`,
      {}
    );

    let total_length = total_bayar.toString().length;
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

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );
    if (printType === 2) {
      await BluetoothEscposPrinter.printText(
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }
    await BluetoothEscposPrinter.printText(`***${payment_type}***\n\r`, {});
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    if (split_bill_data.length > 1) {
      split_bill_data.map((v, i) => {
        let total_length = v.Payment.amount.toString().length;
        let total_space = "";
        let total_space_num = 0;

        payment_type = v.Payment.Payment_Method.name;

        if (total_length < 32 - payment_type.length) {
          total_space_num = 32 - payment_type.length - total_length;
        }

        for (var zzz = 0; zzz < total_space_num; zzz++) {
          total_space = total_space + " ";
        }

        BluetoothEscposPrinter.printText(
          `${payment_type}${total_space}${v.Payment.amount}\n\r`,
          {}
        ); ////total bayar disini
      });
    } else {
      await BluetoothEscposPrinter.printText(
        `Payment${total_space}${total_bayar}\n\r`,
        {}
      );
      let kembali = this.state.currencyAllowDecimal
        ? parseFloat(total_bayar - grand_total).toFixed(2)
        : parseInt(total_bayar - grand_total);
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

      await BluetoothEscposPrinter.printText(
        `Change${total_space}${kembali}\n\r`,
        {}
      );
    }

    //await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
    if (printType === 2) {
      await BluetoothEscposPrinter.printText(
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }

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

  async printActionBahasa(printer = this.state.printer_main) {
    const {
      dataBill,
      selectedData,
      userInfo,
      split_bill_data,
      printType
    } = this.state;
    console.log("dataBill ==> ", dataBill);
    console.log("selectedData ==> ", selectedData);
    console.log("userInfo ==> ", userInfo);

    let gerai_name = userInfo.gerai_name;
    let description = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";
    let cashier_name = selectedData.User.User_Profile.name;
    let transaction_id = selectedData.receipt_id;
    let time = moment(selectedData.time).format("DD/MM/YYYY HH:mm");

    if (selectedData.createdAt) {
      time = selectedData.createdAt;
      time = moment(time).format("DD/MM/YYYY, HH:mm");
    }

    let table_id =
      selectedData.Transaction_Tables.length > 0
        ? selectedData.Transaction_Tables[0].Table_Management.name
        : 0;

    //let table_id = 0;
    let no_table = "";

    if (table_id !== 0) {
      no_table = table_id;
    }

    //let sub_total = selectedData.Payment.payment_total;
    let sub_total = 0;

    dataBill.map((v, i) => {
      sub_total = sub_total + v.price_total;
    });

    let total_bayar = 0;
    let grand_total = 0;
    let payment_type = "";
    let jum_discount = 0;
    let jum_tax = 0;
    let jum_service = 0;

    if (split_bill_data.length > 1) {
      let sum_grandTotal = 0;
      let sum_tax = 0;
      let sum_service = 0;
      let sum_discount = 0;
      let sum_amount = 0;

      split_bill_data.map((v, i) => {
        //console.log("split_bill_data v ===> ", v);
        const temp_payment = v.Payment;
        const temp_grandTotal = temp_payment ? temp_payment.payment_total : 0;
        const temp_tax = temp_payment ? temp_payment.payment_tax : 0;
        const temp_service = temp_payment ? temp_payment.payment_service : 0;
        const temp_discount = temp_payment ? temp_payment.payment_discount : 0;
        const temp_amount = temp_payment ? temp_payment.amount : 0;

        sum_grandTotal = sum_grandTotal + temp_grandTotal;
        sum_tax = sum_tax + temp_tax;
        sum_service = sum_service + temp_service;
        sum_discount = sum_discount + temp_discount;
        sum_amount = sum_amount + temp_amount;
      });
      jum_discount = sum_discount;
      jum_tax = sum_tax;
      jum_service = sum_service;
      total_bayar = sum_amount;
      grand_total = sum_grandTotal;
      payment_type = _split_payment[this.state.languageIndex];
    } else {
      jum_discount = selectedData.Payment.payment_discount.toString();
      jum_tax = selectedData.Payment.payment_tax.toString();
      jum_service = selectedData.Payment.payment_service.toString();
      total_bayar = selectedData.Payment.amount;
      grand_total = selectedData.Payment.payment_total;
      payment_type = selectedData.Payment.Payment_Method.name;
    }

    // if (payment_type === "cash") {
    //   payment_type = "Cash";
    // }

    // if (payment_type === "ovo") {
    //   payment_type = "Ovo";
    // }

    // if (payment_type === "shoppee") {
    //   payment_type = "Shoppee";
    // }

    // if (payment_type === "gopay") {
    //   payment_type = "Go-Pay";
    // }

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

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );

    await BluetoothEscposPrinter.printText(`***PRINT ULANG***\n\r`, {
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

    if (table_id !== 0) {
      await BluetoothEscposPrinter.printText(`Meja ${no_table}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      });
    }

    await BluetoothEscposPrinter.printText(
      `ID Transaksi${transaction_id}\n\r`,
      {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      }
    );

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
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }

    // await BluetoothEscposPrinter.printText(
    //   "12345678901234567890123456789012\n\r",
    //   {}
    // );

    // //32

    // await BluetoothEscposPrinter.printText(
    //   "123456789012345678901234567890123456789012345678\n\r",
    //   {}
    // );

    //48

    dataBill.map((data, i) => {
      console.log("print Data Bill ===> ", data);
      // let detail = data.Transaction_Item_Addons;

      let detail = data.Transaction_Item_Addons
        ? data.Transaction_Item_Addons
        : [];

      let detailString = "";
      let total = data.price_total;

      detail.map((items, itemIndex) => {
        if (detailString === "") {
          detailString = items.Addon.name;
        } else {
          detailString = detailString + ", " + items.Addon.name;
        }
      });

      console.log("detailString ===> ", detailString);

      let product_name = data.Product ? data.Product.name : "Custom Price";
      let product_price = data.price_total.toString();
      let product_price_length = product_price.length;

      let product_qty = data.quantity.toString();

      if (product_qty.length === 1) {
        product_qty = product_qty + "  x ";
      } else {
        product_qty = product_qty + " x ";
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

      if (printType === 2) {
        product_name_array = this.divideLongWord(product_name, 16 + 16);
      }

      let product_name_length = product_name_array.length;
      let product_name_first_line = product_name_array[0];
      let length = product_name_first_line.length;
      let prod_space = " ";
      let prod_space_num = 0;

      console.log("product_name_array ", product_name_array);

      let detail_array = this.divideLongWord(detailString, 30);
      if (printType === 2) {
        detail_array = this.divideLongWord(detailString, 30 + 16);
      }
      console.log("detail_array ", detail_array);

      let detail_length = detail_array.length;
      let notes = data.notes ? data.notes : "";
      console.log("notes ", notes);

      let notes_array = this.divideLongWord(notes, 30);

      let notes_length = notes_array.length;
      console.log("notes_array ", notes_array);

      if (length < 18) {
        prod_space_num = 18 - length;
      }

      if (printType === 2) {
        prod_space_num = 18 + 16 - length;
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
      if (data.Sales_Type) {
        BluetoothEscposPrinter.printText(`${data.Sales_Type.name}\n\r`, {});
      }

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

    if (printType === 2) {
      if (sub_total_length < 24 + 16) {
        sub_total_space_num = 24 + 16 - sub_total_length;
      }
    }

    for (var xx = 0; xx < sub_total_space_num; xx++) {
      sub_total_space = sub_total_space + " ";
    }

    if (printType === 2) {
      await BluetoothEscposPrinter.printText(
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }
    // await BluetoothEscposPrinter.printText(
    //   "12345678901234567890123456789012\n\r",
    //   {}
    // );

    await BluetoothEscposPrinter.printText(
      `Subtotal${sub_total_space}${sub_total}\n\r`,
      {}
    );

    let tax = jum_tax.toString();
    let tax_total_length = tax.length;
    let tax_total_space = "";
    let tax_total_space_num = 0;
    if (tax_total_length < 27) {
      tax_total_space_num = 27 - tax_total_length;
    }

    if (printType === 2) {
      if (tax_total_length < 27 + 16) {
        tax_total_space_num = 27 + 16 - tax_total_length;
      }
    }

    for (var xxx = 0; xxx < tax_total_space_num; xxx++) {
      tax_total_space = tax_total_space + " ";
    }

    await BluetoothEscposPrinter.printText(
      `Pajak${tax_total_space}${tax}\n\r`,
      {}
    );

    let services = jum_service.toString();
    let services_total_length = services.length;
    let services_total_space = "";
    let services_total_space_num = 0;

    if (services_total_length < 25) {
      services_total_space_num = 25 - services_total_length;
    }

    if (printType === 2) {
      if (services_total_length < 25 + 16) {
        services_total_space_num = 25 + 16 - services_total_length;
      }
    }

    for (var xxx = 0; xxx < services_total_space_num; xxx++) {
      services_total_space = services_total_space + " ";
    }

    await BluetoothEscposPrinter.printText(
      `Service${services_total_space}${services}\n\r`,
      {}
    );

    // let discount =
    //   parseInt(sub_total) +
    //   parseInt(tax) +
    //   parseInt(services) -
    //   parseInt(grand_total);

    let discount = jum_discount.toString();
    let discount_total_length = discount.toString().length;
    let discount_total_space = "";
    let discount_total_space_num = 0;

    if (discount_total_length < 26) {
      discount_total_space_num = 26 - discount_total_length;
    }

    if (printType === 2) {
      if (discount_total_length < 26 + 16) {
        discount_total_space_num = 26 + 16 - discount_total_length;
      }
    }

    for (var abc = 0; abc < discount_total_space_num; abc++) {
      discount_total_space = discount_total_space + " ";
    }

    await BluetoothEscposPrinter.printText(
      `Diskon${discount_total_space}${discount}\n\r`,
      {}
    );

    //grand_total = parseInt(Math.ceil(grand_total)).toString();
    let grand_total_length = grand_total.toString().length;
    let grand_total_space = "";
    let grand_total_space_num = 0;

    if (grand_total_length < 21) {
      grand_total_space_num = 21 - grand_total_length;
    }

    if (printType === 2) {
      if (grand_total_length < 21 + 16) {
        grand_total_space_num = 21 + 16 - grand_total_length;
      }
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

    if (printType === 2) {
      if (total_length < 27 + 16) {
        total_space_num = 27 + 16 - total_length;
      }
    }

    for (var zzz = 0; zzz < total_space_num; zzz++) {
      total_space = total_space + " ";
    }

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );

    if (printType === 2) {
      await BluetoothEscposPrinter.printText(
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }
    await BluetoothEscposPrinter.printText(`***${payment_type}***\n\r`, {});
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    if (split_bill_data.length > 1) {
      split_bill_data.map((v, i) => {
        let total_length = v.Payment.amount.toString().length;
        let total_space = "";
        let total_space_num = 0;

        payment_type = v.Payment.Payment_Method.name;

        if (total_length < 32 - payment_type.length) {
          total_space_num = 32 - payment_type.length - total_length;
        }

        for (var zzz = 0; zzz < total_space_num; zzz++) {
          total_space = total_space + " ";
        }

        BluetoothEscposPrinter.printText(
          `${payment_type}${total_space}${v.Payment.amount}\n\r`,
          {}
        ); ////total bayar disini
      });
    } else {
      await BluetoothEscposPrinter.printText(
        `Bayar${total_space}${total_bayar}\n\r`,

        {}
      );
      let kembali = this.state.currencyAllowDecimal
        ? parseFloat(total_bayar - grand_total).toFixed(2)
        : parseInt(total_bayar - grand_total);
      total_length = kembali.toString().length;
      total_space = "";
      total_space_num = 0;
      if (total_length < 25) {
        total_space_num = 25 - total_length;
      }

      if (printType === 2) {
        if (total_length < 25 + 16) {
          total_space_num = 25 + 16 - total_length;
        }
      }

      for (var zzz = 0; zzz < total_space_num; zzz++) {
        total_space = total_space + " ";
      }

      await BluetoothEscposPrinter.printText(
        `Kembali${total_space}${kembali}\n\r`,

        {}
      );
    }

    //await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
    if (printType === 2) {
      await BluetoothEscposPrinter.printText(
        "------------------------------------------------\n\r",
        {}
      );
    } else {
      await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
      );
    }

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
    let outlet_id = this.state.userInfo.gerai_id;
    const uri = `${BE_Staff}?outlet_id=${outlet_id}`;
    //console.log("uri get user list===> ", uri);
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
        //console.log("responseJson get user list ===> ", responseJson);

        let result = responseJson;

        if (result.statusCode === 200) {
          let resultData = result.data;
          //console.log("responseJson resultData ===> ", resultData);
          let firstUserId = null;
          if (resultData.length > 0) {
            resultData.map((v, i) => {
              if (v.id === this.state.userInfo.id) {
                firstUserId = v.id;
              }
            });
            if (!firstUserId) {
              firstUserId = resultData[0].id;
            }
          }

          this.setState({
            listUser: resultData,
            selectedUser: firstUserId
          });
        }
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
      return_stock: false,
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
    //this.getListHistory(1);
    this.getBEData(this.state.startDate, 1);
    this.getUserList();
  }

  changeStockRefund() {
    this.setState({ return_stock: !this.state.return_stock });
  }

  changePartialRefund() {
    this.setState({ partial_refund: !this.state.partial_refund });
  }

  resetPageReturn(partial_Refund) {
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
      notes: "",
      return_stock: false,
      show_partial_refund: false
      //startDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      //endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
    });
    // this.getBEData();
    this.changeDateWeek();
    this.getUserList();

    if (partial_Refund) {
    } else {
      this.changeSelection(this.state.selectedData, true);
    }
  }

  refundClose() {
    const {
      detail_recap_id,
      detail_method_type,
      detail_amount,
      detail_status
    } = this.state;

    let reduce_ewallet = 0;
    let reduce_cash = 0;
    let reduce_debit = 0;

    if (detail_method_type.id === 1) {
      reduce_ewallet = detail_amount;
    }

    if (detail_method_type.id === 2) {
      reduce_debit = detail_amount;
    }

    if (detail_method_type.id === 3) {
      reduce_cash = detail_amount;
    }

    let uri = `${BE_Rekap}/${detail_recap_id}`;

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
          let data = responseJson.data;
          fetch(uri, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: this.state.auth
              //"Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
              sales_total:
                data.sales_total - reduce_debit - reduce_ewallet - reduce_cash,
              void_total:
                data.void_total + reduce_ewallet + reduce_cash + reduce_debit,
              cash_total: data.cash_total - reduce_cash,
              ewallet_total: data.ewallet_total - reduce_ewallet,
              card_total: data.card_total - reduce_debit,
              cash_in_out_system_total: data.cash_in_out_system_total,
              cash_system_total: data.cash_system_total - reduce_cash,
              ewallet_system_total: data.ewallet_system_total - reduce_ewallet,
              card_system_total: data.card_system_total - reduce_debit,
              system_total:
                data.system_total - reduce_debit - reduce_ewallet - reduce_cash,
              actual_total:
                data.actual_total - reduce_debit - reduce_ewallet - reduce_cash,
              difference: data.difference
            })
          })
            .then(response2 => response2.json())
            .then(responseJson2 => {
              let result = responseJson2;
              console.log("REKAP RESPONSE 2 ==> ", responseJson2);
            })
            .catch(_err => {
              console.log("ERR refund closing ==> ", _err);
            });
        }
      });
  }

  refundCoupon(transaction_id) {

    let uri = `${BE_Coupon}/refund/${transaction_id}`;
    // console.log("refundCoupon transaction_id ====> ", transaction_id);
    // console.log("refundCoupon uri ====> ", uri);



    fetch(uri, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log("responseJson refund coupon ====> ", responseJson);

        if (responseJson.statusCode === 200) {
          //let data = responseJson.data;
          // console.log("responseJson refund coupon ====> ", responseJson);
        }
      }).catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  processPartialRefund() {
    const {
      selectedData,
      userInfo,
      selectedUser,
      listReason,
      selectedReason,
      notes,
      detail_recap_id,
      detail_method_type,
      detail_amount,
      detail_status,
      dataBill_Partial,
      dataBill_Refunded,
      return_stock
    } = this.state;

    this.setState({ loading: true });

    let transaction_id = selectedData.id;

    console.log("processPartialRefund selectedData ===> ", selectedData);
    console.log(
      "processPartialRefund dataBill_Partial ===> ",
      dataBill_Partial
    );
    console.log(
      "processPartialRefund dataBill_Refunded ===> ",
      dataBill_Refunded
    );

    let data_update = [];
    let data_new = [];

    if (dataBill_Partial.length > 0) {
      dataBill_Partial.map((v, i) => {
        let data_temp = v;
        data_temp.addons = v.Transaction_Item_Addons;
        data_update.push(data_temp);
      });
    }

    if (dataBill_Refunded.length > 0) {
      dataBill_Refunded.map((v, i) => {
        let data_temp = v;
        data_temp.addons = v.Transaction_Item_Addons;
        data_new.push(data_temp);
      });
    }

    const payment_method_id = selectedData.Payment.payment_method_id;
    const payment_refund_discount = 0;

    let subTotal = 0;
    dataBill_Refunded.map((v, i) => {
      subTotal = subTotal + v.price_total;
    });

    let grandTotal = 0;
    let tax = 0;
    let service = 0;
    let discount = 0;

    tax = subTotal * this.state.tax;
    service = subTotal * this.state.services;
    discount = 0;
    grandTotal = subTotal + tax + service;

    let payment_refund_tax = tax;
    let payment_refund_service = service;
    let payment_refund_amount = grandTotal;

    let cashier_id = selectedUser;

    const send_data = {
      //id: transaction_id,
      user_id: cashier_id,
      refund_stock: this.state.return_stock,
      refund_type_id:
        this.state.selectedReason === 0 ? 4 : this.state.selectedReason,
      notes: notes,
      payment_method_id: payment_method_id,
      payment_refund_discount: payment_refund_discount,
      payment_refund_tax: payment_refund_tax,
      payment_refund_service: payment_refund_service,
      payment_refund_amount: payment_refund_amount,
      items_update: data_update,
      items_refund: data_new
    };

    console.log("sendData ===> ", send_data);

    let uri = BE_Transaction + transaction_id + "/partial-refund";

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(send_data)
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("REFUND RESPONSE ==> ", responseJson);
        // let message = [];
        // //message.push(result.message);
        // message.push(_berhasil[this.state.languageIndex]);

        // let temp_selected_data = this.state.selectedData;
        // temp_selected_data.status = "refund";

        // if (detail_status === "closed") {
        //   this.refundClose();
        // }

        // this.setState({
        //   loading: false,
        //   showAlert: true,
        //   alertMessage: message,

        // });
        // //this.resetPage(); //resetpage done refund

        // this.resetPageReturn();
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });

    let uri2 = BE_Transaction + transaction_id + "/partial-refund-create";

    setTimeout(() => {
      fetch(uri2, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.state.auth
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(send_data)
      })
        .then(response => response.json())
        .then(responseJson => {
          let result = responseJson;
          console.log("REFUND RESPONSE 2 ==> ", responseJson);
          let message = [];
          // //message.push(result.message);
          message.push(_berhasil[this.state.languageIndex]);

          // let temp_selected_data = this.state.selectedData;
          // temp_selected_data.status = "refund";

          // if (detail_status === "closed") {
          //   this.refundClose();
          // }

          this.setState({
            loading: false,
            showAlert: true,
            alertMessage: message,
            show_partial_refund: false
            //selectedData: temp_selected_data
          });
          //this.resetPage(); //resetpage done refund

          this.resetPageReturn(true);
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });
    }, 500);
  }

  prosesRefund() {
    const {
      selectedData,
      userInfo,
      selectedUser,
      listReason,
      selectedReason,
      notes,
      detail_recap_id,
      detail_method_type,
      detail_amount,
      detail_status
    } = this.state;

    this.setState({ loading: true });

    let payment_id = selectedData.id;
    let transaction_id = selectedData.id;

    //let cashier_id = userInfo.id;//
    let cashier_id = selectedUser;

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

    console.log("selectedData ==> ", selectedData);
    let uri = BE_Transaction + payment_id + "/refund";

    this.checkPin(val => {
      let statusCode = val.statusCode; //200 == true  401 == false
      let message = [];
      //message.push(val.message);

      const body = JSON.stringify({
        refund_type_id:
          this.state.selectedReason === 0 ? 4 : this.state.selectedReason,
        user_id: cashier_id,
        //user_id: manager_id,
        //return_stock: this.state.return_stock,
        notes: description,
        refund_stock: this.state.return_stock
      });

      // console.log("uri refund ===> ", uri);

      // console.log("body refund ===> ", body);

      if (statusCode === 200) {
        fetch(uri, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.state.auth
            //"Content-Type": "application/x-www-form-urlencoded"
          },
          body: JSON.stringify({
            refund_type_id:
              this.state.selectedReason === 0 ? 4 : this.state.selectedReason,
            user_id: cashier_id,
            //user_id: manager_id,
            //return_stock: this.state.return_stock,
            notes: description,
            refund_stock: this.state.return_stock
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            console.log("REFUND RESPONSE ==> ", responseJson);

            let message = [];
            //message.push(result.message);
            message.push(_berhasil[this.state.languageIndex]);

            let temp_selected_data = this.state.selectedData;
            temp_selected_data.status = "refund";

            if (detail_status === "closed") {
              this.refundClose();
            }

            this.refundCoupon(transaction_id);

            this.setState({
              loading: false,
              showAlert: true,
              alertMessage: message,
              selectedData: temp_selected_data
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
    const uri = BE_CheckPin;
    const { selectedUser, pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    console.log("SELECTED USER ==> ", selectedUser);
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        user_id: selectedUser,
        pin: `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`
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
    const date_end = moment(endDate)
      .add(1, "days")
      .format("YYYY-MM-DD");

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
    const date_end = moment(endDate)
      .add(1, "days")
      .format("YYYY-MM-DD");

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

  changeSelectionBU(data, refund_process = false) {
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

  changeSelection(data, refund_process = false, retry = 0) {
    const { userInfo } = this.state;
    console.log("changeSelection data ==> ", data);

    this.setState({
      detail_recap_id: null,
      detail_method_type: null,
      detail_amount: null,
      detail_status: ""
    });

    const outlet_id = userInfo.gerai_id;
    const business_id = userInfo.retail_id;
    const receipt_id = data.receipt_id;

    const payment_id = data.Payment ? data.Payment.id : 0;
    const custom_price = data.Payment ? data.Payment.custom_price : 0;

    let uri_get = `${BE_Transaction}detail/${data.id}`;

    //let data_transaction = null;
    let temp_custom = {};
    let dataBill = [];
    let data_detail = {};
    if (custom_price > 0) {
      temp_custom = { id: 0, quantity: 1, price_total: custom_price };
      dataBill.push(temp_custom);
    }

    fetch(uri_get, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("data_transaction responseJson ===> ", responseJson.data);

        if (responseJson.statusCode === 200) {
          const temp_data = responseJson.data;

          let detail_recap_id = temp_data.recap_id ? temp_data.recap_id : null;
          let detail_method_type = temp_data.Payment
            ? temp_data.Payment.Payment_Method.Payment_Method_Type
            : null;

          let detail_amount = temp_data.Payment
            ? temp_data.Payment.payment_total
            : null;

          this.setState({
            detail_recap_id: detail_recap_id,
            detail_method_type: detail_method_type,
            detail_amount: detail_amount
          });

          data_detail = temp_data;

          console.log("detail_recap_id ===> ", detail_recap_id);
          console.log("detail_method_type ===> ", detail_method_type);
          console.log("detail_amount ===> ", detail_amount);

          if (temp_data.Transaction_Items) {
            temp_data.Transaction_Items.map((v, i) => {
              //console.log('v ==> ', v);
              dataBill.push(v);
            });
          }

          // split_bill_data.push(temp_data);
          //split_bill_data = temp_data;

          //this.setState({ split_bill_data: temp_data });

          setTimeout(() => {
            let split_bill_data = [];

            if (data.receipt_id.includes("-SPT")) {
              //get split bill data yang itemnya kosong

              let uri = `${BE_Transaction}?order=newest&outlet_id=${outlet_id}&business_id=${business_id}&receipt_id=${receipt_id}`;

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
                    const temp_data = responseJson.data;
                    //console.log("get split bill temp_data ===> ", temp_data);
                    // split_bill_data.push(temp_data);
                    split_bill_data = temp_data;

                    // data_detail = temp_data;

                    this.setState({ split_bill_data: temp_data });
                  }
                });
            } else {
              this.setState({ split_bill_data: [] });
            }

            let refund = false;
            if (data.status === "done" || data.status === "closed") {
              refund = true;
            }

            //console.log("split_bill_data set state ===> ", split_bill_data);

            //let payment_method_type = data.Payment.Payment_Method.Payment_Method_Type;

            let dataBill_Testing = [];

            //dataBill_Testing.push(dataBill[0]);
            //dataBill_Testing.push(dataBill[1]);

            let dataBill_Testing_Origin = [];
            dataBill_Testing_Origin.push(dataBill[2]);

            this.setState({
              showDetail: true,
              showPin: false,
              refund: false,
              selectedData: data_detail,
              subTitle: _detail_transaksi[this.state.languageIndex],
              dataBill: dataBill,
              payment_id: payment_id,
              canRefund: refund,
              detail_status: data.status,
              //detail_method_type: payment_method_type,
              loading: false,

              dataBill_Refunded: dataBill_Testing,
              dataBill_Partial: dataBill
            });
          }, 111);
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);

        const retry_number = parseInt(retry) + parseInt(1);
        if (retry_number < 3) {
          this.changeSelection(data, refund_process, retry_number);
        }
      });

    // if (data.Transaction_Items)
    // {
    //   data.Transaction_Items.map((v, i) => {
    //     //console.log('v ==> ', v);
    //     dataBill.push(v);
    //   });

    // }

    //let dataBill = data.Transaction_Items;

    //console.log()
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
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date())
        .add(0, "days")
        .format("YYYY-MM-DD"),
      action: 0
    });
    //this.getListHistory(1);
    this.getBEData(moment(new Date()).format("YYYY-MM-DD"), 1);
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
    // this.getListHistory(1);
    this.getBEData(moment(d).format("YYYY-MM-DD"), 1);
  }

  changeDateMonth() {
    this.setState({
      loading: true,
      startDate: moment(new Date()).format("YYYY-MM-01 00:00:00"),
      endDate: moment(new Date())
        .add(0, "days")
        .format("YYYY-MM-DD"),
      action: 2
    });
    // this.getListHistory(1);
    this.getBEData(moment(new Date()).format("YYYY-MM-01 00:00:00"), 1);
  }

  changeDateYear() {
    this.setState({
      loading: true,
      startDate: moment(new Date()).format("YYYY-01-01"),
      endDate: moment(new Date())
        .add(0, "days")
        .format("YYYY-MM-DD"),
      action: 3
    });
    // this.getListHistory(1);
    this.getBEData(moment(new Date()).format("YYYY-01-01"), 1);
  }

  changeStartDate = (event, date) => {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      startDate: moment(date).format("YYYY-MM-DD"),
      datePickerStart: false
    });
    //this.getListHistory(1);
    //this.getBEData();
  };

  changeEndDate = (event, date) => {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      endDate: moment(date).format("YYYY-MM-DD"),
      datePickerEnd: false
    });

    //this.getListHistory(1);
    //this.getBEData();
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
        if (this.state.partial_refund) {
          this.checkPin(val => {
            let statusCode = val.statusCode;
            if (statusCode === 200) {
              if (this.state.dataBill_Partial.length === 0) {
                this.prosesRefund();
              } else {
                this.processPartialRefund();
              }
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
        } else {
          this.prosesRefund();
        }
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
                backgroundColor: WHITE
                //borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                //borderWidth: 1
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
                this.setState({ selectedUser: parseInt(itemValue) });
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
            width: this.state.tablet ? "50%" : "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
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
              <Button
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.changeStockRefund();
                }}
              >
                <Checkbox
                  size={20}
                  checked={this.state.return_stock}
                  color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                />
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: BLACK
                    }
                  ]}
                >
                  {_refund_stock[this.state.languageIndex]}
                </Text>
              </Button>

              <Button
                style={{
                  padding: 5,
                  marginTop: 15,
                  flexDirection: "row",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.changePartialRefund();
                }}
              >
                <Checkbox
                  size={20}
                  checked={this.state.partial_refund}
                  color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                />
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: BLACK
                    }
                  ]}
                >
                  {_partial_refund[this.state.languageIndex]}
                </Text>
              </Button>
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

            if (this.state.partial_refund) {
              this.setState({ show_partial_refund: true });
            } else {
              this.setState({ showPin: true });
            }
          }}
          style={[
            ss.box,
            {
              margin: 15,
              width: this.state.tablet ? "50%" : "75%",
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
    //this.getListHistory(1);
    this.getBEData(this.state.startDate, 1);
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
            //display: "none"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { color: BLACK, fontSize: 14, marginBottom: 10 }
            ]}
          >
            {_by_payment[this.state.languageIndex]}
          </Text>
          <FlatList
            //ListHeaderComponent={this.renderSearch()}
            columnWrapperStyle={{
              justifyContent: "space-evenly",
              marginBottom: 5
            }}
            contentContainerStyle={
              {
                //justifyContent:"space-between",
                //flex: 1,
                //flexDirection: 'row',
                //flexDirection: "column",
                //justifyContent: "space-between",
                //backgroundColor: "#BCA",
                //marginBottom: 100,
              }
            }
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={this.state.payment_method}
            renderItem={({ item, index }) => {
              return (
                <Button
                  onPress={() => {
                    let new_id = item.id;
                    if (this.state.filterPayment === item.id) {
                      new_id = 0;
                    }
                    this.changePaymentFilter(new_id);
                  }}
                  style={{
                    width: "30%",
                    borderRadius: 5,
                    backgroundColor:
                      this.state.filterPayment === item.id
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
                          this.state.filterPayment === item.id
                            ? whiteColor
                            : blackColor,
                        fontSize: 12
                      }
                    ]}
                  >
                    {item.name}
                  </Text>
                </Button>
              );
            }}
            keyExtractor={(item, index) => {
              return "renderListHistory" + index.toString();
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            onPress={() => {
              this.filterAction();
            }}
            style={{
              width: this.state.tablet ? "75%" : "100%",
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderRadius: 15,
              alignItems: "center",
              padding: 10,
              alignSelf: "center"
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

  renderPartialRefund() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.show_partial_refund}
        //visible={true}
        onRequestClose={() => {
          this.setState({ show_partial_refund: false });
        }}
      >
        {this.state.loading ? <Loading /> : <View />}

        <View
          style={{
            flex: 1,
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
              padding: 15,
              paddingBottom: 0
            }}
          >
            <View
              style={{
                flex: 1,
                width: this.state.tablet ? "75%" : "100%",
                alignSelf: "center",
                margin: 15,
                marginBottom: 5
              }}
            >
              <View style={{ flex: 1 }}>
                <View>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        color: BLACK,
                        fontSize: 16
                      }
                    ]}
                  >
                    {_detail_transaksi[this.state.languageIndex]}
                  </Text>
                </View>
                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataBill_Partial}
                  renderItem={({ item, index }) => {
                    return this.renderDataDetail_Top(item, index);
                  }}
                  keyExtractor={(item, index) => {
                    return "renderListHistory_1" + index.toString();
                  }}
                />
              </View>
              <View style={{ flex: 1, marginTop: 5 }}>
                <View>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        color: BLACK,
                        fontSize: 16
                      }
                    ]}
                  >
                    {_refunded_items[this.state.languageIndex]}
                  </Text>
                </View>
                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataBill_Refunded}
                  renderItem={({ item, index }) => {
                    return this.renderDataDetail_Bottom(item, index);
                  }}
                  keyExtractor={(item, index) => {
                    return "renderListHistory_2" + index.toString();
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.5,
                  marginTop: 5,
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    alignSelf: "flex-end",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  {this.renderTotal(this.state.selectedData, true)}
                  <Button
                    onPress={() => {
                      this.setState({ showPin: true });
                    }}
                    style={[
                      ss.box,
                      {
                        //margin: 15,
                        width: this.state.tablet ? "50%" : "75%",
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
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
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
            {this.renderPinNumber()}
            {this.renderPinButton()}
          </View>
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
            display: "none",
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
              //this.getListHistory(1);
              this.getBEData(this.state.startDate, 1);
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
              //this.getListHistory(1);
              this.getBEData(this.state.startDate, 1);
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
            flexDirection: "row",
            justifyContent: "space-between",
            //backgroundColor: '#BCA',
            marginTop: 15,
            marginBottom: 15,
            paddingRight: 15,
            paddingLeft: 15
          }}
        >
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
              //backgroundColor: WHITE,
              backgroundColor: "#F7F7F7",
              borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: 10
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
            <Ionicons
              name={"md-calendar"}
              style={{
                //margin: 10,
                marginLeft: 5,
                fontSize: 20,
                color: "#C4C4C4"
              }}
            />
          </Button>

          <Button
            onPress={() => {
              this.showEndPicker();
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "33%",
              backgroundColor: "#F7F7F7",
              //borderColor: BLACK,
              //borderWidth: 1,
              //backgroundColor: WHITE,
              borderRadius: 10,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 10
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
            <Ionicons
              name={"md-calendar"}
              style={{
                //margin: 10,
                marginLeft: 5,
                fontSize: 20,
                color: "#C4C4C4"
              }}
            />
          </Button>

          <Button
            onPress={() => {
              this.setState({ action: -1 });
              //this.getRekapList();
              this.getBEData(this.state.startDate, 1);
            }}
            style={{
              //margin: 15,
              marginTop: 0,
              width: "30%",
              //borderColor: BLACK,
              //borderWidth: 1,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: 10
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }
              ]}
            >
              {_cari[this.state.languageIndex]}
            </Text>
          </Button>
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
                filterPayment: 0
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
    //   time = moment(time).format("hh:mm");
    // }

    //console.log("render List Data ==> ", data);

    const status = data.status;
    //console.log(data.status);
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

    if (status === "closed") {
      status_text = _status_5[this.state.languageIndex];
      status_index = 4;
    }

    if (data.createdAt) {
      time = data.createdAt;
      time = moment(time).format("DD/MM, HH:mm");
    }

    // let paymentType = data.paymentType;
    // paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    let paymentType = data.Payment ? data.Payment.Payment_Method.name : "";

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

    let total = 0;
    let transaction_currency = this.state.currency;

    if (data.Payment) {
      total = data.Payment.multi_currency
        ? data.Payment.multi_currency_total
        : data.Payment.payment_total;

      if (data.Payment.multi_currency) {
        transaction_currency = data.Payment.multi_currency_name;
      }
    }

    const show = true;
    //console.log("SELECTED DATA ==> ", selectedData)
    //console.log("data.id ==> ", data.id)
    // if (paymentType !== "") {
    if (show) {
      return (
        <View
          style={{
            marginBottom: 15,
            width: this.state.tablet ? "49%" : "100%",
            // margin: 5,
            borderRadius: 15,
            backgroundColor: 'white',
            borderColor: "#C8C7CC",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,
          }}
        >
          <Button
            onPress={() => {
              this.changeSelection(data);
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
              <View style={{ width: "33%", alignItems: "flex-start" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 11, color: textColor[colorIndex] }
                  ]}
                >
                  {data.receipt_id.includes("-SPT")
                    ? _split_payment[this.state.languageIndex]
                    : _total_price[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 10, color: textColor[colorIndex] }
                  ]}
                >
                  {data.receipt_id.includes("-SPT")
                    ? ""
                    : transaction_currency + this.idrNumToStr(total)}
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
                  {this.state.userInfo.gerai_name}
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
        </View>
      );
    }
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
          {/* <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          > */}
          {/* <GestureRecognizer
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
            > */}
          {/* HISTORY */}
          {this.state.listHistory && this.state.listHistory.length > 0 ? (
            this.state.tablet ? (
              <FlatList
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    if (this.state.loading === false) {
                      console.log("HANDLE LOAD MOREEEE ===========");
                      this.handleLoadMore();
                    }
                    //console.log("IS CLOSE TO BOTTOM");
                  }
                }}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 5
                }}
                numColumns={2}
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
            ) : (
              <FlatList
                onScroll={({ nativeEvent }) => {
                  // console.log("HANDLE LOAD MOREEEE ===========");
                  if (isCloseToBottom(nativeEvent)) {
                    if (this.state.loading === false) {
                      this.handleLoadMore();
                    }
                    //console.log("IS CLOSE TO BOTTOM");
                  }
                }}
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
              // onEndReached={()=> this.handleLoadMore()}
              // onEndReachedThreshold={0.5}
              //refreshing={refreshing}
              />
            )
          ) : (
            this.renderNoData()
          )}
          {/* </GestureRecognizer> */}
          {/* </ScrollView> */}
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

      detail.map((items, itemIndex) => {
        let addonsName = items.Addon ? items.Addon.name : "";
        if (detailString === "") {
          detailString = addonsName;
        } else {
          if (addonsName !== "") {
            detailString = detailString + ", " + addonsName;
          }
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
              {data.Product ? data.Product.name : "-"}
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
              {data.Sales_Type.name}
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

  renderDataDetail_Top(data, i) {
    //console.log("render Data Detail ==> ", data);

    let custom_tag = false;
    // if (data.id === 0) {
    //   custom_tag = true;
    // }

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

      detail.map((items, itemIndex) => {
        let addonsName = items.Addon ? items.Addon.name : "";
        if (detailString === "") {
          detailString = addonsName;
        } else {
          if (addonsName !== "") {
            detailString = detailString + ", " + addonsName;
          }
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
              width: "40%",
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
              {data.Product ? data.Product.name : "-"}
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
              {data.Sales_Type.name}
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
                }
              ]}
            >
              {data.quantity}
            </Text>
          </View>
          <View
            style={{
              width: "20%",
              justifyContent: "space-evenly",
              alignContent: "center",
              flexDirection: "row"
            }}
          >
            <Button
              onPress={() => {
                this.moveFromTop(data, i, true);
              }}
              style={{
                width: 25,
                height: 25,
                borderRadius: 10,
                margin: 5,
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            >
              <MaterialCommunityIcons
                name={"chevron-down"}
                style={{
                  fontSize: 15,
                  alignSelf: "center",
                  color: WHITE,
                  margin: 5
                }}
              />
            </Button>
            <Button
              onPress={() => {
                this.moveFromTop(data, i, false);
              }}
              style={{
                width: 25,
                height: 25,
                borderRadius: 10,
                margin: 5,
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            >
              <MaterialCommunityIcons
                name={"chevron-double-down"}
                style={{
                  fontSize: 15,
                  alignSelf: "center",
                  color: WHITE,
                  margin: 5
                }}
              />
            </Button>
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
          <View
            style={{
              width: "10%",
              alignItems: "flex-end",
              display: "none"
              //backgroundColor:"#BCA"
            }}
          />
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
        />
      );
    }
  }

  moveFromTop(data1, indexData, single) {
    const dataVariable = data1;

    const dataBill_Partial = this.state.dataBill_Partial;
    const dataBill_Refunded = this.state.dataBill_Refunded;

    let temp_data = dataVariable;
    let temp_top = dataBill_Partial;
    let temp_bottom = dataBill_Refunded;
    let data_quantity = temp_data.quantity;
    // console.log("move from top qty awal ===> ", data_quantity);

    const id = temp_data.id;

    //find same data from bottom
    let has_same_id = false;
    let same_id_index = 0;
    let same_id_qty = 0;
    if (temp_bottom.length > 0) {
      temp_bottom.map((val, index) => {
        if (id === val.id) {
          has_same_id = true;
          same_id_index = index;
          same_id_qty = val.quantity;
        }
      });
    }

    let price_per_product = 0;
    let update_data = data1;
    price_per_product = data1.price_total / data1.quantity;

    update_data.quantity = single ? data1.quantity - 1 : 0;
    update_data.price_total = price_per_product * update_data.quantity;

    let new_data = {};
    new_data.id = dataVariable.id;
    new_data.notes = dataVariable.notes;
    new_data.price_addons_total = dataVariable.price_addons_total;
    new_data.price_product = dataVariable.price_product;
    new_data.price_discount = dataVariable.price_discount;
    new_data.price_service = dataVariable.price_service;
    new_data.sales_type_id = dataVariable.sales_type_id;
    //new_data.price_total = dataVariable.price_total;
    new_data.product_id = dataVariable.product_id;
    new_data.status = dataVariable.status;
    new_data.addons = dataVariable.Transaction_Item_Addons;
    new_data.Transaction_Item_Addons = dataVariable.Transaction_Item_Addons;

    new_data.Sales_Type = dataVariable.Sales_Type;
    new_data.Product = dataVariable.Product;

    if (has_same_id) {
      new_data.quantity = single
        ? same_id_qty + 1
        : same_id_qty + data_quantity;
    } else {
      new_data.quantity = single ? 1 : data_quantity;
    }

    new_data.price_total = price_per_product * new_data.quantity;

    console.log("update_data ===> ", update_data);
    console.log("new_data ===> ", new_data);

    if (update_data.quantity > 0) {
      temp_top[indexData] = update_data;
    } else {
      temp_top.splice(indexData, 1);
    }

    if (has_same_id) {
      temp_bottom[same_id_index] = new_data;
    } else {
      temp_bottom.push(new_data);
    }

    let tempTop = temp_top;
    let tempBottom = temp_bottom;

    this.setState({
      dataBill_Refunded: tempBottom,
      dataBill_Partial: tempTop
    });

    // setTimeout(() => {
    //   let tempTop = temp_top;
    //   let tempBottom = temp_bottom;

    //   this.setState({
    //     dataBill_Refunded: tempBottom,
    //     dataBill_Partial: tempTop
    //   });
    // }, 500);
  }

  renderDataDetail_Bottom(data, i) {
    //console.log("render Data Detail ==> ", data);

    let custom_tag = false;
    // if (data.id === 0) {
    //   custom_tag = true;
    // }

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

      detail.map((items, itemIndex) => {
        let addonsName = items.Addon ? items.Addon.name : "";
        if (detailString === "") {
          detailString = addonsName;
        } else {
          if (addonsName !== "") {
            detailString = detailString + ", " + addonsName;
          }
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
              width: "40%",
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
              {data.Product ? data.Product.name : "-"}
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
              {data.Sales_Type.name}
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
                }
              ]}
            >
              {data.quantity}
            </Text>
          </View>
          <View
            style={{
              width: "20%",
              justifyContent: "space-evenly",
              alignContent: "center",
              flexDirection: "row"
            }}
          >
            <Button
              onPress={() => {
                this.moveFromBottom(data, i, true);
              }}
              style={{
                width: 25,
                height: 25,
                borderRadius: 10,
                margin: 5,
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            >
              <MaterialCommunityIcons
                name={"chevron-up"}
                style={{
                  fontSize: 15,
                  alignSelf: "center",
                  color: WHITE,
                  margin: 5
                }}
              />
            </Button>
            <Button
              onPress={() => {
                this.moveFromBottom(data, i);
              }}
              style={{
                width: 25,
                height: 25,
                borderRadius: 10,
                margin: 5,
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            >
              <MaterialCommunityIcons
                name={"chevron-double-up"}
                style={{
                  fontSize: 15,
                  alignSelf: "center",
                  color: WHITE,
                  margin: 5
                }}
              />
            </Button>
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
          <View
            style={{
              width: "10%",
              alignItems: "flex-end",
              display: "none"
              //backgroundColor:"#BCA"
            }}
          />
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
        />
      );
    }
  }

  moveFromBottom(data1, indexData, single) {
    const dataVariable = data1;

    const dataBill_Partial = this.state.dataBill_Partial;
    const dataBill_Refunded = this.state.dataBill_Refunded;

    let temp_data = dataVariable;
    let temp_top = dataBill_Partial;
    let temp_bottom = dataBill_Refunded;
    let data_quantity = temp_data.quantity;
    // console.log("move from top qty awal ===> ", data_quantity);

    const id = temp_data.id;

    //find same data from top
    let has_same_id = false;
    let same_id_index = 0;
    let same_id_qty = 0;
    if (temp_top.length > 0) {
      temp_top.map((val, index) => {
        if (id === val.id) {
          has_same_id = true;
          same_id_index = index;
          same_id_qty = val.quantity;
        }
      });
    }

    let price_per_product = 0;
    let update_data = data1;
    price_per_product = data1.price_total / data1.quantity;

    update_data.quantity = single ? data1.quantity - 1 : 0;
    update_data.price_total = price_per_product * update_data.quantity;

    let new_data = {};
    new_data.id = dataVariable.id;
    new_data.notes = dataVariable.notes;
    new_data.price_addons_total = dataVariable.price_addons_total;
    new_data.price_product = dataVariable.price_product;
    new_data.price_discount = dataVariable.price_discount;
    new_data.price_service = dataVariable.price_service;
    new_data.sales_type_id = dataVariable.sales_type_id;
    //new_data.price_total = dataVariable.price_total;
    new_data.product_id = dataVariable.product_id;
    new_data.status = dataVariable.status;
    new_data.addons = dataVariable.Transaction_Item_Addons;
    new_data.Transaction_Item_Addons = dataVariable.Transaction_Item_Addons;

    new_data.Sales_Type = dataVariable.Sales_Type;
    new_data.Product = dataVariable.Product;

    if (has_same_id) {
      new_data.quantity = single
        ? same_id_qty + 1
        : same_id_qty + data_quantity;
    } else {
      new_data.quantity = single ? 1 : data_quantity;
    }

    new_data.price_total = price_per_product * new_data.quantity;

    console.log("update_data ===> ", update_data);
    console.log("new_data ===> ", new_data);

    if (update_data.quantity > 0) {
      temp_bottom[indexData] = update_data;
    } else {
      temp_bottom.splice(indexData, 1);
    }

    if (has_same_id) {
      temp_top[same_id_index] = new_data;
    } else {
      temp_top.push(new_data);
    }

    let tempTop = temp_top;
    let tempBottom = temp_bottom;

    this.setState({
      dataBill_Refunded: tempBottom,
      dataBill_Partial: tempTop
    });

    // setTimeout(() => {
    //   let tempTop = temp_top;
    //   let tempBottom = temp_bottom;

    //   this.setState({
    //     dataBill_Refunded: tempBottom,
    //     dataBill_Partial: tempTop
    //   });
    // }, 500);
  }

  renderHeaderDetail(data) {
    // console.log("renderHeaderDetail data ==> ", data);

    const { split_bill_data, dataBill } = this.state;

    // this.state.dataBill

    let has_items = false;
    if (dataBill) {
      if (dataBill.length > 0) {
        has_items = true;
      } else {
        has_items = false;
      }
    }

    let time = "";
    if (data.createdAt) {
      time = data.createdAt;
      time = moment(time).format("DD/MM/YYYY, HH:mm");
    }

    let payment = data.Payment ? data.Payment : null;

    let paymentType = payment ? payment.Payment_Method.name : "";

    //paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    //console.log("renderHeaderDetail ==> ", data);

    const total_bayar = payment ? payment.amount : 0;

    let grand_total = 0;

    if (split_bill_data.length > 1) {
      let sum_grandTotal = 0;
      let sum_tax = 0;
      let sum_service = 0;
      let sum_discount = 0;

      split_bill_data.map((v, i) => {
        console.log("split_bill_data v ===> ", v);
        const temp_payment = v.Payment;

        const temp_grandTotal = temp_payment ? temp_payment.payment_total : 0;
        const temp_tax = temp_payment ? temp_payment.payment_tax : 0;
        const temp_service = temp_payment ? temp_payment.payment_service : 0;
        const temp_discount = temp_payment ? temp_payment.payment_discount : 0;

        sum_grandTotal = sum_grandTotal + temp_grandTotal;
        sum_tax = sum_tax + temp_tax;
        sum_service = sum_service + temp_service;
        sum_discount = sum_discount + temp_discount;
      });

      grand_total = sum_grandTotal;
      paymentType = _split_payment[this.state.languageIndex];
      // tax = sum_tax;
      // service = sum_service;
      // discount = sum_discount;
    } else {
      grand_total = payment ? payment.payment_total : 0;
      paymentType = payment ? payment.Payment_Method.name : "";
    }

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

    if (status === "closed") {
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
            marginLeft: 0,
            width: this.state.tablet ? "75%" : "100%",
            alignSelf: "center"
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
            {this.idrNumToStr(grand_total)}
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
            borderColor: "#DADADA",
            width: this.state.tablet ? "75%" : "100%",
            alignSelf: "center",
            display: has_items ? "flex" : "none"
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

  renderTotal(data, partial, showDiscount) {
    const { dataBill, split_bill_data, dataBill_Refunded } = this.state;

    //console.log("render Total data ", data);

    //console.log("render Total dataBill ", dataBill);

    let has_items = false;
    if (dataBill) {
      if (dataBill.length > 0) {
        has_items = true;
      } else {
        has_items = false;
      }
    }

    let payment = data.Payment ? data.Payment : null;

    let subTotal = 0;

    let temp_dataBill = partial ? dataBill_Refunded : dataBill;

    temp_dataBill.map((v, i) => {
      subTotal = subTotal + v.price_total;
    });

    let grandTotal = 0;

    let tax = 0;
    let service = 0;

    let discount = 0;

    if (split_bill_data.length > 1) {
      let sum_grandTotal = 0;
      let sum_tax = 0;
      let sum_service = 0;
      let sum_discount = 0;

      split_bill_data.map((v, i) => {
        console.log("split_bill_data v ===> ", v);
        const temp_payment = v.Payment;

        const temp_grandTotal = temp_payment ? temp_payment.payment_total : 0;
        const temp_tax = temp_payment ? temp_payment.payment_tax : 0;
        const temp_service = temp_payment ? temp_payment.payment_service : 0;
        const temp_discount = temp_payment ? temp_payment.payment_discount : 0;

        sum_grandTotal = sum_grandTotal + temp_grandTotal;
        sum_tax = sum_tax + temp_tax;
        sum_service = sum_service + temp_service;
        sum_discount = sum_discount + temp_discount;
      });

      grandTotal = sum_grandTotal;
      tax = sum_tax;
      service = sum_service;
      discount = sum_discount;
    } else {
      if (partial) {
        tax = subTotal * this.state.tax;
        service = subTotal * this.state.services;
        discount = 0;
        grandTotal = subTotal + tax + service;
      } else {
        grandTotal = payment ? payment.payment_total : 0;
        tax = payment ? payment.payment_tax : 0;
        service = payment ? payment.payment_service : 0;
        discount = payment ? payment.payment_discount : 0;
      }
    }

    if (!has_items) {
      subTotal = grandTotal - tax - service + discount;
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
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 12,
                color: BLACK,
                display: showDiscount ? "flex" : "none"
              }
            ]}
          >
            {_discount[this.state.languageIndex]}
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
            {this.idrNumToStr(subTotal)}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {this.idrNumToStr(tax)}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {this.idrNumToStr(service)}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 12,
                color: BLACK,
                display: showDiscount ? "flex" : "none"
              }
            ]}
          >
            {this.idrNumToStr(discount)}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
          >
            {this.idrNumToStr(grandTotal)}
          </Text>
        </View>
      </View>
    );
  }

  renderButtonCommand() {
    const { selectedData } = this.state;

    const receipt_id_valid = selectedData.receipt_id;
    let receipt_id_spt = false;

    if (receipt_id_valid) {
      receipt_id_spt = selectedData.receipt_id.includes("-SPT");
    }

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
            this.openReceipt();
          }}
          style={[
            ss.box,
            {
              display: this.state.payment_id !== 0 ? "flex" : "none",
              backgroundColor: "#72B9E1",
              width: "30%",
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
            {_send_receipt[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          onPress={() => {
            //console.log("portName luar ====> ", this.state.selectedStarPrinter)
            // if (!this.state.printer_busy) {
            //   this.printActionStarPrint();
            // }

            if (this.state.printer_main) {
              this.reprintReceipt();
            } else {
              let message = [];
              message.push(
                _perangkat_printer_tidak_terdeteksi[this.state.languageIndex]
              );
              this.setState({ showAlert: true, alertMessage: message });
            }
          }}
          style={[
            ss.box,
            {
              display:
                this.state.access_reprint_receipt && this.state.payment_id !== 0
                  ? "flex"
                  : "none",
              backgroundColor: "#72B9E1",
              width: "30%",
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
            {_reprint_receipt[this.state.languageIndex]}
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
                this.state.payment_id !== 0 &&
                  this.state.canRefund === true &&
                  this.state.access_cancelling_transaction === true &&
                  receipt_id_spt === false
                  ? "flex"
                  : "none",
              backgroundColor: "rgba(185, 60, 60, 0.9)",
              width: "30%",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              borderRadius: 15,
              elevation: 3
              //marginRight: 20
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 9, color: WHITE, margin: 5 }
            ]}
          >
            {_issue_refund[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
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

              justifyContent: "flex-end",
              width: this.state.tablet ? "75%" : "100%",
              alignSelf: "center"
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

  changePhoneReceipt(text) {
    this.setState({ receiptPhone: text });
  }

  submitReceipt() {
    //this.setState({ sendReceipt: false });
    if (this.state.receiptEmail !== "") {
      this.sendReceipt();
    }

    if (this.state.receiptPhone !== "") {
      this.sendWhatsApp();
    }
  }

  sendReceipt() {
    const { selectedData } = this.state;
    let uri = BE_Send_Struk;
    console.log("uri ===> ", uri);

    let body = {
      transaction_id: selectedData.id,
      email: this.state.receiptEmail
    };

    //console.log("body ===> ", body);

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
  }

  sendWhatsApp() {
    if (this.state.languageIndex === 1) {
      this.sendWhatsAppBahasa();
    } else {
      this.sendWhatsAppEng();
    }
  }

  sendWhatsAppBahasa() {
    const {
      userInfo,
      dataBill,
      selectedData,
      data_order,
      customPriceFinal,
      customPriceTax,
      receiptPhone
    } = this.state;

    console.log("dataBill ===> ", dataBill);
    console.log("selectedData ===> ", selectedData);

    let trans_id = selectedData.id;
    let address = "Alamat dari Retail";
    let business_name = userInfo.business_name;
    let gerai_name = userInfo.gerai_name;
    let alamat = userInfo.restaurant_address ? userInfo.restaurant_address : "";
    let cashier_name = userInfo.name;
    let transaction_id = trans_id;
    let time = moment(new Date()).format("HH:mm");
    //let no_table = this.state.selectedTable.name;
    let phone = this.props.receiptPhone ? this.props.receiptPhone : "";

    const discount_calculate =
      this.state.grandTotalDefault +
      this.state.customPriceFinal -
      this.state.grandTotalRound;

    let subTotal = 0;
    let total_bayar = 0;
    let detailPesanan = "";

    //detailPesanan = detailPesanan + detailPesanan + detailPesanan;

    dataBill.map((v, i) => {
      // subTotal = subTotal + v.qty * v.price;
      // subTotal = subTotal + v.qty * v.salesTypeValue;
      const data = v;
      let price_total = v.detail ? v.total : v.price_total;

      subTotal = subTotal + price_total;

      let detail = data.detail;
      let detailString = "";
      let total = data.total;

      let qty = data.qty ? data.qty : data.quantity;

      //price_addons_total: v.detail ? v.price - v.product.price : v.price_addons_total,

      total = price_total / qty;

      const detail_addons = v.detail ? v.detail : v.Transaction_Item_Addons;

      console.log("detail_addons ===> ", detail_addons);

      console.log("data ===> ", data);

      //console.log("qty ===> ", data);

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

    // let grand_total = this.state.grandTotalRound;

    let grand_total = 0;
    // let discount = this.state.bill_discount;
    let discount = 0;

    let payment_amount = 0;

    let payment_type = "";

    // if (payment_type !== "Cash") {
    //   total_bayar = grand_total;
    // } else {
    //   total_bayar = payment_amount;
    // }

    let kembali = 0;

    if (this.state.split_bill_data.length > 1) {
      let sum_tax = 0;
      let sum_service = 0;
      let sum_discount = 0;
      let sum_amount = 0;

      this.state.split_bill_data.map((v, i) => {
        //console.log("split_bill_data v ===> ", v);
        const temp_payment = v.Payment;
        const temp_grandTotal = temp_payment ? temp_payment.payment_total : 0;
        const temp_tax = temp_payment ? temp_payment.payment_tax : 0;
        const temp_service = temp_payment ? temp_payment.payment_service : 0;
        const temp_discount = temp_payment ? temp_payment.payment_discount : 0;
        const temp_amount = temp_payment ? temp_payment.amount : 0;

        grand_total = grand_total + temp_grandTotal;
        sum_tax = sum_tax + temp_tax;
        sum_service = sum_service + temp_service;
        discount = sum_discount + temp_discount;
        payment_amount = sum_amount + temp_amount;
      });

      total_bayar = payment_amount;
      payment_type = "SPLIT BAYAR";

      kembali = 0;
    } else {
      grand_total = selectedData.Payment.payment_total;
      // let discount = this.state.bill_discount;
      discount = selectedData.Payment.payment_discount;

      payment_amount = selectedData.Payment.amount;

      payment_type = selectedData.Payment.Payment_Method.name;

      if (payment_type !== "Cash") {
        total_bayar = grand_total;
      } else {
        total_bayar = payment_amount;
      }

      kembali = total_bayar - grand_total;
    }

    // eslint-disable-next-line prettier/prettier
    let text =
      `*E-Receipt*
*Terima Kasih telah berbelanja di ${business_name}-${gerai_name}*
${alamat}
${phone}
 

Nomor Transaksi : ${selectedData.receipt_id}
Transaction Time : ${time}
Payment Type : ${payment_type}
 
=================
Detail pesanan:
${detailPesanan}

Total: *${this.idrNumToStr(grand_total)}*
=================
Detail biaya :

Total tagihan : ${this.idrNumToStr(subTotal)}
Grand total : ${this.idrNumToStr(grand_total)}
Pembayaran : ${payment_type} ${this.idrNumToStr(total_bayar)}
Kembalian : ${this.idrNumToStr(kembali)}

Status: Lunas
=================
${detail_customer}

Terima kasih
    
Powered By BeetPOS`;

    let regzero = /^(0)/g;

    if (regzero.test(receiptPhone)) {
      Linking.openURL(
        "whatsapp://send?text=" +
        text +
        "&phone=" +
        receiptPhone.replace("0", "+62")
      ).catch(err => alert("WhatsApp tidak terinstall di perangkat anda"));
    } else {
      Linking.openURL(
        "whatsapp://send?text=" + text + "&phone=" + receiptPhone
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
      selectedData,
      data_order,
      customPriceFinal,
      customPriceTax,
      receiptPhone
    } = this.state;

    console.log("dataBill ===> ", dataBill);
    console.log("selectedData ===> ", selectedData);

    let trans_id = selectedData.id;
    let address = "Alamat dari Retail";
    let business_name = userInfo.business_name;
    let gerai_name = userInfo.gerai_name;
    let alamat = userInfo.restaurant_address ? userInfo.restaurant_address : "";
    let cashier_name = userInfo.name;
    let transaction_id = trans_id;
    let time = moment(new Date()).format("HH:mm");
    //let no_table = this.state.selectedTable.name;
    let phone = this.props.receiptPhone ? this.props.receiptPhone : "";

    const discount_calculate =
      this.state.grandTotalDefault +
      this.state.customPriceFinal -
      this.state.grandTotalRound;

    let subTotal = 0;
    let total_bayar = 0;
    let detailPesanan = "";

    //detailPesanan = detailPesanan + detailPesanan + detailPesanan;

    dataBill.map((v, i) => {
      // subTotal = subTotal + v.qty * v.price;
      // subTotal = subTotal + v.qty * v.salesTypeValue;
      const data = v;
      let price_total = v.detail ? v.total : v.price_total;

      subTotal = subTotal + price_total;

      let detail = data.detail;
      let detailString = "";
      let total = data.total;

      let qty = data.qty ? data.qty : data.quantity;

      //price_addons_total: v.detail ? v.price - v.product.price : v.price_addons_total,

      total = price_total / qty;

      const detail_addons = v.detail ? v.detail : v.Transaction_Item_Addons;

      console.log("detail_addons ===> ", detail_addons);

      console.log("data ===> ", data);

      //console.log("qty ===> ", data);

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

    // let grand_total = this.state.grandTotalRound;

    let grand_total = 0;
    // let discount = this.state.bill_discount;
    let discount = 0;

    let payment_amount = 0;

    let payment_type = "";

    // if (payment_type !== "Cash") {
    //   total_bayar = grand_total;
    // } else {
    //   total_bayar = payment_amount;
    // }

    let kembali = 0;

    if (this.state.split_bill_data.length > 1) {
      let sum_tax = 0;
      let sum_service = 0;
      let sum_discount = 0;
      let sum_amount = 0;

      this.state.split_bill_data.map((v, i) => {
        //console.log("split_bill_data v ===> ", v);
        const temp_payment = v.Payment;
        const temp_grandTotal = temp_payment ? temp_payment.payment_total : 0;
        const temp_tax = temp_payment ? temp_payment.payment_tax : 0;
        const temp_service = temp_payment ? temp_payment.payment_service : 0;
        const temp_discount = temp_payment ? temp_payment.payment_discount : 0;
        const temp_amount = temp_payment ? temp_payment.amount : 0;

        grand_total = grand_total + temp_grandTotal;
        sum_tax = sum_tax + temp_tax;
        sum_service = sum_service + temp_service;
        discount = sum_discount + temp_discount;
        payment_amount = sum_amount + temp_amount;
      });

      total_bayar = payment_amount;
      payment_type = "SPLIT BAYAR";

      kembali = 0;
    } else {
      grand_total = selectedData.Payment.payment_total;
      // let discount = this.state.bill_discount;
      discount = selectedData.Payment.payment_discount;

      payment_amount = selectedData.Payment.amount;

      payment_type = selectedData.Payment.Payment_Method.name;

      if (payment_type !== "Cash") {
        total_bayar = grand_total;
      } else {
        total_bayar = payment_amount;
      }

      kembali = total_bayar - grand_total;
    }

    // eslint-disable-next-line prettier/prettier
    let text =
      `*E-Receipt*
*Thank you for shopping in ${business_name}-${gerai_name}*
${alamat}
${phone}
 
Transaction ID : ${selectedData.id}
Receipt Number : ${selectedData.receipt_id}
Transaction Time : ${time}
Payment Type : ${payment_type}
 
=================
Detail Order:
${detailPesanan}

Total: *${this.idrNumToStr(grand_total)}*
=================
Cost Detail :

Sub Total : ${this.idrNumToStr(subTotal)}
Grand total : ${this.idrNumToStr(grand_total)}
Payment : ${payment_type} ${this.idrNumToStr(total_bayar)}
Change : ${this.idrNumToStr(kembali)}

Status: Paid
=================
${detail_customer}

Thank you
    
Powered By BeetPOS`;

    let regzero = /^(0)/g;

    if (regzero.test(receiptPhone)) {
      Linking.openURL(
        "whatsapp://send?text=" +
        text +
        "&phone=" +
        receiptPhone.replace("0", "+62")
      ).catch(err => alert("WhatsApp Not Installed"));
    } else {
      Linking.openURL(
        "whatsapp://send?text=" + text + "&phone=" + receiptPhone
      ).catch(err => alert("WhatsApp Not Installed"));
    }

    // Linking.openURL(
    //   "whatsapp://send?text=" + text + "&phone=" + formPhone
    // ).catch(err => alert("WhatsApp tidak terinstall di perangkat anda"));
  }

  openReceipt() {
    // this.setState({ receiptEmail: "", receiptPhone: "", sendReceipt: true });
    this.setState({
      receiptEmail: "",
      //receiptPhone: "087886038357",
      receiptPhone: "",
      sendReceipt: true
    });

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
            changePhoneAction={text => this.changePhoneReceipt(text)}
            email={this.state.receiptEmail}
            phone={this.state.receiptPhone}
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
                    {this.renderPartialRefund()}
                    {this.renderRefundLeftSide()}
                  </View>
                ) : (
                  <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
                    {this.renderDetailTransaksi()}
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
