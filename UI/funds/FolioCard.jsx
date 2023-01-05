import React from 'react';
import {Text, View, Button} from 'react-native';
const FolioCard = (props) => {
    return (
        <View style={{flexDirection: "row"}}>
            <View style={{flex:1, padding:"2em%"}}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{}}> Name : </Text> 
                    <Text> {props.name}</Text>     
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text> Schemes : </Text> 
                    <Text> {props.schemes && props.schemes.length}</Text>     
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text> Market Value : </Text> 
                    <Text> {props.marketValue}</Text>     
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
            <View style= {{flex:0.2,justifyContent:'center', alignItems : 'center'}}>
                <Button title="->"   onPress={()=> alert("Button Pressed")}/>
            </View>
        </View>
      
            
    )
}

export default FolioCard;