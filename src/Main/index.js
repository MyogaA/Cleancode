import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Header from '../Components/Header';



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: false,
      login: false
    }
}

componentDidMount() {

}

render()
{
  return (
    <View>
      <Text>
        This is a new project
      </Text>
    </View>
  );
}
}
