import React, { Component } from "react";
import { View, FlatList, Modal, TouchableOpacity } from "react-native";
import Text from "./Text";
//import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

import { BLACK, MAIN_THEME_COLOR, MAIN_THEME_COLOR_SELECT } from "../Libraries/Colors";
import MainStyle from "../Styles";

/**
 * Dropdown custom untuk pengganti Picker react native karena text pada pop up dropdown tidak dapat pindah garis baru jika teksnya kepanjangan
 */
export const _pilih = ["Pilih...", "Choose..."];

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15,
          borderBottomColor: "#ccc",
          borderBottomWidth: 0.6
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
      defaultText,
      colorIndex
    } = this.props;
    let { isOpen } = this.state;

    let width = "85%";

    if (selectWidth) {
      width = selectWidth;
    }

    if (!color) {
      color = BLACK;
    }

    let selectedLabel = _pilih[this.state.languageIndex];
    if (defaultText)
    {
      selectedLabel = defaultText;
    }
    for (let key in optionLists) {
      if (optionLists.hasOwnProperty(key)) {
        let el = optionLists[key];
        if (el.value == selectedValue) {
          selectedLabel = el.label;
          break;
        }
      }
    }

    return (
      <View style={[style, {}]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={() => {
            this.modalToggle(false);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.6)",
              justifyContent: "center"
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "white",
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 20,
                  marginBottom: 20,
                  flex: 1,
                  elevation: 10
                }}
              >
                <FlatList
                  style={{}}
                  data={optionLists.map((v, i) => {
                    return { label: v.label, value: v.value, thisx: this };
                  })}
                  extraData={this.state}
                  keyExtractor={(item, index) => item.value}
                  renderItem={this._renderItem}
                />
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={e => this.modalToggle(true)}>
          <View
            style={{
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
                }
              ]}
            >
              {selectedLabel}
            </Text>
            <Entypo
              name="chevron-down"
              style={{
                color: MAIN_THEME_COLOR_SELECT(colorIndex),
                fontSize: 25,
                textAlign: "center",
                
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
