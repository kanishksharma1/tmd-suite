// Path: /path/to/SignupScreen.js

import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputComponent from './InputComponent';
import SignupButton from './SignupButton';

export default function SignupScreen() {
  const [checked, setChecked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.imageDiv}>
        <Image
          source={require('C:/Users/LENOVO/tmd-suite/assets/6963-ai.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create Your Account</Text>
          <InputComponent placeholder="Name" label="Enter Full Name" />
          <InputComponent placeholder="Store Name" />
          <InputComponent placeholder="Mobile Number"  getOTP keyboardType="numeric" />
          <InputComponent placeholder="Enter OTP"  keyboardType="phone-pad" />
          <InputComponent placeholder="Password" secureTextEntry />
          <View style={styles.checkboxContainer}>
            <Ionicons 
              name={checked ? "checkbox" : "square-outline"} 
              size={24} 
              color={checked ? "#0066b0" : "#00adef"} 
              onPress={() => setChecked(!checked)}
            />
            <Text style={styles.checkboxLabel}>
              I agree to the tmd Suite{' '}
              <Text style={styles.linkText}>terms & conditions</Text> 
            </Text>
          </View>
          <SignupButton buttonText="Sign Up" disabled={!checked} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#ffffff',
    marginTop: -20, // Adjust if necessary to ensure seamless appearance with imageDiv
  },
  innerContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: '#0066b0',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop:15,
    paddingBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 10,
  },
  checkboxLabel: {
    color: 'grey',
    lineHeight: 25,
    paddingLeft: 10,

  },
  linkText: {
    color: '#0066b0',
    fontWeight: '600',
  },
  imageDiv: {
    width: '100%',
    height: 250,
    backgroundColor: '#0066b0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top:19
  },
  image: {
    width: '85%',
    height: '70%',
  },
});
