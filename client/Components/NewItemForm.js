import { useState } from "react";
import { Alert, Button, ScrollView, Text, View } from "react-native";
import { Icon, Input } from 'react-native-elements';

import CameraWidget from './CameraWidget';
import * as FileSystem from 'expo-file-system';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU7GIVXivREBpe0BlYGPSLvDKYPOAYQc0",
  authDomain: "awsauth-53fbe.firebaseapp.com",
  databaseURL: "https://awsauth-53fbe-default-rtdb.firebaseio.com",
  projectId: "awsauth-53fbe",
  storageBucket: "awsauth-53fbe.appspot.com",
  messagingSenderId: "259829351416",
  appId: "1:259829351416:web:b197f66ef80ffdb5144c0d"
};

import axios from "axios";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function NewItemForm({pushInv, setIsAdding}) {

    const [itemName, setItemName]         = useState('');
    const [count, setCount]               = useState('0');
    const [desc, setDesc]                 = useState('');
    const [isCameraView, setIsCameraview] = useState(false);
    const [imageURL, setImageURL]         = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus]             = useState('status');

    let dlUrl = '';

    async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
      
        const date = new Date();
        const dateISO = date.toISOString();
        const fileRef = ref(getStorage(), dateISO);
        const result = await uploadBytes(fileRef, blob);
        console.log(result);
      
        // We're done with the blob, close and release it
        blob.close();
      
        dlUrl = await getDownloadURL(fileRef);
        console.log(dlUrl);
    }
    
    const postNewItem = async (itemObj) => {
        axios.post('http://192.168.1.80:5000/api/invadd', itemObj)
          .then(function (response) {
            setStatus(JSON.stringify(response.data));

            setTimeout(() => {
                setItemName('');
                setCount('');
                setDesc('');
                setIsCameraview(false);
                setImageURL(null);
                setIsSubmitting(false);
                setStatus('status');
            }, (1500));
          })
          .catch(function (error) {
            console.log(error);
            setStatus(JSON.stringify(error));
          });
    }
    
    const setNewItemToDb = async () => {
        setIsSubmitting(true);
        setStatus('submitting');
        uploadImageAsync(imageURL)
        .then(() => {
            const newItemObj = {
                itemName, count, desc, dlUrl
            }

            console.log('client created item obj: ' + JSON.stringify(newItemObj));
            postNewItem(newItemObj);
        })
    }

    const dateNow = new Date();
    return (
        <ScrollView>
            { isCameraView && <CameraWidget setImageURL={setImageURL} /> }

            <Input
                placeholder='Item Name'
                value={itemName}
                onChangeText={setItemName}
            />
            <Input
                placeholder='Count'
                keyboardType="number-pad"
                value={count}
                onChangeText={setCount}
            />
            <Input
                placeholder='Description'
                value={desc}
                onChangeText={setDesc}
            />
            <View style={{display: "flex", flexDirection: "row"}}>
                <Icon
                    raised
                    name='camera'
                    type='font-awesome'
                    color='#f50'
                    onPress={() => setIsCameraview(!isCameraView)} />
            </View>
            <Text>Date added: {dateNow.toLocaleDateString()} at {dateNow.toLocaleTimeString()}</Text>
            <Text>{imageURL}</Text>
            <View style={{display:"flex",flexDirection:"row", marginBottom: "2%"}}>
                <Button
                    title="Submit"
                    onPress={setNewItemToDb}
                    disabled={isSubmitting}
                />
                <Button
                    title="Cancel"
                    onPress={() => setIsAdding(false)}
                    disabled={isSubmitting}
                />
            </View>

            <Text>
                {status}
            </Text>

        </ScrollView>
    )
}