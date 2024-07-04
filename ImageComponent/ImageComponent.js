import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageComponent = ({ imageUrl, isLocal = false, style, imageStyle }) => {
  return (
    <View style={[styles.imageDiv, style]}>
      {isLocal ? (
        <Image
          source={imageUrl}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageDiv: {
    width: '100%',
    height: 250,
    backgroundColor: '#0066b0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 19,
  },
  image: {
    width: '85%',
    height: '70%',
  },
});

export default ImageComponent;
