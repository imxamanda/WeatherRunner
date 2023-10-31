import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Localizacao from './src/components/Localizacao';
import Router from './src/routes/Router';

export default function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}


