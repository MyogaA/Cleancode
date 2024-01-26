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
// import GestureRecognizer from "react-native-swipe-gestures";
import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/MobileDropdown";
import MobileAddCashInOut from "../../Components/MobileAddCashInOut";
import MobileRekapKas from "../../Components/MobileRekapKas";
import AlertCetakStruk from "../../Components/MobileAlertCetakStruk";
import Loading from "../../Components/MobileLoading";
import CustomAlert from "../../Components/CustomAlert";
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
import "moment/locale/id";

import "moment/locale/en-gb";
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
  _berhasil_delete,
  _berhasil_tambah,
  _berhasil_update,
  _error_semua_field,
  _gagal,
  _pilih_user,
  _status_kas,
  _this_week,
  _this_month,
  _this_year,
  _cetak_struk_1,
  _lihat_detail,
  _cash_in_out,
  _card,
  _no_data_3,
  _cetak_struk_2,
  _with_mdr
} from "../../Libraries/DictionaryRekap";
import DeviceInfo from "react-native-device-info";
import {
  GetRekapAPI,
  GetRekapDetailAPI,
  SaveRekapDetailAPI,
  DeleteRekapDetailAPI,
  ClosingRekapAPI,
  UserByGeraiAPI,
  CalculateRekapAPI,
  BE_Rekap,
  BE_Cash,
  BE_Transaction,
  BE_Staff,
  BE_CheckPin,
  BE_Payment_Method
} from "../../Constants";
import { _waktu } from "../../Libraries/DictionaryDrawer";
import RegionFunctions from "../../Libraries/RegionFunctions";
import {
  _batalkan_transaksi,
  _detail,
  _detail_order,
  _masukan_kode,
  _salah_pin,
  _sub_total,
  _total
} from "../../Libraries/DictionaryHistory";
import NetInfo from "@react-native-community/netinfo";

import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";
import {
  _edit,
  _ok_alert,
  _perangkat_printer_tidak_terdeteksi,
  _print_failed
} from "../../Libraries/DictionarySetting";

import SunmiFunctions from "../../Libraries/SunmiFunctions";
import { Decimalize } from "../../Libraries/NumberFunctions";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 33;
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default class MobileRekap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoCalculateRekap: false,
      tablet: DeviceInfo.isTablet(),
      printType: 1,
      action: 1,
      showDetail: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      loading: true,
      selectedUser: this.props.userInfo ? this.props.userInfo.id : 0,
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
      rekapCard: 0,
      rekapTotal: 0,
      systemTunai: 0,
      systemGoPay: 0,
      systemCard: 0,
      systemTotal: 0,
      systemCashIn: 0,
      systemCashOut: 0,
      formRekap: false,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      startDate: moment(new Date())
        .add(-7, "days")
        .format("YYYY-MM-DD 00:00"),
      endDate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      cetakStruk: false,
      showPrintStruk: false,
      calculateMdr: false,
      errorCashInOut: "",
      printer_main: null,
      printer_kitchen: null,

      dataRekap: [],
      dataDetail: [],
      dataDetailIn: [],
      dataDetailOut: [],

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
      ready: "",
      date_now: moment(new Date()).format("dddd, DD MMM YYYY"),
      time_now: moment(new Date()).format("HH:mm"),
      currency: "IDR",
      auth: this.props.auth ? this.props.auth : "",
      currencyAllowDecimal: false,
      recap_items: [],
      showPin: false,
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
      payment_method_card: null,
      payment_method_cash: null,
      payment_method_wallet: null,
      recap_items_wallet: null,
      recap_items_card: null,
      cz_user: null,
      page: 1,
      maxPage: 1
    };
  }

  componentDidMount() {
    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    RegionFunctions.GetCurrency(val => {
      if (val) {
        this.setState({ currency: val });
      }
    });

    PrinterFunctions.GetBusinessData(val => {
      //console.log("GET GetBusinessData VAL ===> ", val);
      if (val) {
        console.log("GET cz_user ===> ", val.cz_user);
        if (val.cz_user) {
          this.setState({
            cz_user: val.cz_user
          });
        }
      }
    });

    RegionFunctions.GetAllowDecimal(val => {
      //console.log("GetAllowDecimal ===> ", val)
      if (val) {
        this.setState({ currencyAllowDecimal: val });
      }
    });

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    PrinterFunctions.GetAutoCalculateRekap(val => {
      if (val !== null) {
        this.setState({ autoCalculateRekap: val });
      }
    });

    if (this.state.languageIndex === 0) {
      moment.locale("id");
    } else {
      moment.locale("en");
    }

    //console.log(this.state.userInfo)

    // this.interval = setInterval(() => {
    //   this.updateTimeNow();
    // }, 1000);

    this.getRekapListFirstTime();
    this.getPaymentMethod();

    this.getPrinterData();
    this.getUserList();
  }

  handleLoadMore() {
    console.log("handle load page ", this.state.page);
    console.log("handle load maxpage ", this.state.maxPage);
    if (this.state.page < this.state.maxPage && !this.state.loading) {
      this.setState({ loading: true });
      const startDate = moment(this.state.startDate).format("YYYY-MM-DD 00:00");
      this.getRekapList(startDate, false, this.state.page + 1);
    }
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

            // console.log("BE_Payment_Method ==> ", responseJson);
            let result = responseJson;
            let resultData = result.data;

            OfflineMenuFunctions.SavePaymentMethod(resultData, x => {});

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
                  if (v.status === "active") {
                    wallet.push(v);
                  }
                }

                if (
                  v_payment_method.id === 3 ||
                  v_payment_method.name === "Cash"
                ) {
                  if (v.status === "active") {
                    cash = v;
                  }
                }

                if (
                  v_payment_method.id === 2 ||
                  v_payment_method.name === "Debit/Credit"
                ) {
                  if (v.status === "active") {
                    card.push(v);
                  }
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
        //   OfflineMenuFunctions.GetPaymentType(val => {
        //     console.log("GetPayment Offline ==> ", val);
        //     //this.setState({ lastUpdate: val });
        //     if (val) {
        //       let resultData = val;
        //       let cash = {};
        //       let wallet = [];
        //       let card = [];
        //       resultData.map((v, i) => {
        //         const v_payment_method = v.Payment_Method_Type;
        //         if (
        //           v_payment_method.id === 1 ||
        //           v_payment_method.name === "E-Wallet"
        //         ) {
        //           wallet.push(v);
        //         }
        //         if (
        //           v_payment_method.id === 3 ||
        //           v_payment_method.name === "Cash"
        //         ) {
        //           cash = v;
        //         }
        //         if (
        //           v_payment_method.id === 2 ||
        //           v_payment_method.name === "Debit/Credit"
        //         ) {
        //           card.push(v);
        //         }
        //         // console.log("cash ==> ", cash);
        //         // console.log("wallet ==> ", wallet);
        //         // console.log("card ==> ", card);
        //         this.setState({
        //           payment_method_cash: cash,
        //           payment_method_wallet: wallet,
        //           payment_method_card: card
        //           //loading: false
        //         });
        //       });
        //     }
        //     // this.setState({
        //     //   dataOfflineAddons: val
        //     // });
        //   });
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
      this.getRekapListFirstTime();
      //this.changeDateWeek();
      this.getPrinterData();
      this.getUserList();
    }
  }

  renderPinModal() {
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

  checkPin(cb) {
    const uri = BE_CheckPin;
    const { userInfo, pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    console.log("SELECTED USER ==> ", userInfo.id);
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        user_id: userInfo.id,
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
        //this.prosesRefund();
        //this.checkPin();

        this.checkPin(val => {
          let statusCode = val.statusCode; //200 == true  401 == false
          let message = [];

          // console.log("check pin status code ===> ", val)
          // console.log("check pin status code ===> ", this.state.auth)

          if (statusCode === 200) {
            //test
            this.setState({
              loading: false,
              showPin: false,
              // showAlert: true,
              // alertMessage: message,
              pin1: "",
              pin2: "",
              pin3: "",
              pin4: "",
              pin5: "",
              pin6: ""
            });
            this.submitRekap();
          } else {
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
            {_rekap[this.state.languageIndex]}
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

  updateTimeNow() {
    let date_now = moment(new Date()).format("dddd, DD MMM YYYY");
    let time_now = moment(new Date()).format("HH:mm");
    this.setState({
      date_now: date_now,
      time_now: time_now
    });

    //dddd
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

  calculateRekap() {
    const { selectedData, userInfo } = this.state;

    //this.setState({ loading: true });

    const rekap_id = selectedData.id;
    const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const cashier_id = userInfo.id;

    let uri = `${BE_Rekap}/Calculate`;

    console.log("uri ==> ", uri);

    console.log("rekap_id ==> ", selectedData);
    console.log("cashier_id ==> ", cashier_id);

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        recap_id: rekap_id,
        user_id: cashier_id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson.data;
        console.log("CALCULATE RESPONSE ==> ", responseJson);

        let systemTunai = result.cash_system_total;

        if (this.state.currencyAllowDecimal) {
          let num = systemTunai;
          let int_num = parseInt(num);
          let comma_num = num - int_num;
          comma_num = Math.round(comma_num * 100);
          //console.log("comma_num ===> ", comma_num);

          if (comma_num === 0) {
          } else {
            systemTunai = parseFloat(int_num) + parseFloat(comma_num / 100);
          }
        }

        let systemGoPay = result.ewallet_system_total;

        if (this.state.currencyAllowDecimal) {
          let num = systemGoPay;
          let int_num = parseInt(num);
          let comma_num = num - int_num;
          comma_num = Math.round(comma_num * 100);
          //console.log("comma_num ===> ", comma_num);

          if (comma_num === 0) {
          } else {
            systemGoPay = parseFloat(int_num) + parseFloat(comma_num / 100);
          }
        }

        let systemTotal = result.system_total;

        if (this.state.currencyAllowDecimal) {
          let num = systemTotal;
          let int_num = parseInt(num);
          let comma_num = num - int_num;
          comma_num = Math.round(comma_num * 100);
          //console.log("comma_num ===> ", comma_num);

          if (comma_num === 0) {
          } else {
            systemTotal = parseFloat(int_num) + parseFloat(comma_num / 100);
          }
        }

        let systemCard = result.card_system_total;

        if (this.state.currencyAllowDecimal) {
          let num = systemCard;
          let int_num = parseInt(num);
          let comma_num = num - int_num;
          comma_num = Math.round(comma_num * 100);
          //console.log("comma_num ===> ", comma_num);

          if (comma_num === 0) {
          } else {
            systemCard = parseFloat(int_num) + parseFloat(comma_num / 100);
          }
        }

        let systemCashIn = result.cash_in_out_system_total;

        if (this.state.currencyAllowDecimal) {
          let num = systemCashIn;
          let int_num = parseInt(num);
          let comma_num = num - int_num;
          comma_num = Math.round(comma_num * 100);
          //console.log("comma_num ===> ", comma_num);

          if (comma_num === 0) {
          } else {
            systemCashIn = parseFloat(int_num) + parseFloat(comma_num / 100);
          }
        }

        //console.log("systemTunai", systemTunai, systemGoPay, systemTotal, systemCard, systemCashIn)

        if (responseJson.statusCode === 200) {
          this.setState({
            //loading: false,
            systemTunai: systemTunai,
            systemGoPay: systemGoPay,
            systemTotal: systemTotal,
            systemCard: systemCard,
            systemCashIn: systemCashIn,
            systemCashOut: systemCashIn
          });

          if (this.state.autoCalculateRekap)
          {
            this.setState({
              rekapGoPay: systemGoPay,
              rekapTunai: systemTunai + systemCashIn,
              rekapCard: systemCard
            });
          }
        }

        //this.getRekapDetail(result.data);
        //alert(result.message);
        //this.resetPage();
      })
      .catch(_err => {
        console.log("ERR submitRekap ==> ", _err);
      });
  }
  // getUserList() {
  //   this.setState({ loading: true });
  //   const { userInfo } = this.state;

  //   const gerai_id = userInfo.gerai_id;
  //   const uri = `${UserByGeraiAPI}?gerai_id=${gerai_id}`;
  //   fetch(uri, {
  //     method: "GET"
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       let result = responseJson.result;
  //       let resultData = result.data;

  //       this.setState({ listUser: resultData, loading: false });
  //       //console.log('new data ==>', JSON.stringify(data))
  //     })
  //     .catch(_err => {
  //       console.log("ERR getUserList ==> ", _err);
  //     });
  // }

  getUserList() {
    let outlet_id = this.state.userInfo.gerai_id;
    const uri = `${BE_Staff}?outlet_id=${outlet_id}`;
    console.log("uri get user list===> ", uri);
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
        // console.log("responseJson get user list ===> ", responseJson);

        let result = responseJson;

        if (result.statusCode === 200) {
          let resultData = result.data;
          let firstUserId = null;
          if (resultData.length > 0) {
            firstUserId = resultData[0].id;
          }

          this.setState({
            listUser: resultData,
            selectedUser: resultData[0].id
          });
        }
        //console.log("new data ==>", resultData);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
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
        console.log("Main Printer ==> ", val);
        this.setState({ printer_main: val });

        this.connectPrinter(val);
      } else {
        //alert(_alert_printer[this.state.languageIndex]);
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
          //alert(e);
        }
      );

    BluetoothEscposPrinter.openDrawer(0, 250, 250);
  }

  connectPrinter(printer = this.state.printer_main) {
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
          //alert(e);
        }
      );
  }

  async printActionEng(printer = this.state.printer_main) {
    const {
      dataStruk,
      userInfo,
      selectedData,
      printType,
      recap_items_wallet,
      recap_items_card,
      calculateMdr,
      languageIndex
    } = this.state;

    let total_mdr = 0;
    //console.log("user Info ==> ", userInfo);
    let namaKasir = selectedData.User
      ? selectedData.User.User_Profile.name
      : "";
    // let sales = selectedData.cash_total;

    let sales =
      selectedData.system_total - selectedData.cash_in_out_system_total;
    let jum_void = selectedData.void_total ? selectedData.void_total : 0;
    let credit = selectedData.card_system_total
      ? selectedData.card_system_total
      : 0;
    let restaurant_name = userInfo.restaurant_name;
    let restaurant_address = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";
    let difference = selectedData.difference;
    let total_system = selectedData.cash_system_total;
    let total_actual = selectedData.actual_total;
    let cash_in = selectedData.cash_in_out_system_total;
    let cash_out = selectedData.cash_in_out_system_total;
    //let nama = userInfo.name;
    let time = selectedData.time_close;

    time = moment(time).format("DD/MM/YYYY HH:mm:ss");

    let wallet = selectedData.ewallet_system_total;
    let cash = selectedData.cash_system_total;

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

    await BluetoothEscposPrinter.printText(`${restaurant_address}\n\r`, {
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

    if (calculateMdr) {
      await BluetoothEscposPrinter.printText(
        `${_with_mdr[this.state.languageIndex]}\n\r`,
        {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        }
      );
    }

    // await BluetoothEscposPrinter.printText(`${time}\n\r`, {
    //   encoding: "GBK",
    //   codepage: 0,
    //   widthtimes: 0,
    //   heigthtimes: 0,
    //   fonttype: 1
    // });

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
    let z = 0;

    //let total_value = sales;
    let total_value = this.idrNumToStr(sales, false);
    let total_length = total_value.toString().length;
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

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }

    // sales
    await BluetoothEscposPrinter.printText(
      `Sales${total_space}${total_value}\n\r`,
      {}
    );

    // await BluetoothEscposPrinter.printColumn(
    //   [15, 2, 16],
    //   [
    //     BluetoothEscposPrinter.ALIGN.LEFT,
    //     BluetoothEscposPrinter.ALIGN.LEFT,
    //     BluetoothEscposPrinter.ALIGN.RIGHT
    //   ],
    //   [``, " ", `${total_value}`],
    //   {}
    // );

    total_value = jum_void;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 28) {
      total_space_num = 28 - total_length;
    }

    if (printType === 2) {
      if (total_length < 28 + 16) {
        total_space_num = 28 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Void${total_space}${total_value}\n\r`,
      {}
    );

    total_value = credit;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 20) {
      total_space_num = 20 - total_length;
    }

    if (printType === 2) {
      if (total_length < 20 + 16) {
        total_space_num = 20 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    // await BluetoothEscposPrinter.printText(
    //   `Debit/Credit${total_space}${total_value}\n\r`,
    //   {}
    // );

    total_value = cash_in;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 19) {
      total_space_num = 19 - total_length;
    }

    if (printType === 2) {
      if (total_length < 19 + 16) {
        total_space_num = 19 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Cash In & Out${total_space}${total_value}\n\r`,
      {}
    );

    // total_value = cash_out;
    // total_length = total_value.toString().length;
    // total_space = "";
    // total_space_num = 0;
    // if (total_length < 22) {
    //   total_space_num = 22 - total_length;
    // }

    // for (z = 0; z < total_space_num; z++) {
    //   total_space = total_space + " ";
    // }
    // await BluetoothEscposPrinter.printText(
    //   `Kas Keluar${total_space}${total_value}\n\r`,
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

    total_value = total_system;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 19) {
      total_space_num = 19 - total_length;
    }

    if (printType === 2) {
      if (total_length < 19 + 16) {
        total_space_num = 19 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    // await BluetoothEscposPrinter.printText(
    //   `Jumlah Sistem${total_space}${total_value}\n\r`,
    //   {}
    // );

    total_value = cash;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 28) {
      total_space_num = 28 - total_length;
    }

    if (printType === 2) {
      if (total_length < 28 + 16) {
        total_space_num = 28 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Cash${total_space}${total_value}\n\r`,
      {}
    );

    total_value = wallet;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 24) {
      total_space_num = 24 - total_length;
    }

    if (printType === 2) {
      if (total_length < 24 + 16) {
        total_space_num = 24 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    // await BluetoothEscposPrinter.printText(
    //   `E-Wallet${total_space}${total_value}\n\r`,
    //   {}
    // );

    if (recap_items_card && recap_items_card.length > 0) {
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

      recap_items_card.map((v, i) => {
        let name = v.name;
        let length = 32 - name.length;
        total_value = v.total;

        if (calculateMdr) {
          total_value = v.total - v.mdr_total;
          total_mdr = total_mdr + v.mdr_total;
        }

        total_value = this.idrNumToStr(total_value, false);
        total_length = total_value.toString().length;
        total_space = "";
        total_space_num = 0;
        if (total_length < length) {
          total_space_num = length - total_length;
        }

        if (printType === 2) {
          if (total_length < length + 16) {
            total_space_num = length + 16 - total_length;
          }
        }

        for (z = 0; z < total_space_num; z++) {
          total_space = total_space + " ";
        }
        BluetoothEscposPrinter.printText(
          `${name}${total_space}${total_value}\n\r`,
          {}
        );
      });
    }

    if (recap_items_wallet && recap_items_wallet.length > 0) {
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

      recap_items_wallet.map((v, i) => {
        let name = v.name;
        let length = 32 - name.length;
        total_value = v.total;

        if (calculateMdr) {
          total_value = v.total - v.mdr_total;
          total_mdr = total_mdr + v.mdr_total;
        }

        total_value = this.idrNumToStr(total_value, false);
        total_length = total_value.toString().length;
        total_space = "";
        total_space_num = 0;
        if (total_length < length) {
          total_space_num = length - total_length;
        }

        if (printType === 2) {
          if (total_length < length + 16) {
            total_space_num = length + 16 - total_length;
          }
        }

        for (z = 0; z < total_space_num; z++) {
          total_space = total_space + " ";
        }
        BluetoothEscposPrinter.printText(
          `${name}${total_space}${total_value}\n\r`,
          {}
        );
      });
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

    total_value = total_actual - total_mdr;
    if (total_value < 0)
    {
      total_value = 0;
    }
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 20) {
      total_space_num = 20 - total_length;
    }

    if (printType === 2) {
      if (total_length < 20 + 16) {
        total_space_num = 20 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Actual Value${total_space}${total_value}\n\r`,
      {}
    );

    total_value = difference;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 22) {
      total_space_num = 22 - total_length;
    }

    if (printType === 2) {
      if (total_length < 22 + 16) {
        total_space_num = 22 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Difference${total_space}${total_value}\n\r`,
      {}
    );

    // await BluetoothEscposPrinter.printText(
    //   "99 x 123456789012345678 12345678\n\r",
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

    if (this.state.recap_items.length > 0) {
      await BluetoothEscposPrinter.printText("DETAIL\n\r", {});

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

      this.state.recap_items.map((data, index) => {
        let product_name = data.name;

        console.log("PRINT DATA ===> ", data);

        console.log("PRINT DATA.name ===> ", product_name);

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
          product_name_array = this.divideLongWord(product_name, 18 + 16);
        }

        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        console.log("product_name_array ", product_name_array);
        let notes = data.notes ? data.notes : "";
        console.log("notes ", notes);

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
    }

    // await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
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

    //BluetoothEscposPrinter.openDrawer(0, 250, 250);
  }

  async printActionNew(printer = this.state.printer_main) {
    try {
      const {
        dataStruk,
        userInfo,
        selectedData,
        printType,
        recap_items_wallet,
        recap_items_card,
        calculateMdr,
        languageIndex
      } = this.state;

      let total_addition_name = 0;
      let total_addition_price = 0;

      if (printType === 2) {
        total_addition_name = 10;
        total_addition_price = 6;
      }

      let total_mdr = 0;
      //console.log("user Info ==> ", userInfo);
      let namaKasir = selectedData.User
        ? selectedData.User.User_Profile.name
        : "";
      // let sales = selectedData.cash_total;

      let sales =
        selectedData.system_total - selectedData.cash_in_out_system_total;
      let jum_void = selectedData.void_total ? selectedData.void_total : 0;
      let credit = selectedData.card_system_total
        ? selectedData.card_system_total
        : 0;
      let restaurant_name = userInfo.restaurant_name;
      let restaurant_address = userInfo.restaurant_address
        ? userInfo.restaurant_address
        : "";
      let difference = selectedData.difference;
      let total_system = selectedData.cash_system_total;
      let total_actual = selectedData.actual_total;
      let cash_in = selectedData.cash_in_out_system_total;
      let cash_out = selectedData.cash_in_out_system_total;
      //let nama = userInfo.name;
      let time = selectedData.time_close;

      time = moment(time).format("DD/MM/YYYY HH:mm:ss");

      let wallet = selectedData.ewallet_system_total;
      let cash = selectedData.cash_system_total;

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

      await BluetoothEscposPrinter.printText(`${restaurant_address}\n\r`, {
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

      if (calculateMdr) {
        await BluetoothEscposPrinter.printText(
          `${_with_mdr[this.state.languageIndex]}\n\r`,
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
      let z = 0;

      //let total_value = sales;
      let total_value = this.idrNumToStr(sales, false);
      let total_length = total_value.toString().length;
      let total_space = "";
      let total_space_num = 0;

      //32

      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_penjualan[this.state.languageIndex]}`, " ", `${total_value}`],
        {}
      );

      total_value = jum_void;
      total_value = this.idrNumToStr(total_value, false);
      total_length = total_value.toString().length;
      total_space = "";
      total_space_num = 0;

      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_void[this.state.languageIndex]}`, " ", `${total_value}`],
        {}
      );

      total_value = credit;
      total_value = this.idrNumToStr(total_value, false);
      total_length = total_value.toString().length;
      total_space = "";
      total_space_num = 0;
      if (total_length < 20) {
        total_space_num = 20 - total_length;
      }

      if (printType === 2) {
        if (total_length < 20 + 16) {
          total_space_num = 20 + 16 - total_length;
        }
      }

      for (z = 0; z < total_space_num; z++) {
        total_space = total_space + " ";
      }
      // await BluetoothEscposPrinter.printText(
      //   `Debit/Credit${total_space}${total_value}\n\r`,
      //   {}
      // );

      total_value = cash_in;
      total_value = this.idrNumToStr(total_value, false);
      total_length = total_value.toString().length;
      total_space = "";
      total_space_num = 0;

      await BluetoothEscposPrinter.printColumn(
        [18 + total_addition_name, 1, 13 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_cash_in_out[this.state.languageIndex]}`, " ", `${total_value}`],
        {}
      );

      // total_value = cash_out;
      // total_length = total_value.toString().length;
      // total_space = "";
      // total_space_num = 0;
      // if (total_length < 22) {
      //   total_space_num = 22 - total_length;
      // }

      // for (z = 0; z < total_space_num; z++) {
      //   total_space = total_space + " ";
      // }
      // await BluetoothEscposPrinter.printText(
      //   `Kas Keluar${total_space}${total_value}\n\r`,
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

      total_value = total_system;
      total_value = this.idrNumToStr(total_value, false);
      total_length = total_value.toString().length;
      total_space = "";
      total_space_num = 0;
      if (total_length < 19) {
        total_space_num = 19 - total_length;
      }

      if (printType === 2) {
        if (total_length < 19 + 16) {
          total_space_num = 19 + 16 - total_length;
        }
      }

      for (z = 0; z < total_space_num; z++) {
        total_space = total_space + " ";
      }
      // await BluetoothEscposPrinter.printText(
      //   `Jumlah Sistem${total_space}${total_value}\n\r`,
      //   {}
      // );

      total_value = cash;
      total_value = this.idrNumToStr(total_value, false);
      total_length = total_value.toString().length;
      total_space = "";
      total_space_num = 0;

      await BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_tunai[this.state.languageIndex]}`, " ", `${total_value}`],
        {}
      );

      total_value = wallet;
      total_value = this.idrNumToStr(total_value, false);
      total_length = total_value.toString().length;
      total_space = "";
      total_space_num = 0;
      if (total_length < 24) {
        total_space_num = 24 - total_length;
      }

      if (printType === 2) {
        if (total_length < 24 + 16) {
          total_space_num = 24 + 16 - total_length;
        }
      }

      for (z = 0; z < total_space_num; z++) {
        total_space = total_space + " ";
      }
      // await BluetoothEscposPrinter.printText(
      //   `E-Wallet${total_space}${total_value}\n\r`,
      //   {}
      // );

      if (recap_items_card && recap_items_card.length > 0) {
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

        recap_items_card.map((v, i) => {
          let name = v.name;
          let length = 32 - name.length;
          total_value = v.total;

          if (calculateMdr) {
            total_value = v.total - v.mdr_total;
            total_mdr = total_mdr + v.mdr_total;
          }

          total_value = this.idrNumToStr(total_value, false);
          total_length = total_value.toString().length;
          total_space = "";
          total_space_num = 0;
          if (total_length < length) {
            total_space_num = length - total_length;
          }

          if (printType === 2) {
            if (total_length < length + 16) {
              total_space_num = length + 16 - total_length;
            }
          }

          for (z = 0; z < total_space_num; z++) {
            total_space = total_space + " ";
          }
          // BluetoothEscposPrinter.printText(
          //   `${name}${total_space}${total_value}\n\r`,
          //   {}
          // );
          if (v.total > 0) {
            BluetoothEscposPrinter.printColumn(
              [18 + total_addition_name, 1, 13 + total_addition_price],
              [
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.RIGHT
              ],
              [`${name}`, " ", `${total_value}`],
              {}
            );
          }
        });
      }

      if (recap_items_wallet && recap_items_wallet.length > 0) {
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

        recap_items_wallet.map((v, i) => {
          let name = v.name;
          let length = 32 - name.length;
          total_value = v.total;

          if (calculateMdr) {
            total_value = v.total - v.mdr_total;
            total_mdr = total_mdr + v.mdr_total;
          }

          total_value = this.idrNumToStr(total_value, false);
          total_length = total_value.toString().length;
          total_space = "";
          total_space_num = 0;
          if (total_length < length) {
            total_space_num = length - total_length;
          }

          if (printType === 2) {
            if (total_length < length + 16) {
              total_space_num = length + 16 - total_length;
            }
          }

          for (z = 0; z < total_space_num; z++) {
            total_space = total_space + " ";
          }
          // BluetoothEscposPrinter.printText(
          //   `${name}${total_space}${total_value}\n\r`,
          //   {}
          // );

          if (v.total > 0) {
            BluetoothEscposPrinter.printColumn(
              [18 + total_addition_name, 1, 13 + total_addition_price],
              [
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.LEFT,
                BluetoothEscposPrinter.ALIGN.RIGHT
              ],
              [`${name}`, "", `${total_value}`],
              {}
            );
          }
        });
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

      total_value = total_actual - total_mdr;
      if (total_value < 0)
      {
        total_value = 0;
      }

      total_value = this.idrNumToStr(total_value, false);
      total_length = total_value.toString().length;
      total_space = "";
      total_space_num = 0;
      if (total_length < 20) {
        total_space_num = 20 - total_length;
      }

      if (printType === 2) {
        if (total_length < 20 + 16) {
          total_space_num = 20 + 16 - total_length;
        }
      }

      for (z = 0; z < total_space_num; z++) {
        total_space = total_space + " ";
      }
      // await BluetoothEscposPrinter.printText(
      //   `Actual Value${total_space}${total_value}\n\r`,
      //   {}
      // );

      BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_jumlah_aktual[this.state.languageIndex]}`, " ", `${total_value}`],
        {}
      );

      total_value = difference;
      total_value = this.idrNumToStr(total_value, false);
      total_length = total_value.toString().length;
      total_space = "";
      total_space_num = 0;
      if (total_length < 22) {
        total_space_num = 22 - total_length;
      }

      if (printType === 2) {
        if (total_length < 22 + 16) {
          total_space_num = 22 + 16 - total_length;
        }
      }

      for (z = 0; z < total_space_num; z++) {
        total_space = total_space + " ";
      }
      // await BluetoothEscposPrinter.printText(
      //   `Difference${total_space}${total_value}\n\r`,
      //   {}
      // );

      BluetoothEscposPrinter.printColumn(
        [16 + total_addition_name, 1, 15 + total_addition_price],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT
        ],
        [`${_selisih_1[this.state.languageIndex]}`, " ", `${total_value}`],
        {}
      );

      // await BluetoothEscposPrinter.printText(
      //   "99 x 123456789012345678 12345678\n\r",
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

      if (this.state.recap_items.length > 0) {
        await BluetoothEscposPrinter.printText(
          `${_detail[this.state.languageIndex]}\n\r`,
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

        this.state.recap_items.map((data, index) => {
          let product_name = data.name;

          console.log("PRINT DATA ===> ", data);

          console.log("PRINT DATA.name ===> ", product_name);

          let product_price = data.price_total.toString();
          let product_price_length = product_price.length;
          //let product_qty = data.quantity.toString();

          let product_qty_number = Decimalize(data.quantity);
          let product_qty = product_qty_number.toString();

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
          let notes = data.notes ? data.notes : "";
          console.log("notes ", notes);

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

          // BluetoothEscposPrinter.printText(
          //   `${product_name_first_line}${prod_space}${product_qty}${price_space}${product_price}\n\r`,
          //   {}
          // );

          BluetoothEscposPrinter.printColumn(
            [16 + total_addition_name, 6, 10 + total_addition_price],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT
            ],
            [`${product_name}`, `${product_qty}`, `${product_price}`],
            {}
          );

          // for (var i = 1; i < product_name_length; i++) {
          //   BluetoothEscposPrinter.printText(`${product_name_array[i]}\n\r`, {});
          // }
        });
      }

      // await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
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
      this.setState({ showPrintStruk: true });
    } catch (error) {
      let message = [];
      message.push(_print_failed[this.state.languageIndex]);
      this.setState({ showAlert: true, alertMessage: message });
    }

    //BluetoothEscposPrinter.openDrawer(0, 250, 250);
  }

  async printAction(printer = this.state.printer_main) {
    const {
      dataStruk,
      userInfo,
      selectedData,
      printType,
      recap_items_wallet,
      recap_items_card,
      calculateMdr
    } = this.state;

    let total_mdr = 0;
    //console.log("user Info ==> ", userInfo);
    let namaKasir = selectedData.User
      ? selectedData.User.User_Profile.name
      : "";
    // let sales = selectedData.cash_total;

    let sales =
      selectedData.system_total - selectedData.cash_in_out_system_total;
    let jum_void = selectedData.void_total ? selectedData.void_total : 0;
    let credit = selectedData.card_system_total
      ? selectedData.card_system_total
      : 0;
    let restaurant_name = userInfo.restaurant_name;
    let restaurant_address = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";
    let difference = selectedData.difference;
    let total_system = selectedData.cash_system_total;
    let total_actual = selectedData.actual_total;
    let cash_in = selectedData.cash_in_out_system_total;
    let cash_out = selectedData.cash_in_out_system_total;
    //let nama = userInfo.name;
    let time = selectedData.time_close;

    time = moment(time).format("DD/MM/YYYY HH:mm:ss");

    let wallet = selectedData.ewallet_system_total;
    let cash = selectedData.cash_system_total;

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

    await BluetoothEscposPrinter.printText(`${restaurant_address}\n\r`, {
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

    if (calculateMdr) {
      await BluetoothEscposPrinter.printText(`Dengan MDR\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
      });
    }

    // await BluetoothEscposPrinter.printText(`${time}\n\r`, {
    //   encoding: "GBK",
    //   codepage: 0,
    //   widthtimes: 0,
    //   heigthtimes: 0,
    //   fonttype: 1
    // });

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
    let z = 0;

    //let total_value = sales;
    let total_value = this.idrNumToStr(sales, false);
    let total_length = total_value.toString().length;
    let total_space = "";
    let total_space_num = 0;

    if (total_length < 23) {
      total_space_num = 23 - total_length;
    }

    if (printType === 2) {
      if (total_length < 23 + 16) {
        total_space_num = 23 + 16 - total_length;
      }
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
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 28) {
      total_space_num = 28 - total_length;
    }

    if (printType === 2) {
      if (total_length < 28 + 16) {
        total_space_num = 28 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Void${total_space}${total_value}\n\r`,
      {}
    );

    total_value = credit;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 20) {
      total_space_num = 20 - total_length;
    }

    if (total_length < 20) {
      total_space_num = 20 - total_length;
    }

    if (printType === 2) {
      if (total_length < 20 + 16) {
        total_space_num = 20 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    // await BluetoothEscposPrinter.printText(
    //   `Debit/Credit${total_space}${total_value}\n\r`,
    //   {}
    // );

    total_value = cash_in;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 14) {
      total_space_num = 14 - total_length;
    }

    if (printType === 2) {
      if (total_length < 14 + 16) {
        total_space_num = 14 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }

    await BluetoothEscposPrinter.printText(
      `Kas Masuk & Keluar${total_space}${total_value}\n\r`,
      {}
    );

    // total_value = cash_out;
    // total_length = total_value.toString().length;
    // total_space = "";
    // total_space_num = 0;
    // if (total_length < 22) {
    //   total_space_num = 22 - total_length;
    // }

    // for (z = 0; z < total_space_num; z++) {
    //   total_space = total_space + " ";
    // }
    // await BluetoothEscposPrinter.printText(
    //   `Kas Keluar${total_space}${total_value}\n\r`,
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

    total_value = total_system;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 19) {
      total_space_num = 19 - total_length;
    }

    if (printType === 2) {
      if (total_length < 19 + 16) {
        total_space_num = 19 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    // await BluetoothEscposPrinter.printText(
    //   `Jumlah Sistem${total_space}${total_value}\n\r`,
    //   {}
    // );

    total_value = cash;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 27) {
      total_space_num = 27 - total_length;
    }

    if (printType === 2) {
      if (total_length < 27 + 16) {
        total_space_num = 27 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Tunai${total_space}${total_value}\n\r`,
      {}
    );

    total_value = wallet;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 24) {
      total_space_num = 24 - total_length;
    }

    if (printType === 2) {
      if (total_length < 24 + 16) {
        total_space_num = 24 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    // await BluetoothEscposPrinter.printText(
    //   `E-Wallet${total_space}${total_value}\n\r`,
    //   {}
    // );

    if (recap_items_card && recap_items_card.length > 0) {
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

      recap_items_card.map((v, i) => {
        let name = v.name;
        let length = 32 - name.length;
        total_value = v.total;

        if (calculateMdr) {
          total_value = v.total - v.mdr_total;
          total_mdr = total_mdr + v.mdr_total;
        }
        total_value = this.idrNumToStr(total_value, false);
        total_length = total_value.toString().length;
        total_space = "";
        total_space_num = 0;
        if (total_length < length) {
          total_space_num = length - total_length;
        }

        if (printType === 2) {
          if (total_length < length + 16) {
            total_space_num = length + 16 - total_length;
          }
        }

        for (z = 0; z < total_space_num; z++) {
          total_space = total_space + " ";
        }
        BluetoothEscposPrinter.printText(
          `${name}${total_space}${total_value}\n\r`,
          {}
        );
      });
    }

    if (recap_items_wallet && recap_items_wallet.length > 0) {
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

      recap_items_wallet.map((v, i) => {
        let name = v.name;
        let length = 32 - name.length;
        total_value = v.total;

        if (calculateMdr) {
          total_value = v.total - v.mdr_total;
          total_mdr = total_mdr + v.mdr_total;
        }

        total_value = this.idrNumToStr(total_value, false);
        total_length = total_value.toString().length;
        total_space = "";
        total_space_num = 0;
        if (total_length < length) {
          total_space_num = length - total_length;
        }

        if (printType === 2) {
          if (total_length < length + 16) {
            total_space_num = length + 16 - total_length;
          }
        }

        for (z = 0; z < total_space_num; z++) {
          total_space = total_space + " ";
        }
        BluetoothEscposPrinter.printText(
          `${name}${total_space}${total_value}\n\r`,
          {}
        );
      });
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

    total_value = total_actual - total_mdr;
    

    if (total_value < 0)
    {
      total_value = 0;
    }

    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    if (total_length < 19) {
      total_space_num = 19 - total_length;
    }

    if (printType === 2) {
      if (total_length < 19 + 16) {
        total_space_num = 19 + 16 - total_length;
      }
    }

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    await BluetoothEscposPrinter.printText(
      `Jumlah Aktual${total_space}${total_value}\n\r`,
      {}
    );

    total_value = difference;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
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

    if (this.state.recap_items.length > 0) {
      await BluetoothEscposPrinter.printText("DETAIL\n\r", {});

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

      this.state.recap_items.map((data, index) => {
        let product_name = data.name;

        console.log("PRINT DATA ===> ", data);

        console.log("PRINT DATA.name ===> ", product_name);

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
          product_name_array = this.divideLongWord(product_name, 18 + 16);
        }

        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = " ";
        let prod_space_num = 0;

        console.log("product_name_array ", product_name_array);
        let notes = data.notes ? data.notes : "";
        console.log("notes ", notes);

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

    //BluetoothEscposPrinter.openDrawer(0, 250, 250);
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

  getRekapList(startDateManual, showFirst = false, page = this.state.page) {
    this.updateTimeNow();
    const { userInfo, searchKey, startDate, endDate } = this.state;
    const gerai_id = userInfo.gerai_id;
    const retail_id = userInfo.retail_id;
    const search = searchKey ? searchKey : "";

    let date_start = moment(startDate).format("YYYY-MM-DD 00:00");

    if (startDateManual) {
      date_start = startDateManual;
    }


    // date_start = 

    
    const date_end = moment(endDate)
      .add(1, "days")
      .format("YYYY-MM-DD 23:59");

    //let uri = `${GetRekapAPI}?gerai_id=${gerai_id}&retail_id=${retail_id}&date_start=${date_start}&date_end=${date_end}&page=1&search=${search}`;

    let uri = `${BE_Rekap}/lite?date_start=${date_start}&date_end=${date_end}&per_page=18&page=${page}`;

    //let uri = `${BE_Rekap}?date_start=${date_start}&date_end=${date_end}&per_page=18&page=${page}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27

    console.log("URI REKAP ==> ", uri);

    fetch(uri, {
      method: "GET",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.statusCode === 200) {
          let resultData = result.data;
          // console.log("getData ==> ", result);
          // console.log("getData showFirst ==> ", showFirst);

          //page === 1 ? resultFinal : dataCombi,

          let resultFinal = [];

          if (showFirst) {
            resultFinal.push(resultData[0]);
          } else {
            resultFinal = resultData;
          }

          let tempData = this.state.dataRekap;

          let dataCombi = [...tempData, ...resultFinal];

          // console.log("getData resultFinal ==> ", resultFinal);

          // console.log("resultData ==> ", resultData);
          // console.log("resultData[0] ==> ", resultData[0]);

          if (showFirst) {
            this.setState(
              {
                dataRekap: page === 1 ? resultFinal : dataCombi,
                selectedData: resultData.length > 0 ? resultData[0] : [],
                selectedDataStatus:
                  resultData.length > 0 ? resultData[0].status : "closed",
                loading: false,
                page: page,
                maxPage: responseJson.pagination.total_page
              },
              () => this.forceUpdate()
            );
          } else {
            this.setState(
              {
                dataRekap: page === 1 ? resultFinal : dataCombi,
                loading: false,
                page: page,
                maxPage: responseJson.pagination.total_page
              },
              () => this.forceUpdate()
            );
          }
          // if (resultData.length === 0) {
          //   let newDate = moment(new Date())
          //     .add(-30, "days")
          //     .format("YYYY-MM-DD 00:00");

          //   if (newDate !== this.state.startDate) {
          //     this.setState({
          //       startDate: newDate
          //     });
          //
          //   }
          // } else {
          //   // this.selectData(resultData.data[0], false);
          //   this.selectData(resultData.data[0], false);
          // }
          //console.log('new data ==>', JSON.stringify(data))
        } else {
          //404
          // this.setState(
          //   {
          //     dataRekap: [],
          //     selectedData: [],
          //     selectedDataStatus: "closed",
          //     loading: false
          //   },
          //   () => this.forceUpdate()
          // );

          console.log("status code ===> ", result.statusCode);

          let new_date_start = moment(new Date()).format("2000-01-01 00:00");

          console.log("new_date_start ===> ", new_date_start);

          console.log("date_start ===> ", date_start);

          if (date_start === new_date_start) {
            this.setState(
              {
                dataRekap: [],
                selectedData: [],
                selectedDataStatus: "closed",
                loading: false,
                page: page,
                maxPage: responseJson.pagination.total_page
              },
              () => this.forceUpdate()
            );
          } else {
            this.getRekapList(new_date_start, true, 1);
          }
        }
      })
      .catch(_err => {
        this.setState(
          {
            dataRekap: [],
            selectedData: [],
            selectedDataStatus: "closed",
            loading: false,
            page: 1,
            maxPage: 1
          },
          () => this.forceUpdate()
        );

        console.log("ERR getRekapList ==> ", _err);
      });
  }

  getRekapListFirstTime() {
    const { userInfo, searchKey, startDate, endDate } = this.state;
    const gerai_id = userInfo.gerai_id;
    const retail_id = userInfo.retail_id;
    const search = searchKey ? searchKey : "";

    var d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    var first_day = Date(d.setDate(diff));

    let date_start = moment(d).format("YYYY-MM-DD 00:00");
    let date_end = moment(endDate)
      .add(1, "days")
      .format("YYYY-MM-DD 23:59");

    const page = 1;

    let uri = `${BE_Rekap}/lite?date_start=${date_start}&date_end=${date_end}&per_page=18&page=${page}`;

    //let uri = `${BE_Rekap}?date_start=${date_start}&date_end=${date_end}&per_page=18&page=${page}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27

    console.log("getRekapListFirstTime ==> ", uri);

    fetch(uri, {
      method: "GET",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        //console.log("responseJSON ==> ", responseJson)

        //console.log("getData rekap ==> ", result);

        if (result.statusCode === 200) {
          let resultData = result.data;
          //console.log("getData rekap ==> ", result);

          // console.log("getData ==> ", result);
          // console.log("resultData ==> ", resultData);
          // console.log("resultData[0] ==> ", resultData[0]);

          this.setState({
            dataRekap: resultData,
            selectedData: resultData.length > 0 ? resultData[0] : [],
            selectedDataStatus:
              resultData.length > 0 ? resultData[0].status : "closed",
            loading: false,
            page: page,
            maxPage: responseJson.pagination.total_page
          });
          if (resultData.length === 0) {
            let newDate = moment(new Date())
              .add(-30, "days")
              .format("2000-MM-DD 00:00");

            if (newDate !== this.state.startDate) {
              // this.setState({
              //   startDate: newDate
              // });
              //this.changeDateMonth();
            }
          } else {
            // this.selectData(this.state.dataRekap[0], false);
            //this.selectData(resultData.data[0], false);
          }
          //console.log('new data ==>', JSON.stringify(data))
        } else {
          console.log("status code ===> ", result.statusCode);

          let new_date_start = moment(new Date()).format("2000-01-01 00:00");

          console.log("new_date_start ===> ", new_date_start);

          console.log("date_start ===> ", date_start);

          if (date_start === new_date_start) {
            this.setState(
              {
                dataRekap: [],
                selectedData: [],
                selectedDataStatus: "closed",
                loading: false,
                page: page,
                maxPage: responseJson.pagination.total_page
              },
              () => this.forceUpdate()
            );
          } else {
            this.getRekapList(new_date_start, true, 1);
          }
        }
      })
      .catch(_err => {
        this.setState(
          {
            dataRekap: [],
            selectedData: [],
            selectedDataStatus: "closed",
            loading: false,
            page: 1,
            maxPage: 1
          },
          () => this.forceUpdate()
        );

        console.log("ERR getRekapList ==> ", _err);
      });
  }

  getRekapTransactions(id) {
    let uri = `${BE_Rekap}/${id}`;
    fetch(uri, {
      method: "GET",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("get Rekap Transactions ==> ", responseJson);
        if (responseJson.statusCode === 200) {
          let data = responseJson.data;

          let recap_items_payments = [];

          let data_transaction = data.Transactions;

          let transaction_items = [];

          let transaction_items_final = [];

          let temp_payments = [];

          data_transaction.map((v, i) => {
            let temp_data_transaction_items = v.Transaction_Items;

            let temp_payment = v.Payment;
            //console.log("temp v ===> ", temp_payment)
            temp_payments.push(temp_payment);
            // console.log("temp v ===> ", v)

            temp_data_transaction_items.map((x, y) => {
              transaction_items.push(x);
            });

            // temp_payment.map((x, y) => {
            //   temp_payments.push(x);
            // });
          });

          //console.log("transaction_items ===> ", transaction_items);

          temp_payments.map((v, i) => {
            let temp_dataa = {
              id: v.id,
              payment_total: v.payment_total,
              payment_method_name: v.Payment_Method.name,
              payment_method_id: v.Payment_Method.id,
              payment_method_type_id: v.Payment_Method.payment_method_type_id,
              payment_method_type_name:
                v.Payment_Method.Payment_Method_Type.name
            };
            recap_items_payments.push(temp_dataa);
          });

          console.log("recap_items_payments ===> ", recap_items_payments);

          let payment_method_wallet = this.state.payment_method_wallet;

          //console.log("payment_method_wallet ===> ", payment_method_wallet);

          let temp_wallet = [];
          payment_method_wallet.map((v, i) => {
            let total = 0;

            recap_items_payments.map((x, y) => {
              if (x.payment_method_id === v.id) {
                total = total + x.payment_total;
              }
            });

            let mdr_total = parseFloat((v.mdr / 100) * total);

            let temp_dataa = {
              id: v.id,
              total: total,
              name: v.name,
              mdr: v.mdr,
              mdr_total: parseInt(mdr_total)
            };
            temp_wallet.push(temp_dataa);
          });

          let payment_method_card = this.state.payment_method_card;
          let temp_card = [];
          payment_method_card.map((v, i) => {
            console.log("payment_method_card v ===> ", v);

            let total = 0;

            recap_items_payments.map((x, y) => {
              if (x.payment_method_id === v.id) {
                total = total + x.payment_total;
              }
            });

            let mdr_total = parseFloat((v.mdr / 100) * total);

            let temp_dataa = {
              id: v.id,
              total: total,
              name: v.name,
              mdr: v.mdr,
              mdr_total: parseInt(mdr_total)
            };
            temp_card.push(temp_dataa);
          });

          transaction_items.map((v, i) => {
            //let addons_data = v.Transaction_Item_Addons;
            //let addons_text = "";

            //console.log("transaction_items v ===> ", v);

            // if (addons_data.length > 0) {
            //   addons_data.map((x, y) => {
            //     let temp_text = x.Addons.name;
            //     if (addons_text === "") {
            //       addons_text = temp_text;
            //     } else {
            //       addons_text = addons_text + ", " + temp_text;
            //     }
            //   });
            // }

            let temp_dataa = {
              id: v.id,
              product_id: v.product_id,
              name: v.Product.name,
              //addons: addons_text,
              quantity: parseInt(v.quantity),
              price_product: v.price_product,
              price_addons_total: v.price_addons_total,
              price_total: v.price_total
            };

            //console.log("transaction_items v quantity ===> ", v.quantity);
            //console.log("transaction_items temp_data ===> ", temp_dataa);

            transaction_items_final.push(temp_dataa);
          });

          let transaction_items_final_distinct = [];

          //console.log("transaction_items_final ===> ", transaction_items_final);

          let transaction_items_final_clone = transaction_items_final;

          let product_id_list = [];

          //get unique items

          // const array = [
          //   { id: 3, name: "Central Microscopy", fiscalYear: 2018 },
          //   { id: 5, name: "Crystallography Facility", fiscalYear: 2018 },
          //   { id: 3, name: "Central Microscopy", fiscalYear: 2017 },
          //   { id: 5, name: "Crystallography Facility", fiscalYear: 2017 }
          // ];

          // const result = [];
          // const map = new Map();
          // for (const item of array) {
          //   if (!map.has(item.id)) {
          //     map.set(item.id, true); // set any value to Map
          //     result.push({
          //       id: item.id,
          //       name: item.name
          //     });
          //   }
          // }

          const array = transaction_items_final_clone;
          const map = new Map();
          for (const item of array) {
            if (!map.has(item.product_id)) {
              map.set(item.product_id, true); // set any value to Map
              //product_id_list.push(item.product_id);
              product_id_list.push(item);
            }
          }

          //console.log("product_id_list ===> ", product_id_list);
          let transaction_items_final_temp = [];

          product_id_list.map((v, i) => {
            //let product_id = v;
            //console.log("product_id_list map v ===> ", v);

            let product = {
              name: v.name,
              product_id: v.product_id,
              price_total: 0,
              price_addons_total: 0,
              quantity: 0,
              price_product: 0
            };

            transaction_items_final.map((vv, ii) => {
              if (vv.product_id === product.product_id) {
                product.quantity =
                  parseInt(product.quantity) + parseInt(vv.quantity);
                product.price_addons_total =
                  product.price_addons_total + vv.price_addons_total;
                product.price_product =
                  parseInt(product.price_product) + parseInt(vv.price_product);
                product.price_total =
                  parseInt(product.price_total) + parseInt(vv.price_total);
              }
            });

            transaction_items_final_temp.push(product);
          });

          // product_id_list.map((v, i) => {
          //   let product = v;
          //   console.log("product_id_list map v ===> ", v);

          //   product.quantity = 0;
          //   product.price_product = 0;
          //   product.price_addons_total = 0;
          //   product.price_total = 0;

          //   transaction_items_final.map((x, y) => {
          //     if (x.product_id === product.product_id) {
          //       product.quantity = parseInt(product.quantity) + parseInt(x.quantity);
          //       product.price_addons_total =
          //         product.price_addons_total + x.price_addons_total;
          //       product.price_product = parseInt(product.price_product) + parseInt(x.price_product);
          //       product.price_total = parseInt(product.price_total) + parseInt(x.price_total);
          //     }
          //   });

          //   transaction_items_final_temp.push(product);
          // });

          // console.log(
          //   "transaction_items_final_temp ===> ",
          //   transaction_items_final_temp
          // );

          console.log("temp_wallet ===> ", temp_wallet);

          this.setState({
            recap_items: transaction_items_final_temp,
            recap_items_wallet: temp_wallet,
            recap_items_card: temp_card
          });
        }
      });
  }

  getRekapDetail(id) {
    //let uri = `${GetRekapDetailAPI}?rekap_id=${id}`;

    let uri = `${BE_Cash}?recap_id=${id}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27
    this.setState({ loading: true });
    fetch(uri, {
      method: "GET",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("get Rekap Detail ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;
          console.log("getData ==> ", resultData);

          let temp_out = [];
          let temp_in = [];

          resultData.map((v, i) => {
            if (v.type === "in") {
              temp_in.push(v);
            } else {
              temp_out.push(v);
            }
          });

          this.setState({
            //dataDetail: resultData,
            dataDetailIn: temp_in,
            dataDetailOut: temp_out,
            loading: false
          });
          //console.log('new data ==>', JSON.stringify(data))
        } else {
          this.setState({
            //dataDetail: resultData,
            dataDetailIn: [],
            dataDetailOut: [],
            loading: false
          });
        }
      })
      .catch(_err => {
        console.log("ERR getRekapDetail ==> ", _err);
      });
  }

  selectData(data, showDetail = false) {
    console.log("select DATA ==> ", data);
    if (data.status === "open") {
      this.setState({
        showDetail: showDetail,
        selectedData: data,
        selectedDataStatus: data.status,
        cetakStruk: false
      });
      this.getRekapDetail(data.id);
    } else {
      console.log("cetak struk data ==> ", data);
      this.setState({
        showDetail: showDetail,
        selectedData: data,
        selectedDataStatus: data.status,
        cetakStruk: true,
        recap_items: []
      });
      this.getRekapTransactions(data.id);
    }
  }

  changeDateToday() {
    this.setState({
      loading: true,
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date())
        .add(0, "days")
        .format("YYYY-MM-DD"),
      action: 0,
      page: 1,
      maxPage: 1
    });

    setTimeout(() => {
      this.getRekapList();
    }, 333);
  }

  changeDateWeek() {
    var d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    var first_day = Date(d.setDate(diff));
    this.setState({
      loading: true,
      startDate: moment(d).format("YYYY-MM-DD"),
      endDate: moment(new Date())
        .add(0, "days")
        .format("YYYY-MM-DD"),
      action: 1,
      page: 1,
      maxPage: 1
    });

    console.log("change date week start ", moment(d).format("YYYY-MM-DD"));
    setTimeout(() => {
      this.getRekapList();
    }, 333);
  }

  changeDateMonth() {
    this.setState({
      loading: true,
      startDate: moment(new Date()).format("YYYY-MM-01"),
      endDate: moment(new Date())
        .add(0, "days")
        .format("YYYY-MM-DD"),
      action: 2,
      page: 1,
      maxPage: 1
    });
    setTimeout(() => {
      this.getRekapList();
    }, 333);
  }

  changeDateYear() {
    this.setState({
      loading: true,
      startDate: moment(new Date()).format("YYYY-01-01"),
      endDate: moment(new Date())
        .add(0, "days")
        .format("YYYY-MM-DD"),
      action: 3,
      page: 1,
      maxPage: 1
    });

    setTimeout(() => {
      this.getRekapList();
    }, 333);
  }

  changeStartDate = (event, date) => {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;
    console.log("changeStartDate ==> ", date);

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      startDate: moment(date).format("YYYY-MM-DD"),
      datePickerStart: false
    });
  };

  changeEndDate2(event, date) {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;
    console.log("Change End Date 2 ==> ", date);
    this.setState({
      //show: Platform.OS === 'ios' ? true : false,moment(endDate)

      endDate: moment(date)
        .add(0, "days")
        .format("YYYY-MM-DD"),
      datePickerEnd: false
    });
  }

  changeEndDate = (event, date) => {
    //console.log('setDate ==> ', date);
    //date = date || this.state.bookingDate;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      endDate: moment(date)
        .add(0, "days")
        .format("YYYY-MM-DD"),
      datePickerEnd: false
    });
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
    endDate = moment(endDate)
      .add(0, "days")
      .format("DD/MM/YYYY");
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
        <View
          style={{
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center"
          }}
        >
          <View style={{ flexDirection: "column" }} />
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
                this.setState({ page: 1 });
                setTimeout(() => {
                  this.getRekapList();
                }, 333);
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
                this.setState({ page: 1 });
                setTimeout(() => {
                  this.getRekapList();
                }, 333);
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
                this.setState({ action: -1, page: 1 });
                setTimeout(() => {
                  this.getRekapList();
                }, 333);
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

  // renderSearch() {
  //   let { startDate, endDate } = this.state;
  //   // startDate = moment(startDate).format('YYYY-MM-DD');
  //   // endDate = moment(endDate).format('YYYY-MM-DD');
  //   startDate = moment(startDate).format("DD/MM/YYYY");
  //   endDate = moment(endDate).format("DD/MM/YYYY");
  //   // console.log('Moment ==> ', moment(this.state.startDate));
  //   // console.log('NEW DATE ==> ', new Date(moment(this.state.startDate)));
  //   // console.log('state DATE ==> ', this.state.startDate);
  //   // console.log("state DATE ==> ", moment(new Date(this.state.startDate).format("YYYY-MM-DD 00:00:00"))
  //   return (
  //     <View>
  //       {this.state.datePickerEnd === true ? (
  //         <DateTimePicker
  //           value={new Date(moment(this.state.endDate))}
  //           mode="date"
  //           is24Hour={true}
  //           display="default"
  //           // onChange={this.changeEndDate}
  //           onChange={(event, date) => {
  //             this.changeEndDate2(event, date);
  //           }}
  //           minimumDate={new Date(moment(this.state.startDate))}
  //           //minimumDate={new Date()}
  //         />
  //       ) : (
  //         <View />
  //       )}

  //       {this.state.datePickerStart === true ? (
  //         <DateTimePicker
  //           value={new Date(moment(this.state.startDate))}
  //           mode="date"
  //           is24Hour={true}
  //           display="default"
  //           onChange={this.changeStartDate}
  //           //minimumDate={new Date(this.state.startDate)}
  //           //minimumDate={new Date()}
  //         />
  //       ) : (
  //         <View />
  //       )}
  //       {/* Cari Text Box End */}
  //       {/* Cari Tanggal Start */}
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           //backgroundColor: '#BCA',
  //           marginTop: 15,
  //           paddingRight: 15,
  //           paddingLeft: 15
  //         }}
  //       >
  //         <Button
  //           onPress={() => {
  //             this.changeDateToday();
  //           }}
  //           style={{
  //             //margin: 15,
  //             marginTop: 0,
  //             width: "33%",
  //             //borderColor: BLACK,
  //             //borderWidth: 1,
  //             backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
  //             borderRadius: 10,
  //             alignContent: "center",
  //             justifyContent: "center",
  //             flexDirection: "row",
  //             padding: 15
  //             //alignItems: 'center',
  //           }}
  //         >
  //           <Text
  //             style={[
  //               MainStyle.robotoNormalBold,
  //               {
  //                 fontSize: 12,
  //                 color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
  //               }
  //             ]}
  //           >
  //             {_today[this.state.languageIndex]}
  //           </Text>
  //         </Button>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           //backgroundColor: '#BCA',
  //           marginTop: 15,
  //           paddingRight: 15,
  //           paddingLeft: 15
  //         }}
  //       >
  //         <View
  //           style={{
  //             //margin: 15,
  //             marginTop: 0,
  //             width: "15%",
  //             alignContent: "center",
  //             justifyContent: "center",
  //             flexDirection: "row",
  //             //backgroundColor:"#BCA",
  //             padding: 15,
  //             paddingLeft: 0,
  //             paddingRight: 0
  //             //alignItems: 'center',
  //           }}
  //         >
  //           <Text
  //             style={[MainStyle.robotoNormalBold, { fontSize: 9, color: BLACK }]}
  //           >
  //             {_from[this.state.languageIndex]}
  //           </Text>
  //         </View>
  //         <Button
  //           onPress={() => {
  //             this.showStartPicker();
  //           }}
  //           style={{
  //             //margin: 15,
  //             marginTop: 0,
  //             width: "33%",
  //             //borderColor: BLACK,
  //             //borderWidth: 1,
  //             backgroundColor: WHITE,
  //             borderRadius: 10,
  //             alignContent: "center",
  //             justifyContent: "center",
  //             flexDirection: "row",
  //             padding: 15
  //             //alignItems: 'center',
  //           }}
  //         >
  //           <Text
  //             style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
  //           >
  //             {startDate}
  //           </Text>
  //         </Button>
  //         <View
  //           style={{
  //             //margin: 15,
  //             marginTop: 0,
  //             width: "15%",
  //             alignContent: "center",
  //             justifyContent: "center",
  //             flexDirection: "row",
  //             //backgroundColor:"#BCA",
  //             padding: 15,
  //             paddingLeft: 0,
  //             paddingRight: 0
  //             //alignItems: 'center',
  //           }}
  //         >
  //           <Text
  //             style={[MainStyle.robotoNormalBold, { fontSize: 9, color: BLACK }]}
  //           >
  //             {_to[this.state.languageIndex]}
  //           </Text>
  //         </View>
  //         <Button
  //           onPress={() => {
  //             this.showEndPicker();
  //           }}
  //           style={{
  //             //margin: 15,
  //             marginTop: 0,
  //             width: "33%",
  //             //borderColor: BLACK,
  //             //borderWidth: 1,
  //             backgroundColor: WHITE,
  //             borderRadius: 10,
  //             alignContent: "center",
  //             justifyContent: "center",
  //             flexDirection: "row",
  //             padding: 15
  //             //alignItems: 'center',
  //           }}
  //         >
  //           <Text
  //             style={[MainStyle.robotoNormalBold, { fontSize: 12, color: BLACK }]}
  //           >
  //             {endDate}
  //           </Text>
  //         </Button>
  //       </View>

  //       {/* Cari Tanggal End */}
  //     </View>
  //   );
  // }

  renderList(data, i) {
    //console.log("render List Data ==> ", data)
    let time = data.time_open;
    time = moment(time).format("HH:mm");

    let date = moment(data.time_open).format("DD/MM/YYYY");

    const { selectedData } = this.state;
    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.state.colorIndex === 9) {
      // whiteColor = BLACK;
      // blackColor = WHITE;
    }

    // const bgColor = [
    //   MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
    //   whiteColor
    // ];
    // const textColor = [
    //   MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
    //   blackColor
    // ];

    const bgColor = [whiteColor, whiteColor];
    const textColor = [blackColor, blackColor];

    let colorIndex = 1;

    if (selectedData.id === data.id) {
      colorIndex = 0;
    } else {
      colorIndex = 1;
    }

    let cashier_name = "";

    //if (data.User.User_Profile.name) {
    cashier_name = data.User ? data.User.User_Profile.name : "";
    //}

    let status = "";
    // if (data.status === "open") {
    //   status = "Open";
    // } else {
    //   status = "Close";
    // }

    status = data.status.charAt(0).toUpperCase() + data.status.slice(1);

    //console.log("SELECTED DATA ==> ", selectedData)
    //console.log("data.id ==> ", data.id)
    return (
      <Button
        onPress={() => {
          // this.setState({ selectedData: data });
          this.selectData(data, true);
        }}
        style={[
          ss.box,
          {
            width: this.state.tablet ? "49%" : "100%",
            //minHeight: 100,
            marginTop: 0,
            elevation: 0,
            marginBottom: 15,
            //backgroundColor: bgColor[colorIndex],
            //backgroundColor: "#BCA",
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
            padding: 15,
            paddingBottom: 5,
            flexDirection: "row",
            borderColor: textColor[colorIndex],
            borderBottomWidth: 1,
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 10, color: textColor[colorIndex] }
            ]}
          >
            {date}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            //backgroundColor: "#BCA",
            padding: 15,
            marginLeft: 20,
            marginRight: 20
          }}
        >
          <View style={{ width: "33%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 11, color: textColor[colorIndex] }
              ]}
            >
              {_user[this.state.languageIndex]} :
            </Text>
            <Text
              style={[
                MainStyle.robotoNormal,
                { fontSize: 10, color: textColor[colorIndex] }
              ]}
            >
              {cashier_name}
            </Text>
            {/* <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 15, color: textColor[colorIndex], marginTop: 0 }
            ]}
          />
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          /> */}
          </View>

          <View style={{ width: "33%", alignItems: "center" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 11, color: textColor[colorIndex] }
              ]}
            >
              {_status[this.state.languageIndex]} :
            </Text>
            <Text
              style={[
                MainStyle.robotoNormal,
                { fontSize: 10, color: textColor[colorIndex] }
              ]}
            >
              {status}
            </Text>
            {/* <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 15, color: textColor[colorIndex], marginTop: 0 }
            ]}
          />
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 14, color: textColor[colorIndex] }
            ]}
          /> */}
          </View>

          <View style={{ width: "33%", alignItems: "flex-end" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 11, color: textColor[colorIndex] }
              ]}
            >
              {_jam[this.state.languageIndex]} :
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
            backgroundColor: "#E8E8E8",
            padding: 5,
            alignItems: "center"
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 11,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            {_lihat_detail[this.state.languageIndex]}
          </Text>
        </View>
      </Button>
    );
  }

  renderHistoryLeftSide() {
    const { action } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            elevation: 0,
            flex: 1,
            borderRadius: 0
            //backgroundColor: "#C4C4C4"
            //paddingBottom: 15,
          }
        ]}
      >
        {/* {this.renderSelectUser()} */}
        <View style={{ marginTop: 15 }} />
        {this.renderTime()}

        {this.renderSearch()}
        <View
          style={{
            margin: 15,
            flex: 1,
            borderBottomWidth: 0,
            borderColor: "#C8C7CC"
          }}
        >
          {/* <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <GestureRecognizer
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
          {/* {this.state.tablet ? (
            <FlatList
              columnWrapperStyle={{
                justifyContent: "space-between"
                //marginBottom: 5
              }}
              numColumns={2}
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
          ) : (
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
          )} */}

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
            onScroll={({ nativeEvent }) => {
              // console.log("HANDLE LOAD MOREEEE ===========");
              if (isCloseToBottom(nativeEvent)) {
                if (this.state.loading === false) {
                  this.handleLoadMore();
                }
                //console.log("IS CLOSE TO BOTTOM");
              }
            }}
            //onRefresh={this._onRefresh}
            //onEndReached={this.handleLoadMore}
            //onEndReachedThreshold={0.5}
            //refreshing={refreshing}
          />
          {/* </GestureRecognizer>
          </ScrollView> */}
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
              MainStyle.robotoNormal,
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
              MainStyle.robotoNormal,
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
              MainStyle.robotoNormal,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
                MainStyle.robotoNormalBold,
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
              {_total[this.state.languageIndex]}
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
            style={[MainStyle.robotoNormalBold, { fontSize: 20, color: BLACK }]}
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
            style={[MainStyle.robotoNormalBold, { fontSize: 20, color: BLACK }]}
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
          flexDirection: "row",
          display: "none"
        }}
      >
        <Button
          onPress={() => {
            this.calculateRekap();
            this.openRekap();
          }}
          style={[
            ss.box,
            {
              backgroundColor: "rgba(185, 60, 60, 0.9)",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              borderRadius: 15,
              elevation: 1
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { fontSize: 12, color: WHITE, margin: 5 }
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
          justifyContent: "space-between"
          //flexDirection: "row"
        }}
      >
        {/* <View
          style={[
            ss.box,
            {
              elevation: 0,
              width: "40%"
            }
          ]}
        /> */}
        <Button
          onPress={() => {
            //this.openRekap();
            if (this.state.printer_main) {
              this.printStruk(true);
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
              display: this.state.cz_user ? "flex" : "none",
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderRadius: 5,
              elevation: 1
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 12,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                margin: 5
              }
            ]}
          >
            {_cetak_struk_2[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          onPress={() => {
            //this.openRekap();
            if (this.state.printer_main) {
              this.printStruk();
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
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              width: "100%",
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderRadius: 5,
              elevation: 1
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 12,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                margin: 5
              }
            ]}
          >
            {_cetak_struk_1[this.state.languageIndex]}
          </Text>
        </Button>
        <Button
          onPress={() => {
            //this.openRekap();
            //this.printStruk();
            this.setState({ showDetail: false });
          }}
          style={[
            ss.box,
            {
              marginTop: 15,
              backgroundColor: WHITE,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderRadius: 5,
              elevation: 1
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 12,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                margin: 5
              }
            ]}
          >
            {_kembali[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  printStruk(mdr = false) {
    this.setState({ showPrintStruk: true, calculateMdr: mdr });

    this.connectPrinter();

    setTimeout(() => {
      // if (this.state.languageIndex === 0) {
      //   this.printAction();
      // } else {
      //   if (this.state.languageIndex === 1) {
      //     this.printActionEng();
      //   } else if (this.state.languageIndex === 2) {
      //     this.printActionNew();
      //   } else {
      //     this.printActionEng();
      //   }
      // }
      this.printActionNew();

      //this.printActionSunmi();
    }, 333);
  }

  async printActionSunmi() {
    const {
      dataStruk,
      userInfo,
      selectedData,
      printType,
      recap_items_wallet,
      recap_items_card,
      calculateMdr,
      languageIndex
    } = this.state;

    let length_multiplier = 1;

    if (languageIndex === 2 || languageIndex === 3) {
      length_multiplier = 2;
    }

    let total_addition_name = 0;
    let total_addition_price = 0;

    if (printType === 2) {
      total_addition_name = 10;
      total_addition_price = 6;
    }

    let total_mdr = 0;
    //console.log("user Info ==> ", userInfo);
    let namaKasir = selectedData.User
      ? selectedData.User.User_Profile.name
      : "";
    // let sales = selectedData.cash_total;

    let sales =
      selectedData.system_total - selectedData.cash_in_out_system_total;
    let jum_void = selectedData.void_total ? selectedData.void_total : 0;
    let credit = selectedData.card_system_total
      ? selectedData.card_system_total
      : 0;
    let restaurant_name = userInfo.restaurant_name;
    let restaurant_address = userInfo.restaurant_address
      ? userInfo.restaurant_address
      : "";
    let difference = selectedData.difference;
    let total_system = selectedData.cash_system_total;
    let total_actual = selectedData.actual_total;
    let cash_in = selectedData.cash_in_out_system_total;
    let cash_out = selectedData.cash_in_out_system_total;
    //let nama = userInfo.name;
    let time = selectedData.time_close;

    time = moment(time).format("DD/MM/YYYY HH:mm:ss");

    let wallet = selectedData.ewallet_system_total;
    let cash = selectedData.cash_system_total;

    SunmiFunctions.PrintText(`${restaurant_name}`, 24, 1, 0);

    SunmiFunctions.PrintText(`${restaurant_address}`, 24, 1, 2);

    SunmiFunctions.PrintText(`${time}`, 24, 0, 0);

    SunmiFunctions.PrintText(
      `${_kasir[this.state.languageIndex]} ${namaKasir}`,
      24,
      0,
      0
    );

    if (calculateMdr) {
      SunmiFunctions.PrintText(
        `${_with_mdr[this.state.languageIndex]}`,
        24,
        0,
        0
      );
    }

    SunmiFunctions.PrintLine(printType);

    let z = 0;
    //let total_value = sales;
    let max_length = 32;
    if (printType === 2) {
      max_length = max_length + 16;
    }

    let total_value = this.idrNumToStr(sales, false);
    let total_length = total_value.toString().length;
    let total_space = "";
    let total_space_num = 0;
    let text = _penjualan[this.state.languageIndex];
    // let width = text.toString().length * length_multiplier;
    let width = SunmiFunctions.countLength(text);
    total_space_num = max_length - width - total_length;
    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    SunmiFunctions.PrintText(`${text}${total_space}${total_value}`, 24, 0, 0);
    ////////
    total_value = this.idrNumToStr(jum_void, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    text = _void[this.state.languageIndex];
    // width = text.toString().length * length_multiplier;
    width = SunmiFunctions.countLength(text);

    total_space_num = max_length - width - total_length;

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    SunmiFunctions.PrintText(`${text}${total_space}${total_value}`, 24, 0, 0);
    ////////
    total_value = this.idrNumToStr(cash_in, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    text = _cash_in_out[this.state.languageIndex];
    //width = text.toString().length * length_multiplier;
    width = SunmiFunctions.countLength(text);

    total_space_num = max_length - width - total_length;

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    SunmiFunctions.PrintText(`${text}${total_space}${total_value}`, 24, 0, 0);
    ////////

    SunmiFunctions.PrintLine(printType);

    ////////
    total_value = this.idrNumToStr(cash, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    text = _tunai[this.state.languageIndex];
    // width = text.toString().length * length_multiplier;
    width = SunmiFunctions.countLength(text);
    total_space_num = max_length - width - total_length;

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    SunmiFunctions.PrintText(`${text}${total_space}${total_value}`, 24, 0, 0);
    ////////

    if (recap_items_card && recap_items_card.length > 0) {
      SunmiFunctions.PrintLine(printType);
      recap_items_card.map((v, i) => {
        let name = v.name;
        // let length = max_length - name.length * length_multiplier;
        let length = max_length - SunmiFunctions.countLength(name);
        total_value = v.total;

        if (calculateMdr) {
          total_value = v.total - v.mdr_total;
          total_mdr = total_mdr + v.mdr_total;
        }

        total_value = this.idrNumToStr(total_value, false);
        total_length = total_value.toString().length;
        total_space = "";
        total_space_num = 0;

        if (total_length < length) {
          total_space_num = length - total_length;
        }

        for (z = 0; z < total_space_num; z++) {
          total_space = total_space + " ";
        }
        SunmiFunctions.PrintText(
          `${name}${total_space}${total_value}`,
          24,
          0,
          0
        );
      });
    }
    ///////////
    if (recap_items_wallet && recap_items_wallet.length > 0) {
      SunmiFunctions.PrintLine(printType);

      recap_items_wallet.map((v, i) => {
        let name = v.name;
        // let length = max_length - name.length * length_multiplier;

        let length = max_length - SunmiFunctions.countLength(name);

        total_value = v.total;

        if (calculateMdr) {
          total_value = v.total - v.mdr_total;
          total_mdr = total_mdr + v.mdr_total;
        }

        total_value = this.idrNumToStr(total_value, false);
        total_length = total_value.toString().length;
        total_space = "";
        total_space_num = 0;
        if (total_length < length) {
          total_space_num = length - total_length;
        }

        for (z = 0; z < total_space_num; z++) {
          total_space = total_space + " ";
        }
        // BluetoothEscposPrinter.printText(
        //   `${name}${total_space}${total_value}\n\r`,
        //   {}
        // );

        SunmiFunctions.PrintText(
          `${name}${total_space}${total_value}`,
          24,
          0,
          0
        );
      });
    }
    /////////
    SunmiFunctions.PrintLine(printType);
    //////////
    total_value = total_actual - total_mdr;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    text = _jumlah_aktual[this.state.languageIndex];
    // width = text.toString().length * length_multiplier;
    width = SunmiFunctions.countLength(text);
    total_space_num = max_length - width - total_length;

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    SunmiFunctions.PrintText(`${text}${total_space}${total_value}`, 24, 0, 0);
    //////////
    total_value = difference;
    total_value = this.idrNumToStr(total_value, false);
    total_length = total_value.toString().length;
    total_space = "";
    total_space_num = 0;
    text = _selisih_1[this.state.languageIndex];
    // width = text.toString().length * length_multiplier;
    width = SunmiFunctions.countLength(text);
    total_space_num = max_length - width - total_length;

    for (z = 0; z < total_space_num; z++) {
      total_space = total_space + " ";
    }
    SunmiFunctions.PrintText(`${text}${total_space}${total_value}`, 24, 0, 0);
    //////////
    SunmiFunctions.PrintLine(printType);
    //////////
    if (this.state.recap_items.length > 0) {
      // await BluetoothEscposPrinter.printText(
      //   `${_detail[this.state.languageIndex]}\n\r`,
      //   {}
      // );

      SunmiFunctions.PrintText(
        `${_detail[this.state.languageIndex]}`,
        24,
        0,
        0
      );
      SunmiFunctions.PrintLine(printType);

      this.state.recap_items.map((data, index) => {
        let product_name = data.name;
        let product_price = data.price_total.toString();
        let product_price_length = product_price.length;
        let product_qty = data.quantity.toString();
        if (product_qty.length === 1) {
          product_qty = product_qty;
        } else {
          product_qty = product_qty;
        }

        let qty_space = "";
        let qty_space_num = 0;

        if (product_qty.length < 4) {
          qty_space_num = 4 - product_qty.length;
        }

        for (var xxx = 0; xxx < qty_space_num; xxx++) {
          qty_space = qty_space + " ";
        }

        let price_space = "";
        let price_space_num = 0;

        if (product_price_length < 8) {
          price_space_num = 8 - product_price_length;
        }

        for (var xx = 0; xx < price_space_num; xx++) {
          price_space = price_space + " ";
        }

        price_space = qty_space + price_space;

        let product_name_array = this.divideLongWord(
          product_name,
          20 / length_multiplier
        );

        if (printType === 2) {
          product_name_array = this.divideLongWord(product_name, 20 + 16);
        }

        let product_name_length = product_name_array.length;
        let product_name_first_line = product_name_array[0];
        let length = product_name_first_line.length;
        let prod_space = "";
        let prod_space_num = 0;

        if (length < 20) {
          prod_space_num = 20 - length;
        }

        if (printType === 2) {
          if (length < 20 + 16) {
            prod_space_num = 20 + 16 - length;
          }
        }

        for (var s = 0; s < prod_space_num; s++) {
          prod_space = prod_space + " ";
        }
        SunmiFunctions.PrintText(
          `${product_name_first_line}${prod_space}${product_qty}${price_space}${product_price}`,
          24,
          0,
          0
        );

        for (var i = 1; i < product_name_length; i++) {
          SunmiFunctions.PrintText(`${product_name_array[i]}`, 24, 0, 0);
        }
      });
    }
    SunmiFunctions.PrintLine(printType);
    SunmiFunctions.PrintText("", 24, 0, 5);
  }

  closePrintStruk() {
    this.setState({ showPrintStruk: false });
  }

  deleteDetail(data) {
    const rekap_id = this.state.selectedData.id;
    const cash_id = data.id;
    //alert(rekap_id);
    this.setState({ loading: true });

    let uri = `${BE_Cash}/${cash_id}`;

    console.log("uri delete ==> ", uri);
    fetch(uri, {
      method: "DELETE",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;

        console.log("responseJson delete ==> ", responseJson);

        let message = [];

        //message.push(responseJson.message);
        if (responseJson.statusCode === 200) {
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
        console.log("ERR deleteDetail ==> ", _err);
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
          paddingTop: 10,

          backgroundColor: WHITE
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10
          }}
        >
          {/* Baris 1 end */}
          <View style={{ width: "40%" }}>
            <Text
              style={[
                MainStyle.robotoNormal,
                { fontSize: 12, color: BLACK, marginTop: 0 }
              ]}
            >
              {data.notes}
            </Text>
          </View>

          <View style={{ width: "40%" }}>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
            >
              {this.idrNumToStr(data.value, true)}
            </Text>
          </View>
          <View style={{ width: "10%" }}>
            {this.state.selectedData.status === "open" ? (
              <TouchableOpacity
                style={{
                  padding: 5,
                  paddingTop: 0,
                  paddingBottom: 0,

                  //backgroundColor: "#BCA",
                  //position: "absolute",
                  //right: 15,
                  //top: 10,
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
                    fontSize: 20,
                    color: RED_500,
                    elevation: 1
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
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
        {this.state.loading ? <Loading /> : <View />}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_kas[this.state.languageIndex]}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          backAction={() => {
            this.setState({ showDetail: false });
          }}
          hideLogin={true}
          //hideOnline={false}
        />
        <View
          style={[
            ss.box,
            {
              elevation: 0,
              //backgroundColor: WHITE,
              flex: 1,
              borderRadius: 5,
              margin: 15
            }
          ]}
        >
          {/* <View
            style={{
              //width: this.state.tablet ? "66%" : "100%",
              //alignSelf: "center"
            }}
          > */}
          {/* this.renderNoDataRightSide() */}
          {cetakStruk === false ? (
            <View
              style={{
                width: this.state.tablet ? "66%" : "100%",
                alignSelf: "center"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK, marginTop: 10 }
                    ]}
                  >
                    {_cash_in[this.state.languageIndex]}
                  </Text>
                </View>

                <Button
                  onPress={() => {
                    this.openCashInOut("in");
                  }}
                  style={[
                    ss.box,
                    {
                      elevation: 0,
                      alignSelf: "flex-end",
                      width: "25%",
                      alignItems: "center",
                      justifyContent: "center"
                    }
                  ]}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK }
                    ]}
                  >
                    {_edit[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
              <ScrollView
                style={{ height: "40%" }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataDetailIn}
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
              </ScrollView>
              <View
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderColor: "#E8E8E8"
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK, marginTop: 10 }
                    ]}
                  >
                    {_cash_out[this.state.languageIndex]}
                  </Text>
                </View>

                <Button
                  onPress={() => {
                    this.openCashInOut("out");
                  }}
                  style={[
                    ss.box,
                    {
                      elevation: 0,
                      alignSelf: "flex-end",
                      width: "25%",
                      alignItems: "center",
                      justifyContent: "center"
                    }
                  ]}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      { fontSize: 12, color: BLACK }
                    ]}
                  >
                    {_edit[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
              <ScrollView
                style={{ height: "40%" }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataDetailOut}
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
              </ScrollView>
              <View
                style={{
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderColor: "#E8E8E8"
                }}
              />
            </View>
          ) : (
            <View />
          )}
          {cetakStruk === true ? this.renderStrukRightSide() : <View />}

          {cetakStruk === false ? (
            <View
              style={{
                width: this.state.tablet ? "66%" : "100%",
                alignSelf: "center"
              }}
            >
              {this.renderButtonCommand()}
            </View>
          ) : (
            <View
              style={{
                width: this.state.tablet ? "66%" : "100%",
                alignSelf: "center"
              }}
            >
              {this.renderStrukButtonCommand()}
            </View>
          )}
          {/* </View> */}
        </View>

        {/* <View>{dataKasRekap ? this.renderButtonCommand() : <View />}</View> */}
      </View>
    );
  }

  renderStrukRightSide() {
    const { dataStruk, userInfo, selectedData } = this.state;
    //console.log("user Info ==> ", userInfo);
    let namaKasir = selectedData.User
      ? selectedData.User.User_Profile.name
      : "";
    let sales = selectedData.cash_total;
    let jum_void = selectedData.void_total ? selectedData.void_total : 0;
    let card_total = selectedData.card_total ? selectedData.card_total : 0;
    let ewallet_total = selectedData.ewallet_total;

    //let restaurant_name = userInfo.restaurant_name;
    let difference = selectedData.difference;
    let total_system = selectedData.cash_system_total;
    let total_actual = selectedData.actual_total;

    //let nama = userInfo.name;
    let time = selectedData.time_close;

    time = moment(time).format("DD/MM/YYYY HH:mm:ss");

    //system
    let system_total = selectedData.system_total
      ? selectedData.system_total
      : 0;

    let card_system_total = selectedData.card_system_total
      ? selectedData.card_system_total
      : 0;
    let cash_system_total = selectedData.cash_system_total
      ? selectedData.cash_system_total
      : 0;
    let cash_in = selectedData.cash_in_out_system_total;
    let cash_out = selectedData.cash_in_out_system_total;
    let wallet = selectedData.ewallet_system_total;
    let cash = selectedData.cash_system_total;

    let sales_total = parseInt(system_total) - parseInt(cash_in);

    //     actual_total: 140400
    // business_id: 1
    // cash_in_out_system_total: 30000
    // cash_system_total: 27600
    // cash_total: 57600
    // createdAt: "2020-10-21T10:12:06.000Z"
    // deletedAt: null
    // difference: 0
    // ewallet_system_total: 82800
    // ewallet_total: 82800
    // id: 11
    // outlet_id: 1
    // status: "closed"
    // system_total: 140400

    // const example_data =  {
    //   actual_total: 0
    //   business_id: 1
    //   cash_in_out_system_total: 0
    //   cash_system_total: 0
    //   cash_total: 0
    //   createdAt: "2020-10-21T09:56:16.000Z"
    //   deletedAt: null
    //   difference: 0
    //   ewallet_system_total: 0
    //   ewallet_total: 0
    //   id: 9
    //   outlet_id: 1
    //   status: "closed"
    //   system_total: 0
    //   time_close: "2020-10-21T09:56:31.000Z"
    //   time_open: "2020-10-21T09:56:16.000Z"
    //   updatedAt: "2020-10-21T09:56:30.000Z"
    //   user_id: 1
    // }

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
              {
                flex: 1,
                padding: 0,
                backgroundColor: "transparent",
                elevation: 0,
                width: this.state.tablet ? "66%" : "100%",
                alignSelf: "center"
              }
            ]}
          >
            {/* <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 14, color: BLACK, marginTop: 10 }
              ]}
            >
              {restaurant_name}
            </Text> */}
            <Text
              style={[
                MainStyle.robotoNormal,
                { fontSize: 12, color: BLACK, marginTop: 0 }
              ]}
            >
              {_kasir[this.state.languageIndex]} : {namaKasir}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  marginTop: 10
                }
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
                    MainStyle.robotoNormalBold,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_penjualan[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(sales_total, true)}
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
                    MainStyle.robotoNormalBold,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_void[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(jum_void, true)}
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
                    MainStyle.robotoNormalBold,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_card[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(card_system_total, true)}
                </Text>
              </View>
            </View>
            {/* Cicilan */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5
              }}
            >
              <View style={{ width: "60%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_cash_in[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(cash_in, true)}
                </Text>
              </View>
            </View> */}
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
                    MainStyle.robotoNormalBold,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_cash_in_out[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(cash_out, true)}
                </Text>
              </View>
            </View>
            {/* Kas Keluar */}
            {/* <View
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
                    MainStyle.robotoNormalBold,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_jumlah_sistem[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(sales, true)}
                </Text>
              </View>
            </View> */}
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
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_tunai[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(cash, true)}
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
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_e_wallet[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,

                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(wallet, true)}
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
                    MainStyle.robotoNormalBold,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_jumlah_aktual[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(total_actual, true)}
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
                    MainStyle.robotoNormalBold,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {_selisih_1[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 10, color: BLACK }
                  ]}
                >
                  {_selisih_2[this.state.languageIndex]}
                </Text>
              </View>
              <View style={{ width: "40%" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "right"
                    }
                  ]}
                >
                  {this.idrNumToStr(difference, true)}
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
            MainStyle.robotoNormalBold,
            { fontSize: 12, color: BLACK, margin: 5 }
          ]}
        >
          {_no_data_1[this.state.languageIndex]}
        </Text>
        <Text
          style={[
            MainStyle.robotoNormal,
            { fontSize: 12, color: BLACK, margin: 5 }
          ]}
        >
          {_no_data_2[this.state.languageIndex]}
        </Text>
        <MaterialCommunityIcons
          name={"book-open-variant"}
          style={{ fontSize: 100, color: "#9D9797" }}
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

    let uri = BE_Cash;

    const parameters = {
      type: formType,
      value: formJumlah,
      notes: formCatatan,
      recap_id: rekap_id,
      user_id: cashier_id
    };

    console.log(
      "POST data ==> ",
      JSON.stringify({
        type: formType,
        value: formJumlah,
        notes: formCatatan,
        recap_id: rekap_id,
        user_id: cashier_id
      })
    );
    if (formCatatan === "") {
      this.setState({
        errorCashInOut: _error_semua_field[this.state.languageIndex],
        loading: false
      });
      //save Cash In Out
    } else {
      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.state.auth
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          type: formType,
          value: formJumlah,
          notes: formCatatan,
          recap_id: rekap_id,
          user_id: cashier_id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          let result = responseJson;
          console.log("Add Detail RESPONSE ==> ", responseJson);
          //alert(responseJson.message);

          let message = [];
          //message.push(responseJson.message);
          if ((responseJson.statusCode = 201)) {
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
          console.log("ERR submitCashInOut ==> ", _err);
        });

      this.setState({ errorCashInOut: "", addCashInOut: false });
    }
  }

  openCashInOut(type = "out") {
    this.openDrawer();
    this.setState({
      formType: type,
      formCatatan: "",
      formJumlah: 0,
      addCashInOut: true
    });
  }

  closeCashInOut() {
    this.openDrawer();
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

  changeRekapCard(text) {
    this.setState({ rekapCard: text });
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
      rekapGoPay,
      rekapCard,
      selectedUser
    } = this.state;
    //this.setState({ loading: true });

    const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const closing = true;
    const total = rekapTotal;

    console.log("rekapTunai ===> ", rekapTunai);
    console.log("rekapGoPay ===> ", rekapGoPay);
    console.log("rekapCard ===> ", rekapCard);

    let valid = true;

    if (rekapTunai === "" || rekapGoPay === "" || rekapCard === "") {
      valid = false;
    }
    // else
    // {
    //   if (rekapTunai === 0 && rekapGoPay === 0 && rekapCard === 0)
    //   {
    //     valid = false;
    //   }
    // }

    //if (valid) {

    const parameters = {
      time_close: time_now,
      cash_total: parseFloat(rekapTunai),
      ewallet_total: parseFloat(rekapGoPay),
      card_total: parseFloat(rekapCard),
      //user_id: userInfo.id
      user_id: selectedUser
    };

    let rekap_id = selectedData.id;

    console.log("parameters ==> ", parameters);

    let uri = `${BE_Rekap}/${rekap_id}`;

    console.log("uri ==> ", uri);

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        time_close: time_now,
        // cash_total: parseFloat(rekapTunai),
        // ewallet_total: parseFloat(rekapGoPay),
        // card_total: parseFloat(rekapCard),
        cash_total: rekapTunai,
        ewallet_total: rekapGoPay,
        card_total: rekapCard,
        user_id: userInfo.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("REKAP RESPONSE ==> ", responseJson);
        let message = [];
        //message.push(result.message);
        if (
          responseJson.statusCode === 201 ||
          responseJson.statusCode === 500
        ) {
          message.push(_berhasil_update[this.state.languageIndex]);
          //this.createRekap();
          this.setState({
            //selectedData: result.data,
            formRekap: false,
            //cetakStruk: true,
            //selectedDataStatus: "close",
            loading: false,
            showAlert: true,
            alertMessage: message,
            page: 1,
            selectedDataStatus: "closed"
          });
          setTimeout(() => {
            this.getRekapList();
          }, 333);
        } else {
          message.push(_gagal[this.state.languageIndex]);
          this.setState({
            //selectedData: result.data,
            formRekap: false,
            //cetakStruk: true,
            //selectedDataStatus: "close",
            loading: false,
            showAlert: true,
            alertMessage: message,
            page: 1
          });
          setTimeout(() => {
            this.getRekapList();
          }, 333);
        }

        //this.getRekapDetail(result.data);
        //alert(result.message);
        //this.resetPage();
      })
      .catch(_err => {
        console.log("ERR submitRekap ==> ", _err);
      });
    // } else {
    //   alert("Tidak Valid");
    // }
  }

  openRekap() {
    //this.openDrawer();
    this.setState({
      rekapTunai: 0,
      rekapGoPay: 0,
      rekapTotal: 0,
      formRekap: true
    });
  }

  renderSelectUser() {
    return (
      <View
        style={[
          ss.box,
          {
            elevation: 0,
            //borderColor: "#C8C7CC",
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
              languageIndex={this.state.languageIndex}
              selectedValue={String(this.state.selectedUser)}
              optionLists={this.state.listUser.map((v, k) => {
                return {
                  label: v.name,
                  value: String(v.id)
                };
              })}
              onValueChange={(itemValue, itemIndex) => {
                //console.log("select user ==> ", this.state.listUser[itemIndex]);

                this.setState({
                  selectedUser: parseInt(itemValue)
                  // selectedUserData: this.state.listUser[itemIndex]
                });

                //this.getAttendanceInformation(itemValue);
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  renderTime() {
    const { time_now, date_now } = this.state;

    let status = this.state.selectedDataStatus;

    status = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <View
        style={[
          ss.box,
          {
            //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //padding: 10,
            elevation: 0,
            margin: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingRight: 15,
            paddingLeft: 15,
            borderBottomWidth: 1,
            paddingBottom: 15,
            borderColor: "#C8C7CC",
            marginLeft: 15,
            marginRight: 15
          }
        ]}
      >
        <View
          style={{
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center"
          }}
        >
          <View
            style={{
              width: "100%",
              //backgroundColor: "#BCA",
              //flexDirection: "row",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              marginTop: 0,
              marginBottom: 0,
              paddingBottom: 15,
              borderBottomWidth: 0,
              borderColor: "#C8C7CC"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 13, color: BLACK }
              ]}
            >
              {date_now}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 18,
                  color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                }
              ]}
            >
              {time_now}
            </Text>
          </View>
          <View
            style={{
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                }
              ]}
            >
              {/* {_check_in[this.state.languageIndex]} */}
              {_status_kas[this.state.languageIndex]} {status}
            </Text>

            <Button
              onPress={() => {
                //this.setState({ showDetail: true });
                if (this.state.dataRekap.length > 0) {
                  if (this.state.dataRekap[0].status === "open") {
                    this.calculateRekap();
                    this.openRekap();
                  } else {
                    this.createRekap();
                  }
                } else {
                  this.createRekap();
                }
              }}
              style={{
                padding: 10,
                width: "100%",
                alignItems: "center",
                backgroundColor:
                  this.state.clockIn !== "00:00" &&
                  this.state.clockOut === "00:00"
                    ? "#C84343"
                    : "#EEEEEE",
                marginTop: 5,
                borderRadius: 5
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 12,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  }
                ]}
              >
                {/* {_check_out[this.state.languageIndex]} */}
                {_rekap[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  createRekap() {
    const { userInfo } = this.state;
    const cashier_id = userInfo.id;
    let uri = `${BE_Rekap}`;
    console.log("uri create rekap ==> ", uri);

    console.log("cashier_id create rekap ==> ", cashier_id);
    console.log("time_open create rekap ==> ", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    console.log("time_open create rekap v2 ==> ", new Date());



    this.setState({ loading: true });
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        user_id: cashier_id,
        // time_open: moment(new Date()).toString()
        //time_open: 2021-12-21 14:07:43

      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson.data;
        console.log("CREATE RESPONSE ==> ", responseJson);

        let message = [];

        if (responseJson.statusCode === 201) {
          message.push(_berhasil_tambah[this.state.languageIndex]);

          this.setState({
            loading: false,
            showAlert: true,
            alertMessage: message,
            page: 1,
            selectedDataStatus: "open"
          });
          setTimeout(() => {
            this.getRekapList();
          }, 333);
        } else {
          message.push(_gagal[this.state.languageIndex]);
          this.setState({
            loading: false,
            showAlert: true,
            alertMessage: message
          });
        }

        //this.getRekapDetail(result.data);
        //alert(result.message);
        //this.resetPage();
      })
      .catch(_err => {
        console.log("ERR submitRekap ==> ", _err);
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
      rekapCard,
      rekapTotal,
      showPrintStruk,
      errorCashInOut
    } = this.state;
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        {this.renderPinModal()}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_kas[this.state.languageIndex]}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          hideLogin={true}
          rekap={true}
          rekapAction={() => {
            if (this.state.dataRekap.length > 0) {
              this.selectData(this.state.dataRekap[0], true);
            }
          }}
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
              this.setState({ page: 1 });
              setTimeout(() => {
                this.getRekapList();
              }, 333);
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}

        {formRekap ? (
          <MobileRekapKas
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.colorIndex}
            closeAction={() => this.closeRekap()}
            //submitAction={() => this.submitRekap()}
            submitAction={() =>
              this.setState({
                showPin: true,
                pin1: "",
                pin2: "",
                pin3: "",
                pin4: "",
                pin5: "",
                pin6: ""
              })
            }
            changeRekapTunai={text => this.changeRekapTunai(text)}
            changeRekapGoPay={text => this.changeRekapGoPay(text)}
            changeRekapCard={text => this.changeRekapCard(text)}
            changeRekapTotal={text => this.changeRekapTotal(text)}
            rekapTunai={rekapTunai}
            rekapGoPay={rekapGoPay}
            rekapTotal={rekapTotal}
            rekapCard={rekapCard}
            systemTunai={this.state.systemTunai}
            systemGoPay={this.state.systemGoPay}
            systemCard={this.state.systemCard}
            systemTotal={this.state.systemTotal}
            systemCashIn={this.state.systemCashIn}
            systemCashOut={this.state.systemCashOut}
            catatan={formCatatan}
            jumlah={formJumlah}
            type={formType}
          />
        ) : (
          <View />
        )}

        {showPrintStruk ? (
          <AlertCetakStruk
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.colorIndex}
            actions={() => {
              this.closePrintStruk();
            }}
          />
        ) : (
          <View />
        )}

        {addCashInOut ? (
          <MobileAddCashInOut
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

        <View style={[ss.mainContent, {}]}>
          <View style={[ss.leftSide]}>{this.renderHistoryLeftSide()}</View>
          {this.state.dataRekap.length === 0 ? this.renderNoData() : <View />}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showDetail}
            onRequestClose={() => {
              this.setState({ showDetail: false });
            }}
          >
            <View style={[ss.rightSide, { flex: 1 }]}>
              {this.renderDetailRightSide()}
            </View>
          </Modal>
        </View>
      </View>
    );
  }

  renderNoData() {
    return (
      <View
        style={{
          flex: 2,
          //height: 500,
          //backgroundColor: "#BCA",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 125,
            height: 125,
            borderRadius: 999,
            //backgroundColor: "#C4C4C4",
            marginRight: 20,
            //borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 20,
            //zIndex: 2,
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
}

const ss = StyleSheet.create({
  body: {
    backgroundColor: WHITE,
    flex: 1,
    flexDirection: "column"
  },
  mainContent: {
    flexDirection: "column",
    //padding: 15,
    paddingLeft: 0,
    flex: 1,
    justifyContent: "space-between"
    //height: '100%' ,
    //backgroundColor: "#995599"
  },
  leftSide: {
    width: "100%",
    marginTop: 0,
    flex: 1
  },
  rightSide: {
    width: "100%",
    marginTop: 0,
    backgroundColor: "#FFF",
    //elevation: 3,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)"
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
  pinNumber: {
    borderRadius: 5,
    borderColor: "#8A8A8F",
    padding: 10,
    width: "15%",
    borderWidth: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    elevation: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  }
});
