/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */

import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Image,
  AsyncStorage,
  Alert,
  Text
} from "react-native";
// import Button from 'react-native-button';
import { Actions } from "react-native-router-flux";

// import LinearGradient from "react-native-linear-gradient";

import {
  WHITE,
  GREY_500,
  GREY_200,
  GREY_900,
  RED_700,
  BLACK,
  SEA_BLUE_500,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT
} from "./Libraries/Colors";

import {
  _transaksi,
  _riwayat,
  _absensi,
  _management,
  _rekap,
  _pengaturan
} from "./Libraries/DictionaryDrawer";

// import Text from './Components/Text';
import Button from "./Components/Button";
import Icon from "react-native-vector-icons/Ionicons";
import EnIcon from "react-native-vector-icons/Entypo";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MateIcon from "react-native-vector-icons/MaterialIcons";
import ZoIcon from "react-native-vector-icons/Zocial";
import OctIcon from "react-native-vector-icons/Octicons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import FA5 from "react-native-vector-icons/FontAwesome5";
import IconAnt from "react-native-vector-icons/AntDesign";

import NewAsyncStorage from "./Libraries/AsyncStorage";

// import { getToken, getUser, getUserId } from './Libraries/Token';
//import { PROFILE, UPLOADDIR, UPLOADFILE } from './Constant';
import ImagePicker from "react-native-image-picker";
import MainStyle from "./Styles";
import LoginFunctions from "./Libraries/LoginFunctions";
import ColorFunctions from "./Libraries/ColorFunctions";
import DeviceInfo from "react-native-device-info";
import PrinterFunctions from "./Libraries/PrinterFunctions";
//
// const version = require('../version.json').version;

// import { DocumentPicker, ImagePicker } from 'expo';

type Props = {
  selectedIndex: number
};

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false,
      user: "",
      token: "",
      avatarImage: "",
      userprofile: null,
      data: null,
      userInfo: null,
      store: null,
      selectMenuDw: false,
      loadingLogout: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0
    };
  }

  componentDidMount() {
    this.getColorIndex();
    this.getDataUser();
    this.getLaguageIndex();
  }

  async getColorIndex() {
    ColorFunctions.GetColor(val => {
      this.setState({
        colorIndex: val && val !== this.state.colorIndex ? val : 0
      });
    });
  }

  async getLaguageIndex() {
    PrinterFunctions.GetLanguage(val => {
      this.setState({
        languageIndex: val && val !== this.state.languageIndex ? val : 0
      });
    });
  }

  async getDataUser() {
    // let nas = new NewAsyncStorage();
    // nas.getItemByKey('@global:user', e => {
    //   let dataUser = JSON.parse(e);
    //   console.log('DATA USER STORE==> ', dataUser);
    //   this.setState({
    //     dataUser: dataUser,
    //   }); //userid, username, token, name, store
    // });

    LoginFunctions.LoginInformation(val => {
      this.setState({
        userInfo: val
      });
    });
  }

  componentDidUpdate(nextProps) {
    // if (this.props.nextProps !== nextProps) {
    //   this.getColorIndex();
    //   this.getDataUser();
    //   this.getLaguageIndex();
    // }
    // ColorFunctions.GetColor(val => {
    //   this.setState({
    //     colorIndex: val && val !== this.state.colorIndex ? val : 0,
    //   });
    // });
    // let nas = new NewAsyncStorage();
    // nas.getItemByKey('@global:user', e => {
    //   let dataUser = JSON.parse(e);
    //   if (dataUser.store != this.state.store) {
    //     this.setState({
    //       dataUser: dataUser,
    //       //store: dataUser.store
    //     });
    //     //userid, username, token, name, stores
    //   }
    // });
  }

  // getLogout() {
  //   this.setState({ loading: true });
  //   AsyncStorage.multiRemove(['@global:user', '@global:token'], error => {
  //       if(error) {
  //           console.error('error ==>', error);
  //       }
  //       this.setState({ loading: false });
  //       Actions.reset('login');
  //   })
  // }

  _selectMenuDw = () => {
    if (this.state.selectMenuDw === true) {
      this.setState({ selectMenuDw: false });
    } else {
      this.setState({ selectMenuDw: true });
    }
  };

  _logout() {
    //alert('test');

    Alert.alert("INFO", "Are you sure to logout ?", [
      { text: "YES", onPress: () => this._execute() },
      { text: "NO" }
    ]);
  }

  _execute() {
    this.setState({ loadingLogout: true });
    NewAsyncStorage.removeItem("global", "user", e => {
      this.setState({ loadingLogout: true });
      setTimeout(() => {
        Actions.reset("login");
      }, 3000);
    });
  }

  render() {
    const {
      selectedIndex,
      fromHeader,
      changeStoreAction,
      closeModalAction,
      isHomePage
    } = this.props;
    //console.log('Render DATA ==> ', this.state.data);
    let { data, dataUser, loading, userInfo } = this.state;
    let staffId = userInfo ? userInfo.staff_id : "";
    let version = "1.0";
    //console.log('Render DATA ==> ', this.state.data);
    //console.log('Render DATA USER ==> ', this.state.dataUser);

    if (loading === false) {
      return (
        <View
          style={[
            styles.container,
            { backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex) }
          ]}
        >
          <ScrollView>
            <View
              style={{
                marginBottom: -1,
                marginTop: 0
                //borderTopWidth: 0.5,
                //borderTopColor: GREY_500,
                //backgroundColor: WHITE
              }}
            >
              <View
                style={{
                  paddingTop: 25,
                  paddingBottom: 25,
                  width: "100%",
                  //height: 100,
                  alignContent: "center",
                  alignItems: "center",
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }}
              >
                <View>
                  <MateIcon
                    name="account-circle"
                    size={70}
                    color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                  />
                  <MatIcon
                    name="shield-check"
                    size={36}
                    color="#BCF264"
                    style={{
                      position: "absolute",
                      right: -12,
                      bottom: 0
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: DeviceInfo.isTablet() ? 26 : 14,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {this.state.userInfo
                      ? this.state.userInfo.gerai_name
                      : "Kopi Kiwi"}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      MainStyle.dmSans,
                      {
                        fontSize: DeviceInfo.isTablet() ? 21 : 13,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {this.state.userInfo
                      ? this.state.userInfo.description
                      : "Outlet 1 Jakarta"}
                  </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Button
                    style={{
                      width: 160,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderRadius: 10,
                      borderColor: MAIN_TEXT_COLOR_SELECT(
                        this.state.colorIndex
                      ),
                      borderWidth: 1,
                      backgroundColor: "#FFF",
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <FAIcon name="refresh" size={20} color={BLACK} />
                    <Text
                      style={[
                        MainStyle.dmSans,
                        {
                          fontSize: DeviceInfo.isTablet() ? 16 : 12,
                          color: BLACK
                        }
                      ]}
                    >
                      Update Data
                    </Text>
                  </Button>
                </View>
                <View
                  style={{
                    alignSelf: "flex-end",
                    marginRight: 15,
                    marginTop: 25
                  }}
                >
                  <Text
                    style={[
                      MainStyle.dmSans,
                      {
                        fontSize: DeviceInfo.isTablet() ? 16 : 12,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    Staff ID: {staffId}
                  </Text>
                </View>
              </View>
              <ScrollView style={{ padding: 0 }} scrollEnabled={true}>
                <View style={{}}>
                  <View
                    style={[
                      styles.tabs,
                      {
                        borderTopWidth: 1,
                        borderColor: MAIN_TEXT_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        marginLeft: 15,
                        marginRight: 15
                      }
                    ]}
                  >
                    <Button
                      //onPress={() => {Actions.Home({userInfo: this.state.userInfo})} }
                      onPress={() => {
                        //this._selectMenuDw();
                        if (DeviceInfo.isTablet()) {
                          Actions.HomePage({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        } else {
                          Actions.MobileHomePage({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        }
                      }}
                      style={styles.tab}
                    >
                      <View
                        style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                      >
                        <View
                          style={[
                            styles.IconRadius,
                            {
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          <MatIcon
                            style={{
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                            name="cart-plus"
                            size={25}
                          />
                        </View>
                      </View>
                      <Text
                        style={[
                          MainStyle.dmSans,
                          {
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            fontSize: 16
                          }
                        ]}
                      >
                        {_transaksi[this.state.languageIndex]}
                      </Text>
                    </Button>
                  </View>
                  {/* Transaksi */}
                  <View
                    style={[
                      styles.tabs,
                      {
                        borderTopWidth: 1,
                        borderColor: MAIN_TEXT_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        marginLeft: 15,
                        marginRight: 15
                      }
                    ]}
                  >
                    <Button
                      onPress={() => {
                        //this._selectMenuDw();
                        if (DeviceInfo.isTablet()) {
                          Actions.History({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        } else {
                          Actions.MobileHistory({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        }
                      }}
                      style={styles.tab}
                    >
                      <View
                        style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                      >
                        <View
                          style={[
                            styles.IconRadius,
                            {
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          <MatIcon
                            style={{
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                            name="history"
                            size={25}
                          />
                        </View>
                      </View>
                      <Text
                        style={[
                          MainStyle.dmSans,
                          {
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            fontSize: 16
                          }
                        ]}
                      >
                        {_riwayat[this.state.languageIndex]}
                      </Text>
                    </Button>
                  </View>
                  {/* Riwayat Transaksi */}
                  <View
                    style={[
                      styles.tabs,
                      {
                        borderTopWidth: 1,
                        borderColor: MAIN_TEXT_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        marginLeft: 15,
                        marginRight: 15
                      }
                    ]}
                  >
                    <Button
                      //onPress={() => Actions.Talent() }
                      onPress={() => {
                        //this._selectMenuDw();
                        if (DeviceInfo.isTablet()) {
                          Actions.Absensi({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        } else {
                          Actions.MobileAbsensi({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        }
                      }}
                      style={styles.tab}
                    >
                      <View
                        style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                      >
                        <View
                          style={[
                            styles.IconRadius,
                            {
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          <MatIcon
                            style={{
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                            name="calendar"
                            size={25}
                          />
                        </View>
                      </View>
                      <Text
                        style={[
                          MainStyle.dmSans,
                          {
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            fontSize: 16
                          }
                        ]}
                      >
                        {_absensi[this.state.languageIndex]}
                      </Text>
                    </Button>
                  </View>
                  {/* Absensi */}
                  <View
                    style={[
                      styles.tabs,
                      {
                        borderTopWidth: 1,
                        borderColor: MAIN_TEXT_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        marginLeft: 15,
                        marginRight: 15
                      }
                    ]}
                  >
                    <Button
                      //onPress={() => Actions.Talent() }
                      onPress={() => {
                        if (DeviceInfo.isTablet()) {
                          Actions.Management({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        } else {
                          Actions.MobileManagement({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        }
                      }}
                      style={styles.tab}
                    >
                      <View
                        style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                      >
                        <View
                          style={{
                            width: 30,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            backgroundColor: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            marginRight: 20,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <MateIcon
                            style={{
                              color: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                            name="people"
                            size={25}
                          />
                        </View>
                      </View>
                      <Text
                        style={[
                          MainStyle.dmSans,
                          {
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            fontSize: 16
                          }
                        ]}
                      >
                        {_management[this.state.languageIndex]}
                      </Text>
                    </Button>
                  </View>
                  {/* Manajemen Pelanggan */}
                  <View
                    style={[
                      styles.tabs,
                      {
                        borderTopWidth: 1,
                        borderColor: MAIN_TEXT_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        marginLeft: 15,
                        marginRight: 15
                      }
                    ]}
                  >
                    <Button
                      //onPress={() => Actions.Talent() }
                      onPress={() => {
                        //this._selectMenuDw();
                        if (DeviceInfo.isTablet()) {
                          Actions.Rekap({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        } else {
                          Actions.MobileRekap({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        }
                      }}
                      style={styles.tab}
                    >
                      <View
                        style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                      >
                        <View
                          style={[
                            styles.IconRadius,
                            {
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }
                          ]}
                        >
                          <MatIcon
                            style={{
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                            name="book-open-variant"
                            size={25}
                          />
                        </View>
                      </View>
                      <Text
                        style={[
                          MainStyle.dmSans,
                          {
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            fontSize: 16
                          }
                        ]}
                      >
                        {_rekap[this.state.languageIndex]}
                      </Text>
                    </Button>
                  </View>
                  {/* Rekap Kas */}
                  <View
                    style={[
                      styles.tabs,
                      {
                        borderTopWidth: 1,
                        borderColor: MAIN_TEXT_COLOR_SELECT(
                          this.state.colorIndex
                        ),
                        marginLeft: 15,
                        marginRight: 15
                      }
                    ]}
                  >
                    <Button
                      //onPress={() => Actions.Talent() }
                      onPress={() => {
                        //this._selectMenuDw();
                        if (DeviceInfo.isTablet()) {
                          Actions.Setting({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                        } else {
                          Actions.MobileSetting({
                            userInfo: this.state.userInfo,
                            colorIndex: this.state.colorIndex,
                            languageIndex: this.state.languageIndex
                          });
                          // Actions.Setting({
                          //   userInfo: this.state.userInfo,
                          //   colorIndex: this.state.colorIndex
                          // });
                        }
                      }}
                      style={styles.tab}
                    >
                      <View
                        style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                      >
                        <View
                          style={{
                            width: 30,
                            borderRadius: 3,
                            backgroundColor: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            marginRight: 20,
                            alignContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <FAIcon
                            style={{
                              color: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                            name="gear"
                            size={25}
                          />
                        </View>
                      </View>
                      <Text
                        style={[
                          MainStyle.dmSans,
                          {
                            color: MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            fontSize: 16
                          }
                        ]}
                      >
                        {_pengaturan[this.state.languageIndex]}
                      </Text>
                    </Button>
                  </View>

                  {/* <View
                  style={[
                    styles.tabs,
                    {
                      borderTopWidth: 1,
                      borderColor: WHITE,
                      marginLeft: 15,
                      marginRight: 15
                    },
                  ]}
                >
                  <Button
                    //onPress={() => Actions.Talent() }
                    onPress={() => {
                      //this._selectMenuDw();
                      Actions.Combine({ userInfo: this.state.userInfo });
                    }}
                    style={styles.tab}
                  >
                    <View
                      style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                    >
                      <View
                        style={{
                          width: 30,
                          borderRadius: 3,
                          backgroundColor: WHITE,
                          marginRight: 20,
                          alignContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <FAIcon
                          style={{ color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex) }}
                          name="gear"
                          size={25}

                        />
                      </View>
                    </View>
                    <Text
                      style={[
                        MainStyle.dmSans,
                        { color: WHITE, fontSize: 16 }
                      ]}
                    >
                      Gabung/Pisah
                    </Text>
                  </Button>
                </View> */}

                  {/* <View
                  style={[
                    styles.tabs,
                    {
                      borderTopWidth: 1,
                      borderColor: WHITE,
                      marginLeft: 15,
                      marginRight: 15
                    },
                  ]}
                >
                  <Button
                    //onPress={() => Actions.Talent() }
                    onPress={() => {
                      //this._selectMenuDw();
                      Actions.Meja({ userInfo: this.state.userInfo });
                    }}
                    style={styles.tab}
                  >
                    <View
                      style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                    >
                      <View
                        style={{
                          width: 30,
                          borderRadius: 3,
                          backgroundColor: WHITE,
                          marginRight: 20,
                          alignContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <FAIcon
                          style={{ color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex) }}
                          name="gear"
                          size={25}
                        />
                      </View>
                    </View>
                    <Text
                      style={[
                        MainStyle.dmSans,
                        { color: WHITE, fontSize: 16 }
                      ]}
                    >
                      Manajemen Meja
                    </Text>
                  </Button>
                </View> */}

                  {/* Pengaturan */}

                  {/* <View
                  style={[
                    styles.tabs,
                    {
                      borderTopWidth: 1,
                      borderColor: WHITE,
                      marginLeft: 15,
                      marginRight: 15
                    },
                  ]}
                >
                  <Button
                    //onPress={() => Actions.Talent() }
                    onPress={() => {
                      //this._selectMenuDw();
                      Actions.Day1({ userInfo: this.state.userInfo });
                    }}
                    style={styles.tab}
                  >
                    <View
                      style={{ color: BLACK, fontSize: 16, marginLeft: 25 }}
                    >
                      <View
                        style={{
                          width: 30,
                          borderRadius: 3,
                          backgroundColor: WHITE,
                          marginRight: 20,
                          alignContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <FAIcon
                          style={{ color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex) }}
                          name="gear"
                          size={25}
                        />
                      </View>
                    </View>
                    <Text
                      style={[
                        MainStyle.dmSans,
                        { color: WHITE, fontSize: 16 }
                      ]}
                    >
                      Pengaturan
                    </Text>
                  </Button>
                </View> */}
                  {/* Day 1 Training */}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
          <View
            style={{
              // alignSelf: 'flex-end',
              // marginRight: 15,
              // marginTop: 25,
              position: "absolute",
              bottom: 15,
              right: 15
            }}
          >
            <Text
              style={[
                MainStyle.dmSans,
                {
                  fontSize: 16,
                  color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                }
              ]}
            >
              Versi {version}
            </Text>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    //backgroundColor: MAIN_THEME_COLOR,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'transparent',
    // borderWidth: 2,
    // borderColor: 'red',
    width: "100%" // this For Slide Drawer, Change to 135% for get Full Screen
  },
  tab: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0
    //justifyContent: 'center',
    //   borderColor: '#cccccc',
    //   borderBottomWidth: 1
  },
  tabs: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
    //backgroundColor: WHITE,
  },
  image: {
    height: 100,
    width: "100%"
  },
  IconRadius: {
    width: 35,
    borderRadius: 60,
    paddingBottom: 3,
    paddingTop: 0.5,
    paddingRight: 4,
    paddingLeft: 4,
    marginRight: 15
  }
});

export default Drawer;
