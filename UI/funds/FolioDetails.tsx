import React, { useEffect, useState } from 'react';
import {ScrollView, Text,View,StyleSheet} from 'react-native';
import { Scheme } from '../../Domain/Funds/Scheme';
import SchemeView from "./Scheme/SchemeView"
import config from "../config/Config";

type Props = {

    route: any,
    navigation: any,
    
};
 


const FolioDetails = ({route, navigation} :Props) => {

    const {folioId} = route.params;

    const [schemes, setSchemes] = useState<Scheme[]>([]);

    const getSchemes = async (folioId: number): Promise<void> => {
        try {
            const response = await fetch(`http://${config.server.host}:${config.server.port}/folios/${folioId}/schemes`);
            const schemes: [Scheme] = await response.json();
            setSchemes(schemes);
        }catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getSchemes(folioId)
    }, [])

    const renderSchemeView = (schemes: Scheme[]) => {
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
        <ScrollView style={styles.container}> 
            <View  style={styles.row}>
                <Text style={styles.pageHeader}> Statement Date</Text>
                <Text style={styles.pageHeader}> {getStatementEndDate(schemes)}</Text>
            </View>
            {renderSchemeView(schemes)}
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a8d69a',
    },
    pageHeader:{
        color:'#a14a74',
        // fontFamily:'American Typewriter Semibold'
    },
    row:{
        flexDirection:'row',
        justifyContent: "space-between",
        marginHorizontal: 90

    },
    
})

export default FolioDetails;