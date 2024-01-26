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
import DeviceInfo from "react-native-device-info";

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
import Octicons from "react-native-vector-icons/Octicons";

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
  GREY_700,
  GREEN_500
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
  BE_Staff,
  BE_CheckPin,
  BE_Attendance,
  BE_URI,
  BE_Robo_Customer,
  BE_Robo_Entrance,
  RoboLoginCustomer,
  BE_Robo_Family
} from "../../Constants";

import PrinterFunctions from "../../Libraries/PrinterFunctions";
import { RNCamera } from "react-native-camera";
import { Dimensions } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import OfflineAttendanceFunctions from "../../Libraries/OfflineAttendanceFunctions";
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
      tablet: DeviceInfo.isTablet(),
      action_text: "Check In",
      showModalPin: false,
      loading: false,
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
      imageIn64: null,
      imageOut: null,
      imageOut64: null,
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
      customerId: 22,
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
      barcodes: [],
      auth: this.props.auth ? this.props.auth : "",
      entry_cost: 0,
      entry_cost_override: null,
      entry_cost_override_status: false,

      //tester
      family_id: null,
      pay_all_customer_id: null,
      formCustomerEmail: "",
      formCustomerPhone: "",
      formCustomerPassword: "",
      customerToken: "",
      customerData: null,
      familyData: null,
      listFamily: [],
      selectedFamilyMember: [],
      showModalLogin: false,
      showModalFamily: false,
    };
  }

  getDataFamily(customer_id)
  {
    const uri = BE_Robo_Family+ "/customer-id/" + customer_id;
    console.log("URI =====", uri)
    // this.setState({ loading: true });
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        console.log("family data ==>", result);
        const family_id = resultData.id;

        if(result.statusCode === 200)
        {
          // const token = resultData.token;
          // const customer_account_id = payload.customer_account_id;

          const family_member = resultData.Robo_Family_Members;
          let family_member_filtered = [];

          console.log("family_member ===> ", family_member);

          let customerData = {};

          family_member.map((v, i) => {
            let customer_data = v.Robo_Customer;
            

            if (customer_data.id === customer_id)
            {
              customerData = customer_data;
              customer_data.selected = true;
            }
            family_member_filtered.push(customer_data);
          });

          console.log("family_member_filtered ===> ", family_member_filtered);
          this.setState({ 
            familyData: resultData, 
            listFamily: family_member_filtered, 
            customerData: customerData, showModalLogin:false,
            family_id});


          // this.getDataFamily(customer_account_id);
        }
        else
        {
          // this.setState({ loading: false });

        }

        // let clockIn = resultData.clock_in
        //   ? moment(resultData.clock_in).format("HH:mm")
        //   : "00:00";
        // let clockOut = resultData.clock_out
        //   ? moment(resultData.clock_out).format("HH:mm")
        //   : "00:00";

        // //console.log("clock OUT ==>", clockOut);

        // this.setState({
        //   clockOut: clockOut,
        //   clockIn: clockIn,
        //   attendanceId: resultData.id,
        //   loading: false,
        //   imageIn: resultData.image_in,
        //   imageOut: resultData.image_out
        // });
        //console.log("clockInFormat ==> ", clockIn);
        //this.setState({ listUser: resultData });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  handleLoginCustomer()
  {
    const uri = RoboLoginCustomer;
    console.log("URI =====", uri)
    this.setState({ loading: true });
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        
      },
      body: JSON.stringify({
        email:  this.state.formCustomerEmail === "" ? null :  this.state.formCustomerEmail,
        device_id: "dummy",
        password: this.state.formCustomerPassword,
        phone_number: this.state.formCustomerPhone === "" ? null :  this.state.formCustomerPhone
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        console.log("logincustomer ==>", result);

        if(result.statusCode === 200)
        {
          const payload = resultData.payload;
          const token = resultData.token;
          const customer_account_id = payload.customer_account_id;
          this.setState({ loading: false, 
            customerId: customer_account_id, 
            pay_all_customer_id: customer_account_id, 
            formCustomerPhone: "", formCustomerEmail: "", 
            formCustomerPassword: "" });
          alert("Login Sukses");

          this.getDataFamily(customer_account_id);
          this.BEAttendanceInformation(customer_account_id);
        }
        else
        {
          this.setState({ loading: false });
          alert("Email/Phone/Password salah");
        }

        // let clockIn = resultData.clock_in
        //   ? moment(resultData.clock_in).format("HH:mm")
        //   : "00:00";
        // let clockOut = resultData.clock_out
        //   ? moment(resultData.clock_out).format("HH:mm")
        //   : "00:00";

        // //console.log("clock OUT ==>", clockOut);

        // this.setState({
        //   clockOut: clockOut,
        //   clockIn: clockIn,
        //   attendanceId: resultData.id,
        //   loading: false,
        //   imageIn: resultData.image_in,
        //   imageOut: resultData.image_out
        // });
        //console.log("clockInFormat ==> ", clockIn);
        //this.setState({ listUser: resultData });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
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

  saveOfflineAttendance() {
    console.log("saveOffline");

    //OfflineAttendanceFunctions.DeleteTempAttendance(val => {});

    OfflineAttendanceFunctions.GetTempAttendance(val => {
      const uri = `${BE_Attendance}/in-out`;

      if (val) {
        const jumlah_data = parseInt(val.length) - 1;
        val.map((v, i) => {
          console.log("Save Offline GetTemp v ==> ", v);
          const body = {
            user_id: parseInt(v.user_id),
            clockInImage: v.clockInBase64Image
              ? `data:image/png;base64,${v.clockInBase64Image}`
              : null,
            clockOutImage: v.clockOutBase64Image
              ? `data:image/png;base64,${v.clockOutBase64Image}`
              : null,
            clock_in: v.clock_in,
            clock_out: v.clock_out ? v.clock_out : null
          };
          console.log("body ==> ", body);

          let formdata = new FormData();

          // formdata.append("clockInImage", {
          //   //uri: path,
          //   value: val[1].clockInBase64Image,
          //   type: "image/jpeg", // or photo.type
          //   name: val[1].clockInImage
          // });
          formdata.append("user_id", body.user_id);
          formdata.append("clock_in", body.clock_in);
          if (body.clock_out) {
            formdata.append("clock_out", body.clock_out);
          }
          formdata.append("clockInImage", body.clockInImage);
          if (body.clockOutImage) {
            formdata.append("clockOutImage", body.clockOutImage);
          }

          console.log("uri save offline ===> ", uri);

          fetch(uri, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: this.state.auth
              //"Content-Type": "application/x-www-form-urlencoded"
            },
            body: formdata
          })
            .then(response => response.json())
            .then(responseJson => {
              let result = responseJson;
              console.log("Absen Result Save InOut ==> ", result);

              if (result.statusCode === 201) {
                console.log("sukses");
              }
            });

          if (i === jumlah_data) {
            OfflineAttendanceFunctions.DeleteTempAttendance(val => {});
          }
        });
      }
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

    if (this.state.languageIndex === 0) {
      moment.locale("id");
    } else {
      moment.locale("en");
    }

    this.interval = setInterval(() => {
      this.updateTimeNow();
    }, 1000);

    this.getUserList();
    //this.getAttendanceInformation();
    // this.BEAttendanceInformation();
  }

  BEAttendanceInformation(userId = this.state.customerData.id) {
    this.setState({
      loading: false,
      clockOut: "00:00",
      clockIn: "00:00",
      attendanceId: null,
      imageIn: null,
      imageOut: null
    });

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let date_now = moment(new Date()).format("YYYY-MM-DD");
        const uri = `${BE_Robo_Entrance}?date=${date_now}&user_id=${userId}`;

        console.log("BEAttendanceInformation URI ==>", uri);

        this.setState({ loading: true });
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

            if (result.statusCode === 200) {
              let resultData = result.data[0];
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
            } else {
              this.setState({
                loading: false,
                clockOut: "00:00",
                clockIn: "00:00",
                attendanceId: null,
                imageIn: null,
                imageOut: null
              });
            }
            //console.log("clockInFormat ==> ", clockIn);
            //this.setState({ listUser: resultData });
          })
          .catch(_err => {
            console.log("ERR ==> ", _err);
          });
      } else {
        OfflineAttendanceFunctions.GetTempAttendance(val => {
          console.log("get Temp Attendance ==> ", val);
          val.map((v, i) => {
            if (
              v.user_id.toString() === userId.toString() &&
              v.date === moment(new Date()).format("YYYY-MM-DD")
            ) {
              console.log("get Temp Attendance v ==> ", v);

              // correct user & date
              this.setState({
                clockIn: v.clock_in
                  ? moment(v.clock_in).format("HH:mm")
                  : "00:00",
                clockOut: v.clock_out
                  ? moment(v.clock_out).format("HH:mm")
                  : "00:00",
                attendanceId: -1,
                loading: false,
                imageIn: v.image_in ? v.image_in : null,
                imageIn64: v.clockInBase64Image ? v.clockInBase64Image : null,
                imageOut: v.image_out ? v.image_out : null,
                imageOut64: v.clockOutBase64Image ? v.clockOutBase64Image : null
              });
            }
          });
        });
      }
    });
  }

  getUserList() {
    let outlet_id = this.state.userInfo.gerai_id;

    const uri = `${BE_Robo_Customer}`;
    console.log("BE_Robo_Customer===> ", uri);
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
            selectedUser: this.state.userInfo.id
              ? this.state.userInfo.id
              : firstUserId
          });
        }
        //console.log("new data ==>", resultData);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });

    fetch(`${uri}/settings/get-daily-setting`, {
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

          this.setState({
            entry_cost: resultData.entry_cost,
            entry_cost_override: resultData.entry_cost_override_price,
            entry_cost_override_status: resultData.entry_cost_override_check
          });
        }
        //console.log("new data ==>", resultData);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getAttendanceInformation(selectedUser = this.state.selectedUser) {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
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
      } else {
        OfflineAttendanceFunctions.GetTempAttendance(val => {
          val.map((v, i) => {
            if (
              v.userId.toString() === this.state.selectedUser.toString() &&
              v.date === moment(new Date()).format("YYYY-MM-DD")
            ) {
              // correct user & date
              this.setState({
                clockIn: v.clock_in
                  ? moment(v.clock_in).format("HH:mm")
                  : "00:00",
                clockOut: v.clock_out
                  ? moment(v.clock_out).format("HH:mm")
                  : "00:00",
                attendanceId: 999,
                loading: false,
                imageIn: v.image_in ? v.image_in : "",
                imageOut: v.image_out ? v.image_out : ""
              });
            }
          });
        });
      }
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

  absensiClockInOut(type = "in") {
    this.setState({ loading: true });
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.checkPin(val => {
          if (val.statusCode === 200) {
            //console.log("this.state.attendanceId ==> ", this.state.attendanceId);
            if (type === "in") {
              // const uri = BE_Robo_Entrance;
              const multi_entry = true;
              if(multi_entry)
              {
              
              const uri = BE_Robo_Entrance+ "/in-v2";

              
              // console.log("uri ==> ", uri);
              // console.log("this.state.cameraUri ==> ", this.state.cameraUri);
              
              // this.state.listUser.map((v, i) => {

              this.state.listFamily.map((v, i) => {
                let formdata = new FormData();
                // formdata.append("clockInImage", this.state.cameraUri);
                formdata.append("clockInImage", {
                  uri: this.state.cameraUri,
                  type: "image/jpeg", // or photo.type
                  name: this.state.cameraUri
                });
                // formdata.append("customer_id", parseInt(this.state.selectedUser));
  
                //tambahan
                // formdata.append("customer", this.state.listUser);tttttt
                console.log("this.state.listUser ===> ", v);
                formdata.append("customer_id", parseInt(v.id));

                formdata.append("family_id", this.state.family_id);
                formdata.append("pay_all_customer_id", this.state.pay_all_customer_id);

                // listFamily:
                if (v.selected)
                {

                const lanjut = true;
                if (lanjut)
                {

                
                  fetch(uri, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "multipart/form-data",
                      Authorization: this.state.auth
                      //"Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: formdata
                  })
                    .then(response => response.json())
                    .then(responseJson => {
                      let result = responseJson;
                      console.log("Absen Result IN MULTI ==> ", result);
                      let message = [];
                      //message.push(result.message);
    
                      if (val.statusCode === 201) {
                        message.push(_berhasil[this.state.languageIndex]);
    
                        if (this.state.loading === false)
                        {
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
                              imageIn: this.state.cameraUri
                            });
                          } else {
                            this.setState({
                              imageOut: this.state.cameraUri
                            });
                          }
                        }
                        
                      }
    
                      //alert(result.message);
                    })
                    .catch(_err => {
                      console.log("ERR multi in==> ", _err);
                    }); 
                  }
                }

                
              });

              
              }
              else
              {
              const uri = BE_Robo_Entrance;

              
              // console.log("uri ==> ", uri);
              // console.log("this.state.cameraUri ==> ", this.state.cameraUri);
              let formdata = new FormData();
              // formdata.append("clockInImage", this.state.cameraUri);

              formdata.append("clockInImage", {
                uri: this.state.cameraUri,
                type: "image/jpeg", // or photo.type
                name: this.state.cameraUri
              });
              formdata.append("customer_id", parseInt(this.state.selectedUser));

              //tambahan
              // formdata.append("customer", this.state.listUser);
              // console.log("this.state.listUser ===> ", this.state.listUser);
              // formdata.append("family_id", this.state.family_id);
              // formdata.append("pay_all_customer_id", this.state.pay_all_customer_id);

              fetch(uri, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "multipart/form-data",
                  Authorization: this.state.auth
                  //"Content-Type": "application/x-www-form-urlencoded"
                },
                body: formdata
              })
                .then(response => response.json())
                .then(responseJson => {
                  let result = responseJson;
                  console.log("Absen Result IN MULTI ==> ", result);
                  let message = [];
                  //message.push(result.message);

                  if (val.statusCode === 201) {
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
                        imageIn: this.state.cameraUri
                      });
                    } else {
                      this.setState({
                        imageOut: this.state.cameraUri
                      });
                    }
                  }

                  //alert(result.message);
                })
                .catch(_err => {
                  console.log("ERR ==> ", _err);
                });
              }


              

              if (type === "in") {
                this.setState({ clockIn: moment(new Date()).format("HH:mm") });
              }

              if (type === "out") {
                this.setState({ clockOut: moment(new Date()).format("HH:mm") });
              }
            }
            //Out
            const attentanceId = this.state.attendanceId;
            const uri = `${BE_Robo_Entrance}/${attentanceId}`;
            let formdata = new FormData();
            formdata.append("clockOutImage", {
              uri: this.state.cameraUri,
              type: "image/jpeg", // or photo.type
              name: this.state.cameraUri
            });
            formdata.append("customer_id", parseInt(this.state.customerData.id));


            // console.log("selectedUser", this.state.selectedUser);
            // console.log("attentanceId", this.state.attentanceId);
            console.log("formdata", formdata);
            console.log("formdata uri", uri);
            



            





            fetch(uri, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.state.auth
                //"Content-Type": "application/x-www-form-urlencoded"
              },
              body: formdata
            })
              .then(response => response.json())
              .then(responseJson => {
                let result = responseJson;

                console.log("Absen Result OUT ==> ", result);
                let message = [];
                //message.push(result.message);
                if (val.statusCode === 200) {
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
                      //imageIn: this.state.cameraPicture
                      imageIn: this.state.cameraUri
                    });
                  } else {
                    this.setState({
                      //imageOut: this.state.cameraPicture
                      imageOut: this.state.cameraUri
                    });
                  }

                  this.BEAttendanceInformation();
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
      } else {
        this.offlineAbsensi(type);
      }
    });
  }

  offlineAbsensi(type = "in") {
    console.log("offlineAbsensi");
    this.setState({ loading: false });

    if (type === "in") {
      let temp_data = {
        user_id: parseInt(this.state.selectedUser),
        date: moment(new Date()).format("YYYY-MM-DD"),
        clock_in: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        clockInImage: this.state.cameraUri,
        clockInBase64Image: this.state.cameraPicture
      };

      OfflineAttendanceFunctions.GetTempAttendance(val => {
        let temp_attendance = [];

        if (val) {
          temp_attendance = val;
        }

        console.log("get offline Absensi ==> ", temp_attendance);

        temp_attendance.push(temp_data);

        console.log("offline Absensi tambah ==> ", temp_attendance);

        OfflineAttendanceFunctions.SaveTempAttendance(
          temp_attendance,
          val1 => {}
        );

        OfflineAttendanceFunctions.GetTempAttendance(val2 => {
          console.log("get offline Absensi val2 ==> ", val2);
        });

        let message = [];
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

        this.BEAttendanceInformation();
      });
    } else {
      let temp_data = {
        user_id: this.state.selectedUser,
        date: moment(new Date()).format("YYYY-MM-DD"),
        clock_out: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        clockOutImage: this.state.cameraUri,
        clockOutBase64Image: this.state.cameraPicture
      };

      OfflineAttendanceFunctions.GetTempAttendance(val => {
        let attendance_data = {};
        let temp_attendance_all = val;
        let index = -1;

        val.map((v, i) => {
          if (
            v.user_id.toString() === this.state.selectedUser.toString() &&
            v.date === moment(new Date()).format("YYYY-MM-DD")
          ) {
            attendance_data = v;
            attendance_data.clock_out = temp_data.clock_out;
            attendance_data.clockOutImage = temp_data.clockOutImage;
            attendance_data.clockOutBase64Image = temp_data.clockOutBase64Image;
            index = i;
          }
        });

        if (index !== -1) {
          temp_attendance_all[index] = attendance_data;
        }

        console.log("temp_attendance_all ==> ", temp_attendance_all);
        OfflineAttendanceFunctions.SaveTempAttendance(
          temp_attendance_all,
          val1 => {}
        );

        OfflineAttendanceFunctions.GetTempAttendance(val2 => {
          console.log("get offline Absensi val2 ==> ", val2);
        });

        let message = [];
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

        this.BEAttendanceInformation();
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
    const uri = BE_CheckPin;
    const { selectedUser, pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    console.log("SELECTED USER ==> ", selectedUser);
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      },
      body: JSON.stringify({
        user_id: selectedUser,
        pin: `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("cek pin ==> ", responseJson);
        let result = responseJson;
        cb(result);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        cb(null);
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

  renderLoginCustomer() {
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
            Masukan Email atau Nomor Telepon kemudian isi password.
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
          <MaterialIcons
            name={"email"}
            //name={'flashlight-off'}
            size={30}
            color={BLACK}
          />
          <TextInput
            style={{
              flex: 1,
              backgroundColor: "rgba(246, 246, 246, 0.95)",
              color: BLACK,
              borderRadius: 5,
              alignSelf: "center",
              height: 48,
              fontSize: 15,
              fontFamily: "Roboto-Regular"
            }}
            keyboardType="email-address"
            ref={q => {
              this._emailText = q;
            }}
            onChangeText={text => this.setState({ formCustomerEmail: text })}
            value={this.state.formCustomerEmail}
            placeholder={"Email"}
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
          />
        </View>
        
        <View
          style={{
            width: "100%",
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            marginTop: 5
          }}
        >
          <MaterialIcons
            name={"phone-android"}
            //name={'flashlight-off'}
            size={30}
            color={BLACK}
          />
          <TextInput
            style={{
              flex: 1,
              backgroundColor: "rgba(246, 246, 246, 0.95)",
              color: BLACK,
              borderRadius: 5,
              alignSelf: "center",
              height: 48,
              fontSize: 15,
              fontFamily: "Roboto-Regular"
            }}
            keyboardType={'phone-pad'}
            ref={q => {
              this._telpText = q;
            }}
            onChangeText={text => this.setState({ formCustomerPhone: text })}
            value={this.state.formCustomerPhone}
            placeholder={"Nomor Telepon"}
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
          />
        </View>

        <View
          style={{
            width: "100%",
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            marginTop: 5
          }}
        >
          <MaterialIcons
            name={"vpn-key"}
            //name={'flashlight-off'}
            size={30}
            color={BLACK}
          />
          <TextInput
            style={{
              flex: 1,
              backgroundColor: "rgba(246, 246, 246, 0.95)",
              color: BLACK,
              borderRadius: 5,
              alignSelf: "center",
              height: 48,
              fontSize: 15,
              fontFamily: "Roboto-Regular"
            }}

            secureTextEntry={true}
            keyboardType="password"
            ref={q => {
              this._passwordText = q;
            }}
            onChangeText={text => this.setState({ formCustomerPassword: text })}
            value={this.state.formCustomerPassword}
            placeholder={"Password"}
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
          />
        </View>

        <View
          style={{
            width: "100%",
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          
          
          
          <Button
            onPress={() => {
              this.setState({showModalLogin: false})
            }}
            style={{
              padding: 10,
              alignItems: "center",
              flex:1,
              margin:3,
              borderRadius: 15,
              backgroundColor: RED_500
            }}
          >
            <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: WHITE,
                fontSize: 12
              }
            ]}
          >
            Kembali
          </Text>
          </Button>
          <Button
            onPress={() => {
              this.handleLoginCustomer();
            }}
            style={{
              padding: 10,
              alignItems: "center",
              flex:1,
              borderRadius: 15,
              backgroundColor: GREEN_500
            }}
          >
            <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: WHITE,
                fontSize: 12
              }
            ]}
          >
            Lanjut
          </Text>
          </Button>
        </View>
      </View>
    );
  }
  
  renderSelectUser() {
    const { tablet } = this.state;
    return (
      <View
        style={[
          ss.box,
          {
            padding: 15,
            paddingTop: tablet ? 5 : 15,
            paddingBottom: tablet ? 5 : 15
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
            paddingBottom: 5
          }}
        >
          <View
            style={[
              ss.box,
              {
                width: "25%",
                backgroundColor: WHITE
                //borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                //borderWidth: 1 listFamily
              }
            ]}
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
            {/* {_pilih_user[this.state.languageIndex]} */}
            Customer
          </Text>
          </View>
          <View
            style={[
              ss.box,
              {
                width: "75%",
                backgroundColor: WHITE
                //borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                //borderWidth: 1 listFamily
              }
            ]}
          >
            <Button
              style={{
                marginLeft: 0,
                backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                borderRadius: 15,
                padding: 10,
                
                //padding: 10
                // paddingRight:100
              }}
              color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
              onPress = {()=> {
                this.setState({showModalLogin: true})
              }}
          
            >
              <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  // alignSelf: "center",
                  color: WHITE,
                  display: this.state.customerData ? "none": "flex"
                }
              ]}
            >
                Login Customer
              </Text>
              <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  // alignSelf: "center",
                  color: WHITE,
                  display: this.state.customerData ? "flex": "none"
                }
              ]}
            >
                {this.state.customerData? this.state.customerData.name : ""} - Saldo {this.state.customerData ? this.state.customerData.saldo_amount: 0}
              </Text>
            </Button>
            
            {/* <Dropdown
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
                  label: `${v.name} - Saldo ${v.saldo_amount}`,
                  value: String(v.id)
                };
              })}
              onValueChange={(itemValue, itemIndex) => {
                //console.log("select user ==> ", this.state.listUser[itemIndex]);

                this.setState({
                  selectedUser: itemValue
                  // selectedUserData: this.state.listUser[itemIndex]
                });

                // this.BEAttendanceInformation(itemValue);
              }}
            /> */}
          </View>
        </View>
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
            paddingBottom: 5,
            paddingTop: 5,
            display: this.state.familyData ? "flex" : "none"
          }}
        >
          {/* <Dropdown
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
              selectedValue={String(this.state.listFamily)}
              optionLists={this.state.listFamily.map((v, k) => {
                return {
                  label: `${v.name} - Saldo ${v.saldo_amount}`,
                  value: v
                };
              })}
              onValueChange={(itemValue, itemIndex) => {
                //console.log("select user ==> ", this.state.listFamily[itemIndex]);
                const selectedFamilyMember = this.state.selectedFamilyMember.push(itemValue);
                this.setState({
                  selectedFamilyMember: selectedFamilyMember
                  // selectedUserData: this.state.listFamily[itemIndex]
                });

                // this.BEAttendanceInformation(itemValue);
              }}
            /> */}
            <View
            style={[
              ss.box,
              {
                width: "25%",
                backgroundColor: WHITE
                //borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                //borderWidth: 1 listFamily
              }
            ]}
            >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  // alignSelf: "center",
                  color: BLACK,
                }
              ]}
            >
              Family
            </Text>
            </View>
            

            <View
            style={[
              ss.box,
              {
                width: "75%",
                backgroundColor: WHITE,
                //borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                //borderWidth: 1 listFamily
                alignItems: "flex-start"
              }
            ]}
            >
              <Button
                style={{
                  //width: "33%",
                  // alignSelf: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    showModalFamily: true
                  })
                }}>
                <View
                style={{
                  //backgroundColor: "#EEEEEE",
                  // padding: 15,
                  borderRadius: 30
                }}
                >
                  <Octicons
                        name={"plus-circle"}
                        //name={'flashlight-off'}
                        size={27}
                        color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    />
                </View>
            </Button>

            </View>
        </View>
      </View>
    );
  }

  renderTime() {
    const {
      time_now,
      date_now,
      tablet,
      entry_cost,
      entry_cost_override,
      entry_cost_override_status
    } = this.state;
    let entry_cost_final = 0;

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
            paddingBottom: tablet ? 5 : 15,
            borderBottomWidth: 1,
            borderColor: "#C8C7CC"
          }}
        >
          <Button
            onPress={() => {
              //this.saveOfflineAttendance();
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 16, color: BLACK, alignSelf: "center" }
              ]}
            >
              {date_now} {tablet ? time_now : ""}
            </Text>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  display: tablet ? "none" : "flex",
                  fontSize: 24,
                  alignSelf: "center",
                  color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                }
              ]}
            >
              {time_now}
            </Text>
          </Button>

          <Button
            onPress={() => {
              //this.saveOfflineAttendance();
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 16, color: BLACK, alignSelf: "center" }
              ]}
            >
              Harga Tiket
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    display: "flex",
                    fontSize: entry_cost_override ? 18 : 24,
                    alignSelf: "center",
                    textDecorationLine: entry_cost_override
                      ? "line-through"
                      : "none",
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  }
                ]}
              >
                {entry_cost}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    display: "flex",
                    fontSize: 24,
                    marginLeft: 15,
                    alignSelf: "center",
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  }
                ]}
              >
                {entry_cost_override}
              </Text>
            </View>
          </Button>
          {/* Box KEluar */}
        </View>
        <View
          style={{
            width: this.state.tablet ? "66%" : "100%",
            alignSelf: "center"
          }}
        >
          <Button
            onPress={() => {
              if (this.state.clockIn === "00:00") {
                if(this.state.customerData)
                {
                  this.setState({
                    action: "in",
                    action_text: _check_in[this.state.languageIndex],
                    //showModalPin: true,
                    showCamera: true,
                    cameraPicture: ""
                  });
                }
              }
            }}
            style={{
              padding: 10,
              alignItems: "center",
              // backgroundColor:
              //   this.state.clockIn === "00:00" ? "#83B235" : "#EEEEEE",
              //marginTop: 20,
              marginTop: tablet ? 5 : 5,
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
              {/* {_check_in[this.state.languageIndex]} */}
              Masuk
            </Text>
          </Button>
          <Button
            onPress={() => {
              if (
                this.state.clockIn !== "00:00" &&
                this.state.clockOut === "00:00"
              ) {
                if (this.state.customerData)
                {
                  this.setState({
                    action: "out",
                    action_text: _check_out[this.state.languageIndex],
                    showCamera: true,
                    cameraPicture: ""
                    //showModalPin: true
                  });
                }

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
              marginTop: tablet ? 5 : 5,

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
              {/* {_check_out[this.state.languageIndex]} */}
              Keluar
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

      //var path = RNFS.DocumentDirectoryPath + "/";

      var path = RNFS.PicturesDirectoryPath + "/";

      console.log("file path ===> ", path);

      var str = data.uri;
      var res = str.split("Camera/");

      var image_name = res[1];

      var image_path = path + image_name;

      console.log("image path ===> ", image_path);

      // RNFS.writeFile(image_path, data.base64, "base64")
      //   .then(success => {
      //     console.log("FILE WRITTEN!");
      //   })
      //   .catch(err => {
      //     console.log(err.message);
      //   });

      // write the file
      // RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
      //   .then((success) => {
      //     console.log('FILE WRITTEN!');
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });

      // const base64image = await RNFS.readFile(data.uri, "base64");

      // console.log("base 64 ==> ", base64image);

      this.setState({
        showModalPin: true,
        //cameraPicture: data.base64,
        cameraPicture: data.base64,
        cameraFileName: image_path,
        cameraUri: data.uri,
        showCamera: false
      });
    }
  };

  renderModalFamily() {
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
            Pilih Family Member untuk ikut masuk
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
          <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.listFamily}
                  renderItem={({ item, index }) => {
                    return this.renderListFamily(item, index);
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "renderListFamily" + index.toString();
                  }}
                  //onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //refreshing={refreshing}
                />
        </View>
        

        <View
          style={{
            width: "100%",
            //backgroundColor: "#BCA",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          
          
          
          <Button
            onPress={() => {
              this.setState({showModalFamily: false})
            }}
            style={{
              padding: 10,
              alignItems: "center",
              flex:1,
              margin:3,
              borderRadius: 15,
              backgroundColor: RED_500
            }}
          >
            <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: WHITE,
                fontSize: 12
              }
            ]}
          >
            Kembali
          </Text>
          </Button>
          <Button
            onPress={() => {
              this.setState({showModalFamily: false})
            }}
            style={{
              padding: 10,
              alignItems: "center",
              flex:1,
              borderRadius: 15,
              backgroundColor: GREEN_500
            }}
          >
            <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                color: WHITE,
                fontSize: 12
              }
            ]}
          >
            Lanjut
          </Text>
          </Button>
        </View>
      </View>
    );
  }



  renderModalFamilyv2() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showModalFamily}
        //visible={true}
        onRequestClose={() => {
          this.setState({ showModalFamily: false });
        }}
      >
        <View style={{ flex: 0.5, backgroundColor: "rgba(0,0,0,0.5)" }} />
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              flex: 1,
              marginTop: -15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: WHITE,
              width: this.state.tablet ? "50%" : "100%",
              alignSelf: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center"
                //justifyContent: "center"
              }}
            >
              <View
                style={{
                  //backgroundColor: "#BCA",
                  width: "100%",
                  flexDirection: "row",
                  padding: 15,
                  paddingLeft: 20,
                  paddingRight: 20,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 15 }}
                  onPress={() => {
                    this.setState({ showModalFamily: false });
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
                <Text
                  style={
                    ([MainStyle.robotoNormal],
                    {
                      fontSize: 15,
                      color: BLACK
                    })
                  }
                >
                  TEXT 1
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  margin: 15,
                  padding: 15,
                  paddingTop: 0
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      margin: 0,
                      backgroundColor: "#F7F7F7",
                      borderRadius: 10,
                      elevation: 0,
                      padding: 10,
                      marginBottom: 5
                    }}
                  >
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginLeft: 10,
                        marginRight: 10
                      }}
                    >
                      <View
                        style={{
                          //width: "10%",
                          alignContent: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Ionicons
                          name={"md-search"}
                          style={{
                            alignSelf: "center",
                            fontSize: 20,
                            color: BLACK
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.listFamily}
                  renderItem={({ item, index }) => {
                    return this.renderListFamily(item, index);
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "renderListFamily" + index.toString();
                  }}
                  //onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  //refreshing={refreshing}
                />
              </View>
            </View>
            <View
              style={{
                //backgroundColor: "#BCA",
                //width: "95%",
                //flex: 1,
                //height: 50,
                width: "100%",
                //margin: 15,
                padding: 15,
                justifyContent: "flex-end"
                //alignItems: "flex-end",
                //alignSelf: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onPress={() => {
                    this.setState({ showModalFamily: false });
                  }}
                  style={[
                    ss.box,
                    {
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      width: "100%",
                      borderWidth: 0,
                      borderColor: BLACK,
                      borderRadius: 15,
                      elevation: 1,
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormal],
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      })
                    }
                  >
                    {_batal[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  toogleFamily(index) {
    const { listFamily } = this.state;


    let listFamilyTemp = listFamily;
    // this.setState({ loading: true });

    console.log("toogleFamily ===> ", listFamilyTemp);

    let data = listFamilyTemp[index];


    data.selected = data.selected ? false : true;

    console.log("toogleFamily data ===> ", data);

    // listCouponUsage.splice(index, 1);
    let tempData = [];

    listFamilyTemp[index] = data;

    this.setState({
      listFamily: listFamilyTemp,
    });



    // setTimeout(() => {
    //   this.setState({ showBill: true, loading: false });
    // }, 150);
  }

  renderListFamily(data, index) {
    // const backgroundColor =
    //   this.state.selectedCustomer === data.id
    //     ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
    //     : WHITE;
    // const textColor =
    //   this.state.selectedCustomer === data.id
    //     ? MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
    //     : BLACK;

    const backgroundColor = WHITE;

    const textColor = BLACK;

    let coupon_value = data.coupon_value;

    const selected = data.selected ? true: false;
    // const disable_toogle = data.id === this.state.customerData.id ? true :false;
    const disable_toogle = false;


    return (
      <View
        style={{
          padding: 10,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: "#C4C4C4",
          backgroundColor: selected ? GREEN_500: WHITE,
          width: "100%"
        }}
        onPress={() => {
          // this.setState({
          //   selectedCustomerData: data,
          //   selectedCustomer: data.id,
          //   selectedCustomerName: data.name,
          //   formCustomer: data.name,
          //   formPhone: data.phone_number,
          //   formEmail: data.email,
          //   showCustomer: false,
          //   points_available: data.points,
          //   saldo_available: saldo_amount ? saldo_amount : 0,
          //   loading: true,
          //   saldo_amount: 0
          //   // customer_level_discount: 0
          // });

          // this.changeDiscount();
          // this.deleteFamily(index);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 5
              // alignItems: "center",
            }}
          >
            {/* <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 14,
                  color: textColor
                })
              }
            >
              {data.id}
            </Text> */}
            <Text
              style={
                ([MainStyle.robotoNormal],
                {
                  fontSize: 14,
                  color: textColor
                })
              }
            >
              {data.name}
            </Text>
          </View>

          <Button
            style={{
              backgroundColor: selected ? RED_500 : GREEN_500,
              flex: 1,
              borderRadius: 15
              // alignItems: "center",
            }}
            onPress={() => {
              // this.deleteFamily(index);
              //this.changeQty(i);
              if (!disable_toogle)
              this.toogleFamily(index);
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
               <Octicons
                name={selected ? "x-circle" : "plus-circle" }
                //name={'flashlight-off'}
                size={27}
                color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
              />
            </View>
          </Button>
        </View>
      </View>
    );
  }

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
    let {
      pin1,
      pin2,
      pin3,
      pin4,
      pin5,
      pin6,
      time_now,
      date_now,
      tablet
    } = this.state;
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
          title="Demo Entrance System"
          notif={false}
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
                marginTop: tablet ? 5 : 5,
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
                    fontSize: 14,
                    fontFamily: "Roboto-Regular",
                    color: BLACK
                  }}
                >
                  {/* {_check_in[this.state.languageIndex]} */}
                  Masuk
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
                    fontSize: 14,
                    fontFamily: "Roboto-Regular",
                    color: BLACK
                  }}
                >
                  {/* {_check_out[this.state.languageIndex]} */}
                  Keluar
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
                paddingTop: tablet ? 5 : 15,
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
                {this.state.imageIn64 ? (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%"
                      //backgroundColor: "#ABC"
                    }}
                    resizeMode={"stretch"}
                    source={{
                      uri: `data:image/png;base64,${this.state.imageIn64}`
                    }}
                  />
                ) : this.state.imageIn ? (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%"
                      //backgroundColor: "#ABC"
                    }}
                    resizeMode={"stretch"}
                    source={{
                      uri: `${BE_URI}${this.state.imageIn}`
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
                {this.state.imageOut64 ? (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%"
                      //backgroundColor: "#ABC"
                    }}
                    resizeMode={"stretch"}
                    source={{
                      uri: `data:image/png;base64,${this.state.imageOut64}`
                    }}
                  />
                ) : this.state.imageOut ? (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%"
                      //backgroundColor: "#ABC"
                    }}
                    resizeMode={"stretch"}
                    source={{
                      uri: `${BE_URI}${this.state.imageOut}`
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
              visible={this.state.showModalFamily}
              onRequestClose={() => {
                this.setState({ showModalFamily: false });
              }}
            >
              {this.state.loading ? <Loading /> : <View />}
              <View
                style={{
                  flex: 0.33,
                  backgroundColor: "rgba(0,0,0,0.5)"
                }}
              />
              <View
                style={{
                  flex: 0.67,
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: this.state.tablet ? "50%" : "100%",
                    alignSelf: "center",
                    backgroundColor: "#FFF",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    borderColor: "#C4C4C4",
                    borderWidth: 2
                  }}
                >
                  {this.renderModalFamily()}
                </View>
              </View>
            </Modal>



            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showModalLogin}
              onRequestClose={() => {
                this.setState({ showModalLogin: false });
              }}
            >
              {this.state.loading ? <Loading /> : <View />}
              <View
                style={{
                  flex: 0.33,
                  backgroundColor: "rgba(0,0,0,0.5)"
                }}
              />
              <View
                style={{
                  flex: 0.67,
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: this.state.tablet ? "50%" : "100%",
                    alignSelf: "center",
                    backgroundColor: "#FFF",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    borderColor: "#C4C4C4",
                    borderWidth: 2
                  }}
                >
                  {this.renderLoginCustomer()}
                </View>
              </View>
            </Modal>

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
                  flex: 0.33,
                  backgroundColor: "rgba(0,0,0,0.5)"
                }}
              />
              <View
                style={{
                  flex: 0.67,
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: this.state.tablet ? "50%" : "100%",
                    alignSelf: "center",
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
