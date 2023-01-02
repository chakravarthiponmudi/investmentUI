import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import FolioCard from "./FolioCard";

 const Folios = () => {

    const [data, setData] = useState([{id:1,folio:"111",amc:"123"}]);

    const getFolios = async () => {
        try {
            const response = await fetch('http://localhost:8443/folios/');
            const folios = await response.json();
            setData(folios)
        } catch(error) {
            console.error(error);
        } finally {
            console.log("Loaded or failed");
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
                    <FolioCard name={item.amc}/>
                )}/>
            
        </View>
    );

}

export default Folios;