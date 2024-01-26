/* eslint-disable quotes */
import { NativeModules } from "react-native";

import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { AutoPrintModule } = NativeModules;


class AutoPrintFunctions {
  constructor() {}

  async InitializePrint(cb) {
    AutoPrintModule.initialize()
    .then((responseinitialize) => Promise.all([responseinitialize]))
    .then(([responseinitialize]) => {
      cb(true)
      // console.log("initialize ===> ", responseinitialize);
      //alert(JSON.stringify(responseinitialize));
    })
    .catch((err) => {
      console.log("error catch initialize:", err);
      cb(false)
    });

  }

  async FindPrinter(cb)
  {
    AutoPrintModule.searchPrinterV3()
    .then((responseinitialize) => Promise.all([responseinitialize]))
    .then(([responseinitialize]) => {
      // console.log("searchPrinterV3 ===> ", responseinitialize);
      // this.setState({ allowPrinterInternal: true });
      // alert("Printer Found");
      cb(true);
      //alert(JSON.stringify(responseinitialize));
    })
    .catch((err) => {
      console.log("error catch testPrint:", err);
      cb(false);
    });
  }

  async ConnectPrinter(cb)
  {
    AutoPrintModule.connectToPrinter()
    .then((responseinitialize) => Promise.all([responseinitialize]))
    .then(([responseinitialize]) => {
      console.log("TestConnectToPrinter ===> ", responseinitialize);
      //alert(JSON.stringify(responseinitialize));

      AutoPrintModule.stopSearchPrinter();


      cb(true);
      // alert("Printer Connected");
      // this.setState({ allowPrinterInternal: true });
    })
    .catch((err) => {
      cb(false)
      console.log("error catch testPrint:", err);
    });
  }


  async PrintNoInvoiceFunction(title, head, tail, invoice, sub_total, discount, tax, services, total, bayar, kembali, nameData, numData, amountData, cb)
  {
    // let nameData = ["Product nomor satu 1", "Product \r\n dua \r\n 2", "Tiga Product 3", "Emp4T Product 4"];
    // let numData = [1,2,3,4];
    // let amountData = [1000,2000,3000,4000];
    // let title = "Title Here parameter";
    // let head = "head parameter";
    // let tail = "tail parameter";
    // let invoice = "invoice parameter";
    // let sub_total = 10000;
    // let discount = 1000;
    // let tax = 1000;
    // let services = 1000;
    // let total = 11000;
    AutoPrintModule.clearTicketItems()
    .then(responseClearticketItem => Promise.all([responseClearticketItem]))
    .then(([responseClearticketItem]) => {
      // console.log("responseClearticketItem:", responseClearticketItem);
        let dataLength = nameData.length - 1;
        nameData.map((v, i) => {
          AutoPrintModule.setTicketItems(nameData[i], numData[i], amountData[i])
          .then(responsesetTicketItems => Promise.all([responsesetTicketItems]))
          .then(([responsesetTicketItems]) => {
            // console.log("responsesetTicketItems:", responsesetTicketItems);
            if (i === dataLength)
            {
              AutoPrintModule.printParameterNoInvoice(title, head, tail, invoice, sub_total, discount, tax, services, total, bayar, kembali)
              .then(responseprintParameter => Promise.all([responseprintParameter]))
              .then(([responseprintParameter]) => {
                // console.log("responseprintParameter:", responseprintParameter);
                cb(true);
              })
              .catch(err => {
                console.log("error catch responseprintParameter:", err);
                cb(false);
              });
            }
          })
          .catch(err => {
            console.log("error catch responsesetTicketItems:", err);
            cb(false);
          });
        })
    })
    .catch(err => {
      console.log("error catch responseClearticketItem:", err);
      cb(false);
    });
  }



  async PrintFunction(title, head, tail, invoice, sub_total, discount, tax, services, total, bayar, kembali, nameData, numData, amountData, cb)
  {
    // let nameData = ["Product nomor satu 1", "Product \r\n dua \r\n 2", "Tiga Product 3", "Emp4T Product 4"];
    // let numData = [1,2,3,4];
    // let amountData = [1000,2000,3000,4000];
    // let title = "Title Here parameter";
    // let head = "head parameter";
    // let tail = "tail parameter";
    // let invoice = "invoice parameter";
    // let sub_total = 10000;
    // let discount = 1000;
    // let tax = 1000;
    // let services = 1000;
    // let total = 11000;
    AutoPrintModule.clearTicketItems()
    .then(responseClearticketItem => Promise.all([responseClearticketItem]))
    .then(([responseClearticketItem]) => {
      // console.log("responseClearticketItem:", responseClearticketItem);
        let dataLength = nameData.length - 1;
        nameData.map((v, i) => {
          AutoPrintModule.setTicketItems(nameData[i], numData[i], amountData[i])
          .then(responsesetTicketItems => Promise.all([responsesetTicketItems]))
          .then(([responsesetTicketItems]) => {
            // console.log("responsesetTicketItems:", responsesetTicketItems);
            if (i === dataLength)
            {
              AutoPrintModule.printParameter(title, head, tail, invoice, sub_total, discount, tax, services, total, bayar, kembali)
              .then(responseprintParameter => Promise.all([responseprintParameter]))
              .then(([responseprintParameter]) => {
                // console.log("responseprintParameter:", responseprintParameter);
                cb(true);
              })
              .catch(err => {
                console.log("error catch responseprintParameter:", err);
                cb(false);
              });
            }
          })
          .catch(err => {
            console.log("error catch responsesetTicketItems:", err);
            cb(false);
          });
        })
    })
    .catch(err => {
      console.log("error catch responseClearticketItem:", err);
      cb(false);
    });
  }


  async PrintRecapFunction(title, head, tail, invoice, nameData, numData, amountData, nameRekapData, amountRekapData, cb){
    // let nameData = ["Product nomor satu 1", "Product dua 2", "Tiga Product 3", "Emp4T Product 4"];
    // let numData = [1,2,3,4];
    // let amountData = [1000,2000,3000,4000];

    // let nameRekapData = ["Tunai", "Bank\r\nBCA", "QR", "Total"];
    // let amountRekapData = [3000,2000,5000,10000];

    // let title = "Title Here rekap";
    // let head = "head rekap";
    // let tail = "tail rekap";
    // let invoice = "invoice rekap";

    AutoPrintModule.clearRekapTicketItems().then(responseclearRekapTicketItems => Promise.all([responseclearRekapTicketItems]))
    .then(([responseclearRekapTicketItems]) => {
      // console.log("responseclearRekapTicketItems:", responseclearRekapTicketItems);

      let dataLengthRekap = nameRekapData.length - 1;
      nameRekapData.map((x, y) => {
        AutoPrintModule.setRekapTicketItems(nameRekapData[y], amountRekapData[y])
          .then(responsesetRekapTicketItems => Promise.all([responsesetRekapTicketItems]))
          .then(([responsesetRekapTicketItems]) => {
            // console.log("responseclearRekapTicketItems:", responseclearRekapTicketItems);
            if (y === dataLengthRekap)
            {
              AutoPrintModule.clearTicketItems()
              .then(responseClearticketItem => Promise.all([responseClearticketItem]))
              .then(([responseClearticketItem]) => {
                // console.log("responseClearticketItem:", responseClearticketItem);

                  let dataLength = nameData.length - 1;
                  nameData.map((v, i) => {
                    AutoPrintModule.setTicketItems(nameData[i], numData[i], amountData[i])
                    .then(responsesetTicketItems => Promise.all([responsesetTicketItems]))
                    .then(([responsesetTicketItems]) => {
                      // console.log("responsesetTicketItems:", responsesetTicketItems);
                      if (i === dataLength)
                      {
                        AutoPrintModule.printRekap(title, head, tail, invoice)
                        .then(responseprintParameter => Promise.all([responseprintParameter]))
                        .then(([responseprintParameter]) => {
                          // console.log("res printRekap:", responseprintParameter);
                          cb(true);
                        })
                        .catch(err => {
                          cb(false);
                          // console.log("error catch responseprintParameter:", err);
                        });
                      }
                    })
                    .catch(err => {
                      cb(false);
                      // console.log("error catch responsesetTicketItems:", err);
                    });
                  })   
              })
              .catch(err => {
                // console.log("error catch responseClearticketItem:", err);
                cb(false);
              });
            }
          }).catch(err => {
            // console.log("error catch responseprintParameter:", err);
            cb(false);
          });
      });
    });
  }

}

export default new AutoPrintFunctions();
