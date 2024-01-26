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
import AddCashInOut from "../../Components/AddCashInOut";
import RekapKas from "../../Components/RekapKas";
import AlertCetakStruk from "../../Components/AlertCetakStruk";
import Loading from "../../Components/Loading";
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
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";

import LoginFunctions from "../../Libraries/LoginFunctions";

import moment from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import {
  _kas,
  _cari,
  _today,
  _from,
  _to,
  _alert_printer,
  _user,
  _status,
  _jam,
  _no_data_1,
  _no_data_2,
  _add,
  _rekap,
  _cash_in,
  _cash_out,
  _jumlah,
  _catatan,
  _simpan,
  _kembali,
  _cetak_struk,
  _tipe,
  _penjualan,
  _void,
  _cicilan,
  _jumlah_sistem,
  _jumlah_aktual,
  _tunai,
  _e_wallet,
  _selisih_1,
  _selisih_2,
  _kasir,
  _berhasil_update,
  _berhasil_delete,
  _berhasil_tambah,
  _error_semua_field,
  _gagal
} from "../../Libraries/DictionaryRekap";

import {
  GetRekapAPI,
  GetRekapDetailAPI,
  SaveRekapDetailAPI,
  DeleteRekapDetailAPI,
  ClosingRekapAPI
} from "../../Constants";
import { _ok_alert } from "../../Libraries/DictionarySetting";
import { _sub_total } from "../../Libraries/DictionaryHistory";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      loading: true,
      dataStruk: {
        id: 1,
        penjualan: 180000,
        void: 0,
        cicilan: 0,
        cashIn: 0,
        cashOut: 0,
        totalSystem: 180000,
        tunai: 100000,
        goPay: 80000,
        totalActual: 180000
      },
      rekapTunai: 0,
      rekapGoPay: 0,
      rekapTotal: 0,
      formRekap: false,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      startDate: moment(new Date())
        .add(-7, "days")
        .format("YYYY-MM-DD HH:mm"),
      endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      cetakStruk: false,
      showPrintStruk: false,
      errorCashInOut: "",
      printer_main: null,
      printer_kitchen: null,
      // dataRekap: [
      //   {
      //     id: 1,
      //     user: "Anthony",
      //     status: "Terbuka",
      //     time: "2020-01-01 15:50:00"
      //   },
      //   {
      //     id: 2,
      //     user: "Anthony",
      //     status: "Tertutup",
      //     time: "2020-01-01 15:50:00"
      //   }
      // ],
      dataRekap: [],
      dataDetail: [],
      // dataDetail: [
      //   {
      //     id: 1,
      //     type: "Kas Masuk",
      //     jumlah: 50000,
      //     catatan: "Uang Kembalian"
      //   },
      //   {
      //     id: 2,
      //     type: "Kas Keluar",
      //     jumlah: 50000,
      //     catatan: "Uang Kebersihan"
      //   }
      // ],
      selectedData: {
        id: "",
        user: "",
        status: "",
        time: ""
      },
      selectedDataStatus: "open",
      datePickerStart: false,
      datePickerEnd: false,
      selectedReason: 0,
      notes: "",
      addCashInOut: false,
      formJumlah: 0,
      formCatatan: "",
      formType: "in", //out
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
      ready: ""
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

    this.getRekapList();
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

    PrinterFunctions.GetPrintType(val => {
      if (val) {
        console.log("GetPrintType ==> ", val);
        this.setState({ printType: val });
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

  async openDrawer(printer = this.state.printer_main) {
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

    BluetoothEscposPrinter.openDrawer(0, 250, 250);
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
    const { dataStruk, userInfo, selectedData } = this.state;
    console.log("user Info ==> ", userInfo);
    let namaKasir = selectedData.user;
    let sales = selectedData.sales;
    let jum_void = selectedData.void;
    let credit = selectedData.credit;
    let restaurant_name = userInfo.restaurant_name;
    let difference = selectedData.difference;
    let total_system = selectedData.total_system;
    let total_actual = selectedData.total_actual;
    let cash_in = selectedData.cash_in;
    let cash_out = selectedData.cash_out;
    let nama = userInfo.name;
    let time = selectedData.date;
    time = moment(time).format("DD/MM/YYYY HH:mm:ss");

    let wallet = selectedData.total_system_wallet;
    let cash = selectedData.total_system_cash;

    // BluetoothEscposPrinter.printPic(ImageBase64, {
    //   width: 200,
    //   height: 200
    // });
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );

    await BluetoothEscposPrinter.printText(`${restaurant_name}\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1
    });

    await BluetoothEscposPrinter.printText(" \n\r", {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 3,
      heigthtimes: 3,
      fonttype: 1
    });

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    await BluetoothEscposPrinter.printText(`${time}\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1
    });

    await BluetoothEscposPrinter.printText(
      `${_kasir[this.state.languageIndex]} ${namaKasir}\n\r`,
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
    let z = 0;

    let total_value = sales;
    let total_length = total_value.toString().length;
    let total_space = "";
    let total_space_num = 0;
    if (total_length < 23) {
      total_space_num = 23 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }

    // sales
    await BluetoothEscposPrinter.printText(
      `Penjualan${total_space}${total_value}\n\r`,
      {}
    );

    total_value = jum_void;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 28) {
      total_space_num = 28 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Void${total_space}${total_value}\n\r`,
      {}
    );

    total_value = credit;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 25) {
      total_space_num = 25 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Cicilan${total_space}${total_value}\n\r`,
      {}
    );

    total_value = cash_in;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 23) {
      total_space_num = 23 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Kas Masuk${total_space}${total_value}\n\r`,
      {}
    );

    total_value = cash_out;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 22) {
      total_space_num = 22 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Kas Keluar${total_space}${total_value}\n\r`,
      {}
    );

    await BluetoothEscposPrinter.printText(
      "--------------------------------\n\r",
      {}
    );

    total_value = total_system;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 19) {
      total_space_num = 19 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Jumlah Sistem${total_space}${total_value}\n\r`,
      {}
    );

    total_value = cash;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 27) {
      total_space_num = 27 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Tunai${total_space}${total_value}\n\r`,
      {}
    );

    total_value = wallet;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 24) {
      total_space_num = 24 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `E-Wallet${total_space}${total_value}\n\r`,
      {}
    );

    await BluetoothEscposPrinter.printText(
      "--------------------------------\n\r",
      {}
    );

    total_value = total_actual;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 19) {
      total_space_num = 19 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Jumlah Aktual${total_space}${total_value}\n\r`,
      {}
    );

    total_value = difference;
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 25) {
      total_space_num = 25 - total_length;
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Selisih${total_space}${total_value}\n\r`,
      {}
    );

    // await BluetoothEscposPrinter.printText(
    //   "99 x 123456789012345678 12345678\n\r",
    //   {}
    // );

    await BluetoothEscposPrinter.printText(
      "--------------------------------\n\r",
      {}
    );
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

    BluetoothEscposPrinter.openDrawer(0, 250, 250);
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

  getRekapList() {
    const { userInfo, searchKey, startDate, endDate } = this.state;
    const gerai_id = userInfo.gerai_id;
    const retail_id = userInfo.retail_id;
    const search = searchKey ? searchKey : "";
    const date_start = moment(startDate).format("YYYY-MM-DD");
    const date_end = moment(endDate).format("YYYY-MM-DD");

    let uri = `${GetRekapAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&date_start=${date_start}&date_end=${date_end}&search=&page=1&search=${search}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          console.log("getData ==> ", result);
          this.setState({ dataRekap: resultData.data, loading: false });
          //console.log('new data ==>', JSON.stringify(data))
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getRekapDetail(id) {
    let uri = `${GetRekapDetailAPI}?rekap_id=${id}`;
    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27
    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          console.log("getData ==> ", result);
          this.setState({ dataDetail: resultData });
          //console.log('new data ==>', JSON.stringify(data))
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  selectData(data) {
    if (data.status === "open") {
      this.setState({
        selectedData: data,
        selectedDataStatus: data.status,
        cetakStruk: false
      });
      this.getRekapDetail(data.id);
    } else {
      console.log("cetak struk data ==> ", data);
      this.setState({
        selectedData: data,
        selectedDataStatus: data.status,
        cetakStruk: true
      });
    }
  }

  changeDateToday() {
    this.setState({
      startDate: moment(new Date()).format("YYYY-MM-DD 00:00:00"),
      endDate: moment(new Date()).format("YYYY-MM-DD 23:59:59")
    });

    this.getRekapList();
  }

  changeStartDate = (event, date) => {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      startDate: moment(date).format("YYYY-MM-DD 00:00:00"),
      datePickerStart: false
    });

    this.getRekapList();
  };

  changeEndDate2(event, date) {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;
    console.log("Change End Date 2 ==> ", date);
    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      endDate: moment(date).format("YYYY-MM-DD 23:59:59"),
      datePickerEnd: false
    });

    this.getRekapList();
  }

  changeEndDate = (event, date) => {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      endDate: moment(date).format("YYYY-MM-DD 23:59:59"),
      datePickerEnd: false
    });
    this.getRekapList();
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
            // onChange={this.changeEndDate}
            onChange={(event, date) => {
              this.changeEndDate2(event, date);
            }}
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
        {/* Cari Text Box End */}
        {/* Cari Tanggal Start */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            //backgroundColor: '#BCA',
            marginTop: 15,
            paddingRight: 15,
            paddingLeft: 15
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
    let time = data.time;
    time = moment(time).format("HH:mm");

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

    let status = "";
    if (data.status === "open") {
      status = "Open";
    } else {
      status = "Close";
    }

    //console.log("SELECTED DATA ==> ", selectedData)
    //console.log("data.id ==> ", data.id)
    return (
      <Button
        onPress={() => {
          // this.setState({ selectedData: data });
          this.selectData(data);
        }}
        style={[
          ss.box,
          {
            minHeight: 50,
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
            {_user[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {data.user}
          </Text>
          {/* <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex], marginTop: 0 }
            ]}
          />
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          /> */}
        </View>

        <View style={{ width: "25%" }}>
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex] }
            ]}
          >
            {_status[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {status}
          </Text>
          {/* <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex], marginTop: 0 }
            ]}
          />
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          /> */}
        </View>

        <View style={{ width: "20%" }}>
          <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex] }
            ]}
          >
            {_jam[this.state.languageIndex]} :
          </Text>
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          >
            {time}
          </Text>
          {/* <Text
            style={[
              MainStyle.dmSansBold,
              { fontSize: 15, color: textColor[colorIndex], marginTop: 0 }
            ]}
          />
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          /> */}
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
        {this.renderSearch()}
        <View style={{ margin: 15, flex: 1 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.dataRekap}
              renderItem={({ item, index }) => {
                return this.renderList(item, index);
              }}
              //ListFooterComponent={this._renderFooter}
              keyExtractor={(item, index) => {
                return "renderListRekap" + index.toString();
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
    let total = data.qty * data.price;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <View style={{ width: "50%", alignItems: "center" }}>
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
            {data.name}
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
    let time = data.time;
    time = moment(time).format("DD/MM/YYYY, HH:mm");
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
              Transaction ID
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
              Transaction ID
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
              {data.paymentType}
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
              Receipt Number
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
              BILL-{data.transId}
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
              Time and Date
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

  renderTotal() {
    const { dataBill } = this.state;
    let subTotal = 0;
    dataBill.map((v, i) => {
      subTotal = subTotal + v.qty * v.price;
    });

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
          borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
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
            {_sub_total[this.state.languageIndex]} :
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
        </View>
      </View>
    );
  }

  renderButtonCommand() {
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
            this.openCashInOut();
          }}
          style={[
            ss.box,
            {
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
              { fontSize: 18, color: WHITE, margin: 5 }
            ]}
          >
            {_add[this.state.languageIndex]}
          </Text>
        </Button>
        <Button
          onPress={() => {
            this.openRekap();
          }}
          style={[
            ss.box,
            {
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
            {_rekap[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  renderStrukButtonCommand() {
    return (
      <View
        style={{
          margin: 20,
          marginTop: 0,
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <View
          style={[
            ss.box,
            {
              elevation: 0,
              width: "40%"
            }
          ]}
        />
        <Button
          onPress={() => {
            //this.openRekap();
            this.printStruk();
          }}
          style={[
            ss.box,
            {
              backgroundColor: "rgba(131, 178, 53, 0.9)",
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
            {_cetak_struk[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  printStruk() {
    this.setState({ showPrintStruk: true });
    this.printAction();
  }

  closePrintStruk() {
    this.setState({ showPrintStruk: false });
  }

  deleteDetail(data) {
    const rekap_id = this.state.selectedData.id;

    this.setState({ loading: true });

    fetch(DeleteRekapDetailAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        id: data.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("PAYMENT RESPONSE ==> ", responseJson);

        let message = [];
        //message.push(responseJson.message);
        if (responseJson.status) {
          message.push(_berhasil_delete[this.state.languageIndex]);
        } else {
          message.push(_gagal[this.state.languageIndex]);
        }
        this.setState({
          loading: false,
          showAlert: true,
          alertMessage: message
        });

        this.getRekapDetail(rekap_id);

        //this.resetPage();
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  renderDataDetailRightSide(data, i) {
    //console.log("renderDataDetailRightSide ==> ", data);
    let indexColor = 0;
    const textColor = ["#37A441", "#FF0000"];

    let type = "";
    if (data.type === "in") {
      type = "Kas Masuk";
    } else {
      type = "Kas Keluar";
    }

    if (type === "Kas Masuk") {
      indexColor = 0;
    } else {
      indexColor = 1;
    }

    return (
      <View
        style={{
          borderRadius: 10,
          backgroundColor: WHITE,
          margin: 15,
          padding: 15,
          paddingTop: 10
        }}
      >
        {this.state.selectedData.status === "open" ? (
          <TouchableOpacity
            style={{
              height: 45,
              width: 35,
              position: "absolute",
              right: 15,
              top: 0,
              justifyContent: "center"
            }}
            // alignContent: "center",
            // alignItems: "center" }}
            onPress={() => {
              this.deleteDetail(data);
            }}
          >
            <Entypo
              name={"circle-with-cross"}
              style={{
                alignSelf: "center",
                fontSize: 30,
                color: RED_500,
                elevation: 1
              }}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View style={{ width: "30%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 16, color: BLACK }]}
            >
              {_tipe[this.state.languageIndex]} :
            </Text>
            <Text
              style={[
                MainStyle.dmSans,
                { fontSize: 16, color: textColor[indexColor], marginTop: 10 }
              ]}
            >
              {type}
            </Text>
          </View>
          <View style={{ width: "66%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 16, color: BLACK }]}
            >
              {_jumlah[this.state.languageIndex]} :
            </Text>
            <Text
              style={[
                MainStyle.dmSans,
                { fontSize: 16, color: textColor[indexColor], marginTop: 10 }
              ]}
            >
              {data.value}
            </Text>
          </View>
        </View>
        {/* Baris 1 end */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 16, color: BLACK }]}
            >
              {_catatan[this.state.languageIndex]} :
            </Text>
            <Text
              style={[
                MainStyle.dmSans,
                { fontSize: 16, color: BLACK, marginTop: 10 }
              ]}
            >
              {data.notes}
            </Text>
          </View>
        </View>
        {/* Baris 2 End */}
      </View>
    );
  }

  renderDetailRightSide() {
    const { dataDetail, cetakStruk } = this.state;
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
          {dataDetail.length === 0 ? (
            cetakStruk === false ? (
              this.renderNoDataRightSide()
            ) : (
              <View />
            )
          ) : cetakStruk === false ? (
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.dataDetail}
              renderItem={({ item, index }) => {
                return this.renderDataDetailRightSide(item, index);
              }}
              //ListFooterComponent={this._renderFooter}
              keyExtractor={(item, index) => {
                return "renderListRekap" + index.toString();
              }}
              //onRefresh={this._onRefresh}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={0.5}
              //refreshing={refreshing}
            />
          ) : (
            <View />
          )}
          {cetakStruk === true ? this.renderStrukRightSide() : <View />}
        </View>
        {cetakStruk === false ? (
          <View>{this.renderButtonCommand()}</View>
        ) : (
          <View>{this.renderStrukButtonCommand()}</View>
        )}

        {/* <View>{dataKasRekap ? this.renderButtonCommand() : <View />}</View> */}
      </View>
    );
  }

  renderStrukRightSide() {
    const { dataStruk, userInfo, selectedData } = this.state;
    console.log("user Info ==> ", userInfo);
    let namaKasir = selectedData.user;
    let sales = selectedData.sales;
    let jum_void = selectedData.void;
    let credit = selectedData.credit;
    let restaurant_name = userInfo.restaurant_name;
    let difference = selectedData.difference;
    let total_system = selectedData.total_system;
    let total_actual = selectedData.total_actual;
    let cash_in = selectedData.cash_in;
    let cash_out = selectedData.cash_out;
    let nama = userInfo.name;
    let time = selectedData.date;
    time = moment(time).format("DD/MM/YYYY HH:mm:ss");

    let wallet = selectedData.total_system_wallet;
    let cash = selectedData.total_system_cash;

    // id: 1,
    // penjualan: 180000,
    // void: 0,
    // cicilan: 0,
    // cashIn: 0,
    // cashOut: 0,
    // totalSystem: 180000,
    // tunai: 100000,
    // goPay: 80000,
    // totalActual: 180000

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              ss.box,
              { flex: 1, padding: 15, backgroundColor: "#EEEEEE" }
            ]}
          >
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 24, color: BLACK, marginTop: 10 }
              ]}
            >
              {restaurant_name}
            </Text>
            <Text
              style={[
                MainStyle.dmSansLight,
                { fontSize: 18, color: BLACK, marginTop: 10 }
              ]}
            >
              {_kasir[this.state.languageIndex]} : {namaKasir}
            </Text>
            <Text
              style={[
                MainStyle.dmSansLight,
                { fontSize: 18, color: BLACK, marginTop: 10 }
              ]}
            >
              {/* 04/10/2019 11:12:34 AM */}
              {time}
            </Text>
            {/* Penjualan */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_penjualan[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {sales}
                </Text>
              </View>
            </View>
            {/* Penjualan End */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_void[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {jum_void}
                </Text>
              </View>
            </View>
            {/* Void End */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_cicilan[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {credit}
                </Text>
              </View>
            </View>
            {/* Cicilan */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_cash_in[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {cash_in}
                </Text>
              </View>
            </View>
            {/* Kas Masuk */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                // borderBottomWidth: 1,
                // paddingBottom: 5,
                borderColor: BLACK
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_cash_out[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {cash_out}
                </Text>
              </View>
            </View>
            {/* Kas Keluar */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5,
                borderColor: BLACK
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_jumlah_sistem[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {sales}
                </Text>
              </View>
            </View>
            {/* Jumlah Sistem */}

            {/* Tunai Start  */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                // borderBottomWidth: 1,
                // paddingBottom: 5,
                borderColor: BLACK
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_tunai[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {cash}
                </Text>
              </View>
            </View>
            {/* Tunai end */}
            {/* Go Pay Start */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                // borderBottomWidth: 1,
                // paddingBottom: 5,
                borderColor: BLACK
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_e_wallet[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {wallet}
                </Text>
              </View>
            </View>
            {/* Go Pay End */}
            {/* Jumlah Aktual */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                borderTopWidth: 1,
                //borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5,
                borderColor: BLACK
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_jumlah_aktual[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {total_actual}
                </Text>
              </View>
            </View>
            {/* Jumlah Aktual */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                //marginTop: 10,
                //borderTopWidth: 1,
                //borderBottomWidth: 1,
                //paddingBottom: 5,
                //paddingTop: 5,
                borderColor: BLACK
              }}
            >
              <View style={{ width: "60%" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 18, color: BLACK }
                  ]}
                >
                  {_selisih_1[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    { fontSize: 10, color: BLACK }
                  ]}
                >
                  {_selisih_2[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%" }}>
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    {
                      fontSize: 18,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {difference}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderNoDataRightSide() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={[
            MainStyle.dmSansBold,
            { fontSize: 24, color: BLACK, margin: 5 }
          ]}
        >
          {_no_data_1[this.state.languageIndex]}
        </Text>
        <Text
          style={[
            MainStyle.dmSans,
            { fontSize: 14, color: BLACK, margin: 5 }
          ]}
        >
          {_no_data_2[this.state.languageIndex]}
        </Text>
        <MaterialCommunityIcons
          name={"book-open-variant"}
          style={{ fontSize: 150, color: "#9D9797" }}
        />
      </View>
    );
  }

  changeCashInOutJumlah(text) {
    this.setState({ formJumlah: text });
  }

  changeCashInOutCatatan(text) {
    this.setState({ formCatatan: text });
  }

  changeCashInOutType(text) {
    this.setState({ formType: text });
  }

  submitCashInOut() {
    const {
      formCatatan,
      formJumlah,
      formType,
      selectedData,
      userInfo
    } = this.state;

    this.setState({ loading: true });

    const rekap_id = selectedData.id;
    const cashier_id = userInfo.id;
    const time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    // console.log(
    //   "submitCashInOut  ==> ",
    //   rekap_id,
    //   cashier_id,
    //   time,
    //   SaveRekapDetailAPI
    // );

    console.log(
      "POST data ==> ",
      JSON.stringify({
        rekap_id: rekap_id,
        cashier_id: cashier_id,
        type: formType,
        value: formJumlah,
        notes: formCatatan,
        time: time
      })
    );
    if (formCatatan === "") {
      this.setState({
        errorCashInOut: _error_semua_field[this.state.languageIndex],
        loading: false
      });
      //save Cash In Out
    } else {
      fetch(SaveRekapDetailAPI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          rekap_id: rekap_id,
          time: time,
          cashier_id: cashier_id,
          type: formType,
          value: formJumlah,
          notes: formCatatan
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          let result = responseJson;
          console.log("PAYMENT RESPONSE ==> ", responseJson);
          //alert(responseJson.message);

          let message = [];
          //message.push(responseJson.message);
          if (responseJson.status) {
            message.push(_berhasil_tambah[this.state.languageIndex]);
          } else {
            message.push(_gagal[this.state.languageIndex]);
          }
          this.setState({
            loading: false,
            showAlert: true,
            alertMessage: message
          });

          this.getRekapDetail(rekap_id);
          //alert(result.message);
          //this.resetPage();
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });

      this.setState({ errorCashInOut: "", addCashInOut: false });
    }
  }

  openCashInOut() {
    this.openDrawer();
    this.setState({
      formType: "in",
      formCatatan: "",
      formJumlah: 0,
      addCashInOut: true
    });
  }

  closeCashInOut() {
    this.setState({
      formType: "in",
      formCatatan: "",
      formJumlah: 0,
      addCashInOut: false
    });
  }

  changeRekapTunai(text) {
    this.setState({ rekapTunai: text });
  }
  changeRekapGoPay(text) {
    this.setState({ rekapGoPay: text });
  }

  changeRekapTotal(text) {
    this.setState({ rekapTotal: text });
  }

  closeRekap() {
    this.setState({
      rekapTunai: 0,
      rekapGoPay: 0,
      rekapTotal: 0,
      formRekap: false
    });
  }

  submitRekap() {
    // this.setState({
    //   formRekap: false
    // });rekapTunai: 0,
    //  rekapGoPay: 0,
    const {
      selectedData,
      userInfo,
      rekapTotal,
      rekapTunai,
      rekapGoPay
    } = this.state;
    this.setState({ loading: true });

    const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const closing = true;
    const total = rekapTotal;

    fetch(ClosingRekapAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        rekap_id: selectedData.id,
        time_close: time_now,
        cashier_id: userInfo.id,
        total_actual: total,
        closing: closing,
        total_wallet: rekapGoPay,
        total_cash: rekapTunai
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("PAYMENT RESPONSE ==> ", responseJson);
        let message = [];
        //message.push(result.message);
        if (responseJson.status) {
          message.push(_berhasil_update[this.state.languageIndex]);
        } else {
          message.push(_gagal[this.state.languageIndex]);
        }

        this.setState({
          selectedData: result.data,
          formRekap: false,
          cetakStruk: true,
          selectedDataStatus: "close",
          loading: false,
          showAlert: true,
          alertMessage: message
        });

        this.getRekapList();
        //this.getRekapDetail(result.data);
        //alert(result.message);
        //this.resetPage();
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  openRekap() {
    this.openDrawer();
    this.setState({
      rekapTunai: 0,
      rekapGoPay: 0,
      rekapTotal: 0,
      formRekap: true
    });
  }

  render() {
    let height = Dimensions.get("window").height - 90;
    let {
      formRekap,
      addCashInOut,
      formCatatan,
      formJumlah,
      formType,
      rekapTunai,
      rekapGoPay,
      rekapTotal,
      showPrintStruk,
      errorCashInOut
    } = this.state;
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        <Header
          colorIndex={this.state.colorIndex}
          title={_kas[this.state.languageIndex]}
          notif={true}
          loginInformation={this.state.userInfo}
          menu={true}
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
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

        {formRekap ? (
          <RekapKas
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.colorIndex}
            closeAction={() => this.closeRekap()}
            submitAction={() => this.submitRekap()}
            changeRekapTunai={text => this.changeRekapTunai(text)}
            changeRekapGoPay={text => this.changeRekapGoPay(text)}
            changeRekapTotal={text => this.changeRekapTotal(text)}
            rekapTunai={rekapTunai}
            rekapGoPay={rekapGoPay}
            rekapTotal={rekapTotal}
            catatan={formCatatan}
            jumlah={formJumlah}
            type={formType}
          />
        ) : (
          <View />
        )}

        {showPrintStruk ? (
          <AlertCetakStruk
            colorIndex={this.state.colorIndex}
            actions={() => {
              this.closePrintStruk();
            }}
          />
        ) : (
          <View />
        )}

        {addCashInOut ? (
          <AddCashInOut
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.colorIndex}
            closeAction={() => this.closeCashInOut()}
            submitAction={() => this.submitCashInOut()}
            error={errorCashInOut}
            changeJumlah={text => this.changeCashInOutJumlah(text)}
            changeCatatan={text => this.changeCashInOutCatatan(text)}
            changeType={text => this.changeCashInOutType(text)}
            catatan={formCatatan}
            jumlah={formJumlah}
            type={formType}
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
            <View style={[ss.leftSide]}>{this.renderHistoryLeftSide()}</View>
            <View style={[ss.rightSide]}>{this.renderDetailRightSide()}</View>
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
