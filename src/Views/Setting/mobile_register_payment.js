/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  StatusBar,
  Button as ButtonDefault,
  FlatList,
  ImageDefault,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  BackHandler,
  //NetInfo
  LogBox,
  NativeModules
} from "react-native";
import RNFS from "react-native-fs";

// LogBox.ignoreAllLogs(true);
import Dropdown from "../../Components/MobileDropdown";

import NetInfo from "@react-native-community/netinfo";
import Checkbox from "../../Components/Checkbox";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// import GestureRecognizer from "react-native-swipe-gestures";

// import CLLoginHandler from "cashlezProduction2.0.3.7.2";
// import { StarPRNT } from "react-native-star-prnt";
import MainStyle from "../../Styles";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";
import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";
import { RNCamera } from "react-native-camera";

import PrinterFunctions from "../../Libraries/PrinterFunctions";

import StarPrintFunctions from "../../Libraries/StarPrintFunctions";

import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import TransactionNewName from "../../Components/TransactionNewName";

import Loading from "../../Components/MobileLoading";

import CustomAlert from "../../Components/MobileCustomAlert";
import FloatingTextInput from "../../Components/FloatingTextInput";
import TabBar from "../../Components/TabBar";
import { Actions } from "react-native-router-flux";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ClearCart from "../../Components/MobileClearCart";

import FontAwesome from "react-native-vector-icons/FontAwesome";
//import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Geolocation from "@react-native-community/geolocation";
// import Orientation from "react-native-orientation-locker";
// eslint-disable-next-line prettier/prettier
import CustomConfirmation from "../../Components/MobileCustomConfirmation";

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  MAIN_THEME_COLOR,
  MAIN_THEME_COLOR_SELECT,
  MAIN_TEXT_COLOR_SELECT,
  WHITE,
  BLACK,
  RED_500,
  GREY_100,
  GREY_900,
  GREY_700,
  MAIN_TEXT_COLOR_LIST
} from "../../Libraries/Colors";

import LoginFunctions from "../../Libraries/LoginFunctions";
import CashlezFunctions from "../../Libraries/CashlezFunctions";

import ColorFunctions from "../../Libraries/ColorFunctions";
import MenuFunctions from "../../Libraries/MenuFunctions";
import OfflineMenuFunctions from "../../Libraries/OfflineMenuFunctions";

//import Login from '../Account/login';

import {
  GetMenuFavAPI,
  GetCategoryMenuAPI,
  GetMenuByCategoryAPI,
  GetMenuAddonsAPI,
  SaveOrderAPI,
  UpdateOrderAPI,
  GetTableAPI,
  UpdateStatusOrderByIdAPI,
  GetMenuSearchFavAPI,
  GetMenuAllAPI,
  PayOrderAPI,
  BE_Get_Product,
  BE_Get_Product_Category,
  BE_URI,
  BE_Token,
  BE_TableManagement,
  BE_Update_Transaction,
  BE_Create_Transaction,
  BE_Outlet,
  BE_Sales_Type,
  BE_Save_Transaction, //SAVE Untuk Check In
  BE_Rekap,
  BE_Payment_Method,
  BE_Send_Struk,
  CashLezPaymentTypes,
  BE_Signature,
  BE_Business
} from "../../Constants";
import moment from "moment";

import {
  _cari,
  _alert_printer,
  _cancel,
  _next,
  _pilih,
  _qty_long,
  _qty_short,
  _catatan,
  _catatan_extra,
  _menu_favorit,
  _semua_menu,
  _product_status,
  _cetak_dapur,
  _clear_cart,
  _cetak_bill,
  _order,
  _nama,
  _meja,
  _data_pelanggan,
  _berhasil_update,
  _gagal,
  _berhasil_tambah,
  _error_1,
  _error_2,
  _menu_favorit_short,
  _menu_all_short,
  _pajak,
  _service,
  _lanjut,
  _keranjang,
  _pesanan_baru,
  _simpan,
  _kembali,
  _simpan_data,
  _simpan_pesanan,
  _harga_custom,
  _pelanggan,
  _transaction_id,
  _no_table,
  _cashier,
  _ubah_harga,
  _description,
  _product_barcode,
  _product_name,
  _product_price,
  _product_category,
  _product_image,
  _product_sku,
  _pilih_kategori,
  _tambah_produk,
  _take_photo,
  _upload_photo,
  _individual,
  _corporate,
  _register_payment_title,
  _choose_type,
  _choose_type_individual,
  _choose_type_corporate,
  _foto_ktp,
  _buku_tabungan,
  _selfie,
  _tempat_bisnis,
  _foto_npwp,
  _foto_akta,
  _foto_siup,
  _setuju,
  _delete_confirmation
} from "../../Libraries/DictionaryHome";
import DeviceInfo from "react-native-device-info";
import { _menu_8 } from "../../Libraries/DictionaryLogin";
import { _berhasil } from "../../Libraries/DictionaryAbsen";
import { _berhasil_delete, _no_data_3 } from "../../Libraries/DictionaryRekap";
import RegionFunctions from "../../Libraries/RegionFunctions";
import { WebView } from "react-native-webview";
import { _ok_alert } from "../../Libraries/DictionarySetting";

const {
  RNCashlezSdkModule,
  RNSunmiModule,
  CashlezAuthentication,
  CashlezPayment,
  CashlezPrint
} = NativeModules;

// import com.cashlez.android.sdk.CLPayment;
// import com.cashlez.android.sdk.CLPaymentCapability;
// import com.cashlez.android.sdk.bean.TransactionType;

// import { CLPayment } from "cashlezProduction2.0.3.7.2";

const flashModeOrder = {
  off: "torch",
  torch: "off"
};

const wbOrder = {
  auto: "sunny",
  sunny: "cloudy",
  cloudy: "shadow",
  shadow: "fluorescent",
  fluorescent: "incandescent",
  incandescent: "auto"
};

export default class MobileRegisterPayment extends Component {
  constructor(props) {
    super(props);
    this.arrLoc = [];
    this.state = {
      
      showWebView: true,
      CZUri: "https://link.cashlez.com/czlink/GR23271TEST-BEETPOS-08",
      loading: true,
      formItem: false,
      showCamera: false,
      uploadPhoto: false,
      checkAgree: false,
      showBill: false,
      scanType: 1,
      tablet: DeviceInfo.isTablet(),
      printer_busy: false,
      starPrinterList: null,
      selectedStarPrinter: null,

      showCustomConfirmation: false,

      showAlert: false,
      alertMessage: [],

      show_order_id: false,
      footer_printer: "",
      customer_id: 0,
      booking_id: 0,
      phone: "",
      order_id: null,
      formAction: "add",
      formType: 1,

      showNameForm: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      selectedProduct: { id: 0, name: "" },
      selectedQuantity: 1,
      selectedCatatan: "",

      language: "",
      ready: true,
      number: 1,
      currentLoc: null,
      refreshing: false,
      searchKey: "",
      selected: -1,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      currency: "IDR",

      subTotal: 0,
      selectedTable: this.props.selected_table
        ? this.props.selected_table
        : { id: 1, name: "Meja 1" },
      showAdditionalSalesType: false,
      selectedSalesType: this.props.sales_type
        ? this.props.sales_type
        : "Take-Away",
      showAdditionalTable: false,
      showNew: false,
      additionalSalesType: [
        {
          id: "Take-Away",
          name: "Take-Away"
        },
        {
          id: "Dine-In",
          name: "Dine-In"
        },
        {
          id: "Gojek/Grab",
          name: "Gojek/Grab"
        }
      ],
      additionalTable: [],
      dataBill: [],
      printer_kitchen: null,
      printer_main: null,

      action: "0",
      lastUpdate: moment(new Date()).format("2000-MM-DD HH:mm:ss"),
      timeCompare: moment(new Date()).format("YYYY-MM-DD 07:07:07"),
      import_cooldown: 300,
      auth: this.props.auth ? this.props.auth : "",
      services: 0,
      tax: 0,

      //Access

      access_cashier_transaction: false,
      access_cash_recap: false,
      access_change_product_price: false,
      access_cancelling_transaction: false,
      access_changing_transaction: false,
      access_giving_discount: false,
      access_reprint_receipt: false,
      access_reprint_kitchen_ticket: false,
      access_print_bill: false,
      access_view_history_transaction: false,
      access_customer_management: false,
      showStock: this.props.showStock ? this.props.showStock : false,

      //productPrice: 25000,
      productId: "",
      productName: "",
      productDescription: "",
      productPrice: 0,
      productCategoryId: "",
      productTaxId: 1,
      productTypeId: 2,
      productStatus: "active",
      productImage: "", //Upload?,
      productSKU: "",
      productBarcode: "",
      product_is_favorite: 0,
      productStock: 0,
      //camera
      flash: "off",
      //showCamera: false,
      zoom: 0,
      autoFocus: "on",
      depth: 0,
      type: "back",
      //type: "front",

      whiteBalance: "auto",
      // ratio: "16:9",
      ratio: "4:3",
      recordOptions: {
        mute: false,
        maxDuration: 5,
        quality: RNCamera.Constants.VideoQuality["288p"]
      },

      isRecording: false,
      canDetectFaces: false,
      canDetectText: false,
      canDetectBarcode: true,

      faces: [],
      textBlocks: [],
      barcodes: [],
      currencyAllowDecimal: false,

      //
      imageKTP: null,
      imageBukuTabungan: null,
      imageSelfie: null,
      imageTempatBisnis: null,

      imageSIUP: null,
      imageNPWP: null,
      imageAkta: null,

      cz_pin: null,
      cz_user: null

      //Cashlez States
    };
  }

  testBayar() {
    // user                   : test01
    // PIN                    : 111111
    // entity id.             : 23271
    // vendor identifier : CZ00TEST001

    let uri = "https://api-link.cashlez.com/generate_url_vendor";

    let uri_signature = BE_Signature;

    console.log(" uri_signature ", uri_signature);

    let body = {
      data: {
        request: {
          vendorIdentifier: "CZ00TEST001",
          token: "",
          referenceId: "TEST-BEETPOS-08",
          entityId: "23271",
          merchantName: "Merchant",
          merchantDescription: "Jl. Letjen. S. Parman No.28",
          currencyCode: "IDR",
          amount: 1,
          callbackSuccess: "",
          callbackFailure: "",
          message: "",
          description: "Transaction From API",
          transactionUsername: "test01"
        }
      }
    };

    //console.log("body.data ===> ",  JSON.stringify(body))

    fetch(uri_signature, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.statusCode === 200) {
          // console.log("uri_signature() ", responseJson.data[0].result);
          body.signature = responseJson.data[0].result;
          console.log("body => ", body);

          fetch(uri, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          })
            .then(response2 => response2.json())
            .then(responseJson2 => {
              console.log("responseJson2 => ", responseJson2);
            });
        }
      })
      .catch(_err => {
        //console.log("ERR Check Token ==> ", _err);
      });

    // fetch(uri, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",

    //   },
    //   body: JSON.stringify(body)
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log("testBayar() ", responseJson);

    //   })
    //   .catch(_err => {
    //     //console.log("ERR Check Token ==> ", _err);
    //   });
  }

  async InitializeShopee() {
    CashlezFunctions.InitializeShopee(v => {
      // console.log("Call Back InitializeShopee ===> ", v);
      CashlezFunctions.StartShopee();
    });

    CashlezFunctions.InitializeOvo(v => {
      // console.log("Call Back InitializeOvo ===> ", v);
      //CashlezFunctions.StartShopee();
    });
  }

  async TestingPrint() {
    CashlezPrint.printText("Test 123")
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        console.log("response printText => ", responseinitialize);
      })
      .catch(err => {
        console.log("error catch printText:", err);
        // fetching = false;
        // // Choose one, depends what you need.
        // return false; // If you want to ignore the error and do something in a chained .then()
        // return Promise.reject(err); // If you want to handle the error in a chained .catch()
      });
  }

  async InitializeCashlezPrinter() {
    CashlezPrint.initialize()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        console.log("response initialize print => ", responseinitialize);
        this.RegisterPrinter();
      })
      .catch(err => {
        console.log("error catch initialize print:", err);
        // fetching = false;
        // // Choose one, depends what you need.
        // return false; // If you want to ignore the error and do something in a chained .then()
        // return Promise.reject(err); // If you want to handle the error in a chained .catch()
      });
  }

  async RegisterPrinter() {
    CashlezPrint.registerPrinter();
  }

  async ConnectPrinter() {
    this.InitializeCashlez("printer");
  }

  async PaymentStartLocationListener() {
    CashlezFunctions.PaymentStartLocationListener();
    setTimeout(() => {
      this.PaymentCheckReader();
    }, 1000);
  }

  CashlezStopServices() {
    CashlezPayment.stopLocationListener();
    CashlezPayment.stopPayment();
    CashlezPayment.unregisterReader();
  }

  async PaymentProceedPayment() {
    CashlezFunctions.PaymentDebitCard(
      "BEET_TEST_011",
      "101",
      "description",
      v => {
        console.log("Call Back PaymentDebitCard ===> ", v);
        if (v.code === 200) {
          setTimeout(() => {
            CashlezFunctions.PrintLastPayment();
          }, 7000);
        }
      }
    );
  }

  async ShopeePayment() {
    CashlezFunctions.ShopeePayment(
      "BEET_TEST_SP_001",
      "100",
      "description",
      v => {
        console.log("Call Back ShopeePayment ===> ", v);
      }
    );
  }

  async OvoPayment() {
    CashlezFunctions.OvoPayment(
      "BEET_TEST_OVO_001",
      "100",
      "description",
      "+6287886038357",
      v => {
        console.log("Call Back OvoPayment ===> ", v);
      }
    );
  }

  async PaymentProceedPaymentCreditCard() {
    CashlezFunctions.PaymentCreditCard(
      "BEET_TEST_CR_001",
      "100",
      "description",
      v => {
        console.log("Call Back PaymentCreditCard ===> ", v);
      }
    );
  }

  async PaymentCheckReader() {
    CashlezFunctions.PaymentCheckReader(v => {
      console.log("Call Back PaymentCheckReader ===> ", v);
      //"Reader connected. ==> berhasil"
    });
  }

  // async InitializeCashlez(type) {
  //   CashlezAuthentication.initialize()
  //     .then(responseinitialize => Promise.all([responseinitialize]))
  //     .then(([responseinitialize]) => {
  //       console.log("responseinitialize => ", responseinitialize);
  //       this.LoginCashlez(type);
  //     })
  //     .catch(err => {
  //       console.log("error catch initialize:", err);
  //       // fetching = false;
  //       // // Choose one, depends what you need.
  //       // return false; // If you want to ignore the error and do something in a chained .then()
  //       // return Promise.reject(err); // If you want to handle the error in a chained .catch()
  //     });
  // }

  async InitializeCashlez(type) {
    CashlezFunctions.InitializeCashlez(v => {
      // console.log("Call Back InitializeCashlez ===> ", v);
      this.LoginCashlez(type);
    });
  }

  // async LoginCashlez(type) {
  //   CashlezAuthentication.login("test01", "111111")
  //     .then(responselogin => Promise.all([responselogin]))
  //     .then(([responselogin]) => {
  //       console.log("response login => ", responselogin);
  //       if (type === "payment") {
  //         this.InitializeCashlezPayment();
  //       } else {
  //         this.InitializeCashlezPrinter();
  //       }
  //       //this.PrinterFunction();
  //     })
  //     .catch(err => {
  //       console.log("error catch login:", err);
  //       // fetching = false;
  //       // // Choose one, depends what you need.
  //       // return false; // If you want to ignore the error and do something in a chained .then()
  //       // return Promise.reject(err); // If you want to handle the error in a chained .catch()
  //     });
  // }

  async LoginCashlez(type) {
    CashlezFunctions.LoginCashlez("lifetech", "123457", v => {
      console.log("Call Back LoginCashlez ===> ", v);
      if (type === "payment") {
        this.InitializeCashlezPayment();
      } else {
        this.InitializeCashlezPrinter();
      }
    });
  }

  async InitializeCashlezPayment() {
    CashlezFunctions.InitializeCashlezPayment(v => {
      // console.log("Call Back InitializeCashlezPayment ===> ", v);
      this.PaymentStartLocationListener();
    });
  }

  testFunction() {
    this.InitializeCashlez("payment");
  }

  testFunction2() {
    // this.ReInitializeCashlezPayment("payment");
    //this.PaymentCheckReader();
    this.InitializeCashlezPayment();
  }

  async ReInitializeCashlezPayment(type) {
    CashlezFunctions.ReInitializeCashlez(v => {
      // console.log("Call Back InitializeCashlez ===> ", v);
      this.LoginCashlez(type);
    });
  }

  stopReader() {
    //CashlezFunctions.PaymentStopLocationListener();

    CashlezFunctions.PaymentStopLocationListener(val => {
      console.log("Call Back logout ===> ", val);

      if (val) {
        //this.setState({ languageIndex: val });
      }
    });
    // setTimeout(() => {
    //   this.PaymentCheckReader();
    // }, 5000);
  }

  startPayment() {
    CashlezFunctions.PaymentStartPayment();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

    //this.getBusinessData();

    //const test = CLPayment;

    //const test2 = ICLLoginHandler;

    //console.log("TEST NativeModules", NativeModules);
    // console.log("TEST CashlezAuthentication", CashlezAuthentication);
    //console.log("TEST NativeModules", NativeModules);

    //console.log("TEST RNCashlezSdkModule", RNCashlezSdkModule);

    //   RNSunmiModule.initState(v => {
    //     console.log("RNSunmiModule INIT STATE ===> ", v);
    //   });

    //   setTimeout(() => {
    //   RNSunmiModule.connectPayService(v => {
    //     console.log("connectPayService ===> ", v);
    //     setTimeout(() => {
    //     RNSunmiModule.getSystemParameters_v2(x => {
    //       console.log("getSystemParameters_v2 ===> ", x);
    //     });
    //   }, 2000);

    //   });
    // }, 6000);

    // RNSunmiModule.ledOff(1, 1, v => {
    //   console.log("ledOff ===> ", v);
    // });

    // RNSunmiModule.getSystemParameters(x => {
    //   console.log("getSystemParameters ===> ", x);
    // });

    // RNSunmiModule.ledOn(1, 1, v => {
    //   console.log("ledOn ===> ", v);
    // });
    // setTimeout(() => {RNSunmiModule.checkCard(v => {
    //   console.log("RNSunmiModule checkCard ===> ", v);
    // });}, 2500)

    // RNCashlezSdkModule.initState(v => {
    //   console.log("INIT STATE ===> ", v);
    // });

    // RNCashlezSdkModule.Authenticate(
    //   "test01",
    //   "111111",
    //   v => {
    //     console.log("Auth success ===> ", v);
    //   },
    //   x => {
    //     console.log("Auth failed ===> ", x);
    //   }
    // );

    // // RNCashlezSdkModule.TestFunction_3(v => {console.log("TestFunction_3 success ===> ", v)}, x => {console.log("TestFunction_3 failed ===> ", x)});
    // // this.TestPrinter();

    // setTimeout(() => {
    //   console.log("TEST RNCashlezSdkModule doCheckReaderCompanion");

    //   RNCashlezSdkModule.doCheckReaderCompanion(
    //     v => {
    //       console.log("doCheckReaderCompanion success ===> ", v);
    //     },
    //     x => {
    //       console.log("doCheckReaderCompanion failed ===> ", x);
    //     }
    //   );
    // }, 1500);

    // setTimeout(() => {
    //   console.log("TEST doCheckPrinterCompanion doCheckPrinterCompanion");

    //   RNCashlezSdkModule.doCheckPrinterCompanion(
    //     v => {
    //       console.log("doCheckPrinterCompanion success ===> ", v);
    //     },
    //     x => {
    //       console.log("doCheckPrinterCompanion failed ===> ", x);
    //     }
    //   );
    // }, 1500);

    // setTimeout(() => {
    //   console.log("TEST doPayLocalNoPin");

    //   RNCashlezSdkModule.doPayLocalNoPin(
    //     v => {
    //       console.log("doPayLocalNoPin success ===> ", v);
    //     },
    //     x => {
    //       console.log("doPayLocalNoPin failed ===> ", x);
    //     }
    //   );
    // }, 5000);

    // setTimeout(() => {
    //   console.log("TEST doPayInternationalCard");

    //   RNCashlezSdkModule.doPayInternationalCard(
    //     v => {
    //       console.log("doPayInternationalCard success ===> ", v);
    //     },
    //     x => {
    //       console.log("doPayInternationalCard failed ===> ", x);
    //     }
    //   );
    // }, 5000);

    // setTimeout(() => {
    //   console.log("TEST doPayLocalPin");

    //   RNCashlezSdkModule.doPayLocalPin(
    //     v => {
    //       console.log("doPayLocalPin success ===> ", v);
    //     },
    //     x => {
    //       console.log("doPayLocalPin failed ===> ", x);
    //     }
    //   );
    // }, 5000);

    // setTimeout(() => {
    //   console.log("TEST TestFunction_CardMock");

    //   RNCashlezSdkModule.TestFunction_CardMock(
    //     v => {
    //       console.log("TestFunction_CardMock success ===> ", v);
    //     },
    //     x => {
    //       console.log("TestFunction_CardMock failed ===> ", x);
    //     }
    //   );
    // }, 5000);

    // setTimeout(() => {
    //   console.log("TEST TestFunction_CardMock");

    //   RNCashlezSdkModule.TestFunction_Print(
    //     v => {
    //       console.log("TestFunction_Print success ===> ", v);
    //     },
    //     x => {
    //       console.log("TestFunction_Print failed ===> ", x);
    //     }
    //   );
    // }, 5000);

    // RNCashlezSdkModule.TestFunction_CardMock(v => {console.log("TestFunction_cardmock success ===> ", v)}, x => {console.log("TestFunction_cardmock failed ===> ", x)});

    //this.InitializeCashlez();

    // CashlezAuthentication.login("test01", "111111", () => {});

    // user                   : test01
    // PIN                    : 111111
    // entity id.             : 23271
    // vendor identifier : CZ00TEST001

    // const coordinate = RNCGeolocation.getCurrentPosition()

    // console.log("TEST coordinate", coordinate);

    // NativeModules.ZapparModule.startZappar( JSON.stringify(options) )

    RegionFunctions.GetAllowDecimal(val => {
      if (val) {
        this.setState({ currencyAllowDecimal: val });
      }
    });

    PrinterFunctions.GetShowStock(val => {
      if (val) {
        //console.log("Show Stock ==> ", val);
        this.setState({ showStock: val });
      }
    });

    LoginFunctions.AuthToken(val => {
      //console.log("auth token ==> ", val);
      this.setState({
        auth: val
      });
    });

    LoginFunctions.LoginInformation(val => {
      //console.log("login info ==> ", val);
      this.setState({
        userInfo: val
      });
    });
    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    let temp_save_order = [];
    this.setPreviliges();
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({ loading: false });
      } else {
        //offline Mode
        //console.log("offline Mode");
        //this.getDataOfflineMode();
      }
    });

    this.getPrinterData();
  }

  uploadPicture = type => {
    let options = {
      mediaType: "photo",
      maxWidth: 768,
      maxHeight: 768,
      quality: 1,
      saveToPhotos: false
      //cameraType: "back"
    };

    // if (type === 3)
    // {
    //   options.cameraType = "front"
    // }

    // 1  = ktp

    // 2 = buku tabungan

    // 3 = selfie

    // 4= tempat bisnis

    // 5= SIUP 6 = NPWP 7 = Akta

    launchImageLibrary(options, response => {
      console.log("Response ImagePicker ==> ", response);
      let source = response;
      // this.setState({
      //   filePath: source,
      //   image: source.uri
      // });

      if (type === 1) {
        this.setState({
          filePath: source,
          imageKTP: source.uri
        });
      }

      if (type === 2) {
        this.setState({
          filePath: source,
          imageBukuTabungan: source.uri
        });
      }

      if (type === 3) {
        this.setState({
          filePath: source,
          imageSelfie: source.uri
        });
      }

      if (type === 4) {
        this.setState({
          filePath: source,
          imageTempatBisnis: source.uri
        });
      }

      if (type === 5) {
        this.setState({
          filePath: source,
          imageSIUP: source.uri
        });
      }

      if (type === 6) {
        this.setState({
          filePath: source,
          imageNPWP: source.uri
        });
      }

      if (type === 7) {
        this.setState({
          filePath: source,
          imageAkta: source.uri
        });
      }
    });
  };

  takePicture = type => {
    // var options = {
    //   //title: "Select Image",
    //   // customButtons: [
    //   //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    //   // ],
    //   // storageOptions: {
    //   //   skipBackup: true,
    //   //   path: "images"
    //   // },
    //   maxWidth: 384,
    //   maxHeight: 768,
    //   mediaType: "photo",
    //   quality: 0.5,
    //   saveToPhotos: false
    //};

    let options = {
      //title: "Select Image",
      // customButtons: [
      //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      // ],
      // storageOptions: {
      //   skipBackup: true,
      //   path: "images"
      // },
      mediaType: "photo",
      maxWidth: 768,
      maxHeight: 768,
      quality: 1,
      saveToPhotos: false,
      cameraType: "back"
    };

    if (type === 3) {
      options.cameraType = "front";
    }

    launchCamera(options, response => {
      console.log("Response ImagePicker ==> ", response);
      let source = response;
      // this.setState({
      //   filePath: source,
      //   image: source.uri
      // });

      if (type === 1) {
        this.setState({
          filePath: source,
          imageKTP: source.uri
        });
      }

      if (type === 2) {
        this.setState({
          filePath: source,
          imageBukuTabungan: source.uri
        });
      }

      if (type === 3) {
        this.setState({
          filePath: source,
          imageSelfie: source.uri
        });
      }

      if (type === 4) {
        this.setState({
          filePath: source,
          imageTempatBisnis: source.uri
        });
      }

      if (type === 5) {
        this.setState({
          filePath: source,
          imageSIUP: source.uri
        });
      }

      if (type === 6) {
        this.setState({
          filePath: source,
          imageNPWP: source.uri
        });
      }

      if (type === 7) {
        this.setState({
          filePath: source,
          imageAkta: source.uri
        });
      }
    });
  };

  getBusinessData(val = this.state.auth) {
    const uri = BE_Business + this.state.userInfo.retail_id;
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: val
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("responseJson getBusinessData ===> ", responseJson);

        PrinterFunctions.SaveBusinessData(responseJson.data, result => {});

        this.setState({
          cz_pin: responseJson.data.cz_pin,
          cz_user: responseJson.data.cz_user
        });
        // setTimeout(() => {
        //   this.checkBluetooth();
        // }, 500);

        if (responseJson.statusCode === 200) {
          const image_uri = BE_URI + responseJson.data.image;
          const currency = responseJson.Currency
            ? responseJson.Currency.name
            : "Rp.";
          //console.log("SAVE image_uri ===> ", image_uri);

          // PrinterFunctions.GetImageURI(val => {
          //   if (val !== image_uri) {
          //     PrinterFunctions.SaveImageURI(image_uri, result => {});
          //     this.convertImageBase64(image_uri);
          //   }
          // });

          RegionFunctions.ChangeCurrency(currency, val => {});
        }
      })
      .catch(_err => {
        //console.log("ERR Check Token ==> ", _err);
      });
  }

  setPreviliges() {
    const { userInfo } = this.state;
    let privileges = userInfo.privileges;

    //console.log("privileges ===> ", privileges);

    this.setState({ business_type: userInfo.business_type });

    privileges.map((v, i) => {
      if (
        v.name === "cashier_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_cashier_transaction: true });
      }

      if (
        v.name === "cash_recap" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_cash_recap: true });
      }

      if (
        v.name === "change_product_price" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_change_product_price: true });
      }

      if (
        v.name === "cancelling_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_cancelling_transaction: true });
      }

      if (
        v.name === "changing_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_changing_transaction: true });
      }

      if (
        v.name === "delete_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_changing_transaction: true });
      }

      if (
        v.name === "giving_discount" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_giving_discount: true });
      }

      if (
        v.name === "print_bill" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_print_bill: true });
      }

      if (
        v.name === "reprint_receipt" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_reprint_receipt: true });
      }

      if (
        v.name === "reprint_kitchen_ticket" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_reprint_kitchen_ticket: true });
      }

      if (
        v.name === "view_history_transaction" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_view_history_transaction: true });
      }

      if (
        v.name === "customer_management" &&
        v.allow === true &&
        v.access === "Cashier"
      ) {
        this.setState({ access_customer_management: true });
      }
    });

    this.setState({ privileges: privileges });
  }

  getOutletData() {
    let outlet_id = this.state.userInfo.gerai_id;

    const uri = BE_Outlet + outlet_id;

    //console.log("GET DATA OUTLET");
    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("DATA OUTLET ==> ", responseJson);

        //console.log("DATA OUTLET ==> ", responseJson.Outlet_Taxes);

        let data_tax = [];

        let tax = 0;
        let services = 0;
        data_tax = responseJson.data.Outlet_Taxes;

        let phone = "";

        if (responseJson.data.phone_number) {
          phone = responseJson.data.phone_number;
        }
        //console.log("DATA TAX ==> ", data_tax);

        data_tax.map((v, i) => {
          //console.log("map ", v.Tax);
          const item = v.Tax;
          const value = item.value / 100;
          const tax_type = item.Tax_Type.name;

          if (tax_type === "Tax") {
            tax = value;
          }

          if (tax_type === "Charge") {
            services = value;
          }
        });

        //console.log("save tax rate ===> ", tax);
        //console.log("save serv rate ===> ", services);

        OfflineMenuFunctions.SaveTaxRate(tax, val => {});
        OfflineMenuFunctions.SavePhoneNumber(phone, val => {});
        OfflineMenuFunctions.SaveServiceRate(services, val => {});

        // console.log("tax ", tax);
        // console.log("services ", services);

        this.setState({ tax: tax, services: services, phone: phone });
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  onBackPress = () => {
    //Actions.pop();
    //this.props.onBackPress();

    Actions.pop();

    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  componentDidUpdate(nextProps) {
    //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);
    if (this.props !== nextProps) {
      //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);

      PrinterFunctions.GetShowStock(val => {
        if (val) {
          console.log("Show Stock ==> ", val);
          this.setState({ showStock: val });
        }
      });

      PrinterFunctions.GetLanguage(val => {
        if (val !== null) {
          this.setState({ languageIndex: val });
        }
      });

      LoginFunctions.AuthToken(val => {
        console.log("auth token ==> ", val);
        this.setState({
          auth: val
        });
      });

      LoginFunctions.LoginInformation(val => {
        //console.log("login info ==> ", val);
        this.setState({
          userInfo: val
        });
      });
      ColorFunctions.GetColor(val => {
        if (val && this.state.colorIndex !== val) {
          this.setState({ colorIndex: val });
        }
      });

      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          //this.getSalesType();
          //this.getAddonsByMenu(1);
          //this.getDataTable();
          //this.saveOfflineData();
          // OfflineMenuFunctions.GetLastUpdate(val => {
          //   //console.log("Last Update ==> ", val);
          //   //this.setState({ lastUpdate: val });
          //   let time = null;
          //   if (val) {
          //     this.importData(val);
          //   } else {
          //     this.importData();
          //   }
          // });
        } else {
          //offline Mode
          //console.log("offline Mode");
          //this.getDataOfflineMode();
        }
      });

      this.getPrinterData();
    }
  }

  idrNumToStr(num, iscurr) {
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

    if (!this.state.currencyAllowDecimal) {
      comma_add = "";
    }

    let curr = "";
    if (typeof iscurr !== "undefined" && iscurr === true) {
      curr = this.state.currency + " ";
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

  async getPrinterData() {
    PrinterFunctions.GetKitchenPrinter(val => {
      if (val) {
        //console.log("Printer Kitchen Index ==> ", val);
        this.setState({ printer_kitchen: val });
        //this.connect(val.address);
      }
    });

    PrinterFunctions.GetPrintType(val => {
      if (val) {
        //console.log("GetPrintType ==> ", val);
        this.setState({ printType: val });
      }
    });

    PrinterFunctions.GetMainPrinter(val => {
      if (val) {
        //console.log("Main Kitchen Index ==> ", val);
        this.setState({ printer_main: val });
      } else {
        //alert(_alert_printer[this.state.languageIndex]);
        // Actions.Setting({
        //   userInfo: this.state.userInfo,
        //   colorIndex: this.state.colorIndex
        // });
      }
    });

    PrinterFunctions.GetFooterPrinter(val => {
      if (val) {
        console.log("Footer Printer ==> ", val);
        this.setState({ footer_printer: val });
      }
    });

    PrinterFunctions.GetShowOrderIDPrinter(val => {
      if (val) {
        console.log("Show Order Id Printer ==> ", val);
        this.setState({ show_order_id: val });
      }
    });
  }

  saveNewProduct() {
    const uri = BE_Get_Product;
    const outlet_id = this.state.userInfo.gerai_id;

    let formdata = new FormData();
    // formdata.append("clockInImage", this.state.cameraUri);

    if (this.state.image) {
      formdata.append("productImage", {
        uri: this.state.image,
        type: "image/jpeg", // or photo.type
        name: this.state.image
      });
    }
    formdata.append("outlet_id", parseInt(outlet_id));
    formdata.append(
      "product_category_id",
      parseInt(this.state.productCategoryId)
    );
    formdata.append("product_type_id", parseInt(this.state.productTypeId));
    formdata.append("product_tax_id", parseInt(this.state.productTaxId));
    if (this.state.currencyAllowDecimal) {
      formdata.append("price", parseFloat(this.state.productPrice));
    } else {
      formdata.append("price", parseFloat(this.state.productPrice));
    }

    if (this.state.productStock !== "" && this.state.productStock >= 0) {
      formdata.append("stock", this.state.productStock);
      formdata.append("has_stock", 1);
    } else {
      formdata.append("stock", 0);
      formdata.append("has_stock", 1);
    }

    formdata.append("has_raw_material", 0);
    formdata.append("has_recipe", 0);

    formdata.append("name", this.state.productName);

    if (this.state.productDescription !== "") {
      formdata.append("description", this.state.productDescription);
    }
    if (this.state.productBarcode !== "") {
      formdata.append("barcode", this.state.productBarcode);
    }
    if (this.state.productSKU !== "") {
      formdata.append("sku", this.state.productSKU);
    }
    formdata.append("is_favorite", this.state.product_is_favorite);

    formdata.append("status", this.state.productStatus);

    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: formdata
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("Add Result ==> ", result);
        let message = [];
        //message.push(result.message);

        if (result.statusCode === 201) {
          message.push(_berhasil_tambah[this.state.languageIndex]);

          this.setState({
            loading: false,
            showAlert: true,
            alertMessage: message
          });
          this.setState({ formItem: false });
          this.getData();
        } else {
          message.push(_gagal[this.state.languageIndex]);
          this.setState({
            loading: false,
            showAlert: true,
            alertMessage: message
          });
        }

        //alert(result.message);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  editProduct() {
    const uri = BE_Get_Product + "/" + this.state.productId;
    const outlet_id = this.state.userInfo.gerai_id;

    let formdata = new FormData();
    // formdata.append("clockInImage", this.state.cameraUri);

    if (this.state.image) {
      formdata.append("productImage", {
        uri: this.state.image,
        type: "image/jpeg", // or photo.type
        name: this.state.image
      });
    }

    formdata.append("outlet_id", parseInt(outlet_id));
    formdata.append(
      "product_category_id",
      parseInt(this.state.productCategoryId)
    );
    formdata.append("product_type_id", parseInt(this.state.productTypeId));
    formdata.append("product_tax_id", parseInt(this.state.productTaxId));

    if (this.state.currencyAllowDecimal) {
      formdata.append("price", parseFloat(this.state.productPrice));
    } else {
      formdata.append("price", parseFloat(this.state.productPrice));
    }

    //formdata.append("price", parseInt(this.state.productPrice));

    let stock = 0;

    //stock = this.state.productStock !== "" ? this.state.productStock : 0

    //stock = this.state.productStock < 0 ? this.state.productStock : 0

    if (this.state.productStock !== "" && this.state.productStock >= 0) {
      formdata.append("stock", this.state.productStock);
    } else {
      formdata.append("stock", 0);
    }

    formdata.append("has_stock", 1);

    formdata.append("name", this.state.productName);
    if (this.state.productDescription !== "") {
      formdata.append("description", this.state.productDescription);
    }

    if (this.state.productBarcode !== "") {
      formdata.append("barcode", this.state.productBarcode);
    }
    if (this.state.productSKU !== "") {
      formdata.append("sku", this.state.productSKU);
    }

    formdata.append("is_favorite", this.state.product_is_favorite);

    formdata.append("status", this.state.productStatus);

    console.log("FORM DATA edit ===> ", formdata);

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: this.state.auth
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: formdata
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        console.log("edit Result ==> ", result);
        let message = [];
        //message.push(result.message);

        if (result.statusCode === 200) {
          message.push(_berhasil[this.state.languageIndex]);

          this.setState({
            loading: false,
            showAlert: true,
            alertMessage: message
          });
          this.setState({ formItem: false });
          this.getData();
        } else {
          message.push(_gagal[this.state.languageIndex]);
          this.setState({
            loading: false,
            showAlert: true,
            alertMessage: message
          });
        }

        //alert(result.message);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getCurrentLocation2() {
    Geolocation.getCurrentPosition(data => {
      let coords = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      };
      //console.log('Location Coords ==> ', coords);
      this.setState({ currentLoc: coords, ready: true });
    });
  }

  getCurrentLocation() {
    //untuk emulator
    let coords = {
      latitude: -6.1402746,
      longitude: 106.8520526
    };
    this.setState({ currentLoc: coords, ready: true });
  }

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        //this._getPaketPromo();
        //console.log("Refreshing");
        this.setState({
          refreshing: false
        });
      }
    );
  };

  _renderFooter() {
    return <View style={{ height: 50 }} />;
  }

  handleLoadMore() {}

  logoutAction() {
    //this.setState({ userInfo: null });
    LoginFunctions.Logout(val => {});
    Actions.pop();
    Actions.pop();
    Actions.pop();

    Actions.MobileLogin({
      userInfo: null,
      colorIndex: this.state.colorIndex,
      languageIndex: this.state.languageIndex
    });
  }

  showCamera(type) {
    this.setState({ showCamera: true, scanType: type });
  }

  renderFormItem() {
    const { formItem, showCamera } = this.state;

    let title = this.state.selectedProduct.name
      ? this.state.selectedProduct.name
      : _tambah_produk[this.state.languageIndex];

    const outlet_id = this.state.userInfo.gerai_id;

    if (!showCamera) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.formItem}
          onRequestClose={() => {
            if (this.state.formAction === "edit") {
              this.setState({ formItem: false, showBill: true });
            } else {
              this.setState({ formItem: false });
            }
          }}
        >
          {this.state.loading ? <Loading /> : <View />}
          <View
            style={{
              flex: 1,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              marginTop: 0,
              backgroundColor: WHITE
            }}
          >
            <MobileHeader
              bgColor={"transparent"}
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              title={_register_payment_title[this.state.languageIndex]}
              notif={false}
              loginInformation={this.state.userInfo}
              menu={false}
              back={true}
              backAction={() => {
                if (this.state.formAction === "edit") {
                  this.setState({ formItem: false, showBill: true });
                } else {
                  this.setState({ formItem: false });
                }
              }}
              //harga={harga}
              hideLogin={true}
            />
            <View
              style={{
                flex: 1,
                width: this.state.tablet ? "75%" : "100%",
                // marginTop: 20,
                // marginBottom: 20,
                // marginLeft: 20,
                // marginRight: 20,
                flexDirection: "column",
                alignSelf: "center"
              }}
            >
              {/* Header Form */}
              {/* Kotak Form */}
              <View
                style={{
                  flex: 1,

                  marginTop: 20,
                  width: "100%",
                  borderRadius: 5
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 15,
                      color: BLACK,
                      marginLeft: 15,
                      marginRight: 15
                    }
                  ]}
                >
                  {this.state.formType === 0
                    ? _choose_type_individual[this.state.languageIndex]
                    : _choose_type_corporate[this.state.languageIndex]}
                </Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={{ marginTop: 0, padding: 0 }}>
                    <View
                      style={{
                        //flexDirection: "row",
                        backgroundColor: "#99999",
                        flex: 1,
                        width: "100%",
                        minHeight: 100,
                        justifyContent: "space-between"
                      }}
                    >
                      <View
                        style={{
                          margin: 15,
                          marginBottom: 0,
                          marginTop: 15,
                          display: this.state.formType === 1 ? "flex" : "none"
                        }}
                      >
                        <View>
                          <Text
                            style={[
                              MainStyle.dmSansBold,
                              {
                                fontSize: 14,
                                color: BLACK,
                                marginBottom: 5
                              }
                            ]}
                          >
                            {_foto_siup[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                            height: 150,
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                          }}
                        >
                          {this.state.imageSIUP || this.state.imageSIUP ? (
                            <Image
                              // resizeMethod="resize"
                              resizeMethod="resize"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                                overflow: "hidden",
                                //alignSelf: "center"
                                backgroundColor: "#CCC"
                              }}
                              resizeMode={"cover"}
                              source={{
                                uri: this.state.imageSIUP
                                  ? this.state.imageSIUP
                                  : ""
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                backgroundColor: "#EEE",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                width: 150,
                                height: 150,
                                borderRadius: 25
                              }}
                            >
                              <MaterialCommunityIcons
                                name={"camera"}
                                //name={'flashlight-off'}
                                size={40}
                                color={BLACK}
                              />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 15
                          }}
                        >
                          <Button
                            onPress={() => {
                              this.takePicture(5);
                              //this.setState({showCamera: true, uploadPhoto: true})
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_take_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                          <Button
                            onPress={() => {
                              this.uploadPicture(4);
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_upload_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                        </View>
                      </View>

                      {/* SIUP */}

                      <View
                        style={{
                          margin: 15,
                          marginBottom: 0,
                          display: this.state.formType === 1 ? "flex" : "none"
                        }}
                      >
                        <View>
                          <Text
                            style={[
                              MainStyle.dmSansBold,
                              {
                                fontSize: 14,
                                color: BLACK,
                                marginBottom: 5
                              }
                            ]}
                          >
                            {_foto_akta[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                            height: 150,
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                          }}
                        >
                          {this.state.imageAkta || this.state.imageAkta ? (
                            <Image
                              // resizeMethod="resize"
                              resizeMethod="resize"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                                overflow: "hidden",
                                //alignSelf: "center"
                                backgroundColor: "#CCC"
                              }}
                              resizeMode={"cover"}
                              source={{
                                uri: this.state.imageAkta
                                  ? this.state.imageAkta
                                  : ""
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                backgroundColor: "#EEE",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                width: 150,
                                height: 150,
                                borderRadius: 25
                              }}
                            >
                              <MaterialCommunityIcons
                                name={"camera"}
                                //name={'flashlight-off'}
                                size={40}
                                color={BLACK}
                              />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 15
                          }}
                        >
                          <Button
                            onPress={() => {
                              this.takePicture(7);
                              //this.setState({showCamera: true, uploadPhoto: true})
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_take_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                          <Button
                            onPress={() => {
                              this.uploadPicture(7);
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_upload_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                        </View>
                      </View>

                      <View
                        style={{
                          margin: 15,
                          marginBottom: 0,
                          display: this.state.formType === 1 ? "flex" : "none"
                        }}
                      >
                        <View>
                          <Text
                            style={[
                              MainStyle.dmSansBold,
                              {
                                fontSize: 14,
                                color: BLACK,
                                marginBottom: 5
                              }
                            ]}
                          >
                            {_foto_npwp[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                            height: 150,
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                          }}
                        >
                          {this.state.imageNPWP || this.state.imageNPWP ? (
                            <Image
                              // resizeMethod="resize"
                              resizeMethod="resize"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                                overflow: "hidden",
                                //alignSelf: "center"
                                backgroundColor: "#CCC"
                              }}
                              resizeMode={"cover"}
                              source={{
                                uri: this.state.imageNPWP
                                  ? this.state.imageNPWP
                                  : ""
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                backgroundColor: "#EEE",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                width: 150,
                                height: 150,
                                borderRadius: 25
                              }}
                            >
                              <MaterialCommunityIcons
                                name={"camera"}
                                //name={'flashlight-off'}
                                size={40}
                                color={BLACK}
                              />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 15
                          }}
                        >
                          <Button
                            onPress={() => {
                              this.takePicture(6);
                              //this.setState({showCamera: true, uploadPhoto: true})
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_take_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                          <Button
                            onPress={() => {
                              this.uploadPicture(6);
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_upload_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                        </View>
                      </View>

                      {/* NPWP */}

                      <View
                        style={{
                          margin: 15,
                          marginBottom: 0,
                          display: this.state.formType === 0 ? "flex" : "none"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.dmSansBold,
                            {
                              fontSize: 14,
                              color: BLACK,
                              marginBottom: 5
                            }
                          ]}
                        >
                          {_foto_ktp[this.state.languageIndex]}
                        </Text>

                        <View
                          style={{
                            width: "50%",
                            height: 150,
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                          }}
                        >
                          {this.state.imageKTP || this.state.imageKTP ? (
                            <Image
                              // resizeMethod="resize"
                              resizeMethod="resize"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                                overflow: "hidden",
                                //alignSelf: "center"
                                backgroundColor: "#CCC"
                              }}
                              resizeMode={"cover"}
                              source={{
                                uri: this.state.imageKTP
                                  ? this.state.imageKTP
                                  : ""
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                backgroundColor: "#EEE",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                width: 150,
                                height: 150,
                                borderRadius: 25
                              }}
                            >
                              <MaterialCommunityIcons
                                name={"camera"}
                                //name={'flashlight-off'}
                                size={40}
                                color={BLACK}
                              />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 15
                          }}
                        >
                          <Button
                            onPress={() => {
                              this.takePicture(1);
                              //this.setState({showCamera: true, uploadPhoto: true})
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_take_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                          <Button
                            onPress={() => {
                              this.uploadPicture(1);
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_upload_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                        </View>
                      </View>

                      {/* KTP */}

                      <View style={{ margin: 15, marginBottom: 0 }}>
                        <View>
                          <Text
                            style={[
                              MainStyle.dmSansBold,
                              {
                                fontSize: 14,
                                color: BLACK,
                                marginBottom: 5
                              }
                            ]}
                          >
                            {_buku_tabungan[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                            height: 150,
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                          }}
                        >
                          {this.state.imageBukuTabungan ||
                          this.state.imageBukuTabungan ? (
                            <Image
                              // resizeMethod="resize"
                              resizeMethod="resize"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                                overflow: "hidden",
                                //alignSelf: "center"
                                backgroundColor: "#CCC"
                              }}
                              resizeMode={"cover"}
                              source={{
                                uri: this.state.imageBukuTabungan
                                  ? this.state.imageBukuTabungan
                                  : ""
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                backgroundColor: "#EEE",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                width: 150,
                                height: 150,
                                borderRadius: 25
                              }}
                            >
                              <MaterialCommunityIcons
                                name={"camera"}
                                //name={'flashlight-off'}
                                size={40}
                                color={BLACK}
                              />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 15
                          }}
                        >
                          <Button
                            onPress={() => {
                              this.takePicture(2);
                              //this.setState({showCamera: true, uploadPhoto: true})
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_take_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                          <Button
                            onPress={() => {
                              this.uploadPicture(2);
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_upload_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                        </View>
                      </View>

                      {/* Buku tabungan */}

                      <View
                        style={{
                          margin: 15,
                          marginBottom: 0,
                          display: this.state.formType === 0 ? "flex" : "none"
                        }}
                      >
                        <View>
                          <Text
                            style={[
                              MainStyle.dmSansBold,
                              {
                                fontSize: 14,
                                color: BLACK,
                                marginBottom: 5
                              }
                            ]}
                          >
                            {_selfie[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                            height: 150,
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                          }}
                        >
                          {this.state.imageSelfie || this.state.imageSelfie ? (
                            <Image
                              // resizeMethod="resize"
                              resizeMethod="resize"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                                overflow: "hidden",
                                //alignSelf: "center"
                                backgroundColor: "#CCC"
                              }}
                              resizeMode={"cover"}
                              source={{
                                uri: this.state.imageSelfie
                                  ? this.state.imageSelfie
                                  : ""
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                backgroundColor: "#EEE",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                width: 150,
                                height: 150,
                                borderRadius: 25
                              }}
                            >
                              <MaterialCommunityIcons
                                name={"camera"}
                                //name={'flashlight-off'}
                                size={40}
                                color={BLACK}
                              />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 15
                          }}
                        >
                          <Button
                            onPress={() => {
                              this.takePicture(3);
                              //this.setState({showCamera: true, uploadPhoto: true})
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_take_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                          <Button
                            onPress={() => {
                              this.uploadPicture(3);
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_upload_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                        </View>
                      </View>

                      {/* sELFIE */}

                      <View
                        style={{
                          margin: 15,
                          marginBottom: 0,
                          display: this.state.formType === 0 ? "flex" : "none"
                        }}
                      >
                        <View>
                          <Text
                            style={[
                              MainStyle.dmSansBold,
                              {
                                fontSize: 14,
                                color: BLACK,
                                marginBottom: 5
                              }
                            ]}
                          >
                            {_tempat_bisnis[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                            height: 150,
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                          }}
                        >
                          {this.state.imageTempatBisnis ||
                          this.state.imageTempatBisnis ? (
                            <Image
                              // resizeMethod="resize"
                              resizeMethod="resize"
                              style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                                overflow: "hidden",
                                //alignSelf: "center"
                                backgroundColor: "#CCC"
                              }}
                              resizeMode={"cover"}
                              source={{
                                uri: this.state.imageTempatBisnis
                                  ? this.state.imageTempatBisnis
                                  : ""
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                backgroundColor: "#EEE",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                width: 150,
                                height: 150,
                                borderRadius: 25
                              }}
                            >
                              <MaterialCommunityIcons
                                name={"camera"}
                                //name={'flashlight-off'}
                                size={40}
                                color={BLACK}
                              />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 15
                          }}
                        >
                          <Button
                            onPress={() => {
                              this.takePicture(4);
                              //this.setState({showCamera: true, uploadPhoto: true})
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_take_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                          <Button
                            onPress={() => {
                              this.uploadPicture(4);
                            }}
                            style={{
                              borderRadius: 15,
                              width: "45%",
                              padding: 10,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                {
                                  fontSize: 12,
                                  color: WHITE,
                                  alignSelf: "center"
                                }
                              ]}
                            >
                              {_upload_photo[this.state.languageIndex]}
                            </Text>
                          </Button>
                        </View>
                      </View>

                      {/* tempat bisnis */}

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%",
                          display: "none"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_product_barcode[this.state.languageIndex]}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 0,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10,
                            flexDirection: "row",
                            //paddingRight: 20,
                            flex: 1,
                            //backgroundColor: '#BCA',
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "space-between",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: MAIN_THEME_COLOR_SELECT(
                              this.state.colorIndex
                            )
                          }}
                        >
                          <TextInput
                            style={{
                              //textAlignVertical: "top",
                              flex: 1,
                              //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              //backgroundColor: 'transparent',
                              //height: 100,
                              color: BLACK,
                              marginTop: 0,
                              marginLeft: 0,
                              marginRight: 0,
                              fontSize: 12,
                              fontFamily: "DMSans-Bold"
                            }}
                            multiline={false}
                            //numberOfLines={3}
                            //keyboardType={'phone-pad'}
                            type="text"
                            ref={q => {
                              this._barcodetext = q;
                            }}
                            onSubmitEditing={() => {
                              //this._sku.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v =>
                              this.setState({ productBarcode: v })
                            }
                            value={this.state.productBarcode}
                            placeholder={""}
                          />
                          <Button
                            onPress={() => {
                              this.showCamera(1);
                            }}
                          >
                            <MaterialCommunityIcons
                              name={"barcode-scan"}
                              style={{
                                alignSelf: "center",
                                fontSize: 20,
                                color: BLACK,
                                marginRight: 10,
                                marginLeft: 10
                              }}
                            />
                          </Button>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  margin: 15,
                  width: this.state.tablet ? "75%" : "100%",
                  alignSelf: "center"
                  //backgroundColor: "#555",
                  //flex: 1
                }}
              >
                <View
                  style={{
                    marginLeft: 15,
                    marginRight: 15,
                    flexDirection: "row"
                  }}
                >
                  <Checkbox
                    color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                    checked={this.state.checkAgree}
                    action={() => {
                      //ganti checklist Nego
                      this.setState({ checkAgree: !this.state.checkAgree });
                    }}
                  />
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 12,
                        color: BLACK
                      }
                    ]}
                  >
                    {_setuju[this.state.languageIndex]}
                  </Text>
                </View>
                <Button
                  style={{
                    padding: 10,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    marginLeft: 15,
                    marginRight: 15,
                    borderRadius: 15,
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    //this.addOrder();
                    // this.setState({ loading: true });
                    // if (this.state.formAction === "edit") {
                    //   this.editProduct();
                    // } else {
                    //   this.saveNewProduct();
                    // }
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {_simpan_data[this.state.languageIndex]}
                  </Text>
                </Button>

                <Button
                  style={{
                    padding: 10,
                    backgroundColor: WHITE,
                    marginLeft: 15,
                    marginRight: 15,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  }}
                  onPress={() => {
                    //this.addOrder();
                    // this.setState({ loading: true });
                    // if (this.state.formAction === "edit") {
                    //   this.editProduct();
                    // } else {
                    //   this.saveNewProduct();
                    // }
                    this.setState({ formItem: false });
                  }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormalBold,
                      {
                        fontSize: 15,
                        color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {_kembali[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showCamera}
          onRequestClose={() => {
            this.setState({ showCamera: false, uploadPhoto: false });
          }}
        >
          {this.renderCamera()}
          {/* {this.state.uploadPhoto
            ? this.renderCameraPhoto()
            : this.renderCamera()} */}
        </Modal>
      );
    }
  }

  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    //console.log("canDetectBarcode", canDetectBarcode);
    let { width, height } = Dimensions.get("window");
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        trackingEnabled
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel"
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        //onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
        onGoogleVisionBarcodesDetected={
          canDetectBarcode ? this.barcodeRecognized : null
        }
        //this.barcodeRecognized
        googleVisionBarcodeType={
          RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL
        }
      >
        <View
          style={{
            flex: 0.5,
            display: "none"
          }}
        >
          {/* <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View
          style={{
            flex: 0.4,
            display: "none",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          {/* <Slider
            style={{width: 150, marginTop: 15, alignSelf: 'flex-end'}}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          /> */}
        </View>
        {/* <View
          style={{
            flex: 0.1,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        > */}
        {/* <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}
          >
            {this.state.isRecording ? (
              <Text style={styles.flipText}> ☕ </Text>
            ) : (
              <Text style={styles.flipText}> REC </Text>
            )}
          </TouchableOpacity> */}
        {/* </View> */}
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>
            Zoom: {this.state.zoom}
          </Text>
        )}
        <View
          style={{
            flex: 0.1,
            display: "none",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          {/* <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity> */}
        </View>

        {/* <Modal
          transparent={true}
          visible={this.state.modal}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setState({ modal: false });
            Actions.pop();
          }}
        > */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            //justifyContent: "center",
            alignItems: "center",
            //borderLeftWidth: (width-300)/2,
            //borderRightWidth: (width-300)/2,
            //borderTopWidth: (height-50-300)/2,
            //borderBottomWidth: (height-50-300)/2,
            marginBottom: 0,
            //backgroundColor: "#BCA",
            borderColor: "#rgba(0,0,0,0.25)"
            //borderColor:'#rgba(255,255,255,0.25)',
          }}
        >
          <View
            style={{
              flex: 1,
              //
              width: "100%",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: this.state.tablet ? 0.25 : 0.1,
                paddingTop: 15,
                alignItems: "center",
                backgroundColor: "#rgba(0,0,0,0.50)",
                width: "100%",
                height: "100%"
              }}
            />
            <View
              style={{
                flex: 1,
                //paddingTop: 15,
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
              <View
                style={{
                  flex: 0.25,
                  backgroundColor: "#rgba(0,0,0,0.50)",
                  width: "100%",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showCamera: false });
                    //Actions.pop();
                  }}
                >
                  <View style={{ paddingTop: 15 }}>
                    <Ionicons
                      name={"md-close"}
                      //name={'flashlight-off'}
                      size={40}
                      color={WHITE}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 0.5,
                  backgroundColor: "transparent",
                  width: "100%",
                  alignItems: "center"
                }}
              />

              <View
                style={{
                  flex: 0.25,
                  backgroundColor: "#rgba(0,0,0,0.50)",
                  width: "100%",
                  alignItems: "center"
                }}
              />
            </View>
            <View
              style={{
                flex: this.state.tablet ? 0.25 : 0.1,
                paddingTop: 15,
                alignItems: "center",
                backgroundColor: "#rgba(0,0,0,0.50)",
                width: "100%",
                height: "100%"
              }}
            />
          </View>

          {/* <View
            style={{
              //backgroundColor: "#BCA",
              width: "100%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              // onPress={() => {
              //   //this.setState({ help: true });

              // }}
              style={{ marginBottom: 15 }}
              onPress={this.takePicture.bind(this)}
            >
              <Ionicons
                name={"md-camera"}
                //name={'flashlight-off'}
                size={50}
                color={WHITE}
              />
            </TouchableOpacity>
          </View> */}
          {/* <View
                style={{
                  width: "50%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // this.toggleFlash();
                    this.setState({
                      flash: flashModeOrder[this.state.flash]
                    });
                  }}
                >
                  <MaterialCommunityIcons
                    name={"flashlight"}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans-Regular",
                    color: WHITE
                  }}
                >
                  Flashlight
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ help: true });
                  }}
                >
                  <Ionicons
                    name={"md-help-circle-outline"}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />




                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans-Regular",
                    color: WHITE
                  }}
                >
                  Help
                </Text>
              </View> */}
        </View>
        {/* </Modal> */}
        {/* {!!canDetectBarcode && this.renderBarcodes()} */}
      </RNCamera>
    );
  }

  renderCameraPhoto() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    //console.log("canDetectBarcode", canDetectBarcode);
    let { width, height } = Dimensions.get("window");
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        trackingEnabled
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel"
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        //onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
        onGoogleVisionBarcodesDetected={canDetectBarcode ? null : null}
        //this.barcodeRecognized
        googleVisionBarcodeType={
          RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL
        }
      >
        <View
          style={{
            flex: 0.5,
            display: "none"
          }}
        >
          {/* <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View
          style={{
            flex: 0.4,
            display: "none",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          {/* <Slider
            style={{width: 150, marginTop: 15, alignSelf: 'flex-end'}}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          /> */}
        </View>
        {/* <View
          style={{
            flex: 0.1,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        > */}
        {/* <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}
          >
            {this.state.isRecording ? (
              <Text style={styles.flipText}> ☕ </Text>
            ) : (
              <Text style={styles.flipText}> REC </Text>
            )}
          </TouchableOpacity> */}
        {/* </View> */}
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>
            Zoom: {this.state.zoom}
          </Text>
        )}
        <View
          style={{
            flex: 0.1,
            display: "none",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          {/* <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity> */}
        </View>

        {/* <Modal
          transparent={true}
          visible={this.state.modal}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setState({ modal: false });
            Actions.pop();
          }}
        > */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            //justifyContent: "center",
            alignItems: "center",
            //borderLeftWidth: (width-300)/2,
            //borderRightWidth: (width-300)/2,
            //borderTopWidth: (height-50-300)/2,
            //borderBottomWidth: (height-50-300)/2,
            marginBottom: 0,
            //backgroundColor: "#BCA",
            borderColor: "#rgba(0,0,0,0.50)"
            //borderColor:'#rgba(255,255,255,0.25)',
          }}
        >
          <View
            style={{
              flex: 1,
              //
              width: "100%",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: this.state.tablet ? 0.25 : 0.1,
                paddingTop: 15,
                alignItems: "center",
                //backgroundColor: "#rgba(0,0,0,0.50)",
                width: "100%",
                height: "100%"
              }}
            />
            <View
              style={{
                flex: 1,
                //paddingTop: 15,
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
              <View
                style={{
                  flex: 0.25,
                  //backgroundColor: "#rgba(0,0,0,0.50)",
                  width: "100%",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showCamera: false });
                    //Actions.pop();
                  }}
                >
                  <View style={{ paddingTop: 15 }}>
                    <Ionicons
                      name={"md-close"}
                      //name={'flashlight-off'}
                      size={40}
                      color={WHITE}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 0.5,
                  backgroundColor: "transparent",
                  width: "100%",
                  alignItems: "center"
                }}
              />

              <View
                style={{
                  flex: 0.25,
                  //backgroundColor: "#rgba(0,0,0,0.50)",
                  width: "100%",
                  alignItems: "center"
                }}
              />
            </View>
            <View
              style={{
                flex: this.state.tablet ? 0.25 : 0.1,
                paddingTop: 15,
                alignItems: "center",
                //backgroundColor: "#rgba(0,0,0,0.50)",
                width: "100%",
                height: "100%"
              }}
            />
          </View>

          <View
            style={{
              //backgroundColor: "#BCA",
              width: "100%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              // onPress={() => {
              //   //this.setState({ help: true });

              // }}
              style={{ marginBottom: 15 }}
              onPress={this.takePicture.bind(this)}
            >
              <Ionicons
                name={"md-camera"}
                //name={'flashlight-off'}
                size={50}
                color={WHITE}
              />
            </TouchableOpacity>
          </View>
          {/* <View
                style={{
                  width: "50%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // this.toggleFlash();
                    this.setState({
                      flash: flashModeOrder[this.state.flash]
                    });
                  }}
                >
                  <MaterialCommunityIcons
                    name={"flashlight"}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans-Regular",
                    color: WHITE
                  }}
                >
                  Flashlight
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ help: true });
                  }}
                >
                  <Ionicons
                    name={"md-help-circle-outline"}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />




                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans-Regular",
                    color: WHITE
                  }}
                >
                  Help
                </Text>
              </View> */}
        </View>
        {/* </Modal> */}
        {/* {!!canDetectBarcode && this.renderBarcodes()} */}
      </RNCamera>
    );
  }

  barcodeRecognized = ({ barcodes }) => {
    console.log("barcodeRecognized==> ", barcodes);

    if (this.state.loading === false) {
      this.setState({ loading: true });

      //let { onScan } = this.props;
      //this.setState({ barcodes });
      //let barcodeData = JSON.parse(barcodes[0].data);
      let barcodeData = barcodes[0].data;
      console.log("barcodes.data ==> ", barcodeData);

      if (this.state.scanType === 1) {
        this.setState({
          productBarcode: barcodeData,
          loading: false,
          showCamera: false
        });
      } else if (this.state.scanType === 2) {
        this.setState({
          productSKU: barcodeData,
          loading: false,
          showCamera: false
        });
      }
      //{"retail_id": "1","gerai_id": "1","table_id": "1", "ssid": "KX_CLC", "password": "13082017"}

      // let wifi = barcodeData.ssid;
      // let password = barcodeData.password;
      // let isWep = false; //android false

      // let retail_id = barcodeData.retail_id;
      // let gerai_id = barcodeData.gerai_id;
      // let table_id = barcodeData.table_id;

      this.setState({ loading: false });
    }
  };

  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.5, width: 384, height: 512, base64: true };

  //     const data = await this.camera.takePictureAsync(options);
  //     console.log("takePicture ", data);

  //     //var path = RNFS.DocumentDirectoryPath + "/";

  //     var path = RNFS.PicturesDirectoryPath + "/";

  //     console.log("file path ===> ", path);

  //     var str = data.uri;
  //     var res = str.split("Camera/");

  //     var image_name = res[1];

  //     var image_path = path + image_name;

  //     console.log("image path ===> ", image_path);

  //     // RNFS.writeFile(image_path, data.base64, "base64")
  //     //   .then(success => {
  //     //     console.log("FILE WRITTEN!");
  //     //   })
  //     //   .catch(err => {
  //     //     console.log(err.message);
  //     //   });

  //     // write the file
  //     // RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
  //     //   .then((success) => {
  //     //     console.log('FILE WRITTEN!');
  //     //   })
  //     //   .catch((err) => {
  //     //     console.log(err.message);
  //     //   });

  //     // const base64image = await RNFS.readFile(data.uri, "base64");

  //     // console.log("base 64 ==> ", base64image);

  //     this.setState({
  //       //showModalPin: true,
  //       //cameraPicture: data.base64,
  //       showCamera: false,
  //       cameraPicture: data.base64,
  //       cameraFileName: image_path,
  //       cameraUri: data.uri
  //     });
  //   }
  // };

  showAdditionalSalesType(width = 322, top = 149, left = 745) {
    let { additionalSalesType, showAdditionalSalesType } = this.state;
    if (showAdditionalSalesType) {
      return (
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            //flex: 1,
            zIndex: 12,
            //height: 200,
            position: "absolute",
            top: top,
            width: width,
            left: left,
            elevation: 3,
            borderRadius: 5,
            //paddingTop: 10,
            marginBottom: 10
          }}
        >
          {additionalSalesType.map((items, itemIndex) => {
            return (
              <Button
                style={{
                  paddingTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  alignItems: "center",
                  alignContent: "center"
                }}
                onPressIn={() => {
                  this.modifyBillChangeGojek(
                    items.name,
                    this.state.selectedSalesType
                  );
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {items.name}
                </Text>
              </Button>
            );
          })}

          {/* {additionalTable.map(this.renderAdditionalTable)} */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  showAdditionalTable(width = 322, top = 149, left = 745) {
    let { additionalTable, showAdditionalTable } = this.state;
    if (showAdditionalTable) {
      return (
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            //flex: 1,
            zIndex: 12,
            //height: 200,
            position: "absolute",
            top: top,
            width: width,
            left: left,
            elevation: 3,
            borderRadius: 5,
            //paddingTop: 10,
            marginBottom: 10
          }}
        >
          {additionalTable.map((items, itemIndex) => {
            return (
              <Button
                style={{
                  paddingTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  alignItems: "center",
                  alignContent: "center"
                }}
                onPressIn={() => {
                  console.log("selected TAble ==> ", items);
                  this.setState({
                    selectedTable: items,
                    showAdditionalTable: false
                  });
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 12, color: BLACK }
                  ]}
                >
                  {items.name}
                </Text>
              </Button>
            );
          })}

          {/* {additionalTable.map(this.renderAdditionalTable)} */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  truncateOnWord(str, limit) {
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

  starPrintDeviceName() {
    StarPrintFunctions.getDeviceName(val => {
      console.log("response getDeviceName => ", val);
    });
  }

  async starPrintInitialize() {
    // StarPrintFunctions.Initialize(val => {
    //   console.log("response starPrintInitialize => ", val);
    // });

    try {
      // let printers = await StarPRNT.portDiscovery("All");
      // console.log("starPrintInitialize ====> ", printers);
      // StarPrintFunctions.SaveStarPrinterList(printers, v => {
      //   console.log("starPrintInitialize saved");
      // });
    } catch (e) {
      console.error(e);
    }
  }

  starPrintInitialize2() {
    StarPrintFunctions.GetStarPrinterList(val => {
      console.log("response starPrintInitialize2 => ", val);
      if (val) {
        this.setState({ starPrinterList: val, selectedStarPrinter: val[0] });
      }
    });
  }

  async starPrintOpen() {
    let commands = [];
    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Center });
    commands.push({
      append:
        //"Star Clothing Boutique\n" +
        //"123 Star Road\n" +
        //"City, State 12345\n" +
        "123456" + "\n"
    });

    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Right });
    commands.push({
      append:
        //"Star Clothing Boutique\n" +
        //"123 Star Road\n" +
        //"City, State 12345\n" +
        "123456"
    });

    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Left });
    commands.push({
      append:
        //"Star Clothing Boutique\n" +
        //"123 Star Road\n" +
        //"City, State 12345\n" +
        "123456" + "\n"
    });

    // commands.push({
    //   appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed
    // });

    // commands.push({
    //   openCashDrawer: 1
    // });
    // [{"macAddress": "00:12:F3:2D:88:76", "modelName": "BT:STAR mPOP-B0180", "portName": "BT:00:12:F3:2D:88:76"}]

    let portName = this.state.selectedStarPrinter.portName;

    let emulation = "StarPRNT";
    //@Emulation type: "StarPRNT", "StarPRNTL", "StarLine", "StarGraphic", "EscPos", "EscPosMobile", "StarDotImpact"
    try {
      // var printResult = await StarPRNT.print(emulation, commands, portName);
      // console.log(printResult); // Success!
    } catch (e) {
      console.error(e);
    }
  }

  starPrintClose() {
    StarPrintFunctions.closePort(val => {
      console.log("response closePort => ", val);
    });
  }

  starPrintTestPrint() {
    this.setState({ printer_busy: true });
    StarPrintFunctions.GetStarPrinterList(val => {
      console.log("response starPrintTestPrint Get Printer => ", val);
      if (val) {
        this.setState({ starPrinterList: val, selectedStarPrinter: val[0] });
        let portName = val[0].portName;
        StarPrintFunctions.PrintTesting(portName, "StarPRNT", val2 => {
          this.setState({ printer_busy: false });
        });
      }
    });
  }

  starPrintOpenDrawer() {
    this.setState({ printer_busy: true });
    StarPrintFunctions.GetStarPrinterList(val => {
      console.log("response starPrintTestPrint Get Printer => ", val);
      if (val) {
        this.setState({ starPrinterList: val, selectedStarPrinter: val[0] });
        let portName = val[0].portName;
        StarPrintFunctions.OpenDrawer(portName, "StarPRNT", val2 => {
          this.setState({ printer_busy: false });
        });
      }
    });
  }

  divideLongWord(str, limit) {
    let final_result = [];
    let length = str.length;
    //console.log("string length ==> ", length);

    let array_length = Math.ceil(length / limit);
    //console.log("array_length  ==> ", array_length);

    // for (var i = 0; i < array_length; i++) {
    //   let temp = str.substr(i * limit, limit);
    //   final_result.push(temp);
    // }

    let count = 0;

    for (let i = 0; i < array_length + 2; i++) {
      let temp = "";

      if (count === 0) {
        //temp = str.substr(0, limit);
        temp = this.truncateOnWord(str, limit);
      } else {
        temp = str.substr(count, length);
        temp = this.truncateOnWord(temp, limit);
      }
      count = count + temp.length;
      // i = temp.length;
      // i = i + temp.length;
      if (temp !== "") {
        final_result.push(temp.trim());
      }
    }

    return final_result;

    //console.log("final_result ==> ", final_result);

    //substr(0, limit);
  }

  renderSelection() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: BLACK
              }
            ]}
          >
            {_choose_type[this.state.languageIndex]}
          </Text>
        </View>
        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            // this.testFunction();
            // this.InitializeShopee();
            this.starPrintInitialize();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            STAR PRINT INITIALIZE 1
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            // this.testFunction();
            // this.InitializeShopee();
            this.starPrintInitialize2();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            STAR PRINT INITIALIZE 2
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            // this.PaymentStartLocationListener();
            this.starPrintOpen();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            STAR PRINT OPEN
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            if (!this.state.printer_busy) {
              this.starPrintTestPrint();
            } else {
              alert("Printer Is Busy");
            }


            
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            starPrintTestPrint()
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            //this.PaymentProceedPayment();
            if (!this.state.printer_busy) {
              this.starPrintOpenDrawer();
            } else {
              alert("Printer Is Busy");
            }


            
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            starPrintOpenDrawer()
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            this.PaymentProceedPaymentCreditCard();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            BAYAR KREDIT
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            display: "none"
          }}
          onPress={() => {
            this.OvoPayment();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            BAYAR Ovo
          </Text>
        </Button>
        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            display: "none"
          }}
          onPress={() => {
            this.ShopeePayment();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            BAYAR Shopee
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            this.ConnectPrinter();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            CONNECT PRINTER
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            this.TestingPrint();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            TEST PRINTER
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
            //display: "none"
          }}
          onPress={() => {
            this.CashlezStopServices();
            //this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            STOP ALL
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            //this.addOrder();
            // this.setState({ loading: true });
            // if (this.state.formAction === "edit") {
            //   this.editProduct();
            // } else {
            //   this.saveNewProduct();
            // }
            this.setState({ formItem: true, formType: 0 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            {_choose_type_individual[this.state.languageIndex]}
          </Text>
        </Button>

        <Button
          style={{
            padding: 10,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            //this.addOrder();
            // this.setState({ loading: true });
            // if (this.state.formAction === "edit") {
            //   this.editProduct();
            // } else {
            //   this.saveNewProduct();
            // }
            this.setState({ formItem: true, formType: 1 });
          }}
        >
          <Text
            style={[
              MainStyle.robotoNormalBold,
              {
                fontSize: 15,
                color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
              }
            ]}
          >
            {_choose_type_corporate[this.state.languageIndex]}
          </Text>
        </Button>
      </View>
    );
  }

  renderModalWebView() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showWebView}
        onRequestClose={() => {
          this.setState({ showWebView: false });
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              backgroundColor: WHITE,
              flex: 0.75,
              width: "100%",
              alignSelf: "center",
              borderColor: "#c4c4c4",
              borderWidth: 0.5,
              borderRadius: 15,
              padding: 15
            }}
          >
            <WebView
              source={{ uri: this.state.CZUri }}
              style={{ marginTop: -150 }}
              containerStyle={{ flex: 0, width: "100%", height: 425 }}
              geolocationEnabled={true}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    let { notifNumber } = this.props;
    const {
      refreshing,
      showAlert,
      formItem,
      newName,
      lastUpdate,
      timeCompare
    } = this.state;
    notifNumber = 9999;

    const barStyle =
      this.state.colorIndex === 9 ? "dark-content" : "light-content";

    // let timeDifference = moment(lastUpdate).diff(moment(timeCompare));
    let timeDifference = moment(lastUpdate).diff(moment(timeCompare));

    let timeDifferenceSecond = Math.round(timeDifference / 1000);
    let timeDifferenceMinute = Math.round(timeDifferenceSecond / 60);
    let timeDifferenceHour = Math.round(timeDifferenceSecond / 3600);

    return (
      <View style={[styles.body]}>
        {this.state.loading ? <Loading /> : <View />}
        {/*
         */}
        <MobileHeader
          colorIndex={this.state.colorIndex}
          logoutAction={() => this.logoutAction()}
          title={_register_payment_title[this.state.languageIndex]}
          //title={this.state.selectedSalesType}
          //title={this.state.action}
          notif={false}
          loginInformation={this.state.userInfo}
          menu={false}
          back={true}
          backAction={() => {
            Actions.pop();
          }}
          hideLogin={true}
          add={false}
          addAction={() => {}}
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        {this.state.showCustomConfirmation === true ? (
          <CustomConfirmation
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showCustomConfirmation: false });
            }}
            submitAction={() => {
              //this.deleteData();
              this.setState({ showCustomConfirmation: false });
            }}
            text={_delete_confirmation[this.state.languageIndex]}
          />
        ) : (
          <View />
        )}

        {this.state.showAlert ? (
          <CustomAlert
            message={this.state.alertMessage}
            //title={'Success'}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ showAlert: false });
            }}
          />
        ) : (
          <View />
        )}
        {/* <Button style={{
        backgroundColor: '#BCA', height: 100,
        width: 100, position: 'absolute', zIndex: 100, left: 100, top: 100}}
        onPress={()=>{alert(';;')}}></Button> */}

        {/* {this.renderModalWebView()} */}
        <View
          style={{
            //flexDirection: "column",
            padding: 15,
            paddingBottom: 0,
            flex: 1,
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              flex: 1,
              //display: this.state.showBill ? "none" : "flex",
              width: "100%",
              marginTop: 0,
              backgroundColor: formItem ? "transparent" : "transparent"
              //borderRadius: formItem ? 5 : 0,
              //borderWidth: formItem ? 1 : 0,
              //borderColor: MAIN_THEME_COLOR
            }}
          >
            {this.renderSelection()}
            {this.renderFormItem()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: "column"
  },
  flipText: {
    color: "white",
    fontSize: 15
  },
  zoomText: {
    position: "absolute",
    bottom: 70,
    zIndex: 2,
    left: 2
  }
});
