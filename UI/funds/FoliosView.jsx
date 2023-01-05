import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import FolioCard from "./FolioCard";
import { Folio } from '../../Domain/Funds/Folio';
import { Scheme } from '../../Domain/Funds/Scheme';


 const FoliosView = () => {

    const [data, setData] = useState([{id:1,folio:"111",amc:"123"}]);

    const buildSchemeFromResponse = (resp) : [schemes] => {
        return resp.map(({advisor,folio_id,isin,scheme,type,marketValue})=> {
            return new Scheme(type,advisor,isin,folio_id,scheme, marketValue);
        })
    }

    const getSchemes = async (folioId) => {
        try {
            const response = await fetch(`http://localhost:8443/folios/schemes/${folioId}` );
            const jResponse = await response.json();
            const schemes: [Scheme] = buildSchemeFromResponse(jResponse);
            return schemes;
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
            const response = await fetch('http://localhost:8443/folios/');
            const folios: [Folio] = await response.json();
            for (let folio of folios) {
                const schemes = await getSchemes(folio.id);
                folio.schemes = schemes;
                getFolioMarketValue(folio);
            }
            
            setData(folios);

        } catch(error) {
            console.error(error);
        } 
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    useEffect(()=> {
        getFolios();
    }, [])

      
    return (
        <View >
            <Text style={{fontSize:20, textAlign:'center', paddingTop:'2em%', paddingBottom:'5em%'}}> FOLIOS</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item})=> (
                    <FolioCard name={item.amc} schemes={item.schemes} marketValue={getFolioMarketValue(item)}/>
                )}/>
            
        </View>
    );

}

export default FoliosView;