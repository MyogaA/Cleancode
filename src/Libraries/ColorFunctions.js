import NewAsyncStorage from './AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ColorFunctions {
  constructor() {}

  GetColor(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey('@global:maincolor', res => {
      //console.log('LoginFunctions Info ==> ', user);
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  BackToSetting(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey('@global:setting', res => {
      //console.log('LoginFunctions Info ==> ', user);
      if (res) {
        //let dt = JSON.parse(res);
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  Change(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'setting',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      'global',
      'maincolor',
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  DeleteBackToSetting(cb) {
    AsyncStorage.multiRemove(['@global:setting'], response => {
      //console.log('Logout Success');
      cb(true);
    });
  }
}

export default new ColorFunctions();
