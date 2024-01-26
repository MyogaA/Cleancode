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

import MobileHeader from "../../Components/MobileHeader";

import Image from "../../Components/Image";
import Button from "../../Components/Button";
import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/MobileDropdown";

import RNFS from "react-native-fs";

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
import Loading from "../../Components/MobileLoading";
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
import {
  _absensi,
  _pilih_user,
  _masuk,
  _pulang,
  _salah_pin,
  _berhasil,
  _check_in,
  _check_out,
  _masukan_kode
} from "../../Libraries/DictionaryAbsen";

import moment from "moment";

// import id from "moment/locale";

import "moment/locale/id";

import "moment/locale/en-gb";

import ColorFunctions from "../../Libraries/ColorFunctions";
import {
  UserByGeraiAPI,
  CheckPinAPI,
  GetAttendanceAPI,
  UpdateAttendance,
  BE_Staff
} from "../../Constants";

import PrinterFunctions from "../../Libraries/PrinterFunctions";
import { RNCamera } from "react-native-camera";
import { Dimensions } from "react-native";
import { _ok_alert } from "../../Libraries/DictionarySetting";

const flashModeOrder = {
  off: "torch",
  torch: "off"
};

const wbOrder = {
  auto: "sunny",
  sunny: "cloudy",
  cloudy: "shadow",
  shadow: "fluorescent",
  fluorescent: "incandescent",
  incandescent: "auto"
};

const landmarkSize = 2;

export default class MobileAbsensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "in",
      action_text: "Check In",
      showModalPin: false,
      loading: true,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      date_now: moment(new Date()).format("dddd, DD MMM YYYY"),
      time_now: moment(new Date()).format("HH:mm:ss"),
      cameraPicture: "",
      retail_id: this.props.userInfo.retail_id
        ? this.props.userInfo.retail_id
        : null,
      gerai_id: this.props.userInfo.gerai_id
        ? this.props.userInfo.retail_id
        : null,
      imageIn: null,
      imageOut: null,
      clockIn: "00:00",
      clockOut: "00:00",
      testDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss MMM Do dddd"),
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
      showAlert: false,

      //camera
      flash: "off",
      showCamera: false,
      zoom: 0,
      autoFocus: "on",
      depth: 0,
      // type: "back",
      type: "front",

      whiteBalance: "auto",
      // ratio: "16:9",
      ratio: "4:3",
      recordOptions: {
        mute: false,
        maxDuration: 5,
        quality: RNCamera.Constants.VideoQuality["288p"]
      },
      modal: this.props.barcode ? this.props.barcode : true,
      help: false,
      isRecording: false,
      canDetectFaces: false,
      canDetectText: false,
      canDetectBarcode: false,
      faces: [],
      textBlocks: [],
      barcodes: []
    };
  }

  updateTimeNow() {
    let date_now = moment(new Date()).format("dddd, DD MMM YYYY");
    let time_now = moment(new Date()).format("HH:mm:ss");
    this.setState({
      date_now: date_now,
      time_now: time_now
    });
    //dddd
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

    if (this.state.languageIndex === 0) {
      moment.locale("id");
    } else {
      moment.locale("en");
    }

    this.interval = setInterval(() => {
      this.updateTimeNow();
    }, 1000);

    this.getUserList();
    this.getAttendanceInformation();
  }


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
        console.log("responseJson get user list ===> ", responseJson);

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

  
  // getUserList() {
  //   this.setState({ loading: true });

  //   const uri = `${UserByGeraiAPI}?gerai_id=${this.state.gerai_id}`;
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
  //       console.log("ERR ==> ", _err);
  //     });
  // }

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
          loading: false,
          imageIn: resultData.image_in,
          imageOut: resultData.image_out
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

  componentWillUnmount() {
    clearInterval(this.interval);
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
        fullPin = true;
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
      } else {
        //alert("full pin");
        this.setState({
          pin6: pin6
        });
        this.absensiClockInOut(this.state.action);
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
    //console.log("checkpin ==> ", `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`);
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
      //console.log("val", val);
      if (val.status) {
        //alert(val.message);
        //console.log("this.state.attendanceId ==> ", this.state.attendanceId);

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
            image: this.state.cameraPicture,
            type: type,
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            //console.log("Absen Result ==> ", result);
            let message = [];
            //message.push(result.message);
            message.push(_berhasil[this.state.languageIndex]);

            this.setState({
              loading: false,
              showAlert: true,
              alertMessage: message,
              showModalPin: false,
              pin1: "",
              pin2: "",
              pin3: "",
              pin4: "",
              pin5: "",
              pin6: ""
            });

            if (type === "in") {
              this.setState({
                imageIn: this.state.cameraPicture
              });
            } else {
              this.setState({
                imageOut: this.state.cameraPicture
              });
            }

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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                    fontSize: 16,
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
                  fontSize: 16,
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
                  MainStyle.robotoNormalBold,
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
            {this.state.action_text}
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

  renderSelectUser() {
    return (
      <View
        style={[
          ss.box,
          {
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
                marginLeft: 0,
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                borderRadius: 15,
                padding: 5
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
    const { time_now, date_now } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            //backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //padding: 10,
            margin: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingRight: 15,
            paddingLeft: 15
          }
        ]}
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

            borderBottomWidth: 1,

            borderColor: "#C8C7CC"
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 16, color: BLACK }]}
          >
            {date_now}
          </Text>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 24,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            {time_now}
          </Text>
          {/* Box KEluar */}
        </View>
        <View style={{}}>
          <Button
            onPress={() => {
              if (this.state.clockIn === "00:00") {
                this.setState({
                  action: "in",
                  action_text: _check_in[this.state.languageIndex],
                  //showModalPin: true,
                  showCamera: true,
                  cameraPicture: ""
                });
              }
            }}
            style={{
              padding: 10,
              alignItems: "center",
              // backgroundColor:
              //   this.state.clockIn === "00:00" ? "#83B235" : "#EEEEEE",
              marginTop: 20,
              borderRadius: 5,

              backgroundColor:
                this.state.clockIn === "00:00"
                  ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  : "#EEEEEE"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    this.state.clockIn === "00:00"
                      ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      : BLACK
                }
              ]}
            >
              {_check_in[this.state.languageIndex]}
            </Text>
          </Button>
          <Button
            onPress={() => {
              if (
                this.state.clockIn !== "00:00" &&
                this.state.clockOut === "00:00"
              ) {
                this.setState({
                  action: "out",
                  action_text: _check_out[this.state.languageIndex],
                  showCamera: true,
                  cameraPicture: ""
                  //showModalPin: true
                });
              }
            }}
            style={{
              padding: 10,
              alignItems: "center",
              // backgroundColor:
              //   this.state.clockIn !== "00:00" &&
              //   this.state.clockOut === "00:00"
              //     ? "#C84343"
              //     : "#EEEEEE",
              backgroundColor:
                this.state.clockIn !== "00:00" &&
                this.state.clockOut === "00:00"
                  ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  : "#EEEEEE",
              marginTop: 20,
              borderRadius: 5
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    this.state.clockIn !== "00:00" &&
                    this.state.clockOut === "00:00"
                      ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      : BLACK
                }
              ]}
            >
              {_check_out[this.state.languageIndex]}
            </Text>
          </Button>
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

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, width: 384, height: 512, base64: true };

      const data = await this.camera.takePictureAsync(options);
      console.log("takePicture ", data);

      // const base64image = await RNFS.readFile(data.uri, "base64");

      // console.log("base 64 ==> ", base64image);

      this.setState({
        showModalPin: true,
        cameraPicture: data.base64,
        showCamera: false
      });
    }
  };

  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    //console.log("canDetectBarcode", canDetectBarcode);
    let { width, height } = Dimensions.get("window");
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        trackingEnabled
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel"
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        //onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
        onGoogleVisionBarcodesDetected={
          canDetectBarcode ? this.barcodeRecognized : null
        }
        //this.barcodeRecognized
        googleVisionBarcodeType={
          RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL
        }
      >
        <View
          style={{
            flex: 0.5,
            display: "none"
          }}
        >
          {/* <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View
          style={{
            flex: 0.4,
            display: "none",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          {/* <Slider
            style={{width: 150, marginTop: 15, alignSelf: 'flex-end'}}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          /> */}
        </View>
        {/* <View
          style={{
            flex: 0.1,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        > */}
        {/* <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}
          >
            {this.state.isRecording ? (
              <Text style={styles.flipText}> ☕ </Text>
            ) : (
              <Text style={styles.flipText}> REC </Text>
            )}
          </TouchableOpacity> */}
        {/* </View> */}
        {this.state.zoom !== 0 && (
          <Text style={[ss.flipText, ss.zoomText]}>
            Zoom: {this.state.zoom}
          </Text>
        )}
        <View
          style={{
            flex: 0.1,
            display: "none",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          {/* <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity> */}
        </View>

        {/* <Modal
          transparent={true}
          visible={this.state.modal}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setState({ modal: false });
            Actions.pop();
          }}
        > */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            //borderLeftWidth: (width-300)/2,
            //borderRightWidth: (width-300)/2,
            //borderTopWidth: (height-50-300)/2,
            //borderBottomWidth: (height-50-300)/2,
            marginBottom: 0,
            //backgroundColor: "#BCA",
            borderColor: "#rgba(0,0,0,0.25)"
            //borderColor:'#rgba(255,255,255,0.25)',
          }}
        >
          <View style={{ marginTop: height * 0.009 }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showCamera: false });
                //Actions.pop();
              }}
            >
              <View style={{}}>
                <Ionicons
                  name={"md-close"}
                  //name={'flashlight-off'}
                  size={40}
                  color={WHITE}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              //backgroundColor: "#BCA",
              width: "100%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              // onPress={() => {
              //   //this.setState({ help: true });

              // }}
              style={{ marginBottom: 15 }}
              onPress={this.takePicture.bind(this)}
            >
              <Ionicons
                name={"md-camera"}
                //name={'flashlight-off'}
                size={50}
                color={WHITE}
              />
            </TouchableOpacity>
          </View>
          {/* <View
                style={{
                  width: "50%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // this.toggleFlash();
                    this.setState({
                      flash: flashModeOrder[this.state.flash]
                    });
                  }}
                >
                  <MaterialCommunityIcons
                    name={"flashlight"}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans-Regular",
                    color: WHITE
                  }}
                >
                  Flashlight
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ help: true });
                  }}
                >
                  <Ionicons
                    name={"md-help-circle-outline"}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />




                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans-Regular",
                    color: WHITE
                  }}
                >
                  Help
                </Text>
              </View> */}
        </View>
        {/* </Modal> */}
        {/* {!!canDetectBarcode && this.renderBarcodes()} */}
      </RNCamera>
    );
  }

  render() {
    let { pin1, pin2, pin3, pin4, pin5, pin6, time_now, date_now } = this.state;
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    //let mom = moment.locale("fr");
    //let date_indo = moment(1316116057189).fromNow();
    const date_indo = moment(new Date()).format("dddd, DD MMM YYYY");
    // moment(new date).format("YYYY-MM-DD HH:mm:ss MMMM Do dddd");

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_absensi[this.state.languageIndex]}
          notif={true}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          hideLogin={true}
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
            languageIndex={this.state.languageIndex}
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showCamera}
          onRequestClose={() => {
            this.setState({ showCamera: false });
          }}
        >
          {this.renderCamera()}
        </Modal>
        <View style={[ss.mainContent]}>
          <View style={[ss.leftSide]}>
            {/* <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            > */}
            {this.renderSelectUser()}
            {this.renderTime()}
            {/* <View
              style={{
                margin: 15,
                //borderTopWidth: 1,
                //borderColor: "#C4C4C4",
                paddingTop: 15,
                //backgroundColor: "#BCA"
                width: "50%",
                height: "50%",
                alignSelf: "center",
                borderColor: BLACK,
                borderWidth: 3,
                paddingBottom: 30
              }}
            >
              {this.renderCamera()}
            </View> */}
            <View
              style={{
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width: "49%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Roboto-Regular",
                    color: BLACK
                  }}
                >
                  {_check_in[this.state.languageIndex]}
                </Text>
              </View>
              <View
                style={{
                  //backgroundColor: "#BCA"
                  width: "49%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Roboto-Regular",
                    color: BLACK
                  }}
                >
                  {_check_out[this.state.languageIndex]}
                </Text>
              </View>
            </View>

            <View
              style={{
                margin: 15,
                marginTop: 0,
                flex: 1,
                //borderTopWidth: 1,
                //borderColor: "#C4C4C4",
                paddingTop: 15,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  //backgroundColor: "#BCA"
                  width: "49%",
                  height: "100%",
                  // alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: BLACK,
                  borderWidth: 1
                }}
              >
                {this.state.imageIn ? (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%"
                      //backgroundColor: "#ABC"
                    }}
                    resizeMode={"stretch"}
                    source={{
                      uri: `data:image/png;base64,${this.state.imageIn}`
                    }}
                  />
                ) : (
                  <MaterialIcons
                    name={"face"}
                    //name={'flashlight-off'}
                    size={150}
                    color={BLACK}
                  />
                )}
              </View>
              <View
                style={{
                  //backgroundColor: "#BCA"
                  width: "49%",
                  height: "100%",
                  // alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: BLACK,
                  borderWidth: 1
                }}
              >
                {this.state.imageOut ? (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%"
                      //backgroundColor: "#ABC"
                    }}
                    resizeMode={"stretch"}
                    source={{
                      uri: `data:image/png;base64,${this.state.imageOut}`
                    }}
                  />
                ) : (
                  <MaterialIcons
                    name={"face"}
                    //name={'flashlight-off'}
                    size={150}
                    color={BLACK}
                  />
                )}
              </View>
            </View>

            {/* {this.renderPhoto()} */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showModalPin}
              onRequestClose={() => {
                this.setState({ showModalPin: false });
              }}
            >
              {this.state.loading ? <Loading /> : <View />}
              <View
                style={{
                  flex: 0.33
                }}
              />
              <View
                style={{
                  flex: 0.67,
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
            </Modal>
            {/* </ScrollView> */}
          </View>
          {/* <View style={[ss.rightSide]}>

          </View> */}
        </View>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    backgroundColor: "#FFF",
    flex: 1,
    flexDirection: "column"
  },
  mainContent: {
    flexDirection: "row",

    flex: 1,
    justifyContent: "space-between"
  },
  leftSide: {
    width: "100%",
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
    elevation: 0,
    borderRadius: 0
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
  button: {
    elevation: 1,
    borderRadius: 15,
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
  flipText: {
    color: "white",
    fontSize: 15
  },
  zoomText: {
    position: "absolute",
    bottom: 70,
    zIndex: 2,
    left: 2
  }
});
