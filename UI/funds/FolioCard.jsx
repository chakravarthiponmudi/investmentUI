import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableWithoutFeedback} from 'react-native';
import { any } from 'react-native/Libraries/Text/TextNativeComponent';
import CurrencyText from '../utils/CurrencyText';

type Props = {
    folioId: number;
    name: string,
    investmentAmount: number,
    scheme: any,
    routerFunction: any,
    marketValue: number,
};
 
const FolioCard = (props):Props => {

    const [cardColor, setCardColor] = useState(styles.unselected);
    return (
        <TouchableWithoutFeedback onPress={()=>props.routerFunction({folioId:props.folioId})}>
            <View style={[styles.card, {backgroundColor: cardColor}]} 
                onTouchStart={()=> {
                    setCardColor(styles.selected)
                }}
                onTouchEnd ={()=> setCardColor(styles.unselected)}
            >
                <View style={{flex:1}}>
                    <Text style = {styles.schemeHeading}> {props.name}</Text>     
                    
                    <View style={{flexDirection: "row"}}>
                        <Text> Schemes : </Text> 
                        <Text> {props.schemes && props.schemes.length}</Text>     
                    </View>
                    <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                        <View style={{flexDirection: "row"}}>
                            <Text> Market Value : </Text> 
                            <CurrencyText amount={Math.round(props.marketValue)} currencyCode="INR"/>    
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text> Investment : </Text> 
                            <CurrencyText amount={Math.round(props.investmentAmount)} currencyCode="INR"/>    
                        </View>
                        
                    </View>
                    
                </View>
            </View>
        </TouchableWithoutFeedback>

      
            
    )
}


const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        padding: "2em%",
        marginVertical:2,
        marginHorizontal: 8,
        marginRight:"2em%",
        borderRadius:15,
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
    schemeHeading: {
        textAlign: "center",
        fontWeight: "bold"
    },
    unselected: '#86b0ff',
    selected: '#5967ff'
  });

export default FolioCard;