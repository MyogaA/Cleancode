/* eslint-disable quotes */
import { NativeModules } from "react-native";

const { SunmiModule } = NativeModules;

class SunmiFunctions {
  constructor() {}

  //   InitializeCashlez_1(cb) {
  //     //Digunakan untuk Device ID One Signal
  //     //let nas = new NewAsyncStorage();
  //     NewAsyncStorage.getItemByKey("@global:device_info", device_info => {
  //       //console.log('LoginFunctions Info ==> ', user);
  //       if (device_info) {
  //         let dt = JSON.parse(device_info);
  //         cb(dt);
  //       } else {
  //         cb(null);
  //       }
  //     });
  //   }

  async InitializeSunmi(cb) {
    SunmiModule.initializeSunmiPayment()
      //SunmiModule.initLocaleLanguage()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        cb(responseinitialize);
      })
      .catch(err => {
        console.log("error catch initialize:", err);
        cb(null);
      });
  }

  async PrintText(text = "\n", size = 20, align = 0, margin = 0) {
    //String text, int size, int align, int marginBottom,Promise promise
    //align 1 = center align 2 = right
    //20 = 38
    //24 = 32
    //28 = 27

    SunmiModule.printText(text, size, align, margin)
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {})
      .catch(err => {
        console.log("error catch testPrint:", err);
      });
  }

  countLength(str) {
    var count = 0;
    for (var i = 0, len = str.length; i < len; i++) {
      count += str.charCodeAt(i) < 256 ? 1 : 2;
    }
    return count;
  }

  async PrintLine(printType = 1) {
    //String text, int size, int align, int marginBottom,Promise promise
    //align 1 = center align 2 = right
    //20 = 38
    //24 = 32
    //28 = 27
    let text = "";
    if (printType === 2) {
      text = "------------------------------------------------";
    } else {
      text = "--------------------------------";
    }

    SunmiModule.printText(text, 24, 0, 0)
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {})
      .catch(err => {
        console.log("error catch testPrint:", err);
      });
  }

  async InitializeSunmiPrinter(cb) {
    SunmiModule.bindPrintService()
      //SunmiModule.initLocaleLanguage()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        cb(responseinitialize);
      })
      .catch(err => {
        console.log("error catch initialize:", err);
        cb(null);
      });
  }

  async GetSystemParameter(cb) {
    SunmiModule.getSystemParameter()
      //SunmiModule.initLocaleLanguage()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        console.log("getSystemParameter ===> ", responseinitialize);
        cb(responseinitialize);
      })
      .catch(err => {
        console.log("error catch getSystemParameter:", err);
        cb(null);
      });
  }

  async BuzzerControl(count, freq, duration, delay) {
    //SunmiModule.buzzerControl(1, 2750, 200, 500)
    SunmiModule.buzzerControl(count, freq, duration, delay)
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {})
      .catch(err => {
        console.log("error catch getSystemParameter:", err);
      });
  }

  async LEDControl(index, status) {
    // /**
    //  * operate LED light status
    //  *
    //  * @param ledIndex  The led index,1~4,1-Red，2-Green，3-Yellow，4-Blue
    //  * @param ledStatus LED Status，0-ON, 1-OFF
    //  */
    SunmiModule.ledStatus(index, status)
      //SunmiModule.initLocaleLanguage()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        //console.log("getSystemParameter ===> ", responseinitialize);
      })
      .catch(err => {
        console.log("error catch getSystemParameter:", err);
        //console.log("error catch getSystemParameter:", err);
      });
  }

  async CheckCard(cb) {
    this.LEDControl(2, 0);
    this.BuzzerControl(1, 2750, 200, 0);

    SunmiModule.checkCard()
      //SunmiModule.initLocaleLanguage()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        //console.log("checkCard ===> ", responseinitialize);
        this.LEDControl(2, 1);

        //this.LEDControl(4, 0);
        cb(responseinitialize);
      })
      .catch(err => {
        console.log("error catch checkCard:", err);
        cb(null);
        //this.CancelCheckCard();
        this.LEDControl(2, 1);
      });
    setTimeout(() => {
      this.LEDControl(2, 1);
      //this.LEDControl(4, 1);
      this.BuzzerControl(1, 2750, 1000, 500);
      //this.CancelCheckCard();
      cb(null);
    }, 60000);
  }

  async CancelCheckCard() {
    SunmiModule.cancelCheckCardIC();
    SunmiModule.cancelCheckCardRF();
  }
}

export default new SunmiFunctions();
