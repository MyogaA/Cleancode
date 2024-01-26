/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * BU untuk ambil data dr yang db lama
 */

import React, { Component } from "react";
import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  StatusBar,
  Button as ButtonDefault,
  FlatList,
  ImageDefault,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  BackHandler,
  //NetInfo
  LogBox
} from "react-native";

// LogBox.ignoreAllLogs(true);

import NetInfo from "@react-native-community/netinfo";

// import GestureRecognizer from "react-native-swipe-gestures";
import MainStyle from "../../Styles";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";
import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import PrinterFunctions from "../../Libraries/PrinterFunctions";

import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import TransactionNewName from "../../Components/TransactionNewName";

import Loading from "../../Components/MobileLoading";

import CustomAlert from "../../Components/MobileCustomAlert";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import FontAwesome from "react-native-vector-icons/FontAwesome";
//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Geolocation from "@react-native-community/geolocation";
// import Orientation from "react-native-orientation-locker";
// eslint-disable-next-line prettier/prettier
import ClearCart from "../../Components/MobileClearCart";

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

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
  GREY_700,
  MAIN_TEXT_COLOR_LIST
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";
import ColorFunctions from "../../Libraries/ColorFunctions";
import MenuFunctions from "../../Libraries/MenuFunctions";
import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";

//import Login from '../Account/login';

import {
  GetMenuFavAPI,
  GetCategoryMenuAPI,
  GetMenuByCategoryAPI,
  GetMenuAddonsAPI,
  SaveOrderAPI,
  UpdateOrderAPI,
  GetTableAPI,
  UpdateStatusOrderByIdAPI,
  GetMenuSearchFavAPI,
  GetMenuAllAPI,
  PayOrderAPI
} from "../../Constants";
import moment from "moment";

import {
  _cari,
  _alert_printer,
  _cancel,
  _next,
  _pilih,
  _qty_long,
  _qty_short,
  _catatan,
  _catatan_extra,
  _menu_favorit,
  _semua_menu,
  _cetak_dapur,
  _clear_cart,
  _cetak_bill,
  _order,
  _nama,
  _meja,
  _data_pelanggan,
  _berhasil_update,
  _gagal,
  _berhasil_tambah,
  _error_1,
  _error_2,
  _menu_favorit_short,
  _pajak,
  _service,
  _lanjut,
  _keranjang,
  _pesanan_baru,
  _simpan,
  _simpan_pesanan,
  _harga_custom,
  _pelanggan,
  _transaction_id,
  _no_table,
  _cashier,
  _sales_type
} from "../../Libraries/DictionaryHome";
import { _ok_alert } from "../../Libraries/DictionarySetting";
import { _sub_total } from "../../Libraries/DictionaryHistory";

export default class MobileHome extends Component {
  constructor(props) {
    super(props);
    this.arrLoc = [];
    this.state = {
      transactionId: "",
      showClearCartBackHandler: false,
      showClearCart: false,
      formItem: false,
      expand: false,
      showAlert: false,
      alertMessage: [],
      showFav: true,
      showFavList: true,
      showBill: false,
      show_order_id: false,
      footer_printer: "",
      customer_id: 0,
      booking_id: 0,
      order_id: null,
      formAction: "add",
      formIndex: 0,
      formSalesType: "Take-Away",
      salesTypeTax: 0.2,
      salesTypeValue: 0,
      newName: "",
      showNameForm: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      selectedProduct: { id: 0, name: "" },
      selectedQuantity: 1,
      selectedCatatan: "",
      productPrice: 25000,
      additionalProduct: [],
      additionalList: [],
      savedTableId: 0,
      tableLeft: 0,
      tableWidth: 0,
      tableTop: 0,
      newWidth: 0,
      newLeft: 0,
      newTop: 0,
      language: "",
      ready: true,
      loading: true,
      number: 1,
      currentLoc: null,
      refreshing: false,
      searchKey: "",
      selected: -1,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      currency: "IDR",
      showAll: false,
      activeCategory: 0,
      activeCategoryIndex: 0,
      subTotal: 0,
      selectedTable: this.props.selected_table
        ? this.props.selected_table
        : { id: 1, name: "Meja 1" },
      showAdditionalSalesType: false,
      selectedSalesType: this.props.sales_type
        ? this.props.sales_type
        : "Take-Away",
      showAdditionalTable: false,
      showNew: false,
      additionalSalesType: [
        {
          id: "Take-Away",
          name: "Take-Away"
        },
        {
          id: "Dine-In",
          name: "Dine-In"
        },
        {
          id: "Gojek/Grab",
          name: "Gojek/Grab"
        }
      ],
      additionalTable: [],
      dataBill: [],
      printer_kitchen: null,
      printer_main: null,
      dataCategory: [],
      categoryTotal: 0,
      dataMenu: [],
      dataOfflineMenu: [],
      dataOfflineAddons: [],

      dataMenuFav: [],
      action: "0",
      lastUpdate: moment(new Date()).format("2000-MM-DD HH:mm:ss"),
      timeCompare: moment(new Date()).format("YYYY-MM-DD 07:07:07"),
      import_cooldown: 300
    };
  }

  componentDidMount() {
    //this.newOrder();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    //console.log('Home Page Props ==> ', this.props);
    //console.log("Home Page colorIndex ==> ", this.props);
    //this.getCurrentLocation();

    //this.connectPrinter();

    if (this.props.checkIn) {
      this.newOrderCheckIn(false, false);
      this.setState({ action: "1" });
    }

    if (this.props.checkOut) {
      this.setState({
        //formItem: true
        showBill: true,
        action: "2"
      });
    }

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    LoginFunctions.LoginInformation(val => {
      //console.log("login info ==> ", val);
      this.setState({
        userInfo: val
        //additionalProduct: defaultProductSelection
      });
    });
    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    MenuFunctions.GetOrderID(val => {
      if (val) {
        console.log("Order ID ==> ", val);
        this.setState({ order_id: val });
      }
    });

    MenuFunctions.GetTableID(val => {
      if (val) {
        console.log("Table ID ==> ", val);
        this.setState({ savedTableId: val, selectedSalesType: "Dine-In" });
      }
    });

    MenuFunctions.GetCustomerID(val => {
      if (val) {
        console.log("customer_id ==> ", val);
        this.setState({ customer_id: val });
      }
    });

    MenuFunctions.GetBookingID(val => {
      if (val) {
        console.log("booking_id ==> ", val);
        this.setState({ booking_id: val });
      }
    });

    MenuFunctions.GetMenu(val => {
      if (val) {
        console.log("Data Bill ==> ", val);
        this.setState({ dataBill: val });
      }
    });

    let kode = "";

    if (this.state.customer_id) {
      kode =
        "" +
        //data.retail_id +
        //"/" +
        this.state.userInfo.gerai_id + //gerai id
        ":" +
        this.state.customer_id +
        ":" +
        moment(new Date()).format("YY/MM/DD:HH:mm:ss");
    } else {
      kode =
        "" +
        //data.retail_id +
        //"/" +
        this.state.userInfo.gerai_id + //gerai id
        ":" +
        moment(new Date()).format("YY/MM/DD:HH:mm:ss");
    }

    this.setState({ transactionId: kode });

    // save offline
    // const parameter_post_order = {
    //   order_id: 9,
    //   retail_id: 3,
    //   gerai_id: 3,
    //   time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    //   booking_id: 4,
    //   customer_id: 5,
    //   table_id: 6,
    //   cashier_id: 7,
    //   detail: 8
    // };

    let temp_save_order = [];

    // OfflineMenuFunctions.GetOrderMenu(val => {
    //   console.log("GetCategoryMenu ==> ", val);
    //   //this.setState({ lastUpdate: val });
    //   if (val) {
    //     temp_save_order = val;
    //     console.log("temp_save_order ==> ", temp_save_order);
    //     temp_save_order.push(parameter_post_order);
    //     console.log("temp_save_order_push==> ", temp_save_order);
    //     OfflineMenuFunctions.SaveOrderMenu(temp_save_order, x => {});
    //     OfflineMenuFunctions.GetOrderMenu(y => {
    //       console.log("GetCategoryMenu After Save ==> ", y);
    //       //this.setState({ lastUpdate: val });
    //     });
    //   } else {
    //     OfflineMenuFunctions.SaveOrderMenu([], val => {});
    //   }
    // });

    //if (temp_save_order.length === 0)
    //{

    //OfflineMenuFunctions.SaveOrderMenu(temp_save_order, val => {});

    // if (Dimensions.get("window").width > Dimensions.get("window").height) {
    //   alert("miring");
    // } else {
    //   alert("berdiri");
    // }

    //OfflineMenuFunctions.SaveOrderMenu([], val => {});

    NetInfo.fetch().then(state => {
      console.log("Connection", state);
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      if (state.isConnected) {
        this.getData();
        this.getDataCategory();
        this.getAddonsByMenu(1);
        this.getDataTable();
        this.saveOfflineData();

        OfflineMenuFunctions.GetLastUpdate(val => {
          console.log("Last Update ==> ", val);
          //this.setState({ lastUpdate: val });
          let time = null;

          if (val) {
            this.importData(val);
          } else {
            this.importData();
          }
        });
      } else {
        //offline Mode
        console.log("offline Mode");
        this.getDataOfflineMode();
      }
    });

    this.getPrinterData();
  }

  saveOfflineData() {
    OfflineMenuFunctions.GetOrderMenu(val => {
      //this.setState({ lastUpdate: val });
      let temp_val = val;
      let temp_val_original = val;

      console.log("GetOrderMenu ==> ", temp_val_original);

      if (val) {
        temp_val_original.map((v, i) => {
          //console.log("val[", i, "] ==> ", v);
          let order = v.order;
          let payment = v.payment;
          //payment.order_id = 6969;
          //payment.saved = true;

          let order_id = 0;
          if (order.order_id) {
            order_id = order.order_id;
          }

          if (order_id === 0) {
            fetch(SaveOrderAPI, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                //"Content-Type": "application/x-www-form-urlencoded"
              },
              body: JSON.stringify({
                retail_id: order.retail_id,
                gerai_id: order.gerai_id,
                time: order.time,
                booking_id: order.booking_id,
                customer_id: order.customer_id,
                table_id: order.table_id,
                cashier_id: order.cashier_id,
                detail: order.detail,
                kode: order.kode
              })
            })
              .then(response => response.json())
              .then(responseJson => {
                console.log("responseJson New ==> ", responseJson);
                let result = responseJson;

                if (result.status) {
                  let resultOrder = result.order;
                  const new_order_id = resultOrder.id;
                  payment.order_id = new_order_id;

                  //SAVE ORDER DONE GET ORDER ID THEN SAVE PAYMENT
                  fetch(PayOrderAPI, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                      //"Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: JSON.stringify({
                      order_id: new_order_id,
                      cashier_id: payment.cashier_id,
                      payment_type: payment.payment_type,
                      reference_id: payment.reference_id,
                      customer_id: payment.customer_id,
                      payment_subtotal: payment.payment_subtotal,
                      payment_discount: payment.payment_discount,
                      payment_tax: payment.payment_tax,
                      payment_total: payment.payment_total,
                      payment_amount: payment.payment_amount,
                      payment_change: payment.payment_change,
                      status: "done",
                      time: payment.time
                    })
                  })
                    .then(response2 => response2.json())
                    .then(responseJson2 => {
                      let result2 = responseJson2;
                      //let resultOrder = result.order;
                      //const order_id = resultOrder.id;
                      console.log("PAYMENT RESPONSE ==> ", responseJson2);
                    })
                    .catch(_err => {
                      console.log("ERR ==> ", _err);
                    });
                }
              });

            if (i === temp_val_original.length) {
              OfflineMenuFunctions.SaveOrderMenu([], val => {});
            }
          }

          //console.log("order[", i, "] ==> ", order);
          //console.log("payment[", i, "] ==> ", payment);
          //console.log("new val before ==> ", temp_val);
          //temp_val.splice(i, 1);
          //console.log("new val after ==> ", temp_val);
        });
        //temp_save_order = val;

        // console.log("temp_save_order ==> ", temp_save_order);
        // temp_save_order.push(parameter_post_order);
        // console.log("temp_save_order_push==> ", temp_save_order);
        // OfflineMenuFunctions.SaveOrderMenu(temp_save_order, x => {});
        // OfflineMenuFunctions.GetOrderMenu(y => {
        //   console.log("GetCategoryMenu After Save ==> ", y);
        //   //this.setState({ lastUpdate: val });
        // });
      } else {
        OfflineMenuFunctions.SaveOrderMenu([], val => {});
      }
    });
  }

  getDataOfflineMode() {
    OfflineMenuFunctions.GetCategoryMenu(val => {
      console.log("GetCategoryMenu ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        this.setState({
          dataCategory: val,
          categoryTotal: val.length
        });
      }
    });

    OfflineMenuFunctions.GetAllMenu(val => {
      console.log("GetAllMenu ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        this.setState({
          dataOfflineMenu: val
        });
      }
    });

    OfflineMenuFunctions.GetFavMenu(val => {
      console.log("GetFavMenu ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        this.setState({
          dataMenuFav: val
        });
      }
    });

    OfflineMenuFunctions.GetAddonsMenu(val => {
      console.log("GetAddonsMenu ==> ", val);
      //this.setState({ lastUpdate: val });
      if (val) {
        this.setState({
          dataOfflineAddons: val
        });
      }
    });
  }

  importData(time = this.state.lastUpdate) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let timeDifference = moment(time_now).diff(moment(time));
    let timeDifferenceSecond = Math.round(timeDifference / 1000);
    let timeDifferenceMinute = Math.round(timeDifferenceSecond / 60);
    let timeDifferenceHour = Math.round(timeDifferenceSecond / 3600);

    console.log("timeDifferenceSecond ==> ", timeDifferenceSecond);
    if (timeDifferenceSecond > this.state.import_cooldown) {
      const gerai_id = this.state.userInfo.gerai_id;
      let uri = `${GetMenuAllAPI}?gerai_id=${gerai_id}&search=&page=1`;

      fetch(uri, {
        method: "GET"
      })
        .then(response => response.json())
        .then(responseJson => {
          // let result = responseJson;
          // let resultData = result.data;

          console.log("Import Data ==> ", responseJson);

          let temp_category = responseJson.category.data;
          let temp_menu = responseJson.data.data;
          let temp_favourite = responseJson.data_favourite.data;

          let temp_addons = responseJson.data_addons;

          OfflineMenuFunctions.SaveAddons(temp_addons, val => {});

          OfflineMenuFunctions.SaveAllMenu(temp_menu, val => {});

          OfflineMenuFunctions.SaveCategoryMenu(temp_category, val => {});

          OfflineMenuFunctions.SaveFavMenu(temp_menu, val => {});

          OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});

          // this.setState({
          //   dataMenuFav: resultData.data,

          //   loading: false
          // });
          //console.log('new data ==>', JSON.stringify(data))
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });
    }
  }

  onBackPress = () => {
    //Actions.pop();
    //this.props.onBackPress();
    if (this.state.dataBill.length > 0) {
      this.setState({ showClearCartBackHandler: true });
    } else {
      //clear cart
      this.newOrder(true, true);
      Actions.pop();
    }
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  componentDidUpdate(nextProps) {
    //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);
    if (this.props !== nextProps) {
      //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);

      if (this.props.checkIn) {
        this.newOrderCheckIn(false, false);
      }

      if (this.props.checkOut) {
        this.setState({
          //formItem: true
          showBill: true
        });
      }

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

      MenuFunctions.GetOrderID(val => {
        if (val) {
          console.log("Order ID ==> ", val);
          this.setState({ order_id: val });
        } else {
          this.setState({ order_id: null });
        }
      });

      MenuFunctions.GetTableID(val => {
        if (val) {
          console.log("Table ID ==> ", val);
          this.setState({ savedTableId: val, selectedSalesType: "Dine-In" });
        } else {
          this.setState({ savedTableId: 0, selectedSalesType: "Take-Away" });
        }
      });

      MenuFunctions.GetCustomerID(val => {
        if (val) {
          console.log("customer_id ==> ", val);
          this.setState({ customer_id: val });
        } else {
          this.setState({ customer_id: 0 });
        }
      });

      MenuFunctions.GetBookingID(val => {
        if (val) {
          console.log("booking_id ==> ", val);
          this.setState({ booking_id: val });
        } else {
          this.setState({ booking_id: 0 });
        }
      });

      MenuFunctions.GetMenu(val => {
        if (val) {
          console.log("Data Bill ==> ", val);
          this.setState({ dataBill: val });
        } else {
          this.setState({ dataBill: [] });
        }
      });

      this.getData();
      this.getDataCategory();
      this.getAddonsByMenu(1);
      this.getDataTable();
      this.getPrinterData();
    }
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

  async getPrinterData() {
    PrinterFunctions.GetKitchenPrinter(val => {
      if (val) {
        console.log("Printer Kitchen Index ==> ", val);
        this.setState({ printer_kitchen: val });
        //this.connectPrinter(val.address);
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
        console.log("Main Kitchen Index ==> ", val);
        this.setState({ printer_main: val });
        this.connectPrinter(val.address);
      } else {
        //alert(_alert_printer[this.state.languageIndex]);
        // Actions.Setting({
        //   userInfo: this.state.userInfo,
        //   colorIndex: this.state.colorIndex
        // });
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

  newOrder(showAlert = false, cancel = false) {
    this.setState({ loading: true });
    this.cancelOrder(
      showAlert,
      cancel,
      this.state.order_id,
      this.state.savedTableId
    );
    MenuFunctions.ClearNewMenuAll(val => {});

    this.setState({
      selectedSalesType: "Take-Away",
      dataBill: [],
      //selectedTable: this.state.additionalTable[0],
      savedTableId: 0,
      showAdditionalSalesType: false,
      showAdditionalTable: false,
      showNew: false,
      action: "0"
    });

    this.getData();
    this.getDataCategory();
    this.getAddonsByMenu(1);
    this.getDataTable();
  }

  newOrderCheckIn(showAlert = false, cancel = false) {
    this.setState({ loading: true });
    this.cancelOrder(
      showAlert,
      cancel,
      this.state.order_id,
      this.state.savedTableId
    );
    MenuFunctions.ClearNewMenuCheckIn(val => {});

    this.setState({
      selectedSalesType: "Take-Away",
      dataBill: [],
      //selectedTable: this.state.additionalTable[0],
      //savedTableId: 0,
      showAdditionalSalesType: false,
      showAdditionalTable: false,
      showNew: false
    });

    this.getData();
    this.getDataCategory();
    this.getAddonsByMenu(1);
    this.getDataTable();
  }

  cetakBill(type) {
    const { dataBill } = this.state;
    if (dataBill.length > 0) {
      this.printAction(type);
    }
  }

  cancelOrder(
    showAlert = false,
    cancel = false,
    order_id = null,
    table_id = 0
  ) {
    let valid = false;

    if (cancel === false && table_id === 0) {
      //jika dia take out maka order auto cancel
      valid = true;
    } else if (cancel === true) {
      // jika emang mau cancel mau table ada pun pasti cancel
      valid = false;
    }

    if (order_id && valid) {
      // has order_id
      fetch(UpdateStatusOrderByIdAPI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          order_id: order_id,
          status: "cancel"
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("responseJson cancel ORder ==> ", responseJson);
          let result = responseJson;
          MenuFunctions.ClearNewMenuAll(val => {});

          if (showAlert) {
            let message = [];
            // message.push(responseJson.message);
            if (result.status) {
              message.push(_berhasil_update[this.state.languageIndex]);
            } else {
              message.push(_gagal[this.state.languageIndex]);
            }
            this.setState({
              loading: false,
              showAlert: true,
              alertMessage: message
            });
          }

          if (result.status) {
            this.setState({
              order_id: null
            });
          }
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
          this.setState({ loading: false });
        });
    }
  }

  getDataTable() {
    const { savedTableId } = this.state;
    const gerai_id = this.state.userInfo.gerai_id;
    let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=`;

    console.log("getDATATABLE uri ==> ", uri);

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;

        let finalResult = [];
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

          if (v.status === 1) {
            finalResult.push(temp);
          } else if (this.state.savedTableId === v.id) {
            finalResult.push(temp);
            selectedTableData = temp;
          }
        });

        console.log("getDATATABLE finalResult ==> ", finalResult);

        if (finalResult.length > 0) {
          this.setState({
            additionalTable: finalResult,
            selectedTable: selectedTableData
              ? selectedTableData
              : finalResult[0]
          });
        } else {
          this.setState({
            additionalTable: finalResult,
            selectedTable: { id: 0, name: "No Available Table" }
          });
        }

        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getData(search = this.state.searchKey) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    const gerai_id = this.state.userInfo.gerai_id;
    let uri = `${GetMenuFavAPI}?gerai_id=${gerai_id}&search=&page=1`;

    NetInfo.fetch().then(state => {
      // console.log("Connection", state);
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);

      if (state.isConnected) {
        fetch(uri, {
          method: "GET"
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result.data;

            this.setState({
              dataMenuFav: resultData.data,
              activeCategory: 0,
              activeCategoryIndex: 0,
              loading: false
            });
            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {});
      } else {
        OfflineMenuFunctions.GetFavMenu(val => {
          console.log("GetFavMenu Offline ==> ", val);
          //this.setState({ lastUpdate: val });
          if (val) {
            this.setState({
              dataMenuFav: val,
              activeCategory: 0,
              activeCategoryIndex: 0,

              loading: false
            });
          }
        });
      }
    });

    // NetInfo.fetch().then(state => {
    //   if (state.isConnected) {
    //   } else {
    //   }
    // });
  }

  getDataCategory(search = this.state.searchKey) {
    const gerai_id = this.state.userInfo.gerai_id;
    let uri = `${GetCategoryMenuAPI}?gerai_id=${gerai_id}&search=&page=1`;

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET"
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result.data;
            console.log("getData Category ==> ", result);

            this.setState({
              dataCategory: resultData.data,
              categoryTotal: resultData.total
            });
            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {});
      } else {
        OfflineMenuFunctions.GetCategoryMenu(val => {
          console.log("GetCategoryMenu Offline ==> ", val);
          //this.setState({ lastUpdate: val });
          if (val) {
            this.setState({
              dataCategory: val,
              categoryTotal: val.length
            });
          }
        });
      }
    });
  }

  getMenuByCategory(
    search = this.state.searchKey,
    activeCategory = this.state.activeCategory,
    activeCategoryIndex = this.state.activeCategoryIndex
  ) {
    const gerai_id = this.state.userInfo.gerai_id;
    let uri = `${GetMenuByCategoryAPI}?gerai_id=${gerai_id}&category_id=${activeCategory}&search=&page=1`;
    this.setState({
      loading: true
    });

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET"
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result.data;
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this.setState({
              dataMenuFav: resultData.data,
              dataMenu: resultData.data,
              activeCategory: activeCategory,
              activeCategoryIndex: activeCategoryIndex,
              loading: false
            });
            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {});
      } else {
        console.log("getMenuByCategory Offline");
        const all_menu = this.state.dataOfflineMenu;

        let temp_menu = [];

        all_menu.map((v, i) => {
          if (v.category_id.toString() === activeCategory.toString()) {
            //console.log('is Single ==> ', v.options[0]);
            temp_menu.push(v);
          }
        });

        // console.log("getMenuByCategory Offline ==> ", all_menu);

        // console.log("getMenuByCategory Offline ==> ", temp_menu);
        this.setState({
          dataMenuFav: temp_menu,
          dataMenu: temp_menu,
          activeCategory: activeCategory,
          activeCategoryIndex: activeCategoryIndex,
          loading: false
        });
      }
    });
  }

  getAddonsByMenu(id = this.state.selectedProduct.id, action = "add") {
    //id = 1;
    let uri = `${GetMenuAddonsAPI}?id=${id}`;

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET"
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result.data;
            //console.log("getData Addons ==> ", result);
            let defaultProductSelection = [];
            if (resultData.length > 0) {
              resultData.map((v, i) => {
                if (v.type === "single") {
                  //console.log('is Single ==> ', v.options[0]);

                  let firstData = v.options[0];
                  let temp = {
                    id: firstData.id,
                    name: firstData.name,
                    price: firstData.price,
                    //available: firstData.available,
                    parentId: v.id
                  };
                  defaultProductSelection.push(temp);
                }
              });
            }

            if (action === "add") {
              this.setState({
                additionalList: resultData,
                additionalProduct: defaultProductSelection,
                loading: false
              });
            } else {
              this.setState({
                additionalList: resultData,
                loading: false
              });
            }

            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {
            console.log("ERR ==> ", _err);
          });
      } else {
        const all_addons = this.state.dataOfflineAddons;

        console.log("Get Addons Offline ==> ", all_addons);
        let temp_addons = [];

        all_addons.map((val, index) => {
          //console.log("Get Addons Offline v ==> ", v);

          val.map((v, i) => {
            if (v.menu_id.toString() === id.toString()) {
              temp_addons.push(v);
            }
          });
          // if (v.menu_id.toString() === id.toString()) {
          //   temp_addons.push(v);
          // }
        });

        //console.log("Get Addons temp ==> ", temp_addons);

        let defaultProductSelection = [];
        temp_addons.map((v, i) => {
          if (v.type === "single") {
            //console.log('is Single ==> ', v.options[0]);

            let firstData = v.options[0];
            let temp = {
              id: firstData.id,
              name: firstData.name,
              price: firstData.price,
              //available: firstData.available,
              parentId: v.id
            };
            defaultProductSelection.push(temp);
          }
        });

        if (action === "add") {
          this.setState({
            additionalList: temp_addons,
            additionalProduct: defaultProductSelection,
            loading: false
          });
        } else {
          this.setState({
            additionalList: temp_addons,
            loading: false
          });
        }

        // this.setState({
        //   additionalList: temp_addons,
        //   loading: false
        // });
      }
    });
  }

  selectDefaultSelection() {
    let defaultProductSelection = [];
    this.state.additionalList.map((v, i) => {
      if (v.type === "single") {
        //console.log('is Single ==> ', v.options[0]);

        let firstData = v.options[0];
        let temp = {
          id: firstData.id,
          name: firstData.name,
          price: firstData.price,
          //available: firstData.available,
          parentId: v.id
        };
        defaultProductSelection.push(temp);
      }
    });
    this.setState({ additionalProduct: defaultProductSelection });
  }

  cancelFormItem() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (this.state.formAction === "edit") {
      MenuFunctions.GetMenu(val => {
        if (val) {
          console.log("Data Bill ==> ", val);
          this.setState({ dataBill: val, formItem: false, showBill: true });
        }
      });
    } else {
      this.setState({ formItem: false });
    }
  }

  addNewName() {
    this.setState({ newName: "", showNameForm: true });
  }

  getCurrentLocation2() {
    Geolocation.getCurrentPosition(data => {
      let coords = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      };
      //console.log('Location Coords ==> ', coords);
      this.setState({ currentLoc: coords, ready: true });
    });
  }

  getCurrentLocation() {
    //untuk emulator
    let coords = {
      latitude: -6.1402746,
      longitude: 106.8520526
    };
    this.setState({ currentLoc: coords, ready: true });
  }

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        //this._getPaketPromo();
        //console.log("Refreshing");
        this.setState({
          refreshing: false
        });
      }
    );
  };

  deleteBill(index) {
    let { dataBill } = this.state;

    console.log("index ", index);
    console.log("before delete ", dataBill);

    this.setState({ loading: true });
    setTimeout(() => {
      dataBill.splice(index, 1);
      console.log("after delete ", dataBill);
      let tempData = [];
      MenuFunctions.SaveMenu(dataBill, val => {
        //console.log("Sukses Delete");
        //tempData = val;
        console.log("delete ==> ", val);
        this.setState({ dataBill: val, showBill: false });

        this.setState({ showBill: true, loading: false });
      });
    }, 100);

    // setTimeout(() => {
    //   this.setState({ showBill: true, loading: false });
    // }, 150);
  }

  modifyBillChangeGojek(type, oldtype) {
    let { dataBill, salesTypeTax } = this.state;

    if (type === "Gojek/Grab") {
      console.log("change to GOJEK ==> ", dataBill);
      dataBill.map((v, i) => {
        let tempData = dataBill[i];
        console.log("tempData ==> ", tempData);
        let salesTypeValue = v.salesTypeValue;
        let salesType = v.salesType;
        if (salesType !== "Gojek/Grab") {
          tempData.salesType = type;
          tempData.salesTypeValue = v.price * salesTypeTax;
        }
        dataBill[i] = tempData;
      });

      MenuFunctions.SaveMenu(dataBill, val => {});

      this.setState({
        //selectedTable: items.name,
        dataBill: dataBill,
        selectedSalesType: type,
        showAdditionalSalesType: false
      });
    } else if (type !== "Gojek/Grab" && oldtype === "Gojek/Grab") {
      console.log("change to Non GOJEK dari Gojek ==> ", dataBill);

      dataBill.map((v, i) => {
        let tempData = dataBill[i];
        console.log("tempData ==> ", tempData);
        let salesTypeValue = v.salesTypeValue;
        let salesType = v.salesType;
        if (salesType === "Gojek/Grab") {
          tempData.salesType = type;
          tempData.salesTypeValue = 0;
        }
        dataBill[i] = tempData;
      });
      MenuFunctions.SaveMenu(dataBill, val => {});

      this.setState({
        //selectedTable: items.name,
        dataBill: dataBill,
        selectedSalesType: type,
        showAdditionalSalesType: false
      });
    } else if (type === oldtype) {
      //do nothing
      console.log("change to Same ==> ", dataBill);

      //MenuFunctions.SaveMenu(dataBill, val => {});
      this.setState({
        //selectedTable: items.name,
        //dataBill: dataBill,
        selectedSalesType: type,
        showAdditionalSalesType: false
      });
    } else {
      //MenuFunctions.SaveMenu(dataBill, val => {});
      console.log("change to Else ==> ", type);
      console.log("from ==> ", oldtype);

      dataBill.map((v, i) => {
        let tempData = dataBill[i];
        console.log("tempData ==> ", tempData);
        tempData.salesType = type;
        tempData.salesTypeValue = 0;
        dataBill[i] = tempData;
      });

      //console.log("databillNew ==> ", dataBill);

      MenuFunctions.SaveMenu(dataBill, val => {});

      this.setState({
        //selectedTable: items.name,
        dataBill: dataBill,
        selectedSalesType: type,
        showAdditionalSalesType: false
      });
    }
  }

  addOrder() {
    const {
      productPrice,
      selectedQuantity,
      selectedProduct,
      dataBill,
      additionalProduct,
      selectedCatatan,
      formIndex,
      formAction,
      salesTypeTax,
      salesTypeValue,
      formSalesType
    } = this.state;

    let showBill = false;

    // console.log("productPrice ==> ", productPrice);
    // console.log("selectedQuantity ==> ", selectedQuantity);
    // console.log("selectedProduct ==> ", selectedProduct);
    // console.log("dataBill.length ==> ", dataBill.length + 1);
    // console.log("additionalProduct ==> ", additionalProduct);

    let status = 1;
    if (formAction === "edit") {
      status = dataBill[formIndex].status;
      showBill = true;
    }

    let dataAdd = {
      id: dataBill.length + 1,
      product: selectedProduct,
      name: selectedProduct.name,
      qty: selectedQuantity,
      price: productPrice,
      total: productPrice * selectedQuantity,
      notes: selectedCatatan,
      detail: additionalProduct,
      salesType: formSalesType,
      salesTypeValue: salesTypeValue,
      status: status
    };

    let productId = selectedProduct.id;

    let detailString = "";
    additionalProduct.map((items, itemIndex) => {
      if (detailString === "") {
        detailString = items.name;
      } else {
        detailString = detailString + ", " + items.name;
      }
    });

    console.log("detailString ==> ", detailString);

    let qtyOld = 0;

    if (formAction === "add") {
      let sameIdIndex = -1;

      this.state.dataBill.map((v, i) => {
        let detailStringCompare = "";

        let sameDetail = false;
        let sameNotes = false;
        let sameId = false;
        let sameSalesType = false;

        v.detail.map((items, itemIndex) => {
          if (detailStringCompare === "") {
            detailStringCompare = items.name;
          } else {
            detailStringCompare = detailStringCompare + ", " + items.name;
          }
          console.log("index ==> ", i);

          console.log("detailStringCompare ==> ", detailStringCompare);
        });
        if (detailStringCompare === detailString) {
          sameDetail = true;
        }
        if (v.notes === selectedCatatan) {
          sameNotes = true;
        }
        if (v.product.id === productId) {
          sameId = true;
        }
        if (v.salesType === formSalesType) {
          sameSalesType = true;
        }

        if (
          sameNotes === true &&
          sameDetail === true &&
          sameId === true &&
          sameSalesType === true
        ) {
          sameIdIndex = i;
          qtyOld = v.qty;
        }
      });

      if (sameIdIndex === -1) {
        //jika beda maka akan seperti biasa
        dataBill.push(dataAdd);
        MenuFunctions.SaveMenu(dataBill, val => {
          console.log("Sukses Add");
        });
      } else {
        dataAdd.qty = qtyOld + selectedQuantity;
        dataBill[sameIdIndex] = dataAdd;
        MenuFunctions.SaveMenu(dataBill, val => {
          console.log("Sukses Add");
        });
      }

      this.setState({
        dataBill: dataBill,
        formItem: false
      });
    } else if (formAction === "edit") {
      dataBill[formIndex] = dataAdd;
      MenuFunctions.SaveMenu(dataBill, val => {
        console.log("Sukses Add");
      });

      this.setState({
        dataBill: dataBill,
        formItem: false,
        showBill: showBill
      });
    }

    // const exampleData = {
    //   id: 1,
    //   name: "Banana Smoothies",
    //   qty: 2,
    //   price: 50000,
    //   total: 70000,
    //   detail: [
    //     {
    //       id: 1,
    //       name: "Less Ice"
    //     },
    //     {
    //       id: 2,
    //       name: "Less Sugar"
    //     }
    //   ]
    // };
  }

  checkOutAction(action = "") {
    let order_id = this.state.order_id;

    console.log("checkOutAction ==> ", order_id);
    if (order_id === null) {
      console.log("checkout new");
      this.checkOutNew();
    } else {
      console.log("checkout update");
      this.checkOutUpdate(action);
    }
  }

  checkOutNew() {
    const {
      dataBill,
      userInfo,
      selectedSalesType,
      selectedTable,
      order_id,
      savedTableId
    } = this.state;
    this.setState({ loading: true });
    let table_id = 0;
    let messageError = [];

    console.log("Dine-In ==> ", selectedTable);
    if (selectedSalesType === "Dine-In") {
      table_id = selectedTable.id;
      if (table_id === 0) {
        //messageError.push("Tidak ada meja yang tersedia");

        messageError.push(_error_1[this.state.languageIndex]);
      }
    } else {
      table_id = 0;
    }

    let kode = this.state.transactionId;

    // if (this.state.customer_id) {
    //   kode =
    //     "" +
    //     //data.retail_id +
    //     //"/" +
    //     userInfo.gerai_id + //gerai id
    //     ":" +
    //     this.state.customer_id +
    //     ":" +
    //     moment(new Date()).format("YY/MM/DD:HH:mm:ss");
    // } else {
    //   kode =
    //     "" +
    //     //data.retail_id +
    //     //"/" +
    //     userInfo.gerai_id + //gerai id
    //     ":" +
    //     moment(new Date()).format("YY/MM/DD:HH:mm:ss");
    // }

    console.log(
      "Body: ==> ",
      JSON.stringify({
        retail_id: userInfo.retail_id,
        gerai_id: userInfo.gerai_id,
        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        booking_id: this.state.booking_id,
        customer_id: this.state.customer_id,
        table_id: table_id,
        cashier_id: userInfo.id,
        detail: dataBill,
        kode: kode
      })
    );

    const data = JSON.stringify({
      retail_id: userInfo.retail_id,
      gerai_id: userInfo.gerai_id,
      time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      booking_id: this.state.booking_id,
      customer_id: this.state.customer_id,
      table_id: table_id,
      cashier_id: userInfo.id,
      detail: dataBill,
      kode: kode
    });

    console.log("data New ==> ", data);

    // console.log(
    //   "Check Out Action ==> ",
    //   JSON.stringify({
    //     id: table_id,
    //     detail: dataBill
    //   })
    // );
    //console.log("user INFO ==> ", userInfo);

    if (dataBill.length === 0) {
      //messageError.push("Pesanan tidak boleh kosong");
      messageError.push(_error_2[this.state.languageIndex]);
    }

    if (messageError.length === 0) {
      NetInfo.fetch().then(state => {
        //debug offline
        if (state.isConnected) {
          fetch(SaveOrderAPI, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
              //"Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
              retail_id: userInfo.retail_id,
              gerai_id: userInfo.gerai_id,
              time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              booking_id: this.state.booking_id,
              customer_id: this.state.customer_id,
              table_id: table_id,
              cashier_id: userInfo.id,
              detail: dataBill,
              kode: kode
            })
          })
            .then(response => response.json())
            .then(responseJson => {
              console.log("responseJson New ==> ", responseJson);
              let result = responseJson;
              if (result.status) {
                let resultOrder = result.order;
                const order_id = resultOrder.id;
                MenuFunctions.SaveOrderID(order_id, val => {
                  console.log("Success");
                });
                //console.log('new data ==>', JSON.stringify(data))
                this.setState({ loading: false });

                if (table_id === 0) {
                  Actions.MobileBayar({
                    orderId: order_id,
                    dataOrder: resultOrder,
                    dataBill: dataBill,
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex,
                    selectedTable: this.state.selectedTable,
                    languageIndex: this.state.languageIndex
                  });
                  this.setState({
                    loading: false,
                    showBill: false
                  });
                } else {
                  let message = [];

                  message.push(_berhasil_tambah[this.state.languageIndex]);

                  //message.push(result.message);
                  this.setState({
                    loading: false,
                    showAlert: true,
                    alertMessage: message
                  });
                  this.newOrder();
                }
              } else {
                let message = [];
                //message.push(result.message);

                message.push(_gagal[this.state.languageIndex]);

                this.setState({
                  loading: false,
                  showAlert: true,
                  alertMessage: message
                });
                // alert(result.message);
              }
            })
            .catch(_err => {
              console.log("ERR ==> ", _err);
              this.setState({ loading: false });
            });
        } else {
          //checkout New
          let subTotal = 0;
          let totalQty = 0;
          dataBill.map((v, i) => {
            totalQty = totalQty + v.qty;
            subTotal = subTotal + v.qty * v.price;
            subTotal = subTotal + v.qty * v.salesTypeValue;
          });

          const result_order_offline = {
            additional_table: "0",
            booking_id: this.state.booking_id,
            cashier_id: userInfo.id,
            retail_id: userInfo.retail_id,
            gerai_id: userInfo.gerai_id,
            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            created_by: null,
            customer_id: 0,
            deleted_at: null,
            id: order_id,
            notes: this.state.transactionId,
            payment_id: "0",
            status: "new",
            table_id: savedTableId,
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            time_out: null,
            total_payment: Math.ceil(subTotal * 1.15),
            total_qty: totalQty,
            transaction_id: "0",
            update_by: null,
            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          };

          Actions.MobileBayar({
            orderId: order_id,
            dataOrder: result_order_offline,
            dataBill: dataBill,
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            selectedTable: this.state.selectedTable,
            languageIndex: this.state.languageIndex
          });

          this.setState({
            loading: false,
            showBill: false
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        showAlert: true,
        alertMessage: messageError
      });
    }
  }

  checkOutUpdate(action = "") {
    const { dataBill, userInfo, order_id, savedTableId } = this.state;
    this.setState({ loading: true });
    //const table_id = savedTableId;
    console.log(
      "Check Out Update Action ==> ",
      JSON.stringify({
        order_id: order_id,
        retail_id: userInfo.retail_id,
        gerai_id: userInfo.gerai_id,
        time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        booking_id: this.state.booking_id,
        customer_id: this.state.customer_id,
        table_id: savedTableId,
        cashier_id: userInfo.id,
        detail: dataBill
      })
    );
    //console.log("user INFO ==> ", userInfo);
    let messageError = [];
    if (dataBill.length === 0) {
      //messageError.push("Pesanan tidak boleh kosong");
      messageError.push(_error_2[this.state.languageIndex]);
    }

    if (messageError.length === 0) {
      NetInfo.fetch().then(state => {
        //debug offline
        if (state.isConnected) {
          fetch(UpdateOrderAPI, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
              //"Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
              order_id: order_id,
              retail_id: userInfo.retail_id,
              gerai_id: userInfo.gerai_id,
              time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              booking_id: this.state.booking_id,
              customer_id: this.state.customer_id,
              table_id: savedTableId,
              cashier_id: userInfo.id,
              detail: dataBill
            })
          })
            .then(response => response.json())
            .then(responseJson => {
              console.log("responseJson Update ==> ", responseJson);
              let result = responseJson;
              let resultOrder = result.order;
              //console.log('new data ==>', JSON.stringify(data))
              this.setState({ loading: false });
              if (action === "") {
                Actions.MobileBayar({
                  orderId: order_id,
                  dataOrder: resultOrder,
                  dataBill: dataBill,
                  userInfo: this.state.userInfo,
                  colorIndex: this.state.colorIndex,
                  selectedTable: this.state.selectedTable,
                  languageIndex: this.state.languageIndex
                });
                this.setState({
                  loading: false,
                  showBill: false
                });
              } else {
                let message = [];

                //message.push(responseJson.message);

                if (result.status) {
                  message.push(_berhasil_update[this.state.languageIndex]);
                } else {
                  message.push(_gagal[this.state.languageIndex]);
                }

                this.setState({
                  loading: false,
                  showAlert: true,
                  alertMessage: message
                });
              }
            })
            .catch(_err => {
              console.log("ERR ==> ", _err);
            });
        } else {
          let subTotal = 0;
          let totalQty = 0;
          dataBill.map((v, i) => {
            totalQty = totalQty + v.qty;
            subTotal = subTotal + v.qty * v.price;
            subTotal = subTotal + v.qty * v.salesTypeValue;
          });

          const result_order_offline = {
            additional_table: "0",
            booking_id: this.state.booking_id,
            cashier_id: userInfo.id,
            retail_id: userInfo.retail_id,
            gerai_id: userInfo.gerai_id,
            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            created_by: null,
            customer_id: 0,
            deleted_at: null,
            id: order_id,
            notes: this.state.transactionId,
            payment_id: "0",
            status: "new",
            table_id: savedTableId,
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            time_out: null,
            total_payment: Math.ceil(subTotal * 1.15),
            total_qty: totalQty,
            transaction_id: "0",
            update_by: null,
            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          };

          Actions.MobileBayar({
            orderId: order_id,
            dataOrder: result_order_offline,
            dataBill: dataBill,
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            selectedTable: this.state.selectedTable,
            languageIndex: this.state.languageIndex
          });
          this.setState({
            loading: false,
            showBill: false
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        showAlert: true,
        alertMessage: messageError
      });
    }
  }

  showFormItem(product, price, action = "add") {
    this.setState({ loading: true });
    //let defaultProductSelection = [];
    // this.state.additionalList.map((v, i) => {
    //   if (v.type === "single") {
    //     //console.log('is Single ==> ', v.options[0]);

    //     let firstData = v.options[0];
    //     let temp = {
    //       id: firstData.id,
    //       name: firstData.name,
    //       price: firstData.price,
    //       //available: firstData.available,
    //       parentId: v.id
    //     };
    //     defaultProductSelection.push(temp);
    //   }
    // });
    this.getAddonsByMenu(product.id);

    this.setState({
      formItem: true,
      selectedProduct: product,
      productPrice: price,
      formAction: action,
      selectedQuantity: 1,
      selectedCatatan: "",
      formSalesType: this.state.selectedSalesType

      //additionalProduct: defaultProductSelection
    });
  }

  changeQty(index, val = 1) {
    let { dataBill } = this.state;
    let tempData = dataBill[index];
    tempData.qty = tempData.qty + val;
    dataBill[index] = tempData;

    if (tempData.qty > 0) {
      MenuFunctions.SaveMenu(dataBill, val => {
        console.log("Sukses Change QTY");
      });
      this.setState({ dataBill: dataBill });
    } else {
      this.deleteBill(index);
    }
  }

  changeQtyProduct(val = 1) {
    let { selectedQuantity } = this.state;
    let newQty = selectedQuantity + val;
    if (newQty > 0) {
      this.setState({ selectedQuantity: newQty });
    }
  }

  _renderFooter() {
    return <View style={{ height: 50 }} />;
  }

  handleLoadMore() {}

  renderKategoriTop(data, index) {
    //console.log("renderKategoriTop ==> ", data);

    const { showFilter } = this.state;

    return (
      <Button
        onPress={() => {
          this.getMenuByCategory("", data.id);
          // LayoutAnimation.configureNext(
          //   LayoutAnimation.Presets.easeInEaseOut
          // );
          //this.changeDateToday();
        }}
        style={{
          marginTop: 0,
          //width: "100%",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
          paddingBottom:
            this.state.activeCategory === data.id && !showFilter ? 5 : 10,
          borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
          borderBottomWidth:
            this.state.activeCategory === data.id && !showFilter ? 5 : 0
          //alignItems: 'center',
        }}
      >
        <Text
          style={[
            MainStyle.robotoNormalBold,
            {
              fontSize: 12,
              color:
                this.state.activeCategory === data.id && !showFilter
                  ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  : BLACK
            }
          ]}
        >
          {data.name}
        </Text>
      </Button>
    );
  }

  searchMenu(searchKey = this.state.searchKey) {
    const { dataBill, userInfo, order_id, savedTableId } = this.state;
    const gerai_id = userInfo.gerai_id;
    const uri = `${GetMenuSearchFavAPI}?gerai_id=${gerai_id}&search=${searchKey}&page=1`;

    this.setState({ loading: true, searchMode: true });
    //console.log("GET searchMenu URI ==>", uri);

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("GET searchMenu responseJson ==>", responseJson);
        const result = responseJson;
        if (result.status) {
          this.setState({
            dataMenuSearch: result.data.data,
            dataMenuFav: result.data.data,
            dataMenu: result.data.data,
            ready: true,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    // this.getMenuByCategory();
    // this.getData();
  }

  downButtonHandler = new_index => {
    let activeCategory = new_index;

    const { categoryTotal } = this.state;

    let x_pos = 0;

    console.log("downButtonHandler new_index ==> ", new_index);
    console.log("downButtonHandler x_pos ==> ", x_pos);

    if (activeCategory === categoryTotal) {
      activeCategory = activeCategory - 1;
    }

    x_pos = this.arrLoc[activeCategory];

    if (activeCategory === 0) {
      activeCategory = 0;
      x_pos = 0;
      //alert("back to fav");
    }

    if (this.arrLoc.length >= activeCategory) {
      // To Scroll to the index 5 element
      this.scrollview_ref.scrollTo({
        x: x_pos,
        y: 0,
        animated: true
      });
    } else {
      //alert('Out of Max Index');
    }
  };

  renderOrderInformation() {
    let table = "";
    if (this.state.selectedSalesType === "Dine-In") {
      table = this.state.selectedTable.name;
    }

    return (
      <View
        style={{
          marginTop: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          //flexDirection: "row",
          justifyContent: "space-between",
          //backgroundColor: "#BCA",
          marginLeft: 15,
          marginRight: 15,

          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: "#C8C7CC"
        }}
      >
        <View style={{ width: "35%" }}>
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
          >
            {_transaction_id[this.state.languageIndex]}:
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 11,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            {this.state.transactionId}
          </Text>
        </View>
        <View style={{ width: "35%" }}>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: BLACK, textAlign: "center" }
            ]}
          >
            {_no_table[this.state.languageIndex]}:
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                textAlign: "center"
              }
            ]}
          >
            {this.state.selectedSalesType === "Dine-In"
              ? this.state.selectedTable.name
              : "-"}
          </Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text
            style={[
              MainStyle.robotoNormal,
              { fontSize: 12, color: BLACK, textAlign: "center" }
            ]}
          >
            {_cashier[this.state.languageIndex]}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                textAlign: "center"
              }
            ]}
          >
            {this.state.userInfo.name}
          </Text>
        </View>
      </View>
    );
  }

  renderSearch() {
    if (this.state.formItem === false) {
      return (
        <View
          style={{
            marginBottom: 10,
            marginTop: 0,
            //flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: WHITE,
            paddingRight: 0,
            paddingLeft: 0
            //width: "200%"
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicato={false}
            horizontal={true}
            ref={ref => {
              this.scrollview_ref = ref;
            }}
            style={
              {
                //flex: 1
              }
            }
          >
            <Button
              style={{ justifyContent: "center" }}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({ showFilter: !this.state.showFilter });
              }}
            >
              <Ionicons
                name={"md-search"}
                style={{
                  padding: 0,
                  fontSize: 20,
                  color: this.state.showFilter
                    ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    : "#C4C4C4"
                }}
              />
            </Button>
            <Button
              onPress={() => {
                this.getData();

                // LayoutAnimation.configureNext(
                //   LayoutAnimation.Presets.easeInEaseOut
                // );
                //this.changeDateToday();
              }}
              style={{
                marginTop: 0,
                //width: "100%",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 10,
                paddingBottom:
                  this.state.activeCategory === 0 && !this.state.showFilter
                    ? 5
                    : 10,
                borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                borderBottomWidth:
                  this.state.activeCategory === 0 && !this.state.showFilter
                    ? 5
                    : 0
                //alignItems: 'center',
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 12,
                    color:
                      this.state.activeCategory === 0 && !this.state.showFilter
                        ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        : BLACK
                  }
                ]}
              >
                {_menu_favorit_short[this.state.languageIndex]}
              </Text>
            </Button>
            {this.state.dataCategory.map((items, itemIndex) => {
              return (
                <View
                  onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    this.arrLoc[itemIndex] = layout.x;
                    // console.log('height:', layout.height);
                    // console.log('width:', layout.width);
                    // console.log('x:', layout.x);
                    // console.log('y:', layout.y);
                  }}
                >
                  {this.renderKategoriTop(items, itemIndex)}
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              marginTop: 10,
              marginLeft: 5,
              marginRight: 5,
              display: this.state.showFilter ? "flex" : "none"
              //display: "flex"
            }}
          >
            <View style={{}}>
              <TextInput
                style={{
                  //backgroundColor: 'transparent',
                  backgroundColor: "rgba(246, 246, 246, 0.95)",
                  borderRadius: 5,
                  padding: 5,
                  paddingLeft: 15,
                  paddingRight: 15,
                  color: BLACK,
                  fontSize: 12,
                  fontFamily: "DMSans-Bold"
                }}
                type="text"
                refx={q => {
                  this._notes = q;
                }}
                onSubmitEditing={() => {
                  //this.getData(this.state.notes);
                  // this.setState({viewSearch: false});
                  this.searchMenu(this.state.searchKey);
                }}
                //onChangeText={(q)=>this._accountUpdate('username',q)}
                onChangeText={v => this.setState({ searchKey: v })}
                value={this.state.searchKey}
                placeholder={""}
              />
              <Button
                style={{ position: "absolute", right: 10, top: 5 }}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  this.setState({ showFilter: false, searchKey: "" });

                  //this.getMenuByCategory();
                  this.getData();
                }}
              >
                <Ionicons
                  // name={"ios-close-circle-outline"}
                  name={"md-close"}
                  size={25}
                  color={BLACK}
                />
              </Button>
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }

  logoutAction() {
    this.setState({ userInfo: null });
  }

  renderFav(data, i) {
    return (
      <Button
        onPress={() => {
          this.showFormItem(data, data.price, "add");
        }}
        style={{
          borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
          borderWidth: 0,
          borderRadius: 10,
          elevation: 1,
          backgroundColor: "#EEE"
        }}
      >
        <View style={{ margin: 15, flexDirection: "row" }}>
          <View style={{ width: "75%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.state.currency}{" "}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.idrNumToStr(data.price)}
            </Text>
          </View>
        </View>
      </Button>
    );
  }

  renderDetail(data, i) {
    return (
      <Button
        onPress={() => {
          // this.setState({
          //   formItem: true,
          //   selectedProduct: data,
          //   productPrice: data.price
          // });
          this.showFormItem(data, data.price, "add");
        }}
        style={{
          borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
          borderRadius: 10,
          elevation: 1,
          backgroundColor: "#EEE"
        }}
      >
        <View style={{ margin: 15, flexDirection: "row" }}>
          <View style={{ width: "75%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.state.currency}{" "}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.idrNumToStr(data.price)}
            </Text>
          </View>
        </View>
      </Button>
    );
  }

  renderAllCategory(data, i) {
    return (
      <View>
        <View
          style={{
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 10,
            elevation: 1,
            backgroundColor: WHITE
          }}
        >
          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              let activeCategory =
                this.state.activeCategory === data.id ? 0 : data.id;
              this.getMenuByCategory("", activeCategory);
              //this.setState({ activeCategory: activeCategory });
            }}
          >
            <View style={{ margin: 15, flexDirection: "row" }}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 14, color: BLACK }
                  ]}
                >
                  {data.name}
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  alignSelf: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                {this.state.activeCategory === data.id ? (
                  <Entypo
                    name={"chevron-up"}
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: BLACK
                    }}
                  />
                ) : (
                  <Entypo
                    name={"chevron-down"}
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: BLACK
                    }}
                  />
                )}
              </View>
            </View>
          </Button>
        </View>
        {/* If Active */}
        {this.state.activeCategory === data.id ? (
          <View>
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.dataMenu}
              renderItem={({ item, index }) => {
                if (this.state.ready === true) {
                  return (
                    <View
                      style={{
                        marginLeft: 0,
                        marginTop: 0,
                        marginBottom: 3,
                        marginRight: 0,
                        borderColor: MAIN_THEME_COLOR_SELECT(
                          this.state.colorIndex
                        )
                      }}
                    >
                      {this.renderDetail(item, index)}
                    </View>
                  );
                } else {
                  return <View />;
                }
              }}
              //ListFooterComponent={this._renderFooter}
              keyExtractor={(item, index) => {
                return "CategoryRenderChild" + index.toString();
              }}
              onRefresh={this._onRefresh}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={0.5}
              //refreshing={refreshing}
            />
            {this.state.dataMenu.length === 0 ? (
              <View
                style={{
                  marginLeft: 0,
                  marginTop: 0,
                  marginBottom: 3,
                  marginRight: 0,
                  borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: "#EEE",
                  borderRadius: 10
                }}
              >
                <View
                  style={{
                    margin: 15,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ width: "80%" }}>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 10, color: BLACK }
                      ]}
                    >
                      Menu tidak tersedia
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }

  editOrderForm(data, index) {
    const detail = data.detail;
    console.log("DATA ==> ", data);
    console.log("DETAIL ==> ", detail);
    console.log("INDEX ==> ", index);

    this.getAddonsByMenu(data.product.id, "edit");

    this.setState({
      showBill: false,
      formAction: "edit",
      formIndex: index,
      formItem: true,
      productPrice: data.price,
      selectedProduct: data.product,
      selectedCatatan: data.notes,
      selectedQuantity: data.qty,
      additionalProduct: detail,
      formSalesType: data.salesType,
      salesTypeValue: data.salesTypeValue
    });
  }

  renderBill(data, i) {
    let detail = data.detail;
    let detailString = "";

    let image = "";

    if (data.product.image) {
      image = data.product.image;
    }

    if (data.image) {
      image = data.product.image;
    }

    let total = data.qty * data.price + data.qty * data.salesTypeValue;

    // let subTotal = this.state.subTotal;
    // subTotal = subTotal + total;

    // this.setState({subTotal: subTotal});

    detail.map((items, itemIndex) => {
      if (detailString === "") {
        detailString = items.name;
      } else {
        detailString = detailString + ", " + items.name;
      }
    });

    let width = Dimensions.get("window").width - 30;

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            width: width,
            //width: "120%",
            //width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
            //paddingBottom: 10,
            paddingBottom: 15,
            minHeight: 40,
            borderColor: "#C8C7CC",
            //borderColor: BLACK,
            borderBottomWidth: 1,
            marginRight: 25
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              width: "10%",
              flexDirection: "row",
              display: "none"
            }}
          >
            <Button
              onPress={() => {
                this.deleteBill(i);
                //this.changeQty(i);
              }}
            >
              <Entypo
                name={"circle-with-cross"}
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  color: RED_500
                }}
              />
            </Button>

            <Button
              onPress={() => {
                //this.deleteBill(i);
                //this.changeQty(i);
                this.editOrderForm(data, i);
              }}
            >
              <Entypo
                name={"edit"}
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  color: BLACK
                }}
              />
            </Button>
          </View>
          <Button
            onPress={() => {
              this.editOrderForm(data, i);
            }}
            style={{ borderRadius: 15 }}
          >
            <Image
              resizeMethod="resize"
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                overflow: "hidden"
                //alignSelf: "center"
                //backgroundColor: "#888"
              }}
              resizeMode={"stretch"}
              source={{ uri: image }}
            />
          </Button>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              width: "30%"
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {data.name}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              {detailString}
            </Text>

            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              {data.salesType}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              {_catatan[this.state.languageIndex]}:{" "}
              {data.notes !== "" ? data.notes : "-"}
            </Text>
          </View>
          <View style={{ width: "30%" }}>
            <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderRadius: 15,
                  //flex: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }}
              >
                <Button
                  onPress={() => {
                    this.changeQty(i, -1);
                    //this.changeQty(i);
                  }}
                >
                  <AntDesign
                    name={"minus"}
                    style={{
                      alignSelf: "center",
                      fontSize: 20,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    }}
                  />
                </Button>
                <View
                  style={{ width: "45%", marginRight: 5, alignItems: "center" }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {data.qty}
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    this.changeQty(i, 1);
                    //this.changeQty(i);
                  }}
                >
                  <AntDesign
                    name={"plus"}
                    style={{
                      alignSelf: "center",
                      fontSize: 20,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    }}
                  />
                </Button>
              </View>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                //justifyContent: 'flex-end',
                justifyContent: "center",
                width: "100%",
                marginTop: 10
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
              >
                {this.state.currency} {this.idrNumToStr(total)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: 100 }}>
          <Button
            style={{
              backgroundColor: RED_500,
              flex: 1
              // alignItems: "center",
            }}
            onPress={() => {
              this.deleteBill(i);
              //this.changeQty(i);
            }}
          >
            <View
              style={{
                //backgroundColor: "#BCA",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              {/* <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: WHITE }]}
              >
                Delete
              </Text> */}
              <Entypo
                name={"trash"}
                style={{
                  // alignSelf: "center",
                  fontSize: 25,
                  color: WHITE
                }}
              />
            </View>
          </Button>
        </View>
      </ScrollView>
    );
  }

  changeAddons(dataOption, dataParent, selected) {
    let {
      additionalProduct,
      productPrice,
      salesTypeValue,
      salesTypeTax,
      formSalesType
    } = this.state;

    let parentId = dataParent.id;
    let type = dataParent.type;
    let optionPertama = dataParent.options[0];
    let isFirstOption = dataOption.id === optionPertama.id;

    let temp = {}; //default

    //console.log(additionalProduct);
    //console.log("optionPertama ==> ", optionPertama);

    temp = {
      id: dataOption.id,
      name: dataOption.name,
      price: dataOption.price,
      //available: dataOption.available,
      parentId: parentId
    };

    console.log("temp ==> ", temp);

    if (selected === true && type === "multi") {
      additionalProduct.map((v, index) => {
        if (v.id === dataOption.id) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - parseFloat(v.price);
        }
      });
    }
    //remove already selected for multi
    // if (isFirstOption && type === "single")
    // {
    //   console.log('test');
    // }
    // else
    if (selected === true && type === "single") {
      additionalProduct.map((v, index) => {
        if (v.id === dataOption.id) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - v.price;

          temp = {
            id: optionPertama.id,
            name: optionPertama.name,
            price: optionPertama.price,
            parentId: parentId
          };

          additionalProduct.push(temp);
          productPrice =
            parseFloat(productPrice) + parseFloat(optionPertama.price);
          //select firstOption
        }
        //delete selected option
      });
    }
    //remove already selected for single

    if (selected === false && type === "multi") {
      additionalProduct.push(temp);
      productPrice = parseFloat(productPrice) + parseFloat(dataOption.price);
    }

    if (selected === false && type === "single") {
      additionalProduct.map((v, index) => {
        if (v.parentId === parentId) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - parseFloat(v.price);
        }
      });
      additionalProduct.push(temp);
      productPrice = parseFloat(productPrice) + parseFloat(dataOption.price);
    }
    //add more for multi

    //console.log("additionalProduct ==> ", additionalProduct);

    if (formSalesType === "Gojek/Grab") {
      salesTypeValue = productPrice * salesTypeTax;
    } else {
      salesTypeValue = 0;
    }

    if (this.state.formAction === "add") {
      this.setState({
        additionalProduct: additionalProduct,
        productPrice: productPrice,
        salesTypeValue: salesTypeValue
      });
    } else {
      this.setState({
        additionalProduct: additionalProduct,
        productPrice: productPrice,
        salesTypeValue: salesTypeValue
      });
    }

    //this.setState({ selectedQuantity: this.state.selectedQuantity * 2 });
  }

  renderDetailItemSelection(data, i, dataParent) {
    let { additionalProduct } = this.state;
    let { type } = dataParent; //single or multi

    let parentLength = dataParent.options.length;

    //console.log("dataParent ===> ", dataParent);

    let width =
      type === "single" ? (parentLength === 3 ? "33%" : "50%") : "100%";
    //console.log('additionalProduct ==> ',additionalProduct)
    let bgColor = [
      "#EEEEEE",
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#555555"
    ];
    let textColor = [
      BLACK,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
    ];
    let colorIndex = 0;
    let colorText = 0;
    let selected = false;

    additionalProduct.map((v, index) => {
      if (v.id === data.id) {
        selected = true;
      }
    });

    if (selected === true) {
      colorIndex = 1;
      colorText = 1;
    }

    if (data.available === false) {
      colorIndex = 2;
      colorText = 2;
    }

    return (
      <View
        style={{
          //flex: 1,
          alignItems: "center",
          width: width,
          marginRight: 1,
          alignContent: "center",
          justifyContent: "center",
          height: 60
          //backgroundColor: '#BCA',
        }}
      >
        <Button
          onPress={() => {
            this.changeAddons(data, dataParent, selected);
          }}
          style={{
            //flexDirection: 'row',
            //width:200,
            //flex:1,
            backgroundColor: bgColor[colorIndex],
            elevation: 2,
            //width: '1%',
            padding: 15,
            width: "100%",
            //borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
            alignContent: "center",
            //justifyContent: "space-between",
            justifyContent: "center",
            flexDirection: "row"
          }}
          disabled={data.available === false ? true : false}
        >
          {type === "single" ? (
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color: textColor[colorText],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              {data.name}
            </Text>
          ) : (
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ width: "80%" }}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: textColor[colorText]
                      //width: width,
                      //backgroundColor: '#BCA',
                      //textAlign: "center"
                    }
                  ]}
                >
                  {data.name}
                </Text>
              </View>
              <View
                style={{
                  alignSelf: "flex-end",
                  width: "20%"
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    {
                      fontSize: 12,
                      color: textColor[colorText],
                      textAlign: "right"
                      //width: width,
                      //backgroundColor: '#BCA',
                      //textAlign: "center"
                    }
                  ]}
                >
                  {this.idrNumToStr(data.price)}
                </Text>
              </View>
            </View>
          )}
        </Button>
      </View>
    );
  }

  renderDetailItem(data, i) {
    let type = data.type;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#99999",
          flex: 1,
          width: "100%",
          minHeight: 100,
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            //backgroundColor: '#BCA',
            width: "100%"
          }}
        >
          <View style={{ margin: 15, flexDirection: "row" }}>
            {/* <FontAwesome
              name={"circle-thin"}
              style={{
                alignSelf: "center",
                fontSize: 15,
                color: BLACK,
                marginRight: 10
              }}
            /> */}
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 12, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
            {data.type === "single" ? (
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {" - "}
                {_pilih[this.state.languageIndex]}
              </Text>
            ) : (
              <View />
            )}
          </View>
          <View style={{ flex: 1, width: "100%" }}>
            <View
              style={{
                marginTop: 10,
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C4C4C4",
                width: "90%",
                //flex: 1,
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between"
                //backgroundColor: '#AAA',
              }}
            >
              {this.state.loading === false && type === "single" ? (
                data.options.length === 3 ? (
                  <FlatList
                    style={{
                      flex: 1,
                      //backgroundColor: '#BCA',
                      justifyContent: "space-between"
                    }}
                    //ListHeaderComponent={this.renderSearch()}
                    showsVerticalScrollIndicator={false}
                    data={data.options}
                    renderItem={({ item, index }) => {
                      return this.renderDetailItemSelection(item, index, data);
                    }}
                    //ListFooterComponent={this._renderFooter}
                    numColumns={3}
                    keyExtractor={(item, index) => {
                      return "ListAdditionalSubSingle" + index.toString();
                    }}
                    //onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    //refreshing={refreshing}
                  />
                ) : (
                  <FlatList
                    style={{
                      flex: 1,

                      //backgroundColor: '#BCA',
                      justifyContent: "space-between"
                    }}
                    //ListHeaderComponent={this.renderSearch()}
                    showsVerticalScrollIndicator={false}
                    data={data.options}
                    renderItem={({ item, index }) => {
                      return this.renderDetailItemSelection(item, index, data);
                    }}
                    //ListFooterComponent={this._renderFooter}
                    numColumns={2}
                    keyExtractor={(item, index) => {
                      return "ListAdditionalSubSingle" + index.toString();
                    }}
                    //onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    //refreshing={refreshing}
                  />
                )
              ) : this.state.loading === false ? (
                <FlatList
                  style={{
                    flex: 1,
                    //backgroundColor: '#BCA',
                    justifyContent: "space-between"
                  }}
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={data.options}
                  renderItem={({ item, index }) => {
                    return this.renderDetailItemSelection(item, index, data);
                  }}
                  //ListFooterComponent={this._renderFooter}
                  numColumns={1}
                  keyExtractor={(item, index) => {
                    return "ListAdditionalSubMulti" + index.toString();
                  }}
                  //onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //refreshing={refreshing}
                />
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
        {/* Kuantitas */}
      </View>
    );
  }

  formChangeSalesType(type, typeOld) {
    let { productPrice, salesTypeTax, salesTypeValue } = this.state;

    if (type === "Gojek/Grab") {
      salesTypeValue = productPrice * salesTypeTax;
    } else if (type !== "Gojek/Grab" && typeOld === "Gojek/Grab") {
      salesTypeValue = 0;
    }

    this.setState({ formSalesType: type, salesTypeValue: salesTypeValue });
  }

  renderSalesTypeSelection() {
    const { formSalesType, selectedSalesType } = this.state;
    let bgColor = [
      WHITE,
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#EEEEEE"
    ];
    let textColor = [
      BLACK,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      "#DDDDDD"
    ];

    return (
      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Take-Away" });
              this.formChangeSalesType("Take-Away", formSalesType);

              //this.changeAddons(data, dataParent, selected);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Take-Away" ? bgColor[1] : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
            //disabled={data.available === false ? true : false}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Take-Away" ? textColor[1] : textColor[0],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Take-Away
            </Text>
          </Button>
        </View>
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Dine-In" });
              this.formChangeSalesType("Dine-In", formSalesType);
              //this.changeAddons(data, dataParent, selected);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Dine-In"
                  ? bgColor[1]
                  : selectedSalesType !== "Dine-In"
                  ? bgColor[2]
                  : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
            disabled={selectedSalesType === "Dine-In" ? false : true}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Dine-In" ? textColor[1] : textColor[2],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Dine-In
            </Text>
          </Button>
        </View>
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Gojek/Grab" });
              this.formChangeSalesType("Gojek/Grab", formSalesType);
              //this.changeAddons(data, dataParent, selected);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Gojek/Grab" ? bgColor[1] : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
            //disabled={data.available === false ? true : false}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Gojek/Grab"
                      ? textColor[1]
                      : textColor[0],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Gojek/Grab
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  renderFormItem() {
    const { formItem } = this.state;
    let harga =
      this.state.currency +
      " " +
      this.idrNumToStr(
        (this.state.productPrice + this.state.salesTypeValue) *
          this.state.selectedQuantity
      );
    if (formItem) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.formItem}
          onRequestClose={() => {
            if (this.state.formAction === "edit") {
              this.setState({ formItem: false, showBill: true });
            } else {
              this.setState({ formItem: false });
            }
          }}
        >
          <View
            style={{
              borderRadius: 0,

              width: "100%",
              height: 150
            }}
          >
            <Image
              // resizeMethod="resize"
              style={{
                height: 150
                //width: "100%"
                //borderRadius: 15
                //overflow: "hidden"
                //alignSelf: "center"
                //backgroundColor: "#888"
              }}
              resizeMode={"cover"}
              source={{ uri: this.state.selectedProduct.image }}
            />
          </View>

          {this.state.loading ? <Loading /> : <View />}
          <View
            style={{
              flex: 1,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              marginTop: -20,
              backgroundColor: WHITE
            }}
          >
            <MobileHeader
              bgColor={"transparent"}
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              title={this.state.selectedProduct.name}
              notif={false}
              loginInformation={this.state.userInfo}
              menu={false}
              back={true}
              backAction={() => {
                if (this.state.formAction === "edit") {
                  this.setState({ formItem: false, showBill: true });
                } else {
                  this.setState({ formItem: false });
                }
              }}
              harga={harga}
              hideLogin={true}
            />
            <View
              style={{
                flex: 1,
                // marginTop: 20,
                // marginBottom: 20,
                // marginLeft: 20,
                // marginRight: 20,
                flexDirection: "column"
              }}
            >
              {/* Header Form */}
              {/* Kotak Form */}
              <View
                style={{
                  flex: 1,

                  marginTop: 20,
                  width: "100%",
                  borderRadius: 5
                }}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={{ marginTop: 0, padding: 0 }}>
                    <View
                      style={{
                        //flexDirection: "row",
                        backgroundColor: "#99999",
                        flex: 1,
                        width: "100%",
                        minHeight: 100,
                        justifyContent: "space-between"
                      }}
                    >
                      <View
                        style={{
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_qty_long[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10,
                            flexDirection: "row",
                            //paddingRight: 20,
                            padding: 10,
                            flex: 1,
                            backgroundColor: MAIN_THEME_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            borderRadius: 25,
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "space-between",
                            borderBottomWidth: 1,
                            borderColor: "#C4C4C4"
                          }}
                        >
                          <Button
                            style={{
                              borderRadius: 10,

                              width: "33%"
                            }}
                            onPress={() => {
                              this.changeQtyProduct(-1);
                            }}
                          >
                            <AntDesign
                              name={"minus"}
                              style={{
                                color: MAIN_TEXT_COLOR_SELECT(
                                  this.state.colorIndex
                                ),
                                alignSelf: "flex-start",
                                fontSize: 20
                              }}
                            />
                          </Button>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              {
                                width: "33%",
                                fontSize: 12,
                                color: MAIN_TEXT_COLOR_SELECT(
                                  this.state.colorIndex
                                ),
                                textAlign: "center"
                              }
                            ]}
                          >
                            {this.state.selectedQuantity}
                          </Text>
                          <Button
                            style={{
                              borderRadius: 10,

                              width: "33%"
                            }}
                            onPress={() => {
                              this.changeQtyProduct(1);
                            }}
                          >
                            <AntDesign
                              name={"plus"}
                              style={{
                                color: MAIN_TEXT_COLOR_SELECT(
                                  this.state.colorIndex
                                ),
                                alignSelf: "flex-end",
                                fontSize: 20
                              }}
                            />
                          </Button>
                        </View>
                      </View>
                      {/* Kuantitas */}
                      {/* additionalnya */}
                      <FlatList
                        //ListHeaderComponent={this.renderSearch()}
                        showsVerticalScrollIndicator={false}
                        data={this.state.additionalList}
                        renderItem={({ item, index }) => {
                          if (this.state.ready === true) {
                            return (
                              <View
                              // style={{
                              //   marginLeft: 0,
                              //   marginTop: 0,
                              //   marginBottom: 3,
                              //   marginRight: 0,
                              // }}
                              >
                                {this.renderDetailItem(item, index)}
                              </View>
                            );
                          } else {
                            return <View />;
                          }
                        }}
                        //ListFooterComponent={this._renderFooter}
                        keyExtractor={(item, index) => {
                          return "ListAdditional" + index.toString();
                        }}
                        //onRefresh={this._onRefresh}
                        //onEndReached={this.handleLoadMore}
                        //onEndReachedThreshold={0.5}
                        //refreshing={refreshing}
                      />
                      {/* Sales Type Input Form */}
                      <View
                        style={{
                          //flexDirection: "row",
                          //backgroundColor: "#BCA",
                          flex: 1,
                          width: "100%",
                          minHeight: 100,
                          justifyContent: "space-between"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_sales_type[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View>{this.renderSalesTypeSelection()}</View>
                      </View>
                      {/* View Kuantitas dan Catatan */}

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_catatan[this.state.languageIndex]} -
                          </Text>
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {" "}
                            {_catatan_extra[this.state.languageIndex]}
                          </Text>
                        </View>
                        {/* Catatan Header */}
                        <View
                          style={{
                            marginTop: 10,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10,
                            flexDirection: "row",
                            //paddingRight: 20,
                            flex: 1,
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
                              backgroundColor: WHITE,
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
                                color: BLACK,
                                marginTop: -8,
                                marginLeft: 0,
                                marginRight: 0,
                                fontSize: 12,
                                fontFamily: "DMSans-Bold"
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
                              onChangeText={v =>
                                this.setState({ selectedCatatan: v })
                              }
                              value={this.state.selectedCatatan}
                              placeholder={""}
                            />
                          </ScrollView>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  margin: 15
                  //backgroundColor: "#555",
                  //flex: 1
                }}
              >
                <Button
                  style={{
                    padding: 10,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    this.addOrder();
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {_simpan[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
          {/* {this.renderTabBar()} */}
        </Modal>
      );
    } else {
      return <View />;
    }
  }

  renderLeftSide() {
    const { refreshing, showAlert } = this.state;

    if (this.state.formItem === false && this.state.showFavList === false) {
      return (
        <View
          style={{ flex: 1, backgroundColor: "#C4C4C4", paddingBottom: 10 }}
        >
          <ScrollView
            style={{
              //backgroundColor: '#C4C4C4',
              flex: 1
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>
              <View>
                <View
                  style={{
                    borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    marginLeft: 15,
                    marginRight: 15,

                    borderRadius: 10,
                    elevation: 1,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    )
                  }}
                >
                  <Button
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.setState({ showAll: !this.state.showAll });
                    }}
                  >
                    <View style={{ margin: 15, flexDirection: "row" }}>
                      <View style={{ width: "10%" }}>
                        <Ionicons
                          name={"md-menu"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }}
                        />
                      </View>
                      <View style={{ width: "80%", alignSelf: "center" }}>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              fontSize: 14,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          {_semua_menu[this.state.languageIndex]}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "10%",
                          alignSelf: "flex-end",
                          alignItems: "flex-end"
                        }}
                      >
                        {this.state.showAll ? (
                          <Entypo
                            name={"chevron-up"}
                            style={{
                              alignSelf: "center",
                              fontSize: 25,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          />
                        ) : (
                          <Entypo
                            name={"chevron-down"}
                            style={{
                              alignSelf: "center",
                              fontSize: 25,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </Button>
                </View>
              </View>
              {/* Semua Menu End */}

              {this.state.showAll ? (
                <View>
                  <FlatList
                    //ListHeaderComponent={this.renderSearch()}
                    showsVerticalScrollIndicator={false}
                    data={this.state.dataCategory}
                    renderItem={({ item, index }) => {
                      if (this.state.ready === true) {
                        return (
                          <View
                            style={{
                              marginLeft: 15,
                              marginTop: 0,
                              marginBottom: 3,
                              marginRight: 15,
                              borderColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            {this.renderAllCategory(item, index)}
                          </View>
                        );
                      } else {
                        return <View />;
                      }
                    }}
                    //ListFooterComponent={this._renderFooter}
                    keyExtractor={(item, index) => {
                      return "ShowAllRenderData" + index.toString();
                    }}
                    onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                  />
                </View>
              ) : (
                <View />
              )}
              {/* Favorit */}
              <View>
                <View
                  style={{
                    borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 15,
                    marginLeft: 15,
                    marginRight: 15,
                    borderRadius: 10,
                    elevation: 1,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    )
                  }}
                >
                  <Button
                    onPress={() => {
                      console.log("press favorit");
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.setState({ showFav: !this.state.showFav });
                    }}
                  >
                    <View style={{ margin: 15, flexDirection: "row" }}>
                      <View style={{ width: "10%" }}>
                        <Ionicons
                          name={"md-star"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: "#FFF736"
                          }}
                        />
                      </View>
                      <View style={{ width: "80%", alignSelf: "center" }}>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              fontSize: 14,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          {_menu_favorit[this.state.languageIndex]}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "10%",
                          alignSelf: "flex-end",
                          alignItems: "flex-end"
                        }}
                      >
                        {this.state.showFav ? (
                          <Entypo
                            name={"chevron-up"}
                            style={{
                              alignSelf: "center",
                              fontSize: 25,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          />
                        ) : (
                          <Entypo
                            name={"chevron-down"}
                            style={{
                              alignSelf: "center",
                              fontSize: 25,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </Button>
                </View>
                {/* Show Fav End */}

                {this.state.showFav ? (
                  <View>
                    <FlatList
                      //ListHeaderComponent={this.renderSearch()}
                      showsVerticalScrollIndicator={false}
                      data={this.state.dataMenuFav}
                      renderItem={({ item, index }) => {
                        if (this.state.ready === true) {
                          return (
                            <View
                              style={{
                                marginLeft: 15,
                                marginTop: 0,
                                marginBottom: 3,
                                marginRight: 15,
                                borderColor: MAIN_THEME_COLOR_SELECT(
                                  this.state.colorIndex
                                )
                              }}
                            >
                              {this.renderFav(item, index)}
                            </View>
                          );
                        } else {
                          return <View />;
                        }
                      }}
                      //ListFooterComponent={this._renderFooter}
                      keyExtractor={(item, index) => {
                        return "FavRenderData" + index.toString();
                      }}
                      onRefresh={this._onRefresh}
                      //onEndReached={this.handleLoadMore}
                      //onEndReachedThreshold={0.5}
                      refreshing={refreshing}
                    />
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderFavAlternate(data, i) {
    return (
      <Button
        onPress={() => {
          //console.log(data);
          // this.setState({
          //   formItem: true,
          //   selectedProduct: data,
          //   productPrice: data.price
          // });

          this.showFormItem(data, data.price, "add");
        }}
        style={{
          flex: 1,
          //backgroundColor: "#EEE"
          borderBottomWidth: 1,
          borderColor: "#C8C7CC"
        }}
      >
        <View style={{ margin: 15 }}>
          {/* <View style={{ alignItems: "center" }}> */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ borderRadius: 15 }}>
              <Image
                resizeMethod="resize"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 15,
                  overflow: "hidden"
                  //alignSelf: "center"
                  //backgroundColor: "#888"
                }}
                resizeMode={"stretch"}
                source={{ uri: data.image }}
              />
            </View>
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 15, color: BLACK }
                ]}
              >
                {data.name}
              </Text>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {data.category_name}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end"
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 15, color: BLACK }
                  ]}
                >
                  {this.state.currency} {this.idrNumToStr(data.price)}
                </Text>
              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
      </Button>
    );
  }

  renderFavLeftSide() {
    const {
      activeCategoryIndex,
      activeCategory,
      categoryTotal,
      dataCategory
    } = this.state;
    if (this.state.formItem === false && this.state.showFavList === true) {
      return (
        // <GestureRecognizer
        <View
          // onSwipeLeft={this._onSwipeLeft}
          // onSwipeRight={this._onSwipeRight}
          onSwipeLeft={() => {
            //alert("left");
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );

            let activeCategoryIndexNew =
              activeCategoryIndex === 0 ? 1 : parseInt(activeCategoryIndex + 1);

            if (activeCategoryIndexNew > categoryTotal) {
              activeCategoryIndexNew = activeCategoryIndexNew - 1;
            }

            let activeCategoryNew =
              dataCategory[parseInt(activeCategoryIndexNew - 1)].id;
            console.log("activeCategoryIndex ==> ", activeCategoryIndex);
            console.log("activeCategoryIndex New ==> ", activeCategoryIndexNew);
            console.log("activeCategory ==> ", activeCategory);
            console.log("activeCategory New ==> ", activeCategoryNew);
            console.log("categoryTotal ==> ", categoryTotal);

            if (activeCategoryIndex < categoryTotal) {
              this.setState({
                activeCategory: activeCategoryNew,
                activeCategoryIndex: activeCategoryIndexNew
                //loading: false
              });
              this.getMenuByCategory(
                this.state.searchKey,
                activeCategoryNew,
                activeCategoryIndexNew
              );
              this.downButtonHandler(activeCategoryIndexNew);
            }
          }}
          onSwipeRight={() => {
            //alert("right");
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );

            let min_category = dataCategory[0].id;

            console.log("min_category ==> ", min_category);

            let activeCategoryIndexNew =
              activeCategoryIndex === min_category
                ? 0
                : parseInt(activeCategoryIndex - 1);

            if (activeCategoryIndexNew < 0) {
              activeCategoryIndexNew = 0;
            }

            console.log("activeCategoryIndexNew ==> ", activeCategoryIndexNew);

            let activeCategoryNew =
              activeCategoryIndexNew === 0
                ? dataCategory[parseInt(activeCategoryIndexNew)].id
                : dataCategory[parseInt(activeCategoryIndexNew - 1)].id;

            console.log("activeCategoryNew ==> ", activeCategoryNew);

            if (activeCategoryNew > 0 && activeCategory !== 0) {
              this.setState({
                activeCategory: activeCategoryNew,
                activeCategoryIndex: activeCategoryIndexNew
                //loading: true
              });
              if (activeCategoryIndexNew === 0) {
                this.getData();
                this.downButtonHandler(activeCategoryIndexNew);
              } else {
                this.getMenuByCategory(
                  this.state.searchKey,
                  activeCategoryNew,
                  activeCategoryIndexNew
                );
                this.downButtonHandler(activeCategoryIndexNew);
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
          <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View
              style={{
                marginTop: 10,
                // marginLeft: 10,
                // marginRight: 10,
                //marginBottom: 5,
                //paddingBottom: 10,
                //backgroundColor: "#BCA",
                //flex: 1,
                //flexDirection: "row",
                justifyContent: "space-around"
                //backgroundColor: '#AAA',
              }}
            >
              <View style={{ borderBottomWidth: 1, borderColor: "#C8C7CC" }} />
              <FlatList
                //ListHeaderComponent={this.renderSearch()}
                showsVerticalScrollIndicator={false}
                data={this.state.dataMenuFav}
                //numColumns={2}
                renderItem={({ item, index }) => {
                  if (this.state.ready === true) {
                    return (
                      <View
                        style={{
                          width: "100%",

                          //flex: 0.325,
                          //marginLeft: 15,
                          marginTop: 0

                          //marginBottom: 3,
                          //marginRight: 15
                        }}
                      >
                        {this.renderFavAlternate(item, index)}
                      </View>
                    );
                  } else {
                    return <View />;
                  }
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "FavRenderData" + index.toString();
                }}
                //onRefresh={this._onRefresh}
                //onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={0.5}
                // refreshing={refreshing}
              />
            </View>
          </View>
        {/* </GestureRecognizer> */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderButtonsLeftSide() {
    if (this.state.formItem === false) {
      return (
        <View
          style={{
            //flex: 1,
            //height: 100,
            //width: "100%",
            //height: 300,
            backgroundColor: "#FFF",
            justifyContent: "flex-end",
            alignContent: "flex-end"
          }}
        >
          <View style={{ justifyContent: "flex-end", display: "none" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                //backgroundColor: "#FFF",
                paddingTop: 10
              }}
            >
              <Button
                onPress={() => {
                  this.setState({
                    showFavList: true
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderWidth: 1,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-star"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
              <Button
                onPress={() => {
                  this.setState({
                    showFavList: false
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderWidth: 1,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-menu"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
              <Button
                onPress={() => {
                  this.setState({
                    //formItem: true
                    showBill: true
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-calculator"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }

  showAdditionalSalesType(width = 322, top = 149, left = 745) {
    let { additionalSalesType, showAdditionalSalesType } = this.state;
    if (showAdditionalSalesType) {
      return (
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            //flex: 1,
            zIndex: 12,
            //height: 200,
            position: "absolute",
            top: top,
            width: width,
            left: left,
            elevation: 3,
            borderRadius: 5,
            //paddingTop: 10,
            marginBottom: 10
          }}
        >
          {additionalSalesType.map((items, itemIndex) => {
            return (
              <Button
                style={{
                  paddingTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  alignItems: "center",
                  alignContent: "center"
                }}
                onPressIn={() => {
                  this.modifyBillChangeGojek(
                    items.name,
                    this.state.selectedSalesType
                  );
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {items.name}
                </Text>
              </Button>
            );
          })}

          {/* {additionalTable.map(this.renderAdditionalTable)} */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  showAdditionalTable(width = 322, top = 149, left = 745) {
    let { additionalTable, showAdditionalTable } = this.state;
    if (showAdditionalTable) {
      return (
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            //flex: 1,
            zIndex: 12,
            //height: 200,
            position: "absolute",
            top: top,
            width: width,
            left: left,
            elevation: 3,
            borderRadius: 5,
            //paddingTop: 10,
            marginBottom: 10
          }}
        >
          {additionalTable.map((items, itemIndex) => {
            return (
              <Button
                style={{
                  paddingTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  alignItems: "center",
                  alignContent: "center"
                }}
                onPressIn={() => {
                  console.log("selected TAble ==> ", items);
                  this.setState({
                    selectedTable: items,
                    showAdditionalTable: false
                  });
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {items.name}
                </Text>
              </Button>
            );
          })}

          {/* {additionalTable.map(this.renderAdditionalTable)} */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderNew(width = 138, top = 200, left = 1097) {
    const { showNew } = this.state;
    if (showNew) {
      return (
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            //flex: 1,
            //height: 200,
            position: "absolute",
            width: width,
            top: top,
            left: left,
            // width: 138,
            // top: 200,
            // left: 1097,
            elevation: 3,
            borderRadius: 5,
            marginBottom: 15,
            zIndex: 20
          }}
        >
          <Button
            style={{
              //width: '95%',
              zIndex: 11,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: "#FFF",
              elevation: 4,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center"
            }}
            onPressIn={() => {
              //alert("Test");
              //this.setState({ showNew: false });
              //this.addNewName();
              this.newOrder();
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {_order[this.state.languageIndex]}
              </Text>
            </View>
          </Button>

          <Button
            style={{
              //width: '95%',
              zIndex: 11,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: "#FFF",
              elevation: 4,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center"
            }}
            onPressIn={() => {
              //alert("Test");
              //this.setState({ showNew: false });
              this.addNewName();
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {_nama[this.state.languageIndex]}
              </Text>
            </View>
          </Button>
          <Button
            style={{
              //width: '95%',
              zIndex: 11,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: "#FFF",
              elevation: 4,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center"
            }}
            onPressIn={() => {
              Actions.MobileMeja({
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
          >
            <View>
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {_meja[this.state.languageIndex]}
              </Text>
            </View>
          </Button>
          <Button
            style={{
              //width: '95%',
              zIndex: 11,
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              elevation: 4,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderColor: "#C4C4C4",
              borderWidth: 1,
              alignItems: "center",
              alignContent: "center"
            }}
            onPressIn={() => {
              Actions.MobileManagement({
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
          >
            <View>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 10,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    textAlign: "center"
                  }
                ]}
              >
                {_data_pelanggan[this.state.languageIndex]}
              </Text>
            </View>
          </Button>
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderRightSide() {
    const { dataBill, selectedTable, selectedSalesType } = this.state;
    let subTotal = 0;
    dataBill.map((v, i) => {
      subTotal = subTotal + v.qty * v.price;
      subTotal = subTotal + v.qty * v.salesTypeValue;
    });

    //let selectedTable = 'Meja 1';

    return (
      <View
        style={{
          margin: 15,
          marginTop: 0,
          flex: 1,
          zIndex: 5,
          backgroundColor: WHITE
        }}
      >
        {/* {this.renderNew(width,py,px)} */}
        <View
          style={{
            display: "none",
            elevation: 3,
            backgroundColor: "#EEEEEE",
            minHeight: 80,
            maxHeight: 80,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            zIndex: 6
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 0.7,
              margin: 15
            }}
          >
            <Button
              onPress={() => {
                // this.setState({
                //   showAdditionalTable: !this.state.showAdditionalTable,
                // });
                this.tableSelect.measure((fx, fy, width, height, px, py) => {
                  // console.log("Component width is: " + width);
                  // console.log("Component height is: " + height);
                  // console.log("X offset to frame: " + fx);
                  // console.log("Y offset to frame: " + fy);
                  // console.log("X offset to page: " + px);
                  // console.log("Y offset to page: " + py);

                  this.setState({
                    showAdditionalSalesType: !this.state
                      .showAdditionalSalesType,
                    tableWidth: width,
                    tableLeft: px,
                    tableTop: py + height + 5
                  });
                });
              }}
              style={{
                elevation: 2,
                alignItems: "center",
                justifyContent: "center",
                display: selectedSalesType !== "Dine-In" ? "flex" : "none",
                //margin: 15,
                borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                borderWidth: 0.25,
                backgroundColor: WHITE,
                borderRadius: 5,
                padding: 10,
                width: "100%"
                //flex: 1
                //width: '70%'
              }}
            >
              <View>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 15, color: BLACK }
                  ]}
                >
                  {selectedSalesType}
                </Text>
              </View>
              <Entypo
                name={
                  this.state.showAdditionalTable === true
                    ? "chevron-up"
                    : "chevron-down"
                }
                style={{
                  fontSize: 25,
                  color: "#72B9E1",
                  position: "absolute",
                  margin: 10,
                  right: 0,
                  top: 0
                }}
              />
            </Button>
            <Button
              onPress={() => {
                // this.setState({
                //   showAdditionalTable: !this.state.showAdditionalTable,
                // });
                if (this.state.additionalTable.length > 0) {
                  this.tableSelect.measure((fx, fy, width, height, px, py) => {
                    // console.log("Component width is: " + width);
                    // console.log("Component height is: " + height);
                    // console.log("X offset to frame: " + fx);
                    // console.log("Y offset to frame: " + fy);
                    // console.log("X offset to page: " + px);
                    // console.log("Y offset to page: " + py);
                    this.setState({
                      showAdditionalTable: !this.state.showAdditionalTable,
                      tableWidth: width,
                      tableLeft: px,
                      tableTop: py + height + 5
                    });
                  });
                } else {
                  this.modifyBillChangeGojek(
                    "Take-Away",
                    this.state.selectedSalesType
                  );
                  //this.setState({ selectedSalesType: "Take-Away" });
                }
              }}
              style={{
                elevation: 2,
                alignItems: "center",
                justifyContent: "center",
                display: selectedSalesType === "Dine-In" ? "flex" : "none",
                //margin: 15,
                borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                borderWidth: 0.25,
                backgroundColor: WHITE,
                borderRadius: 5,
                padding: 10,
                width: "100%"
                //flex: 1
                //width: '70%'
              }}
            >
              <View>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 15, color: BLACK }
                  ]}
                >
                  {selectedTable.name}
                </Text>
              </View>
              <Entypo
                name={
                  this.state.showAdditionalTable === true
                    ? "chevron-up"
                    : "chevron-down"
                }
                style={{
                  fontSize: 25,
                  color: "#72B9E1",
                  position: "absolute",
                  margin: 10,
                  right: 0,
                  top: 0
                }}
              />
            </Button>
            <View
              ref={view => {
                this.tableSelect = view;
              }}
              style={{
                width: "100%",
                elevation: 3
              }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 0.3,
              margin: 15,
              zIndex: 7
            }}
          >
            <Button
              onPress={() => {
                // this.setState({
                //   showNew: !this.state.showNew,});
                this.newMenu.measure((fx, fy, width, height, px, py) => {
                  console.log("Component width is: " + width);
                  console.log("Component height is: " + height);
                  console.log("X offset to frame: " + fx);
                  console.log("Y offset to frame: " + fy);
                  console.log("X offset to page: " + px);
                  console.log("Y offset to page: " + py);
                  this.setState({
                    showNew: !this.state.showNew,
                    newWidth: width,
                    newLeft: px,
                    newTop: py + height + 5
                  });
                });
              }}
              style={{
                elevation: 2,
                alignItems: "center",
                justifyContent: "center",
                //margin: 15,
                borderWidth: 0.25,
                borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                backgroundColor: WHITE,
                borderRadius: 5,
                padding: 10,
                //flex: 0.3,
                width: "100%",
                flexDirection: "row"
                //width: '25%'
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    marginRight: 5
                  }}
                >
                  <AntDesign
                    name={"pluscircleo"}
                    style={{
                      //alignSelf: "flex-start",
                      fontSize: 12,
                      color: "#72B9E1"
                      //position: "absolute",
                      //margin: 10,
                      //left: 0,
                      //top: 0
                    }}
                  />
                </View>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 15, color: BLACK }
                  ]}
                >
                  New
                </Text>
              </View>
            </Button>
            <View
              ref={view => {
                this.newMenu = view;
              }}
              style={{
                width: "100%",
                elevation: 3,
                zIndex: 9
              }}
            >
              {/* {this.renderNew()} */}
            </View>
            {/* NEW END */}
          </View>
        </View>

        <View
          style={{
            zIndex: 100,
            //elevation: 1,
            //backgroundColor: WHITE,
            flex: 1,
            //minHeight: 400,
            //height: 400,
            borderRadius: 5
            //marginTop: 15
            //alignItems: 'center',
            //justifyContent: 'center'
          }}
        >
          {/* Header Bill */}
          <View style={{ flex: 1 }}>
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.dataBill}
              renderItem={({ item, index }) => {
                if (this.state.ready === true) {
                  return <View style={{}}>{this.renderBill(item, index)}</View>;
                } else {
                  return <View />;
                }
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
          </View>
          {/* Bills  */}
          {/* Total Bills  */}
          <View
            style={{
              // alignSelf: 'flex-end',
              //flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
              //marginTop: 20,
              //paddingBottom: 10,
              paddingTop: 5,
              borderColor: "#C8C7CC",
              borderTopWidth: 1
            }}
          >
            <View
              style={{
                //alignItems: "center",
                //alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {_pajak[this.state.languageIndex]} (10%)
              </Text>
            </View>

            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {this.state.currency}{" "}
                {this.idrNumToStr(Math.ceil(subTotal * 0.1))}
              </Text>
            </View>
          </View>

          <View
            style={{
              // alignSelf: 'flex-end',
              //flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
              //marginTop: 20,
              //paddingBottom: 10,
              paddingTop: 5
              //borderColor: "#C8C7CC",
              //borderTopWidth: 1
            }}
          >
            <View
              style={{
                //alignItems: "center",
                //alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {_service[this.state.languageIndex]} (5%)
              </Text>
            </View>

            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
              >
                {this.state.currency}{" "}
                {this.idrNumToStr(Math.ceil(subTotal * 0.05))}
              </Text>
            </View>
          </View>

          <View
            style={{
              // alignSelf: 'flex-end',
              //flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
              //marginTop: 20,
              //paddingBottom: 10,
              paddingTop: 5,
              borderColor: "#C8C7CC",
              borderTopWidth: 0
            }}
          >
            <View
              style={{
                //alignItems: "center",
                //alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 13, color: BLACK }
                ]}
              >
                {_sub_total[this.state.languageIndex]} :
              </Text>
            </View>

            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 20, color: BLACK }
                ]}
              >
                {this.state.currency}{" "}
                {this.idrNumToStr(Math.ceil(subTotal * 1.15))}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            //flex: 1,
            justifyContent: "space-between"
            // flexDirection: "row"
          }}
        >
          <View
            style={{
              //flex: 1,
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              onPress={() => {
                // Actions.Bayar({userInfo:this.state.userInfo})
                if (this.state.order_id) {
                  this.checkOutAction("update");
                } else {
                }
              }}
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                borderRadius: 15,
                elevation: 1,
                width: "35%",
                display: this.state.order_id ? "flex" : "none",
                marginRight: 15,
                //height: 66,
                padding: 10,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={
                  ([MainStyle.robotoNormal],
                  {
                    fontSize: 13,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  })
                }
              >
                {_simpan[this.state.languageIndex]}
              </Text>
            </Button>

            <Button
              onPress={() => {
                // Actions.Bayar({userInfo:this.state.userInfo})
                this.checkOutAction();
              }}
              style={{
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                borderRadius: 15,
                elevation: 1,
                width: this.state.order_id ? "60%" : "100%",
                //height: 66,
                padding: 10,
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={
                  ([MainStyle.robotoNormal],
                  {
                    fontSize: 13,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  })
                }
              >
                {!this.state.order_id &&
                this.state.selectedSalesType === "Dine-In"
                  ? _simpan[this.state.languageIndex]
                  : _lanjut[this.state.languageIndex]}
              </Text>
            </Button>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#FFF",
              paddingTop: 10,
              marginTop: 10,
              display: "none"
            }}
          >
            <View style={{ width: "33%", justifyContent: "space-between" }}>
              <Button
                onPress={() => {
                  this.cetakBill();
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  elevation: 1,
                  width: "90%",
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormalBold],
                    {
                      fontSize: 12,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    })
                  }
                >
                  {_cetak_bill[this.state.languageIndex]}
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.cetakBill("Dapur");
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  elevation: 1,
                  width: "90%",
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 12,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    })
                  }
                >
                  {_cetak_dapur[this.state.languageIndex]}
                </Text>
              </Button>
              {/* <Button
                style={{
                  backgroundColor: "rgba(25, 53, 94, 0.69)",
                  elevation: 1,
                  width: "50%",
                  marginTop: 10,
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  Actions.Meja({
                    userInfo: this.state.userInfo,
                    colorIndex: this.state.colorIndex
                  });
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal], { fontSize: 16, color: WHITE })
                  }
                >
                  Split/Join
                </Text>
              </Button> */}
            </View>
            <View style={{ width: "33%", justifyContent: "space-between" }}>
              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  this.checkOutAction("update");
                }}
                style={{
                  display: this.state.order_id ? "flex" : "none",
                  backgroundColor: "#7AB93C",
                  elevation: 1,
                  width: "90%",
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal], { fontSize: 12, color: WHITE })
                  }
                >
                  Update Order
                </Text>
              </Button>
              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  this.newOrder(true, true);
                }}
                style={{
                  display: this.state.order_id ? "flex" : "none",
                  backgroundColor: RED_500,
                  elevation: 1,
                  width: "90%",
                  marginTop: 10,
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.robotoNormal], { fontSize: 12, color: WHITE })
                  }
                >
                  Cancel Order
                </Text>
              </Button>
            </View>
            <Button
              onPress={() => {
                // Actions.Bayar({userInfo:this.state.userInfo})
                this.checkOutAction();
              }}
              style={{
                backgroundColor: "#7AB93C",
                borderRadius: 15,
                elevation: 2,
                width: "32%",
                height: 66,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={
                  ([MainStyle.robotoNormal], { fontSize: 12, color: WHITE })
                }
              >
                {!this.state.order_id &&
                this.state.selectedSalesType === "Dine-In"
                  ? "Check In"
                  : "Check Out"}
              </Text>
            </Button>
          </View>
          {/* {this.renderTabBar()} */}
        </View>
      </View>
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
    //console.log("string length ==> ", length);

    let array_length = Math.ceil(length / limit);
    //console.log("array_length  ==> ", array_length);

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

  async connectPrinter(address) {
    //let name = "RP58BU";

    await BluetoothManager.connect(address) // the device address scanned.
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

    await BluetoothEscposPrinter.printText("", {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1
    });
  }

  async printAction(type = "cashier") {
    try {
      // let printer_address = "00:0E:0E:02:93:45";
      // let printer_name = "RP58BU";
      const { printer_main, printer_kitchen } = this.state;
      console.log("printer_main_index ==> ", printer_main.address);
      console.log("printer_main_index ==> ", printer_kitchen.address);
      let printer_address = printer_main.address.toString();

      if (type === "cashier") {
        if (printer_main) {
          printer_address = printer_main.address.toString();
        }
      } else {
        if (printer_kitchen) {
          printer_address = printer_kitchen.address.toString();
        }
      }

      // address = "00:0E:0E:02:93:45";

      if (printer_address !== "") {
        console.log("address ==> ", printer_address);

        await BluetoothManager.connect(printer_address) // the device address scanned.
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
        const { userInfo, dataBill, bill_transId } = this.state;
        let address = "Alamat dari Retail";
        let gerai_name = userInfo.gerai_name;
        let description = userInfo.description;
        let cashier_name = userInfo.name;
        let transaction_id = "";
        let time = moment(new Date()).format("HH:mm");
        let no_table = this.state.selectedTable.name;

        let subTotal = 0;
        let total_bayar = 0;

        console.log("dataBill ==> ", dataBill);

        dataBill.map((v, i) => {
          subTotal = subTotal + v.qty * v.price;
          subTotal = subTotal + v.qty * v.salesTypeValue;
        });

        let grand_total = subTotal * 1.15;

        total_bayar = grand_total;

        // BluetoothEscposPrinter.printPic(ImageBase64, {
        //   width: 200,
        //   height: 200
        // });
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER
        );

        if (type !== "cashier") {
          await BluetoothEscposPrinter.printText(`***INCOMING ORDER***\n\r`, {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          });
        }
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

        if (this.state.selectedSalesType === "Dine-In") {
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
            BluetoothEscposPrinter.printText(
              `${product_name_array[i]}\n\r`,
              {}
            );
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

        let tax = parseInt(Math.ceil(grand_total) - subTotal).toString();
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
      } else {
        alert("Tidak terkoneksi dengan printer");
      }
    } catch (error) {
      //alert(error);
      alert("Terjadi kesalahan untuk mencetak struk mohon coba kembali.");
    }

    //BluetoothEscposPrinter.openDrawer(0, 250, 250);
  }

  renderCartButton() {
    return (
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 25,
          //width: "100%",

          //height: 50,
          //alignSelf: "flex-end",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Button
          onPress={() => {
            this.setState({
              //formItem: true
              showBill: true
            });
          }}
          style={{
            display: this.state.dataBill.length > 0 ? "flex" : "none",
            elevation: 2,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            width: 60,
            height: 60,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderRadius: 30
          }}
        >
          <Ionicons
            name="md-cart"
            size={25}
            style={[
              styles.headerIcon,
              { color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex) }
            ]}
          />

          {/* <Text
            style={
              ([MainStyle.robotoNormal],
              {
                fontSize: 10,
                color: BLACK
              })
            }
          >
            {_meja[this.state.languageIndex]}
          </Text> */}
        </Button>
      </View>
    );
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
          justifyContent: "space-between"
        }}
      >
        <Button
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
        </Button>

        <Button
          style={{
            width: "24%",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this.newOrder(true, true);
          }}
        >
          {/* <MaterialIcons
            name={"event-note"}
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: BLACK
            }}
          /> */}
          <Entypo
            name={"plus"}
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
            {_pesanan_baru[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
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
        </Button>

        <Button
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
        </Button>
      </View>
    );
  }

  render() {
    let { notifNumber } = this.props;
    const {
      refreshing,
      showAlert,
      formItem,
      showNameForm,
      newName,
      lastUpdate,
      timeCompare
    } = this.state;
    notifNumber = 9999;
    //console.log("get additionalProduct ==> ", this.state.additionalProduct);

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    // let timeDifference = moment(lastUpdate).diff(moment(timeCompare));
    let timeDifference = moment(lastUpdate).diff(moment(timeCompare));

    let timeDifferenceSecond = Math.round(timeDifference / 1000);
    let timeDifferenceMinute = Math.round(timeDifferenceSecond / 60);
    let timeDifferenceHour = Math.round(timeDifferenceSecond / 3600);

    return (
      <View style={[styles.body]}>
        {this.state.loading ? <Loading /> : <View />}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          logoutAction={() => this.logoutAction()}
          title={_pesanan_baru[this.state.languageIndex]}
          //title={this.state.selectedSalesType}
          //title={this.state.action}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          backAction={() => {
            if (this.state.dataBill.length > 0) {
              this.setState({ showClearCartBackHandler: true });
            } else {
              this.newOrder(true, true);
              Actions.pop();
            }
          }}
          hideLogin={true}
          cart={false}
          cartAction={() => {
            this.setState({
              //formItem: true
              showBill: true
            });
          }}
          cartNumber={this.state.dataBill.length}
          salesType={this.state.selectedSalesType}
          salesTypeAction={val => {
            this.modifyBillChangeGojek(val, this.state.selectedSalesType);

            this.setState({ selectedSalesType: val, expand: true });

            // this.setState({
            //   //formItem: true
            //   showBill: true
            // });
          }}
          table={this.state.selectedTable}
          action={this.state.action}
          tableAction={val => {
            //return id

            console.log("select Table ==> ", val);
            this.setState({ selectedTable: val, expand: false });

            // this.setState({
            //   //formItem: true
            //   showBill: true
            // });
          }}
          expand={this.state.expand}
          salesTypeList={this.state.additionalSalesType}
          tableList={this.state.additionalTable}
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {showNameForm ? (
          <TransactionNewName
            closeText={"Submit"}
            value={newName}
            actions={() => {
              this.setState({ showNameForm: false });
            }}
            changeAction={text => {
              this.setState({ newName: text });
            }}
          />
        ) : (
          <View />
        )}

        {this.state.showClearCart === true ? (
          <ClearCart
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showClearCart: false });
            }}
            submitAction={() => {
              this.setState({ showClearCart: false, showBill: false });
              this.newOrder(true, true);
            }}
          />
        ) : (
          <View />
        )}

        {this.state.showClearCartBackHandler === true ? (
          <ClearCart
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showClearCartBackHandler: false });
            }}
            submitAction={() => {
              this.setState({ showClearCartBackHandler: false });
              this.newOrder(true, true);
              Actions.pop();
            }}
          />
        ) : (
          <View />
        )}

        {this.state.showAlert ? (
          <CustomAlert
            message={this.state.alertMessage}
            //title={'Success'}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}
        {/* <Button style={{
        backgroundColor: '#BCA', height: 100,
        width: 100, position: 'absolute', zIndex: 100, left: 100, top: 100}}
        onPress={()=>{alert(';;')}}></Button> */}

        <View
          style={{
            //flexDirection: "column",
            padding: 15,
            paddingBottom: 0,
            flex: 1,
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              flex: 1,
              //display: this.state.showBill ? "none" : "flex",
              width: "100%",
              marginTop: 0,
              backgroundColor: formItem ? "transparent" : "transparent",
              borderRadius: formItem ? 5 : 0,
              borderWidth: formItem ? 1 : 0,
              borderColor: "#732F46"
            }}
          >
            <View style={{ backgroundColor: WHITE }}>
              {/* <Text>{this.state.lastUpdate}</Text>
              <Text>{this.state.timeCompare}</Text>
              <Text>{timeDifference}</Text>
              <Text>{timeDifferenceSecond}</Text>
              <Text>{timeDifferenceMinute}</Text>
              <Text>{timeDifferenceHour}</Text> */}

              {this.renderSearch()}
            </View>

            {this.renderLeftSide()}
            {this.renderFavLeftSide()}
            {this.renderButtonsLeftSide()}
            {this.renderFormItem()}
          </View>

          {/* Left Side End */}
          {/*  */}
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.showBill}
            onRequestClose={() => {
              this.setState({ showBill: false });
            }}
          >
            {this.state.loading ? <Loading /> : <View />}
            {this.renderNew(
              this.state.newWidth,
              this.state.newTop,
              this.state.newLeft
            )}

            {this.showAdditionalTable(
              this.state.tableWidth,
              this.state.tableTop,
              this.state.tableLeft
            )}

            {this.showAdditionalSalesType(
              this.state.tableWidth,
              this.state.tableTop,
              this.state.tableLeft
            )}
            {/* header kart */}
            <MobileHeader
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              title={_keranjang[this.state.languageIndex]}
              notif={false}
              loginInformation={this.state.userInfo}
              menu={false}
              back={true}
              backAction={() => {
                this.setState({ showBill: false });
              }}
              hideLogin={true}
              cart={false}
              cartAction={() => {
                this.setState({
                  //formItem: true
                  showBill: true
                });
              }}
              cartNumber={this.state.dataBill.length}
              print={false}
              printAction={() => {
                this.printAction();
              }}
              printText={_cetak_bill[this.state.languageIndex]}
              clearCart={true}
              clearCartAction={() => {
                //this.printAction();
                this.setState({ showClearCart: true });
              }}
              clearCartText={_clear_cart[this.state.languageIndex]}
            />

            <View
              style={{
                flex: 1,

                //display: this.state.showBill ? "flex" : "none",
                width: "100%",
                marginTop: 0,
                backgroundColor: "#FFF",
                //elevation: 3,
                zIndex: 3,
                borderRadius: 5
                //borderColor: "rgba(0, 0, 0, 0.4)",
                //borderWidth: 0.1
              }}
            >
              {this.renderOrderInformation()}
              {/* <View
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  elevation: 1,
                  zIndex: 999999
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showBill: false });
                  }}
                >
                  <Ionicons
                    name={"ios-close-circle-outline"}
                    size={30}
                    color={BLACK}
                  />
                </TouchableOpacity>
              </View> */}
              {/* <ScrollView
                style={
                  {
                    //flex: 1
                  }
                }
              > */}
              <View style={{ flex: 1 }}>{this.renderRightSide()}</View>

              {/* </ScrollView> */}
            </View>
          </Modal>

          {/* Right Side End */}
          <View
            style={
              {
                //width: "100%",
                // backgroundColor: "rgba(248, 248, 248, 0.92)",
                //height: 50,
                //backgroundColor: "#BCA",
                //alignSelf: "flex-end",
                //flexDirection: "row",
                //justifyContent: "space-between"
              }
            }
          >
            {this.renderCartButton()}
          </View>
        </View>

        {/* {this.renderTabBar()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: "column"
  }
});
