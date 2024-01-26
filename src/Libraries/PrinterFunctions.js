/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class PrinterFunctions {
  constructor() {}

  GetLanguage(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:language", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        dt = parseInt(dt);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveLanguage(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "setting",
      JSON.stringify("true"),
      response => {}
    );

    NewAsyncStorage.setItem(
      "global",
      "language",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetAutoCalculateRekap(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:auto_calculate_rekap", data => {
      //console.log('LoginFunctions Info ==> ', user);
      // console.log("||||||||||||||||||||||||||| GetAutoCalculateRekap =====> ", data);

      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveAutoCalculateRekap(data, cb) {
    console.log("SaveAutoCalculateRekap =====> ", data);
    NewAsyncStorage.setItem(
      "global",
      "auto_calculate_rekap",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetMainPrinter(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:main_printer", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetKitchenPrinter(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:kitchen_printer", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetLabelPrinter(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:label_printer", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetShowStock(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:show_stock", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetFooterPrinter(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:footer_printer", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetURLPrinter(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:url_printer", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetSettingPrintQR(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:setting_print_qr", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetSettingPrintLogo(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:setting_print_logo", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetShowOrderIDPrinter(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:show_order_id", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveImageURI(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "image_uri",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetImageURI(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:image_uri", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetBusinessData(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:business_data", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveBusinessData(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "business_data",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveTokopediaStoreID(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "tokopedia_store_id",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  
  GetTokopediaStoreID(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:tokopedia_store_id", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetOutletData(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:outlet_data", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

 


  SaveOutletData(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "outlet_data",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveBusinessSubscriptionType(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "business_sub_type",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetSubscriptionType(cb) {
    //1 = basic
    //2 = standard
    //3 = lengkap
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:business_sub_type", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveImageBase64(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "image_base64",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveSettingPrintLogo(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "setting_print_logo",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveSettingPrintQR(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "setting_print_qr",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetImageBase64(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:image_base64", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveShowStock(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "show_stock",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveFooterPrinter(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "footer_printer",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveURLPrinter(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "url_printer",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveShowOrderIDPrinter(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "show_order_id",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveMainPrinter(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "main_printer",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveKitchenPrinter(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "kitchen_printer",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveLabelPrinter(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "label_printer",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SavePrinter2(data, cb) {
    //console.log('SavePrinter2 ==> ', data);
    NewAsyncStorage.setItem(
      "global",
      "printer2",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetPrinter2(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:printer2", data => {
      //console.log('GetPrinter2 ==> ', data);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SavePrinter3(data, cb) {
    //console.log('SavePrinter3 ==> ', data);
    NewAsyncStorage.setItem(
      "global",
      "printer3",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetPrinter3(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:printer3", data => {
      //console.log('GetPrinter3 ==> ', data);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveManualPrintCashlez(data, cb) {
    //console.log('SavePrinter2 ==> ', data);
    NewAsyncStorage.setItem(
      "global",
      "manual_print_cashlez",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetManualPrintCashlez(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:manual_print_cashlez", data => {
      //console.log('GetPrinter2 ==> ', data);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveManualPrint(data, cb) {
    //console.log('SavePrinter2 ==> ', data);
    NewAsyncStorage.setItem(
      "global",
      "manual_print",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetManualPrint(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:manual_print", data => {
      //console.log('GetPrinter2 ==> ', data);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SavePrintType(data, cb) {
    //console.log('SavePrinter2 ==> ', data);
    NewAsyncStorage.setItem(
      "global",
      "printtype",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetPrintType(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:printtype", data => {
      //console.log('GetPrinter2 ==> ', data);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetPrinterList(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:data_printer_list", data => {
      console.log("||||||| functions GetPrinterList ==> ", data);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SavePrinterList(data, cb) {
    console.log("|||||||||||||||||||| save printer list ===> ", data);
    NewAsyncStorage.setItem(
      "global",
      "data_printer_list`",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SavePrinterList_Version_2(data, cb) {
    console.log("|||||||||||||||||||| SavePrinterList_Version_2 ===> ", data);
    NewAsyncStorage.setItem(
      "global",
      "offlineprinter",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetPrinterList_Version_2(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:offlineprinter", data => {
      //console.log('LoginFunctions Info ==> ', user);
      console.log("|||||||||||||||||||| GetPrinterList_Version_2 ===> ", data);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  ClearPrinter(cb) {
    // AsyncStorage.multiRemove(['@global:user', '@global:token'], response => {
    //   console.log('Logout Success');
    //   cb(true);
    // });

    console.log("clear printer");
    // AsyncStorage.removeItem('@global:user', response => {
    // });

    AsyncStorage.removeItem("@global:kitchen_printer", response => {});
    AsyncStorage.removeItem("@global:label_printer", response => {});

    AsyncStorage.removeItem("@global:main_printer", response => {
      console.log("Logout Success");
      cb(true);
    });
  }

  DeletePrinterLabel(cb) {
    // AsyncStorage.multiRemove(['@global:user', '@global:token'], response => {
    //   console.log('Logout Success');
    //   cb(true);
    // });

    //console.log("clear printer");
    // AsyncStorage.removeItem('@global:user', response => {
    // });
    // AsyncStorage.removeItem("@global:kitchen_printer", response => {});
    // AsyncStorage.removeItem("@global:label_printer", response => {});

    AsyncStorage.removeItem("@global:label_printer", response => {
      console.log("Unset Success");
      cb(true);
    });
  }

  DeletePrinterMain(cb) {
    // AsyncStorage.multiRemove(['@global:user', '@global:token'], response => {
    //   console.log('Logout Success');
    //   cb(true);
    // });

    //console.log("clear printer");
    // AsyncStorage.removeItem('@global:user', response => {
    // });
    // AsyncStorage.removeItem("@global:kitchen_printer", response => {});
    // AsyncStorage.removeItem("@global:label_printer", response => {});

    AsyncStorage.removeItem("@global:main_printer", response => {
      console.log("Unset Success");
      cb(true);
    });
  }

  DeletePrinterKitchen(cb) {
    // AsyncStorage.multiRemove(['@global:user', '@global:token'], response => {
    //   console.log('Logout Success');
    //   cb(true);
    // });

    //console.log("clear printer");
    // AsyncStorage.removeItem('@global:user', response => {
    // });
    // AsyncStorage.removeItem("@global:kitchen_printer", response => {});
    // AsyncStorage.removeItem("@global:label_printer", response => {});

    AsyncStorage.removeItem("@global:kitchen_printer", response => {
      console.log("Unset Success");
      cb(true);
    });
  }
}

export default new PrinterFunctions();
