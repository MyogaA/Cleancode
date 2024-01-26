/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text as DefaultText,
  Image,
  Picker,
  Modal,
  TextInput,
  FlatList,
  TouchableHighlight,
  ScrollView,
  Alert,
  Linking,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions
} from "react-native";
import {
  WHITE,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SUB,
  RED_400,
  BLACK,
  RED_500,
  MAIN_TEXT_COLOR_LIST,
  GREEN_500
} from "../Libraries/Colors";

import { Actions } from "react-native-router-flux";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import FA5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Button from "./Button";
import Checkbox from "./Checkbox";
import FloatingLabelInput from "./FloatingTextInput";
import Text from "./Text";
import LoginFunctions from "../Libraries/LoginFunctions";
import ColorFunctions from "../Libraries/ColorFunctions";

import {
  _notifikasi,
  _booking,
  _tolak,
  _hold,
  _konfirmasi,
  _permintaan_reservasi,
  _message1,
  _message2,
  _nama,
  _jumlah,
  _waktu,
  _date,
  _notes,
  _status,
  _time_left
} from "../Libraries/DictionaryDrawer";

import Dropdown from "./MobileDropdown";
import Dropdown_V2 from "./MobileHeaderDropDown";
import DeviceInfo from "react-native-device-info";

import MainStyle from "../Styles";
import {
  GetBookingAPI,
  GetTableAPI,
  CancelBookAPI,
  AssignBookingAPI,
  LogoutAPI,
  GetNotificationAPI
} from "../Constants";
import moment from "moment";
import PrinterFunctions from "../Libraries/PrinterFunctions";
import NetInfo from "@react-native-community/netinfo";
import { _add_header, _choose_type } from "../Libraries/DictionaryRekap";
import { _batal } from "../Libraries/DictionaryPayment";
import { _pilih_meja } from "../Libraries/DictionaryHistory";
import { _confirmation_logout, _no, _yes } from "../Libraries/DictionarySetting";

const styles = StyleSheet.create({
  headerMain: {
    //height: 56,
    flexDirection: "row",
    alignItems: "center",
    //elevation: 0,
    paddingLeft: 10
  },
  headerBtnView: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  headerIcon: {
    color: WHITE,
    fontSize: 22
  },
  notifView: {
    position: "absolute",
    //backgroundColor: '#F44336',
    backgroundColor: WHITE,
    borderRadius: 20,
    height: 15,
    width: 15,
    right: 10,
    top: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  notifMain: {
    width: "90%",
    paddingTop: 15,
    paddingBottom: 15,
    minHeight: 200,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute",
    right: "5%",
    top: 35,
    zIndex: 5,
    elevation: 3,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: BLACK
  },
  notifHeader: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: BLACK
  },
  notifListMain: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15
    //flex: 1
    //backgroundColor: "#BCA"
  },
  notifListIndividual: {
    marginBottom: 15,
    paddingTop: 15,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1,
    backgroundColor: "rgba(196, 196, 196, 0.42)"
  },
  buttons: {
    backgroundColor: WHITE,
    borderRadius: 5,
    borderColor: BLACK,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  }
});

var isConnectedStatus = true;

export default class MobileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_logout: false,
      tablet: DeviceInfo.isTablet(),
      modal_table: false,
      modal_reject: false,
      ready: true,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      notification: true,
      notifNumber: 0,
      cartNumber: 0,
      notificationType: "Booking",
      title: this.props.title ? this.props.title : 0,
      userInfo: this.props.loginInformation
        ? this.props.loginInformation
        : null,
      showNotification: false,
      list_booking: [],
      list_table: [],
      reason_reject: "",
      selected_booking: 0,
      selected_table: 0,
      refreshing: false,
      list_notification: [],
      is_online: true
    };
  }

  // NetInfo.isConnected.fetch().then(isConnected => {
  //   //console.log('Connection First, is ' + (isConnected ? 'online' : 'offline'));
  //   isConnectedStatus = isConnected;
  // });

  componentDidMount() {
    //this.getNotif();

    // if (this.props.dineInID) {
    //   console.log("dineInID ==> ", this.props.dineInID);
    // }

    const unsubscribe = NetInfo.addEventListener(state => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      //alert(state.isConnected);
      this.setState({ is_online: state.isConnected });
    });

    //unsubscribe();

    LoginFunctions.LoginInformation(val => {
      this.setState({ userInfo: val });
    });

    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    ColorFunctions.GetColor(val => {
      if (val !== 0 && this.state.colorIndex === 0) {
        this.setState({ colorIndex: val });
      }
    });

    //console.log("TEst Headerrrr ==>");

    if (this.state.userInfo) {
      //this.getBookingList();
      //this.getNotification();
    } else {
      setTimeout(() => {
        //this.getBookingList();
        //this.getNotification();
      }, 100);
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      LoginFunctions.LoginInformation(val => {
        if (val !== this.state.userInfo) {
          this.setState({ userInfo: val });
        }
      });

      if (this.props.fromSetting) {
        this.setState({ colorIndex: this.props.colorIndex });
      } else {
        ColorFunctions.GetColor(val => {
          if (val !== 0 && this.state.colorIndex === 0) {
            this.setState({ colorIndex: val });
          }
        });
      }

      PrinterFunctions.GetLanguage(val => {
        if (val !== null) {
          this.setState({ languageIndex: val });
        }
      });

      //this.getNotification();
      //this.getBookingList();
    }
  }

  getNotification(page = 1) {
    const gerai_id = this.state.userInfo.gerai_id;
    const uri = `${GetNotificationAPI}?gerai_id=${gerai_id}&page=${page}`;

    //console.log("GET NOTIF URI ==>", uri);

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("GET DATA responseJson ==>", responseJson);
        let resultData = responseJson.data.data;

        this.setState({
          list_notification: resultData,
          refreshing: false
        });
      })
      .catch(error => {
        //console.error(error);
        this.setState({ loading: false });
      });
  }

  getDataTable() {
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
          }
        });

        if (finalResult.length > 0) {
          this.setState({
            list_table: finalResult
          });
        } else {
          this.setState({
            list_table: finalResult
          });
        }

        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR getDataTable ==> ", _err);
      });
  }

  getBookingList() {
    // const { userInfo } = this.state;
    // const gerai_id = userInfo.gerai_id;
    // let uri = `${GetBookingAPI}?gerai_id=${gerai_id}&page=1`;
    // let resultFinal = [];
    // fetch(uri, {
    //   method: "GET"
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     let result = responseJson;
    //     if (result.status) {
    //       let resultData = result.data;
    //       this.setState({
    //         list_booking: resultData.data,
    //         notifNumber: resultData.data.length
    //       });
    //     }
    //   })
    //   .catch(_err => {
    //     console.log("ERR getBookingList ==> ", _err);
    //   });
  }

  getNotif() {
    // let notifNumber = 25;
    // this.setState({ notifNumber: notifNumber });
  }

  cancelReservation() {
    let reason = this.state.reason_reject;
    if (reason === "") {
      alert("Masukan alasan reject");
    } else {
      fetch(`${CancelBookAPI}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          booking_id: this.state.selected_booking,
          status: "reject",
          reason: this.state.reason_reject
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          let result = responseJson;
          if (result.status) {
            let resultData = result.data;
            alert("Reject booking berhasil");
            this.setState({ modal_reject: false });
            this.getBookingList();
            //console.log('new data ==>', JSON.stringify(data))
          }
        })
        .catch(_err => {
          console.log("ERR cancelReservation ==> ", _err);
        });
    }
  }

  confirmReservation() {
    if (this.state.selected_table) {
      fetch(`${AssignBookingAPI}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          booking_id: this.state.selected_booking,
          table_id: this.state.selected_table
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          let result = responseJson;
          if (result.status) {
            let resultData = result.data;
            alert("Konfirmasi booking berhasil");
            this.setState({ modal_table: false });
            this.getBookingList();
            //console.log('new data ==>', JSON.stringify(data))
          }
        })
        .catch(_err => {
          console.log("ERR cancelReservation ==> ", _err);
        });
    } else {
      alert("Meja harus dipilih");
    }
  }

  renderNotifIndividual(data, i) {
    //console.log("renderNotifIndividual ==> ", data);
    const {
      actionRejectReservation,
      actionHoldReservation,
      actionConfirm
    } = this.props;
    const { userInfo } = this.state;

    let status = "New";

    if (data.status === "confirmed") {
      status = "Confirmed";
    }

    if (data.status === "onprogress") {
      status = "On Progress";
    }

    if (data.status === "done") {
      status = "Done";
    }

    if (data.status === "cancel") {
      status = "Cancel";
    }

    if (data.status === "reject") {
      status = "Reject";
    }

    if (data.status === "hold") {
      status = "Hold";
    }

    return (
      <View style={[styles.notifListIndividual]}>
        <View
          style={[
            styles.notifHeader,
            // { borderColor: "#C4C4C", borderBottomWidth: 1.25 }
          ]}
        >
          <Text style={[MainStyle.dmSans, { fontSize: 14, color: BLACK }]}>
            {_permintaan_reservasi[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ padding: 15 }}>
          <View>
            <Text
              style={[MainStyle.dmSans, { fontSize: 10, color: BLACK }]}
            >
              {data.customer_name} {_message1[this.state.languageIndex]}
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 12, color: BLACK, textAlign: "center" }
              ]}
            >
              {_message2[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              width: "100%",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            {/* Baris 1 Start */}
            <View style={{ width: "95%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {_nama[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {data.customer_name}
                </Text>
              </View>
            </View>
            {/* Baris 1 End */}
            <View style={{ width: "95%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {_jumlah[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {data.person} Person
                </Text>
              </View>
            </View>
            {/* Baris 2 End */}
            <View style={{ width: "95%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {_waktu[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {moment(data.booking_time).format("HH:mm")}
                </Text>
              </View>
            </View>
            {/* Baris 3 End */}
            <View style={{ width: "95%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {_date[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {moment(data.booking_time).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
            {/* Baris 4 End */}
            <View style={{ width: "95%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {_notes[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 10,
                      color: BLACK,
                      textAlign: "left",
                      width: "50%"
                    }
                  ]}
                >
                  {data.notes === "" ? "Tidak ada" : data.notes}
                </Text>
              </View>
            </View>
            {/* Baris 5 End */}
          </View>
          <View
            style={{
              marginTop: 5,
              width: "100%",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <Text
              style={[
                MainStyle.dmSans,
                {
                  fontSize: 10,
                  color: "#FF0000",
                  textAlign: "center"
                }
              ]}
            >
              {_status[this.state.languageIndex]} {data.status}
            </Text>
            <Text
              style={[
                MainStyle.dmSans,
                {
                  fontSize: 10,
                  color: "#FF0000",
                  textAlign: "center"
                }
              ]}
            >
              {_time_left[this.state.languageIndex]} (00:05:20)
            </Text>
          </View>
          <View
            style={{
              marginTop: 15,
              width: "100%",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[styles.buttons]}
              onPress={() => {
                // if (actionRejectReservation) {
                //   actionRejectReservation();
                // } else {
                //   Actions.Meja({
                //     userInfo: userInfo,
                //     colorIndex: this.state.colorIndex
                //   });
                // }
                this.setState({
                  selected_booking: data.id,
                  reason_reject: "",
                  modal_reject: true
                });
              }}
            >
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 10,
                    color: BLACK,
                    textAlign: "center"
                  }
                ]}
              >
                {_tolak[this.state.languageIndex]}
              </Text>
            </Button>
            <Button
              style={[styles.buttons]}
              onPress={() => {
                if (actionHoldReservation) {
                  actionHoldReservation();
                } else {
                  Actions.MobileMeja({
                    userInfo: userInfo,
                    colorIndex: this.state.colorIndex
                  });
                }
              }}
            >
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 10,
                    color: BLACK,
                    textAlign: "center"
                  }
                ]}
              >
                {_hold[this.state.languageIndex]}
              </Text>
            </Button>
            <Button
              onPress={() => {
                // if (actionConfirm) {
                //   actionConfirm();
                // } else {
                //   Actions.Meja({
                //     userInfo: userInfo,
                //     colorIndex: this.state.colorIndex
                //   });
                // }
                this.getDataTable();
                this.setState({
                  selected_booking: data.id,
                  modal_table: true,
                  selected_table: null
                });
              }}
              style={[
                styles.buttons,
                { backgroundColor: "#7AB93C", borderWidth: 0 }
              ]}
            >
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 10,
                    color: BLACK,
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
    );
  }

  renderNotifIndividualConfirmed(data, i) {
    data = {
      title: "Permintaan Reservasi",
      table: {
        number: "8",
        capacity: 4,
        code: "BTPB948"
      },
      phone: "087886038357",
      message: "Anthony mengirim permintaan reservasi melalui Beet Apps.",
      message2: "Data Reservasi",
      name: "Anthony",
      person: 4,
      time: "19:00",
      date: "30/10/2019",
      notes: "",
      status: 2,
      statusName: "Berhasil Menunggu Pelanggan Check-In"
    };

    const { actionCancelReservation } = this.props;
    const { userInfo } = this.state;

    let regzero = /^(0)/g;

    let table = data.table;
    return (
      <View style={[styles.notifListIndividual]}>
        <View
          style={[
            styles.notifHeader,
            { borderColor: "#C4C4C", borderBottomWidth: 1.25 }
          ]}
        >
          <Text style={[MainStyle.dmSans, { fontSize: 16, color: BLACK }]}>
            {data.title}
          </Text>
        </View>
        <View
          style={{
            padding: 15,
            borderColor: BLACK,
            borderBottomWidth: 1
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 12, color: BLACK }]}
            >
              Nomor Meja: {table.number}
            </Text>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 12, color: BLACK }]}
            >
              Kapasitas Meja: {table.capacity} Pax
            </Text>
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 12, color: BLACK }]}
            >
              Kode: {table.code}
            </Text>
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <View>
            <Text
              style={[MainStyle.dmSans, { fontSize: 12, color: BLACK }]}
            >
              {data.message}
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 12, color: BLACK, textAlign: "center" }
              ]}
            >
              {data.message2}
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              width: "100%",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            {/* Baris 1 Start */}
            <View style={{ width: "80%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "35%"
                    }
                  ]}
                >
                  Nama
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "30%"
                    }
                  ]}
                >
                  {data.name}
                </Text>
              </View>
            </View>
            {/* Baris 1 End */}
            <View style={{ width: "80%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "35%"
                    }
                  ]}
                >
                  Jumlah Pax
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "30%"
                    }
                  ]}
                >
                  {data.person} Person
                </Text>
              </View>
            </View>
            {/* Baris 2 End */}
            <View style={{ width: "80%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "35%"
                    }
                  ]}
                >
                  Waktu Reservasi
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "30%"
                    }
                  ]}
                >
                  {data.time}
                </Text>
              </View>
            </View>
            {/* Baris 3 End */}
            <View style={{ width: "80%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "35%"
                    }
                  ]}
                >
                  Tanggal Reservasi
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "30%"
                    }
                  ]}
                >
                  {data.date}
                </Text>
              </View>
            </View>
            {/* Baris 4 End */}
            <View style={{ width: "80%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "35%"
                    }
                  ]}
                >
                  Notes
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: BLACK,
                      textAlign: "left",
                      width: "30%"
                    }
                  ]}
                >
                  {data.notes === "" ? "Tidak ada" : data.notes}
                </Text>
              </View>
            </View>
            {/* Baris 5 End */}
          </View>
          <View
            style={{
              marginTop: 5,
              width: "100%",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <Text
              style={[
                MainStyle.dmSans,
                {
                  fontSize: 12,
                  color: "#7AB93C",
                  textAlign: "center"
                }
              ]}
            >
              Status Reservasi: {data.statusName}
            </Text>
          </View>
          <View
            style={{
              marginTop: 15,
              width: "80%",
              alignItems: "center",
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Button
              style={[styles.buttons]}
              onPress={() => {
                if (actionCancelReservation) {
                  actionCancelReservation();
                } else {
                  Actions.Meja({
                    userInfo: userInfo,
                    colorIndex: this.state.colorIndex
                  });
                }
              }}
            >
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 12,
                    color: BLACK,
                    textAlign: "center"
                  }
                ]}
              >
                Batalkan Reservasi
              </Text>
            </Button>
            <Button
              onPress={() => {
                if (regzero.test(data.phone)) {
                  Linking.openURL(
                    "whatsapp://send?text=hello&phone=" +
                      data.phone.replace("0", "+62")
                  ).catch(err =>
                    alert("WhatsApp tidak terinstall di perangkat anda")
                  );
                } else {
                  Linking.openURL(
                    "whatsapp://send?text=hello&phone=" + data.phone
                  ).catch(err =>
                    alert("WhatsApp tidak terinstall di perangkat anda")
                  );
                }
              }}
              style={[styles.buttons]}
            >
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 12,
                    color: BLACK,
                    textAlign: "center"
                  }
                ]}
              >
                Hubungi Pelanggan
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  renderLogoutMessage() {
    const { logoutAction } = this.props;
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modal_logout}
        onRequestClose={() => {
          this.setState({ modal_logout: false });
        }}
      >
        <View style={[ss.modalCover]}>
          <View
            style={{
              width: "70%",
              //minHeight: 200,
              //maxHeight: height * 0.6,
              backgroundColor: WHITE,
              borderRadius: 10,
              marginLeft: 20,
              marginRight: 20
            }}
          >
            <View style={{ position: "absolute", right: 10, top: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modal_logout: false });
                }}
              >
                <Ionicons name={"md-close"} size={30} color={WHITE} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                margin: 20,
                marginBottom: 5
                //borderBottomWidth: 1,
                //borderColor: BLACK
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
                  {_confirmation_logout[this.state.languageIndex]}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 0,
                marginLeft: 20,
                marginRight: 20,
                width: "100%",
                //flexDirection: "row",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={[
                  ss.modalContent,
                  {
                    marginBottom: 25,
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }
                ]}
              >
                <Button
                  onPress={() => {
                    this.setState({ modal_reject: false });
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
                    {_no[this.state.languageIndex]}
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    //this.closeModal(actions);
                    //this.confirmBooking(data);
                    //this.cancelReservation();
                    logoutAction();
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
                    {_yes[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderNotificationData(data, index) {
    console.log("renderNotificationData ==> ", data);
    let time = moment(data.time);
    let time_now = moment(new Date());
    let time_string = moment(data.time).format("DD/MM/YYYY HH:mm");
    let time_difference = time_now.diff(time, "seconds");
    let time_ago = 0;
    let prefix = "minutes";
    const minute = 60;
    const hour = 3600;
    const day = 86400;
    const week = 604800;
    const month = 2592000;
    const year = 31536000;
    if (time_difference < minute) {
      time_ago = null;
      prefix = "Beberapa detik yang lalu";
    } else if (time_difference > minute && time_difference < hour) {
      time_ago = parseInt(time_difference / minute);
      prefix = " menit yang lalu";
    } else if (time_difference > hour && time_difference < day) {
      time_ago = parseInt(time_difference / hour);
      prefix = " jam yang lalu";
    } else if (time_difference > day && time_difference < week) {
      time_ago = parseInt(time_difference / day);
      prefix = " hari yang lalu";
      if (time_ago === 1) {
        time_ago = null;
        prefix = "Kemarin";
      }
    } else if (time_difference > week && time_difference < month) {
      time_ago = parseInt(time_difference / week);
      prefix = " minggu yang lalu";
    } else if (time_difference > month && time_difference < year) {
      time_ago = parseInt(time_difference / month);
      prefix = " bulan yang lalu";
    } else if (time_difference > year) {
      time_ago = parseInt(time_difference / year);
      // console.log("Time Year time_ago ==> ", time_ago);
      // console.log("Time Year time_string ==> ", time_string);
      // console.log("Time Year time ==> ", time);

      prefix = " tahun yang lalu";
      // if (time_ago > 2) {
      //   time_ago = null;
      //   prefix = moment(data.time).format("DD/MM/YYYY HH:mm");
      // }
    }

    return (
      <View
        style={{
          margin: 15,
          minHeight: 100,
          flex: 1,
          flexDirection: "column",
          borderColor: MAIN_THEME_COLOR,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderRadius: 10,
          backgroundColor: WHITE,
          elevation: 1
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            top: -15,
            borderRadius: 15
          }}
        >
          {data.status === 0 ? (
            <View
              style={{
                alignSelf: "center",
                backgroundColor: WHITE,
                padding: 5
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 12,
                    color: RED_500
                  }
                ]}
              >
                NEW
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{}}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  overflow: "hidden",
                  borderRadius: 10
                }}
                source={{ uri: data.retail_image }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                marginLeft: 10
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 12
                  }
                ]}
              >
                {data.customer_name}
              </Text>
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 12
                  }
                ]}
              >
                {data.title}
              </Text>
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 10
                  }
                ]}
              >
                {data.message}
              </Text>
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 10
                  }
                ]}
              >
                {time_ago}
                {prefix}
              </Text>
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 10
                  }
                ]}
              >
                {time_string}
              </Text>
            </View>
            {/* <Text style={[MainStyle.dmSans, { fontSize: 14 }]}>
            {data ? data.title : ""}
          </Text>
          <Text style={[MainStyle.dmSans, { fontSize: 14 }]}>
            {data ? data.message : ""}
          </Text> */}
          </View>
        </View>
      </View>
    );
  }

  changeType(type) {
    let { notificationType } = this.state;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ notificationType: type });
  }

  renderNotification() {
    // Dimensions.get("window").height - 90;
    const { notificationType } = this.state;
    return (
      <View style={[styles.notifMain, {}]}>
        <View
          style={[
            styles.notifHeader,
            { flexDirection: "row", justifyContent: "space-between" }
          ]}
        >
          <Button
            style={{
              margin: 0,
              borderColor:
                notificationType === "Notifikasi" ? "#777" : "#C4C4C4",
              borderRadius: 0,
              borderBottomWidth: notificationType === "Notifikasi" ? 5 : 2,
              padding: 3,
              paddingBottom: notificationType === "Notifikasi" ? 3 : 6,
              width: "49%",
              alignItems: "center"
            }}
            onPress={() => {
              this.changeType("Notifikasi");
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 12, color: WHITE }]}
            >
              {_notifikasi[this.state.languageIndex]}
            </Text>
          </Button>
          <Button
            style={{
              margin: 0,
              borderColor: notificationType === "Booking" ? "#777" : "#C4C4C4",

              borderRadius: 0,
              borderBottomWidth: notificationType === "Booking" ? 5 : 2,
              padding: 3,
              paddingBottom: notificationType === "Booking" ? 3 : 6,
              width: "49%",
              alignItems: "center"
            }}
            onPress={() => {
              this.changeType("Booking");
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 12, color: WHITE }]}
            >
              {_booking[this.state.languageIndex]}
            </Text>
          </Button>
        </View>
        <View style={[styles.notifListMain]}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ height: Dimensions.get("window").height * 0.75 }}
          >
            {/* <View style={[styles.notifListMain]}> */}
            {/* {this.renderNotifIndividualConfirmed()}
            {this.renderNotifIndividual()} */}
            {notificationType === "Booking" ? (
              <FlatList
                //ListHeaderComponent={this.renderSearch()}
                showsVerticalScrollIndicator={false}
                data={this.state.list_booking}
                renderItem={({ item, index }) => {
                  return this.renderNotifIndividual(item, index);
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "Booking" + index.toString();
                }}
                onRefresh={this._onRefresh}
                //onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={0.5}
                //refreshing={refreshing}
              />
            ) : (
              <FlatList
                //ListHeaderComponent={this.renderSearch()}
                showsVerticalScrollIndicator={false}
                data={this.state.list_notification}
                renderItem={({ item, index }) => {
                  return this.renderNotificationData(item, index);
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "Notif" + index.toString();
                }}
                onRefresh={this._onRefresh}
                //onEndReached={this.handleLoadMore}
                //onEndReachedThreshold={0.5}
                //refreshing={refreshing}
              />
            )}
            {/* </View> */}
          </ScrollView>
        </View>
      </View>
    );
  }

  renderModalReject() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modal_reject}
        onRequestClose={() => {
          this.setState({ modal_reject: false });
        }}
      >
        <View style={[ss.modalCover]}>
          <View style={[ss.modalBox]}>
            <View style={{ position: "absolute", right: 10, top: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modal_reject: false });
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
                      fontSize: 20,
                      //alignSelf : "center"
                      textAlign: "center"
                    }
                  ]}
                >
                  Masukan Alasan Reject
                </Text>
              </View>
            </View>
            <View style={[ss.modalContent]}>
              {/* <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 20
                    //alignSelf : "center"
                  }
                ]}
              >
                Alasan
              </Text> */}
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
                    borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
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
                    onChangeText={v => this.setState({ reason_reject: v })}
                    value={this.state.reason_reject}
                    placeholder={"Alasan"}
                  />
                </ScrollView>
              </View>
              <View
                style={[
                  ss.modalContent,
                  {
                    marginBottom: 25,
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }
                ]}
              >
                <Button
                  onPress={() => {
                    this.setState({ modal_reject: false });
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
                    Back
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    //this.closeModal(actions);
                    //this.confirmBooking(data);
                    this.cancelReservation();
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
                    Reject
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderModalSelectTable() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modal_table}
        onRequestClose={() => {
          this.setState({ modal_table: false });
        }}
      >
        <View style={[ss.modalCover]}>
          <View style={[ss.modalBox]}>
            <View style={{ position: "absolute", right: 10, top: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modal_table: false });
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
                      fontSize: 20,
                      //alignSelf : "center"
                      textAlign: "center"
                    }
                  ]}
                >
                  Pilih Meja
                </Text>
              </View>
            </View>
            <View style={[ss.modalContent]}>
              {/* <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 20
                    //alignSelf : "center"
                  }
                ]}
              >
                Alasan
              </Text> */}
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
                {/* {this.state.list_table.map((items, itemIndex) => {
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
                        //console.log("selected TAble ==> ", items);
                        this.setState({
                          selected_table: items
                          //showAdditionalTable: false
                        });
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.dmSans,
                          { fontSize: 20, color: BLACK }
                        ]}
                      >
                        {items.name}
                      </Text>
                    </Button>
                  );
                })} */}
                {this.state.list_table.length > 0 ? (
                  <Dropdown
                    style={{
                      marginLeft: 0
                      // paddingRight:100
                    }}
                    color={BLACK}
                    // selectWidth = {'80%'}
                    selectedValue={String(this.state.selected_table)}
                    optionLists={this.state.list_table.map((v, k) => {
                      //console.log('v ==> ', v);
                      return {
                        label: v.name,
                        value: String(v.id)
                      };
                    })}
                    onValueChange={(itemValue, itemIndex) => {
                      //console.log("SELECTED Value ==> ", itemValue);
                      this.setState({ selected_table: itemValue });
                    }}
                  />
                ) : (
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 20
                        //alignSelf : "center"
                      }
                    ]}
                  >
                    Tidak ada meja yang tersedia
                  </Text>
                )}
              </View>
              <View
                style={[
                  ss.modalContent,
                  {
                    marginBottom: 25,
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }
                ]}
              >
                <Button
                  onPress={() => {
                    this.setState({ modal_table: false });
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
                    Back
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    //this.closeModal(actions);
                    //this.confirmBooking(data);
                    this.confirmReservation();
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
                    Reserve
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    let {
      title,
      back,
      menu,
      backAction,
      notif,
      logoutAction,
      hideLogin,
      filter,
      filterAction,
      cart,
      cartAction,
      cartNumber,
      print,
      printAction,
      printText,
      harga,
      bgColor,
      add,
      addAction,
      salesType,
      salesTypeAction,
      salesTypeList,
      table,
      tableAction,
      tableList,
      expand,
      clearCart,
      clearCartAction,
      clearCartText,
      action,
      rekap,
      rekapAction,
      dineInID,
      salesTypeFirst,
      deleteView,
      deleteText,
      deleteAction,
      hideOnline,
      printLabel,
      printLabelAction,
      printLabelText,
      textColor,
      border
    } = this.props;

    let { userInfo, showNotification } = this.state;

    let { notifNumber } = this.state;

    let id_dine_in = 0;

    if (dineInID) {
      id_dine_in = dineInID;
    }

    let notifNumberNew = `${notifNumber}`;
    if (notifNumber > 99) {
      notifNumberNew = "99+";
    }

    // if (table) {
    //   console.log("header table ==> ", table.name);
    // }

    //console.log("dineInID ==> ", dineInID);


    let colorIndex = this.state.colorIndex;
    let bgColorTemp = bgColor ? bgColor : MAIN_THEME_COLOR_SELECT(colorIndex);
    let tempTextColor = textColor ? textColor : MAIN_TEXT_COLOR_SELECT(colorIndex);

    //colorIndex = 7;
    return (
      <View>
        {/* Notification Popup */}
        {/* {showNotification ? this.renderNotification() : <View />} */}
        {/* Notification End  */}

        {this.renderModalReject()}
        {this.renderModalSelectTable()}
        {this.renderLogoutMessage()}
        <View style={[styles.headerMain, { backgroundColor: bgColorTemp }]}>
          {back ? (
            <Button
              onPress={() => {
                if (typeof backAction === "function") {
                  backAction();
                } else {
                  Actions.pop();
                }
              }}
            >
              <View style={styles.headerBtnView}>
                <Ionicons
                  name="md-arrow-back"
                  style={[styles.headerIcon, { color: tempTextColor }]}
                />
              </View>
            </Button>
          ) : (
            <View />
          )}
          {menu ? (
            <Button
              onPress={() => {
                //this.toogleMenuModal(true);
                //Actions.drawerOpen();
                //console.log("Menu Click");
                // this.forceUpdate();
                // Actions.refresh({ testing: "TESTING" });
                ColorFunctions.GetColor(val => {
                  if (val !== 0 && this.state.colorIndex === 0) {
                    this.setState({ colorIndex: val });
                  }
                });

                Actions.drawerOpen({});
              }}
            >
              <View style={styles.headerBtnView}>
                <Ionicons
                  name="md-menu"
                  style={[styles.headerIcon, { color: tempTextColor }]}
                />
              </View>
            </Button>
          ) : (
            // <View style={styles.headerBtnView}>
            //   <Ionicons name="md-menu" style={styles.headerIcon} />
            // </View>
            <View />
          )}

          {!menu && !back ? <View style={{ marginLeft: 15 }} /> : <View />}
          {/* is_online */}
          {!hideOnline ? (
            <Entypo
              name="dot-single"
              style={[
                styles.headerIcon,
                { color: this.state.is_online ? GREEN_500 : RED_500 }
              ]}
            />
          ) : (
            <View />
          )}
          {title ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                height: 50
                //backgroundColor: "#BCA"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "95%",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    //color: "#333",
                    //color: WHITE,
                    color: tempTextColor,
                    fontWeight: "400",
                    // fontFamily: 'PatuaOne-Regular',
                    fontFamily: "DMSans-Bold"
                  }}
                >
                  {title}
                  {/* {userInfo ? userInfo.phone : ''} */}
                </Text>
                {harga && this.state.tablet ? (
                  <Text
                    style={{
                      fontSize: 16,
                      //color: "#333",
                      //color: WHITE,
                      textAlign: "right",
                      color: tempTextColor,
                      fontWeight: "400",
                      // fontFamily: 'PatuaOne-Regular',
                      fontFamily: "DMSans-Bold"
                    }}
                  >
                    {harga}
                    {/* {userInfo ? userInfo.phone : ''} */}
                  </Text>
                ) : (
                  <View />
                )}
              </View>
            </View>
          ) : (
            <View />
          )}

          {harga && !this.state.tablet ? (
            <View
              style={{
                //flex: 1,
                //justifyContent: "center",
                width: 100
                //backgroundColor: "#BCA"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  //color: "#333",
                  //color: WHITE,
                  color: tempTextColor,
                  fontWeight: "400",
                  // fontFamily: 'PatuaOne-Regular',
                  fontFamily: "DMSans-Bold"
                }}
              >
                {harga}
                {/* {userInfo ? userInfo.phone : ''} */}
              </Text>
            </View>
          ) : (
            <View />
          )}

          {/* {salesType ? (

            <Button
              onPress={() => {
                salesTypeAction();
              }}
            >
              <View style={[styles.headerBtnView, { width: 100 }]}>
                <Text
                  style={{
                    fontSize: 12,
                    //color: "#333",
                    //color: WHITE,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    fontWeight: "400",
                    // fontFamily: 'PatuaOne-Regular',
                    fontFamily: "DMSans-Bold"
                  }}
                >
                  {salesType}
                </Text>
              </View>
            </Button>
          ) : (
            <View />
          )} */}

          {printLabel ? (
            <View
              style={{
                //flex: 1,
                justifyContent: "center",
                height: 50
                //backgroundColor: "#BCA"
              }}
            >
              <Button
                onPress={() => {
                  printLabelAction();
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    padding: 15,
                    //color: "#333",
                    //color: WHITE,
                    color: MAIN_THEME_COLOR_SELECT(this.props.colorIndex),
                    // fontFamily: 'PatuaOne-Regular',
                    fontFamily: "DMSans-Bold"
                  }}
                >
                  {printLabelText}
                  {/* {userInfo ? userInfo.phone : ''} */}
                </Text>
              </Button>
            </View>
          ) : (
            <View />
          )}

          {print ? (
            <View
              style={{
                //flex: 1,
                justifyContent: "center",
                height: 50
                //backgroundColor: "#BCA"
              }}
            >
              <Button
                onPress={() => {
                  printAction();
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    padding: 15,
                    //color: "#333",
                    //color: WHITE,
                    color: MAIN_THEME_COLOR_SELECT(this.props.colorIndex),
                    // fontFamily: 'PatuaOne-Regular',
                    fontFamily: "DMSans-Bold"
                  }}
                >
                  {printText}
                  {/* {userInfo ? userInfo.phone : ''} */}
                </Text>
              </Button>
            </View>
          ) : (
            <View />
          )}

          {clearCart ? (
            <View
              style={{
                //flex: 1,
                justifyContent: "center",
                height: 50
                //backgroundColor: "#BCA"
              }}
            >
              <Button
                onPress={() => {
                  clearCartAction();
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    padding: 15,
                    //color: "#333",
                    //color: WHITE,
                    color: MAIN_THEME_COLOR_SELECT(this.props.colorIndex),
                    // fontFamily: 'PatuaOne-Regular',
                    fontFamily: "DMSans-Bold"
                  }}
                >
                  {clearCartText}
                  {/* {userInfo ? userInfo.phone : ''} */}
                </Text>
              </Button>
            </View>
          ) : (
            <View />
          )}

          {salesType ? (
            <View
              style={[
                styles.headerBtnView,
                {
                  flex: 0.66,
                  marginRight: 15,
                  display:
                    salesType.toString() === id_dine_in.toString()
                      ? "none"
                      : "flex"
                }
              ]}
            >
              <Dropdown_V2
                action={action}
                style={
                  {
                    // borderRadius: 15,
                    // padding: 5,
                    // marginLeft: 0,
                    // backgroundColor: MAIN_THEME_COLOR_SELECT(
                    //   this.props.colorIndex
                    // )
                    //padding: 10
                    // paddingRight:100
                  }
                }
                languageIndex={this.state.languageIndex}
                colorindex={this.props.colorIndex}
                hideArrow={true}
                size={12}
                color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                // selectWidth = {'80%'}
                text={_choose_type[this.state.languageIndex]}
                selectedValue={String(salesType)}
                optionLists={salesTypeList.map((v, k) => {
                  //console.log('v ==> ', v);
                  return {
                    label: v.name,
                    value: String(v.id)
                  };
                })}
                onValueChange={(itemValue, itemIndex) => {
                  //console.log("SELECTED Value ==> ", itemValue);
                  //this.setState({ selectedUser: itemValue });
                  salesTypeAction(itemValue);
                }}
              />
            </View>
          ) : (
            <View />
          )}
          {/* {salesType ? (<Text>{salesType}</Text>) : (<View />)}
          {id_dine_in ? (<Text>{id_dine_in}</Text>) : (<View />)} */}

          {salesType &&
          salesType.toString() === id_dine_in.toString() &&
          id_dine_in !== 0 ? (
            <View
              style={[
                styles.headerBtnView,
                {
                  flex: 0.66,
                  marginRight: 15,
                  display:
                    salesType.toString() === id_dine_in.toString()
                      ? "flex"
                      : "none"
                }
              ]}
            >
              {/* <Text>Table</Text> */}
              <Dropdown_V2
                action={action}
                style={
                  {
                    // borderRadius: 15,
                    // padding: 5,
                    // marginLeft: 0,
                    // backgroundColor: MAIN_THEME_COLOR_SELECT(
                    //   this.props.colorIndex
                    // )
                    //padding: 10
                    // paddingRight:100
                  }
                }
                colorindex={this.state.colorIndex}
                languageIndex={this.state.languageIndex}
                cancelText={_batal[this.state.languageIndex]}
                showButton={true}
                expand={expand}
                hideArrow={true}
                size={12}
                color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                textColor={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                // selectWidth = {'80%'}
                text={_pilih_meja[this.state.languageIndex]}
                selectedValue={table}
                optionLists={tableList.map((v, k) => {
                  //console.log('v ==> ', v);
                  return {
                    label: v.name,
                    capacity: v.capacity,
                    value: v
                  };
                })}
                onValueChange={(itemValue, itemIndex) => {
                  console.log("SELECTED Table Value ==> ", itemValue);
                  //this.setState({ selectedUser: itemValue });

                  tableAction(itemValue);
                }}
                cancelAction={() => {
                  table = "";
                  salesType = salesTypeFirst;
                  salesTypeAction(salesTypeFirst);
                  tableAction([]);
                }}
              />
            </View>
          ) : (
            <View />
          )}

          {cart ? (
            <Button
              onPress={() => {
                //this.toogleMenuModal(true);
                //Actions.drawerOpen();
                //console.log("Menu Click");
                // this.forceUpdate();
                // Actions.refresh({ testing: "TESTING" });
                cartAction();
              }}
            >
              <View style={styles.headerBtnView}>
                <Ionicons
                  name="md-cart"
                  style={[styles.headerIcon, { color: tempTextColor }]}
                />
                {cartNumber > 0 ? (
                  <View
                    style={[
                      styles.notifView,
                      {
                        borderWidth: 0.5,
                        borderColor: RED_500,
                        backgroundColor: RED_500
                      }
                    ]}
                  >
                    <Text small bold style={{ fontSize: 12, color: tempTextColor }}>
                      {cartNumber > 9 ? "9+" : cartNumber}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </Button>
          ) : (
            // <View style={styles.headerBtnView}>
            //   <Ionicons name="md-menu" style={styles.headerIcon} />
            // </View>
            <View />
          )}

          {notif ? (
            <Button
              onPress={() => {
                //loginAction();
                //console.log("notif pressed");
                this.getBookingList();
                this.setState({
                  showNotification: !this.state.showNotification
                });
                //Actions.Notification({userInfo: userInfo});
              }}
            >
              <View
                style={styles.headerBtnView}
                ref={view => {
                  this._notification = view;
                }}
              >
                <MaterialIcons
                  name="notifications-none"
                  style={[
                    styles.headerIcon,
                    {
                      fontSize: 28,
                      color: tempTextColor
                    }
                  ]}
                />
                {notifNumber > 0 ? (
                  <View
                    style={[
                      styles.notifView,
                      {
                        borderWidth: 0.5,
                        borderColor: tempTextColor
                      }
                    ]}
                  >
                    <Text small bold style={{ fontSize: 7, color: tempTextColor }}>
                      {notifNumberNew}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </Button>
          ) : (
            <View />
          )}

          {!userInfo && !hideLogin ? (
            <Button
              onPress={() => {
                if (typeof logoutAction === "function") {
                  //loginAction();
                  //Actions.Login();
                  //console.log('login pressed');
                }
                console.log("!userinfo");
                //Actions.Login();
                //Actions.reset('Login');

                //Actions.Login2Stack();
              }}
            >
              <View style={styles.headerBtnView}>
                <Entypo
                  name="login"
                  style={[
                    styles.headerIcon,
                    { color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex) }
                  ]}
                />
              </View>
            </Button>
          ) : (
            <View />
          )}

          {userInfo && !hideLogin ? (
            <Button
              onPress={() => {
                if (typeof logoutAction === "function") {
                  // logoutAction();
                  this.setState({ modal_logout: true });
                }
                // LoginFunctions.Logout(val => {

                // });
                // Actions.pop();
                // Actions.pop();
                // Actions.pop();

                // userInfo = null;

                // Actions.MobileLogin({
                //   userInfo: null,
                //   colorIndex: this.state.colorIndex,
                //   languageIndex: this.state.languageIndex
                // });
                //Actions.Login2Stack();
              }}
            >
              <View style={styles.headerBtnView}>
                <Entypo
                  name="log-out"
                  style={[styles.headerIcon, { color: tempTextColor }]}
                />
              </View>
            </Button>
          ) : (
            <View />
          )}

          {filter ? (
            <Button
              onPress={() => {
                if (typeof filterAction === "function") {
                  filterAction();
                } else {
                }
              }}
            >
              <View style={styles.headerBtnView}>
                <MaterialIcons
                  name="sort"
                  style={[styles.headerIcon, { color: tempTextColor }]}
                />
              </View>
            </Button>
          ) : (
            <View />
          )}

          {rekap ? (
            <Button
              style={{ width: "25%" }}
              onPress={() => {
                if (typeof rekapAction === "function") {
                  rekapAction();
                } else {
                }
              }}
            >
              <View style={[styles.headerBtnView, { width: "100%" }]}>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      fontSize: 12,
                      color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    }
                  ]}
                >
                  {_add_header[this.state.languageIndex]}
                </Text>
              </View>
            </Button>
          ) : (
            <View />
          )}

          {add ? (
            <Button
              onPress={() => {
                if (typeof addAction === "function") {
                  addAction();
                } else {
                }
              }}
            >
              <View style={styles.headerBtnView}>
                <Entypo
                  name="plus"
                  style={[styles.headerIcon, { color: tempTextColor }]}
                />
              </View>
            </Button>
          ) : (
            <View />
          )}

          {deleteView ? (
            <Button
              style={{ marginRight: 15 }}
              onPress={() => {
                if (typeof deleteAction === "function") {
                  deleteAction();
                } else {
                }
              }}
            >
              <View style={styles.headerBtnView}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 12,
                      color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                    }
                  ]}
                >
                  {deleteText}
                </Text>
              </View>
            </Button>
          ) : (
            <View />
          )}
        </View>
        <View
          style={{
            display: border ? "flex" : "none",
            //backgroundColor: "#BCA",
            height: 1,
            borderBottomWidth: 2,
            borderColor: "#DADADA",
            marginLeft: 15,
            marginRight: 15
          }}
        />
      </View>
    );
  }
}

const ss = StyleSheet.create({
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
    //flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});
