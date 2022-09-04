import { useState, useEffect } from 'react'
import SearchInput from "./SearchInput"
import CountryDisplay from "./CountryDisplay"
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const filteredCountries = countries.filter(country => country.name.common.includes(filter))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleCountrySelect = (countryName) => {
    setFilter(countryName)
  }

  return (
    <div>
      <SearchInput value={filter} onChange={handleFilterChange}/>
      <CountryDisplay countries={filteredCountries} onSelect={handleCountrySelect}/>
    </div>
  )
}

export default App;
