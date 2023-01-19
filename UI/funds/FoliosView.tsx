import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,SafeAreaView, ScrollView } from 'react-native';
import FolioCard from "./FolioCard";
import FolioFooter from './FolioFooter';
import { Folio } from '../../Domain/Funds/Folio';
import { Scheme } from '../../Domain/Funds/Scheme';
import EquityDebtPie from '../domain/EquityDebtPie';
import config from "../config/Config"
import { PlotEquityData } from '../uiTypes';

const FoliosView = (props) => {

    const [data, setData] = useState(null);

    const [totalMarketValue, setTotalMarketValue] = useState(0);

    const [chartSeries, setChartSeries] = useState([]);

    const buildSchemeFromResponse = (resp) : [Scheme] => {
        return resp.map(({advisor,folio_id,isin,scheme,type,marketValue})=> {
            return new Scheme(type,advisor,isin,folio_id,scheme, marketValue);
        })
    }

    const getSchemes = async (folioId) => {
        try {
            
            const response = await fetch(`http://${config.server.host}:${config.server.port}/folios/${folioId}/schemes` );
            const jResponse = await response.json();
            const schemes: [Scheme] = buildSchemeFromResponse(jResponse);
            return schemes;
        } catch(error) {
            console.error(error);
        }
    }

    const getInvestmentAmount = async (folio: String) : Promise<number> => {
        try {
            const response = await fetch(`http://${config.server.host}:${config.server.port}/folios/investment?folio_no=${folio}` );
            return Number.parseFloat(await response.text());
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
            const response = await fetch(`http://${config.server.host}:${config.server.port}/folios/`);
            const folios: [Folio] = await response.json();
            for (let folio of folios) {
                const schemes = await getSchemes(folio.id);
                folio.schemes = schemes;
                folio.investmentAmount = await getInvestmentAmount(folio.folio)
            }
            
            setData(folios);
            getTotalMarketValue(folios);

        } catch(error) {
            console.error(error);
        } 
    }

    const getTotalMarketValue = async (folios : [Folio]) => {
        if (folios == null) {
             return 0;
        }
        let equityTotal = 0;
        let debtTotal=0;
        for (let folio of folios) {
            try {
                const response = await fetch(`http://${config.server.host}:${config.server.port}/folios/marketvalue?folio_no=${folio.folio}`);
                const amounts = await response.json();
                equityTotal += parseFloat(amounts.EQUITY);
                debtTotal += parseFloat(amounts.DEBT);
            }catch (error) {
                console.error("getTotalMarketValue" , error);
            }
        }
        setTotalMarketValue(equityTotal+debtTotal);
        const chartSeries : PlotEquityData[] = [
            {
                x: 'Equity',
                y: Math.round(equityTotal),
            },
            {
                x: 'Debt',
                y: Math.round(debtTotal),
            }
        ]

        setChartSeries(chartSeries)
    }

    useEffect(()=> {
        getFolios();
    }, [])

    const folioDetailsRoute = (folioId) => {
        props.navigation.navigate("Folio", folioId)
    }
      

    const getFolioCards = (folio : Folio) => {
        return <FolioCard key={folio.id} 
            name={folio.amc}
            routerFunction={folioDetailsRoute}
            investmentAmount = {folio.investmentAmount}
            schemes={folio.schemes}
            folioId={folio.id}
            folioName={folio.folio}
        />
    }
    

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.header}><Text style={styles.headerText}>Investment Profile</Text></View>
            <EquityDebtPie data={chartSeries}/>
            <View>
                {data == null ? '' : data.map((folio)=>getFolioCards(folio))}
                <FolioFooter totalMarketValue={Math.round(totalMarketValue)}/>
            </View>
            
        </ScrollView>
        
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