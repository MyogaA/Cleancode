/* eslint-disable no-console */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Modal,
  Dimensions,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
//import NewAsyncStorage from '../Libraries/AsyncStorage'
import { Actions } from 'react-native-router-flux';
import {
  WHITE,
  MAIN_THEME_COLOR,
  BLACK,
  GREY_500,
} from '../../Libraries/Colors';

import Button from '../../Components/Button';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MainStyle from '../../Styles';

// https://github.com/react-native-community/react-native-camera

// const flashModeOrder = {
//   off: 'on',
//   on: 'auto',
//   auto: 'torch',
//   torch: 'off',
// };

const flashModeOrder = {
  off: 'torch',
  torch: 'off'
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto'
};

const landmarkSize = 2;

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    modal: this.props.barcode ? this.props.barcode : true,
    help: false,
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: true,
    faces: [],
    textBlocks: [],
    barcodes: [],
  };
  // componentDidMount() {
  //   this.toggle('canDetectBarcode');
  // }
  componentDidMount() {
    console.log('componentDidMount ==> ', this.props);
    //this.setState({modal: true})
    //this.toggle('canDetectBarcode');
  }
  componentDidUpdate(nextprops) {
    console.log('componentDidUpdate ==> ', this.nextprops);
    //this.setState({modal: true})
  }

  // componentWillUnmount() {
  //   //console.log('componentWillUnmount', this.props.type);
  //   Actions.refresh({
  //     type: this.props.type,
  //     //camera: undefined
  //   });
  // }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back'
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on'
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.warn('takePicture ', data);
    }
  };

  takeVideo = async function() {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false });
          console.warn('takeVideo', data);
        }
      } catch (e) {
        //console.error(e);
      }
    }
  };

  toggle = value => () => {
    console.log('toogle');
    this.setState(prevState => ({ [value]: !prevState[value] }));
  };

  facesDetected = ({ faces }) => this.setState({ faces });

  renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` },
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    >
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
  );

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );

  renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );

  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
  );

  renderTextBlock = ({ bounds, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text
        style={[
          styles.textBlock,
          { left: bounds.origin.x, top: bounds.origin.y },
        ]}
      >
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  );

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };

  barcodeRecognized = ({ barcodes }) => {
    console.log('barcodeRecognized==> ', barcodes);
    let { onScan } = this.props;
    this.setState({ barcodes });
    //alert('Barcode Scanned');
  };

  renderBarcodes = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.barcodes.map(this.renderBarcode)}
    </View>
  );

  renderBarcode = ({ bounds, data, type }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text>
      </View>
    </React.Fragment>
  );

  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    console.log('canDetectBarcode', canDetectBarcode);
    let { width, height } = Dimensions.get('window');
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        trackingEnabled
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        //onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
        onGoogleVisionBarcodesDetected={
          canDetectBarcode ? this.barcodeRecognized : null
        }
        //this.barcodeRecognized
        googleVisionBarcodeType={
          RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL
        }
      >
        <View
          style={{
            flex: 0.5,
          }}
        >
          {/* <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end'
          }}
        >
          {/* <Slider
            style={{width: 150, marginTop: 15, alignSelf: 'flex-end'}}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          /> */}
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end'
          }}
        >
          {/* <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}
          >
            {this.state.isRecording ? (
              <Text style={styles.flipText}> ☕ </Text>
            ) : (
              <Text style={styles.flipText}> REC </Text>
            )}
          </TouchableOpacity> */}
        </View>
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>
            Zoom: {this.state.zoom}
          </Text>
        )}
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end'
          }}
        >
          {/* <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity> */}
        </View>

        <Modal
          transparent={true}
          visible={this.state.modal}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setState({ modal: false });
            Actions.pop();
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              //borderLeftWidth: (width-300)/2,
              //borderRightWidth: (width-300)/2,
              //borderTopWidth: (height-50-300)/2,
              //borderBottomWidth: (height-50-300)/2,
              marginBottom: 50,
              borderColor: '#rgba(0,0,0,0.25)'
              //borderColor:'#rgba(255,255,255,0.25)',
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: width,
                backgroundColor: '#rgba(0,0,0,0.25)'
              }}
            >
              <View style={{ width: width * 0.87 }} />
              <View style={{ marginTop: height * 0.009 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modal: false });
                    Actions.pop();
                  }}
                >
                  <View style={{}}>
                    <Ionicons
                      name={'md-close'}
                      //name={'flashlight-off'}
                      size={40}
                      color={WHITE}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: (width - 300) / 2,
                  height: 300,
                  //backgroundColor: '#rgba(0,0,0,0.0)',
                  backgroundColor: '#rgba(0,0,0,0.25)'
                }}
              />
              <View
                style={{
                  width: 300,
                  height: 300,
                  //backgroundColor: '#rgba(0,0,0,0.0)',
                  backgroundColor: '#rgba(255,255,255,0)'
                }}
              />
              <View
                style={{
                  width: (width - 300) / 2,
                  height: 300,
                  //backgroundColor: '#rgba(0,0,0,0.0)',
                  backgroundColor: '#rgba(0,0,0,0.25)'
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: width,
                backgroundColor: '#rgba(0,0,0,0.25)'
              }}
            >
              <View
                style={{
                  width: '50%',
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.toggleFlash();
                  }}
                >
                  <MaterialCommunityIcons
                    name={'flashlight'}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'RobotoSlab-Regular',
                    color: WHITE,
                  }}
                >
                  Flashlight
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ help: true });
                  }}
                >
                  <Ionicons
                    name={'md-help-circle-outline'}
                    //name={'flashlight-off'}
                    size={50}
                    color={WHITE}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'RobotoSlab-Regular',
                    color: WHITE,
                  }}
                >
                  Help
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        {!!canDetectFaces && this.renderFaces()}
        {!!canDetectFaces && this.renderLandmarks()}
        {!!canDetectText && this.renderTextBlocks()}
        {/* {!!canDetectBarcode && this.renderBarcodes()} */}
        {this.renderBarcodes()}
      </RNCamera>
    );
  }

  render() {
    let { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        {this.renderCamera()}
        <Modal
          transparent={true}
          visible={this.state.help}
          //visible={true}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setState({ help: false });
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: WHITE,
              width: width - 60,
              height: height - 60,
              marginLeft: 30,
              marginTop: 30,
              marginBottom: 90,
              marginRight: 30,
              borderColor: MAIN_THEME_COLOR,
              borderRadius: 10,
              borderWidth: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <View style={{ position: 'absolute', right: 15, top: 15 }}>
              <Button
                onPress={() => {
                  this.setState({ help: false });
                }}
              >
                <Ionicons
                  name={'md-close'}
                  //name={'flashlight-off'}
                  size={40}
                  color={MAIN_THEME_COLOR}
                />
              </Button>
            </View>
            <View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <MaterialCommunityIcons
                  name={'message-outline'}
                  //name={'flashlight-off'}
                  size={100}
                  color={GREY_500}
                />
                <FontAwesome5
                  style={{ position: 'absolute', top: 25 }}
                  name={'question'}
                  //name={'flashlight-off'}
                  size={40}
                  color={GREY_500}
                />
              </View>
            </View>
            <View style={{ flex: 0, flexDirection: 'row', marginTop: 25 }}>
              <View
                style={{
                  width: 10,
                  marginTop: 7,
                  marginRight: 7,
                  alignItems: 'center'
                }}
              >
                <Fontisto
                  name={'ellipse'}
                  //name={'flashlight-off'}
                  size={5}
                  color={BLACK}
                />
              </View>
              <View>
                <Text
                  style={[
                    MainStyle.dmSans,
                    { fontSize: 14, textAlign: 'justify' },
                  ]}
                >
                  Make sure you have allowed the application to access camera on
                  this device
                </Text>
              </View>
            </View>
            <View style={{ flex: 0, flexDirection: 'row', marginTop: 10 }}>
              <View
                style={{
                  width: 10,
                  marginTop: 7,
                  marginRight: 7,
                  alignItems: 'center'
                }}
              >
                <Fontisto
                  name={'ellipse'}
                  //name={'flashlight-off'}
                  size={5}
                  color={BLACK}
                />
              </View>
              <View>
                <Text
                  style={[
                    MainStyle.dmSans,
                    { fontSize: 14, textAlign: 'justify' },
                  ]}
                >
                  Make sure you have a stable connection before scanning.
                </Text>
              </View>
            </View>
            <View style={{ flex: 0, flexDirection: 'row', marginTop: 10 }}>
              <View>
                <Text
                  style={[
                    MainStyle.dmSans,
                    { fontSize: 14, textAlign: 'justify' },
                  ]}
                >
                  If the problem still occuring, you can go to our customer
                  support by clicking the button below
                </Text>
              </View>
            </View>
            <Button
              style={{
                flex: 0,
                marginTop: 15,
                backgroundColor: MAIN_THEME_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                padding: 5,
              }}
            >
              <View>
                <Text
                  style={[
                    MainStyle.dmSansBold,
                    {
                      fontSize: 14,
                      color: WHITE,
                      marginBottom: 5,
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: 10,
                    },
                  ]}
                >
                  Customer Support
                </Text>
              </View>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000'
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red'
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent'
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center'
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
});
