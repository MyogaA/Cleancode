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

// import OneSignal from "react-native-onesignal";

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

import Checkbox from "../../Components/Checkbox";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MobileHeaderTabletV2 from "../../Components/MobileHeaderTabletV2";
import MobileHeaderTabletSamping from "../../Components/MobileHeaderTabletSamping";
// import OctoIcon from "react-native-vector-icons/Octicons";

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
  RED_600,
  GREEN_500,
  GREEN_700,
  GREEN_200,
  GREEN_300
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
  _kapasitas_short,
  _queue_number,
  _additional
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
  BE_Update_Transaction,
  BE_Kitchen
} from "../../Constants";
import MenuFunctions from "../../Libraries/MenuFunctions";
import {
  _cancel,
  _cancel_order,
  _check_out,
  _delete_berhasil,
  _delete_confirmation,
  _gagal,
  _kitchen_confirmation
} from "../../Libraries/DictionaryHome";

import { _detail_order } from "../../Libraries/DictionaryHistory";

import { _sukses } from "../../Libraries/DictionaryPayment";
import DeviceInfo from "react-native-device-info";
import CustomConfirmation from "../../Components/MobileCustomConfirmation";
import {
  _kitchen_management,
  _ok_alert
} from "../../Libraries/DictionarySetting";
import { _status_simple } from "../../Libraries/DictionaryDrawer";
import Loading from "../../Components/MobileLoading";

export default class MobileKitchen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: null,
      loading: true,
      showCustomConfirmation: false,
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
      listData: [],
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
      showMenu: false
    };
  }

  componentDidMount() {
    // OneSignal.addEventListener("opened", this.onOpened);

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

    LoginFunctions.AuthToken(val => {
      //console.log("auth token ==> ", val);
      this.setState({
        auth: val
      });
    });

    LoginFunctions.LoginInformation(val => {
      //console.log("dari login ", val);
      if (val) {
        this.setState({ userInfo: val });
      }
    });

    setTimeout(() => {
      this.getData();
      //this.testFetch(val);
    }, 250);

    //this.getSalesType();
  }

  onOpened(openResult) {
    // console.log("Data: ", openResult.notification.payload.additionalData);
    // console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult Kitchen : ", openResult);
    // console.log("Actions.currentScene ==> ", Actions.currentScene);
    // const data = openResult.notification.payload.additionalData;
    // console.log("DATA ==> ", data.goToNotif);
    //Actions.Notification();
    if (Actions.currentScene === "MobileKitchen") {
      // MobileKitchen.getData();
      Actions.pop();
      Actions.MobileKitchen();
    }
  }

  componentWillUnmount() {
    // OneSignal.removeEventListener("opened", this.onOpened);
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
      this.getData();
    }
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
        console.log("update result uri ===> ", uri);

        if (result.statusCode === 200) {
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getData(search = this.state.searchKey) {
    const { userInfo } = this.state;
    const outlet_id = userInfo.gerai_id;

    let available = 0;
    let reserved = 0;
    let used = 0;
    let page = this.state.page;
    let per_page = 25;

    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=${search}`;

    let name_search = search !== "" ? `&name=${search}` : "";

    let uri = `${BE_Kitchen}?outlet_id=${outlet_id}${name_search}&order=oldest&page=1&per_page=18`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27
    let resultFinal = [];
    console.log("getDataa uri ==> ", uri);

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
        console.log("getData result ==> ", result);

        if (result.statusCode === 200) {
          let resultData = result.data;
          console.log("getData ==> ", resultData);

          // let temp_list = [];
          // resultData.map((v, i) => {
          //   let temp_data = v;
          //   if (v.status === "available") {
          //     available = available + 1;
          //   } else if (v.status === "reserved") {
          //     reserved = reserved + 1;
          //   } else if (v.status === "used") {
          //     used = used + 1;
          //   }

          //   if (v.status === "used" && !v.Transaction_Table) {
          //     temp_data.status = "available";
          //     this.updateTableStatus(v, "available");
          //   }

          //   temp_list.push(temp_data);
          // });

          // let tableInformation = {
          //   available: available,
          //   reserved: reserved,
          //   used: used
          // };

          this.setState({
            //listTable: resultData,
            listData: resultData,
            loading: false,

            // tableInformation: tableInformation,
            selectedTable: []
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({ loading: false });
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
                MainStyle.dmSansBold,
                { color: BLACK, fontSize: 20 }
              ]}
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
                MainStyle.dmSans,
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
                MainStyle.dmSans,
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
                MainStyle.dmSans,
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
                MainStyle.dmSans,
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
                MainStyle.dmSans,
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
                MainStyle.dmSans,
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

  renderDetail(data, i) {
    return (
      <View
        onPress={() => {
          // if (this.state.selectedTable.length === 0) {
          //   this.selectTable(data);
          // }
        }}
        style={[
          ss.tableList,
          {
            // height: 333,

            margin: 0,
            flex: 1,
            //width: "100%",
            marginRight: 15,
            marginBottom: 5,
            // backgroundColor: bgColor[data.status],
            backgroundColor: "#FFF",
            padding: 0,
            paddingBottom: 0,
            paddingTop: 0,
            borderRadius: 5,
            width: "95%"
          }
        ]}
      >
        <View
          style={[
            {
              padding: 5,
              paddingBottom: 0,
              // paddingBottom: 20,
              // paddingTop: 20,
              flex: 1,
              flexDirection: "row"
              //borderColor: borderColor[0]
            }
          ]}
        >
          <View style={{ alignItems: "center", flex: 3 }}>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  display: data.queue_number ? "flex" : "none",
                  color: BLACK,
                  fontSize: 15
                  // marginBottom: 15
                }
              ]}
            >
              {_queue_number[this.state.languageIndex]} {data.queue_number}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  display: data.queue_number ? "flex" : "none",
                  color: BLACK,
                  fontSize: 15
                }
              ]}
            >
              
            </Text>
          </View>
          <View style={{}}>
            <Button
              style={{ marginBottom: 10 }}
              onPress={() => {
                //this.updateTransactionStatus(data);
                this.setState({
                  selectedData: data,
                  showCustomConfirmation: true
                });
              }}
            >
              <MaterialCommunityIcons
                name="check-circle-outline"
                style={{ color: GREEN_500, fontSize: 45 }}
              />
            </Button>
          </View>
        </View>
        <View
          style={{
            margin: 3,
            padding: 5,
            marginTop: 0,
            paddingTop: 0,
            flex: 999
          }}
        >
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={{
                // marginLeft: "-0.5%",
                // marginRight: "-0.5%",
                //marginLeft: 10,
                width: "100%"
                // justifyContent: "space-evenly",
                //backgroundColor: "#BCA"
              }}
              showsVerticalScrollIndicator={false}
              data={data.Transaction_Items}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      //flex: 1,
                      //flex: 0.325,
                      //marginLeft: 15,
                      marginTop: 0,
                      width: "100%",
                      marginBottom: 5
                      //marginBottom: 3,
                      //marginRight: 15
                    }}
                  >
                    {this.renderTransactionItems(item, index, i)}
                  </View>
                );
              }}
              keyExtractor={(item, index) => {
                return "Items" + data.id + index.toString();
              }}
              listKey={(item, index) => {
                return "Items" + data.id + index.toString();
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  updateItemStatus(data, index, index_parent) {
    const { listData } = this.state;

    // this.setState({ loading: true });

    let temp_data = listData;
    temp_data[index_parent].Transaction_Items[index].status = "done";
    let uri = BE_Kitchen + "/single-item/" + data.id;

    fetch(`${uri}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        status: "done"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.statusCode === 200) {
          this.setState({ listData: temp_data, loading: false });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({ loading: false });
      });
  }

  updateTransactionStatus() {
    const { selectedData } = this.state;
    let data = selectedData;
    let uri = BE_Kitchen + "/" + data.id;

    // this.setState({ loading: true });

    fetch(`${uri}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        kitchen: false
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        if (result.statusCode === 200) {
          this.getData();
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({ loading: false });
      });
  }

  renderTransactionItems(data, i, index_parent) {
    let detailString = "";

    if (data.Transaction_Item_Addons.length > 0) {
      data.Transaction_Item_Addons.map((items, itemIndex) => {
        if (detailString === "") {
          detailString = items.Addon.name;
        } else {
          detailString = detailString + ", " + items.Addon.name;
        }
      });
    }

    let bgColor = ["#EEE", GREEN_300];
    let bgIndex = 0;
    if (data.status === "done") {
      bgIndex = 1;
    }

    return (
      <Button
        onPress={() => {
          // if (this.state.selectedTable.length === 0) {
          //   this.selectTable(data);
          // }
          this.updateItemStatus(data, i, index_parent);
        }}
        style={[
          ss.tableList,
          {
            margin: 0,
            flex: 1,
            //width: "100%",
            backgroundColor: bgColor[bgIndex],
            //backgroundColor: "#BCA",
            borderRadius: 5,
            width: "100%",
            borderWidth: 0.5,
            borderColor: "#777"
          }
        ]}
      >
        <View
          style={[
            {
              padding: 10
              //paddingBottom: 20,
              //paddingTop: 20

              // alignItems: "center"
              //borderColor: borderColor[0]
            }
          ]}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    color: BLACK,
                    fontSize: 15
                  }
                ]}
              >
                {data.Product.name}
              </Text>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    color: BLACK,
                    fontSize: 15
                  }
                ]}
              >
                {data.quantity}
              </Text>
            </View>

            <View style={{ flexDirection: "column" }}>
              <View>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      color: BLACK,
                      fontSize: 10,
                      display: detailString !== "" ? "flex" : "none"
                    }
                  ]}
                >
                  {_additional[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      color: BLACK,
                      fontSize: 10,
                      display: detailString !== "" ? "flex" : "none"
                    }
                  ]}
                >
                  {detailString}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      color: BLACK,
                      fontSize: 10,
                      display: data.notes ? "flex" : "none"
                    }
                  ]}
                >
                  {_notes[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.dmSans,
                    {
                      color: BLACK,
                      fontSize: 10,
                      display: data.notes ? "flex" : "none"
                    }
                  ]}
                >
                  {data.notes}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Button>
    );
  }

  renderList() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          width: this.state.tablet ? "100%" : "100%",
          justifyContent: "space-around"
        }}
      >
        <FlatList
          nestedScrollEnabled
          // style={{
          //   paddingLeft: "5%",
          //   paddingRight: "5%"
          //   //paddingTop: "2.5%"
          // }}
          //ListHeaderComponent={this.renderSearch()}
          showsVerticalScrollIndicator={false}
          data={this.state.listData}
          contentContainerStyle={{
            // marginLeft: "-0.5%",
            // marginRight: "-0.5%",
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 5,
            width: "100%",
            justifyContent: "space-evenly"
            //backgroundColor: "#BCA"
          }}
          columnWrapperStyle={
            {
              // justifyContent: "space-evenly",
              // marginBottom: 5
            }
          }
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  //flex: 1,
                  //flex: 0.325,
                  //marginLeft: 15,
                  marginTop: 0,
                  width: "33%"
                  //marginBottom: 3,
                  //marginRight: 15
                }}
              >
                {this.renderDetail(item, index)}
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return "Table1" + index.toString();
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
              MainStyle.dmSansBold,
              { color: BLACK, fontSize: 16, marginBottom: 15 }
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
            style={[
              MainStyle.dmSansBold,
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

  logoutAction() {
    //this.setState({ userInfo: null });
    LoginFunctions.Logout(val => {
      if (val) {
        setTimeout(() => {
          Actions.pop();
          Actions.pop();

          //console.log("logout ===> ", true);
          this.setState({ loading: false, mount: false });

          if (this.state.tablet) 
          {
            Actions.MobileLogin({
              logout: true,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }
          else
          {
            Actions.MobileLoginOld({
              logout: true,
              colorIndex: this.state.colorIndex,
              languageIndex: this.state.languageIndex
            });
          }
        }, 100);
      }
    });
    
    
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
        {this.state.loading ? <Loading not_transparent={true} /> : <View />}
        <MobileHeaderTabletV2
          colorIndex={this.state.colorIndex}
          title={_kitchen_management[this.state.languageIndex]}
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

        {/* {this.state.showAlert ? (
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
        )} */}

        {this.state.showCustomConfirmation === true ? (
          <CustomConfirmation
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showCustomConfirmation: false });
            }}
            submitAction={() => {
              this.updateTransactionStatus();
              this.setState({ showCustomConfirmation: false });
            }}
            text={_kitchen_confirmation[this.state.languageIndex]}
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

        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1
          }}
        > */}
        {this.state.loading ? (<View />): (
        <View style={[ss.mainContent]}>
          <View style={{flex: 7.5}}>
            <MobileHeaderTabletSamping
              activeMenuIndex={7}
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              loginInformation={this.state.userInfo}
              backAction={() => {
                  
              }}
              hideLogin={false}
              salesType={this.state.selectedSalesType}
              popAction={() => Actions.pop()}
              />
          </View>
          <View style={[ss.leftSide, {flex: 92.5}]}>{this.renderList()}</View>
        </View>
        )}
        {/* </ScrollView> */}
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
    backgroundColor: "#EEE",
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
