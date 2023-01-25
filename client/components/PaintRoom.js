import React, { Component } from 'react';
import Canvas from './Canvas.js'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import Camera from './Camera.js'

export default function PaintRoom({ navigation, route }) {

  const { roomID } = route.params;
  // not sure if this is the right way to pass the room param 

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
        <Camera style={styles.container} roomID={roomID}/>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A5A5A', // '#25292e'
    alignItems: 'center',
    justifyContent: 'center'
  },
});