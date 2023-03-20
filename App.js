
// In App.js in a new project
import React, { useState, useEffect, useRef } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Animated, SafeAreaView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoliosView from './UI/funds/FoliosView';
import FolioDetails from "./UI/funds/FolioDetails";


const Stack = createNativeStackNavigator();

// const TestView = () => {

//   const animation = useRef(new Animated.Value(1));

//   const startAnimation = () => {
//     Animated.timing(animation.current,{
//       toValue:0,
//       duration:150,
//       useNativeDriver: false
//     }).start(()=>{

//       Animated.timing(animation.current,{
//         toValue:1,
//         duration:150,
//         useNativeDriver: false
//       }).start()
//     })
//   }

//   const animatedStyle = {
//     opacity : animation.current
//   }
//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback onPress={startAnimation}>
//         <View>
//           <Animated.View style={[styles.box, animatedStyle]}/>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
      
    
    
//   )
// }

export default function App() {


  const [spinnerVisible, isSpinnerVisible] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Portfolio Manager" component={FoliosView} />
        <Stack.Screen name="Folio" component={FolioDetails} />
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