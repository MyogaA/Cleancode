/* eslint-disable quotes */

// class NumberFunctions {
//   constructor() {}

// }

export function Decimalize(num, length = 2) {
  //length = angka dibelakang koma
  try {
    if (isNaN(num)) {
      return num;
    } else {
      let result = parseFloat(num);
      result = result.toFixed(length);

      //result = num.toFixed(length);
      result = parseFloat(result);
      return result;
    }
  } catch (error) {
    return num;
  }
}

export function HasDecimal(num) {
  //length = angka dibelakang koma
  try {
    if (isNaN(num)) {
      return false;
    } else {
      let int_num = parseInt(num);
      let comma_num = num - int_num;
      comma_num = Math.round(comma_num * 100);

      const hasDecimal = comma_num > 0 ? true : false;

      if (hasDecimal) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    return false;
  }
}

// export default new NumberFunctions();
