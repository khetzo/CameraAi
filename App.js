// CameraGpt/src/App.js
import React from 'react';
import { registerRootComponent } from 'expo';
import HomePage from './Screens/HomePage';
export default function App() {
  return <HomePage />;
}

registerRootComponent(App);
