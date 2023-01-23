import { StyleSheet, SafeAreaView, ScrollView, View, Pressable, Text } from 'react-native';
import { Button } from '@rneui/themed';

export default function LandingPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.buttonList}>
          <Text style={styles.buttonLabel}>Waiting Room</Text>
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
                marginVertical: 10,
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
                marginVertical: 10,
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
                marginVertical: 10,
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
    backgroundColor: '#5A5A5A', // '#25292e'
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});