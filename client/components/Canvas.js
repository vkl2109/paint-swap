import React, { useState, useRef } from 'react';
import { ImageBackground, StyleSheet, View, SafeAreaView } from 'react-native';
// import RNDrawOnScreen from 'react-native-draw-on-screen';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { Button } from '@rneui/themed';
const PlaceholderImage = require('../assets/images/background-image.png');

export default function Canvas () {
    const [status, requestPermission] = MediaLibrary.usePermissions();
    if (status === null) {
        requestPermission();
    }
    const [ color, setColor ] = useState('black')
    const [strokeWidth, setStrokeWidth ] = useState(10)
    const RNDraw = useRef()
    const imageRef = useRef();

    const changeColor = (newColor) => {
        setColor(newColor)
    };

    const changeBrushSize = (newStrokeWidth) => {
        setStrokeWidth(newStrokeWidth)
    };

    const undo = () => {
        RNDraw.current.undo();
    };

    const clear = () => {
        RNDraw.current.clear();
    };

    const onSaveImageAsync = async () => {
        try {
        const localUri = await captureRef(imageRef, {
            height: 440,
            quality: 1,
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

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.buttons}>
            <Button
            title="Undo"
            buttonStyle={{
                backgroundColor: 'rgba(244, 244, 244, 1)',
                borderRadius: 20,
            }}
            containerStyle={{
                height: 40,
                width: 120,
                marginHorizontal: 10,
                marginVertical: 10,
            }}
            titleStyle={{ marginHorizontal: 20, color: 'black' }}
            onPress={() => undo()}
            />
            <Button
            title="Clear"
            buttonStyle={{
                backgroundColor: 'rgba(244, 244, 244, 1)',
                borderRadius: 20,
            }}
            containerStyle={{
                height: 40,
                width: 120,
                marginHorizontal: 10,
                marginVertical: 10,
            }}
            titleStyle={{ marginHorizontal: 20, color: 'black' }}
            onPress={() => clear()}
            />
            <Button
            title="Save"
            buttonStyle={{
                backgroundColor: 'rgba(244, 244, 244, 1)',
                borderRadius: 20,
            }}
            containerStyle={{
                height: 40,
                width: 120,
                marginHorizontal: 10,
                marginVertical: 10,
            }}
            titleStyle={{ marginHorizontal: 20, color: 'black' }}
            onPress={() => onSaveImageAsync()}
            />
        </View>
        <View
        style={{
            height: 300,
            width: 300,
            border: 'solid',
            borderWidth: 2,
            borderColor: '#ccc',
        }}
        ref={imageRef} collapsable={false}
        >
            <ImageBackground source={PlaceholderImage} style={styles.image}>
                {/* <RNDrawOnScreen
                    penColor={color}
                    strokeWidth={strokeWidth}
                    ref={RNDraw}
                /> */}
            </ImageBackground>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5A5A5A', // '#25292e'
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#5A5A5A', // '#25292e'
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
  },
});