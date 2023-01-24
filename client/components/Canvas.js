import React, { useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import RNDrawOnScreen from 'react-native-draw-on-screen';
import { Button } from '@rneui/themed';
export default class Canvas extends React.Component {

    state = {
        color: 'black',
        strokeWidth: 10,
    };

    changeColor = (color) => {
        this.setState({ color });
    };

    changeBrushSize = (strokeWidth) => {
        this.setState({ strokeWidth });
    };

    undo = () => {
        this.RNDraw.undo();
    };

    clear = () => {
        this.RNDraw.clear();
    };

    render() {
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
                onPress={() => this.undo()}
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
                onPress={() => this.clear()}
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
            >
            <RNDrawOnScreen
                penColor={this.state.color}
                strokeWidth={this.state.strokeWidth}
                ref={(r) => (this.RNDraw = r)}
            />
            </View>
        </SafeAreaView>
        );
    }
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
            flexDirection: 'row',
            backgroundColor: '#5A5A5A', // '#25292e'
            alignItems: 'center',
            justifyContent: 'center',
        },
});