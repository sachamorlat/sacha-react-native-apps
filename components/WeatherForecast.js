import React from "react";
import { ScrollView } from "react-native";
import WeatherCard from "./WeatherCard";
import { format } from "date-fns";

const WeatherForecast = ({ forecastData }) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Date actuelle

  return (
    <ScrollView horizontal>
      {forecastData
        .reduce((uniqueForecasts, forecast) => {
          const date = format(forecast.dt_txt.split(" ")[0], "dd.MM.yyyy"); // Format Date 
          if (
            date !== currentDate &&
            !uniqueForecasts.find((item) => item.date === date)
          ) {
            uniqueForecasts.push({ 
              date, 
              forecast,
              temperature: forecast.main.temp,               
              minTemperature: forecast.main.temp_min,
              maxTemperature: forecast.main.temp_max,
              weatherDescription: forecast.weather[0].description.charAt(0).toUpperCase() + forecast.weather[0].description.slice(1) // Mettre une Majuscule
            });
          }
          return uniqueForecasts;
        }, [])
        .map((item, index) => (
          <WeatherCard
            key={index}
            date={item.date}
            temperature={Math.round(item.temperature)}
            minTemperature={Math.round(item.minTemperature)}
            maxTemperature={Math.round(item.maxTemperature)}
            weatherDescription={item.weatherDescription}
            weatherIcon={{
              uri: `http://openweathermap.org/img/wn/${item.forecast.weather[0].icon}.png`,
            }}
          />
        ))}
    </ScrollView>
  );
};

export default WeatherForecast;
