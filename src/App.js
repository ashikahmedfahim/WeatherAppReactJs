import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("Dhaka");

  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${search}`)
    .then((data)=>{
      setWeatherData(data.data);
      console.log(data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[search]);

  const inputFunction = (e) => {
    setInput(e.target.value);
  };

  const searchFunction = () => {
    setSearch(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearch(input);
    }
  };

  return(
    <div>
      { weatherData && (
        <div>
          <input type="text" onChange={inputFunction} onKeyDown={handleKeyDown}/>
          <button onClick={searchFunction}>Search</button>
          <h1>Country: {weatherData.location.country}</h1>
          <h1>City: {weatherData.location.name}</h1>
          <h1>Local Time: {weatherData.location.localtime}</h1>
          <h1>{weatherData.current.is_day ? "Day" : "Night"}</h1>
          <h1>Cloud: {weatherData.current.cloud}</h1>
          <img src={weatherData.current.condition.icon} alt=""/>
          <h1>Condition: {weatherData.current.condition.text}</h1>
          <h1>Feels Like: {weatherData.current.feelslike_c}C</h1>
          <h1>Humidity: {weatherData.current.humidity}</h1>
          <h1>Last Updated: {weatherData.current.last_updated}</h1>
          <h1>Visibility: {weatherData.current.vis_km}km</h1>
          <h1>Wind Angle: {weatherData.current.wind_degree}</h1>
          <h1>Wind Direction: {weatherData.current.wind_dir}</h1>
          <h1>Wind Speed: {weatherData.current.wind_kph}</h1>
          Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
          <a href="https://www.weatherapi.com/" title="Free Weather API">
          <img src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png" alt="Weather data by WeatherAPI.com"/>
          </a>
        </div>
      )} 
    </div>
  );
}

export default App;
