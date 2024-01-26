import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class RegionFunctions {
  constructor() {}

  GetListSalesTypeProductLastUpdate(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey(
      "@global:list_sales_type_product_last_update",
      res => {
        if (res) {
          let dt = JSON.parse(res);
          cb(dt);
        } else {
          cb(0);
        }
      }
    );
  }

  SaveListSalesTypeProductLastUpdate(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "list_sales_type_product_last_update",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetListSalesTypeProduct(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:list_sales_type_product", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  SaveListSalesTypeProduct(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "list_sales_type_product",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetListCurrencyConversion(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:list_currency_conversion", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  SaveSettingLightMode(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "setting_light_mode",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveSettingKitchenManagement(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "setting_kitchen_management",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveListCurrencyConversion(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "list_currency_conversion",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetListCurrency(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:list_currency", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  SaveListCurrency(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "list_currency",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetPhone(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:phone", res => {
      if (res) {
        let dt = JSON.parse(res);
        console.log('GetPhone dt ===> ', dt);
        console.log('GetPhone res ===> ', res);

        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  GetCurrency(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:currency", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  GetCurrencyId(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:currency_id", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  GetSettingLightMode(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:setting_light_mode", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  GetSettingKitchenManagement(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:setting_kitchen_management", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }


  GetAllowMultiCurrency(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:allowmulticurrency", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  ChangeAllowMultiCurrency(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "allowmulticurrency",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetAllowDecimal(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:allowdecimal", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  ChangeAllowDecimal(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "allowdecimal",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  ChangeCurrency(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "currency",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  ChangeCurrencyId(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "currency_id",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  ChangePhone(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );

    console.log('CHANGE PHONE ===> ', data);
    NewAsyncStorage.setItem(
      "global",
      "phone",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }
}

export default new RegionFunctions();
