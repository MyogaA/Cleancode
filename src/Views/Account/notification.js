import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";

import Header from "../../Components/Header";
import { MAIN_THEME_COLOR, WHITE } from "../../Libraries/Colors";
import MainStyle from '../../Styles';
import Button from '../../Components/Button';
import { Colors } from "react-native/Libraries/NewAppScreen";

import Fontisto from "react-native-vector-icons/Fontisto";
import { Actions } from "react-native-router-flux";

const point1 = { latitude: -6.1276641, longitude: 106.7288858 };
const point2 = { latitude: -6.1376077, longitude: 106.7320658 };

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      login: false,
      refreshing: false,
      showAlert: false,
      ready: false,
      messages: this.props.messages ? this.props.messages : null,
      bookingHistory: {
        bookingCode: 'BK0024',
        restaurant: 'Xing Fu Tang - Lippo Mall Puri',
        peoples: '2',
        bookingTime: '18:00',
        date: '29/10/2019',
        orderTime: '12:34',
        notes:
          'Notes 1, Notes 2, Notes 3, Notes 4, Notes 5, Notes 6, Notes 7, Notes 8, Notes 9, Notes 10, Notes 11, Notes 12, Notes 13, Notes 14, Notes 15',
        cancelReason: '',
        statusDesc: 'Confirmed Booking',
        status: 2,
      }
    };
  }

  componentDidMount() {
    // let origin = '-6.1276641,106.7288858';
    // let destination = '-6.1376077,106.7320658';
    // this.calculateDistance(point1, point2, (distance) => {
    //   console.log('distance is ==> ', distance);
    // });

    this.setState({ ready: true });
  }

  radians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  calculateDistance(origin, destination, cb) {
    console.log("origin ", origin);
    console.log("destination ", destination);

    let lat1 = origin.latitude;
    let lat2 = destination.latitude;
    let lon1 = origin.longitude;
    let lon2 = destination.longitude;

    var R = 6371000; // metres
    var φ1 = this.radians(lat1);
    var φ2 = this.radians(lat2);
    var Δφ = this.radians(lat2 - lat1);
    var Δλ = this.radians(lon2 - lon1);
    var a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    cb(d);
  }

  showDetail(data) {
    //Actions.BookingSummary({ data: data });
  }

  renderNotif(data = this.state.bookingHistory) {
    let allBtnColor = {
      '1': '#FAFF00',
      '2': '#99E94A',
      '3': '#E24242'
    };

    let i = 1;
    let status = data.status;
    let color = allBtnColor[`${status}`];

    return (
      <View key={'data' + i} style={{ flex: 1, elevation: 1, marginTop: 15 }}>
        <Button
          onPress={() => {
            this.showDetail(data);
          }}
        >
          <View style={[styles.boxHistory]}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ minHeight: 25 }}>
                <Text style={[MainStyle.dmSans, { fontSize: 14 }]}>
                  {data ? data.restaurant : ''}
                </Text>
              </View>

              {data.status === 2 ? (
                <View style={{ flexDirection: 'row', minHeight: 25 }}>
                  <View style={{ width: '50%' }}>
                    <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                      Booking Code
                    </Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                      {data.bookingCode}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', minHeight: 25 }} />
              )}

              <View style={{ flexDirection: 'row', minHeight: 25 }}>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Number of Peoples
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.peoples : ''} Person
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', minHeight: 25 }}>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Booking Time
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.bookingTime : ''}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', minHeight: 25 }}>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Date
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.date : ''}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', minHeight: 25 }}>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Order Time
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.orderTime : ''}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column', minHeight: 25 }}>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    Notes
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column', minHeight: 80 }}>
                <View
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: MAIN_THEME_COLOR,
                    minHeight: 80,
                    padding: 10,
                  }}
                >
                  <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
                    {data ? data.notes : ''}
                  </Text>
                </View>
              </View>
              {data && data.status === 3 ? (
                [
                  <View
                    style={{
                      flexDirection: 'column',
                      minHeight: 25,
                      marginTop: 10,
                    }}
                  >
                    <View style={{ width: '50%' }}>
                      <Text
                        style={[MainStyle.dmSansLight, { fontSize: 12 }]}
                      >
                        Cancellation Reason
                      </Text>
                    </View>
                  </View>,
                  <View style={{ flexDirection: 'column', minHeight: 80 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 80,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={[MainStyle.dmSansLight, { fontSize: 12 }]}
                      >
                        {data ? data.cancelReason : ''}
                      </Text>
                    </View>
                  </View>,
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
              justifyContent: 'center',
              alignItems: 'center'
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

  render() {
    const { userInfo, ready, refreshing, showAlert } = this.state;

    return (
      <View style={styles.body}>
        <Header
          title={this.props.title}
          notif={false}
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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "column",
              marginTop: 0,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 25,
              flex: 1
            }}
          >
            <View style={{ marginTop: 15 }}>
              <Text style={[MainStyle.dmSansBold, { fontSize: 25 }]}>
                Messages
              </Text>
            </View>
            <View style={[styles.box]}>
              <View style={{ flexDirection: "column", alignItems: 'center' }}>
                <Fontisto
                  name="email"
                  style={{
                    color: "#969696",
                    fontSize: 150
                  }}
                />
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    { fontSize: 20, color: "#969696" }
                  ]}
                >
                  No Messages Available
                </Text>
              </View>
            </View>

            {/* box1 end */}
            <View style={{ marginTop: 15 }}>
              <Text style={[MainStyle.dmSansBold, { fontSize: 25 }]}>
                Your Booking
              </Text>
            </View>
            {ready ? this.renderNotif() : <View />}
          </View>
        </ScrollView>
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
