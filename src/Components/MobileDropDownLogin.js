import React, { Component } from 'react';
import { View, FlatList, Modal, TouchableOpacity } from 'react-native';
import Text from './Text';
//import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  BLACK,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
} from '../Libraries/Colors';
import MainStyle from '../Styles';
import Button from "./Button";

/**
 * Dropdown custom untuk pengganti Picker react native karena text pada pop up dropdown tidak dapat pindah garis baru jika teksnya kepanjangan
 */
export const _pilih = ['Pilih...', 'Choose...'];

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: this.props.expand ? this.props.expand : false,
      isOpen: false,
      selectedValueO: null,
      selectedLabel: null,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
    };
  }

  modalToggle(c = undefined) {
    if (c === undefined) {
      c = !this.state.isOpen;
    }
    this.setState({ isOpen: c });
  }

  // componentWillReceiveProps(nextProps) {
  //   // if(nextProps.selectedValue != this.state.selectedValueO) {
  //   //     // let label = this.props.optionLists.map((v, i) => { if(v.value == v) return v.label })
  //   //     let label = '';
  //   //     for (let key in nextProps.optionLists) {
  //   //         if (nextProps.optionLists.hasOwnProperty(key)) {
  //   //             let el = nextProps.optionLists[key];
  //   //             label = el.value == nextProps.selectedValue ? el.label : "";
  //   //             break;
  //   //         }
  //   //     }
  //   //     console.log('label', label, nextProps);
  //   //     this.setState({ selectedLabel: label, selectedValueO: nextProps.selectedValue })
  //   // }
  // }

  onSelect(l, v, i) {
    let onValueChange = this.props.onValueChange;
    // this.setState({selectedValueO: v, selectedLabel: l}, e => this.modalToggle(false));
    this.setState({ expand: false });
    this.modalToggle(false);
    if (typeof onValueChange === 'function') {
      onValueChange(v, i);
    }
  }

  _renderItem({ item, index }) {
    let { label, value, thisx } = item;

    return (
      <View
        key={label + value + index}
        style={{
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15
          // borderBottomColor: "#ccc",
          // borderBottomWidth: 0.6
        }}
      >
        <TouchableOpacity onPress={() => thisx.onSelect(label, value, index)}>
          <Text
            style={[MainStyle.dmSansBold, { fontSize: 12, color: BLACK }]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    let {
      optionLists,
      style,
      itemStyle,
      itemTextStyle,
      open,
      selectedValue,
      selectWidth,
      color,
      hideArrow,
      text,
      textColor,
      showButton,
      cancelAction,
      cancelText,
    } = this.props;
    let { isOpen, expand } = this.state;

    let width = '85%';

    if (selectWidth) {
      width = selectWidth;
    }

    if (!color) {
      color = BLACK;
    }

    if (!textColor) {
      textColor = BLACK;
    }

    let selectedLabel = _pilih[this.state.languageIndex];
    for (let key in optionLists) {
      if (optionLists.hasOwnProperty(key)) {
        let el = optionLists[key];
        if (el.value == selectedValue) {
          selectedLabel = el.label;
          break;
        }
      }
    }

    let text_choose_user =
      this.props.languageIndex === 0 ? 'Pilih User' : 'Choose User';

    if (text) {
      text_choose_user = text;
    }

    return (
      <View style={[{ flex: 1 }]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={expand ? true : isOpen}
          onRequestClose={() => {
            this.setState({ expand: false });
            this.modalToggle(false);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.6)',
              justifyContent: 'flex-end'
            }}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  marginTop: 20,

                  flex: 1,
                  elevation: 10,
                }}
              >
                <View style={{ marginTop: 15, padding: 15 }}>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: this.props.size ? this.props.size : 12,
                        color: BLACK,
                        width: width
                      },
                    ]}
                  >
                    {text_choose_user}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    //borderColor: "#BCA",
                    borderBottomWidth: 0.5,
                    flex: 1,
                    marginLeft: 15,
                    marginRight: 15,
                  }}
                />
                <FlatList
                  style={{}}
                  data={optionLists.map((v, i) => {
                    return { label: v.label, value: v.value, thisx: this };
                  })}
                  extraData={this.state}
                  keyExtractor={(item, index) => item.value}
                  renderItem={this._renderItem}
                />
                <View
                  style={{
                    //marginTop: 15,
                    //padding: 15,
                    display: showButton ? 'flex' : 'none'
                  }}
                >
                  <Button
                    onPress={() => {
                      cancelAction();
                      this.setState({ expand: false });
                      this.modalToggle(false);
                    }}
                    style={{
                      margin: 15,
                      height: 60,
                      flex: 1,
                      borderRadius: 15,
                      padding: 20,
                      backgroundColor: color,
                      alignItems: "center",
                      justifyContent: 'center',
                      alignContent: "center"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          textAlign: 'center',
                          fontSize: this.props.size ? this.props.size : 12,
                          color: textColor,
                          width: width
                        },
                      ]}
                    >
                      {cancelText}
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={e => this.modalToggle(true)}
          style={[style, {}]}
        >
          <View
            style={{
              width: width,
              //width: "45%",
            }}
          >
            {/* <Text style={{ flex: 5 }}>{ selectedLabel === null || selectedLabel === '' ? 'Pilih...' : selectedLabel }</Text> */}
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                
                justifyContent: 'space-between'
                //backgroundColor:"#ACD"
              }}
            >
              <Text
                style={[
                  MainStyle.dmSansBold,
                  {
                    fontSize: this.props.size ? this.props.size : 12,
                    color: color,

                    //backgroundColor:"#ACD"

                    //textAlign: "right"
                  },
                ]}
              >
                {selectedLabel}
              </Text>
              <View style={{width: "100%",}}>
                <Entypo
                  name="chevron-down"
                  style={{
                    //backgroundColor: '#BCA',
                    //backgroundColor:"#ACD",
                    //position: "absolute",
                    
                    display: hideArrow ? "none" : "none",
                    color: color,
                    fontSize: 25,
                    textAlign: 'right'
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
