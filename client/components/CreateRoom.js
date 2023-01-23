import { StyleSheet, SafeAreaView, ScrollView, View, Pressable, Text, TextInput, Switch } from 'react-native';
import { useState, useEffect } from 'react'
import { Button } from '@rneui/themed';


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
        // let req = await fetch('http://localhost:3000/rooms', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: text,
        //         private: privateRoom,
        //         occupied: false
        //     }),
        //     headers: { 'Content-Type': 'application/json' }
        // })
        // let res = await req.json()
        // console.log(res)
        setShowMessage(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
                                placeholderTextColor="rgba(300, 300, 300, 0.3)"
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
                            <Button
                                title="Create Room"
                                titleStyle={{ fontWeight: '700' }}
                                buttonStyle={{
                                    backgroundColor: 'rgba(90, 154, 230, 1)',
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 30,
                                }}
                                containerStyle={{
                                    width: 200,
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                }}
                                onPress={() => handleSubmit()}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5A5A5A', // '#25292e'
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1,
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
        paddingRight: 20,
        color: '#CCCCCC',
        marginVertical: 20
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