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
    const [searchQuery, setSearchQuery] = useState('')
    const API_KEY = 'fc74f7b6ab54d7a3876e72eb79562449'

    let [weatherOpen, setWeatherOpen] = useState(false)

    const handleLocationSearch = async (e) => {
        const query = e.target.value
        setSearchQuery(query)

        if(query.length > 3) {
            try {
            const response = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${props.API_KEY}`
            )

            const data = await response.json()
            setSuggestions(data)
            } catch (error) {
            console.error('Error fetching locations:', error)
            }
        } else {
            setSuggestions([])
        } 
    }

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
                    <Weather className = 'weather-widget' onGetWeatherIcon = {getWeatherIcon} weatherData = {weatherData}/>
                )} 
            </ClickOutside>
        </header>
    )
}
