import { StyleSheet, View, Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeImage from './HomeImage';
const PlaceholderImage = require('../assets/images/background-image.png');

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <HomeImage placeholderImageSource={PlaceholderImage} />
        </View>
        <View style={styles.footerContainer}>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('WaitingRoom')}>
                    <Text style={styles.buttonLabel}>Login</Text>
                </Pressable>
            </View>
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
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});