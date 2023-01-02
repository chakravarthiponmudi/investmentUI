import React from 'react';
import {Text, View} from 'react-native';
const FolioCard = (props) => {

    return (
        <View style={{flex:1, padding:"2em%"}}>
            <View style={{flexDirection: "row"}}>
                <Text> Name : </Text> 
                <Text> {props.name}</Text>     
            </View>
            <View style={{flexDirection: "row"}}>
                <Text> Schemes : </Text> 
                <Text> 0</Text>     
            </View>
            <View style={{flexDirection: "row"}}>
                <Text> Market Value : </Text> 
                <Text> 0</Text>     
            </View>
            <View style={{flexDirection: "row"}}>
                <Text> Investment : </Text> 
                <Text> 0</Text>     
            </View>
            <View style={{flexDirection: "row"}}>
                <Text> Gain/Loss : </Text> 
                <Text> 0 (%)</Text>     
            </View>
        </View>
            
    )
}

export default FolioCard;