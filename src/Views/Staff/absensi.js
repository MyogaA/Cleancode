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
  Modal
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

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Geolocation from "@react-native-community/geolocation";
// import Orientation from "react-native-orientation-locker";
import Loading from "../../Components/Loading";
import CustomAlert from "../../Components/CustomAlert";
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
  _absensi,
  _pilih_user,
  _masuk,
  _pulang,
  _salah_pin,
  _berhasil
} from "../../Libraries/DictionaryAbsen";
import PrinterFunctions from "../../Libraries/PrinterFunctions";

import {
  UserByGeraiAPI,
  CheckPinAPI,
  GetAttendanceAPI,
  UpdateAttendance
} from "../../Constants";
import { _ok_alert } from "../../Libraries/DictionarySetting";

export default class Absensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,

      userInfo: this.props.userInfo ? this.props.userInfo : null,
      retail_id: this.props.userInfo.retail_id
        ? this.props.userInfo.retail_id
        : null,
      gerai_id: this.props.userInfo.gerai_id
        ? this.props.userInfo.retail_id
        : null,
      clockIn: "00:00",
      clockOut: "00:00",
      //clockOut: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      attendanceId: null,
      selectedUser: this.props.userInfo ? this.props.userInfo.id : 0,
      //selectedUserData: null,
      listUserOld: [
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
      listUser: [],
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
      ready: "",
      alertMessage: [],
      showAlert: false
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

    this.getUserList();
    this.getAttendanceInformation();
  }

  getUserList() {
    this.setState({ loading: true });

    const uri = `${UserByGeraiAPI}?gerai_id=${this.state.gerai_id}`;
    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson.result;
        let resultData = result.data;

        this.setState({ listUser: resultData, loading: false });
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getAttendanceInformation(selectedUser = this.state.selectedUser) {
    const uri = GetAttendanceAPI;
    this.setState({ loading: true });
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        id: selectedUser
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        console.log("getAttendanceInformation ==>", resultData);

        let clockIn = resultData.clock_in
          ? moment(resultData.clock_in).format("HH:mm")
          : "00:00";
        let clockOut = resultData.clock_out
          ? moment(resultData.clock_out).format("HH:mm")
          : "00:00";

        //console.log("clock OUT ==>", clockOut);

        this.setState({
          clockOut: clockOut,
          clockIn: clockIn,
          attendanceId: resultData.id,
          loading: false
        });
        //console.log("clockInFormat ==> ", clockIn);
        //this.setState({ listUser: resultData });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
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
    }
  }

  changePin(value, command) {
    //input, clear, delete
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
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
        pin6 = value;
      } else {
        fullPin = true;
      }

      if (fullPin === false) {
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

  checkPin(cb) {
    const uri = CheckPinAPI;
    this.setState({ loading: true });
    const { selectedUser, pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        id: selectedUser,
        token: `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        cb(result);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        cb(null);
      });
  }

  absensiClockInOut(type = "in") {
    this.setState({ loading: true });
    this.checkPin(val => {
      console.log("val", val);
      if (val.status) {
        //alert(val.message);
        console.log("this.state.attendanceId ==> ", this.state.attendanceId);

        const uri = UpdateAttendance;

        fetch(uri, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            //"Content-Type": "application/x-www-form-urlencoded"
          },
          body: JSON.stringify({
            id: this.state.attendanceId,
            image: "",
            type: type,
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            console.log("Absen Result ==> ", result);
            let message = [];
            // message.push(result.message);
            message.push(_berhasil[this.state.languageIndex]);

            this.setState({
              loading: false,
              showAlert: true,
              alertMessage: message
            });
            //alert(result.message);
          })
          .catch(_err => {
            console.log("ERR ==> ", _err);
          });

        if (type === "in") {
          this.setState({ clockIn: moment(new Date()).format("HH:mm") });
        }

        if (type === "out") {
          this.setState({ clockOut: moment(new Date()).format("HH:mm") });
        }
      } else {
        // alert(val.message);

        let message = [];
        // message.push(val.message);
        message.push(_salah_pin[this.state.languageIndex]);

        this.setState({
          loading: false,
          showAlert: true,
          alertMessage: message
        });
      }
    });
  }

  renderPinButton() {
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            flex: 1,
            backgroundColor: "#EEEEEE",
            padding: 25,
            paddingBottom: 0,
            paddingTop: 35,
            margin: 15,
            elevation: 1
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
            justifyContent: "space-between",
            alignItems: "center"
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
                ss.pinButton,
                {
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(1, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(2, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(3, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
            justifyContent: "space-between",
            alignItems: "center"
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
                ss.pinButton,
                {
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(4, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(5, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(6, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
            justifyContent: "space-between",
            alignItems: "center"
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
                ss.pinButton,
                {
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(7, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(8, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(9, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
            justifyContent: "space-between",
            alignItems: "center"
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
                ss.pinButton,
                {
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(-1, "clear");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(0, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 48,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
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
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }
              ]}
              onPress={() => {
                this.changePin(-1, "delete");
              }}
            >
              <MaterialCommunityIcons
                name={"backspace"}
                style={{
                  fontSize: 40,
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }}
              />
            </Button>
          </View>
        </View>
        {/* ROW 4 END */}
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center"
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
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: WHITE }
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
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: WHITE }
                ]}
              >
                {_pulang[this.state.languageIndex]}
              </Text>
            </Button>
          </View>
        </View>
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
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
            borderWidth: 1,
            padding: 20,
            margin: 25
          }
        ]}
      >
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
          {pin1 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin2 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin3 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin4 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin5 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}

          {pin6 !== "" ? (
            <Fontisto
              name={"asterisk"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          ) : (
            <Fontisto
              name={"ellipse"}
              style={{
                fontSize: 20,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          )}
        </View>
      </View>
    );
  }

  renderSelectUser() {
    return (
      <View
        style={[
          ss.box,
          {
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            padding: 20,
            margin: 25,
            marginBottom: 15,
            marginTop: 0
          }
        ]}
      >
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
          <Text
            style={[
              MainStyle.dmSansBold,
              {
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                fontSize: 16
              }
            ]}
          >
            {_pilih_user[this.state.languageIndex]}
          </Text>
          <View
            style={[
              ss.box,
              {
                width: "70%",
                backgroundColor: WHITE,
                borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                borderWidth: 1
              }
            ]}
          >
            <Dropdown
              style={{
                marginLeft: 0,
                padding: 10
                // paddingRight:100
              }}
              size={16}
              color={BLACK}
              languageIndex={this.state.languageIndex}
              // selectWidth = {'80%'}
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
                  selectedUser: itemValue
                  // selectedUserData: this.state.listUser[itemIndex]
                });

                this.getAttendanceInformation(itemValue);
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  renderTime() {
    return (
      <View
        style={[
          ss.box,
          {
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            padding: 10,
            margin: 25,
            marginTop: 0,
            marginBottom: 15
          }
        ]}
      >
        <View
          style={{
            width: "100%",
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <View
            style={{
              width: "50%",

              //backgroundColor: "#BCA",
              alignContent: "center",
              alignItems: "center",
              ///padding: 10,
              borderColor: "rgba(125, 125, 125, 0.8)",
              //borderColor: WHITE,
              borderRightWidth: 1
            }}
          >
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  fontSize: 16
                }
              ]}
            >
              {_masuk[this.state.languageIndex]}
            </Text>
            <View
              style={
                ([ss.box],
                {
                  marginTop: 10,
                  backgroundColor: WHITE,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  width: "70%",
                  padding: 5,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  elevation: 1
                })
              }
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { color: BLACK, fontSize: 28 }
                ]}
              >
                {this.state.clockIn}
              </Text>
            </View>
          </View>
          {/* Box MAsuk */}
          <View
            style={{
              width: "50%",
              //backgroundColor: "#BCA",
              alignContent: "center",
              alignItems: "center",
              ///padding: 10,
              borderColor: "rgba(125, 125, 125, 0.8)"
              //borderColor: WHITE,
              //borderRightWidth: 1
            }}
          >
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  fontSize: 16
                }
              ]}
            >
              {_pulang[this.state.languageIndex]}
            </Text>
            <View
              style={
                ([ss.box],
                {
                  marginTop: 10,
                  backgroundColor: WHITE,
                  borderWidth: 1,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  width: "70%",
                  padding: 5,
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  elevation: 1
                })
              }
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { color: BLACK, fontSize: 28 }
                ]}
              >
                {this.state.clockOut}
              </Text>
            </View>
          </View>
          {/* Box KEluar */}
        </View>
      </View>
    );
  }

  renderPhoto() {
    return (
      <View
        style={[
          ss.box,
          {
            backgroundColor: WHITE,
            padding: 10,
            margin: 25,
            marginTop: 0,
            marginBottom: 0,
            flex: 1
          }
        ]}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <View
            style={{
              width: "100%",
              alignContent: "center",
              alignItems: "center"
              ///padding: 10,
              //borderColor: 'rgba(125, 125, 125, 0.8)',
              //borderColor: WHITE,
              //borderRightWidth: 1
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                //backgroundColor: "#BCA",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                //resizeMode={'stretch'}
                resizeMode={"contain"}
                style={{
                  width: "100%",
                  height: "100%"
                  //overflow: "hidden",
                  //borderRadius: 100
                }}
                source={{
                  uri:
                    "https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png"
                }}
                //source={{uri: 'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg'}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        <Header
          colorIndex={this.state.colorIndex}
          title={_absensi[this.state.languageIndex]}
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
        {this.state.showAlert ? (
          <CustomAlert
          colorIndex={this.state.colorIndex}
          languageIndex={this.state.languageIndex}
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
        <View style={[ss.mainContent]}>
          <View style={[ss.leftSide]}>
            {this.renderSelectUser()}
            {this.renderTime()}
            {this.renderPhoto()}
          </View>
          <View style={[ss.rightSide]}>
            {this.renderPinNumber()}
            {this.renderPinButton()}
          </View>
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
    //padding: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    flex: 1,
    justifyContent: "space-between"
  },
  leftSide: {
    width: "55%",
    marginTop: 0
  },
  rightSide: {
    width: "45%",
    marginTop: 0,
    backgroundColor: "#FFF",
    elevation: 3,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1
  },
  box: {
    elevation: 1,
    borderRadius: 5
  },
  pinButton: {
    //backgroundColor: MAIN_THEME_COLOR,
    borderWidth: 1,
    elevation: 1,
    borderRadius: 10,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  button: {
    elevation: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  }
});
