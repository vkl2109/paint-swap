import { StyleSheet, View, Pressable, Text, TextInput, Switch } from 'react-native';
import { useState, useEffect } from 'react'

export default function CreateRoom({ navigation }) {

    const [text, onChangeText] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [privateRoom, setPrivateRoom] = useState(false);


    // useEffect(()=>{
    //     socket.on('navigate_to_room', (roomName) => {
    //         navigation.navigate('Room', { roomName });
    //     });
    // })



    const handleSubmit = async () => {
        let req = await fetch('http://localhost:3000/rooms', {
            method: 'POST',
            body: JSON.stringify({
                name: text,
                private: privateRoom,
                occupied: false
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        let res = await req.json()
        console.log(res)
        setShowMessage(true)
    }

    return (
        <View>
            {showMessage ? (
                <View>
                    <Text> Waiting for a user to join {text}...</Text>
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Room Name"
                        maxLength={20}
                        onChangeText={text => onChangeText(text)}
                        value={text}
                    />
                    <View style={styles.checkboxContainer}>
                        <Switch
                            value={privateRoom}
                            onValueChange={setPrivateRoom}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>This is a private room</Text>
                    </View>
                    <Pressable style={styles.button} onPress={() => handleSubmit()}>
                        <Text style={styles.buttonLabel}>Create a Room</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
    }
});