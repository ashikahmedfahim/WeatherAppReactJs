import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("Dhaka");

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${search}`
      )
      .then((data) => {
        setWeatherData(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  const inputFunction = (e) => {
    setInput(e.target.value);
  };

  const searchFunction = () => {
    setSearch(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(input);
    }
  };

  return (
    <div className="">
      {weatherData && (
        <div>
            <div className="mb-5 mt-5">
              <p className="display-1 text-center text-primary">Weather App</p>
            </div>
            <div className="d-flex justify-content-around">
              <div className="mb-5 form-inline">
                <input
                  type="text"
                  onChange={inputFunction}
                  onKeyDown={handleKeyDown}
                  placeholder="Search"
                  className="form-control mr-2 text-primary"
                />
                <button
                  onClick={searchFunction}
                  className="btn btn-primary form-control"
                >
                  Search
                </button>
              </div>
            </div>
          <div className="bg-primary text-white text-center">
            <div className="container p-5 lead">
              <p className="display-4 text-center p-3">
                Currently Showing {weatherData.location.name}, {weatherData.location.country}
              </p>
              <p>Local Time: {weatherData.location.localtime}</p>
              <p>{weatherData.current.is_day ? "Day" : "Night"}</p>
              <p>Cloud: {weatherData.current.cloud}</p>
              <img src={weatherData.current.condition.icon} alt="" />
              <p>Condition: {weatherData.current.condition.text}</p>
              <p>Feels Like: {weatherData.current.feelslike_c}C</p>
              <p>Humidity: {weatherData.current.humidity}</p>
              <p>Last Updated: {weatherData.current.last_updated}</p>
              <p>Visibility: {weatherData.current.vis_km}km</p>
              <p>Wind Angle: {weatherData.current.wind_degree}</p>
              <p>Wind Direction: {weatherData.current.wind_dir}</p>
              <p>Wind Speed: {weatherData.current.wind_kph}</p>
            </div>
          </div>
          <div className="m-5 text-center">
            Powered by{" "}
            <a href="https://www.weatherapi.com/" title="Weather API">
              WeatherAPI.com
            </a>
            <a href="https://www.weatherapi.com/" title="Free Weather API">
              <img
                src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
                alt="Weather data by WeatherAPI.com"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
