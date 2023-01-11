import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableWithoutFeedback} from 'react-native';
import { any } from 'react-native/Libraries/Text/TextNativeComponent';
import CurrencyText from '../utils/CurrencyText';

type Props = {
    folioId: number,
    name: string,
    folioName:string,
    investmentAmount: number,
    scheme: any,
    routerFunction: any,
};
 
const FolioCard = (props):Props => {

    const [cardColor, setCardColor] = useState(styles.unselected);


    const [marketValue, setMarketValue] = useState(0);

    const getTotalMarketValue = async () => {
        try {
            const response = await fetch(`http://192.168.1.5:8443/folios/marketvalue?folio_no=${props.folioName}`);
            const amount = await response.text();
            setMarketValue(amount)
        }catch (error) {
            console.error("getTotalMarketValue" , e);
        }
    }

    useEffect(()=>{
        getTotalMarketValue();
    })



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
                            <CurrencyText amount={Math.round(marketValue)} currencyCode="INR"/>    
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