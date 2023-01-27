import { StyleSheet, SafeAreaView, ScrollView, View, Pressable, Text, Image } from 'react-native';
import { Button } from '@rneui/themed';

const PicSwapLogo = require('../assets/pic-swap-logo.png');

export default function LandingPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.buttonList}>
          <Image source={PicSwapLogo} style={styles.logo} />
          <Button
            title="Create Room"
            buttonStyle={{
              backgroundColor: '#369F8E',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: 200,
              marginVertical: 20,
            }}
            onPress={() => navigation.navigate('CreateRoom')}
          />
          <Button
            title="Enter Room"
            buttonStyle={{
              backgroundColor: '#369F8E',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: 200,
              marginVertical: 20,
            }}
            onPress={() => navigation.navigate('EnterPrivate')}
          />
          <Button
            title="Choose Public"
            buttonStyle={{
              backgroundColor: '#369F8E',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: 200,
              marginVertical: 20,
            }}
            onPress={() => navigation.navigate('ChoosePublic')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EA9D', // '#25292e'
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 300,
    height: 120,
    marginBottom: 60
  },
  buttonList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 320,
    height: 300,
    borderRadius: 18,
  }
});