/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

class DateTimeFunctions {
  constructor() {}

  convertToEpoch(input) {
    var myDate = input; // Your timezone!
    // var myEpoch = myDate.getTime()/1000.0;
    var myEpoch = myDate.getTime();

    var output = myEpoch;

    return output;
  }

  convertFromEpoch(input, ms) {
    var myEpoch = new Date(input * (ms ? 1000 : 1)); // Epoch Time
    var output = myEpoch;
    return output;
  }
}

export default new DateTimeFunctions();
