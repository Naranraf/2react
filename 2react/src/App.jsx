import React, { useState, useEffect } from "react";
import axios from "axios";
import "/App.css";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("Celsius");
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e341ebcf111a23ff95961d8055d77047&units=metric`
        )
          .then((response) => {
            setWeatherData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleUnitChange = () => {
    if (unit === "Celsius") {
      setUnit("Fahrenheit");
    } else {
      setUnit("Celsius");
    }
  };

  
  return (
    <div className={`weatherCard ${isNightMode ? "nightMode" : ""}`}>
      {weatherData ? (
        <>
          <div className="header">
            <h2>{weatherData.name}</h2>
            
          </div>
          <div >
            <img
              className="weatherIcon"
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              
              alt={weatherData.weather[0].description}
            />
            <div className="weatherInfo">
              <p className="weatherDescription">
                {weatherData.weather[0].description}
              </p>
              <p className="temperature">
                {unit === "Celsius"
                  ? `${Math.round(weatherData.main.temp)}°C`
                  : `${Math.round(
                      (weatherData.main.temp * 9) / 5 + 32
                    )}°F`}
              </p>
              <p className="humidity">
                Humidity:<br></br>{weatherData.main.humidity}%
              </p>
              <button className="unitBtn" onClick={handleUnitChange}>
              {unit}
            </button>
            </div>
            
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherApp;
