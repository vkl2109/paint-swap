import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';
import { useState } from 'react'

export default function EnterPrivate({ navigation }) {

    const [name, onChangeName] = useState('')

    const handleSubmit = async () => {
        let req = await fetch(`http://localhost:3000/rooms/${name}`)
        let res = await req.json()
        console.log(res)
        navigation.navigate('PaintRoom', res)

        // socket.on('join_room', (data) => {
        //     if (data.status === 'success') {
        //         this.props.navigation.navigate('Room', { roomName });



    }

    return (
        <View style={styles.buttonContainer}>
            <TextInput
                style={styles.textInput}
                placeholder="Room Name"
                maxLength={20}
                value={name}
                onChangeText={onChangeName}
            />
            <Pressable style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonLabel}>Enter the Room</Text>
            </Pressable>
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
    }
});