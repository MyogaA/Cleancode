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
  ActivityIndicator,
  ImageDefault,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  Dimensions,
  NativeModules,
  NativeEventEmitter,
} from "react-native";

const { AutoPrintModule } = NativeModules;

import Checkbox from "../../Components/Checkbox";
import MainStyle from "../../Styles";
import MobileHeaderTabletV2 from "../../Components/MobileHeaderTabletV2";
import MobileHeaderTabletSamping from "../../Components/MobileHeaderTabletSamping";

// const { ScalingModule } = NativeModules;

import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from "react-native-bluetooth-escpos-printer";

import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import AlertLogin from "../../Components/AlertLogin";
import MobileSelectLanguage from "../../Components/MobileSelectLanguage";
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
  _sukses_printer_2,
  _cari,
  _edit,
  _tidak_aktif,
  _aktif,
  _lain,
  _upload_logo,
  _management_printer,
  _print_2,
  _show_stock,
  _choose_region,
  _currency,
  _decimal,
  _print_type,
  _print_logo,
  _print_qr,
  _sukses_url,
  _edit_url,
  _openday,
  _openhour,
  _closehour,
  _day_monday,
  _day_tuesday,
  _day_wednesday,
  _day_thursday,
  _day_friday,
  _day_saturday,
  _day_sunday,
  _choose_day_open,
  _set_printer_cashier,
  _set_printer_kitchen,
  _set_printer_label,
  _test_print,
  _test_open_drawer,
  _staff_id,
  _page_title,
  _manual_print_payment,
  _manual_print_cashlez,
  _label,
  _sukses_printer_3,
  _test_print_label,
  _print_auto_label,
  _auto_calculate,
  _currency_conversion,
  _light_mode,
  _edit_custom_name,
  _informasi_perangkat,
  _edit_device_description,
  _kitchen_management,
} from "../../Libraries/DictionarySetting";

import {
  _ganti_password,
  _ganti_pin,
  _ganti_user,
  _login,
  _login_failed,
  _login_success,
  _new_password,
  _new_pin,
  _password,
} from "../../Libraries/DictionaryLogin";

import DateTimePicker from "@react-native-community/datetimepicker";
import DeviceInfo from "react-native-device-info";

import ScalingFunctions from "../../Libraries/ScalingFunctions";

// import { Colors } from "react-native/Libraries/NewAppScreen";
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
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";

import RegionFunctions from "../../Libraries/RegionFunctions";

import SettingsFunctions from "../../Libraries/SettingsFunctions";

import moment from "moment";
import MenuFunctions from "../../Libraries/MenuFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import Loading from "../../Components/MobileLoading";
import {
  GetMenuAllAPI,
  LogoutAPI,
  BE_Currency,
  BE_Business,
  BE_Outlet,
  BE_Staff,
  BE_Outlet_Setting,
  BE_Customer,
  BE_Customer_Account,
  BE_Devices,
} from "../../Constants";

import { PHONE_MASTER_LIST } from "../../PhoneList";

import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";
import { _email, _search } from "../../Libraries/DictionaryManagement";
import { _batal, _lanjut, _sukses } from "../../Libraries/DictionaryPayment";

// import {
//   USBPrinter,
//   NetPrinter,
//   BLEPrinter
// } from "react-native-thermal-receipt-printer";
import { _proses_gagal, _proses_sukses } from "../../Libraries/DictionaryHome";
import { _user } from "../../Libraries/DictionaryRekap";
import { _notes } from "../../Libraries/DictionaryDrawer";
import { _detail_order } from "../../Libraries/DictionaryHistory";
import CashlezFunctions from "../../Libraries/CashlezFunctions";

// export function Print_V2(state) {
//   const [printers, setPrinters] = useState([]);
//   const [currentPrinter, setCurrentPrinter] = useState();

//   const useEffect = () => {
//     BLEPrinter.init().then(() => {
//       BLEPrinter.getDeviceList().then(setPrinters);
//     });
//   };

//   const _connectPrinter = printer => {
//     //connect printer
//     BLEPrinter.connectPrinter("57:4C:54:00:BA:68").then(
//       setCurrentPrinter,
//       error => console.warn(error)
//     );
//   };

//   const printTextTest = () => {
//     currentPrinter && USBPrinter.printText("<C>sample text</C>\n");
//   };

//   const printBillTest = () => {
//     currentPrinter && USBPrinter.printBill("<C>sample bill</C>");
//   };

//   return (
//     <View style={{}}>
//       <TouchableOpacity
//         key={"57:4C:54:00:BA:68"}
//         onPress={() => _connectPrinter("57:4C:54:00:BA:68")}
//       >
//         <Text>
//           {`device_name: "57:4C:54:00:BA:68" , inner_mac_address: "57:4C:54:00:BA:68"
//           }`}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={printTextTest}>
//         <Text>Print Text</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={printBillTest}>
//         <Text>Print Bill Text</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

export default class MobileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custom_name: "",
      showCustomNameForm: false,
      showDescriptionForm: false,
      device_description: "",
      allowKitchenManagement: false,
      business_type: "Retail",
      autoCalculateRekap: false,
      cz_invalid: true,
      staff_id: "",
      password: "",
      listUser: [],
      new_password: "",
      new_pin: "",
      printType: 1,
      showRegion: false,
      showCurrency: false,
      currency: "IDR",
      currency_id: 1,
      currencyAllowDecimal: false,
      currencyAllowMultiCurrency: false,
      tablet: DeviceInfo.isTablet(),
      searchKey: "",
      searchKeyRegion: "",
      showSetting: false,
      activeMenu: 0,
      showFooterForm: false,
      showURLForm: false,
      loadingPrinter: false,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      languageList: [
        "Bahasa Indonesia",
        "English",
        "简体中文 (Chinese Simplified)",
        "中國傳統的 (Chinese Traditional)",
      ],

      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0, //default 0
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      clockIn: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      clockOut: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      printer_kitchen: null,
      printer_main: null,
      printer_label: null,
      selectedUser: 1,
      cetakOrderId: false,
      catatSaldoRekapKas: false,
      tampilkanStokMenu: false,
      autoDetectPrinter: false,
      ready: true,
      showLanguageSelection: false,
      showColorSelection: false,
      activeSelection: this.props.languageIndex ? this.props.languageIndex : 0,
      selectedPrinter: null,
      showModalPrinter: false,
      printer2: false,
      printer3: false,

      manual_print: false,
      selectedCategory: [
        { id: 1, name: "Kopi" },
        { id: 2, name: "Food" },
      ],
      currencyList: [],
      currencySearch: "",

      showPassword: false,
      showPin: false,
      androidLevel: 0,
      androidLevelPrinterMax: 99,

      // listPrinter: [
      //   {
      //     id: 1,
      //     name: "Iwarez",
      //     available: true,
      //     address: "66:22:62:ED:19:30"
      //   },
      //   {
      //     id: 2,
      //     name: "EPSON Thermal Printer Kitchen",
      //     available: true,
      //     address: "ABC"
      //   },
      //   {
      //     id: 3,
      //     name: "EPSON Thermal Printer Bar",
      //     available: false,
      //     address: "DCA"
      //   },
      //   {
      //     id: 4,
      //     name: "EPSON Thermal Printer Bar 2",
      //     available: false,
      //     address: "EEE"
      //   },
      //   {
      //     id: 5,
      //     name: "EPSON Thermal Printer Bar 3",
      //     available: false,
      //     address: "EEA"
      //   }
      // ],
      listPrinter: [],
      dataBill: [],
      informasi: {
        namaPerangkat: "Mesin Kasir",
        email: "hello@lifetech.co.id",
        accountType: "Basic Version",
        ipAddress: "192.168.0.1",
        version: "1.0.0",
        staffId: "00001",
      },
      //color
      activeColorIndex: 0,
      colorSelection: [
        "#E29840",
        "#79BCE2",
        "#A2DC68",
        "#732F46",
        "#B853AE",
        "#BA1818",
        "#AE79E2",
        "#D6D946",
        "#000000",
        "#FFFFFF",
      ],
      device_name: "",
      ip_address: "",
      footer_printer: "",
      url_printer: "",
      show_order_id: false,
      show_stock: false,
      phoneList: [],
      selectedPhone: { name: "Indonesia", dial_code: "+62", code: "ID" },
      auth: this.props.auth ? this.props.auth : "",
      business_data: {},
      setting_print_qr: false,
      setting_print_logo: false,
      setting_light_mode: false,
      startHour: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      endHour: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      datePickerStart: false,
      datePickerEnd: false,
      showFormOpenDays: false,
      openDaysList: [],
      openDay1: false,
      openDay2: false,
      openDay3: false,
      openDay4: false,
      openDay5: false,
      openDay6: false,
      openDay7: false,
      tempDay1: false,
      tempDay2: false,
      tempDay3: false,
      tempDay4: false,
      tempDay5: false,
      tempDay6: false,
      tempDay7: false,
      allowPrinterInternal: false,
    };
  }

  InitializeAutoPrint() {
    //console.log("TestSunmi2");

    // AutoPrintModule.searchPrinter()
    //   //SunmiModule.initLocaleLanguage()
    //   .then(responseinitialize => Promise.all([responseinitialize]))
    //   .then(([responseinitialize]) => {
    //     console.log("searchPrinter ===> ", responseinitialize);
    //   })
    //   .catch(err => {
    //     console.log("error catch searchPrinter:", err);
    //   });//attempt to invoke virtual method void

    // AutoPrintModule.searchPrinter(
    //   v => {
    //     console.log("searchPrinter ===> ", v);
    //   }
    // );

    AutoPrintModule.initialize()
      .then((responseinitialize) => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        console.log("initialize ===> ", responseinitialize);
        //alert(JSON.stringify(responseinitialize));
      })
      .catch((err) => {
        console.log("error catch initialize:", err);
      });
  }


  testPrintStatic()
  {
    AutoPrintModule.testPrintStatic()
    .then((responseinitialize) => Promise.all([responseinitialize]))
    .then(([responseinitialize]) => {
      console.log("testPrintStatic ===> ", responseinitialize);
      //alert(JSON.stringify(responseinitialize));
      alert("Printing static now");
      this.setState({ allowPrinterInternal: true });
    })
    .catch((err) => {
      console.log("error catch testPrintStatic:", err);
    });
  }

  TestConnectToPrinter() {
    AutoPrintModule.connectToPrinter()
      .then((responseinitialize) => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        console.log("TestConnectToPrinter ===> ", responseinitialize);
        //alert(JSON.stringify(responseinitialize));
      })
      .catch((err) => {
        console.log("error catch testPrint:", err);
      });
  }

  TestTestPage() {
    AutoPrintModule.testPage()
      .then((responseinitialize) => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        console.log("TestPrintTestPage ===> ", responseinitialize);
        //alert(JSON.stringify(responseinitialize));
      })
      .catch((err) => {
        console.log("error catch testPrint:", err);
      });
  }

  TestSearchPrinter() {
    AutoPrintModule.searchPrinterV3()
      .then((responseinitialize) => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        console.log("testPrintV2 ===> ", responseinitialize);
        //alert(JSON.stringify(responseinitialize));
      })
      .catch((err) => {
        console.log("error catch testPrint:", err);
      });
  }

  ClearPrinter() {
    PrinterFunctions.ClearPrinter((v) => {});
  }

  initializeExtraPrinter() {
    this.setState({ allowPrinterInternal: true });
  }

  componentDidMount() {
    ColorFunctions.GetColor((val) => {
      if (val !== 0 && this.state.colorIndex === 0) {
        this.setState({ colorIndex: val });
      }
    });

    //this.ClearPrinter();

    LoginFunctions.GetListMultiUser((val) => {
      if (val) {
        this.setState({ listUser: val });
      }
    });

    SettingsFunctions.GetStartHour((val) => {
      if (val) {
        this.setState({ startHour: val });
      }
    });

    SettingsFunctions.GetEndHour((val) => {
      if (val) {
        this.setState({ endHour: val });
      }
    });

    SettingsFunctions.GetOpenDays((val) => {
      if (val) {
        let day1 = false;
        let day2 = false;
        let day3 = false;
        let day4 = false;
        let day5 = false;
        let day6 = false;
        let day7 = false;

        val.map((v, i) => {
          if (v === 0) {
            day1 = true;
          }

          if (v === 1) {
            day2 = true;
          }

          if (v === 2) {
            day3 = true;
          }

          if (v === 3) {
            day4 = true;
          }

          if (v === 4) {
            day5 = true;
          }

          if (v === 5) {
            day6 = true;
          }

          if (v === 6) {
            day7 = true;
          }
        });

        this.setState({
          openDaysList: val,
          openDay1: day1,
          openDay2: day2,
          openDay3: day3,
          openDay4: day4,
          openDay5: day5,
          openDay6: day6,
          openDay7: day7,
        });
      }
    });

    RegionFunctions.GetPhone((val) => {
      if (val) {
        this.setState({ selectedPhone: val });
      }
    });

    RegionFunctions.GetSettingLightMode((val) => {
      if (val) {
        this.setState({ setting_light_mode: val });
      }
    });

    RegionFunctions.GetSettingKitchenManagement((val) => {
      if (val) {
        this.setState({ allowKitchenManagement: val });
      }
    });

    RegionFunctions.GetCurrency((val) => {
      if (val) {
        this.setState({ currency: val });
      }
    });

    RegionFunctions.GetAllowDecimal((val) => {
      if (val) {
        this.setState({ currencyAllowDecimal: val });
      }
    });

    RegionFunctions.GetAllowMultiCurrency((val) => {
      if (val) {
        this.setState({ currencyAllowMultiCurrency: val });
      }
    });

    //this.getBillData();
    this.getCurrency();
    this.getOutletData();
    this.getOutletSetting();
    this.getCustomerInfoDummy();
    this.getQueueNumber();
    this.getDeviceInformation();

    //console.log("userInfo ==> ", this.props.userInfo);

    // let string = "This is the product name example and its quite long";
    // let product_name_array = this.divideLongWord(string, 17);

    // //let tempProdName = this.divideLongWord(product_name, 9);
    // let product_name_length = product_name_array.length;
    // console.log("product_name_length ==> ", product_name_length);

    DeviceInfo.getDeviceName().then((deviceName) => {
      // iOS: "Becca's iPhone 6"
      // Android: ?
      // Windows: ?
      if (deviceName) {
        this.setState({ device_name: deviceName });
        if (deviceName === "rk3566_r") {
          this.initializeExtraPrinter();
        }
      }
    });

    DeviceInfo.getIpAddress().then((ip) => {
      if (ip) {
        this.setState({ ip_address: ip });
      }
    });

    DeviceInfo.getApiLevel().then((level) => {
      if (level) {
        console.log("getApiLevel ====> ", level);
        if (level < 99) {
          this.checkBluetooth();
          // this.enableBluetoothV2();
        }
        this.setState({ androidLevel: level });
      }
    });

    this.getPrinterData();
    this.getPrinterOffline();

    this.getPhoneList();
    this.getBusinessData();

    this.setState({ business_type: this.state.userInfo.business_type });
  }

  getOutletSetting() {
    let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Outlet_Setting + "/" + outlet_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("DATA OUTLET SETTING ==> ", responseJson);
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  getCustomerInfoDummy() {
    let outlet_id = this.state.userInfo.gerai_id;

    let customer_account_id = 1;
    let customer_id = 14;

    const uri = BE_Customer + "/lite/" + customer_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("DATA getCustomerInfoDummy ==> ", responseJson);
        this.getCustomerAccount(responseJson.data.customer_account_id);
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  getCustomerAccount(customer_account_id) {
    const uri_2 = BE_Customer_Account + "/" + customer_account_id;
    fetch(uri_2, {
      method: "GET",
      headers: {
        Authorization: this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("DATA getCustomerAccount ==> ", responseJson);
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  getDeviceInformation() {
    let outlet_id = this.state.userInfo.gerai_id;
    let id = this.state.userInfo.device_id;
    const uri = BE_Devices + "/device-id/" + id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("DATA getDeviceInformation ==> ", responseJson);
        if (responseJson.statusCode === 200) {
          const result = responseJson.data;
          this.setState({
            custom_name: result.custom_name ? result.custom_name : "",
            device_description: result.description ? result.description : "",
          });
        }
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  getQueueNumber() {
    let outlet_id = this.state.userInfo.gerai_id;
    const uri = BE_Outlet_Setting + "/queue/" + outlet_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("DATA QUEUE NUMBER ==> ", responseJson);
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  getOutletData() {
    let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Outlet + outlet_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("DATA OUTLET ==> ", responseJson);
        if (responseJson.open_days) {
          let val = responseJson.open_days;
          if (val) {
            let day1 = false;
            let day2 = false;
            let day3 = false;
            let day4 = false;
            let day5 = false;
            let day6 = false;
            let day7 = false;

            val.map((v, i) => {
              if (v === 0) {
                day1 = true;
              }

              if (v === 1) {
                day2 = true;
              }

              if (v === 2) {
                day3 = true;
              }

              if (v === 3) {
                day4 = true;
              }

              if (v === 4) {
                day5 = true;
              }

              if (v === 5) {
                day6 = true;
              }

              if (v === 6) {
                day7 = true;
              }
            });

            this.setState({
              openDaysList: val,
              openDay1: day1,
              openDay2: day2,
              openDay3: day3,
              openDay4: day4,
              openDay5: day5,
              openDay6: day6,
              openDay7: day7,
            });

            //this.setState({ openDaysList: responseJson.open_days });
          }
        }

        if (responseJson.open_hour) {
          this.setState({ startHour: responseJson.open_hour });
        }

        if (responseJson.close_hour) {
          this.setState({ endHour: responseJson.close_hour });
        }
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  getBusinessData(val = this.state.auth) {
    const uri = BE_Business + this.state.userInfo.retail_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: val,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("responseJson getBusinessData ===> ", responseJson);
        if (responseJson.statusCode === 200) {
          this.setState({ business_data: responseJson.data });
        }
      })
      .catch((_err) => {
        //console.log("ERR Check Token ==> ", _err);
      });
  }

  getPhoneList() {
    const { searchKeyRegion } = this.state;
    let phoneList = PHONE_MASTER_LIST;

    // console.log(
    //   "PHONE LIST FILTER ===> ",
    //   phoneList.find(el => el.name.toLowerCase().match("ind"))
    // );

    let temp_list_phone = [];
    phoneList.map((v, i) => {
      let match = false;

      if (searchKeyRegion === "") {
        match = true;
      } else {
        let name = v.name ? v.name : "";
        let dial_code = v.dial_code ? v.dial_code : "";
        let code = v.code ? v.code : "";

        if (
          name.toLowerCase().includes(searchKeyRegion.toLowerCase()) ||
          dial_code.toLowerCase().includes(searchKeyRegion.toLowerCase()) ||
          code.toLowerCase().includes(searchKeyRegion.toLowerCase())
        ) {
          match = true;
        } else {
          match = false;
        }
      }

      if (match) {
        temp_list_phone.push(v);
      }
    });

    this.setState({ phoneList: temp_list_phone });
  }

  getCurrency(search = this.state.currencySearch) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    let search_query = "";
    if (search !== "") {
      search_query = `?name=${search}`;
    }
    let uri = `${BE_Currency}${search_query}`;

    console.log("getCurrency URI ", uri);

    console.log("this.state.auth ", this.state.auth);

    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // let result = responseJson;
        // let resultData = result.data;
        // console.log("getCurrency ===> ", responseJson);
        if (responseJson.statusCode === 200) {
          this.setState({ currencyList: responseJson.data });
        }
        // this.setState({
        //   dataMenuFav: resultData.data,
        //   activeCategory: 0,
        //   loading: false
        // });
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  importData() {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    const gerai_id = this.state.userInfo.gerai_id;
    let uri = `${GetMenuAllAPI}?gerai_id=${gerai_id}&search=&page=1`;

    const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    fetch(uri, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // let result = responseJson;
        // let resultData = result.data;

        console.log("Import Data ==> ", responseJson);

        let temp_category = responseJson.category.data;
        let temp_menu = responseJson.data.data;
        let temp_favourite = responseJson.data_favourite.data;

        let temp_addons = responseJson.data_addons;

        OfflineMenuFunctions.SaveAddons(temp_addons, (val) => {});

        OfflineMenuFunctions.SaveAllMenu(temp_menu, (val) => {});

        OfflineMenuFunctions.SaveCategoryMenu(temp_category, (val) => {});

        OfflineMenuFunctions.SaveFavMenu(temp_menu, (val) => {});

        OfflineMenuFunctions.SaveLastUpdate(time_now, (val) => {});

        // this.setState({
        //   dataMenuFav: resultData.data,
        //   activeCategory: 0,
        //   loading: false
        // });
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  sinkronisasiData() {
    this.importData();
  }

  getPrinterData() {
    CashlezFunctions.GetCashlezData((v) => {
      if (v) {
        if (v === "invalid") {
          this.setState({ cz_invalid: true });
        } else {
          // this.setState({ cz_invalid: false });
          this.setState({ cz_invalid: true });
        }
      }
    });

    PrinterFunctions.GetKitchenPrinter((val) => {
      if (val) {
        console.log("Printer Kitchen ==> ", val);
        this.setState({ printer_kitchen: val });
      }
    });

    PrinterFunctions.GetLabelPrinter((val) => {
      if (val) {
        console.log("Printer Label ==> ", val);
        this.setState({ printer_label: val });
      }
    });

    PrinterFunctions.GetShowStock((val) => {
      if (val) {
        console.log("Show Stock ==> ", val);
        this.setState({ show_stock: val });
      }
    });

    PrinterFunctions.GetAutoCalculateRekap((val) => {
      if (val) {
        this.setState({ autoCalculateRekap: val });
      }
    });

    PrinterFunctions.GetPrinter2((val) => {
      if (val) {
        console.log("GetPrinter2 ==> ", val);
        this.setState({ printer2: val });
      }
    });

    PrinterFunctions.GetPrinter3((val) => {
      if (val) {
        console.log("GetPrinter3 ==> ", val);
        this.setState({ printer3: val });
      }
    });

    PrinterFunctions.GetManualPrint((val) => {
      if (val) {
        console.log("Get manual_print ==> ", val);
        this.setState({ manual_print: val });
      }
    });

    PrinterFunctions.GetManualPrintCashlez((val) => {
      if (val) {
        console.log("Get manual_print_cashlez ==> ", val);
        this.setState({ manual_print_cashlez: val });
      }
    });

    PrinterFunctions.GetPrintType((val) => {
      if (val) {
        console.log("GetPrintType ==> ", val);
        this.setState({ printType: val });
      }
    });

    PrinterFunctions.GetMainPrinter((val) => {
      if (val) {
        console.log("Main Kitchen ==> ", val);
        this.setState({ printer_main: val });
      }
    });

    PrinterFunctions.GetFooterPrinter((val) => {
      if (val) {
        console.log("Footer Printer ==> ", val);
        this.setState({ footer_printer: val });
      }
    });

    PrinterFunctions.GetURLPrinter((val) => {
      if (val) {
        console.log("URL Printer ==> ", val);
        this.setState({ url_printer: val });
      }
    });

    PrinterFunctions.GetShowOrderIDPrinter((val) => {
      if (val) {
        console.log("Show Order Id Printer ==> ", val);
        this.setState({ show_order_id: val });
      }
    });

    PrinterFunctions.GetLanguage((val) => {
      if (val !== null) {
        console.log("GetLanguage ==> ", val);
        this.setState({ languageIndex: val, activeSelection: val });
      }
    });

    PrinterFunctions.GetSettingPrintQR((val) => {
      if (val) {
        this.setState({ setting_print_qr: val });
      }
    });

    PrinterFunctions.GetSettingPrintLogo((val) => {
      if (val) {
        this.setState({ setting_print_logo: val });
      }
    });
  }

  saveDevice(type) {
    let version = DeviceInfo.getVersion();
    let outlet_id = this.state.userInfo.gerai_id;
    let business_id = this.state.business_data.id;
    const uri = BE_Devices + "/create-advanced/";
    let body = {};

    if (type === "description") {
      body.description = this.state.device_description;
    }
    if (type === "name") {
      body.custom_name = this.state.custom_name;
    }

    body.devices_code = this.state.userInfo.device_id;
    body.devices_name = this.state.device_name;
    body.beetpos_version = version;
    body.outlet_id = outlet_id;
    body.business_id = business_id;

    console.log("body devices ===> ", body);

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth,
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.statusCode === 200) {
          // alert(_proses_sukses[this.state.languageIndex]);
          // this.setState({ new_pin: "" });
        } else {
          alert(
            _proses_gagal[this.state.languageIndex] +
              "\n" +
              responseJson.message
          );
        }
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
        alert(_proses_gagal[this.state.languageIndex]);
      });
  }

  saveFooterPrinter() {
    const { footer_printer } = this.state;

    PrinterFunctions.SaveFooterPrinter(footer_printer, (val) => {
      alert(_sukses_footer[this.state.languageIndex]);
    });

    this.setState({ footer_printer: footer_printer });
  }

  saveURLPrinter() {
    const { url_printer } = this.state;

    PrinterFunctions.SaveURLPrinter(url_printer, (val) => {
      alert(_sukses_url[this.state.languageIndex]);
    });

    this.setState({ url_printer: url_printer });
  }

  getBillData() {
    MenuFunctions.GetMenu((val) => {
      if (val) {
        console.log("Data Bill ==> ", val);
        this.setState({ dataBill: val });
      }
    });
  }

  actionSelectPrinter(data) {
    this.setState({ showModalPrinter: true, selectedPrinter: data });
    this.connect(data.address);
    console.log("data.address ==> ", data.address);
  }

  actionConnectBill() {
    const { selectedPrinter } = this.state;

    if (selectedPrinter !== this.state.printer_main) {
      PrinterFunctions.SaveMainPrinter(selectedPrinter, (val) => {
        alert(_sukses_printer_1[this.state.languageIndex]);
      });

      if (!this.state.printer_kitchen) {
        PrinterFunctions.SaveKitchenPrinter(selectedPrinter, (val) => {
          //alert(_sukses_printer_2[this.state.languageIndex]);
          this.setState({ printer_kitchen: selectedPrinter });
        });
      }

      this.setState({ printer_main: selectedPrinter });
    } else {
      PrinterFunctions.DeletePrinterLabel((val) => {
        //alert(_sukses_printer_3[this.state.languageIndex]);
      });

      this.setState({ printer_main: null });
    }
  }

  actionConnectKitchen() {
    const { selectedPrinter } = this.state;

    if (selectedPrinter !== this.state.printer_kitchen) {
      PrinterFunctions.SaveKitchenPrinter(selectedPrinter, (val) => {
        alert(_sukses_printer_2[this.state.languageIndex]);
      });

      this.setState({ printer_kitchen: selectedPrinter });
    } else {
      PrinterFunctions.DeletePrinterKitchen((val) => {
        //alert(_sukses_printer_3[this.state.languageIndex]);
      });
      this.setState({ printer_kitchen: null });
    }
  }

  actionConnectLabel() {
    const { selectedPrinter } = this.state;

    if (selectedPrinter !== this.state.printer_label) {
      PrinterFunctions.SaveLabelPrinter(selectedPrinter, (val) => {
        alert(_sukses_printer_3[this.state.languageIndex]);
      });

      this.setState({ printer_label: selectedPrinter });
    } else {
      PrinterFunctions.DeletePrinterLabel((val) => {
        //alert(_sukses_printer_3[this.state.languageIndex]);
      });

      this.setState({ printer_label: null });
    }
  }

  componentDidUpdate(nextProps) {}

  componentWillUnmount() {}

  enableBluetooth() {
    BluetoothManager.enableBluetooth().then(
      (r) => {
        // console.log("bluetooth enabled");
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
      (err) => {
        //alert(err);
        //alert(_bluetooth_tidak_aktif_2[this.state.languageIndex]);
      }
    );
  }

  enableBluetoothV2() {
    BluetoothManager.enableBluetooth().then(
      (r) => {
        console.log("bluetooth enabled");
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
      },
      (err) => {
        //alert(err);
        //alert(_bluetooth_tidak_aktif_2[this.state.languageIndex]);
      }
    );
  }

  checkBluetooth() {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        // alert(enabled); // enabled ==> true /false
        console.log("Bluetooth Enabled enabled ==> ", enabled);

        if (enabled === false) {
          console.log("Bluetooth Enabled false false false");

          //alert(_bluetooth_tidak_aktif[this.state.languageIndex]);
          this.enableBluetooth();
          this.getPrinterList();
        } else {
          //alert("Bluetooth aktif");
          console.log("Bluetooth Enabled true true true");

          this.getPrinterList();
          // this.enableBluetooth();
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
      (err) => {
        //alert(_bluetooth_tidak_aktif[this.state.languageIndex]);
      }
    );
  }

  getPrinterOffline() {
    PrinterFunctions.GetPrinterList_Version_2((x) => {
      console.log("|||||||||||||||||||| get printer list ===> ", x);
      if (x) {
        this.setState(
          {
            //listPrinter: ss.paired,
            listPrinter: x,
            //listDevice: ss.found,
            loadingPrinter: false,
          },
          () => {}
        );
      }
    });
  }

  getPrinterList() {
    // BleManager.start({ showAlert: false }).then(() => {
    //   // Success code
    //   console.log("Module initialized");

    // });

    // setTimeout(() => {
    //   BleManager.scan([], 5, true).then(results => {
    //     // Success code
    //     console.log("Scan started => ", results);
    //   });
    // }, 1500);

    console.log("getPrinterList");
    this.setState({ loadingPrinter: true });

    const disable_scan = false;
    if (!disable_scan) {
      console.log("allowed to scan");
      BluetoothManager.scanDevices().then(
        (s) => {
          if (s) {
            var ss = JSON.parse(s); //JSON string
            console.log("Printer Pair ==> ", ss.paired);
            console.log("Device Found ==> ", ss.found);

            let data = [...ss.paired, ...ss.found];

            // PrinterFunctions.SavePrinterList(data, x => {});

            setTimeout(() => {
              PrinterFunctions.SavePrinterList_Version_2(data, (x) => {});
              //this.print(address_printer2, null);
            }, 250);

            this.setState(
              {
                //listPrinter: ss.paired,
                listPrinter: data,
                //listDevice: ss.found,
                loadingPrinter: false,
              },
              () => {}
            );
          }
        },
        (er) => {
          console.log("ERROR PRINTER ===> ", er);
          this.setState({
            //loading: false,
            loadingPrinter: false,
          });
          //alert("error" + JSON.stringify(er));
        }
      );
    }
  }

  async connect(address = "66:22:62:ED:19:30") {
    //66:22:62:ED:19:30 iwarez
    //00:0E:0E:02:93:45

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
        (s) => {
          this.setState({
            loading: false,
            //boundAddress: address
          });
          console.log("connect ==> ", s);
          //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
        },
        (e) => {
          this.setState({
            loading: false,
          });
          //alert(e);
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

  truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + ".";
  }

  // async print_new_method() {
  //   const { userInfo, dataBill, printType, printer_main } = this.state;
  //   let address = "Alamat dari Retail";
  //   let gerai_name = userInfo.gerai_name;
  //   let description = userInfo.gerai_name + " " + userInfo.restaurant_address;
  //   let cashier_name = userInfo.name;
  //   let transaction_id = "123123";
  //   let time = moment(new Date()).format("HH:mm");
  //   let no_table = "1";

  //   let subTotal = 0;
  //   let total_bayar = 0;

  //   dataBill.map((v, i) => {
  //     subTotal = subTotal + v.qty * v.price;
  //     subTotal = subTotal + v.qty * v.salesTypeValue;
  //   });

  //   let grand_total = parseInt(Math.ceil(subTotal * 1.15));

  //   total_bayar = parseInt(Math.ceil(grand_total));

  //   BLEPrinter.connectPrinter(printer_main.address).then(
  //     () => {
  //       BLEPrinter.printText("<C>sample text</C>\n");
  //     },
  //     error => console.warn(error)
  //   );
  // }

  async print(address_printer, address_printer2) {
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
      fonttype: 1,
    });

    await BluetoothEscposPrinter.printText(`${description}\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    await BluetoothEscposPrinter.printText(`No Table ${no_table}\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });

    // await BluetoothEscposPrinter.printText(`اهلا و مرحبا مسرة\n\r`, {
    //   encoding: "Arabic",
    //   codepage: 22,
    //   widthtimes: 0,
    //   heigthtimes: 0,
    //   fonttype: 1
    // });

    await BluetoothEscposPrinter.printText(
      `Transaction ID ${transaction_id}\n\r`,
      {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      }
    );

    await BluetoothEscposPrinter.printText(`Cashier ${cashier_name}\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });

    await BluetoothEscposPrinter.printText(`${time}\n\r`, {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
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

      if (printType === 2) {
        product_name_array = this.divideLongWord(product_name, 18 + 16);
      }

      let product_name_length = product_name_array.length;
      let product_name_first_line = product_name_array[0];
      let length = product_name_first_line.length;
      let prod_space = " ";
      let prod_space_num = 0;
      if (length < 18) {
        prod_space_num = 18 - length;
      }

      if (printType === 2) {
        if (length < 18 + 16) {
          prod_space_num = 18 + 16 - length;
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
    });

    let sub_total = subTotal.toString();
    let sub_total_length = sub_total.length;
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

    grand_total = grand_total.toString();
    let grand_total_length = grand_total.length;
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

    await BluetoothEscposPrinter.printText(
      `Grand Total${grand_total_space}${grand_total}\n\r`,
      {}
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
    await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
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
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printText(" \n\r", {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 3,
      heigthtimes: 3,
      fonttype: 1,
    });

    if (address_printer) {
      //alert("print lagi");
      console.log("print 1 ==> ", address_printer);
      this.connect(address_printer);
      if (address_printer2) {
        console.log("print 2 ==> ", address_printer2);

        setTimeout(() => {
          this.connect(address_printer2);
          //this.print(address_printer2, null);
        }, 500);
      }
    }
  }

  async printLabel(address_printer, address_printer2) {
    const { userInfo, dataBill, printType } = this.state;

    let product_demo = [
      {
        name: "Ice Latte",
        description: "Less Sugar, Less Ice, Extra Shot Espresso",
        notes: "No Straw",
        barcode: "1234567890",
      },
      {
        name: "Chocolate Ice Cream",
        description: "Less Sugar, Less Ice, Extra Shot Espresso",
        notes: "No Straw",
        barcode: "1234598760",
      },
      {
        name: "Nasi Goreng Spesial",
        description:
          "Udang, Ham, Sosis, Ikan, Pedas, Extra Nasi, Alat Makan, Extra Telur",
        notes: "Yang enak",
        barcode: "0987654321",
      },
    ];

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    // await BluetoothEscposPrinter.printText(
    //   "Items         QTY      Total \n\r",
    //   {}
    // );
    // if (printType === 2) {
    //   BluetoothEscposPrinter.printText(
    //     "------------------------------------------------\n\r",
    //     {}
    //   );
    // } else {
    //   BluetoothEscposPrinter.printText(
    //     "--------------------------------\n\r",
    //     {}
    //   );
    // }

    //   let options = {
    //     width: 40,
    //     height: 30,
    //     gap: 20,
    //     direction: BluetoothTscPrinter.DIRECTION.FORWARD,
    //     reference: [0, 0],
    //     tear: BluetoothTscPrinter.TEAR.ON,
    //     sound: 0,
    //     text: [{
    //         text: 'I am a testing txt',
    //         x: 20,
    //         y: 0,
    //         fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
    //         rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
    //         xscal:BluetoothTscPrinter.FONTMUL.MUL_1,
    //         yscal: BluetoothTscPrinter.FONTMUL.MUL_1
    //     },{
    //         text: '你在说什么呢?',
    //         x: 20,
    //         y: 50,
    //         fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
    //         rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
    //         xscal:BluetoothTscPrinter.FONTMUL.MUL_1,
    //         yscal: BluetoothTscPrinter.FONTMUL.MUL_1
    //     }],
    //     qrcode: [{x: 20, y: 96, level: BluetoothTscPrinter.EEC.LEVEL_L, width: 3, rotation: BluetoothTscPrinter.ROTATION.ROTATION_0, code: 'show me the money'}],
    //     barcode: [{x: 120, y:96, type: BluetoothTscPrinter.BARCODETYPE.CODE128, height: 40, readable: 1, rotation: BluetoothTscPrinter.ROTATION.ROTATION_0, code: '1234567890'}],
    //     //image: [{x: 160, y: 160, mode: BluetoothTscPrinter.BITMAP_MODE.OVERWRITE,width: 60,image: base64Image}]
    //  }

    //  BluetoothTscPrinter.printLabel(options)
    //  .then(()=>{
    //      //success
    //  },
    //  (err)=>{
    //      //error
    //  })

    product_demo.map((v, i) => {
      BluetoothEscposPrinter.printText(
        `${_detail_order[this.state.languageIndex]}\n\r`,
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1,
        }
      );
      //printBarCode(String str,int nType, int nWidthX, int nHeight, int nHriFontType, int nHriFontPosition)
      // BluetoothEscposPrinter.printBarCode(
      //   v.barcode,
      //   128, 200, 100, 1, 1)

      BluetoothEscposPrinter.printText(`${v.name}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      });

      BluetoothEscposPrinter.printText(`${v.description}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      });

      BluetoothEscposPrinter.printText(
        `${_notes[this.state.languageIndex]} :\n\r`,
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1,
        }
      );

      BluetoothEscposPrinter.printText(`${v.notes}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      });

      BluetoothEscposPrinter.cutPaper();

      // BluetoothEscposPrinter.printText(" \n\r", {
      //   encoding: "GBK",
      //   codepage: 0,
      //   widthtimes: 3,
      //   heigthtimes: 3,
      //   fonttype: 1
      // });

      // if (printType === 2) {
      //   BluetoothEscposPrinter.printText(
      //     "------------------------------------------------\n\r",
      //     {}
      //   );
      // } else {
      //   BluetoothEscposPrinter.printText(
      //     "--------------------------------\n\r",
      //     {}
      //   );
      // }
      //
    });

    // await BluetoothEscposPrinter.printText(
    //   "99 x 123456789012345678 12345678\n\r",
    //   {}
    // );

    // await BluetoothEscposPrinter.printText(" \n\r", {
    //   encoding: "GBK",
    //   codepage: 0,
    //   widthtimes: 3,
    //   heigthtimes: 3,
    //   fonttype: 1
    // });

    // if (address_printer) {
    //   //alert("print lagi");
    //   console.log("print 1 ==> ", address_printer);
    //   this.connect(address_printer);
    //   if (address_printer2) {
    //     console.log("print 2 ==> ", address_printer2);

    //     setTimeout(() => {
    //       this.connect(address_printer2);
    //       //this.print(address_printer2, null);
    //     }, 500);
    //   }
    // }
  }

  async openDrawer() {
    const { printer_main } = this.state;
    try {
      ScalingFunctions.OpenDrawer();

      await BluetoothManager.connect(printer_main.address) // the device address scanned.
        .then(
          (s) => {
            this.setState({
              loading: false,
              //boundAddress: address
            });
            console.log("connect ==> ", s);
            //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
          },
          (e) => {
            this.setState({
              loading: false,
            });
            alert(e);
          }
        );
      await BluetoothEscposPrinter.openDrawer(0, 250, 250);
    } catch (error) {
      console.log("error open drawer ===> ", error);
    }
  }

  changeCetakOrderId() {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    PrinterFunctions.SaveShowOrderIDPrinter(
      !this.state.show_order_id,
      (val) => {}
    );
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
            padding: 0,
            marginTop: 0,
            marginBottom: 0,
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center",
          },
        ]}
      >
        <Button
          onPress={() => {
            this.setState({
              activeMenu: 0,
              showSetting: true,
            });
          }}
          style={[
            ss.menuButton,
            {
              marginTop: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              paddingRight: 15,
              paddingLeft: 15,
            },
          ]}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {_aplikasi[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({ activeMenu: 1, showSetting: true });
          }}
          style={[
            ss.menuButton,
            {
              display:
                this.state.androidLevel > this.state.androidLevelPrinterMax
                  ? "none"
                  : "flex",
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              paddingRight: 15,
              paddingLeft: 15,
            },
          ]}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {_printer[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({ activeMenu: 2, showSetting: true });
          }}
          style={[
            ss.menuButton,
            {
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              paddingRight: 15,
              paddingLeft: 15,
              display: "none",
            },
          ]}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {_lain[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({ activeMenu: 3, showSetting: true });
          }}
          style={[
            ss.menuButton,
            {
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              paddingRight: 15,
              paddingLeft: 15,
            },
          ]}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {_informasi_perangkat[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({
              activeMenu: 4,
              showSetting: true,
              new_password: "",
              showPassword: false,
            });
          }}
          style={[
            ss.menuButton,
            {
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              paddingRight: 15,
              paddingLeft: 15,
            },
          ]}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {_ganti_password[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({
              activeMenu: 5,
              showSetting: true,
              new_pin: "",
              showPin: false,
            });
          }}
          style={[
            ss.menuButton,
            {
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              paddingRight: 15,
              paddingLeft: 15,
            },
          ]}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {_ganti_pin[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({
              activeMenu: 6,
              showSetting: true,
              showPassword: false,
            });

            // this.testPrintStatic();
          }}
          style={[
            ss.menuButton,
            {
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              paddingRight: 15,
              paddingLeft: 15,
            },
          ]}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {_ganti_user[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
        <View
          style={{
            //borderBottomWidth: 1,
            //borderColor: "#C8C7CC",
            marginLeft: -15,
            marginRight: -15,
          }}
        />
        <Button
          onPress={() => {
            LoginFunctions.Logout((val) => {
              fetch(LogoutAPI, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  //"Content-Type": "application/x-www-form-urlencoded"
                },
                body: JSON.stringify({
                  staff_id: this.state.userInfo.id,
                }),
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  Actions.MobileLogin({
                    userInfo: null,
                    colorIndex: this.state.colorIndex,
                  });
                  this.setState({ userInfo: null });
                })
                .catch((_err) => {});
            });
          }}
          style={[
            ss.menuButton,
            {
              borderBottomWidth: 0,
              borderColor: "#C8C7CC",
              paddingRight: 15,
              paddingLeft: 15,
            },
          ]}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {_logout[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
      </View>
    );
  }

  renderModalDaysOpen() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showFormOpenDays}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showFormOpenDays: false });
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
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center",
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
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showRegion: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK,
                    })
                  }
                >
                  {_choose_day_open[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  margin: 15,
                  padding: 15,
                  paddingTop: 0,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    //flex: 1,
                    marginBottom: 25,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "30%", flexDirection: "row" }}>
                    <Checkbox
                      action={() => {
                        this.setState({
                          tempDay1: !this.state.tempDay1,
                        });
                      }}
                      size={20}
                      checked={this.state.tempDay1}
                      color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    />
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          marginLeft: 15,
                          fontSize: 15,
                          color: BLACK,
                        })
                      }
                    >
                      {_day_monday[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={{ width: "30%", flexDirection: "row" }}>
                    <Checkbox
                      action={() => {
                        this.setState({
                          tempDay2: !this.state.tempDay2,
                        });
                      }}
                      size={20}
                      checked={this.state.tempDay2}
                      color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    />
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          marginLeft: 15,
                          fontSize: 15,
                          color: BLACK,
                        })
                      }
                    >
                      {_day_tuesday[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={{ width: "30%", flexDirection: "row" }}>
                    <Checkbox
                      action={() => {
                        this.setState({
                          tempDay3: !this.state.tempDay3,
                        });
                      }}
                      size={20}
                      checked={this.state.tempDay3}
                      color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    />
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          marginLeft: 15,
                          fontSize: 15,
                          color: BLACK,
                        })
                      }
                    >
                      {_day_wednesday[this.state.languageIndex]}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    //flex: 1,
                    marginBottom: 25,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "30%", flexDirection: "row" }}>
                    <Checkbox
                      action={() => {
                        this.setState({
                          tempDay4: !this.state.tempDay4,
                        });
                      }}
                      size={20}
                      checked={this.state.tempDay4}
                      color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    />
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          marginLeft: 15,
                          fontSize: 15,
                          color: BLACK,
                        })
                      }
                    >
                      {_day_thursday[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={{ width: "30%", flexDirection: "row" }}>
                    <Checkbox
                      action={() => {
                        this.setState({
                          tempDay5: !this.state.tempDay5,
                        });
                      }}
                      size={20}
                      checked={this.state.tempDay5}
                      color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    />
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          marginLeft: 15,
                          fontSize: 15,
                          color: BLACK,
                        })
                      }
                    >
                      {_day_friday[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={{ width: "30%", flexDirection: "row" }}>
                    <Checkbox
                      action={() => {
                        this.setState({
                          tempDay6: !this.state.tempDay6,
                        });
                      }}
                      size={20}
                      checked={this.state.tempDay6}
                      color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    />
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          marginLeft: 15,
                          fontSize: 15,
                          color: BLACK,
                        })
                      }
                    >
                      {_day_saturday[this.state.languageIndex]}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "30%", flexDirection: "row" }} />
                  <View style={{ width: "30%", flexDirection: "row" }}>
                    <Checkbox
                      action={() => {
                        this.setState({
                          tempDay7: !this.state.tempDay7,
                        });
                      }}
                      size={20}
                      checked={this.state.tempDay7}
                      color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    />
                    <Text
                      style={
                        ([MainStyle.robotoNormal],
                        {
                          marginLeft: 15,
                          fontSize: 15,
                          color: BLACK,
                        })
                      }
                    >
                      {_day_sunday[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={{ width: "30%", flexDirection: "row" }} />
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
                justifyContent: "flex-end",
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
                    this.changeOpenDays();
                    this.setState({
                      showFormOpenDays: false,
                      //points_used: 0
                    });
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
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                      })
                    }
                  >
                    {_lanjut[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
                    this.setState({
                      showFormOpenDays: false,
                      //points_used: 0
                    });
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
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
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

  renderModalRegion() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showRegion}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showRegion: false });
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
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center",
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
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showRegion: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK,
                    })
                  }
                >
                  {_choose_region[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  margin: 15,
                  padding: 15,
                  paddingTop: 0,
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
                    }}
                  >
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <View
                        style={{
                          //width: "10%",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons
                          name={"md-search"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: BLACK,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%",
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
                            fontFamily: "Roboto-Regular",
                          }}
                          type="text"
                          ref={(q) => {
                            this.TextInputSearch = q;
                          }}
                          onSubmitEditing={() => {
                            this.getPhoneList();
                            // this.setState({viewSearch: false});
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={(v) =>
                            this.setState({ searchKeyRegion: v })
                          }
                          value={this.state.searchKeyRegion}
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
                  data={this.state.phoneList}
                  renderItem={({ item, index }) => {
                    return this.renderListRegion(item, index);
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
                justifyContent: "flex-end",
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
                    this.setState({
                      showRegion: false,
                      //points_used: 0
                    });
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
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
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

  renderModalCurrency() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCurrency}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showCurrency: false });
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
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center",
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
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showCurrency: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK,
                    })
                  }
                >
                  {_currency[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  margin: 15,
                  padding: 15,
                  paddingTop: 0,
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
                    }}
                  >
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <View
                        style={{
                          //width: "10%",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons
                          name={"md-search"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: BLACK,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "90%",
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
                            this.getPhoneList();
                            // this.setState({viewSearch: false});
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v =>
                            this.setState({ searchKeyRegion: v })
                          }
                          value={this.state.searchKeyRegion}
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
                  data={this.state.currencyList}
                  renderItem={({ item, index }) => {
                    return this.renderListCurrency(item, index);
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "renderListCurrency" + index.toString();
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
                justifyContent: "flex-end",
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
                    this.setState({
                      showCurrency: false,
                      //points_used: 0
                    });
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
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
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

  renderListCurrency(data, index) {
    const { currency, currency_id } = this.state;

    let selected_code = currency_id ? currency_id : "";

    const backgroundColor =
      selected_code === data.id
        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
        : WHITE;
    const textColor =
      selected_code === data.id
        ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
        : BLACK;

    //console.log("data phone ===> ", data);
    return (
      <Button
        style={{
          padding: 10,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: "#C4C4C4",
          backgroundColor: backgroundColor,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => {
          // this.setState({
          //   selectedCustomer: data.id,
          //   selectedCustomerName: data.name,
          //   formCustomer: data.name,
          //   formPhone: data.phone_number,
          //   formEmail: data.email,
          //   showCustomer: false,
          //   points_available: data.points,
          //   loading: true
          // });
          // const { loyaltyPromoSettings } = this.state;
          // const status = loyaltyPromoSettings.status;
          // const type = loyaltyPromoSettings.type;
          // const value = loyaltyPromoSettings.value;
          // setTimeout(() => {
          //   this.changeDiscount();
          // }, 500);

          //PrinterFunctions.SaveShowStock(!this.state.show_stock, val => {});

          RegionFunctions.ChangeCurrency(data.name, (val) => {});
          RegionFunctions.ChangeCurrencyId(data.id, (val) => {});

          this.changeBusinessCurrency(data.id);

          this.setState({
            currency: data.name,
            currency_id: data.id,

            showCurrency: false,
          });
        }}
      >
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              width: "60%",
              fontSize: 14,
              color: textColor,
            })
          }
        >
          {data.full_name}
        </Text>
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              width: "40%",
              fontSize: 14,
              color: textColor,
            })
          }
        >
          {data.name}
        </Text>
      </Button>
    );
  }

  changeBusinessCurrency(currency_id) {
    const uri = `${BE_Business}${this.state.business_data.id}`;

    // console.log("body ===> ", {
    //   name: this.state.business_data.name,
    //   phone_number: this.state.business_data.phone_number,
    //   address: this.state.business_data.address,
    //   ktp_owner: this.state.business_data.ktp_owner,
    //   npwp_business: this.state.business_data.npwp_business,
    //   business_type_id: this.state.business_data.business_type_id,
    //   location_id: this.state.business_data.location_id,
    //   currency_id: currency_id.toString(),
    //   currency: 1.toString()
    // })
    const currrr = 1;
    let formdata = new FormData();
    formdata.append("name", this.state.business_data.name);
    formdata.append("address", this.state.business_data.address);
    formdata.append("phone_number", this.state.business_data.phone_number);
    formdata.append("ktp_owner", this.state.business_data.ktp_owner);
    formdata.append("npwp_business", this.state.business_data.npwp_business);
    formdata.append(
      "business_type_id",
      this.state.business_data.business_type_id
    );
    formdata.append("location_id", this.state.business_data.location_id);
    formdata.append("currency_id", currency_id.toString());
    formdata.append("currency", currrr.toString());

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: this.state.auth,
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson changeBusinessCurrency ==> ", responseJson);
        console.log("uri changeBusinessCurrency ==> ", uri);
      });
  }

  renderListRegion(data, index) {
    const { selectedPhone } = this.state;

    let selected_code = selectedPhone.code ? selectedPhone.code : "";

    const backgroundColor =
      selected_code === data.code
        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
        : WHITE;
    const textColor =
      selected_code === data.code
        ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
        : BLACK;

    //console.log("data phone ===> ", data);
    return (
      <Button
        style={{
          padding: 10,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: "#C4C4C4",
          backgroundColor: backgroundColor,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => {
          // this.setState({
          //   selectedCustomer: data.id,
          //   selectedCustomerName: data.name,
          //   formCustomer: data.name,
          //   formPhone: data.phone_number,
          //   formEmail: data.email,
          //   showCustomer: false,
          //   points_available: data.points,
          //   loading: true
          // });
          // const { loyaltyPromoSettings } = this.state;
          // const status = loyaltyPromoSettings.status;
          // const type = loyaltyPromoSettings.type;
          // const value = loyaltyPromoSettings.value;
          // setTimeout(() => {
          //   this.changeDiscount();
          // }, 500);

          //PrinterFunctions.SaveShowStock(!this.state.show_stock, val => {});

          RegionFunctions.ChangePhone(data, (val) => {});

          this.setState({
            selectedPhone: data,
            showRegion: false,
          });
        }}
      >
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              width: "60%",
              fontSize: 14,
              color: textColor,
            })
          }
        >
          {data.name}
        </Text>
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              width: "20%",
              fontSize: 14,
              color: textColor,
            })
          }
        >
          {data.dial_code}
        </Text>
        <Text
          style={
            ([MainStyle.robotoNormal],
            {
              width: "20%",
              fontSize: 14,
              textAlign: "right",
              color: textColor,
            })
          }
        >
          {data.code}
        </Text>
      </Button>
    );
  }

  renderAplikasi() {
    const {
      openDay1,
      openDay2,
      openDay3,
      openDay4,
      openDay5,
      openDay6,
      openDay7,
    } = this.state;

    let _listOpenDays = [];

    let _openDaysText = "";

    if (openDay1) {
      _listOpenDays.push(_day_monday[this.state.languageIndex]);
    }
    if (openDay2) {
      _listOpenDays.push(_day_tuesday[this.state.languageIndex]);
    }
    if (openDay3) {
      _listOpenDays.push(_day_wednesday[this.state.languageIndex]);
    }
    if (openDay4) {
      _listOpenDays.push(_day_thursday[this.state.languageIndex]);
    }
    if (openDay5) {
      _listOpenDays.push(_day_friday[this.state.languageIndex]);
    }
    if (openDay6) {
      _listOpenDays.push(_day_saturday[this.state.languageIndex]);
    }
    if (openDay7) {
      _listOpenDays.push(_day_sunday[this.state.languageIndex]);
    }

    _listOpenDays.map((v, i) => {
      if (_openDaysText === "") {
        _openDaysText = v;
      } else {
        _openDaysText = _openDaysText + ", " + v;
      }
    });

    return (
      <View
        style={{
          flex: 1,
          marginBottom: 15,
          width: this.state.tablet ? "66%" : "100%",
          alignSelf: "center",
        }}
      >
        {this.renderModalRegion()}
        {this.renderModalCurrency()}
        {this.renderModalDaysOpen()}

        <Button
          onPress={() => {
            this.syncOpenDays();
            this.setState({ showFormOpenDays: !this.state.showFormOpenDays });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_openday[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            {/* {this.state.showstart ? (
              <View />
            ) : (
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {this.state.currency ? this.state.currency : "IDR"}
              </Text>
            )} */}
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {_openDaysText}
            </Text>
          </View>
        </Button>

        <Button
          onPress={() => {
            this.setState({ datePickerStart: !this.state.datePickerStart });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_openhour[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            {/* {this.state.showstart ? (
              <View />
            ) : (
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {this.state.currency ? this.state.currency : "IDR"}
              </Text>
            )} */}
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {this.state.startHour
                ? moment(this.state.startHour).format("HH:mm")
                : ""}
            </Text>
          </View>
        </Button>

        <Button
          onPress={() => {
            this.setState({ datePickerEnd: !this.state.datePickerEnd });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_closehour[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            {/* {this.state.showstart ? (
              <View />
            ) : (
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {this.state.currency ? this.state.currency : "IDR"}
              </Text>
            )} */}
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {this.state.endHour
                ? moment(this.state.endHour).format("HH:mm")
                : ""}
            </Text>
          </View>
        </Button>

        {/* pilih Currency */}
        <Button
          onPress={() => {
            this.setState({ showCurrency: !this.state.showCurrency });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: this.state.showCurrency ? 0 : 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_currency[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            {this.state.showCurrency ? (
              <View />
            ) : (
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {this.state.currency ? this.state.currency : "IDR"}
              </Text>
            )}
          </View>
        </Button>

        {/* currencyAllowDecimal */}
        {/* {this.state.showCurrency ? (
          <View
            style={{
              margin: 15,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              paddingBottom: 5
            }}
          >
            <TextInput
              ref={q => {
                this.Footer = q;
              }}
              style={{
                backgroundColor: WHITE,
                width: "100%",
                fontSize: 15,

                color: BLACK,
                borderBottomColor: "#C4C4C4",
                borderWidth: 1,
                borderRadius: 10,
                fontFamily: "Roboto-Regular"
              }}
              //keyboardType="numeric"
              type="text"
              value={this.state.currency}
              onChangeText={v => {
                this.setState({ currency: v });
              }}
              onSubmitEditing={() => {
                //this.setState({ currency: this.state.currency });
                RegionFunctions.ChangeCurrency(this.state.currency, val => {});
                this.setState({ showCurrency: false });
              }}
              placeholder={"Currency"}
              placeholderTextColor={BLACK}
            />
          </View>
        ) : (
          <View />
        )} */}

        {/* allow multicurrency */}
        <Button
          onPress={() => {
            RegionFunctions.ChangeAllowMultiCurrency(
              !this.state.currencyAllowMultiCurrency,
              (val) => {}
            );
            this.setState({
              currencyAllowMultiCurrency:
                !this.state.currencyAllowMultiCurrency,
            });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_currency_conversion[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {this.state.currencyAllowMultiCurrency
                ? _aktif[this.state.languageIndex]
                : _tidak_aktif[this.state.languageIndex]}
            </Text>
          </View>
        </Button>
        {/* allow decimal */}
        <Button
          onPress={() => {
            RegionFunctions.ChangeAllowDecimal(
              !this.state.currencyAllowDecimal,
              (val) => {}
            );
            this.setState({
              currencyAllowDecimal: !this.state.currencyAllowDecimal,
            });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_decimal[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {this.state.currencyAllowDecimal
                ? _aktif[this.state.languageIndex]
                : _tidak_aktif[this.state.languageIndex]}
            </Text>
          </View>
        </Button>

        <Button
          onPress={() => {
            RegionFunctions.SaveSettingLightMode(
              !this.state.setting_light_mode,
              (val) => {}
            );
            this.setState({
              setting_light_mode: !this.state.setting_light_mode,
            });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_light_mode[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {this.state.setting_light_mode
                ? _aktif[this.state.languageIndex]
                : _tidak_aktif[this.state.languageIndex]}
            </Text>
          </View>
        </Button>

        {/* Kitchen Management */}

        <Button
          onPress={() => {
            RegionFunctions.SaveSettingKitchenManagement(
              !this.state.allowKitchenManagement,
              (val) => {}
            );
            this.setState({
              allowKitchenManagement: !this.state.allowKitchenManagement,
            });
          }}
          style={[
            ss.box,
            {
              display:
                this.state.business_type === "Restaurant" ||
                this.state.userInfo.gerai_id === 1
                  ? "flex"
                  : "none",
              //display: "none",
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_kitchen_management[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {this.state.allowKitchenManagement
                ? _aktif[this.state.languageIndex]
                : _tidak_aktif[this.state.languageIndex]}
            </Text>
          </View>
        </Button>

        {/* PILIH REGIONAL */}
        <Button
          onPress={() => {
            this.setState({ showRegion: true });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 1,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 1,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {_choose_region[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", width: "99%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {this.state.selectedPhone.name
                ? this.state.selectedPhone.name
                : "Indonesia"}
            </Text>
          </View>
        </Button>
        <Button
          onPress={() => {
            this.setState({ showLanguageSelection: true });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 1,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View>
            {/* PILIH BAHASA */}
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 15, color: BLACK },
                  ]}
                >
                  {_pilih_bahasa[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: "center", width: "99%" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
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
              display: "none",
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 1,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{}}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_warna_aplikasi[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "33%",
              }}
            >
              <View
                style={[
                  ss.box,
                  {
                    width: 60,
                    height: 20,
                    borderWidth: 1,
                    borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    borderRadius: 4,
                  },
                ]}
              />
            </View>
          </View>
        </Button>

        {/* SHOW STOCK */}

        <Button
          onPress={() => {
            PrinterFunctions.SaveShowStock(!this.state.show_stock, (val) => {});

            this.setState({ show_stock: !this.state.show_stock });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_show_stock[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 11, color: "#8A8A8F" }]}
          >
            {this.state.show_stock
              ? _aktif[this.state.languageIndex]
              : _tidak_aktif[this.state.languageIndex]}
          </Text>
        </Button>

        {/* SHOW STOCK END */}

        {/* AUTO CALCULATE REKAP */}

        <Button
          onPress={() => {
            PrinterFunctions.SaveAutoCalculateRekap(
              !this.state.autoCalculateRekap,
              (val) => {}
            );

            this.setState({
              autoCalculateRekap: !this.state.autoCalculateRekap,
            });
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_auto_calculate[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 11, color: "#8A8A8F" }]}
          >
            {this.state.autoCalculateRekap
              ? _aktif[this.state.languageIndex]
              : _tidak_aktif[this.state.languageIndex]}
          </Text>
        </Button>

        {/* AUTO CALCULATE REKAP */}
        <Button
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
              display: "none",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_backup_data[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 11, color: "#8A8A8F" }]}
          >
            {_tidak_aktif[this.state.languageIndex]}
          </Text>
        </Button>
        <Button
          onPress={() => {
            this.sinkronisasiData();
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 0,
              borderColor: "#C8C7CC",
              display: "none",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "66%", justifyContent: "center" }}>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_sinkronisasi_data[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                width: "33%",
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {_edit[this.state.languageIndex]}
              </Text>
            </View>
          </View>
        </Button>
      </View>
    );
  }

  renderStrukMain() {
    const {
      cetakOrderId,
      catatSaldoRekapKas,
      tampilkanStokMenu,
      showFooterForm,
    } = this.state;
    return (
      <View
        style={{
          flex: 1,
          paddingBottom: 15,
          width: this.state.tablet ? "66%" : "100%",
          alignSelf: "center",
        }}
      >
        {/* Button 1 */}
        <Button
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.changeCetakOrderId();
            //this.changeSaldoRekapKas();
            //this.changeAutoDetectPrinter();
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              // backgroundColor: "#BCA",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_cetak_order_id[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {this.state.show_order_id
                  ? _aktif[this.state.languageIndex]
                  : _tidak_aktif[this.state.languageIndex]}
              </Text>
            </View>
            <MaterialCommunityIcons
              name={
                this.state.show_order_id ? "toggle-switch" : "toggle-switch-off"
              }
              style={{
                fontSize: 35,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              }}
            />
          </View>
        </Button>
        {/* Button 2 */}
        <Button
          onPress={() => {
            //this.changeCetakOrderId();
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.changeSaldoRekapKas();
            //this.changeTampilkanStokMenu();
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_catat_saldo[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {catatSaldoRekapKas
                  ? _aktif[this.state.languageIndex]
                  : _tidak_aktif[this.state.languageIndex]}
              </Text>
            </View>
            <MaterialCommunityIcons
              name={catatSaldoRekapKas ? "toggle-switch" : "toggle-switch-off"}
              style={{
                fontSize: 35,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              }}
            />
          </View>
        </Button>
        {/* Button 3 */}
        <Button
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            //this.changeCetakOrderId();
            //this.changeSaldoRekapKas();
            this.changeTampilkanStokMenu();
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_tampilkan_stok[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 12, color: "#8A8A8F" },
                ]}
              >
                {tampilkanStokMenu
                  ? _aktif[this.state.languageIndex]
                  : _tidak_aktif[this.state.languageIndex]}
              </Text>
            </View>
            <MaterialCommunityIcons
              name={tampilkanStokMenu ? "toggle-switch" : "toggle-switch-off"}
              style={{
                fontSize: 35,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              }}
            />
          </View>
        </Button>

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
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 14, color: BLACK, justifyContent: "center" },
            ]}
          >
            {_edit_footer[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          onPress={() => {
            // if (showFooterForm === true) {
            //   this.saveFooterPrinter();
            // }
            // this.setState({ showFooterForm: !showFooterForm });
            // LayoutAnimation.configureNext(
            //   LayoutAnimation.Presets.easeInEaseOut
            // );
          }}
          style={[
            ss.box,
            {
              margin: 15,
              marginTop: 0,
              padding: 15,
              backgroundColor: WHITE,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderColor: "#C8C7CC",
            },
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 14, color: BLACK, justifyContent: "center" },
            ]}
          >
            {_upload_logo[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  renderInformasi() {
    const { informasi, userInfo, device_name, ip_address } = this.state;

    let version = DeviceInfo.getVersion();

    let version_build_number = DeviceInfo.getBuildNumber();

    // console.log("version_build_number ====> ", version_build_number);

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
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center",
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <View
            style={[
              {
                marginTop: 0,
                flexDirection: "row",
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_nama_perangkat[this.state.languageIndex]}
              </Text>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {device_name}
              </Text>
            </View>
          </View>
          <View
            style={[
              {
                marginTop: 15,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
            >
              {_staff_id[this.state.languageIndex]}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {userInfo.staff_id}
            </Text>
          </View>
          <View
            style={[
              {
                marginTop: 15,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
            >
              {_email[this.state.languageIndex]}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {userInfo.email}
            </Text>
          </View>
          <View
            style={[
              {
                marginTop: 15,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
            >
              {_tipe_account[this.state.languageIndex]}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {informasi.accountType}
            </Text>
          </View>
          <View
            style={[
              {
                marginTop: 15,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
            >
              {_alamat_ip[this.state.languageIndex]}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {ip_address}
            </Text>
          </View>
          <View
            style={[
              {
                marginTop: 15,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
            >
              {_versi[this.state.languageIndex]}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {version}
            </Text>
          </View>
          {/* Custom Name */}
          <View
            style={[
              {
                marginTop: 15,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
                //flexDirection: "row",
                //justifyContent: "space-between"
              },
            ]}
          >
            <Button
              onPress={() => {
                if (this.state.showCustomNameForm === true) {
                  this.saveDevice("name");
                }
                this.setState({
                  showCustomNameForm: !this.state.showCustomNameForm,
                });

                // LayoutAnimation.configureNext(
                //   LayoutAnimation.Presets.easeInEaseOut
                // );
              }}
              style={[
                ss.box,
                {
                  // margin: 15,
                  // marginTop: 0,
                  // padding: 15,
                  backgroundColor: WHITE,
                  marginBottom: 0,
                  //borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                },
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 14, color: BLACK, justifyContent: "center" },
                ]}
              >
                {_edit_custom_name[this.state.languageIndex]}
              </Text>
            </Button>

            {this.state.showCustomNameForm ? (
              <View
                style={[
                  ss.box,
                  {
                    //margin: 15,
                    marginTop: 10,
                    //padding: 15,
                    backgroundColor: WHITE,
                    marginBottom: 0,
                    borderBottomWidth: 1,
                    borderColor: "#C8C7CC",
                  },
                ]}
              >
                {/* <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK, justifyContent: "center" }
                  ]}
                >
                  CustomName
                </Text> */}
                <TextInput
                  ref={(q) => {
                    this.CustomName = q;
                  }}
                  style={{
                    //backgroundColor: WHITE,
                    width: "100%",
                    fontSize: 14,
                    color: BLACK,
                    borderRadius: 15,
                    paddingLeft: 15,
                    paddingRight: 15,
                    backgroundColor: "#EEE",
                    borderBottomColor: "#C4C4C4",
                    //borderBottomWidth: 1,
                    fontFamily: "Roboto-Regular",
                  }}
                  //keyboardType="numeric"
                  type="text"
                  value={this.state.custom_name}
                  onChangeText={(v) => {
                    this.setState({ custom_name: v });
                  }}
                  onSubmitEditing={() => {
                    this.setState({ showCustomNameForm: false });
                    this.saveDevice("name");
                  }}
                  placeholder={"Custom Name"}
                  placeholderTextColor={GREY_700}
                />
              </View>
            ) : (
              <View>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK, marginTop: 15 },
                  ]}
                >
                  {this.state.custom_name}
                </Text>
              </View>
            )}
          </View>

          {/* Device Description */}
          <View
            style={[
              {
                marginTop: 15,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
                //flexDirection: "row",
                //justifyContent: "space-between"
              },
            ]}
          >
            <Button
              onPress={() => {
                if (this.state.showDescriptionForm === true) {
                  this.saveDevice("description");
                }
                this.setState({
                  showDescriptionForm: !this.state.showDescriptionForm,
                });

                // LayoutAnimation.configureNext(
                //   LayoutAnimation.Presets.easeInEaseOut
                // );
              }}
              style={[
                ss.box,
                {
                  // margin: 15,
                  // marginTop: 0,
                  // padding: 15,
                  backgroundColor: WHITE,
                  marginBottom: 0,
                  //borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                },
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 14, color: BLACK, justifyContent: "center" },
                ]}
              >
                {_edit_device_description[this.state.languageIndex]}
              </Text>
            </Button>

            {this.state.showDescriptionForm ? (
              <View
                style={[
                  ss.box,
                  {
                    //margin: 15,
                    marginTop: 10,
                    //padding: 15,
                    backgroundColor: WHITE,
                    marginBottom: 0,
                    borderBottomWidth: 1,
                    borderColor: "#C8C7CC",
                  },
                ]}
              >
                {/* <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK, justifyContent: "center" }
                  ]}
                >
                  DeviceDescription
                </Text> */}
                <TextInput
                  ref={(q) => {
                    this.DeviceDescription = q;
                  }}
                  style={{
                    //backgroundColor: WHITE,
                    width: "100%",
                    fontSize: 14,
                    color: BLACK,
                    borderRadius: 15,
                    paddingLeft: 15,
                    paddingRight: 15,
                    backgroundColor: "#EEE",
                    borderBottomColor: "#C4C4C4",
                    //borderBottomWidth: 1,
                    fontFamily: "Roboto-Regular",
                  }}
                  //keyboardType="numeric"
                  type="text"
                  value={this.state.device_description}
                  onChangeText={(v) => {
                    this.setState({ device_description: v });
                  }}
                  onSubmitEditing={() => {
                    this.setState({ showDescriptionForm: false });
                    this.saveDevice("description");
                  }}
                  placeholder={"Description"}
                  placeholderTextColor={GREY_700}
                />
              </View>
            ) : (
              <View>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK, marginTop: 15 },
                  ]}
                >
                  {this.state.device_description}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Informasi end */}
        {/* Button */}
        <View
          style={{
            justifyContent: "flex-end",
            display: "none",
            //backgroundColor: "#BCA"

            //marginBottom: 36
            //justifyContent: "flex-end",
            //backgroundColor: "#BCA"
            //alignItems: "flex-end"
          }}
        >
          <View style={{}}>
            <Button
              onPress={() => {
                this.sendPushNotifTest();
              }}
              style={[
                ss.box,
                {
                  marginTop: 10,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  padding: 10,
                },
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 14,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  },
                ]}
              >
                Customer Support
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  renderGantiPassword() {
    const { userInfo } = this.state;

    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            margin: 15,
            backgroundColor: WHITE,
            borderRadius: 15,
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center",
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <View
            style={[
              {
                marginTop: 0,
                //flexDirection: "row",
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_new_password[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                ref={(q) => {
                  this.NewPassword = q;
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  // borderBottomColor: "#C4C4C4",
                  // borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                  display: this.state.showPassword ? "none" : "flex",
                }}
                secureTextEntry={true}
                keyboardType="password"
                //keyboardType="numeric"
                type="text"
                value={this.state.new_password}
                onChangeText={(v) => {
                  this.setState({ new_password: v });
                }}
                onSubmitEditing={() => {
                  this.changePasswordStaff();
                }}
                //placeholder={_new_password[this.state.languageIndex]}
                placeholderTextColor={BLACK}
              />

              <TextInput
                ref={(q) => {
                  this.NewPassword = q;
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  // borderBottomColor: "#C4C4C4",
                  // borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                  display: this.state.showPassword ? "flex" : "none",
                }}
                //secureTextEntry={true}
                keyboardType="password"
                //keyboardType="numeric"
                type="text"
                value={this.state.new_password}
                onChangeText={(v) => {
                  this.setState({ new_password: v });
                }}
                onSubmitEditing={() => {
                  this.changePasswordStaff();
                }}
                //placeholder={_new_password[this.state.languageIndex]}
                placeholderTextColor={BLACK}
              />
              <Button
                onPress={() => {
                  this.setState({ showPassword: !this.state.showPassword });
                }}
                style={{
                  padding: 10,
                  position: "absolute",
                  elevation: 1,
                  right: 5,
                }}
              >
                <Entypo
                  name={!this.state.showPassword ? "eye" : "eye-with-line"}
                  style={{
                    fontSize: 25,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  }}
                />
              </Button>
            </View>
          </View>
        </View>
        {/* Informasi end */}
        {/* Button */}
        <View
          style={{
            justifyContent: "flex-end",
          }}
        >
          <View style={{}}>
            <Button
              onPress={() => {
                this.changePasswordStaff();
              }}
              style={[
                ss.box,
                {
                  marginTop: 10,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  padding: 10,
                  margin: 15,
                },
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 14,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  },
                ]}
              >
                {_ganti_password[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  renderGantiPin() {
    const { userInfo } = this.state;

    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            margin: 15,
            backgroundColor: WHITE,
            borderRadius: 15,
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center",
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <View
            style={[
              {
                marginTop: 0,
                //flexDirection: "row",
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_new_pin[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                ref={(q) => {
                  this.NewPin = q;
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  // borderBottomColor: "#C4C4C4",
                  // borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                  display: this.state.showPin ? "none" : "flex",
                }}
                secureTextEntry={true}
                //keyboardType="password"
                keyboardType="numeric"
                type="text"
                value={this.state.new_pin}
                onChangeText={(v) => {
                  this.setState({ new_pin: v });
                }}
                onSubmitEditing={() => {
                  this.changePinStaff();
                }}
                //placeholder={_new_pin[this.state.languageIndex]}
                placeholderTextColor={BLACK}
              />

              <TextInput
                ref={(q) => {
                  this.NewPin = q;
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  // borderBottomColor: "#C4C4C4",
                  // borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                  display: this.state.showPin ? "flex" : "none",
                }}
                //secureTextEntry={true}
                //keyboardType="password"
                keyboardType="numeric"
                type="text"
                value={this.state.new_pin}
                onChangeText={(v) => {
                  this.setState({ new_pin: v });
                }}
                onSubmitEditing={() => {
                  this.changePinStaff();
                }}
                //placeholder={_new_pin[this.state.languageIndex]}
                placeholderTextColor={BLACK}
              />

              <Button
                onPress={() => {
                  this.setState({ showPin: !this.state.showPin });
                }}
                style={{
                  padding: 10,
                  position: "absolute",
                  elevation: 1,
                  right: 5,
                }}
              >
                <Entypo
                  name={!this.state.showPin ? "eye" : "eye-with-line"}
                  style={{
                    fontSize: 25,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  }}
                />
              </Button>
            </View>
          </View>
        </View>
        {/* Informasi end */}
        {/* Button */}
        <View
          style={{
            justifyContent: "flex-end",
          }}
        >
          <View style={{}}>
            <Button
              onPress={() => {
                this.changePinStaff();
              }}
              style={[
                ss.box,
                {
                  marginTop: 10,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  padding: 10,
                  margin: 15,
                },
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 14,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  },
                ]}
              >
                {_ganti_pin[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  renderGantiUser() {
    const { userInfo } = this.state;

    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            margin: 15,
            backgroundColor: WHITE,
            borderRadius: 15,
            width: this.state.tablet ? "90%" : "90%",
            alignSelf: "center",
            flexDirection: "row",
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <View
            style={[
              {
                marginTop: 0,
                //flexDirection: "row",
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 0,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_staff_id[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                ref={(q) => {
                  this.staff_id = q;
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  // borderBottomColor: "#C4C4C4",
                  // borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                }}
                // secureTextEntry={true}
                // keyboardType="password"
                //keyboardType="numeric"
                type="text"
                value={this.state.staff_id}
                onChangeText={(v) => {
                  this.setState({ staff_id: v });
                }}
                onSubmitEditing={() => {
                  //this.changePasswordStaff();
                }}
                placeholderTextColor={BLACK}
              />
            </View>
          </View>
          <View
            style={[
              {
                marginTop: 0,
                //flexDirection: "row",
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
              >
                {_password[this.state.languageIndex]}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                ref={(q) => {
                  this.password = q;
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  // borderBottomColor: "#C4C4C4",
                  // borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                  display: this.state.showPassword ? "none" : "flex",
                }}
                secureTextEntry={true}
                keyboardType="password"
                //keyboardType="numeric"
                type="text"
                value={this.state.password}
                onChangeText={(v) => {
                  this.setState({ password: v });
                }}
                onSubmitEditing={() => {
                  //this.changePasswordStaff();
                }}
                placeholderTextColor={BLACK}
              />

              <TextInput
                ref={(q) => {
                  this.password = q;
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  // borderBottomColor: "#C4C4C4",
                  // borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                  display: this.state.showPassword ? "flex" : "none",
                }}
                //secureTextEntry={true}
                keyboardType="password"
                //keyboardType="numeric"
                type="text"
                value={this.state.password}
                onChangeText={(v) => {
                  this.setState({ password: v });
                }}
                onSubmitEditing={() => {
                  //this.changePasswordStaff();
                }}
                placeholderTextColor={BLACK}
              />

              <Button
                onPress={() => {
                  this.setState({ showPassword: !this.state.showPassword });
                }}
                style={{
                  padding: 10,
                  position: "absolute",
                  elevation: 1,
                  right: 5,
                }}
              >
                <Entypo
                  name={!this.state.showPassword ? "eye" : "eye-with-line"}
                  style={{
                    fontSize: 25,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  }}
                />
              </Button>
            </View>
          </View>
          <View
            style={[
              {
                marginTop: 0,
                //flexDirection: "row",
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 10,
                borderBottomWidth: 0,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <Button
              onPress={() => {
                //this.changePasswordStaff();
                this.multiLogin();
              }}
              style={[
                ss.box,
                {
                  marginTop: 10,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  padding: 10,
                  margin: 15,
                },
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 14,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  },
                ]}
              >
                {_login[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>

        <View
          style={[
            {
              flex: 1,
              marginTop: 0,
              //flexDirection: "row",
              marginLeft: 10,
              marginRight: 10,
              paddingBottom: 10,
              borderBottomWidth: 0,
            },
          ]}
        >
          <View style={{ width: "100%", marginBottom: 0 }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 14, color: BLACK },
              ]}
            >
              {_user[this.state.languageIndex]}
            </Text>
          </View>

          {this.state.loadingPrinter ? (
            <ActivityIndicator size="large" color="#39f" animating={true} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.listUser}
              renderItem={({ item, index }) => {
                if (this.state.ready === true) {
                  return this.renderDataUser(item, index);
                } else {
                  return <View />;
                }
              }}
              //ListFooterComponent={this._renderFooter}
              keyExtractor={(item, index) => {
                return "RenderUser" + index.toString();
              }}
              //onRefresh={this._onRefresh}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={0.5}
              //refreshing={refreshing}
            />
          )}
        </View>

        {/* Informasi end */}
        {/* Button */}
        {/* <View
          style={{
            justifyContent: "flex-end",
            display: "none"
          }}
        >
          <View style={{}} >
          <Button
              onPress={() => {
                //this.changePasswordStaff();
                this.multiLogin();
              }}
              style={[
                ss.box,
                {
                  marginTop: 10,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  padding: 10,
                  margin: 15
                }
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 14,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }
                ]}
              >
                {_login[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View> */}
      </View>
    );
  }

  changePasswordStaff() {
    const uri = BE_Staff + "/password/" + this.state.userInfo.id;
    const body = {
      new_password: this.state.new_password,
    };

    fetch(uri, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth,
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.statusCode === 200) {
          alert(_proses_sukses[this.state.languageIndex]);
          this.setState({ new_password: "" });
        } else {
          alert(
            _proses_gagal[this.state.languageIndex] +
              "\n" +
              responseJson.message
          );
        }
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
        alert(_proses_gagal[this.state.languageIndex]);
      });
  }

  changePinStaff() {
    const uri = BE_Staff + "/pin/" + this.state.userInfo.id;
    const body = {
      new_pin: this.state.new_pin,
    };

    fetch(uri, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth,
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.statusCode === 200) {
          alert(_proses_sukses[this.state.languageIndex]);
          this.setState({ new_pin: "" });
        } else {
          alert(
            _proses_gagal[this.state.languageIndex] +
              "\n" +
              responseJson.message
          );
        }
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
        alert(_proses_gagal[this.state.languageIndex]);
      });
  }

  sendPushNotifTest() {
    const uri = "https://onesignal.com/api/v1/notifications";
    const body = {
      app_id: "545db6bf-4448-4444-b9c8-70fb9fae225b",
      include_player_ids: ["ebef3a5a-4e64-4e26-8822-9e2ac136d29f"],
      contents: {
        en: "Proses booking untuk kode: BOOKING_1/1/1/2020-04-22-18-02 telah dikonfirmasi oleh pihak restoran. Nomor meja anda adalah Meja 2.",
        es: "Proses booking untuk kode: BOOKING_1/1/1/2020-04-22-18-02 telah dikonfirmasi oleh pihak restoran. Nomor meja anda adalah Meja 2.",
      },
      headings: {
        en: "Notifikasi update booking.",
        es: "Notifikasi update booking.",
      },
      subtitle: { en: "English STitle", es: "Spanish STitle" },
    };

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // let result = responseJson;
        // let resultData = result.data;

        console.log("responseJson push notif ==> ", responseJson);
        // this.setState({
        //   dataMenuFav: resultData.data,
        //   activeCategory: 0,
        //   loading: false
        // });
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  changeAutoDetectPrinter() {
    this.setState({ autoDetectPrinter: !this.state.autoDetectPrinter });
  }

  changePrinter2() {
    console.log("changePrinter2 ===> ", !this.state.printer2);
    PrinterFunctions.SavePrinter2(!this.state.printer2, (val) => {
      //alert("Sukses Set Footer Printer");
    });
    this.setState({ printer2: !this.state.printer2 });
  }

  changePrinter3() {
    console.log("changePrinter3 ===> ", !this.state.printer3);
    PrinterFunctions.SavePrinter3(!this.state.printer3, (val) => {
      //alert("Sukses Set Footer Printer");
    });
    this.setState({ printer3: !this.state.printer3 });
  }

  changeManualPrintPayment() {
    PrinterFunctions.SaveManualPrint(!this.state.manual_print, (val) => {
      //alert("Sukses Set Footer Printer");
    });
    this.setState({ manual_print: !this.state.manual_print });
  }

  changeManualPrintCashlez() {
    PrinterFunctions.SaveManualPrintCashlez(
      !this.state.manual_print_cashlez,
      (val) => {
        //alert("Sukses Set Footer Printer");
      }
    );
    this.setState({ manual_print_cashlez: !this.state.manual_print_cashlez });
  }

  changePrintType() {
    const { printType } = this.state;

    const new_value = printType === 1 ? 2 : 1;
    // console.log("changePrintType printerType ===> ", printType);

    // console.log("changePrintType ===> ", new_value);

    PrinterFunctions.SavePrintType(new_value, (val) => {
      //alert("Sukses Set Footer Printer");
    });

    this.setState({ printType: new_value });
  }

  changeSettingPrintQR() {
    const { setting_print_qr } = this.state;
    const new_value = setting_print_qr === true ? false : true;
    PrinterFunctions.SaveSettingPrintQR(new_value, (val) => {
      //alert("Sukses Set Footer Printer");
    });
    this.setState({ setting_print_qr: new_value });
  }

  changeSettingPrintLogo() {
    const { setting_print_logo } = this.state;
    const new_value = setting_print_logo === true ? false : true;
    PrinterFunctions.SaveSettingPrintLogo(new_value, (val) => {
      //alert("Sukses Set Footer Printer");
    });
    this.setState({ setting_print_logo: new_value });
  }

  renderModalPrinter() {
    let checked_1 = false;
    let checked_2 = false;
    let checked_3 = false;

    let selected_printer = this.state.selectedPrinter;

    if (selected_printer) {
      let printer_1 = this.state.printer_main
        ? this.state.printer_main.name
        : "";
      let printer_2 = this.state.printer_kitchen
        ? this.state.printer_kitchen.name
        : "";
      let printer_3 = this.state.printer_label
        ? this.state.printer_label.name
        : "";

      checked_1 = selected_printer.name === printer_1;
      checked_2 = selected_printer.name === printer_2;
      checked_3 = selected_printer.name === printer_3;
    }

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
                { flexDirection: "column", marginTop: 15 },
              ]}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
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
                  justifyContent: "space-around",
                },
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
                    flexDirection: "row",
                  },
                ]}
              >
                <Checkbox
                  action={() => {
                    // this.setState({
                    //   tempDay7: !this.state.tempDay7
                    // });
                  }}
                  size={20}
                  checked={checked_1}
                  color={WHITE}
                />

                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: WHITE },
                  ]}
                >
                  {_set_printer_cashier[this.state.languageIndex]}
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
                    flexDirection: "row",
                  },
                ]}
              >
                <Checkbox
                  action={() => {
                    // this.setState({
                    //   tempDay7: !this.state.tempDay7
                    // });
                  }}
                  size={20}
                  checked={checked_2}
                  color={WHITE}
                />
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: WHITE },
                  ]}
                >
                  {_set_printer_kitchen[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.actionConnectLabel();
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
                    flexDirection: "row",
                  },
                ]}
              >
                <Checkbox
                  action={() => {
                    // this.setState({
                    //   tempDay7: !this.state.tempDay7
                    // });
                  }}
                  size={20}
                  checked={checked_3}
                  color={WHITE}
                />
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: WHITE },
                  ]}
                >
                  {_set_printer_label[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.print();
                  //this.print_new_method();
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
                    flexDirection: "row",
                  },
                ]}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: WHITE },
                  ]}
                >
                  {_test_print[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.printLabel();
                  //this.print_new_method();
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
                    flexDirection: "row",
                  },
                ]}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: WHITE },
                  ]}
                >
                  {_test_print_label[this.state.languageIndex]}
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
                    flexDirection: "row",
                  },
                ]}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: WHITE },
                  ]}
                >
                  {_test_open_drawer[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  async unpair_printer(address) {
    BluetoothManager.unpair(address).then(
      (s) => {
        //success here
      },
      (err) => {
        //error here
      }
    );
  }

  async print_test(address, address2) {
    this.connect(address);
    setTimeout(() => {
      this.print(address, address2);
    }, 500);

    //setTimeout(() => { this.connect(address) }, 4000);
  }
  renderPrinterMain() {
    let {
      autoDetectPrinter,
      printer2,
      printer3,
      printType,
      manual_print,
      manual_print_cashlez,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.renderModalPrinter()}

        <View
          style={[
            ss.box,
            {
              flex: 1,
              width: this.state.tablet ? "66%" : "100%",
              alignSelf: "center",
            },
          ]}
        >
          <Button
            onPress={() => {
              this.changeManualPrintPayment();
              // setTimeout(() => {
              //   this.print_test("00:0E:0E:02:93:45", "66:22:62:ED:19:30");
              // }, 4900);
            }}
            style={[
              ss.box,
              {
                display: "flex",
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_manual_print_payment[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                //paddingRight: 15,
                //backgroundColor: "#888",
                //alignItems: "flex-end"
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {manual_print
                    ? _aktif[this.state.languageIndex]
                    : _tidak_aktif[this.state.languageIndex]}
                </Text>
              </View>
            </View>
          </Button>

          <Button
            onPress={() => {
              this.changeManualPrintCashlez();
              // setTimeout(() => {
              //   this.print_test("00:0E:0E:02:93:45", "66:22:62:ED:19:30");
              // }, 4900);
            }}
            style={[
              ss.box,
              {
                display: this.state.cz_invalid ? "none" : "flex",
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_manual_print_cashlez[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                //paddingRight: 15,
                //backgroundColor: "#888",
                //alignItems: "flex-end"
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {manual_print_cashlez
                    ? _aktif[this.state.languageIndex]
                    : _tidak_aktif[this.state.languageIndex]}
                </Text>
              </View>
            </View>
          </Button>

          {/* <Print_V2 /> */}
          <Button
            onPress={() => {
              this.changePrinter2();
            }}
            style={[
              ss.box,
              {
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_print_2[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                //paddingRight: 15,
                //backgroundColor: "#888",
                //alignItems: "flex-end"
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {printer2
                    ? _aktif[this.state.languageIndex]
                    : _tidak_aktif[this.state.languageIndex]}
                </Text>
              </View>
            </View>
          </Button>

          {/* <Print_V2 /> */}
          <Button
            onPress={() => {
              this.changePrinter3();
            }}
            style={[
              ss.box,
              {
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_print_auto_label[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                //paddingRight: 15,
                //backgroundColor: "#888",
                //alignItems: "flex-end"
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {printer3
                    ? _aktif[this.state.languageIndex]
                    : _tidak_aktif[this.state.languageIndex]}
                </Text>
              </View>
            </View>
          </Button>

          <Button
            onPress={() => {
              this.changePrintType();
            }}
            style={[
              ss.box,
              {
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_print_type[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {printType === 1 ? "57mm" : "80mm"}
                </Text>
              </View>
            </View>
          </Button>

          <Button
            onPress={() => {
              this.changeSettingPrintLogo();
            }}
            style={[
              ss.box,
              {
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_print_logo[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {this.state.setting_print_logo
                    ? _aktif[this.state.languageIndex]
                    : _tidak_aktif[this.state.languageIndex]}
                </Text>
              </View>
            </View>
          </Button>

          <Button
            onPress={() => {
              this.changeSettingPrintQR();
            }}
            style={[
              ss.box,
              {
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_print_qr[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {this.state.setting_print_qr
                    ? _aktif[this.state.languageIndex]
                    : _tidak_aktif[this.state.languageIndex]}
                </Text>
              </View>
            </View>
          </Button>

          <Button
            onPress={() => {
              if (this.state.showFooterForm === true) {
                this.saveFooterPrinter();
              }
              this.setState({ showFooterForm: !this.state.showFooterForm });

              // LayoutAnimation.configureNext(
              //   LayoutAnimation.Presets.easeInEaseOut
              // );
            }}
            style={[
              ss.box,
              {
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                { fontSize: 14, color: BLACK, justifyContent: "center" },
              ]}
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
                  padding: 15,
                  backgroundColor: WHITE,
                  marginBottom: 0,
                  borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                },
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 14, color: BLACK, justifyContent: "center" },
                ]}
              >
                Footer
              </Text>
              <TextInput
                ref={(q) => {
                  this.Footer = q;
                }}
                style={{
                  backgroundColor: WHITE,
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  borderBottomColor: "#C4C4C4",
                  borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                }}
                //keyboardType="numeric"
                type="text"
                value={this.state.footer_printer}
                onChangeText={(v) => {
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

          <Button
            onPress={() => {
              if (this.state.showURLForm === true) {
                this.saveURLPrinter();
              }
              this.setState({ showURLForm: !this.state.showURLForm });

              // LayoutAnimation.configureNext(
              //   LayoutAnimation.Presets.easeInEaseOut
              // );
            }}
            style={[
              ss.box,
              {
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                { fontSize: 14, color: BLACK, justifyContent: "center" },
              ]}
            >
              {_edit_url[this.state.languageIndex]}
            </Text>
          </Button>

          {this.state.showURLForm ? (
            <View
              style={[
                ss.box,
                {
                  margin: 15,
                  marginTop: 0,
                  padding: 15,
                  backgroundColor: WHITE,
                  marginBottom: 0,
                  borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                },
              ]}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 14, color: BLACK, justifyContent: "center" },
                ]}
              >
                URL
              </Text>
              <TextInput
                ref={(q) => {
                  this.URL_Struk = q;
                }}
                style={{
                  backgroundColor: WHITE,
                  width: "100%",
                  fontSize: 14,
                  color: BLACK,
                  borderBottomColor: "#C4C4C4",
                  borderBottomWidth: 1,
                  fontFamily: "Roboto-Regular",
                }}
                //keyboardType="numeric"
                type="text"
                value={this.state.url_printer}
                onChangeText={(v) => {
                  this.setState({ url_printer: v });
                }}
                onSubmitEditing={() => {
                  this.setState({ showURLForm: false });
                  this.saveURLPrinter();
                }}
                placeholder={"Footer"}
                placeholderTextColor={BLACK}
              />
            </View>
          ) : (
            <View />
          )}

          <Button
            onPress={() => {
              //this.changeCetakOrderId();
              //this.changeSaldoRekapKas();
              //this.changeAutoDetectPrinter();
              this.setState({ showSetting: true, activeMenu: 999 });
            }}
            style={[
              ss.box,
              {
                display: "none",
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_management_printer[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                //paddingRight: 15,
                //backgroundColor: "#888",
                //alignItems: "flex-end"
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {autoDetectPrinter
                    ? _aktif[this.state.languageIndex]
                    : _tidak_aktif[this.state.languageIndex]}
                </Text>
              </View>
            </View>
          </Button>

          <Button
            onPress={() => {
              //this.changeCetakOrderId();
              //this.changeSaldoRekapKas();
              this.changeAutoDetectPrinter();
            }}
            style={[
              ss.box,
              {
                display: "none",
                margin: 15,
                marginTop: 0,
                padding: 15,
                backgroundColor: WHITE,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "#C8C7CC",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "66%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {_auto_detect_printer[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  width: "33%",
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {_edit[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                //paddingRight: 15,
                //backgroundColor: "#888",
                //alignItems: "flex-end"
              }}
            >
              <View style={{ marginTop: 0, justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#8A8A8F" },
                  ]}
                >
                  {autoDetectPrinter
                    ? _aktif[this.state.languageIndex]
                    : _tidak_aktif[this.state.languageIndex]}
                </Text>
              </View>
            </View>
          </Button>

          {this.renderListPrinter()}
          {/* {this.renderNoData()} */}
          {this.state.listPrinter.length < 1 && !this.state.loadingPrinter ? (
            this.renderNoData()
          ) : (
            <View />
          )}
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
            margin: 15,
            //backgroundColor: WHITE,
            //borderColor: "#79BCE2",
            //borderWidth: 1,
            //borderRadius: 10,
            //padding: 20,
            elevation: 0,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <MaterialCommunityIcons
          name={"printer-off"}
          style={{ fontSize: 150, color: "#C4C4C4" }}
        />

        <Text style={[MainStyle.robotoNormal, { fontSize: 12, color: "#888" }]}>
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
            margin: 15,
            marginTop: 0,
            padding: 15,
            backgroundColor: WHITE,
            marginBottom: 0,
            borderBottomWidth: 1,
            borderColor: "#C8C7CC",
          },
        ]}
      >
        <View>
          <View style={{ width: "100%", marginBottom: 25 }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
            >
              {_perangkat_printer_terdeteksi[this.state.languageIndex]}
            </Text>
          </View>
        </View>
        {this.state.loadingPrinter ? (
          <ActivityIndicator size="large" color="#39f" animating={true} />
        ) : (
          <FlatList
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
    const { printer_main, printer_kitchen, printer_label } = this.state;

    let printer1 = "";
    let printer2 = "";
    let printer3 = "";

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

    if (printer_label) {
      if (printer_label.address === data.address) {
        printer3 = _label[this.state.languageIndex];
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
          {
            marginTop: 0,
            borderBottomWidth: 1,
            borderColor: "#C8C7CC",
          },
        ]}
      >
        <View style={{ width: "25%", paddingRight: 0 }}>
          <MaterialCommunityIcons name={"printer"} style={{ fontSize: 36 }} />
          {/* printer-off */}
        </View>
        <View style={{ width: "66%" }}>
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 14, color: BLACK }]}
          >
            {data.name}
          </Text>

          <View style={{ flexDirection: "row" }}>
            {printer1 !== "" ? (
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#CCC",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {printer1}
                </Text>
              </View>
            ) : (
              <View />
            )}

            {printer2 !== "" ? (
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#CCC",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {printer2}
                </Text>
              </View>
            ) : (
              <View />
            )}

            {printer3 !== "" ? (
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#CCC",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 14, color: BLACK },
                  ]}
                >
                  {printer3}
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
      </Button>
    );
  }

  multiLogin() {
    const data = {
      staff_id: this.state.staff_id,
      email: this.state.userInfo.email,
      password: this.state.password,
      device_id: this.state.userInfo.device_id,
    };
    LoginFunctions.MultiLoginAddUser_BE(data, (res) => {
      if (res) {
        alert(_login_success[this.state.languageIndex]);

        setTimeout(() => {
          LoginFunctions.GetListMultiUser((val) => {
            if (val) {
              this.setState({ listUser: val, password: "", staff_id: "" });
            }
          });
        }, 750);
      } else {
        alert(_login_failed[this.state.languageIndex]);
      }
    });
  }

  changeMultiUser(data) {
    LoginFunctions.LogoutSwitchUser(data, (val) => {
      if (val) {
        LoginFunctions.UpdateLoginInformation(data, (x) => {
          if (x) {
            setTimeout(() => {
              Actions.pop();
              Actions.pop();
              Actions.MobileLogin({
                userInfo: data,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex,
              });
            }, 500);
          }
        });
      }
    });

    // this.setState({ userInfo: null });
  }

  renderDataUser(data, i) {
    const { userInfo } = this.state;

    let bg_color = WHITE;

    let text_color = BLACK;

    if (data.id === userInfo.id) {
      bg_color = MAIN_THEME_COLOR_SELECT(this.state.colorIndex);
      text_color = WHITE;
    }

    return (
      <Button
        onPress={() => {
          //this.setState({ activeMenu: 0 });
          //this.actionSelectPrinter(data);
          if (data.id === userInfo.id) {
          } else {
            //ganti user
            this.changeMultiUser(data);
          }
        }}
        style={[
          ss.menuButton,
          {
            backgroundColor: bg_color,
            marginTop: 0,
            borderBottomWidth: 1,
            borderColor: "#C8C7CC",
            padding: 15,
          },
        ]}
      >
        <View style={{ width: "75%" }}>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 14, color: text_color },
            ]}
          >
            {_staff_id[this.state.languageIndex]} : {data.staff_id}
          </Text>
        </View>
        <View style={{ width: "25%", paddingRight: 0 }}>
          {/* <MaterialCommunityIcons name={"printer"} style={{ fontSize: 36 }} /> */}
          {/* printer-off */}
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

    let status =
      this.state.languageIndex === 1 ? "Printer Siap" : "Printer Ready";

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              ss.box,
              {
                flex: 1,
                width: this.state.tablet ? "66%" : "100%",
                alignSelf: "center",
              },
            ]}
          >
            <View
              style={[
                ss.box,
                {
                  margin: 15,
                  backgroundColor: WHITE,
                  //borderColor: "#79BCE2",
                  //borderWidth: 1,
                  //borderRadius: 10,
                  padding: 20,
                  marginBottom: 0,
                  flexDirection: "column",
                  //backgroundColor: '#BCA',
                  borderColor: "#C4C4C4",
                  borderBottomWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  //backgroundColor: "#999",
                  // width: 50,
                  // height: 50,
                  padding: 15,
                  position: "absolute",
                  alignSelf: "flex-end",
                }}
              >
                <View style={{}}>
                  <FontAwesome
                    name={"wrench"}
                    style={{
                      fontSize: 15,
                      color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),

                      //borderRadius: 5,
                      //backgroundColor: MAIN_THEME_COLOR,
                      //padding: 5,
                      //position: 'absolute'
                    }}
                  />
                </View>
              </View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {printerName}
              </Text>
              <View
                style={{
                  flex: 1,
                  //backgroundColor: "#BCA",
                  marginTop: 10,
                  flexDirection: "row",
                }}
              >
                <View style={{ width: 30 }}>
                  <FontAwesome
                    name={"bluetooth-b"}
                    style={{
                      fontSize: 20,
                      color: "#999",
                      //borderRadius: 5,
                      //backgroundColor: MAIN_THEME_COLOR,
                      //padding: 5,
                      position: "absolute",
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: "#999" },
                    ]}
                  >
                    {blueToothId}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#999" },
                  ]}
                >
                  Status:{" "}
                </Text>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: "#83B235" },
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
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormal,
                        {
                          fontSize: 12,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                        },
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
                  //borderColor: "#79BCE2",
                  //borderWidth: 1,
                  //borderRadius: 10,
                  marginTop: 0,

                  marginBottom: 0,
                  //flexDirection: 'row'
                },
              ]}
            >
              {/* Cetak Struk */}
              <View
                style={{
                  padding: 15,
                  paddingTop: 0,
                  paddingBottom: 0,
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  alignItems: "center",
                  //backgroundColor: "#BCA"
                  //paddingTop: 15,
                  //paddingBottom: 15
                }}
              >
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK },
                    ]}
                  >
                    Cetak Struk
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    //backgroundColor: "#BCA"
                    //paddingRight: 15,
                    //backgroundColor: "#888",
                    //alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      marginTop: 0,
                      //alignContent: "flex-end"
                      alignItems: "flex-end",
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
                          //backgroundColor: "#BCA"
                          // position: "absolute",
                          // top: 0,
                          // left: 0
                          //borderRadius: 99
                        }
                      }
                    >
                      <MaterialCommunityIcons
                        name={
                          printReceipt ? "toggle-switch" : "toggle-switch-off"
                        }
                        style={{
                          fontSize: 40,
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                        }}
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
                  padding: 15,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "70%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK },
                    ]}
                  >
                    Jumlah Cetak Struk
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    //paddingRight: 15,
                    //backgroundColor: "#888",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 1,
                    borderRadius: 15,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                  }}
                >
                  <View
                    style={{
                      marginTop: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
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
                        name={"minus"}
                        style={{
                          //alignSelf: 'center',
                          fontSize: 20,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                          //backgroundColor: WHITE
                        }}
                      />
                    </Button>
                    <View
                      style={{
                        width: 35,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingRight: 5,
                        paddingLeft: 5,
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            fontSize: 12,
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                          },
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
                        name={"plus"}
                        style={{
                          //alignSelf: 'center',
                          fontSize: 20,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                          //backgroundColor: WHITE
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
                  padding: 15,
                }}
              >
                <View style={{ width: "70%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK },
                    ]}
                  >
                    Jumlah Cetak Pesanan
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    //paddingRight: 15,
                    //backgroundColor: "#888",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 1,
                    borderRadius: 15,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                  }}
                >
                  <View
                    style={{
                      marginTop: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
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
                        name={"minus"}
                        style={{
                          //alignSelf: 'center',
                          fontSize: 20,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                          //backgroundColor: WHITE
                        }}
                      />
                    </Button>
                    <View
                      style={{
                        width: 35,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingRight: 5,
                        paddingLeft: 5,
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            fontSize: 12,
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                          },
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
                        name={"plus"}
                        style={{
                          //alignSelf: 'center',
                          fontSize: 20,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                          //backgroundColor: WHITE
                        }}
                      />
                    </Button>
                  </View>
                </View>
              </View>

              {/* Cetak Pesanan Berdasarkan Kategori */}
              <View
                style={{
                  padding: 15,
                  paddingTop: 0,
                  paddingBottom: 0,
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK },
                    ]}
                  >
                    Cetak Pesanan Berdasarkan Kategori
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    //paddingRight: 15,
                    //backgroundColor: "#888",
                    alignItems: "flex-end",
                  }}
                >
                  <View style={{ marginTop: 0 }}>
                    <Button
                      onPress={() => {
                        //this.changeCetakOrderId();
                        //this.changeSaldoRekapKas();
                        //this.changeAutoDetectPrinter();
                      }}
                      style={
                        {
                          //backgroundColor: '#CCC',
                          // position: "absolute",
                          // top: 0,
                          // left: 0,
                          // borderRadius: 99
                        }
                      }
                    >
                      <MaterialCommunityIcons
                        name={
                          printByCategory
                            ? "toggle-switch"
                            : "toggle-switch-off"
                        }
                        style={{
                          fontSize: 40,
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                        }}
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
                  margin: 0,
                  backgroundColor: WHITE,
                  //borderColor: "#79BCE2",
                  //borderWidth: 1,
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 15,
                  flexDirection: "row",
                },
              ]}
            >
              <View style={{ width: "40%" }}>
                <View
                  style={{
                    //borderColor: '#C4C4C4',
                    //borderBottomWidth: 1,
                    paddingBottom: 10,
                    paddingTop: 5,
                    marginRight: 15,
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK },
                    ]}
                  >
                    Kategori
                  </Text>
                </View>
                <FlatList
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
                          marginRight: 15,
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            { fontSize: 12, color: BLACK },
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
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK },
                    ]}
                  >
                    Printers
                  </Text>
                  <View style={{ alignItems: "flex-end", flex: 1 }}>
                    <FontAwesome
                      name={"gear"}
                      style={{
                        fontSize: 20,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                        borderRadius: 5,
                        backgroundColor: MAIN_THEME_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        padding: 5,
                        position: "absolute",
                      }}
                    />
                  </View>
                </View>
                <FlatList
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
                          marginRight: 15,
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            { fontSize: 12, color: BLACK },
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

  renderSearch() {
    return (
      <View
        style={{
          flexDirection: "column",
          //display: this.state.showSetting ? "none" : "flex",
          display: "none",
          width: this.state.tablet ? "66%" : "100%",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            margin: 15,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "#F7F7F7",
            //backgroundColor: "#BCA",
            borderRadius: 10,
            //alignItems: 'center',
          }}
        >
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              margin: 15,
            }}
          >
            <View style={{ width: "10%", justifyContent: "center" }}>
              <Ionicons
                name={"md-search"}
                style={{
                  alignSelf: "center",
                  fontSize: 25,
                  color: "#BEC2CE",
                  //color: BLACK
                }}
              />
            </View>
            <View style={{ width: "95%", justifyContent: "center" }}>
              <TextInput
                style={{
                  //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: "transparent",
                  color: BLACK,
                  padding: 0,
                  fontSize: 18,
                  fontFamily: "Roboto-Regular",
                }}
                type="text"
                ref={(q) => {
                  this.TextInputSearch = q;
                }}
                onSubmitEditing={() => {
                  //this.getData(this.state.searchKey);
                  // this.setState({viewSearch: false});
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={(v) => this.setState({ searchKey: v })}
                value={this.state.searchKey}
                placeholder={`${_cari[this.state.languageIndex]}`}
                placeholderTextColor={"#BEC2CE"}
                //placeholderTextColor={BLACK}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: "#DADADA",
            marginLeft: 15,
            marginRight: 15,
          }}
        />
      </View>
    );
  }

  syncOpenDays() {
    const {
      openDay1,
      openDay2,
      openDay3,
      openDay4,
      openDay5,
      openDay6,
      openDay7,
      tempDay1,
      tempDay2,
      tempDay3,
      tempDay4,
      tempDay5,
      tempDay6,
      tempDay7,
    } = this.state;

    this.setState({
      tempDay1: openDay1,
      tempDay2: openDay2,
      tempDay3: openDay3,
      tempDay4: openDay4,
      tempDay5: openDay5,
      tempDay6: openDay6,
      tempDay7: openDay7,
    });
  }

  changeOpenDays() {
    const {
      openDay1,
      openDay2,
      openDay3,
      openDay4,
      openDay5,
      openDay6,
      openDay7,
      tempDay1,
      tempDay2,
      tempDay3,
      tempDay4,
      tempDay5,
      tempDay6,
      tempDay7,
    } = this.state;

    let data = [];
    if (tempDay1) {
      data.push(0);
    }
    if (tempDay2) {
      data.push(1);
    }
    if (tempDay3) {
      data.push(2);
    }
    if (tempDay4) {
      data.push(3);
    }
    if (tempDay5) {
      data.push(4);
    }
    if (tempDay6) {
      data.push(5);
    }
    if (tempDay7) {
      data.push(6);
    }
    SettingsFunctions.SaveOpenDays(data, (x) => {});

    this.setState({
      openDaysList: data,
      openDay1: tempDay1,
      openDay2: tempDay2,
      openDay3: tempDay3,
      openDay4: tempDay4,
      openDay5: tempDay5,
      openDay6: tempDay6,
      openDay7: tempDay7,
    });

    setTimeout(() => {
      this.updateOpenHour();
    }, 500);
  }

  logoutAction() {
    //this.setState({ userInfo: null });
    LoginFunctions.Logout((val) => {
      if (val) {
        setTimeout(() => {
          Actions.pop();
          Actions.pop();

          //console.log("logout ===> ", true);
          this.setState({ loading: false, mount: false });

          Actions.MobileLogin({
            logout: true,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex,
          });
        }, 100);
      }
    });
  }

  changeStartHour = (event, date) => {
    this.setState({
      startHour: moment(date).format("YYYY-MM-DD HH:mm"),
      datePickerStart: false,
    });

    SettingsFunctions.SaveStartHour(
      moment(date).format("YYYY-MM-DD HH:mm"),
      (x) => {}
    );

    setTimeout(() => {
      this.updateOpenHour();
    }, 500);

    //this.getBEData();
  };

  changeEndHour = (event, date) => {
    this.setState({
      endHour: moment(date).format("YYYY-MM-DD HH:mm"),
      datePickerEnd: false,
    });

    SettingsFunctions.SaveEndHour(
      moment(date).format("YYYY-MM-DD HH:mm"),
      (x) => {}
    );
    setTimeout(() => {
      this.updateOpenHour();
    }, 500);

    //this.getBEData();
  };

  updateOpenHour() {
    const uri = BE_Outlet + "open-time/" + this.state.userInfo.gerai_id;

    const body = {
      open_hour: this.state.startHour,
      close_hour: this.state.endHour,
      open_days: this.state.openDaysList,
    };

    fetch(uri, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth,
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // let result = responseJson;
        // let resultData = result.data;

        console.log("responseJson updateOpenHour ==> ", responseJson);
        // this.setState({
        //   dataMenuFav: resultData.data,
        //   activeCategory: 0,
        //   loading: false
        // });
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch((_err) => {
        console.log("ERR ==> ", _err);
      });
  }

  render() {
    let height = Dimensions.get("window").height - 90;
    let {
      activeMenu,
      showLanguageSelection,
      showColorSelection,
      activeColorIndex,
      colorSelection,
      activeSelection,
    } = this.state;

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    const { changeColorAction, changeLanguageAction } = this.props;

    // _lain[this.state.languageIndex];
    // _aplikasi[this.state.languageIndex];
    // _printer[this.state.languageIndex];
    // _informasi[this.state.languageIndex];
    let title = activeMenu;

    if (activeMenu === 0) {
      title = _aplikasi[this.state.languageIndex];
    }

    if (activeMenu === 1) {
      title = _printer[this.state.languageIndex];
    }

    if (activeMenu === 2) {
      title = _lain[this.state.languageIndex];
    }

    if (activeMenu === 3) {
      title = _informasi_perangkat[this.state.languageIndex];
    }

    if (activeMenu === 4) {
      title = _ganti_password[this.state.languageIndex];
    }

    if (activeMenu === 5) {
      title = _ganti_pin[this.state.languageIndex];
    }

    if (activeMenu === 6) {
      title = _ganti_user[this.state.languageIndex];
    }

    if (activeMenu === 999) {
      title = _management_printer[this.state.languageIndex];
    }

    return (
      <View style={[ss.body]}>
        {/* <MobileHeader
          colorIndex={this.state.colorIndex}
          fromSetting={true}
          title={
            this.props.title !== _page_title[this.state.languageIndex]
              ? _page_title[this.state.languageIndex]
              : this.props.title
          }
          notif={false}
          hideLogin={true}
          loginInformation={this.state.userInfo}
          back={true}
          menu={false}
        /> */}
        <MobileHeaderTabletV2
          colorIndex={this.state.colorIndex}
          fromSetting={true}
          title={
            this.props.title !== _page_title[this.state.languageIndex]
              ? _page_title[this.state.languageIndex]
              : this.props.title
          }
          notif={false}
          hideLogin={true}
          loginInformation={this.state.userInfo}
          back={true}
          menu={false}
          activeMenuIndex={5}
        />
        <StatusBar
          barStyle={"dark-content"}
          hidden={false}
          backgroundColor={WHITE}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {showColorSelection ? (
          <SelectColor
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            activeColorIndex={activeColorIndex}
            colorSelection={colorSelection}
            actions={() => {
              this.setState({
                showColorSelection: false,
                colorIndex: this.state.activeColorIndex,
              });
              ColorFunctions.Change(this.state.activeColorIndex, (response) => {
                // console.log("CHANGE COLOR Setting ==> ", response);
                // console.log(
                //   "CHANGE COLOR Setting activeColorIndex ==> ",
                //   activeColorIndex
                // );

                // console.log(
                //   "CHANGE COLOR Setting Color Action ==> ",
                //   changeColorAction
                // );

                if (response) {
                  changeColorAction(this.state.activeColorIndex);
                } else {
                  changeColorAction(this.state.activeColorIndex);
                }
              });
              changeColorAction(this.state.activeColorIndex);
            }}
            changeColorAction={(value) => {
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

        {this.state.datePickerStart === true ? (
          <DateTimePicker
            value={new Date(moment(this.state.startHour))}
            //mode="date"
            mode="time"
            is24Hour={true}
            display="default"
            onChange={this.changeStartHour}
            //minimumDate={new Date()}
          />
        ) : (
          <View />
        )}

        {this.state.datePickerEnd === true ? (
          <DateTimePicker
            value={new Date(moment(this.state.endHour))}
            //mode="date"
            mode="time"
            is24Hour={true}
            display="default"
            onChange={this.changeEndHour}
            //minimumDate={new Date()}
          />
        ) : (
          <View />
        )}

        {showLanguageSelection ? (
          <MobileSelectLanguage
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.colorIndex}
            activeSelection={this.state.activeSelection}
            changeAction={(val) => {
              this.setState({ activeSelection: val });
            }}
            submitAction={() => {
              this.setState({
                languageIndex: this.state.activeSelection,
                showLanguageSelection: false,
              });

              setTimeout(() => {
                console.log(
                  "change language setting ===> ",
                  this.state.activeSelection
                );

                PrinterFunctions.SaveLanguage(
                  this.state.activeSelection,
                  (val) => {
                    //alert("Sukses Set Footer Printer");
                  }
                );

                changeLanguageAction(this.state.activeSelection);
              }, 500);
            }}
            actions={() => {
              this.setState({ showLanguageSelection: false });
            }}
          />
        ) : (
          <View />
        )}

        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 7.5 }}>
            <MobileHeaderTabletSamping
              activeMenuIndex={5}
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              loginInformation={this.state.userInfo}
              backAction={() => {
                if (this.state.formItem) {
                  this.setState({ formItem: false });
                } else {
                  if (
                    this.state.dataBill.length > 0 &&
                    this.state.order_id === null
                  ) {
                    this.setState({ showClearCartBackHandler: true });
                  } else {
                    this.newOrder(true, true);
                    this.setState({ mount: false });
                    Actions.pop();
                  }
                }
              }}
              hideLogin={false}
              salesType={this.state.selectedSalesType}
              popAction={() => Actions.pop()}
            />
          </View>
          <View style={{ flex: 92.5 }}>
            <ScrollView
              style={
                {
                  //flex: 1
                }
              }
            >
              <View style={[ss.mainContent, { flexDirection: "column" }]}>
                {this.renderSearch()}
                <ScrollView
                  style={
                    {
                      //flex: 1
                    }
                  }
                >
                  {this.renderMenu()}
                </ScrollView>

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.showSetting}
                  onRequestClose={() => {
                    this.setState({ showSetting: false });
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ height: "90%", width: "90%" }}>
                      <View>
                        <MobileHeader
                          bgColor={WHITE}
                          textColor={BLACK}
                          colorIndex={this.state.colorIndex}
                          fromSetting={true}
                          // title={
                          //   this.props.title !== _page_title[this.state.languageIndex]
                          //     ? _page_title[this.state.languageIndex]
                          //     : this.props.title
                          // }
                          title={title}
                          notif={false}
                          loginInformation={this.state.userInfo}
                          menu={false}
                          back={true}
                          hideLogin={true}
                          backAction={() => {
                            this.setState({ showSetting: false });
                          }}
                        />
                        {this.renderSearch()}
                      </View>
                      <View style={[ss.rightSide]}>
                        {activeMenu === 0 ? (
                          <ScrollView
                            style={
                              {
                                //flex: 1
                              }
                            }
                          >
                            {this.renderAplikasi()}
                          </ScrollView>
                        ) : (
                          <View />
                        )}

                        {activeMenu === 1 ? (
                          <View
                            style={{
                              flex: 1,
                              //backgroundColor: "#BCA"
                            }}
                          >
                            <ScrollView>{this.renderPrinterMain()}</ScrollView>
                          </View>
                        ) : (
                          <View />
                        )}

                        {activeMenu === 2 ? (
                          <ScrollView
                            style={
                              {
                                //flex: 1
                              }
                            }
                          >
                            {this.renderStrukMain()}
                          </ScrollView>
                        ) : (
                          <View />
                        )}

                        {activeMenu === 999 ? (
                          <ScrollView
                            style={
                              {
                                //flex: 1
                              }
                            }
                          >
                            {this.renderDetailPrinter()}
                          </ScrollView>
                        ) : (
                          <View />
                        )}
                        {activeMenu === 3 ? this.renderInformasi() : <View />}

                        {activeMenu === 4 ? (
                          this.renderGantiPassword()
                        ) : (
                          <View />
                        )}

                        {activeMenu === 5 ? this.renderGantiPin() : <View />}

                        {activeMenu === 6 ? this.renderGantiUser() : <View />}
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: "column",
    elevation: 1,
  },
  mainContent: {
    flexDirection: "row",
    flex: 1,
    //height: '100%' ,
    //backgroundColor: "#995599"
  },
  leftSide: {
    width: "100%",
    margin: 10,
    marginTop: 0,
    backgroundColor: "#EEEEEE",
    elevation: 3,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1,
  },
  rightSide: {
    width: "100%",
    flex: 1,
    backgroundColor: WHITE,
  },
  box: {
    elevation: 0,
    borderRadius: 5,
  },
  pinButton: {
    backgroundColor: MAIN_THEME_COLOR,
    elevation: 1,
    borderRadius: 10,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    elevation: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  menuButton: {
    paddingBottom: 15,
    paddingTop: 15,
    //marginTop: 5,
    flexDirection: "row",
  },
  modalCover: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "50%",
    minHeight: 200,
    //maxHeight: height * 0.6,
    backgroundColor: WHITE,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
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
    alignItems: "center",
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
    flexDirection: "row",
  },
});
