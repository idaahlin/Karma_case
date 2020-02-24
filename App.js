import React from 'react';
import { StyleSheet, View } from 'react-native';
import Locations from './src/components/Locations';

export default function App() {
  return (
    <View style={styles.container}>
      <Locations></Locations>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
  },
});
