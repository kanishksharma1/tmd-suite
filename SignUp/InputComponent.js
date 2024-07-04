import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
=======
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

<<<<<<< HEAD
const InputComponent = ({ placeholder, label, keyboardType, secureTextEntry = false, getOTP = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
=======
const InputComponent = ({ placeholder, keyboardType, secureTextEntry = false, getOTP = false, mobilenumber, onChangeText, valid, errorMessage, showValidationError, clearValidationError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState('');
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGetOTP = () => {
<<<<<<< HEAD
    if (timer === 0) {
      setTimer(60);
=======
    if (!mobilenumber || !/^\d{10}$/.test(mobilenumber)) {
      if (showValidationError) showValidationError();
      return;
    } else {
      if (clearValidationError) clearValidationError();
    }

    if (timer === 0 && mobilenumber) {
      axios.post('http://192.168.0.2/march2021/landing_saas/index.php?route=restapi/signup/sendotp', new URLSearchParams({
        telephone: mobilenumber,
        getotp: '1'
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        setOtp(response.data); // Assuming response.data contains the OTP
        setTimer(60);
      })
      .catch(error => {
        console.error('Error sending OTP', error);
      });
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
<<<<<<< HEAD
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
=======
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtp('');
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
<<<<<<< HEAD
          style={[styles.input, getOTP && styles.inputWithOTP]}
=======
          style={[
            styles.input, 
            getOTP && styles.inputWithOTP, 
            valid === false ? styles.inputInvalid : valid === true ? styles.inputValid : null
          ]}
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
<<<<<<< HEAD
        />
=======
          onChangeText={onChangeText}
          onFocus={clearValidationError} // Hide validation error on focus
        />
        {valid === true && !secureTextEntry && (
          <Ionicons name="checkmark-circle-outline" size={20} color="green" style={styles.validIcon} />
        )}
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
        {getOTP && (
          <TouchableOpacity onPress={handleGetOTP} disabled={timer > 0} style={styles.otpButton}>
            <Text style={styles.otpText}>
              {timer > 0 ? `${timer}s` : 'Get OTP'}
            </Text>
          </TouchableOpacity>
        )}
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleShowPassword} style={styles.iconContainer}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#0066b0" />
          </TouchableOpacity>
        )}
      </View>
<<<<<<< HEAD
=======
      {otp && timer > 0 && <Text style={styles.otpDisplay}>OTP: {otp}</Text>}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
<<<<<<< HEAD
=======
    fontFamily: 'Roboto-Regular'
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    paddingLeft: 30,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
<<<<<<< HEAD
=======
    fontSize: 12,
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
  },
  inputWithOTP: {
    paddingRight: 80,
  },
<<<<<<< HEAD
=======
  inputInvalid: {
    borderColor: 'red',
  },
  inputValid: {
    borderColor: 'green',
  },
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
  otpButton: {
    position: 'absolute',
    right: 10,
    top: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 5,
  },
  otpText: {
    fontSize: 12,
    color: '#0066b0',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
<<<<<<< HEAD
=======
  otpDisplay: {
    color: 'green',
    fontSize: 14,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Roboto-Regular',
  },
  validIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  }
>>>>>>> d3b679a716de7470168b255e669604feb49d11ab
});

export default InputComponent;
