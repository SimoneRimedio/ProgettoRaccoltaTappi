import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DriveDirectionButton from './DriveDirectionButton';

const CARD = ({ cardData }) => {
const [mini, setMini] = useState(true);  // mostrare la scheda espansa o mini

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text>{cardData.distance}</Text>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text>{cardData.location}</Text>
        </View>
        <Text>{cardData.driveDuration}</Text>
        <TouchableOpacity
          onPress={() => {
            setMini(!mini);
          }}>
          {(!mini && (
            <MaterialIcons name="remove" size={24} color="#333" />
          )) || <MaterialIcons name="menu" size={24} color="#333" />}
        </TouchableOpacity>
      </View>
      {!mini && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DriveDirectionButton
            style = {styles.logo}
            startAddress = {cardData.startingAddr}
            endAddress = {cardData.destinationAddr}
          />
          <Text style={styles.paragraph}>{cardData.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    //alignItems: 'center',
    marginTop: 3,
    opacity: 0.7,
  },
  header: {
    //flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    //borderWidth: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    //position: 'absolute',
    marginBottom: 10,
  },
  logo: {
    height: 36,
    width: 36,
    marginRight: 10,
    marginLeft: 10,
  },
});
export default CARD;