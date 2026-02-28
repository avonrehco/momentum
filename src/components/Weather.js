import React, { useState } from 'react'
import { BsGeoAlt } from "react-icons/bs";
import { GoKebabHorizontal } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineAim } from "react-icons/ai";

export default function Weather(props) {

  let [locationInput, setLocationInput] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  return (
    <div className='weather-box'>
        <div className='weather-header'>
          <div className='weather-city'>
            <img src={props.onGetWeatherIcon(props.weatherData.weather[0].icon)} className='weather-box-icon'/>
            <div>{props.weatherData.name} Weather</div>
          </div>
          <BsGeoAlt className='btn-geo' onClick={() => setLocationInput(true)}/>
          {locationInput && (
            <div className='location-input-container'>
              <div className='location-input'>
                <input type="text" autoComplete="off" placeholder="Type a location" value={searchQuery} onChange={handleLocationSearch}></input>
                <AiOutlineAim />
                <RxCross2 onClick={() => setLocationInput(false)}/>
              </div>
              {suggestions.length > 0 && (
                
              )}
            </div>
          )}
          <GoKebabHorizontal className="btn-menu"/>
        </div>
        <div className='weather-body'>
          <div className='weather-desc'>{props.weatherData.weather[0].description[0].toUpperCase() + props.weatherData.weather[0].description.slice(1)}</div>
          <div className='weather-main'>
            <div className='weather-temp'>
              <img src={props.onGetWeatherIcon(props.weatherData.weather[0].icon)} className='weather-box-icon'/>
              <div className='temp'>{Math.round(props.weatherData.main.temp)}°</div>
            </div>
            <ul>
              <li>
                <span>Feels like</span>
                <span>{Math.round(props.weatherData.main.feels_like)}°</span>
              </li>
              <li>
                <span>Humidity</span>
                <span>{props.weatherData.main.humidity}%</span>
              </li>
              <li>
                <span>Wind</span>
                <span>{Math.round(props.weatherData.wind.speed * 3.6)} km/h</span>
              </li>
            </ul>
          </div>
          <div className="weather-footer">
            <a onClick={() => window.open('https://openweathermap.org/', '_blank').focus()}>Current condition and 7-day forecast →</a>
            <div className='logo-openweather'>OpenWeather</div>
          </div>
        </div>
    </div>
  )
}
