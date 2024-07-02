import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InputComponent = ({ placeholder, label, keyboardType, secureTextEntry = false, getOTP = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGetOTP = () => {
    if (timer === 0) {
      setTimer(60);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
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
