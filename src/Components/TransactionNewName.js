/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import PropTypes from "prop-types";
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
  Dimensions
} from "react-native";
import {
  WHITE,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  MAIN_THEME_COLOR_SUB,
  RED_400,
  BLACK
} from "../Libraries/Colors";

import { Actions } from "react-native-router-flux";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import FA5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Button from "./Button";
import Checkbox from "./Checkbox";
import FloatingLabelInput from "./FloatingTextInput";
import Text from "./Text";
import MainStyle from "../Styles";

export default class TransactionNewName extends Component {
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
    if (typeof closeAction === "function") {
      closeAction();
    }
    //this.setState({isOpen: false});
  }

  render() {
    let { title, actions, closeText, changeAction, value } = this.props;
    let { width, height } = Dimensions.get("window");
    if (!closeText) {
      closeText = "Go Back";
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
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                minWidth: width * 0.5,
                minHeight: height * 0.2,
                //maxHeight: height * 0.6,
                backgroundColor: WHITE,
                borderRadius: 10,
                marginLeft: 20,
                marginRight: 20
                //marginTop: height * 0.25,
                //marginBottom: height * 0.25,
              }}
            >
              <View style={{ position: "absolute", right: 10, top: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.closeModal(actions);
                  }}
                >
                  <Ionicons name={"md-close"} size={30} color={BLACK} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 20,
                  marginBottom: 20
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
                    justifyContent: "center",
                    alignItems: "center"
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
                      width: "75%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 0,
                      marginBottom: 5
                    }}
                  >
                    <Text
                      style={
                        ([MainStyle.dmSansBold],
                        {
                          fontSize: 20,
                          //alignSelf : "center"
                          textAlign: "center"
                        })
                      }
                    >
                      Nama
                    </Text>
                    <View
                      style={{
                        width: "50%",
                        borderWidth: 1,
                        borderRadius: 10
                        //alignContent: "center"
                      }}
                    >
                      <TextInput
                        style={{
                          //backgroundColor: "rgba(0, 0, 0, 0.7)",
                          backgroundColor: "transparent",

                          //paddingTop: 5,
                          //paddingBottom: 10,
                          padding: 5,
                          //marginBottom: -10,
                          //marginLeft: '5%',
                          //marginRight: 5,
                          //height: 40,
                          fontSize: 14,
                          fontFamily: "RobotoSlab-Bold"
                        }}
                        type="text"
                        ref={q => {
                          this.TextInputSearch = q;
                        }}
                        onSubmitEditing={() => {
                          //this.getData(this.state.searchKey);
                          // this.setState({viewSearch: false});
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        onChangeText={v => changeAction(v)}
                        value={value}
                        placeholder={""}
                        // placeholderTextColor={MAIN_TEXT_COLOR_SELECT(
                        //   this.state.colorIndex
                        // )}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    //flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 15,
                    marginBottom: 0
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
                        minWidth: 75,
                        backgroundColor: MAIN_THEME_COLOR_SELECT(
                          this.props.colorIndex
                        ),
                        borderRadius: 10
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
                            textAlign: "center"
                          }
                        ]}
                      >
                        {closeText}
                      </Text>
                    </View>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
