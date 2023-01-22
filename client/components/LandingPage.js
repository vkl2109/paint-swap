import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonLabel}>Waiting Room</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('LandingPage')}>
        <Text style={styles.buttonLabel}>Create a Room</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('LandingPage')}>
        <Text style={styles.buttonLabel}>Enter a Room</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('LandingPage')}>
        <Text style={styles.buttonLabel}>Enter a Private Room</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('LandingPage')}>
        <Text style={styles.buttonLabel}>Choose a Public Room</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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