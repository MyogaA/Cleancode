/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, { Component, useState } from "react";
import ExternalDisplay, {
  getScreens,
  useExternalDisplay
} from "react-native-external-display";
import MainStyle from "../Styles";

import { WebView } from "react-native-webview";

import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button as ButtonDefault,
  FlatList,
  ImageDefault,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  Dimensions,
  BackHandler,
  Linking
} from "react-native";

import Image from "../Components/Image";
import { BLACK, MAIN_THEME_COLOR_SELECT, WHITE } from "./Colors";
import {
  _change_amount,
  _grand_total,
  _paid_by,
  _sudah_bayar,
  _tax,
  _terima_kasih
} from "./DictionaryPayment";
import { _welcome } from "./DictionaryLogin";
import { _sub_total, _total } from "./DictionaryHistory";

export function CurrencyFormat(num, iscurr, currency, currencyAllowDecimal) {
  let int_num = parseInt(num);
  let comma_num = num - int_num;

  //console.log("num ===> ", num);
  //console.log("int_num ===> ", int_num);
  comma_num = Math.round(comma_num * 100);
  //console.log("comma_num ===> ", comma_num);

  let comma_add = "";
  if (comma_num === 0) {
  } else {
    if (comma_num < 10) {
      comma_add = `.0${comma_num}`;
    } else {
      comma_add = `.${comma_num}`;
    }
  }

  if (!currencyAllowDecimal) {
    comma_add = "";
  }

  let curr = "";
  if (typeof iscurr !== "undefined" && iscurr === true) {
    curr = currency + " ";
  }
  let str = "";
  let numrev = int_num
    .toString()
    .split("")
    .reverse()
    .join("");
  for (let i = 0; i < numrev.length; i++) {
    if (i % 3 === 0) {
      str += numrev.substr(i, 3) + ",";
    }
  }
  return (
    curr +
    str
      .split("", str.length - 1)
      .reverse()
      .join("") +
    comma_add
  );
}

export function divideLongWord(str, limit) {
  let final_result = [];
  let length = str.length;

  let array_length = Math.ceil(length / limit);

  // for (var i = 0; i < array_length; i++) {
  //   let temp = str.substr(i * limit, limit);
  //   final_result.push(temp);
  // }

  let count = 0;

  for (let i = 0; i < array_length + 2; i++) {
    let temp = "";

    if (count === 0) {
      //temp = str.substr(0, limit);
      temp = truncateOnWord(str, limit);
    } else {
      temp = str.substr(count, length);
      temp = truncateOnWord(temp, limit);
    }
    count = count + temp.length;
    if (temp !== "") {
      final_result.push(temp.trim());
    }
  }
  return final_result;
}

export function truncateOnWord(str, limit) {
  var trimmable =
    "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF";
  var reg = new RegExp("(?=[" + trimmable + "])");
  var words = str.split(reg);
  var count = 0;
  return words
    .filter(function(word) {
      count += word.length;
      return count <= limit;
    })
    .join("");
}

export function DualMonitorPayment(state) {
  const [info, setInfo] = useState(getScreens());
  const [on, setOn] = useState(true);
  const [setMount] = useState(true);

  const [type] = useState(1);

  const parameters = state.state;
  const mount = parameters.mount;
  console.log("DUAL MONITOR parameters ====> ", parameters);

  const test = CurrencyFormat(parameters.grandTotal, true, "Rp.", false);

  const { showCZ, cz_uri, cz_qr } = parameters;

  //console.log("DUAL MONITOR Test Currency ====> ", test);

  let subTotalCalculate = 0;

  if (parameters.currencyAllowDecimal) {
    subTotalCalculate = parameters.bill_subTotal + parameters.customPriceFinal;
  } else {
    subTotalCalculate = parseInt(
      parameters.bill_subTotal + parameters.customPriceFinal
    );
  }

  const discount_render =
    parameters.bill_discount >= parameters.bill_subTotal
      ? parameters.bill_subTotal
      : parameters.bill_discount;

  let tax_render =
    (parameters.bill_subTotal - discount_render) *
    (parameters.rate_tax + parameters.rate_services);

  tax_render = tax_render * parameters.currency_conversion_ratio;

  const qr_image_url = parameters.qr_image_url;
  const payment_type = parameters.payment_type;

  let payment_amount = 0;

  if (payment_type === "cash" || payment_type === "Cash") {
    payment_amount = parameters.cashAmount;
  } else {
    payment_amount =
      parameters.grandTotal * parameters.currency_conversion_ratio;
  }

  const payment_change =
    payment_amount -
    parameters.grandTotalRound * parameters.currency_conversion_ratio;

  subTotalCalculate = subTotalCalculate * parameters.currency_conversion_ratio;

  if (info[1]) {
    return (
      <View style={{ flex: 1 }}>
        {mount && (
          <ExternalDisplay
            mainScreenStyle={{
              flex: 1
            }}
            fallbackInMainScreen
            screen={on && Object.keys(info)[0]}
            onScreenConnect={setInfo}
            onScreenDisconnect={setInfo}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: showCZ && cz_qr ? "#F2F7FC" : WHITE
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center"
                  //alignContent: "center",
                  //justifyContent:"center",
                  //paddingTop: 15,
                  //backgroundColor: "#BCA"
                }}
              >
                <View style={{ alignSelf: "flex-end" }}>
                  <Image
                    style={{
                      width: 300,
                      height: 100,
                      //overflow: "hidden",
                      borderRadius: 10,
                      display: showCZ && cz_qr ? "none" : "flex"
                      //position: showCZ && cz_qr ? "absolute"

                      //backgroundColor: "#C4C4C4"
                    }}
                    //source={{ uri: qr_image_url }}
                    source={require("../Images/new_logo_2.png")}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    display: parameters.showPaymentSuccess ? "none" : "flex",
                    marginTop: -100,
                    flex: 1,
                    //backgroundColor: "#BCA",
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      //width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                      //marginTop: 25,
                      //backgroundColor:"#BCA"
                      //backgroundColor: "#BCA"
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 0,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 0,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 16,
                            alignSelf: "center",
                            marginTop: 0,
                            display: showCZ && cz_qr ? "none" : "flex"
                          }
                        ]}
                      >
                        {_sub_total[parameters.languageIndex]}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: MAIN_THEME_COLOR_SELECT(
                              parameters.colorIndex
                            ),
                            fontSize: 16,
                            alignSelf: "center",
                            display: showCZ && cz_qr ? "none" : "flex"
                          }
                        ]}
                      >
                        {CurrencyFormat(
                          subTotalCalculate,
                          true,
                          parameters.currency_conversion_ratio === 1
                            ? parameters.currency
                            : parameters.currency_conversion_name,
                          parameters.currencyAllowDecimal
                        )}
                      </Text>

                      {/* Grand Total end */}
                    </View>
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 0,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 0,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 16,
                            alignSelf: "center",
                            marginTop: 0,
                            display: showCZ && cz_qr ? "none" : "flex"
                          }
                        ]}
                      >
                        {_tax[parameters.languageIndex]}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: MAIN_THEME_COLOR_SELECT(
                              parameters.colorIndex
                            ),
                            fontSize: 16,
                            alignSelf: "center",
                            display: showCZ && cz_qr ? "none" : "flex"
                          }
                        ]}
                      >
                        {CurrencyFormat(
                          tax_render,
                          true,
                          parameters.currency_conversion_ratio === 1
                            ? parameters.currency
                            : parameters.currency_conversion_name,
                          parameters.currencyAllowDecimal
                        )}
                      </Text>

                      {/* Grand Total end */}
                    </View>
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 0,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 1,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: 0,
                            display: showCZ && cz_qr ? "none" : "flex"
                          }
                        ]}
                      >
                        {_grand_total[parameters.languageIndex]}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: MAIN_THEME_COLOR_SELECT(
                              parameters.colorIndex
                            ),
                            fontSize: 24,
                            alignSelf: "center",
                            display: showCZ && cz_qr ? "none" : "flex"
                          }
                        ]}
                      >
                        {CurrencyFormat(
                          parameters.grandTotalRound *
                            parameters.currency_conversion_ratio,
                          true,
                          parameters.currency_conversion_ratio === 1
                            ? parameters.currency
                            : parameters.currency_conversion_name,
                          parameters.currencyAllowDecimal
                        )}
                      </Text>

                      {/* Grand Total end */}
                    </View>
                    {/* QR start */}
                    <View
                      style={{
                        width: "100%",
                        alignSelf: "center"
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: 15,
                            display: showCZ && cz_qr ? "none" : "flex"
                          }
                        ]}
                      >
                        {_paid_by[parameters.languageIndex]} {payment_type}
                      </Text>
                      {/* <Image
                          style={{
                            width: 200,
                            height: 200,
                            overflow: "hidden",
                            borderRadius: 10,
                            alignSelf: "center",
                            backgroundColor: "#C4C4C4"
                          }}
                          //source={{ uri: qr_image_url }}

                          source={require("../../Images/QR.jpg")}
                        /> */}

                      {qr_image_url && !showCZ ? (
                        <Image
                          style={{
                            width: 200,
                            height: 200,
                            overflow: "hidden",
                            borderRadius: 10,
                            alignSelf: "center",
                            backgroundColor: "#C4C4C4"
                          }}
                          source={{ uri: qr_image_url }}

                          //source={require("../../Images/QR.jpg")}
                        />
                      ) : (
                        <View />
                      )}

                      {showCZ && cz_qr ? (
                        <WebView
                          source={{ uri: cz_uri }}
                          containerStyle={{
                            flex: 0,
                            width: "100%",
                            height: 550,
                            marginTop: 50
                          }}
                          geolocationEnabled={true}
                          scrollEnabled={false}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    display: parameters.showPaymentSuccess ? "flex" : "none",
                    marginTop: -100,
                    flex: 1,
                    //backgroundColor: "#BCA",
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      //width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                      //marginTop: 25,
                      //backgroundColor:"#BCA"
                      //backgroundColor: "#BCA"
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 15,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 1,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_sudah_bayar[parameters.languageIndex]}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: 10
                          }
                        ]}
                      >
                        {_paid_by[parameters.languageIndex]} {payment_type}
                      </Text>
                    </View>
                    {/*_change_amount */}
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 15,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 1,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_change_amount[parameters.languageIndex]}
                      </Text>

                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: MAIN_THEME_COLOR_SELECT(
                              parameters.colorIndex
                            ),
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {CurrencyFormat(
                          payment_change,
                          true,
                          parameters.currency_conversion_ratio === 1
                            ? parameters.currency
                            : parameters.currency_conversion_name,
                          parameters.currencyAllowDecimal
                        )}
                      </Text>

                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_terima_kasih[parameters.languageIndex]}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ExternalDisplay>
        )}
      </View>
    );
  } else {
    return <View />;
  }
}

export function DualMonitorOrder(state) {
  const [info, setInfo] = useState(getScreens());
  const [on, setOn] = useState(true);
  const [setMount] = useState(true);

  const [type] = useState(1);

  const parameters = state.state;
  const mount = parameters.mount;

  const dataBill = parameters.dataBill;

  let subTotal = 0;

  dataBill.map((v, i) => {
    const total = v.total !== "" ? v.total : 0;
    if (parameters.currencyAllowDecimal) {
      subTotal = subTotal + parseFloat(total);
    } else {
      subTotal = subTotal + parseInt(total);
    }

    //subTotal = subTotal + v.qty * v.salesTypeValue;
  });

  let total_services = 0;
  if (parameters.currencyAllowDecimal) {
    total_services = subTotal * parameters.services;
  } else {
    total_services = Math.round(subTotal * parameters.services);
  }
  let total_tax = 0;

  if (parameters.currencyAllowDecimal) {
    total_tax = subTotal * parameters.tax;
  } else {
    total_tax = Math.round(subTotal * parameters.tax);
  }

  if (parameters.withServices === false) {
    total_services = 0;
  }

  if (parameters.withTax === false) {
    total_tax = 0;
  }

  let grand_total = 0;
  grand_total = subTotal + total_services + total_tax;

  

  if (info[1]) {
    return (
      <View style={{ flex: 1 }}>
        {mount && (
          <ExternalDisplay
            mainScreenStyle={{
              flex: 1
            }}
            fallbackInMainScreen
            screen={on && Object.keys(info)[0]}
            onScreenConnect={setInfo}
            onScreenDisconnect={setInfo}
          >
            <View style={{ flex: 1, backgroundColor: WHITE }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center"
                  //alignContent: "center",
                  //justifyContent:"center",
                  //paddingTop: 15,
                  //backgroundColor: "#BCA"
                }}
              >
                <View style={{ alignSelf: "flex-end" }}>
                  <Image
                    style={{
                      width: 300,
                      height: 100,
                      //overflow: "hidden",
                      borderRadius: 10

                      //backgroundColor: "#C4C4C4"
                    }}
                    //source={{ uri: qr_image_url }}
                    source={require("../Images/new_logo_2.png")}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    //display: parameters.showPaymentSuccess ? "none" : "flex",

                    marginTop: -100,
                    flex: 1,
                    //backgroundColor: "#BCA",
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      //width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                      //marginTop: 25,
                      //backgroundColor:"#BCA"
                      //backgroundColor: "#BCA"
                    }}
                  >
                    <View
                      style={{
                        width: "95%",
                        alignSelf: "center",
                        marginBottom: 0,
                        marginTop: 100,
                        borderColor: "#C4C4C4",
                        borderWidth: 1,
                        borderRadius: 15,
                        padding: 15,
                        flex: 4
                      }}
                    >
                      <View>
                        <FlatList
                          //ListHeaderComponent={this.renderSearch()}
                          //inverted={true}
                          showsVerticalScrollIndicator={false}
                          data={dataBill}
                          // columnWrapperStyle={{
                          //   justifyContent: "space-between"
                          // }}
                          numColumns={2}
                          renderItem={({ item, index }) => {
                            let total = parameters.currencyAllowDecimal
                              ? item.total
                              : parseInt(item.total);

                            let product_name = [""];
                            product_name = divideLongWord(item.name, 25);

                            return (
                              <View
                                style={{
                                  width: "50%",
                                  //flex: 1,
                                  // borderBottomWidth: 0.5,
                                  backgroundColor: MAIN_THEME_COLOR_SELECT(parameters.colorIndex),
                                  borderWidth: 0.5,
                                  borderRadius: 5,
                                  borderColor: "#C4C4C4",
                                  margin: 1,
                                  marginRight: 5,
                                  paddingTop: 3,
                                  paddingBottom: 3,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                }}
                              >
                                <View
                                  style={{
                                    //flex: 1,
                                    width: "100%",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    //marginTop: 5,
                                    //paddingBottom: 5,
                                    //minHeight: 40,
                                    borderColor: "#C8C7CC"
                                    //borderBottomWidth: 1
                                  }}
                                >
                                  <View
                                    style={{
                                      flex: 5,
                                      alignItems: "flex-start"
                                    }}
                                  >
                                    <Text
                                      style={[
                                        MainStyle.robotoNormalBold,
                                        {
                                          color: WHITE,
                                          fontSize: 12

                                          //alignSelf: "center"
                                        }
                                      ]}
                                    >
                                      {product_name[0]}
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      flex: 2,
                                      alignItems: "flex-end"
                                    }}
                                  >
                                    <Text
                                      style={[
                                        MainStyle.robotoNormalBold,
                                        {
                                          color: WHITE,
                                          fontSize: 12

                                          //alignSelf: "center"
                                        }
                                      ]}
                                    >
                                      {item.qty}
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      flex: 3,
                                      alignItems: "flex-end"
                                    }}
                                  >
                                    <Text
                                      style={[
                                        MainStyle.robotoNormalBold,
                                        {
                                          color: WHITE,
                                          fontSize: 12
                                          //alignSelf: "center"
                                        }
                                      ]}
                                    >
                                      {/* {parameters.currency}{" "} */}
                                      {/* {CurrencyFormat(total)} */}
                                      {CurrencyFormat(
                                        total,
                                        false,
                                        parameters.currency,
                                        parameters.currencyAllowDecimal
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            );
                          }}
                          //ListFooterComponent={this._renderFooter}
                          keyExtractor={(item, index) => {
                            return "RenderBillSecondScreen" + index.toString();
                          }}
                          //onRefresh={this._onRefresh}
                          //onEndReached={this.handleLoadMore}
                          //onEndReachedThreshold={0.5}
                          //refreshing={refreshing}
                        />
                      </View>

                      {/* Grand Total end */}
                    </View>
                    {/* QR start */}
                    <View
                      style={{ width: "100%", alignSelf: "center", flex: 1 }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: 15
                          }
                        ]}
                      >
                        {_total[parameters.languageIndex]}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: MAIN_THEME_COLOR_SELECT(
                              parameters.colorIndex
                            ),
                            fontSize: 24,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {/* {CurrencyFormat(
                          parameters.grandTotalRound,
                          true,
                          parameters.currency,
                          parameters.currencyAllowDecimal
                        )} */}
                        {parameters.currency}{" "}
                        {CurrencyFormat(
                          grand_total,
                          false,
                          parameters.currency,
                          parameters.currencyAllowDecimal
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    //display: parameters.showPaymentSuccess ? "flex" : "none",
                    display: "none",
                    marginTop: -100,
                    flex: 1,
                    //backgroundColor: "#BCA",
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      //width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                      //marginTop: 25,
                      //backgroundColor:"#BCA"
                      //backgroundColor: "#BCA"
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 15,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 1,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_sudah_bayar[parameters.languageIndex]}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: 10
                          }
                        ]}
                      >
                        {_paid_by[parameters.languageIndex]}
                      </Text>
                    </View>
                    {/*_change_amount */}
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 15,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 1,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_change_amount[parameters.languageIndex]}
                      </Text>

                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: MAIN_THEME_COLOR_SELECT(
                              parameters.colorIndex
                            ),
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {/* {CurrencyFormat(
                          payment_change,
                          true,
                          parameters.currency,
                          parameters.currencyAllowDecimal
                        )} */}
                        0
                      </Text>

                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_terima_kasih[parameters.languageIndex]}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ExternalDisplay>
        )}
      </View>
    );
  } else {
    return <View />;
  }
}

export function DualMonitorGeneral(state) {
  const [info, setInfo] = useState(getScreens());
  const [on, setOn] = useState(true);
  const [setMount] = useState(true);

  const [type] = useState(1);

  const parameters = state.state;
  const mount = parameters.mount;

  let business_name = parameters.userInfo
    ? parameters.userInfo.business_name
    : "";
  let outlet_name = parameters.userInfo ? parameters.userInfo.gerai_name : "";

  let combo = outlet_name === "" ? "" : business_name + "-" + outlet_name;

  let powered = "Powered by Beetpos";

  if (info[1]) {
    return (
      <View style={{ flex: 1 }}>
        {mount && (
          <ExternalDisplay
            mainScreenStyle={{
              flex: 1
            }}
            fallbackInMainScreen
            screen={on && Object.keys(info)[0]}
            onScreenConnect={setInfo}
            onScreenDisconnect={setInfo}
          >
            <View style={{ flex: 1, backgroundColor: WHITE }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center"
                  //alignContent: "center",
                  //justifyContent:"center",
                  //paddingTop: 15,
                  //backgroundColor: "#BCA"
                }}
              >
                <View style={{ alignSelf: "flex-end" }}>
                  <Image
                    style={{
                      width: 300,
                      height: 100,
                      //overflow: "hidden",
                      borderRadius: 10

                      //backgroundColor: "#C4C4C4"
                    }}
                    //source={{ uri: qr_image_url }}
                    source={require("../Images/new_logo_2.png")}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    //display: parameters.showPaymentSuccess ? "none" : "flex",

                    marginTop: -100,
                    flex: 1,
                    //backgroundColor: "#BCA",
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      //width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                      //marginTop: 25,
                      //backgroundColor:"#BCA"
                      //backgroundColor: "#BCA"
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 0,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 1,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: 0
                          }
                        ]}
                      >
                        {_welcome[parameters.languageIndex]}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: MAIN_THEME_COLOR_SELECT(
                              parameters.colorIndex
                            ),
                            fontSize: 24,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {/* {CurrencyFormat(
                            parameters.grandTotalRound,
                            true,
                            parameters.currency,
                            parameters.currencyAllowDecimal
                          )} */}
                        {combo}
                      </Text>

                      {/* Grand Total end */}
                    </View>
                    {/* QR start */}
                    <View style={{ width: "100%", alignSelf: "center" }}>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: 15
                          }
                        ]}
                      >
                        {powered}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    //display: parameters.showPaymentSuccess ? "flex" : "none",
                    display: "none",
                    marginTop: -100,
                    flex: 1,
                    //backgroundColor: "#BCA",
                    width: "100%"
                  }}
                >
                  <View
                    style={{
                      //width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                      //marginTop: 25,
                      //backgroundColor:"#BCA"
                      //backgroundColor: "#BCA"
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 15,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 1,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_sudah_bayar[parameters.languageIndex]}
                      </Text>
                      <Text
                        style={[
                          MainStyle.robotoNormal,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: 10
                          }
                        ]}
                      >
                        {_paid_by[parameters.languageIndex]} Test
                      </Text>
                    </View>
                    {/*_change_amount */}
                    <View
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginBottom: 15,
                        borderColor: "#C4C4C4",
                        borderBottomWidth: 1,
                        paddingBottom: 15
                      }}
                    >
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_change_amount[parameters.languageIndex]}
                      </Text>

                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: MAIN_THEME_COLOR_SELECT(
                              parameters.colorIndex
                            ),
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {/* {CurrencyFormat(
                            payment_change,
                            true,
                            parameters.currency,
                            parameters.currencyAllowDecimal
                          )} */}
                        0
                      </Text>

                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            color: BLACK,
                            fontSize: 20,
                            alignSelf: "center"
                          }
                        ]}
                      >
                        {_terima_kasih[parameters.languageIndex]}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ExternalDisplay>
        )}
      </View>
    );
  } else {
    return <View />;
  }
}


export function DualMonitorOrderVersion2(state) {
  const [info, setInfo] = useState(getScreens());
  const [on, setOn] = useState(true);
  const [setMount] = useState(true);

  const [type] = useState(1);

  const parameters = state.state;
  const mount = parameters.mount;

  const dataBill = parameters.dataBill;

  let subTotal = 0;

  dataBill.map((v, i) => {
    const total = v.total !== "" ? v.total : 0;
    if (parameters.currencyAllowDecimal) {
      subTotal = subTotal + parseFloat(total);
    } else {
      subTotal = subTotal + parseInt(total);
    }

    //subTotal = subTotal + v.qty * v.salesTypeValue;
  });

  let total_services = 0;
  if (parameters.currencyAllowDecimal) {
    total_services = subTotal * parameters.services;
  } else {
    total_services = Math.round(subTotal * parameters.services);
  }
  let total_tax = 0;

  if (parameters.currencyAllowDecimal) {
    total_tax = subTotal * parameters.tax;
  } else {
    total_tax = Math.round(subTotal * parameters.tax);
  }

  if (parameters.withServices === false) {
    total_services = 0;
  }

  if (parameters.withTax === false) {
    total_tax = 0;
  }

  let grand_total = 0;
  grand_total = subTotal + total_services + total_tax;

  

  if (info[1]) {
    return (
      <View style={{ flex: 1 }}>
        {mount && (
          <ExternalDisplay
            mainScreenStyle={{
              flex: 1
            }}
            fallbackInMainScreen
            screen={on && Object.keys(info)[0]}
            onScreenConnect={setInfo}
            onScreenDisconnect={setInfo}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(parameters.colorIndex),
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "95%",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      {/* Logo Atas */}
                      <Image
                        style={{
                          width: 300,
                          height: 100,
                          borderRadius: 10,
                        }}
                        source={require("../Images/BPWHITE.png")}
                      />
                    </View>
                    <View style={{ flex: 3 }}>
                      {/* Logo Atas */}
                      <View
                        style={{
                          alignSelf: "flex-end",
                          borderBottomColor: WHITE,
                          borderBottomWidth: 0.75,
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              color: WHITE,
                              fontSize: 48,

                              //alignSelf: "center"
                            },
                          ]}
                        >
                          Tanpa struk, pembelian Anda GRATIS!
                        </Text>
                      </View>
                      <View style={{ alignSelf: "flex-end" }}>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              color: WHITE,
                              fontSize: 30,

                              //alignSelf: "center"
                            },
                          ]}
                        >
                          ASD ASD
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      //display: parameters.showPaymentSuccess ? "none" : "flex",

                      marginTop: -100,
                      flex: 1,
                      //backgroundColor: "#BCA",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        // width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        //marginTop: 25,
                        //backgroundColor:"#BCA"
                        //backgroundColor: "#BCA"
                      }}
                    >
                      <View
                        style={{
                          width: "98%",
                          alignSelf: "center",
                          marginLeft: 15,
                          marginRight: 15,
                          marginBottom: 15,
                          marginTop: 100,
                          borderColor: "#C4C4C4",
                          borderWidth: 1,
                          borderRadius: 5,
                          padding: 15,
                          flex: 4,
                          backgroundColor: "#F3F5F8", //6C1E5D
                          // justifyContent: "space-evenly",
                        }}
                      >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <View
                            style={{
                              flex: 1,
                              margin: 5,
                              backgroundColor: WHITE,
                              borderRadius: 10,
                              padding: 5
                            }}
                          >
                            {/* HEADER */}
                            <View
                              style={{
                                //flex: 1,
                                width: "100%",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                padding: 5
                              }}
                            >
                              <View
                                style={{
                                  flex: 5,
                                  alignSelf: "center"
                                }}
                              >
                                <Text
                                  style={[
                                    MainStyle.robotoNormalBold,
                                    {
                                      color: BLACK,
                                      fontSize: 14,
                                      
                                    },
                                  ]}
                                >
                                  Nama
                                </Text>
                              </View>

                              <View
                                style={{
                                  flex: 2,
                                  alignItems: "flex-end",
                                }}
                              >
                                <Text
                                  style={[
                                    MainStyle.robotoNormalBold,
                                    {
                                      color: BLACK,
                                      fontSize: 14,
                                    },
                                  ]}
                                >
                                  Qty
                                </Text>
                              </View>

                              <View
                                style={{
                                  flex: 3,
                                  alignItems: "flex-end",
                                }}
                              >
                                <Text
                                  style={[
                                    MainStyle.robotoNormalBold,
                                    {
                                      color: BLACK,
                                      fontSize: 14,
                                      //alignSelf: "center"
                                    },
                                  ]}
                                >
                                  Price
                                </Text>
                              </View>
                            </View>
                            <FlatList
                              //ListHeaderComponent={this.renderSearch()}
                              //inverted={true}
                              showsVerticalScrollIndicator={false}
                              data={dataBill}
                              // columnWrapperStyle={{
                              //   justifyContent: "space-between"
                              // }}
                              numColumns={1}
                              renderItem={({ item, index }) => {
                                let total = parameters.currencyAllowDecimal
                                  ? item.total
                                  : parseInt(item.total);

                                let product_name = [""];
                                product_name = divideLongWord(item.name, 25);

                                return (
                                  <View
                                    style={{
                                      //flex: 1,
                                      // borderBottomWidth: 0.5,
                                      // backgroundColor: MAIN_THEME_COLOR_SELECT(
                                      //   parameters.colorIndex
                                      // ),
                                      marginTop: 5,
                                      padding: 5,
                                    }}
                                  >
                                    <View
                                      style={{
                                        //flex: 1,
                                        width: "100%",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <View
                                        style={{
                                          flex: 5,
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <Text
                                          style={[
                                            MainStyle.robotoNormalBold,
                                            {
                                              color: BLACK,
                                              fontSize: 12,

                                              //alignSelf: "center"
                                            },
                                          ]}
                                        >
                                          {product_name[0]}
                                        </Text>
                                      </View>

                                      <View
                                        style={{
                                          flex: 2,
                                          alignItems: "flex-end",
                                        }}
                                      >
                                        <Text
                                          style={[
                                            MainStyle.robotoNormalBold,
                                            {
                                              color: BLACK,
                                              fontSize: 12,

                                              //alignSelf: "center"
                                            },
                                          ]}
                                        >
                                          {item.qty}
                                        </Text>
                                      </View>

                                      <View
                                        style={{
                                          flex: 3,
                                          alignItems: "flex-end",
                                        }}
                                      >
                                        <Text
                                          style={[
                                            MainStyle.robotoNormalBold,
                                            {
                                              color: BLACK,
                                              fontSize: 12,
                                              //alignSelf: "center"
                                            },
                                          ]}
                                        >
                                          {/* {parameters.currency}{" "} */}
                                          {/* {CurrencyFormat(total)} */}
                                          {CurrencyFormat(
                                            total,
                                            false,
                                            parameters.currency,
                                            parameters.currencyAllowDecimal
                                          )}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                );
                              }}
                              //ListFooterComponent={this._renderFooter}
                              keyExtractor={(item, index) => {
                                return "RenderBillSecondScreen" + index.toString();
                              }}
                              //onRefresh={this._onRefresh}
                              //onEndReached={this.handleLoadMore}
                              //onEndReachedThreshold={0.5}
                              //refreshing={refreshing}
                            />
                            <View style={{ width: "100%", alignSelf: "flex-end", marginBottom: 5, flexDirection: "row" }}>
                              <View style = {{flex: 1}}>
                              <Text
                                style={[
                                  MainStyle.robotoNormalBold,
                                  {
                                    color: BLACK,
                                    fontSize: 20,
                                    // alignSelf: "center",
                                  },
                                ]}
                              >
                                {_total[parameters.languageIndex]}
                              </Text>
                              </View>
                              <View style = {{flex: 1, alignItems: "flex-end"}}>
                                <Text
                                  style={[
                                    MainStyle.robotoNormalBold,
                                    {
                                      color: MAIN_THEME_COLOR_SELECT(parameters.colorIndex),
                                      fontSize: 24,
                                    },
                                  ]}
                                >
                                  {parameters.currency}{" "}
                                  {CurrencyFormat(
                                    grand_total,
                                    false,
                                    parameters.currency,
                                    parameters.currencyAllowDecimal
                                  )}
                                </Text>
                              </View>
                            
                            </View>
                          </View>
                          <View style={{ flex: 1, margin: 5 }}>
                            <View
                              style={{
                                flex: 2,
                                marginBottom: 5,
                                backgroundColor: "#6C1E5D",
                                borderRadius: 10,
                              }}
                            />
                            <View
                              style={{
                                flex: 1,
                                marginBottom: 5,
                                backgroundColor: "#6C1E5D",
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        </View>

                        {/* Grand Total end */}
                      </View>
                      {/* QR start */}
                      <View style={{ width: "100%", alignSelf: "center", flex: 1, display: "none" }}>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              color: BLACK,
                              fontSize: 20,
                              alignSelf: "center",
                              marginTop: 15,
                            },
                          ]}
                        >
                          {_total[parameters.languageIndex]}
                        </Text>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              color: MAIN_THEME_COLOR_SELECT(parameters.colorIndex),
                              fontSize: 24,
                              alignSelf: "center",
                            },
                          ]}
                        >
                          {/* {CurrencyFormat(
                                parameters.grandTotalRound,
                                true,
                                parameters.currency,
                                parameters.currencyAllowDecimal
                              )} */}
                          {parameters.currency}{" "}
                          {CurrencyFormat(
                            grand_total,
                            false,
                            parameters.currency,
                            parameters.currencyAllowDecimal
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      //display: parameters.showPaymentSuccess ? "flex" : "none",
                      display: "none",
                      marginTop: -100,
                      flex: 1,
                      //backgroundColor: "#BCA",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        //width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        //marginTop: 25,
                        //backgroundColor:"#BCA"
                        //backgroundColor: "#BCA"
                      }}
                    >
                      <View
                        style={{
                          width: "50%",
                          alignSelf: "center",
                          marginBottom: 15,
                          borderColor: "#C4C4C4",
                          borderBottomWidth: 1,
                          paddingBottom: 15,
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              color: BLACK,
                              fontSize: 20,
                              alignSelf: "center",
                            },
                          ]}
                        >
                          {_sudah_bayar[parameters.languageIndex]}
                        </Text>
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            {
                              color: BLACK,
                              fontSize: 20,
                              alignSelf: "center",
                              marginTop: 10,
                            },
                          ]}
                        >
                          {_paid_by[parameters.languageIndex]}
                        </Text>
                      </View>
                      {/*_change_amount */}
                      <View
                        style={{
                          width: "50%",
                          alignSelf: "center",
                          marginBottom: 15,
                          borderColor: "#C4C4C4",
                          borderBottomWidth: 1,
                          paddingBottom: 15,
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              color: BLACK,
                              fontSize: 20,
                              alignSelf: "center",
                            },
                          ]}
                        >
                          {_change_amount[parameters.languageIndex]}
                        </Text>

                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              color: MAIN_THEME_COLOR_SELECT(parameters.colorIndex),
                              fontSize: 20,
                              alignSelf: "center",
                            },
                          ]}
                        >
                          {/* {CurrencyFormat(
                                payment_change,
                                true,
                                parameters.currency,
                                parameters.currencyAllowDecimal
                              )} */}
                          0
                        </Text>

                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            {
                              color: BLACK,
                              fontSize: 20,
                              alignSelf: "center",
                            },
                          ]}
                        >
                          {_terima_kasih[parameters.languageIndex]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ExternalDisplay>
        )}
      </View>
    );
  } else {
    return <View />;
  }
}
