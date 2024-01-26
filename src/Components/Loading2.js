import React, { Component } from 'react';
import { View, Platform, Dimensions, Image } from 'react-native';
import Text from './Text';

const dim = Dimensions.get('window');

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          elevation: 1
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 5
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../Images/trans.gif')}
          />
          <Text style={{ color: '#777', fontSize: 10 }}>Loading...</Text>
        </View>
      </View>
    );
  }
}
