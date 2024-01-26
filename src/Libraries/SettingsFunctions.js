import NewAsyncStorage from './AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SettingsFunctions {
  constructor() {}

  GetStartHour(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey('@global:starthour', res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  GetEndHour(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey('@global:endhour', res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  GetOpenDays(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey('@global:opendays', res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  SaveOpenDays(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      'global',
      'opendays',
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  SaveStartHour(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      'global',
      'starthour',
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  SaveEndHour(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      'global',
      'endhour',
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }


  GetPapaRecepiId(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey('@global:paparecepiid', res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  SavePapaRecepiId(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      'global',
      'paparecepiid',
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }
}

export default new SettingsFunctions();
