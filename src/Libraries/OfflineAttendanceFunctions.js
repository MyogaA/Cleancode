/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class OfflineMenuFunctions {
  constructor() {}

  GetListUser(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:listuser", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  GetTempAttendance(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:tempattendance", menu => {
      //console.log('LoginFunctions Info ==> ', user);
      if (menu) {
        let dt = JSON.parse(menu);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  

  SaveTempAttendance(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "tempattendance",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  SaveListUser(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "listuser",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  DeleteTempAttendance(cb){
    AsyncStorage.multiRemove(["@global:tempattendance"], response => {
      cb(true);
    });
  }

  // ClearAllOfflineData(cb) {
  //   AsyncStorage.multiRemove(
  //     [
  //       "@global:favmenu",
  //       "@global:categorymenu",
  //       "@global:allmenu",
  //       "@global:lastupdate"
  //     ],
  //     response => {
  //       cb(true);
  //     }
  //   );
  // }

  DeleteTemporaryOrder(cb) {
    AsyncStorage.multiRemove(["@global:temporder"], response => {
      cb(true);
    });
  }
}

export default new OfflineMenuFunctions();
