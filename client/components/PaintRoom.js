import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native'
import Camera from './Camera.js'
import { Button } from '@rneui/themed'
import * as ImagePicker from 'expo-image-picker';

export default function PaintRoom({ navigation, route }) {

  const [camera, setCamera] = useState(false)
  const [image, setImage] = useState(null);
  const [base64image, setBase64Image] = useState(null);

  const { roomID } = route.params;
  // not sure if this is the right way to pass the room param 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
      setBase64Image(base64)
      const img = "data:image/jpeg;base64," + base64
      setImage(img);
    }
  };

  const shareImage = () => {
    const request = async () => {
      let req = await fetch('http://172.29.1.114:5000/postimage', {
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
      {camera ?
        (<Camera style={styles.container} roomID={roomID} />)
        : (
          <View style={styles.buttonList}>
            <Button
              title="Take a Photo"
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
              onPress={() => setCamera(true)}
            />
            <Button
              title="Choose from Album"
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
              onPress={pickImage}
            />
            {image &&
              <>
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                <Button
                  title="Share"
                  onPress={() => shareImage()}
                  titleStyle={{ fontWeight: '700' }}
                  buttonStyle={{
                    backgroundColor: 'rgba(90, 154, 230, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                  }}
                  containerStyle={{
                    width: 100,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }} />
              </>
            }
          </View>
        )

      }

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