import React, { useState } from 'react'
import { StyleSheet, Image, SafeAreaView, View, Pressable, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@rneui/themed';
const PlaceholderImage = require('../assets/images/background-image.png');

export default function Login({ navigation }) {
  const [username, onChangeUserName] = useState('')
  const [password, onChangePassword] = useState('')
  const [confirmPassword, onChangeConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loginState, setLoginState] = useState(true)

  const handleSubmit = () => {
    if (loginState) {
      const login = async () => {
        let req = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        })
        let res = await req.json()
        if (req.ok) {
          setErrorMsg('')
          let newUser = { "id": res.user.id, "username": res.user.username, "password": res.user.password, "avatarUrl": res.user.avatarUrl }
          setLoginData(newUser)
          localStorage.setItem('token', res.token)
          // navigation.navigate('WaitingRoom')
        }
        else {
          setErrorMsg(res.error)
        }
      }
      // login()
    }
    else {
      const signup = async () => {
        let req = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        let res = await req.json()
        if (req.ok) {
          setLoginData(res)
        }
      }
      if (password !== confirmPassword) {
        setErrorMsg("check passwords")
      }
      else {
        setErrorMsg('')
        // signup()
        // navigation.navigate('WaitingRoom')
      }
    }
    navigation.navigate('WaitingRoom')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput style={styles.input} onChangeText={onChangeUserName} value={username} placeholder='username'></TextInput>
        <TextInput style={styles.input} onChangeText={onChangePassword} value={password} placeholder='password'></TextInput>
        {!loginState && <TextInput style={styles.input} onChangeText={onChangeConfirmPassword} value={confirmPassword} placeholder='confirm password'></TextInput>}
        {(errorMsg != '') && <Button
          title={errorMsg}
          buttonStyle={{
            backgroundColor: 'rgba(100, 100, 100, 0)',
            color: '#FF0000',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            height: 40,
            marginHorizontal: 50,
          }}
          titleStyle={{ color: 'red', fontWeight: 'bold' }}
          onPress={() => setLoginState(loginState => !loginState)}
        />}
        <Button
          title={loginState ? "LOG IN" : "SIGN UP"}
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => handleSubmit()}
        />
        <Button
          title={loginState ? "go to sign up" : "go to log in"}
          buttonStyle={{
            backgroundColor: 'rgba(100, 100, 100, 50)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            height: 50,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => setLoginState(loginState => !loginState)}
        />
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
    height: 300,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1 / 2,
  },
  headerContainer: {
    marginTop: 40,
    flex: 2 / 3,
    alignItems: 'center',
    flexDirection: 'column',
    padding: 0
    // backgroundColor: '#FFFFFF',
  },
  input: {
    height: 50,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 20,
    shadowColor: '#52006A',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});