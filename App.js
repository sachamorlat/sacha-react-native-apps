import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import Loader from "./components/Loader";
import WeatherFetcher from "./components/WeatherFetcher";
import WeatherInfo from "./components/WeatherInfo";
import WeatherForecast from "./components/WeatherForecast";
import styles from "./components/styles";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  function chooseWeatherGif(weatherCode) {
    console.log(weatherCode);
    switch (weatherCode) {
      case "01d": // Clear sky (day)
        return require("./assets/clear.gif");
      case "01n": // Clear sky (night)
        return require("./assets/night.gif");
      case "02d": // Few clouds (day)
      case "02n": // Few clouds (night)
      case "03d": // Scattered clouds (day)
      case "03n": // Scattered clouds (night)
      case "04d": // Broken clouds (day)
      case "04n": // Broken clouds (night)
        return require("./assets/clouds.gif");
      case "09d": // Shower rain (day)
      case "09n": // Shower rain (night)
      case "10d": // Rain (day)
      case "10n": // Rain (night)
        return require("./assets/rain.gif");
      case "11d": // Thunderstorm (day)
      case "11n": // Thunderstorm (night)
        return require("./assets/thunderstorm.gif");
      case "13d": // Snow (day)
      case "13n": // Snow (night)
        return require("./assets/snow.gif");
      case "50d": // Mist(day)
      case "50n": // Mist (night)
        return require("./assets/mist.gif");
      default:
        return require("./assets/default.gif");
    }
  }

  return (
    <ImageBackground
      source={
        weatherData
          ? chooseWeatherGif(weatherData.currentWeatherData.weather[0].icon)
          : require("./assets/default.gif")
      }
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
    >
      <View style={styles.container}>
        {weatherData ? (
          <>
            <WeatherInfo currentWeatherData={weatherData.currentWeatherData} />
            <WeatherForecast forecastData={weatherData.forecastData.list} />
          </>
        ) : (
          <Loader />
        )}
      </View>
      <WeatherFetcher onWeatherData={handleWeatherData} />
    </ImageBackground>
  );
};

export default App;
