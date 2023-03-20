import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableWithoutFeedback} from 'react-native';
import CurrencyText from '../utils/CurrencyText';
import config from "../config/Config";

type Props = {
    folioId: number,
    name: string,
    folioName:string,
    investmentAmount: number,
    schemes: any,
    routerFunction: any,
};
 
const FolioCard = (props:Props) => {

    const [cardColor, setCardColor] = useState(colorConstants.profit);
    const [roi, setRoi] = useState(0);


    const [marketValue, setMarketValue] = useState(0);

    const getTotalMarketValue = async () => {
        try {
            const response = await fetch(`http://${config.server.host}:${config.server.port}/folios/marketvalue?folio_no=${props.folioName}`);
            const amount = await response.json();
            const marketValue = amount.EQUITY + amount.DEBT
            setMarketValue(marketValue);
            if (props.investmentAmount > marketValue) {
                setCardColor(colorConstants.loss);
            } else {
                const profit = marketValue - props.investmentAmount;
                if (profit < (props.investmentAmount * 0.06)) {
                    setCardColor(colorConstants.underperforming);
                }
            }
            calculateRoi(marketValue, props.investmentAmount);

        }catch (error) {
            console.error("getTotalMarketValue" , error);
        }
    }

    const calculateRoi = (markteValue : number, investment: number):void => {
        let roi = (marketValue - investment)/investment * 100;
        setRoi(roi);
    }

    useEffect(()=>{
        getTotalMarketValue();
    })



    return (
        <TouchableWithoutFeedback onPress={()=>props.routerFunction({folioId:props.folioId})}>
            <View style={[styles.card]} 
                onTouchStart={()=> {
                    setCardColor(colorConstants.selected)
                }}
                onTouchEnd ={()=> setCardColor(colorConstants.profit)}
            >
                <View style={{flex:1}}>
                    <Text style = {styles.schemeHeading}> {props.name}</Text>     
                    <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                        <View style={{flexDirection: "row"}}>
                            <Text> Schemes : </Text> 
                            <Text> {props.schemes && props.schemes.length}</Text>     
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text> Roi(%) : </Text> 
                            <Text> {roi.toFixed(2)}</Text>     
                        </View>
                    </View>
                    
                    <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                        <View style={{flexDirection: "row"}}>
                            <Text> Market Value : </Text> 
                            <CurrencyText amount={Math.round(marketValue)} currencyCode="INR" style={undefined}/>    
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text> Investment : </Text> 
                            <CurrencyText amount={Math.round(props.investmentAmount)} currencyCode="INR" style={undefined}/>    
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
    
  });


const colorConstants = {
    profit: '#86b0ff',
    selected: '#5967ff',
    loss: 'red',
    underperforming: 'orange'
}

export default FolioCard;