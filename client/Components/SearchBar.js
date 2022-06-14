import { StyleSheet, TextInput, Text, View, Button} from 'react-native';
import { useState } from 'react';

import QRCScanner from './QRCScanner';

export default function SearchBar({}) {
    const [isScanning, setIsScanning]   = useState(false);
    const [text, onChangeText]          = useState("");

    return (
        <View style={styles.searchform}>
            <Button onPress={() => setIsScanning(!isScanning)} title="QRCODE" />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <Button title='Submit Query' style={{width: 100}}/>

            {isScanning && <QRCScanner onChangeText={onChangeText} />}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300
    },
    searchform: {
        margin: "10%",
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: 1,
        padding: 12
    }
})