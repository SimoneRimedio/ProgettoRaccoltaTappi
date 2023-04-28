// Definiamo i dati dei punti come un array di oggetti
// NOTA: gli attributi: distance, driveDuration, startingAddr, destinationAddr  saranno usati 
// per contenere delle informazioni che andranno ad essere inserite dal programma.

// Importiamo i componenti necessari
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons'; // per poter usare le icons
import * as Location from 'expo-location'; // per accedere ai dati del GPS
import CARD from './components/CARD';
import locations from './assets/puntiDraccolta'; // i dati dei centri di raccolta

// Definiamo il componente principale che mostra la lista dei punti di raccolta
export default function App() {
  const [centriRaccolta, setCentriRaccolta] = useState([...locations]); // la lista dei centri di raccolta
  const [location, setLocation] = useState(null); // posizione attuale utente
  const [errorMsg, setErrorMsg] = useState(null);

  // testo da mostrare sulla parte dello schermo in alto
  let text = useRef('GPS: Connecting...');

  //accede al GPS per trovare la posizione attuale dell'utente
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('USE EFFECT');

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    const loc = await Location.getCurrentPositionAsync();
    console.log(loc);
    setLocation(loc);
    setTimeout(getLocation, 10000); // richiamo in modo recursivo la funzione stessa ogni 10 sec.
  };

  useEffect(() => {
    // il seguente codice viene eseguito una sola volta all'avvio dell'APP
    setTimeout(getLocation, 1000);
  }, []);

  const THRESHOLD = 0.1; // Set your threshold value here

  const sortCentriRaccolta = () => {
    const newCentriRaccolta = [...centriRaccolta];
    newCentriRaccolta.sort((a, b) => {
      if (Math.abs(a.distance - b.distance) < THRESHOLD) {
        return a.location.localeCompare(b.location); // Sort alphabetically
      }
      return a.distance < b.distance ? -1 : 1; // Sort by distance
    });
    setCentriRaccolta(newCentriRaccolta);
  };

  useEffect(() => {
    if (location) {
      //inutile eseguire il seguente codice nel caso GPS non abbia ancora acquisito la posizione dell'utente

      // ricava la stringa con le coordinate della posizione dell'utente
      const latitude  = JSON.stringify(location.coords.latitude)
      const longitude = JSON.stringify(location.coords.longitude)
      const start = latitude + ',' + longitude;

      // segnala che il GPS è stato agganciato e stampa le nuove coordinate della posizione dell'utente
      text.current = 'GPS connected (your location): latitude: ' + latitude + ' longitude: ' + longitude;

      // Aggiorniamo i dati relativi alla posizione dell'utente per ognuna dei centri di raccolta
      const newCentriRaccolta = [...centriRaccolta]; // shallow copy della lista che andremo ad aggiornare
      newCentriRaccolta.map((centro, index) => {
        // il ciclo che viene eseguito per ogni punto di raccolta nella lista

        // ricava la stringa con le coordinate del punto di raccolta
        end = centro.coordinates.lat + ',' + centro.coordinates.lng;

        // accedo alle API di Google Maps per ricavare la distanza e tempo di percorrenza
        const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${start}&destinations=${end}&key=AIzaSyB5Pqu48PquPp9lAb6Upxn8jVku0lORJVY`;

        fetch(URL) // eseguo l'accesso alle API
          .then((response) => response.json()) // ricevo la risposta in formato JSON e lo converto in oggetto
          .then((data) => {
            // data contiene l'oggetto derivato dalla risposta di Google Maps
            if (data.rows.length > 0) {
              newCentriRaccolta[index].driveDuration = //inserisco il tempo di percorrenza in macchina
                data.rows[0].elements[0].duration.text;
              newCentriRaccolta[index].startingAddr = data.origin_addresses[0]; // memorizzo l'indirizzo della posizione attuale dell'utente
              newCentriRaccolta[index].distance =
                data.rows[0].elements[0].distance.text; //inserisco la distanza di percorrenza in macchina
              // newCentriRaccolta[index].destinationAddr =  data.destination_addresses[0]; // memorizzo l'indirizzo del centro di raccolta
            }
          })
          .catch((error) => console.error(error));
      });
      setCentriRaccolta(newCentriRaccolta); // Aggiorno la lista
      sortCentriRaccolta(); // ordino la lista dei punti di raccolta dal più vicino al più lontano
    }
  }, [location]);

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.paragraph}>J.C.Maxwell</Text>
        </View>
        <View>
          <Text style={styles.paragraph}>{text.current}</Text>
        </View>
      {centriRaccolta.map((centro, index) => (
        <CARD key={index} cardData={centro} />
      ))}
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },

  paragraph: {
    color: 'white',
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    //textAlign: 'left',
  },
});
