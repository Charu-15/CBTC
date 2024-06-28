import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search from '../assets/Search.png'
import Clear from '../assets/Clear.png'
import Cloud from '../assets/Cloud.png'
import Drizzle from '../assets/Drizzle.png'
import Humidity from '../assets/Humidity.png'
import Rain from '../assets/Rain.png'
import Snow from '../assets/Snow.png'
import Wind from '../assets/Wind.png'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": Clear,
        "01n": Clear,
        "02d": Cloud,
        "02n": Cloud,
        "03d": Cloud,
        "03n": Cloud,
        "04d": Drizzle,
        "04n": Drizzle,
        "09d": Rain,
        "09n": Rain,
        "10d": Rain,
        "10n": Rain,
        "13d": Snow,
        "13n": Snow,
    }
    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name");
        return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_KEY_ID}`;
            const response = await fetch (url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || Clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }
        catch (error) {
            setWeatherData(false)
            console.error("Error In Fetching Weather Data");
        }
    }
    useEffect(() => {
        search("Busan");
    },[])
  return (
    <div className='weather'>
      <div className="search">
        <input ref={inputRef} type="text" placeholder='Search Here'/>
        <img src={Search} alt="Search Here" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData?<>
      <img src={weatherData.icon} alt="" className='icon'/>
      <p className='temp'>{weatherData.temperature}&deg;C</p>
      <p className='loca'>{weatherData.location}</p>
      <div className='data'>
        <div className="column">
            <img src={Humidity} alt="" />
            <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="column">
            <img src={Wind} alt="" />
            <div>
                <p>{weatherData.windSpeed} Km/Hr</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
    </div>
  )
}

export default Weather
