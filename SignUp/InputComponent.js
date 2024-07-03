import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import axios from 'axios';

const InputComponent = ({ placeholder, label, keyboardType, secureTextEntry = false, getOTP = false, mobilenumber, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGetOTP = () => {
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
        setTimer(60);
        const otp = response.data;
        setSnackbarMessage(`OTP sent successfully! Your OTP is: ${otp}`);
        setSnackbarVisible(true);
      })
      .catch(error => {
        console.error('Error sending OTP', error);
        setSnackbarMessage('There was an error sending the OTP. Please try again.');
        setSnackbarVisible(true);
      });
    } else if (!mobilenumber) {
      setSnackbarMessage('Please enter your mobile number first.');
      setSnackbarVisible(true);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, getOTP && styles.inputWithOTP]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
        />
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
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
});

export default InputComponent;
