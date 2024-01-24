import React, { useState, useEffect } from 'react';
import { Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import Loader from './Loader';
import WeatherCard from './WeatherCard';
import styles from './styles';


const App = () =>  {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'e874cdfb8480b2da7baccdfe83fc03b6';
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permission de localisation refusée');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        // Fetch current weather
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();
        setCurrentWeather(currentWeatherData);

        // Fetch forecast data
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData.list);

        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques:', error);
        setLoading(false);
      }
    };

    fetchData();
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
    <ImageBackground
      source={require('./assets/background.jpg')} 
      style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
    >
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : errorMsg ? (
          <Text>{errorMsg}</Text>
        ) : currentWeather && forecastData ? (
          <>
            <Image
              // source={chooseWeatherGif(weatherData.weather[0].icon)}
              source={{
                uri: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`,
              }}
              style={styles.weatherIcon}
            />
              <Text style={styles.weatherDataText}>
                Ville: {currentWeather.name}
              </Text>
              <Text style={styles.weatherDataText}>
                Température: {currentWeather.main.temp} °C
                </Text>
              <Text style={styles.weatherDataText}>
                Temps: {currentWeather.weather[0].description}
              </Text>
              <Text style={styles.weatherDataText}>
                Latitude: {currentWeather.coord.lat}
              </Text>
              <Text style={styles.weatherDataText}>
                Longitude: {currentWeather.coord.lon}
              </Text>

            {/* Afficher les prévisions sur 5 jours */}
            <ScrollView style={styles.scrollView}>
            {forecastData.reduce((uniqueForecasts, forecast) => {
              const date = forecast.dt_txt.split(' ')[0];
              if (!uniqueForecasts.find((item) => item.date === date)) {
                uniqueForecasts.push({ date, forecast });
              }
              return uniqueForecasts;
            }, []).map((item, index) => (
              <WeatherCard
              key={index}
              date={item.date}
              temperature={item.forecast.main.temp}
              weatherIcon={{
                uri: `http://openweathermap.org/img/wn/${item.forecast.weather[0].icon}.png`,
              }}
            />
            ))}
            </ScrollView>
          </>
        ) : (
          <Text>Données météorologiques non disponibles</Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default App;