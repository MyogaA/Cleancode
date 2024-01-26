import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard
} from 'react-native';

import Header from '../../Components/Header';
import { Actions } from 'react-native-router-flux';
import { MAIN_THEME_COLOR, WHITE, BLACK } from '../../Libraries/Colors';

import MainStyle from '../../Styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Button from '../../Components/Button';
import Dropdown from '../../Components/Dropdown';
//import DateTimePicker as DTP from '../../Components/DateTimePicker';

import DateTimePicker from '@react-native-community/datetimepicker';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import moment from 'moment';
import BookingConfirmAlert from '../../Components/BookingConfirmAlert';
import CustomAlert from '../../Components/CustomAlert';
import LoginFunctions from '../../Libraries/LoginFunctions';
import AlertLogin from '../../Components/AlertLogin';
import { _update_success } from '../../Libraries/DictionaryMeja';

export default class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      bookingHistory: null,
      refreshing: false,
      showAlert: false,
      showAlertError: false,
      alertMessage: ["Password does not match"],
      // email: this.props.userInfo.email ? this.props.userInfo.email : '',
      // name: this.state.userInfo.name ? this.props.userInfo.name : '',
      // phone: this.state.userInfo.phone ? this.props.userInfo.phone : '',
      // address: this.state.userInfo.address ? this.props.userInfo.address : '',
      // password: this.state.userInfo.password ? this.props.userInfo.password : '',
      email: "",
      name: "",
      phone: "",
      address: "",
      password: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  componentDidMount() {
    console.log("user edit ==> ", this.props);
    LoginFunctions.LoginInformation(val => {
      //this.setState({userInfo: val});
      this.setState({
        userInfo: {
          name: val.name,
          phone: val.phone,
          email: val.email,
          address: val.address,
          password: val.password
        },
        email: val.email,
        name: val.name,
        address: val.address,
        phone: val.phone,
        password: val.password,
        ready: true,
      });
    });
  }

  componentWillUnmount() {
    Actions.refresh({
      refresh: true
    });
  }

  showDetail(data) {
    //Actions.DetailHistory({data: data});
  }

  renderDataSummary(ready = this.state.ready) {
    //data = data;
    if (ready) {
      return (
        <View>
          <View
            style={{
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              borderBottomWidth: 1,
              borderColor: BLACK,
              paddingBottom: 15,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[MainStyle.dmSansBold, { fontSize: 16 }]}>
                Account Data
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                paddingLeft: 25,
              }}
            >
              <Button
                onPress={() => {
                  let saveData = {
                    name: this.state.name,
                    phone: this.state.phone,
                    email: this.state.email,
                    address: this.state.address,
                    password: this.state.password
                  };

                  this.setState(
                    {
                      userInfo: saveData,
                      showAlert: true,
                    },
                    () => this.forceUpdate()
                  );
                }}
              >
                <View
                  style={{
                    minHeight: 25,
                    minWidth: 75,
                    backgroundColor: MAIN_THEME_COLOR,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: 14,
                        color: WHITE,
                        marginBottom: 5,
                        marginTop: 5,
                        marginLeft: 10,
                        marginRight: 10,
                      },
                    ]}
                  >
                    Save
                  </Text>
                </View>
              </Button>
            </View>
          </View>
          <View style={[styles.box]}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'column', minHeight: 25 }}>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Name*
                  </Text>
                </View>
                <View style={{ width: '70%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 25 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        //minHeight: 25,
                        maxHeight: 35,
                        paddingLeft: 5
                      }}
                    >
                      <TextInput
                        style={{
                          textAlignVertical: "center",
                          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          //backgroundColor: 'transparent',
                          color: BLACK,
                          marginTop: -5,
                          marginBottom: -5,
                          marginLeft: 0,
                          marginRight: 0,
                          fontSize: 14,
                          fontFamily: "RobotoSlab-Bold"
                        }}
                        multiline={false}
                        type="text"
                        refx={q => {
                          this._name = q;
                        }}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          //this.getData(this.state.notes);
                          // this.setState({viewSearch: false});
                          //this._phone.focus()
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => this.setState({ name: v })}
                        value={this.state.name}
                        placeholder={""}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  minHeight: 25,
                  marginTop: 15,
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Profile Picture*
                  </Text>
                </View>
                <View style={{ width: '70%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 25 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        //: 25,
                        minHeight: 80,
                        paddingLeft: 5,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          height: 80,
                          width: 80,
                          alignItems: "center"
                          //alignContent: 'center'
                        }}
                      >
                        <Entypo
                          name="image"
                          style={{
                            fontSize: 50,
                            color: "#D0CECF",
                            marginTop: 13,
                            marginLeft: 15
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 13,
                          marginLeft: 20,
                          alignItems: "center"
                          //alignContent: 'center'
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            { fontSize: 10, color: '#394456' },
                          ]}
                        >
                          Drag & Drop File Here
                        </Text>
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            { fontSize: 10, color: '#394456' },
                          ]}
                        >
                          Or
                        </Text>
                        <Button>
                          <View
                            style={{
                              minHeight: 25,
                              minWidth: 75,
                              backgroundColor: "rgba(162, 220, 104, 0.96)",
                              borderRadius: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.dmSansBold,
                                {
                                  fontSize: 10,
                                  color: WHITE,
                                  marginBottom: 5,
                                  marginTop: 5,
                                  marginLeft: 10,
                                  marginRight: 10,
                                },
                              ]}
                            >
                              Upload
                            </Text>
                          </View>
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  minHeight: 25,
                  marginTop: 15
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Phone*
                  </Text>
                </View>
                <View style={{ width: '70%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 25 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        maxHeight: 35,
                        paddingLeft: 5,
                      }}
                    >
                      <TextInput
                        style={{
                          textAlignVertical: "center",
                          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          //backgroundColor: 'transparent',
                          color: BLACK,
                          marginTop: -5,
                          marginBottom: -5,
                          marginLeft: 0,
                          marginRight: 0,
                          fontSize: 14,
                          fontFamily: "RobotoSlab-Bold"
                        }}
                        multiline={false}
                        type="text"
                        refx={q => {
                          this._phone = q;
                        }}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          //this.getData(this.state.notes);
                          // this.setState({viewSearch: false});
                          //this.refs._email.focus()
                        }}
                        keyboardType={"phone-pad"}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => this.setState({ phone: v })}
                        value={this.state.phone}
                        placeholder={""}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  minHeight: 25,
                  marginTop: 15
                }}
              >
                <View style={{ width: '50%', flexDirection: "column" }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Email*
                  </Text>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 10 }]}>
                    Verify Your Email Address
                  </Text>
                </View>
                <View style={{ width: '70%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 25 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        maxHeight: 35,
                        paddingLeft: 5,
                      }}
                    >
                      <TextInput
                        style={{
                          textAlignVertical: "top",
                          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          //backgroundColor: 'transparent',
                          color: BLACK,
                          marginTop: -5,
                          marginBottom: -5,

                          marginLeft: 0,
                          marginRight: 0,
                          fontSize: 14,
                          fontFamily: "RobotoSlab-Bold"
                        }}
                        multiline={false}
                        type="text"
                        // refx={q => {
                        //   this._email = q;
                        // }}
                        refx={"_email"}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          //this.getData(this.state.notes);
                          // this.setState({viewSearch: false});
                          //this._address.focus()
                        }}
                        keyboardType="email-address"
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => this.setState({ email: v })}
                        value={this.state.email}
                        placeholder={""}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  minHeight: 25,
                  marginTop: 15,
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Alamat
                  </Text>
                </View>
                <View style={{ width: '100%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 80 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 80,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <TextInput
                        style={{
                          textAlignVertical: 'top',
                          flex: 1,
                          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          //backgroundColor: 'transparent',
                          color: BLACK,
                          marginTop: -8,
                          marginLeft: 0,
                          marginRight: 0,
                          fontSize: 14,
                          fontFamily: 'RobotoSlab-Bold',
                        }}
                        multiline={true}
                        type="text"
                        refx={q => {
                          this._address = q;
                        }}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          //this.getData(this.state.notes);
                          // this.setState({viewSearch: false});
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => this.setState({ address: v })}
                        value={this.state.address}
                        placeholder={''}
                      />
                    </View>
                  </View>
                </View>
              </View>
              {/* account info end */}
              {/* <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    width: "50%",
                    flex: 1,
                    paddingTop: 10,
                    paddingRight: 7
                  }}
                >
                  <Button
                    onPress={() => {
                      Actions.pop();
                      //this.editAccount();
                    }}
                  >
                    <View
                      style={{
                        minHeight: 25,
                        minWidth: 75,
                        backgroundColor: MAIN_THEME_COLOR,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          {
                            fontSize: 14,
                            color: WHITE,
                            marginBottom: 5,
                            marginTop: 5,
                            marginLeft: 10,
                            marginRight: 10
                          }
                        ]}
                      >
                        Back
                      </Text>
                    </View>
                  </Button>
                </View>
              </View> */}
            </View>
          </View>
          {/* boxend */}

          <View
            style={{
              marginTop: 15,
              paddingTop: 15,
              marginLeft: 15,
              marginRight: 15,
              //marginBottom: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: BLACK,
              paddingBottom: 15,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[MainStyle.dmSansBold, { fontSize: 16 }]}>
                Change Password
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                paddingLeft: 25,
              }}
            >
              <Button
                onPress={() => {
                  if (this.state.password === this.state.oldPassword) {
                    let alertMessage = [];
                    let error = false;
                    if (this.state.newPassword === "") {
                      error = true;
                      alertMessage.push("New Password must be filled");;
                    }

                    if (this.state.confirmPassword === "") {
                      error = true;
                      alertMessage.push("Confirm Password must be filled");;
                    }
                    if (
                      this.state.newPassword !== "" &&
                      this.state.confirmPassword !== "" &&
                      this.state.newPassword !== this.state.confirmPassword
                    ) {
                      error = true;
                      alertMessage.push(
                        "New Password and Confirm Password must be same"
                      );
                    }

                    if (error === false) {
                      let saveData = {
                        name: this.state.name,
                        phone: this.state.phone,
                        email: this.state.email,
                        address: this.state.address,
                        password: this.state.newPassword
                      };

                      this.setState(
                        {
                          userInfo: saveData,
                          showAlert: true,
                        },
                        () => this.forceUpdate()
                      );
                    } else {
                      this.setState(
                        {
                          showAlertError: true,
                          alertMessage: alertMessage
                        },
                        () => this.forceUpdate()
                      );

                    }
                  } else {
                    this.setState(
                      {
                        showAlertError: true,
                        alertMessage: ["Old Password is incorrect"],
                      },
                      () => this.forceUpdate()
                    );
                  }
                }}
              >
                <View
                  style={{
                    minHeight: 25,
                    minWidth: 75,
                    backgroundColor: MAIN_THEME_COLOR,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: 14,
                        color: WHITE,
                        marginBottom: 5,
                        marginTop: 5,
                        marginLeft: 10,
                        marginRight: 10,
                      },
                    ]}
                  >
                    Save
                  </Text>
                </View>
              </Button>
            </View>
          </View>
          <View style={[styles.box]}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'column', minHeight: 25 }}>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Old Password*
                  </Text>
                </View>
                <View style={{ width: '70%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 25 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        //minHeight: 25,
                        maxHeight: 35,
                        paddingLeft: 5
                      }}
                    >
                      <TextInput
                        style={{
                          textAlignVertical: "center",
                          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          //backgroundColor: 'transparent',
                          color: BLACK,
                          marginTop: -5,
                          marginBottom: -5,
                          marginLeft: 0,
                          marginRight: 0,
                          fontSize: 14,
                          fontFamily: "RobotoSlab-Bold"
                        }}
                        multiline={false}
                        type="text"
                        refx={q => {
                          this._oldPassword = q;
                        }}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          //this.getData(this.state.notes);
                          // this.setState({viewSearch: false});
                          //this._phone.focus()
                        }}
                        secureTextEntry={true}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => this.setState({ oldPassword: v })}
                        value={this.state.oldPassword}
                        placeholder={""}
                      />
                    </View>
                  </View>
                </View>
              </View>
              {/* oldpassword */}
              <View
                style={{
                  flexDirection: "column",
                  minHeight: 25,
                  marginTop: 15
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    New Password*
                  </Text>
                </View>
                <View style={{ width: '70%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 25 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        //minHeight: 25,
                        maxHeight: 35,
                        paddingLeft: 5
                      }}
                    >
                      <TextInput
                        style={{
                          textAlignVertical: "center",
                          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          //backgroundColor: 'transparent',
                          color: BLACK,
                          marginTop: -5,
                          marginBottom: -5,
                          marginLeft: 0,
                          marginRight: 0,
                          fontSize: 14,
                          fontFamily: "RobotoSlab-Bold"
                        }}
                        multiline={false}
                        type="text"
                        refx={q => {
                          this._newPassword = q;
                        }}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          //this.getData(this.state.notes);
                          // this.setState({viewSearch: false});
                          //this._phone.focus()
                        }}
                        secureTextEntry={true}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => this.setState({ newPassword: v })}
                        value={this.state.newPassword}
                        placeholder={""}
                      />
                    </View>
                  </View>
                </View>
              </View>
              {/* new password */}
              <View
                style={{
                  flexDirection: "column",
                  minHeight: 25,
                  marginTop: 15
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Confirm Password*
                  </Text>
                </View>
                <View style={{ width: '70%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 25 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        //minHeight: 25,
                        maxHeight: 35,
                        paddingLeft: 5
                      }}
                    >
                      <TextInput
                        style={{
                          textAlignVertical: "center",
                          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          //backgroundColor: 'transparent',
                          color: BLACK,
                          marginTop: -5,
                          marginBottom: -5,
                          marginLeft: 0,
                          marginRight: 0,
                          fontSize: 14,
                          fontFamily: "RobotoSlab-Bold"
                        }}
                        multiline={false}
                        type="text"
                        refx={q => {
                          this._confirmPassword = q;
                        }}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          //this.getData(this.state.notes);
                          // this.setState({viewSearch: false});
                          //this._phone.focus()
                        }}
                        secureTextEntry={true}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v =>
                          this.setState({ confirmPassword: v })
                        }
                        value={this.state.confirmPassword}
                        placeholder={""}
                      />
                    </View>
                  </View>
                </View>
              </View>
              {/* confirm password */}
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }

  _renderFooter() {
    return <View style={{ height: 15 }} />;
  }

  getData(search = this.state.searchKey) {}

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        //this._getPaketPromo();
        console.log('Refreshing');
        this.setState({
          refreshing: false,
        });
      }
    );
  };

  handleLoadMore() {}

  _handleDateTimePicker(date) {
    let timeNow = moment(new Date()).format('LL');
    let timeSelected = moment(date).format('LL');

    this.setState(
      {
        date: moment(date).format('DD/MM/YYYY'),
      },
      () => this.forceUpdate(),
      this._hideDatePicker()
    );
  }

  _hideDatePicker() {
    this.setState({
      datePicker: false,
    });
  }

  _showDatePicker() {
    this.setState({
      datePicker: true,
    });
  }

  _hideTimePicker() {
    this.setState({
      timePicker: false,
    });
  }

  _showTimePicker() {
    this.setState({
      timePicker: true,
    });
  }

  setDate = (event, date) => {
    console.log('setDate ==> ', date);
    date = date || this.state.bookingDate;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      bookingDate: date,
      datePicker: false,
    });
  };

  setTime = (event, date) => {
    console.log('setTime ==> ', date);
    date = date || this.state.bookingTime;

    this.setState({
      //show: Platform.OS === 'ios' ? true : false,
      bookingTime: date,
      timePicker: false,
    });
  };

  render() {
    const {
      ready,
      refreshing,
      dataConfirmation,
      showConfirmation,
      showAlert,
      showAlertError,
      alertMessage
    } = this.state;

    const { data } = this.props;

    //console.log('bookingDate2 ==> ', this.state.bookingDate2)
    //console.log('bookingDate2 ==> ', new Date(this.state.bookingDate2))

    let message = [_update_success[this.state.languageIndex]];

    //console.log("bookingDate ==> ", this.state.bookingDate);
    //console.log("bookingDate ==> ", new Date(this.state.bookingDate));
    return (
      <View style={styles.body}>
        <Header
          title={this.props.title}
          notif={true}
          login={!this.props.isLogin}
          isLogin={this.props.isLogin}
          logoutActivity={this.props.logoutActivity}
          loginInformation={this.props.loginInformation}
          menu={true}
        />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {showAlert ? (
          <CustomAlert
            message={message}
            colorIndex={this.state.colorIndex}
            //title={'Success'}
            closeText={'Go Back'}
            actions={() => {
              this.setState({ showAlert: false });
              LoginFunctions.Login(this.state.userInfo, response => {
                if (response) {
                  Actions.pop();
                  Actions.UserInfo({ userInfo: this.state.userInfo });
                  //Actions.Home({userInfo: information});
                } else {
                  console.log("Update Failed");
                }
              });
              //Actions.pop();
            }}
          />
        ) : (
          <View />
        )}

        {showAlertError ? (
          <CustomAlert
            message={alertMessage}
            colorIndex={this.state.colorIndex}
            //title={'Success'}
            closeText={'Ok'}
            actions={() => {
              this.setState({ showAlertError: false });
              //Actions.pop();
            }}
          />
        ) : (
          <View />
        )}

        <View
          style={{
            flexDirection: 'column',
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            flex: 1,
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {this.renderDataSummary(data, ready)}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'column',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    color: 'red',
    borderRadius: 5,
    width: 100,
    height: 50,
  },
  box: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 0,
    minHeight: 50,
    //height: '100%',
    //flex: 1,
    flexDirection: 'column',
    borderColor: MAIN_THEME_COLOR,
    // borderBottomWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderTopWidth: 1,
    borderRadius: 10,
    backgroundColor: WHITE,
    //backgroundColor: '#BCA',
    //elevation: 1,
  },
});
