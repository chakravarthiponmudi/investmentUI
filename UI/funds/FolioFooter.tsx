import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CurrencyText from '../utils/CurrencyText';
type Props =  {
    totalMarketValue : number,
}
const FolioFooter = ({totalMarketValue}: Props) => {
    return (
        <View style = {styles.container}>
            <Text style={styles.label}>Total Market Value</Text>
            <CurrencyText style={styles.content} currencyCode={"INR"} amount={totalMarketValue}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginVertical: 6,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffa069',
        borderRadius: 10
    },
    label: {
        textAlign: 'justify',
        // fontWeight: 'bold',
        fontSize: 24
    },
    content: {
        textAlign: 'justify',
        // fontWeight: 'bold',
        fontSize: 24
    }

})
export default FolioFooter;