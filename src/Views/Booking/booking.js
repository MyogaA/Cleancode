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

export default class BookingRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      bookingHistory: null,
      refreshing: false,
      notes: '',
      person: '1',
      //bookingDate: moment(new Date()).format('DD/MM/YYYY'),
      bookingDate: moment(new Date()).format('YYYY-MM-DD'),
      bookingTime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      datePicker: false,
      timePicker: false,
      showAlert: false,
      showConfirmation: false,
      dataConfirmation: null,
      listPerson: [
        { id: 1, text: '1' },
        { id: 2, text: '2' },
        { id: 3, text: '3' },
        { id: 4, text: '4' },
        { id: 5, text: '5' },
        { id: 6, text: '6' },
        { id: 7, text: '7' },
        { id: 8, text: '8' },
        { id: 9, text: '9' },
        { id: 10, text: '10' },
      ],
    };
  }

  componentDidMount() {
    console.log('BOOKING THIS PROPS ==> ', this.props);
    this.setState({
      ready: true,
    });
  }

  showDetail(data) {
    //Actions.DetailHistory({data: data});
  }

  renderDataSummary(data = this.props.data, ready = this.state.ready) {
    //data = data;
    if (ready) {
      return (
        <View>
          <View style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
            <Text style={[MainStyle.dmSansBold, { fontSize: 16 }]}>
              {ready ? data.name : ''}
            </Text>
          </View>
          <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
            <Text style={[MainStyle.dmSansLight, { fontSize: 12 }]}>
              Booking Option
            </Text>
          </View>
          <View style={[styles.box]}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'column', minHeight: 25 }}>
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Number of people
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <View style={{ flexDirection: 'column', minHeight: 25 }}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 25,
                        paddingLeft: 5,
                      }}
                    >
                      <Dropdown
                        style={{
                          marginLeft: 0,
                          // paddingRight:100
                        }}
                        color={BLACK}
                        // selectWidth = {'80%'}
                        selectedValue={String(this.state.person)}
                        optionLists={this.state.listPerson.map((v, k) => {
                          //console.log('v ==> ', v);
                          return {
                            label: v.text + ' Person',
                            value: String(v.id),
                          };
                        })}
                        onValueChange={(itemValue, itemIndex) => {
                          console.log('SELECTED Value ==> ', itemValue);
                          this.setState({ person: itemValue });
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  minHeight: 25,
                  marginTop: 10,
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Booking Date
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      minHeight: 25,
                      marginTop: 5,
                    }}
                  >
                    <Button
                      onPress={() => {
                        this._showDatePicker();
                      }}
                    >
                      <View
                        style={{
                          width: '100%',
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: MAIN_THEME_COLOR,
                          minHeight: 25,
                          padding: 5,
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansBold, { fontSize: 12 }]}
                        >
                          {moment(this.state.bookingDate).format('DD/MM/YYYY')}
                        </Text>
                        <Entypo
                          name="chevron-down"
                          style={{
                            position: 'absolute',
                            right: 5,
                            color: MAIN_THEME_COLOR,
                            fontSize: 25,
                          }}
                        />
                      </View>
                    </Button>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  minHeight: 25,
                  marginTop: 10,
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Booking Time
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      minHeight: 25,
                      marginTop: 5,
                    }}
                  >
                    <Button
                      onPress={() => {
                        this._showTimePicker();
                      }}
                    >
                      <View
                        style={{
                          width: '100%',
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: MAIN_THEME_COLOR,
                          minHeight: 25,
                          padding: 5,
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansBold, { fontSize: 12 }]}
                        >
                          {moment(this.state.bookingTime).format('HH:mm')}
                        </Text>
                        <Entypo
                          name="chevron-down"
                          style={{
                            position: 'absolute',
                            right: 5,
                            color: MAIN_THEME_COLOR,
                            fontSize: 25,
                          }}
                        />
                      </View>
                    </Button>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  minHeight: 25,
                  marginTop: 10,
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text style={[MainStyle.dmSansBold, { fontSize: 12 }]}>
                    Notes
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
                          fontFamily: 'RobotoSlab-Bold'
                        }}
                        multiline={true}
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
                        placeholder={''}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={{
                    width: '50%',
                    flex: 1,
                    paddingTop: 10,
                    paddingRight: 7,
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
                        justifyContent: 'center',
                        alignItems: 'center'
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
                        Back
                      </Text>
                    </View>
                  </Button>
                </View>

                <View
                  style={{
                    width: '50%',
                    flex: 1,
                    paddingTop: 10,
                    paddingLeft: 7,
                  }}
                >
                  <Button
                    onPress={() => {
                      //this.editAccount();
                      let bookingTime = moment(this.state.bookingTime).format(
                        'HH:mm'
                      );
                      let bookingDate = moment(this.state.bookingDate).format(
                        'YYYY-MM-DD'
                      );

                      let data = {
                        restaurantName: this.props.data.name,
                        person: this.state.person,
                        bookingDate: bookingDate,
                        bookingTime: bookingTime,
                        notes: this.state.notes,
                      };

                      console.log('Booking Data ==> ', data);

                      this.setState(
                        {
                          dataConfirmation: data,
                          showConfirmation: true,
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
                        alignItems: 'center'
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
                        Book Now
                      </Text>
                    </View>
                  </Button>
                </View>
              </View>
            </View>
          </View>
          {/* boxend */}
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
    } = this.state;

    const { data } = this.props;

    //console.log('bookingDate2 ==> ', this.state.bookingDate2)
    //console.log('bookingDate2 ==> ', new Date(this.state.bookingDate2))

    let message = [
      'You have successfully request a book at',
      `${this.props.data.name}`,
      'We will inform you about your booking shortly.'
    ];

    console.log('bookingDate ==> ', this.state.bookingDate);
    console.log('bookingDate ==> ', new Date(this.state.bookingDate));
    return (
      <View style={styles.body}>
        <Header
          title={this.props.title}
          notif={true}
          login={!this.props.isLogin}
          isLogin={this.props.isLogin}
          logoutActivity={this.props.logoutActivity}
          loginInformation={this.props.loginInformation}
          menu={false}
        />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {showConfirmation === true ? (
          <BookingConfirmAlert
            data={dataConfirmation}
            title={'Booking Confirmation'}
            actionSubmit={() => {
              this.setState({ showConfirmation: false, showAlert: true });
            }}
            actions={() => {
              this.setState({ showConfirmation: false });
            }}
          />
        ) : (
          <View />
        )}

        {showAlert ? (
          <CustomAlert
            colorIndex={this.state.colorIndex}
            message={message}
            //title={'Success'}
            closeText={'Go Back'}
            actions={() => {
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}
        {/* <DateTimePicker
          isVisible={this.state.datePicker}
          onConfirm={date => this._handleDateTimePicker(date)}
          onCancel={() => this._hideDatePicker()}
          mode="date"
          minimumDate={new Date()}
          datePickerModeAndroid="calendar"
          date={new Date(this.state.date)}
        /> */}
        {this.state.datePicker === true ? (
          <DateTimePicker
            value={new Date(this.state.bookingDate)}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={this.setDate}
            minimumDate={new Date()}
          />
        ) : (
          <View />
        )}

        {this.state.timePicker === true ? (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={this.setTime}
            //minimumDate={new Date()}
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
    flexDirection: 'column'
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
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
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
