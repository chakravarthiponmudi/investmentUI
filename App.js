
// In App.js in a new project
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoliosView from './UI/funds/FoliosView';

const Stack = createNativeStackNavigator();

export default function App() {


  const [spinnerVisible, isSpinnerVisible] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Portfolio Manager" component={FoliosView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


