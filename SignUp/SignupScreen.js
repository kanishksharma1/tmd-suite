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
            source={require('/home/tmd-pc/react-native-demo/react-native/react-native-firstApp/assets/6963-ai.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>


      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create Your Account</Text>
          <InputComponent placeholder="Name" label="Enter Full Name" />
          <InputComponent placeholder="Store Name" />
          <InputComponent placeholder="Mobile Number" keyboardType="numeric" />
          <InputComponent placeholder="Enter OTP" getOTP keyboardType="phone-pad"/>
          <InputComponent placeholder="Password" secureTextEntry />
          <View style={styles.checkboxContainer}>
            
            {/* <CheckBox
              checked={checked}
              onPress={() => setChecked(!checked)}
              checkedColor="#00adef"
              uncheckedColor="#00adef"
              // containerStyle={styles.checkbox}
              // textStyle={styles.checkboxText}
            /> */}
        <Ionicons 
        name={checked ? "checkbox" : "square-outline"} 
        size={24} 
        color={checked ? "#0066b0" : "#00adef"} 
        onPress={() => setChecked(!checked)}
        style={StyleSheet.create({})}
      />
            
            <Text style={styles.checkboxLabel}>
              I agree to the tmd Suite{' '}
              <Text style={styles.linkText}>terms & conditions</Text> 
            </Text>
          </View>
          <SignupButton buttonText="Sign Up" disabled={!checked}/>
        </View>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop:30,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  innerContainer: {
    width: '100%',
    paddingTop:0,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    backgroundColor: '#ffffff',
    // borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 3,
  },
  title: {
    color: '#0066b0',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 10,
    paddingBottom: 20,
    // paddingRight:40,
    // position:'relative',
    // right:40
  },
  checkbox: {
    backgroundColor: '#00adef',
    borderColor: '#00adef',
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxText: {
    color: '#fff',
  },
  checkboxLabel: {
    color: 'grey',
    lineHeight:25,
    paddingLeft:10,
  },
  linkText: {
    color: '#0066b0',
    fontWeight: '600',
    
  },
  imageDiv: {
    width: '100%',
    height: 150,
    backgroundColor: '#0066b0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

