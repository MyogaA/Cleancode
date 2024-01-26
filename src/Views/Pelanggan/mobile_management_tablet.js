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
import NetInfo from "@react-native-community/netinfo";
import MobileHeaderTabletV2 from "../../Components/MobileHeaderTabletV2";
import MobileHeaderTabletSamping from "../../Components/MobileHeaderTabletSamping";
import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";

import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/Dropdown";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Geolocation from "@react-native-community/geolocation";
// import Orientation from "react-native-orientation-locker";

import { Colors } from "react-native/Libraries/NewAppScreen";

import CustomAlert from "../../Components/CustomAlert";
import Loading from "../../Components/MobileLoading";
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
  GetCustomerAPI,
  EditUserAPI,
  RegisterAPI,
  CustomerAddPointAPI,
  CustomerCreateAPI,
  CustomerUpdateAPI,
  CustomerGetAPI,
  BE_Customer,
  BE_Payment_Method,
  BE_Send_Struk,
  BE_Customer_Point_History,
  BE_Transaction
} from "../../Constants";

import PrinterFunctions from "../../Libraries/PrinterFunctions";
import {
  _data_pelanggan,
  _nama,
  _email,
  _phone,
  _search,
  _total_transaksi,
  _jumlah_poin,
  _phone_long,
  _alamat,
  _catatan,
  _catatan_kosong,
  _catatan_extra,
  _cancel,
  _simpan,
  _ubah,
  _tambah,
  _kembali,
  _berhasil_tambah,
  _berhasil_delete,
  _berhasil_update,
  _gagal,
  _error_semua_field,
  _fill_1,
  _fill_2,
  _fill_3,
  _fill_4,
  _view,
  _informasi_kontak,
  _riwayat,
  _delete,
  _belum_ada_data_pelanggan,
  _hapus_pelanggan,
  _riwayat_point,
  _riwayat_short,
  _bank_account,
  _bank
} from "../../Libraries/DictionaryManagement";
import {
  _merchant,
  _payment_type,
  _status_1,
  _status_2,
  _status_3,
  _status_4,
  _status_5,
  _time,
  _total,
  _total_price,
  _transaction_id
} from "../../Libraries/DictionaryHistory";
import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";

import DeviceInfo from "react-native-device-info";
import PaymentSuccess from "../../Components/MobilePaymentSuccess";
import { _ok_alert, _yes } from "../../Libraries/DictionarySetting";
import { _description } from "../../Libraries/DictionaryHome";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default class MobileManagementTablet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTransaction: false,
      showPointHistory: false,
      showPaymentSuccess: true,
      showDeleteCustomerModal: false,
      tablet: DeviceInfo.isTablet(),
      currency: "IDR",
      showForm: false,
      modalShowCustomer: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      alertMessage: ["Password does not match"],
      showAlert: false,
      formBank: "",
      formBankAccount: "",
      formType: "add",
      formId: 0,
      formName: "",
      formEmail: "",
      formPhone: "",
      formAddress: "",
      formNotes: "",
      formPassword: "123123",
      searchKey: "",
      page: 1,
      maxPage: 1,
      notes: "",
      loading: true,
      refreshing: false,
      transactions_point: [],
      transactions: [
        {
          id: 1,
          receipt_id: "ABC",
          createdAt: new Date()
        },
        {
          id: 2,
          receipt_id: "BCA",
          createdAt: new Date()
        },
        {
          id: 3,
          receipt_id: "CBA",
          createdAt: new Date()
        },
        {
          id: 4,
          receipt_id: "ACB",
          createdAt: new Date()
        }
      ],
      // listCustomer: [],
      listCustomer: [],
      paymentMethod: [],
      selectedCustomer: null,
      action: _tambah[this.props.languageIndex ? this.props.languageIndex : 0], //Tambah atau Ubah,
      auth: this.props.auth ? this.props.auth : ""
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
    this.getListCustomer();
    this.getPaymentMethod();

    OfflineMenuFunctions.GetLastUpdate(val => {})
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
      this.getListCustomer();
    }
  }

  getPaymentMethod() {
    const uri = BE_Payment_Method;

    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;

        console.log("getPaymentMethod ==> ", resultData);

        this.setState({ paymentMethod: resultData });

        let cash = {};
        let wallet = [];
        let card = [];
        if (result.statusCode === 200) {
          OfflineMenuFunctions.SavePaymentType(resultData, val => {});
        }
      })
      .catch(_err => {});
  }

  getListCustomer(page = this.state.page) {
    this.setState({ loading: true });

    const gerai_id = this.state.userInfo.gerai_id;

    let search_string = "";
    if (this.state.searchKey !== "") {
      search_string = `&name=${this.state.searchKey}`;
    }

    const uri = `${BE_Customer}?page=${page}${search_string}`;
    console.log("getListCustomer URI ==> ", uri);
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
        console.log("responseJSON ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          if (page === 1) {
            this.setState({
              listCustomer: resultData,
              maxPage: result.pagination.total_page,
              refreshing: false,
              loading: false
            });
          } else {
            let tempData = this.state.listCustomer;
            let dataCombi = [...tempData, ...resultData];
            console.log("temp dataCombi ", page, " ==> ", dataCombi);

            this.setState({
              listCustomer: dataCombi,
              refreshing: false,
              loading: false,
              maxPage: result.pagination.total_page
              //maxPage: result.last_page
            });
          }
        } else {
          this.setState({
            refreshing: false,
            loading: false
            //maxPage: result.last_page
          });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({
          refreshing: false,
          loading: false
          //maxPage: result.last_page
        });
      });
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        console.log("handle Load More page ==> ", this.state.page);
        console.log("handle Load More maxPage ==> ", this.state.maxPage);
        if (this.state.maxPage + 1 > this.state.page) {
          this.getListCustomer();
        }
      }
    );
  };

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.getListCustomer();
      }
    );
  };

  showCustomerOld(data) {
    //console.log("showCustomer ==> ", data)
    this.setState({ selectedCustomer: data, modalShowCustomer: true });
  }

  showCustomer(data) {
    this.setState({ loading: true });
    const customer_id = data.id;

    const uri = `${BE_Customer}/${customer_id}`;
    console.log("getListCustomer URI ==> ", uri);
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
        console.log("responseJSON Show Customer ==> ", result);
        if (result.statusCode === 200) {
          let resultData = result.data;

          //this.setState({});
          this.getCustomerTransaction(customer_id);
          this.getCustomerPointHistory(customer_id);

          this.setState({
            selectedCustomer: data,
            modalShowCustomer: true,
            loading: false,
            //transactions: resultData.Transactions.reverse()
          });
        } else {
          this.setState({
            //refreshing: false,
            loading: false

            //maxPage: result.last_page
          });
          this.setState({
            selectedCustomer: data,
            modalShowCustomer: true,
            loading: false,
            //transactions: []
          });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({
          selectedCustomer: data,
          modalShowCustomer: true,
          loading: false,
          transactions: []
        });
      });
  }

  getCustomerTransaction(customer_id, page = 1) {
    const { userInfo, selectedCustomer } = this.state;

    // this.setState({ loading: true });
    const outlet_id = userInfo.gerai_id;
    const business_id = userInfo.retail_id;
    //const customer_id = selectedCustomer.id;

    let status = "";
    //status = "&status=done";
    //status = "&status=refund";
    let per_page = 20;
    let uri = `${BE_Transaction}lite?order=newest&customer_id=${customer_id}&outlet_id=${outlet_id}&business_id=${business_id}&page=${page}&per_page=${per_page}${status}`;

    //let uri = `${BE_Transaction}?order=newest&outlet_id=${outlet_id}&business_id=${business_id}&page=1&per_page=5&date_start=${date_start}&date_end=${date_end}${status}`;

    console.log("getCustomerTransaction BE ==> ", uri);

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
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
            const result = responseJson;
            const statusCode = responseJson.statusCode;

            if (statusCode === 200) {
              const resultData = result;

              const result_all = resultData.data;
              const pagination = resultData.pagination;
              let result_filtered = [];
              console.log("result getCustomerTransaction ===> ", result_all);
              result_filtered = result_all;
              // if (filterPayment === 0) {
              //   result_filtered = result_all;
              // } else {
              //   if (result_all && result_all.length > 0) {
              //     result_all.map((v, i) => {
              //       const payment_method_id = v.Payment.payment_method_id
              //         ? v.Payment.payment_method_id
              //         : 0;

              //       if (payment_method_id === filterPayment) {
              //         result_filtered.push(v);
              //       }
              //     });
              //   }
              // }

              let result_filtered_final = result_all;

              //name.toLowerCase().includes(searchKeyRegion.toLowerCase()) ||

              // result_filtered.map((v, i) => {
              //   if (
              //     v.status !== "new" &&
              //     v.status !== "pending" &&
              //     v.status !== "processing" &&
              //     v.status !== "cancelled"
              //   ) {
              //     if (v.receipt_id.includes("-SPT")) {
              //       if (v.Transaction_Items.length > 0) {
              //         result_filtered_final.push(v);
              //       }
              //     } else {
              //       result_filtered_final.push(v);
              //     }
              //   }
              // });
              this.setState({
                transactions: result_all

                // loading: false,
                // startDate: start_date,
                // endDate: date_end,
                // page: page,
                // maxPage: pagination.total_page
              });

              if (this.state.page === 1) {
              } else {
                // let tempData = this.state.listHistory;
                // let dataCombi = [...tempData, ...result_filtered_final];
                // this.setState({
                //   listHistory: dataCombi,
                //   loading: false,
                //   startDate: start_date,
                //   endDate: date_end,
                //   page: page,
                //   maxPage: pagination.total_page
                // });
              }
            } else {
              this.setState({
                transactions: []
              });
            }
          })
          .catch(_err => {
            console.log("err ==> ", _err);
            this.setState({ loading: false });
          });
      } else {
        // No INTERNET
      }
    });
  }

  getCustomerPointHistory(customer_id, page = 1) {
    const { userInfo, selectedCustomer } = this.state;

    // this.setState({ loading: true });
    const outlet_id = userInfo.gerai_id;
    const business_id = userInfo.retail_id;
    //const customer_id = selectedCustomer.id;

    let status = "";
    //status = "&status=done";
    //status = "&status=refund";
    let per_page = 20;
    let uri = `${BE_Customer_Point_History}?order=newest&customer_id=${customer_id}&outlet_id=${outlet_id}&business_id=${business_id}&page=${page}&per_page=${per_page}${status}`;

    //let uri = `${BE_Transaction}?order=newest&outlet_id=${outlet_id}&business_id=${business_id}&page=1&per_page=5&date_start=${date_start}&date_end=${date_end}${status}`;

    console.log("getCustomerPointHistory BE ==> ", uri);

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
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
            const result = responseJson;
            const statusCode = responseJson.statusCode;

            if (statusCode === 200) {
              const resultData = result;

              const result_all = resultData.data;
              const pagination = resultData.pagination;
              let result_filtered = [];
              console.log("result getCustomerPointHistory ===> ", result_all);
              result_filtered = result_all;
              // if (filterPayment === 0) {
              //   result_filtered = result_all;
              // } else {
              //   if (result_all && result_all.length > 0) {
              //     result_all.map((v, i) => {
              //       const payment_method_id = v.Payment.payment_method_id
              //         ? v.Payment.payment_method_id
              //         : 0;

              //       if (payment_method_id === filterPayment) {
              //         result_filtered.push(v);
              //       }
              //     });
              //   }
              // }

              let result_filtered_final = result_all;

              //name.toLowerCase().includes(searchKeyRegion.toLowerCase()) ||

              // result_filtered.map((v, i) => {
              //   if (
              //     v.status !== "new" &&
              //     v.status !== "pending" &&
              //     v.status !== "processing" &&
              //     v.status !== "cancelled"
              //   ) {
              //     if (v.receipt_id.includes("-SPT")) {
              //       if (v.Transaction_Items.length > 0) {
              //         result_filtered_final.push(v);
              //       }
              //     } else {
              //       result_filtered_final.push(v);
              //     }
              //   }
              // });
              this.setState({
                transactions_point: result_all

                // loading: false,
                // startDate: start_date,
                // endDate: date_end,
                // page: page,
                // maxPage: pagination.total_page
              });

              if (this.state.page === 1) {
              } else {
                // let tempData = this.state.listHistory;
                // let dataCombi = [...tempData, ...result_filtered_final];
                // this.setState({
                //   listHistory: dataCombi,
                //   loading: false,
                //   startDate: start_date,
                //   endDate: date_end,
                //   page: page,
                //   maxPage: pagination.total_page
                // });
              }
            } else {
              this.setState({
                transactions_point: []
              });
            }
          })
          .catch(_err => {
            console.log("err ==> ", _err);
            this.setState({ loading: false });
          });
      } else {
        // No INTERNET
      }
    });
  }

  openForm() {
    this.setState({
      showForm: true,
      formId: 0,
      formName: "",
      formBank: "",
      formBankAccount: "",
      formEmail: "",
      formPhone: "",
      formAddress: "",
      formNotes: "",
      action: _tambah[this.state.languageIndex],
      formType: "add",
      modalShowCustomer: false,
      selectedCustomer: null
    });
  }

  editCustomer() {
    const {
      id,
      name,
      email,
      phone_number,
      address,
      notes,
      no_rekening,
      bank
    } = this.state.selectedCustomer;

    this.setState({
      showForm: true,
      modalShowCustomer: false,
      formId: id,
      formName: name,
      formEmail: email,
      formBank: bank,
      formBankAccount: no_rekening,
      formPhone: phone_number,
      formAddress: address,
      formNotes: notes,
      action: _ubah[this.state.languageIndex],
      formType: "edit"
    });
  }

  closeForm() {
    let edit = false;
    if (this.state.selectedCustomer) {
      edit = true;
    }
    this.setState({
      showForm: false,
      modalShowCustomer: edit,
      formId: 0,
      formName: "",
      formBank: "",
      formBankAccount: "",
      formEmail: "",
      formPhone: "",
      formAddress: "",
      formNotes: "",
      action: _tambah[this.state.languageIndex],
      formType: "add"
    });
  }

  saveData(type = "add") {
    const {
      formName,
      formEmail,
      formPhone,
      formAddress,
      formNotes,
      formPassword
    } = this.state;
    let alertMessage = [];
    let error = false;

    if (formName === "") {
      error = true;
      alertMessage.push(_fill_1[this.state.languageIndex]);
    }

    // if (formEmail === "") {
    //   error = true;
    //   alertMessage.push(_fill_2[this.state.languageIndex]);
    // }

    if (formPhone === "") {
      error = true;
      alertMessage.push(_fill_3[this.state.languageIndex]);
    }

    if (type === "add") {
      if (formPassword === "") {
        error = true;
        alertMessage.push(_fill_4[this.state.languageIndex]);
      }
    }

    if (error === false) {
      //this.closeForm();
      console.log("saveData ==> ", this.state.selectedCustomer);
      if (type === "edit") {
        this.updateDataUser();
      } else {
        this.insertDataUser();
      }
    } else {
      console.log("ERROR ? ==> ", alertMessage);
      this.setState({
        loading: false,
        showAlert: true,
        alertMessage: alertMessage
      });
    }
  }

  updateDataUser() {
    const uri = `${BE_Customer}/${this.state.selectedCustomer.id}`;
    this.setState({ loading: true });

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        //id: this.state.selectedCustomer.id,
        name: this.state.formName,
        notes: this.state.formNotes,
        address: this.state.formAddress,
        phone_number: this.state.formPhone,
        points: this.state.selectedCustomer.points,
        email: this.state.formEmail,
        bank: this.state.formBank,
        no_rekening: this.state.formBankAccount

        //image: image,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        console.log("updateDataUser ==>", result);
        let alertMessage = [result.message];

        if (responseJson.statusCode === 200) {
          alertMessage = [_berhasil_update[this.state.languageIndex]];
        } else {
          alertMessage = [_gagal[this.state.languageIndex]];
        }
        this.setState({
          selectedCustomer: resultData,
          showAlert: true,
          alertMessage: alertMessage,
          loading: false
        }),
          () => {
            //this.forceUpdate();
          };
        this.getListCustomer(1);
        this.closeForm();
        //this.getListCustomer(1);
        //console.log("clockInFormat ==> ", clockIn);
        //this.setState({ listUser: resultData });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  insertDataUser() {
    const uri = BE_Customer;

    const gerai_id = this.state.userInfo.gerai_id;

    this.setState({ loading: true });

    // let body = {

    //   name: this.state.formName,
    //   phone_number: this.state.formPhone,
    //   notes: this.state.formNotes,
    //   address: this.state.formAddress,
    //   points: 0
    // };
    // if (this.this.state.formEmail !== "")
    // {
    //   body.email = this.state.formEmail,
    // }
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        //id: this.state.selectedCustomer.id,
        //gerai_id: gerai_id,
        email: this.state.formEmail.length > 1 ? this.state.formEmail : "",
        name: this.state.formName,
        phone_number: this.state.formPhone,
        notes: this.state.formNotes,
        address: this.state.formAddress,
        points: 0,
        bank: this.state.formBank,
        no_rekening: this.state.formBankAccount
        //password: this.state.formPassword
        //image: image,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        console.log("responseJson ==>", responseJson);

        console.log("insertDataUser ==>", resultData);

        let alertMessage = [result.message];

        if (responseJson.statusCode === 201) {
          alertMessage = [_berhasil_tambah[this.state.languageIndex]];
        } else {
          alertMessage = [_gagal[this.state.languageIndex]];
          alertMessage.push(result.message);
        }

        this.setState({
          loading: false,
          showAlert: true,
          alertMessage: alertMessage
        }),
          () => {
            //this.forceUpdate();
          };
        this.getListCustomer(1);
        this.closeForm();
        //this.setState({ selectedCustomer: resultData });
        //this.getListCustomer(1);
        //console.log("clockInFormat ==> ", clockIn);
        //this.setState({ listUser: resultData });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  closeViewCustomer() {
    this.setState({
      modalShowCustomer: false,
      selectedCustomer: null,
      action: "Tambah",
      formId: 0,
      formName: "",
      formBank: "",
      formBankAccount: "",
      formEmail: "",
      formPhone: "",
      formAddress: "",
      formNotes: ""
    });
  }

  renderForm() {
    let { action } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        {/* <Modal
        animationType="slide"
        transparent={true}
        //visible={this.state.showForm}
        visible={this.state.showForm}
        onRequestClose={() => {
          //this.setState({ modalShowCustomer: false, selectedCustomer: null });
          this.closeForm();
        }}
      > */}
        <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
          <View
            style={{
              alignSelf: "center",
              flex: 1,
              backgroundColor: WHITE,
              flexDirection: "column",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              marginTop: -15,
              width: "100%"
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                //height: 50,
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  marginTop: 20,
                  //backgroundColor: "#BCA",
                  width: "100%",
                  padding: 15,
                  //borderRadius: 15,
                  //elevation: 1,
                  //backgroundColor: 'rgba(6, 78, 162, 0.9)',
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 20, color: BLACK }
                  ]}
                >
                  {action} {_data_pelanggan[this.state.languageIndex]}
                </Text>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {/* Lengkapi detail pesanan! */}
                  {/* {this.state.currency}{' '}
              {this.state.productPrice * this.state.selectedQuantity} */}
                </Text>
              </View>
            </View>
            {/* Header Form */}
            {/* Kotak Form */}
            <View
              style={{
                margin: 15,
                marginTop: 0,
                marginBottom: 0,
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.61)",
                borderRadius: 0
              }}
            />
            <View
              style={{
                flex: 1,
                marginTop: 0,
                width: "100%",
                borderRadius: 0
              }}
            >
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ marginTop: 0, padding: 15 }}>
                  <View
                    style={{
                      flexDirection: "column",
                      //backgroundColor: "#BCA",
                      flex: 1,
                      width: "100%",
                      minHeight: 100
                      //justifyContent: "space-between"
                    }}
                  >
                    {/* Nama Pelanggan */}
                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View style={ss.formInput}>
                        <TextInput
                          style={{
                            color: BLACK,
                            paddingTop: 5,
                            fontSize: 15,
                            fontFamily: "DMSans-Bold"
                          }}
                          //multiline={true}
                          //numberOfLines={3}
                          type="text"
                          ref={q => (this._name = q)}
                          onSubmitEditing={() => {
                            //this._email.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ formName: v })}
                          value={this.state.formName}
                          placeholder={_nama[this.state.languageIndex]}
                          placeholderTextColor="#555"
                        />
                      </View>
                    </View>
                    {/* Nama Pelanggan End */}
                    {/* Email */}
                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        marginTop: 15,
                        width: "100%"
                      }}
                    >
                      <View style={ss.formInput}>
                        <TextInput
                          style={{
                            color: BLACK,
                            paddingTop: 5,
                            fontSize: 15,
                            fontFamily: "DMSans-Bold"
                          }}
                          //multiline={true}
                          //numberOfLines={3}
                          type="text"
                          ref={q => (this._email = q)}
                          onSubmitEditing={() => {
                            //this._phone.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ formEmail: v })}
                          keyboardType="email-address"
                          //keyboardType={"phone-pad"}
                          value={this.state.formEmail}
                          placeholder={_email[this.state.languageIndex]}
                          placeholderTextColor="#555"
                        />
                      </View>
                    </View>
                    {/* Email End */}
                    {/* Phone */}
                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        marginTop: 15,
                        width: "100%"
                      }}
                    >
                      <View style={ss.formInput}>
                        <TextInput
                          style={{
                            color: BLACK,
                            paddingTop: 5,
                            fontSize: 15,
                            fontFamily: "DMSans-Bold"
                          }}
                          //multiline={true}
                          //numberOfLines={3}
                          type="text"
                          ref={q => (this._phone = q)}
                          onSubmitEditing={() => {
                            //this._address.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ formPhone: v })}
                          //keyboardType="email-address"
                          keyboardType={"phone-pad"}
                          value={this.state.formPhone}
                          placeholder={_phone_long[this.state.languageIndex]}
                          placeholderTextColor="#555"
                        />
                      </View>
                    </View>
                    {/* Phone End */}
                    {/* Bank */}
                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        marginTop: 15,
                        width: "100%",
                        display: "none"
                      }}
                    >
                      <View style={ss.formInput}>
                        <TextInput
                          style={{
                            color: BLACK,
                            paddingTop: 5,
                            fontSize: 15,
                            fontFamily: "DMSans-Bold"
                          }}
                          //multiline={true}
                          //numberOfLines={3}
                          type="text"
                          ref={q => (this._phone = q)}
                          onSubmitEditing={() => {
                            //this._address.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ formBank: v })}
                          //keyboardType="email-address"
                          // keyboardType={"phone-pad"}
                          value={this.state.formBank}
                          placeholder={_bank[this.state.languageIndex]}
                          placeholderTextColor="#555"
                        />
                      </View>
                    </View>
                    {/* Bank End */}
                    {/* Bank Account*/}
                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        marginTop: 15,
                        width: "100%",
                        display: "none"
                      }}
                    >
                      <View style={ss.formInput}>
                        <TextInput
                          style={{
                            color: BLACK,
                            paddingTop: 5,
                            fontSize: 15,
                            fontFamily: "DMSans-Bold"
                          }}
                          //multiline={true}
                          //numberOfLines={3}
                          type="text"
                          ref={q => (this._bankacc = q)}
                          onSubmitEditing={() => {
                            //this._address.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ formBankAccount: v })}
                          //keyboardType="email-address"
                          keyboardType={"phone-pad"}
                          value={this.state.formBankAccount}
                          placeholder={_bank_account[this.state.languageIndex]}
                          placeholderTextColor="#555"
                        />
                      </View>
                    </View>
                    {/* Bank Account End */}
                    {/* Alamat */}
                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        marginTop: 15,
                        width: "100%"
                      }}
                    >
                      <View style={[ss.formInput]}>
                        <ScrollView
                          style={{
                            width: "100%",
                            marginTop: 5,
                            minHeight: 100,
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
                              fontSize: 15,
                              fontFamily: "DMSans-Bold"
                            }}
                            multiline={true}
                            //numberOfLines={3}
                            type="text"
                            ref={q => (this._address = q)}
                            onSubmitEditing={() => {
                              //this._notes.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v =>
                              this.setState({ formAddress: v })
                            }
                            //keyboardType="email-address"
                            //keyboardType={"phone-pad"}
                            value={this.state.formAddress}
                            placeholder={_alamat[this.state.languageIndex]}
                            placeholderTextColor="#555"
                          />
                        </ScrollView>
                      </View>
                    </View>
                    {/* Alamat End */}
                    {/* Catatan */}
                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        marginTop: 15,
                        width: "100%"
                      }}
                    >
                      <View style={[ss.formInput]}>
                        <ScrollView
                          style={{
                            width: "100%",
                            marginTop: 5,
                            minHeight: 100,
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
                              fontSize: 15,
                              fontFamily: "DMSans-Bold"
                            }}
                            multiline={true}
                            //numberOfLines={3}
                            type="text"
                            ref={q => (this._notes = q)}
                            onSubmitEditing={() => {
                              //this._notes.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v => this.setState({ formNotes: v })}
                            //keyboardType="email-address"
                            //keyboardType={"phone-pad"}
                            value={this.state.formNotes}
                            placeholder={_catatan[this.state.languageIndex]}
                            placeholderTextColor="#555"
                          />
                        </ScrollView>
                      </View>
                    </View>
                    {/* Catatan End */}
                  </View>
                  {/* additionalnya */}
                </View>
              </ScrollView>
              <View style={{ padding: 15, paddingTop: 1 }}>
                <Button
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    //this.closeForm();
                    this.saveData(this.state.formType);
                  }}
                  style={{
                    padding: 15,
                    width: "100%",
                    borderRadius: 25,
                    elevation: 2,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center"
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 17,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {_simpan[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
        {/* </Modal> */}
      </ScrollView>
    );
  }

  renderListCustomer() {
    return (
      <View style={[ss.box, { backgroundColor: WHITE, margin: 0, flex: 1 }]}>
        {/* Header list */}

        {/* Header end */}
        {/* Data Demo */}
        {/* {this.renderDataDemo()} */}
        <FlatList
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (this.state.loading === false) {
                this.handleLoadMore();
              }
              //console.log("IS CLOSE TO BOTTOM");
            }
          }}
          //ListHeaderComponent={this.renderSearch()}
          showsVerticalScrollIndicator={false}
          data={this.state.listCustomer}
          renderItem={({ item, index }) => {
            return this.renderDataCustomer(item, index);
          }}
          //ListFooterComponent={this._renderFooter}
          keyExtractor={(item, index) => {
            return "DataCustomer" + index.toString();
          }}
          onRefresh={this._onRefresh}
          //onEndReached={() => this.handleLoadMore()}
          // onEndReached={() => console.log("end REACHED???")}
          // onEndReachedThreshold={0.5}
          refreshing={this.state.refreshing}
        />

        {this.state.listCustomer.length < 1 ? this.renderNoData() : <View />}
      </View>
    );
  }

  renderDataCustomer(data, i) {
    const { selectedCustomer } = this.state;

    const bgColor = [
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#F7F7F7"
      //whiteColor
    ];



    const textColor = [MAIN_TEXT_COLOR_SELECT(this.state.colorIndex), "#000"];

    let colorIndex = 1;

    if (selectedCustomer) {
      if (selectedCustomer.id === data.id) {
        colorIndex = 0;
      } else {
        colorIndex = 1;
      }
    }

    return (
      <Button
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({ formType: "add", showForm: false });
          this.showCustomer(data);
        }}
        style={{
          //flex: 1,
          //marginTop: 10,
          //marginBottom: 5,
          margin: 5,
          padding: 15,
          //height: 75,
          alignContent: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          borderColor: "#C8C7CC",
          borderWidth: 1,
          borderRadius: 15,
        
          backgroundColor: bgColor[colorIndex]
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            alignContent: "center",
            justifyContent: "center",
            width: "25%"
            //marginLeft: 15
          }}
        >
          <View style={{borderRadius: 75, height: 75, width: 75, 
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex), 
            alignContent:"center", alignItems:"center", justifyContent:"center"}}>
            <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 24, color: WHITE, textAlign:"center" }
                ]}
              >
                KT
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            alignContent: "center",
            justifyContent: "center",
            width: "50%"
            //marginLeft: 15
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {/* <View style={{ marginRight: 5 }}>
              <MaterialIcons
                style={{
                  color: textColor[colorIndex]
                }}
                name="account-box"
                size={36}
                //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
                //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
              />
            </View> */}
            <View style={{}}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 18, color: textColor[colorIndex] }
                ]}
              >
                {data.name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            {/* <View style={{ marginRight: 5 }}>
              <MaterialIcons
                style={{
                  color: textColor[colorIndex]
                }}
                name="contact-mail"
                size={15}
                //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
                //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
              />
            </View> */}
            <View style={{}}>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 18, color: textColor[colorIndex] }
                ]}
              >
                {data.email}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", flex: 1 }}>
              {/* <View style={{ marginRight: 5 }}>
                <MaterialIcons
                  style={{
                    color: textColor[colorIndex]
                  }}
                  name="contact-phone"
                  size={15}
                  //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
                  //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                />
              </View> */}
              <View style={{}}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 18, color: textColor[colorIndex] }
                  ]}
                >
                  {data.phone_number}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", flex: 1, display: "none" }}>
              {/* <View style={{ marginRight: 5 }}>
                <FontAwesome5
                  style={{
                    color: textColor[colorIndex]
                  }}
                  name="coins"
                  size={15}
                  //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
                  //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                />
              </View> */}
              <View style={{display: "none"}}>
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 24, color: textColor[colorIndex] }
                  ]}
                >
                  {data.points}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            alignContent: "center",
            justifyContent: "center",
            width: "25%",
            marginRight: 15
          }}
        >
          <FontAwesome5
            style={{
              color: textColor[colorIndex]
            }}
            name="pencil-alt"
            size={30}
            //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
            //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
            />
        </View>
      </Button>
    );
  }

  renderNoData() {
    return (
      <View
        style={{
          flex: 999,
          //backgroundColor: "#BCA",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 125,
            height: 125,
            borderRadius: 999,
            //backgroundColor: "#C4C4C4",
            marginRight: 20,
            //borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 20,
            //zIndex: 2,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MaterialIcons
            style={{
              color: WHITE,
              width: 125,
              height: 125,
              backgroundColor: "#C4C4C4",
              zIndex: 1,
              borderRadius: 999
            }}
            name="people"
            size={125}
            //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
            //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          />
          <View
            style={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: 999,
              borderColor: "#C4C4C4",
              borderWidth: 10,
              backgroundColor: "transparent",
              zIndex: 2
            }}
          />
        </View>
        <Text
          style={[
            MainStyle.robotoNormal,
            { fontSize: 18, color: BLACK, marginTop: 15 }
          ]}
        >
          {_belum_ada_data_pelanggan[this.state.languageIndex]}
        </Text>
      </View>
    );
  }

  renderSearch() {
    return (
      <View
        style={[
          ss.box,
          {
            elevation: 0,
            backgroundColor: WHITE
          }
        ]}
      >
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              margin: 15,
              backgroundColor: "#F7F7F7",
              borderRadius: 10,
              elevation: 0,
              padding: 10
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
              <View
                style={{
                  width: "90%"
                }}
              >
                <TextInput
                  style={{
                    //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backgroundColor: "transparent",
                    color: "#BEC2CE",
                    paddingTop: 5,
                    paddingBottom: 10,
                    marginBottom: -10,
                    //marginLeft: '5%',
                    //marginRight: 5,
                    height: 40,
                    fontSize: 12,
                    fontFamily: "Roboto-Regular"
                  }}
                  type="text"
                  ref={q => {
                    this.TextInputSearch = q;
                  }}
                  onSubmitEditing={() => {
                    this.getListCustomer(1);
                    // this.setState({viewSearch: false});
                  }}
                  //onChangeText={(q)=>this._accountUpdate('username',q)}
                  onChangeText={v => this.setState({ searchKey: v })}
                  value={this.state.searchKey}
                  placeholder={_search[this.state.languageIndex]}
                  placeholderTextColor={BLACK}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "#C8C7CC",
            marginLeft: 15,
            marginRight: 15
          }}
        />
        {/* <Button
            onPress={() => {
              this.openForm();
            }}
            style={{
              padding: 5,
              margin: 5,
              backgroundColor: WHITE,
              borderRadius: 5,
              width: "25%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color: BLACK
                  //marginTop: 5
                }
              ]}
            >
              New
            </Text>
          </Button> */}
      </View>
    );
  }

  deleteCustomer() {
    const { selectedCustomer } = this.state;
    console.log("Delete Customer selectedCustomer ===> ", selectedCustomer);

    const id = selectedCustomer.id;

    const uri = `${BE_Customer}/${id}`;
    this.setState({ loading: true });

    fetch(uri, {
      method: "DELETE",
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
        //let resultData = result.data;
        console.log("Delete ==>", result);
        let alertMessage = [result.message];

        if (responseJson.statusCode === 200) {
          alertMessage = [_berhasil_delete[this.state.languageIndex]];
        } else {
          alertMessage = [_gagal[this.state.languageIndex]];
        }
        this.setState({
          //selectedCustomer: resultData,
          showAlert: true,
          alertMessage: alertMessage,
          loading: false
        }),
          () => {
            //this.forceUpdate();
          };
        this.closeViewCustomer();
        this.getListCustomer(1);
        //this.closeForm();
        //this.getListCustomer(1);
        //console.log("clockInFormat ==> ", clockIn);
        //this.setState({ listUser: resultData });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        this.setState({
          //selectedCustomer: resultData,
          loading: false
        });
      });
  }

  renderModalDeleteCustomer() {
    const { languageIndex } = this.state;
    let closeText = _kembali[this.state.languageIndex];
    let submitText = _yes[this.state.languageIndex];

    let clearText = _hapus_pelanggan[this.state.languageIndex];

    let { width, height } = Dimensions.get("window");

    const tablet = DeviceInfo.isTablet();

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showDeleteCustomerModal}
        onRequestClose={() => {
          this.setState({ showDeleteCustomerModal: false });
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: tablet ? (width - 40) / 2 : width - 40,
              minHeight: height * 0.2,
              //maxHeight: height * 0.6,
              backgroundColor: WHITE,
              borderRadius: 10,
              marginLeft: 20,
              marginRight: 20
              //marginTop: height * 0.25,
              //marginBottom: height * 0.25,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                marginTop: 20,
                marginBottom: 20
                //backgroundColor:'#BCA'
              }}
            >
              <View
                style={{
                  //flex:1,
                  marginTop: 30,
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 10,
                  justifyContent: "center",
                  alignItems: "center"
                  //height: '100%',
                  //backgroundColor:'#555'
                }}
              >
                <View
                  style={{
                    //justifyContent: 'center',
                    //alignItems: 'center',
                    //flex:1,
                    //backgroundColor:'#999',
                    width: "95%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 0,
                    marginBottom: 5
                  }}
                >
                  <Text
                    style={
                      ([MainStyle.robotoNormalBold],
                      {
                        fontSize: 14,
                        //alignSelf : "center"
                        textAlign: "center"
                      })
                    }
                  >
                    {clearText}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "90%",
                  //flex: 1,
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //padding: 15,
                  marginBottom: 0
                  //backgroundColor: "#ABC"
                }}
              >
                <Button
                  style={{ width: "45%", padding: 15 }}
                  onPress={() => {
                    this.setState({ showDeleteCustomerModal: false });
                  }}
                >
                  <View
                    style={{
                      minHeight: 25,
                      minWidth: 75,
                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.props.colorIndex
                      ),
                      borderRadius: 10
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 12,
                          color: WHITE,
                          marginBottom: 5,
                          marginTop: 5,
                          marginLeft: 10,
                          marginRight: 10,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {closeText}
                    </Text>
                  </View>
                </Button>
                <Button
                  style={{ width: "45%", padding: 15 }}
                  onPress={() => {
                    this.setState({ showDeleteCustomerModal: false });
                    this.deleteCustomer();
                  }}
                >
                  <View
                    style={{
                      minHeight: 25,
                      minWidth: 75,

                      backgroundColor: MAIN_THEME_COLOR_SELECT(
                        this.props.colorIndex
                      ),
                      borderRadius: 10
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 12,
                          color: WHITE,
                          marginBottom: 5,
                          marginTop: 5,
                          marginLeft: 10,
                          marginRight: 10,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {submitText}
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderViewCustomer() {
    const { selectedCustomer } = this.state;
    let total = selectedCustomer.total_transaction
      ? selectedCustomer.total_transaction
      : 0;
    let point = selectedCustomer.points ? selectedCustomer.points : 0;

    return (
      <ScrollView style={{ flex: 1 }}>
        {/* // <Modal
      //   animationType="slide"
      //   transparent={true}
      //   visible={this.state.modalShowCustomer}
      //   onRequestClose={() => {
      //     //this.setState({ modalShowCustomer: false, selectedCustomer: null });
      //     this.closeViewCustomer();
      //   }}
      // > */}
        <MobileHeader
          bgColor={WHITE}
          textColor={BLACK}
          border={true}
          colorIndex={this.state.colorIndex}
          title={selectedCustomer.name}
          notif={false}
          hideLogin={true}
          loginInformation={this.state.userInfo}
          menu={false}
          // back={true}
          // backAction={() => {
          //   this.closeViewCustomer();
          // }}
          deleteView={true}
          deleteText={_delete[this.state.languageIndex]}
          deleteAction={() => {
            this.setState({ showDeleteCustomerModal: true });
            //this.deleteCustomer();
          }}
        />
        {this.renderModalTransaction()}
        {this.renderModalPointHistory()}
        {this.renderModalDeleteCustomer()}
        <View
          style={[ss.box, { flex: 1, backgroundColor: WHITE, elevation: 0 }]}
        >
          <View
            style={[
              ss.box,
              {
                elevation: 0,
                flex: 1,
                margin: 0,
                backgroundColor: "transparent",
                //elevation: 2,
                padding: 15,
                paddingTop: 0,
                paddingBottom: 0
                //paddingBottom: 100
              }
            ]}
          >
            {/* Foto dan point */}
            {/* Data pelanggan */}
            <View
              style={{
                //backgroundColor: "#BCA",
                //flex: 1,
                marginTop: 2,
                marginLeft: 5,
                marginRight: 5,
                width: "100%",
                alignSelf: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%"
                  //
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 18,
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                        marginTop: 2
                      }
                    ]}
                  >
                    {_informasi_kontak[this.state.languageIndex]}
                  </Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    alignContent: "flex-end",
                    alignItems: "flex-end"
                  }}
                >
                  <Button
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.editCustomer();
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 18,
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                          marginTop: 2
                        }
                      ]}
                    >
                      {_ubah[this.state.languageIndex]}
                    </Text>
                  </Button>
                </View>
              </View>

              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 16, color: BLACK, marginTop: 2 }
                ]}
              >
                {selectedCustomer.email}
              </Text>

              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 16, color: BLACK, marginTop: 2 }
                ]}
              >
                {selectedCustomer.phone_number}
              </Text>
              {/* {selectedCustomer.bank ? (
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 16, color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex), marginTop: 2 }
                  ]}
                >
                  {_bank[this.state.languageIndex]}
                </Text>
              ) : (
                <View />
              )}


              {selectedCustomer.bank ? (
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 16, color: BLACK, marginTop: 2 }
                  ]}
                >
                  {selectedCustomer.bank}
                </Text>
              ) : (
                <View />
              )}

              {selectedCustomer.no_rekening ? (
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 16, color: BLACK, marginTop: 2 }
                  ]}
                >
                  {selectedCustomer.no_rekening}
                </Text>
              ) : (
                <View />
              )} */}
              
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 16, color: BLACK, marginTop: 2 }
                ]}
              >
                {selectedCustomer.address}
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                  marginTop: 2
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: "100%"
                  //
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 16,
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                        marginTop: 2
                      }
                    ]}
                  >
                    {_catatan[this.state.languageIndex]}
                  </Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    alignContent: "flex-end",
                    alignItems: "flex-end"
                  }}
                >
                  <Button
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.editCustomer();
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 16,
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                          marginTop: 2
                        }
                      ]}
                    >
                      {_ubah[this.state.languageIndex]}
                    </Text>
                  </Button>
                </View>
              </View>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK,
                    marginTop: 2
                  }
                ]}
              >
                {selectedCustomer.notes && selectedCustomer.notes !== ""
                  ? selectedCustomer.notes
                  : _catatan_kosong[this.state.languageIndex]}
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                  marginTop: 2
                }}
              />
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 16,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 2
                  }
                ]}
              >
                {_total_transaksi[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK,
                    marginTop: 2
                  }
                ]}
              >
                {total}
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                  marginTop: 2
                }}
              />
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 16,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 2
                  }
                ]}
              >
                {_jumlah_poin[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 16,
                    color: BLACK,
                    marginTop: 2
                  }
                ]}
              >
                {point}
              </Text>
              <View
                style={{
                  flex: 1,
                  display: "none",
                  justifyContent: "flex-end"
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-end",
                    width: "75%",
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <Button
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.closeViewCustomer();
                    }}
                    style={[
                      ss.box,
                      {
                        //alignSelf: "flex-end",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        width: "40%",
                        padding: 10,
                        borderRadius: 15,
                        borderColor: MAIN_TEXT_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        borderWidth: 1,
                        backgroundColor: MAIN_THEME_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        elevation: 3
                      }
                    ]}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 16,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                        }
                      ]}
                    >
                      {_kembali[this.state.languageIndex]}
                    </Text>
                  </Button>
                  <Button
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      this.editCustomer();
                    }}
                    style={[
                      ss.box,
                      {
                        //alignSelf: "flex-end",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        width: "40%",
                        padding: 10,
                        borderRadius: 15,
                        backgroundColor: "#7AB93C",
                        elevation: 3
                      }
                    ]}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 16, color: WHITE }
                      ]}
                    >
                      {_ubah[this.state.languageIndex]}
                    </Text>
                  </Button>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  style={{
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    width: "49%",
                    padding: 10,
                    borderRadius: 15,
                    alignItems: "center"
                  }}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    //this.editCustomer();
                    this.setState({ showTransaction: true });
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 16,
                        color: WHITE,
                        marginTop: 2
                      }
                    ]}
                  >
                    {_riwayat_short[this.state.languageIndex]}
                  </Text>
                </Button>
                <Button
                  style={{
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    width: "49%",
                    padding: 10,
                    borderRadius: 15,
                    alignItems: "center"
                  }}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    //this.editCustomer();
                    this.setState({ showPointHistory: true });
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 16,
                        color: WHITE,
                        marginTop: 2
                      }
                    ]}
                  >
                    {_riwayat_point[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
            
            {/* Data pelanggan End */}
          </View>
        </View>
        {/* // </Modal> */}
      </ScrollView>
    );
  }

  renderModalPointHistory() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        //visible={this.state.showForm}
        visible={this.state.showPointHistory}
        onRequestClose={() => {
          this.setState({ showPointHistory: false });
        }}
      >
        <View style={{ flex: 1, backgroundColor: WHITE, paddingBottom: 15 }}>
          <MobileHeader
            colorIndex={this.state.colorIndex}
            title={_riwayat_point[this.state.languageIndex]}
            notif={false}
            hideLogin={true}
            loginInformation={this.state.userInfo}
            menu={false}
            back={true}
            backAction={() => {
              this.setState({ showPointHistory: false });
            }}
            // deleteView={true}
            // deleteText={_delete[this.state.languageIndex]}
            // deleteAction={() => {
            //   this.setState({ showDeleteCustomerModal: true });
            //   //this.deleteCustomer();
            // }}
          />

          {/* <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 14,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >

          </Text> */}
          <View style={{ padding: 15, marginBottom: 30, paddingBottom: 0 }}>
            {this.state.tablet ? (
              <FlatList
                //ListHeaderComponent={this.renderSearch()}
                showsVerticalScrollIndicator={false}
                data={this.state.transactions_point}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 5,
                  marginLeft: 15,
                  marginRight: 15
                }}
                numColumns={2}
                renderItem={({ item, index }) => {
                  return this.renderHistoryPoint(item, index);
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "History_Point" + index.toString();
                }}
                //onRefresh={this._onRefresh}
                //onEndReached={() => this.handleLoadMore()}
                // onEndReached={() => console.log("end REACHED???")}
                // onEndReachedThreshold={0.5}
                //refreshing={this.state.refreshing}
              />
            ) : (
              <FlatList
                //ListHeaderComponent={this.renderSearch()}
                showsVerticalScrollIndicator={false}
                data={this.state.transactions_point}
                renderItem={({ item, index }) => {
                  return this.renderHistoryPoint(item, index);
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "History_Point" + index.toString();
                }}
                //onRefresh={this._onRefresh}
                //onEndReached={() => this.handleLoadMore()}
                // onEndReached={() => console.log("end REACHED???")}
                // onEndReachedThreshold={0.5}
                //refreshing={this.state.refreshing}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }

  renderModalTransaction() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        //visible={this.state.showForm}
        visible={this.state.showTransaction}
        onRequestClose={() => {
          this.setState({ showTransaction: false });
        }}
      >
        <View style={{ flex: 1, backgroundColor: WHITE, paddingBottom: 15 }}>
          <MobileHeader
            colorIndex={this.state.colorIndex}
            title={_riwayat[this.state.languageIndex]}
            notif={false}
            hideLogin={true}
            loginInformation={this.state.userInfo}
            menu={false}
            back={true}
            backAction={() => {
              this.setState({ showTransaction: false });
            }}
            // deleteView={true}
            // deleteText={_delete[this.state.languageIndex]}
            // deleteAction={() => {
            //   this.setState({ showDeleteCustomerModal: true });
            //   //this.deleteCustomer();
            // }}
          />

          {/* <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 14,
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >

          </Text> */}
          <View style={{ padding: 15, marginBottom: 30, paddingBottom: 0 }}>
            {this.state.tablet ? (
              <FlatList
                //ListHeaderComponent={this.renderSearch()}
                showsVerticalScrollIndicator={false}
                data={this.state.transactions}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 5,
                  marginLeft: 15,
                  marginRight: 15
                }}
                numColumns={2}
                renderItem={({ item, index }) => {
                  return this.renderHistory(item, index);
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "History" + index.toString();
                }}
                //onRefresh={this._onRefresh}
                //onEndReached={() => this.handleLoadMore()}
                // onEndReached={() => console.log("end REACHED???")}
                // onEndReachedThreshold={0.5}
                //refreshing={this.state.refreshing}
              />
            ) : (
              <FlatList
                //ListHeaderComponent={this.renderSearch()}
                showsVerticalScrollIndicator={false}
                data={this.state.transactions}
                renderItem={({ item, index }) => {
                  return this.renderHistory(item, index);
                }}
                //ListFooterComponent={this._renderFooter}
                keyExtractor={(item, index) => {
                  return "History" + index.toString();
                }}
                //onRefresh={this._onRefresh}
                //onEndReached={() => this.handleLoadMore()}
                // onEndReached={() => console.log("end REACHED???")}
                // onEndReachedThreshold={0.5}
                //refreshing={this.state.refreshing}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }

  renderHistory(data, index) {
    //console.log("Render History ==> ", data);
    let time = "";

    // if (data.time) {
    //   time = data.time;
    //   time = moment(time).format("HH:mm");
    // }

    //console.log("render List Data ==> ", data);

    const status = data.status;
    //console.log(data.status);
    const status_color = [
      "#000000",
      "#BA1818",
      "#BA1818",
      "#37A441",
      "#C4C4C4"
    ];
    let status_index = 0;

    let status_text = "";

    if (status === "new") {
      status_text = _status_1[this.state.languageIndex];
      status_index = 0;
    }
    if (status === "refund") {
      status_text = _status_2[this.state.languageIndex];
      status_index = 1;
    }

    if (status === "cancel") {
      status_text = _status_3[this.state.languageIndex];
      status_index = 2;
    }

    if (status === "done") {
      status_text = _status_4[this.state.languageIndex];
      status_index = 3;
    }

    if (status === "closed") {
      status_text = _status_5[this.state.languageIndex];
      status_index = 4;
    }

    if (data.createdAt) {
      time = data.createdAt;
      time = moment(time).format("DD/MM, HH:mm");
    }

    // let paymentType = data.paymentType;
    // paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    let paymentType = data.Payment ? data.Payment.payment_method_id : "";

    let paymentName = "";

    if (this.state.paymentMethod.length > 0) {
      this.state.paymentMethod.map((v, i) => {
        if (paymentType.toString() === v.id.toString()) {
          paymentName = v.name;
        }
      });
    }

    const { selectedData } = this.state;

    let whiteColor = WHITE;
    let blackColor = BLACK;

    // if (this.state.colorIndex === 9) {
    //   whiteColor = BLACK;
    //   blackColor = WHITE;
    // }

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

    // if (selectedData.id === data.id) {
    //   colorIndex = 0;
    // } else {
    //   colorIndex = 1;
    // }

    let total = 0;

    if (data.Payment) {
      total = data.Payment.payment_total;
    }

    return (
      <View
        style={{
          marginBottom: 15,
          width: this.state.tablet ? "49%" : "100%",
          alignSelf: "center"
        }}
      >
        <Button
          onPress={() => {
            //this.changeSelection(data);
            //this.setState({ selectedData: data });
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
                  {_transaction_id[this.state.languageIndex]}
                </Text>
              </View>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {data.receipt_id}
              </Text>
            </View>
            <View style={{ width: "20%", alignItems: "center" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {" "}
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
            <View style={{ width: "33%", alignItems: "flex-start" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_total_price[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {this.idrNumToStr(parseInt(total))}
              </Text>
            </View>
            <View style={{ width: "33%", alignItems: "center" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_payment_type[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {/* {paymentType} */}
                {paymentName}
              </Text>
            </View>
            <View style={{ width: "33%", alignItems: "flex-end" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_merchant[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 10,
                    color: textColor[colorIndex],
                    textAlign: "right"
                  }
                ]}
              >
                {this.state.userInfo.gerai_name}
              </Text>
            </View>
          </View>
        </Button>
        <View
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
        </View>
      </View>
    );
  }

  renderHistoryPoint(data, index) {
    //console.log("Render History ==> ", data);
    let time = "";

    // if (data.time) {
    //   time = data.time;
    //   time = moment(time).format("HH:mm");
    // }

    //console.log("render List Data ==> ", data);

    const status = data.status;
    //console.log(data.status);
    const status_color = [
      "#000000",
      "#BA1818",
      "#BA1818",
      "#37A441",
      "#C4C4C4"
    ];
    let status_index = 0;

    let status_text = "";

    if (status === "new") {
      status_text = _status_1[this.state.languageIndex];
      status_index = 0;
    }
    if (status === "refund") {
      status_text = _status_2[this.state.languageIndex];
      status_index = 1;
    }

    if (status === "cancel") {
      status_text = _status_3[this.state.languageIndex];
      status_index = 2;
    }

    if (status === "done") {
      status_text = _status_4[this.state.languageIndex];
      status_index = 3;
    }

    if (status === "closed") {
      status_text = _status_5[this.state.languageIndex];
      status_index = 4;
    }

    if (data.createdAt) {
      time = data.createdAt;
      time = moment(time).format("DD/MM, HH:mm");
    }

    // let paymentType = data.paymentType;
    // paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

    let paymentType = data.Payment ? data.Payment.payment_method_id : "";

    let paymentName = "";

    if (this.state.paymentMethod.length > 0) {
      this.state.paymentMethod.map((v, i) => {
        if (paymentType.toString() === v.id.toString()) {
          paymentName = v.name;
        }
      });
    }

    const { selectedData } = this.state;

    let whiteColor = WHITE;
    let blackColor = BLACK;

    // if (this.state.colorIndex === 9) {
    //   whiteColor = BLACK;
    //   blackColor = WHITE;
    // }

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

    // if (selectedData.id === data.id) {
    //   colorIndex = 0;
    // } else {
    //   colorIndex = 1;
    // }

    let total = 0;

    //if (data.points) {
    total = data.points;
    let description = data.description;
    //}

    return (
      <View
        style={{
          marginBottom: 15,
          width: this.state.tablet ? "49%" : "100%",
          alignSelf: "center"
        }}
      >
        <Button
          onPress={() => {
            //this.changeSelection(data);
            //this.setState({ selectedData: data });
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
            <View style={{ width: "33%", alignItems: "flex-start" }}>
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
                  {_transaction_id[this.state.languageIndex]}
                </Text>
              </View>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {data.transaction_code}
              </Text>
            </View>
            <View style={{ width: "33%", alignItems: "center" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_total[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {parseInt(total)}
              </Text>
            </View>
            <View style={{ width: "33%", alignItems: "flex-end" }}>
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
            <View style={{ width: "65%", alignItems: "flex-start" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_description[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {description}
              </Text>
            </View>
            <View style={{ width: "1%", alignItems: "center" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {" "}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: textColor[colorIndex] }
                ]}
              >
                {/* {paymentType} */}{" "}
              </Text>
            </View>
            <View style={{ width: "33%", alignItems: "flex-end" }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 11, color: textColor[colorIndex] }
                ]}
              >
                {_merchant[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 10,
                    color: textColor[colorIndex],
                    textAlign: "right"
                  }
                ]}
              >
                {this.state.userInfo.gerai_name}
              </Text>
            </View>
          </View>
        </Button>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#E8E8E8",
            marginTop: -5,
            padding: 10,
            zIndex: 1,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            display: "none"
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
        </View>
      </View>
    );
  }

  
  idrNumToStr(num, iscurr) {
    let int_num = parseInt(num);
    let comma_num = num - int_num;

    //console.log("num ===> ", num);
    //console.log("int_num ===> ", int_num);
    comma_num = Math.round(comma_num * 100);
    //console.log("comma_num ===> ", comma_num);

    let comma_add = "";
    if (comma_num === 0) {
    } else {
      if (comma_num < 10) {
        comma_add = `.0${comma_num}`;
      } else {
        comma_add = `.${comma_num}`;
      }
    }

    if (!this.state.currencyAllowDecimal) {
      comma_add = "";
    }

    let curr = "";
    if (typeof iscurr !== "undefined" && iscurr === true) {
      curr = this.state.currency + " ";
    }
    let str = "";
    let numrev = int_num
      .toString()
      .split("")
      .reverse()
      .join("");
    for (let i = 0; i < numrev.length; i++) {
      if (i % 3 === 0) {
        str += numrev.substr(i, 3) + ",";
      }
    }
    return (
      curr +
      str
        .split("", str.length - 1)
        .reverse()
        .join("") +
      comma_add
    );
  }

  renderShowList() {
    this.renderSearch();
    this.renderListCustomer();
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
    const { showAlert, alertMessage } = this.state;
    let height = Dimensions.get("window").height - 90;
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        {this.state.loading ? <Loading /> : <View />}
        {this.state.showAlert ? (
          <CustomAlert
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            message={this.state.alertMessage}
            //title={'Success'}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ showAlert: false });
              //Actions.pop();
            }}
          />
        ) : (
          <View />
        )}
        <MobileHeaderTabletV2
          colorIndex={this.state.colorIndex}
          title={_data_pelanggan[this.state.languageIndex]}
          notif={false}
          hideLogin={true}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          // backAction={() => {
          //   this.closeViewCustomer();
          // }}
          add={true}
          addAction={() => {
            this.openForm();
          }}
        />
        <StatusBar
          barStyle={"dark-content"}
          hidden={false}
          backgroundColor={WHITE}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {/* <ScrollView
          style={{
            flex: 1
          }}
        > */}
        <View
          style={{flex: 1,
            //display: this.state.showBill ? "none" : "flex",
            width: "100%",
            flexDirection: "row",
            marginTop: 0
          }}
        >
          <View style={{ flex: 7.5 }}>
            <MobileHeaderTabletSamping
              activeMenuIndex={6}
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

          <View style={{ flex: 46.5, margin: 10, marginRight: 5, padding: 5, backgroundColor: WHITE }}>
            {this.renderSearch()}
            {this.renderListCustomer()}
            {/* {this.renderForm()} */}

            {/* {this.renderViewCustomer()} */}

            {/* {!this.state.selectedCustomer && !this.state.showForm ? (
                this.renderSearch()
              ) : (
                <View />
              )}
              {!this.state.selectedCustomer && !this.state.showForm ? (
                this.renderListCustomer()
              ) : (
                <View />
              )} */}
          </View>

          <View style={{ flex: 46.5, margin: 10, marginRight: 5, padding: 5, backgroundColor: WHITE }}>
            {this.state.formType === "edit"
              ? this.renderForm()
              : this.state.selectedCustomer
              ? this.renderViewCustomer()
              : this.renderForm()}
          </View>
        </View>
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
  leftSide: {
    width: "100%",
    marginTop: 0
  },

  box: {
    //elevation: 1,
    //borderRadius: 5
  },
  pinButton: {
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
  },
  formInput: {
    flex: 1,
    borderRadius: 5,
    //borderWidth: 1,
    backgroundColor: "rgba(246, 246, 246, 0.95)"
    //borderColor: "#C8C7CC"
  },
  formInputText: {
    color: BLACK,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: -10,
    height: 40,
    fontSize: 12,
    fontFamily: "DMSans-Bold"
  }
});
