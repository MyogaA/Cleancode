/* eslint-disable quotes */
import { NativeModules } from "react-native";
import NewAsyncStorage from "./AsyncStorage";

const { StarPrintModule, ScalingModule } = NativeModules;

// import { StarPRNT } from "react-native-star-prnt";

class StarPrintFunctions {
  constructor() {}

  async DiscoverStarPrinter(cb) {
    try {
      // let printers = await StarPRNT.portDiscovery("All");
      // console.log("DiscoverStarPrinter Functions ====> ", printers);
      // if (printers) {
      //   this.SaveStarPrinterList(printers, v => {
      //     console.log("DiscoverStarPrinter");
      //     cb(printers);
      //   });
      // } else {
      //   cb(false);
      // }
      cb(false)
    } catch (e) {
      console.error(e);
      cb(false);
    }
  }

  GetStarPrinterList(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:starprinterlist", res => {
      if (res) {
        let dt = JSON.parse(res);
        cb(dt);
      } else {
        cb(0);
      }
    });
  }

  SaveStarPrinterList(data, cb) {
    // NewAsyncStorage.setItem(
    //   'global',
    //   'phone',
    //   JSON.stringify('true'),
    //   response => {}
    // );
    NewAsyncStorage.setItem(
      "global",
      "starprinterlist",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  async PrintCommand(commands, portName, emulation = "StarPRNT", cb) {
    try {
      // var printResult = await StarPRNT.print(emulation, commands, portName);
      // console.log(printResult); // Success!
      cb(true);
    } catch (e) {
      console.error(e);
      cb(false);
    }
  }

  async OpenDrawer(portName, emulation = "StarPRNT", cb)
  {
    let commands = [];
    commands.push({
      openCashDrawer: 1
    });

    try {
      // var printResult = await StarPRNT.print(emulation, commands, portName);
      // console.log(printResult); // Success!
      cb(true);
    } catch (e) {
      console.error(e);
      cb(false);
    }
  }

  async PrintTesting(portName, emulation = "StarPRNT", cb) {
    let commands = [];
    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Center });
    // commands.push({
    //   append:
    //     "Star Clothing Boutique\n" +
    //     "123 Star Road\n" +
    //     "City, State 12345\n" +
    //     "\n"
    // });
    // commands.push({
    //   appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed
    // });

    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Right });
    // commands.push({
    //   append:
    //     "Star Clothing Boutique\n" +
    //     "123 Star Road\n" +
    //     "City, State 12345\n" +
    //     "\n"
    // });
    // commands.push({
    //   appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed
    // });

    // commands.push({ appendAlignment: StarPRNT.AlignmentPosition.Left });
    // commands.push({
    //   append:
    //     "Star Clothing Boutique\n" +
    //     "123 Star Road\n" +
    //     "City, State 12345\n" +
    //     "\n"
    // });
    // commands.push({
    //   appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed
    // });

    try {
      // var printResult = await StarPRNT.print(emulation, commands, portName);
      // console.log(printResult); // Success!
      cb(true);
    } catch (e) {
      console.error(e);
      cb(false);
    }
  }

  async InitializeStarPrint(cb) {
    //console.log("NativeModules ============ ", StarPrintModule)
    // StarPrintModule.initializeStarPrint()
    //   //SunmiModule.initLocaleLanguage()
    //   .then(responseinitialize => Promise.all([responseinitialize]))
    //   .then(([responseinitialize]) => {
    //     cb(responseinitialize);
    //   })
    //   .catch(err => {
    //     console.log("error:", err);
    //     cb(null);
    //   });
    cb(true);
  }

  // async ResetWeight(cb) {
  //   StarPrintModule.testZero()
  //     //SunmiModule.initLocaleLanguage()
  //     .then(responseinitialize => Promise.all([responseinitialize]))
  //     .then(([responseinitialize]) => {
  //       cb("success");
  //     })
  //     .catch(err => {
  //       console.log("error:", err);
  //       cb("failed");
  //     });
  // }

  async openPort(cb) {
    // StarPrintModule.openPort()
    //   //SunmiModule.initLocaleLanguage()
    //   .then(responseinitialize => Promise.all([responseinitialize]))
    //   .then(([responseinitialize]) => {
    //     cb(responseinitialize);
    //   })
    //   .catch(err => {
    //     console.log("error:", err);
    //     cb(null);
    //   });
    cb(true);
  }

  async closePort(cb) {
    // StarPrintModule.openPort()
    //   //SunmiModule.initLocaleLanguage()
    //   .then(responseinitialize => Promise.all([responseinitialize]))
    //   .then(([responseinitialize]) => {
    //     cb(responseinitialize);
    //   })
    //   .catch(err => {
    //     console.log("error:", err);
    //     cb(null);
    //   });
    cb(true);
  }

  async getDeviceName(cb) {
    // StarPrintModule.getDeviceName()
    //   //SunmiModule.initLocaleLanguage()
    //   .then(responseinitialize => Promise.all([responseinitialize]))
    //   .then(([responseinitialize]) => {
    //     cb(responseinitialize);
    //   })
    //   .catch(err => {
    //     console.log("error:", err);
    //     cb(null);
    //   });
      cb(true);
  }
}

export default new StarPrintFunctions();
