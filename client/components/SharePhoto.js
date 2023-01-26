import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function SharePhoto({ image, setImage, base64image, setBase64Image, waiting, shareImage }) {

    useEffect(()=>{
        pickImage()
    },[])
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
    return (
        <View style={styles.container}>
            {waiting ? 
            <View style={styles.container}>
                {/* <View style={styles.buttonList}>
                    {!image && <>
                    <Button
                        title="Choose"
                        onPress={() => pickImage()}
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
                        }}>
                    </Button>
                    </>}
                </View> */}
                {image && <>
                    <View>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                    <View style={styles.buttonList}>
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
                    </View>
                </>}
            </View>
            :
            <View style={styles.container}>
                <Text>Waiting for other user</Text>
            </View>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraContainer: {
        height: 400,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    image: {
        height: 300,
        width: 300,
        alignSelf: 'center'
    },
    buttonList: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})