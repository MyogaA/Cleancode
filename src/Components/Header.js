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
  LayoutAnimation
} from "react-native";
import {
  WHITE,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SUB,
  RED_400,
  BLACK
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
import PrinterFunctions from "../Libraries/PrinterFunctions";

import Dropdown from "./Dropdown";
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

const styles = StyleSheet.create({
  headerMain: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
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
    width: "35%",
    paddingTop: 15,
    paddingBottom: 15,
    minHeight: 200,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute",
    right: "5%",
    top: 25,
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
    paddingRight: 15,
    flex: 1
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

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_table: false,
      modal_reject: false,
      ready: true,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      notification: true,
      notifNumber: 0,
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
      list_notification: []
    };
  }

  componentDidMount() {
    this.getNotif();
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
      this.getBookingList();
      this.getNotification();
    } else {
      setTimeout(() => {
        this.getBookingList();
        this.getNotification();
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

      this.getNotification();
      this.getBookingList();
    }
  }

  getNotification(page = 1) {
    const gerai_id = this.state.userInfo.gerai_id;
    const uri = `${GetNotificationAPI}?gerai_id=${gerai_id}&page=${page}`;

    console.log("GET NOTIF URI ==>", uri);

    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("GET DATA responseJson ==>", responseJson);
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
          this.setState({
            list_booking: resultData.data,
            notifNumber: resultData.data.length
          });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
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
          console.log("ERR ==> ", _err);
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
          console.log("ERR ==> ", _err);
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
            { borderColor: "#C4C4C", borderBottomWidth: 1.25 }
          ]}
        >
          <Text style={[MainStyle.dmSans, { fontSize: 16, color: BLACK }]}>
            {_permintaan_reservasi[this.state.languageIndex]}
          </Text>
        </View>
        <View style={{ padding: 15 }}>
          <View>
            <Text
              style={[MainStyle.dmSans, { fontSize: 12, color: BLACK }]}
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
                  {_nama[this.state.languageIndex]}
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
                  {data.customer_name}
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
                  {_jumlah[this.state.languageIndex]}
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
                  {_waktu[this.state.languageIndex]}
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
                  {moment(data.booking_time).format("HH:mm")}
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
                  {_date[this.state.languageIndex]}
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
                  {moment(data.booking_time).format("DD/MM/YYYY")}
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
                  {_notes[this.state.languageIndex]}
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
                  fontSize: 12,
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
                    fontSize: 12,
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
                    fontSize: 12,
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
                    fontSize: 14,
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
                    fontSize: 14
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
                    fontSize: 12
                  }
                ]}
              >
                {data.message}
              </Text>
              <Text
                style={[
                  MainStyle.dmSans,
                  {
                    fontSize: 12
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
                    fontSize: 12
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
    const { notificationType } = this.state;
    return (
      <View style={[styles.notifMain, {}]}>
        <View style={[styles.notifHeader, { flexDirection: "row" }]}>
          <Button
            style={{
              margin: 5,
              borderColor:
                notificationType === "Notifikasi" ? "#777" : "#C4C4C4",
              borderRadius: 10,
              borderBottomWidth: notificationType === "Notifikasi" ? 5 : 2,
              padding: 3,
              paddingBottom: notificationType === "Notifikasi" ? 3 : 6,
              width: 150,
              alignItems: "center"
            }}
            onPress={() => {
              this.changeType("Notifikasi");
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {_notifikasi[this.state.languageIndex]}
            </Text>
          </Button>
          <Button
            style={{
              margin: 5,
              borderColor: notificationType === "Booking" ? "#777" : "#C4C4C4",

              borderRadius: 10,
              borderBottomWidth: notificationType === "Booking" ? 5 : 2,
              padding: 3,
              paddingBottom: notificationType === "Booking" ? 3 : 6,
              width: 150,
              alignItems: "center"
            }}
            onPress={() => {
              this.changeType("Booking");
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {_booking[this.state.languageIndex]}
            </Text>
          </Button>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ height: 450 }}
        >
          <View style={[styles.notifListMain]}>
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
          </View>
        </ScrollView>
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
                <Ionicons
                  name={"md-close"}
                  size={30}
                  color={BLACK}
                />
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
                <Ionicons
                  name={"md-close"}
                  size={30}
                  color={BLACK}
                />
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
    let { title, back, menu, backAction, notif, logoutAction } = this.props;

    let { userInfo, showNotification } = this.state;

    let { notifNumber } = this.state;

    let notifNumberNew = `${notifNumber}`;
    if (notifNumber > 99) {
      notifNumberNew = "99+";
    }

    let colorIndex = this.state.colorIndex;
    //colorIndex = 7;
    return (
      <View>
        {/* Notification Popup */}
        {showNotification ? this.renderNotification() : <View />}
        {/* Notification End  */}

        {this.renderModalReject()}
        {this.renderModalSelectTable()}
        <View
          style={[
            styles.headerMain,
            { backgroundColor: MAIN_THEME_COLOR_SELECT(colorIndex) }
          ]}
        >
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
          {menu ? (
            <Button
              onPress={() => {
                //this.toogleMenuModal(true);
                //Actions.drawerOpen();
                //console.log("Menu Click");
                // this.forceUpdate();
                // Actions.refresh({ testing: "TESTING" });
                Actions.drawerOpen({ testing: "TESUNG" });
              }}
            >
              <View style={styles.headerBtnView}>
                <Ionicons
                  name="md-menu"
                  style={[
                    styles.headerIcon,
                    { color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex) }
                  ]}
                />
              </View>
            </Button>
          ) : (
            // <View style={styles.headerBtnView}>
            //   <Ionicons name="md-menu" style={styles.headerIcon} />
            // </View>
            <View style={styles.headerBtnView} />
          )}
          {title ? (
            <View style={{ flex: 1, justifyContent: "center", height: 50 }}>
              <Text
                style={{
                  fontSize: 18,
                  //color: "#333",
                  //color: WHITE,
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  fontWeight: "400",
                  // fontFamily: 'PatuaOne-Regular',
                  fontFamily: "PatuaOne-Regular"
                }}
              >
                {title}
                {/* {userInfo ? userInfo.phone : ''} */}
              </Text>
            </View>
          ) : (
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
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    }
                  ]}
                />
                {notifNumber > 0 ? (
                  <View
                    style={[
                      styles.notifView,
                      {
                        borderWidth: 0.5,
                        borderColor: MAIN_TEXT_COLOR_SELECT(
                          this.props.colorIndex
                        )
                      }
                    ]}
                  >
                    <Text small bold style={{ fontSize: 7, color: BLACK }}>
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

          {!userInfo ? (
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

          {userInfo ? (
            <Button
              onPress={() => {
                //alert('Logout Clicked');
                //Actions.reset('Home');
                //Actions.Home();
                //Actions.reset('Home');
                LoginFunctions.Logout(val => {
                  //this.setState({userInfo: val});

                  // if (logoutAction) {
                  //   logoutAction();
                  // }
                  fetch(LogoutAPI, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                      //"Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: JSON.stringify({
                      staff_id: this.state.userInfo.id
                    })
                  })
                    .then(response => response.json())
                    .then(responseJson => {
                      Actions.Login({
                        userInfo: null,
                        colorIndex: this.state.colorIndex
                      });
                      this.setState({ userInfo: null });
                    })
                    .catch(_err => {});

                  //Actions.reset("Home");
                });
                //Actions.Login();
                //Actions.Login2Stack();
              }}
            >
              <View style={styles.headerBtnView}>
                <Entypo
                  name="log-out"
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
        </View>
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
