/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React, { Fragment, Component, useState } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ViewProps,
  Text,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  Image,
  requireNativeComponent,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Button from "../../Components/Button";
import ExternalDisplay, {
  getScreens,
  useExternalDisplay
} from "react-native-external-display";
import Ionicons from "react-native-vector-icons/Ionicons";

import MobileHeader from "../../Components/MobileHeader";
import ColorFunctions from "../../Libraries/ColorFunctions";
import PrinterFunctions from "../../Libraries/PrinterFunctions";
import { Actions } from "react-native-router-flux";
import LoginFunctions from "../../Libraries/LoginFunctions";
import MainStyle from "../../Styles";
import { MAIN_THEME_COLOR_SELECT } from "../../Libraries/Colors";

export function DualMonitor(state) {
  const [info, setInfo] = useState(getScreens());
  const [on, setOn] = useState(true);
  const [setMount] = useState(true);

  const [type] = useState(1);

  const parameters = state.state;
  let mount = parameters.mount;

  console.log("DUAL MONITOR parameters ====> ", parameters);
  console.log("DUAL MONITOR info ====> ", info);
  console.log("DUAL MONITOR getScreens() ====> ", getScreens());

  //infonya {} kalo monitornya di hp cuman 1 belom cek di dual screen

  //console.log("DUAL MONITOR info[1].id ====> ", info[1].id);

  console.log("DUAL MONITOR info[1].id ====> ", info[1]);

  if (info[1]) {
    return (
      <View style={{ flex: 1 }}>
        {mount && (
          // <ExternalDisplay
          //   mainScreenStyle={{
          //     flex: 1
          //   }}
          //   fallbackInMainScreen
          //   screen={on && Object.keys(info)[0]}
          //   onScreenConnect={setInfo}
          //   onScreenDisconnect={setInfo}
          // >
          //   <View style={{ backgroundColor: "#BCA" }}>
          //     <Text>{parameters.type}</Text>
          //     <Text>MESSAGE DIBELAKANG LAYARNYA DISINI YAH WKWKWKWKW</Text>
          //   </View>
          // </ExternalDisplay>
          <View />
        )}
      </View>
    );
  } else {
    return <View />;
  }
}

export default class TestingDualScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      mount: true,
      userInfo: this.props.userInfo ? this.props.userInfo : null,
      colorIndex: this.props.colorIndex ? this.props.colorIndex : 0,
      languageIndex: this.props.languageIndex ? this.props.languageIndex : 0,
      auth: this.props.auth ? this.props.auth : ""
    };
  }

  componentDidMount() {
    //this.newOrder();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);

    Actions.refresh({
      returned: true
    });
  }

  onBackPress = () => {
    this.setState({ mount: false });
    console.log("BackPRESS ? ");
    Actions.pop();
    Actions.MobileMainMenu({
      userInfo: this.state.userInfo,
      colorIndex: this.state.colorIndex,
      languageIndex: this.state.languageIndex,
      auth: this.state.auth
    });
  };

  render_menu_1() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{ alignItems: "center", alignSelf: "center" }}
          onPress={() => {
            this.setState({ type: 1 });
          }}
        >
          <View
            style={{
              backgroundColor: "#EEEEEE",
              padding: 15,
              borderRadius: 30
            }}
          >
            <Ionicons
              name="md-settings"
              size={25}
              style={{
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          </View>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: "#8A8A8F"
              }
            ]}
          >
            Ganti Type 1
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_2() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{ alignItems: "center", alignSelf: "center" }}
          onPress={() => {
            this.setState({ type: 2 });
          }}
        >
          <View
            style={{
              backgroundColor: "#EEEEEE",
              padding: 15,
              borderRadius: 30
            }}
          >
            <Ionicons
              name="md-settings"
              size={25}
              style={{
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          </View>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: "#8A8A8F"
              }
            ]}
          >
            Ganti Type 2
          </Text>
        </Button>
      </View>
    );
  }

  render_menu_3() {
    return (
      <View style={{ width: "33%" }}>
        <Button
          style={{ alignItems: "center", alignSelf: "center" }}
          onPress={() => {
            this.setState({ type: 3 });
          }}
        >
          <View
            style={{
              backgroundColor: "#EEEEEE",
              padding: 15,
              borderRadius: 30
            }}
          >
            <Ionicons
              name="md-settings"
              size={25}
              style={{
                color: MAIN_THEME_COLOR_SELECT(this.state.colorIndex)
              }}
            />
          </View>
          <Text
            style={[
              MainStyle.robotoNormal,
              {
                fontSize: 12,
                color: "#8A8A8F"
              }
            ]}
          >
            Ganti Type 3
          </Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black"
        }}
      >
        <DualMonitor state={this.state} />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {this.render_menu_1()}
          {this.render_menu_2()}
          {this.render_menu_3()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: "100%"
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: 50,
    backgroundColor: "#D26441"
  },
  scrollView: {
    backgroundColor: "white",
    width: "100%",
    height: "100%"
  },
  sectionContainer: {
    backgroundColor: "white",
    marginTop: 0
  },
  sectionContainerWithPadding: {
    backgroundColor: "white",
    paddingHorizontal: 48,
    marginTop: 32,
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "black"
  },
  sectionDescription: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
    color: "#777777"
  },
  largerTitle: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: "600",
    color: "black"
  },
  mediumTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: "600",
    color: "black"
  },
  subSectionContainer: {
    marginBottom: 8
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "black"
  },
  subSectionDescription: {
    fontSize: 13,
    fontWeight: "200",
    color: "black"
  },
  specialsSectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "black"
  },
  specialsSectionDescription: {
    marginBottom: 12,
    fontSize: 13,
    fontWeight: "200",
    color: "black"
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: "#E1E1E1",
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 16
  },
  titleImage: {
    resizeMode: "contain",
    width: 150,
    alignSelf: "center"
  },
  pizzaImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 2.066666666666667,
    resizeMode: "contain"
  },
  columns: {
    marginTop: 24,
    flex: 1,
    flexDirection: "column"
  },
  rows: {
    width: "50%",
    flex: 1,
    flexDirection: "row"
  },
  columnLeftItem: {
    flexDirection: "column",
    paddingRight: 30,
    width: "100%",
    height: "100%",
    alignItems: "stretch"
  },
  columnRightItem: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "stretch"
  },
  getDirectionsView: {
    flex: 1,
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  getDirections: {
    fontSize: 12,
    color: "#4794CC"
  },
  directionsImage: {
    width: 24,
    height: 24,
    marginRight: 10
  }
});
