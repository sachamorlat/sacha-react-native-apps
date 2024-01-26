import React from "react";
import { ScrollView } from "react-native";
import WeatherCard from "./WeatherCard";

const WeatherForecast = ({ forecastData }) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Date actuelle

  return (
    <ScrollView horizontal>
      {forecastData
        .reduce((uniqueForecasts, forecast) => {
          const date = forecast.dt_txt.split(" ")[0];
          if (
            date !== currentDate &&
            !uniqueForecasts.find((item) => item.date === date)
          ) {
            uniqueForecasts.push({ date, forecast });
          }
          return uniqueForecasts;
        }, [])
        .map((item, index) => (
          <WeatherCard
            key={index}
            date={item.date}
            temperature={Math.round(item.forecast.main.temp)}
            weatherDescription={item.forecast.weather[0].description}
            weatherIcon={{
              uri: `http://openweathermap.org/img/wn/${item.forecast.weather[0].icon}.png`,
            }}
          />
        ))}
    </ScrollView>
  );
};

export default WeatherForecast;
