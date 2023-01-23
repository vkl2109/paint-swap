import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from '@rneui/themed';

export default function ChoosePublic({ navigation }) {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://localhost:3000/rooms')
            let res = await req.json()

            setRooms(res)
            console.log(rooms)
        }
    },[])


    const handleRoom = (room) => {
        navigation.navigate('PaintRoom', room)

        // socket.on('join_room', (data) => {
        //     if (data.status === 'success') {
        //         navigation.navigate('Room', { roomName });
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonLabel}>Enter a Public Room</Text>
                <FlatList data={rooms} renderItem={({ room }) => (
                    <TouchableOpacity onPress={() => { handleRoom(room) }}>
                        <Text>Room: {room.name}</Text>
                    </TouchableOpacity>
                )} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5A5A5A', // '#25292e'
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});