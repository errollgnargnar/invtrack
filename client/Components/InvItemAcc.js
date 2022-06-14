import { useState } from "react";
import { StyleSheet ,View, Text, Image } from "react-native";
import { Card, Icon } from "react-native-elements";
import { ListItem } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';


export default function InvItemAcc({item}) {

    const [expanded, setExpanded] = useState(false)

    return (
        <ListItem.Accordion
            content={
                <>
                <Icon name="build" size={30} />
                <ListItem.Content>
                    <ListItem.Title>{item.itemName}</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
            >
            <ListItem.Content>
                <View  style={styles.invdet}>
                    <View  style={{flex: 1}}>
                        <QRCode 
                        value={item.itemName}
                        />  
                    </View>
                    <View  style={{flex: 1}}>
                        <ListItem.Subtitle>Count: {item.count}</ListItem.Subtitle>
                        <ListItem.Content><Text>Desc: {item.desc}</Text></ListItem.Content>
                    </View>
                    <Text>img...</Text>
                    <Image
                        source={{
                        uri: item.imgUrl,
                        }}
                    />
                </View>
            </ListItem.Content>
        </ListItem.Accordion>
    )
}

const styles = StyleSheet.create({
    invdet: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 10
    }
})