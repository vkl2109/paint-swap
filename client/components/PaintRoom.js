import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native'
import Camera from './Camera.js'
import SharePhoto from './SharePhoto.js'
import { Button } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaintRoom({ navigation, route }) {

  const [camera, setCamera] = useState(true)
  const [image, setImage] = useState(null);
  const [base64image, setBase64Image] = useState(null);
  const [waiting, isWaiting] = useState(true)
  const { roomID } = route.params;
  const [visible, setVisible] = useState(true)
  // not sure if this is the right way to pass the room param 

  const shareImage = () => {
    const request = async () => {
      let req = await fetch('http://10.129.2.90:5000/postimage', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id: roomID,
          uri: base64image
        })
      })
      if (req.ok) {
        setImage(null)
        isWaiting(false)
      }
    }
    request()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {visible ?
          (<View style={styles.buttonList}>
            <Button
              title="Take Photo"
              buttonStyle={{
                backgroundColor: '#FFA500',
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
              containerStyle={{
                marginHorizontal: 50,
                height: 50,
                width: 280,
                marginVertical: 20,
              }}
              onPress={() => {
                setCamera(true)
                setVisible(false)
              }}
            />
            <Button
              title="Choose from Album"
              buttonStyle={{
                backgroundColor: '#369F8E',
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
              containerStyle={{
                marginHorizontal: 50,
                height: 50,
                width: 280,
                marginVertical: 20,
              }}
              onPress={() => {
                setCamera(false)
                setVisible(false)
              }}
            />
          </View>)
          :
          (<View style={styles.container}>
            {camera ?
              (<Camera style={styles.container} shareImage={shareImage} image={image} setImage={setImage} base64image={base64image} setBase64Image={setBase64Image} waiting={waiting} />)
              :
              (<SharePhoto style={styles.container} shareImage={shareImage} image={image} setImage={setImage} base64image={base64image} setBase64Image={setBase64Image} waiting={waiting} />)
            }
          </View>)}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EA9D', // '#25292e'
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
});