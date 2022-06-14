import { useEffect, useState } from "react";

import { Button, ScrollView, View, StyleSheet, Text, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';


import axios from "axios";

import NewUserForm from "./NewUserForm";
import EditUserForm from "./EditUserForm";
import DelUserForm from "./DelUserForm";


export default function Users() {
    const [users, setUsers]               = useState([]);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [userEditing, setUserEditing]     = useState(null);
    const [isDeletingUser, setIsDeletingUser] = useState(false);

    useEffect(() => {
      axios({
        method: 'get',
        url: 'http://192.168.1.80:5000/api/allusers',
      })
        .then(function (response) {
          setUsers(response.data);
        })
    }, [isAddingUser, isDeletingUser, isEditingUser])

    const displayNameMap = users.map((user,i) => (
      <View key={i}>
        <View s>
          <Text>
            Name: {user.userRec[0].displayName}
          </Text>
          <Text>
            Email: {user.userRec[0].email}
          </Text>
          <Text>
            uid: {user.uid}
          </Text>
        </View>
        <View style={{display: "flex", flexDirection:"row"}}>
            <Icon    
              style={{flex: 1}}   
              raised
              name='edit'
              type='font-awesome'
              color='#f50'
              onPress={() => {
                setUserEditing(user);
                setIsEditingUser(true);
              }} />
            <Icon       
              style={{flex: 1}}   
              raised
              name='trash'
              type='font-awesome'
              color='#f50'
              onPress={(() => {
                setUserEditing(user);
                setIsDeletingUser(true);
              })}
              />         
        </View>
      </View>
    ))

    const handleAddUser = () => {
        setIsAddingUser(true);
    }

    return (
        <View>
            { isAddingUser && <NewUserForm isAddingUser={isAddingUser} setIsAddingUser={setIsAddingUser} /> }

            { isEditingUser && <EditUserForm userEditing={userEditing} setIsEditingUser={setIsEditingUser} /> }

            { isDeletingUser && <DelUserForm userEditing={userEditing} setIsDeletingUser={setIsDeletingUser} /> }

            <Text
                style={styles.titleText}>
                Current Users
                {"\n"}
            </Text>
            {displayNameMap}
            <Button
                title="Add User"
                onPress={handleAddUser}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    

    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },

});