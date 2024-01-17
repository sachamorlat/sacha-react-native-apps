import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {

    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const apiKey = 'e874cdfb8480b2da7baccdfe83fc03b6';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques:', error);
        setLoading(false);
      }
    };

    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission de localisation refusée');
          setLoading(false);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        fetchWeatherData(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error('Erreur lors de la récupération de la localisation:', error);
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);


  function chooseWeatherGif(weatherCode) {
    console.log(weatherCode);
    switch (weatherCode) {
      case '01d': // Clear sky (day)
        return require('./assets/sun.gif');
      case '01n': // Clear sky (night)
        return require('./assets/night.gif');
      case '02d': // Few clouds (day)
      case '02n': // Few clouds (night)
      case '03d': // Scattered clouds (day)
      case '03n': // Scattered clouds (night)
      case '04d': // Broken clouds (day)
      case '04n': // Broken clouds (night)
        return require('./assets/clouds.gif');
      case '09d': // Shower rain (day)
      case '09n': // Shower rain (night)
      case '10d': // Rain (day)
      case '10n': // Rain (night)
        return require('./assets/rain.gif');
      case '11d': // Thunderstorm (day)
      case '11n': // Thunderstorm (night)
        return require('./assets/thunderstorm.gif');
      case '13d': // Snow (day)
      case '13n': // Snow (night)
        return require('./assets/snow.gif');
      case '50d': // Mist(day)
      case '50n': // Mist (night)
        return require('./assets/mist.gif');
      default:
        return require('./assets/default.gif');
    }
  }


  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Chargement...</Text>
      ) : errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : weatherData ? (
        <>
          <ImageBackground
            source={chooseWeatherGif(weatherData.weather[0].icon)}
            style={{ width: 200, height: 200 }}
          />
          <Text>Ville: {weatherData.name}</Text>
          <Text>Température: {weatherData.main.temp} °C</Text>
          <Text>Temps: {weatherData.weather[0].description}</Text>
          <Text>Latitude: {weatherData.coord.lat}</Text>
          <Text>Longitude: {weatherData.coord.lon}</Text>
        </>
      ) : (
        <Text>Données météorologiques non disponibles</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // ou 'stretch' selon votre préférence
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});
