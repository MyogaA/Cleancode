import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text as DefaultText,
  Image,
  Picker,
  Modal,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  WHITE,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SUB,
  RED_400,
  BLACK,
} from '../Libraries/Colors';

import {Actions} from 'react-native-router-flux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from './Button';
import Checkbox from './Checkbox';
import FloatingLabelInput from './FloatingTextInput';
import Text from './Text';
import LoginFunctions from '../Libraries/LoginFunctions';

const styles = StyleSheet.create({
  headerMain: {
    height: 56,
    backgroundColor: MAIN_THEME_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    paddingLeft: 10,
  },
  headerBtnView: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    color: WHITE,
    fontSize: 22,
  },
  notifView: {
    position: 'absolute',
    backgroundColor: '#F44336',
    borderRadius: 20,
    height: 18,
    width: 18,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      notification: true,
      notifNumber: this.props.notifNumber ? this.props.notifNumber : 0,
      title: this.props.title ? this.props.title : 0,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
    };
  }

  componentDidMount() {
    LoginFunctions.LoginInformation(val => {
      this.setState({userInfo: val});
    });
  }
  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      //console.log('COMPONENT DID UPDATE HOME');
      LoginFunctions.LoginInformation(val => {
        this.setState({userInfo: val});
      });
    }
  }

  render() {
    return (
      <View>
        <View style={styles.headerMain}>
          <Button
            onPress={() => {
              if (typeof logoutAction === 'function') {
                //loginAction();
                console.log('login pressed');
              }
            }}>
            <View style={styles.headerBtnView}>
              <Entypo name="login" style={styles.headerIcon} />
            </View>
          </Button>
		  <Button
            onPress={() => {
              if (typeof logoutAction === 'function') {
                //loginAction();
                console.log('login pressed');
              }
            }}>
            <View style={styles.headerBtnView}>
              <Entypo name="login" style={styles.headerIcon} />
            </View>
          </Button>
		  <Button
            onPress={() => {
              if (typeof logoutAction === 'function') {
                //loginAction();
                console.log('login pressed');
              }
            }}>
            <View style={styles.headerBtnView}>
              <Entypo name="login" style={styles.headerIcon} />
            </View>
          </Button>
        </View>
      </View>
    );
  }
}
