
import React from 'react';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import SignupScreen from './SignUp/SignupScreen';
import useFonts from './useFonts';


export default function App() {

  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }


  return (
    <PaperProvider>
    <View style={styles.container}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#F0F0F0" translucent = {true}/>
      
      <SignupScreen />
  
    </View>
      </PaperProvider>
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
