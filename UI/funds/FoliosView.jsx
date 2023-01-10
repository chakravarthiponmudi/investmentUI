import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Button,SafeAreaView } from 'react-native';
import FolioCard from "./FolioCard";
import FolioFooter from './FolioFooter';
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
            const response = await fetch(`http://192.168.1.5:8443/folios/${folioId}/schemes` );
            const jResponse = await response.json();
            const schemes: [Scheme] = buildSchemeFromResponse(jResponse);
            return schemes;
        } catch(error) {
            console.error(error);
        }
    }

    const getInvestmentAmount = async (folio: String) => {
        try {
            const response = await fetch(`http://192.168.1.5:8443/folios/investment?folio_no=${folio}` );
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
            const response = await fetch('http://192.168.1.5:8443/folios/');
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
        if (folios == null) {
             return 0;
        }
        let amount: number = folios.reduce((accumulator, folio)=>{
            return accumulator + getFolioMarketValue(folio);
        },0)

        return Math.round(amount);
    }

    useEffect(()=> {
        getFolios();
    }, [])

    const folioDetailsRoute = (folioId) => {
        props.navigation.navigate("Folio", folioId)
    }
      
    

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item})=> (
                <FolioCard name={item.amc}
                    routerFunction={folioDetailsRoute}
                    investmentAmount = {item.investmentAmount}
                    schemes={item.schemes}
                    marketValue={getFolioMarketValue(item)}
                    folioId={item.id}
                />
            )}
            initialNumToRender={1}
            ListHeaderComponent={<View style={styles.header}><Text style={styles.headerText}>Investment Profile</Text></View>}
            ListFooterComponent={<FolioFooter totalInvestment={getTotalInvestment(data)}/>}
        />
    );

        

}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 8,
        marginVertical: 6,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffa069',
        borderRadius: 10
    },
    headerText: {
        textAlign: 'justify',
        // fontWeight: 'bold',
        fontSize: 28
    }

  });


export default FoliosView;