import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
    const [weatherData, setWeatherData] = useState()

    useEffect(() => {
        
        const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY
        
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${weatherAPIKey}`)
            .then((response => setWeatherData(response.data)))

        }, [country])

    console.log(weatherData)

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img style={{maxWidth: '300px'}} src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
            
            {weatherData && 
                <div>
                    <h2>Weather in {country.capital[0]}</h2>
                    <div>temperature {(parseFloat(weatherData.main.temp) - 273.15).toFixed(2)} Celsius</div>
                    <img 
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={`${weatherData.weather[0].description} icon`}/>
                    <div>wind {weatherData.wind.speed} m/s</div>
                </div>
            }
        </div>
    )
}

export default CountryDetails