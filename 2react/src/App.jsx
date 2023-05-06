import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./App.css"

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); // Nuevo estado para mantener la unidad de medida actual

  console.log(longitude , latitude)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(2));
        setLongitude(position.coords.longitude.toFixed(2));
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      axios(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e341ebcf111a23ff95961d8055d77047`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [latitude, longitude]);

  const handleClick = () => {
    setIsCelsius(!isCelsius);
  }

  return (
    <div className="weatherCard">
      {weatherData ? (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon"/>
          <p>{weatherData.weather[0].description}</p>
          <p>{isCelsius ? `${weatherData.main.temp} °C` : `${(weatherData.main.temp * 9 / 5 + 32).toFixed(2)} °F`}</p> {/* Usamos el estado isCelsius para mostrar la temperatura en Celsius o Fahrenheit */}
          <button onClick={handleClick}>Change to {isCelsius ? 'Fahrenheit' : 'Celsius'}</button> {/* Agregamos un botón para cambiar la unidad de medida */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherApp;
