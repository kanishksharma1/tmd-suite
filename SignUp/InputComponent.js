// InputComponent.js
import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InputComponent = ({ placeholder, label, keyboardType, secureTextEntry=false, getOTP=false }) => {
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
                {/* <Text style={styles.label}>{label}</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                />
        {getOTP && (
          <TouchableOpacity onPress={handleGetOTP} disabled={timer > 0}>
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
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        paddingRight:10,
        borderRadius: 10,
        width: '100%',
        backgroundColor:'#F7F7F7'
    },
    iconContainer: {
        position:'relative',
        bottom:35,
        left:290
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        backgroundColor:'purple',
        position:'relative',
        top:16,
        left:18,
        zIndex:1,
    },
    otpText: {
        fontSize: 12,
        color: '#0066b0',
        position: 'relative',
        bottom: 30,
        left: 270,
      },
});

export default InputComponent;
