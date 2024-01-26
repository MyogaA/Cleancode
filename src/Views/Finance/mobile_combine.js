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

import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/Dropdown";
import MobileMoveItem from "../../Components/MobileMoveItem";
import Loading from "../../Components/MobileLoading";
import CustomAlert from "../../Components/CustomAlert";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
  MAIN_TEXT_COLOR_SELECT,
  WHITE,
  BLACK,
  RED_500,
  GREY_100,
  GREY_900,
  GREY_700
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";

import moment from "moment";
import ColorFunctions from "../../Libraries/ColorFunctions";

import {
  _manajemen_meja,
  _action_0,
  _action_1,
  _action_2,
  _notifikasi,
  _booking,
  _tolak,
  _konfirmasi,
  _hold,
  _permintaan_reservasi,
  _message_1,
  _message_2,
  _status_1,
  _status_2,
  _status_3,
  _customer_name,
  _notes,
  _check_in_time,
  _pindah_meja,
  _gabung_pisah_transaksi,
  _batal,
  _kembali,
  _reserved_time,
  _cetak_bill,
  _nama,
  _jumlah,
  _pindahkan_semua,
  _proses_perpindahan,
  _success,
  _failed,
  _update_success
} from "../../Libraries/DictionaryMeja";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import {
  BE_Update_Transaction,
  DetailOrderAPI,
  UpdateOrderByIdAPI
} from "../../Constants";

import DeviceInfo from "react-native-device-info";
import { _ok_alert } from "../../Libraries/DictionarySetting";


export default class MobileManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: DeviceInfo.isTablet(),
      salesTypeTax: 0.2,
      loading: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      showForm: false,
      formQty: 0,
      formType: 1, //1 = left 2 = right
      formIndex: 0,
      showAlert: false,
      alertMessage: [],
      formData: {
        id: 1,
        menu_id: 1,
        name: "Orange Juice",
        qty: 3
      },
      meja1: {},
      meja2: {},
      auth: this.props.auth ? this.props.auth : "",
      prosesTransaksi: false
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

    this.getData();
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

  saveNewOrder() {
    this.setState({ loading: true });
    const { meja1, meja2 } = this.state;

    //this.saveOrderLeft(meja1);
    //this.saveOrderRight(meja2);

    //console.log("new order meja 1 ==> ", meja1);
    //console.log("new order meja 2 ==> ", meja2);

    // let move_all = false;

    // let detail1 = meja1.detail;
    // let detail2 = meja2.detail;

    // console.log("detail1.length ==> ", detail1.length);
    // console.log("detail2.length ==> ", detail2.length);

    // if (detail1.length === 0 || detail2.length === 0) {
    //   move_all = true;
    // }

    //if (!move_all) {
    this.saveOrderLeft(meja1);
    this.saveOrderRight(meja2);
    //} else {

    //}

    // fetch(UpdateOrderByIdAPI, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //     //"Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: JSON.stringify({
    //     order_id: meja1.order_id,
    //     detail: meja1.detail
    //   })
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log("responseJson New meja 1 ==> ", responseJson);
    //     this.saveOrderRight();
    //   })
    //   .catch(_err => {
    //     console.log("ERR ==> ", _err);
    //     this.setState({ loading: false });
    //   });

    this.setState({
      loading: false,
      prosesTransaksi: true,
      showAlert: true,
      alertMessage: [_update_success[this.state.languageIndex]]
    });

    // console.log("will unmount");
    //   Actions.pop();
    //   Actions.MobileMeja({
    //     auth: this.state.auth,
    //     userInfo: this.state.userInfo,
    //     colorIndex: this.state.colorIndex,
    //     languageIndex: this.state.languageIndex
    //   });
  }

  // BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

  // onBackPress = () => {
  //   console.log("BackPress");
  //   Actions.pop();
  //   //this.props.onBackPress();
  //   return true;
  // };

  componentWillUnmount() {
    //BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);

    //if (!this.state.prosesTransaksi) {
    console.log("will unmount");
    Actions.MobileMeja({
      auth: this.state.auth,
      userInfo: this.state.userInfo,
      colorIndex: this.state.colorIndex,
      languageIndex: this.state.languageIndex
    });
    //}
  }

  saveOrderLeft() {
    const { meja1, meja2 } = this.state;

    let detail = meja1.detail;
    //console.log("body LEFT ==> ", meja1.detail);

    const order_id = meja1.order_id;

    let items = [];
    //console.log("detail ==> ", detail);
    detail.map((v, i) => {
      let addons = [];
      v.Transaction_Item_Addons.map((val, index) => {
        //const contoh_data = {id: 6, name: "Sosis", price: 2000, parentId: 3}

        let addons_data_temp = {
          id: val.addons_id,
          price: val.price_addons
        };
        addons.push(addons_data_temp);
      });

      let temp_data = {
        sales_type_id: v.sales_type_id,
        product_id: v.product_id,
        quantity: v.quantity,
        price_product: v.price_product,
        price_discount: v.price_discount,
        price_service: v.price_service,
        price_addons_total: v.price_addons_total,
        price_total: v.price_total,
        notes: v.notes,
        addons: addons
      };
      items.push(temp_data);
    });

    console.log("items update left ==> ", items);

    let uri = `${BE_Update_Transaction}${order_id}`;
    console.log("uri left ==> ", uri);

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        items: items
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson Update ==> ", responseJson);
      });
  }
  saveOrderRight() {
    const { meja1, meja2 } = this.state;

    let detail = meja2.detail;
    //console.log("body LEFT ==> ", meja1.detail);

    const order_id = meja2.order_id;

    let items = [];
    //console.log("detail ==> ", detail);
    detail.map((v, i) => {
      let addons = [];
      v.Transaction_Item_Addons.map((val, index) => {
        //const contoh_data = {id: 6, name: "Sosis", price: 2000, parentId: 3}

        let addons_data_temp = {
          id: val.addons_id,
          price: val.price_addons
        };
        addons.push(addons_data_temp);
      });

      let temp_data = {
        sales_type_id: v.sales_type_id,
        product_id: v.product_id,
        quantity: v.quantity,
        price_product: v.price_product,
        price_discount: v.price_discount,
        price_service: v.price_service,
        price_addons_total: v.price_addons_total,
        price_total: v.price_total,
        notes: v.notes,
        addons: addons
      };
      items.push(temp_data);
    });

    console.log("items update Right ==> ", items);

    let uri = `${BE_Update_Transaction}${order_id}`;
    console.log("uri Right ==> ", uri);

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        items: items
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson Update ==> ", responseJson);
      });
  }

  getData() {
    const { data } = this.props;
    //console.log("COMBINE GET DATA ==> ", data);

    let table1 = data[0];
    let table2 = data[1];

    let detail1 = [];
    let detail2 = [];

    console.log("Table1 props ==> ", table1);
    console.log("Table2 props ==> ", table2);

    console.log("Table1 props ==> ", table1.Transaction_Table);
    console.log("Table2 props ==> ", table2.Transaction_Table);

    const orderId1 = table1.Transaction_Table.Transaction.id;
    const orderId2 = table2.Transaction_Table.Transaction.id;

    const detail_1 = table1.Transaction_Table.Transaction.Transaction_Items;
    const detail_2 = table2.Transaction_Table.Transaction.Transaction_Items;

    console.log("orderId1 ==> ", orderId1);
    console.log("orderId2 ==> ", orderId2);

    let meja1 = {};
    let meja2 = {};

    meja1 = {
      id: table1.id,
      order_id: orderId1,
      name: table1.name,
      pax: table1.capacity,
      detail: detail_1
    };

    meja2 = {
      id: table2.id,
      order_id: orderId2,
      name: table2.name,
      pax: table2.capacity,
      detail: detail_2
    };

    this.setState({ meja1: meja1, meja2: meja2 });

    // fetch(`${DetailOrderAPI}?order_id=${orderId1}`, {
    //   method: "GET"
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     let result = responseJson;
    //     if (result.status) {
    //       let resultData = result.data;
    //       meja1 = {
    //         id: table1.id,
    //         order_id: orderId1,
    //         name: table1.name,
    //         pax: table1.capacity,
    //         detail: resultData
    //       };
    //       console.log("meja 1 get data ==> ", meja1);
    //       this.setState({ meja1: meja1 });

    //       //console.log('new data ==>', JSON.stringify(data))
    //     }
    //   })
    //   .catch(_err => {
    //     console.log("ERR ==> ", _err);
    //   });

    // fetch(`${DetailOrderAPI}?order_id=${orderId2}`, {
    //   method: "GET"
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     let result = responseJson;
    //     if (result.status) {
    //       let resultData = result.data;
    //       meja2 = {
    //         id: table2.id,
    //         order_id: orderId2,
    //         name: table2.name,
    //         pax: table2.capacity,
    //         detail: resultData
    //       };
    //       console.log("meja 2 get data ==> ", meja2);

    //       this.setState({ meja2: meja2, loading: false });

    //       //console.log('new data ==>', JSON.stringify(data))
    //     }
    //   })
    //   .catch(_err => {
    //     console.log("ERR ==> ", _err);
    //   });
  }

  moveAllLeft() {
    let { meja1, meja2 } = this.state;

    let detail1 = meja1.detail;
    let detail2 = meja2.detail;

    let tempDetail1 = detail1;
    let tempDetail2 = detail2;

    detail2.map((item2, i2) => {
      console.log(item2);
      let sameItem = false;
      let addQty = 0;
      let tempIndex = 0;

      detail1.map((item1, i1) => {
        console.log(item1);

        if (item2.product_id === item1.product_id) {
          let detailText_1 = "";
          let detailText_2 = "";
          const detailData_1 = item1.Transaction_Item_Addons;
          const detailData_2 = item2.Transaction_Item_Addons;
          detailData_1.map((v, i) => {
            if (detailText_1 !== "") {
              detailText_1 = detailText_1 + ", " + v.Addon.name;
            } else {
              detailText_1 = v.Addon.name;
            }
          });

          detailData_2.map((v, i) => {
            if (detailText_2 !== "") {
              detailText_2 = detailText_2 + ", " + v.Addon.name;
            } else {
              detailText_2 = v.Addon.name;
            }
          });

          if (detailText_1 === detailText_2) {
            sameItem = true;
            addQty = item1.quantity;
            tempIndex = i1;
          }
        }
      });

      if (sameItem === true) {
        //tempDetail1.push(item2);
        tempDetail1.splice(tempIndex, 1);
        tempDetail2.splice(i2, 1);

        // let tempItem = {
        //   id: item2.id,
        //   menu_id: item2.product_id,
        //   name: item2.name,
        //   qty: item2.quantity + addQty
        // };

        let tempItem = item2;
        const qty = item2.quantity + addQty;
        tempItem.quantity = qty;
        const sales_type = item2.sales_type;
        let price_service = 0;
        if (sales_type === "Gojek/Grab") {
          price_service =
            this.state.salesTypeTax *
            (item2.price_product + item2.price_addons_total);
        }

        tempItem.price_total =
          qty *
          (tempItem.price_product +
            tempItem.price_addons_total +
            price_service);

        tempDetail2.push(tempItem);
      }
    });

    let detailCombo = tempDetail2.concat(tempDetail1);
    //console.log("Detail Combo ==> ", detailCombo);

    // let tempMeja1 = {
    //   id: meja1.id,
    //   name: meja1.name,
    //   pax: meja1.pax,
    //   detail: []
    // };
    let tempMeja1 = meja1;
    tempMeja1.detail = [];

    // let tempMeja2 = {
    //   id: meja2.id,
    //   name: meja2.name,
    //   pax: meja2.pax,
    //   detail: detailCombo
    // };
    let tempMeja2 = meja2;
    tempMeja2.detail = detailCombo;
    // console.log(tempMeja2.detail);
    this.setState({
      meja1: tempMeja1,
      meja2: tempMeja2
    });

    console.log("Meja 1 ==> ", tempMeja1);
    console.log("Meja 2 ==> ", tempMeja2);
  }

  moveAllRight() {
    let { meja1, meja2 } = this.state;
    let detail1 = meja1.detail;
    let detail2 = meja2.detail;

    let tempDetail1 = detail1;
    let tempDetail2 = detail2;

    detail1.map((item1, i1) => {
      //console.log(item2);
      let sameItem = false;
      let addQty = 0;
      let tempIndex = 0;

      detail2.map((item2, i2) => {
        if (item2.product_id === item1.product_id) {
          let detailText_1 = "";
          let detailText_2 = "";
          const detailData_1 = item1.Transaction_Item_Addons;
          const detailData_2 = item2.Transaction_Item_Addons;
          detailData_1.map((v, i) => {
            if (detailText_1 !== "") {
              detailText_1 = detailText_1 + ", " + v.Addon.name;
            } else {
              detailText_1 = v.Addon.name;
            }
          });

          detailData_2.map((v, i) => {
            if (detailText_2 !== "") {
              detailText_2 = detailText_2 + ", " + v.Addon.name;
            } else {
              detailText_2 = v.Addon.name;
            }
          });

          if (detailText_1 === detailText_2) {
            sameItem = true;
            addQty = item1.quantity;
            tempIndex = i1;
          }
        }
      });

      if (sameItem === true) {
        //tempDetail1.push(item2);
        tempDetail2.splice(tempIndex, 1);
        tempDetail1.splice(i1, 1);

        // let tempItem = {
        //   id: item1.id,
        //   menu_id: item1.product_id,
        //   name: item1.name,
        //   qty: item1.qty + addQty
        // };

        let tempItem = item1;

        const qty = item1.quantity + addQty;
        tempItem.quantity = qty;
        const sales_type = item1.sales_type;
        let price_service = 0;
        if (sales_type === "Gojek/Grab") {
          price_service =
            this.state.salesTypeTax *
            (item1.price_product + item1.price_addons_total);
        }

        tempItem.price_total =
          qty *
          (tempItem.price_product +
            tempItem.price_addons_total +
            price_service);

        tempDetail1.push(tempItem);
      }
    });

    let detailCombo = tempDetail1.concat(tempDetail2);
    //console.log("Detail Combo ==> ", detailCombo);

    // let tempMeja1 = {
    //   id: meja1.id,
    //   name: meja1.name,
    //   pax: meja1.pax,
    //   detail: detailCombo
    // };

    // let tempMeja2 = {
    //   id: meja2.id,
    //   name: meja2.name,
    //   pax: meja2.pax,
    //   detail: []
    // };

    let tempMeja1 = meja1;
    tempMeja1.detail = detailCombo;

    let tempMeja2 = meja2;
    tempMeja2.detail = [];

    // console.log(tempMeja2.detail);

    this.setState({
      meja1: tempMeja1,
      meja2: tempMeja2
    });

    console.log("Meja 1 ==> ", tempMeja1);
    console.log("Meja 2 ==> ", tempMeja2);
  }

  renderHeaderRight() {
    return [
      <View
        style={{
          flexDirection: "row",
          //borderBottomWidth: 1,
          //borderColor: WHITE,
          paddingBottom: 5,
          marginTop: 15
        }}
      >
        <View style={{ width: "25%" }} />
        <View style={{ width: "40%" }}>
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 12 }]}
          >
            {_jumlah[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ width: "35%" }}>
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 12 }]}
          >
            {_nama[this.state.languageIndex]}
          </Text>
        </View>
      </View>,
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          height: 1,
          elevation: 3,
          borderColor: WHITE,
          marginBottom: 5
        }}
      />
    ];
  }

  renderHeaderLeft() {
    return [
      <View
        style={{
          flexDirection: "row",
          //borderBottomWidth: 1,
          //borderColor: WHITE,
          paddingBottom: 5,
          marginTop: 15
        }}
      >
        <View style={{ width: "45%" }}>
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 12 }]}
          >
            {_nama[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ width: "45%" }}>
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 12 }]}
          >
            {_jumlah[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ width: "10%" }} />
      </View>,
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          height: 1,
          elevation: 3,
          borderColor: WHITE,
          marginBottom: 5
        }}
      />
    ];
  }

  renderFooterLeft() {
    return (
      <Button
        onPress={() => {
          this.moveAllLeft();
        }}
        style={{
          flexDirection: "row",
          marginTop: 10,
          backgroundColor: "#83B235",
          padding: 10,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 15
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={[MainStyle.robotoNormal, { color: WHITE, fontSize: 12 }]}
          >
            {_pindahkan_semua[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ width: "40%" }} />
        <View style={{ width: "10%", alignItems: "flex-end" }}>
          {/* <Button style={{ width: 25, height: 25 }}> */}
          <MaterialCommunityIcons
            name={"chevron-double-right"}
            style={{ color: WHITE, fontSize: 15, marginTop: -2 }}
          />
          {/* </Button> */}
        </View>
      </Button>
    );
  }

  renderFooterRight() {
    return (
      <Button
        onPress={() => {
          this.moveAllRight();
        }}
        style={{
          flexDirection: "row",
          marginTop: 10,
          backgroundColor: "#83B235",
          padding: 10,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 15
        }}
      >
        <View style={{ width: "50%" }}>
          <MaterialCommunityIcons
            name={"chevron-double-left"}
            style={{ color: WHITE, fontSize: 15, marginTop: -2 }}
          />
        </View>
        <View style={{ width: "10%" }} />
        <View
          style={{
            width: "40%",
            alignItems: "flex-end"
          }}
        >
          {/* <Button style={{ width: 25, height: 25 }}> */}
          <Text
            style={[MainStyle.robotoNormal, { color: WHITE, fontSize: 12 }]}
          >
            {_pindahkan_semua[this.state.languageIndex]}
          </Text>
        </View>
        {/* </Button> */}
      </Button>
    );
  }

  renderDataLeft(data, i) {
    let detailText = "";
    //console.log("renderDATALEFT ==> ", data);

    const detailData = data.Transaction_Item_Addons;

    detailData.map((v, i) => {
      if (detailText !== "") {
        detailText = detailText + ", " + v.Addon.name;
      } else {
        detailText = v.Addon.name;
      }
    });
    return (
      <View style={[ss.dataTable]}>
        <View style={{ width: "50%" }}>
          <Text style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 9 }]}>
            {data.Product.name}
          </Text>
          <Text style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 9 }]}>
            {detailText}
          </Text>
        </View>
        <View style={{ width: "10%" }}>
          <Button
            style={{ flexDirection: "row" }}
            onPress={() => {
              this.setState({
                showForm: true,
                formIndex: i,
                formData: data,
                formType: 1,
                formQty: 1
              });
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 12 }]}
            >
              {data.quantity} x
            </Text>
            <MaterialCommunityIcons
              name={"chevron-right"}
              style={{
                color: BLACK,
                fontSize: 15
              }}
            />
          </Button>
        </View>
        <View style={{ width: "40%", alignItems: "flex-end" }}>
          <Button
            onPress={() => {
              this.moveFromLeft(data, i);
            }}
            style={{ width: 25, height: 25 }}
          >
            <MaterialCommunityIcons
              name={"chevron-double-right"}
              style={{ fontSize: 15, marginTop: -2 }}
            />
          </Button>
        </View>
      </View>
    );
  }

  renderDataRight(data, i) {
    let detailText = "";
    //console.log("renderDATARIGHT ==> ", data);

    const detailData = data.Transaction_Item_Addons;

    detailData.map((v, i) => {
      if (detailText !== "") {
        detailText = detailText + ", " + v.Addon.name;
      } else {
        detailText = v.Addon.name;
      }
    });
    return (
      <View style={[ss.dataTable]}>
        <View style={{ width: "10%", alignItems: "flex-start" }}>
          <Button
            style={{ width: 25, height: 25 }}
            onPress={() => {
              this.moveFromRight(data, i);
            }}
          >
            <MaterialCommunityIcons
              name={"chevron-double-left"}
              style={{ fontSize: 15, marginTop: -2 }}
            />
          </Button>
        </View>

        <View style={{ width: "25%", alignItems: "flex-end" }}>
          <Button
            style={{ flexDirection: "row" }}
            onPress={() => {
              //this.moveFromRightVal(data, i, 1);
              this.setState({
                showForm: true,
                formIndex: i,
                formData: data,
                formType: 2,
                formQty: 1
              });
            }}
          >
            <MaterialCommunityIcons
              name={"chevron-left"}
              style={{
                color: BLACK,
                fontSize: 15
              }}
            />
            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 12 }]}
            >
              {data.quantity} x
            </Text>
          </Button>
        </View>
        <View
          style={{
            width: "65%",
            alignItems: "flex-end"
          }}
        >
          <Text style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 9 }]}>
            {data.Product.name}
          </Text>
          <Text style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 9 }]}>
            {detailText}
          </Text>
        </View>
      </View>
    );
  }

  renderLeftTable() {
    const { meja1 } = this.state;
    let data = meja1;
    let width = Dimensions.get("window").width - 30;

    return (
      // <View style={[ss.mainView]}>
      <View
        style={{
          flex: 1,
          width: this.state.tablet ? (width-30) / 2 : width,
          marginRight: 25,
          //backgroundColor: "#EEE",
          borderRadius: 5,
          //borderWidth: 1,
          //elevation: 1,
          borderColor: "#111",
          padding: 5
        }}
      >
        <View
          style={[
            ss.box,
            {
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              padding: 10,
              borderRadius: 15,
              flexDirection: "row",
              justifyContent: "space-between"
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 12
              }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 12
              }
            ]}
          >
            {data.pax} Pax
          </Text>
        </View>
        {this.renderHeaderLeft()}
        <FlatList
          //ListHeaderComponent={this.renderSearch()}
          showsVerticalScrollIndicator={false}
          data={data.detail}
          renderItem={({ item, index }) => {
            return this.renderDataLeft(item, index);
          }}
          //ListFooterComponent={this._renderFooter}
          keyExtractor={(item, index) => {
            return "ShowAllRenderData" + index.toString();
          }}
          //onRefresh={this._onRefresh}
          //onEndReached={this.handleLoadMore}
          //onEndReachedThreshold={0.5}
          //refreshing={refreshing}
        />
        {this.renderFooterLeft()}
      </View>
    );
  }

  renderRightTable() {
    const { meja2 } = this.state;
    let data = meja2;
    let width = Dimensions.get("window").width - 30;

    return (
      // <View style={[ss.mainView]}>
      <View
        style={{
          flex: 1,
          width: this.state.tablet ? (width-30) / 2 : width,
          //backgroundColor: "#EEE",
          borderRadius: 5,
          //borderWidth: 1,
          //elevation: 1,
          borderColor: "#111",
          padding: 5
        }}
      >
        <View
          style={[
            ss.box,
            {
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              padding: 10,
              borderRadius: 15,
              flexDirection: "row",
              justifyContent: "space-between"
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 12
              }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 12
              }
            ]}
          >
            {data.pax}
          </Text>
        </View>
        {this.renderHeaderRight()}

        <FlatList
          //ListHeaderComponent={this.renderSearch()}
          showsVerticalScrollIndicator={false}
          data={data.detail}
          renderItem={({ item, index }) => {
            return this.renderDataRight(item, index);
          }}
          //ListFooterComponent={this._renderFooter}
          keyExtractor={(item, index) => {
            return "ShowAllRenderData" + index.toString();
          }}
          //onRefresh={this._onRefresh}
          //onEndReached={this.handleLoadMore}
          //onEndReachedThreshold={0.5}
          //refreshing={refreshing}
        />
        {this.renderFooterRight()}
      </View>
    );
  }

  moveFromLeft(data, indexData) {
    let { meja1, meja2 } = this.state;
    let detail1 = meja1.detail;
    let detail2 = meja2.detail;

    console.log("detail1 ==> ", detail1);
    console.log("detail2 ==> ", detail2);

    let tempDetail1 = detail1;
    let tempDetail2 = detail2;
    let sameItem = false;
    let addQty = 0;
    let addPrice = 0;
    let tempIndex = 0;
    let tempData = {};

    detail2.map((item2, i2) => {
      console.log("item2 ==> ", item2);

      if (item2.product_id === data.product_id) {
        console.log("data ==> ", data);

        let detailText_1 = "";
        let detailText_2 = "";

        const detailData_1 = item2.Transaction_Item_Addons;
        const detailData_2 = data.Transaction_Item_Addons;

        detailData_1.map((v, i) => {
          if (detailText_1 !== "") {
            detailText_1 = detailText_1 + ", " + v.Addon.name;
          } else {
            detailText_1 = v.Addon.name;
          }
        });

        detailData_2.map((v, i) => {
          if (detailText_2 !== "") {
            detailText_2 = detailText_2 + ", " + v.Addon.name;
          } else {
            detailText_2 = v.Addon.name;
          }
        });

        if (detailText_1 === detailText_2) {
          sameItem = true;
          addQty = data.quantity;
          addPrice = data.quantity * data.price_product;
          tempIndex = i2;
          tempData = item2;
        }
      }
    });

    // simplenya
    // tempDetail1.splice(indexData, 1);
    // tempDetail2.push(data);

    if (sameItem === true) {
      //tempDetail1.push(item2);
      tempDetail1.splice(indexData, 1);
      //tempDetail2.splice(tempIndex, 1);

      // let tempItem = {
      //   id: tempData.id,
      //   menu_id: tempData.product_id,
      //   name: tempData.name,
      //   qty: tempData.qty + addQty
      // };

      let tempItem = tempData;
      const qty = tempData.quantity + addQty;
      
      tempItem.quantity = qty;
      //tempItem.price_total = tempItem.price_product * qty;
      const sales_type = tempData.sales_type;
      let price_service = 0;
      if (sales_type === "Gojek/Grab") {
        price_service =
          this.state.salesTypeTax *
          (tempData.price_product + tempData.price_addons_total);
      }
      tempItem.price_total =
        qty *
        (tempItem.price_product + tempItem.price_addons_total + price_service);

      tempDetail2[tempIndex] = tempItem;
      //tempDetail2.push(tempItem);
    } else {
      tempDetail1.splice(indexData, 1);
      tempDetail2.push(data);
    }

    //let detailCombo = tempDetail2.concat(tempDetail1);
    //console.log("Detail Combo ==> ", detailCombo);

    // let tempMeja1 = {
    //   id: meja1.id,
    //   name: meja1.name,
    //   pax: meja1.pax,
    //   detail: tempDetail1
    // };

    // let tempMeja2 = {
    //   id: meja2.id,
    //   name: meja2.name,
    //   pax: meja2.pax,
    //   detail: tempDetail2
    // };

    let tempMeja1 = meja1;
    tempMeja1.detail = tempDetail1;

    let tempMeja2 = meja2;
    tempMeja2.detail = tempDetail2;

    // console.log(tempMeja2.detail);

    this.setState({
      meja1: tempMeja1,
      meja2: tempMeja2
    });

    console.log("Meja 1 ==> ", tempMeja1);
    console.log("Meja 2 ==> ", tempMeja2);
  }

  moveFromRight(data, indexData) {
    let { meja1, meja2 } = this.state;
    let detail1 = meja1.detail;
    let detail2 = meja2.detail;

    let tempDetail1 = detail1;
    let tempDetail2 = detail2;

    let sameItem = false;
    let addQty = 0;
    let tempIndex = 0;
    let tempData = {};

    detail1.map((item1, i1) => {
      //console.log(item2);

      if (item1.product_id === data.product_id) {
        let detailText_1 = "";
        let detailText_2 = "";

        const detailData_1 = item1.Transaction_Item_Addons;
        const detailData_2 = data.Transaction_Item_Addons;

        detailData_1.map((v, i) => {
          if (detailText_1 !== "") {
            detailText_1 = detailText_1 + ", " + v.Addon.name;
          } else {
            detailText_1 = v.Addon.name;
          }
        });

        detailData_2.map((v, i) => {
          if (detailText_2 !== "") {
            detailText_2 = detailText_2 + ", " + v.Addon.name;
          } else {
            detailText_2 = v.Addon.name;
          }
        });

        if (detailText_1 === detailText_2) {
          sameItem = true;
          addQty = data.quantity;
          tempIndex = i1;
          tempData = item1;
        }
      }
    });

    // simplenya
    // tempDetail1.splice(indexData, 1);
    // tempDetail2.push(data);

    if (sameItem === true) {
      // let tempItem = {
      //   id: tempData.id,
      //   menu_id: tempData.product_id,
      //   name: tempData.name,
      //   qty: tempData.qty + addQty
      // };
      tempDetail2.splice(indexData, 1);

      let tempItem = tempData;

      const qty = tempData.quantity + addQty;
      //tempItem.price_total = tempItem.price_product * qty;

      tempItem.quantity = qty;
      const sales_type = tempData.sales_type;
      let price_service = 0;
      if (sales_type === "Gojek/Grab") {
        price_service =
          this.state.salesTypeTax *
          (tempData.price_product + tempData.price_addons_total);
      }
      tempItem.price_total =
        qty *
        (tempItem.price_product + tempItem.price_addons_total + price_service);

      tempDetail1[tempIndex] = tempItem;
      // tempDetail1[tempIndex] = tempItem;
      //tempDetail1.push(tempItem);
    } else {
      tempDetail2.splice(indexData, 1);
      tempDetail1.push(data);
    }

    //let detailCombo = tempDetail2.concat(tempDetail1);
    //console.log("Detail Combo ==> ", detailCombo);

    // let tempMeja1 = {
    //   id: meja1.id,
    //   name: meja1.name,
    //   pax: meja1.pax,
    //   detail: tempDetail1
    // };

    // let tempMeja2 = {
    //   id: meja2.id,
    //   name: meja2.name,
    //   pax: meja2.pax,
    //   detail: tempDetail2
    // };

    let tempMeja1 = meja1;
    tempMeja1.detail = tempDetail1;

    let tempMeja2 = meja2;
    tempMeja2.detail = tempDetail2;

    // console.log(tempMeja2.detail);

    this.setState({
      meja1: tempMeja1,
      meja2: tempMeja2
    });
    console.log("Meja 1 ==> ", tempMeja1);
    console.log("Meja 2 ==> ", tempMeja2);
  }

  moveFromLeftVal(data, indexData, value = 1) {
    let { meja1, meja2 } = this.state;
    let detail1 = meja1.detail;
    let detail2 = meja2.detail;
    let tempDetail1 = detail1;
    let tempDetail2 = detail2;
    let sameItem = false;
    let addQty = parseInt(value);
    let tempIndex = 0;
    let tempData = {};

    if (data.quantity > 0) {
      detail2.map((item2, i2) => {
        //console.log("item2 ==> ", item2);

        if (item2.product_id === data.product_id) {
          //console.log("data ==> ", data);

          let detailText_1 = "";
          let detailText_2 = "";

          const detailData_1 = item2.Transaction_Item_Addons;
          const detailData_2 = data.Transaction_Item_Addons;

          //console.log("detailData_1 ==> ", detailData_1);
          //console.log("detailData_2 ==> ", detailData_2);

          detailData_1.map((v, i) => {
            if (detailText_1 !== "") {
              detailText_1 = detailText_1 + ", " + v.Addon.name;
            } else {
              detailText_1 = v.Addon.name;
            }
          });

          detailData_2.map((v, i) => {
            if (detailText_2 !== "") {
              detailText_2 = detailText_2 + ", " + v.Addon.name;
            } else {
              detailText_2 = v.Addon.name;
            }
          });

          //console.log("detailText_1 ==> ", detailText_1);
          //console.log("detailText_2 ==> ", detailText_2);

          if (detailText_1 === detailText_2) {
            sameItem = true;
            addQty = parseInt(value);
            tempIndex = i2;
            tempData = item2;
          }
        }
      });

      if (sameItem === true) {
        // let tempItem = {
        //   id: tempData.id,
        //   menu_id: tempData.product_id,
        //   name: tempData.name,
        //   qty: parseInt(tempData.qty) + parseInt(addQty)
        // };
        // let tempItemOld = {
        //   id: data.id,
        //   menu_id: data.product_id,
        //   name: data.name,
        //   qty: parseInt(data.qty) - parseInt(addQty)
        // };

        let tempItem = tempData;
        tempItem.quantity = parseInt(tempData.quantity) + parseInt(addQty);
        tempItem.price_total =
          (parseInt(tempData.quantity) + parseInt(addQty)) *
          (tempData.price_product +
            tempData.price_addons_total +
            tempData.price_service);

        let tempItemOld = data;
        tempItemOld.quantity = parseInt(data.quantity) - parseInt(addQty);
        tempItem.price_total =
          (parseInt(data.quantity) - parseInt(addQty)) *
          (data.price_product + data.price_addons_total + data.price_service);

        if (tempItemOld.quantity === 0) {
          tempDetail1.splice(indexData, 1);
        } else {
          tempDetail1[indexData] = tempItemOld;
        }
        tempDetail2[tempIndex] = tempItem;
      } else {
        console.log("tempDetail1 ==> ", tempDetail1);
        console.log("tempDetail2 ==> ", tempDetail2);

        const temp_data = data;
        var tempItem = temp_data;
        //var tempItemOld = temp_data;

        const qty_new = parseInt(addQty);
        const qty_old = parseInt(tempItem.quantity) - parseInt(addQty);

        const price_new =
          qty_new *
          (tempItem.price_product +
            tempItem.price_addons_total +
            tempItem.price_service);

        const price_old =
          qty_old *
          (tempItem.price_product +
            tempItem.price_addons_total +
            tempItem.price_service);

        const temp_data_old = {
          Product: tempItem.Product,
          Sales_Type: tempItem.Sales_Type,
          Transaction_Item_Addons: tempItem.Transaction_Item_Addons,
          id: tempItem.id,
          notes: tempItem.notes,
          price_addons_total: tempItem.price_addons_total,
          price_discount: tempItem.price_discount,
          price_product: tempItem.price_product,
          price_service: tempItem.price_service,
          price_total: price_old,
          product_id: tempItem.product_id,
          promo_id: tempItem.promo_id,
          quantity: qty_old,
          sales_type_id: tempItem.sales_type_id,
          status: tempItem.status
        };

        const temp_data_new = {
          Product: tempItem.Product,
          Sales_Type: tempItem.Sales_Type,
          Transaction_Item_Addons: tempItem.Transaction_Item_Addons,
          id: tempItem.id,
          notes: tempItem.notes,
          price_addons_total: tempItem.price_addons_total,
          price_discount: tempItem.price_discount,
          price_product: tempItem.price_product,
          price_service: tempItem.price_service,
          price_total: price_new,
          product_id: tempItem.product_id,
          promo_id: tempItem.promo_id,
          quantity: qty_new,
          sales_type_id: tempItem.sales_type_id,
          status: tempItem.status
        };

        console.log("temp_data_old ==> ", temp_data_old);
        console.log("temp_data_new ==> ", temp_data_new);

        if (temp_data_old.quantity === 0) {
          tempDetail1.splice(indexData, 1);
        } else {
          tempDetail1[indexData] = temp_data_old;
        }
        tempDetail2.push(temp_data_new);

        // let tempItem = {
        //   id: data.id,
        //   menu_id: data.product_id,
        //   name: data.name,
        //   qty: parseInt(addQty)
        // };
        // let tempItemOld = {
        //   id: data.id,
        //   menu_id: data.product_id,
        //   name: data.name,
        //   qty: parseInt(data.quantity) - parseInt(addQty)
        // };
        //let tempItem = data;
        // let tempItem = {
        //   id: data.id,
        //   name: data.name,
        //   qty: parseInt(addQty),
        //   price_base: data.price_base,
        //   price_addons: data.price_addons,
        //   price_service: data.price_service,
        //   sales_type: data.sales_type,
        //   price: data.price,
        //   total:
        //     parseInt(addQty) *
        //     (data.price_base + data.price_addons + data.price_service),
        //   menu_id: data.menu_id,
        //   detail: data.detail
        // };
        // let tempItemOld = {
        //   id: data.id,
        //   name: data.name,
        //   qty: parseInt(data.quantity) - parseInt(addQty),
        //   price_base: data.price_base,
        //   price_addons: data.price_addons,
        //   price_service: data.price_service,
        //   sales_type: data.sales_type,
        //   price: data.price,
        //   total:
        //     (parseInt(data.quantity) - parseInt(addQty)) *
        //     (data.price_base + data.price_addons + data.price_service),
        //   menu_id: data.menu_id,
        //   detail: data.detail
        // };
        // //tempDetail1.splice(indexData, 1);
        // if (tempItemOld.quantity === 0) {
        //   tempDetail1.splice(indexData, 1);
        // } else {
        //   tempDetail1[indexData] = tempItemOld;
        // }
        // tempDetail2.push(tempItem);
      }

      // let tempMeja1 = {
      //   id: meja1.id,
      //   name: meja1.name,
      //   pax: meja1.pax,
      //   detail: tempDetail1
      // };

      // let tempMeja2 = {
      //   id: meja2.id,
      //   name: meja2.name,
      //   pax: meja2.pax,
      //   detail: tempDetail2
      // };

      let tempMeja1 = meja1;
      tempMeja1.detail = tempDetail1;

      let tempMeja2 = meja2;
      tempMeja2.detail = tempDetail2;

      console.log("Meja 1 done ==> ", tempMeja1);
      console.log("Meja 2 done ==> ", tempMeja2);

      this.setState({
        meja1: tempMeja1,
        meja2: tempMeja2
      });
    }
  }

  moveFromRightVal(data, indexData, value = 1) {
    let { meja1, meja2 } = this.state;
    let detail1 = meja1.detail;
    let detail2 = meja2.detail;
    let tempDetail1 = detail1;
    let tempDetail2 = detail2;
    let sameItem = false;
    let addQty = parseInt(value);
    let tempIndex = 0;
    let tempData = {};

    if (data.quantity > 0) {
      detail1.map((item1, i1) => {
        if (item1.product_id === data.product_id) {
          let detailText_1 = "";
          let detailText_2 = "";

          const detailData_1 = item1.Transaction_Item_Addons;
          const detailData_2 = data.Transaction_Item_Addons;

          detailData_1.map((v, i) => {
            if (detailText_1 !== "") {
              detailText_1 = detailText_1 + ", " + v.Addon.name;
            } else {
              detailText_1 = v.Addon.name;
            }
          });

          detailData_2.map((v, i) => {
            if (detailText_2 !== "") {
              detailText_2 = detailText_2 + ", " + v.Addon.name;
            } else {
              detailText_2 = v.Addon.name;
            }
          });

          if (detailText_1 === detailText_2) {
            sameItem = true;
            addQty = parseInt(value);
            tempIndex = i1;
            tempData = item1;
          }
        }
      });

      if (sameItem === true) {
        // let tempItem = {
        //   //kiri
        //   id: tempData.id,
        //   menu_id: tempData.menu_id,
        //   name: tempData.name,
        //   qty: parseInt(tempData.quantity) + parseInt(addQty)
        // };
        // let tempItemOld = {
        //   //kanan
        //   id: data.id,
        //   menu_id: data.menu_id,
        //   name: data.name,
        //   qty: parseInt(data.quantity) - parseInt(addQty)
        // };

        let tempItem = tempData;
        tempItem.quantity = parseInt(tempData.quantity) + parseInt(addQty);
        tempItem.price_total =
          (parseInt(tempData.quantity) + parseInt(addQty)) *
          (tempData.price_product +
            tempData.price_addons_total +
            tempData.price_service);

        let tempItemOld = data;
        tempItemOld.quantity = parseInt(data.quantity) - parseInt(addQty);
        tempItemOld.price_total =
          (parseInt(data.quantity) - parseInt(addQty)) *
          (tempData.price_product +
            tempData.price_addons_total +
            tempData.price_service);

        if (tempItemOld.quantity === 0) {
          tempDetail2.splice(indexData, 1);
        } else {
          tempDetail2[indexData] = tempItemOld;
        }

        tempDetail1[tempIndex] = tempItem;
      } else {
        const temp_data = data;
        var tempItem = temp_data;
        //var tempItemOld = temp_data;

        const qty_new = parseInt(addQty);
        const qty_old = parseInt(tempItem.quantity) - parseInt(addQty);

        const price_new =
          qty_new *
          (tempItem.price_product +
            tempItem.price_addons_total +
            tempItem.price_service);

        const price_old =
          qty_old *
          (tempItem.price_product +
            tempItem.price_addons_total +
            tempItem.price_service);

        const temp_data_old = {
          Product: tempItem.Product,
          Sales_Type: tempItem.Sales_Type,
          Transaction_Item_Addons: tempItem.Transaction_Item_Addons,
          id: tempItem.id,
          notes: tempItem.notes,
          price_addons_total: tempItem.price_addons_total,
          price_discount: tempItem.price_discount,
          price_product: tempItem.price_product,
          price_service: tempItem.price_service,
          price_total: price_old,
          product_id: tempItem.product_id,
          promo_id: tempItem.promo_id,
          quantity: qty_old,
          sales_type_id: tempItem.sales_type_id,
          status: tempItem.status
        };

        const temp_data_new = {
          Product: tempItem.Product,
          Sales_Type: tempItem.Sales_Type,
          Transaction_Item_Addons: tempItem.Transaction_Item_Addons,
          id: tempItem.id,
          notes: tempItem.notes,
          price_addons_total: tempItem.price_addons_total,
          price_discount: tempItem.price_discount,
          price_product: tempItem.price_product,
          price_service: tempItem.price_service,
          price_total: price_new,
          product_id: tempItem.product_id,
          promo_id: tempItem.promo_id,
          quantity: qty_new,
          sales_type_id: tempItem.sales_type_id,
          status: tempItem.status
        };

        console.log("temp_data_old ==> ", temp_data_old);
        console.log("temp_data_new ==> ", temp_data_new);

        //tempItem.qty = parseInt(addQty);

        //tempDetail1.splice(indexData, 1);
        // if (tempItemOld.quantity === 0) {
        //   tempDetail2.splice(indexData, 1);
        // } else {
        //   tempDetail2[indexData] = tempItemOld;
        // }
        // tempDetail1.push(tempItem);

        if (temp_data_old.quantity === 0) {
          tempDetail2.splice(indexData, 1);
        } else {
          tempDetail2[indexData] = temp_data_old;
        }
        tempDetail1.push(temp_data_new);
      }

      // let tempMeja1 = {
      //   id: meja1.id,
      //   name: meja1.name,
      //   pax: meja1.pax,
      //   detail: tempDetail1
      // };

      // let tempMeja2 = {
      //   id: meja2.id,
      //   name: meja2.name,
      //   pax: meja2.pax,
      //   detail: tempDetail2
      // };

      let tempMeja1 = meja1;
      tempMeja1.detail = tempDetail1;

      let tempMeja2 = meja2;
      tempMeja2.detail = tempDetail2;

      this.setState({
        meja1: tempMeja1,
        meja2: tempMeja2
      });

      console.log("Meja 1 ==> ", tempMeja1);
      console.log("Meja 2 ==> ", tempMeja2);
    }
  }

  closeMoveItem() {
    this.setState({ showForm: false });
  }

  changeValueQty(text) {
    const { formData } = this.state;
    let newQty = text;
    let maxQty = formData.quantity;
    if (text > maxQty) {
      newQty = maxQty;
    }
    this.setState({ formQty: newQty });
  }

  submitMove() {
    const { formType, formData, formIndex, formQty } = this.state;

    // console.log("submitMove formData ==> ", formData);

    // console.log("submitMove formType ==> ", formType);

    if (formType === 1) {
      this.moveFromLeftVal(formData, formIndex, formQty);
    } else {
      this.moveFromRightVal(formData, formIndex, formQty);
    }

    this.setState({ showForm: false });
  }

  render() {
    let height = Dimensions.get("window").height - 150;
    let width = Dimensions.get("window").width;
    const { showForm, formQty, formData, formType } = this.state;
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        {this.state.showAlert ? (
          <CustomAlert
            message={this.state.alertMessage}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            //title={'Success'}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ showAlert: false });
              console.log("will unmount click ");
              Actions.pop();
              // Actions.MobileMeja({
              //   auth: this.state.auth,
              //   userInfo: this.state.userInfo,
              //   colorIndex: this.state.colorIndex,
              //   languageIndex: this.state.languageIndex
              // });
            }}
          />
        ) : (
          <View />
        )}
        <MobileHeader
          hideLogin={true}
          colorIndex={this.state.colorIndex}
          title={_gabung_pisah_transaksi[this.state.languageIndex]}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {showForm ? (
          <MobileMoveItem
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.colorIndex}
            closeAction={() => this.closeMoveItem()}
            submitAction={() => this.submitMove()}
            changeValue={text => this.changeValueQty(text)}
            formType={this.state.formType}
            table1={this.state.meja1}
            table2={this.state.meja2}
            value={formQty}
            type={formType}
            data={formData}
          />
        ) : (
          <View />
        )}
        <View style={[ss.mainContent, { height: height }]}>
          {/* <View style={[ss.leftSide]}>{this.renderLeftTable()}</View>

<View style={[ss.rightSide]}>{this.renderRightTable()}</View> */}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            style={{
              flex: 1
            }}

            columnWrapperStyle={{
              justifyContent: "space-evenly",
              marginBottom: 5
            }}
            contentContainerStyle={{ justifyContent: "space-between" }}
          >
            {this.renderLeftTable()}
            {this.renderRightTable()}
            {/* {this.renderLeftTable()} */}

            {/* {this.renderLeftTable()} */}
          </ScrollView>
        </View>
        <View style={{ margin: 10, backgroundColor: "transparent" }}>
          <Button
            onPress={() => {
              this.saveNewOrder();
            }}
            style={{
              flexDirection: "row",
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              padding: 10,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 15
            }}
          >
            <View style={{ width: "50%" }}>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    fontSize: 12
                  }
                ]}
              >
                {_proses_perpindahan[this.state.languageIndex]}
              </Text>
            </View>
            <View style={{ width: "40%" }} />
            <View style={{ width: "10%", alignItems: "flex-end" }}>
              {/* <Button style={{ width: 25, height: 25 }}> */}
              <MaterialCommunityIcons
                name={"chevron-double-right"}
                style={{
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  fontSize: 15,
                  marginTop: -2
                }}
              />
              {/* </Button> */}
            </View>
          </Button>
        </View>
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
    flexDirection: "row",
    padding: 15,
    paddingLeft: 15,
    flex: 1,
    justifyContent: "space-between"
    //height: '100%' ,
    //backgroundColor: "#995599"
  },
  mainView: {
    flex: 1,
    padding: 15
  },
  leftSide: {
    width: "95%",
    marginTop: 0,
    backgroundColor: WHITE,
    borderRadius: 5,
    borderWidth: 0,
    elevation: 0,
    borderColor: MAIN_THEME_COLOR
  },
  rightSide: {
    width: "95%",
    marginTop: 0,
    backgroundColor: WHITE,
    borderRadius: 5,
    borderWidth: 0,
    elevation: 0,
    borderColor: MAIN_THEME_COLOR
  },
  dataTable: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#EEEEEE",
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    borderColor: "#C4C4C4",
    borderWidth: 0
  },
  box: {
    elevation: 1,
    borderRadius: 5
  },
  button: {
    elevation: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  formInput: {
    marginTop: 0,
    marginLeft: 25,
    paddingLeft: 10,
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
  },
  formInputText: {
    color: BLACK,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: -10,
    height: 40,
    fontSize: 12,
    fontFamily: "DMSans-Bold"
  }
});
