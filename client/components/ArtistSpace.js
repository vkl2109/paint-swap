import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Button } from '@rneui/themed';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiSticker from './EmojiSticker.js'

export default function ArtistSpace({ navigation, route }) {
    const [newPhoto, setNewPhoto] = useState(null)
    const { roomID } = route.params;
    const imageRef = useRef();
    const pickedEmoji = require('../assets/images/cat.png')

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

    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://172.29.1.114:5000/getimage`, {
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
                const img = "data:image/jpeg;base64," + String(res)
                console.log(img)
                setNewPhoto(img)
            }
        }
        request()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                {newPhoto ?
                    <View ref={imageRef} collapsable={false}>
                        <Image source={{ uri: newPhoto }} style={styles.image}></Image>
                        <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
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
                    }} />
            </GestureHandlerRootView>
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