import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import ImageComponent from '../ImageComponent/ImageComponent';
import InputComponent from '../SignUp/InputComponent';
import SignupButton from '../SignUp/SignupButton';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [mobilenumber, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [validInputs, setValidInputs] = useState({
    mobilenumber: null,
    password: null,
  });
  const [errorMessages, setErrorMessages] = useState({
    mobilenumber: '',
    password: '',
  });
  const [showValidationError, setShowValidationError] = useState(false);

  const validateInputs = () => {
    let valid = true;
    let newErrorMessages = {
      mobilenumber: '',
      password: '',
    };

    if (!mobilenumber || !/^\d{10}$/.test(mobilenumber)) {
      setValidInputs(prevState => ({ ...prevState, mobilenumber: false }));
      newErrorMessages.mobilenumber = 'Please enter a valid 10-digit mobile number.';
      valid = false;
    } else {
      setValidInputs(prevState => ({ ...prevState, mobilenumber: true }));
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

  const handleLogin = async () => {
    setShowValidationError(false);
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    const data = {
      telephone: mobilenumber,
      password,
    };

    try {
      const response = await axios.post('http://192.168.0.2/march2021/landing_saas/index.php?route=restapi/login', new URLSearchParams(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      setLoading(false);
      console.log(response.data);

      if (response.status === 200 && response.data.length === 0) {
        console.log("Login successful but no data returned.");
      } else {
        console.log("Login failed or unexpected response data.");
      }

      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('General error:', error.message);
      }
    }
  };

  const showValidationErrorForMobile = () => {
    setShowValidationError(true);
  };

  const clearValidationErrorForMobile = () => {
    setShowValidationError(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ImageComponent
        imageUrl={require('/home/tmd-pc/react-native-demo/react-native/react-native-firstApp/assets/Login/Group 1.png')}
        isLocal={true}
        style={styles.imageContainer}
        imageStyle={styles.image}
      />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login Your Account</Text>
          <InputComponent 
            placeholder="Mobile Number" 
            keyboardType="numeric" 
            mobilenumber={mobilenumber} 
            onChangeText={setMobilenumber} 
            valid={validInputs.mobilenumber} 
            errorMessage={errorMessages.mobilenumber} 
            showValidationError={showValidationError} 
            clearValidationError={clearValidationErrorForMobile}
          />
          <InputComponent 
            placeholder="Password" 
            secureTextEntry 
            onChangeText={setPassword} 
            valid={validInputs.password} 
            errorMessage={errorMessages.password} 
          />
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <SignupButton buttonText="Sign In" disabled={loading} onPress={handleLogin} />
          {loading && <ActivityIndicator size="large" color="#0066b0" />}
          <Text style={styles.checkboxLabel}>
            Don't have an account?{' '}
            <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
          </Text>
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
  imageContainer: {
    width: '100%',
    height: 260,
    backgroundColor: '#0066b0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 19,
  },
  image: {
    width: '70%',
    height: '80%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#ffffff',
    marginTop: -20,
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
    fontFamily: 'Roboto-Regular',
  },
  button: {
    backgroundColor: '#0066b0',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#0066b0',
    fontSize: 12,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 20,
  },
  checkboxLabel: {
    color: 'grey',
    lineHeight: 25,
    paddingTop: 30,
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  linkText: {
    color: '#0066b0',
    fontWeight: '600',
  },
});
