import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import InputComponent from './InputComponent';
import SignupButton from './SignupButton';
import ImageComponent from '../ImageComponent/ImageComponent';

export default function SignupScreen({ navigation }) {
  const [checked, setChecked] = useState(true);
  const [username, setUsername] = useState('');
  const [storename, setStorename] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validInputs, setValidInputs] = useState({
    username: null,
    storename: null,
    mobilenumber: null,
    otp: null,
    password: null,
  });
  const [errorMessages, setErrorMessages] = useState({
    username: '',
    storename: '',
    mobilenumber: '',
    otp: '',
    password: '',
  });
  const [showValidationError, setShowValidationError] = useState(false);

  const validateInputs = () => {
    let valid = true;
    let newErrorMessages = {
      username: '',
      storename: '',
      mobilenumber: '',
      otp: '',
      password: '',
    };

    if (!username) {
      setValidInputs(prevState => ({ ...prevState, username: false }));
      newErrorMessages.username = 'Please enter your full name.';
      valid = false;
    } else {
      setValidInputs(prevState => ({ ...prevState, username: true }));
    }

    if (!storename || /[^a-zA-Z0-9]/.test(storename)) {
      setValidInputs(prevState => ({ ...prevState, storename: false }));
      newErrorMessages.storename = 'Store name must not contain special characters or spaces.';
      valid = false;
    } else {
      setValidInputs(prevState => ({ ...prevState, storename: true }));
    }

    if (!mobilenumber || !/^\d{10}$/.test(mobilenumber)) {
      setValidInputs(prevState => ({ ...prevState, mobilenumber: false }));
      newErrorMessages.mobilenumber = 'Please enter a valid 10-digit mobile number.';
      valid = false;
    } else {
      setValidInputs(prevState => ({ ...prevState, mobilenumber: true }));
    }

    if (!otp || !/^\d{6}$/.test(otp)) {
      setValidInputs(prevState => ({ ...prevState, otp: false }));
      newErrorMessages.otp = 'Please enter a valid 6-digit OTP.';
      valid = false;
    } else {
      setValidInputs(prevState => ({ ...prevState, otp: true }));
    }

    if (!password || password.length < 4 || password.length > 20) {
      setValidInputs(prevState => ({ ...prevState, password: false }));
      newErrorMessages.password = 'Password must be between 4 and 20 characters!';
      valid = false;
    } else {
      setValidInputs(prevState => ({ ...prevState, password: true }));
    }

    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSignup = () => {
    setShowValidationError(false); // Clear any existing validation errors
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
        navigation.navigate('Login'); // Navigate to Login screen after successful signup
      })
      .catch((error) => {
        setLoading(false);
        console.error('There was an error!', error);
      });
  };

  const showValidationErrorForMobile = () => {
    setShowValidationError(true);
  };

  const clearValidationErrorForMobile = () => {
    setShowValidationError(false);
  };

  const openTermsAndConditions = () => {
    const url = 'https://192.168.0.2/march2021/landing_saas/index.php?route=information/information/agree&information_id=3';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ImageComponent 
        imageUrl={require('/home/tmd-pc/react-native-demo/react-native/react-native-firstApp/assets/6963-ai.png')} 
        isLocal={true} 
        style={{  
          width: '100%', 
          height: 250,
          backgroundColor: '#0066b0',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          top: 19 }} // Custom styles for image container
        imageStyle={{  width: '85%', height: '70%', }} // Custom styles for image
      />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text onPress={() => navigation.navigate('Login')} style={styles.title}>Create Your Account</Text>
          <InputComponent 
            placeholder="Name" 
            label="Enter Full Name" 
            onChangeText={setUsername} 
            valid={validInputs.username} 
            errorMessage={errorMessages.username} 
          />
          <InputComponent 
            placeholder="Store Name" 
            onChangeText={setStorename} 
            valid={validInputs.storename} 
            errorMessage={errorMessages.storename} 
          />
          <InputComponent 
            placeholder="Mobile Number" 
            getOTP 
            keyboardType="numeric" 
            mobilenumber={mobilenumber} 
            onChangeText={setMobilenumber} 
            valid={validInputs.mobilenumber} 
            errorMessage={errorMessages.mobilenumber} 
            showValidationError={showValidationErrorForMobile} 
            clearValidationError={clearValidationErrorForMobile}
          />
          {showValidationError && <Text style={styles.errorText}>Please enter a valid 10-digit mobile number.</Text>}
          <InputComponent 
            placeholder="Enter OTP" 
            keyboardType="phone-pad" 
            onChangeText={setOtp} 
            valid={validInputs.otp} 
            errorMessage={errorMessages.otp} 
          />
          <InputComponent 
            placeholder="Password" 
            secureTextEntry 
            onChangeText={setPassword} 
            valid={validInputs.password} 
            errorMessage={errorMessages.password} 
          />
          <View style={styles.checkboxContainer}>
            <Ionicons 
              name="checkbox" 
              size={24} 
              color="#0066b0" 
            />
            <Text style={styles.checkboxLabel}>
              I agree to the tmd Suite{' '}
              <Text onPress={openTermsAndConditions} style={styles.linkText}>terms & conditions</Text> 
            </Text>
          </View>
          <SignupButton buttonText="Sign Up" disabled={loading} onPress={handleSignup} />
          {loading && <ActivityIndicator size="large" color="#0066b0" />}
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Roboto-Regular',
  },
});
