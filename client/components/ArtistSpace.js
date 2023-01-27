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
            let req = await fetch('http://172.29.1.114:5000/postimage', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: roomID,
                    uri: base64Image
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
        request()
    }

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
                // console.log(img)
                setNewPhoto(img)
            }
        }
        request()
        isWaiting(true)
    }, [toggle])

    // const leaveRoom = () => {
    //     navigation.navigate('LandingPage')
    // }

    const leaveRoom = async () => {
        let req = await fetch(`http://172.29.1.114:5000/leaveroom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: roomID
            })
        })
        navigation.navigate('LandingPage')
    }


    const selectEmoji = (item) => {
        setEmojis(prevState => [item, ...prevState])
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginTop: 11, height: 150 }} onPress={() => { selectEmoji(item) }}>
                <Image style={{ width: 100, height: 100 }} resizeMode='contain' source={require(item)} />
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                <View style={styles.container}>
                    {waiting ?
                        <View style={styles.container}>
                            {newPhoto ?
                                <View style={styles.imageContainer} ref={imageRef} collapsable={false}>
                                    <Image source={{ uri: newPhoto }} style={styles.image}></Image>
                                    {
                                        emojis.map((emoji) => {
                                            return (
                                                <EmojiSticker imageSize={40} stickerSource={require(emoji)} />
                                            )
                                        })
                                    }
                                </View>
                                : <Text>No Image</Text>}
                            <View style={styles.buttonList}>
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
                                        marginVertical: 0,
                                    }} />
                                <Button
                                    title="Switch"
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
                                        marginVertical: 0,
                                    }} />
                                <Button
                                    title="Leave Room"
                                    onPress={() => leaveRoom()}
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
                                        marginVertical: 0,
                                    }} />
                            </View>
                            <FlatList data={Emojis} horizontal renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
                        </View>
                        :
                        <View style={styles.container}>
                            <Text>Waiting for other user</Text>
                        </View>}
                    {leaveMsg &&
                        <View>
                            <Text>The other user left</Text>
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
        justifyContent: 'center'
    },
    imageContainer: {
        flex: -1,
        height: 300,
        width: 300,
        marginVertical: 20,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonList: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: '#25292e',
        marginVertical: 0,
        alignItems: 'center',
    },
    image: {
        height: 300,
        width: 300,
        // backgroundColor: '#25292e',
        alignSelf: 'center'
    },
});