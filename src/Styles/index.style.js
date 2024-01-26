import { StyleSheet } from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#9E9E9E',
  gray100: '#F5F5F5',
  background1: '#B721FF',
  background2: '#21D4FD',
  inactive: 'rgba(255,255,255,1)'
};

export default StyleSheet.create({
  container: {
    flex: 1,
    //height: 150,
    backgroundColor: 'transparent'
    // backgroundColor: '#FFFFFF'
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  scrollview: {
    flex: 1,
    paddingTop: 0
  },
  scrollviewContentContainer: {
    paddingBottom: 14
  },
  exampleContainer: {
    marginBottom: 0,
    marginTop: 0,
    paddingRight: 0,

    //paddingBottom: 225,
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  slider: {
    backgroundColor: 'transparent'
    //marginTop: 5
  },
  sliderContentContainer: {},
  paginationContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
    // bottom: -15
    //backgroundColor: '#BCA',
    //height: 200,
    //bottom: 200,
    // top: 90
    // paddingVertical: 8
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 0,
  },
  primaryColor: {
    backgroundColor: '#212121'
  },
  primaryColorLight: {
    backgroundColor: '#484848'
  },
  primaryColorDark: {
    backgroundColor: '#000000'
  },
  secondaryColor: {
    backgroundColor: '#1db954'
  },
  secondaryColorLight: {
    backgroundColor: '#62ec83'
  },
  secondaryColorDark: {
    backgroundColor: '#008827'
  }
});
