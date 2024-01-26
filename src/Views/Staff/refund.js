import React, { Component } from 'react';
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
} from 'react-native';

import MainStyle from '../../Styles';

import { getDistance, convertDistance, decimalToSexagesimal } from 'geolib';

import Header from '../../Components/Header';
import Image from "../../Components/Image";
import Button from '../../Components/Button';
import AlertLogin from '../../Components/AlertLogin';
import FloatingTextInput from '../../Components/FloatingTextInput';
import TabBar from '../../Components/TabBar';
import { Actions } from 'react-native-router-flux';
import Dropdown from "../../Components/Dropdown";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Geolocation from '@react-native-community/geolocation';
// import Orientation from 'react-native-orientation-locker';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  MAIN_THEME_COLOR,
  WHITE,
  BLACK,
  RED_500,
  GREY_100,
  GREY_900,
  GREY_700,
} from '../../Libraries/Colors';

import LoginFunctions from '../../Libraries/LoginFunctions';

import moment from 'moment';

export default class Absensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      clockIn: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      clockOut: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      selectedUser: 1,
      listReason: [
        {
          id: 1,
          name: "Kesalahan Input"
        },
        {
          id: 2,
          name: "Permintaan Pelanggan"
        },
        {
          id: 3,
          name: "Produk Habis"
        }
      ],
      selectedReason: 0,
      notes: "",
      listUser: [
        {
          id: 1,
          name: 'Mr Manager',
          position: 'Manager',
          pin: '123123',
          image:
            'https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png'
        },
        {
          id: 2,
          name: 'Mr Cashier',
          position: 'Cashier',
          pin: '123456',
          image:
            'https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png'
        },
        {
          id: 3,
          name: 'Miss Waiter',
          position: 'Waiter',
          pin: '111111',
          image:
            'https://cdn.discordapp.com/attachments/586761579614437376/664648736101892116/Vector.png'
        }
      ],
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      pin5: '',
      pin6: '',
      ready: ''
    };
  }

  componentDidMount() {}

  componentDidUpdate(nextProps) {}

  changePin(value, command) {
    //input, clear, delete
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    //console.log('CHANGE PIN value ', value);
    //console.log("CHANGE PIN command ", command);
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
      ///console.log("is Full Pin? ==> ", fullPin)

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
      console.log('enter clear function?');
      this.setState({
        pin1: '',
        pin2: '',
        pin3: '',
        pin4: '',
        pin5: '',
        pin6: ''
      });
    }
  }

  absensiClockIn() {}

  absensiClockOut() {}

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
            elevation: 1,
          },
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
            justifyContent: 'space-between',
            alignItems: 'center'
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
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(1, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
                ]}
              >
                1
              </Text>
            </Button>
            <Button
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(2, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
                ]}
              >
                2
              </Text>
            </Button>
            <Button
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(3, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
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
            justifyContent: 'space-between',
            alignItems: 'center'
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
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(4, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
                ]}
              >
                4
              </Text>
            </Button>
            <Button
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(5, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
                ]}
              >
                5
              </Text>
            </Button>
            <Button
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(6, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
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
            justifyContent: 'space-between',
            alignItems: 'center'
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
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(7, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
                ]}
              >
                7
              </Text>
            </Button>
            <Button
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(8, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
                ]}
              >
                8
              </Text>
            </Button>
            <Button
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(9, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
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
            justifyContent: 'space-between',
            alignItems: 'center'
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
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(-1, "clear");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
                ]}
              >
                C
              </Text>
            </Button>
            <Button
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(0, "input");
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 48, color: WHITE },
                ]}
              >
                0
              </Text>
            </Button>
            <Button
              style={[ss.pinButton]}
              onPress={() => {
                this.changePin(-1, "delete");
              }}
            >
              <MaterialCommunityIcons
                name={"backspace"}
                style={{ fontSize: 40, color: WHITE }}
              />
            </Button>
          </View>
        </View>
        {/* ROW 4 END */}
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center'
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
                { width: '45%', padding: 15, backgroundColor: '#C84343' },
              ]}
              onPress={() => {
                //this.changePin(7, "input");
                this.absensiClockIn();
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: WHITE },
                ]}
              >
                Cancel
              </Text>
            </Button>
            <Button
              style={[
                ss.button,
                { width: '45%', padding: 15, backgroundColor: '#83B235' },
              ]}
              onPress={() => {
                this.absensiClockOut();
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  { fontSize: 20, color: WHITE },
                ]}
              >
                Enter
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
            backgroundColor: MAIN_THEME_COLOR,
            padding: 20,
            margin: 25
          },
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
          {pin1 !== '' ? (
            <Fontisto
              name={"asterisk"}
              style={{ fontSize: 20, color: WHITE }}
            />
          ) : (
            <Fontisto name={'ellipse'} style={{ fontSize: 20, color: WHITE }} />
          )}

          {pin2 !== '' ? (
            <Fontisto
              name={"asterisk"}
              style={{ fontSize: 20, color: WHITE }}
            />
          ) : (
            <Fontisto name={'ellipse'} style={{ fontSize: 20, color: WHITE }} />
          )}

          {pin3 !== '' ? (
            <Fontisto
              name={"asterisk"}
              style={{ fontSize: 20, color: WHITE }}
            />
          ) : (
            <Fontisto name={'ellipse'} style={{ fontSize: 20, color: WHITE }} />
          )}

          {pin4 !== '' ? (
            <Fontisto
              name={"asterisk"}
              style={{ fontSize: 20, color: WHITE }}
            />
          ) : (
            <Fontisto name={'ellipse'} style={{ fontSize: 20, color: WHITE }} />
          )}

          {pin5 !== '' ? (
            <Fontisto
              name={"asterisk"}
              style={{ fontSize: 20, color: WHITE }}
            />
          ) : (
            <Fontisto name={'ellipse'} style={{ fontSize: 20, color: WHITE }} />
          )}

          {pin6 !== '' ? (
            <Fontisto
              name={"asterisk"}
              style={{ fontSize: 20, color: WHITE }}
            />
          ) : (
            <Fontisto name={'ellipse'} style={{ fontSize: 20, color: WHITE }} />
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
            backgroundColor: MAIN_THEME_COLOR,
            padding: 20,
            margin: 25,
            marginBottom: 15,
            marginTop: 0,
          },
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
            style={[MainStyle.dmSansBold, { color: WHITE, fontSize: 16 }]}
          >
            Pilih User
          </Text>
          <View style={[ss.box, { width: '70%', backgroundColor: WHITE }]}>
            <Dropdown
              style={{
                marginLeft: 0,
                padding: 10,
                borderRadius: 15,

                // paddingRight:100
              }}
              size={16}
              color={BLACK}
              // selectWidth = {'80%'}
              selectedValue={String(this.state.selectedUser)}
              optionLists={this.state.listUser.map((v, k) => {
                //console.log('v ==> ', v);
                return {
                  label: v.position + ' - ' + v.name,
                  value: String(v.id)
                };
              })}
              onValueChange={(itemValue, itemIndex) => {
                //console.log("SELECTED Value ==> ", itemValue);
                this.setState({ selectedUser: itemValue });
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
            backgroundColor: MAIN_THEME_COLOR,
            padding: 10,
            margin: 25,
            marginTop: 0,
            marginBottom: 15,
          },
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
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: "50%",

              //backgroundColor: "#BCA",
              alignContent: "center",
              alignItems: "center",
              ///padding: 10,
              borderColor: 'rgba(125, 125, 125, 0.8)',
              //borderColor: WHITE,
              borderRightWidth: 1
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { color: WHITE, fontSize: 16 }]}
            >
              Masuk
            </Text>
            <View
              style={
                ([ss.box],
                {
                  marginTop: 10,
                  backgroundColor: WHITE,
                  width: '70%',
                  padding: 5,
                  alignContent: "center",
                  alignItems: 'center',
                  justifyContent: 'center',
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
                9:00
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
              borderColor: 'rgba(125, 125, 125, 0.8)'
              //borderColor: WHITE,
              //borderRightWidth: 1
            }}
          >
            <Text
              style={[MainStyle.dmSansBold, { color: WHITE, fontSize: 16 }]}
            >
              Keluar
            </Text>
            <View
              style={
                ([ss.box],
                {
                  marginTop: 10,
                  backgroundColor: WHITE,
                  width: '70%',
                  padding: 5,
                  alignContent: "center",
                  alignItems: 'center',
                  justifyContent: 'center',
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
                19:00
              </Text>
            </View>
          </View>
          {/* Box KEluar */}
        </View>
      </View>
    );
  }

  renderListReason(data, i) {
    let { selectedReason, notes } = this.state;
    let bgcolor = [WHITE, MAIN_THEME_COLOR];
    let textcolor = [BLACK, WHITE];
    let colorIndex = 0;

    if (selectedReason === data.id) {
      colorIndex = 1;
    }

    return (
      <Button
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({ selectedReason: data.id });
        }}
        style={[
          ss.box,
          {
            width: '70%',
            alignContent: "center",
            alignItems: "center",
            justifyContent: 'center',
            padding: 10,
            elevation: 2,
            marginBottom: 5,
            borderWidth: 1,
            borderColor: BLACK,
            //backgroundColor: '#ABC'
            backgroundColor: bgcolor[colorIndex]
          },
        ]}
      >
        <Text
          style={[
            MainStyle.dmSansLight,
            { color: textcolor[colorIndex], fontSize: 16 }
          ]}
        >
          {data.name}
        </Text>
      </Button>
    );
  }

  renderReason() {
    let { selectedReason, notes } = this.state;
    let bgcolor = [WHITE, MAIN_THEME_COLOR];
    let textcolor = [BLACK, WHITE];
    let colorIndex = 0;

    if (selectedReason === 0) {
      colorIndex = 1;
    }

    return (
      <ScrollView
        style={[
          ss.box,
          {
            backgroundColor: WHITE,
            padding: 10,
            margin: 25,
            marginTop: 0,
            marginBottom: 0,
            flex: 1,
          },
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
            marginBottom: 10,
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
                //height: '100%',
                //backgroundColor: "#BCA",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    color: BLACK,
                    fontSize: 28,
                    marginBottom: 30,
                    marginTop: 30
                  }
                ]}
              >
                Issue Refund
              </Text>
              {this.state.listReason.map((items, itemIndex) => {
                return this.renderListReason(items, itemIndex);
              })}
              <Button
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  this.setState({ selectedReason: 0 });
                }}
                style={[
                  ss.box,
                  {
                    width: '70%',
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: 'center',
                    padding: 10,
                    elevation: 2,
                    marginBottom: 5,
                    borderWidth: 1,
                    borderColor: BLACK,
                    //backgroundColor: '#ABC'
                    backgroundColor: bgcolor[colorIndex]
                  },
                ]}
              >
                <Text
                  style={[
                    MainStyle.dmSansLight,
                    { color: textcolor[colorIndex], fontSize: 16 }
                  ]}
                >
                  Lain - lain
                </Text>
              </Button>
              {selectedReason === 0 ? (
                <View
                  style={{
                    //marginTop: 10,
                    //marginLeft: 25,
                    //  marginRight: 25,
                    marginBottom: 10,
                    flexDirection: 'row',
                    //paddingRight: 20,
                    width: '70%',
                    //backgroundColor: '#BCA',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <ScrollView
                    style={{
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 1,
                      marginTop: 5,
                      borderColor: MAIN_THEME_COLOR,
                      minHeight: 100,
                      paddingLeft: 5,
                      paddingRight: 5,
                      backgroundColor: '#EEEEEE',
                      maxHeight: 100,
                    }}
                  >
                    <TextInput
                      style={{
                        textAlignVertical: 'top',
                        flex: 1,
                        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        //backgroundColor: 'transparent',
                        height: 100,
                        //backgroundColor: '#BCA',
                        color: BLACK,
                        marginTop: -8,
                        marginLeft: 0,
                        marginRight: 0,
                        fontSize: 14,
                        fontFamily: 'RobotoSlab-Bold'
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
                      onChangeText={v => this.setState({ notes: v })}
                      value={this.state.notes}
                      placeholder={'Tulis Alasan'}
                    />
                  </ScrollView>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    let height = Dimensions.get('window').height - 90;
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    return (
      <View style={[ss.body]}>
        <Header
          title={this.props.title}
          notif={true}
          loginInformation={this.state.userInfo}
          menu={true}
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <ScrollView
          style={{
            flex: 1
          }}
        >
          <View style={[ss.mainContent, { height: height }]}>
            <View style={[ss.leftSide]}>
              {this.renderSelectUser()}
              {/* {this.renderTime()} */}
              {this.renderReason()}
            </View>

            <View style={[ss.rightSide]}>
              {this.renderPinNumber()}
              {this.renderPinButton()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    flexDirection: 'column'
  },
  mainContent: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 0,
    flex: 1,
    justifyContent: 'space-between'
    //height: '100%' ,
    //backgroundColor: "#995599"
  },
  leftSide: {
    width: "55%",
    marginTop: 0,
  },
  rightSide: {
    width: '45%',
    marginTop: 0,
    backgroundColor: '#FFF',
    elevation: 3,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1
  },
  box: {
    elevation: 1,
    borderRadius: 5,
  },
  pinButton: {
    backgroundColor: MAIN_THEME_COLOR,
    elevation: 1,
    borderRadius: 10,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  button: {
    elevation: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
});
