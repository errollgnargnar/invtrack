import { useEffect, useState } from "react";
import { Button, ScrollView, View, Text, TextInput, StyleSheet } from "react-native";

import axios from "axios";

export default function NewUserForm({ isAddingUser, setIsAddingUser }) {
    const [name, setName]     = useState('');
    const [email, setEmail]   = useState('');
    const [passwd, setPasswd] = useState('');
    const [status, setStatus] = useState('');

    const postNewUser = async () => {
        setStatus('submitting new user');
        axios.post('http://192.168.1.80:5000/api/createuser', {
            name, email, passwd
        })
        .then(res => {
            console.log(res.data.email);
            if(res.data.email.toUpperCase() == email.toUpperCase()) {
                setStatus(`${email} added successfully!`)
                setName(''); setEmail(''); setPasswd('');

                setTimeout(() => {
                    setStatus('');
                    setIsAddingUser(false);
                }, 3000);
            } else {
                setStatus('Failed to submit');
                setTimeout(() => {
                    setStatus('');
                }, 3000);
            }
        })
    }

    const handleAddUser = () => {
        postNewUser();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
            Add New User
            {"\n"}
            </Text>
            <TextInput
             style={styles.input}
             placeholder="Name"
             value={name}
             onChangeText={setName}
             />
            <TextInput
             style={styles.input}
             placeholder="email"
             value={email}
             onChangeText={setEmail}
             />
            <TextInput
             style={styles.input}
             placeholder="one-time password"
             value={passwd}
             onChangeText={setPasswd}
             />
            <View style={styles.buttons}>
                <Button
                    onPress={handleAddUser}
                    title="Add User"
                    color="#841584"
                    />
                <Text> </Text>
                <Button
                    onPress={() => setIsAddingUser(false)}
                    title="Cancel"
                    color="#841584"
                    />
            </View>
            <Text>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        display:"flex",
        flexDirection: "row",
    },
    container: {
        position: "absolute",
        left: "5%",
        top:"10%",
        width: "90%",
        backgroundColor: "beige",
        borderWidth: 5,
        zIndex:3
    },
    input: {
        height: 40,
        width: "85%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    }
});