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
import MoveItem from "../../Components/MoveItem";
import Loading from "../../Components/Loading";
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
  _failed
} from "../../Libraries/DictionaryMeja";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import { DetailOrderAPI, UpdateOrderByIdAPI } from "../../Constants";
import { _ok_alert } from "../../Libraries/DictionarySetting";

export default class Management extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesTypeTax: 0.2,
      loading: true,
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
      meja2: {}
      // meja1: {
      //   id: 1,
      //   name: "Meja 5",
      //   pax: 5,
      //   detail: [
      //     {
      //       id: 1,
      //       menu_id: 1,
      //       name: "Orange Juice",
      //       qty: 3
      //     },
      //     {
      //       id: 2,
      //       menu_id: 2,
      //       name: "Coca Cola",
      //       qty: 2
      //     },
      //     {
      //       id: 3,
      //       menu_id: 3,
      //       name: "Espresso",
      //       qty: 2
      //     }
      //   ]
      // },
      // meja2: {
      //   id: 2,
      //   name: "Meja 9",
      //   pax: 4,
      //   detail: [
      //     {
      //       id: 4,
      //       menu_id: 1,
      //       name: "Orange Juice",
      //       qty: 3
      //     },
      //     {
      //       id: 5,
      //       menu_id: 4,
      //       name: "Cafe Latte",
      //       qty: 1
      //     },
      //     {
      //       id: 6,
      //       menu_id: 5,
      //       name: "Nasi Goreng",
      //       qty: 2
      //     },
      //     {
      //       id: 7,
      //       menu_id: 6,
      //       name: "Guava Juice",
      //       qty: 1
      //     },
      //     {
      //       id: 8,
      //       menu_id: 3,
      //       name: "Espresso",
      //       qty: 6
      //     }
      //   ]
      // }
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
    console.log("new order meja 1 ==> ", meja1);
    console.log("new order meja 2 ==> ", meja2);

    console.log(
      "body ==> ",
      JSON.stringify({
        order_id: meja1.order_id,
        detail: meja1.detail
      })
    );

    //this.saveOrderLeft(meja1);
    //this.saveOrderRight(meja2);

    fetch(UpdateOrderByIdAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        order_id: meja1.order_id,
        detail: meja1.detail
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson New meja 1 ==> ", responseJson);
        this.saveOrderRight();
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({ loading: false });
      });
  }

  saveOrderLeft() {
    const { meja1, meja2 } = this.state;

    console.log(
      "body ==> ",
      JSON.stringify({
        order_id: meja1.order_id,
        detail: meja1.detail
      })
    );

    fetch(UpdateOrderByIdAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        order_id: meja1.order_id,
        detail: meja1.detail
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson New meja 1 ==> ", responseJson);
        let result = responseJson;
        let resultOrder = result;

        this.getData();
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }
  saveOrderRight() {
    const { meja1, meja2 } = this.state;

    console.log(
      "body ==> ",
      JSON.stringify({
        order_id: meja2.order_id,
        detail: meja2.detail
      })
    );

    fetch(UpdateOrderByIdAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        order_id: meja2.order_id,
        detail: meja2.detail
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson New meja 2 ==> ", responseJson);
        let result = responseJson;
        let resultOrder = result;

        let message = [];
        //message.push(responseJson.message);

        if (responseJson.status) {
          message.push(_success[this.state.languageIndex]);
        } else {
          message.push(_failed[this.state.languageIndex]);
        }

        this.setState({
          loading: false,
          showAlert: true,
          alertMessage: message
        });

        this.getData();
      })
      .catch(_err => {
        this.setState({ loading: false });
        console.log("ERR ==> ", _err);
      });
  }

  getData() {
    const { data } = this.props;
    //console.log("COMBINE GET DATA ==> ", data);

    this.setState({ loading: true });
    let table1 = data[0];
    let table2 = data[1];

    let detail1 = [];
    let detail2 = [];

    console.log("Table1 props ==> ", table1);
    console.log("Table2 props ==> ", table2);

    const orderId1 = table1.detail.id;
    const orderId2 = table2.detail.id;

    console.log("orderId1 ==> ", orderId1);
    console.log("orderId2 ==> ", orderId2);

    let meja1 = {};
    let meja2 = {};

    fetch(`${DetailOrderAPI}?order_id=${orderId1}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          meja1 = {
            id: table1.id,
            order_id: orderId1,
            name: table1.name,
            pax: table1.capacity,
            detail: resultData
          };
          console.log("meja 1 get data ==> ", meja1);
          this.setState({ meja1: meja1 });

          //console.log('new data ==>', JSON.stringify(data))
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });

    fetch(`${DetailOrderAPI}?order_id=${orderId2}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          meja2 = {
            id: table2.id,
            order_id: orderId2,
            name: table2.name,
            pax: table2.capacity,
            detail: resultData
          };
          console.log("meja 2 get data ==> ", meja2);

          this.setState({ meja2: meja2, loading: false });

          //console.log('new data ==>', JSON.stringify(data))
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  moveAllLeft() {
    let { meja1, meja2 } = this.state;
    let detail1 = meja1.detail;
    let detail2 = meja2.detail;

    let tempDetail1 = detail1;
    let tempDetail2 = detail2;

    detail2.map((item2, i2) => {
      //console.log(item2);
      let sameItem = false;
      let addQty = 0;
      let tempIndex = 0;

      detail1.map((item1, i1) => {
        if (item2.menu_id === item1.menu_id) {
          sameItem = true;
          addQty = item1.qty;
          tempIndex = i1;
        }
      });

      if (sameItem === true) {
        //tempDetail1.push(item2);
        tempDetail1.splice(tempIndex, 1);
        tempDetail2.splice(i2, 1);

        // let tempItem = {
        //   id: item2.id,
        //   menu_id: item2.menu_id,
        //   name: item2.name,
        //   qty: item2.qty + addQty
        // };

        let tempItem = item2;
        const qty = item2.qty + addQty;
        tempItem.qty = qty;
        const sales_type = item2.sales_type;
        let price_service = 0;
        if (sales_type === "Gojek/Grab") {
          price_service =
            this.state.salesTypeTax * (item2.price_base + item2.price_addons);
        }
        tempItem.total =
          qty * (tempItem.price_base + tempItem.price_addons + price_service);

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
        if (item2.menu_id === item1.menu_id) {
          sameItem = true;
          addQty = item1.qty;
          tempIndex = i1;
        }
      });

      if (sameItem === true) {
        //tempDetail1.push(item2);
        tempDetail2.splice(tempIndex, 1);
        tempDetail1.splice(i1, 1);

        // let tempItem = {
        //   id: item1.id,
        //   menu_id: item1.menu_id,
        //   name: item1.name,
        //   qty: item1.qty + addQty
        // };

        let tempItem = item1;

        const qty = item1.qty + addQty;
        tempItem.qty = qty;
        const sales_type = item1.sales_type;
        let price_service = 0;
        if (sales_type === "Gojek/Grab") {
          price_service =
            this.state.salesTypeTax * (item1.price_base + item1.price_addons);
        }
        tempItem.total =
          qty * (tempItem.price_base + tempItem.price_addons + price_service);

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
        <View style={{ width: "45%" }} />
        <View style={{ width: "45%" }}>
          <Text
            style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 20 }]}
          >
            {_jumlah[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ width: "10%", marginLeft: "-5%" }}>
          <Text
            style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 20 }]}
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
            style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 20 }]}
          >
            {_nama[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ width: "45%" }}>
          <Text
            style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 20 }]}
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
          <Text style={[MainStyle.dmSans, { color: WHITE, fontSize: 20 }]}>
            {_pindahkan_semua[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ width: "40%" }} />
        <View style={{ width: "10%", alignItems: "flex-end" }}>
          {/* <Button style={{ width: 25, height: 25 }}> */}
          <MaterialCommunityIcons
            name={"chevron-double-right"}
            style={{ color: WHITE, fontSize: 30, marginTop: -2 }}
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
            style={{ color: WHITE, fontSize: 30, marginTop: -2 }}
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
          <Text style={[MainStyle.dmSans, { color: WHITE, fontSize: 20 }]}>
            {_pindahkan_semua[this.state.languageIndex]}
          </Text>
        </View>
        {/* </Button> */}
      </Button>
    );
  }

  renderDataLeft(data, i) {
    let detailText = "";
    const detailData = data.detail;
    detailData.map((v, i) => {
      if (detailText !== "") {
        detailText = detailText + ", " + v.name;
      } else {
        detailText = v.name;
      }
    });
    return (
      <View style={[ss.dataTable]}>
        <View style={{ width: "50%" }}>
          <Text style={[MainStyle.dmSans, { color: BLACK, fontSize: 20 }]}>
            {data.name}
          </Text>
          <Text style={[MainStyle.dmSans, { color: BLACK, fontSize: 20 }]}>
            {detailText}
          </Text>
        </View>
        <View style={{ width: "10%" }}>
          <Button
            onPress={() => {
              //this.moveFromLeftVal(data, i, 1);

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
              style={[MainStyle.dmSans, { color: BLACK, fontSize: 20 }]}
            >
              {data.qty} x
            </Text>
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
              style={{ fontSize: 30, marginTop: -2 }}
            />
          </Button>
        </View>
      </View>
    );
  }

  renderDataRight(data, i) {
    let detailText = "";
    const detailData = data.detail;
    detailData.map((v, i) => {
      if (detailText !== "") {
        detailText = detailText + ", " + v.name;
      } else {
        detailText = v.name;
      }
    });
    return (
      <View style={[ss.dataTable]}>
        <View style={{ width: "45%", alignItems: "flex-start" }}>
          <Button
            style={{ width: 25, height: 25 }}
            onPress={() => {
              this.moveFromRight(data, i);
            }}
          >
            <MaterialCommunityIcons
              name={"chevron-double-left"}
              style={{ fontSize: 30, marginTop: -2 }}
            />
          </Button>
        </View>

        <View style={{ width: "10%", alignItems: "flex-end" }}>
          <Button
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
            <Text
              style={[MainStyle.dmSans, { color: BLACK, fontSize: 20 }]}
            >
              {data.qty} x
            </Text>
          </Button>
        </View>
        <View
          style={{
            width: "42.5%",
            alignItems: "flex-end"
          }}
        >
          <Text style={[MainStyle.dmSans, { color: BLACK, fontSize: 20 }]}>
            {data.name}
          </Text>
          <Text style={[MainStyle.dmSans, { color: BLACK, fontSize: 20 }]}>
            {detailText}
          </Text>
        </View>
      </View>
    );
  }

  renderLeftTable() {
    const { meja1 } = this.state;
    let data = meja1;
    return (
      <View style={[ss.mainView]}>
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
              MainStyle.dmSansBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 24
              }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[
              MainStyle.dmSansBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 24
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
    return (
      <View style={[ss.mainView]}>
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
              MainStyle.dmSansBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 24
              }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[
              MainStyle.dmSansBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 24
              }
            ]}
          >
            {data.pax} Pax
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

    let tempDetail1 = detail1;
    let tempDetail2 = detail2;

    let sameItem = false;
    let addQty = 0;
    let tempIndex = 0;
    let tempData = {};

    detail2.map((item2, i2) => {
      //console.log(item2);

      if (item2.menu_id === data.menu_id) {
        sameItem = true;
        addQty = data.qty;
        tempIndex = i2;
        tempData = item2;
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
      //   menu_id: tempData.menu_id,
      //   name: tempData.name,
      //   qty: tempData.qty + addQty
      // };

      let tempItem = tempData;
      const qty = tempData.qty + addQty;
      tempItem.qty = qty;
      const sales_type = tempData.sales_type;
      let price_service = 0;
      if (sales_type === "Gojek/Grab") {
        price_service =
          this.state.salesTypeTax *
          (tempData.price_base + tempData.price_addons);
      }
      tempItem.total =
        qty * (tempItem.price_base + tempItem.price_addons + price_service);

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

      if (item1.menu_id === data.menu_id) {
        sameItem = true;
        addQty = data.qty;
        tempIndex = i1;
        tempData = item1;
      }
    });

    // simplenya
    // tempDetail1.splice(indexData, 1);
    // tempDetail2.push(data);

    if (sameItem === true) {
      // let tempItem = {
      //   id: tempData.id,
      //   menu_id: tempData.menu_id,
      //   name: tempData.name,
      //   qty: tempData.qty + addQty
      // };
      tempDetail2.splice(indexData, 1);

      let tempItem = tempData;

      const qty = tempData.qty + addQty;
      tempItem.qty = qty;
      const sales_type = tempData.sales_type;
      let price_service = 0;
      if (sales_type === "Gojek/Grab") {
        price_service =
          this.state.salesTypeTax *
          (tempData.price_base + tempData.price_addons);
      }
      tempItem.total =
        qty * (tempItem.price_base + tempItem.price_addons + price_service);

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

    if (data.qty > 0) {
      detail2.map((item2, i2) => {
        if (item2.menu_id === data.menu_id) {
          sameItem = true;
          addQty = parseInt(value);
          tempIndex = i2;
          tempData = item2;
        }
      });

      if (sameItem === true) {
        console.log("move from left data ==> ", data);
        // let tempItem = {
        //   id: tempData.id,
        //   menu_id: tempData.menu_id,
        //   name: tempData.name,
        //   qty: parseInt(tempData.qty) + parseInt(addQty)
        // };
        // let tempItemOld = {
        //   id: data.id,
        //   menu_id: data.menu_id,
        //   name: data.name,
        //   qty: parseInt(data.qty) - parseInt(addQty)
        // };

        let tempItem = tempData;
        tempItem.qty = parseInt(tempData.qty) + parseInt(addQty);
        tempItem.total =
          (parseInt(tempData.qty) + parseInt(addQty)) *
          (tempData.price_base +
            tempData.price_addons +
            tempData.price_service);

        let tempItemOld = data;
        tempItemOld.qty = parseInt(data.qty) - parseInt(addQty);
        tempItem.total =
          (parseInt(data.qty) - parseInt(addQty)) *
          (data.price_base + data.price_addons + data.price_service);

        if (tempItemOld.qty === 0) {
          tempDetail1.splice(indexData, 1);
        } else {
          tempDetail1[indexData] = tempItemOld;
        }
        tempDetail2[tempIndex] = tempItem;
      } else {
        // let tempItem = {
        //   id: data.id,
        //   menu_id: data.menu_id,
        //   name: data.name,
        //   qty: parseInt(addQty)
        // };

        // let tempItemOld = {
        //   id: data.id,
        //   menu_id: data.menu_id,
        //   name: data.name,
        //   qty: parseInt(data.qty) - parseInt(addQty)
        // };

        //let tempItem = data;

        let tempItem = {
          id: data.id,
          name: data.name,
          qty: parseInt(addQty),
          price_base: data.price_base,
          price_addons: data.price_addons,
          price_service: data.price_service,
          sales_type: data.sales_type,
          price: data.price,
          total:
            parseInt(addQty) *
            (data.price_base + data.price_addons + data.price_service),
          menu_id: data.menu_id,
          detail: data.detail
        };

        let tempItemOld = {
          id: data.id,
          name: data.name,
          qty: parseInt(data.qty) - parseInt(addQty),
          price_base: data.price_base,
          price_addons: data.price_addons,
          price_service: data.price_service,
          sales_type: data.sales_type,
          price: data.price,
          total:
            (parseInt(data.qty) - parseInt(addQty)) *
            (data.price_base + data.price_addons + data.price_service),
          menu_id: data.menu_id,
          detail: data.detail
        };

        //tempDetail1.splice(indexData, 1);
        if (tempItemOld.qty === 0) {
          tempDetail1.splice(indexData, 1);
        } else {
          tempDetail1[indexData] = tempItemOld;
        }
        tempDetail2.push(tempItem);
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

    if (data.qty > 0) {
      detail1.map((item1, i1) => {
        if (item1.menu_id === data.menu_id) {
          sameItem = true;
          addQty = parseInt(value);
          tempIndex = i1;
          tempData = item1;
        }
      });

      if (sameItem === true) {
        // let tempItem = {
        //   //kiri
        //   id: tempData.id,
        //   menu_id: tempData.menu_id,
        //   name: tempData.name,
        //   qty: parseInt(tempData.qty) + parseInt(addQty)
        // };
        // let tempItemOld = {
        //   //kanan
        //   id: data.id,
        //   menu_id: data.menu_id,
        //   name: data.name,
        //   qty: parseInt(data.qty) - parseInt(addQty)
        // };

        let tempItem = tempData;
        tempItem.qty = parseInt(tempData.qty) + parseInt(addQty);
        tempItem.total =
          (parseInt(tempData.qty) + parseInt(addQty)) *
          (tempData.price_base +
            tempData.price_addons +
            tempData.price_service);

        let tempItemOld = data;
        tempItemOld.qty = parseInt(data.qty) - parseInt(addQty);
        tempItemOld.total =
          (parseInt(data.qty) - parseInt(addQty)) *
          (tempData.price_base +
            tempData.price_addons +
            tempData.price_service);

        if (tempItemOld.qty === 0) {
          tempDetail2.splice(indexData, 1);
        } else {
          tempDetail2[indexData] = tempItemOld;
        }

        tempDetail1[tempIndex] = tempItem;
      } else {
        // let tempItem = {
        //   id: data.id,
        //   menu_id: data.menu_id,
        //   name: data.name,
        //   qty: parseInt(addQty)
        // };

        // let tempItemOld = {
        //   id: data.id,
        //   menu_id: data.menu_id,
        //   name: data.name,
        //   qty: parseInt(data.qty) - parseInt(addQty)
        // };

        //let tempItem = data;
        let tempItem = {
          id: data.id,
          name: data.name,
          qty: parseInt(data.qty) - parseInt(addQty),
          price_base: data.price_base,
          price_addons: data.price_addons,
          price_service: data.price_service,
          sales_type: data.sales_type,
          price: data.price,
          total:
            parseInt(addQty) *
            (data.price_base + data.price_addons + data.price_service),
          menu_id: data.menu_id,
          detail: data.detail
        };

        let tempItemOld = {
          id: data.id,
          name: data.name,
          qty: parseInt(data.qty) - parseInt(addQty),
          price_base: data.price_base,
          price_addons: data.price_addons,
          price_service: data.price_service,
          sales_type: data.sales_type,
          price: data.price,
          total:
            (parseInt(data.qty) - parseInt(addQty)) *
            (data.price_base + data.price_addons + data.price_service),
          menu_id: data.menu_id,
          detail: data.detail
        };

        //tempItem.qty = parseInt(addQty);

        //tempDetail1.splice(indexData, 1);
        if (tempItemOld.qty === 0) {
          tempDetail2.splice(indexData, 1);
        } else {
          tempDetail2[indexData] = tempItemOld;
        }
        tempDetail1.push(tempItem);
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
    let maxQty = formData.qty;
    if (text > maxQty) {
      newQty = maxQty;
    }
    this.setState({ formQty: newQty });
  }

  submitMove() {
    const { formType, formData, formIndex, formQty } = this.state;

    //console.log("submitMove formData ==> ", formData);

    if (formType === 1) {
      this.moveFromLeftVal(formData, formIndex, formQty);
    } else {
      this.moveFromRightVal(formData, formIndex, formQty);
    }

    this.setState({ showForm: false });
  }

  render() {
    let height = Dimensions.get("window").height - 150;
    const { showForm, formQty, formData, formType } = this.state;
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
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
        <Header
          colorIndex={this.state.colorIndex}
          title={_gabung_pisah_transaksi[this.state.languageIndex]}
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
        {showForm ? (
          <MoveItem
            languageIndex={this.state.languageIndex}
            colorIndex={this.state.colorIndex}
            closeAction={() => this.closeMoveItem()}
            submitAction={() => this.submitMove()}
            changeValue={text => this.changeValueQty(text)}
            value={formQty}
            type={formType}
            data={formData}
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
            <View style={[ss.leftSide]}>{this.renderLeftTable()}</View>

            <View style={[ss.rightSide]}>{this.renderRightTable()}</View>
          </View>
        </ScrollView>
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
                  MainStyle.dmSans,
                  {
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    fontSize: 20
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
                  fontSize: 30,
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
    backgroundColor: "#EEEEEE",
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
    width: "49.5%",
    marginTop: 0,
    backgroundColor: "#EEE",
    borderRadius: 5,
    borderWidth: 1,
    elevation: 3,
    borderColor: MAIN_THEME_COLOR
  },
  rightSide: {
    width: "49.5%",
    marginTop: 0,
    backgroundColor: "#EEE",
    borderRadius: 5,
    borderWidth: 1,
    elevation: 3,
    borderColor: MAIN_THEME_COLOR
  },
  dataTable: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: WHITE,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    borderColor: "#C4C4C4",
    borderWidth: 1
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
    fontSize: 20,
    fontFamily: "RobotoSlab-Bold"
  }
});
