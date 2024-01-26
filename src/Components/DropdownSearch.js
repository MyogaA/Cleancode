import React, {Component} from 'React';;
import {
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import Text from './Text';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BLACK, MAIN_THEME_COLOR} from '../Libraries/Colors';

import MatComicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actions} from 'react-native-router-flux';
import NewAsyncStorage from '../Libraries/AsyncStorage';

import {FloatingTextInput} from '../Components';

//import CameraScreen from '../Components/CameraBarcode';

//const CameraBarcode = CameraScreen;
/**
 * Dropdown custom untuk pengganti Picker react native karena text pada pop up dropdown tidak dapat pindah garis baru jika teksnya kepanjangan
 */
export default class DropdownSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedValueO: null,
      selectedLabel: null,
      cameraMode: false,
      searchKey: '',
    };
  }

  modalToggle(c = undefined) {
    if  (c === undefined) {c = !this.state.isOpen;}
    this.setState({isOpen: c});
  }

  modalCamera(c = undefined) {
    if  (c === undefined) {c = !this.state.cameraMode;}
    this.setState({cameraMode: c});
  }

  //componentWillReceiveProps(nextProps) {
  // if(nextProps.selectedValue != this.state.selectedValueO) {
  //     // let label = this.props.optionLists.map((v, i) => { if(v.value == v) return v.label })
  //     let label = '';
  //     for (let key in nextProps.optionLists) {
  //         if (nextProps.optionLists.hasOwnProperty(key)) {
  //             let el = nextProps.optionLists[key];
  //             label = el.value == nextProps.selectedValue ? el.label : "";
  //             break;
  //         }
  //     }
  //     console.log('label', label, nextProps);
  //     this.setState({ selectedLabel: label, selectedValueO: nextProps.selectedValue })
  // }
  //}

  componentDidUpdate(nextProps) {
    // let nas = new NewAsyncStorage;
    // nas.getItemByKey('@global:ProductSearchBarcode', (e) => {
    //     if (e)
    //     {
    //     let result = JSON.parse(e)
    //     console.log ('componentWillReceiveProps.result ==> ', result);
    //     let barcodeText = result[0].data;
    //     this.setState({searchKey : barcodeText});
    //     this.modalToggle('true');
    //     NewAsyncStorage.removeItem('global', 'ProductSearchBarcode', (e)=>{
    //         this.onSearchSubmit();
    //     });
    //     }
    //     //image
    // });
    //console.log('componentWillReceiveProps.dataLS ==> ', this.getLS('Product'));
  }

  openCamera() {
    //this.modalToggle('false');
    this.modalCamera('true');
  }

  closeCamera() {
    let nas = new NewAsyncStorage()();
    nas.getItemByKey('@global:ProductSearchBarcode', e => {
      if (e) {
        let result = JSON.parse(e);;
        console.log('closeCamera.result ==> ', result);
        let barcodeText = result[0].data;
        console.log('closeCamera.barcodeText ==> ', barcodeText);

        this.setState({searchKey: barcodeText, cameraMode: false});

        NewAsyncStorage.removeItem('global', 'ProductSearchBarcode', e => {
          this.onSearchSubmit(barcodeText);
        });
      }
      //image
    });
    //this.modalToggle('true');
    //this.modalCamera('false');
  }

  onSelect(l, v, i) {
    let onValueChange = this.props.onValueChange;
    // this.setState({selectedValueO: v, selectedLabel: l}, e => this.modalToggle(false));
    this.modalToggle(false);
    if  (typeof onValueChange === 'function') {onValueChange(v, i);}
  }

  onSearchChange(text) {
    let onSearch = this.props.onSearch;
    console.log('onSearchChange  => ', text);

    this.setState({searchKey: text});
  }

  onSearchSubmit(text = this.state.searchKey) {
    let onSearch = this.props.onSearch;
    let searchKey = text;

    this.setState({searchKey: searchKey});

    console.log('onSearchSubmit  => ', searchKey);
    onSearch(searchKey);
  }

  _renderItem({item, index}) {
    let {label, value, thisx} = item;
    return (
      <View
        key={label + value + index}
        style={{
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15,
          borderBottomColor: '#ccc',
          borderBottomWidth: 0.6,
        }}>
        <TouchableOpacity onPress={() => thisx.onSelect(label, value, index)}>
          <Text>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let {
      optionLists,
      name,
      style,
      itemStyle,
      itemTextStyle,
      open,
      selectedValue,
      selectWidth,
      color,
      barcodeScan,
    } = this.props;
    let {isOpen, cameraMode} = this.state;

    let width = '95%';

    if (selectWidth) {width = selectWidth;}

    if (!color) {color = BLACK;}

    if (!optionLists) {optionLists = [{id: '', name: ''}];}

    let selectedLabel = 'Pilih...';
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
        {/* <CameraBarcode
                usage= {'ProductSearchBarcode'}
                onScan = {this.closeCamera()}
                /> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={() => {
            this.modalToggle(false);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.6)',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                height: '100%',
              }}>
              {!this.state.cameraMode ? (
                <View
                  style={{
                    backgroundColor: 'white',
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    flex: 1,
                    elevation: 1,
                  }}>
                  <View
                    key="search"
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      paddingTop: 15,
                      paddingBottom: 15,
                      borderBottomColor: '#ccc',
                      borderBottomWidth: 0.6,
                    }}>
                    <View style={{width: '90%'}}>
                      <FloatingTextInput
                        type="text"
                        style={{width: '95%'}}
                        refx={q => {
                          this.TextInput_1 = q;
                        }}
                        onSubmitEditing={() => {
                          this.onSearchSubmit();
                        }}
                        //onChangeText={(q)=>this._accountUpdate('username',q)}
                        //onChangeText={(v)=>{this.onSearchChange(v)}}
                        onChangeText={q => {
                          if (q.length >= 2 && q.length % 2 == 0) {
                            this.onSearchSubmit(q);
                          } else {
                            this.onSearchChange(q);
                          }
                        }}
                        value={this.state.searchKey}
                        //keyboardType='email-address'
                        label={'Search'}
                      />
                    </View>
                    {barcodeScan ? (
                      <View style={{width: 50}}>
                        <TouchableOpacity onPress={() => this.openCamera()}>
                          <View style={{width: 50, height: 25}}>
                            <MatComicons
                              name={'barcode-scan'}
                              style={{fontSize: 25, color: MAIN_THEME_COLOR}}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>

                  <FlatList
                    style={{}}
                    data={optionLists.map((v, i) => {
                      return {label: v.label, value: v.value, thisx: this};
                    })}
                    extraData={this.state}
                    keyExtractor={(item, index) => item.value}
                    renderItem={this._renderItem}
                  />
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: 'white',
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    flex: 1,
                    elevation: 1,
                  }}>
                  {/* <CameraBarcode
                    usage={'ProductSearchBarcode'}
                    onScan={this.closeCamera()}
                  /> */}
                </View>
              )}
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={e => this.modalToggle(true)}>
          <View
            style={{
              paddingRight: 5,
              paddingLeft: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* <Text style={{ flex: 5 }}>{ selectedLabel === null || selectedLabel === '' ? 'Pilih...' : selectedLabel }</Text> */}
            <Text style={{color: color, width: width}}>{selectedLabel}</Text>
            <Icon
              name="caret-down"
              style={{color: color, flex: 1, textAlign: 'center'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

DropdownSearch.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onSearch: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  optionLists: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  style: PropTypes.object,
  itemStyle: PropTypes.object,
  itemTextStyle: PropTypes.object,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,,
}
;;
