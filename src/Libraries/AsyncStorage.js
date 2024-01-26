import AsyncStorage from '@react-native-async-storage/async-storage';

class NewAsyncStorage {
  constructor() {}

  // async getItemByKey(tablekey, cb){
  //     try{
  //         let e = await AsyncStorage.getItem(tablekey);
  // 		// console.log('NAS NORMAL!', tablekey);
  //         cb(e);
  //     }
  //     catch(e){
  // 		console.log('NAS AB_NORMAL!', tablekey, e);
  //         cb(null);
  //     }
  // }

  static getItemByKey(tablekey, cb) {
    AsyncStorage.getItem(tablekey)
      .then(e => {
        // console.log('NAS NORMAL!', tablekey);
        cb(e);
      })
      .catch(e => {
        console.log('NAS AB_NORMAL!', tablekey, e);
        cb(null);
      });
  }

  static asyncGetItemByKey(tablekey) {
    return new Promise(resolv => {
      this.getItemByKey(tablekey, e => resolv(e));
    });
  }

  static setItem(table, key, value, cb) {
    AsyncStorage.setItem('@' + table + ':' + key, value, q => {
      cb(q);
    ;});
  }

  static asyncSetItem(table, key, value) {
    return new Promise(resolv => {
      NewAsyncStorage.setItem(table, key, value, resolv);
    });
  }

  static removeItem(table, key, cb) {
    AsyncStorage.removeItem('@' + table + ':' + key, q => {
      cb(q);
    });
  }

  static removeMultiItems(table, keys, cb) {
    let namaLSs = [];
    for (let i in keys) {
      if (keys.hasOwnProperty(i)) {
        namaLSs.push(`@${table}:${keys[i]}`);
      }
    }
    AsyncStorage.multiRemove(namaLSs, e => cb(e));
  }
}

export default NewAsyncStorage;
