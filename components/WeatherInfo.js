import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";

const WeatherInfo = ({ currentWeatherData }) => {
  const temperature = Math.round(currentWeatherData.main.temp); // Arrondi à l'entier le plus proche
  let weatherDescription = currentWeatherData.weather[0].description;
  weatherDescription =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1); // Pour ajouter une majuscule

  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.weatherDataLocation}>{currentWeatherData.name}</Text>
      <Image
        source={{
          uri: `http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}.png`,
        }}
        style={styles.weatherIcon}
      />
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.weatherDescription}>{weatherDescription}</Text>
    </View>
  );
};

export default WeatherInfo;
