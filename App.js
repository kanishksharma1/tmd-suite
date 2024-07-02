
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import SignupScreen from './SignUp/SignupScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#F0F0F0" translucent = {true}/>
      <SignupScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
