// import React, {useState,useEffect} from 'react'
// import axios from 'axios'

// const App = () => {
//     const [searchFilter,setSearchFilter] = useState('')
//     const [countries, setCountries] = useState('')

//     useEffect(() => {
//         console.log('effect')
//         axios
//         .get('https://restcountries.com/v3.1/all')
//         .then((res)=> {
//             setCountries(res.data)
//         })
//     },[])

   

//     return ( 
//         <div>find contries 
//         <input value = {searchFilter} 
//         onChange = {e => setSearchFilter(e.target.value)} />
      
//         </div>
//     )
// }

// export default App
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"

const FindForm = (props) => {
  return (
    <form> 
      <p>Find countries:</p>
      <input 
        value={props.findvalue}
        onChange={props.findvaluechange} />
    </form>
  )
}

const ShowDetails = (props) => {
  const country = props.country
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area} km²</div>
      <div>Currency: {country.currencies[0]["code"]}</div>
      <h3>Languages:</h3>
      <ul>
        <div>
          {country.languages.map(language =>
            <ShowLanguage
              key={language.name}
              language={language.name}
            />
          )}
        </div>
      </ul>
      <div className="flagstyle">
        <img src={country.flags.png} alt= "" width="150"/>
      </div>
      <div>
        <ShowWeather
          city={country.capital} />
      </div>
    </div>
  )
}

const ShowLanguage = (props) => {
  return (
    <div>
      <li>{props.language}</li>
    </div>
  )
}

const ShowWeather = (props) => { 
  const [weather, setWeather] = useState(null)
  const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather")
  
  useEffect(() => {
    axios
    .get(weatherUrl)
    .then(response => {
      setWeather(response.data)
    })
  },[])    

  return (
    <div>
      <h3>Weather in {props.city}</h3> 
           
    </div>
  ) 
}
 

const ShowCountry = (props) => {
  const handlebutton = () => {
    props.setCountries([props.country])
  }
  return (
    <div>
      {props.country.name}<button onClick={handlebutton}>Show</button>
    </div>
  )
}

const ShowFilteredCountries = (props) => {
  if (props.countries.length > 10) {
    return (
      <div>
          Start typing to filter countries
      </div>
      )
  } else if (props.countries.length > 1) {
    return (
      <div>
        {props.countries.map(country =>
          <ShowCountry
            key={country.name}
            country={country}
            setCountries={props.setCountries}
          />
        )}
      </div>
    )
  } else if (props.countries.length === 1) {
    const selected = props.countries[0]
    return (
      <div className="detailsstyle">
        <ShowDetails
          country={selected}
        />
      </div>
    )
  } else {
    return (
      <div>
        No such country
      </div>
    )
  }
}


const App =() => {
  const [countries, setCountries] = useState([])
  const [findWith, setFindWith] = useState("")

  useEffect(() => {
    axios
    .get("https://restcountries.com/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFindWith = (event) => {
    setFindWith(event.target.value)
  }

  const findCountries = countries.filter(country => 
    (country.name).toLowerCase().includes(findWith))

  return (
    <div >
      <h1>Countries</h1>
      <div >
        <FindForm
          findvalue = {findWith}
          findvaluechange = {handleFindWith}
        />
      </div>
      <div>
        <ShowFilteredCountries
          countries={findCountries}
          setCountries={setCountries}
        />
      </div>
    </div>
  )
}

export default App