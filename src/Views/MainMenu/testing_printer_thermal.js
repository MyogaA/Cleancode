/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  BackHandler,
  TouchableOpacity,
  Platform,
} from "react-native";

// import {
//   BLEPrinter,
//   NetPrinter,
//   USBPrinter,
//   IUSBPrinter,
//   IBLEPrinter,
//   INetPrinter
// } from "react-native-thermal-receipt-printer";
import { Actions } from "react-native-router-flux";
import {
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  WHITE
} from "../../Libraries/Colors";

// interface SelectedPrinter
//   extends Partial<IUSBPrinter & IBLEPrinter & INetPrinter> {
//   printerType?: keyof typeof printerList;
// }

export default class TestingDualScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      mount: true,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      auth: this.props.auth ? this.props.auth : "",
      printers: [],
      currentPrinter: {},
    };
  }

  componentDidMount() {
    //this.newOrder();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

    if (Platform.OS === "android") {
      // BLEPrinter.init().then(() => {
      //   //list printers
      //   BLEPrinter.getDeviceList().then(printers => {
      //     console.log("printers ====> ", printers);
      //     this.setState({ printers: printers });
      //   });
      // });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);

    Actions.refresh({
      returned: true,
    });
  }

  onBackPress = () => {
    this.setState({ mount: false });
    console.log("BackPRESS ? ");
    Actions.pop();
  };

  _connectPrinter(inner_mac_address) {
    if (Platform.OS === "android") {
      //connect printer
      console.log("connect with ===> ", inner_mac_address);

      try {
        // BLEPrinter.connectPrinter(inner_mac_address).then(
        //   printer => {
        //     this.setState({ currentPrinter: printer });
        //   },
        //   error => console.warn(error)
        // );
      } catch (err) {
        console.warn(err);
      }
    }
  }

  printTextTest() {
    
    const { userInfo, dataBill, printType } = this.state;
    let address = "Alamat dari Retail";
    let gerai_name = userInfo.gerai_name;
    let description = userInfo.gerai_name + " " + userInfo.restaurant_address;
    let cashier_name = userInfo.name;
    let transaction_id = "123123";
    let time = moment(new Date()).format("HH:mm");
    let no_table = "1";

    let subTotal = 0;
    let total_bayar = 0;
    
    if (this.state.currentPrinter) {

      let text = "";




      // BLEPrinter.printText(
      //   `<C>1234567890</C>\n <C>1234567890</C> \n 1234567890`);

    } else {
      console.log("没有设置打印机");
    }
  }

  printBillTest() {
    if (this.state.currentPrinter) {
      // BLEPrinter.printBill("<C>12345678901234567890123456789012</C>");
      // BLEPrinter.printBill("<C>12345678901234567890123456789012</C>");
      // BLEPrinter.printBill("<C>12345678901234567890123456789012</C>");
      // BLEPrinter.printBill("<C>12345678901234567890123456789012</C>");
      // BLEPrinter.printBill("<C>12345678901234567890123456789012</C>");
    } else {
      console.log("没有设置打印机");
    }
  }

  render() {
    return (
      <View>
        {this.state.printers.map((printer, index) => (
          <TouchableOpacity
            key={printer.inner_mac_address}
            onPress={() => this._connectPrinter(printer.inner_mac_address)}
          >
            <View
              style={{
                backgroundColor:
                  printer.inner_mac_address ===
                  this.state.currentPrinter.inner_mac_address
                    ? MAIN_THEME_COLOR_SELECT(0)
                    : MAIN_THEME_COLOR_SELECT(1),
                padding: 15,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <Text style={{ color: WHITE }}>
                {`device_name: ${printer.device_name}, inner_mac_address: ${
                  printer.inner_mac_address
                }`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: MAIN_THEME_COLOR_SELECT(0),
            padding: 10
          }}
          onPress={() => this.printTextTest()}
        >
          <Text> Print Text </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: MAIN_THEME_COLOR_SELECT(0),
            padding: 10
          }}
          onPress={() => this.printBillTest()}
        >
          <Text> Print Bill Text </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
