/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
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
  Modal
} from "react-native";

import MainStyle from "../../Styles";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";
import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import PrinterFunctions from "../../Libraries/PrinterFunctions";

import Header from "../../Components/Header";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import TransactionNewName from "../../Components/TransactionNewName";

import Loading from "../../Components/Loading";

import CustomAlert from "../../Components/CustomAlert";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Geolocation from "@react-native-community/geolocation";
// import Orientation from "react-native-orientation-locker";
// eslint-disable-next-line prettier/prettier

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
  GREY_700
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";
import ColorFunctions from "../../Libraries/ColorFunctions";
import MenuFunctions from "../../Libraries/MenuFunctions";
//import Login from '../Account/login';

import {
  GetMenuFavAPI,
  GetCategoryMenuAPI,
  GetMenuByCategoryAPI,
  GetMenuAddonsAPI,
  SaveOrderAPI,
  UpdateOrderAPI,
  GetTableAPI,
  UpdateStatusOrderByIdAPI
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
  _cetak_bill,
  _cetak_dapur,
  _order,
  _nama,
  _data_pelanggan,
  _meja,
  _gagal,
  _berhasil_update,
  _berhasil_tambah,
  _error_1,
  _error_2,
  _cancel_order,
  _sales_type
} from "../../Libraries/DictionaryHome";
import { _ok_alert } from "../../Libraries/DictionarySetting";
import { _sub_total } from "../../Libraries/DictionaryHistory";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: 0,
      booking_id: 0,
      alertMessage: [],
      show_order_id: false,
      footer_printer: "",
      order_id: null,
      formItem: false,
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
      showAlert: false,
      currency: "IDR",
      showAll: false,
      showFav: true,
      showFavList: true,
      activeCategory: 0,
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
      dataMenu: [],
      dataMenuFav: []
    };
  }

  componentDidMount() {
    //console.log('Home Page Props ==> ', this.props);
    //console.log("Home Page colorIndex ==> ", this.props);
    //this.getCurrentLocation();

    //this.connectPrinter();
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

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
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

    // if (Dimensions.get("window").width > Dimensions.get("window").height) {
    //   alert("miring");
    // } else {
    //   alert("berdiri");
    // }

    this.getData();
    this.getDataCategory();
    this.getAddonsByMenu(1);
    this.getDataTable();
    this.getPrinterData();
  }

  componentDidUpdate(nextProps) {
    //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);
    if (this.props !== nextProps) {
      //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);
      LoginFunctions.LoginInformation(val => {
        //console.log("login info ==> ", val);
        this.setState({
          userInfo: val
          //additionalProduct: defaultProductSelection
        });
      });

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

      this.getData();
      this.getDataCategory();
      this.getAddonsByMenu(1);
      this.getDataTable();
      this.getPrinterData();
    }
  }

  getPrinterData() {
    PrinterFunctions.GetKitchenPrinter(val => {
      if (val) {
        console.log("Printer Kitchen Index ==> ", val);
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
        console.log("Main Kitchen Index ==> ", val);
        this.setState({ printer_main: val });
      } else {
        alert(_alert_printer[this.state.languageIndex]);
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
    let uri = `${GetTableAPI}?gerai_id=${gerai_id}`;

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

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;

        this.setState({ dataMenuFav: resultData.data });
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getDataCategory(search = this.state.searchKey) {
    const gerai_id = this.state.userInfo.gerai_id;
    let uri = `${GetCategoryMenuAPI}?gerai_id=${gerai_id}&search=&page=1`;

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        //console.log("getData ==> ", result);

        this.setState({ dataCategory: resultData.data });
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getMenuByCategory(
    search = this.state.searchKey,
    activeCategory = this.state.activeCategory
  ) {
    const gerai_id = this.state.userInfo.gerai_id;
    let uri = `${GetMenuByCategoryAPI}?gerai_id=${gerai_id}&category_id=${activeCategory}&search=&page=1`;

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          dataMenu: resultData.data,
          activeCategory: activeCategory
        });
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getAddonsByMenu(id = this.state.selectedProduct.id, action = "add") {
    //id = 1;
    let uri = `${GetMenuAddonsAPI}?id=${id}`;
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
    if (this.state.formAction == "edit") {
      MenuFunctions.GetMenu(val => {
        if (val) {
          console.log("Data Bill ==> ", val);
          this.setState({ dataBill: val, formItem: false });
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
    dataBill.splice(index, 1);

    MenuFunctions.SaveMenu(dataBill, val => {
      console.log("Sukses Delete");
    });

    this.setState({ dataBill: dataBill });
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

    // console.log("productPrice ==> ", productPrice);
    // console.log("selectedQuantity ==> ", selectedQuantity);
    // console.log("selectedProduct ==> ", selectedProduct);
    // console.log("dataBill.length ==> ", dataBill.length + 1);
    // console.log("additionalProduct ==> ", additionalProduct);

    let status = 1;
    if (formAction === "edit") {
      status = dataBill[formIndex].status;
    }

    const dataAdd = {
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

    if (formAction == "add") {
      dataBill.push(dataAdd);

      MenuFunctions.SaveMenu(dataBill, val => {
        console.log("Sukses Add");
      });

      this.setState({
        dataBill: dataBill,
        formItem: false
      });
    } else if (formAction == "edit") {
      dataBill[formIndex] = dataAdd;
      MenuFunctions.SaveMenu(dataBill, val => {
        console.log("Sukses Add");
      });

      this.setState({
        dataBill: dataBill,
        formItem: false
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
    const { dataBill, userInfo, selectedSalesType, selectedTable } = this.state;
    this.setState({ loading: true });
    let table_id = 0;
    let messageError = [];

    if (selectedSalesType === "Dine-In") {
      table_id = selectedTable.id;
      if (table_id === 0) {
        //messageError.push("Tidak ada meja yang tersedia");
        messageError.push(_error_1[this.state.languageIndex]);
      }
    } else {
      table_id = 0;
    }

    let kode = "";

    if (this.state.customer_id) {
      kode =
        "ORDER_" +
        //data.retail_id +
        //"/" +
        userInfo.gerai_id + //gerai id
        ":" +
        this.state.customer_id +
        ":" +
        moment(new Date()).format("YYYY/MM/DD:HH:mm:ss");
    } else {
      kode =
        "ORDER_" +
        //data.retail_id +
        //"/" +
        userInfo.gerai_id + //gerai id
        ":" +
        moment(new Date()).format("YYYY/MM/DD:HH:mm:ss");
    }

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
        kode: kode,
        detail: dataBill
      })
    );
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
              Actions.Bayar({
                orderId: order_id,
                dataOrder: resultOrder,
                dataBill: dataBill,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                selectedTable: this.state.selectedTable,
                languageIndex: this.state.languageIndex
              });
            } else {
              let message = [];
              //message.push(result.message);

              message.push(_berhasil_tambah[this.state.languageIndex]);

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
      "Check Out Action ==> ",
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
      // messageError.push("Pesanan tidak boleh kosong");
      messageError.push(_error_2[this.state.languageIndex]);
    }

    if (messageError.length === 0) {
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
            Actions.Bayar({
              orderId: order_id,
              dataOrder: resultOrder,
              dataBill: dataBill,
              userInfo: this.state.userInfo,
              colorIndex: this.state.colorIndex,
              selectedTable: this.state.selectedTable,
              languageIndex: this.state.languageIndex
            });
          } else {
            let message = [];
            //message.push(responseJson.message);
            if (result.status)
            {
              message.push(_berhasil_update[this.state.languageIndex]);
            }
            else
            {
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

    MenuFunctions.SaveMenu(dataBill, val => {
      console.log("Sukses Delete");
    });

    if (tempData.qty > 0) {
      this.setState({ dataBill: dataBill });
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

  renderTabBar() {}
  renderSearch() {
    if (this.state.formItem === false) {
      return (
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
                    this.getData(this.state.searchKey);
                    // this.setState({viewSearch: false});
                  }}
                  //onChangeText={(q)=>this._accountUpdate('username',q)}
                  onChangeText={v => this.setState({ searchKey: v })}
                  value={this.state.searchKey}
                  placeholder={`${_cari[this.state.languageIndex]}...`}
                  placeholderTextColor={MAIN_TEXT_COLOR_SELECT(
                    this.state.colorIndex
                  )}
                />
              </View>
            </View>
          </View>
          {this.renderTabBar()}
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
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: "5%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
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
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
            >
              {data.price}
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
          <View style={{ width: "80%" }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: "5%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
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
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
            >
              {data.price}
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
              <View style={{ width: "95%", alignSelf: "center" }}>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 20, color: BLACK }
                  ]}
                >
                  {data.name}
                </Text>
              </View>
              <View
                style={{
                  width: "5%",
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
                        MainStyle.dmSansBold,
                        { fontSize: 14, color: BLACK }
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

    return (
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 20,
          //paddingBottom: 10,
          paddingBottom: 5,
          minHeight: 40,
          //borderColor: WHITE,
          //borderBottomWidth: 1,
          marginLeft: 15,
          marginRight: 15
        }}
      >
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "5%",
            flexDirection: "row"
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
                fontSize: 25,
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
                fontSize: 25,
                color: BLACK
              }}
            />
          </Button>
        </View>
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "45%"
          }}
        >
          <Text
            style={[
              MainStyle.dmSans,
              { fontSize: 20, color: BLACK, textAlign: "center" }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[
              MainStyle.dmSansLight,
              { fontSize: 13, color: BLACK, textAlign: "center" }
            ]}
          >
            {detailString}
          </Text>

          <Text
            style={[
              MainStyle.dmSansLight,
              { fontSize: 13, color: BLACK, textAlign: "center" }
            ]}
          >
            {data.salesType}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "20%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Button
            style={{ width: "27%" }}
            onPress={() => {
              this.changeQty(i, -1);
              //this.changeQty(i);
            }}
          >
            <AntDesign
              name={"minuscircle"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: GREY_700
              }}
            />
          </Button>
          <View style={{ width: "45%", marginRight: 5, alignItems: "center" }}>
            <Text
              style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}
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
              name={"pluscircle"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: GREY_700
              }}
            />
          </Button>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            alignContent: "center",
            //justifyContent: 'flex-end',
            width: "25%"
          }}
        >
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 20, color: BLACK }]}
          >
            {total}
          </Text>
        </View>
      </View>
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

    if (this.state.formAction == "add") {
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
    //console.log('additionalProduct ==> ',additionalProduct)
    let bgColor = [WHITE, "#79BCE2", "#EEEEEE"];
    let textColor = [BLACK, "#C4C4C4"];
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
    }

    if (data.available === false) {
      colorIndex = 2;
      colorText = 1;
    }

    return (
      <View
        style={{
          //flex: 0.24,
          alignItems: "center",
          width: "24%",
          alignContent: "center",
          justifyContent: "center",
          height: 60,
          //backgroundColor: '#BCA',
          marginLeft: "0.5%",
          marginRight: "0.5%"
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
            borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
            alignContent: "center",
            //justifyContent: "space-between",
            justifyContent: "center"
          }}
          disabled={data.available === false ? true : false}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 16,
                color: textColor[colorText],
                //width: width,
                //backgroundColor: '#BCA',
                textAlign: "center"
              }
            ]}
          >
            {data.name}
          </Text>
        </Button>
      </View>
    );
  }

  renderDetailItem(data, i) {
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
          <View style={{ margin: 10, flexDirection: "row" }}>
            <FontAwesome
              name={"circle-thin"}
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: BLACK,
                marginRight: 10
              }}
            />
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {data.name}
            </Text>
            {data.type === "single" ? (
              <Text
                style={[
                  MainStyle.dmSansLight,
                  { fontSize: 20, color: BLACK }
                ]}
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
                marginLeft: 25,
                marginRight: 25,
                marginBottom: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#C4C4C4",
                width: "95%",
                //flex: 1,
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between"
                //backgroundColor: '#AAA',
              }}
            >
              <FlatList
                style={{
                  //flex:1,
                  width: "100%",
                  marginLeft: "-0.5%",
                  marginRight: "-0.5%",

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
                numColumns={4}
                keyExtractor={(item, index) => {
                  return "ListAdditionalSub" + index.toString();
                }}
                //onRefresh={this._onRefresh}
                //onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={0.5}
                //refreshing={refreshing}
              />
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
    let bgColor = [WHITE, "#79BCE2", "#EEEEEE"];
    let textColor = [BLACK, "#C4C4C4"];

    return (
      <View
        style={{
          marginLeft: 25,
          marginRight: 25,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "30%",
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
              borderWidth: 1,
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
                  fontSize: 16,
                  color: textColor[0],
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
            width: "30%",
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
              borderWidth: 1,
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
                  fontSize: 16,
                  color: textColor[0],
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
            width: "30%",
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
              borderWidth: 1,
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
                  fontSize: 16,
                  color: textColor[0],
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
    if (formItem) {
      return (
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            flexDirection: "column"
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              height: 50,
              justifyContent: "space-between"
            }}
          >
            <Button
              onPress={() => {
                this.cancelFormItem();
              }}
              style={{
                width: "15%",
                borderRadius: 25,
                elevation: 1,
                backgroundColor: "rgba(225, 114, 114, 0.9)",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: WHITE }
                ]}
              >
                {_cancel[this.state.languageIndex]}
              </Text>
            </Button>
            <View
              style={{
                width: "60%",
                //borderRadius: 15,
                //elevation: 1,
                //backgroundColor: 'rgba(6, 78, 162, 0.9)',
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: BLACK }
                ]}
              >
                {this.state.selectedProduct.name}
              </Text>
              <Text
                style={[MainStyle.dmSans, { fontSize: 16, color: BLACK }]}
              >
                {/* Lengkapi detail pesanan! */}
                {this.state.currency}{" "}
                {(this.state.productPrice + this.state.salesTypeValue) *
                  this.state.selectedQuantity}
              </Text>
            </View>
            <Button
              onPress={() => {
                this.addOrder();
              }}
              style={{
                width: "15%",
                borderRadius: 25,
                elevation: 1,
                backgroundColor: "rgba(6, 78, 162, 0.9)",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: WHITE }
                ]}
              >
                {_next[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
          {/* Header Form */}
          {/* Kotak Form */}
          <View
            style={{
              flex: 1,
              backgroundColor: WHITE,
              marginTop: 20,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.61)",
              width: "100%",
              borderRadius: 5
            }}
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ marginTop: 0, padding: 15 }}>
                {/* additionalnya */}

                <View>
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
                </View>
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
                  <View style={{ margin: 10, flexDirection: "row" }}>
                    <FontAwesome
                      name={"circle-thin"}
                      style={{
                        alignSelf: "center",
                        fontSize: 25,
                        color: BLACK,
                        marginRight: 10
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        { fontSize: 20, color: BLACK }
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
                      width: "45%"
                    }}
                  >
                    <View style={{ margin: 10, flexDirection: "row" }}>
                      <FontAwesome
                        name={"circle-thin"}
                        style={{
                          alignSelf: "center",
                          fontSize: 25,
                          color: BLACK,
                          marginRight: 10
                        }}
                      />
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          { fontSize: 20, color: BLACK }
                        ]}
                      >
                        {_qty_long[this.state.languageIndex]}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                        marginLeft: 25,
                        marginRight: 25,
                        marginBottom: 10,
                        flexDirection: "row",
                        //paddingRight: 20,
                        paddingBottom: 10,
                        width: "70%",
                        //backgroundColor: '#BCA',
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderColor: "#C4C4C4"
                      }}
                    >
                      <Button
                        style={{ elevation: 2, borderRadius: 10 }}
                        onPress={() => {
                          this.changeQtyProduct(-1);
                        }}
                      >
                        <AntDesign
                          name={"minussquareo"}
                          style={{
                            alignSelf: "center",
                            fontSize: 33,
                            color: BLACK,
                            backgroundColor: WHITE
                          }}
                        />
                      </Button>
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          {
                            width: "50%",
                            fontSize: 16,
                            color: BLACK,
                            textAlign: "center"
                          }
                        ]}
                      >
                        {this.state.selectedQuantity}
                      </Text>
                      <Button
                        style={{
                          borderRadius: 10,
                          //marginRight: 25,
                          elevation: 2
                        }}
                        onPress={() => {
                          this.changeQtyProduct(1);
                        }}
                      >
                        <AntDesign
                          name={"plussquareo"}
                          style={{
                            alignSelf: "center",
                            fontSize: 33,
                            color: BLACK,
                            backgroundColor: WHITE
                          }}
                        />
                      </Button>
                    </View>
                  </View>
                  {/* Kuantitas */}
                  <View
                    style={{
                      //backgroundColor: '#BCA',
                      width: "52%"
                    }}
                  >
                    <View style={{ margin: 10, flexDirection: "row" }}>
                      <FontAwesome
                        name={"circle-thin"}
                        style={{
                          alignSelf: "center",
                          fontSize: 25,
                          color: BLACK,
                          marginRight: 10
                        }}
                      />
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          { fontSize: 20, color: BLACK }
                        ]}
                      >
                        {_catatan[this.state.languageIndex]} -
                      </Text>
                      <Text
                        style={[
                          MainStyle.dmSansLight,
                          { fontSize: 20, color: BLACK }
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
                        //marginLeft: 25,
                        //  marginRight: 25,
                        marginBottom: 10,
                        flexDirection: "row",
                        paddingRight: 20,
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
        </View>
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
                      <View style={{ width: "5%" }}>
                        <Ionicons
                          name={"md-menu"}
                          style={{
                            alignSelf: "center",
                            fontSize: 25,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }}
                        />
                      </View>
                      <View style={{ width: "90%", alignSelf: "center" }}>
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 20,
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
                          width: "5%",
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
                      <View style={{ width: "5%" }}>
                        <Ionicons
                          name={"md-star"}
                          style={{
                            alignSelf: "center",
                            fontSize: 25,
                            color: "#FFF736"
                          }}
                        />
                      </View>
                      <View style={{ width: "90%", alignSelf: "center" }}>
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 20,
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
                          width: "5%",
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
          borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
          borderRadius: 10,
          elevation: 1,
          backgroundColor: "#EEE"
        }}
      >
        <View style={{ margin: 15 }}>
          {/* <View style={{ alignItems: "center" }}> */}
          <Image
            resizeMethod="resize"
            style={{
              width: 150,
              height: 150,
              alignSelf: "center"
              //backgroundColor: "#888"
            }}
            resizeMode={"stretch"}
            source={{ uri: data.image }}
          />
          {/* </View> */}
          <View style={{ marginTop: 10 }}>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={
              {
                //alignSelf: "flex-end",
                //alignItems: "flex-end"
              }
            }
          >
            <Text
              style={[MainStyle.dmSans, { fontSize: 14, color: BLACK }]}
            >
              {this.state.currency} {data.price}
            </Text>
          </View>
        </View>
      </Button>
    );
  }

  renderFavLeftSide() {
    if (this.state.formItem === false && this.state.showFavList === true) {
      return (
        <View style={{ flex: 1, backgroundColor: "#C4C4C4" }}>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              //marginBottom: 5,
              paddingBottom: 10,
              //backgroundColor: "#BCA",
              //flex: 1,
              //flexDirection: "row",
              justifyContent: "space-around"
              //backgroundColor: '#AAA',
            }}
          >
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.dataMenuFav}
              numColumns={3}
              renderItem={({ item, index }) => {
                if (this.state.ready === true) {
                  return (
                    <View
                      style={{
                        width: "32.5%",
                        //flex: 0.325,
                        //marginLeft: 15,
                        marginTop: 0,
                        marginBottom: "1%",
                        marginRight: "1%"
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
          <View style={{ justifyContent: "flex-end" }}>
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
                  style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}
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
                  style={[MainStyle.dmSans, { fontSize: 20, color: BLACK }]}
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
                style={[MainStyle.dmSans, { fontSize: 16, color: BLACK }]}
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
                style={[MainStyle.dmSans, { fontSize: 16, color: BLACK }]}
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
              Actions.Meja({
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
          >
            <View>
              <Text
                style={[MainStyle.dmSans, { fontSize: 16, color: BLACK }]}
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
              Actions.Management({
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
          >
            <View>
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 16,
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
      <View style={{ margin: 15, flex: 1, zIndex: 5 }}>
        {/* {this.renderNew(width,py,px)} */}
        <View
          style={{
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
                    MainStyle.dmSansBold,
                    { fontSize: 20, color: BLACK }
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
                    MainStyle.dmSansBold,
                    { fontSize: 20, color: BLACK }
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
              <View>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 20, color: BLACK }
                  ]}
                >
                  New
                </Text>
              </View>
              <AntDesign
                name={"pluscircleo"}
                style={{
                  alignSelf: "flex-start",
                  fontSize: 25,
                  color: "#72B9E1",
                  position: "absolute",
                  margin: 10,
                  left: 0,
                  top: 0
                }}
              />
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
            elevation: 1,
            backgroundColor: "#EEEEEE",
            minHeight: 400,
            height: 400,
            borderRadius: 5,
            marginTop: 15
            //alignItems: 'center',
            //justifyContent: 'center'
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
              paddingBottom: 10,
              height: 40,
              borderColor: WHITE,
              borderBottomWidth: 1,
              marginLeft: 15,
              marginRight: 15
            }}
          >
            <View
              style={{
                alignItems: "center",
                alignContent: "center",
                width: "50%"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: BLACK }
                ]}
              >
                Item
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                alignContent: "center",
                width: "25%"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: BLACK }
                ]}
              >
                Qty
              </Text>
              {/* Quantity Bill */}
            </View>
            <View
              style={{
                alignItems: "center",
                alignContent: "center",
                width: "25%",
                paddingLeft: 15
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: BLACK }
                ]}
              >
                Total
              </Text>
            </View>
          </View>
          {/* Header Bill */}
          <View style={{ flex: 1 }}>
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.dataBill}
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
                      {this.renderBill(item, index)}
                    </View>
                  );
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
                alignContent: "center",
                alignItems: "flex-start",
                width: "25%"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 22, color: BLACK }
                ]}
              >
                {_sub_total[this.state.languageIndex]} :
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                width: "25%"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 22, color: BLACK }
                ]}
              >
                {subTotal}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#FFF",
              paddingTop: 10,
              marginTop: 10
            }}
          >
            <View style={{ width: "66%", justifyContent: "space-between" }}>
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
                  width: "50%",
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.dmSans],
                    {
                      fontSize: 16,
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
                  width: "50%",
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.dmSans],
                    {
                      fontSize: 16,
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
                    ([MainStyle.dmSans], { fontSize: 16, color: WHITE })
                  }
                >
                  Split/Join
                </Text>
              </Button> */}
              <Button
                onPress={() => {
                  // Actions.Bayar({userInfo:this.state.userInfo})
                  this.checkOutAction("update");
                }}
                style={{
                  display: this.state.order_id ? "flex" : "none",
                  backgroundColor: "#7AB93C",
                  elevation: 1,
                  width: "50%",
                  marginTop: 10,
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.dmSans], { fontSize: 16, color: WHITE })
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
                  width: "50%",
                  marginTop: 10,
                  borderRadius: 5,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={
                    ([MainStyle.dmSans], { fontSize: 16, color: WHITE })
                  }
                >
                  {_cancel_order[this.state.languageIndex]}
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
                style={([MainStyle.dmSans], { fontSize: 16, color: WHITE })}
              >
                {!this.state.order_id &&
                this.state.selectedSalesType === "Dine-In"
                  ? "Check In"
                  : "Check Out"}
              </Text>
            </Button>
          </View>
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

  connectPrinter() {
    let address = "00:0E:0E:02:93:45";
    let name = "RP58BU";

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
          alert(e);
        }
      );
  }

  async printAction(type = "cashier") {
    try {
      // let printer_address = "00:0E:0E:02:93:45";
      // let printer_name = "RP58BU";
      let printer_address = "";
      const { printer_main, printer_kitchen } = this.state;
      console.log("printer_main_index ==> ", printer_main.address);
      console.log("printer_main_index ==> ", printer_kitchen.address);

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

        BluetoothManager.connect(printer_address) // the device address scanned.
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
      alert(error);
      alert("Tidak bisa konek printer");
    }

    //BluetoothEscposPrinter.openDrawer(0, 250, 250);
  }

  render() {
    let { notifNumber } = this.props;
    const {
      refreshing,
      showAlert,
      formItem,
      showNameForm,
      newName
    } = this.state;
    notifNumber = 9999;
    //console.log("get additionalProduct ==> ", this.state.additionalProduct);

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[styles.body]}>
        {this.state.loading ? <Loading /> : <View />}
        <Header
          colorIndex={this.state.colorIndex}
          logoutAction={() => this.logoutAction()}
          title={this.props.title}
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
        {/* <Button style={{
        backgroundColor: '#BCA', height: 100,
        width: 100, position: 'absolute', zIndex: 100, left: 100, top: 100}}
        onPress={()=>{alert(';;')}}></Button> */}
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
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            flex: 1,
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              width: "55%",
              marginTop: 0,
              backgroundColor: formItem ? "#EEEEEE" : "transparent",
              borderRadius: formItem ? 5 : 0,
              borderWidth: formItem ? 1 : 0,
              borderColor: MAIN_THEME_COLOR
            }}
          >
            <View style={{ backgroundColor: "#C4C4C4" }}>
              {this.renderSearch()}
            </View>

            {this.renderLeftSide()}
            {this.renderFavLeftSide()}
            {this.renderButtonsLeftSide()}
            {this.renderFormItem()}
          </View>

          {/* Left Side End */}
          <View
            style={{
              width: "44%",
              marginTop: 0,
              backgroundColor: "#FFF",
              elevation: 3,
              zIndex: 3,
              borderRadius: 5,
              borderColor: "rgba(0, 0, 0, 0.4)",
              borderWidth: 0.1
            }}
          >
            <ScrollView style={{ flex: 1 }}>
              {this.renderRightSide()}
            </ScrollView>
          </View>

          {/* Right Side End */}
        </View>
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
