/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
} from 'react-native';

import MainStyle from '../../Styles';

import { getDistance, convertDistance } from 'geolib';

import Header from '../../Components/Header';
import Image from '../../Components/Image';
import Button from '../../Components/Button';
import AlertLogin from '../../Components/AlertLogin';
import FloatingTextInput from '../../Components/FloatingTextInput';
import TabBar from '../../Components/TabBar';
import { Actions } from 'react-native-router-flux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Geolocation from '@react-native-community/geolocation';

// import Orientation from 'react-native-orientation-locker';



// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MAIN_THEME_COLOR, WHITE, BLACK } from '../../Libraries/Colors';

import LoginFunctions from '../../Libraries/LoginFunctions';
//import Login from '../Account/login';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      loading: false,
      number: 1,
      currentLoc: null,
      refreshing: false,
      searchKey: '',
      selected: -1,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      showAlert: false,
      data: [
        {
          name: 'Xing Fu Tang',
          image:
            'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg',
          category: ['Beverage', 'Milk', 'Cozy', 'Casual'],
          detail: [
            {
              name: 'Xing Fu Tang - Lippo Mall Puri',
              event: '10% off for students *',
              latitude: -6.1880304,
              longitude: 106.7366349,
            },
            {
              name: 'Xing Fu Tang - Tanjung Duren Utara',
              event: '',
              latitude: -6.1734311,
              longitude: 106.7852948,
            },
            {
              name: 'Xing Fu Tang - PIK',
              event: '10% off for students *',
              latitude: -6.0947442,
              longitude: 106.7412463,
            },
          ],
        },
        {
          name: 'Onezo',
          image:
            'https://assets-pergikuliner.com/8f96arNyV-0SP-CbBkfewne08k4=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1520770/picture-1565061778.jpg',
          category: ['Cozy', 'Casual', 'Beverage', 'Milk'],
          detail: [
            {
              name: 'Onezo - Taman Palem',
              event: '100% off for elders *',
              latitude: -6.1483008,
              longitude: 106.7366293,
            },
            {
              name: 'Onezo - Taman Sari',
              event: '10% off for teachers *',
              latitude: -6.1602829,
              longitude: 106.8134618,
            },
            {
              name: 'Onezo - Mall of Indonesia',
              event: '',
              latitude: -6.1518218,
              longitude: 106.8893067,
            },
          ],
        },
        {
          name: 'Kokumi',
          image:
            'https://assets-pergikuliner.com/gA1MiZ-EA4PlsOIjVNJRlBIx7dc=/385x290/smart/https://assets-pergikuliner.com/uploads/image/picture/1391669/picture-1557474787.jpg',
          category: ['Cozy', 'Casual', 'Kids', 'Beverage', 'Milk'],
          detail: [
            {
              name: 'Kokumi - PIK',
              event: 'Happy Hour Friday 16:00-18:00 *',
              latitude: -6.1172309,
              longitude: 106.7396554,
            },
            {
              name: 'Kokumi - Taman Anggrek',
              event: '10% off for teachers *',
              latitude: -6.1699597,
              longitude: 106.7715055,
            },
            {
              name: 'Kokumi - Lippo Mall',
              event: '',
              latitude: -6.1881037,
              longitude: 106.7373972,
            },
            {
              name: 'Kokumi - Green Lake City',
              event: 'Happy Hour Friday 16:00-18:00',
              latitude: -6.1844249,
              longitude: 106.7087228,
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    //console.log('Home Page Props ==> ', this.props);
    // Orientation.lockToLandscapeLeft();
    this.getCurrentLocation();
    LoginFunctions.LoginInformation(val => {
      this.setState({ userInfo: val });
    });

  }

  componentDidUpdate(nextProps) {
    //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);
    if (this.props !== nextProps) {
      //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);
      LoginFunctions.LoginInformation(val => {
        this.setState({ userInfo: val });
      });
      this.getCurrentLocation();
    }
  }

  getCurrentLocation2() {
    Geolocation.getCurrentPosition(data => {
      let coords = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      };
      //console.log('Location Coords ==> ', coords);
      this.setState({ currentLoc: coords, ready: true });
    });
  }

  getCurrentLocation() {
    //untuk emulator
    let coords = {
      latitude: -6.1402746,
      longitude: 106.8520526,
    };
    this.setState({ currentLoc: coords, ready: true });
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

  renderData(data, i, location = this.state.currentLoc) {
    let distance = 0;
    let event = '';
    //const {currentLoc} = this.state;

    let isSelected = false;
    if (i === this.state.selected) {
      isSelected = true;
    }

    let detail = data.detail;
    let unorderedDetail = [];
    detail.map((items, itemIndex) => {
      let distanceTemp = getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        { latitude: items.latitude, longitude: items.longitude }
      );
      //console.log('Index ==> ', itemIndex);
      //console.log('Location Name ==> ', items.name);
      //console.log('Distance Temp ==> ', distanceTemp);
      let tempDetailNew = {
        key: items.name + '-' + items.longitude + '' + items.latitude,
        name: items.name,
        distance: distanceTemp,
        event: items.event,
        //longitude: items.longitude,
        //latitude: items.latitude,
      };
      unorderedDetail.push(tempDetailNew);

      if (distance === 0) {
        distance = distanceTemp;
        event = items.event;
      } else if (distance > distanceTemp) {
        distance = distanceTemp;
        event = items.event;
      }
    });
    unorderedDetail.sort(function(a, b) {
      return a.distance - b.distance;
    });
    //console.log(unorderedDetail);

    distance = convertDistance(distance, 'km');
    distance = Math.round((distance - 0.00001) * 100) / 100;

    return (
      <View
        style={{
          borderColor: MAIN_THEME_COLOR,
          borderRadius: 10,
          elevation: 1,
        }}
      >
        <View style={{ elevation: 1 }}>
          <View
            key={'MainV' + i}
            style={{
              marginTop: 0,
              minHeight: 100,
              flex: 1,
              flexDirection: 'column',
              borderColor: MAIN_THEME_COLOR,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderRadius: 10,
              backgroundColor: WHITE,
              elevation: 1,
            }}
          >
            <Button
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{}}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      overflow: 'hidden',
                      borderRadius: 10,
                    }}
                    source={{ uri: data.image }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginLeft: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row'
                      }}
                    >
                      <View
                        style={{
                          marginRight: 15,
                          width: '65%'
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 14,
                            },
                          ]}
                        >
                          {data.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginLeft: 'auto'
                        }}
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <MaterialCommunityIcons
                            name="map-marker-outline"
                            style={{
                              fontSize: 15,
                              fontFamily: 'RobotoSlab',
                              marginRight: 3,
                            }}
                          />
                          <Text
                            style={[
                              MainStyle.dmSans,
                              { fontSize: 12, fontWeight: '300' },
                            ]}
                          >
                            {distance} km
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={[{ minHeight: 25 }, MainStyle.dmSans]}>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={5}
                        data={data.category}
                        renderItem={({ item, index }) => {
                          if (this.state.ready === true && index < 6) {
                            return (
                              <View
                                //key = {'subCat' + i.toString() +'sub'+ index.toString()}
                                style={{}}
                              >
                                {this.renderCategory(item, index)}
                              </View>
                            );
                          } else {
                            return <View />;
                          }
                        }}
                        keyExtractor={(item, index) => {
                          //console.log(item.toString()+"_"+i.toString()+"_"+index.toString());
                          return (
                            item.toString() +
                            '_' +
                            i.toString() +
                            '_' +
                            index.toString()
                          );
                        }}
                      />
                    </View>
                    {event !== '' ? (
                      <View
                        style={{
                          flexDirection: 'row'
                        }}
                      >
                        <MaterialCommunityIcons
                          name="sale"
                          style={{ fontSize: 15, marginRight: 3 }}
                        />
                        <Text
                          style={([MainStyle.dmSans], { fontSize: 10 })}
                        >
                          {event}
                        </Text>
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
              </View>
            </Button>
          </View>
          <Button
            style={{}}
            onPress={() => {
              //console.log('press');
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );

              let newSelected = i;
              let oldSelected = this.state.selected;

              if (newSelected === oldSelected) {
                this.setState({ selected: -1 });
              } else {
                this.setState({ selected: newSelected });
              }
            }}
          >
            <View
              style={{
                backgroundColor: MAIN_THEME_COLOR,
                height: this.state.selected !== i ? 60 : 0,
                borderColor: MAIN_THEME_COLOR,
                borderRadius: 10,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                marginTop: this.state.selected !== i ? -30 : -60,
                paddingTop: 32,
                paddingLeft: 15,
                paddingRight: 15,
                elevation: 1,
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    textAlign: 'center',
                    color: WHITE,
                  },
                ]}
              >
                Book The Place
              </Text>
            </View>
          </Button>
        </View>

        {unorderedDetail.length > 0 && isSelected === true ? (
          <View
            key={'Sub' + i}
            style={{
              //minHeight: 120,
              flex: 1,
              flexDirection: 'row',
              borderRadius: 10,
              marginTop: -30,
              paddingTop: 30,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: MAIN_THEME_COLOR,
              backgroundColor: WHITE,
              elevation: 0,
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={unorderedDetail}
              renderItem={({ item, index }) => {
                if (this.state.ready === true) {
                  return (
                    <View
                      //key={'sub' + i.toString() + index.toString()}
                      style={{ width: '100%' }}
                    >
                      {this.renderSubData(item, index)}
                    </View>
                  );
                } else {
                  return <View />;
                }
              }}
              listKey={(item, index) => {
                console.log(
                  item.name.toString() +
                    '_' +
                    i.toString() +
                    '_' +
                    index.toString()
                );
                return (
                  item.name.toString() +
                  '_' +
                  i.toString() +
                  '_' +
                  index.toString()
                );
              }}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderCategory(data, index) {
    return (
      <View
        style={{
          margin: 3,
          padding: 3,
          backgroundColor: '#EEE',
          borderRadius: 5,
        }}
      >
        <Text style={[MainStyle.robotoNormal, { fontSize: 9 }]}>{data}</Text>
      </View>
    );
  }

  renderSubData(data, index) {
    let { userInfo } = this.state;
    let distance = convertDistance(data.distance, 'km');
    distance = Math.round((distance - 0.00001) * 100) / 100;
    let key = index + '' + Math.random();
    return (
      <Button
        onPress={() => {
          //console.log('press');
          if (userInfo) {
            Actions.Booking({ data: data, userInfo: userInfo });
          } else {
            this.setState({ showAlert: true });
          }
        }}
      >
        <View
          key={key}
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            marginTop: -10,
            paddingBottom: 10,
            minHeight: 90,
            borderColor: MAIN_THEME_COLOR,
            borderBottomWidth: 1,
            width: '100%',
            borderRadius: 10,
            flexDirection: 'row'
          }}
        >
          <View style={{ width: '100%', flexDirection: 'column' }}>
            <View>
              <Text style={[MainStyle.dmSansBold]}>{data.name}</Text>
            </View>
            {index === 0 ? (
              <View>
                <Text style={[MainStyle.dmSans]}>
                  Nearest Outlet - {distance} km
                </Text>
              </View>
            ) : (
              <View>
                <Text style={[MainStyle.dmSans]}>
                  {distance} km from your location
                </Text>
              </View>
            )}

            {data.event !== '' ? (
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                  name="sale"
                  style={{ fontSize: 17, marginRight: 3 }}
                />
                <Text style={[MainStyle.dmSans]}>{data.event}</Text>
              </View>
            ) : (
              <View />
            )}
          </View>

          <View
            style={{
              marginLeft: 'auto'
            }}
          >
            {/* <Text>{convertDistance(data.distance, 'km')} KM</Text> */}
          </View>
        </View>
      </Button>
    );
  }
  _renderFooter() {
    return <View style={{ height: 120 }} />;
  }

  handleLoadMore() {}

  renderTabBar() {}
  renderSearch() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View
          style={{
            margin: 15,
            borderColor: BLACK,
            borderWidth: 1,
            borderRadius: 15,
          }}
        >
          <View style={{ position: 'absolute', top: 8, left: 12 }}>
            <Ionicons
              name="md-search"
              style={{
                fontSize: 16,
              }}
            />
          </View>
          <TextInput
            style={{
              //backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backgroundColor: 'transparent',
              color: BLACK,
              marginLeft: 30,
              marginRight: 5,
              height: 35,
              fontSize: 14,
              fontFamily: 'RobotoSlab-Bold'
            }}
            type="text"
            refx={q => {
              this.TextInputSearch = q;
            }}
            onSubmitEditing={() => {
              this.getData(this.state.searchKey);
              // this.setState({viewSearch: false});
            }}
            //onChangeText={(q)=>this._accountUpdate('username',q)}
            onChangeText={v => this.setState({ searchKey: v })}
            value={this.state.searchKey}
            placeholder={'Cari...'}
          />
        </View>
        {this.renderTabBar()}
      </View>
    );
  }

  logoutAction() {
    this.setState({ userInfo: null });
  }

  render() {
    let { notifNumber } = this.props;
    const { refreshing, showAlert } = this.state;
    notifNumber = 9999;
    console.log('GetCurrentLocation ==> ', this.state.currentLoc);
    return (
      <View style={styles.body}>
        <Header
          logoutAction={() => this.logoutAction()}
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
        {this.renderSearch()}
        {showAlert ? (
          <AlertLogin
            //colorIndex={this.state.colorIndex}
            //message={message}
            //title={'Success'}
            extra={'booking'}
            closeText={'Cancel'}
            actions={() => {
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}

        <View style={{ width: '100%', marginTop: 0 }}>
          <FlatList
            //ListHeaderComponent={this.renderSearch()}
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            renderItem={({ item, index }) => {
              if (this.state.ready === true) {
                return (
                  <View
                    style={{
                      marginLeft: 15,
                      marginTop: 15,
                      marginBottom: 15,
                      marginRight: 15,
                      borderColor: MAIN_THEME_COLOR,
                    }}
                  >
                    {this.renderData(item, index, this.state.currentLoc)}
                  </View>
                );
              } else {
                return <View />;
              }
            }}
            ListFooterComponent={this._renderFooter}
            keyExtractor={(item, index) => {
              return 'MainRenderData' + index.toString();
            }}
            onRefresh={this._onRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
          />
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
});
