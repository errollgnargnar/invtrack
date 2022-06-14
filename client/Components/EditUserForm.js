import { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import axios from "axios";


export default function EditUserForm({userEditing, setIsEditingUser}) {

    const [displayNameE, setDisplayNameE] = useState(userEditing.userRec[0].displayName);
    const [emailE, setEmailE]             = useState(userEditing.userRec[0].email);
    const [status, setStatus]             = useState(null);

    const uEuid = userEditing.uid;

    const postEditUser = async () => {
        setStatus('submitting edit');
        axios.post('http://192.168.1.80:5000/api/edituser', {
            displayNameE, emailE, uEuid
        })
        .then(res => {
            console.log(res);
            setStatus('Edit Submitted!');
            setTimeout(() => {
                setIsEditingUser(false);
            }, 2000);
            //..
        })
    }

    return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={setDisplayNameE}
                    value={displayNameE}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmailE}
                    value={emailE}
                />
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Button
                      title="Save"
                      style={{marginRight:"2%"}}
                      onPress={postEditUser}
                      />
                    <Button
                      title="Cancel"
                      style={{marginRight:"2%"}}
                      onPress={() => setIsEditingUser(false)}
                      />
                </View>
                <Text>
                    {status}
                </Text>
            </View>

    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        position:"absolute",
        top:"40%",
        left: "5%",
        zIndex: 3,
        backgroundColor: "beige",
        justifyContent:"center",
        alignItems: "center",
        width: "90%",
    },
    input: {
      width: "90%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: "white"
    },
});