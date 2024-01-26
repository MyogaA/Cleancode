import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, ImageBackground, View} from 'react-native';
import ActivityIndicator from '../Components/ActivityIndicator';

export default class ImageLoader extends Component {
  static propTypes = {
    isShowActivity: PropTypes.bool,
  };

  static defaultProps = {
    isShowActivity: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false,
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true,
    });
  }

  onError() {
    this.setState({
      isError: true,
    });
  }

  render() {
    const {
      style,
      source,
      resizeMode,
      borderRadius,
      children,
      loadingStyle,
      placeholderSource,
      placeholderStyle,
      customImagePlaceholderDefaultStyle,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      blurRadius,
    } = this.props;
    // console.log('image bg style ==> ', style)
    return  (
      <ImageBackground
        onLoadEnd={this.onLoadEnd.bind(this)}
        onError={this.onError.bind(this)}
        style={[styles.backgroundImage, style]}
        source={source}
        resizeMode={resizeMode}
        borderRadius={borderRadius}
        borderTopLeftRadius={borderTopLeftRadius}
        borderTopRightRadius={borderTopRightRadius}
        borderBottomLeftRadius={borderBottomLeftRadius}
        borderBottomRightRadius={borderBottomRightRadius}
        blurRadius={blurRadius}>
        {this.state.isLoaded && !this.state.isError ? (
          children
        ) : (
          <View style={[styles.viewImageStyles, {borderRadius: borderRadius}]}>
            {/* {
                            this.props.isShowActivity &&
                            <ActivityIndicator
                                style={styles.activityIndicator}
                                size={loadingStyle ? loadingStyle.size : 'small'}
                                color={loadingStyle ? loadingStyle.color : 'gray'}
                            />
                        } */}
            <Image
              style={
                placeholderStyle
                  ? placeholderStyle
                  : [
                      styles.imagePlaceholderStyles,
                      customImagePlaceholderDefaultStyle,
                    ]
              }
              source={
                placeholderSource
                  ? {placeholderSource, cache: 'only-if-cached'}
                  : require('../Images/empty-image.png')
              }
            />
          </View>
        )}
        {this.props.children && (
          <View style={styles.viewChildrenStyles}>{this.props.children}</View>
        )}
      </ImageBackground>
    );
  }
}

const styles = {
  backgroundImage: {
    position: 'relative',
  },
  activityIndicator: {
    position: 'absolute',
    margin: 'auto',
    zIndex: 9,
  },
  viewImageStyles: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderStyles: {
    width: 100,
    height: 100,
    display: 'none',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
};

