import React, {Component} from 'react';
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
} from 'react-native';

import Header from '../../Components/Header';
import {Actions} from 'react-native-router-flux';
import {MAIN_THEME_COLOR, WHITE, BLACK} from '../../Libraries/Colors';
import MainStyle from '../../Styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../../Components/Button';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class BookingSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      userInfo: null,
      bookingHistory: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.setState({
      userInfo: {
        name: 'Billy Nugraha',
        phone: '08155542667',
        email: 'nugraha@gmail.com',
        address:
          'Tegal Alur, Blok B2 No 14, Jakarta Barat, Daerah Khusus Ibukota Jakarta, Indonesia.',
      },
      bookingHistory: [
        {
          restaurant: 'Xing Fu Tang - Lippo Mall Puri',
          peoples: '4',
          bookingTime: '19:00',
          date: '30/10/2019',
          orderTime: '17:34',
          notes:
            'Notes 1, Notes 2, Notes 3, Notes 4, Notes 5, Notes 6, Notes 7, Notes 8, Notes 9, Notes 10, Notes 11, Notes 12, Notes 13, Notes 14, Notes 15',
          cancelReason: '',
          statusDesc: 'Waiting For Confirmation',
          status: 1,
        },
        {
          restaurant: 'Xing Fu Tang - Lippo Mall Puri',
          peoples: '4',
          bookingTime: '19:00',
          date: '30/10/2019',
          orderTime: '17:34',
          notes: '',
          cancelReason: '',
          statusDesc: 'Confirmed Booking',
          status: 2,
        },
        {
          restaurant: 'Xing Fu Tang - Lippo Mall Puri',
          peoples: '4',
          bookingTime: '19:00',
          date: '30/10/2019',
          orderTime: '17:34',
          notes: '',
          cancelReason: 'Restoran penuh',
          statusDesc: 'Cancelled Booking',
          status: 3,
        },
      ],
      ready: true,
    });
  }

  editAccount() {}

  showDetail(data) {
    //Actions.DetailHistory({data: data});
  }

  renderDataSummary(data = this.props.data, ready = this.state.ready) {
    //data = data;
    if (ready) {
      return (
        <View>
          <View style={{marginTop: 15, marginLeft: 15, marginRight: 15}}>
            <Text style={[MainStyle.dmSansBold, {fontSize: 16}]}>
              {ready ? data.restaurant : ''}
            </Text>
          </View>
          <View style={{marginTop: 5, marginLeft: 15, marginRight: 15}}>
            <Text style={[MainStyle.dmSansLight, {fontSize: 12}]}>
              Booking Summary
            </Text>
          </View>
          <View style={[styles.box]}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'column', minHeight: 25}}>
                <View style={{width: '50%'}}>
                  <Text style={[MainStyle.dmSansBold, {fontSize: 12}]}>
                    Number of people
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <View style={{flexDirection: 'column', minHeight: 25}}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 25,
                        padding: 5,
                      }}>
                      <Text style={[MainStyle.dmSansBold, {fontSize: 12}]}>
                        {ready ? data.peoples : '0'} Person
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{flexDirection: 'column', minHeight: 25, marginTop: 10}}>
                <View style={{width: '50%'}}>
                  <Text style={[MainStyle.dmSansBold, {fontSize: 12}]}>
                    Booking Date
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <View style={{flexDirection: 'column', minHeight: 25}}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 25,
                        padding: 5,
                      }}>
                      <Text style={[MainStyle.dmSansBold, {fontSize: 12}]}>
                        {ready ? data.date : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{flexDirection: 'column', minHeight: 25, marginTop: 10}}>
                <View style={{width: '50%'}}>
                  <Text style={[MainStyle.dmSansBold, {fontSize: 12}]}>
                    Booking Time
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <View style={{flexDirection: 'column', minHeight: 25}}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 25,
                        padding: 5,
                      }}>
                      <Text style={[MainStyle.dmSansBold, {fontSize: 12}]}>
                        {ready ? data.bookingTime : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{flexDirection: 'column', minHeight: 25, marginTop: 10}}>
                <View style={{width: '50%'}}>
                  <Text style={[MainStyle.dmSansBold, {fontSize: 12}]}>
                    Notes
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <View style={{flexDirection: 'column', minHeight: 80}}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 80,
                        padding: 10,
                      }}>
                      <Text style={[MainStyle.dmSansBold, {fontSize: 12}]}>
                        {ready ? data.notes : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row', }}>
                <View
                  style={{

                    width: '50%',
                    flex: 1,
					paddingTop: 10,
					paddingRight: 7,
                  }}>
                  <Button
                    onPress={() => {
                      Actions.pop();
					  //this.editAccount();
                    }}>
                    <View
                      style={{
                        minHeight: 25,
						            minWidth: 75,
                        backgroundColor: MAIN_THEME_COLOR,
						            borderRadius: 10,
						            justifyContent: 'center',
                    	  alignItems: 'center',
                      }}>
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
                        ]}>
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
                  }}>
                  <Button
                    onPress={() => {
					  //this.editAccount();
                    }}>
                    <View
                      style={{
                        minHeight: 25,
                        minWidth: 75,
                        backgroundColor: MAIN_THEME_COLOR,
						borderRadius: 10,
						justifyContent: 'center',
                    	alignItems: 'center',
                      }}>
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
                        ]}>
                        Cancel Booking
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
    return <View style={{height: 15}} />;
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
      },
    );
  };

  handleLoadMore() {}

  render() {
    const {ready, refreshing} = this.state;

    const {data} = this.props;

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
        <View
          style={{
            flexDirection: 'column',
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            flex: 1,
          }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
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
