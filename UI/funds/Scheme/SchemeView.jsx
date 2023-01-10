import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Scheme } from "../../../Domain/Funds/Scheme";


type Props = {
    scheme: Scheme
}

const SchemeView = ({scheme}) : Props => {
    
    return (
        <View style={styles.container}>
            
            <View style={[styles.row, styles.Heading]}>
                <Text style={styles.Heading.textStyling}> {scheme.scheme} ({scheme.type})</Text>    
            </View>
            <View  style={styles.row}>
                <Text> Total Nav</Text>
                <Text> {scheme.close}</Text>
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
        borderRadius:15
    },
    Heading:{
        paddingBottom:15,
        textStyling: {
            fontFamily:'Galvji',
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