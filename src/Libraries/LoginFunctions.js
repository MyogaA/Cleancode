/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginAPI, BE_LoginAPI, BE_LogoutAPI } from "../Constants";

class LoginFunctions {
  constructor() {}

  GetDeviceInfo(cb) {
    //Digunakan untuk Device ID One Signal
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:device_info", device_info => {
      //console.log('LoginFunctions Info ==> ', user);
      if (device_info) {
        let dt = JSON.parse(device_info);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveDeviceInfo(device_info, cb) {
    NewAsyncStorage.setItem(
      "global",
      "device_info",
      JSON.stringify(device_info),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  SetExpirationTime(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "expirationtime",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetExpirationTime(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:expirationtime", user => {
      //console.log('LoginFunctions Info ==> ', JSON.parse(user));
      if (user) {
        let dt = JSON.parse(user);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  LoginInformation(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:user", user => {
      //console.log('LoginFunctions Info ==> ', JSON.parse(user));
      if (user) {
        let dt = JSON.parse(user);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  UpdateLoginInformation(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "user",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetRememberMe(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:rememberme", user => {
      //console.log('LoginFunctions Info ==> ', user);
      if (user) {
        let dt = JSON.parse(user);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SaveRememberMe(data, cb) {
    console.log("@global:rememberme");
    NewAsyncStorage.setItem(
      "global",
      "rememberme",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  AuthToken(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:auth", user => {
      //console.log('LoginFunctions Info ==> ', user);
      if (user) {
        let dt = JSON.parse(user);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SetPreviliges(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "previliges",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetPreviliges(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:previliges", user => {
      //console.log('LoginFunctions Info ==> ', user);
      if (user) {
        let dt = JSON.parse(user);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  SetMainMenu(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "mainmenu",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }

  GetMainMenu(cb) {
    //let nas = new NewAsyncStorage();
    NewAsyncStorage.getItemByKey("@global:mainmenu", user => {
      //console.log('LoginFunctions Info ==> ', user);
      if (user) {
        let dt = JSON.parse(user);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }

  Login(data, cb) {
    NewAsyncStorage.setItem(
      "global",
      "user",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        cb(true);
      }
    );
  }


  LoginFunction_BE(data, cb) {
    console.log("Login Function ==> ", data);

    console.log(
      "body ==> ",
      JSON.stringify({
        staff_id: data.staff_id,
        email: data.email,
        password: data.password,
        device_id: data.device_id
      })
    );

    console.log("uri ==> ", BE_LoginAPI);

    fetch(BE_LoginAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        staff_id: data.staff_id,
        email: data.email,
        password: data.password,
        device_id: data.device_id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson LOGIN ==> ", responseJson);

        let result = responseJson;

        let token = responseJson.token;

        if (responseJson.statusCode === 200) {
          let resultData = result.data;
          //console.log('new data ==>', JSON.stringify(resultData));

          let data_user = responseJson.data.user;
          let userInfo = {
            id: data_user.user_id,
            role_id: data_user.role_id,
            role_name: data_user.role_name,
            is_verified: data_user.is_verified,
            last_login: data_user.last_login,
            is_login: data_user.is_login,
            retail_id: data_user.business_id,
            gerai_id: data_user.outlet_id,
            device_id: data_user.device_id,
            name: data_user.name,
            staff_id: data_user.staff_id,
            refund_auth: 1,
            token: `bearer ${resultData.token}`,
            restaurant_name: data_user.outlet_name,
            restaurant_address: data_user.outlet_address,
            business_name: data_user.business_name,
            business_category: data_user.business_category,
            business_type: data_user.business_type,
            privileges: data_user.privileges,
            email: data_user.business_email,
            gerai_name: data_user.outlet_name,
            description: data_user.outlet_address,
            auth: `bearer ${resultData.token}`
          };

          NewAsyncStorage.setItem(
            "global",
            "user",
            JSON.stringify(userInfo),
            response => {
              //console.log('LoginFunctions Login data ==> ', data);
              //cb(true);
            }
          );

          NewAsyncStorage.setItem(
            "global",
            "auth",
            JSON.stringify("bearer " + resultData.token),
            response => {
              //console.log('LoginFunctions Login data ==> ', data);
              //cb(true);
            }
          );

          NewAsyncStorage.setItem(
            "global",
            "user",
            JSON.stringify(userInfo),
            response => {
              //console.log('LoginFunctions Login data ==> ', data);
              //cb(true);
            }
          );

          //login pertama kali ga perlu update user list masukin userlistnya ke user pertama kalo logout ilang smua
          const user_list = [];
          user_list.push(userInfo);

          NewAsyncStorage.setItem(
            "global",
            "user_list",
            JSON.stringify(user_list),
            response => {}
          );

          // global@user = current user login
          // global@user_list = list user
          cb(result);
        } else {
          cb(result);
        }
      })
      .catch(_err => {
        console.log("ERR LOGIN ==> ", _err);
        cb(null);
      });
  }

  LoginFunction(data, cb) {
    console.log("Login Function ==> ", data);
    fetch(LoginAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        staff_id: data.staff_id,
        email: data.email,
        password: data.password,
        device_id: data.device_id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson LOGIN FUNCTION ==> ", responseJson);

        let result = responseJson;
        let resultData = result.data;
        console.log("DATA LOGIN FUNCTIONS ==>", JSON.stringify(resultData));
        NewAsyncStorage.setItem(
          "global",
          "user",
          JSON.stringify(resultData),
          response => {
            //console.log('LoginFunctions Login data ==> ', data);
            //cb(true);
          }
        );
        cb(result);
      })
      .catch(_err => {
        console.log("ERR ==> ", _err);
        cb(null);
      });
  }

  Logout(cb) {
    // AsyncStorage.multiRemove(['@global:user', '@global:token'], response => {
    //   console.log('Logout Success');
    //   cb(true);
    // });

    NewAsyncStorage.getItemByKey("@global:auth", auth => {
      console.log("auth logout process ==> ", auth);
      // AsyncStorage.removeItem('@global:user', response => {
      // });

      if (auth) {
        fetch(BE_LogoutAPI, {
          method: "POST",
          headers: {
            Authorization: JSON.parse(auth)
            //"Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log("Logout Response ==> ", responseJson);
            if (responseJson) {
              //menu
              AsyncStorage.removeItem("@global:newmenu", response => {});
              AsyncStorage.removeItem("@global:order_id", response => {});
              AsyncStorage.removeItem("@global:table_id", response => {});
              AsyncStorage.removeItem("@global:customer_id", response => {});
              AsyncStorage.removeItem("@global:booking_id", response => {});
              AsyncStorage.removeItem("@global:newname", response => {});
              //AsyncStorage.removeItem("@global:listuser", response => {});
              AsyncStorage.removeItem("@global:tempattendance", response => {});
              AsyncStorage.removeItem("@global:favmenu", response => {});
              AsyncStorage.removeItem("@global:categorymenu", response => {});
              AsyncStorage.removeItem("@global:allmenu", response => {});
              AsyncStorage.removeItem("@global:addons", response => {});
              AsyncStorage.removeItem("@global:salestype", response => {});
              AsyncStorage.removeItem("@global:paymenttype", response => {});
              AsyncStorage.removeItem("@global:lastupdate", response => {});
              AsyncStorage.removeItem("@global:temporder_2", response => {});
              AsyncStorage.removeItem("@global:temporder", response => {});
              AsyncStorage.removeItem("@global:table", response => {});
              AsyncStorage.removeItem("@global:phonenumber", response => {});
              AsyncStorage.removeItem("@global:taxrate", response => {});
              AsyncStorage.removeItem("@global:servicerate", response => {});
              AsyncStorage.removeItem("@global:outletaddress", response => {});
              AsyncStorage.removeItem("@global:payment_method", response => {});
              AsyncStorage.removeItem("@global:promo_special", response => {});
              AsyncStorage.removeItem("@global:promo_voucher", response => {});
              AsyncStorage.removeItem(
                "@global:promo_automatic",
                response => {}
              );
              AsyncStorage.removeItem(
                "@global:promo_automatic_last_update",
                response => {}
              );
              AsyncStorage.removeItem("@global:starthour", response => {});
              AsyncStorage.removeItem("@global:endhour", response => {});
              AsyncStorage.removeItem("@global:opendays", response => {});



              //new setting
              AsyncStorage.removeItem(
                "@global:setting_light_mode",
                response => {}
              );
              AsyncStorage.removeItem(
                "@global:setting_kitchen_management",
                response => {}
              );
              AsyncStorage.removeItem(
                "@global:allowmulticurrency",
                response => {}
              );
              AsyncStorage.removeItem("@global:allowdecimal", response => {});
              AsyncStorage.removeItem("@global:currency", response => {});
              AsyncStorage.removeItem("@global:currency_id", response => {});
              AsyncStorage.removeItem("@global:phone", response => {});
              AsyncStorage.removeItem("@global:currency", response => {});
              AsyncStorage.removeItem("@global:list_sales_type_product_last_update", response => {});
              AsyncStorage.removeItem("@global:list_sales_type_product", response => {});
              AsyncStorage.removeItem("@global:list_currency_conversion", response => {});
              AsyncStorage.removeItem("@global:list_currency", response => {});
              AsyncStorage.removeItem("@global:paparecepiid", response => {});
              AsyncStorage.removeItem("@global:language", response => {});
              AsyncStorage.removeItem("@global:auto_calculate_rekap", response => {});
              AsyncStorage.removeItem("@global:label_printer", response => {});
              AsyncStorage.removeItem("@global:show_stock", response => {});
              AsyncStorage.removeItem("@global:footer_printer", response => {});
              AsyncStorage.removeItem("@global:url_printer", response => {});
              AsyncStorage.removeItem("@global:setting_print_qr", response => {});
              AsyncStorage.removeItem("@global:setting_print_logo", response => {});
              AsyncStorage.removeItem("@global:show_order_id", response => {});
              AsyncStorage.removeItem("@global:image_uri", response => {});
              AsyncStorage.removeItem("@global:business_data", response => {});
              AsyncStorage.removeItem("@global:outlet_data", response => {});
              AsyncStorage.removeItem("@global:business_sub_type", response => {});
              AsyncStorage.removeItem("@global:setting_print_logo", response => {});
              AsyncStorage.removeItem("@global:image_base64", response => {});
              AsyncStorage.removeItem("@global:manual_print_cashlez", response => {});
              AsyncStorage.removeItem("@global:manual_print", response => {});
              AsyncStorage.removeItem("@global:cashlez_data", response => {});
              AsyncStorage.removeItem("@global:cz_response", response => {});
              AsyncStorage.removeItem("@global:cz_uri", response => {});
              AsyncStorage.removeItem("@global:previliges", response => {});
              AsyncStorage.removeItem("@global:mainmenu", response => {});
              AsyncStorage.removeItem("@global:payment_method_last_update", response => {});





              //user
              AsyncStorage.removeItem("@global:auth", response => {
                console.log("Logout Success");
              });
              AsyncStorage.removeItem("@global:user_list", response => {});
              AsyncStorage.removeItem("@global:user", response => {
                console.log("Logout Success");
                cb(true);
              });
            }
          });
      } else {
        cb(null);
      }
    });
  }

  LogoutSwitchUser(data, cb) {
    //update token delete temp data
    NewAsyncStorage.setItem(
      "global",
      "auth",
      JSON.stringify(data.token),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        //cb(true);
      }
    );

    AsyncStorage.removeItem("@global:newmenu", response => {});
    AsyncStorage.removeItem("@global:order_id", response => {});
    AsyncStorage.removeItem("@global:table_id", response => {});
    AsyncStorage.removeItem("@global:customer_id", response => {});
    AsyncStorage.removeItem("@global:booking_id", response => {});
    AsyncStorage.removeItem("@global:newname", response => {});
    // AsyncStorage.removeItem("@global:listuser", response => {});
    AsyncStorage.removeItem("@global:tempattendance", response => {});
    AsyncStorage.removeItem("@global:favmenu", response => {});
    AsyncStorage.removeItem("@global:categorymenu", response => {});
    AsyncStorage.removeItem("@global:allmenu", response => {});
    AsyncStorage.removeItem("@global:addons", response => {});
    AsyncStorage.removeItem("@global:salestype", response => {});
    AsyncStorage.removeItem("@global:paymenttype", response => {});
    AsyncStorage.removeItem("@global:lastupdate", response => {});
    AsyncStorage.removeItem("@global:temporder_2", response => {});
    AsyncStorage.removeItem("@global:temporder", response => {});
    AsyncStorage.removeItem("@global:table", response => {});
    AsyncStorage.removeItem("@global:phonenumber", response => {});
    AsyncStorage.removeItem("@global:taxrate", response => {});
    AsyncStorage.removeItem("@global:servicerate", response => {});
    AsyncStorage.removeItem("@global:outletaddress", response => {});
    AsyncStorage.removeItem("@global:payment_method", response => {});
    AsyncStorage.removeItem("@global:promo_special", response => {});
    AsyncStorage.removeItem("@global:promo_voucher", response => {});
    AsyncStorage.removeItem("@global:promo_automatic", response => {});
    AsyncStorage.removeItem("@global:starthour", response => {});
    AsyncStorage.removeItem("@global:endhour", response => {});
    AsyncStorage.removeItem("@global:opendays", response => {});

    //
    AsyncStorage.removeItem(
      "@global:setting_light_mode",
      response => {}
    );
    AsyncStorage.removeItem(
      "@global:setting_kitchen_management",
      response => {}
    );
    AsyncStorage.removeItem(
      "@global:allowmulticurrency",
      response => {}
    );
    AsyncStorage.removeItem("@global:allowdecimal", response => {});
    AsyncStorage.removeItem("@global:currency", response => {});
    AsyncStorage.removeItem("@global:currency_id", response => {});

    AsyncStorage.removeItem("@global:phone", response => {});
    AsyncStorage.removeItem("@global:currency", response => {});
    AsyncStorage.removeItem("@global:list_sales_type_product_last_update", response => {});
    AsyncStorage.removeItem("@global:list_sales_type_product", response => {});
    AsyncStorage.removeItem("@global:list_currency_conversion", response => {});
    AsyncStorage.removeItem("@global:list_currency", response => {});
    AsyncStorage.removeItem("@global:paparecepiid", response => {});
    AsyncStorage.removeItem("@global:language", response => {});
    AsyncStorage.removeItem("@global:auto_calculate_rekap", response => {});
    AsyncStorage.removeItem("@global:label_printer", response => {});
    AsyncStorage.removeItem("@global:show_stock", response => {});
    AsyncStorage.removeItem("@global:footer_printer", response => {});
    AsyncStorage.removeItem("@global:url_printer", response => {});
    AsyncStorage.removeItem("@global:setting_print_qr", response => {});
    AsyncStorage.removeItem("@global:setting_print_logo", response => {});
    AsyncStorage.removeItem("@global:show_order_id", response => {});
    AsyncStorage.removeItem("@global:image_uri", response => {});
    AsyncStorage.removeItem("@global:business_data", response => {});
    AsyncStorage.removeItem("@global:outlet_data", response => {});
    AsyncStorage.removeItem("@global:business_sub_type", response => {});
    AsyncStorage.removeItem("@global:setting_print_logo", response => {});
    AsyncStorage.removeItem("@global:image_base64", response => {});
    AsyncStorage.removeItem("@global:manual_print_cashlez", response => {});
    AsyncStorage.removeItem("@global:manual_print", response => {});
    AsyncStorage.removeItem("@global:cashlez_data", response => {});
    AsyncStorage.removeItem("@global:cz_response", response => {});
    AsyncStorage.removeItem("@global:cz_uri", response => {});
    AsyncStorage.removeItem("@global:previliges", response => {});
    AsyncStorage.removeItem("@global:mainmenu", response => {});
    AsyncStorage.removeItem("@global:payment_method_last_update", response => {});

    //

    cb(true);
  }

  DeleteDataSwitchUser(cb) {
    AsyncStorage.removeItem("@global:newmenu", response => {});
    AsyncStorage.removeItem("@global:order_id", response => {});
    AsyncStorage.removeItem("@global:table_id", response => {});
    AsyncStorage.removeItem("@global:customer_id", response => {});
    AsyncStorage.removeItem("@global:booking_id", response => {});
    AsyncStorage.removeItem("@global:newname", response => {});
    // AsyncStorage.removeItem("@global:listuser", response => {});
    AsyncStorage.removeItem("@global:tempattendance", response => {});
    AsyncStorage.removeItem("@global:favmenu", response => {});
    AsyncStorage.removeItem("@global:categorymenu", response => {});
    AsyncStorage.removeItem("@global:allmenu", response => {});
    AsyncStorage.removeItem("@global:addons", response => {});
    AsyncStorage.removeItem("@global:salestype", response => {});
    AsyncStorage.removeItem("@global:paymenttype", response => {});
    AsyncStorage.removeItem("@global:lastupdate", response => {});
    AsyncStorage.removeItem("@global:temporder_2", response => {});
    AsyncStorage.removeItem("@global:temporder", response => {});
    AsyncStorage.removeItem("@global:table", response => {});
    AsyncStorage.removeItem("@global:phonenumber", response => {});
    AsyncStorage.removeItem("@global:taxrate", response => {});
    AsyncStorage.removeItem("@global:servicerate", response => {});
    AsyncStorage.removeItem("@global:outletaddress", response => {});
    AsyncStorage.removeItem("@global:payment_method", response => {});
    AsyncStorage.removeItem("@global:promo_special", response => {});
    AsyncStorage.removeItem("@global:promo_voucher", response => {});
    AsyncStorage.removeItem("@global:promo_automatic", response => {});
    AsyncStorage.removeItem("@global:starthour", response => {});
    AsyncStorage.removeItem("@global:endhour", response => {});
    AsyncStorage.removeItem("@global:opendays", response => {});
    //
    AsyncStorage.removeItem(
      "@global:setting_light_mode",
      response => {}
    );
    AsyncStorage.removeItem(
      "@global:setting_kitchen_management",
      response => {}
    );
    AsyncStorage.removeItem(
      "@global:allowmulticurrency",
      response => {}
    );
    AsyncStorage.removeItem("@global:allowdecimal", response => {});
    AsyncStorage.removeItem("@global:currency", response => {});
    AsyncStorage.removeItem("@global:currency_id", response => {});

    AsyncStorage.removeItem("@global:phone", response => {});
    AsyncStorage.removeItem("@global:currency", response => {});
    AsyncStorage.removeItem("@global:list_sales_type_product_last_update", response => {});
    AsyncStorage.removeItem("@global:list_sales_type_product", response => {});
    AsyncStorage.removeItem("@global:list_currency_conversion", response => {});
    AsyncStorage.removeItem("@global:list_currency", response => {});
    AsyncStorage.removeItem("@global:paparecepiid", response => {});
    AsyncStorage.removeItem("@global:language", response => {});
    AsyncStorage.removeItem("@global:auto_calculate_rekap", response => {});
    AsyncStorage.removeItem("@global:label_printer", response => {});
    AsyncStorage.removeItem("@global:show_stock", response => {});
    AsyncStorage.removeItem("@global:footer_printer", response => {});
    AsyncStorage.removeItem("@global:url_printer", response => {});
    AsyncStorage.removeItem("@global:setting_print_qr", response => {});
    AsyncStorage.removeItem("@global:setting_print_logo", response => {});
    AsyncStorage.removeItem("@global:show_order_id", response => {});
    AsyncStorage.removeItem("@global:image_uri", response => {});
    AsyncStorage.removeItem("@global:business_data", response => {});
    AsyncStorage.removeItem("@global:outlet_data", response => {});
    AsyncStorage.removeItem("@global:business_sub_type", response => {});
    AsyncStorage.removeItem("@global:setting_print_logo", response => {});
    AsyncStorage.removeItem("@global:image_base64", response => {});
    AsyncStorage.removeItem("@global:manual_print_cashlez", response => {});
    AsyncStorage.removeItem("@global:manual_print", response => {});
    AsyncStorage.removeItem("@global:cashlez_data", response => {});
    AsyncStorage.removeItem("@global:cz_response", response => {});
    AsyncStorage.removeItem("@global:cz_uri", response => {});
    AsyncStorage.removeItem("@global:previliges", response => {});
    AsyncStorage.removeItem("@global:mainmenu", response => {});

    AsyncStorage.removeItem("@global:payment_method_last_update", response => {});


    
    
    //

    return true;
  }

  LogoutDevice(cb) {
    // AsyncStorage.multiRemove(['@global:user', '@global:token'], response => {
    //   console.log('Logout Success');
    //   cb(true);
    // });

    NewAsyncStorage.getItemByKey("@global:auth", auth => {
      console.log("auth logout process ==> ", auth);
      // AsyncStorage.removeItem('@global:user', response => {
      // });

      AsyncStorage.removeItem("@global:auth", response => {});
      AsyncStorage.removeItem("@global:user", response => {
        console.log("Logout Success");
        cb(true);
      });
    });
  }

  MultiLoginAddUser_BE(data, cb) {
    console.log("Login Function ==> ", data);

    console.log(
      "body ==> ",
      JSON.stringify({
        staff_id: data.staff_id,
        email: data.email,
        password: data.password,
        device_id: data.device_id
      })
    );

    console.log("uri ==> ", BE_LoginAPI);

    fetch(BE_LoginAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        staff_id: data.staff_id,
        email: data.email,
        password: data.password,
        device_id: data.device_id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson login multi ==> ", responseJson);

        let result = responseJson;

        let token = responseJson.token;

        if (responseJson.statusCode === 200) {
          let resultData = result.data;
          //console.log('new data ==>', JSON.stringify(resultData));

          let data_user = responseJson.data.user;
          let userInfo = {
            id: data_user.user_id,
            role_id: data_user.role_id,
            role_name: data_user.role_name,
            is_verified: data_user.is_verified,
            last_login: data_user.last_login,
            is_login: data_user.is_login,
            retail_id: data_user.business_id,
            gerai_id: data_user.outlet_id,
            device_id: data_user.device_id,
            name: data_user.name,
            staff_id: data_user.staff_id,
            refund_auth: 1,
            token: `bearer ${resultData.token}`,
            restaurant_name: data_user.outlet_name,
            restaurant_address: data_user.outlet_address,
            business_name: data_user.business_name,
            business_category: data_user.business_category,
            business_type: data_user.business_type,
            privileges: data_user.privileges,
            email: data_user.business_email,
            gerai_name: data_user.outlet_name,
            description: data_user.outlet_address,
            auth: `bearer ${resultData.token}`
          };

          // NewAsyncStorage.setItem(
          //   "global",
          //   "user",
          //   JSON.stringify(userInfo),
          //   response => {
          //     //console.log('LoginFunctions Login data ==> ', data);
          //     //cb(true);
          //   }
          // );

          // NewAsyncStorage.setItem(
          //   "global",
          //   "auth",
          //   JSON.stringify("bearer " + resultData.token),
          //   response => {
          //     //console.log('LoginFunctions Login data ==> ', data);
          //     //cb(true);
          //   }
          // );

          //multi login untuk nambah user_listnya

          NewAsyncStorage.getItemByKey("@global:user_list", data_get => {
            //console.log("LoginFunctions user_list ==> ", data_get);

            if (data_get) {
              let dt = JSON.parse(data_get);

              let duplicate = false;
              dt.map((v, i) => {
                if (v.id === userInfo.id) {
                  duplicate = true;
                }
              });

              let temp_user_list = dt;

              if (!duplicate) {
                temp_user_list.push(userInfo);

                NewAsyncStorage.setItem(
                  "global",
                  "user_list",
                  JSON.stringify(temp_user_list),
                  response => {}
                );
              }
            }
          });
          cb(true);
        } else {
          cb(false);
        }
      })
      .catch(_err => {
        console.log("ERR LOGIN ==> ", _err);
        cb(false);
      });
  }

  SwitchUser(data, cb) {
    //data == userinfo
    NewAsyncStorage.setItem(
      "global",
      "user",
      JSON.stringify(data),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        //cb(true);
      }
    );

    NewAsyncStorage.setItem(
      "global",
      "auth",
      JSON.stringify("bearer " + data.auth),
      response => {
        //console.log('LoginFunctions Login data ==> ', data);
        //cb(true);
      }
    );

    cb(true);
  }

  SaveListMultiUser(
    data,
    cb //Manual Add
  ) {
    let temp_user_list = [];
    temp_user_list.push(data);
    NewAsyncStorage.setItem(
      "global",
      "user_list",
      JSON.stringify(temp_user_list),
      response => {}
    );
    cb(true);
  }

  GetListMultiUser(cb) {
    NewAsyncStorage.getItemByKey("@global:user_list", data => {
      // console.log("GetListMultiUser data ==> ", data);
      if (data) {
        let dt = JSON.parse(data);
        cb(dt);
      } else {
        cb(null);
      }
    });
  }
}

export default new LoginFunctions();
