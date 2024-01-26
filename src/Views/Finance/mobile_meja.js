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
import CustomAlert from "../../Components/CustomAlert";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/Dropdown";
import MoveItem from "../../Components/MoveItem";

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
  WHITE,
  BLACK,
  RED_500,
  GREY_100,
  GREY_900,
  GREY_700,
  MAIN_TEXT_COLOR_SELECT,
  RED_600
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
  _gagal_proses,
  _reason_failed_1,
  _reason_failed_2,
  _reason_failed_3,
  _success_order,
  _kapasitas_maximal,
  _cari,
  _kapasitas_short
} from "../../Libraries/DictionaryMeja";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import {
  GetTableAPI,
  ChangeOrderTableAPI,
  ChangeBookingTableAPI,
  GetBookingAPI,
  AssignBookingAPI,
  DetailOrderBillAPI,
  BE_TableManagement,
  BE_Move_Table,
  BE_Sales_Type,
  BE_Customer,
  BE_Update_Transaction
} from "../../Constants";
import MenuFunctions from "../../Libraries/MenuFunctions";
import {
  _cancel,
  _cancel_order,
  _check_out,
  _delete_berhasil,
  _delete_confirmation,
  _gagal
} from "../../Libraries/DictionaryHome";

import { _detail_order } from "../../Libraries/DictionaryHistory";

import { _sukses } from "../../Libraries/DictionaryPayment";
import DeviceInfo from "react-native-device-info";
import CustomConfirmation from "../../Components/MobileCustomConfirmation";
import { _ok_alert } from "../../Libraries/DictionarySetting";
import { _status_simple } from "../../Libraries/DictionaryDrawer";

export default class MobileMeja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomConfirmation: false,
      customerName: "",
      tablet: DeviceInfo.isTablet(),
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      searchKey: "",
      showForm: false,
      showReason: false,
      reasonNotValid: "",
      tableInformation: {
        available: 4,
        reserved: 3,
        used: 2
      },
      action: 0,
      listTable: [],

      selectedTable: [],

      modalTable: false,
      modalCombine: false,
      listBooking: [],
      selected_booking: null,
      auth: this.props.auth ? this.props.auth : "",
      showAlert: false,
      alertMessage: [],
      sales_type_dine_in_id: 0,
      dataDelete: null,
      showMenu: false,
      floor_list: [],
      activeFloor: 0
    };
  }

  selectTable(data) {
    const { action } = this.state;
    let tempData = this.state.selectedTable;
    let isSame = false;
    let valid = true;
    let reasonNotValid = [_gagal_proses[this.state.languageIndex]];

    this.setState({ customerName: "" });
    if (action === 1) {
      // gabung/pisah

      if (data.status === "available" && tempData.length !== 1) {
        console.log("is not valid");
        valid = false;
      }

      tempData.map((item, index) => {
        console.log("tempData Map action 1 ==> ", item);
        if (item.id === data.id) {
          tempData.splice(index, 1);
          isSame = true;
        }

        //const validTableByPax = data.pax >= item.detail.pax;
        const validTableByPax = true;

        if (item.status === 2 && data.status !== 1) {
          valid = false;
          reasonNotValid.push(_reason_failed_1[this.state.languageIndex]);
        } else if (item.status === 2 && !validTableByPax) {
          valid = false;
          reasonNotValid.push(_reason_failed_2[this.state.languageIndex]);
        } else if (item.status === 3 && data.status === 3) {
          //console.log("DATA COMBINE ==> ", data)
          //console.log(data.combine.length);
          //if (data.combine.length > 0) {
          //  valid = false;
          //  reasonNotValid.push("Meja tidak tersedia.");
          //}
        } else if (item.status === 3 && data.status !== 1) {
          valid = false;
          reasonNotValid.push(_reason_failed_1[this.state.languageIndex]);
        } else if (item.status === 3 && !validTableByPax && data.status === 1) {
          valid = false;
          reasonNotValid.push(_reason_failed_2[this.state.languageIndex]);
        }

        //else if (data.pax > item.detail.pax)
      });

      if (isSame === false && tempData.length < 2 && valid) {
        tempData.push(data);
      }
    } else {
      console.log("data MEJA ==> ", data);
      tempData.map((item, index) => {
        if (item.id === data.id) {
          tempData.splice(index, 1);
          isSame = true;
        }
      });

      tempData = [];

      if (isSame === false) {
        tempData.push(data);
      }

      const customerName = "";

      if (tempData.length > 0) {
        if (tempData[0].Transaction_Table) {
          const customerId = tempData[0].Transaction_Table.Transaction
            ? tempData[0].Transaction_Table.Transaction.customer_id
            : 0;

          //console.log("customer_id ===> ", customerId)

          if (customerId !== 0) {
            this.showCustomer(customerId);
          }
          // this.setState({
          //   customerName: tempData[0].Transaction_Table.Transaction
          //     .customer_id
          //     ? tempData[0].Transaction_Table.Transaction.customer_id
          //     : ""
          // });
        }
      }
    }

    if (reasonNotValid.length > 1) {
      //alert("Gagal memperoses data karena: " + reasonNotValid[1]);
    }

    if (this.state.selectedTable.length === 0) {
      this.setState({
        selected_booking: null,
        selectedTable: tempData,
        modalTable: action === 1 ? false : true,
        modalCombine: tempData.length === 2 ? true : false,
        showReason: reasonNotValid.length > 1 && !isSame ? true : false,
        reasonNotValid: reasonNotValid,
        showMenu: false
      });
    }
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

    this.getTableList("",0);
    this.getSalesType();
  }

  getSalesType() {
    //let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Sales_Type;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.statusCode === 200) {
          const data = responseJson.data;

          let sales_type_dine_in_id = 0;

          data.map((v, i) => {
            if (!v.is_booking && !v.is_delivery) {
              if (v.require_table && !v.is_booking) {
                sales_type_dine_in_id = v.id;
              }
            }
          });

          this.setState({
            //additionalSalesType: data,
            //selectedSalesType: data[0] ? data[0].id : 0,
            //salesTypeName: data[0] ? data[0].name : "Take-Away",
            sales_type_dine_in_id: sales_type_dine_in_id
            //sales_type_first_id: data[0] ? data[0].id : 0
          });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  confirmBooking(data) {
    console.log("confirmBooking ==> ", data);
    console.log("selected_booking ==> ", this.state.selected_booking);
    if (this.state.selected_booking) {
      fetch(`${AssignBookingAPI}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          booking_id: this.state.selected_booking,
          table_id: data.id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          let result = responseJson;
          if (result.status) {
            let resultData = result.data;
            alert(_success_order[this.state.languageIndex]);
            this.setState({ modalTable: false });
            this.getTableList();
            //console.log('new data ==>', JSON.stringify(data))
          }
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });
    }
  }

  prosesDelete(data) {
    console.log("prosesDelete ==> ", data);

    this.setState({ loading: true });
    let order_id = data.Transaction_Table.Transaction
      ? data.Transaction_Table.Transaction.id
      : 0;

    let uri = `${BE_Update_Transaction}${order_id}`;

    const items = [];
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
        console.log("responseJson checkOutDelete ==> ", responseJson);
        this.closeModalTable();
        this.setState({ loading: false });

        const message = _delete_berhasil;
        alert(message[this.state.languageIndex]);
        this.getTableList();
      });
  }

  prosesCheckOut(data) {
    console.log("prosesCheckOut ==> ", data);
    //convert ke databill
    let result = data;

    let table_id = data.id;

    //let booking_id = data.Transaction_Table.Transaction.booking_id ? data.Transaction_Table.Transaction.booking_id : 0;

    let customer_id = data.Transaction_Table.Transaction
      ? data.Transaction_Table.Transaction.customer_id
      : 0;

    let order_id = data.Transaction_Table.Transaction
      ? data.Transaction_Table.Transaction.id
      : 0;

    let dataAllBill = data.Transaction_Table.Transaction
      ? data.Transaction_Table.Transaction.Transaction_Items
      : [];

    MenuFunctions.SaveOrderID(order_id, val => {
      console.log("Sukses Masuk Bill Order Id ", order_id);
    });

    MenuFunctions.SaveTableID(table_id, val => {
      console.log("Sukses Masuk Bill - Table Id ", table_id);
    });

    // MenuFunctions.SaveCustomerID(data.detail.customer_id, val => {
    //   console.log("Sukses Masuk Bill - Cust Id ", data.detail.customer_id);
    // });

    // MenuFunctions.SaveBookingID(booking_id, val => {
    //   console.log("Sukses Masuk Bill - Booking Id ", booking_id);
    // });

    console.log("DATA BILL TEMP ==> ", dataAllBill);

    MenuFunctions.SaveMenu(dataAllBill, val => {
      console.log("Sukses Masuk Bill ", dataAllBill);
    });

    Actions.pop();
    Actions.pop();
    if (this.state.tablet) {
      Actions.MobileHomeTablet({
        //selected_table: { id: data.id, name: data.name },
        //sales_type: "Dine-In",
        sales_type: this.state.sales_type_dine_in_id,
        userInfo: this.state.userInfo,
        colorIndex: this.state.colorIndex,
        languageIndex: this.state.languageIndex,
        checkOut: true,
        auth: this.state.auth,
        customer_id: customer_id,
        table: data
      });
    } else {
      //
      Actions.MobileHomePage({
        //selected_table: { id: data.id, name: data.name },
        //sales_type: "Dine-In",
        sales_type: this.state.sales_type_dine_in_id,
        userInfo: this.state.userInfo,
        colorIndex: this.state.colorIndex,
        languageIndex: this.state.languageIndex,
        checkOut: true,
        auth: this.state.auth,
        customer_id: customer_id,
        table: data
      });
    }
    this.closeModalTable();
    //Actions.pop();

    //console.log('new data ==>', JSON.stringify(data))
  }

  checkInTable(data) {
    console.log("cek in ==> ", data);
    MenuFunctions.SaveTableID(data.id, val => {
      console.log("Sukses Masuk Bill - Table Id");
    });
    Actions.pop();
    Actions.pop();
    if (this.state.tablet) {
      Actions.MobileHomeTablet({
        sales_type: this.state.sales_type_dine_in_id,
        userInfo: this.state.userInfo,
        colorIndex: this.state.colorIndex,
        languageIndex: this.state.languageIndex,
        auth: this.state.auth,
        table: data
      });
    } else {
      Actions.MobileHomePage({
        //selected_table: { id: data.id, name: data.name },
        sales_type: this.state.sales_type_dine_in_id,
        userInfo: this.state.userInfo,
        colorIndex: this.state.colorIndex,
        languageIndex: this.state.languageIndex,
        auth: this.state.auth,
        table: data
      });
    }
  }

  checkInTableBooking(data) {
    console.log("cek in ==> ", data);
    MenuFunctions.SaveTableID(data.id, val => {
      console.log("Sukses Masuk Bill - Table Id");
    });

    MenuFunctions.SaveCustomerID(data.detail.customer_id, val => {
      console.log("Sukses Masuk Bill - Cust Id");
    });

    MenuFunctions.SaveBookingID(data.detail.id, val => {
      console.log("Sukses Masuk Bill - Booking Id");
    });
    Actions.pop();
    Actions.pop();
    if (this.state.tablet) {
      Actions.MobileHomeTablet({
        sales_type: this.state.sales_type_dine_in_id,
        userInfo: this.state.userInfo,
        colorIndex: this.state.colorIndex,
        languageIndex: this.state.languageIndex,
        auth: this.state.auth,
        table: data
      });
    } else {
      Actions.MobileHomePage({
        //selected_table: { id: data.id, name: data.name },
        sales_type: this.state.sales_type_dine_in_id,
        userInfo: this.state.userInfo,
        colorIndex: this.state.colorIndex,
        languageIndex: this.state.languageIndex,
        auth: this.state.auth,
        table: data
      });
    }
  }

  componentDidUpdate(nextProps) {
    //console.log("componentDidUpdate ===> ", this.props !== nextProps);
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
      this.getTableList();
    }
  }

  showCustomer(customer_id) {
    const uri = `${BE_Customer}/${customer_id}`;
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
        let result = responseJson;
        //console.log("responseJSON Show Customer ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          //this.setState({});
          this.setState({
            customerName: resultData.name,
            customer_id: customer_id
          });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  updateTableStatus(data, status = "available") {
    const { userInfo } = this.state;
    const gerai_id = userInfo.gerai_id;

    let uri = `${BE_TableManagement}/${data.id}`;

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        outlet_id: data.outlet_id,
        name: data.name,
        capacity: data.capacity,
        status: status
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("update result ===> ", responseJson);
        if (result.statusCode === 200) {
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getTableList(search = this.state.searchKey) {
    const { userInfo } = this.state;
    const outlet_id = userInfo.gerai_id;

    let available = 0;
    let reserved = 0;
    let used = 0;

    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=${search}`;

    let name_search = search !== "" ? `&name=${search}` : "";

    let uri = `${BE_TableManagement}?outlet_id=${outlet_id}${name_search}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27
    let resultFinal = [];
    console.log("getDataTable uri ==> ", uri);

    console.log("getDataTable this.state.auth ==> ", this.state.auth);

    console.log("getDataTable userInfo.auth ==> ", userInfo.token);

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
        let result = responseJson;
        console.log("getDataTable result ==> ", result);

        if (result.statusCode === 200) {
          let resultData = result.data;
          console.log("getDataTable ==> ", resultData);

          let temp_list = [];
          resultData.map((v, i) => {
            let temp_data = v;
            if (v.status === "available") {
              available = available + 1;
            } else if (v.status === "reserved") {
              reserved = reserved + 1;
            } else if (v.status === "used") {
              used = used + 1;
            }

            if (v.status === "used" && !v.Transaction_Table) {
              temp_data.status = "available";
              this.updateTableStatus(v, "available");
            }

            temp_list.push(temp_data);
          });

          let tableInformation = {
            available: available,
            reserved: reserved,
            used: used
          };

          this.setState({
            //listTable: resultData,
            listTable: temp_list,

            tableInformation: tableInformation,
            selectedTable: []
          });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  renderRightTableInformation() {
    const { tableInformation } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            backgroundColor: WHITE,
            margin: 15,
            padding: 15,
            marginTop: 5
          }
        ]}
      >
        <View style={[ss.headerTableInfo]}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { color: BLACK, fontSize: 20 }
              ]}
            >
              Table
            </Text>

            <Text
              style={[MainStyle.robotoNormal, { color: BLACK, fontSize: 20 }]}
            >
              {" "}
              Information
            </Text>
          </View>
        </View>
        <View style={[ss.tableInfoContent]}>
          <View style={{ flexDirection: "row", marginBottom: 5, marginTop: 5 }}>
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: BLACK,
                  fontSize: 20,
                  width: "50%",
                  textAlign: "center"
                }
              ]}
            >
              {_status_1[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: BLACK,
                  fontSize: 20,
                  width: "45%",
                  textAlign: "right"
                }
              ]}
            >
              {tableInformation.available}
            </Text>
          </View>
        </View>
        <View style={[ss.tableInfoContent]}>
          <View style={{ flexDirection: "row", marginBottom: 5, marginTop: 5 }}>
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: BLACK,
                  fontSize: 20,
                  width: "50%",
                  textAlign: "center"
                }
              ]}
            >
              {_status_2[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: BLACK,
                  fontSize: 20,
                  width: "45%",
                  textAlign: "right"
                }
              ]}
            >
              {tableInformation.reserved}
            </Text>
          </View>
        </View>
        <View style={[ss.tableInfoContent]}>
          <View style={{ flexDirection: "row", marginBottom: 5, marginTop: 5 }}>
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: BLACK,
                  fontSize: 20,
                  width: "50%",
                  textAlign: "center"
                }
              ]}
            >
              {_status_3[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  color: BLACK,
                  fontSize: 20,
                  width: "45%",
                  textAlign: "right"
                }
              ]}
            >
              {tableInformation.used}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderRightSide() {
    const { tableInformation, action } = this.state;

    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.state.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    const backgroundColor = [
      WHITE,
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
    ];

    const textColor = [
      blackColor,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
    ];
    const colorIndex1 = action === 0 ? 1 : 0;
    const colorIndex2 = action === 1 ? 1 : 0;

    return (
      <View
        style={[
          ss.box,
          {
            backgroundColor: "#EEEAED",
            margin: 15,
            marginTop: 0,
            marginBottom: 50,
            borderBottomWidth: 0,
            paddingBottom: 15,
            borderBottomColor: "#C8C8C8",
            width: this.state.tablet ? "100%" : "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <View
          style={{
            backgroundColor: "#F7F7F7",
            flexDirection: "row",
            borderRadius: 10,
            display: "none",
          }}
        >
          <Ionicons
            name={"md-search"}
            style={{
              paddingLeft: 10,
              alignSelf: "center",
              fontSize: 25,
              color: "#BEC2CE",
            }}
          />
          <TextInput
            style={{
              //backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backgroundColor: "transparent",
              color: BLACK,
              //marginLeft: '5%',
              //marginRight: 5,
              fontSize: 12,
              fontFamily: "DMSans-Bold",
            }}
            type="text"
            ref={(q) => {
              this.TextInputSearch = q;
            }}
            onSubmitEditing={() => {
              this.getTableList(this.state.searchKey);
              // this.setState({viewSearch: false});
            }}
            //onChangeText={(q)=>this._accountUpdate('username',q)}
            onChangeText={(v) => this.setState({ searchKey: v })}
            value={this.state.searchKey}
            placeholder={`${_cari[this.state.languageIndex]}...`}
            placeholderTextColor={"#BEC2CE"}
          />
        </View>
        <View
          style={[
            ss.tableInfoContent,
            {
              alignItems: "center",
              flexDirection: "row",
              // justifyContent: "space-between",
              justifyContent: "space-between",
              alignContent: "center",
              alignSelf: "center",
              width: "45%",
              margin: 0,
              padding: 15,
              // backgroundColor: "#E7E7E7",
            },
          ]}
        >
          <Button
            onPress={() => {
              this.setState({ action: 0, selectedTable: [] });
            }}
            style={[
              ss.box,
              {
                width: "49%",
                alignItems: "center",
                borderRadius: 5,
                backgroundColor: backgroundColor[colorIndex1],
                padding: 10,
              },
            ]}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { color: textColor[colorIndex1], fontSize: 14 },
              ]}
            >
              {_action_1[this.state.languageIndex]}
            </Text>
          </Button>
          <Button
            onPress={() => {
              this.setState({ action: 1, selectedTable: [] });
            }}
            style={[
              ss.box,
              {
                width: "49%",
                alignItems: "center",
                borderRadius: 5,
                backgroundColor: backgroundColor[colorIndex2],
                padding: 10,
              },
            ]}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { color: textColor[colorIndex2], fontSize: 14 },
              ]}
            >
              {_action_2[this.state.languageIndex]}
            </Text>
          </Button>
        </View>
        <View style={{width:"100%", flexDirection:"row", margin: 5, paddingLeft: 15}}>
       
        {this.state.floor_list.map((items, itemIndex) => {
          return (
            <View style ={{}}>
              {this.renderfloorData(items, itemIndex)}              
            </View>
              );
        })}

        </View>
      </View>
    );
  }

  renderLeftSideDetail(data, i) {
    let bgColor = [WHITE, "rgba(131, 179, 53, 1)", "#444444", "#C84343"];
    let borderColor = [BLACK, "transparent"];
    let isSelected = false;
    const { selectedTable } = this.state;
    selectedTable.map((item, index) => {
      if (item.id === data.id) {
        isSelected = true;
      }
    });
    let borderColorIndex = 1;
    if (isSelected) {
      borderColorIndex = 0;
    } else {
      borderColorIndex = 1;
    }

    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    let statusName = data.status.charAt(0).toUpperCase() + data.status.slice(1);

    return (
      <Button
        onPress={() => {
          // if (this.state.selectedTable.length === 0) {
            this.selectTable(data);
          // }
        }}
        style={[
          ss.tableList,
          {
            margin: 0,
            flex: 1,
            //width: "100%",
            marginRight: 15,
            marginBottom: 15,
            marginTop: 15,
            // backgroundColor: bgColor[data.status],
            backgroundColor: isSelected
              ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              : "#EEEEEE",
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0,
            borderRadius: 15
          }
        ]}
      >
        <View
          style={[
            {
              padding: 15,
              paddingBottom: 20,
              paddingTop: 20,

              alignItems: "center"
              //borderColor: borderColor[0]
            }
          ]}
        >
          <View style={{flexDirection:"row", justifyContent:"space-around"}}>
            <View style={{width: "49%"}}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    color: isSelected ? whiteColor : blackColor,
                    fontSize: 16,
                    marginBottom: 5
                  }
                ]}
              >
                {data.name}
              </Text>
            </View>
            <View style={{width: "49%"}}>

            </View>
            
          </View>
          <View style={{flexDirection:"row", justifyContent:"space-around"}}>
            <View style={{flexDirection:"row", width: "49%"}}>
              <Text
              style={[
                MainStyle.robotoNormalBold,
                { color: isSelected ? whiteColor : blackColor, fontSize: 36, alignSelf:"flex-end" }
              ]}
              >
                {data.capacity}
              </Text>
              <Text
              style={[
                MainStyle.robotoNormalBold,
                { color: isSelected ? whiteColor : blackColor, fontSize: 16, alignSelf:"flex-end", marginLeft: 5, paddingBottom: 5 }
              ]}
              >
                {_kapasitas_short[this.state.languageIndex]}
              </Text>
            </View>
            <View style={{flexDirection:"row", width: "49%", justifyContent:"flex-end"}}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    alignSelf:"flex-end",
                    color: isSelected
                      ? whiteColor
                      : data.status === "available"
                      ? bgColor[1]
                      : data.status === "used"
                      ? bgColor[3]
                      : bgColor[2],
                    fontSize: 16,
                    paddingBottom: 5
                  }
                ]}
              >
                {statusName}
              </Text>
            </View>
            
          </View>
          
          
          
        </View>
      </Button>
    );
  }

  renderLeftSide() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          width: this.state.tablet ? "66%" : "100%",
          justifyContent: "space-around"
        }}
      >
        <FlatList
          // style={{
          //   paddingLeft: "5%",
          //   paddingRight: "5%"
          //   //paddingTop: "2.5%"
          // }}
          //ListHeaderComponent={this.renderSearch()}
          showsVerticalScrollIndicator={false}
          data={this.state.listTable}
          // columnWrapperStyle={{
          //   justifyContent: "space-evenly",
          //   marginBottom: 5
          // }}
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  //flex: 1,
                  //flex: 0.325,
                  //marginLeft: 15,
                  marginTop: 0,
                  width: "34%"
                  //marginBottom: 3,
                  //marginRight: 15
                }}
              >
                {this.renderLeftSideDetail(item, index)}
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return "Table" + index.toString();
          }}
        />
      </View>
    );
  }

  closeModalTable() {
    this.setState({ modalTable: false, selectedTable: [] });
  }

  closeModalMove() {
    this.setState({ modalCombine: false, selectedTable: [] });
  }

  //modal pilih meja
  renderTableSelection() {
    const { selectedTable } = this.state;
    let data = null;
    let status = 0;
    // console.log("selectedTable Transaction_Table ==> ", selectedTable[0]);

    let temp1 = null; //selectedTable[0]
    let temp2 = null; //selectedTable[0].Transaction_Table

    if (selectedTable.length > 0) {
      temp1 = selectedTable[0];
      if (temp1[0]) {
        if (temp1[0].Transaction_Table) {
          temp2 = temp1[0].Transaction_Table;
        }
      }
    }

    // let temp_transaction_table = selectedTable[0].Transaction_Table
    //   ? selectedTable[0].Transaction_Table
    //   : null;

    let temp_transaction_table = temp2 ? temp2 : null;

    let temp_transaction = temp_transaction_table
      ? temp_transaction_table.Transaction
        ? temp_transaction_table.Transaction
        : null
      : null;

    let dataAllBill = temp_transaction
      ? temp_transaction.Transaction_Items
      : [];

    console.log("selectedTable dataAllBill ==> ", dataAllBill);

    const cthData = [
      {
        Product: {
          Group_Addons: [],
          Product_Category: [],
          barcode: "8888166360211",
          description: "",
          image: "/images/product/productImage/productImage-1631160023425.jpg",
          is_favorite: false,
          name: "Nasi Gorengs",
          price: 20000.6,
          product_category_id: 75,
          sku: "NG",
          status: "active"
        },
        Sales_Type: { name: "Dine-In" },
        Transaction_Item_Addons: [],
        id: 22898,
        notes: "",
        price_addons_total: 0,
        price_discount: 0,
        price_product: 20000.6,
        price_service: 0,
        price_total: 20000.6,
        product_id: 2369,
        quantity: 1,
        sales_type_id: 2,
        status: "done"
      }
    ];

    // if (selectedTable[0]) {
    //   data = selectedTable[0];
    //   status = selectedTable[0].status;
    // }

    if (temp1) {
      data = temp1;
      status = temp1.status;
    }

    const time = data.Transaction_Table ? data.Transaction_Table.time_in : null;

    let time_formatted = moment(new Date()).format("YYYY-MM-DD HH:mm");
    if (time) {
      time_formatted = moment(time).format("YYYY-MM-DD HH:mm");
    }

    //TIME IN DISINI

    const textColor = [WHITE, "rgba(131, 179, 53, 0.8)", "#C84343", "#C84343"];
    return (
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          this.closeModalTable();
        }}
        visible={this.state.modalTable}
      >
        <View
          style={{
            // flex: this.state.showMenu ? 0.2 : 0.6,
            flex: 0.3,
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
        <View style={[ss.modalCover]}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}>
            
            <View
              style={[
                {
                  width: this.state.tablet ? "50%" : "100%",
                  alignSelf: "center",
                  marginTop: -15,
                  borderRadius: 15,
                  backgroundColor: WHITE,
                  flex: 2
                }
              ]}
            >
              <View
                style={{
                  margin: 20,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderColor: "#C8C8C8"
                  //backgroundColor:'#BCA'
                }}
              >
                <View style={[ss.modalHeader, { width: "100%" }]}>
                  <View style={{ position: "absolute", left: 0 }}>
                    <Button
                      style={{
                        padding: 10,
                        paddingLeft: 0,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onPress={() => {
                        this.closeModalTable();
                      }}
                    >
                      <View>
                        <Ionicons
                          name={"md-close"}
                          size={25}
                          color={"#252529"}
                        />
                      </View>
                    </Button>
                  </View>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 16,
                        //alignSelf : "center"
                        textAlign: "center"
                      }
                    ]}
                  >
                    {data ? data.name : ""}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  ss.modalContent,
                  {
                    flexDirection: "column",
                    marginTop: 10,
                    marginBottom: 5,
                    borderColor: "#C8C8C8",
                    borderBottomWidth: 1,
                    paddingBottom: 5
                  }
                ]}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      marginBottom: 5
                      //alignSelf : "center"
                    }
                  ]}
                >
                  {_status_simple[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: textColor[data ? data.status : 0]
                      //alignSelf : "center"
                    }
                  ]}
                >
                  {data ? data.status : ""}
                </Text>
              </View>
              {status === "available" ? (
                [
                  <View
                    style={[
                      ss.modalContent,
                      {
                        flexDirection: "column",
                        marginTop: 10,
                        marginBottom: 5,
                        borderColor: "#C8C8C8",
                        borderBottomWidth: 1,
                        paddingBottom: 5
                      }
                    ]}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          marginBottom: 5
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {_kapasitas_maximal[this.state.languageIndex]}
                    </Text>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12
                          //color: textColor[data.status]
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {data ? data.capacity : 0}
                    </Text>
                  </View>,
                  <View style={[ss.modalContent, { display: "none" }]}>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {`${_konfirmasi[this.state.languageIndex]} Booking`}
                    </Text>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12
                          //color: textColor[data.status]
                          //alignSelf : "center"
                        }
                      ]}
                    />
                  </View>,
                  <View style={[ss.modalContent, { display: "none" }]}>
                    {this.renderSelectBook()}
                  </View>
                ]
              ) : (
                <View />
              )}
              {status === "booking" ? (
                [
                  <View
                    style={[
                      ss.modalContent,
                      {
                        flexDirection: "column",
                        marginTop: 10,
                        marginBottom: 5,
                        borderColor: "#C8C8C8",
                        borderBottomWidth: 1,
                        paddingBottom: 5
                      }
                    ]}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          marginBottom: 5
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {`${_reserved_time[this.state.languageIndex]}: `}
                    </Text>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12
                          //color: textColor[data.status]
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {data ? data.detail.booking_time : 0}
                    </Text>
                  </View>,
                  <View
                    style={[
                      ss.modalContent,
                      {
                        flexDirection: "column",
                        marginTop: 10,
                        marginBottom: 5,
                        borderColor: "#C8C8C8",
                        borderBottomWidth: 1,
                        paddingBottom: 5
                      }
                    ]}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          marginBottom: 5,
                          fontSize: 12,
                          fontStyle: "italic"
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {`Notes`}
                    </Text>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          fontStyle: "italic"
                          //color: textColor[data.status]
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {data ? data.detail.notes : ""}
                    </Text>
                  </View>,
                  <View
                    style={[
                      ss.modalContent,
                      {
                        flexDirection: "column",
                        marginTop: 10,
                        marginBottom: 5,
                        borderColor: "#C8C8C8",
                        borderBottomWidth: 1,
                        paddingBottom: 5
                      }
                    ]}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          marginBottom: 5
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {`${_customer_name[this.state.languageIndex]}: `}
                    </Text>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12
                          //color: textColor[data.status]
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {data ? data.detail.name : 0}
                    </Text>
                  </View>
                ]
              ) : (
                <View />
              )}

              {status === "used" ? (
                [
                  <View
                    id={`${data.id}`}
                    style={[
                      ss.modalContent,
                      {
                        flexDirection: "column",
                        marginTop: 10,
                        marginBottom: 5,
                        borderColor: "#C8C8C8",
                        borderBottomWidth: 1,
                        paddingBottom: 5
                      }
                    ]}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          marginBottom: 5
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {`${_check_in_time[this.state.languageIndex]}: `}
                    </Text>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12
                          //color: textColor[data.status]
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {time ? time_formatted : 0}
                    </Text>
                  </View>,
                  <View
                    style={[
                      ss.modalContent,
                      {
                        flexDirection: "column",
                        marginTop: 10,
                        marginBottom: 5,
                        borderColor: "#C8C8C8",
                        borderBottomWidth: 1,
                        paddingBottom: 5
                      }
                    ]}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {`${_customer_name[this.state.languageIndex]}: `}
                    </Text>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          marginTop: 5
                          //color: textColor[data.status]
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {/* {data ? data.detail.name : 0} */}
                      {this.state.customerName}
                    </Text>
                  </View>,
                  <Button
                    style={[ss.modalContent]}
                    onPress={() => {
                      this.setState({ showMenu: !this.state.showMenu });
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12
                          //alignSelf : "center"
                        }
                      ]}
                    >
                      {_detail_order[this.state.languageIndex]}
                    </Text>
                    {this.state.showMenu ? (
                      <Entypo
                        name={"chevron-up"}
                        style={{
                          alignSelf: "center",
                          fontSize: 15,
                          color: BLACK
                        }}
                      />
                    ) : (
                      <Entypo
                        name={"chevron-down"}
                        style={{
                          alignSelf: "center",
                          fontSize: 15,
                          color: BLACK
                        }}
                      />
                    )}
                  </Button>,
                  <View
                    style={[
                      ss.modalContent,
                      {
                        display: this.state.showMenu ? "none" : "none",
                        flex: 1
                      }
                    ]}
                  >
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={dataAllBill}
                      // columnWrapperStyle={{
                      //   justifyContent: "space-evenly",
                      //   marginBottom: 5
                      // }}
                      numColumns={2}
                      renderItem={({ item, index }) => {
                        return (
                          <View
                            style={{
                              //flex: 1,
                              //flex: 0.325,
                              //marginLeft: 15,
                              marginTop: 0,
                              width: "49%",
                              flexDirection: "row"
                              //marginBottom: 3,
                              //marginRight: 15
                            }}
                          >
                            <View style={{ flex: 2, flexDirection: "row" }}>
                              <Text
                                style={[
                                  MainStyle.robotoNormalBold,
                                  {
                                    flex: 1,
                                    fontSize: 12
                                    //alignSelf : "center"
                                  }
                                ]}
                              >
                                {item.Product.name ? item.Product.name : ""}
                              </Text>
                              {/* <Text
                                style={[
                                  MainStyle.robotoNormalBold,
                                  {
                                    flex: 1,
                                    fontSize: 12
                                    //alignSelf : "center"
                                  }
                                ]}
                              >
                                {item.notes}
                              </Text> */}
                            </View>

                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  flex: 1,
                                  fontSize: 12
                                  //alignSelf : "center"
                                }
                              ]}
                            >
                              {item.quantity}
                            </Text>
                          </View>
                        );
                      }}
                      keyExtractor={(item, index) => {
                        return "Table" + index.toString();
                      }}
                    />
                  </View>
                ]
              ) : (
                <View />
              )}
              {this.renderButtonTableSelection(data, status)}
              {/* Button End */}
            </View>
          </View>
        </View>
        <View
          style={{
            // flex: this.state.showMenu ? 0.2 : 0.6,
            flex: 0.3,
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
      </Modal>
    );
  }

  //modal pindah meja

  renderDataTableMove(data) {
    let bgColor = [WHITE, "rgba(131, 179, 53, 1)", "#C4C4C4", "#C84343"];

    let statusName = data.status.charAt(0).toUpperCase() + data.status.slice(1);
    return (
      <Button
        onPress={() => {
          //this.selectTable(data[0]);
        }}
        style={[
          ss.tableList,
          {
            // backgroundColor: bgColor[data.status],
            backgroundColor: "#EEEEEE",
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0,
            width: "33%",
            borderRadius: 15
          }
        ]}
      >
        <View
          style={[
            {
              padding: 15,
              paddingBottom: 20,
              paddingTop: 20,

              alignItems: "center"
              //borderColor: borderColor[0]
            }
          ]}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              { color: BLACK, fontSize: 16, marginBottom: 15 }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[MainStyle.robotoNormalBold, { color: BLACK, fontSize: 10 }]}
          >
            {data.capacity} pax
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color:
                  data.status === "available"
                    ? bgColor[1]
                    : data.status === "used"
                    ? bgColor[3]
                    : bgColor[2],
                fontSize: 11
              }
            ]}
          >
            {statusName}
          </Text>
        </View>
      </Button>
    );
  }

  handleMoveTable(data) {
    console.log("data 1 table move ==> ", data[0]);
    console.log("data 2 table move ==> ", data[1]);

    let table1 = data[0];
    let table2 = data[1];

    console.log(
      JSON.stringify({
        table_from_id: table1.id,
        table_to_id: table2.id
      })
    );

    fetch(BE_Move_Table, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        table_from_id: table1.id,
        table_to_id: table2.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson New ==> ", responseJson);
        let result = responseJson;
        let resultOrder = result;

        let message = [];

        if (result.statusCode === 200) {
          //message.push(val.message);
          message.push(_sukses[this.state.languageIndex]);
          this.getTableList();
        } else {
          message.push(_gagal[this.state.languageIndex]);
        }
        this.setState({ alertMessage: message, showAlert: true });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });

    // if (table1.status === 2) {
    //   //moveBooking

    //   fetch(ChangeBookingTableAPI, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //       //"Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     body: JSON.stringify({
    //       order_id: order_id,
    //       table_id: table_id
    //     })
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       console.log("responseJson New ==> ", responseJson);
    //       let result = responseJson;
    //       let resultOrder = result;
    //       this.getTableList();
    //     })
    //     .catch(_err => {
    //       console.log("ERR ==> ", _err);
    //     });
    // } else if (table1.status === 3) {
    //   //moveOrder

    //   //ChangeOrderTableAPI;

    //   fetch(ChangeOrderTableAPI, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //       //"Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     body: JSON.stringify({
    //       order_id: order_id,
    //       table_id: table_id
    //     })
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       console.log("responseJson New ==> ", responseJson);
    //       let result = responseJson;
    //       let resultOrder = result;
    //       this.getTableList();
    //     })
    //     .catch(_err => {
    //       console.log("ERR ==> ", _err);
    //     });
    // }
  }

  renderTableMove() {
    const { selectedTable } = this.state;
    let data = selectedTable;

    let bgColor = [WHITE, "rgba(131, 179, 53, 1)", "#C4C4C4", "#C84343"];

    const action = ["move", "combine"];

    let actionIndex = 0;

    if (data[0].status === data[1].status) {
      actionIndex = 1;
    }

    let title = [
      _pindah_meja[this.state.languageIndex],
      _gabung_pisah_transaksi[this.state.languageIndex]
    ];

    return (
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          this.closeModalMove();
        }}
        visible={this.state.modalCombine}
      >
        <View
          style={{
            flex: 0.6,
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
        <View style={[ss.modalCover]}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            <View
              style={[
                ss.modalBox,
                {
                  width: this.state.tablet ? "50%" : "100%",
                  alignSelf: "center"
                }
              ]}
            >
              <View
                style={{
                  margin: 20,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderColor: BLACK
                  //backgroundColor:'#BCA'
                }}
              >
                <View style={[ss.modalHeader]}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 20,
                        //alignSelf : "center"
                        textAlign: "center"
                      }
                    ]}
                  >
                    {title[actionIndex]}
                  </Text>
                </View>
                <View style={{ position: "absolute" }}>
                  <Button
                    onPress={() => {
                      this.closeModalMove();
                    }}
                  >
                    <Ionicons name={"md-close"} size={25} color={"#252529"} />
                  </Button>
                </View>
              </View>
              {/* Button Start */}
              <View
                style={{
                  marginTop: 25,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.renderDataTableMove(data[0])}
                <View
                  style={[
                    {
                      // backgroundColor: bgColor[data.status],
                      //backgroundColor: bgColor[data.status],
                      //borderWidth: 3,
                      padding: 0,
                      paddingBottom: 0,
                      paddingTop: 0,
                      width: "20%",
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  {actionIndex === 1 ? (
                    <Entypo name={"swap"} style={{ fontSize: 66 }} />
                  ) : (
                    <Entypo
                      name={"arrow-long-right"}
                      style={{ fontSize: 45 }}
                    />
                  )}
                </View>
                {this.renderDataTableMove(data[1])}
              </View>
              {/* <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  width: "75%",
                  //flex: 1,
                  justifyContent: "space-between",
                  alignSelf: "flex-end",
                  alignItems: "flex-end",
                  padding: 15,
                  marginBottom: 0,
                  flexDirection: "row"
                  //backgroundColor: "#ABC"
                }}
              >
                <View style={{ justifyContent: "space-between" }}>
                  <Button
                    onPress={() => {
                      //this.closeModal(actions);
                    }}
                    style={{
                      borderColor: MAIN_TEXT_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      borderWidth: 1,
                      minHeight: 25,
                      minWidth: 100,
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      borderRadius: 5,
                      padding: 5,
                      marginTop: 10
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_kembali[this.state.languageIndex]}
                    </Text>
                  </Button>
                </View>
                <View>
                  <Button
                    onPress={() => {
                      //this.closeModal(actions);
                      if (actionIndex === 1) {
                        Actions.MobileCombine({
                          data: data,
                          userInfo: this.state.userInfo,
                          colorIndex: this.state.colorIndex,
                          languageIndex: this.state.languageIndex
                        });
                        this.closeModalMove();
                      } else {
                        this.handleMoveTable(data);

                        this.closeModalMove();
                      }
                    }}
                    style={{
                      minHeight: 25,
                      minWidth: 100,
                      backgroundColor: "#83B235",
                      borderRadius: 5,
                      padding: 5,
                      marginTop: 10
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 12,
                          color: WHITE,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {_konfirmasi[this.state.languageIndex]}
                    </Text>
                  </Button>
                </View>
              </View>
            </View> */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    padding: 15,
                    marginBottom: 0,
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      width: "100%"
                    }}
                  >
                    <Button
                      onPress={() => {
                        //this.closeModal(actions);
                        if (actionIndex === 1) {
                          //console.log("combine ==> ", data)

                          Actions.pop();
                          Actions.MobileCombine({
                            data: data,
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex,
                            auth: this.state.auth
                          });
                          this.closeModalMove();
                        } else {
                          this.handleMoveTable(data);

                          this.closeModalMove();
                        }
                      }}
                      style={{
                        backgroundColor: MAIN_THEME_COLOR_SELECT(
                          this.state.colorIndex
                        ),

                        borderRadius: 15,
                        padding: 15,
                        marginTop: 10
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: 12,
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            textAlign: "center"
                          }
                        ]}
                      >
                        {_konfirmasi[this.state.languageIndex]}
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
              {/* Button End */}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderSelectBook() {
    return (
      <Dropdown
        style={{
          marginLeft: 0
          // paddingRight:100
        }}
        color={BLACK}
        // selectWidth = {'80%'}
        languageIndex={this.state.languageIndex}
        selectedValue={String(this.state.selected_booking)}
        optionLists={this.state.listBooking.map((v, k) => {
          //console.log('v ==> ', v);
          return {
            label:
              "Customer: " +
              v.customer_name.toString() +
              "\nKode Booking: " +
              v.kode +
              "\nWaktu :" +
              v.booking_time.toString(),
            value: String(v.id)
          };
        })}
        onValueChange={(itemValue, itemIndex) => {
          console.log("SELECTED Value ==> ", itemValue);
          this.setState({ selected_booking: itemValue });
        }}
      />
    );
  }

  renderButtonTableSelection(data, status) {
    const { selected_booking } = this.state;

    console.log("renderButtonTableSelection ==> ", data);
    if (status === "available") {
      console.log("rendering available", data );
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 15,
              marginBottom: 0,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                display: selected_booking ? "flex" : "none",
                width: "100%"
              }}
            >
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                  this.confirmBooking(data);
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),

                  borderRadius: 15,
                  padding: 15,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                      textAlign: "center"
                    }
                  ]}
                >
                  Confirm Booking
                </Text>
              </Button>
            </View>
            <View
              style={{
                display: selected_booking ? "none" : "flex",
                width: "100%"
              }}
            >
              <Button
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),

                  borderRadius: 15,
                  padding: 15,
                  marginTop: 10
                }}
                onPress={() => {
                  //CHECK IN TABLE KE MAIN MENU
                  MenuFunctions.SaveTableID(data.id, val => {
                    console.log("Sukses Masuk Bill - Table Id");
                  });

                  Actions.pop();
                  Actions.pop();
                  if (this.state.tablet) {
                    Actions.MobileHomeTabletNoReplace({
                      sales_type: this.state.sales_type_dine_in_id,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex,
                      checkIn: true,
                      table: data,
                      auth: this.state.auth
                    });
                  } else {
                    Actions.MobileHomePage({
                      //selected_table: { id: data.id, name: data.name },
                      sales_type: this.state.sales_type_dine_in_id,
                      userInfo: this.state.userInfo,
                      colorIndex: this.state.colorIndex,
                      languageIndex: this.state.languageIndex,
                      checkIn: true,
                      table: data,
                      auth: this.state.auth
                    });
                  }
                  this.closeModalTable();
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                      textAlign: "center"
                    }
                  ]}
                >
                  {/* Check In */}
                  Check In
                </Text>
              </Button>
            </View>
          </View>
        </View>
      );
    }

    if (status === "booking") {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 15,
              marginBottom: 0,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                width: "100%"
              }}
            >
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                  this.checkInTableBooking(data);
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),

                  borderRadius: 15,
                  padding: 15,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                      textAlign: "center"
                    }
                  ]}
                >
                  Check In
                </Text>
              </Button>
            </View>
          </View>
        </View>
      );
    }

    if (status === "used") {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 15,
              marginBottom: 0,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                width: "100%"
              }}
            >
              <Button
                onPress={() => {
                  //this.closeModal(actions);

                  //this.prosesDelete(data);

                  this.setState({
                    showCustomConfirmation: true,
                    dataDelete: data
                  });
                }}
                style={{
                  backgroundColor: RED_600,

                  borderRadius: 15,
                  padding: 15,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  {_cancel_order[this.state.languageIndex]}
                </Text>
              </Button>

              <Button
                onPress={() => {
                  //this.closeModal(actions);

                  this.prosesCheckOut(data);
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),

                  borderRadius: 15,
                  padding: 15,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                      textAlign: "center"
                    }
                  ]}
                >
                  {_check_out[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    let height = Dimensions.get("window").height - 80;
    const {
      reasonNotValid,
      showReason,
      showForm,
      formQty,
      formData,
      formType,
      showTableMove,
      modalCombine,
      modalTable
    } = this.state;

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_manajemen_meja[this.state.languageIndex]}
          notif={false}
          loginInformation={this.state.userInfo}
          hideLogin={true}
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

        {this.state.showCustomConfirmation === true ? (
          <CustomConfirmation
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showCustomConfirmation: false });
            }}
            submitAction={() => {
              //this.deleteData();
              this.prosesDelete(this.state.dataDelete);
              this.setState({ showCustomConfirmation: false });
            }}
            text={_delete_confirmation[this.state.languageIndex]}
          />
        ) : (
          <View />
        )}

        {showReason ? (
          <CustomAlert
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            message={reasonNotValid}
            //title={'Success'}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ showReason: false });
            }}
          />
        ) : (
          <View />
        )}

        {modalTable === true ? this.renderTableSelection() : <View />}
        {modalCombine === true ? this.renderTableMove() : <View />}

        <View style={{ flex: 92.5 }}>
            {this.renderRightSide()}
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{
                flex: 1,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                marginTop: -50,
                marginLeft: 15,
                marginRight: 15,
                backgroundColor: WHITE,
              }}
            >
              <View style={[ss.mainContent]}>
                {/* <View style={[ss.leftSide]}>{this.renderLeftTable()}</View>

            <View style={[ss.rightSide]}>{this.renderRightTable()}</View> */}
                <View style={[ss.leftSide]}>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  >
                    {this.renderLeftSide()}
                  </ScrollView>
                </View>
                {/* <View style={[ss.rightSide]}>
              {this.renderRightTableInformation()}

            </View> */}
              </View>
            </ScrollView>
          </View>
          </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    // backgroundColor: WHITE,
    backgroundColor: "#EEEAED",
    flex: 1,
    flexDirection: "column"
  },
  mainContent: {
    flexDirection: "row",
    padding: 0,
    paddingLeft: 0,
    flex: 1,
    justifyContent: "space-between"
    //height: '100%' ,
    //backgroundColor: "#995599"
  },
  mainView: {
    flex: 1,
    padding: 0
  },
  leftSide: {
    width: "100%",
    marginTop: 0,
    //backgroundColor: "#EEE",
    borderRadius: 5,
    borderWidth: 0,
    elevation: 0,
    borderColor: MAIN_THEME_COLOR
  },
  rightSide: {
    width: "24.5%",
    marginTop: 0,
    // backgroundColor: "#EEE",
    borderRadius: 5,
    borderWidth: 0,
    elevation: 0,
    borderColor: MAIN_THEME_COLOR
  },
  tableList: {
    //width: "45%",
    borderColor: BLACK
    // borderStartColor: BLACK,
    // borderEndColor: "#FF0000",
    //justifyContent: "center"
  },
  headerTableInfo: {
    width: "100%",
    justifyContent: "space-between"
  },
  tableInfoContent: {
    width: "100%"
    //alignContent: "center",
    //alignItems: "center"
  },
  modalCover: {
    flex: 1,
    //backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "column"
  },
  modalBox: {
    //maxHeight: height * 0.6,
    marginTop: -15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: WHITE,
    flex: 1
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
    flexDirection: "row"
  }
});
