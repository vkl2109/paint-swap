import React, { useState } from 'react'
import { StyleSheet, Image, SafeAreaView, View, Pressable, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const PlaceholderImage = require('../assets/images/background-image.png');

export default function Login({ navigation }) {
  const [ username, onChangeUserName ] = useState('')
  const [ password, onChangePassword ] = useState('')

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <TextInput style={styles.input} onChangeText={onChangeUserName} value={username} placeholder='username'></TextInput>
            <TextInput style={styles.input} onChangeText={onChangePassword} value={password} placeholder='password'></TextInput>
            <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('WaitingRoom')}>
              <View style={styles.button}>
                <Text style={styles.buttonLabel}>Login</Text>
              </View>
            </Pressable>
        </View>
        <View style={styles.imageContainer}>
            <Image source={PlaceholderImage} style={styles.image} />
        </View>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A5A5A', // '#25292e'
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 40,
    flex: 1/4,
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    width: 320,
    height: 100,
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
  buttonLabel: {
    paddingTop: 8,
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#0000FF',
    overflow: 'hidden',
    height: 40,
    width: 100,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 20,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});