import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginButton from './components/LoginButton';
import HomeImage from './components/HomeImage';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <HomeImage placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <LoginButton label="Login" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});