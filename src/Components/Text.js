import React, {Component} from 'react';
import {Text as TextDefault, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {
  FontFamily,
  FontFamilyBold,
  FontFamilyLight,
  FontFamilyMedium,
  FontFamilyThin,
} from '../Libraries/Fonts';
import normalize from '../Libraries/NormalizeText';
import {GREY_900} from '../Libraries/Colors';
const styles = StyleSheet.create({
  medium: FontFamilyMedium,
  light: FontFamilyLight,
  thin: FontFamilyThin,
  bold: FontFamilyBold,
  font: FontFamily,
  text: {fontSize: 14, color: GREY_900},
});

const Text = props => {
  const {style, children, h1, h2, h3, h4, h5, h6, small, bold, ...rest} = props;

  return (
    <TextDefault
      style={[
        styles.font,
        styles.text,
        h1 && {fontSize: 40},
        h2 && {fontSize: 34},
        h3 && {fontSize: 28},
        h4 && {fontSize: 22},
        h5 && {fontSize: 20},
        h6 && {fontSize: 16},
        small && {fontSize: 10},
        bold && styles.bold,
        style && style,
      ]}
      {...rest}>
      {children}
    </TextDefault>
  );
};

Text.propTypes = {
  style: PropTypes.any,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  small: PropTypes.bool,
  bold: PropTypes.bool,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
};

export default Text;
