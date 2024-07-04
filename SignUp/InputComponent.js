import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const InputComponent = ({ placeholder, keyboardType, secureTextEntry = false, getOTP = false, mobilenumber, onChangeText, valid, errorMessage, showValidationError, clearValidationError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGetOTP = () => {
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
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtp('');
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input, 
            getOTP && styles.inputWithOTP, 
            valid === false ? styles.inputInvalid : valid === true ? styles.inputValid : null
          ]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onFocus={clearValidationError} // Hide validation error on focus
        />
        {valid === true && !secureTextEntry && (
          <Ionicons name="checkmark-circle-outline" size={20} color="green" style={styles.validIcon} />
        )}
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
      {otp && timer > 0 && <Text style={styles.otpDisplay}>OTP: {otp}</Text>}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    fontFamily: 'Roboto-Regular'
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
    fontSize: 12,
  },
  inputWithOTP: {
    paddingRight: 80,
  },
  inputInvalid: {
    borderColor: 'red',
  },
  inputValid: {
    borderColor: 'green',
  },
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
});

export default InputComponent;
