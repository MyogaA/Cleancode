import colorTheme from './colorTheme.json';
import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
  Animated,
  Easing,
  LayoutAnimation,
  NativeModules,
  Platform,
} from 'react-native';

import DeviceInfo from "react-native-device-info";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import MainStyle from '../Styles';

const SPRING_CONFIG = { tension: 40, friction: 7 };
const { UIManager } = NativeModules;

if (Platform.OS == 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class FloatingTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      showpassword: true,
    };
  }

  handleFocus() {
    LayoutAnimation.spring();
    this.setState({
      isFocused: true,
    });
  }

  handleBlur() {
    if (this.props.value == '') {
      LayoutAnimation.spring();
      this.setState({
        isFocused: false,
      });
    }
  }

  _type() {
    const { label, ...props } = this.props;
    const { isFocused, move } = this.state;
    //console.log('_type() ==> ', props.color);
    let hasValue = false;

    if (this.props.value != '') {
      hasValue = true;
    }

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: !isFocused && !hasValue ? 20 : -10,
      fontSize: !isFocused && !hasValue ? 18 : 18,
      color: !isFocused && !hasValue ? '#aaa' : colorTheme.primaryColor.bg,
    };
    switch (this.props.type) {
      case 'text':
        return (
          <View style={{ paddingTop: 0 }}>
            <Text style={[labelStyle, MainStyle.robotoNormal]}>{label}</Text>
            <TextInput
              {...props}
              ref={q => this.props.refx(q)}
              style={{
                height: 40,
                fontSize: DeviceInfo.isTablet() ? 18 : 12,
                color: props.color ? props.color : '#000',
                borderBottomWidth: !isFocused ? 0.5 : 2,
                borderBottomColor: !isFocused
                  ? '#999'
                  : props.focusColor
                  ? props.focusColor
                  : "#FFF"
                //colorTheme.primaryColor.bg,
              }}
              onFocus={this.handleFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              underlineColorAndroid="transparent"
              blurOnSubmit
            />
          </View>
        );
        break;
      case 'password':
        let eyeico = 'ios-eye';
        if (this.state.showpassword) {
          eyeico = 'ios-eye-off';
        }

        return (
          <View style={{ paddingTop: 0 }}>
            <Text style={[labelStyle, MainStyle.robotoNormal]}>{label}</Text>
            <TextInput
              {...props}
              ref={q => this.props.refx(q)}
              style={{
                height: 40,
                fontSize: DeviceInfo.isTablet() ? 18 : 12,
                color: props.color ? props.color : '#000',
                borderBottomWidth: !isFocused ? 0.5 : 2,
                borderBottomColor: !isFocused
                  ? '#999'
                  : props.focusColor
                  ? props.focusColor
                  : "#FFF"
              }}
              onFocus={this.handleFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              underlineColorAndroid="transparent"
              secureTextEntry={this.state.showpassword}
              blurOnSubmit
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
                top: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
              }}
            >
              {this.props.value ? (
                <Button
                  onPress={() => {
                    this.setState({
                      showpassword: !this.state.showpassword,
                    });
                  }}
                >
                  <Ionicons
                    name={eyeico}
                    style={{
                      fontSize: 25,
                      color: props.color ? props.color : '#aaa'
                    }}
                  />
                </Button>
              ) : (
                <View />
              )}
            </View>
          </View>
        );
        break;
      default:
        return (
          <View style={{ paddingTop: 18 }}>
            <Text style={[labelStyle, MainStyle.robotoNormal]}>{label}</Text>
            <TextInput
              {...props}
              style={{
                height: 40,
                fontSize: DeviceInfo.isTablet() ? 18 : 12,
                color: '#999',
                borderBottomWidth: !isFocused ? 0.5 : 2,
                borderBottomColor: !isFocused
                  ? '#999'
                  : colorTheme.primaryColor.bg,
              }}
              onFocus={this.handleFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              underlineColorAndroid="transparent"
              blurOnSubmit
            />
          </View>
        );
        break;
    }
  }

  render() {
    return this._type();
  }
}
