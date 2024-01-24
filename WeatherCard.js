import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import styles from './styles';

const WeatherCard = ({ date, temperature, weatherIcon }) => (
  <View style={styles.weatherCard}>
    <Text>Date: {date}</Text>
    <ImageBackground source={weatherIcon} style={{ width: 50, height: 50 }} />
    <Text>Température: {temperature} °C</Text>
  </View>
);

export default WeatherCard;
