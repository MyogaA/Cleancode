/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class BlibliFunctions {
  constructor() {}

  GetBlibliLastSync(cb) {
    NewAsyncStorage.getItemByKey("@global:blibli_last_sync", res => {
      //console.log('LoginFunctions Info ==> ', user);
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(false);
      }
    });
  }

  SaveBlibliLastSync(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "blibli_last_sync",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetBlibliTempData(cb) {
    NewAsyncStorage.getItemByKey("@global:blibli_temp_data", res => {
      //console.log('LoginFunctions Info ==> ', user);
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(false);
      }
    });
  }

  SaveBlibliTempData(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "blibli_temp_data",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }


  GetBlibliTempDataDetailProduct(cb) {
    NewAsyncStorage.getItemByKey("@global:blibli_temp_data_detail", res => {
      //console.log('LoginFunctions Info ==> ', user);
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(false);
      }
    });
  }

  SaveBlibliTempDataDetailProduct(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "blibli_temp_data_detail",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }
}

export default new BlibliFunctions();
