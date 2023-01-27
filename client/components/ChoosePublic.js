import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChoosePublic({ navigation, loginData, socket }) {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const request = async () => {
            let req = await fetch('http://10.129.2.90:5000/rooms')
            let res = await req.json()
            const publicRooms = res.filter(room => { return room.player_sid === null && room.private === false })
            setRooms(publicRooms)
            console.log(rooms)
        }

        request()
    }, [])


    const handleRoom = async (id) => {
        let req = await fetch(`http://10.129.2.90:5000/rooms/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            }
        })
        console.log(await AsyncStorage.getItem('token'))
        let res = await req.json()
        console.log(res)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                {/* <Text style={styles.buttonLabel}>Enter a Public Room</Text> */}
                {
                    rooms.map((room, i) => (
                        <TouchableOpacity key={`room-${i}`} onPress={() => { handleRoom(room.id) }} style={styles.appButtonContainer}>
                            <Text style={styles.appButtonText}>Room: {room.room_name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5EA9D', // '#25292e'
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
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 5,
        width: '80%'
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});