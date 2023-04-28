
// Definiamo i dati dei punti come un array di oggetti
// NOTA: gli attributi: distance, driveDuration, cestinato, startingAddr, destinationAddr  saranno usati 
// per contenere delle informazioni che andranno ad essere inserite dal programma.

const locations = [
  {
    location: 'DAMMI UN CINQUE',
    description: 'VIA BARLETTA 109 INT. 19/A'+'\n'+
    '10100 TORINO'+'\n'+'DAL MARTEDI ALLA DOMENICA DALLE ORE 15.00 ALLE 19.00',
    coordinates: { lat: 45.049196, lng: 7.635916 },
    distance: 1.0,
    driveDuration: 1.0,
    startingAddr: '',
    destinationAddr: 'Via Barletta, 109 INT. 19/A, 10136 Torino TO',
      },
  {
    location: 'GRUPPO ORMA',
    description: 'VIA CHIVASSO 37'+'\n'+
    '10080 - SAN BENIGNO CANAVESE'+'\n'+'PRIMO E TERZO SABATO DI OGNI MESE'+'\n'+
    'DALLE ORE 09.00 ALLE ORE 12.00',
    coordinates: { lat: 45.221699, lng: 7.788591 },
    distance: '2',
    driveDuration: '2',
    startingAddr: '',
    destinationAddr: 'Via Chivasso, 37, 10080 San Benigno Canavese TO',
  }];
export default locations;
