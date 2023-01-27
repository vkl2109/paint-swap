import { StyleSheet, SafeAreaView, ScrollView, View, Pressable, Text } from 'react-native';
import { Button } from '@rneui/themed';

const PicSwapLogo = require('../assets/pic-swap-logo.png');

export default function LandingPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.buttonList}>
          <Image source={PicSwapLogo} style={styles.image} />
          <Button
            title="Create Room"
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: 200,
              marginVertical: 20,
            }}
            onPress={() => navigation.navigate('CreateRoom')}
          />
          <Button
            title="Enter A Room"
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
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
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
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