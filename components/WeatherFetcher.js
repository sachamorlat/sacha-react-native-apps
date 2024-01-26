import { useEffect } from "react";
import * as Location from "expo-location";

const WeatherFetcher = ({ onWeatherData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "e874cdfb8480b2da7baccdfe83fc03b6";
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission de localisation refusée");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const units = "metric";
        const language = "fr";

        // Fetch current weather
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lang=${language}&units=${units}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch forecast data
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lang=${language}&units=${units}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        onWeatherData({ currentWeatherData, forecastData });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données météorologiques:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return null;
};

export default WeatherFetcher;
