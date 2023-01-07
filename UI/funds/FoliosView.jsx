import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Button,SafeAreaView } from 'react-native';
import FolioCard from "./FolioCard";
import { Folio } from '../../Domain/Funds/Folio';
import { Scheme } from '../../Domain/Funds/Scheme';


const FoliosView = (props) => {

    const [data, setData] = useState(null);

    const buildSchemeFromResponse = (resp) : [schemes] => {
        return resp.map(({advisor,folio_id,isin,scheme,type,marketValue})=> {
            return new Scheme(type,advisor,isin,folio_id,scheme, marketValue);
        })
    }

    const getSchemes = async (folioId) => {
        try {
            const response = await fetch(`http://192.168.1.9:8443/folios/schemes/${folioId}` );
            const jResponse = await response.json();
            const schemes: [Scheme] = buildSchemeFromResponse(jResponse);
            return schemes;
        } catch(error) {
            console.error(error);
        }
    }

    const getInvestmentAmount = async (folio: String) => {
        try {
            const response = await fetch(`http://192.168.1.9:8443/folios/investment?folio_no=${folio}` );
            return await response.text();
        } catch(error) {
            console.error(error);
        }
    }

    const getFolioMarketValue = (folio : Folio) : number => {
        if (folio.schemes) {
            return folio.schemes.reduce((accumulator: number, scheme: Scheme) =>{
                return accumulator + scheme.marketValue;
            }, 0)    
        } else {
            return 0;
        }
        
        
    }

    const getFolios = async () => {
        try {
            const response = await fetch('http://192.168.1.9:8443/folios/');
            const folios: [Folio] = await response.json();
            for (let folio of folios) {
                const schemes = await getSchemes(folio.id);
                folio.schemes = schemes;
                getFolioMarketValue(folio);
                folio.investmentAmount = await getInvestmentAmount(folio.folio)
            }
            
            setData(folios);

        } catch(error) {
            console.error(error);
        } 
    }

    const getTotalInvestment = (folios : [Folio]) => {
        return folios.reduce((accumulator, folio)=>{
            return accumulator + getFolioMarketValue(folio);
        },0)
    }

    useEffect(()=> {
        getFolios();
    }, [])

      
    

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item})=> (
                <FolioCard name={item.amc} investmentAmount = {item.investmentAmount} schemes={item.schemes} marketValue={getFolioMarketValue(item)}/>
            )}
            initialNumToRender={1}
            ListHeaderComponent={<Text style={styles.header}>Investment Profile</Text>}
            ListFooterComponent={<Button style={{flex:1, paddingTop:'135em%'}} title="Total Investment"   onPress={() => alert(getTotalInvestment(data))}/>}
        />
    );

        

}

const styles = StyleSheet.create({
    header: {
        flex:1,
        fontSize:20,
        textAlign:'center',
        justifyContent: 'flex-end',
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 5,
        backgroundColor: '#ffa069'
        
    },
  });


export default FoliosView;