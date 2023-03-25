
// In App.js in a new project
import React, { useState, useEffect, useRef } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Animated, SafeAreaView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoliosView from './UI/funds/FoliosView';
import FolioDetails from "./UI/funds/FolioDetails";
import TransactionView from './UI/funds/TransactionView';
import Summary from './UI/funds/report/Summary';


const Stack = createNativeStackNavigator();


export default function App() {


  const [spinnerVisible, isSpinnerVisible] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Portfolio Manager" component={FoliosView} />
        <Stack.Screen name="Folio" component={FolioDetails} />
        <Stack.Screen name="TransactionView" component={TransactionView} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  box: {
    width:200,
    height:200,
    backgroundColor: 'tomato',
  }
})