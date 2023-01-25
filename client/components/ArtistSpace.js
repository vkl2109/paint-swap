import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Button } from '@rneui/themed';

export default function ArtistSpace({ navigation, route }) {
    const [ newPhoto, setNewPhoto ] = useState(null)
    const { roomID } = route.params;
    const imageRef = useRef();

    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
                // result: 'data-uri'
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                console.log(localUri)
                alert("Saved!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        const request = async () => {
            let req = await fetch(`http://10.129.2.90:5000/getimage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: roomID
                })
            })
            if (req.ok) {
                let res = await req.json()
                const img = "data:image/jpeg;base64," + res
                setNewPhoto(img)
            }
        }
        request()
    },[])
    return (
        <SafeAreaView style={styles.container}>
            {newPhoto ? 
                <View ref={imageRef} collapsable={false}>
                    <Image source={{ uri: newPhoto }} style={styles.image}></Image> 
                </View>
                : <Text>No Image</Text>}
            <Button 
                title="Save" 
                onPress={() => onSaveImageAsync()} 
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
                }}/>
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
    image: {
        height: 300,
        width: 300,
        alignSelf: 'center'
    },
});