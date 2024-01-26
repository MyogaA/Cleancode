/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
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
  Dimensions,
} from 'react-native';
import {
  WHITE,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SUB,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
  RED_400,
  BLACK,
} from '../Libraries/Colors';

import { Actions } from 'react-native-router-flux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from './Button';
import Checkbox from './Checkbox';
import FloatingLabelInput from './FloatingTextInput';
import Text from './Text';
import MainStyle from '../Styles';
import { _send_receipt } from '../Libraries/DictionaryHistory';
import { _kembali, _masukan_alamat_email, _masukan_phone_number } from '../Libraries/DictionaryRekap';

export default class SendReceipt extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isOpen: true,
    // };
  }

  componentDidMount() {
    //this.setState({isOpen: true});
    //this.renderAlert();
  }

  closeModal(closeAction) {
    if (typeof closeAction === 'function') {
      closeAction();
    }
    //this.setState({isOpen: false});
  }

  changeEmail(action, text) {
    if (typeof action === 'function') {
      action(text);
    }
  }

  submit(action) {
    if (typeof action === 'function') {
      action();
    }
  }

  render() {
    let {
      title,
      closeAction,
      closeText,
      email,
      submitAction,
      changeAction,
      languageIndex,
      phone,
      changePhoneAction
    } = this.props;
    let { width, height } = Dimensions.get('window');

    if (!closeText) {
      closeText = _kembali[languageIndex];
    }

    let submitText = _send_receipt[languageIndex];

    let helpText = _masukan_alamat_email[languageIndex];

    let helpText2 = _masukan_phone_number[languageIndex];

    // let message = [
    //   "You haven't sign in yet,",
    //   `Sign to access our ${extraMsg} features!`,
    // ];

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.closeModal(closeAction);
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                //minWidth: width - 40,
                width: '90%',
                minHeight: height * 0.2,
                //maxHeight: height * 0.6,
                backgroundColor: WHITE,
                borderRadius: 10,
                marginLeft: 20,
                marginRight: 20,
                //marginTop: height * 0.25,
                //marginBottom: height * 0.25,
              }}
            >
              <View style={{ position: 'absolute', right: 15, top: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.closeModal(closeAction);
                  }}
                >
                  <Ionicons name={'md-close'} size={30} color={"#C4C4C4"} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 20,
                  marginBottom: 20,
                  //backgroundColor:'#BCA'
                }}
              >
                <View
                  style={{
                    //flex:1,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                    //height: '100%',
                    //backgroundColor:'#555'
                  }}
                >
                  <View
                    style={{
                      //justifyContent: 'center',
                      //alignItems: 'center',
                      //flex:1,
                      //backgroundColor:'#999',
                      width: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        {
                          fontSize: 14,
                          //alignSelf : "center"
                          textAlign: 'center'
                        },
                      ]}
                    >
                      {submitText}
                    </Text>
                  </View>

                  <View
                    style={{
                      //justifyContent: 'space-between',
                      width: '90%',
                      marginTop: 0
                    }}
                  >
                    {/* <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 20,
                          //alignSelf : "center"
                          textAlign: 'center',
                          color: BLACK,
                        },
                      ]}
                    >
                      Bahasa Indonesia
                    </Text> */}
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            fontSize: 12,
                            //alignSelf : "center"
                            textAlign: 'center'
                          },
                        ]}
                      >
                        {helpText}
                      </Text>
                    </View>
                    <View
                      style={{
                        margin: 15,
                        marginBottom: 5,
                        //borderColor: BLACK,
                        //borderWidth: 1,
                        backgroundColor: "rgba(239, 239, 239, 0.95)",
                        borderRadius: 5,
                        padding: 5,
                        //elevation: 3,
                        //borderWidth: 1,
                        borderColor: BLACK,
                        //alignItems: 'center',
                      }}
                    >
                      <TextInput
                        style={{
                          //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          backgroundColor: 'transparent',
                          color: BLACK,
                          paddingTop: 5,
                          paddingBottom: 10,
                          marginBottom: -10,
                          //marginLeft: '5%',
                          //marginRight: 5,
                          height: 40,
                          fontSize: 12,
                          fontFamily: 'Roboto-Regular'
                        }}
                        keyboardType="email-address"
                        type="text"
                        ref={q => {
                          this._email = q;
                        }}
                        onSubmitEditing={() => {
                          //this.getData(this.state.searchKey);
                          // this.setState({viewSearch: false});
                          //this.submit(submitAction);
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => {
                          this.changeEmail(changeAction, v);
                        }}
                        value={email}
                        //placeholder={'Cari...'}
                        placeholderTextColor={BLACK}
                      />
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            fontSize: 12,
                            //alignSelf : "center"
                            textAlign: 'center'
                          },
                        ]}
                      >
                        {helpText2}
                      </Text>
                    </View>

                    <View
                      style={{
                        margin: 15,
                        marginBottom: 5,
                        //borderColor: BLACK,
                        //borderWidth: 1,
                        backgroundColor: "rgba(239, 239, 239, 0.95)",
                        borderRadius: 5,
                        padding: 5,
                        //elevation: 3,
                        //borderWidth: 1,
                        borderColor: BLACK,
                        //alignItems: 'center',
                      }}
                    >
                      <TextInput
                        style={{
                          //backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          backgroundColor: 'transparent',
                          color: BLACK,
                          paddingTop: 5,
                          paddingBottom: 10,
                          marginBottom: -10,
                          //marginLeft: '5%',
                          //marginRight: 5,
                          height: 40,
                          fontSize: 12,
                          fontFamily: 'Roboto-Regular'
                        }}
                        keyboardType="numeric"
                        type="text"
                        ref={q => {
                          this._email = q;
                        }}
                        onSubmitEditing={() => {
                          //this.getData(this.state.searchKey);
                          // this.setState({viewSearch: false});
                          //this.submit(submitAction);
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => {
                          this.changeEmail(changePhoneAction, v);
                        }}
                        value={phone}
                        //placeholder={'Cari...'}
                        placeholderTextColor={BLACK}
                      />
                    </View>


                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 0 }}>
                  <View
                    style={{
                      width: '100%',
                      //flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 15,
                      marginBottom: 0,
                      //backgroundColor: '#BCA'
                    }}
                  >
                    <Button
                      style={{ width: '90%', alignItems: 'center', padding: 5 }}
                      onPress={() => {
                        //this.closeModal(closeAction);
                        //Actions.Login();
                        //Actions.reset('Login');
                        submitAction();
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          width: "90%",
                          //elevation: 2,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: MAIN_TEXT_COLOR_SELECT(
                            this.props.colorIndex
                          )
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              fontSize: 14,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.props.colorIndex
                              ),
                              marginBottom: 5,
                              marginTop: 5,
                              marginLeft: 10,
                              marginRight: 10,
                              padding: 5,
                              textAlign: 'center'
                            },
                          ]}
                        >
                          {submitText}
                        </Text>
                      </View>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const ss = StyleSheet.create({
  body: {
    // backgroundColor: '#FFFFFF',
    // flex: 1,
    // flexDirection: 'column',
    // elevation: 1,
  },
  box: {
    elevation: 1,
    borderRadius: 15,
    width: 50,
    height: 50,
  },
  boxSelectLanguage: {
    width: "100%",
    elevation: 2,
    borderRadius: 15,
  },
});
