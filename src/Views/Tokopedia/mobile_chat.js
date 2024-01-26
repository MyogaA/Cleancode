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
  BE_Kitchen,
  BE_TokopediaLocal
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

import { _detail_order, _time } from "../../Libraries/DictionaryHistory";

import { _sukses } from "../../Libraries/DictionaryPayment";
import DeviceInfo from "react-native-device-info";
import CustomConfirmation from "../../Components/MobileCustomConfirmation";
import {
  _chat_tokopedia,
  _kitchen_management,
  _ok_alert
} from "../../Libraries/DictionarySetting";
import { _status_simple } from "../../Libraries/DictionaryDrawer";
import Loading from "../../Components/MobileLoading";
import { _user } from "../../Libraries/DictionaryRekap";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 33;
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

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
      listDataDetail: [],

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
      tokopedia_store_id: this.props.tokopedia_store_id
        ? this.props.tokopedia_store_id
        : null,

      page: 1,
      maxPage: 1,
      pageDetail: 1,
      maxPageDetail: 1
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

    PrinterFunctions.GetTokopediaStoreID(val => {
      //console.log("dari login ", val);
      if (val) {
        this.setState({ tokopedia_store_id: val });
      }

      //this.setState({ loading: false });
    });

    setTimeout(() => {
      this.setState({ loading: true });
      this.getData();
      // this.getDataDetail();
      //this.testFetch(val);
    }, 250);

    //this.getSalesType();
  }

  componentWillUnmount() {}

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
      this.setState({ loading: true });

      this.getData();
    }
  }

  getData(search = this.state.searchKey) {
    const { userInfo, tokopedia_store_id } = this.state;
    const outlet_id = userInfo.gerai_id;

    let page = this.state.page;
    let per_page = 15;

    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=${search}`;

    let name_search = search !== "" ? `&name=${search}` : "";

    let uri = `${BE_TokopediaLocal}/message?outlet_id=${outlet_id}${name_search}&order=newest&page=${page}&per_page=${per_page}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27
    let resultFinal = [];
    console.log("getData chat uri ==> ", uri);

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
        // console.log("getData chat result ==> ", result.pagination);

        if (result.statusCode === 200) {
          let resultData = result.data;
          // console.log("getData ==> ", resultData);

          let tempData = this.state.listData;
          let dataCombi = [...tempData, ...resultData];

          this.setState({
            listData: page === 1 ? resultData : dataCombi,
            loading: false,
            maxPage: result.pagination.total_page,
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

  getDataDetail(msg_id) {
    const { userInfo, tokopedia_store_id } = this.state;
    const { selectedData } = this.state;
    const outlet_id = userInfo.gerai_id;

    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=${search}`;

    let page = this.state.pageDetail;
    let per_page = 25;

    // let name_search = search !== "" ? `&name=${search}` : "";

    // let msg_id = "2312989022";

    let uri = `${BE_TokopediaLocal}/message-detail?msg_id=${msg_id}&outlet_id=${outlet_id}&order=newest&page=${page}&per_page=${per_page}`;

    //gerai_id=1&retail_id=1&search=&page=1&date_start=2020-03-26&date_end=2020-03-27
    let resultFinal = [];
    console.log("getData chat detail uri ==> ", uri);

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
        console.log("getData chat detail result ==> ", result);

        if (result.statusCode === 200) {
          let resultData = result.data;
          console.log("getData detail ==> ", resultData);

          this.setState({
            //listTable: resultData,
            //listData: resultData,
            showDetail: true,
            loading: false,
            listDataDetail: resultData
            // tableInformation: tableInformation,
            //selectedTable: []
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

  handleLoadMore = () => {
    const { page, maxPage } = this.state;
    let next_page = page + 1;
    // console.log("handle load more next_page ==> ", next_page);
    // console.log("handle load more max_page ==> ", maxPage);

    if (next_page <= maxPage && !this.state.loading) {
      //console.log("handle load more ==> ", next_page);
      this.setState({ loading: true });
      this.setState({ page: next_page });
      setTimeout(() => {
        this.getData();
      }, 250);
    }
  };

  handleLoadMoreDetail = () => {
    const { pageDetail, maxPageDetail } = this.state;
    let next_page = pageDetail + 1;
    //console.log("handle load more next_page ==> ", next_page);
    //console.log("handle load more max_page ==> ", maxPage);

    if (next_page <= maxPageDetail) {
      //console.log("handle load more ==> ", next_page);
      this.setState({ pageDetail: next_page });
      setTimeout(() => {
        this.getDataDetail();
      }, 250);
    }
  };

  renderHeader(data, i) {
    let time = "";

    const { selectedData } = this.state;

    let whiteColor = WHITE;
    let blackColor = BLACK;

    // if (this.state.colorIndex === 9) {
    //   whiteColor = BLACK;
    //   blackColor = WHITE;
    // }

    time = moment(data.updatedAt).format("DD/MM/YYYY, HH:mm");

    const bgColor = [
      //MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      whiteColor,
      whiteColor
    ];
    const textColor = [
      //MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      blackColor,
      blackColor
    ];

    let colorIndex = 1;

    if (selectedData) {
      if (selectedData.id === data.id) {
        colorIndex = 0;
      } else {
        colorIndex = 1;
      }
    }

    const show = true;

    if (show) {
      return (
        <View
          style={{
            marginBottom: 15,
            width: "100%"
          }}
        >
          <Button
            onPress={() => {
              // this.changeSelection(data);
              this.setState({
                selectedData: data,
                loading: true
              });
              this.getDataDetail(data.id);
            }}
            style={[
              ss.box,
              {
                //minHeight: 100,
                marginTop: 0,
                padding: 15,
                marginBottom: 0,
                backgroundColor: bgColor[colorIndex],
                //flexDirection: "row",
                justifyContent: "center",
                borderRadius: 5,
                borderColor: "#D9D9D9",
                borderWidth: 1,
                zIndex: 2
              }
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingBottom: 10,
                borderBottomWidth: 1,
                //backgroundColor: "#BCA",
                borderColor: "rgba(0, 0, 0, 0.2)"
                //borderColor: "rgba(0, 0, 0, 0.2)"
              }}
            >
              <View style={{ width: "20%", alignItems: "flex-start" }}>
                <View style={{ borderRadius: 15, height: 45, width: 45 }}>
                  <Image
                    resizeMode={"stretch"}
                    style={{
                      // width: 100,
                      //   height: 100,
                      width: 45,
                      height: 45,
                      borderRadius: 10,
                      overflow: "hidden"
                      // resizeMode: "contain"
                    }}
                    source={{ uri: data.user_thumbnail }}
                  />
                </View>

                {/* <Image
                    resizeMethod="resize"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 15,
                      overflow: "hidden",
                      display: this.state.setting_light_mode ? "none" : "flex"
                      //alignSelf: "center"
                      //backgroundColor: "#888"
                    }}
                    resizeMode={"stretch"}
                    source={{ uri: data.user_thumbnail }}
                  /> */}

                {/* {data.user_thumbnail} */}
              </View>

              <View style={{ width: "50%", alignItems: "flex-start" }}>
                <View style={{ width: "75%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 11,
                        color: textColor[colorIndex],
                        alignSelf: "flex-start"
                      }
                    ]}
                  >
                    {_user[this.state.languageIndex]}
                  </Text>
                </View>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 10, color: textColor[colorIndex] }
                  ]}
                >
                  {data.user_name}
                </Text>
              </View>

              <View style={{ width: "30%", alignItems: "flex-end" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 11, color: textColor[colorIndex] }
                  ]}
                >
                  {_time[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 10, color: textColor[colorIndex] }
                  ]}
                >
                  {time}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingBottom: 0,
                paddingTop: 10
                //borderBottomWidth: 1,
                //backgroundColor: "#BCA",
                //borderColor: "rgba(0, 0, 0, 0.9)"
                //borderColor: "rgba(0, 0, 0, 0.2)"
              }}
            >
              <View style={{ width: "100%", alignItems: "flex-start" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 11, color: textColor[colorIndex] }
                  ]}
                >
                  {data.last_reply_msg}
                </Text>
              </View>
            </View>
          </Button>
          {/* <View
            style={{
              alignItems: "center",
              backgroundColor: "#E8E8E8",
              marginTop: -5,
              padding: 10,
              zIndex: 1,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 11, color: status_color[status_index] }
              ]}
            >
              {status_text}
            </Text>
          </View> */}
        </View>
      );
    }
  }

  renderDetail() {
    const { selectedData } = this.state;
    const show = true;

    if (show) {
      return (
        <View
          style={{
            width: "100%",
            marginBottom: 15,
          }}
        >
          <FlatList
            // onScroll={({ nativeEvent }) => {
            //   // console.log("HANDLE LOAD MOREEEE ===========");
            //   if (isCloseToBottom(nativeEvent)) {
            //     if (this.state.loading === false) {
            //       this.handleLoadMore();
            //     }
            //     //console.log("IS CLOSE TO BOTTOM");
            //   }
            // }}
            //ListHeaderComponent={this.renderSearch()}
            inverted
            showsVerticalScrollIndicator={false}
            data={this.state.listDataDetail}
            renderItem={({ item, index }) => {
              return this.renderDetailList(item, index);
            }}
            //ListFooterComponent={this._renderFooter}
            keyExtractor={(item, index) => {
              return "listHeader" + index.toString();
            }}
            //onRefresh={this._onRefresh}
            // onEndReached={()=> this.handleLoadMore()}
            // onEndReachedThreshold={0.5}
            //refreshing={refreshing}
          />
        </View>
      );
    }
  }

  renderDetailList(data, i) {
    let time = "";

    const { selectedData } = this.state;

    let whiteColor = WHITE;
    let blackColor = BLACK;

    // if (this.state.colorIndex === 9) {
    //   whiteColor = BLACK;
    //   blackColor = WHITE;
    // }

    //time = moment(data.createdAt).format("DD/MM/YYYY, HH:mm:ss");

    time = moment.unix(data.reply_time).format("DD/MM/YYYY, HH:mm:ss");

    const bgColor = [
      //MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      whiteColor,
      whiteColor
    ];
    const textColor = [
      //MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      blackColor,
      blackColor
    ];

    let colorIndex = 1;
    const show = true;

    if (show) {
      return (
        <View
          style={{
            margin: 15,
            marginBottom: 0,
            flex: 1
          }}
        >
          <View
            onPress={() => {
              // this.changeSelection(data);
            }}
            style={[
              ss.box,
              {
                //minHeight: 100,
                //marginTop: 0,
                //marginBottom: 0,
                backgroundColor: bgColor[colorIndex],
                //flexDirection: "row",
                justifyContent: "center",
                zIndex: 2
              }
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1
                // paddingBottom: 0,
                //borderBottomWidth: 1,
                //backgroundColor: "#BCA",
                //borderColor: "rgba(0, 0, 0, 0.9)"
                //borderColor: "rgba(0, 0, 0, 0.2)"
              }}
            >
              <View style={{ width: "100%", alignItems: "flex-start" }}>
                <View
                  style={{
                    width: "100%",
                    alignItems: data.role === "User" ? "flex-start" : "flex-end"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 11,
                        color: textColor[colorIndex]
                        // textAlign: data.role === "User" ? "left" : "right"
                      }
                    ]}
                  >
                    {data.sender_name} {"("}
                    {data.role}
                    {")"}
                    {time}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1
                // paddingBottom: 0,

                //borderBottomWidth: 1,
                //backgroundColor: "#BCA",
                //borderColor: "rgba(0, 0, 0, 0.9)"
                //borderColor: "rgba(0, 0, 0, 0.2)"
              }}
            >
              <View style={{ width: "100%", alignItems: "flex-start" }}>
                <View
                  style={{
                    alignItems:
                      data.role === "User" ? "flex-start" : "flex-end",
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      width: "75%",
                      padding: 15,
                      borderRadius: 5,
                      borderColor: "#D9D9D9",
                      borderWidth: 1
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 11,
                          color: textColor[colorIndex]
                          // textAlign: data.role === "User" ? "left" : "right"
                        }
                      ]}
                    >
                      {data.msg}
                    </Text>
                  </View>

                  {/* <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      { fontSize: 11, color: textColor[colorIndex] }
                    ]}
                  >
                    {data.msg}
                  </Text> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  renderList() {
    return (
      <View
        style={{
          flex: 1,
          // alignSelf: "center",
          // width: this.state.tablet ? "75%" : "100%",
          // justifyContent: "space-around"
          margin: 15
        }}
      >
        <FlatList
          onScroll={({ nativeEvent }) => {
            // console.log("HANDLE LOAD MOREEEE ===========");
            if (isCloseToBottom(nativeEvent)) {
              if (this.state.loading === false) {
                this.handleLoadMore();
              }
              //console.log("IS CLOSE TO BOTTOM");
            }
          }}
          //ListHeaderComponent={this.renderSearch()}
          showsVerticalScrollIndicator={false}
          data={this.state.listData}
          renderItem={({ item, index }) => {
            return this.renderHeader(item, index);
          }}
          //ListFooterComponent={this._renderFooter}
          keyExtractor={(item, index) => {
            return "listHeader" + index.toString();
          }}
          //onRefresh={this._onRefresh}
          // onEndReached={()=> this.handleLoadMore()}
          // onEndReachedThreshold={0.5}
          //refreshing={refreshing}
        />
      </View>
    );
  }

  renderDetailModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showDetail}
        onRequestClose={() => {
          this.setState({ showDetail: false, selectedData: null });
        }}
      >
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_chat_tokopedia[this.state.languageIndex]}
          notif={false}
          loginInformation={this.state.userInfo}
          hideLogin={true}
          menu={false}
          back={true}
        />

        <View
          style={{
            flex: 1,

            //display: this.state.showBill ? "flex" : "none",
            width: "100%",
            marginTop: 0,
            backgroundColor: "#FFF",
            //elevation: 3,
            zIndex: 3,
            borderRadius: 5
            //borderColor: "rgba(0, 0, 0, 0.4)",
            //borderWidth: 0.1
          }}
        >
          <View style={{ flex: 1 }}>{this.renderDetail()}</View>
        </View>
      </Modal>
    );
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
        {this.state.loading ? <Loading /> : <View />}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={_chat_tokopedia[this.state.languageIndex]}
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

        {this.state.showDetail ? this.renderDetailModal() : <View />}

        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1
          }}
        > */}
        <View style={[ss.mainContent]}>
          <View style={[ss.leftSide]}>{this.renderList()}</View>
        </View>
        {/* </ScrollView> */}
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
