import React, { useEffect, useState } from 'react'

const Card = () => {
const [location,setLocation] = useState("jaipur")
const [data,setData] = useState({})

const getWeather  = async () =>{
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=1cfc14ad5a0d46918d5140711230908&q=${location}&aqi=no`

        const res = await fetch(url)
        const data =  await res.json()

        const {temp_c:temp ,pressure_in , humidity, wind_kph} = data.current
        const {text:condition , icon} = data.current.condition
        const {name,country} = data.location


        const newData = {
            temp,
            pressure_in,
            humidity,
            wind_kph,
            condition,
            icon,
            name,
            country
        }

        setData(newData)
    
    } catch (error) {
        alert("location not found")
    }
}

useEffect(()=>{
    getWeather()
},[])
  return (
    <>
     <div className="wrap">
        <div className="search">
          <input
          value={location}
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            type="search"
            onChange={(e)=>setLocation(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeather}
          >
            {" "}
            Search
          </button>
        </div>
      </div>


      <article className="widget">
        <div className="weatherIcon">
            <img src={data.icon} alt="icon" />
        </div>

        <div className="weatherInfo">
          <div className="temperature">
            <span>{data.temp}&deg;</span>
          </div>

          <div className="description">
            <div className="weatherCondition">{data.condition}</div>
            <div className="place">
              {data.name},{data.country}
            </div>
          </div>
        </div>

        <div className="date"> {new Date().toLocaleString()} </div>

        {/* our 4column section  */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
        
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {data.pressure_in} Hg <br />
                Pressure
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
               {data.humidity} % <br />
                Humidity
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {data.wind_kph} km <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </article>

    </>
  )
}

export default Card