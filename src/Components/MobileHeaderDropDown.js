import React, { Component } from "react";
import { View, FlatList, Modal, TouchableOpacity } from "react-native";
import Text from "./Text";
//import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import DeviceInfo from "react-native-device-info";

import {
  BLACK,
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT
} from "../Libraries/Colors";
import MainStyle from "../Styles";
import Button from './Button';
import { _pilih_user } from "../Libraries/DictionaryRekap";

/**
 * Dropdown custom untuk pengganti Picker react native karena text pada pop up dropdown tidak dapat pindah garis baru jika teksnya kepanjangan
 */
export const _pilih = ["Pilih", "Choose", "选择"];

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablet: DeviceInfo.isTablet(),
      expand: this.props.expand ? this.props.expand : false,
      isOpen: false,
      selectedValueO: null,
      selectedLabel: null,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0
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
    if (typeof onValueChange === "function") {
      onValueChange(v, i);
    }
  }

  _renderItem({ item, index }) {
    let { label, value, thisx } = item;
    return (
      <View
        key={label + value + index}
        style={{
          padding: 15,
          paddingTop: 15,
          paddingBottom: 15,

          // borderBottomColor: "#ccc",
          // borderBottomWidth: 0.6
        }}
      >
        <TouchableOpacity
          onPress={() => thisx.onSelect(label, value, index)}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text
            style={[
              MainStyle.dmSansBold,
              {
                fontSize: 12,
                color: MAIN_THEME_COLOR_SELECT(thisx.props.colorindex),
              },
            ]}
          >
            {label}
          </Text>
          {value.capacity ? (
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: 12,
                  color: MAIN_THEME_COLOR_SELECT(thisx.props.colorindex),
                },
              ]}
            >
              {value.capacity} 
            </Text>
          ) : (
            <View />
          )}
          <Text
            style={[
              MainStyle.dmSansBold,
              {
                fontSize: 12,
                color: MAIN_THEME_COLOR_SELECT(thisx.props.colorindex),
              },
            ]}
          >
            {_pilih[thisx.props.languageIndex]}
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
      action
    } = this.props;

    let { isOpen, expand } = this.state;

    let width = "100%";

    if (selectWidth) {
      width = selectWidth;
    }

    if (!color) {
      color = BLACK;
    }

    if (!textColor) {
      textColor = BLACK;
    }
    //console.log("dropdown v2 optionLists ===> ", optionLists)
    //console.log("dropdown v2 selectedValue ===> ", selectedValue)

    let selectedLabel = _pilih[this.state.languageIndex] + '...';
    for (let key in optionLists) {
      if (optionLists.hasOwnProperty(key)) {
        let el = optionLists[key];
        if (el.value == selectedValue) {
          selectedLabel = el.label;
          break;
        }
      }
    }

    let text_choose_user = _pilih_user[this.props.languageIndex];

    //let text_choose_user = this.props.languageIndex;


    if (text) {
      text_choose_user = text;
    }

    return (
      <View style={[style, {}]}>
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
              backgroundColor: "rgba(0,0,0,.6)",
              justifyContent: "flex-end"
            }}
          >
            <View style={{width: this.state.tablet? "50%" : "100%", alignSelf:"center"}}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "white",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  marginTop: 20,

                  flex: 1,
                  elevation: 10
                }}
              >
                <View style={{ marginTop: 15, padding: 15 }}>
                  <Text
                    style={[
                      MainStyle.dmSansBold,
                      {
                        fontSize: this.props.size ? this.props.size : 12,
                        color: BLACK,
                        width: width,
                      }
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
                    marginRight: 15
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
                    display: showButton ? "flex" : "none"
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
                      alignItems: 'center',
                      justifyContent: "center",
                      alignContent: 'center'
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.dmSansBold,
                        {
                          textAlign: "center",
                          fontSize: this.props.size ? this.props.size : 12,
                          color: textColor,
                          width: width,
                        }
                      ]}
                    >
                      {cancelText}
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={e => {
            if (action) {
              if (action === "0") {
                this.modalToggle(true);
              }
            }
          }}
        >
          <View
            style={{
              borderRadius: 100,
              paddingRight: 5,
              paddingLeft: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            {/* <Text style={{ flex: 5 }}>{ selectedLabel === null || selectedLabel === '' ? 'Pilih...' : selectedLabel }</Text> */}
            <Text
              style={[
                MainStyle.dmSansBold,
                {
                  fontSize: this.props.size ? this.props.size : 12,
                  color: color,
                  width: width,
                  textAlign: 'right'
                }
              ]}
            >
              {selectedLabel}
            </Text>
            <Entypo
              name="chevron-down"
              style={{
                display: hideArrow ? 'none' : 'flex',
                color: color,
                fontSize: 25,
                textAlign: "center"
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
