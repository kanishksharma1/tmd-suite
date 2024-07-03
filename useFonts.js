// useFonts.js
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';

const useFonts = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      });
      setLoaded(true);
    }

    loadFonts();
  }, []);

  return loaded;
};

export default useFonts;
