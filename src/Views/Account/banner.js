import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar
} from 'react-native';
import Text from '../../Components/Text';
// import LinearGradient from 'react-native-linear-gradient';

// import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../Styles/SliderEntry.style';
import LoginSlider from '../../Components/LoginSlider';
import styles, { colors } from '../../Styles/index.style';
// import Orientation from 'react-native-orientation-locker';
import { MAIN_THEME_COLOR_SELECT } from '../../Libraries/Colors';

const BannerWidth = Dimensions.get('window').width - 40;
const BannerHeight = 120;

const images = [
  {
    url:
      'https://cdn.discordapp.com/attachments/294444258063286272/662261758936743937/Login1.png'
  },
  {
    url:
      'https://cdn.discordapp.com/attachments/294444258063286272/662261775470821385/Login2.png'
  },
];
// const images = [
//     {url:require('../Images/Login1.png')},
//     {url:require('../Images/Login2.png')},
//   ];

const SLIDER_1_FIRST_ITEM = 0;

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      slider1Ref: null,
      images: images,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    };
  }

  componentDidMount() {
    let { width, height } = Dimensions.get("window");
    // Orientation.addOrientationListener(this._orientationDidChange);
    // Orientation.getOrientation(orientation => {
    //   console.log("Current UI Orientation: ", orientation);
    //   if (orientation === 'LANDSCAPE-LEFT') {
    //     this.setState({ ready: true, width: Dimensions.get('window').width });
    //   } else {
    //     //Orientation.lockToLandscapeLeft();
    //   }
    // });
  }

  _orientationDidChange = orientation => {
    if (orientation === 'LANDSCAPE-LEFT') {
      this.setState({ ready: true, width: Dimensions.get('window').width });
      // do something with landscape layout
    } else {
      // do something with portrait layout
      //Orientation.lockToLandscapeLeft();
    }
  };

  _renderItem({ item, index }) {
    //console.log('_renderItem item ==> ', item);
    return (
      <LoginSlider
        data={item.url}
        // data={item}
        width={Dimensions.get("window").width * 0.95}
        height={Dimensions.get("window").height}
        even={(index + 1) % 2 === 0}
      />
    );
  }

  // get example1 () {
  get _bannerList() {
    const { slider1ActiveSlide, slider1Ref, ready } = this.state;
    const { bannerWidth, bannerHeight } = this.props;

    let { width, height } = Dimensions.get("window");
    // console.log('sliderWidth', sliderWidth);

    // console.log('itemWidth', itemWidth);

    // console.log('width', width);

    // console.log('BannerWidth', bannerWidth);

    return (
      <View style={[styles.exampleContainer, { width: '100%' }]}>
        {/* {ready ? (
          <Carousel
            ref={c => {
              if (!this.state.slider1Ref) {
                this.setState({ slider1Ref: c });
              }
            }}
            data={images}
            //data={this.state.images}
            renderItem={this._renderItem}
            //sliderWidth={sliderWidth}
            //sliderWidth={width*0.65}
            sliderWidth={this.state.width}
            itemWidth={this.state.width}
            hasParallaxImages={true}
            firstItem={SLIDER_1_FIRST_ITEM}
            inactiveSlideScale={0.5}
            inactiveSlideOpacity={0.25}
            enableMomentum={false}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={{
              marginLeft: 0,
              backgroundColor: MAIN_THEME_COLOR_SELECT(this.props.colorIndex),
            }}
            // loop={true}
            // loopClonesPerSide={2}
            // autoplay={true}
            // autoplayDelay={500}
            // autoplayInterval={3000}

            onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
          />
        ) : (
          <View />
        )} */}

        {/* {ready ? (
          <Pagination
            // dotsLength={images.length}
            dotsLength={this.state.images.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'#FFFFFF'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={'#9E9E9E'}
            inactiveDotOpacity={0.5}
            inactiveDotScale={1}
            carouselRef={slider1Ref}
            tappableDots={!!slider1Ref}
          />
        ) : (
          <View />
        )} */}
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container]}>
        {/* <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollviewContentContainer}
          indicatorStyle={'white'}
          scrollEventThrottle={200}
          directionalLockEnabled={true}
        > */}
        <View style={[styles.scrollview]}>{this._bannerList}</View>
        {/* </ScrollView> */}
      </View>
    );
  }
}
