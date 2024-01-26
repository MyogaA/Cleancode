/* eslint-disable quotes */
import NewAsyncStorage from "./AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LoginAPI,
  BE_LoginAPI,
  BE_LogoutAPI,
  BE_Ads_Image,
} from "../Constants";

class AdsFunctions {
  constructor() {}

  GetAdsList(
    business_id,
    outlet_id,
    use_expiration,
    order,
    page,
    per_page,
    cb
  ) {
    const uri = `${BE_Ads_Image}?outlet_id=${outlet_id}&business_id=${business_id}&use_expiration=${use_expiration}&order=${order}&page=${page}&per_page=${per_page} `;
    fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //"Content-Type": "application/x-www-form-urlencoded"
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson LOGIN ==> ", responseJson);

        let result = responseJson;

        let final_result = null;

        if (result.statusCode === 200) {
          let resultData = result.data;
          let pagination = result.pagination;
          final_result = { data: resultData, pagination: pagination };

          cb(final_result);
        } else {
          cb(final_result);
        }
      })
      .catch((_err) => {
        console.log("ERR ADS ==> ", _err);
        cb(null);
      });
  }
}
export default new AdsFunctions();
