import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const WeatherCard = ({
  date,
  temperature,
  minTemperature,
  maxTemperature,
  weatherIcon,
  weatherDescription,
}) => (
  <View style={styles.weatherCard}>
    <Text style={styles.date}>Prévisions pour le: {date}</Text>
    <Image source={weatherIcon} style={styles.weatherIcon} />
    <Text style={styles.temperature}>{temperature}°C</Text>
    <Text>Min: {minTemperature}°C, Max: {maxTemperature}°C</Text>
    <Text style={styles.weatherDescription}>{weatherDescription}</Text>
  </View>
);

export default WeatherCard;
