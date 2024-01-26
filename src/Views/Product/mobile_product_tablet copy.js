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
  LogBox
} from "react-native";
import RNFS from "react-native-fs";

// LogBox.ignoreAllLogs(true);
import Dropdown from "../../Components/MobileDropdown";

import NetInfo from "@react-native-community/netinfo";
import Checkbox from "../../Components/Checkbox";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// import GestureRecognizer from "react-native-swipe-gestures";
import MainStyle from "../../Styles";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";
import { getDistance, convertDistance, decimalToSexagesimal } from "geolib";
import { RNCamera } from "react-native-camera";

import PrinterFunctions from "../../Libraries/PrinterFunctions";

import MobileHeader from "../../Components/MobileHeader";
import Image from "../../Components/Image";
import Button from "../../Components/Button";
import TransactionNewName from "../../Components/TransactionNewName";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
  BE_Send_Struk
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
  _stock,
  _delete_confirmation
} from "../../Libraries/DictionaryHome";
import DeviceInfo from "react-native-device-info";
import { _menu_8 } from "../../Libraries/DictionaryLogin";
import { _berhasil } from "../../Libraries/DictionaryAbsen";
import { _berhasil_delete, _no_data_3 } from "../../Libraries/DictionaryRekap";
import RegionFunctions from "../../Libraries/RegionFunctions";
import { _edit, _ok_alert } from "../../Libraries/DictionarySetting";
import { _delete } from "../../Libraries/DictionaryManagement";

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

export default class MobileProductTablet extends Component {
  constructor(props) {
    super(props);
    this.arrLoc = [];
    this.state = {
      loading: true,
      formItem: false,
      showCamera: false,
      uploadPhoto: false,
      showBill: false,
      scanType: 1,
      tablet: DeviceInfo.isTablet(),
      transactionId: "",
      showClearCartBackHandler: false,
      showClearCart: false,
      showCustomConfirmation: false,
      expand: false,
      showAlert: false,
      alertMessage: [],
      showFav: true,
      showFavList: true,
      show_order_id: false,
      footer_printer: "",
      customer_id: 0,
      booking_id: 0,
      phone: "",
      order_id: null,
      formAction: "add",
      formIndex: 0,
      formSalesType: 1,
      salesTypeTax: 0.2,
      salesTypeValue: 0,
      newName: "",
      showNameForm: false,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      selectedProduct: { id: 0, name: "" },
      selectedIndex: null,
      selectedQuantity: 1,
      selectedCatatan: "",

      additionalProduct: [],
      additionalList: [],
      savedTableId: 0,
      tableLeft: 0,
      tableWidth: 0,
      tableTop: 0,
      newWidth: 0,
      newLeft: 0,
      newTop: 0,
      language: "",
      ready: true,
      number: 1,
      currentLoc: null,
      refreshing: false,
      searchKey: "",
      selected: -1,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      currency: "IDR",
      showAll: false,
      activeCategory: -1,
      activeCategoryIndex: -1,
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
      dataCategory: [],
      dataCategoryAll: [],
      categoryTotal: 0,
      dataMenu: [],
      dataOfflineMenu: [],
      dataOfflineAddons: [],
      dataMenuFav: [],
      action: "0",
      lastUpdate: moment(new Date()).format("2000-MM-DD HH:mm:ss"),
      timeCompare: moment(new Date()).format("YYYY-MM-DD 07:07:07"),
      import_cooldown: 300,
      auth: this.props.auth ? this.props.auth : "",
      services: 0,
      tax: 0,
      salesTypeName: "",
      sales_type_dine_in_id: 0,
      sales_type_first_id: 0,
      salesTypeCharge: 0,

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
      product_has_stock: 0,
      productStock: 0,
      productUnit: null,
      productStockId: null,
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
      currencyAllowDecimal: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    PrinterFunctions.GetLanguage(val => {
      if (val !== null) {
        this.setState({ languageIndex: val });
      }
    });

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
        //additionalProduct: defaultProductSelection
      });
    });
    ColorFunctions.GetColor(val => {
      if (val && this.state.colorIndex !== val) {
        this.setState({ colorIndex: val });
      }
    });

    let temp_save_order = [];
    this.setPreviliges();
    this.getDataOfflineMode();
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.getOutletData();
        this.getData();
        this.getDataCategory();

        //this.getSalesType();
        //this.getAddonsByMenu(1);
        //this.getDataTable();
        //this.getRekap();
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
        this.setState({ loading: false });
      } else {
        //offline Mode
        //console.log("offline Mode");
        //this.getDataOfflineMode();
      }
    });

    this.getPrinterData();
  }

  uploadPicture = () => {
    var options = {
      mediaType: "photo",
      maxWidth: 768,
      maxHeight: 768,
      quality: 1,
      saveToPhotos: false
    };

    launchImageLibrary(options, response => {
      console.log("Response ImagePicker ==> ", response);
      let source = response.assets;

      if (source)
      {
        this.setState({
          filePath: source[0],
          image: source[0].uri
        });
      }
    });
  };

  takePicture = () => {
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

    var options = {
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
      saveToPhotos: false
    };

    launchCamera(options, response => {
      console.log("Response ImagePicker ==> ", response);
      let source = response.assets;

      console.log("Response source ==> ", source);

      if(source)
      {
        console.log("Response source ==> ", source[0].uri);


        this.setState({
          filePath: source[0],
          image: source[0].uri
        });
      }


    });

    // ImagePicker.showImagePicker(options, response => {
    //   console.log("Response ImagePicker ==> ", response);

    //   if (response.didCancel) {
    //     console.log("User cancelled image picker");
    //   } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    //   } else if (response.customButton) {
    //     console.log("User tapped custom button: ", response.customButton);
    //     alert(response.customButton);
    //   } else {
    //     let source = response;
    //     // You can also display the image using data:
    //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    //     this.setState({
    //       filePath: source,
    //       image: source.uri
    //     });

    //     console.log("source ==> ", source);
    //     //AsyncStorage.setItem('profile', JSON.stringify(source));

    //     // setTimeout(()=>{
    //     //     this._updateProfile();
    //     // }, 200)

    //     // if(source.height <= 300 && source.width <= 300 ){
    //     //     this.setState({
    //     //         filePath: source,
    //     //     });

    //     //     AsyncStorage.setItem('profile', JSON.stringify(source));

    //     //     setTimeout(()=>{
    //     //         this._updateProfile();
    //     //     }, 200)
    //     // }else{
    //     //     Alert.alert(
    //     //         'INFO',
    //     //         'Max ukuran 300px X 300px',
    //     //         [
    //     //             {text:'OKE'}
    //     //         ]
    //     //     )
    //     //     return false
    //     // }
    //   }
    // });
  };

  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.7, width: 512, height: 768, base64: true };

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
  //       //cameraPicture: data.base64,
  //       //cameraFileName: image_path,
  //       image: data.uri,
  //       showCamera: false,
  //       uploadPhoto: false,
  //     });
  //   }
  // };

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

  getDataOfflineMode() {
    OfflineMenuFunctions.GetAllProduct(val => {
      if (val) {
        this.setState({
          dataMenuFav: val
        });
      }
    });
  }

  getPaymentMethod() {
    const uri = BE_Payment_Method;

    fetch(uri, {
      method: "GET",
      headers: {
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let resultData = result.data;

        let cash = {};
        let wallet = [];
        let card = [];
        if (result.statusCode === 200) {
          OfflineMenuFunctions.SavePaymentType(resultData, val => {});
        }
      })
      .catch(_err => {});
  }

  importData(time = this.state.lastUpdate) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);

    const time_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let timeDifference = moment(time_now).diff(moment(time));
    let timeDifferenceSecond = Math.round(timeDifference / 1000);
    let timeDifferenceMinute = Math.round(timeDifferenceSecond / 60);
    let timeDifferenceHour = Math.round(timeDifferenceSecond / 3600);
    OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});

    //console.log("timeDifferenceSecond ==> ", timeDifferenceSecond);

    // if (timeDifferenceSecond > this.state.import_cooldown) {
    if (timeDifferenceSecond > 300) {
      const gerai_id = this.state.userInfo.gerai_id;
      let uri_category = `${BE_Get_Product_Category}?outlet_id=${gerai_id}&search=&page=1`;
      let uri_product = `${BE_Get_Product}?outlet_id=${gerai_id}&search=&page=1`;
      let uri_fav = `${BE_Get_Product}?outlet_id=${gerai_id}&is_favorite=1&name=&page=1`;

      fetch(uri_category, {
        method: "GET",
        headers: {
          Authorization: this.state.auth
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          // let result = responseJson;
          // let resultData = result.data;

          //console.log("Import Data Category ==> ", responseJson);

          let result = responseJson;
          let resultData = result;
          let data_category = resultData.data;

          const data_temp = resultData.data;
          let temp_data_category = [];
          data_temp.map((v, i) => {
            if (v.Products.length > 0) {
              //console.log('is Single ==> ', v.options[0]);
              temp_data_category.push(v);
            }
          });

          OfflineMenuFunctions.SaveCategoryMenu(temp_data_category, val => {});
          //disable dulu

          // let temp_category = responseJson.category.data;
          // let temp_menu = responseJson.data.data;
          // let temp_favourite = responseJson.data_favourite.data;
          // let temp_addons = responseJson.data_addons;
          //offline mode save
          // OfflineMenuFunctions.SaveAddons(temp_addons, val => {});
          // OfflineMenuFunctions.SaveAllMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveFavMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});
          //offline mode save
          // this.setState({
          //   dataMenuFav: resultData.data,

          //   loading: false
          // });
          //console.log('new data ==>', JSON.stringify(data))
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });

      fetch(uri_product, {
        method: "GET",
        headers: {
          Authorization: this.state.auth
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          // let result = responseJson;
          // let resultData = result.data;

          //console.log("Import Data Menu ==> ", responseJson);

          let result = responseJson;
          let resultData = result;

          let data_product = resultData.data;
          OfflineMenuFunctions.SaveAllMenu(data_product, val => {});

          // let temp_category = responseJson.category.data;
          // let temp_menu = responseJson.data.data;
          // let temp_favourite = responseJson.data_favourite.data;
          // let temp_addons = responseJson.data_addons;
          //offline mode save
          // OfflineMenuFunctions.SaveAddons(temp_addons, val => {});
          // OfflineMenuFunctions.SaveAllMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveFavMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});
          //offline mode save
          // this.setState({
          //   dataMenuFav: resultData.data,

          //   loading: false
          // });
          //console.log('new data ==>', JSON.stringify(data))
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });

      fetch(uri_fav, {
        method: "GET",
        headers: {
          Authorization: this.state.auth
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          // let result = responseJson;
          // let resultData = result.data;

          //console.log("Import Data Fav ==> ", responseJson);

          let result = responseJson;
          let resultData = result;

          let data_favourite = resultData.data;
          OfflineMenuFunctions.SaveFavMenu(data_favourite, val => {});

          // let temp_category = responseJson.category.data;
          // let temp_menu = responseJson.data.data;
          // let temp_favourite = responseJson.data_favourite.data;
          // let temp_addons = responseJson.data_addons;
          //offline mode save
          // OfflineMenuFunctions.SaveAddons(temp_addons, val => {});
          // OfflineMenuFunctions.SaveAllMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveFavMenu(temp_menu, val => {});
          // OfflineMenuFunctions.SaveLastUpdate(time_now, val => {});
          //offline mode save
          // this.setState({
          //   dataMenuFav: resultData.data,

          //   loading: false
          // });
          //console.log('new data ==>', JSON.stringify(data))
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
        });

      this.getPaymentMethod();
    }
  }

  onBackPress = () => {
    //Actions.pop();
    //this.props.onBackPress();
    if (this.state.dataBill.length > 0 && this.state.order_id === null) {
      this.setState({ showClearCartBackHandler: true });
    } else {
      //clear cart
      this.newOrder(true, true);
      Actions.pop();
    }
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  componentDidUpdate(nextProps) {
    //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);
    if (this.props !== nextProps) {
      //console.log('COMPONENT DID UPDATE HOME ==> ', nextProps);

      if (this.props.checkIn) {
        this.newOrderCheckIn(false, false);
        this.setState({ action: "1" });
      }

      if (this.props.checkOut) {
        this.setState({
          showBill: true,
          action: "2"
        });
      }

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
          //additionalProduct: defaultProductSelection
        });
      });
      ColorFunctions.GetColor(val => {
        if (val && this.state.colorIndex !== val) {
          this.setState({ colorIndex: val });
        }
      });

      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getOutletData();
          this.getData();
          this.getDataCategory();
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

        //this.connectPrinter(val.address);
      }
    });

    PrinterFunctions.GetPrintType(val => {
      if (val) {
        console.log("GetPrintType ==> ", val);
        this.setState({ printType: val });
      }
    });

    PrinterFunctions.GetMainPrinter(val => {
      if (val) {
        //console.log("Main Kitchen Index ==> ", val);
        this.setState({ printer_main: val });
        //this.connectPrinter(val.address);
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

  newOrder(showAlert = false, cancel = false) {
    this.setState({ loading: true });
    this.cancelOrder(
      showAlert,
      cancel,
      this.state.order_id,
      this.state.savedTableId
    );
    MenuFunctions.ClearNewMenuAll(val => {});

    this.setState({
      selectedSalesType: "Take-Away",
      dataBill: [],
      //selectedTable: this.state.additionalTable[0],
      savedTableId: 0,
      showAdditionalSalesType: false,
      showAdditionalTable: false,
      showNew: false,
      action: "0"
    });

    this.getData("", -1);
    this.getDataCategory();
    //this.getAddonsByMenu(1);
    this.getDataTable();
  }

  newOrderCheckIn(showAlert = false, cancel = false) {
    this.setState({ loading: true });
    this.cancelOrder(
      showAlert,
      cancel,
      this.state.order_id,
      this.state.savedTableId
    );
    MenuFunctions.ClearNewMenuCheckIn(val => {});

    this.setState({
      selectedSalesType: "Take-Away",
      dataBill: [],
      //selectedTable: this.state.additionalTable[0],
      //savedTableId: 0,
      showAdditionalSalesType: false,
      showAdditionalTable: false,
      showNew: false
    });

    this.getData();
    this.getDataCategory();
    //this.getAddonsByMenu(1);
    this.getDataTable();
  }

  cetakBill(type) {
    const { dataBill } = this.state;
    if (dataBill.length > 0) {
      this.printAction(type);
    }
  }

  cancelOrder(
    showAlert = false,
    cancel = false,
    order_id = null,
    table_id = 0
  ) {
    let valid = false;

    if (cancel === false && table_id === 0) {
      //jika dia take out maka order auto cancel
      valid = true;
    } else if (cancel === true) {
      // jika emang mau cancel mau table ada pun pasti cancel
      valid = false;
    }

    if (order_id && valid) {
      // has order_id
      fetch(UpdateStatusOrderByIdAPI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          order_id: order_id,
          status: "cancel"
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("responseJson cancel ORder ==> ", responseJson);
          let result = responseJson;
          MenuFunctions.ClearNewMenuAll(val => {});

          if (showAlert) {
            let message = [];
            // message.push(responseJson.message);
            if (result.status) {
              message.push(_berhasil_update[this.state.languageIndex]);
            } else {
              message.push(_gagal[this.state.languageIndex]);
            }
            this.setState({
              loading: false,
              showAlert: true,
              alertMessage: message
            });
          }

          if (result.status) {
            this.setState({
              order_id: null
            });
          }
        })
        .catch(_err => {
          console.log("ERR ==> ", _err);
          this.setState({ loading: false });
        });
    }
  }

  getDataTable() {
    const { savedTableId } = this.state;
    const gerai_id = this.state.userInfo.gerai_id;
    // let uri = `${GetTableAPI}?gerai_id=${gerai_id}&search=`;

    let uri = `${BE_TableManagement}`;

    //console.log("getDATATABLE uri ==> ", uri);

    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        let finalResult = [];
        let allResult = [];

        let resultData = result.data;

        //console.log("getDataTable Result ==> ", responseJson);

        let selectedTableData = null;
        resultData.map((v, i) => {
          let temp = {
            id: v.id,
            name: v.name,
            status: v.status,
            //available: firstData.available,
            statusName: v.statusName,
            capacity: v.capacity
          };

          allResult.push(temp);

          if (v.status === "available") {
            finalResult.push(temp);
            if (this.state.savedTableId === v.id) {
              selectedTableData = temp;
            }
          } else if (this.state.savedTableId === v.id) {
            finalResult.push(temp);
            selectedTableData = temp;
          }
        });

        //console.log("getDATATABLE finalResult ==> ", finalResult);

        OfflineMenuFunctions.SaveTableData(finalResult, x => {});

        OfflineMenuFunctions.GetTableData(item => {
          //console.log("GetTableData 1st ==> ", item);
          let temp_items = [];

          // resultData.map((v, i) => {
          //   let temp_data = v;
          //   if (i === 1) {
          //     temp_data.status = "used";
          //   }
          //   if (i === 2) {
          //     temp_data.status = "used";
          //   }

          //   temp_items.push(temp_data);
          // });

          // OfflineMenuFunctions.SaveTableData(temp_items, x => {});

          // OfflineMenuFunctions.GetTableData(item2 => {
          //   console.log("GetTableData 2nd ==> ", item2);
          // });

          //this.setState({ lastUpdate: val });
        });

        if (finalResult.length > 0) {
          this.setState({
            additionalTable: finalResult,
            selectedTable: selectedTableData
              ? selectedTableData
              : finalResult[0]
          });
        } else {
          this.setState({
            additionalTable: finalResult,
            selectedTable: { id: 0, name: "No Available Table" }
          });
        }

        //console.log('new data ==>', JSON.stringify(data))
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
      });
  }

  getData(
    search = this.state.searchKey,
    activeCategory = this.state.activeCategory
  ) {
    //console.log("userInfo ==> ", this.state.userInfo);
    //console.log("userInfo props ==> ", this.props.userInfo);
    this.setState({ loading: true });

    const gerai_id = this.state.userInfo.gerai_id;

    const is_favorite = activeCategory === 0 ? "&is_favorite=1" : "";
    //let uri = `${GetMenuFavAPI}?gerai_id=${gerai_id}&search=&page=1`;

    let uri = `${BE_Get_Product}?outlet_id=${gerai_id}${is_favorite}&name=${search}&per_page=999&page=1`;
    //console.log("uri get data ==> ", uri);

    NetInfo.fetch().then(state => {
      // console.log("Connection", state);
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);

      if (state.isConnected) {
        fetch(uri, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log("Get PRoduct ==> ", responseJson);

            let result = responseJson;
            let resultData = result;

            if (responseJson.statusCode === 200) {
              this.setState({
                dataMenuFav: resultData.data,
                activeCategory: activeCategory,
                activeCategoryIndex:
                  activeCategory < 1
                    ? activeCategory
                    : this.state.activeCategoryIndex,
                loading: false
              });

              if (this.state.searchKey === "") {
                OfflineMenuFunctions.SaveAllProduct(resultData.data, val => {});
              } else {
                if (resultData.data.length === 1) {
                  const data = resultData.data[0];
                  this.showFormItemUpdate(data, data.price, "edit");
                }
              }
            } else {
              OfflineMenuFunctions.SaveAllProduct([], val => {});

              this.setState({
                dataMenuFav: [],
                activeCategory: activeCategory,
                activeCategoryIndex:
                  activeCategory < 1
                    ? activeCategory
                    : this.state.activeCategoryIndex,
                loading: false
              });
            }

            if (responseJson.statusCode === 403) {
              this.logoutAction();
            }
            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {});
      } else {
        if (activeCategory === -1) {
          OfflineMenuFunctions.GetAllMenu(val => {
            console.log("getAllMenu Offline ==> ", val);
            //this.setState({ lastUpdate: val });
            if (val) {
              this.setState({
                dataMenuFav: val,
                activeCategory: activeCategory,
                activeCategoryIndex: -1,
                loading: false
              });
            }
          });
        } else if (activeCategory === 0) {
          OfflineMenuFunctions.GetFavMenu(val => {
            //console.log("GetFavMenu Offline ==> ", val);
            //this.setState({ lastUpdate: val });
            if (val) {
              this.setState({
                dataMenuFav: val,
                activeCategory: activeCategory,
                activeCategoryIndex: 0,
                loading: false
              });
            }
          });
        }
      }
    });

    // NetInfo.fetch().then(state => {
    //   if (state.isConnected) {
    //   } else {
    //   }
    // });
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

    // if (this.state.productStock !== "" && this.state.productStock >= 0) {
    //   formdata.append("stock", this.state.productStock);
    //   formdata.append("has_stock", "true");
    // } else {
    //   formdata.append("stock", 0);
    //   formdata.append("has_stock", "true");
    // }


    if (this.state.product_has_stock === 1) {
      formdata.append("has_stock", "true");
      if (this.state.productStock !== "" && this.state.productStock >= 0) {
        formdata.append("stock", this.state.productStock);
      } else {
        formdata.append("stock", 0);
      }

    } else {
      formdata.append("has_stock", "false");
      formdata.append("stock", 0);
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
    //formdata.append("has_stock", "true");

    if (this.state.product_has_stock === 1) {
      formdata.append("has_stock", "true");
      if (this.state.productStock !== "" && this.state.productStock >= 0) {
        formdata.append("stock", this.state.productStock);
      } else {
        formdata.append("stock", 0);
      }

    } else {
      formdata.append("has_stock", "false");
      formdata.append("stock", 0);
    }

    formdata.append("unit_id", this.state.productUnit);
    formdata.append("stock_id", this.state.productStockId);

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

  getDataCategory(search = this.state.searchKey) {
    const gerai_id = this.state.userInfo.gerai_id;
    const retail_id = this.state.userInfo.retail_id;

    // let uri = `${GetCategoryMenuAPI}?gerai_id=${gerai_id}&search=&page=1`;
    // let uri = `${BE_Get_Product_Category}?outlet_id=${gerai_id}&search=&page=1`;
    // let uri = `${BE_Get_Product_Category}/lite?business_id=${retail_id}&outlet_id=${gerai_id}&status=active&search=&page=1`; //lite version
    // let uri = `${BE_Get_Product_Category}?business_id=${retail_id}&outlet_id=${gerai_id}&status=active&search=&page=1`;

    let uri = `${BE_Get_Product_Category}/lite?business_id=${retail_id}&outlet_id=${gerai_id}&status=active&search=&page=1`; //lite version


    let very_lite_uri = `${BE_Get_Product_Category}/very-lite?business_id=${retail_id}&outlet_id=${gerai_id}&status=active&search=&page=1`; //lite version


    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result;

            if (result.statusCode === 200) {
              const data_temp = resultData.data;

              // console.log("DATA CAT PRODUK ====> ", data_temp)
              let data_category = [];
              let data_category_all = [];

              data_temp.map((v, i) => {
                if (v.Products.length > 0) {
                  data_category.push(v);
                }

                data_category_all.push(v);
              });

              this.setState({
                dataCategory: data_category,
                // dataCategoryAll: data_category_all,

                //categoryTotal: resultData.pagination.total_records
                categoryTotal: data_category.length
              });
            } else {
              this.setState({
                dataCategory: [],
                // dataCategoryAll: [],
                //categoryTotal: resultData.pagination.total_records
                categoryTotal: 0
              });
            }

            //console.log("getData Category ==> ", data_category);

            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {});


          fetch(very_lite_uri, {
            method: "GET",
            headers: {
              Authorization: this.state.auth
            }
          })
            .then(response => response.json())
            .then(responseJson => {
              let result = responseJson;
              let resultData = result;
  
              if (result.statusCode === 200) {
                const data_temp = resultData.data;
  
                console.log("DATA CAT PRODUK VERY LITE ====> ", data_temp)
                let data_category = [];
                let data_category_all = [];
  
                data_temp.map((v, i) => {  
                  data_category_all.push(v);
                });
  
                this.setState({
                  // dataCategory: data_category,
                  dataCategoryAll: data_category_all,
  
                  //categoryTotal: resultData.pagination.total_records
                  // categoryTotal: data_category.length
                });
              } else {
                this.setState({
                  // dataCategory: [],
                  dataCategoryAll: [],
                  //categoryTotal: resultData.pagination.total_records
                  // categoryTotal: 0
                });
              }
  
              //console.log("getData Category ==> ", data_category);
  
              //console.log('new data ==>', JSON.stringify(data))
            })
            .catch(_err => {});



      } else {
        OfflineMenuFunctions.GetCategoryMenu(val => {
          //console.log("GetCategoryMenu Offline ==> ", val);
          //this.setState({ lastUpdate: val });
          if (val) {
            this.setState({
              dataCategory: val,
              categoryTotal: val.length
            });
          }
        });
      }
    });
  }


  getMenuByCategory(
    search = this.state.searchKey,
    activeCategory = this.state.activeCategory,
    activeCategoryIndex = this.state.activeCategoryIndex
  ) {
    const gerai_id = this.state.userInfo.gerai_id;
    //let uri = `${GetMenuByCategoryAPI}?gerai_id=${gerai_id}&category_id=${activeCategory}&search=&page=1`;

    let uri = `${BE_Get_Product}?outlet_id=${gerai_id}&product_category_id=${activeCategory}&name=${search}&page=1`;
    console.log("getMenuByCategory ===> ", uri);

    console.log("activeCategoryIndex ===> ", activeCategoryIndex);

    this.setState({
      loading: true
    });

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetch(uri, {
          method: "GET",
          headers: {
            Authorization: this.state.auth
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            let result = responseJson;
            let resultData = result;
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            console.log("getMenuByCategory ==> ", resultData);
            this.setState({
              dataMenuFav: resultData.data,
              dataMenu: resultData.data,
              activeCategory: activeCategory,
              activeCategoryIndex: activeCategoryIndex,
              loading: false
            });
            //console.log('new data ==>', JSON.stringify(data))
          })
          .catch(_err => {});
      } else {
        //console.log("getMenuByCategory Offline");

        const all_menu = this.state.dataOfflineMenu;

        console.log("getMenuByCategory Offline ==> ", all_menu);

        console.log(
          "getMenuByCategory Offline activeCategory ==> ",
          activeCategory
        );

        let temp_menu = [];

        all_menu.map((v, i) => {
          if (v.product_category_id.toString() === activeCategory.toString()) {
            //console.log('is Single ==> ', v.options[0]);
            temp_menu.push(v);
          }
        });

        // console.log("getMenuByCategory Offline ==> ", all_menu);

        // console.log("getMenuByCategory Offline ==> ", temp_menu);
        this.setState({
          dataMenuFav: temp_menu,
          dataMenu: temp_menu,
          activeCategory: activeCategory,
          activeCategoryIndex: activeCategoryIndex,
          loading: false
        });
      }
    });
  }

  getAddonsByMenu(data = this.state.selectedProduct, action = "add") {
    //id = 1;
    //let uri = `${GetMenuAddonsAPI}?id=${id}`;

    let all_addons = data.Group_Addons;

    // if (action = "edit")

    console.log("Get Addons Offline ==> ", all_addons);
    console.log("Data ===> ", data);
    let temp_addons = [];

    // all_addons.map((val, index) => {
    //   //console.log("Get Addons Offline v ==> ", v);

    //   val.map((v, i) => {
    //     //if (v.menu_id.toString() === id.toString()) {
    //     temp_addons.push(v);
    //     //}
    //   });
    //   // if (v.menu_id.toString() === id.toString()) {
    //   //   temp_addons.push(v);
    //   // }
    // });

    //console.log("Get Addons temp ==> ", temp_addons);

    let defaultProductSelection = [];
    all_addons.map((v, i) => {
      console.log("Get Addons All Addons ==> ", v);
      if (v.type === "single") {
        //console.log('is Single ==> ', v.options[0]);

        let firstData = v.Addons[0];
        let temp = {
          id: firstData.id,
          name: firstData.name,
          price: firstData.price,
          //available: firstData.available,
          parentId: v.id,
          status: v.status
        };
        defaultProductSelection.push(temp);
      }
    });

    if (action === "add") {
      this.setState({
        additionalList: all_addons,
        additionalProduct: defaultProductSelection,
        loading: false
      });
    } else {
      this.setState({
        additionalList: all_addons,
        loading: false
      });
    }

    // this.setState({
    //   additionalList: temp_addons,
    //   loading: false
    // });
  }

  selectDefaultSelection() {
    let defaultProductSelection = [];
    this.state.additionalList.map((v, i) => {
      if (v.type === "single") {
        //console.log('is Single ==> ', v.options[0]);

        let firstData = v.Addons[0];
        let temp = {
          id: firstData.id,
          name: firstData.name,
          price: firstData.price,
          //available: firstData.available,
          parentId: v.id
        };
        defaultProductSelection.push(temp);
      }
    });
    this.setState({ additionalProduct: defaultProductSelection });
  }

  cancelFormItem() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (this.state.formAction === "edit") {
      MenuFunctions.GetMenu(val => {
        if (val) {
          console.log("Data Bill ==> ", val);
          this.setState({ dataBill: val, formItem: false, showBill: true });
        }
      });
    } else {
      this.setState({ formItem: false });
    }
  }

  addNewName() {
    this.setState({ newName: "", showNameForm: true });
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

  deleteBill(index) {
    let { dataBill } = this.state;

    console.log("index ", index);
    console.log("before delete ", dataBill);

    this.setState({ loading: true });
    setTimeout(() => {
      dataBill.splice(index, 1);
      console.log("after delete ", dataBill);
      let tempData = [];
      MenuFunctions.SaveMenu(dataBill, val => {
        //console.log("Sukses Delete");
        //tempData = val;
        console.log("delete ==> ", val);
        this.setState({ dataBill: val, showBill: false });

        this.setState({ showBill: true, loading: false });
      });
    }, 100);

    // setTimeout(() => {
    //   this.setState({ showBill: true, loading: false });
    // }, 150);
  }

  modifyBillChangeGojek(type, oldtype) {
    let { dataBill, salesTypeTax, additionalSalesType } = this.state;

    //console.log("additionalSalesType ==> ", additionalSalesType);

    let additional_charge = 0;
    //console.log("type ===> ", type.toString());

    let selected_new = {};
    additionalSalesType.map((v, i) => {
      if (v.id.toString() === type.toString()) {
        selected_new = v;
      }
    });

    // console.log("selected_new ==> ", selected_new);
    // console.log("change sales type ==> ", dataBill);

    dataBill.map((v, i) => {
      let tempData = dataBill[i];
      // console.log("tempData ==> ", tempData);
      // console.log("additional charge ==> ", additional_charge);
      // console.log("type ==> ", type);

      let salesTypeValue = v.salesTypeValue;
      let salesType = v.salesType;

      if (selected_new.charge > 0) {
        tempData.salesType = type;

        tempData.salesTypeValue = v.price * (selected_new.charge / 100);
        tempData.salesTypeName = selected_new.name;
        tempData.total =
          (v.price + v.price * (selected_new.charge / 100)) * v.qty;
      } else if (selected_new.charge === 0) {
        tempData.salesType = type;
        tempData.salesTypeValue = 0;
        tempData.salesTypeName = selected_new.name;
        tempData.total = v.total - salesTypeValue;
      }

      dataBill[i] = tempData;

      //console.log("tempData after ==> ", tempData);
    });

    //console.log("dataBill after ==> ", dataBill);

    MenuFunctions.SaveMenu(dataBill, val => {});

    this.setState({
      //selectedTable: items.name,
      dataBill: dataBill,
      selectedSalesType: type,
      showAdditionalSalesType: false,
      salesTypeName: selected_new.name
    });

    // if (type === "Gojek/Grab") {
    //   console.log("change to GOJEK ==> ", dataBill);
    //   dataBill.map((v, i) => {
    //     let tempData = dataBill[i];
    //     console.log("tempData ==> ", tempData);
    //     let salesTypeValue = v.salesTypeValue;
    //     let salesType = v.salesType;
    //     if (salesType !== "Gojek/Grab") {
    //       tempData.salesType = type;
    //       tempData.salesTypeValue = v.price * salesTypeTax;
    //     }
    //     dataBill[i] = tempData;
    //   });

    //   MenuFunctions.SaveMenu(dataBill, val => {});

    //   this.setState({
    //     //selectedTable: items.name,
    //     dataBill: dataBill,
    //     selectedSalesType: type,
    //     showAdditionalSalesType: false
    //   });
    // } else if (type !== "Gojek/Grab" && oldtype === "Gojek/Grab") {
    //   console.log("change to Non GOJEK dari Gojek ==> ", dataBill);

    //   dataBill.map((v, i) => {
    //     let tempData = dataBill[i];
    //     console.log("tempData ==> ", tempData);
    //     let salesTypeValue = v.salesTypeValue;
    //     let salesType = v.salesType;
    //     if (salesType === "Gojek/Grab") {
    //       tempData.salesType = type;
    //       tempData.salesTypeValue = 0;
    //     }
    //     dataBill[i] = tempData;
    //   });
    //   MenuFunctions.SaveMenu(dataBill, val => {});

    //   this.setState({
    //     //selectedTable: items.name,
    //     dataBill: dataBill,
    //     selectedSalesType: type,
    //     showAdditionalSalesType: false
    //   });
    // } else if (type === oldtype) {
    //   //do nothing
    //   console.log("change to Same ==> ", dataBill);

    //   //MenuFunctions.SaveMenu(dataBill, val => {});
    //   this.setState({
    //     //selectedTable: items.name,
    //     //dataBill: dataBill,
    //     selectedSalesType: type,
    //     showAdditionalSalesType: false
    //   });
    // } else {
    //   //MenuFunctions.SaveMenu(dataBill, val => {});
    //   console.log("change to Else ==> ", type);
    //   console.log("from ==> ", oldtype);

    //   dataBill.map((v, i) => {
    //     let tempData = dataBill[i];
    //     console.log("tempData ==> ", tempData);
    //     tempData.salesType = type;
    //     tempData.salesTypeValue = 0;
    //     dataBill[i] = tempData;
    //   });

    //   //console.log("databillNew ==> ", dataBill);

    //   MenuFunctions.SaveMenu(dataBill, val => {});

    //   this.setState({
    //     //selectedTable: items.name,
    //     dataBill: dataBill,
    //     selectedSalesType: type,
    //     showAdditionalSalesType: false
    //   });
    // }
  }

  showFormItemNew() {
    this.setState({
      image: null,
      formItem: true,
      selectedProduct: {},
      formAction: "add",
      loading: false,
      productId: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productCategoryId: "",
      productTaxId: 1,
      productTypeId: 2,
      productStatus: "active",
      productImage: "", //Upload?,
      productSKU: "",
      productBarcode: "",
      productStock: 0,
      productUnit: null,
      productStockId: null
      //additionalProduct: defaultProductSelection
    });
  }

  showFormItemUpdate(product, price, action = "edit") {
    this.setState({ loading: true });
    console.log("Data ===> ", product);
    let temp_addons = [];
    let defaultProductSelection = [];

    let stocks = [];
    let initial_stock_id = null;

    if (product.Stocks) {
      if (product.Stocks.length > 0) {
        stocks = product.Stocks;
      }
    }

    if (stocks.length > 0) {
      stocks.map((v, i) => {
        if (v.is_initial) {
          initial_stock_id = v.id;
        }
      });
    }

    console.log("Data initial_stock_id ===> ", initial_stock_id);

    this.setState({
      formItem: true,
      image: null,
      selectedProduct: product,
      formAction: action,
      selectedQuantity: 1,
      selectedCatatan: "",
      loading: false,
      productId: product.id,
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price.toString(),
      productCategoryId: product.product_category_id,
      productTaxId: product.product_tax_id,
      productTypeId: product.product_type_id,
      productStatus: product.status,
      productImage: product.image ? product.image : "", //Upload?,
      productSKU: product.sku ? product.sku : "",
      productBarcode: product.barcode ? product.barcode : "",
      product_is_favorite: product.is_favorite ? 1 : 0,
      product_has_stock: product.has_stock ? 1 : 0,
      productStock: product.stock,
      productUnit: product.unit_id,
      productStockId: initial_stock_id
      //additionalProduct: defaultProductSelection
    });
  }

  changeQty(index, val = 1) {
    let { dataBill } = this.state;
    let tempData = dataBill[index];
    console.log("tempData change qty ==> ", tempData);
    tempData.qty = tempData.qty + val;
    tempData.total =
      (parseInt(tempData.price) + parseInt(tempData.salesTypeValue)) *
      parseInt(tempData.qty);
    ///TESTING UBAH HARGA
    dataBill[index] = tempData;

    if (tempData.qty > 0) {
      MenuFunctions.SaveMenu(dataBill, val => {
        console.log("Sukses Change QTY");
      });
      this.setState({ dataBill: dataBill });
    } else {
      this.deleteBill(index);
    }
  }

  changeTotal(index, value) {
    let { dataBill } = this.state;
    let tempData = dataBill[index];
    tempData.total = value;
    dataBill[index] = tempData;
    MenuFunctions.SaveMenu(dataBill, val => {
      console.log("Sukses Change Price");
    });
    this.setState({ dataBill: dataBill });
  }

  changeChecklistNego(index, value) {
    let { dataBill } = this.state;
    let tempData = dataBill[index];
    tempData.nego = !value;

    if (!value === false) {
      tempData.total = tempData.price * tempData.qty;
    }

    dataBill[index] = tempData;
    MenuFunctions.SaveMenu(dataBill, val => {
      console.log("Sukses Change QTY");
    });
    this.setState({ dataBill: dataBill });
  }

  changeQtyProduct(val = 1) {
    let { selectedQuantity } = this.state;
    let newQty = selectedQuantity + val;
    if (newQty > 0) {
      this.setState({ selectedQuantity: newQty });
    }
  }

  _renderFooter() {
    return <View style={{ height: 50 }} />;
  }

  handleLoadMore() {}

  renderKategoriTop(data, index) {
    //console.log("renderKategoriTop ==> ", data);

    const { showFilter } = this.state;

    return (
      <Button
        onPress={() => {
          this.getMenuByCategory("", data.id, index + 1);
          // LayoutAnimation.configureNext(
          //   LayoutAnimation.Presets.easeInEaseOut
          // );
          //this.changeDateToday();
        }}
        style={{
          marginTop: 0,
          //width: "100%",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
          paddingBottom:
            this.state.activeCategory === data.id && !showFilter ? 5 : 10,
          borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
          borderBottomWidth:
            this.state.activeCategory === data.id && !showFilter ? 5 : 0
          //alignItems: 'center',
        }}
      >
        <Text
          style={[
            MainStyle.robotoNormalBold,
            {
              fontSize: 12,
              color:
                this.state.activeCategory === data.id && !showFilter
                  ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  : BLACK
            }
          ]}
        >
          {data.name}
        </Text>
      </Button>
    );
  }

  downButtonHandler = new_index => {
    let activeCategory = new_index;

    const { categoryTotal } = this.state;

    let x_pos = 0;

    //console.log("downButtonHandler new_index ==> ", new_index);
    //console.log("downButtonHandler x_pos ==> ", x_pos);

    if (activeCategory === categoryTotal) {
      activeCategory = activeCategory - 1;
    }

    x_pos = this.arrLoc[activeCategory];

    if (activeCategory === -1) {
      activeCategory = -1;
      x_pos = 0;
      //alert("back to fav");
    }

    if (this.arrLoc.length >= activeCategory) {
      // To Scroll to the index 5 element
      this.scrollview_ref.scrollTo({
        x: x_pos,
        y: 0,
        animated: true
      });
    } else {
      //alert('Out of Max Index');
    }
  };

  renderSearch() {
    return (
      <View
        style={{
          marginBottom: 10,
          marginTop: 0,
          //flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: WHITE,
          paddingRight: 0,
          paddingLeft: 0
          //width: "200%"
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicato={false}
          horizontal={true}
          ref={ref => {
            this.scrollview_ref = ref;
          }}
          style={
            {
              //flex: 1
            }
          }
        >
          {/* <Button
            style={{ justifyContent: "center" }}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this.setState({ showFilter: !this.state.showFilter });
            }}
          >
            <Ionicons
              name={"md-search"}
              style={{
                padding: 0,
                fontSize: 20,
                color: this.state.showFilter
                  ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                  : "#C4C4C4"
              }}
            />
          </Button> */}
          <Button
            onPress={() => {
              this.getData("", -1);

              // LayoutAnimation.configureNext(
              //   LayoutAnimation.Presets.easeInEaseOut
              // );
              //this.changeDateToday();
            }}
            style={{
              marginTop: 0,
              //width: "100%",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 10,
              paddingBottom:
                this.state.activeCategory === -1 && !this.state.showFilter
                  ? 5
                  : 10,
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderBottomWidth:
                this.state.activeCategory === -1 && !this.state.showFilter
                  ? 5
                  : 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color:
                    this.state.activeCategory === -1 && !this.state.showFilter
                      ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      : BLACK
                }
              ]}
            >
              {_menu_all_short[this.state.languageIndex]}
            </Text>
          </Button>

          <Button
            onPress={() => {
              this.getData("", 0);

              // LayoutAnimation.configureNext(
              //   LayoutAnimation.Presets.easeInEaseOut
              // );
              //this.changeDateToday();
            }}
            style={{
              marginTop: 0,
              //width: "100%",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 10,
              paddingBottom:
                this.state.activeCategory === 0 && !this.state.showFilter
                  ? 5
                  : 10,
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderBottomWidth:
                this.state.activeCategory === 0 && !this.state.showFilter
                  ? 5
                  : 0
              //alignItems: 'center',
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                {
                  fontSize: 12,
                  color:
                    this.state.activeCategory === 0 && !this.state.showFilter
                      ? MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                      : BLACK
                }
              ]}
            >
              {_menu_favorit_short[this.state.languageIndex]}
            </Text>
          </Button>
          {this.state.dataCategory.map((items, itemIndex) => {
            return (
              <View
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  this.arrLoc[itemIndex] = layout.x;
                  // console.log('height:', layout.height);
                  // console.log('width:', layout.width);
                  // console.log('x:', layout.x);
                  // console.log('y:', layout.y);
                }}
              >
                {this.renderKategoriTop(items, itemIndex)}
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            marginTop: 10,
            marginLeft: 5,
            marginRight: 5,
            display: this.state.showFilter ? "flex" : "flex"
            //display: "flex"
          }}
        >
          <View style={{}}>
            <TextInput
              style={{
                //backgroundColor: 'transparent',
                backgroundColor: "rgba(246, 246, 246, 0.95)",
                borderRadius: 5,
                padding: 5,
                paddingLeft: 45,
                paddingRight: 15,
                color: BLACK,
                fontSize: 12,
                fontFamily: "DMSans-Bold"
              }}
              type="text"
              refx={q => {
                this._notes = q;
              }}
              onSubmitEditing={() => {
                //this.getData(this.state.notes);
                // this.setState({viewSearch: false});
                this.getData(this.state.searchKey);
              }}
              //onChangeText={(q)=>this._accountUpdate('username',q)}
              onChangeText={v => this.setState({ searchKey: v })}
              value={this.state.searchKey}
              // autoFocus={true}
              // showSoftInputOnFocus={this.state.showFilter ? true : false}
              showSoftInputOnFocus={true}

              placeholder={""}
            />
            <Button
              style={{ position: "absolute", left: 10, top: 10 }}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({
                  showFilter: !this.state.showFilter,
                  searchKey: ""
                });

                //this._search.focus();
              }}
            >
              <MaterialCommunityIcons
                name={this.state.showFilter ? "keyboard" : "barcode-scan"}
                style={{
                  alignSelf: "center",
                  fontSize: 25
                }}
                color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
              />
            </Button>

            <Button
              style={{ position: "absolute", right: 33, top: 5 }}
              onPress={() => {
                this.showCamera(3);
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
            <Button
              style={{ position: "absolute", right: 10, top: 5 }}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
                this.setState({ showFilter: false, searchKey: "" });

                //this.getMenuByCategory();
                this.getData();
              }}
            >
              <Ionicons
                // name={"ios-close-circle-outline"}
                name={"md-close"}
                size={25}
                color={BLACK}
              />
            </Button>
          </View>
        </View>
      </View>
    );
  }

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

  renderFav(data, i) {
    return (
      <Button
        onPress={() => {
          this.showFormItemUpdate(data, "edit");
        }}
        style={{
          borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
          borderWidth: 0,
          borderRadius: 10,
          elevation: 1,
          backgroundColor: "#EEE"
        }}
      >
        <View style={{ margin: 15, flexDirection: "row" }}>
          <View style={{ width: "75%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.state.currency}{" "}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.idrNumToStr(data.price)}
            </Text>
          </View>
        </View>
      </Button>
    );
  }

  renderDetail(data, i) {
    return (
      <Button
        onPress={() => {
          // this.setState({
          //
          //   selectedProduct: data,
          //   productPrice: data.price
          // });
          this.showFormItem(data, data.price, "add");
        }}
        style={{
          borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
          borderRadius: 10,
          elevation: 1,
          backgroundColor: "#EEE"
        }}
      >
        <View style={{ margin: 15, flexDirection: "row" }}>
          <View style={{ width: "75%" }}>
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.state.currency}{" "}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              alignSelf: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 10, color: BLACK }
              ]}
            >
              {this.idrNumToStr(data.price)}
            </Text>
          </View>
        </View>
      </Button>
    );
  }

  renderAllCategory(data, i) {
    return (
      <View>
        <View
          style={{
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 10,
            elevation: 1,
            backgroundColor: WHITE
          }}
        >
          <Button
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              let activeCategory =
                this.state.activeCategory === data.id ? 0 : data.id;

              this.getMenuByCategory("", activeCategory, i);

              //this.setState({activeCategoryIndex : i})
              //this.setState({ activeCategory: activeCategory });
            }}
          >
            <View style={{ margin: 15, flexDirection: "row" }}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    { fontSize: 14, color: BLACK }
                  ]}
                >
                  {data.name}
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  alignSelf: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                {this.state.activeCategory === data.id ? (
                  <Entypo
                    name={"chevron-up"}
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: BLACK
                    }}
                  />
                ) : (
                  <Entypo
                    name={"chevron-down"}
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      color: BLACK
                    }}
                  />
                )}
              </View>
            </View>
          </Button>
        </View>
        {/* If Active */}
        {this.state.activeCategory === data.id ? (
          <View>
            <FlatList
              //ListHeaderComponent={this.renderSearch()}
              showsVerticalScrollIndicator={false}
              data={this.state.dataMenu}
              renderItem={({ item, index }) => {
                if (this.state.ready === true) {
                  return (
                    <View
                      style={{
                        marginLeft: 0,
                        marginTop: 0,
                        marginBottom: 3,
                        marginRight: 0,
                        borderColor: MAIN_THEME_COLOR_SELECT(
                          this.state.colorIndex
                        )
                      }}
                    >
                      {this.renderDetail(item, index)}
                    </View>
                  );
                } else {
                  return <View />;
                }
              }}
              //ListFooterComponent={this._renderFooter}
              keyExtractor={(item, index) => {
                return "CategoryRenderChild" + index.toString();
              }}
              onRefresh={this._onRefresh}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={0.5}
              //refreshing={refreshing}
            />
            {this.state.dataMenu.length === 0 ? (
              <View
                style={{
                  marginLeft: 0,
                  marginTop: 0,
                  marginBottom: 3,
                  marginRight: 0,
                  borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  backgroundColor: "#EEE",
                  borderRadius: 10
                }}
              >
                <View
                  style={{
                    margin: 15,
                    flexDirection: "row"
                  }}
                >
                  <View style={{ width: "80%" }}>
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 10, color: BLACK }
                      ]}
                    >
                      Menu tidak tersedia
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }

  editOrderForm(data, index) {
    const detail = data.detail;
    console.log("DATA ==> ", data);
    console.log("DETAIL ==> ", detail);
    console.log("INDEX ==> ", index);

    //this.getAddonsByMenu(data.product, "edit");

    let data_product = data.product;
    data_product.product_id = data.product_id;

    this.setState({
      showBill: false,
      formAction: "edit",
      formIndex: index,
      formItem: true,
      productPrice: data.price,
      selectedProduct: data.product,
      selectedCatatan: data.notes,
      selectedQuantity: data.qty,
      additionalProduct: detail,
      formSalesType: data.salesType,
      salesTypeValue: data.salesTypeValue
    });
  }

  renderBill(data, i) {
    let detail = data.detail;
    let detailString = "";
    let image = "";
    if (data.product.image) {
      image = data.product.image;
    }

    if (data.image) {
      image = data.product.image;
    }

    //let total = data.qty * data.price + data.qty * data.salesTypeValue;

    let total = data.total;

    // let subTotal = this.state.subTotal;
    // subTotal = subTotal + total;
    // this.setState({subTotal: subTotal});

    detail.map((items, itemIndex) => {
      if (detailString === "") {
        detailString = items.name;
      } else {
        detailString = detailString + ", " + items.name;
      }
    });

    let width = Dimensions.get("window").width - 30;

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            width: this.state.tablet ? (width - 30) / 2 : width,
            //width: "120%",
            //width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
            //paddingBottom: 10,
            paddingBottom: 15,
            minHeight: 40,
            borderColor: "#C8C7CC",
            //borderColor: BLACK,
            borderBottomWidth: 1,
            marginRight: 25
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              width: "10%",
              flexDirection: "row",
              display: "none"
            }}
          >
            <Button
              onPress={() => {
                this.deleteBill(i);
                //this.changeQty(i);
              }}
            >
              <Entypo
                name={"circle-with-cross"}
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  color: RED_500
                }}
              />
            </Button>

            <Button
              onPress={() => {
                //this.deleteBill(i);
                //this.changeQty(i);
                this.editOrderForm(data, i);
              }}
            >
              <Entypo
                name={"edit"}
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  color: BLACK
                }}
              />
            </Button>
          </View>
          <Button
            onPress={() => {
              this.editOrderForm(data, i);
            }}
            style={{ borderRadius: 15 }}
          >
            <Image
              resizeMethod="resize"
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                overflow: "hidden"
                //alignSelf: "center"
                //backgroundColor: "#888"
              }}
              resizeMode={"stretch"}
              source={{ uri: BE_URI + image }}
            />
          </Button>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              width: "30%"
            }}
          >
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 15, color: BLACK }]}
            >
              {data.name}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              {detailString}
            </Text>

            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              {data.salesTypeName}
            </Text>
            <Text
              style={[MainStyle.robotoNormal, { fontSize: 10, color: BLACK }]}
            >
              {_catatan[this.state.languageIndex]}:{" "}
              {data.notes !== "" ? data.notes : "-"}
            </Text>
            <View
              style={{
                flex: 1,
                //alignItems: "flex-end",
                alignContent: "flex-end",
                display: this.state.access_change_product_price
                  ? "flex"
                  : "none",
                //justifyContent: "flex-end",
                //justifyContent: "center",
                //backgroundColor: "#BCA",
                width: "100%",
                marginTop: 10,
                flexDirection: "row"
              }}
            >
              <Checkbox
                color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                checked={data.nego}
                action={() => {
                  //ganti checklist Nego
                  this.changeChecklistNego(i, data.nego);
                }}
              />
              <Text
                style={[
                  MainStyle.robotoNormal,
                  { fontSize: 10, color: BLACK, alignSelf: "center" }
                ]}
              >
                {_ubah_harga[this.state.languageIndex]}
              </Text>
            </View>
          </View>
          <View style={{ width: "30%" }}>
            <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderRadius: 15,
                  //flex: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }}
              >
                <Button
                  onPress={() => {
                    this.changeQty(i, -1);
                    //this.changeQty(i);
                  }}
                >
                  <AntDesign
                    name={"minus"}
                    style={{
                      alignSelf: "center",
                      fontSize: 20,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    }}
                  />
                </Button>
                <View
                  style={{ width: "45%", marginRight: 5, alignItems: "center" }}
                >
                  <Text
                    style={[
                      MainStyle.robotoNormal,
                      {
                        fontSize: 15,
                        color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                      }
                    ]}
                  >
                    {data.qty}
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    this.changeQty(i, 1);
                    //this.changeQty(i);
                  }}
                >
                  <AntDesign
                    name={"plus"}
                    style={{
                      alignSelf: "center",
                      fontSize: 20,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    }}
                  />
                </Button>
              </View>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                alignContent: "center",
                //justifyContent: 'flex-end',
                justifyContent: "center",
                width: "100%",
                marginTop: 10
              }}
            >
              {data.nego ? (
                <TextInput
                  style={{
                    //backgroundColor: 'transparent',
                    width: "100%",
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    borderRadius: 5,
                    paddingTop: -5,
                    paddingBottom: -5,
                    //padding: 5,
                    //paddingLeft: 15,
                    //paddingRight: 15,
                    textAlign: "right",
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                    fontSize: 15,
                    fontFamily: "DMSans-Bold"
                  }}
                  keyboardType="numeric"
                  type="text"
                  refx={q => {
                    //this._notes = q;
                  }}
                  onSubmitEditing={() => {
                    //this.getData(this.state.notes);
                    // this.setState({viewSearch: false});
                    //this.searchMenu(this.state.searchKey);
                    //this.getData(this.state.searchKey);
                  }}
                  //onChangeText={(q)=>this._accountUpdate('username',q)}
                  onChangeText={v => {
                    //this.setState({ searchKey: v })
                    this.changeTotal(i, v);
                  }}
                  value={total.toString()}
                  placeholder={""}
                />
              ) : (
                <Text
                  style={[
                    MainStyle.robotoNormal,
                    { fontSize: 15, color: BLACK }
                  ]}
                >
                  {this.state.currency} {this.idrNumToStr(total)}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={{ width: 100 }}>
          <Button
            style={{
              backgroundColor: RED_500,
              flex: 1
              // alignItems: "center",
            }}
            onPress={() => {
              this.deleteBill(i);
              //this.changeQty(i);
            }}
          >
            <View
              style={{
                //backgroundColor: "#BCA",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              {/* <Text
                style={[MainStyle.robotoNormal, { fontSize: 15, color: WHITE }]}
              >
                Delete
              </Text> */}
              <Entypo
                name={"trash"}
                style={{
                  // alignSelf: "center",
                  fontSize: 25,
                  color: WHITE
                }}
              />
            </View>
          </Button>
        </View>
      </ScrollView>
    );
  }

  changeAddons(dataOption, dataParent, selected) {
    let {
      additionalProduct,
      productPrice,
      salesTypeValue,
      salesTypeTax,
      formSalesType,
      additionalSalesType
    } = this.state;

    console.log("changeAddons dataOption ==> ", dataOption);
    console.log("changeAddons dataParent ==> ", dataParent);

    let parentId = dataParent.id;
    let type = dataParent.type;
    let optionPertama = dataParent.Addons[0];
    let isFirstOption = dataOption.id === optionPertama.id;

    let temp = {}; //default

    let sales_type = {};
    additionalSalesType.map((v, i) => {
      if (v.id.toString() === formSalesType.toString()) {
        sales_type = v;
      }
    });

    let charge_rate = sales_type.charge;

    //console.log(additionalProduct);
    //console.log("optionPertama ==> ", optionPertama);

    temp = {
      id: dataOption.id,
      name: dataOption.name,
      price: dataOption.price,
      //available: dataOption.available,
      parentId: parentId
    };

    console.log("temp change addons ==> ", temp);

    //let charge = (productPrice * charge_rate) / 100;

    if (selected === true && type === "multi") {
      additionalProduct.map((v, index) => {
        if (v.id === dataOption.id) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - parseFloat(v.price);
        }
      });
    }
    //remove already selected for multi
    // if (isFirstOption && type === "single")
    // {
    //   console.log('test');
    // }
    // else
    if (selected === true && type === "single") {
      additionalProduct.map((v, index) => {
        if (v.id === dataOption.id) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - v.price;

          temp = {
            id: optionPertama.id,
            name: optionPertama.name,
            price: optionPertama.price,
            parentId: parentId
          };

          additionalProduct.push(temp);
          productPrice =
            parseFloat(productPrice) + parseFloat(optionPertama.price);
          //select firstOption
        }
        //delete selected option
      });
    }
    //remove already selected for single

    if (selected === false && type === "multi") {
      additionalProduct.push(temp);
      productPrice = parseFloat(productPrice) + parseFloat(dataOption.price);
    }

    if (selected === false && type === "single") {
      additionalProduct.map((v, index) => {
        if (v.parentId === parentId) {
          additionalProduct.splice(index, 1);
          productPrice = parseFloat(productPrice) - parseFloat(v.price);
        }
      });
      additionalProduct.push(temp);
      productPrice = parseFloat(productPrice) + parseFloat(dataOption.price);
    }
    //add more for multi

    //console.log("additionalProduct ==> ", additionalProduct);

    console.log("Sales Type Value ===> ", formSalesType);
    if (charge_rate > 0) {
      //productPrice = parseFloat(productPrice) + (parseFloat(productPrice) * parseFloat(charge_rate)) / 100;

      salesTypeValue =
        (parseFloat(productPrice) * parseFloat(charge_rate)) / 100;

      //salesTypeValue = productPrice * salesTypeTax;
    } else {
      salesTypeValue = 0;
    }

    if (this.state.formAction === "add") {
      this.setState({
        additionalProduct: additionalProduct,
        productPrice: productPrice,
        salesTypeValue: salesTypeValue
      });
    } else {
      this.setState({
        additionalProduct: additionalProduct,
        productPrice: productPrice,
        salesTypeValue: salesTypeValue
      });
    }

    //this.setState({ selectedQuantity: this.state.selectedQuantity * 2 });
  }

  renderDetailItemSelection(data, i, dataParent) {
    let { additionalProduct } = this.state;
    let { type } = dataParent; //single or multi

    let parentLength = dataParent.Addons.length;

    // console.log("renderDetailItemSelection dataParent ===> ", dataParent);
    // console.log("renderDetailItemSelection data ===> ", data);

    // let width =
    //   type === "single" ? (parentLength === 3 ? "100%" : "100%") : "100%";
    //let width = this.state.tablet ? "49%" : "100%";
    //console.log('additionalProduct ==> ',additionalProduct)
    let bgColor = [
      "#EEEEEE",
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#555555"
    ];
    let textColor = [
      BLACK,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
    ];
    let colorIndex = 0;
    let colorText = 0;
    let selected = false;

    additionalProduct.map((v, index) => {
      if (v.id === data.id) {
        selected = true;
      }
    });

    if (selected === true) {
      colorIndex = 1;
      colorText = 1;
    }

    if (data.available === false) {
      colorIndex = 2;
      colorText = 2;
    }

    return (
      <View
        style={{
          //flex: 1,
          alignItems: "center",
          width: this.state.tablet ? "49%" : "100%",
          marginRight: 1,
          alignContent: "center",
          justifyContent: "center",
          height: 60
          //backgroundColor: '#BCA',
        }}
      >
        <Button
          onPress={() => {
            this.changeAddons(data, dataParent, selected);
          }}
          style={{
            //flexDirection: 'row',
            //width:200,
            //flex:1,
            backgroundColor: bgColor[colorIndex],
            elevation: 2,
            //width: '1%',
            padding: 15,
            width: "100%",
            //borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 1,
            borderRadius: 5,
            alignItems: "center",
            alignContent: "center",
            //justifyContent: "space-between",
            justifyContent: "center",
            flexDirection: "row"
          }}
          disabled={data.available === false ? true : false}
        >
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={{ width: "80%" }}>
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 12,
                    color: textColor[colorText]
                    //width: width,
                    //backgroundColor: '#BCA',
                    //textAlign: "center"
                  }
                ]}
              >
                {data.name}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                width: "20%"
              }}
            >
              <Text
                style={[
                  MainStyle.robotoNormal,
                  {
                    fontSize: 12,
                    color: textColor[colorText],
                    textAlign: "right"
                    //width: width,
                    //backgroundColor: '#BCA',
                    //textAlign: "center"
                  }
                ]}
              >
                {this.idrNumToStr(data.price)}
              </Text>
            </View>
          </View>
        </Button>
      </View>
    );
  }

  renderDetailItem(data, i) {
    let type = data.type;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#99999",
          flex: 1,
          width: "100%",
          minHeight: 100,
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            //backgroundColor: '#BCA',
            width: "100%"
          }}
        >
          <View style={{ margin: 15, flexDirection: "row" }}>
            {/* <FontAwesome
              name={"circle-thin"}
              style={{
                alignSelf: "center",
                fontSize: 15,
                color: BLACK,
                marginRight: 10
              }}
            /> */}
            <Text
              style={[
                MainStyle.robotoNormalBold,
                { fontSize: 12, color: BLACK }
              ]}
            >
              {data.name}
            </Text>
            {data.type === "single" ? (
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 12, color: BLACK }]}
              >
                {" - "}
                {_pilih[this.state.languageIndex]}
              </Text>
            ) : (
              <View />
            )}
          </View>
          <View style={{ flex: 1, width: "100%" }}>
            <View
              style={{
                marginTop: 10,
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 10
              }}
            >
              <View
                style={{
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#C4C4C4",
                  width: "100%",
                  //flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "space-between"
                  //backgroundColor: '#AAA',
                }}
              >
                {this.state.loading === false && type === "single" ? (
                  this.state.tablet ? (
                    <FlatList
                      style={{
                        flex: 1,
                        //backgroundColor: '#BCA',
                        justifyContent: "space-between"
                      }}
                      columnWrapperStyle={{
                        justifyContent: "space-between"
                        //marginBottom: 5,
                        //justifyContent:"center",
                        //marginBottom: 5
                      }}
                      //ListHeaderComponent={this.renderSearch()}
                      showsVerticalScrollIndicator={false}
                      data={data.Addons}
                      renderItem={({ item, index }) => {
                        return this.renderDetailItemSelection(
                          item,
                          index,
                          data
                        );
                      }}
                      //ListFooterComponent={this._renderFooter}
                      numColumns={2}
                      keyExtractor={(item, index) => {
                        return "ListAdditionalSubSingle" + index.toString();
                      }}
                      //onRefresh={this._onRefresh}
                      //onEndReached={this.handleLoadMore}
                      //onEndReachedThreshold={0.5}
                      //refreshing={refreshing}
                    />
                  ) : (
                    <FlatList
                      style={{
                        flex: 1,
                        //backgroundColor: '#BCA',
                        justifyContent: "space-between"
                      }}
                      //ListHeaderComponent={this.renderSearch()}
                      showsVerticalScrollIndicator={false}
                      data={data.Addons}
                      renderItem={({ item, index }) => {
                        return this.renderDetailItemSelection(
                          item,
                          index,
                          data
                        );
                      }}
                      //ListFooterComponent={this._renderFooter}
                      numColumns={1}
                      keyExtractor={(item, index) => {
                        return "ListAdditionalSubSingle" + index.toString();
                      }}
                      //onRefresh={this._onRefresh}
                      //onEndReached={this.handleLoadMore}
                      //onEndReachedThreshold={0.5}
                      //refreshing={refreshing}
                    />
                  )
                ) : this.state.loading === false ? (
                  this.state.tablet ? (
                    <FlatList
                      style={{
                        flex: 1,
                        //backgroundColor: '#BCA',
                        justifyContent: "space-between"
                      }}
                      columnWrapperStyle={{
                        justifyContent: "space-between"
                        //marginBottom: 5,
                        //justifyContent:"center",
                        //marginBottom: 5
                      }}
                      //ListHeaderComponent={this.renderSearch()}
                      showsVerticalScrollIndicator={false}
                      data={data.Addons}
                      renderItem={({ item, index }) => {
                        return this.renderDetailItemSelection(
                          item,
                          index,
                          data
                        );
                      }}
                      //ListFooterComponent={this._renderFooter}
                      numColumns={2}
                      keyExtractor={(item, index) => {
                        return "ListAdditionalSubMulti" + index.toString();
                      }}
                      //onRefresh={this._onRefresh}
                      //onEndReached={this.handleLoadMore}
                      //onEndReachedThreshold={0.5}
                      //refreshing={refreshing}
                    />
                  ) : (
                    <FlatList
                      style={{
                        flex: 1,
                        //backgroundColor: '#BCA',
                        justifyContent: "space-between"
                      }}
                      //ListHeaderComponent={this.renderSearch()}
                      showsVerticalScrollIndicator={false}
                      data={data.Addons}
                      renderItem={({ item, index }) => {
                        return this.renderDetailItemSelection(
                          item,
                          index,
                          data
                        );
                      }}
                      //ListFooterComponent={this._renderFooter}
                      numColumns={1}
                      keyExtractor={(item, index) => {
                        return "ListAdditionalSubMulti" + index.toString();
                      }}
                      //onRefresh={this._onRefresh}
                      //onEndReached={this.handleLoadMore}
                      //onEndReachedThreshold={0.5}
                      //refreshing={refreshing}
                    />
                  )
                ) : (
                  <View />
                )}
              </View>
            </View>
          </View>
        </View>
        {/* Kuantitas */}
      </View>
    );
  }

  formChangeSalesType(type, typeOld) {
    let { productPrice, salesTypeTax, salesTypeValue } = this.state;

    if (type === "Gojek/Grab") {
      salesTypeValue = productPrice * salesTypeTax;
    } else if (type !== "Gojek/Grab" && typeOld === "Gojek/Grab") {
      salesTypeValue = 0;
    }

    this.setState({ formSalesType: type, salesTypeValue: salesTypeValue });
  }

  formChangeSalesType_new(type) {
    let { productPrice, salesTypeTax, salesTypeValue } = this.state;

    let new_id = type.id;

    let charge = (productPrice * type.charge) / 100;

    salesTypeValue = charge;

    // if (type === "Gojek/Grab") {
    //   salesTypeValue = productPrice * salesTypeTax;
    // } else if (type !== "Gojek/Grab" && typeOld === "Gojek/Grab") {
    //   salesTypeValue = 0;
    // }

    this.setState({
      formSalesType: new_id,
      salesTypeValue: salesTypeValue,
      salesTypeName: type.name,
      salesTypeCharge: type.charge
    });
  }

  formInitializeSalesType(productPrice = this.productPrice) {
    const { selectedSalesType, additionalSalesType } = this.state;

    console.log("charge selectedSalesType ===> ", selectedSalesType);

    console.log("charge additionalSalesType ===> ", additionalSalesType);

    console.log("charge productPrice ===> ", productPrice);

    let charge = 0;
    additionalSalesType.map((v, index) => {
      if (parseInt(v.id) === parseInt(selectedSalesType)) {
        console.log("charge id sama ==> ", v);

        charge = (productPrice * v.charge) / 100;
      }
    });

    console.log("charge nambah ===> ", charge);

    this.setState({
      salesTypeValue: charge
    });
  }

  renderSalesTypeSelection_new(data) {
    let { formSalesType, selectedSalesType } = this.state;

    let bgColor = [
      WHITE,
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#EEEEEE"
    ];
    let textColor = [
      BLACK,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      "#DDDDDD"
    ];

    // console.log("selectedSalesType ==> ", selectedSalesType);
    // console.log("formSalesType ==> ", formSalesType);
    // console.log("renderSalesTypeSelection_new ==> ", data);

    return (
      <View
        style={{
          //flex: 0.24,
          alignItems: "center",
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
          height: 60
          //backgroundColor: '#BCA',
          // marginLeft: "0.5%",
          // marginRight: "0.5%"
        }}
      >
        <Button
          onPress={() => {
            //this.setState({ formSalesType: "Take-Away" });
            this.formChangeSalesType_new(data);
          }}
          style={{
            backgroundColor:
              formSalesType.toString() === data.id.toString()
                ? bgColor[1]
                : bgColor[0],
            elevation: 2,
            //width: '1%',
            padding: 15,
            width: "100%",
            borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderWidth: 0,
            borderRadius: 5,
            alignItems: "center",
            alignContent: "center",
            //justifyContent: "space-between",
            justifyContent: "center"
          }}
          //disabled={data.available === false ? true : false}
        >
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color:
                  formSalesType.toString() === data.id.toString()
                    ? textColor[1]
                    : textColor[0],
                //width: width,
                //backgroundColor: '#BCA',
                textAlign: "center"
              }
            ]}
          >
            {data.name}
          </Text>
        </Button>
      </View>
    );
  }

  renderSalesTypeSelection() {
    const { formSalesType, selectedSalesType } = this.state;
    let bgColor = [
      WHITE,
      MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
      "#EEEEEE"
    ];
    let textColor = [
      BLACK,
      MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
      "#DDDDDD"
    ];

    return (
      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Take-Away" });
              this.formChangeSalesType("Take-Away", formSalesType);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Take-Away" ? bgColor[1] : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
            //disabled={data.available === false ? true : false}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Take-Away" ? textColor[1] : textColor[0],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Take-Away
            </Text>
          </Button>
        </View>
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Dine-In" });
              this.formChangeSalesType("Dine-In", formSalesType);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Dine-In"
                  ? bgColor[1]
                  : selectedSalesType !== "Dine-In"
                  ? bgColor[2]
                  : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
            disabled={selectedSalesType === "Dine-In" ? false : true}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Dine-In" ? textColor[1] : textColor[2],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Dine-In
            </Text>
          </Button>
        </View>
        <View
          style={{
            //flex: 0.24,
            alignItems: "center",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            height: 60
            //backgroundColor: '#BCA',
            // marginLeft: "0.5%",
            // marginRight: "0.5%"
          }}
        >
          <Button
            onPress={() => {
              //this.setState({ formSalesType: "Gojek/Grab" });
              this.formChangeSalesType("Gojek/Grab", formSalesType);
            }}
            style={{
              //flexDirection: 'row',
              //width:200,
              //flex:1,
              backgroundColor:
                formSalesType === "Gojek/Grab" ? bgColor[1] : bgColor[0],
              elevation: 2,
              //width: '1%',
              padding: 15,
              width: "100%",
              borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
              borderWidth: 0,
              borderRadius: 5,
              alignItems: "center",
              alignContent: "center",
              //justifyContent: "space-between",
              justifyContent: "center"
            }}
            //disabled={data.available === false ? true : false}
          >
            <Text
              style={[
                MainStyle.robotoNormal,
                {
                  fontSize: 12,
                  color:
                    formSalesType === "Gojek/Grab"
                      ? textColor[1]
                      : textColor[0],
                  //width: width,
                  //backgroundColor: '#BCA',
                  textAlign: "center"
                }
              ]}
            >
              Gojek/Grab
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  showCamera(type) {
    this.setState({ showCamera: true, scanType: type });
  }

  renderFormItemTablet() {
    let title = this.state.selectedProduct.name
      ? this.state.selectedProduct.name
      : _tambah_produk[this.state.languageIndex];

    const outlet_id = this.state.userInfo.gerai_id;
    return (
      <View style={{ flex: 1 }}>
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
            hideOnline={true}
            bgColor={"transparent"}
            textColor={BLACK}
            border={true}
            colorIndex={this.state.colorIndex}
            logoutAction={() => this.logoutAction()}
            title={title}
            notif={false}
            loginInformation={this.state.userInfo}
            menu={false}
            // back={true}
            // backAction={() => {
            //   if (this.state.formAction === "edit") {
            //     this.setState({ formItem: false, showBill: true });
            //   } else {
            //     this.setState({ formItem: false });
            //   }
            // }}
            //harga={harga}
            hideLogin={true}
          />
          <View
            style={{
              flex: 1,
              width: this.state.tablet ? "100%" : "100%",
              flexDirection: "column",
              alignSelf: "center"
            }}
          >
            {/* Header Form */}
            {/* Kotak Form */}
            <View
              style={{
                flex: 1,
                marginTop: 0,
                width: "100%",
                borderRadius: 5
              }}
            >
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ marginTop: 0, padding: 0 }}>
                  <View style={{ margin: 15, marginBottom: 0, marginTop: 5 }}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection:"row",
                        height: 150,
                      }}
                    >
                      <View style={{marginRight: 15}}>
                      {this.state.selectedProduct.image || this.state.image ? (
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
                            uri: this.state.image
                              ? this.state.image
                              : BE_URI + this.state.selectedProduct.image
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
                        justifyContent: "space-evenly",
                        marginTop: 5
                      }}
                    >
                      <Button
                        onPress={() => {
                          this.takePicture();
                          //this.setState({showCamera: true, uploadPhoto: true})
                        }}
                        style={{
                          borderRadius: 5,
                          //width: "40%",
                          padding: 15,
                          backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                          //backgroundColor: "rgba(162, 220, 104, 0.96)"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            { fontSize: 16, color: WHITE, alignSelf: "center" }
                          ]}
                        >
                          {_take_photo[this.state.languageIndex]}
                        </Text>
                      </Button>
                      <Button
                        onPress={() => {
                          this.uploadPicture();
                        }}
                        style={{
                          borderRadius: 5,
                          
                          padding: 15,
                          // backgroundColor: "rgba(162, 220, 104, 0.96)"
                          backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            { fontSize: 16, color: WHITE, alignSelf: "center" }
                          ]}
                        >
                          {_upload_photo[this.state.languageIndex]}
                        </Text>
                      </Button>
                    </View>
                    </View>

                  </View>
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
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View
                        style={{
                          margin: 15,
                          marginTop: 5,
                          marginBottom: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            { fontSize: 16, color: BLACK }
                          ]}
                        >
                          {_product_category[this.state.languageIndex]} *)
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 5,
                          marginLeft: 15,
                          marginRight: 15,
                          marginBottom: 0,
                          flexDirection: "row",
                          //paddingRight: 20,
                          flex: 1,
                          //backgroundColor: '#BCA',
                          alignItems: "center",
                          alignContent: "center",
                          justifyContent: "space-between"
                          //borderRadius: 10,
                          //borderWidth: 1,
                          //borderColor: MAIN_THEME_COLOR_SELECT(
                          //  this.state.colorIndex
                          //)
                        }}
                      >
                        <Dropdown
                          style={{
                            marginLeft: 0,
                            backgroundColor: MAIN_THEME_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            borderRadius: 10,
                            padding: 5,
                            width: "100%"
                            //padding: 10
                            // paddingRight:100
                          }}
                          size={16}
                          color={MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)}
                          text={_pilih_kategori[this.state.languageIndex]}
                          // selectWidth = {'80%'}
                          languageIndex={this.state.languageIndex}
                          selectedValue={String(this.state.productCategoryId)}
                          optionLists={this.state.dataCategoryAll.map(
                            (v, k) => {
                              return {
                                label: v.name,
                                value: String(v.id)
                              };
                            }
                          )}
                          onValueChange={(itemValue, itemIndex) => {
                            //console.log("select user ==> ", this.state.listUser[itemIndex]);
                            //alert (itemValue)
                            this.setState({
                              productCategoryId: itemValue
                              // selectedUserData: this.state.listUser[itemIndex]
                            });
                            //this.BEAttendanceInformation(itemValue);
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View
                        style={{
                          margin: 15,
                          marginTop: 5,
                          marginBottom: 0,
                          flexDirection: "row"
                        }}
                      >
                        <View style={{flexDirection: "row", marginRight: 15}}>
                          <View style={{ justifyContent: "center" }}>
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                { fontSize: 16, color: BLACK }
                              ]}
                            >
                              {_menu_favorit_short[this.state.languageIndex]} *)
                            </Text>
                          </View>
                          <View>
                            <Checkbox
                              color={MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )}
                              checked={
                                this.state.product_is_favorite === 1
                                  ? true
                                  : false
                              }
                              action={() => {
                                //ganti checklist Nego
                                //this.changeChecklistNego(i, data.nego);
                                this.setState({
                                  product_is_favorite:
                                    this.state.product_is_favorite === 0 ? 1 : 0
                                });
                              }}
                            />
                          </View>
                        </View>
                        <View style={{flexDirection: "row", marginRight: 0}}>
                        <View style={{ justifyContent: "center" }}>
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                { fontSize: 16, color: BLACK }
                              ]}
                            >
                              {_product_status[this.state.languageIndex]} *)
                            </Text>
                          </View>
                          <View>
                            <Checkbox
                              color={MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )}
                              checked={
                                this.state.productStatus === "active"
                                  ? true
                                  : false
                              }
                              action={() => {
                                //ganti checklist Nego
                                //this.changeChecklistNego(i, data.nego);
                                this.setState({
                                  productStatus:
                                    this.state.productStatus === "active"
                                      ? "inactive"
                                      : "active"
                                });
                              }}
                            />
                          </View>
                        </View>


                      </View>

                    </View>

                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View
                        style={{
                          margin: 15,
                          marginTop: 5,
                          marginBottom: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            { fontSize: 16, color: BLACK }
                          ]}
                        >
                          {_product_name[this.state.languageIndex]} *)
                        </Text>
                      </View>
                      <View
                        style={{
                          marginLeft: 15,
                          marginRight: 15,
                          marginTop: 5,
                          marginBottom: 0,
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
                            fontSize: 16,
                            fontFamily: "DMSans-Bold"
                          }}
                          multiline={false}
                          //numberOfLines={3}
                          type="text"
                          ref={q => {
                            this._nama = q;
                          }}
                          onSubmitEditing={() => {
                            //this._stock.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ productName: v })}
                          value={this.state.productName}
                          placeholder={""}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View
                        style={{
                          margin: 15,
                          marginTop: 5,
                          marginBottom: 0,
                          flexDirection: "row"
                        }}
                      >
                        <View style={{ justifyContent: "center" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 16, color: BLACK }
                            ]}
                          >
                            {_stock[this.state.languageIndex]}
                          </Text>
                        </View>
                        <Checkbox
                          color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
                          checked={
                            this.state.product_has_stock === 1 ? true : false
                          }
                          action={() => {
                            //ganti checklist Nego
                            //this.changeChecklistNego(i, data.nego);
                            this.setState({
                              product_has_stock:
                                this.state.product_has_stock === 0 ? 1 : 0
                            });
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 5,
                          marginBottom: 0,
                          marginLeft: 15,
                          marginRight: 15,
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
                          ),
                          display:
                            this.state.product_has_stock === 1 ? "flex" : "none"
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
                            fontSize: 16,
                            fontFamily: "DMSans-Bold"
                          }}
                          multiline={false}
                          //numberOfLines={3}
                          keyboardType={"phone-pad"}
                          type="text"
                          ref={q => {
                            this._stock = q;
                          }}
                          onSubmitEditing={() => {
                            //this._harga.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ productStock: v })}
                          value={this.state.productStock.toString()}
                          placeholder={""}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View style={{ margin: 15, flexDirection: "row" }}>
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            { fontSize: 16, color: BLACK }
                          ]}
                        >
                          {_product_price[this.state.languageIndex]} *)
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 5,
                          marginBottom: 0,
                          marginLeft: 15,
                          marginRight: 15,
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
                            fontSize: 16,
                            fontFamily: "DMSans-Bold"
                          }}
                          multiline={false}
                          //numberOfLines={3}
                          keyboardType={"phone-pad"}
                          type="text"
                          ref={q => {
                            this._harga = q;
                          }}
                          onSubmitEditing={() => {
                            //this._barcodetext.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ productPrice: v })}
                          value={this.state.productPrice}
                          placeholder={""}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View
                        style={{
                          margin: 15,
                          marginTop: 5,
                          marginBottom: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            { fontSize: 16, color: BLACK }
                          ]}
                        >
                          {_product_barcode[this.state.languageIndex]}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 5,
                          marginBottom: 0,
                          marginLeft: 15,
                          marginRight: 15,
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
                            fontSize: 16,
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

                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View
                        style={{
                          margin: 15,
                          marginTop: 5,
                          marginBottom: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            { fontSize: 16, color: BLACK }
                          ]}
                        >
                          {_product_sku[this.state.languageIndex]}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 5,
                          marginBottom: 0,
                          marginLeft: 15,
                          marginRight: 15,
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
                            fontSize: 16,
                            fontFamily: "DMSans-Bold"
                          }}
                          multiline={false}
                          //numberOfLines={3}
                          //keyboardType={'phone-pad'}
                          type="text"
                          ref={q => {
                            this._sku = q;
                          }}
                          onSubmitEditing={() => {
                            //this._catatan.focus();
                          }}
                          //onChangeText={(q)=>this._accountUpdate('username',q)}
                          onChangeText={v => this.setState({ productSKU: v })}
                          value={this.state.productSKU}
                          placeholder={""}
                        />
                        <Button
                          onPress={() => {
                            this.showCamera(2);
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

                    <View
                      style={{
                        //backgroundColor: '#BCA',
                        width: "100%"
                      }}
                    >
                      <View
                        style={{
                          margin: 15,
                          marginTop: 5,
                          marginBottom: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={[
                            MainStyle.robotoNormalBold,
                            { fontSize: 16, color: BLACK }
                          ]}
                        >
                          {_description[this.state.languageIndex]} -
                        </Text>
                        <Text
                          style={[
                            MainStyle.robotoNormal,
                            { fontSize: 16, color: BLACK }
                          ]}
                        >
                          {" "}
                          {_catatan_extra[this.state.languageIndex]}
                        </Text>
                      </View>
                      {/* Catatan Header */}
                      <View
                        style={{
                          marginTop: 10,
                          marginLeft: 15,
                          marginRight: 15,
                          marginBottom: 10,
                          flexDirection: "row",
                          //paddingRight: 20,
                          flex: 1,
                          //backgroundColor: '#BCA',
                          alignItems: "center",
                          alignContent: "center",
                          justifyContent: "space-between"
                        }}
                      >
                        <ScrollView
                          style={{
                            width: "100%",
                            borderRadius: 10,
                            borderWidth: 1,
                            marginTop: 5,
                            borderColor: MAIN_THEME_COLOR_SELECT(
                              this.state.colorIndex
                            ),
                            minHeight: 100,
                            paddingLeft: 5,
                            paddingRight: 5,
                            backgroundColor: WHITE,
                            maxHeight: 100
                          }}
                        >
                          <TextInput
                            style={{
                              textAlignVertical: "top",
                              flex: 1,
                              //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              //backgroundColor: 'transparent',
                              height: 100,
                              color: BLACK,
                              marginTop: -8,
                              marginLeft: 0,
                              marginRight: 0,
                              fontSize: 16,
                              fontFamily: "DMSans-Bold"
                            }}
                            multiline={true}
                            //numberOfLines={3}
                            type="text"
                            ref={q => {
                              this._catatan = q;
                            }}
                            onSubmitEditing={() => {
                              //this.getData(this.state.notes);
                              // this.setState({viewSearch: false});
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v =>
                              this.setState({ productDescription: v })
                            }
                            value={this.state.productDescription}
                            placeholder={""}
                          />
                        </ScrollView>
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
                marginTop: 5,
                marginBottom: 0,
                width: this.state.tablet ? "100%" : "100%",
                alignSelf: "center"
                //backgroundColor: "#555",
                //flex: 1
              }}
            >
              <Button
                style={{
                  padding: 5,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  marginLeft: 15,
                  marginRight: 15,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  //this.addOrder();
                  this.setState({ loading: true });
                  if (this.state.formAction === "edit") {
                    this.editProduct();
                  } else {
                    this.saveNewProduct();
                  }
                }}
              >
                <Text
                  style={[
                    MainStyle.robotoNormalBold,
                    {
                      fontSize: 16,
                      color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                    }
                  ]}
                >
                  {_simpan[this.state.languageIndex]}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderFormItem() {
    const { formItem, showCamera } = this.state;
    // let harga =
    //   this.state.currency +
    //   " " +
    //   this.idrNumToStr(
    //     (this.state.productPrice + this.state.salesTypeValue) *
    //       this.state.selectedQuantity
    //   );

    let title = this.state.selectedProduct.name
      ? this.state.selectedProduct.name
      : _tambah_produk[this.state.languageIndex];

    const outlet_id = this.state.userInfo.gerai_id;

    if (!showCamera) {
      return (
        <View style={{ flex: 1 }}>
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
              hideOnline={false}
              bgColor={"transparent"}
              colorIndex={this.state.colorIndex}
              logoutAction={() => this.logoutAction()}
              title={title}
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
              <View style={{ margin: 15, marginTop: 5, marginBottom: 0 }}>
                <View
                  style={{
                    width: "50%",
                    height: 150,
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center"
                  }}
                >
                  {this.state.selectedProduct.image || this.state.image ? (
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
                        uri: this.state.image
                          ? this.state.image
                          : BE_URI + this.state.selectedProduct.image
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
                    justifyContent: "space-evenly",
                    marginTop: 15
                  }}
                >
                  <Button
                    onPress={() => {
                      this.takePicture();
                      //this.setState({showCamera: true, uploadPhoto: true})
                    }}
                    style={{
                      borderRadius: 15,
                      width: "40%",
                      padding: 10,
                      backgroundColor: "rgba(162, 220, 104, 0.96)"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 12, color: WHITE, alignSelf: "center" }
                      ]}
                    >
                      {_take_photo[this.state.languageIndex]}
                    </Text>
                  </Button>
                  <Button
                    onPress={() => {
                      this.uploadPicture();
                    }}
                    style={{
                      borderRadius: 15,
                      width: "40%",
                      padding: 10,
                      backgroundColor: "rgba(162, 220, 104, 0.96)"
                    }}
                  >
                    <Text
                      style={[
                        MainStyle.robotoNormalBold,
                        { fontSize: 12, color: WHITE, alignSelf: "center" }
                      ]}
                    >
                      {_upload_photo[this.state.languageIndex]}
                    </Text>
                  </Button>
                </View>
              </View>
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
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_product_category[this.state.languageIndex]} *)
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
                            justifyContent: "space-between"
                            //borderRadius: 10,
                            //borderWidth: 1,
                            //borderColor: MAIN_THEME_COLOR_SELECT(
                            //  this.state.colorIndex
                            //)
                          }}
                        >
                          <Dropdown
                            style={{
                              marginLeft: 0,
                              backgroundColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              ),
                              borderRadius: 10,
                              padding: 10,
                              width: "100%"
                              //padding: 10
                              // paddingRight:100
                            }}
                            size={12}
                            color={MAIN_TEXT_COLOR_SELECT(
                              this.state.colorIndex
                            )}
                            text={_pilih_kategori[this.state.languageIndex]}
                            // selectWidth = {'80%'}
                            languageIndex={this.state.languageIndex}
                            selectedValue={String(this.state.productCategoryId)}
                            optionLists={this.state.dataCategoryAll.map(
                              (v, k) => {
                                return {
                                  label: v.name,
                                  value: String(v.id)
                                };
                              }
                            )}
                            onValueChange={(itemValue, itemIndex) => {
                              //console.log("select user ==> ", this.state.listUser[itemIndex]);
                              //alert (itemValue)
                              this.setState({
                                productCategoryId: itemValue
                                // selectedUserData: this.state.listUser[itemIndex]
                              });

                              //this.BEAttendanceInformation(itemValue);
                            }}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <View style={{ justifyContent: "center" }}>
                            <Text
                              style={[
                                MainStyle.robotoNormalBold,
                                { fontSize: 12, color: BLACK }
                              ]}
                            >
                              {_menu_favorit_short[this.state.languageIndex]} *)
                            </Text>
                          </View>
                          <View>
                            <Checkbox
                              color={MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )}
                              checked={
                                this.state.product_is_favorite === 1
                                  ? true
                                  : false
                              }
                              action={() => {
                                //ganti checklist Nego
                                //this.changeChecklistNego(i, data.nego);
                                this.setState({
                                  product_is_favorite:
                                    this.state.product_is_favorite === 0 ? 1 : 0
                                });
                              }}
                            />
                          </View>
                        </View>

                        <View
                          style={{
                            //backgroundColor: '#BCA',
                            width: "100%"
                          }}
                        >
                          <View style={{ margin: 15, flexDirection: "row" }}>
                            <View style={{ justifyContent: "center" }}>
                              <Text
                                style={[
                                  MainStyle.robotoNormalBold,
                                  { fontSize: 12, color: BLACK }
                                ]}
                              >
                                {_product_status[this.state.languageIndex]} *)
                              </Text>
                            </View>
                            <View>
                              <Checkbox
                                color={MAIN_THEME_COLOR_SELECT(
                                  this.state.colorIndex
                                )}
                                checked={
                                  this.state.productStatus === "active"
                                    ? true
                                    : false
                                }
                                action={() => {
                                  //ganti checklist Nego
                                  //this.changeChecklistNego(i, data.nego);
                                  this.setState({
                                    productStatus:
                                      this.state.productStatus === "active"
                                        ? "inactive"
                                        : "active"
                                  });
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_product_name[this.state.languageIndex]} *)
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
                            type="text"
                            ref={q => {
                              this._nama = q;
                            }}
                            onSubmitEditing={() => {
                              //this._stock.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v =>
                              this.setState({ productName: v })
                            }
                            value={this.state.productName}
                            placeholder={""}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_stock[this.state.languageIndex]}
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
                            keyboardType={"phone-pad"}
                            type="text"
                            ref={q => {
                              this._stock = q;
                            }}
                            onSubmitEditing={() => {
                              //this._harga.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v =>
                              this.setState({ productStock: v })
                            }
                            value={this.state.productStock.toString()}
                            placeholder={""}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_product_price[this.state.languageIndex]} *)
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
                            keyboardType={"phone-pad"}
                            type="text"
                            ref={q => {
                              this._harga = q;
                            }}
                            onSubmitEditing={() => {
                              //this._barcodetext.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v =>
                              this.setState({ productPrice: v })
                            }
                            value={this.state.productPrice}
                            placeholder={""}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
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

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_product_sku[this.state.languageIndex]}
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
                              this._sku = q;
                            }}
                            onSubmitEditing={() => {
                              //this._catatan.focus();
                            }}
                            //onChangeText={(q)=>this._accountUpdate('username',q)}
                            onChangeText={v => this.setState({ productSKU: v })}
                            value={this.state.productSKU}
                            placeholder={""}
                          />
                          <Button
                            onPress={() => {
                              this.showCamera(2);
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

                      <View
                        style={{
                          //backgroundColor: '#BCA',
                          width: "100%"
                        }}
                      >
                        <View style={{ margin: 15, flexDirection: "row" }}>
                          <Text
                            style={[
                              MainStyle.robotoNormalBold,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {_description[this.state.languageIndex]} -
                          </Text>
                          <Text
                            style={[
                              MainStyle.robotoNormal,
                              { fontSize: 12, color: BLACK }
                            ]}
                          >
                            {" "}
                            {_catatan_extra[this.state.languageIndex]}
                          </Text>
                        </View>
                        {/* Catatan Header */}
                        <View
                          style={{
                            marginTop: 10,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10,
                            flexDirection: "row",
                            //paddingRight: 20,
                            flex: 1,
                            //backgroundColor: '#BCA',
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "space-between"
                          }}
                        >
                          <ScrollView
                            style={{
                              width: "100%",
                              borderRadius: 10,
                              borderWidth: 1,
                              marginTop: 5,
                              borderColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              ),
                              minHeight: 100,
                              paddingLeft: 5,
                              paddingRight: 5,
                              backgroundColor: WHITE,
                              maxHeight: 100
                            }}
                          >
                            <TextInput
                              style={{
                                textAlignVertical: "top",
                                flex: 1,
                                //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                //backgroundColor: 'transparent',
                                height: 100,
                                color: BLACK,
                                marginTop: -8,
                                marginLeft: 0,
                                marginRight: 0,
                                fontSize: 12,
                                fontFamily: "DMSans-Bold"
                              }}
                              multiline={true}
                              //numberOfLines={3}
                              type="text"
                              ref={q => {
                                this._catatan = q;
                              }}
                              onSubmitEditing={() => {
                                //this.getData(this.state.notes);
                                // this.setState({viewSearch: false});
                              }}
                              //onChangeText={(q)=>this._accountUpdate('username',q)}
                              onChangeText={v =>
                                this.setState({ productDescription: v })
                              }
                              value={this.state.productDescription}
                              placeholder={""}
                            />
                          </ScrollView>
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
                <Button
                  style={{
                    padding: 10,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(
                      this.state.colorIndex
                    ),
                    marginLeft: 15,
                    marginRight: 15,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    //this.addOrder();
                    this.setState({ loading: true });
                    if (this.state.formAction === "edit") {
                      this.editProduct();
                    } else {
                      this.saveNewProduct();
                    }
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
                    {_simpan[this.state.languageIndex]}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
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

      if (barcodes.length !== 0)
      {
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
      } else {
        this.setState({
          searchKey: barcodeData,
          loading: false,
          showCamera: false
        });

        setTimeout(() => {
          this.getData();
        }, 333);
      }
      
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

  renderLeftSide() {
    const { refreshing, showAlert } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#C4C4C4", paddingBottom: 10 }}>
        <ScrollView
          style={{
            //backgroundColor: '#C4C4C4',
            flex: 1
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            <View>
              <View
                style={{
                  borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  marginLeft: 15,
                  marginRight: 15,

                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }}
              >
                <Button
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    this.setState({ showAll: !this.state.showAll });
                  }}
                >
                  <View style={{ margin: 15, flexDirection: "row" }}>
                    <View style={{ width: "10%" }}>
                      <Ionicons
                        name={"md-menu"}
                        style={{
                          alignSelf: "center",
                          fontSize: 20,
                          color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                        }}
                      />
                    </View>
                    <View style={{ width: "80%", alignSelf: "center" }}>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: 14,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }
                        ]}
                      >
                        {_semua_menu[this.state.languageIndex]}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "10%",
                        alignSelf: "flex-end",
                        alignItems: "flex-end"
                      }}
                    >
                      {this.state.showAll ? (
                        <Entypo
                          name={"chevron-up"}
                          style={{
                            alignSelf: "center",
                            fontSize: 25,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }}
                        />
                      ) : (
                        <Entypo
                          name={"chevron-down"}
                          style={{
                            alignSelf: "center",
                            fontSize: 25,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }}
                        />
                      )}
                    </View>
                  </View>
                </Button>
              </View>
            </View>
            {/* Semua Menu End */}

            {this.state.showAll ? (
              <View>
                <FlatList
                  //ListHeaderComponent={this.renderSearch()}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataCategory}
                  renderItem={({ item, index }) => {
                    if (this.state.ready === true) {
                      return (
                        <View
                          style={{
                            marginLeft: 15,
                            marginTop: 0,
                            marginBottom: 3,
                            marginRight: 15,
                            borderColor: MAIN_THEME_COLOR_SELECT(
                              this.state.colorIndex
                            )
                          }}
                        >
                          {this.renderAllCategory(item, index)}
                        </View>
                      );
                    } else {
                      return <View />;
                    }
                  }}
                  //ListFooterComponent={this._renderFooter}
                  keyExtractor={(item, index) => {
                    return "ShowAllRenderData" + index.toString();
                  }}
                  onRefresh={this._onRefresh}
                  //onEndReached={this.handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  refreshing={refreshing}
                />
              </View>
            ) : (
              <View />
            )}
            {/* Favorit */}
            <View>
              <View
                style={{
                  borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
                  marginTop: 15,
                  marginLeft: 15,
                  marginRight: 15,
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  )
                }}
              >
                <Button
                  onPress={() => {
                    console.log("press favorit");
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    this.setState({ showFav: !this.state.showFav });
                  }}
                >
                  <View style={{ margin: 15, flexDirection: "row" }}>
                    <View style={{ width: "10%" }}>
                      <Ionicons
                        name={"md-star"}
                        style={{
                          alignSelf: "center",
                          fontSize: 20,
                          color: "#FFF736"
                        }}
                      />
                    </View>
                    <View style={{ width: "80%", alignSelf: "center" }}>
                      <Text
                        style={[
                          MainStyle.robotoNormalBold,
                          {
                            fontSize: 14,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }
                        ]}
                      >
                        {_menu_favorit[this.state.languageIndex]}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "10%",
                        alignSelf: "flex-end",
                        alignItems: "flex-end"
                      }}
                    >
                      {this.state.showFav ? (
                        <Entypo
                          name={"chevron-up"}
                          style={{
                            alignSelf: "center",
                            fontSize: 25,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }}
                        />
                      ) : (
                        <Entypo
                          name={"chevron-down"}
                          style={{
                            alignSelf: "center",
                            fontSize: 25,
                            color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                          }}
                        />
                      )}
                    </View>
                  </View>
                </Button>
              </View>
              {/* Show Fav End */}

              {this.state.showFav ? (
                <View>
                  <FlatList
                    //ListHeaderComponent={this.renderSearch()}
                    showsVerticalScrollIndicator={false}
                    data={this.state.dataMenuFav}
                    renderItem={({ item, index }) => {
                      if (this.state.ready === true) {
                        return (
                          <View
                            style={{
                              marginLeft: 15,
                              marginTop: 0,
                              marginBottom: 3,
                              marginRight: 15,
                              borderColor: MAIN_THEME_COLOR_SELECT(
                                this.state.colorIndex
                              )
                            }}
                          >
                            {this.renderFav(item, index)}
                          </View>
                        );
                      } else {
                        return <View />;
                      }
                    }}
                    //ListFooterComponent={this._renderFooter}
                    keyExtractor={(item, index) => {
                      return "FavRenderData" + index.toString();
                    }}
                    onRefresh={this._onRefresh}
                    //onEndReached={this.handleLoadMore}
                    //onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderFavAlternate(data, i) {
    return (
      <View
        onPress={() => {
          //console.log(data);
          // this.setState({
          //
          //   selectedProduct: data,
          //   productPrice: data.price
          // });
          ///this.showFormItemUpdate(data, data.price, "edit");
          //Group_Addons
        }}
        style={{
          flex: 1,
          //width: "100%",
          backgroundColor: "#F7F7F7",
          borderWidth: 1,
          borderColor: "#F7F7F7",
          margin: 5,
          padding: 10,
          borderRadius: 10
        }}
      >
        <View style={{ margin: 15 }}>
          {/* <View style={{ alignItems: "center" }}> */}
          <View style={{ flexDirection: "row" }}>
            {/* <View style={{ borderRadius: 15 }}>
              <Image
                resizeMethod="resize"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 15,
                  overflow: "hidden"
                  //alignSelf: "center"
                  //backgroundColor: "#888"
                }}
                resizeMode={"stretch"}
                source={{ uri: BE_URI + data.image }}
              />
            </View> */}
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 20, color: BLACK }
                ]}
              >
                {data.name}
              </Text>
              {/* <Text
                style={[
                  MainStyle.robotoNormalBold,
                  { fontSize: 15, color: BLACK }
                ]}
              >
                {BE_URI + data.image}
              </Text> */}
              <Text
                style={[MainStyle.robotoNormal, { fontSize: 16, color: BLACK }]}
              >
                {data.Product_Category ? data.Product_Category.name : ""}
              </Text>
              <View
                style={{
                  flex: 1,
                  //backgroundColor:"#BCA",
                  marginTop: 15,
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                
                  <Button
                    onPress={() => {
                      this.showFormItemUpdate(data, data.price, "edit");
                    }}
                    style={{height: 40, width: 40, borderColor: "#8A8A8A",
                    borderWidth: 1, borderRadius: 5,
                    // backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex), 
                    alignContent:"center", alignItems:"center", justifyContent:"center"}}>
                      <FontAwesome5
                        style={{
                          color: BLACK
                        }}
                        name="pencil-alt"
                        size={20}
                      />
                </Button>
                <Button
                    onPress={() => {
                      this.deleteProduct(data, i);
                    }}
                    style={{height: 40, width: 40, borderColor: "#8A8A8A",
                    borderWidth: 1, borderRadius: 5,
                    backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex), 
                    alignContent:"center", alignItems:"center", justifyContent:"center"}}>
                      <FontAwesome5
                        style={{
                          color: WHITE
                        }}
                        name="trash"
                        size={20}
                      />
                </Button>

             
              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
      </View>
    );
  }

  deleteProduct(data, index) {
    console.log("DELETE PRODUK ===> ", data);
    this.setState({
      selectedProduct: data,
      showCustomConfirmation: true,
      selectedIndex: index
    });
  }

  deleteData() {
    const { selectedProduct } = this.state;

    const product_id = selectedProduct.id;
    const uri = `${BE_Get_Product}/${product_id}`;

    fetch(uri, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.state.auth
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let result = responseJson;
        // let resultData = result.data;

        console.log("delete response ===> ", result);

        if (result.statusCode === 200) {
          alert(_berhasil_delete[this.state.languageIndex]);

          let temp_list = this.state.dataMenuFav;
          temp_list.splice(this.state.selectedIndex, 1);
          this.setState({
            dataMenuFav: temp_list,
            selectedIndex: null
          });
          setTimeout(() => {
            this.getData();
            this.getDataCategory();
          }, 300);
        } else {
          alert(_gagal[this.state.languageIndex]);
        }

        // let cash = {};
        // let wallet = [];
        // let card = [];
        // if (result.statusCode === 200) {
        //   OfflineMenuFunctions.SavePaymentType(resultData, val => {});
        // }
      })
      .catch(_err => {});
  }

  renderFavLeftSide() {
    const {
      activeCategoryIndex,
      activeCategory,
      categoryTotal,
      dataCategory
    } = this.state;

    return (
      // <GestureRecognizer
      //   // onSwipeLeft={this._onSwipeLeft}
      //   // onSwipeRight={this._onSwipeRight}
      //   onSwipeLeft={() => {
      //     //alert("left");
      //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      //     let activeCategoryIndexNew = parseInt(activeCategoryIndex + 1);
      //     //activeCategoryIndex === 0 ? 1 : parseInt(activeCategoryIndex + 1);

      //     if (activeCategoryIndexNew > categoryTotal) {
      //       activeCategoryIndexNew = activeCategoryIndexNew - 1;
      //     }

      //     let activeCategoryNew =
      //       activeCategoryIndex < 0
      //         ? activeCategoryIndexNew
      //         : dataCategory[parseInt(activeCategoryIndexNew - 1)].id;

      //     if (activeCategoryIndex < categoryTotal) {
      //       // console.log("<=== SWIPE LEFT SEPARATOR ===>")
      //       // console.log("dataCategory swipe left ===> ", dataCategory)
      //       // console.log("activeCategoryIndex swipe left ===> ", activeCategoryIndex)
      //       // console.log("categoryTotal swipe left ===> ", categoryTotal)
      //       // console.log("activeCategoryNew swipe left ===> ", activeCategoryNew)
      //       // console.log("activeCategoryIndexNew swipe left ===> ", activeCategoryIndexNew)

      //       this.setState({
      //         activeCategory: activeCategoryNew,
      //         activeCategoryIndex: activeCategoryIndexNew
      //         //loading: false
      //       });

      //       if (activeCategoryIndexNew > 0) {
      //         this.getMenuByCategory(
      //           this.state.searchKey,
      //           activeCategoryNew,
      //           activeCategoryIndexNew
      //         );
      //       } else {
      //         this.getData("", activeCategoryIndexNew);
      //       }
      //       this.downButtonHandler(activeCategoryIndexNew);
      //     }
      //   }}
      //   onSwipeRight={() => {
      //     //alert("right");
      //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      //     let min_category = dataCategory[0].id;

      //     // console.log("<== SWIPE SEPARATOR ==>");

      //     // console.log("min_category ==> ", min_category);

      //     // console.log("activeCategoryIndex ==> ", activeCategoryIndex);

      //     // let activeCategoryIndexNew =
      //     //   activeCategoryIndex === 0
      //     //     ? -1
      //     //     : activeCategoryIndex === min_category
      //     //     ? 0
      //     //     : parseInt(activeCategoryIndex - 1);

      //     let activeCategoryIndexNew =
      //       activeCategoryIndex === 0
      //         ? -1
      //         : activeCategoryIndex === min_category
      //         ? 1
      //         : parseInt(activeCategoryIndex - 1);

      //     if (activeCategoryIndexNew < -1) {
      //       activeCategoryIndexNew = -1;
      //     }

      //     //console.log("activeCategoryIndexNew ==> ", activeCategoryIndexNew);
      //     let activeCategoryNew =
      //       activeCategoryIndexNew === -1
      //         ? -1
      //         : activeCategoryIndexNew === 0
      //         ? dataCategory[parseInt(activeCategoryIndexNew)].id
      //         : dataCategory[parseInt(activeCategoryIndexNew - 1)].id;

      //     //console.log("activeCategoryNew ==> ", activeCategoryNew);

      //     //console.log("activeCategory ==> ", activeCategory);

      //     if (activeCategoryNew > -2 && activeCategory !== -1) {
      //       this.setState({
      //         activeCategory: activeCategoryNew,
      //         activeCategoryIndex: activeCategoryIndexNew
      //         //loading: true
      //       });
      //       if (activeCategoryIndexNew < 1) {
      //         this.getData("", activeCategoryIndexNew);
      //         this.downButtonHandler(activeCategoryIndexNew);
      //       } else {
      //         this.getMenuByCategory(
      //           this.state.searchKey,
      //           activeCategoryNew,
      //           activeCategoryIndexNew
      //         );
      //         this.downButtonHandler(activeCategoryIndexNew);
      //       }
      //     }
      //   }}
      //   config={{
      //     velocityThreshold: 0.3,
      //     directionalOffsetThreshold: 80
      //   }}
      //   style={{
      //     flex: 1
      //   }}
      // >
      <View style={{ flex: 1, backgroundColor: WHITE }}>
        <View
          style={{
            marginTop: 10,
            // marginLeft: 10,
            // marginRight: 10,
            //marginBottom: 5,
            //paddingBottom: 10,
            //backgroundColor: "#BCA",
            //flex: 1,
            //flexDirection: "row",
            justifyContent: "space-around"
            //backgroundColor: '#AAA',
          }}
        >
          <View style={{ borderBottomWidth: 1, borderColor: "#C8C7CC" }} />

          <FlatList
            //ListHeaderComponent={this.renderSearch()}
            showsVerticalScrollIndicator={false}
            data={this.state.dataMenuFav}
            numColumns={3}
            renderItem={({ item, index }) => {
              if (this.state.ready === true) {
                return (
                  <View
                    style={{
                      width: "33%",

                      //flex: 0.325,
                      //marginLeft: 15,
                      marginTop: 0

                      //marginBottom: 3,
                      //marginRight: 15
                    }}
                  >
                    {this.renderFavAlternate(item, index)}
                  </View>
                );
              } else {
                return <View />;
              }
            }}
            //ListFooterComponent={this._renderFooter}
            keyExtractor={(item, index) => {
              return "FavRenderData" + index.toString();
            }}
            //onRefresh={this._onRefresh}
            //onEndReached={this.handleLoadMore}
            //onEndReachedThreshold={0.5}
            // refreshing={refreshing}
          />

          {/* <Text>{this.state.dataMenuFav.length}</Text> */}
        </View>
      </View>
      // </GestureRecognizer>
    );
  }

  renderNoData() {
    return (
      <View
        style={{
          flex: 999,
          //height: 500,
          //backgroundColor: "#BCA",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 125,
            height: 125,
            borderRadius: 999,
            //backgroundColor: "#C4C4C4",
            marginRight: 20,
            //borderColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            //borderWidth: 20,
            //zIndex: 2,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MaterialIcons
            style={{
              color: WHITE,
              width: 125,
              height: 125,
              backgroundColor: "#C4C4C4",
              zIndex: 1,
              borderRadius: 999
            }}
            name="people"
            size={125}
            //color=  { selectedIndex == 0 ? RED_700 : GREY_900 }
            //color={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          />
          <View
            style={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: 999,
              borderColor: "#C4C4C4",
              borderWidth: 10,
              backgroundColor: "transparent",
              zIndex: 2
            }}
          />
        </View>
        <Text
          style={[
            MainStyle.robotoNormal,
            { fontSize: 18, color: BLACK, marginTop: 15 }
          ]}
        >
          {_no_data_3[this.state.languageIndex]}
        </Text>
      </View>
    );
  }

  renderButtonsLeftSide() {
    if (this.state.formItem === false) {
      return (
        <View
          style={{
            //flex: 1,
            //height: 100,
            //width: "100%",
            //height: 300,
            backgroundColor: "#FFF",
            justifyContent: "flex-end",
            alignContent: "flex-end"
          }}
        >
          <View style={{ justifyContent: "flex-end", display: "none" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                //backgroundColor: "#FFF",
                paddingTop: 10
              }}
            >
              <Button
                onPress={() => {
                  this.setState({
                    showFavList: true
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderWidth: 1,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-star"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
              <Button
                onPress={() => {
                  this.setState({
                    showFavList: false
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderWidth: 1,
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-menu"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
              <Button
                onPress={() => {
                  this.setState({
                    showBill: true
                  });
                }}
                style={{
                  backgroundColor: MAIN_THEME_COLOR_SELECT(
                    this.state.colorIndex
                  ),
                  borderColor: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex),
                  borderWidth: 1,
                  elevation: 1,
                  width: "32%",
                  height: 66,
                  justifyContent: "center"
                }}
              >
                <Ionicons
                  name={"md-calculator"}
                  style={{
                    alignSelf: "center",
                    fontSize: 33,
                    color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex)
                  }}
                />
              </Button>
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }

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

  async connectPrinter(address) {
    //let name = "RP58BU";

    await BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          this.setState({
            loading: false
            //boundAddress: address
          });
          //console.log("connect ==> ", s);
          //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
        },
        e => {
          this.setState({
            loading: false
          });
          //alert(e);
        }
      );

    await BluetoothEscposPrinter.printText("", {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1
    });
  }

  async printAction(type = "cashier") {
    try {
      // let printer_address = "00:0E:0E:02:93:45";
      // let printer_name = "RP58BU";
      const { printer_main, printer_kitchen } = this.state;
      //console.log("printer_main_index ==> ", printer_main.address);
      //console.log("printer_main_index ==> ", printer_kitchen.address);
      let printer_address = "";

      if (type === "cashier") {
        if (printer_main) {
          printer_address = printer_main.address.toString();
        }
      } else {
        if (printer_kitchen) {
          printer_address = printer_kitchen.address.toString();
        }
      }

      // address = "00:0E:0E:02:93:45";

      if (printer_address !== "") {
        console.log("address ==> ", printer_address);

        await BluetoothManager.connect(printer_address) // the device address scanned.
          .then(
            s => {
              this.setState({
                loading: false
                //boundAddress: address
              });
              console.log("connect ==> ", s);
              //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
            },
            e => {
              this.setState({
                loading: false
              });
              alert(e);
            }
          );
        const { userInfo, dataBill, bill_transId } = this.state;
        let address = "Alamat dari Retail";
        let gerai_name = userInfo.gerai_name;
        let description = userInfo.description;
        let cashier_name = userInfo.name;
        let transaction_id = "";
        let time = moment(new Date()).format("HH:mm");
        let no_table = this.state.selectedTable.name;

        let subTotal = 0;
        let total_bayar = 0;

        //console.log("dataBill ==> ", dataBill);

        dataBill.map((v, i) => {
          subTotal = subTotal + v.qty * v.price;
          subTotal = subTotal + v.qty * v.salesTypeValue;
        });

        let total_add = 1 + this.state.services + this.state.tax;
        let grand_total = subTotal * total_add;

        total_bayar = grand_total;

        // BluetoothEscposPrinter.printPic(ImageBase64, {
        //   width: 200,
        //   height: 200
        // });
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER
        );

        if (type !== "cashier") {
          await BluetoothEscposPrinter.printText(`***INCOMING ORDER***\n\r`, {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          });
        }
        await BluetoothEscposPrinter.printText(`${gerai_name}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printText(`${description}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.LEFT
        );

        if (
          this.state.selectedSalesType.toString() ===
          this.state.sales_type_dine_in_id.toString()
        ) {
          await BluetoothEscposPrinter.printText(`No Table ${no_table}\n\r`, {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          });
        }

        await BluetoothEscposPrinter.printText(
          `Transaction ID ${transaction_id}\n\r`,
          {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          }
        );

        await BluetoothEscposPrinter.printText(`Cashier ${cashier_name}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printText(`${time}\n\r`, {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1
        });

        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.LEFT
        );

        // await BluetoothEscposPrinter.printText(
        //   "Items         QTY      Total \n\r",
        //   {}
        // );
        await BluetoothEscposPrinter.printText(
          "--------------------------------\n\r",
          {}
        );

        // await BluetoothEscposPrinter.printText(
        //   "99 x 123456789012345678 12345678\n\r",
        //   {}
        // );

        dataBill.map((data, i) => {
          let detail = data.detail;
          let detailString = "";
          let total = data.qty * data.price + data.qty * data.salesTypeValue;
          detail.map((items, itemIndex) => {
            if (detailString === "") {
              detailString = items.name;
            } else {
              detailString = detailString + ", " + items.name;
            }
          });

          let product_name = data.name;
          let product_price = total.toString();
          let product_price_length = product_price.length;

          let product_qty = data.qty.toString();

          if (product_qty.length === 1) {
            product_qty = product_qty + "  x ";
          } else {
            product_qty = product_qty + " x";
          }

          let price_space = "";
          let price_space_num = 0;

          if (product_price_length < 8) {
            price_space_num = 8 - product_price_length;
          }
          for (var xx = 0; xx < price_space_num; xx++) {
            price_space = price_space + " ";
          }

          let product_name_array = this.divideLongWord(product_name, 18);
          let product_name_length = product_name_array.length;
          let product_name_first_line = product_name_array[0];
          let length = product_name_first_line.length;
          let prod_space = " ";
          let prod_space_num = 0;

          let detail_array = this.divideLongWord(detailString, 30);
          let detail_length = detail_array.length;

          let notes_array = this.divideLongWord(data.notes, 30);
          let notes_length = notes_array.length;

          if (length < 18) {
            prod_space_num = 18 - length;
          }

          for (var s = 0; s < prod_space_num; s++) {
            prod_space = prod_space + " ";
          }

          BluetoothEscposPrinter.printText(
            `${product_name_first_line}${prod_space}${product_qty}${price_space}${product_price}\n\r`,
            {}
          );

          for (var i = 1; i < product_name_length; i++) {
            BluetoothEscposPrinter.printText(
              `${product_name_array[i]}\n\r`,
              {}
            );
          }

          for (var j = 0; j < detail_length; j++) {
            BluetoothEscposPrinter.printText(`${detail_array[j]}\n\r`, {});
          }
          BluetoothEscposPrinter.printText(`${data.salesType}\n\r`, {});

          if (notes_length > 0) {
            BluetoothEscposPrinter.printText(`Catatan: \n\r`, {});
            for (var k = 0; k < notes_length; k++) {
              BluetoothEscposPrinter.printText(`${notes_array[k]}\n\r`, {});
            }
          }
        });

        let sub_total = subTotal.toString();
        let sub_total_length = sub_total.length;
        let sub_total_space = "";
        let sub_total_space_num = 0;

        if (sub_total_length < 24) {
          sub_total_space_num = 24 - sub_total_length;
        }
        for (var xx = 0; xx < sub_total_space_num; xx++) {
          sub_total_space = sub_total_space + " ";
        }

        await BluetoothEscposPrinter.printText(
          "--------------------------------\n\r",
          {}
        );
        // await BluetoothEscposPrinter.printText(
        //   "12345678901234567890123456789012\n\r",
        //   {}
        // );

        await BluetoothEscposPrinter.printText(
          `Subtotal${sub_total_space}${sub_total}\n\r`,
          {}
        );

        let tax = parseInt(Math.ceil(grand_total) - subTotal).toString();
        let tax_total_length = tax.length;
        let tax_total_space = "";
        let tax_total_space_num = 0;
        if (tax_total_length < 29) {
          tax_total_space_num = 29 - tax_total_length;
        }

        for (var xxx = 0; xxx < tax_total_space_num; xxx++) {
          tax_total_space = tax_total_space + " ";
        }

        await BluetoothEscposPrinter.printText(
          `Tax${tax_total_space}${tax}\n\r`,
          {}
        );

        grand_total = parseInt(Math.ceil(grand_total)).toString();
        let grand_total_length = grand_total.length;
        let grand_total_space = "";
        let grand_total_space_num = 0;
        if (grand_total_length < 21) {
          grand_total_space_num = 21 - grand_total_length;
        }

        for (var y = 0; y < grand_total_space_num; y++) {
          grand_total_space = grand_total_space + " ";
        }

        await BluetoothEscposPrinter.printText(
          `Grand Total${grand_total_space}${grand_total}\n\r`,
          {}
        );
        await BluetoothEscposPrinter.printText(
          "--------------------------------\n\r",
          {}
        );
        await BluetoothEscposPrinter.printText("Thank you for coming.\n\r", {});
        await BluetoothEscposPrinter.printText(
          "--------------------------------\n\r",
          {}
        );

        await BluetoothEscposPrinter.printText(" \n\r", {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 3,
          heigthtimes: 3,
          fonttype: 1
        });
        await BluetoothEscposPrinter.printText(" \n\r", {
          encoding: "GBK",
          codepage: 0,
          widthtimes: 3,
          heigthtimes: 3,
          fonttype: 1
        });
      } else {
        alert("Tidak terkoneksi dengan printer");
      }
    } catch (error) {
      //alert(error);
      alert("Terjadi kesalahan untuk mencetak struk mohon coba kembali.");
    }

    //BluetoothEscposPrinter.openDrawer(0, 250, 250);
  }

  async connect(address = this.state.printer_kitchen.address) {
    BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          this.setState({
            loading: false
            //boundAddress: address
          });
          //console.log("connect ==> ", s);
          //BluetoothEscposPrinter.opendDrawer(0, 250, 250);
        },
        e => {
          this.setState({
            loading: false
          });
          //alert(e);
        }
      );

    await BluetoothEscposPrinter.printText("", {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1
    });
  }

  renderCartButton() {
    return (
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 25,
          //width: "100%",

          //height: 50,
          //alignSelf: "flex-end",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Button
          onPress={() => {
            this.setState({
              showBill: true
            });
          }}
          style={{
            display: this.state.dataBill.length > 0 ? "flex" : "none",
            elevation: 2,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            width: 60,
            height: 60,
            backgroundColor: MAIN_THEME_COLOR_SELECT(this.state.colorIndex),
            borderRadius: 30
          }}
        >
          <Ionicons
            name="md-cart"
            size={25}
            style={[
              styles.headerIcon,
              { color: MAIN_TEXT_COLOR_SELECT(this.state.colorIndex) }
            ]}
          />

          {/* <Text
            style={
              ([MainStyle.robotoNormal],
              {
                fontSize: 10,
                color: BLACK
              })
            }
          >
            {_meja[this.state.languageIndex]}
          </Text> */}
        </Button>
      </View>
    );
  }

  render() {
    let { notifNumber, showCamera } = this.props;
    const {
      refreshing,
      showAlert,
      formItem,
      showNameForm,
      newName,
      lastUpdate,
      timeCompare
    } = this.state;
    notifNumber = 9999;
    //console.log("get additionalProduct ==> ", this.state.additionalProduct);

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
        <MobileHeader
          colorIndex={this.state.colorIndex}
          logoutAction={() => this.logoutAction()}
          title={_menu_8[this.state.languageIndex]}
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
          add={true}
          addAction={() => {
            this.showFormItemNew();
          }}
        />
        <StatusBar
          barStyle={barStyle}
          hidden={false}
          backgroundColor={MAIN_THEME_COLOR_SELECT(this.state.colorIndex)}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {this.state.openRecapAlert === true ? (
          <CustomAlert
            message={[this.state.openRecapMessage]}
            //title={'Success'}
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            closeText={_ok_alert[this.state.languageIndex]}
            actions={() => {
              this.setState({ openRecapAlert: false });
              Actions.pop();
              //Actions.pop();
              Actions.MobileRekap({
                auth: this.state.auth,
                userInfo: this.state.userInfo,
                colorIndex: this.state.colorIndex,
                languageIndex: this.state.languageIndex
              });
            }}
          />
        ) : (
          <View />
        )}

        {this.state.showClearCartBackHandler === true ? (
          <ClearCart
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showClearCartBackHandler: false });
            }}
            submitAction={() => {
              this.setState({ showClearCartBackHandler: false });
              this.newOrder(true, true);
              Actions.pop();
            }}
          />
        ) : (
          <View />
        )}

        {this.state.showCustomConfirmation === true ? (
          <CustomConfirmation
            colorIndex={this.state.colorIndex}
            languageIndex={this.state.languageIndex}
            backAction={() => {
              this.setState({ showCustomConfirmation: false });
            }}
            submitAction={() => {
              this.deleteData();
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

        <View
          style={{
            //flexDirection: "column",
            padding: 15,
            paddingTop: 5,
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
              flexDirection: "row",
              marginTop: 0
            }}
          >
            <View style={{ width: "50%" }}>
              <View style={{ backgroundColor: WHITE }}>
                {/* <Text>{this.state.lastUpdate}</Text>
              <Text>{this.state.timeCompare}</Text>
              <Text>{timeDifference}</Text>
              <Text>{timeDifferenceSecond}</Text>
              <Text>{timeDifferenceMinute}</Text>
              <Text>{timeDifferenceHour}</Text> */}

                {this.renderSearch()}
              </View>

              {/* {this.renderLeftSide()} */}
              {this.renderFavLeftSide()}
              {this.state.dataMenuFav.length === 0 ? (
                this.renderNoData()
              ) : (
                <View />
              )}
              {this.renderButtonsLeftSide()}
            </View>
            <View style={{ width: "50%" }}>{this.renderFormItemTablet()}</View>
            {this.renderModalCamera()}
          </View>
        </View>
      </View>
    );
  }

  renderModalCamera() {
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
