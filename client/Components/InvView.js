import { useEffect, useState } from "react";
import { StyleSheet ,View, Dimensions } from "react-native";

import InvItemAcc from "./InvItemAcc";

import axios from "axios";

const windowWidth = Dimensions.get('window').width;

export default function InvView() {

    const [invItems, setInvItems] = useState([]);

    useEffect(() => {
        (async () => {
            axios.get('http://192.168.1.80:5000/api/readinv')
            .then(response => {
                console.log(response.data);
            })
            .catch(err => console.log(err));
        })();
    }, [])

    const invItemsMap = invItems.map((item, i) => {
        return (
            <View style={styles.item} key={i}>
                <InvItemAcc item={item[keyname]} />
            </View>
        )
    })

    return (
        <View>
            {invItemsMap}
        </View>
    )
}

const styles = StyleSheet.create({

    item: {
      backgroundColor: '#afafff',
      width: windowWidth*0.85,
      justifyContent: 'center',

      padding: 5,
      display: "flex",
      flexDirection: "column"
    }
  });