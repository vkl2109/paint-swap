import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Button } from '@rneui/themed';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiSticker from './EmojiSticker.js'
import * as FileSystem from 'expo-file-system';
import Emojis from './Emojis.js';

export default function ArtistSpace({ navigation, route, toggle, setToggle, leaveMsg }) {
    const [newPhoto, setNewPhoto] = useState(null)
    const [base64Image, setBase64Image] = useState()
    const [waiting, isWaiting] = useState(true)
    const { roomID } = route.params;
    const imageRef = useRef();
    const [emojis, setEmojis] = useState([])

    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
                // result: 'data-uri'
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                const base64 = await FileSystem.readAsStringAsync(localUri, { encoding: 'base64' });
                setBase64Image(base64)
                const img = "data:image/jpeg;base64," + base64
                setNewPhoto(img);
                alert("Saved!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const shareImage = () => {
        const request = async () => {
            try {
                const localUri = await captureRef(imageRef, {
                    height: 440,
                    quality: 1,
                    // result: 'data-uri'
                });
                if (localUri) {
                    const base64 = await FileSystem.readAsStringAsync(localUri, { encoding: 'base64' });
                    setBase64Image(base64)
                    const img = "data:image/jpeg;base64," + base64
                    setNewPhoto(img);
                    let req = await fetch('http://10.129.2.90:5000/postimage', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            id: roomID,
                            uri: base64
                        })
                    })
                    if (req.ok) {
                        setNewPhoto(null)
                        isWaiting(false)
                        let res = await req.json()
                        if (res.message == 'refresh') {
                            setToggle(toggle => !toggle)
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
        request()
    }

    useEffect(() => {
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
                const img = "data:image/jpeg;base64," + String(res)
                // console.log(img)
                setNewPhoto(img)
            }
        }
        request()
        isWaiting(true)
        setEmojis([])
    }, [toggle])

    // const leaveRoom = () => {
    //     navigation.navigate('LandingPage')
    // }

    const leaveRoom = async () => {
        let req = await fetch(`http://10.129.2.90:5000/leaveroom`, {
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
            navigation.navigate('LandingPage')
        }
    }


    const selectEmoji = (item) => {
        setEmojis(prevState => [...prevState, item])
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginTop: 0, height: 10 }} onPress={() => { selectEmoji(item) }}>
                <Image style={{ width: 100, height: 100 }} resizeMode='contain' source={item} />
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                <View style={styles.container}>
                    {waiting ?
                        <View style={styles.container}>
                            <View style={styles.list}> 
                                <FlatList data={Emojis} horizontal renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
                            </View>
                            {newPhoto ?
                                <View style={styles.imageContainer} ref={imageRef} collapsable={false}>
                                    <Image source={{ uri: newPhoto }} style={styles.image}></Image>
                                    <View style={styles.emojiList}> 
                                    {
                                        emojis.map((emoji, index) => {
                                            // console.log(emoji) 
                                            return (
                                                <EmojiSticker style={styles.emoji} key={index} imageSize={40} stickerSource={emoji} />
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                : <Text>No Image</Text>}
                            <View style={styles.buttonList}>
                                <Button
                                    title="Save"
                                    onPress={() => onSaveImageAsync()}
                                    titleStyle={{ fontWeight: '700' }}
                                    buttonStyle={{
                                        backgroundColor: '#369F8E',
                                        borderColor: 'transparent',
                                        borderWidth: 0,
                                        borderRadius: 30,
                                    }}
                                    containerStyle={{
                                        width: 100,
                                        marginHorizontal: 10,
                                        marginVertical: 0,
                                    }} />
                                {!leaveMsg && <Button
                                    title="Swap"
                                    onPress={() => shareImage()}
                                    titleStyle={{ fontWeight: '700' }}
                                    buttonStyle={{
                                        backgroundColor: '#FFA500',
                                        borderColor: 'transparent',
                                        borderWidth: 0,
                                        borderRadius: 30,
                                    }}
                                    containerStyle={{
                                        width: 100,
                                        marginHorizontal: 10,
                                        marginVertical: 0,
                                    }} />}
                                <Button
                                    title="Leave"
                                    onPress={() => leaveRoom()}
                                    titleStyle={{ fontWeight: '700' }}
                                    buttonStyle={{
                                        backgroundColor: '#FF0000',
                                        borderColor: 'transparent',
                                        borderWidth: 0,
                                        borderRadius: 30,
                                    }}
                                    containerStyle={{
                                        width: 100,
                                        marginHorizontal: 10,
                                        marginVertical: 0,
                                    }} />
                            </View>
                        </View>
                        :
                        <View style={styles.container}>
                            <Text>Waiting for other user</Text>
                        </View>}
                    {leaveMsg &&
                        <View>
                            <Text style={styles.message}>The other user left</Text>
                        </View>
                    }
                </View>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5EA9D', // '#25292e'
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: '#25292e',
    },
    list: {
        maxHeight: 100
    },
    imageContainer: {
        // flex: -1,
        height: 300,
        width: 300,
        marginVertical: 20,
        // backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonList: {
        // flex: -1,
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: '#25292e',
        marginVertical: 0,
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        height: 300,
        width: 300,
        // backgroundColor: '#25292e',
        alignSelf: 'center'
    },
    emoji: {
        // position: 'absolute',
        // zIndex: 100
    },
    emojiList: {
        flexDirection: 'row',
        position: 'absolute'
    },
    message: {
        marginBottom: 30
    }
});