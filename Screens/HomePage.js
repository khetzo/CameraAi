// CameraGpt/src/screens/HomePage.js
import React, { useState, useEffect, useRef } from 'react';

import {Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';


function HomeScreen() {

    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
      // Camera permissions are still loading.
      return  <Text style={{ textAlign: 'center' }}>Camera permissions are still loading.</Text>
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>Camera permissions are not granted yet</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
    if(permission.granted) {
        console.log("Camera permissions are grandted")
        // Camera permissions are still loading.
        function toggleCameraFacing() {
          console.log(`Curren facing value is: ${facing}`);
       
        setFacing(current => (current === 'back' ? 'front' : 'back'));
          console.log('toggleFacing calffled');
          }
        
          return (
           
            <View style={styles.container}>
            
              <CameraView style={styles.camera} type={facing}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
              
            </View>
           
          );
      } 
  
    
}

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>Search Page</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomePage() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });
