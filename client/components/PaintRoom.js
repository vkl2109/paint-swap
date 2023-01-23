
import { View, Text } from 'react-native'

export default function PaintRoom({ navigation, route }) {

    const { roomID } = route.params;
    // not sure if this is the right way to pass the room param 


    return (
        <View>
            <Text>
                {roomID}
            </Text>
        </View>
    )

}