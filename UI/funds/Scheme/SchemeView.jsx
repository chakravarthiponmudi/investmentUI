import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Scheme } from "../../../Domain/Funds/Scheme";
import CurrencyText from "../../utils/CurrencyText";


type Props = {
    scheme: Scheme
}

const SchemeView = ({scheme}) : Props => {

    const [marketValue, setMarketValue] = useState(scheme.marketValue)

    const getMarketValue = async ()=>{
        try {
            const response = await fetch(`http://192.168.1.5:8443/schemes/${scheme.isin}/marketvalue`);
            const value :number = await response.text();
            setMarketValue(value);
        }catch (error) {
            console.error(error)
        }
    }
    useEffect(()=> {
        getMarketValue();
    })
    
    return (
        <View style={styles.container}>
            
            <View style={[styles.row, styles.Heading]}>
                <Text style={styles.Heading.textStyling}> {scheme.scheme} ({scheme.type})</Text>    
            </View>
            <View  style={styles.row}>
                <Text> Total Nav</Text>
                <Text> {scheme.close}</Text>
            </View>
            <View  style={styles.row}>
                <Text> Market Value</Text>
                <CurrencyText amount={Math.round(marketValue)} currencyCode="INR"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        margin: 5,
        marginLeft:10,
        marginRight: 10,
        paddingVertical: 10,
        borderRadius:15
    },
    Heading:{
        paddingBottom:15,
        textStyling: {
            fontFamily:'Apple SD Gothic Neo Bold',
            fontSize:15,
            textAlign: 'center',
            color: 'red'
        }
    },
    row:{
        flexDirection:'row',
        justifyContent: "space-around",

    },
    
})


export default SchemeView;