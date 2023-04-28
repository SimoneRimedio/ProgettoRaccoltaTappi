import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import * as Linking from 'expo-linking';

const DriveDirectionButton = ({ style, startAddress, endAddress }) => {
  const openMap = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startAddress}&destination=${endAddress}&travelmode=driving`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={openMap}>
      <Image style={style}
        source={require('../assets/googleMaps.png')}
      />
    </TouchableOpacity>
  );
};

export default DriveDirectionButton;