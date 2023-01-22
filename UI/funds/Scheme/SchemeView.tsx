import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Scheme } from "../../../Domain/Funds/Scheme";
import CurrencyText from "../../utils/CurrencyText";
import config from "../../config/Config"
import ToggleButton from "../../utils/ToggleButton";
import { getBounds } from "victory-core/lib/victory-util/selection";

type Props = {
    key: string
    scheme: Scheme
}

const SchemeView = ({scheme} : Props) => {

    const [marketValue, setMarketValue] = useState(scheme.marketValue)

    const getMarketValue = async ()=>{
        try {
            const response = await fetch(`http://${config.server.host}:${config.server.port}/schemes/${scheme.isin}/marketvalue`);
            const value :number = Number.parseFloat(await response.text());
            setMarketValue(value);
        }catch (error) {
            console.error(error)
        }
    }
    useEffect(()=> {
        getMarketValue();
    })

    const markSchemeStatus = async (state: boolean) : Promise<boolean> => {

        const options:RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const url = `http://${config.server.host}:${config.server.port}/schemes/${scheme.isin}?closeDate=${new Date().toISOString().slice(0,10)}`
        try {
            const response = await fetch(url, options);
            if (response.status == 200)
                return true;
            return false;
        } catch(e) {
            console.log("requert failed")
            console.error(e)
            return false;
        }
        
    }
    
    return (
        <View style={styles.container}>
            
            <View style={[styles.heading]}>
                <Text style={styles.textStyling}> {scheme.scheme} ({scheme.type})</Text> 
            </View>
            <View style={styles.toggle}>
                <ToggleButton onPress={markSchemeStatus} toggeState={scheme.schemeCloseDate?false:true}/>
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
    textStyling: {
        // fontFamily:'Apple SD Gothic Neo Bold',
        fontSize:15,
        textAlign: 'center',
        color: 'red'
    },
    heading:{
        flexDirection:'row',
        justifyContent: "space-between",

    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    row:{
        flexDirection:'row',
        justifyContent: "space-between",
        marginHorizontal:5

    },
    
})


export default SchemeView;