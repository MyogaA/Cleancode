/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";

import Header from "../../Components/Header";
import { Actions } from "react-native-router-flux";
import { MAIN_THEME_COLOR, WHITE, BLACK } from "../../Libraries/Colors";
import MainStyle from "../../Styles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Button from "../../Components/Button";
import CustomAlert from "../../Components/CustomAlert";
import AlertLogin from "../../Components/AlertLogin";

import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import LoginFunctions from "../../Libraries/LoginFunctions";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      bookingHistory: null,
      refreshing: false,
      showAlert: false
    };
  }

  componentDidMount() {
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
        // userInfo: {
        //   name: 'Billy Nugraha',
        //   phone: '08155542667',
        //   email: 'nugraha@gmail.com',
        //   address:
        //     'Tegal Alur, Blok B2 No 14, Jakarta Barat, Daerah Khusus Ibukota Jakarta, Indonesia.',
        // },
        bookingHistory: [
          {
            restaurant: "Xing Fu Tang - Lippo Mall Puri",
            peoples: "2",
            bookingTime: "18:00",
            date: "29/10/2019",
            orderTime: "12:34",
            notes:
              "Notes 1, Notes 2, Notes 3, Notes 4, Notes 5, Notes 6, Notes 7, Notes 8, Notes 9, Notes 10, Notes 11, Notes 12, Notes 13, Notes 14, Notes 15",
            cancelReason: "",
            statusDesc: "Waiting For Confirmation",
            status: 1
          },
          {
            restaurant: "Xing Fu Tang - Lippo Mall Puri",
            peoples: "3",
            bookingTime: "19:00",
            date: "30/10/2019",
            orderTime: "13:34",
            notes: "",
            cancelReason: "",
            statusDesc: "Confirmed Booking",
            status: 2
          },
          {
            restaurant: "Xing Fu Tang - Lippo Mall Puri",
            peoples: "4",
            bookingTime: "20:00",
            date: "31/10/2019",
            orderTime: "14:34",
            notes: "",
            cancelReason: "Restoran penuh",
            statusDesc: "Cancelled Booking",
            status: 3
          }
        ],
        ready: true
      });
    });

    //fconsole.log('USER INFO PROPS ==> ',this.props);
  }

  componentWillUpdate(nextProps) {
    //console.log('componentWillUpdate user 1')

    if (this.props !== nextProps) {
      //console.log('componentWillUpdate user 2')
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
          // userInfo: {
          //   name: 'Billy Nugraha',
          //   phone: '08155542667',
          //   email: 'nugraha@gmail.com',
          //   address:
          //     'Tegal Alur, Blok B2 No 14, Jakarta Barat, Daerah Khusus Ibukota Jakarta, Indonesia.',
          // },
          bookingHistory: [
            {
              restaurant: "Xing Fu Tang - Lippo Mall Puri",
              peoples: "2",
              bookingTime: "18:00",
              date: "29/10/2019",
              orderTime: "12:34",
              notes:
                "Notes 1, Notes 2, Notes 3, Notes 4, Notes 5, Notes 6, Notes 7, Notes 8, Notes 9, Notes 10, Notes 11, Notes 12, Notes 13, Notes 14, Notes 15",
              cancelReason: "",
              statusDesc: "Waiting For Confirmation",
              status: 1
            },
            {
              restaurant: "Xing Fu Tang - Lippo Mall Puri",
              peoples: "3",
              bookingTime: "19:00",
              date: "30/10/2019",
              orderTime: "13:34",
              notes: "",
              cancelReason: "",
              statusDesc: "Confirmed Booking",
              status: 2
            },
            {
              restaurant: "Xing Fu Tang - Lippo Mall Puri",
              peoples: "4",
              bookingTime: "20:00",
              date: "31/10/2019",
              orderTime: "14:34",
              notes: "",
              cancelReason: "Restoran penuh",
              statusDesc: "Cancelled Booking",
              status: 3
            }
          ],
          ready: true
        });
      });
    }
  }

  editAccount() {
    //this.setState({showAlert: true});
    //console.log('edit account ==> ', this.state.userInfo)
    Actions.UserEdit({ userInfo: this.state.userInfo });
  }

  showDetail(data) {
    //Actions.BookingSummary({data: data});
  }

  renderDataHistory(data = this.state.bookingHistory, i = 0) {
    //console.log('renderDetail data ==> ', data);
    //console.log('renderDetail i ==> ', i);

    let allBtnColor = {
      "1": "#FAFF00",
      "2": "#99E94A",
      "3": "#E24242"
    };
    let status = data.status;
    let color = allBtnColor[`${status}`];
    //console.log('renderDetail color ==> ', color);

    return (
      <View key={"data" + i} style={{ flex: 1, elevation: 1, marginTop: 15 }}>
        <Button
          onPress={() => {
            this.showDetail(data);
          }}
        >
          <View style={[styles.boxHistory]}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ minHeight: 25 }}>
                <Text style={[MainStyle.dmSans, { fontSize: 14 }]}>
                  {data ? data.restaurant : ""}
                </Text>
              </View>
              <View style={{ flexDirection: "row", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Number of Peoples
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.peoples : ""} Person
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Booking Time
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.bookingTime : ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Date
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.date : ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Order Time
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.orderTime : ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "column", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Notes
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "column", minHeight: 80 }}>
                <View
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: MAIN_THEME_COLOR,
                    minHeight: 80,
                    padding: 10
                  }}
                >
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.notes : ""}
                  </Text>
                </View>
              </View>
              {data && data.status === 3 ? (
                [
                  <View
                    style={{
                      flexDirection: "column",
                      minHeight: 25,
                      marginTop: 10
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={[MainStyle.dmSansLight, { fontSize: 12 }]}
                      >
                        Cancellation Reason
                      </Text>
                    </View>
                  </View>,
                  <View style={{ flexDirection: "column", minHeight: 80 }}>
                    <View
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 80,
                        padding: 10
                      }}
                    >
                      <Text
                        style={[MainStyle.dmSansLight, { fontSize: 12 }]}
                      >
                        {data ? data.cancelReason : ""}
                      </Text>
                    </View>
                  </View>
                ]
              ) : (
                <View />
              )}
            </View>
          </View>
          <View
            style={{
              backgroundColor: color,
              flex: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderColor: MAIN_THEME_COLOR,
              minHeight: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={[MainStyle.dmSans, { fontSize: 12 }]}>
              Waiting For Confirmation
            </Text>
          </View>
        </Button>
      </View>
    );
  }

  renderDataUser(data = this.state.userInfo, ready = this.state.ready) {
    let userInfo = data;

    if (ready) {
      return (
        <View>
          <View style={{ marginTop: 15 }}>
            <Text style={[MainStyle.dmSans, { fontSize: 16 }]}>
              Account Information
            </Text>
          </View>
          <View style={[styles.box]}>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  minHeight: 50,
                  marginBottom: 0
                }}
              >
                <View style={{ width: "50%", padding: 15 }}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      overflow: "hidden",
                      borderRadius: 100
                    }}
                    source={require("../../Images/noimage.png")}
                    //source={{uri: 'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg'}}
                  />
                </View>
                <View
                  style={{
                    width: "50%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 15
                  }}
                >
                  <Button
                    onPress={() => {
                      this.editAccount();
                    }}
                  >
                    <View
                      style={{
                        minHeight: 25,
                        minWidth: 75,
                        backgroundColor: MAIN_THEME_COLOR,
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
                            marginRight: 10
                          }
                        ]}
                      >
                        Edit Account
                      </Text>
                    </View>
                  </Button>
                  {/* <Button
                    onPress={() => {
                      this.editAccount();
                    }}>
                    <View
                      style={{
                        marginTop: 10,
                        minHeight: 25,
                        minWidth: 75,
                        backgroundColor: MAIN_THEME_COLOR,
                        borderRadius: 10,
                      }}>
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
                          },
                        ]}>
                        Log Out
                      </Text>
                    </View>
                  </Button> */}
                </View>
              </View>
              <View style={{ flexDirection: "row", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Name
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSans, { fontSize: 12 }]}>
                    {ready ? userInfo.name : ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Phone Number
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSans, { fontSize: 12 }]}>
                    {ready ? userInfo.phone : ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Email
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSans, { fontSize: 12 }]}>
                    {ready ? userInfo.email : ""}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", minHeight: 25 }}>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Alamat
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={[MainStyle.dmSans, { fontSize: 12 }]}>
                    {ready ? userInfo.address : ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={[MainStyle.dmSans, { fontSize: 16 }]}>
              Your Booking History
            </Text>
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
        refreshing: true
      },
      () => {
        //this._getPaketPromo();
        console.log("Refreshing");
        this.setState({
          refreshing: false
        });
      }
    );
  };

  handleLoadMore() {}

  render() {
    const { userInfo, ready, refreshing, showAlert } = this.state;

    let message = [
      "You have successfully request a book at",
      "Xing Fu Tang - Lippo Mall Puri",
      "We will inform you about your booking shortly."
    ];
    let combine = "";
    message.map(val => {
      if (combine === "") {
        combine = val;
      } else {
        combine = combine + "\n" + val;
      }
    });

    return (
      <View style={styles.body}>
        {/* {showAlert ? (
          <CustomAlert
            message={message}
            //title={'Success'}
            closeText={'Go Back'}
            actions={() => {
              this.setState({showAlert: false});
            }}
          />
        ) : (
          <View />
        )} */}

        {showAlert ? (
          <AlertLogin
            //colorIndex={this.state.colorIndex}
            //message={message}
            //title={'Success'}
            extra={"booking"}
            closeText={"Cancel"}
            actions={() => {
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}

        <Header
          title={this.props.title}
          notif={true}
          loginInformation={this.state.userInfo}
          menu={true}
        />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            flexDirection: "column",
            marginTop: 0,
            marginLeft: 15,
            marginRight: 15,
            flex: 1
          }}
        >
          {/* box 1 end */}
          {/* box 2 start */}
          {/* {this.renderData()} */}
          {ready ? (
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.bookingHistory}
              ListHeaderComponent={this.renderDataUser(userInfo, ready)}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={{ marginBottom: 15 }}>
                    {this.renderDataHistory(item, index)}
                  </View>
                );
              }}
              ListFooterComponent={this._renderFooter}
              keyExtractor={(item, index) => {
                //console.log('MainRenderData' + index.toString());
                return "MainRenderData" + index.toString();
              }}
              onRefresh={this._onRefresh}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              refreshing={refreshing}
            />
          ) : (
            <View />
          )}
          {/* box 2 end */}
          {/* {this.renderDetail()} */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: "column"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark
  },
  highlight: {
    fontWeight: "700"
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  },
  button: {
    color: "red",
    borderRadius: 5,
    width: 100,
    height: 50
  },
  box: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 15,
    minHeight: 50,
    //height: '100%',
    //flex: 1,
    flexDirection: "column",
    borderColor: MAIN_THEME_COLOR,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: 10,
    backgroundColor: WHITE,
    //backgroundColor: '#BCA',
    elevation: 1
  },

  boxHistory: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    minHeight: 50,
    //height: '100%',
    //flex: 1,
    flexDirection: "column",
    borderColor: MAIN_THEME_COLOR,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: WHITE
    //backgroundColor: '#BCA',
    //elevation: 1,
  }
});
