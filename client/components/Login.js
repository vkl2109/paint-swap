import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, SafeAreaView, ScrollView, View, Pressable, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Dialog } from '@rneui/themed';
const PlaceholderImage = require('../assets/images/background-image.png');

export default function Login({ navigation }) {
  const [username, onChangeUserName] = useState('')
  const [password, onChangePassword] = useState('')
  const [confirmPassword, onChangeConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorDialog, setErrorDialog] = useState(false)
  const [loginState, setLoginState] = useState(true)

  const handleSubmit = () => {
    if (loginState) {
      const login = async () => {
        let req = await fetch("http://10.129.2.90:5000/login", {
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
          // setLoginData(newUser)
          localStorage.setItem('token', res.token)
          navigation.navigate('LandingPage')
        }
        else {
          setErrorMsg(res.error)
        }
      }
      login()
    }
    else {
      const signup = async () => {
        let req = await fetch("http://10.129.2.90:5000/users", {
          method: "POST",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        let res = await req.json()
        if (req.ok) {
          // setLoginData(res)
        }
      }
      if (password !== confirmPassword) {
        setErrorMsg("check passwords")
      }
      else {
        setErrorMsg('')
        // signup()
        // navigation.navigate('LandingPage')
      }
    }
    navigation.navigate('LandingPage')
  }

  const toggleErrorDialog = () => {
    setErrorDialog(false)
    setErrorMsg('')
  }

  useEffect(() => {
    if (errorMsg != '') {
      setErrorDialog(true)
    }
  }, [errorMsg])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TextInput style={styles.input} onChangeText={onChangeUserName} value={username} placeholder='username'></TextInput>
          <TextInput secureTextEntry={true} style={styles.input} onChangeText={onChangePassword} value={password} placeholder='password'></TextInput>
          {!loginState && <TextInput secureTextEntry={true} style={styles.input} onChangeText={onChangeConfirmPassword} value={confirmPassword} placeholder='confirm password'></TextInput>}
          <Dialog
            isVisible={errorDialog}
            onBackdropPress={toggleErrorDialog}
          >
            <Dialog.Title style={styles.dialogTitle} title={loginState ? "Log In Error" : "Sign Up Error"} />
            <Text style={styles.dialogText}>{errorMsg}</Text>
          </Dialog>
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
      </ScrollView>
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
  dialogTitle: {
    textAlign: 'center'
  },
  dialogText: {
    textAlign: 'center',
    color: '#FF0000'
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