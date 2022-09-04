import React from 'react'
import CountryDetails from './CountryDetails'
import CountryList from './CountryList'

const CountryDisplay = ({countries, onSelect}) => {
    // More than ten matches display a special message
    if (countries.length > 10)
        return <div>Too many matches, specify another filter</div>
    
    // For two or more matches display a list of names
    if (countries.length >= 2)
        return <CountryList countries={countries} onSelect={onSelect}/>

    // For one result display a detailed overview
    if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    }

    // For no results display a special message
    if (countries.length === 0)
        return <div>No matches</div>

}

export default CountryDisplay