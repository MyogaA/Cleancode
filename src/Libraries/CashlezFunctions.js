/* eslint-disable quotes */
import { NativeModules } from "react-native";
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CashlezAuthentication, CashlezPayment, CashlezPrint } = NativeModules;

class CashlezFunctions {
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

  async InitializeCashlez(cb) {
    CashlezAuthentication.initialize()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        //console.log("InitializeCashlez => ", responseinitialize);
        cb(responseinitialize);
      })
      .catch(err => {
        console.log("error catch InitializeCashlez: ", err);
        cb(null);
        // fetching = false;
        // // Choose one, depends what you need.
        // return false; // If you want to ignore the error and do something in a chained .then()
        // return Promise.reject(err); // If you want to handle the error in a chained .catch()
      });
  }

  async PrintLastPayment(){
    CashlezPayment.printLastPayment();
  }

  

  async ReInitializeCashlez(cb) {
    CashlezPayment.reinitialize()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        //console.log("InitializeCashlez => ", responseinitialize);
        cb(responseinitialize);
      })
      .catch(err => {
        console.log("error catch ReInitializeCashlez: ", err);
        cb(null);
        // fetching = false;
        // // Choose one, depends what you need.
        // return false; // If you want to ignore the error and do something in a chained .then()
        // return Promise.reject(err); // If you want to handle the error in a chained .catch()
      });
  }

  SaveCashlezData(data, cb) {
    //console.log('SavePrinter2 ==> ', data);
    NewAsyncStorage.setItem(
      "global",
      "cashlez_data",
      JSON.stringify(data),
      response => {
        cb(true);
      }
    );
  }

  GetCashlezData(cb) {
    //let nas = new NewAsyncStorage();//
    NewAsyncStorage.getItemByKey("@global:cashlez_data", data => {
      //console.log('GetPrinter2 ==> ', data);
      if (data) {
        let dt = JSON.parse(data);//aneh
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  async LoginCashlez(user, password, cb) {
    CashlezAuthentication.login(user, password)
      .then(responselogin => Promise.all([responselogin]))
      .then(([responselogin]) => {
        cb(responselogin);
      })
      .catch(err => {
        console.log("error catch login:", err);
        cb(null);
      });
  }

  async InitializeCashlezPayment(cb) {
    CashlezPayment.initialize()
      .then(responseinitialize => Promise.all([responseinitialize]))
      .then(([responseinitialize]) => {
        cb(responseinitialize);
      })
      .catch(err => {
        console.log("error catch initialize:", err);
        cb(null);
      });
  }

  async PaymentStartLocationListener() {
    CashlezPayment.startLocationListener();
    CashlezPayment.startPayment();
  }

  async PaymentStopLocationListener(cb) {
    //CashlezPayment.stopLocationListener();
    //CashlezPayment.unregisterReader();
    // CashlezPayment.stopPayment();
    // CashlezPayment.stopPayment();


    CashlezPayment.logout()
      .then(response => Promise.all([response]))
      .then(([response]) => {
        cb(response);
      })
      .catch(err => {
        console.log("error catch PaymentCheckReader:", err);
        cb(null);
      });

  }

  async PaymentStartPayment()
  {
    CashlezPayment.startPayment();
  }

  async PaymentCheckReader(cb) {
    CashlezPayment.checkReader()
      .then(response => Promise.all([response]))
      .then(([response]) => {
        cb(response);
      })
      .catch(err => {
        console.log("error catch PaymentCheckReader:", err);
        cb(null);
      });
  }

  async InitializeShopee(cb) {
    CashlezPayment.initializeShopee()
      .then(response => Promise.all([response]))
      .then(([response]) => {
        cb(response);
      })
      .catch(err => {
        console.log("error catch initializeShopee:", err);
        cb(null);
      });
  }

  async StartShopee() {
    CashlezPayment.doStartShopeeHandler();
  }

  async GopayPayment(transaction_code, amount, description, cb) {
    //(@NonNull String transactionId, @NonNull String amount, @Nullable String description, @NonNull Promise promise)
    CashlezPayment.proceedGopayPayment(transaction_code, amount, description)
      .then(response => Promise.all([response]))
      .then(([response]) => {
        CashlezPayment.printGoPayQR();
        cb(response);
      })
      .catch(err => {
        console.log("error catch proceedShopeePayment:", err);
        cb(null);
      });
  }

  async ShopeePayment(transaction_code, amount, description, cb) {
    //(@NonNull String transactionId, @NonNull String amount, @Nullable String description, @NonNull Promise promise)
    CashlezPayment.proceedShopeePayment(transaction_code, amount, description)
      .then(response => Promise.all([response]))
      .then(([response]) => {
        CashlezPayment.printShopeeQR();
        cb(response);
      })
      .catch(err => {
        console.log("error catch proceedShopeePayment:", err);
        cb(null);
      });
  }

  async InitializeGopay(cb) {
    CashlezPayment.initializeGopay()
      .then(response => Promise.all([response]))
      .then(([response]) => {
        cb(response);
      })
      .catch(err => {
        console.log("error catch initializeGopay:", err);
        cb(null);
      });
  }


  async InitializeOvo(cb) {
    CashlezPayment.initializeOvo()
      .then(response => Promise.all([response]))
      .then(([response]) => {
        cb(response);
      })
      .catch(err => {
        console.log("error catch InitializeOvo:", err);
        cb(null);
      });
  }

  async OvoPayment(transaction_code, amount, description, phone, cb) {
    //(@NonNull String transactionId, @NonNull String amount, @Nullable String description, @NonNull Promise promise)
    CashlezPayment.proceedOvoPayment(
      transaction_code,
      amount,
      description,
      phone
    )
      .then(response => Promise.all([response]))
      .then(([response]) => {
        //CashlezPayment.printShopeeQR();
        cb(response);
      })
      .catch(err => {
        console.log("error catch OvoPayment:", err);
        cb(null);
      });
  }

  // async CheckOvoPayment(cb) {
  //   CashlezPayment.checkOvoPayment()
  //     .then(response => Promise.all([response]))
  //     .then(([response]) => {
  //       cb(response);
  //     })
  //     .catch(err => {
  //       console.log("error catch checkOvoPayment:", err);
  //       cb(null);
  //     });
  // }

  async CheckOvoPayment() {
    CashlezPayment.checkOvoPayment();
  }

  async PaymentCreditCard(transaction_code, amount, description, cb) {
    let payment_type_debit = CashlezPayment.PAYMENT_TRANSACTION_TYPE_DEBIT;
    let payment_type_credit = CashlezPayment.PAYMENT_TRANSACTION_TYPE_CREDIT;

    let pin = CashlezPayment.PAYMENT_VERIFICATION_MODE_PIN;
    let sign = CashlezPayment.PAYMENT_VERIFICATION_MODE_SIGNATURE;

    CashlezPayment.proceedPayment(
      transaction_code,
      amount,
      description,
      payment_type_credit,
      pin,
      "INTERNATIONAL_CARD",
      null
    )
      .then(response => Promise.all([response]))
      .then(([response]) => {
        // console.log("response PaymentProceedPayment => ", response);
        // let response_example = {
        //   accountHolder: "/",
        //   accountNumber: "************4693",
        //   acquirer: null,
        //   approvalCode: "141101",
        //   code: 200,
        //   message: "Your payment is : Approved",
        //   qrcode: null,
        //   referenceNumber: "115338404692",
        //   signature: null,
        //   success: true,
        //   traceNumber: "8"
        // };
        cb(response);
      })
      .catch(err => {
        console.log("error catch PaymentProceedPayment:", err);
        cb(null);
      });
  }

  async PaymentDebitCard(transaction_code, amount, description, cb) {
    let payment_type_debit = CashlezPayment.PAYMENT_TRANSACTION_TYPE_DEBIT;
    let payment_type_credit = CashlezPayment.PAYMENT_TRANSACTION_TYPE_CREDIT;

    let pin = CashlezPayment.PAYMENT_VERIFICATION_MODE_PIN;
    let sign = CashlezPayment.PAYMENT_VERIFICATION_MODE_SIGNATURE;

    CashlezPayment.proceedPayment(
      transaction_code,
      amount,
      description,
      payment_type_debit,
      pin,
      "LOCAL_CARD",
      null
    )
      .then(response => Promise.all([response]))
      .then(([response]) => {
        cb(response);
      })
      .catch(err => {
        console.log("error catch PaymentProceedPayment:", err);
        cb(null);
      });
  }
}

export default new CashlezFunctions();
