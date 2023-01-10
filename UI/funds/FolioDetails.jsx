import React, { useEffect, useState } from 'react';
import {ScrollView, Text,View,StyleSheet} from 'react-native';
import { Scheme } from '../../Domain/Funds/Scheme';
import SchemeView from "./Scheme/SchemeView"
type Props = {

    route: any,
    navigation: any,
    
};
 


const FolioDetails = ({route, navigation}): Props => {

    const {folioId} = route.params;

    const [schemes, setSchemes] = useState([]);




    const getSchemes = async (folioId: number): Scheme => {
        try {
            const response = await fetch(`http://192.168.1.5:8443/folios/${folioId}/schemes`);
            const schemes: [Scheme] = await response.json();
            setSchemes(schemes);
        }catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getSchemes(folioId)
    }, [])

    const renderSchemeView = (schemes: [Scheme]) => {
        if (schemes.length >0) {
            return schemes.map((scheme) => 
                <SchemeView key={scheme.isin} scheme={scheme} />
            )
            
        } else {
            return (
                <Text> Loading...</Text>
            )
        }
    };

    const getStatementEndDate = (schemes) => {
        return schemes.length> 0? schemes[0].statementEndDate:  '';
    }
    
    return (
        <ScrollView style={{backgroundColor:'#efefff'}}> 
            <View  style={styles.row}>
                <Text style={{color:'blue', fontFamily:'didot'}}> Statement Date</Text>
                <Text style={{color:'blue', fontFamily:'didot'}}> {getStatementEndDate(schemes)}</Text>
            </View>
            {renderSchemeView(schemes)}
        </ScrollView>
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

export default FolioDetails;