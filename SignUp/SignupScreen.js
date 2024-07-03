import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import axios from 'axios';
import InputComponent from './InputComponent';
import SignupButton from './SignupButton';

export default function SignupScreen() {
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [storename, setStorename] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const validateInputs = () => {
    if (!username) {
      setSnackbarMessage('Please enter your full name.');
      setSnackbarVisible(true);
      return false;
    }
    if (!storename) {
      setSnackbarMessage('Please enter your store name.');
      setSnackbarVisible(true);
      return false;
    }
    if (!mobilenumber || !/^\d{10}$/.test(mobilenumber)) {
      setSnackbarMessage('Please enter a valid 10-digit mobile number.');
      setSnackbarVisible(true);
      return false;
    }
    if (!otp || !/^\d{6}$/.test(otp)) {
      setSnackbarMessage('Please enter a valid 6-digit OTP.');
      setSnackbarVisible(true);
      return false;
    }
    if (!password || password.length < 4 || password.length > 20) {
      setSnackbarMessage('Password must be between 4 and 20 characters!');
      setSnackbarVisible(true);
      return false;
    }
    if (!checked) {
      setSnackbarMessage('Please agree to the terms & conditions');
      setSnackbarVisible(true);
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    const data = {
      telephone: mobilenumber,
      password,
      code: otp,
      name: username,
      country_code: '91', // Assuming the country code is 91 for all users, adjust if needed
      storename,
      agree: '1'
    };

    axios.post('http://192.168.0.2/march2021/landing_saas/index.php?route=restapi/signup', new URLSearchParams(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setSnackbarMessage('Account created successfully!');
        setSnackbarVisible(true);
      })
      .catch((error) => {
        setLoading(false);
        console.error('There was an error!', error);
        setSnackbarMessage('There was an error creating your account. Please try again.');
        setSnackbarVisible(true);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.imageDiv}>
        <Image
          source={require('/home/tmd-pc/react-native-demo/react-native/react-native-firstApp/assets/6963-ai.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create Your Account</Text>
          <InputComponent placeholder="Name" label="Enter Full Name" onChangeText={setUsername}/>
          <InputComponent placeholder="Store Name" onChangeText={setStorename} />
          <InputComponent placeholder="Mobile Number" getOTP keyboardType="numeric" mobilenumber={mobilenumber} onChangeText={setMobilenumber} />
          <InputComponent placeholder="Enter OTP" keyboardType="phone-pad" onChangeText={setOtp} />
          <InputComponent placeholder="Password" secureTextEntry onChangeText={setPassword} />
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
          <SignupButton buttonText="Sign Up" disabled={loading || !checked} onPress={handleSignup} />
          {loading && <ActivityIndicator size="large" color="#0066b0" />}
        </View>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
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
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: '#0066b0',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 30,
    fontFamily: 'Roboto-Regular'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 10,
    fontFamily: 'Roboto-Regular'
  },
  checkboxLabel: {
    color: 'grey',
    lineHeight: 25,
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: 'Roboto-Regular'
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
    top: 19
  },
  image: {
    width: '85%',
    height: '70%',
  },
});
