/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class MenuFunctions {
  constructor() {}

  GetMenu(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:newmenu", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetName(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:newname", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetTableID(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:table_id", val => {
      //console.log('LoginFunctions Info ==> ', user);
      if (val) {
        let dt = JSON.parse(val);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetCustomerID(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:customer_id", val => {
      //console.log('LoginFunctions Info ==> ', user);
      if (val) {
        let dt = JSON.parse(val);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetBookingID(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:booking_id", val => {
      //console.log('LoginFunctions Info ==> ', user);
      if (val) {
        let dt = JSON.parse(val);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetOrderID(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:order_id", val => {
      //console.log('LoginFunctions Info ==> ', user);
      if (val) {
        let dt = JSON.parse(val);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveBookingID(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "booking_id",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveCustomerID(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "customer_id",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveTableID(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "table_id",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveOrderID(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "order_id",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveMenu(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "newmenu",
      JSON.stringify(data),
      response => {
        //cb(true);
        cb(data);
      }
    );
  }

  SaveName(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "newname",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  ClearNewMenu(cb) {
    AsyncStorage.removeItem("@global:newmenu", response => {
      cb(true);
    });
  }

  ClearNewMenuAll(cb) {
    AsyncStorage.multiRemove(
      [
        "@global:newmenu",
        "@global:newname",
        "@global:order_id",
        "@global:table_id",
        "@global:booking_id",
        "@global:customer_id",
      ],
      response => {
        cb(true);
      }
    );
  }

  ClearNewMenuCheckIn(cb) {
    AsyncStorage.multiRemove(
      [
        "@global:newmenu",
        "@global:newname",
        "@global:order_id",
        "@global:booking_id",
        "@global:customer_id",
      ],
      response => {
        cb(true);
      }
    );
  }
}

export default new MenuFunctions();
