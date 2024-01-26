import React, { Component } from "react";
import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  Button as ButtonDefault,
  FlatList,
  ImageDefault,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  Dimensions,
} from "react-native";

export default class DayOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 1,
        url:
          'https://www.munsonschocolates.com/Customer-Content/www/products/Photos/Full/1-Lb--Chocolate-Assortment.jpg'
      },
      
    };
  }

  componentDidMount() {}

  renderScrollView() {
    let { data } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 450 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flexDirection: "row", backgroundColor: "#AAA" }}>
              <View
                style={{
                  width: "50%",
                  height: 250,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 15,
                }}
              >
                <Image
                  resizeMode={"stretch"}
                  //resizeMode={'contain'}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={{
                    uri: data.url
                  }}
                  //source={{uri: 'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg'}}
                />
              </View>
              <View
                style={{
                  width: "50%",
                  height: 250,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 15,
                }}
              >
                <Image
                  resizeMode={"stretch"}
                  //resizeMode={'contain'}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={{
                    uri: data.url
                  }}
                  //source={{uri: 'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg'}}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", backgroundColor: "#AAA" }}>
              <View
                style={{
                  width: "50%",
                  height: 250,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 15,
                }}
              >
                <Image
                  resizeMode={"stretch"}
                  //resizeMode={'contain'}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={{
                    uri: data.url
                  }}
                  //source={{uri: 'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg'}}
                />
              </View>
              <View
                style={{
                  width: "50%",
                  height: 250,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 15,
                }}
              >
                <Image
                  resizeMode={"stretch"}
                  //resizeMode={'contain'}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={{
                    uri: data.url
                  }}
                  //source={{uri: 'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg'}}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", backgroundColor: "#AAA" }}>
              <View
                style={{
                  width: "50%",
                  height: 250,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 15,
                }}
              >
                <Image
                  resizeMode={"stretch"}
                  //resizeMode={'contain'}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={{
                    uri: data.url
                  }}
                  //source={{uri: 'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg'}}
                />
              </View>
              <View
                style={{
                  width: "50%",
                  height: 250,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 15,
                }}
              >
                <Image
                  resizeMode={"stretch"}
                  //resizeMode={'contain'}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={{
                    uri: data.url
                  }}
                  //source={{uri: 'https://i.ibb.co/KD1M9p5/xing-fu-tang-singapore-june-2019-online-5.jpg'}}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            margin: 15
            //backgroundColor: "#789"
            //borderColor: '#000000',
            //borderWidth: 1,
          }}
        >
          <View
            style={{
              alignItems: "center",
              padding: 15,
              backgroundColor: "#BCA",
              borderColor: '#000000',
              borderWidth: 1,
            }}
          >
            <Text>Title</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "50%",
                backgroundColor: "#ABC",
                borderColor: '#000000',
                borderWidth: 1,
                padding: 15
              }}
            >
              <Text>Kiri</Text>
            </View>
            <View
              style={{
                width: "50%",
                backgroundColor: "#ABC",
                borderColor: '#000000',
                borderWidth: 1,
                padding: 15,
                alignItems: 'flex-end'
              }}
            >
              <Text>Kanan</Text>
            </View>
          </View>
          {this.renderScrollView()}
          <View
            style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }}
          >
            <View
              style={{
                flex: 1
                //flexDirection: 'row',
                //alignItems: "flex-end"
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 50,
                  //backgroundColor: '#ABC',
                  //justifyContent:"center",
                  alignItems: 'center'
                  //borderColor: "#000000",
                  //borderWidth: 1,
                  //padding: 15,
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 250,
                    backgroundColor: "#FF0000",
                    padding: 15,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text>Button 1</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 50,
                  flexDirection: "row",
                  //backgroundColor: "#ABC",
                  justifyContent: "space-between",
                  alignItems: 'center'
                  //borderColor: "#000000",
                  //borderWidth: 1,
                  //padding: 15,
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 250,
                    backgroundColor: "#00FF00",
                    padding: 15,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: '#FFF' }}>>Button 2</Text>
                </View>
                <View
                  style={{
                    height: 50,
                    width: 250,
                    backgroundColor: "#0000FF",
                    padding: 15,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: '#FFF' }}>Button 3</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
