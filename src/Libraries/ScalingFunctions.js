/* eslint-disable quotes */
import { NativeModules } from "react-native";

const { ScalingModule } = NativeModules;

class ScalingFunctions {
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

  async CalculateWeight(cb) {
    ScalingModule.initializeScaling()
      //SunmiModule.initLocaleLanguage()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        cb(responseinitialize);
      })
      .catch(err => {
        console.log("error:", err);
        cb(null);
      });
  }

  async ResetWeight(cb) {
    ScalingModule.testZero()
      //SunmiModule.initLocaleLanguage()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        cb("success");
      })
      .catch(err => {
        console.log("error:", err);
        cb("failed");
      });
  }

  async OpenDrawer(cb) {
    try {
      console.log("Success Open Drawer");
      ScalingModule.openDrawer();
    } catch (error) {
      console.log("Error Open Drawer ===> ", error);
    }
  }
}

export default new ScalingFunctions();
