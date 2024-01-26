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

import Header from "../../Components/Header";
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
import Loading from "../../Components/Loading";
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
import { GetCustomerAPI, EditUserAPI, RegisterAPI } from "../../Constants";

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
  _belum_ada_data_pelanggan
} from "../../Libraries/DictionaryManagement";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);
  // console.log("layoutMeasurement.height ", layoutMeasurement.height);

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default class Management extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      alertMessage: ["Password does not match"],
      showAlert: false,
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
      action: "Tambah" //Tambah atau Ubah
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
    const uri = `${GetCustomerAPI}?search=${this.state.searchKey}&page=${page}`;
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
    this.setState({ selectedCustomer: data });
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
    this.setState({
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
    const uri = EditUserAPI;
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
        address: this.state.formAddress
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
    const uri = RegisterAPI;
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
        email: this.state.formEmail,
        name: this.state.formName,
        phone: this.state.formPhone,
        notes: this.state.formNotes,
        address: this.state.formAddress,
        password: this.state.formPassword
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
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          flexDirection: "column"
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            height: 50,
            justifyContent: "space-between"
          }}
        >
          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              //onPress={()=>{}}
              this.closeForm();
              //</View></View>this.setState({ formItem: false });
            }}
            style={{
              width: "15%",
              borderRadius: 25,
              elevation: 1,
              backgroundColor: "rgba(225, 114, 114, 0.9)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: WHITE }]}
            >
              {_kembali[this.state.languageIndex]}
            </Text>
          </Button>
          <View
            style={{
              width: "60%",
              //borderRadius: 15,
              //elevation: 1,
              //backgroundColor: 'rgba(6, 78, 162, 0.9)',
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {action} {_data_pelanggan[this.state.languageIndex]}
            </Text>
            <Text
              style={[MainStyle.dmSans, { fontSize: 16, color: BLACK }]}
            >
              {/* Lengkapi detail pesanan! */}
              {/* {this.state.currency}{' '}
              {this.state.productPrice * this.state.selectedQuantity} */}
            </Text>
          </View>
          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              //this.closeForm();
              this.saveData(this.state.formType);
            }}
            style={{
              width: "15%",
              borderRadius: 25,
              elevation: 2,
              backgroundColor: "rgba(6, 78, 162, 0.9)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: WHITE }]}
            >
              {_simpan[this.state.languageIndex]}
            </Text>
          </Button>
        </View>
        {/* Header Form */}
        {/* Kotak Form */}
        <View
          style={{
            flex: 1,
            backgroundColor: WHITE,
            marginTop: 20,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.61)",
            width: "100%",
            borderRadius: 5
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
                  backgroundColor: "#99999",
                  flex: 1,
                  width: "100%",
                  minHeight: 100,
                  justifyContent: "space-between"
                }}
              >
                {/* Nama Pelanggan */}
                <View
                  style={{
                    //backgroundColor: '#BCA',
                    width: "100%"
                  }}
                >
                  <View style={{ margin: 10, flexDirection: "row" }}>
                    <FontAwesome
                      name={"circle-thin"}
                      style={{
                        alignSelf: "center",
                        fontSize: 25,
                        color: BLACK,
                        marginRight: 10
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        { fontSize: 20, color: BLACK }
                      ]}
                    >
                      {_nama[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={ss.formInput}>
                    <View
                      style={{
                        width: "100%"
                        //borderBottomWidth: 1,
                        //borderColor: "#C4C4C4"
                      }}
                    >
                      <TextInput
                        style={{
                          color: BLACK,
                          paddingTop: 5,
                          paddingBottom: 10,
                          marginBottom: -10,
                          //marginLeft: '5%',
                          //marginRight: 5,
                          height: 40,
                          fontSize: 20,
                          fontFamily: "RobotoSlab-Bold"
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
                        placeholder={""}
                        placeholderTextColor="#555"
                      />
                    </View>
                  </View>
                </View>
                {/* Nama Pelanggan End */}
                {/* Email */}
                <View
                  style={{
                    //backgroundColor: '#BCA',
                    width: "100%"
                  }}
                >
                  <View style={{ margin: 10, flexDirection: "row" }}>
                    <FontAwesome
                      name={"circle-thin"}
                      style={{
                        alignSelf: "center",
                        fontSize: 25,
                        color: BLACK,
                        marginRight: 10
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        { fontSize: 20, color: BLACK }
                      ]}
                    >
                      Email
                    </Text>
                  </View>
                  <View style={ss.formInput}>
                    <View
                      style={{
                        width: "100%"
                      }}
                    >
                      <TextInput
                        style={ss.formInputText}
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
                        placeholder={""}
                        placeholderTextColor="#555"
                      />
                    </View>
                  </View>
                </View>
                {/* Email End */}
                {/* Phone */}
                <View
                  style={{
                    //backgroundColor: '#BCA',
                    width: "100%"
                  }}
                >
                  <View style={{ margin: 10, flexDirection: "row" }}>
                    <FontAwesome
                      name={"circle-thin"}
                      style={{
                        alignSelf: "center",
                        fontSize: 25,
                        color: BLACK,
                        marginRight: 10
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        { fontSize: 20, color: BLACK }
                      ]}
                    >
                      {_phone_long[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={ss.formInput}>
                    <View
                      style={{
                        width: "100%"
                      }}
                    >
                      <TextInput
                        style={ss.formInputText}
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
                        placeholder={""}
                        placeholderTextColor="#555"
                      />
                    </View>
                  </View>
                </View>
                {/* Email End */}
                {/* Alamat */}
                <View
                  style={{
                    //backgroundColor: '#BCA',
                    width: "100%"
                  }}
                >
                  <View style={{ margin: 10, flexDirection: "row" }}>
                    <FontAwesome
                      name={"circle-thin"}
                      style={{
                        alignSelf: "center",
                        fontSize: 25,
                        color: BLACK,
                        marginRight: 10
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        { fontSize: 20, color: BLACK }
                      ]}
                    >
                      {_alamat[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={[ss.formInput, { borderBottomWidth: 0 }]}>
                    <View
                      style={{
                        width: "100%"
                      }}
                    >
                      <ScrollView
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          borderWidth: 1,
                          marginTop: 5,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.state.colorIndex
                          ),
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
                          ref={q => (this._address = q)}
                          onSubmitEditing={() => {
                            //this._notes.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ formAddress: v })}
                          //keyboardType="email-address"
                          //keyboardType={"phone-pad"}
                          value={this.state.formAddress}
                          placeholder={""}
                          placeholderTextColor="#555"
                        />
                      </ScrollView>
                    </View>
                  </View>
                </View>
                {/* Alamat End */}
                {/* Catatan */}
                <View
                  style={{
                    //backgroundColor: '#BCA',
                    width: "100%"
                  }}
                >
                  <View style={{ margin: 10, flexDirection: "row" }}>
                    <FontAwesome
                      name={"circle-thin"}
                      style={{
                        alignSelf: "center",
                        fontSize: 25,
                        color: BLACK,
                        marginRight: 10,
                        flexDirection: "row"
                      }}
                    />
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        { fontSize: 20, color: BLACK }
                      ]}
                    >
                      {_catatan[this.state.languageIndex]}
                    </Text>
                    <Text
                      style={[
                        MainStyle.dmSansLight,
                        { fontSize: 20, color: BLACK }
                      ]}
                    >
                      {" "}
                      {_catatan_extra[this.state.languageIndex]}
                    </Text>
                  </View>
                  <View style={[ss.formInput, { borderBottomWidth: 0 }]}>
                    <View
                      style={{
                        width: "100%"
                      }}
                    >
                      <ScrollView
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          borderWidth: 1,
                          marginTop: 5,
                          borderColor: MAIN_THEME_COLOR_SELECT(
                            this.state.colorIndex
                          ),
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
                          ref={q => (this._notes = q)}
                          onSubmitEditing={() => {
                            //this._notes.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ formNotes: v })}
                          //keyboardType="email-address"
                          //keyboardType={"phone-pad"}
                          value={this.state.formNotes}
                          placeholder={""}
                          placeholderTextColor="#555"
                        />
                      </ScrollView>
                    </View>
                  </View>
                </View>
                {/* Catatan End */}
              </View>
              {/* additionalnya */}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  renderListCustomer() {
    return (
      <View
        style={[ss.box, { backgroundColor: "#EEEEEE", margin: 15, flex: 1 }]}
      >
        {/* Header list */}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
            paddingBottom: 10,
            height: 40,
            borderColor: WHITE,
            borderBottomWidth: 1,
            marginLeft: 15,
            marginRight: 15
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              alignContent: "center",
              width: "30%",
              marginLeft: 5
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {_nama[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              alignContent: "center",
              width: "45%"
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {_email[this.state.languageIndex]}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              alignContent: "center",
              width: "25%",
              paddingLeft: 15
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { fontSize: 20, color: BLACK }]}
            >
              {_phone[this.state.languageIndex]}
            </Text>
          </View>
        </View>
        {/* Header end */}
        {/* Data Demo */}
        {/* {this.renderDataDemo()} */}

        <FlatList
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              if (this.state.loading == false) {
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
          marginTop: 10,
          height: 50,
          marginLeft: 15,
          marginRight: 15,
          backgroundColor: WHITE,
          alignContent: "center",
          //justifyContent: 'space-between',
          justifyContent: "space-between",
          flexDirection: "row",
          paddingTop: 15,
          paddingBottom: 15
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            alignContent: "center",
            justifyContent: "center",
            width: "30%",
            marginLeft: 5
          }}
        >
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
          >
            {data.name}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            alignContent: "center",
            justifyContent: "center",
            width: "45%"
          }}
        >
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
          >
            {data.email}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            alignContent: "center",
            justifyContent: "center",
            width: "25%",
            paddingLeft: 15
          }}
        >
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 14, color: BLACK }]}
          >
            {data.phone}
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
            MainStyle.dmSans,
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
        <View style={[ss.box, { backgroundColor: "#EEEEEE", margin: 15 }]}>
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                margin: 15,
                backgroundColor: WHITE,
                borderRadius: 10,
                elevation: 2
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
                    width: "4%",
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  <Ionicons
                    name={"md-search"}
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: BLACK
                    }}
                  />
                </View>
                <View style={{ width: "95%" }}>
                  <TextInput
                    style={{
                      //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      backgroundColor: "transparent",
                      color: BLACK,
                      paddingTop: 5,
                      paddingBottom: 10,
                      marginBottom: -10,
                      //marginLeft: '5%',
                      //marginRight: 5,
                      height: 40,
                      fontSize: 20,
                      fontFamily: "RobotoSlab-Bold"
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
        </View>
      );
    } else {
      return <View />;
    }
  }

  renderViewCustomer() {
    const { selectedCustomer } = this.state;
    let total = selectedCustomer.totalTransaksi;
    let point = selectedCustomer.point;
    return (
      <View style={[ss.box, { flex: 1, backgroundColor: "#" }]}>
        <View
          style={[
            ss.box,
            {
              flex: 1,
              margin: 15,
              backgroundColor: WHITE,
              elevation: 2,
              padding: 20
            }
          ]}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: 125, height: 125 }}>
              <Image
                //resizeMode={'stretch'}
                resizeMode={"contain"}
                style={{
                  width: "100%",
                  height: "100%"
                  //backgroundColor: BLACK,
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
            <View
              style={[
                ss.box,
                {
                  width: "60%",
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  padding: 15,
                  elevation: 2
                }
              ]}
            >
              <Text
                style={[
                  MainStyle.dmSansLight,
                  {
                    fontSize: 16,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 5
                  }
                ]}
              >
                {_total_transaksi[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 16,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 5
                  }
                ]}
              >
                {total}
              </Text>
              <Text
                style={[
                  MainStyle.dmSansLight,
                  {
                    fontSize: 16,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 5
                  }
                ]}
              >
                {_jumlah_poin[this.state.languageIndex]}
              </Text>
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: 16,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    marginTop: 5
                  }
                ]}
              >
                {point}
              </Text>
            </View>
          </View>
          {/* Foto dan point */}
          {/* Data pelanggan */}
          <View
            style={{
              //backgroundColor: "#BCA",
              flex: 1,
              marginTop: 20
            }}
          >
            <Text
              style={[
                MainStyle.dmSansLight,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {_nama[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {selectedCustomer.name}
            </Text>
            <Text
              style={[
                MainStyle.dmSansLight,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {_email[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {selectedCustomer.email}
            </Text>
            <Text
              style={[
                MainStyle.dmSansLight,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {_phone_long[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {selectedCustomer.phone}
            </Text>
            <Text
              style={[
                MainStyle.dmSansLight,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {_alamat[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {selectedCustomer.address}
            </Text>
            <Text
              style={[
                MainStyle.dmSansLight,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {_catatan[this.state.languageIndex]}
            </Text>
            <Text
              style={[
                MainStyle.dmSansBold,
                { fontSize: 20, color: BLACK, marginTop: 5 }
              ]}
            >
              {selectedCustomer.notes}
            </Text>
            <View
              style={{
                flex: 1,

                justifyContent: "flex-end"
              }}
            >
              <View
                style={{
                  alignSelf: "flex-end",
                  width: "60%",
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
                      MainStyle.dmSansBold,
                      {
                        fontSize: 20,
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
                      MainStyle.dmSansBold,
                      { fontSize: 20, color: WHITE }
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
        <Header
          colorIndex={this.state.colorIndex}
          title={_data_pelanggan[this.state.languageIndex]}
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
        {showAlert ? (
          <CustomAlert
            colorIndex={this.state.colorIndex}
            message={alertMessage}
            //title={'Success'}
            closeText={"Go Back"}
            actions={() => {
              this.setState({ showAlert: false });
              //Actions.pop();
            }}
          />
        ) : (
          <View />
        )}
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
                  marginTop: 0,
                  backgroundColor: "#EEEEEE",
                  borderRadius: 5,
                  borderWidth: 1,
                  elevation: 3,
                  borderColor: MAIN_THEME_COLOR
                }
              ]}
            >
              {this.renderForm()}
              {/* {this.renderTime()} */}
              {/* {this.renderReason()} */}
            </View>

            <View style={[ss.rightSide]}>
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

              {/* {this.renderPinNumber()}
              {this.renderPinButton()} */}
            </View>
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
  leftSide: {
    width: "54%",
    marginTop: 0
  },
  rightSide: {
    width: "45%",
    marginTop: 0,
    backgroundColor: "rgba(250, 250, 250, 0.97)",
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
    marginTop: 0,
    marginLeft: 25,
    paddingLeft: 10,
    marginRight: 25,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    width: "95%",
    //flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between"
  },
  formInputText: {
    color: BLACK,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: -10,
    height: 40,
    fontSize: 20,
    fontFamily: "RobotoSlab-Bold"
  }
});
