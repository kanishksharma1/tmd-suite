// SignupButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const  SignupButton = ({ buttonText, disabled, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
        {disabled ? (
          <View style={[styles.button, styles.disabledButton]}>
            <Text style={[styles.buttonText, styles.disabledButtonText]}>
              {buttonText}
            </Text>
          </View>
        ) : (
          <LinearGradient
            colors={['#0066b0', '#3ea8f3']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00adef',
        padding: 13,
        borderRadius: 30,
        alignItems: 'center',
        // marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 14,
        fontFamily: 'Roboto-Regular'
    },
    disabledButton: {
        backgroundColor: '#3ea8f3', // Lighter color for disabled state
      },
});

export default SignupButton;


// i want to give this color #3ea8f3 when i click on the signup button