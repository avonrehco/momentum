import React, { useEffect, useState } from 'react'
import { TbClockCog } from "react-icons/tb";
import Weather from './Weather';
import ClickOutside from './ClickOutside';


export default function Header() {

    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [location, setLocation] = useState({lat: null, lon: null})
    const [cityName, setCityName] = useState('')
    let [weatherOpen, setWeatherOpen] = useState(false)
    
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

    useEffect(() => {
        if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            })
            },
            (error) => {
            setError('Failed to get geolocation. Please allow location access.')
            setLoading(false)
            }
        )
        } else {
        setError('Geolocation is not supported by your browser')
        }
    }, [])

    useEffect(() => {
        if(location.lat && location.lon) {
        fetchWeather()
        }
    }, [location])

    const fetchWeather = async () => {
        try {
        setLoading(true)
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=en`
        )

        if(!response.ok) {
            throw new Error('Error fetching weather data')
        }

        const data = await response.json()
        setWeatherData(data)
        setCityName(data.name)
        setError(null)
        } catch (err) {
        setError(err.message)
        } finally {
        setLoading(false)
        }
    }

    const getWeatherIcon = (iconCode) => {
        return `https://openweathermap.org/payload/api/media/file/${iconCode}.png`
    }

    if(loading) {
        return <div className='weather-loading'>Loading weather</div>
    }

    if(error) {
        return <div className='weather-error'>{error}</div>
    }

    if(!weatherData){
        return null
    }
    
    return (
        <header>
            <div className='focus'>
                <TbClockCog className='nav-icon'/>
                <div>Focus</div>
            </div>
            <ClickOutside onClickOutside={() => setWeatherOpen(false)}>
                <div className='weather-icon' onClick={() => setWeatherOpen(!weatherOpen)}>
                    <div className='degrees-icon'>
                        <img src={getWeatherIcon(weatherData.weather[0].icon)}/>
                        <div className='degrees'>{Math.round(weatherData.main.temp)}°</div>
                    </div>
                    <div className='city'>{cityName}</div>
                </div>
                {weatherOpen && (
                    <Weather API_KEY = {API_KEY} className = 'weather-widget' onGetWeatherIcon = {getWeatherIcon} weatherData = {weatherData}/>
                )} 
            </ClickOutside>
        </header>
    )
}
