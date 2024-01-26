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
import AlertLogin from "../../Components/AlertLogin";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";
import Dropdown from "../../Components/Dropdown";

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
  CustomerGetAPI
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
  _belum_ada_data_pelanggan,
  _bank_account,
  _bank
} from "../../Libraries/DictionaryManagement";
import { _ok_alert } from "../../Libraries/DictionarySetting";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default class MobileManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      listCustomer: [
        {
          id: 1,
          name: "Mr A",
          email: "mra@gmail.com",
          phone: "123123",
          address: "Alamatnya Mr A",
          notes: "Catatan Mr A",
          totalTransaksi: 500000,
          point: 35,
          image:
            "https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png"
        },
        {
          id: 2,
          name: "Mr b",
          email: "mrb@gmail.com",
          phone: "321321",
          address: "Alamatnya Mr B",
          notes: "Catatan Mr B",
          totalTransaksi: 1000000,
          point: 70,
          image:
            "https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png"
        },
        {
          id: 3,
          name: "Mr C",
          email: "mrd@gmail.com",
          phone: "098098",
          address: "Alamatnya Mr C",
          notes: "Catatan Mr C",
          totalTransaksi: 250000,
          point: 21,
          image:
            "https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png"
        }
      ],
      selectedCustomer: null,
      action: _tambah[this.props.languageIndex ? this.props.languageIndex : 0] //Tambah atau Ubah
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

  getListCustomer(page = this.state.page) {
    this.setState({ loading: true });

    const gerai_id = this.state.userInfo.gerai_id;

    const uri = `${CustomerGetAPI}?gerai_id=${gerai_id}search=${
      this.state.searchKey
    }&page=${page}`;
    console.log("getListCustomer URI ==> ", uri);
    fetch(uri, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson.result;
        let resultData = result.data;
        // console.log("getListCustomer responseJson ==> ", responseJson);
        // console.log("getListCustomer responseJson ==> ", result.last_page);

        if (page === 1) {
          this.setState({
            listCustomer: resultData,
            maxPage: result.last_page,
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
            loading: false
            //maxPage: result.last_page
          });
        }
        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
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

  showCustomer(data) {
    this.setState({ selectedCustomer: data, modalShowCustomer: true });
  }

  openForm() {
    this.setState({
      showForm: true,
      formId: 0,
      formName: "",
      formEmail: "",
      formPhone: "",
      formAddress: "",
      formNotes: "",
      action: _tambah[this.state.languageIndex],
      formAction: "add"
    });
  }

  editCustomer() {
    const {
      id,
      name,
      email,
      phone,
      address,
      notes
    } = this.state.selectedCustomer;

    this.setState({
      showForm: true,
      modalShowCustomer: false,
      formId: id,
      formName: name,
      formEmail: email,
      formPhone: phone,
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
      formEmail: "",
      formPhone: "",
      formAddress: "",
      formNotes: "",
      action: _tambah[this.state.languageIndex],
      formAction: "add"
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

    if (formEmail === "") {
      error = true;
      alertMessage.push(_fill_2[this.state.languageIndex]);
    }

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
    const uri = CustomerUpdateAPI;
    this.setState({ loading: true });

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        id: this.state.selectedCustomer.id,
        name: this.state.formName,
        notes: this.state.formNotes,
        address: this.state.formAddress,
        phone: this.state.formPhone

        //image: image,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        console.log("updateDataUser ==>", resultData);
        let alertMessage = [result.message];

        if (responseJson.status) {
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
    const uri = CustomerCreateAPI;

    const gerai_id = this.state.userInfo.gerai_id;

    this.setState({ loading: true });
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        //id: this.state.selectedCustomer.id,
        gerai_id: gerai_id,
        email: this.state.formEmail,
        name: this.state.formName,
        phone: this.state.formPhone,
        notes: this.state.formNotes,
        address: this.state.formAddress
        //password: this.state.formPassword
        //image: image,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;
        console.log("insertDataUser ==>", resultData);

        let alertMessage = [result.message];

        if (responseJson.status) {
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
      formEmail: "",
      formPhone: "",
      formAddress: "",
      formNotes: ""
    });
  }

  renderForm() {
    let { action } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showForm}
        onRequestClose={() => {
          //this.setState({ modalShowCustomer: false, selectedCustomer: null });
          this.closeForm();
        }}
      >
        <View
          style={{
            height: 70,
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: WHITE,
            flexDirection: "column",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginTop: -15
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
            <View style={{ position: "absolute", left: 10, top: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  //onPress={()=>{}}
                  this.closeForm();
                  //</View></View>this.setState({ formItem: false });
                }}
              >
                <Ionicons
                  // name={"ios-close-circle-outline"}
                  name={"md-close"}
                  size={25}
                  color={BLACK}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                //marginTop: 25,
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
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
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
                          this._email.focus();
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
                          this._phone.focus();
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
                          this._address.focus();
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
                        ref={q => (this._bankacc = q)}
                        onSubmitEditing={() => {
                          //this._address.focus();
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v =>
                          this.setState({ formBankAccount: v })
                        }
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
                            this._notes.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ formAddress: v })}
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
                  justifyContent: "center"
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
      </Modal>
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
    return (
      <Button
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.showCustomer(data);
        }}
        style={{
          flex: 1,
          marginTop: 0,
          marginBottom: 5,
          height: 50,
          marginLeft: 15,
          marginRight: 15,
          //backgroundColor: WHITE,
          alignContent: "center",
          //justifyContent: 'space-between',
          justifyContent: "space-between",
          flexDirection: "row",
          // paddingTop: 15,
          // paddingBottom: 15,
          borderColor: "#C8C7CC",
          //borderBottomWidth: 1,
          borderTopWidth: 1,
          padding: 15,
          paddingTop: 33,
          paddingBottom: 33
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            alignContent: "center",
            justifyContent: "center",
            width: "75%"
            //marginLeft: 15
          }}
        >
          <Text
            style={[MainStyle.robotoNormalBold, { fontSize: 15, color: BLACK }]}
          >
            {data.name}
          </Text>
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
          >
            {data.email}
          </Text>
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
          >
            {data.phone}
          </Text>
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
          <Text
            style={[MainStyle.robotoNormal, { fontSize: 11, color: BLACK }]}
          >
            {_view[this.state.languageIndex]}
          </Text>
        </View>
      </Button>
    );
  }

  renderNoData() {
    return (
      <View
        style={{
          flex: 1,
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
    if (!this.state.selectedCustomer) {
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
    } else {
      return <View />;
    }
  }

  renderViewCustomer() {
    const { selectedCustomer } = this.state;
    let total = selectedCustomer.total_transaction
      ? selectedCustomer.total_transaction
      : 0;
    let point = selectedCustomer.points ? selectedCustomer.points : 0;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalShowCustomer}
        onRequestClose={() => {
          //this.setState({ modalShowCustomer: false, selectedCustomer: null });
          this.closeViewCustomer();
        }}
      >
        <MobileHeader
          colorIndex={this.state.colorIndex}
          title={selectedCustomer.name}
          notif={false}
          hideLogin={true}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          backAction={() => {
            this.closeViewCustomer();
          }}
        />
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
                backgroundColor: WHITE,
                //elevation: 2,
                padding: 15,
                paddingTop: 0
              }
            ]}
          >
            {/* Foto dan point */}
            {/* Data pelanggan */}
            <View
              style={{
                //backgroundColor: "#BCA",
                flex: 1,
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5
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
                        fontSize: 14,
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                        marginTop: 5
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
                          fontSize: 14,
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                          marginTop: 5
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
                  { fontSize: 14, color: BLACK, marginTop: 5 }
                ]}
              >
                {selectedCustomer.email}
              </Text>

              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 14, color: BLACK, marginTop: 5 }
                ]}
              >
                {selectedCustomer.phone}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 14, color: BLACK, marginTop: 5 }
                ]}
              >
                {selectedCustomer.address}
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                  marginTop: 5
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
                        fontSize: 14,
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                        marginTop: 5
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
                          fontSize: 14,
                          color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                          marginTop: 5
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
                    fontSize: 14,
                    color: BLACK,
                    marginTop: 5
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
                  marginTop: 5
                }}
              />
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 14,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 5
                  }
                ]}
              >
                {_total_transaksi[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 14,
                    color: BLACK,
                    marginTop: 5
                  }
                ]}
              >
                {total}
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#C8C7CC",
                  marginTop: 5
                }}
              />
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  {
                    fontSize: 14,
                    color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 5
                  }
                ]}
              >
                {_jumlah_poin[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 14,
                    color: BLACK,
                    marginTop: 5
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
                          fontSize: 14,
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
                        { fontSize: 14, color: WHITE }
                      ]}
                    >
                      {_ubah[this.state.languageIndex]}
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
            {/* Data pelanggan End */}
          </View>
        </View>
      </Modal>
    );
  }

  renderShowList() {
    this.renderSearch();
    this.renderListCustomer();
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
        <MobileHeader
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

        <ScrollView
          style={{
            flex: 1
          }}
        >
          <View style={[ss.mainContent, { height: height }]}>
            <View
              style={[
                ss.leftSide,
                {
                  marginTop: 0
                }
              ]}
            >
              {/* {this.renderForm()} */}
              {this.state.selectedCustomer ? (
                this.renderViewCustomer()
              ) : (
                <View />
              )}

              {/* {this.renderViewCustomer()} */}

              {!this.state.selectedCustomer && !this.state.showForm ? (
                this.renderSearch()
              ) : (
                <View />
              )}
              {!this.state.selectedCustomer && !this.state.showForm ? (
                this.renderListCustomer()
              ) : (
                <View />
              )}

              {this.renderForm()}
              {/* {this.state.showForm ? this.renderForm() : <View />} */}
            </View>

            {/* <View style={[ss.rightSide]}>
              {this.state.selectedCustomer ? (
                this.renderViewCustomer()
              ) : (
                <View />
              )}

              {!this.state.selectedCustomer ? this.renderSearch() : <View />}

              {!this.state.selectedCustomer ? (
                this.renderListCustomer()
              ) : (
                <View />
              )}


            </View> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    backgroundColor: "#FFFFFF",
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
    elevation: 1,
    borderRadius: 5
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
