import colorTheme from './colorTheme.json';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MAIN_THEME_COLOR, WHITE , GREY_500, GREY_900, RED_700} from '../Libraries/Colors';

import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import EnIcon from 'react-native-vector-icons/Entypo';
import Button from './Button';
import Text from './Text';

import {Actions} from 'react-native-router-flux';

export default class TabBar3 extends Component {
  scrollView = null;

  constructor(props) {
    super(props);
    this.tabIcons = [];
    this.state = {};
  }

  componentDidMount() {
    // this._listener = this.props.scrollValue.addListener(
    //   this.setAnimationValue.bind(this),
    // );
  }
  render() {
    const {selectedIndex} = this.props;

    return (
      <View>
        <View
          ref={ref => (this.scrollView = ref)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}>
          <View style={[{flex:1, flexDirection: 'row'}]}>
            <Button onPress={() => Actions.Restaurant()} style={styles.tab}>
              <Icon
                name={Platform.OS === 'ios' ? 'md-restaurant' : 'md-restaurant'}
                size={24}
                color={selectedIndex === 0 ? MAIN_THEME_COLOR : MAIN_THEME_COLOR}
              />
              <Text
                style={{
                  color: selectedIndex === 0 ? MAIN_THEME_COLOR : MAIN_THEME_COLOR,
                  fontSize: 12,
                  fontFamily: 'RobotoSlab-Regular'
                }}>
                Restaurant Listt
              </Text>
            </Button>

            <Button onPress={() => Actions.reset("CameraBarcode")} style={styles.tab}>
              <Icon
                name={Platform.OS === 'ios' ? 'md-qr-scanner' : 'md-qr-scanner'}
                size={24}
                color={selectedIndex === 1 ? MAIN_THEME_COLOR : MAIN_THEME_COLOR}
              />
              <Text
                style={{

                  color: selectedIndex === 1 ? MAIN_THEME_COLOR : MAIN_THEME_COLOR,
                  fontSize: 12,
                  fontFamily: 'RobotoSlab-Regular'

                }}>
                Scan Codee
              </Text>
            </Button>

            <Button onPress={() => Actions.Account2()} style={styles.tab}>
              <MatIcon
                name={Platform.OS === 'ios' ? 'account-circle-outline' : 'account-circle-outline'}
                size={24}
                color={selectedIndex === 2 ? MAIN_THEME_COLOR : MAIN_THEME_COLOR}
              />
              <Text
                style={{
                  color: selectedIndex === 2 ? MAIN_THEME_COLOR : MAIN_THEME_COLOR,
                  fontSize: 12,
                  fontFamily: 'RobotoSlab-Regular'

                }}>
                Accountt
              </Text>
            </Button>
          </View>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
    padding: 0,
    height: 50,
    //color: WHITE,
    // backgroundColor: '#777'
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    // paddingTop: 5,
    borderWidth: 0,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: MAIN_THEME_COLOR,
    // borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: WHITE,
  },
});
