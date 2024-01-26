/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// import { ParallaxImage } from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';
import styles from '../Styles/SliderEntry.style';

export default class LoginSlider extends Component {
  static propTypes = {
    // data: PropTypes.object.isRequired,
    data: PropTypes.string.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    // const { data: { illustration }, parallax, parallaxProps, even } = this.props;
    const { data, parallax, parallaxProps, even } = this.props;
    //console.log('slider data ==> ', data);
    return parallax ? (
      // <ParallaxImage
      <Image
        source={{ uri: data }}
        // containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        containerStyle={[styles.imageContainer]}
        style={[styles.image, { position: 'relative' }]}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: data }}
        style={{
          ...StyleSheet.absoluteFillObject,
          resizeMode: 'stretch',
          borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
          // borderTopLeftRadius: entryBorderRadius,
          // borderTopRightRadius: entryBorderRadius
          paddingLeft: -150,
          //width: '100%'
          backgroundColor: 'white',
          width: 0.6 * this.props.width,
          height: 1 * this.props.height,
        }}
        resizeMode={'stretch'}
      />
    );
  }

  render() {
    const { even } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        //style={styles.slideInnerContainer}
        style={{
          width: 0.6 * this.props.width,
          height: this.props.height,
          paddingBottom: 0,
        }}
        onPress={() => {
          console.log('pressed');
        }}
      >
        <View
          style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        >
          {this.image}
        </View>
      </TouchableOpacity>
    );
  }
}
