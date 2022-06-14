import { useState } from "react";
import { Button, Image, View, Text, StyleSheet,TextInput } from "react-native";

import axios from "axios";

export default function LoginScreen({isAdmin, isUser, setIsAdmin, setIsUser}) {

    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');
    const [status, setStatus]       = useState('');

    const sendAuth = async () => {
        axios.post('http://192.168.1.80:5000/api/login', {
            email, password
        })
        .then(res => {
          console.log(res);
          setStatus(JSON.stringify(res))
          const resUID = res.data.uid;
          if(resUID === 'ms9rj3n9vVXDmkxFa5hHb2Go4Tx1'){
            setIsAdmin(true);
            console.log('you the fuckng boss!');
          }
        })
        .catch(err =>  console.log(err));
    }

    const handleLogout = () => {
      setIsAdmin(null);
      setIsUser(null);
    }

    return (
        <View style={styles.login}>
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={setEmail}
              disabled={isAdmin || isUser}
              />
            <TextInput
              style={styles.input}
              placeholder="password" 
              onChangeText={setPassword}
              disabled={isAdmin || isUser}
              />
            <Button
              onPress={sendAuth}
              title='Submit'
              disabled={isAdmin || isUser}
            />
            <Text>{status}</Text>
            {(isAdmin || isUser) && <Text>Logged in</Text>}
            {(isAdmin || isUser) && <Button onPress={handleLogout} title="Logout" />}

        </View>
    )
}


const styles = StyleSheet.create({
    login: {
      padding: 10,
      flex: 1,
      margin: "1%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        width: "80%",
        height: 50,
        margin: 12,
        padding: 5
    }
  });
  