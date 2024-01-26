/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class CZFunctions {
  constructor() {}


  //function disini dipake untuk debug mode karena debug refresh page maunya sekali klik ga reset data
  GetCZResponse(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:cz_response", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetCZURI(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:cz_uri", data => {
      //console.log('LoginFunctions Info ==> ', user);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveCZURI(data, cb) {
    console.log("@global:cz_uri");
    NewAsyncStorage.setItem(
      "global",
      "cz_uri",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  SaveCZResponse(data, cb) {
    console.log("@global:cz_response");
    NewAsyncStorage.setItem(
      "global",
      "cz_response",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  ClearAll(cb) {
    AsyncStorage.multiRemove(
      [
        "@global:cz_response",
        "@global:cz_uri",
      ],
      response => {
        cb(true);
      }
    );
  }
}

export default new CZFunctions();
