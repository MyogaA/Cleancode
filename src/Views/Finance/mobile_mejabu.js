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
  MAIN_TEXT_COLOR_SELECT
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
  _success_order
} from "../../Libraries/DictionaryMeja";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import {
  GetTableAPI,
  ChangeOrderTableAPI,
  ChangeBookingTableAPI,
  GetBookingAPI,
  AssignBookingAPI,
  DetailOrderBillAPI
} from "../../Constants";
import MenuFunctions from "../../Libraries/MenuFunctions";
import { _cancel } from "../../Libraries/DictionaryHome";
import { _ok_alert } from "../../Libraries/DictionarySetting";
import { _status_simple } from "../../Libraries/DictionaryDrawer";

export default class MobileMeja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,

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
      selected_booking: null
    };
  }

  selectTable(data) {
    const { action } = this.state;
    let tempData = this.state.selectedTable;
    let isSame = false;
    let valid = true;
    let reasonNotValid = [_gagal_proses[this.state.languageIndex]];

    if (action === 1) {
      // gabung/pisah

      if (data.status === 1 && tempData.length !== 1) {
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
      console.log("data ==> ", data);
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
    }

    if (reasonNotValid.length > 1) {
      //alert("Gagal memperoses data karena: " + reasonNotValid[1]);
    }

    this.getBookingList();

    this.setState({
      selected_booking: null,
      selectedTable: tempData,
      modalTable: action === 1 ? false : true,
      modalCombine: tempData.length === 2 ? true : false,
      showReason: reasonNotValid.length > 1 && !isSame ? true : false,
      reasonNotValid: reasonNotValid
    });
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
    this.getBookingList();
    this.getTableList();
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
  prosesCheckOut(data) {
    console.log("prosesCheckOut ==> ", data);
    //convert ke databill

    fetch(`${DetailOrderBillAPI}?order_id=${data.detail.id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;

          let dataAllBill = [];
          resultData.map((v, i) => {
            let dataBillTemp = {
              id: v.id, //order_detail id
              name: v.name,
              qty: v.qty,
              price: v.price,
              total: v.total,
              notes: "",
              salesType: v.sales_type,
              salesTypeValue: v.price_service,
              product: {
                id: v.menu_id,
                name: v.name,
                price: v.price
              },
              detail: v.detail,
              status: v.status
            };

            dataAllBill.push(dataBillTemp);

            MenuFunctions.SaveMenu(dataAllBill, val => {
              console.log("Sukses Masuk Bill ", dataAllBill);
            });
          });

          MenuFunctions.SaveOrderID(data.detail.id, val => {
            console.log("Sukses Masuk Bill Order Id ", data.detail.id);
          });

          MenuFunctions.SaveTableID(data.id, val => {
            console.log("Sukses Masuk Bill - Table Id ", data.id);
          });

          MenuFunctions.SaveCustomerID(data.detail.customer_id, val => {
            console.log(
              "Sukses Masuk Bill - Cust Id ",
              data.detail.customer_id
            );
          });

          MenuFunctions.SaveBookingID(data.detail.booking_id, val => {
            console.log(
              "Sukses Masuk Bill - Booking Id ",
              data.detail.booking_id
            );
          });

          console.log("DATA BILL TEMP ==> ", dataAllBill);

          Actions.MobileHomePage({
            //selected_table: { id: data.id, name: data.name },
            sales_type: "Dine-In",
            userInfo: this.state.userInfo,
            colorIndex: this.state.colorIndex,
            languageIndex: this.state.languageIndex
          });

          //console.log('new data ==>', JSON.stringify(data))
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  checkInTable(data) {
    console.log("cek in ==> ", data);
    MenuFunctions.SaveTableID(data.id, val => {
      console.log("Sukses Masuk Bill - Table Id");
    });

    Actions.MobileHomePage({
      //selected_table: { id: data.id, name: data.name },
      sales_type: "Dine-In",
      userInfo: this.state.userInfo,
      colorIndex: this.state.colorIndex,
      languageIndex: this.state.languageIndex
    });
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

    Actions.MobileHomePage({
      //selected_table: { id: data.id, name: data.name },
      sales_type: "Dine-In",
      userInfo: this.state.userInfo,
      colorIndex: this.state.colorIndex,
      languageIndex: this.state.languageIndex
    });
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
      this.getBookingList();
      this.getTableList();
    }
  }

  getTableList() {
    const { userInfo } = this.state;
    const gerai_id = userInfo.gerai_id;

    let available = 0;
    let reserved = 0;
    let used = 0;

    let uri = `${GetTableAPI}?gerai_id=${gerai_id}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27
    let resultFinal = [];

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          console.log("getDataTable ==> ", resultData);
          resultData.map((v, i) => {
            if (v.status === 1) {
              available = available + 1;
            } else if (v.status === 2) {
              reserved = reserved + 1;
            } else if (v.status === 3) {
              used = used + 1;
            }
          });

          let tableInformation = {
            available: available,
            reserved: reserved,
            used: used
          };

          this.setState({
            listTable: resultData,
            tableInformation: tableInformation,
            selectedTable: []
          });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getBookingList() {
    const { userInfo } = this.state;
    const gerai_id = userInfo.gerai_id;
    let uri = `${GetBookingAPI}?gerai_id=${gerai_id}&page=1`;
    let resultFinal = [];

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.status) {
          let resultData = result.data;
          console.log(" ", resultData.data);
          this.setState({
            listBooking: resultData.data,
            selected_booking: resultData.data[0]
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
              style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 20 }]}
            >
              Table
            </Text>

            <Text
              style={[MainStyle.dmSans, { color: BLACK, fontSize: 20 }]}
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
      whiteColor,
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
              style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 20 }]}
            >
              {_action_0[this.state.languageIndex]}
            </Text>
          </View>
        </View>
        <View
          style={[ss.tableInfoContent, { marginTop: 10, alignItems: "center" }]}
        >
          <Button
            onPress={() => {
              this.setState({ action: 0, selectedTable: [] });
            }}
            style={[
              ss.box,
              {
                marginBottom: 10,
                width: "75%",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: backgroundColor[colorIndex1],
                borderColor: BLACK,
                borderWidth: 1,
                padding: 3
              }
            ]}
          >
            <Text
              style={[
                MainStyle.dmSansBold,
                { color: textColor[colorIndex1], fontSize: 16 }
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
                marginBottom: 10,
                width: "75%",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: backgroundColor[colorIndex2],
                borderColor: BLACK,
                borderWidth: 1,
                padding: 3
              }
            ]}
          >
            <Text
              style={[
                MainStyle.dmSansBold,
                { color: textColor[colorIndex2], fontSize: 16 }
              ]}
            >
              {_action_2[this.state.languageIndex]}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  renderLeftSideDetail(data, i) {
    let bgColor = [WHITE, "rgba(131, 179, 53, 1)", "#C4C4C4", "#C84343"];
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

    return (
      <Button
        onPress={() => {
          this.selectTable(data);
        }}
        style={[
          ss.tableList,
          {
            // backgroundColor: bgColor[data.status],
            backgroundColor: bgColor[data.status],
            borderWidth: 3,
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0
          }
        ]}
      >
        <View
          style={[
            {
              padding: 15,
              paddingBottom: 20,
              paddingTop: 20,
              borderRadius: 27,
              alignItems: "center",
              borderWidth: 7,
              borderColor: borderColor[borderColorIndex]
              //borderColor: borderColor[0]
            }
          ]}
        >
          <Text
            style={[
              MainStyle.dmSansBold,
              { color: BLACK, fontSize: 12, marginBottom: 15 }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 10 }]}
          >
            {data.capacity} pax
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 10 }]}
          >
            {data.statusName}
          </Text>
        </View>
      </Button>
    );
  }

  renderLeftSide() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <FlatList
          style={{
            paddingLeft: "0%",
            paddingRight: "0%",
            paddingTop: "2.5%"
          }}
          //ListHeaderComponent={this.renderSearch()}
          showsVerticalScrollIndicator={false}
          data={this.state.listTable}
          numColumns={2}
          renderItem={({ item, index }) => {
            return this.renderLeftSideDetail(item, index);
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

    if (selectedTable[0]) {
      data = selectedTable[0];
      status = selectedTable[0].status;
    }

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
        <View style={[ss.modalCover]}>
          <View style={[ss.modalBox, { width: "95%" }]}>
            <View style={{ position: "absolute", right: 10, top: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.closeModalTable();
                }}
              >
                <Ionicons name={"md-close"} size={30} color={BLACK} />
              </TouchableOpacity>
            </View>
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
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      //alignSelf : "center"
                      textAlign: "center"
                    }
                  ]}
                >
                  {data ? data.name : ""}
                </Text>
              </View>
            </View>
            <View style={[ss.modalContent]}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 12
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
                {data ? data.statusName : ""}
              </Text>
            </View>
            {status === 1 ? (
              [
                <View style={[ss.modalContent]}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 12
                        //alignSelf : "center"
                      }
                    ]}
                  >
                    {`Kapasitas Maksimal: `}
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
                <View style={[ss.modalContent]}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 12
                        //alignSelf : "center"
                      }
                    ]}
                  >
                    {`${_konfirmasi[this.state.languageIndex]} Booking: `}
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
                <View style={[ss.modalContent]}>{this.renderSelectBook()}</View>
              ]
            ) : (
              <View />
            )}
            {status === 2 ? (
              [
                <View style={[ss.modalContent]}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 12
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
                <View style={[ss.modalContent]}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 12,
                        fontStyle: "italic"
                        //alignSelf : "center"
                      }
                    ]}
                  >
                    {`Notes: `}
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
                <View style={[ss.modalContent]}>
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

            {status === 3 ? (
              [
                <View style={[ss.modalContent]}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 12
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
                    {data ? data.detail.time : 0}
                  </Text>
                </View>,
                <View style={[ss.modalContent]}>
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
                        fontSize: 12
                        //color: textColor[data.status]
                        //alignSelf : "center"
                      }
                    ]}
                  >
                    {data ? data.detail.name : 0}
                  </Text>
                </View>
                // <View style={[ss.modalContent]}>
                //   <Text
                //     style={[
                //       MainStyle.robotoNormalBold,
                //       {
                //         fontSize: 20
                //         //alignSelf : "center"
                //       }
                //     ]}
                //   >
                //     {`Waiter: `}
                //   </Text>
                //   <Text
                //     style={[
                //       MainStyle.robotoNormalBold,
                //       {
                //         fontSize: 20
                //         //color: textColor[data.status]
                //         //alignSelf : "center"
                //       }
                //     ]}
                //   >
                //     {data ? data.detail.waiterName : 0}
                //   </Text>
                // </View>
              ]
            ) : (
              <View />
            )}
            {this.renderButtonTableSelection(data, status)}
            {/* Button End */}
          </View>
        </View>
      </Modal>
    );
  }

  //modal pindah meja

  renderDataTableMove(data) {
    let bgColor = [WHITE, "rgba(131, 179, 53, 1)", "#C4C4C4", "#C84343"];
    return (
      <Button
        onPress={() => {
          //this.selectTable(data[0]);
        }}
        style={[
          ss.tableList,
          {
            // backgroundColor: bgColor[data.status],
            backgroundColor: bgColor[data.status],
            borderWidth: 3,
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0,
            width: "33%"
          }
        ]}
      >
        <View
          style={[
            {
              padding: 15,
              paddingBottom: 20,
              paddingTop: 20,
              borderRadius: 27,
              alignItems: "center",
              borderWidth: 7,
              borderColor: "transparent"
              //borderColor: borderColor[0]
            }
          ]}
        >
          <Text
            style={[
              MainStyle.dmSansBold,
              { color: BLACK, fontSize: 12, marginBottom: 15 }
            ]}
          >
            {data.name}
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 10 }]}
          >
            {data.capacity} pax
          </Text>
          <Text
            style={[MainStyle.dmSansBold, { color: BLACK, fontSize: 10 }]}
          >
            {data.statusName}
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
    const table_id = table2.id;
    const order_id = table1.detail.id;
    if (table1.status === 2) {
      //moveBooking

      fetch(ChangeBookingTableAPI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          order_id: order_id,
          table_id: table_id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("responseJson New ==> ", responseJson);
          let result = responseJson;
          let resultOrder = result;
          this.getTableList();
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });
    } else if (table1.status === 3) {
      //moveOrder

      //ChangeOrderTableAPI;

      fetch(ChangeOrderTableAPI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          order_id: order_id,
          table_id: table_id
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("responseJson New ==> ", responseJson);
          let result = responseJson;
          let resultOrder = result;
          this.getTableList();
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });
    }
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
        <View style={[ss.modalCover]}>
          <View style={[ss.modalBox, { width: "95%" }]}>
            <View style={{ position: "absolute", right: 10, top: 10 }}>
              <Button
                onPress={() => {
                  this.closeModalMove();
                }}
              >
                <Ionicons
                  name={"ios-close-circle-outline"}
                  size={30}
                  color={BLACK}
                />
              </Button>
            </View>
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
                    MainStyle.dmSansBold,
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
                  <Entypo name={"arrow-long-right"} style={{ fontSize: 45 }} />
                )}
              </View>
              {this.renderDataTableMove(data[1])}
            </View>
            <View
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
                        MainStyle.dmSansBold,
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
                        MainStyle.dmSansBold,
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
            </View>
            {/* Button End */}
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
    if (status === 1) {
      return (
        <View
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
              alignItems: "flex-end",
              padding: 15,
              marginBottom: 0,
              flexDirection: "row"
            }}
          >
            <View style={{}}>
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                  this.confirmBooking(data);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(49, 150, 206, 0.59)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  Confirm Booking
                </Text>
              </Button>

              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(225, 114, 114, 0.59)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  {_cancel[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
            <View>
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(49, 150, 206, 0.59)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  QR Code
                </Text>
              </Button>

              <Button
                onPress={() => {
                  //this.closeModal(actions);
                  this.checkInTable(data);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(49, 150, 206, 0.59)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
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

    if (status === 2) {
      return (
        <View
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
              alignItems: "flex-end",
              padding: 15,
              marginBottom: 0,
              flexDirection: "row"
              //backgroundColor: "#ABC"
            }}
          >
            <View style={{}}>
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(6, 78, 162, 0.5)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  QR code
                </Text>
              </Button>
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(225, 114, 114, 0.59)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
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
                  this.checkInTableBooking(data);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(6, 78, 162, 0.5)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  Check In
                </Text>
              </Button>

              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(225, 114, 114, 0.59)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  Batal
                </Text>
              </Button>
            </View>
          </View>
        </View>
      );
    }

    if (status === 3) {
      return (
        <View
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
              alignItems: "flex-end",
              padding: 15,
              marginBottom: 0,
              flexDirection: "row"
              //backgroundColor: "#ABC"
            }}
          >
            <View style={{}}>
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(225, 114, 114, 0.59)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  Pisah/Gabung
                </Text>
              </Button>
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(225, 114, 114, 0.59)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  {_pindah_meja[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
            <View>
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(6, 78, 162, 0.5)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  {_cetak_bill[this.state.languageIndex]}
                </Text>
              </Button>

              <Button
                onPress={() => {
                  //this.closeModal(actions);
                  this.prosesCheckOut(data);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(6, 78, 162, 0.5)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  Check Out
                </Text>
              </Button>
              <Button
                onPress={() => {
                  //this.closeModal(actions);
                }}
                style={{
                  minHeight: 25,
                  minWidth: 100,
                  backgroundColor: "rgba(6, 78, 162, 0.5)",
                  borderRadius: 5,
                  padding: 5,
                  marginTop: 10
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 12,
                      color: WHITE,
                      textAlign: "center"
                    }
                  ]}
                >
                  QR code
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1
          }}
        >
          <View style={[ss.mainContent, { height: height }]}>
            {/* <View style={[ss.leftSide]}>{this.renderLeftTable()}</View>

            <View style={[ss.rightSide]}>{this.renderRightTable()}</View> */}
            <View style={[ss.leftSide]}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {this.renderRightSide()}
                {this.renderLeftSide()}
              </ScrollView>
            </View>
            {/* <View style={[ss.rightSide]}>
              {this.renderRightTableInformation()}

            </View> */}
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
    width: "100%",
    marginTop: 0,
    backgroundColor: "#EEE",
    borderRadius: 5,
    borderWidth: 0,
    elevation: 0,
    borderColor: MAIN_THEME_COLOR
  },
  rightSide: {
    width: "24.5%",
    marginTop: 0,
    backgroundColor: "#EEE",
    borderRadius: 5,
    borderWidth: 0,
    elevation: 0,
    borderColor: MAIN_THEME_COLOR
  },
  tableList: {
    borderRadius: 30,
    width: "45%",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
    borderColor: BLACK
    // borderStartColor: BLACK,
    // borderEndColor: "#FF0000",
    //justifyContent: "center"
  },
  headerTableInfo: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    paddingBottom: 10
  },
  tableInfoContent: {
    width: "100%"
    //alignContent: "center",
    //alignItems: "center"
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
    width: "30%",
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
    width: "75%",
    flexDirection: "row"
  }
});
