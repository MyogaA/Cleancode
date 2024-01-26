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
  RED_400,
  BLACK,
  MAIN_TEXT_COLOR_SELECT,
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

export default class SelectLanguage extends Component {
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

  render() {
    let {
      title,
      actions,
      closeText,
      activeSelection,
      changeAction,
      submitAction
    } = this.props;
    let { width, height } = Dimensions.get('window');

    if (!closeText) {
      closeText = 'Kembali';
    }

    let submitText = 'Konfirmasi';
    // let message = [
    //   "You haven't sign in yet,",
    //   `Sign to access our ${extraMsg} features!`,
    // ];

    let whiteColor = WHITE;
    let blackColor = BLACK;

    if (this.props.colorIndex === 9) {
      whiteColor = BLACK;
      blackColor = WHITE;
    }

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.closeModal(actions);
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
                width: '50%',
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
              <View style={{ position: 'absolute', right: 10, top: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.closeModal(actions);
                  }}
                >
                  <Ionicons
                    name={'md-close'}
                    size={30}
                    color={BLACK}
                  />
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
                    marginTop: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
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
                      width: '75%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 0,
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          fontSize: 28,
                          //alignSelf : "center"
                          textAlign: 'center'
                        },
                      ]}
                    >
                      Pilih Bahasa
                    </Text>
                  </View>
                  <View
                    style={{
                      //justifyContent: 'space-between',
                      width: '66%',
                      marginTop: 20
                    }}
                  >
                    <Button
                      onPress={() => {
                        changeAction(0);
                      }}
                      style={[
                        ss.boxSelectLanguage,
                        {
                          padding: 5,
                          backgroundColor:
                            activeSelection === 0
                              ? MAIN_THEME_COLOR_SELECT(this.props.colorIndex)
                              : whiteColor
                        }
                      ]}
                    >
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          {
                            fontSize: 20,
                            //alignSelf : "center"
                            textAlign: 'center',
                            color:
                              activeSelection === 0
                                ? MAIN_TEXT_COLOR_SELECT(this.props.colorIndex)
                                : blackColor,
                          },
                        ]}
                      >
                        Bahasa Indonesia
                      </Text>
                    </Button>
                    <Button
                      onPress={() => {
                        changeAction(1);
                      }}
                      style={[
                        ss.boxSelectLanguage,
                        {
                          padding: 5,
                          backgroundColor:
                            activeSelection === 1
                              ? MAIN_THEME_COLOR_SELECT(this.props.colorIndex)
                              : whiteColor,
                          marginTop: 15,
                        }
                      ]}
                    >
                      <Text
                        style={[
                          MainStyle.dmSansBold,
                          {
                            fontSize: 20,
                            //alignSelf : "center"
                            textAlign: 'center',
                            color:
                              activeSelection === 1
                                ? MAIN_TEXT_COLOR_SELECT(this.props.colorIndex)
                                : blackColor
                          },
                        ]}
                      >
                        English
                      </Text>
                    </Button>
                  </View>

                  {/* {message.map(val => {
                    return (
                      <View
                        style={{
                          //justifyContent: 'center',
                          //alignItems: 'center',
                          //flex:1,
                          //backgroundColor:'#999',
                          width: "75%",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 0,
                          marginBottom: 5
                        }}
                      >
                        <Text
                          style={
                            ([MainStyle.robotoNormalBold],
                            {
                              fontSize: 14,
                              //alignSelf : "center"
                              textAlign: "center"
                            })
                          }
                        >
                          {val}
                        </Text>
                      </View>
                    );
                  })} */}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                  <View
                    style={{
                      width: '50%',
                      //flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 15,
                      marginBottom: 0,
                      //backgroundColor: '#ABC'
                    }}
                  >
                    <Button
                      onPress={() => {
                        this.closeModal(actions);
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          width: 125,
                          elevation: 2,
                          borderColor: MAIN_TEXT_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          borderWidth: 1,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(
                            this.props.colorIndex
                          ),
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
                              color: MAIN_TEXT_COLOR_SELECT(
                                this.props.colorIndex
                              ),
                              marginBottom: 5,
                              marginTop: 5,
                              marginLeft: 10,
                              marginRight: 10,
                              textAlign: 'center'
                            },
                          ]}
                        >
                          {closeText}
                        </Text>
                      </View>
                    </Button>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      //flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 15,
                      marginBottom: 0,
                      //backgroundColor: '#BCA'
                    }}
                  >
                    <Button
                      onPress={() => {
                        this.closeModal(submitAction);
                        //Actions.Login();
                        //Actions.reset('Login');
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          width: 125,
                          elevation: 2,
                          backgroundColor: "#83B235",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 16,
                              color: WHITE,
                              marginBottom: 5,
                              marginTop: 5,
                              marginLeft: 10,
                              marginRight: 10,
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
