import React, {Component} from 'react';
import {ActivityIndicator, ActivityIndicatorIOS, Platform} from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return Platform.OS === 'IOS' ? (
      <ActivityIndicatorIOS {...this.props} color={'#135eab'} />
    ) : (
      <ActivityIndicator {...this.props} color={'#135eab'} />
    );
  }
}
