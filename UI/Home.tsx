import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";


const Home = ({navigation}) => {
    return (
        <View style={style.container}>
         <TouchableWithoutFeedback onPress={() => navigation.navigate('Portfolio Manager')}>
            <View style={style.component}><Text >Portfolio {"\n"}Manager</Text></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback  onPress={() => navigation.navigate('Summary')}>
        <View style={style.component}><Text>Summary</Text></View>
        </TouchableWithoutFeedback>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        marginHorizontal: 8,
        marginVertical: 6,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    component: {
        width: 150,
        height: 50,
        justifyContent:'center',
        marginHorizontal: 20,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        borderRadius: 40,
        backgroundColor: '#ebd67c',
    }
});

export default Home;