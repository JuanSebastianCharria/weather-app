import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loader from './Loader'


function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    document.title = 'Weather App'
  })

  useEffect(() => {

    const trump = pos => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }

    navigator.geolocation.getCurrentPosition(trump)
  }, [])

  console.log(coords)

  useEffect(() =>{
    if (coords) {
      const API_KEY = '5b734ab7233d90943e23c42bd1f45ea8'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      
      axios.get(url)
      .then(res => {
        setWeather(res.data)
        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit = (celsius * 9/5 + 32).toFixed(1)
        setTemp({celsius, fahrenheit})
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }
  }, [coords])

  console.log(weather)
  
  return (
    <div className= 'app'>
      {
        isLoading
          ? <Loader/>
          : (<WeatherCard
            weather={weather}
            temp={temp}
            />
          )
      }
    </div>
  )
}

export default App
