/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
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
  ActivityIndicator,
  ImageDefault,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  Dimensions
} from "react-native";
import DeviceInfo from "react-native-device-info";

import MainStyle from "../../Styles";

import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";

import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import Header from "../../Components/Header";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import AlertLogin from "../../Components/AlertLogin";
import SelectLanguage from "../../Components/SelectLanguage";
import SelectColor from "../../Components/SelectColor";

import ColorFunctions from "../../Libraries/ColorFunctions";

import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/Dropdown";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Geolocation from "@react-native-community/geolocation";
// import Orientation from "react-native-orientation-locker";

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
import MenuFunctions from "../../Libraries/MenuFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import {
  _aplikasi,
  _printer,
  _struk,
  _informasi,
  _logout,
  _pilih_bahasa,
  _warna_aplikasi,
  _backup_data,
  _sinkronisasi_data,
  _auto_detect_printer,
  _perangkat_printer_terdeteksi,
  _perangkat_printer_tidak_terdeteksi,
  _edit_footer,
  _cetak_order_id,
  _catat_saldo,
  _tampilkan_stok,
  _nama_perangkat,
  _tipe_account,
  _alamat_ip,
  _versi,
  _cashier,
  _dapur,
  _bluetooth_tidak_aktif,
  _bluetooth_tidak_aktif_2,
  _sukses_footer,
  _sukses_printer_1,
  _sukses_printer_2
} from "../../Libraries/DictionarySetting";

import Loading from "../../Components/Loading";
import { LogoutAPI } from "../../Constants";

const _page_title = ["Pengaturan", "Settings"];
export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFooterForm: false,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      languageList: ["Bahasa Indonesia", "English"],
      loadingPrinter: true,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0, //default 0
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      clockIn: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      clockOut: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      printer_kitchen: null,
      printer_main: null,
      selectedUser: 1,
      cetakOrderId: false,
      catatSaldoRekapKas: false,
      tampilkanStokMenu: false,
      autoDetectPrinter: false,
      ready: true,
      activeMenu: 1,
      showLanguageSelection: false,
      showColorSelection: false,
      activeSelection: this.props.languageIndex ? this.props.languageIndex : 0,

      selectedPrinter: null,
      showModalPrinter: false,
      selectedCategory: [{ id: 1, name: "Kopi" }, { id: 2, name: "Food" }],
      listPrinter: [
        {
          id: 1,
          name: "EPSON Thermal Printer Cashier",
          available: true,
          address: "ASD"
        },
        {
          id: 2,
          name: "EPSON Thermal Printer Kitchen",
          available: true,
          address: "ASD"
        },
        {
          id: 3,
          name: "EPSON Thermal Printer Bar",
          available: false,
          address: "ASD"
        }
      ],
      dataBill: [],
      informasi: {
        namaPerangkat: "Mesin Kasir",
        email: "hello@lifetech.co.id",
        accountType: "Basic Version",
        ipAddress: "192.168.0.1",
        version: "1.0.0",
        staffId: "00001"
      },
      //color
      activeColorIndex: 0,
      colorSelection: [
        "#732F46",
        "#79BCE2",
        "#A2DC68",
        "#E29840",
        "#B853AE",
        "#BA1818",
        "#AE79E2",
        "#D6D946",
        "#000000",
        "#FFFFFF"
      ],
      device_name: "",
      ip_address: "",
      footer_printer: "",
      show_order_id: false
    };
  }

  componentDidMount() {
    ColorFunctions.GetColor(val => {
      if (val !== 0 && this.state.colorIndex === 0) {
        this.setState({ colorIndex: val });
      }
    });

    this.getBillData();
    console.log("userInfo ==> ", this.props.userInfo);

    let string = "This is the product name example and its quite long";
    let product_name_array = this.divideLongWord(string, 17);

    //let tempProdName = this.divideLongWord(product_name, 9);
    let product_name_length = product_name_array.length;
    console.log("product_name_length ==> ", product_name_length);

    DeviceInfo.getDeviceName().then(deviceName => {
      // iOS: "Becca's iPhone 6"
      // Android: ?
      // Windows: ?
      if (deviceName) {
        this.setState({ device_name: deviceName });
      }
    });

    DeviceInfo.getIpAddress().then(ip => {
      if (ip) {
        this.setState({ ip_address: ip });
      }
    });

    this.getPrinterData();
    this.checkBluetooth();
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

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        console.log("GetLanguage ==> ", val);
        this.setState({ languageIndex: val, activeSelection: val });
      }
    });
  }

  saveFooterPrinter() {
    const { footer_printer } = this.state;

    PrinterFunctions.SaveFooterPrinter(footer_printer, val => {
      alert(_sukses_footer[this.state.languageIndex]);
    });

    this.setState({ footer_printer: footer_printer });
  }

  getBillData() {
    MenuFunctions.GetMenu(val => {
      if (val) {
        console.log("Data Bill ==> ", val);
        this.setState({ dataBill: val });
      }
    });
  }

  actionSelectPrinter(data) {
    this.setState({ showModalPrinter: true, selectedPrinter: data });
    this.connect(data.address);
  }

  actionConnectBill() {
    const { selectedPrinter } = this.state;

    PrinterFunctions.SaveMainPrinter(selectedPrinter, val => {
      alert(_sukses_printer_1[this.state.languageIndex]);
    });

    this.setState({ printer_main: selectedPrinter });
  }

  actionConnectKitchen() {
    const { selectedPrinter } = this.state;

    PrinterFunctions.SaveKitchenPrinter(selectedPrinter, val => {
      alert(_sukses_printer_2[this.state.languageIndex]);
    });

    this.setState({ printer_kitchen: selectedPrinter });
  }

  componentDidUpdate(nextProps) {}

  enableBluetooth() {
    BluetoothManager.enableBluetooth().then(
      r => {
        // var paired = [];
        // if (r && r.length > 0) {
        //   for (var i = 0; i < r.length; i++) {
        //     try {
        //       paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
        //     } catch (e) {
        //       //ignore
        //     }
        //   }
        // }
        // console.log(JSON.stringify(paired));
        this.checkBluetooth();
      },
      err => {
        alert(_bluetooth_tidak_aktif_2[this.state.languageIndex]);
      }
    );
  }

  checkBluetooth() {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        // alert(enabled); // enabled ==> true /false
        console.log("Bluetooth Enabled ==> ", enabled);

        if (enabled == false) {
          alert(_bluetooth_tidak_aktif[this.state.languageIndex]);
          this.enableBluetooth();
        } else {
          //alert("Bluetooth aktif");
          this.getPrinterList();
        }

        // BluetoothManager.scanDevices().then(
        //   s => {
        //     var ss = JSON.parse(s); //JSON string
        //     console.log("Printer Pair ==> ", ss);
        //     this.setState(
        //       {
        //         pairedDs: this.state.pairedDs.cloneWithRows(ss.paired || []),
        //         foundDs: this.state.foundDs.cloneWithRows(ss.found || []),
        //         loading: false
        //       },
        //       () => {
        //         this.paired = ss.paired || [];
        //         this.found = ss.found || [];
        //       }
        //     );
        //   },
        //   er => {
        //     this.setState({
        //       loading: false
        //     });
        //     alert("error" + JSON.stringify(er));
        //   }
        // );
      },
      err => {
        alert(_bluetooth_tidak_aktif[this.state.languageIndex]);
      }
    );
  }

  getPrinterList() {
    BluetoothManager.scanDevices().then(
      s => {
        var ss = JSON.parse(s); //JSON string
        console.log("Printer Pair ==> ", ss.paired);
        console.log("Device Found ==> ", ss.found);

        this.setState(
          {
            listPrinter: ss.paired,
            listDevice: ss.found,
            loadingPrinter: false
          },
          () => {}
        );
      },
      er => {
        this.setState({
          loadingPrinter: false,
          listPrinter: null,
          listDevice: null
        });
        alert("error" + JSON.stringify(er));
      }
    );
  }

  connect(address = "00:0E:0E:02:93:45") {
    //let imagetestbase64 = ImageBase64;
    //imagetestbase64 = Image2;

    // BluetoothManager.isBluetoothEnabled().then(
    //   enabled => {
    //     // alert(enabled); // enabled ==> true /false
    //     console.log("Bluetooth Enabled ==> ", enabled);

    //     BluetoothManager.scanDevices().then(
    //       s => {
    //         var ss = JSON.parse(s); //JSON string
    //         console.log("Printer Pair ==> ", ss);
    //         this.setState(
    //           {
    //             pairedDs: this.state.pairedDs.cloneWithRows(ss.paired || []),
    //             foundDs: this.state.foundDs.cloneWithRows(ss.found || []),
    //             loading: false
    //           },
    //           () => {
    //             this.paired = ss.paired || [];
    //             this.found = ss.found || [];
    //           }
    //         );
    //       },
    //       er => {
    //         this.setState({
    //           loading: false
    //         });
    //         alert("error" + JSON.stringify(er));
    //       }
    //     );
    //   },
    //   err => {
    //     alert(err);
    //   }
    // );

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
          alert(_bluetooth_tidak_aktif[this.state.languageIndex]);
        }
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

  truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + ".";
  }

  async print() {
    const { userInfo, dataBill } = this.state;
    let address = "Alamat dari Retail";
    let gerai_name = userInfo.gerai_name;
    let description = userInfo.gerai_name + " " + userInfo.description;
    let cashier_name = userInfo.name;
    let transaction_id = "123123";
    let time = moment(new Date()).format("HH:mm");
    let no_table = "1";

    let subTotal = 0;
    let total_bayar = 0;

    dataBill.map((v, i) => {
      subTotal = subTotal + v.qty * v.price;
      subTotal = subTotal + v.qty * v.salesTypeValue;
    });

    let grand_total = parseInt(Math.ceil(subTotal * 1.15));

    total_bayar = parseInt(Math.ceil(grand_total));

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

    await BluetoothEscposPrinter.printText(`No Table ${no_table}\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1
    });

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

    grand_total = grand_total.toString();
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
    await BluetoothEscposPrinter.printText(
      "--------------------------------\n\r",
      {}
    );
    await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
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

  async openDrawer() {
    BluetoothEscposPrinter.openDrawer(0, 250, 250);
  }

  changeCetakOrderId() {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    PrinterFunctions.SaveShowOrderIDPrinter(!this.state.show_order_id, val => {
      //alert("Sukses Set Footer Printer");
    });
    this.setState({ show_order_id: !this.state.show_order_id });
  }

  changeSaldoRekapKas() {
    this.setState({ catatSaldoRekapKas: !this.state.catatSaldoRekapKas });
  }

  changeTampilkanStokMenu() {
    this.setState({ tampilkanStokMenu: !this.state.tampilkanStokMenu });
  }

  renderMenu() {
    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            margin: 15,
            backgroundColor: WHITE,
            borderColor: "#79BCE2",
            borderWidth: 1,
            borderRadius: 10,
            padding: 20
          }
        ]}
      >
        <Button
          onPress={() => {
            this.setState({ activeMenu: 0 });
          }}
          style={[ss.menuButton, { marginTop: 0 }]}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              {_aplikasi[this.state.languageIndex]}
            </Text>
          </View>
          <View style={{ width: "20%", paddingRight: 15 }}>
            <MaterialCommunityIcons
              name={"chevron-double-right"}
              style={{ fontSize: 36, alignSelf: "flex-end" }}
            />
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({ activeMenu: 1 });
          }}
          style={[ss.menuButton, {}]}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              {_printer[this.state.languageIndex]}
            </Text>
          </View>
          <View style={{ width: "20%", paddingRight: 15 }}>
            <MaterialCommunityIcons
              name={"chevron-double-right"}
              style={{ fontSize: 36, alignSelf: "flex-end" }}
            />
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({ activeMenu: 2 });
          }}
          style={[ss.menuButton, {}]}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              {_struk[this.state.languageIndex]}
            </Text>
          </View>
          <View style={{ width: "20%", paddingRight: 15 }}>
            <MaterialCommunityIcons
              name={"chevron-double-right"}
              style={{ fontSize: 36, alignSelf: "flex-end" }}
            />
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({ activeMenu: 3 });
          }}
          style={[ss.menuButton, {}]}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              {_informasi[this.state.languageIndex]}
            </Text>
          </View>
          <View style={{ width: "20%", paddingRight: 15 }}>
            <MaterialCommunityIcons
              name={"chevron-double-right"}
              style={{ fontSize: 36, alignSelf: "flex-end" }}
            />
          </View>
        </Button>
        <Button
          onPress={() => {
            //alert('Logout Clicked');
            //Actions.reset('Home');
            //Actions.Home();
            //Actions.reset('Home');
            LoginFunctions.Logout(val => {
              //this.setState({userInfo: val});

              // if (logoutAction) {
              //   logoutAction();
              // }
              fetch(LogoutAPI, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                  //"Content-Type": "application/x-www-form-urlencoded"
                },
                body: JSON.stringify({
                  staff_id: this.state.userInfo.id
                })
              })
                .then(response => response.json())
                .then(responseJson => {
                  Actions.MobileLogin({
                    userInfo: null,
                    colorIndex: this.state.colorIndex
                  });
                  this.setState({ userInfo: null });
                })
                .catch(_err => {});

              //Actions.reset("Home");
            });
            //Actions.Login();
            //Actions.Login2Stack();
          }}
          style={[ss.menuButton, { borderBottomWidth: 0 }]}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              Log Out
            </Text>
          </View>
          <View style={{ width: "20%", paddingRight: 15 }}>
            <MaterialCommunityIcons
              name={"chevron-double-right"}
              style={{ fontSize: 36, alignSelf: "flex-end" }}
            />
          </View>
        </Button>
      </View>
    );
  }

  renderAplikasi() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => {
            this.setState({ showLanguageSelection: true });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              backgroundColor: WHITE,
              borderColor: "#79BCE2",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 0
            }
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "75%" }}>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 28, color: BLACK }
                ]}
              >
                {_pilih_bahasa[this.state.languageIndex]}
              </Text>
            </View>
            <View style={{ justifyContent: "center", width: "25%" }}>
              <Text
                style={[MainStyle.dmSans, { fontSize: 14, color: BLACK }]}
              >
                {this.state.languageList[this.state.languageIndex]}
              </Text>
            </View>
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({ showColorSelection: true });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              backgroundColor: WHITE,
              borderColor: "#79BCE2",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 0
            }
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "75%" }}>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 28, color: BLACK }
                ]}
              >
                {_warna_aplikasi[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "25%"
              }}
            >
              <View
                style={[
                  ss.box,
                  {
                    width: 40,
                    height: 40,
                    borderWidth: 1,
                    borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    borderRadius: 15
                  }
                ]}
              />
            </View>
          </View>
        </Button>
        <Button
          style={[
            ss.box,
            {
              margin: 15,
              backgroundColor: WHITE,
              borderColor: "#79BCE2",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 0
            }
          ]}
        >
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
          >
            {_backup_data[this.state.languageIndex]}
          </Text>
        </Button>
        <Button
          style={[
            ss.box,
            {
              margin: 15,
              backgroundColor: WHITE,
              borderColor: "#79BCE2",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 0
            }
          ]}
        >
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
          >
            {_sinkronisasi_data[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  renderStrukMain() {
    const {
      cetakOrderId,
      catatSaldoRekapKas,
      tampilkanStokMenu,
      showFooterForm
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => {
            if (showFooterForm === true) {
              this.saveFooterPrinter();
            }
            this.setState({ showFooterForm: !showFooterForm });

            // LayoutAnimation.configureNext(
            //   LayoutAnimation.Presets.easeInEaseOut
            // );
          }}
          style={[
            ss.box,
            {
              margin: 15,
              backgroundColor: WHITE,
              borderColor: "#79BCE2",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 0
            }
          ]}
        >
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
          >
            {_edit_footer[this.state.languageIndex]}
          </Text>
        </Button>
        {this.state.showFooterForm ? (
          <View
            style={[
              ss.box,
              {
                margin: 15,
                marginTop: 0,
                backgroundColor: WHITE,
                borderColor: "#79BCE2",
                borderWidth: 1,
                borderRadius: 10,
                padding: 20,
                marginBottom: 0
              }
            ]}
          >
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 28, color: BLACK, justifyContent: "center" }
              ]}
            >
              Footer
            </Text>
            <TextInput
              ref={q => {
                this.Footer = q;
              }}
              style={{
                backgroundColor: WHITE,
                width: "100%",
                fontSize: 16,
                color: BLACK,
                borderBottomColor: "#C4C4C4",
                borderBottomWidth: 1,
                fontFamily: "DMSans-Regular"
              }}
              //keyboardType="numeric"
              type="text"
              value={this.state.footer_printer}
              onChangeText={v => {
                this.setState({ footer_printer: v });
              }}
              onSubmitEditing={() => {
                this.setState({ showFooterForm: false });
                this.saveFooterPrinter();
              }}
              placeholder={"Footer"}
              placeholderTextColor={BLACK}
            />
          </View>
        ) : (
          <View />
        )}
        {/* Button 1 */}
        <View
          style={[
            ss.box,
            {
              margin: 15,
              backgroundColor: WHITE,
              borderColor: "#79BCE2",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 0,
              flexDirection: "row"
            }
          ]}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              {_cetak_order_id[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingRight: 15,
              //backgroundColor: "#888",
              alignItems: "center"
            }}
          >
            <View style={{ marginTop: -20 }}>
              <Button
                onPress={() => {
                  this.changeCetakOrderId();
                  //this.changeSaldoRekapKas();
                  //this.changeTampilkanStokMenu();
                }}
                style={{
                  //backgroundColor: '#CCC',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  borderRadius: 0
                }}
              >
                <MaterialCommunityIcons
                  name={
                    this.state.show_order_id
                      ? "toggle-switch-outline"
                      : "toggle-switch-off-outline"
                  }
                  style={{ fontSize: 75 }}
                />
              </Button>
            </View>
          </View>
        </View>
        {/* Button 2 */}
        <View
          style={[
            ss.box,
            {
              margin: 15,
              backgroundColor: WHITE,
              borderColor: "#79BCE2",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 0,
              flexDirection: "row"
            }
          ]}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              {_catat_saldo[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingRight: 15,
              //backgroundColor: "#888",
              alignItems: "center"
            }}
          >
            <View style={{ marginTop: -20 }}>
              <Button
                onPress={() => {
                  //this.changeCetakOrderId();
                  this.changeSaldoRekapKas();
                  //this.changeTampilkanStokMenu();
                }}
                style={{
                  //backgroundColor: '#CCC',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  borderRadius: 99
                }}
              >
                <MaterialCommunityIcons
                  name={
                    catatSaldoRekapKas
                      ? "toggle-switch-outline"
                      : "toggle-switch-off-outline"
                  }
                  style={{ fontSize: 75 }}
                />
              </Button>
            </View>
          </View>
        </View>
        {/* Button 3 */}
        <View
          style={[
            ss.box,
            {
              margin: 15,
              backgroundColor: WHITE,
              borderColor: "#79BCE2",
              borderWidth: 1,
              borderRadius: 10,
              padding: 20,
              marginBottom: 0,
              flexDirection: "row"
            }
          ]}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              {_tampilkan_stok[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingRight: 15,
              //backgroundColor: "#888",
              alignItems: "center"
            }}
          >
            <View style={{ marginTop: -20 }}>
              <Button
                onPress={() => {
                  //this.changeCetakOrderId();
                  //this.changeSaldoRekapKas();
                  this.changeTampilkanStokMenu();
                }}
                style={{
                  //backgroundColor: '#CCC',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  borderRadius: 99
                }}
              >
                <MaterialCommunityIcons
                  name={
                    tampilkanStokMenu
                      ? "toggle-switch-outline"
                      : "toggle-switch-off-outline"
                  }
                  style={{ fontSize: 75 }}
                />
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderInformasi() {
    const { informasi, userInfo, device_name, ip_address } = this.state;

    let version = DeviceInfo.getVersion();
    let email = userInfo.email;

    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            margin: 15,
            backgroundColor: WHITE,
            borderRadius: 15,
            elevation: 2,
            padding: 20
          }
        ]}
      >
        <View style={[{ marginTop: 0, flexDirection: "row" }]}>
          <View style={{ width: "50%" }}>
            <Text
              style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}
            >
              {_nama_perangkat[this.state.languageIndex]}
            </Text>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {device_name}
            </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text
              style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}
            >
              Staff Id
            </Text>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {userInfo.staff_id}
            </Text>
          </View>
        </View>
        <View style={[{ marginTop: 15 }]}>
          <Text style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}>
            Email
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
          >
            {userInfo.email}
          </Text>
        </View>
        <View style={[{ marginTop: 15 }]}>
          <Text style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}>
            {_tipe_account[this.state.languageIndex]}
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
          >
            {informasi.accountType}
          </Text>
        </View>
        <View style={[{ marginTop: 15 }]}>
          <Text style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}>
            {_alamat_ip[this.state.languageIndex]}
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
          >
            {/* {ip_address} */}
          </Text>
        </View>
        <View style={[{ marginTop: 15 }]}>
          <Text style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}>
            {_versi[this.state.languageIndex]}
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
          >
            {version}
          </Text>
        </View>
        {/* Informasi end */}
        {/* Button */}
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            style={[
              ss.box,
              {
                marginTop: 10,
                borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                borderWidth: 1,
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                alignContent: "center",
                alignItems: "center",
                borderRadius: 15,
                padding: 10
              }
            ]}
          >
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 14,
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }
              ]}
            >
              Customer Support
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  changeAutoDetectPrinter() {
    this.setState({ autoDetectPrinter: !this.state.autoDetectPrinter });
  }

  renderModalPrinter() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        onRequestClose={() => {
          this.setState({ showModalPrinter: false });
        }}
        visible={this.state.showModalPrinter}
      >
        <View style={[ss.modalCover]}>
          <View style={[ss.modalBox]}>
            <View style={{ position: "absolute", right: 10, top: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showModalPrinter: false });
                }}
              >
                <Ionicons
                  name={"ios-close-circle-outline"}
                  size={30}
                  color={BLACK}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                ss.modalHeader,
                { flexDirection: "column", marginTop: 15 }
              ]}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 14, color: BLACK }
                ]}
              >
                {this.state.selectedPrinter
                  ? this.state.selectedPrinter.name
                  : ""}
              </Text>
            </View>
            <View
              style={[
                ss.modalContent,
                {
                  flexDirection: "column",
                  marginTop: 15,
                  marginBottom: 15,
                  justifyContent: "space-around"
                }
              ]}
            >
              <Button
                onPress={() => {
                  this.actionConnectBill();
                }}
                style={[
                  ss.box,
                  {
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    width: "100%",
                    borderColor: "#79BCE2",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 0,
                    flexDirection: "row"
                  }
                ]}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 14, color: WHITE }
                  ]}
                >
                  Set Printer Cashier
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.actionConnectKitchen();
                }}
                style={[
                  ss.box,
                  {
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    width: "100%",
                    borderColor: "#79BCE2",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 0,
                    flexDirection: "row"
                  }
                ]}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 14, color: WHITE }
                  ]}
                >
                  Set Printer Dapur
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.print();
                }}
                style={[
                  ss.box,
                  {
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    width: "100%",
                    borderColor: "#79BCE2",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 0,
                    flexDirection: "row"
                  }
                ]}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 14, color: WHITE }
                  ]}
                >
                  Test Print
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.openDrawer();
                }}
                style={[
                  ss.box,
                  {
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    width: "100%",
                    borderColor: "#79BCE2",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 0,
                    flexDirection: "row"
                  }
                ]}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 14, color: WHITE }
                  ]}
                >
                  Test Open Drawer
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  renderPrinterMain() {
    let { autoDetectPrinter } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.renderModalPrinter()}
        <View style={[ss.box, { flex: 1, backgroundColor: "#EEEEEE" }]}>
          <View
            style={[
              ss.box,
              {
                margin: 15,
                backgroundColor: WHITE,
                borderColor: "#79BCE2",
                borderWidth: 1,
                borderRadius: 10,
                padding: 20,
                marginBottom: 0,
                flexDirection: "row"
              }
            ]}
          >
            <View style={{ width: "80%" }}>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 28, color: BLACK }
                ]}
              >
                {_auto_detect_printer[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                width: "20%",
                paddingRight: 15,
                //backgroundColor: "#888",
                alignItems: "center"
              }}
            >
              <View style={{ marginTop: -20 }}>
                <Button
                  onPress={() => {
                    //this.changeCetakOrderId();
                    //this.changeSaldoRekapKas();
                    this.changeAutoDetectPrinter();
                  }}
                  style={{
                    //backgroundColor: '#CCC',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: 99
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      autoDetectPrinter
                        ? "toggle-switch-outline"
                        : "toggle-switch-off-outline"
                    }
                    style={{ fontSize: 75 }}
                  />
                </Button>
              </View>
            </View>
          </View>
          {this.renderListPrinter()}
          {/* {this.renderNoData()} */}
          {this.state.listPrinter.length < 1 ? this.renderNoData() : <View />}
        </View>
      </View>
    );
  }

  renderNoData() {
    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            //margin: 15,
            //backgroundColor: WHITE,
            //borderColor: "#79BCE2",
            //borderWidth: 1,
            //borderRadius: 10,
            //padding: 20,
            elevation: 0,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }
        ]}
      >
        <MaterialCommunityIcons
          name={"printer-off"}
          style={{ fontSize: 150, color: "#C4C4C4" }}
        />
        <Text style={[MainStyle.dmSans, { fontSize: 20, color: "#888" }]}>
          {_perangkat_printer_tidak_terdeteksi[this.state.languageIndex]}
        </Text>
      </View>
    );
  }

  renderListPrinter() {
    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            margin: 15,
            backgroundColor: WHITE,
            borderColor: "#79BCE2",
            borderWidth: 1,
            borderRadius: 10,
            padding: 20
          }
        ]}
      >
        <View>
          <View style={{ width: "100%", marginBottom: 25 }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
            >
              {_perangkat_printer_terdeteksi[this.state.languageIndex]}
            </Text>
          </View>
        </View>
        {this.state.loadingPrinter ? (
          <ActivityIndicator size="large" color="#39f" animating={true} />
        ) : (
          <FlatList
            //ListHeaderComponent={this.renderSearch()}
            showsVerticalScrollIndicator={false}
            data={this.state.listPrinter}
            renderItem={({ item, index }) => {
              if (this.state.ready === true) {
                return this.renderDataPrinter(item, index);
              } else {
                return <View />;
              }
            }}
            //ListFooterComponent={this._renderFooter}
            keyExtractor={(item, index) => {
              return "RenderPrinter" + index.toString();
            }}
            //onRefresh={this._onRefresh}
            //onEndReached={this.handleLoadMore}
            //onEndReachedThreshold={0.5}
            //refreshing={refreshing}
          />
        )}
      </View>
    );
  }

  renderDataPrinter(data, i) {
    const { printer_main, printer_kitchen } = this.state;

    let printer1 = "";
    let printer2 = "";

    if (printer_main) {
      if (printer_main.address === data.address) {
        printer1 = _cashier[this.state.languageIndex];
      }
    }
    if (printer_kitchen) {
      if (printer_kitchen.address === data.address) {
        printer2 = _dapur[this.state.languageIndex];
      }
    }

    return (
      <Button
        onPress={() => {
          //this.setState({ activeMenu: 0 });
          this.actionSelectPrinter(data);
        }}
        style={[
          ss.menuButton,
          { marginTop: 0, borderBottomWidth: 2, marginLeft: 5, marginRight: 5 }
        ]}
      >
        <View style={{ width: "10%", paddingRight: 15 }}>
          <MaterialCommunityIcons name={"printer"} style={{ fontSize: 36 }} />
          {/* printer-off */}
        </View>
        <View style={{ width: "90%" }}>
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 28, color: BLACK }]}
          >
            {data.name}
          </Text>

          {printer1 !== "" ? (
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
            >
              {printer1}
            </Text>
          ) : (
            <View />
          )}

          {printer2 !== "" ? (
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
            >
              {printer2}
            </Text>
          ) : (
            <View />
          )}
        </View>
      </Button>
    );
  }

  renderDetailPrinter() {
    let printReceipt = true;
    let printByCategory = true;
    let receiptNumber = 3;
    let printerName = "Epson Thermal Printer Cashier";
    let blueToothId = "BT:23OCADS199";
    let status = "Printer Ready";

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={[ss.box, { flex: 1, backgroundColor: "#EEEEEE" }]}>
            <View
              style={[
                ss.box,
                {
                  margin: 15,
                  backgroundColor: WHITE,
                  borderColor: "#79BCE2",
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 0,
                  flexDirection: "column"
                  //backgroundColor: '#BCA',
                }
              ]}
            >
              <View
                style={{
                  //backgroundColor: "#999",
                  // width: 50,
                  // height: 50,
                  padding: 15,
                  position: "absolute",
                  alignSelf: "flex-end"
                }}
              >
                <View style={{ elevation: 3 }}>
                  <FontAwesome
                    name={"wrench"}
                    style={{
                      fontSize: 25,
                      color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)

                      //borderRadius: 5,
                      //backgroundColor: MAIN_THEME_COLOR,
                      //padding: 5,
                      //position: 'absolute'
                    }}
                  />
                </View>
              </View>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: BLACK }
                ]}
              >
                {printerName}
              </Text>
              <View
                style={{
                  flex: 1,
                  //backgroundColor: "#BCA",
                  marginTop: 10,
                  flexDirection: "row"
                }}
              >
                <View style={{ width: 30 }}>
                  <FontAwesome
                    name={"bluetooth-b"}
                    style={{
                      fontSize: 25,
                      color: "#999",
                      //borderRadius: 5,
                      //backgroundColor: MAIN_THEME_COLOR,
                      //padding: 5,
                      position: "absolute"
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      { fontSize: 20, color: "#999" }
                    ]}
                  >
                    {blueToothId}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 20, color: "#999" }
                  ]}
                >
                  Status:{" "}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 20, color: "#83B235" }
                  ]}
                >
                  {status}
                </Text>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      //width: 100,
                      //height: 50,
                      padding: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderRadius: 15,
                      elevation: 3,
                      position: "absolute",
                      alignSelf: "flex-end",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 20,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                        }
                      ]}
                    >
                      Printer Test
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Bagian Atas End */}
            {/* Konfigurasi Printer */}
            <View
              style={[
                ss.box,
                {
                  margin: 15,
                  backgroundColor: WHITE,
                  borderColor: "#79BCE2",
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 0
                  //flexDirection: 'row'
                }
              ]}
            >
              {/* Cetak Struk */}
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      { fontSize: 20, color: BLACK }
                    ]}
                  >
                    Cetak Struk
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    paddingRight: 15,
                    //backgroundColor: "#888",
                    alignItems: "center"
                  }}
                >
                  <View style={{ marginTop: -25 }}>
                    <Button
                      onPress={() => {
                        //this.changeCetakOrderId();
                        //this.changeSaldoRekapKas();
                        //this.changeAutoDetectPrinter();
                      }}
                      style={{
                        //backgroundColor: '#CCC',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        borderRadius: 99
                      }}
                    >
                      <MaterialCommunityIcons
                        name={
                          printReceipt
                            ? "toggle-switch-outline"
                            : "toggle-switch-off-outline"
                        }
                        style={{ fontSize: 75 }}
                      />
                    </Button>
                  </View>
                </View>
              </View>
              {/* Print Struk End */}
              {/* Jumlah Cetak Struk */}
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      { fontSize: 20, color: BLACK }
                    ]}
                  >
                    Jumlah Cetak Struk
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    //paddingRight: 15,
                    //backgroundColor: "#888",
                    alignItems: "flex-end"
                  }}
                >
                  <View
                    style={{
                      marginTop: -2,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      onPress={() => {
                        //this.changeCetakOrderId();
                        //this.changeSaldoRekapKas();
                        //this.changeAutoDetectPrinter();
                      }}
                      style={
                        {
                          //backgroundColor: '#CCC',
                          //position: "absolute",
                          //top: 0,
                          //left: 0,
                          //borderRadius: 99
                        }
                      }
                    >
                      <AntDesign
                        name={"minussquareo"}
                        style={{
                          //alignSelf: 'center',
                          fontSize: 33,
                          color: BLACK,
                          backgroundColor: WHITE
                        }}
                      />
                    </Button>
                    <View
                      style={{
                        width: 35,
                        alignItems: "flex-end",
                        paddingRight: 5,
                        paddingLeft: 5
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          { fontSize: 20, color: BLACK }
                        ]}
                      >
                        {receiptNumber}
                      </Text>
                    </View>
                    <Button
                      onPress={() => {
                        //this.changeCetakOrderId();
                        //this.changeSaldoRekapKas();
                        //this.changeAutoDetectPrinter();
                      }}
                      style={
                        {
                          //backgroundColor: '#CCC',
                          //position: "absolute",
                          //top: 0,
                          //left: 0,
                          //borderRadius: 99
                        }
                      }
                    >
                      <AntDesign
                        name={"plussquareo"}
                        style={{
                          //alignSelf: 'center',
                          fontSize: 33,
                          color: BLACK,
                          backgroundColor: WHITE
                        }}
                      />
                    </Button>
                  </View>
                </View>
              </View>
              {/* Jumlah Cetak Pesanan */}
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      { fontSize: 20, color: BLACK }
                    ]}
                  >
                    Jumlah Cetak Pesanan
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    //paddingRight: 15,
                    //backgroundColor: "#888",
                    alignItems: "flex-end"
                  }}
                >
                  <View
                    style={{
                      marginTop: -2,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      onPress={() => {
                        //this.changeCetakOrderId();
                        //this.changeSaldoRekapKas();
                        //this.changeAutoDetectPrinter();
                      }}
                      style={
                        {
                          //backgroundColor: '#CCC',
                          //position: "absolute",
                          //top: 0,
                          //left: 0,
                          //borderRadius: 99
                        }
                      }
                    >
                      <AntDesign
                        name={"minussquareo"}
                        style={{
                          //alignSelf: 'center',
                          fontSize: 33,
                          color: BLACK,
                          backgroundColor: WHITE
                        }}
                      />
                    </Button>
                    <View
                      style={{
                        width: 35,
                        alignItems: "flex-end",
                        paddingRight: 5,
                        paddingLeft: 5
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          { fontSize: 20, color: BLACK }
                        ]}
                      >
                        {receiptNumber}
                      </Text>
                    </View>
                    <Button
                      onPress={() => {
                        //this.changeCetakOrderId();
                        //this.changeSaldoRekapKas();
                        //this.changeAutoDetectPrinter();
                      }}
                      style={
                        {
                          //backgroundColor: '#CCC',
                          //position: "absolute",
                          //top: 0,
                          //left: 0,
                          //borderRadius: 99
                        }
                      }
                    >
                      <AntDesign
                        name={"plussquareo"}
                        style={{
                          //alignSelf: 'center',
                          fontSize: 33,
                          color: BLACK,
                          backgroundColor: WHITE
                        }}
                      />
                    </Button>
                  </View>
                </View>
              </View>

              {/* Cetak Pesanan Berdasarkan Kategori */}
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      { fontSize: 20, color: BLACK }
                    ]}
                  >
                    Cetak Pesanan Berdasarkan Kategori
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    paddingRight: 15,
                    //backgroundColor: "#888",
                    alignItems: "center"
                  }}
                >
                  <View style={{ marginTop: -25 }}>
                    <Button
                      onPress={() => {
                        //this.changeCetakOrderId();
                        //this.changeSaldoRekapKas();
                        //this.changeAutoDetectPrinter();
                      }}
                      style={{
                        //backgroundColor: '#CCC',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        borderRadius: 99
                      }}
                    >
                      <MaterialCommunityIcons
                        name={
                          printByCategory
                            ? "toggle-switch-outline"
                            : "toggle-switch-off-outline"
                        }
                        style={{ fontSize: 75 }}
                      />
                    </Button>
                  </View>
                </View>
              </View>
              {/* Cetak Pesanan Berdasarkan Kategori End */}
            </View>
            {/* Kategori Dan Printers */}
            <View
              style={[
                ss.box,
                {
                  margin: 15,
                  backgroundColor: WHITE,
                  borderColor: "#79BCE2",
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 15,
                  flexDirection: "row"
                }
              ]}
            >
              <View style={{ width: "40%" }}>
                <View
                  style={{
                    //borderColor: '#C4C4C4',
                    //borderBottomWidth: 1,
                    paddingBottom: 10,
                    paddingTop: 5,
                    marginRight: 15
                  }}
                >
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      { fontSize: 20, color: BLACK }
                    ]}
                  >
                    Kategori
                  </Text>
                </View>
                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.selectedCategory}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          borderColor: "#C4C4C4",
                          borderBottomWidth: 1,
                          paddingBottom: 5,
                          paddingTop: 5,
                          marginRight: 15
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSans,
                            { fontSize: 20, color: BLACK }
                          ]}
                        >
                          {item.name}
                        </Text>
                      </View>
                    );
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "RenderKategori" + index.toString();
                  }}
                  //onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //refreshing={refreshing}
                />
              </View>
              <View style={{ width: "60%" }}>
                <View
                  style={{
                    //borderColor: '#C4C4C4',
                    //borderBottomWidth: 1,
                    paddingBottom: 10,
                    paddingTop: 5,
                    marginRight: 15,
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      { fontSize: 20, color: BLACK }
                    ]}
                  >
                    Printers
                  </Text>
                  <View style={{ alignItems: "flex-end", flex: 1 }}>
                    <FontAwesome
                      name={"gear"}
                      style={{
                        fontSize: 25,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                        borderRadius: 5,
                        backgroundColor: MAIN_THEME_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        padding: 5,
                        position: "absolute"
                      }}
                    />
                  </View>
                </View>
                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.listPrinter}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          borderColor: "#C4C4C4",
                          borderBottomWidth: 1,
                          paddingBottom: 5,
                          paddingTop: 5,
                          marginRight: 15
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSans,
                            { fontSize: 20, color: BLACK }
                          ]}
                        >
                          {item.name}
                        </Text>
                      </View>
                    );
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "RenderPrinterList" + index.toString();
                  }}
                  //onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //refreshing={refreshing}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    let height = Dimensions.get("window").height - 90;
    let {
      activeMenu,
      showLanguageSelection,
      showColorSelection,
      activeColorIndex,
      colorSelection,
      activeSelection
    } = this.state;

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    const { changeColorAction, changeLanguageAction } = this.props;

    return (
      <View style={[ss.body]}>
        <Header
          colorIndex={this.state.colorIndex}
          fromSetting={true}
          title={
            this.props.title !== _page_title[this.state.languageIndex]
              ? _page_title[this.state.languageIndex]
              : this.props.title
          }
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
        {showColorSelection ? (
          <SelectColor
            //languageIndex={this.state.languageIndex}
            languageIndex={0}
            activeColorIndex={activeColorIndex}
            colorSelection={colorSelection}
            actions={() => {
              this.setState({
                showColorSelection: false,
                colorIndex: this.state.activeColorIndex
              });
              ColorFunctions.Change(this.state.activeColorIndex, response => {
                if (response) {
                  changeColorAction(this.state.activeColorIndex);
                } else {
                }
              });
            }}
            changeColorAction={value => {
              this.setState({ activeColorIndex: value });
              //MAIN_THEME_COLOR = value;
            }}
            closeAction={() => {
              this.setState({ showColorSelection: false });
            }}
          />
        ) : (
          <View />
        )}
        {showLanguageSelection ? (
          <SelectLanguage
            colorIndex={this.state.colorIndex}
            activeSelection={this.state.activeSelection}
            changeAction={val => {
              this.setState({ activeSelection: val });
            }}
            submitAction={() => {
              this.setState({
                languageIndex: this.state.activeSelection,
                showLanguageSelection: false
              });

              PrinterFunctions.SaveLanguage(this.state.activeSelection, val => {
                //alert("Sukses Set Footer Printer");
              });
              changeLanguageAction(this.state.activeSelection);
            }}
            actions={() => {
              this.setState({ showLanguageSelection: false });
            }}
          />
        ) : (
          <View />
        )}
        <ScrollView
          style={
            {
              //flex: 1
            }
          }
        >
          <View style={[ss.mainContent, { height: height }]}>
            <View style={[ss.leftSide]}>
              <ScrollView
                style={
                  {
                    //flex: 1
                  }
                }
              >
                {this.renderMenu()}
              </ScrollView>
            </View>
            <View style={[ss.rightSide]}>
              <ScrollView
                style={
                  {
                    //flex: 1
                  }
                }
              >
                {activeMenu === 0 ? this.renderAplikasi() : <View />}
                {activeMenu === 1 ? this.renderPrinterMain() : <View />}

                {activeMenu === 2 ? this.renderStrukMain() : <View />}
                {activeMenu === 3 ? this.renderInformasi() : <View />}
                {activeMenu === 999 ? this.renderDetailPrinter() : <View />}
              </ScrollView>
            </View>
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
    flexDirection: "column",
    elevation: 1
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
    width: "44%",
    marginTop: 0,
    marginLeft: 15,
    backgroundColor: "#EEEEEE",
    elevation: 3,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1
  },
  rightSide: {
    width: "54%",
    marginTop: 0,
    backgroundColor: "#EEEEEE",
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
    backgroundColor: MAIN_THEME_COLOR,
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
  },
  menuButton: {
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 5,
    flexDirection: "row"
  },
  modalCover: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBox: {
    width: "50%",
    minHeight: 200,
    //maxHeight: height * 0.6,
    backgroundColor: WHITE,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20
    //marginTop: height * 0.25,
    //marginBottom: height * 0.25,
  },
  modalHeader: {
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    paddingBottom: 5,
    width: "75%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",

    justifyContent: "center",
    width: "75%",
    flexDirection: "row"
  }
});
