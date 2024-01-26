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

export default class Setting extends Component {
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

  render() {
    let height = Dimensions.get('window').height - 90;
    let { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
    return (
      <View style={[ss.body]}>
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
        <ScrollView
          style={{
            flex: 1
          }}
        >
          <View style={[ss.mainContent, { height: height }]}>
            <View style={[ss.leftSide]}>
            </View>

            <View style={[ss.rightSide]}>
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
    width: "54%",
    marginTop: 0,
    marginLeft: 15,
    backgroundColor: '#FFF',
    elevation: 3,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1
  },
  rightSide: {
    width: '44%',
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
