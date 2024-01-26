//not used
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
import moment from 'moment';

export default class BookingConfirmAlert extends Component {
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
    let { message, title, actions, closeText, data, actionSubmit } = this.props;
    let { width, height } = Dimensions.get('window');
    if (!closeText) {
      closeText = 'Go Back';
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
                minWidth: width - 40,
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
                  <Ionicons name={'md-close'} size={30} color={BLACK} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  //marginTop: 20,
                  marginBottom: 20,
                  //backgroundColor:'#BCA'
                }}
              >
                <View
                  style={{
                    width: '100%',
                    minHeight: 40,
                    paddingLeft: 15,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingRight: 10,
                    borderBottomWidth: 1,
                    borderColor: BLACK,
                  }}
                >
                  <Text style={[MainStyle.robotoNormalBold, { fontSize: 14 }]}>
                    {title}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    minHeight: 40,
                    paddingLeft: 15,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingRight: 10,
                  }}
                >
                  <Text style={[MainStyle.robotoNormalBold, { fontSize: 12 }]}>
                    {data.restaurantName}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    minHeight: 40,
                    paddingLeft: 15,
                    paddingTop: 0,
                    paddingBottom: 15,
                    paddingRight: 10,
                    flexDirection: 'row'
                  }}
                >
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          width: '60%',
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                        >
                          Number of People
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '40%',
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                        >
                          {data.person} Person
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                      <View
                        style={{
                          width: '60%',
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                        >
                          Booking Time
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '40%',
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                        >
                          {data.bookingTime}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                      <View
                        style={{
                          width: '60%',
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                        >
                          Booking Date
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '40%',
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                        >
                          {moment(data.bookingDate).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                      <View
                        style={{
                          width: '60%',
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                        >
                          Order Time
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '40%',
                          flexDirection: 'row'
                        }}
                      >
                        <Text
                          style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                        >
                          {moment(new Date()).format('HH:mm')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View
                      style={{
                        width: '100%'
                        //minHeight: 50,
                      }}
                    />
                    <View>
                      <Text
                        style={[MainStyle.dmSansLight, { fontSize: 10 }]}
                      >
                        Notes
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 1,
                        marginTop: 5,
                        borderColor: MAIN_THEME_COLOR,
                        minHeight: 80,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={[MainStyle.dmSansBold, { fontSize: 10 }]}
                      >
                        {data.notes}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
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
                          minWidth: 100,
                          backgroundColor: MAIN_THEME_COLOR,
                          borderRadius: 10,
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
                      //backgroundColor: '#ABC'
                    }}
                  >
                    <Button
                      onPress={() => {
                        this.closeModal(actionSubmit);
                        //Actions.Login();
                        //Actions.reset('Login');
                      }}
                    >
                      <View
                        style={{
                          minHeight: 25,
                          minWidth: 100,
                          backgroundColor: MAIN_THEME_COLOR,
                          borderRadius: 10,
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
                              marginRight: 10,
                              textAlign: 'center'
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
          </View>
        </Modal>
      </View>
    );
  }
}
