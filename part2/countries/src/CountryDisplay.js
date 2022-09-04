import React from 'react'

const CountryDisplay = ({countries}) => {
    // More than ten matches display a special message
    if (countries.length > 10)
        return <div>Too many matches, specify another filter</div>
    
    // For two or more matches display a list of names
    if (countries.length >= 2)
        return (
            <div>
                {countries.map(country => <div key={country.cca3}>{country.name.common}</div>)}
            </div>
        )

    // For one result display a detailed overview
    if (countries.length === 1) {

        const country = countries[0]

        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital[0]}</div>
                <div>area {country.area}</div>
                <h3>languages</h3>
                <ul>
                    {Object.values(country.languages).map(language => <li>{language}</li>)}
                </ul>
                <img style={{'max-width': '300px'}} src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
            </div>
        )
    }

    // For no results display a special message
    if (countries.length === 0)
        return <div>No matches</div>

}

export default CountryDisplay