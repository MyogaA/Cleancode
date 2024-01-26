import { Platform } from 'react-native';
import CustomDatePickerAndroid from './CustomDatePickerAndroid';
import CustomDatePickerIOS from './CustomDatePickerIos';

const IS_ANDROID = Platform.OS === 'android';

export default (IS_ANDROID ? CustomDatePickerAndroid : CustomDatePickerIOS);
