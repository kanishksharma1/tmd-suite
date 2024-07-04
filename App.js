import React from 'react';
import { StyleSheet, ActivityIndicator, View, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './SignUp/SignupScreen';
import LoginScreen from './Login/LoginScreen';
import useFonts from './useFonts';

const Stack = createStackNavigator();

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#F0F0F0" translucent={true}/>
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
  },
});
