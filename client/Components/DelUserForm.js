import { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import axios from "axios";

export default function DelUserForm({userEditing, setIsDeletingUser}) {

    const [displayNameE, setDisplayNameE] = useState(userEditing.userRec[0].displayName);
    const [emailE, setEmailE]             = useState(userEditing.userRec[0].email);
    const [status, setStatus]             = useState(null);

    const uid = userEditing.uid
    
    const delUser = async () => {
        setStatus('deleting user');
        axios.post('http://192.168.1.80:5000/api/deleteuser', {
            uid
        })
        .then(res => {
            console.log(res.data);
            setStatus(res.data);

            setTimeout(() => {
                setIsDeletingUser(false);
            }, 1500)
        })
        .catch(err => setStatus(err));
    }

    return (
            <View style={styles.container}>
                <Text>
                    Are you sure you want to delete -
                </Text>
                <View style={{display: "flex", flexDirection: "column"}}>
                    <Text>
                        USER: {displayNameE}
                    </Text>
                    <Text>
                        EMAIL: {emailE} 
                    </Text>
                </View>
                
                <View style={{display: "flex", flexDirection:"row"}}>
                    <Button
                    color="red"
                    title="Delete"
                    onPress={delUser} />
                    <Button
                    color="gray"
                    title="Cancel"
                    onPress={() => {
                        setIsDeletingUser(false);
                    }} />
                </View>
                <Text>{status}</Text>
            </View>

    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        position:"absolute",
        top:"30%",
        left: "5%",
        zIndex: 1,
        backgroundColor: "beige",
        justifyContent:"center",
        alignItems: "center",
        width: "90%",
        height: "40%",
    },
    input: {
      width: "90%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: "white"
    },
});