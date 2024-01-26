/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class OfflineMenuFunctions {
  constructor() {}

  GetFavMenu(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:favmenu", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetCategoryMenu(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:categorymenu", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetAllMenu(cb) {
    NewAsyncStorage.getItemByKey("@global:allmenu", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetAddonsMenu(cb) {
    NewAsyncStorage.getItemByKey("@global:addons", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetSalesType(cb) {
    NewAsyncStorage.getItemByKey("@global:salestype", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetPaymentType(cb) {
    NewAsyncStorage.getItemByKey("@global:paymenttype", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetAllProduct(cb) {
    NewAsyncStorage.getItemByKey("@global:allproduct", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  //`@global:order_id${gerai_id}`
  GetLastUpdate(cb) {
    //let nas = new NewAsyncStorage();
    console.log('lastupdate 0');

    NewAsyncStorage.getItemByKey("@global:lastupdate", menu => {
      console.log('lastupdate 1');
      if (menu) {
        console.log('lastupdate 2');

        let dt = JSON.parse(menu);
        console.log('lastupdate 3');
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveFavMenu(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "favmenu",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveAllProduct(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "allproduct",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveAllMenu(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "allmenu",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveLastUpdate(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "lastupdate",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  // SaveMenu2(data, gerai_id, cb) {
  //   console.log(`@global:menu${gerai_id}`);
  //   NewAsyncStorage.setItem(
  //     "global",
  //     `menu${gerai_id}`,
  //     JSON.stringify(data),
  //     response => {
  //       //console.log('LoginFunctions Login data ==> ', data);
  //       cb(true);
  //     }
  //   );
  // }

  SaveOrderMenu(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "ordermenu",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetOrderMenu(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:ordermenu", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetTemporaryOrderDineIn(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:temporder_2", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveTemporaryOrderDineIn(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "temporder_2",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetTemporaryOrder(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:temporder", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveTemporaryOrder(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "temporder",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveCategoryMenu(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "categorymenu",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveTableData(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "table",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetTableData(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:table", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetPhoneNumber(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:phonenumber", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveSalesType(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "salestype",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SavePaymentType(data, cb) {
    //console.log("save payment type ===> ", data);
    NewAsyncStorage.setItem(
      "global",
      "paymenttype",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveTaxRate(data, cb) {
    //console.log("save tax type ===> ", data);
    NewAsyncStorage.setItem(
      "global",
      "taxrate",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SavePhoneNumber(data, cb) {
    //console.log("save tax type ===> ", data);
    NewAsyncStorage.setItem(
      "global",
      "phonenumber",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveServiceRate(data, cb) {
    //console.log("save services type ===> ", data);
    NewAsyncStorage.setItem(
      "global",
      "servicerate",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveOutletAddress(data, cb) {
    //console.log("save services type ===> ", data);
    NewAsyncStorage.setItem(
      "global",
      "outletaddress",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetOutletAddress(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:outletaddress", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetServiceRate(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:servicerate", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetTaxRate(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:taxrate", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveAddons(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "addons",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SavePaymentMethod(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "payment_method",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveLastUpdatePaymentMethod(data, cb) {
    console.log("SaveLastUpdatePaymentMethod ====> ",data);
    NewAsyncStorage.setItem(
      "global",
      "payment_method_last_update",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetLastUpdatePaymentMethod(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:payment_method_last_update", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        console.log("GetLastUpdatePaymentMethod ====> ",dt);

        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetPaymentMethod(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:payment_method", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SavePromoSpecial(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "promo_special",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetPromoSpecial(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:promo_special", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveLastUpdatePromoSpecial(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "promo_special_last_update",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetLastUpdatePromoSpecial(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:promo_special_last_update", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SavePromoVoucher(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "promo_voucher",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetPromoVoucher(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:promo_voucher", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveLastUpdatePromoVoucher(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "promo_voucher_last_update",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetLastUpdatePromoVoucher(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:promo_voucher_last_update", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SavePromoAutomatic(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "promo_automatic",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetPromoAutomatic(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:promo_automatic", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveLastUpdatePromoAutomatic(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "promo_automatic_last_update",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetLastUpdatePromoAutomatic(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey(
      "@global:promo_automatic_last_update",
      menu => {
        //console.log('LoginFunctions Info ==> ', user);
        if (menu) {
          let dt = JSON.parse(menu);
          cb(dt);
        } else {
          cb(null);
        }
      }
    );
  }

  ClearAllOfflineData(cb) {
    AsyncStorage.multiRemove(
      [
        "@global:favmenu",
        "@global:categorymenu",
        "@global:allmenu",
        "@global:lastupdate",
        "@global:promo_automatic_last_update"
      ],
      response => {
        cb(true);
      }
    );
  }

  DeleteTemporaryOrder(cb) {
    AsyncStorage.multiRemove(["@global:temporder"], response => {
      cb(true);
    });
  }
}

export default new OfflineMenuFunctions();
